"use client"

import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion"
import type { Variants } from "framer-motion"
import { useRef } from "react"
import { useLenis } from "lenis/react"
import { CheckoutModal, useCheckout } from "@/components/checkout"

const springConfig = { stiffness: 80, damping: 28, restDelta: 0.001 }

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
}

const heroAccentShapes = [
  { shape: "circle", color: "#FFD166", size: 18, top: "10%", left: "12%", dur: 4 },
  { shape: "star", color: "#06D6A0", size: 22, top: "82%", left: "10%", dur: 5 },
  { shape: "circle", color: "#EF476F", size: 14, top: "74%", left: "86%", dur: 3.5 },
  { shape: "star", color: "#118AB2", size: 16, top: "18%", left: "86%", dur: 4.5 },
  { shape: "circle", color: "#5BBFB5", size: 12, top: "30%", left: "6%", dur: 4.8 },
]

function BiteWord() {
  return (
    <span
      className="relative inline-block h-[0.9em] w-[1.62em] align-[-0.08em]"
      role="img"
      aria-label="EAT"
    >
      <svg
        viewBox="0 0 186 102"
        className="absolute inset-0 h-full w-full overflow-visible"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <mask id="hero-eat-bite-mask">
            <rect width="186" height="102" fill="black" />
            <text
              x="1"
              y="84"
              fill="white"
              fontSize="92"
              fontWeight="900"
              letterSpacing="-5"
              style={{ fontFamily: "var(--font-sans), Nunito, system-ui, sans-serif" }}
            >
              EAT
            </text>
            <circle cx="150" cy="24" r="17" fill="black" />
            <circle cx="169" cy="38" r="18" fill="black" />
            <circle cx="150" cy="54" r="15" fill="black" />
          </mask>
        </defs>
        <text
          x="1"
          y="84"
          fill="#FF6B47"
          fontSize="92"
          fontWeight="900"
          letterSpacing="-5"
          mask="url(#hero-eat-bite-mask)"
          style={{ fontFamily: "var(--font-sans), Nunito, system-ui, sans-serif" }}
        >
          EAT
        </text>
        <circle cx="174" cy="22" r="4.5" fill="#FF6B47" stroke="#1A1A1A" strokeWidth="2.5" />
        <circle cx="183" cy="46" r="3.5" fill="#FFD166" stroke="#1A1A1A" strokeWidth="2.5" />
        <circle cx="166" cy="66" r="3" fill="#06D6A0" stroke="#1A1A1A" strokeWidth="2.5" />
      </svg>
    </span>
  )
}

