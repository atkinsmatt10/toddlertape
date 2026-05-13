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

// SVG tape roll drawn inline — no external image needed
function TapeRoll() {
  return (
    <svg
      viewBox="0 0 320 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* Outer ring */}
      <circle cx="160" cy="160" r="148" fill="#FF6B47" stroke="#1A1A1A" strokeWidth="6" />
      {/* Stripe pattern on the roll surface */}
      <clipPath id="roll-clip">
        <circle cx="160" cy="160" r="148" />
      </clipPath>
      <g clipPath="url(#roll-clip)">
        {/* Rainbow stripes */}
        {[
          { x: -20, color: "#FFD166" },
          { x: 30, color: "#06D6A0" },
          { x: 80, color: "#118AB2" },
          { x: 130, color: "#EF476F" },
          { x: 180, color: "#FFD166" },
          { x: 230, color: "#06D6A0" },
          { x: 280, color: "#118AB2" },
          { x: 330, color: "#EF476F" },
        ].map((stripe, i) => (
          <rect
            key={i}
            x={stripe.x}
            y="0"
            width="36"
            height="320"
            fill={stripe.color}
            opacity="0.35"
          />
        ))}
        {/* Dots scattered */}
        {[
          [80, 70], [200, 90], [120, 200], [240, 220], [60, 240], [170, 150],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="8" fill="#1A1A1A" opacity="0.18" />
        ))}
        {/* Stars */}
        {[
          [100, 130], [220, 180],
        ].map(([cx, cy], i) => (
          <text key={i} x={cx} y={cy} fontSize="18" fill="#1A1A1A" opacity="0.22" textAnchor="middle">★</text>
        ))}
      </g>
      {/* Inner ring shadow */}
      <circle cx="160" cy="160" r="148" stroke="#1A1A1A" strokeWidth="6" fill="none" />
      {/* Middle ring */}
      <circle cx="160" cy="160" r="90" fill="#FFFBF5" stroke="#1A1A1A" strokeWidth="5" />
      {/* Core hole */}
      <circle cx="160" cy="160" r="40" fill="#E8E0D5" stroke="#1A1A1A" strokeWidth="5" />
      {/* Highlight glint */}
      <ellipse cx="120" cy="115" rx="18" ry="10" fill="white" opacity="0.35" transform="rotate(-30 120 115)" />
    </svg>
  )
}

// Torn tape strip SVG
function TapeStrip({ color, rotate, patternType }: { color: string; rotate: number; patternType: "dots" | "stripes" | "stars" }) {
  return (
    <svg
      viewBox="0 0 340 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      <defs>
        <clipPath id={`strip-clip-${patternType}`}>
          <path d="M8 4 Q14 2 20 6 L320 6 Q326 4 332 8 L336 72 Q330 76 324 72 L16 72 Q10 76 4 72 Z" />
        </clipPath>
      </defs>
      {/* Tape body */}
      <path
        d="M8 4 Q14 2 20 6 L320 6 Q326 4 332 8 L336 72 Q330 76 324 72 L16 72 Q10 76 4 72 Z"
        fill={color}
        stroke="#1A1A1A"
        strokeWidth="3"
      />
      {/* Pattern overlay */}
      <g clipPath={`url(#strip-clip-${patternType})`}>
        {patternType === "dots" &&
          [40, 80, 120, 160, 200, 240, 280].map((x, i) => (
            <circle key={i} cx={x} cy="39" r="9" fill="#1A1A1A" opacity="0.12" />
          ))}
        {patternType === "stripes" &&
          [20, 60, 100, 140, 180, 220, 260, 300].map((x, i) => (
            <rect key={i} x={x} y="6" width="18" height="66" fill="#1A1A1A" opacity="0.1" />
          ))}
        {patternType === "stars" &&
          [50, 110, 170, 230, 290].map((x, i) => (
            <text key={i} x={x} y="46" fontSize="20" fill="#1A1A1A" opacity="0.18" textAnchor="middle">★</text>
          ))}
      </g>
      {/* Torn left edge */}
      <path
        d="M8 4 Q2 12 6 20 Q0 30 8 38 Q2 50 6 58 Q0 68 8 72 Q10 76 4 72"
        fill={color}
        stroke="#1A1A1A"
        strokeWidth="2.5"
      />
      {/* Torn right edge */}
      <path
        d="M332 8 Q338 16 334 24 Q340 34 332 42 Q338 54 334 62 Q340 70 332 72 Q330 76 336 72"
        fill={color}
        stroke="#1A1A1A"
        strokeWidth="2.5"
      />
    </svg>
  )
}

const featureBullets = [
  { label: "Dissolves quickly", color: "#06D6A0" },
  { label: "Colorful patterns", color: "#FF6B47" },
  { label: "No sticky residue", color: "#FFD166" },
  { label: "Sensory play", color: "#118AB2" },
]

