'use server'

import { getStripe } from '@/lib/stripe'
import { PRODUCTS } from '@/lib/products'

type CheckoutItem = {
  productId: string
  quantity: number
}

type CheckoutSessionResult =
  | { clientSecret: string }
  | { error: string }

interface CheckoutLineItem {
  price_data: {
    currency: 'usd'
    product_data: {
      name: string
      description: string
      metadata: {
        product_id: string
      }
    }
    unit_amount: number
  }
  quantity: number
}

function buildLineItem(item: CheckoutItem): CheckoutLineItem {
  const product = PRODUCTS.find((p) => p.id === item.productId)
  if (!product) {
    throw new Error(`Product with id "${item.productId}" not found`)
  }

  if (!Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 99) {
    throw new Error(`Invalid quantity for "${product.name}"`)
  }

  return {
    price_data: {
      currency: 'usd',
      product_data: {
        name: product.name,
        description: product.description,
        metadata: {
          product_id: product.id,
        },
      },
      unit_amount: product.priceInCents,
    },
    quantity: item.quantity,
  }
}

function getCheckoutErrorMessage(error: unknown) {
  if (!(error instanceof Error)) {
    return 'Unable to create Stripe Checkout Session.'
  }

  if (error.message === 'Missing STRIPE_SECRET_KEY') {
    return 'Stripe checkout is not configured. Add STRIPE_SECRET_KEY to .env.local, then restart the dev server.'
  }

  if (
    error.message === 'Checkout requires at least one product' ||
    error.message.startsWith('Product with id') ||
    error.message.startsWith('Invalid quantity')
  ) {
    return error.message
  }

  return 'Checkout is temporarily unavailable. Please try again.'
}

export async function startCheckoutSession(productId: string): Promise<CheckoutSessionResult> {
  return startMultiProductCheckoutSession([{ productId, quantity: 1 }])
}

export async function startMultiProductCheckoutSession(
  items: CheckoutItem[],
): Promise<CheckoutSessionResult> {
  if (!items.length) {
    return {
      error: getCheckoutErrorMessage(new Error('Checkout requires at least one product')),
    }
  }

  try {
    const lineItems = items.map(buildLineItem)
    const stripe = getStripe()

    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded_page',
      redirect_on_completion: 'never',
      line_items: lineItems,
      mode: 'payment',
      shipping_address_collection: {
        allowed_countries: ['US'],
      },
      metadata: {
        product_ids: items.map((item) => item.productId).join(','),
      },
    })

    if (!session.client_secret) {
      throw new Error('Failed to create checkout session - no client secret returned')
    }
    return { clientSecret: session.client_secret }
  } catch (error) {
    console.error('[checkout] Stripe Checkout Session creation failed', error)
    return { error: getCheckoutErrorMessage(error) }
  }
}
