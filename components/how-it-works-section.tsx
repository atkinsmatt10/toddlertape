"use client"

import { motion, useInView, useReducedMotion } from "framer-motion"
import { useRef } from "react"

const youtubeVideoId = "HR1WgevBc6Q"

export function HowItWorksSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="how-it-works" ref={ref} className="py-28 bg-charcoal relative overflow-hidden scroll-mt-24">
      {/* Subtle dot-grid texture */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #FAF7F0 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Decorative floating strips */}
      <motion.div
        className="absolute top-12 left-[8%] w-20 h-3 rounded-full bg-coral/25 rotate-[-18deg]"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-16 right-[10%] w-28 h-3 rounded-full bg-teal/20 rotate-[12deg]"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 right-[5%] w-14 h-2.5 rounded-full bg-sunshine/20 rotate-[-6deg]"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block border border-cream/20 text-cream/60 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase mb-5">
            How It Works
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-cream tracking-tight leading-[0.9]">
            Rip It.{" "}
            <span className="relative inline-block text-coral">
              Taste It.
              {/* Underline scribble */}
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <motion.path
                  d="M2 8 Q50 2 100 8 Q150 14 198 6"
                  stroke="#E8735A"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </svg>
            </span>
          </h2>
        </motion.div>

        {/* YouTube video */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 36 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 90, damping: 20 }}
          className="mx-auto max-w-5xl"
        >
          <div
            className="relative aspect-video overflow-hidden rounded-[2rem] border-2 border-cream/15 bg-black shadow-2xl shadow-black/30"
          >
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${youtubeVideoId}?rel=0&modestbranding=1`}
              title="Toddler Tape demo video"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center text-cream/30 text-xs font-mono max-w-sm mx-auto"
        >
          Always use with adult supervision. Not intended as a food product.
        </motion.p>
      </div>
    </section>
  )
}
