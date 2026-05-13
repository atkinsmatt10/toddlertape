"use client"

import { motion, useInView } from "framer-motion"
import type { Variants } from "framer-motion"
import { useRef } from "react"

const steps = [
  {
    verb: "Tear",
    description: "Pull a strip and let them rip.",
    bg: "bg-coral",
    text: "text-white",
    number: "01",
    accent: "border-coral",
    svgColor: "#E8735A",
  },
  {
    verb: "Taste",
    description: "A light flavor moment without sticky residue.",
    bg: "bg-sunshine",
    text: "text-charcoal",
    number: "02",
    accent: "border-sunshine",
    svgColor: "#EDD97A",
  },
  {
    verb: "Dissolve",
    description: "Designed to dissolve quickly in the mouth.",
    bg: "bg-teal",
    text: "text-white",
    number: "03",
    accent: "border-teal",
    svgColor: "#5BBFB5",
  },
  {
    verb: "Reset",
    description: "Another strip, another tiny task.",
    bg: "bg-lavender",
    text: "text-charcoal",
    number: "04",
    accent: "border-lavender",
    svgColor: "#C4A8D4",
  },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 90, damping: 18 },
  },
}

function TapeStripSVG({ color }: { color: string }) {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Tape roll body */}
      <circle cx="32" cy="32" r="26" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2.5" />
      <circle cx="32" cy="32" r="16" fill={color} fillOpacity="0.35" stroke={color} strokeWidth="2" />
      <circle cx="32" cy="32" r="7" fill={color} stroke={color} strokeWidth="2" />
      {/* Torn tab */}
      <path
        d="M54 26 Q60 22 58 18 Q56 14 50 16 L46 24 Z"
        fill={color}
        fillOpacity="0.7"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Zigzag tear edge */}
      <polyline
        points="46,24 48,20 50,24 52,20 54,24 56,20"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

export function HowItWorksSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="how-it-works" ref={ref} className="py-28 bg-charcoal relative overflow-hidden">
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
            Pick Their{" "}
            <span className="relative inline-block text-coral">
              Favorite Rip
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

        {/* Step cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.verb}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`relative rounded-3xl p-8 border-2 ${step.accent} bg-cream/5 overflow-hidden group cursor-default`}
            >
              {/* Large step number watermark */}
              <span className="absolute top-4 right-5 text-7xl font-black text-cream/[0.04] select-none leading-none">
                {step.number}
              </span>

              {/* Icon */}
              <motion.div
                className="mb-6"
                whileHover={{ rotate: [0, -8, 8, 0] }}
                transition={{ duration: 0.5 }}
              >
                <TapeStripSVG color={
                  step.verb === "Tear" ? "#E8735A"
                  : step.verb === "Taste" ? "#EDD97A"
                  : step.verb === "Dissolve" ? "#5BBFB5"
                  : "#C4A8D4"
                } />
              </motion.div>

              {/* Verb pill */}
              <motion.div
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${step.bg} mb-4`}
                whileHover={{ scale: 1.05 }}
              >
                <span className={`text-sm font-black tracking-wide ${step.text}`}>{step.verb}</span>
              </motion.div>

              <p className="text-cream/70 text-sm leading-relaxed text-pretty">{step.description}</p>

              {/* Connector arrow — hidden on last card */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="#FAF7F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.25" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
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
