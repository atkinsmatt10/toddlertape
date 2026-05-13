"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import type { Transition } from "framer-motion"
import Link from "next/link"
import { useLenis } from "lenis/react"
import { Menu, X } from "lucide-react"
import { CheckoutModal, useCheckout } from "@/components/checkout"

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const lenis = useLenis()
  const prefersReducedMotion = useReducedMotion()
  
  // Checkout state for Starter Pack
  const { isOpen, productId, openCheckout, closeCheckout } = useCheckout()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.querySelector<HTMLElement>(id)
    if (element && lenis) {
      lenis.scrollTo(element, { offset: -80 })
    }
    setMobileMenuOpen(false)
  }

  const handleShopClick = () => {
    openCheckout('starter-pack')
    setMobileMenuOpen(false)
  }

  const navLinks = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Patterns", href: "#packs" },
    { label: "Safety", href: "#safety" },
    { label: "Reviews", href: "#reviews" },
  ]

  const springTransition: Transition = prefersReducedMotion
    ? { duration: 0.01 } 
    : { type: "spring", stiffness: 400, damping: 25 }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={prefersReducedMotion ? { duration: 0.01 } : { type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#FFFBF5]/95 backdrop-blur-md border-b border-[#1A1A1A]/10 shadow-sm"
            : "bg-transparent"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8735A] focus-visible:ring-offset-2 rounded-lg">
            <motion.div
              whileHover={prefersReducedMotion ? {} : { scale: 1.04 }}
              transition={springTransition}
              className="flex items-center gap-1.5"
            >
              {/* Tape roll icon */}
              <motion.div
                className="w-7 h-7 rounded-full border-[3px] border-[#1A1A1A] flex items-center justify-center bg-[#E8735A]"
                animate={prefersReducedMotion ? {} : { rotate: [0, 6, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFFBF5]" />
              </motion.div>
              <span className="text-lg sm:text-xl font-black tracking-tight text-[#1A1A1A]">
                Toddler<span className="text-[#E8735A]">Tape</span>
              </span>
            </motion.div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((item, i) => (
              <motion.button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="text-sm font-semibold tracking-wide text-[#1A1A1A]/70 hover:text-[#1A1A1A] transition-colors relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8735A] focus-visible:ring-offset-2 rounded px-1 py-0.5"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={prefersReducedMotion ? { duration: 0.01 } : { delay: i * 0.06, duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
                whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
              >
                {item.label}
                <motion.span
                  className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-[#E8735A] origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
                />
              </motion.button>
            ))}
          </div>

          {/* Desktop CTA - Shop Starter Pack */}
          <motion.button
            onClick={handleShopClick}
            className="hidden md:flex items-center gap-2 bg-[#1A1A1A] text-[#FFFBF5] px-4 lg:px-5 py-2.5 rounded-full font-bold text-sm tracking-wide relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8735A] focus-visible:ring-offset-2"
            whileHover={prefersReducedMotion ? {} : { scale: 1.03, backgroundColor: "#E8735A" }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
            transition={springTransition}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {!prefersReducedMotion && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4 }}
              />
            )}
            <span className="relative z-10">Shop Starter Pack</span>
          </motion.button>

          {/* Mobile hamburger */}
          <motion.button
            className="md:hidden p-2 text-[#1A1A1A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8735A] rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={prefersReducedMotion ? {} : { rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={prefersReducedMotion ? {} : { rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={22} aria-hidden="true" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={prefersReducedMotion ? {} : { rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={prefersReducedMotion ? {} : { rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu size={22} aria-hidden="true" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
              className="md:hidden bg-[#FFFBF5]/98 backdrop-blur-md border-t border-[#1A1A1A]/10 overflow-hidden"
            >
              <div className="px-4 sm:px-6 py-5 space-y-3">
                {navLinks.map((item, i) => (
                  <motion.button
                    key={item.label}
                    onClick={() => scrollToSection(item.href)}
                    className="block w-full text-left text-[#1A1A1A] text-base font-semibold py-2 px-2 rounded-lg hover:bg-[#1A1A1A]/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8735A]"
                    initial={prefersReducedMotion ? {} : { opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
                <motion.button
                  onClick={handleShopClick}
                  className="w-full bg-[#1A1A1A] text-[#FFFBF5] px-6 py-3.5 rounded-full font-bold text-sm tracking-wide mt-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8735A] focus-visible:ring-offset-2"
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={prefersReducedMotion ? {} : { backgroundColor: "#E8735A" }}
                >
                  Shop Starter Pack
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Checkout Modal for Starter Pack */}
      {productId && (
        <CheckoutModal 
          productId={productId} 
          isOpen={isOpen} 
          onClose={closeCheckout} 
        />
      )}
    </>
  )
}
