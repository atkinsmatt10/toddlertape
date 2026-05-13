"use client"

import { motion, useInView, useReducedMotion } from "framer-motion"
import type { Variants } from "framer-motion"
import { useRef } from "react"

const useCases = [
  {
    title: "High Chair Waits",
    description: "Keep them engaged between bites while you actually eat a warm meal.",
    color: "bg-[#E8735A]",
    textColor: "text-white",
    svg: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <rect x="8" y="28" width="32" height="4" rx="2" fill="white" opacity="0.9" />
        <rect x="16" y="18" width="16" height="10" rx="3" fill="white" opacity="0.6" />
        <circle cx="16" cy="38" r="4" fill="white" opacity="0.5" />
        <circle cx="32" cy="38" r="4" fill="white" opacity="0.5" />
        <rect x="20" y="10" width="8" height="8" rx="4" fill="white" opacity="0.8" />
      </svg>
    ),
  },
  {
    title: "Plane Tray Play",
    description: "Stick a strip to the tray table for peel, tear, taste, repeat at 30,000 feet.",
    color: "bg-[#5BBFB5]",
    textColor: "text-white",
    svg: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <rect x="6" y="20" width="36" height="14" rx="4" fill="white" opacity="0.6" />
        <rect x="10" y="16" width="12" height="6" rx="3" fill="white" opacity="0.8" />
        <circle cx="14" cy="36" r="3" fill="white" opacity="0.5" />
        <circle cx="34" cy="36" r="3" fill="white" opacity="0.5" />
        <rect x="4" y="22" width="6" height="3" rx="1.5" fill="white" opacity="0.4" />
      </svg>
    ),
  },
  {
    title: "Slow-Service Wiggles",
    description: "Give them a tiny table task while the fries take their sweet time.",
    color: "bg-[#EDD97A]",
    textColor: "text-[#1A1A1A]",
    svg: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <rect x="12" y="10" width="4" height="28" rx="2" fill="#1A1A1A" opacity="0.3" />
        <rect x="20" y="10" width="4" height="28" rx="2" fill="#1A1A1A" opacity="0.3" />
        <rect x="10" y="36" width="28" height="4" rx="2" fill="#1A1A1A" opacity="0.25" />
        <circle cx="32" cy="20" r="8" fill="#1A1A1A" opacity="0.15" />
        <rect x="28" y="16" width="8" height="3" rx="1.5" fill="#1A1A1A" opacity="0.3" />
        <rect x="28" y="21" width="6" height="3" rx="1.5" fill="#1A1A1A" opacity="0.25" />
      </svg>
    ),
  },
  {
    title: "Sibling Activities",
    description: "Give the little one their own project while older kids work on crafts.",
    color: "bg-[#C4A8D4]",
    textColor: "text-white",
    svg: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="6" fill="white" opacity="0.7" />
        <circle cx="32" cy="16" r="8" fill="white" opacity="0.5" />
        <rect x="8" y="26" width="14" height="12" rx="3" fill="white" opacity="0.4" />
        <rect x="26" y="24" width="18" height="14" rx="3" fill="white" opacity="0.6" />
      </svg>
    ),
  },
]

export function UseCasesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const prefersReducedMotion = useReducedMotion()

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.1 },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 90, damping: 18 },
    },
  }

  return (
    <section ref={ref} id="use-cases" className="py-16 sm:py-24 bg-white relative overflow-hidden scroll-mt-24" aria-labelledby="use-cases-heading">
      {/* Torn tape edge at top */}
      <div className="absolute top-0 left-0 right-0 h-3 bg-[#1A1A1A] torn-edge-bottom" aria-hidden="true" />
      
      {/* Decorative torn tape strips */}
      <motion.div
        className="absolute top-20 left-6 sm:left-8 w-20 sm:w-24 h-3 sm:h-4 bg-[#E8735A]/20 rounded-sm rotate-6 hidden sm:block"
        animate={prefersReducedMotion ? {} : { x: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-24 right-8 sm:right-12 w-16 sm:w-20 h-2.5 sm:h-3 bg-[#5BBFB5]/20 rounded-sm -rotate-8 hidden sm:block"
        animate={prefersReducedMotion ? {} : { x: [0, -4, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.5 }}
          className="mb-10 sm:mb-16 max-w-3xl"
        >
          <span className="inline-block bg-[#C4A8D4]/20 text-[#1A1A1A] px-4 py-1.5 rounded-full text-xs font-mono tracking-widest mb-4 uppercase">
            Play Spots
          </span>
          <h2 id="use-cases-heading" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#1A1A1A] tracking-tight leading-[0.95] text-balance">
            For Little Waits That Need
            <span className="text-[#E8735A]"> Tiny Tasks</span>
          </h2>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
          role="list"
          aria-label="Play spots"
        >
          {useCases.map((useCase) => (
            <motion.article
              key={useCase.title}
              variants={itemVariants}
              whileHover={prefersReducedMotion ? {} : { y: -5, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`${useCase.color} rounded-2xl sm:rounded-3xl p-5 sm:p-7 flex flex-col justify-between min-h-[200px] sm:min-h-56 cursor-default relative overflow-hidden`}
              role="listitem"
            >
              {/* Background tape strip decoration */}
              <motion.div
                className="absolute -right-4 -top-2 w-14 sm:w-16 h-32 sm:h-40 bg-white/10 rounded-sm rotate-12 pointer-events-none"
                animate={prefersReducedMotion ? {} : { rotate: [12, 14, 12] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              />

              <div className="relative z-10">
                <div className="mb-4 sm:mb-5">{useCase.svg}</div>
                <h3 className={`text-lg sm:text-xl font-black ${useCase.textColor} mb-2 leading-tight`}>
                  {useCase.title}
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed ${useCase.textColor} opacity-80`}>
                  {useCase.description}
                </p>
              </div>

              {/* Torn tape bottom accent */}
              <motion.div
                className="absolute bottom-4 right-4 sm:right-5 w-8 sm:w-10 h-1.5 sm:h-2 bg-white/30 rounded-sm -rotate-3 pointer-events-none"
                animate={prefersReducedMotion ? {} : { rotate: [-3, 1, -3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              />
            </motion.article>
          ))}
        </motion.div>

        {/* Pull quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.3, duration: 0.6 }}
          className="mt-10 sm:mt-14 bg-[#FFFBF5] rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-14 relative overflow-hidden"
        >
          <motion.div
            className="absolute top-4 sm:top-5 left-4 sm:left-5 w-20 sm:w-28 h-3 sm:h-4 bg-[#E8735A]/25 rounded-sm rotate-8 hidden sm:block"
            animate={prefersReducedMotion ? {} : { x: [0, 6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          />
          <motion.div
            className="absolute bottom-4 sm:bottom-5 right-6 sm:right-8 w-16 sm:w-20 h-2.5 sm:h-3 bg-[#5BBFB5]/20 rounded-sm -rotate-5 hidden sm:block"
            animate={prefersReducedMotion ? {} : { x: [0, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          />
          <div className="max-w-2xl mx-auto text-center relative z-10">
            <p className="text-xl sm:text-2xl md:text-3xl font-black text-[#1A1A1A] leading-snug text-pretty mb-4 sm:mb-5">
              &quot;Finally something that keeps him busy without me hovering over his shoulder every 30 seconds.&quot;
            </p>
            <footer className="text-[#1A1A1A]/50 text-xs sm:text-sm font-mono">
              — <span className="text-[#E8735A] font-bold">Dana R.</span>, mom of a very determined 2-year-old
            </footer>
          </div>
        </motion.blockquote>
      </div>
    </section>
  )
}
