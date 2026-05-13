'use server'

import { getStripe } from '@/lib/stripe'
import { PRODUCTS } from '@/lib/products'

type CheckoutItem = {
  productId: string
  quantity: number
}

function getAppUrl() {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, '')
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`.replace(/\/$/, '')
  }

  return 'http://localhost:3000'
}

function buildLineItem(item: CheckoutItem) {
  const product = PRODUCTS.find((p) => p.id === item.productId)
  if (!product) {
    throw new Error(`Product with id "${item.productId}" not found`)
  }

  if (!Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 99) {
    throw new Error(`Invalid quantity for "${product.name}"`)
  }

  if (product.stripePriceId) {
    return {
      price: product.stripePriceId,
      quantity: item.quantity,
    }
  }

  return {
    price_data: {
      currency: 'usd',
      product_data: {
        name: product.name,
        description: product.description,
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

  if (error.message.includes('No such price')) {
    return 'Stripe Price IDs are not available for the configured Stripe account or mode. Use keys from the account that owns these prices, or update the catalog with matching Price IDs.'
  }

  return error.message
}

export async function startCheckoutSession(productId: string) {
  return startMultiProductCheckoutSession([{ productId, quantity: 1 }])
}

export async function startMultiProductCheckoutSession(items: CheckoutItem[]) {
  if (!items.length) {
    throw new Error('Checkout requires at least one product')
  }

  try {
    const lineItems = items.map(buildLineItem)
    const stripe = getStripe()

    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded_page',
      redirect_on_completion: 'never',
      line_items: lineItems,
      mode: 'payment',
      return_url: `${getAppUrl()}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
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
    return session.client_secret
  } catch (error) {
    console.error('[checkout] Stripe Checkout Session creation failed', error)
    throw new Error(getCheckoutErrorMessage(error))
  }
}
