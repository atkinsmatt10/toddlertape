"use client"

import { motion, useInView, useReducedMotion } from "framer-motion"
import type { Variants } from "framer-motion"
import { useRef } from "react"
import { Droplets, Leaf, ShieldOff, Eye } from "lucide-react"

const callouts = [
  {
    icon: Droplets,
    title: "Quick-Dissolve Format",
    description: "Each strip is formulated to break down rapidly when wet — not linger.",
    color: "text-[#5BBFB5]",
    bg: "bg-[#5BBFB5]/15",
  },
  {
    icon: Leaf,
    title: "Food-Grade Ingredients",
    description: "Ingredient list in development. Target: plant-based, non-toxic, free from common allergens.",
    color: "text-[#7ECFB3]",
    bg: "bg-[#7ECFB3]/15",
    placeholder: true,
  },
  {
    icon: ShieldOff,
    title: "No Sticky Adhesive",
    description: "Zero pressure-sensitive glue. Toddler Tape holds by texture, not by chemical bond.",
    color: "text-[#EDD97A]",
    bg: "bg-[#EDD97A]/15",
  },
  {
    icon: Eye,
    title: "Adult Supervision Recommended",
    description: "Designed for supervised sensory play. Not a snack, toy, or substitute for food.",
    color: "text-[#E8735A]",
    bg: "bg-[#E8735A]/15",
  },
]

