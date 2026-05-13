'use client'

import { useCallback, useState, useMemo } from 'react'
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag } from 'lucide-react'

import { startCheckoutSession } from '@/app/actions/stripe'
import { getProductById, formatPrice } from '@/lib/products'

const getStripePromise = () => {
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  if (!key) {
    console.error('[v0] Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY')
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
  
  const fetchClientSecret = useCallback(
    () => startCheckoutSession(productId),
    [productId]
  )

  if (!product || !stripePromise) return null

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
              <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={{ fetchClientSecret }}
              >
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
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