const floatingTapes = [
  { color: "#FFD166", rotate: -18, pattern: "dots" as const, top: "12%", left: "62%", delay: 0 },
  { color: "#06D6A0", rotate: 12, pattern: "stripes" as const, top: "68%", left: "55%", delay: 0.4 },
  { color: "#118AB2", rotate: -6, pattern: "stars" as const, top: "42%", left: "58%", delay: 0.8 },
]

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
                  animate={prefersReducedMotion ? {} : { scale: [1, 1.4, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                />
                <span className="text-[10px] sm:text-xs font-black tracking-[0.15em] sm:tracking-[0.18em] text-[#1A1A1A] uppercase">
                  RIP. GIGGLE. DISSOLVE.
                </span>
              </motion.div>

              {/* Headline */}
              <div className="space-y-0 overflow-hidden">
                {["THE TAPE", "TODDLERS", "CAN RIP"].map((line, i) => (
                  <motion.div
                    key={line}
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={i + 1}
                  >
                    <h1
                      className={`text-[clamp(2.5rem,8vw,7rem)] font-black tracking-tighter leading-[0.88] text-balance ${
                        line === "RIP" || i === 2
                          ? "text-[#FF6B47]"
                          : "text-[#1A1A1A]"
                      }`}
                    >
                      {line === "CAN RIP" ? (
                        <>
                          CAN{" "}
                          <span className="text-[#FF6B47] relative inline-block">
                            RIP
                            {/* Underline scribble */}
                            <motion.svg
                              viewBox="0 0 120 14"
                              className="absolute -bottom-1 left-0 w-full"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ delay: 1.2, duration: 0.7, ease: "easeOut" }}
                            >
                              <motion.path
                                d="M2 10 Q30 2 60 10 Q90 18 118 8"
                                stroke="#FF6B47"
                                strokeWidth="4"
                                strokeLinecap="round"
                                fill="none"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ delay: 1.2, duration: 0.7, ease: "easeOut" }}
                              />
                            </motion.svg>
                          </span>
                        </>
                      ) : (
                        line
                      )}
                    </h1>
                  </motion.div>
                ))}
              </div>

              {/* Supporting copy */}
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={4}
                className="text-sm sm:text-base md:text-lg text-[#1A1A1A]/60 font-medium max-w-sm leading-relaxed"
              >
                A satisfying sensory strip designed to tear, dissolve quickly, and keep tiny hands busy.
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
                  {!prefersReducedMotion && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    />
                  )}
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

              {/* Feature bullets */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={6}
                className="flex flex-wrap gap-2 sm:gap-3 pt-1"
              >
                {featureBullets.map((bullet, i) => (
                  <motion.div
                    key={bullet.label}
                    className="flex items-center gap-1.5 bg-white border border-[#1A1A1A]/10 rounded-full px-2.5 sm:px-3 py-1"
                    initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + i * 0.09, type: "spring", stiffness: 260, damping: 20 }}
                    whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                  >
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: bullet.color }}
                    />
                    <span className="text-[10px] sm:text-xs font-semibold text-[#1A1A1A]/70">{bullet.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* ── Right: Tape Roll Visual ── */}
            <motion.div style={prefersReducedMotion ? {} : { y }} className="relative flex justify-center items-center min-h-[320px] sm:min-h-[420px]">

              {/* Glow blob behind roll */}
              <motion.div
                className="absolute w-56 sm:w-72 h-56 sm:h-72 rounded-full bg-[#FF6B47]/20 blur-3xl"
                animate={prefersReducedMotion ? {} : { scale: [1, 1.12, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Main tape roll */}
              <motion.div
                className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 z-10"
                initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.75, rotate: -15 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 90, damping: 18, delay: 0.3 }}
              >
                <motion.div
                  animate={prefersReducedMotion ? {} : { rotate: [0, 6, -6, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full h-full drop-shadow-2xl"
                >
                  <TapeRoll />
                </motion.div>
              </motion.div>

              {/* Floating tape strips */}
              {floatingTapes.map((tape, i) => (
                <motion.div
                  key={i}
                  className="absolute w-40 sm:w-52 md:w-64 z-20 hidden sm:block"
                  style={{ top: tape.top, left: tape.left }}
                  initial={prefersReducedMotion ? {} : { opacity: 0, x: 40, rotate: tape.rotate - 10 }}
                  animate={prefersReducedMotion ? { opacity: 1 } : {
                    opacity: 1,
                    x: 0,
                    rotate: tape.rotate,
                    y: [0, -10, 0],
                  }}
                  transition={{
                    opacity: { delay: 0.6 + tape.delay, duration: 0.6 },
                    x: { delay: 0.6 + tape.delay, duration: 0.6 },
                    rotate: { delay: 0.6 + tape.delay, duration: 0.6 },
                    y: {
                      delay: 1 + tape.delay,
                      duration: 3.5 + i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                >
                  <TapeStrip color={tape.color} rotate={tape.rotate} patternType={tape.pattern} />
                </motion.div>
              ))}

              {/* Small floating shapes */}
              {[
                { shape: "circle", color: "#FFD166", size: 18, top: "8%", left: "10%", dur: 4 },
                { shape: "star", color: "#06D6A0", size: 22, top: "82%", left: "18%", dur: 5 },
                { shape: "circle", color: "#EF476F", size: 14, top: "75%", left: "78%", dur: 3.5 },
                { shape: "star", color: "#118AB2", size: 16, top: "18%", left: "82%", dur: 4.5 },
              ].map((shape, i) => (
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