// Placeholder certification badge
function CertBadge({ label, note }: { label: string; note: string }) {
  const prefersReducedMotion = useReducedMotion()
  
  return (
    <motion.div
      whileHover={prefersReducedMotion ? {} : { scale: 1.04 }}
      className="flex flex-col items-center gap-1 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl border border-[#FFFBF5]/10 bg-[#FFFBF5]/5 min-w-[80px] sm:min-w-[90px]"
    >
      {/* Badge ring visual */}
      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-dashed border-[#FFFBF5]/20 flex items-center justify-center" aria-hidden="true">
        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#FFFBF5]/10" />
      </div>
      <span className="text-[#FFFBF5]/80 text-[10px] sm:text-[11px] font-bold text-center leading-tight">{label}</span>
      <span className="text-[#FFFBF5]/30 text-[8px] sm:text-[9px] font-mono text-center uppercase tracking-wide">{note}</span>
    </motion.div>
  )
}

export function SafetySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const prefersReducedMotion = useReducedMotion()

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.1 },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: prefersReducedMotion ? 0 : -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 90, damping: 18 },
    },
  }

  return (
    <section id="safety" ref={ref} className="py-20 sm:py-28 bg-[#1A1A1A] relative overflow-hidden" aria-labelledby="safety-heading">
      {/* Background dot texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #FFFBF5 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      {/* Floating tape accents */}
      <motion.div
        className="absolute top-16 right-[10%] w-20 sm:w-24 h-3 sm:h-3.5 rounded-full bg-[#E8735A]/20 rotate-[20deg] hidden sm:block"
        animate={prefersReducedMotion ? {} : { y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-24 left-[6%] w-16 sm:w-18 h-2.5 sm:h-3 rounded-full bg-[#5BBFB5]/20 rotate-[-14deg] hidden sm:block"
        animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-start">

          {/* Left column — header + callouts */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.5 }}
              className="mb-8 sm:mb-12"
            >
              <span className="inline-block border border-[#FFFBF5]/20 text-[#FFFBF5]/60 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase mb-4 sm:mb-5">
                Safety
              </span>
              <h2 id="safety-heading" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#FFFBF5] tracking-tight leading-[0.9] text-balance">
                Designed For{" "}
                <span className="text-[#E8735A]">Mouthy</span>{" "}
                Moments
              </h2>
              <p className="mt-4 sm:mt-5 text-[#FFFBF5]/50 text-base sm:text-lg max-w-md text-pretty">
                Toddlers explore with their mouths. We designed around that reality — not against it.
              </p>
            </motion.div>

            <motion.ul
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-4 sm:space-y-5"
              role="list"
              aria-label="Safety features"
            >
              {callouts.map((item) => (
                <motion.li
                  key={item.title}
                  variants={itemVariants}
                  className="flex gap-3 sm:gap-4 items-start group"
                >
                  <motion.div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl ${item.bg} flex items-center justify-center flex-shrink-0`}
                    whileHover={prefersReducedMotion ? {} : { scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <item.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${item.color}`} strokeWidth={1.75} aria-hidden="true" />
                  </motion.div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <h3 className="text-[#FFFBF5] font-bold text-sm sm:text-base">{item.title}</h3>
                      {item.placeholder && (
                        <span className="text-[8px] sm:text-[9px] font-mono bg-[#EDD97A]/20 text-[#EDD97A] px-2 py-0.5 rounded-full uppercase tracking-widest">
                          Placeholder
                        </span>
                      )}
                    </div>
                    <p className="text-[#FFFBF5]/50 text-xs sm:text-sm leading-relaxed text-pretty">{item.description}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Right column — certification badges + important note */}
          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.5, delay: 0.15 }}
            className="lg:pt-20"
          >
            <div className="rounded-2xl sm:rounded-3xl border border-[#FFFBF5]/10 bg-[#FFFBF5]/5 p-5 sm:p-8 space-y-6 sm:space-y-8">

              {/* Cert badges */}
              <div>
                <p className="text-[#FFFBF5]/40 text-[10px] sm:text-xs font-mono uppercase tracking-widest mb-4 sm:mb-5">
                  Certifications — placeholders only, not yet certified
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3" role="list" aria-label="Certification placeholders">
                  <CertBadge label="ASTM F963" note="Placeholder" />
                  <CertBadge label="CPSC Compliant" note="Placeholder" />
                  <CertBadge label="GRAS Listed" note="Placeholder" />
                  <CertBadge label="CPSIA Cert." note="Placeholder" />
                </div>
                <p className="mt-3 sm:mt-4 text-[#FFFBF5]/25 text-[9px] sm:text-[10px] font-mono leading-snug">
                  Certification targets are aspirational. Product is pre-launch and has not yet received formal third-party testing or regulatory clearance.
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-[#FFFBF5]/10" aria-hidden="true" />

              {/* Important note card */}
              <motion.div
                className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-[#E8735A]/10 border border-[#E8735A]/20"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: prefersReducedMotion ? 0 : 0.4 }}
              >
                <p className="text-[#FFFBF5]/90 text-xs sm:text-sm leading-relaxed">
                  <span className="text-[#E8735A] font-bold block mb-1">Important note</span>
                  Toddler Tape is a sensory play product. It is designed with mouth-contact in mind but is{" "}
                  <em>not</em> a food, supplement, or medical device. Always supervise children under 4 during use.
                </p>
              </motion.div>

              {/* Dissolve visual */}
              <div>
                <p className="text-[#FFFBF5]/40 text-[10px] sm:text-xs font-mono uppercase tracking-widest mb-3 sm:mb-4">Dissolve target</p>
                <div className="relative h-2.5 sm:h-3 w-full rounded-full bg-[#FFFBF5]/10 overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full bg-[#5BBFB5]"
                    initial={{ width: 0 }}
                    whileInView={{ width: "72%" }}
                    viewport={{ once: true }}
                    transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 1, delay: 0.3, ease: "easeOut" }}
                    aria-label="Dissolve progress: approximately 72%"
                  />
                </div>
                <div className="flex justify-between mt-2 text-[#FFFBF5]/30 text-[9px] sm:text-[10px] font-mono">
                  <span>0 sec</span>
                  <span className="text-[#5BBFB5]/70">Target: dissolves within ~30s when wet</span>
                  <span>60 sec</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Perforated divider at bottom */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-md px-6">
        <div className="perforated-divider text-[#FFFBF5]" aria-hidden="true" />
      </div>
    </section>
  )
}
