'use server'

import { stripe } from '@/lib/stripe'
import { PRODUCTS } from '@/lib/products'

export async function startCheckoutSession(productId: string) {
  console.log('[v0] startCheckoutSession called with productId:', productId)
  
  const product = PRODUCTS.find((p) => p.id === productId)
  if (!product) {
    console.log('[v0] Product not found:', productId)
    throw new Error(`Product with id "${productId}" not found`)
  }
  
  console.log('[v0] Found product:', product.name, 'Price:', product.priceInCents)

  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded_page',
      redirect_on_completion: 'never',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: product.description,
            },
            unit_amount: product.priceInCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
    })

    console.log('[v0] Session created, client_secret exists:', !!session.client_secret)
    if (!session.client_secret) {
      throw new Error('Failed to create checkout session - no client secret returned')
    }
    return session.client_secret
  } catch (error) {
    console.error('[v0] Stripe error:', error)
    throw error
  }
}

export async function startMultiProductCheckoutSession(items: { productId: string; quantity: number }[]) {
  const lineItems = items.map((item) => {
    const product = PRODUCTS.find((p) => p.id === item.productId)
    if (!product) {
      throw new Error(`Product with id "${item.productId}" not found`)
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
  })

  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded_page',
    redirect_on_completion: 'never',
    line_items: lineItems,
    mode: 'payment',
  })

  if (!session.client_secret) {
    throw new Error('Failed to create checkout session - no client secret returned')
  }
  return session.client_secret
}
