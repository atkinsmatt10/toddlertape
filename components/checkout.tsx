'use client'

import { useCallback, useState } from 'react'
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, CheckCircle2, ShoppingBag, X } from 'lucide-react'

import { startCheckoutSession } from '@/app/actions/stripe'
import { getProductById, formatPrice } from '@/lib/products'

const STRIPE_PUBLISHABLE_KEY_ERROR =
  'Stripe checkout is not configured. Add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to .env.local, then restart the dev server.'

const getStripePromise = () => {
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  if (!key) {
    console.error('[checkout] Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY')
    return null
  }

  if (!key.startsWith('pk_')) {
    console.error('[checkout] NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY must be a Stripe publishable key.')
    return null
  }
  return loadStripe(key)
}

interface CheckoutModalProps {
  productId: string
  isOpen: boolean
  onClose: () => void
}

export function CheckoutModal({ productId, isOpen, onClose }: CheckoutModalProps) {
  const product = getProductById(productId)
  const [stripePromise] = useState(() => getStripePromise())
  const [checkoutError, setCheckoutError] = useState<string | null>(null)
  const [checkoutComplete, setCheckoutComplete] = useState(false)
  
  const fetchClientSecret = useCallback(async () => {
    setCheckoutError(null)

    try {
      return await startCheckoutSession(productId)
    } catch (error) {
      console.error('[checkout] Failed to create Stripe Checkout Session', error)
      setCheckoutError(
        error instanceof Error && error.message
          ? error.message
          : 'Checkout is temporarily unavailable. Please try again.',
      )
      throw error
    }
  }, [productId])

  if (!product) return null

  const configurationError = stripePromise
    ? null
    : STRIPE_PUBLISHABLE_KEY_ERROR

  return (
    <AnimatePresence mode="sync">
      {isOpen && (
        <motion.div
          key="checkout-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#1a1a1a]/70 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FF6B5B]/10 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-[#FF6B5B]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1a1a1a]">{product.name}</h3>
                  <p className="text-sm text-[#1a1a1a]/60">{formatPrice(product.priceInCents)} for 6 rolls</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B5B]"
                aria-label="Close checkout"
              >
                <X className="w-5 h-5 text-[#1a1a1a]/60" />
              </button>
            </div>

            {/* Checkout */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              {checkoutComplete ? (
                <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-[#1A1A1A]/10 bg-[#FFFBF5] px-6 py-12 text-center">
                  <CheckCircle2 className="h-12 w-12 text-[#4ECDC4]" />
                  <div>
                    <h4 className="text-xl font-black text-[#1A1A1A]">Order received</h4>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#1A1A1A]/65">
                      Your payment was completed. A receipt will be sent by Stripe.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="rounded-full bg-[#1A1A1A] px-5 py-2.5 text-sm font-bold text-[#FFFBF5] transition-colors hover:bg-[#E8735A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8735A] focus-visible:ring-offset-2"
                  >
                    Keep Shopping
                  </button>
                </div>
              ) : configurationError || checkoutError ? (
                <div
                  role="alert"
                  className="flex items-start gap-3 rounded-2xl border border-[#E8735A]/30 bg-[#E8735A]/10 p-4 text-sm leading-relaxed text-[#1A1A1A]"
                >
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#E8735A]" />
                  <p>{configurationError || checkoutError}</p>
                </div>
              ) : (
                <EmbeddedCheckoutProvider
                  key={productId}
                  stripe={stripePromise}
                  options={{
                    fetchClientSecret,
                    onComplete: () => setCheckoutComplete(true),
                  }}
                >
                  <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Hook to manage checkout state
export function useCheckout() {
  const [isOpen, setIsOpen] = useState(false)
  const [productId, setProductId] = useState<string | null>(null)

  const openCheckout = useCallback((id: string) => {
    setProductId(id)
    setIsOpen(true)
  }, [])

  const closeCheckout = useCallback(() => {
    setIsOpen(false)
    // Delay clearing productId to allow exit animation
    setTimeout(() => setProductId(null), 300)
  }, [])

  return {
    isOpen,
    productId,
    openCheckout,
    closeCheckout,
  }
}
