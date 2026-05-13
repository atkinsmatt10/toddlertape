"use client"

import { motion, useInView, useReducedMotion } from "framer-motion"
import type { Variants } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"

const footerLinks = [
  {
    title: "Product",
    links: ["Rainbow Rips", "Dino Dots", "Berry Stripes", "Sunny Shapes", "Starter Pack"],
  },
  {
    title: "FAQ",
    links: ["How it works", "Is it edible?", "Age range", "Where to buy", "Wholesale"],
  },
  {
    title: "Company",
    links: ["Contact", "Press", "Wholesale", "Careers"],
  },
]

export function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const prefersReducedMotion = useReducedMotion()

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.06, delayChildren: 0.08 },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  }

  return (
    <footer ref={ref} className="relative bg-[#1A1A1A] pt-12 sm:pt-16 pb-6 sm:pb-8 overflow-hidden" role="contentinfo">
      {/* Oversized faded wordmark — behind everything */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 font-black text-white/[0.02] pointer-events-none select-none leading-none whitespace-nowrap"
        style={{ fontSize: "clamp(5rem, 18vw, 16rem)" }}
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0.8, ease: "easeOut" }}
        aria-hidden="true"
      >
        TODDLER TAPE
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top row — logo + tagline */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 sm:gap-6 pb-8 sm:pb-10 border-b border-white/10 mb-8 sm:mb-10">
          <div>
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.4 }}
              className="flex items-center gap-2 mb-2"
            >
              {/* Tape roll logo mark */}
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="flex-shrink-0" aria-hidden="true">
                <circle cx="14" cy="14" r="13" fill="#E8735A" />
                <circle cx="14" cy="14" r="6" fill="#1A1A1A" />
                <circle cx="14" cy="14" r="3" fill="#E8735A" />
                <rect x="14" y="1" width="13" height="3.5" rx="1.75" fill="#E8735A" transform="rotate(35 14 14)" opacity="0.7" />
              </svg>
              <span className="text-xl sm:text-2xl font-black text-[#FFFBF5] tracking-tight">
                Toddler<span className="text-[#E8735A]">Tape</span>
              </span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: prefersReducedMotion ? 0 : 0.15 }}
              className="text-[#FFFBF5]/40 text-[10px] sm:text-xs font-mono max-w-xs leading-relaxed"
            >
              Designed for curious hands. Safe for mouthy moments. Starter packs coming soon.
            </motion.p>
          </div>

          {/* Social placeholders */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.25 }}
            className="flex items-center gap-2 sm:gap-3"
            role="list"
            aria-label="Social media links"
          >
            {[
              { abbr: "IG", full: "Instagram" },
              { abbr: "TK", full: "TikTok" },
              { abbr: "PT", full: "Pinterest" },
            ].map((s) => (
              <motion.a
                key={s.abbr}
                href="#"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/20 flex items-center justify-center text-[#FFFBF5]/40 font-mono text-[10px] sm:text-xs hover:border-[#E8735A] hover:text-[#E8735A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8735A]"
                whileHover={prefersReducedMotion ? {} : { scale: 1.08 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                aria-label={s.full}
                role="listitem"
              >
                {s.abbr}
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Link columns */}
        <motion.nav
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-14"
          aria-label="Footer navigation"
        >
          {footerLinks.map((section) => (
            <motion.div key={section.title} variants={itemVariants}>
              <h3 className="font-black text-[#FFFBF5] text-[10px] sm:text-xs tracking-widest uppercase mb-3 sm:mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2 sm:space-y-2.5">
                {section.links.map((item) => (
                  <li key={item}>
                    <motion.div
                      whileHover={prefersReducedMotion ? {} : { x: 2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Link
                        href="#"
                        className="text-[#FFFBF5]/40 hover:text-[#E8735A] font-mono text-[10px] sm:text-xs transition-colors inline-block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E8735A] rounded"
                      >
                        {item}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.nav>

        {/* Bottom bar */}
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-center pt-5 sm:pt-6 border-t border-white/10 gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.3 }}
        >
          <p className="text-[#FFFBF5]/25 font-mono text-[10px] sm:text-xs">
            &copy; 2026 Toddler Tape. All rights reserved.
          </p>
          <nav className="flex items-center gap-3 sm:gap-4" aria-label="Legal links">
            {["Privacy Policy", "Terms", "Do Not Sell"].map((l) => (
              <Link
                key={l}
                href="#"
                className="text-[#FFFBF5]/25 hover:text-[#FFFBF5]/50 font-mono text-[10px] sm:text-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E8735A] rounded"
              >
                {l}
              </Link>
            ))}
          </nav>
          <p className="text-[#FFFBF5]/20 font-mono text-[10px] sm:text-xs">
            made with tiny hands in mind
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
