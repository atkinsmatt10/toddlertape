"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useState } from "react"

export function LaunchCTASection() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setEmail("")
    }, 1200)
  }

  return (
    <section id="launch" className="py-20 sm:py-28 bg-[#1A1A1A] relative overflow-hidden" aria-labelledby="launch-heading">
      {/* Torn tape edge at top */}
      <div className="absolute top-0 left-0 right-0 h-3 bg-[#FFFBF5] torn-edge-bottom" aria-hidden="true" />
      
      {/* Floating tape strips */}
      {[
        { w: "w-28 sm:w-36", color: "[#E8735A]", pos: "top-12 sm:top-10 left-6 sm:left-12", rot: "rotate-12", dur: 5 },
        { w: "w-20 sm:w-24", color: "[#5BBFB5]", pos: "top-20 sm:top-24 right-8 sm:right-16", rot: "-rotate-6", dur: 7 },
        { w: "w-24 sm:w-28", color: "[#EDD97A]", pos: "bottom-16 sm:bottom-20 left-1/4", rot: "rotate-3", dur: 6 },
        { w: "w-16 sm:w-20", color: "[#C4A8D4]", pos: "bottom-8 sm:bottom-10 right-8 sm:right-10", rot: "-rotate-12", dur: 8 },
      ].map((strip, i) => (
        <motion.div
          key={i}
          className={`absolute ${strip.w} h-3 sm:h-4 bg-${strip.color}/25 rounded-sm ${strip.rot} pointer-events-none ${strip.pos} hidden sm:block`}
          animate={prefersReducedMotion ? {} : { y: [0, i % 2 === 0 ? 6 : -6, 0] }}
          transition={{ duration: strip.dur, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />
      ))}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10 pt-4">
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.5 }}
        >
          {/* Eyebrow */}
          <motion.div
            className="inline-flex items-center gap-2 bg-white/10 text-[#FFFBF5]/70 px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-mono tracking-widest mb-6 sm:mb-8 uppercase"
            animate={prefersReducedMotion ? {} : { scale: [1, 1.02, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8735A] inline-block" aria-hidden="true" />
            Launching Soon
          </motion.div>

          {/* Heading */}
          <h2 id="launch-heading" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#FFFBF5] tracking-tight leading-[0.9] mb-4 sm:mb-6 text-balance">
            Ready For A{" "}
            <motion.span
              className="text-[#E8735A] inline-block"
              animate={prefersReducedMotion ? {} : { rotate: [0, -1, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Better Rip?
            </motion.span>
          </h2>

          <p className="text-[#FFFBF5]/60 text-base sm:text-lg mb-8 sm:mb-10 max-w-md mx-auto leading-relaxed text-pretty">
            Get early access, launch-day pricing, and a free bonus roll with your first order.
          </p>

          {/* Form */}
          {!isSubmitted ? (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.2 }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <label htmlFor="email-input" className="sr-only">Email address</label>
              <motion.input
                id="email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="parent@email.com"
                required
                className="flex-1 bg-white/10 border-2 border-white/20 rounded-full px-4 sm:px-5 py-3 sm:py-4 text-[#FFFBF5] placeholder:text-[#FFFBF5]/30 font-mono text-sm focus:outline-none focus:border-[#E8735A] transition-colors"
                whileFocus={{ borderColor: "#E8735A" }}
              />
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#E8735A] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-black text-sm tracking-wide relative overflow-hidden disabled:opacity-60 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A1A]"
                whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
              >
                {!prefersReducedMotion && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.4 }}
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10">
                  {isSubmitting ? "Joining..." : "Get Launch Updates"}
                </span>
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 180 }}
              className="bg-white/10 rounded-2xl p-6 sm:p-8 max-w-md mx-auto"
              role="status"
              aria-live="polite"
            >
              <motion.div
                className="w-12 h-12 sm:w-14 sm:h-14 bg-[#E8735A] rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center"
                initial={prefersReducedMotion ? {} : { scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.1 }}
              >
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <h3 className="text-[#FFFBF5] font-black text-lg sm:text-xl mb-2">{"You're on the list!"}</h3>
              <p className="text-[#FFFBF5]/50 text-xs sm:text-sm">
                {"We'll send launch details directly to your inbox."}
              </p>
            </motion.div>
          )}

          {/* Small copy */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.4 }}
            className="text-[#FFFBF5]/35 text-[10px] sm:text-xs mt-3 sm:mt-4 font-mono"
          >
            Starter packs coming soon. No spam, ever.
          </motion.p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.5 }}
          className="grid grid-cols-3 gap-4 sm:gap-8 mt-16 sm:mt-20 pt-8 sm:pt-10 border-t border-white/10"
          role="list"
          aria-label="Key statistics"
        >
          {[
            { value: "4,800+", label: "On Waitlist" },
            { value: "4.9 / 5", label: "Beta Rating" },
            { value: "100%", label: "Food-Grade" },
          ].map((stat) => (
            <div key={stat.label} role="listitem">
              <motion.div
                className="text-xl sm:text-2xl md:text-3xl font-black text-[#E8735A]"
                initial={prefersReducedMotion ? {} : { scale: 0.7, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-[#FFFBF5]/40 text-[10px] sm:text-xs mt-1 font-mono">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