export function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const lenis = useLenis()
  const prefersReducedMotion = useReducedMotion()

  const rawY = useTransform(scrollYProgress, [0, 1], [0, 160])
  const y = useSpring(rawY, springConfig)
  const rawOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const opacity = useSpring(rawOpacity, springConfig)

  // Checkout state
  const { isOpen, productId, openCheckout, closeCheckout } = useCheckout()

  const handleShopClick = () => {
    openCheckout('starter-pack')
  }

  const scrollToHowItWorks = () => {
    const element = document.querySelector<HTMLElement>('#how-it-works')
    if (element && lenis) {
      lenis.scrollTo(element, { offset: -80 })
    }
  }

  return (
    <>
      <section
        id="hero"
        ref={ref}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FFFBF5]"
      >
        {/* Warm background blob */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFD166]/12 via-[#FFFBF5] to-[#06D6A0]/8 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-12 sm:pb-16 w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            {/* ── Left: Text ── */}
            <motion.div style={prefersReducedMotion ? {} : { opacity }} className="space-y-5 sm:space-y-6">
              {/* Eyebrow pill */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0}
                className="inline-flex items-center gap-2 border-2 border-[#1A1A1A] bg-[#FFFBF5] px-3 sm:px-4 py-1.5 rounded-full"
              >
                <motion.span
                  className="w-2 h-2 rounded-full bg-[#FF6B47]"
                />
                <span className="text-[10px] sm:text-xs font-black tracking-[0.15em] sm:tracking-[0.18em] text-[#1A1A1A] uppercase">
                  RIP. TASTE. DISSOLVE.
                </span>
              </motion.div>

              {/* Headline */}
              <div className="space-y-0 overflow-hidden">
                <h1 className="text-[clamp(2.5rem,8vw,7rem)] font-black tracking-tighter leading-[0.88] text-balance">
                  {["THE TAPE", "TODDLERS", "CAN EAT"].map((line, i) => (
                    <motion.span
                      key={line}
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      custom={i + 1}
                      className={`block ${i === 2 ? "text-[#FF6B47]" : "text-[#1A1A1A]"}`}
                    >
                      {line === "CAN EAT" ? (
                        <>
                          CAN{" "}
                          <span className="text-[#FF6B47] relative inline-block">
                            <BiteWord />
                          </span>
                        </>
                      ) : (
                        line
                      )}
                    </motion.span>
                  ))}
                </h1>
              </div>

              {/* Supporting copy */}
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={4}
                className="text-sm sm:text-base md:text-lg text-[#1A1A1A]/60 font-medium max-w-sm leading-relaxed"
              >
                A satisfying sensory strip designed to tear, taste, dissolve quickly, and keep tiny hands busy.
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={5}
                className="flex flex-wrap gap-3 pt-1"
              >
                <motion.button
                  onClick={handleShopClick}
                  className="bg-[#FF6B47] text-[#FFFBF5] px-5 sm:px-7 py-3 sm:py-3.5 rounded-full font-black text-sm tracking-wide flex items-center gap-2 relative overflow-hidden border-2 border-[#1A1A1A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B47] focus-visible:ring-offset-2"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.04, y: -2 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <span className="relative z-10">Shop Starter Pack</span>
                  <motion.svg
                    className="w-4 h-4 relative z-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    initial={{ x: 0 }}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </motion.button>

                <motion.button
                  onClick={scrollToHowItWorks}
                  className="border-2 border-[#1A1A1A] text-[#1A1A1A] px-5 sm:px-7 py-3 sm:py-3.5 rounded-full font-black text-sm tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] focus-visible:ring-offset-2"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.04, y: -2, backgroundColor: "#1A1A1A", color: "#FFFBF5" }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  See How It Works
                </motion.button>
              </motion.div>

            </motion.div>

            {/* ── Right: Product Visual ── */}
            <motion.div style={prefersReducedMotion ? {} : { y }} className="relative flex justify-center lg:justify-end items-center min-h-[300px] sm:min-h-[420px] lg:min-h-[520px]">

              {/* Glow blob behind roll */}
              <motion.div
                className="absolute w-72 sm:w-[30rem] h-48 sm:h-72 rounded-full bg-[#FF6B47]/20 blur-3xl"
                animate={prefersReducedMotion ? {} : { scale: [1, 1.12, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Main product image */}
              <motion.div
                className="relative z-20 w-full max-w-[760px] sm:w-[112%] lg:w-[150%] lg:max-w-[1000px] lg:-mr-24"
                initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.84, rotate: -3, x: 28 }}
                animate={{ opacity: 1, scale: 1, rotate: 0, x: 0 }}
                transition={{ type: "spring", stiffness: 90, damping: 18, delay: 0.3 }}
              >
                <motion.div
                  animate={prefersReducedMotion ? {} : { y: [0, -12, 0], rotate: [-1, 1, -1] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full"
                >
                  <img
                    src="/images/hero-tape-rolls-transparent.png"
                    alt="Illustrated rolls of colorful Toddler Tape"
                    className="w-full h-auto select-none drop-shadow-[0_30px_38px_rgba(26,26,26,0.2)]"
                    draggable={false}
                  />
                </motion.div>
              </motion.div>

              {/* Small floating shapes */}
              {heroAccentShapes.map((shape, i) => (
                <motion.div
                  key={i}
                  className="absolute z-30 font-black hidden sm:block"
                  style={{ top: shape.top, left: shape.left }}
                  animate={prefersReducedMotion ? {} : { y: [0, -14, 0], rotate: [0, 20, 0] }}
                  transition={{ duration: shape.dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                >
                  {shape.shape === "circle" ? (
                    <div
                      className="rounded-full border-2 border-[#1A1A1A]"
                      style={{ width: shape.size, height: shape.size, backgroundColor: shape.color }}
                    />
                  ) : (
                    <span style={{ fontSize: shape.size, color: shape.color, textShadow: "1px 1px 0 #1A1A1A" }}>★</span>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          <motion.div
            animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 border-2 border-[#1A1A1A]/30 rounded-full flex justify-center pt-1.5"
          >
            <motion.div
              className="w-1 h-2 bg-[#1A1A1A]/30 rounded-full"
              animate={prefersReducedMotion ? {} : { y: [0, 6, 0], opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Checkout Modal */}
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
