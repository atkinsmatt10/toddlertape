"use client"

import { motion, useInView, useReducedMotion } from "framer-motion"
import type { Variants } from "framer-motion"
import { useRef } from "react"
import { Star } from "lucide-react"

const reviews = [
  {
    name: "Priya M.",
    handle: "@priyamom2",
    role: "Mom of two, ages 2 and 4",
    rating: 5,
    text: "We were at a 45-minute wait at dinner and I handed my son a strip. He was entertained for 20 minutes straight. No mess, no meltdown. I almost cried.",
    avatar: "PM",
    color: "bg-[#E8735A]",
    verified: true,
  },
  {
    name: "James O.",
    handle: "@dadofdyla",
    role: "Stay-at-home dad",
    rating: 5,
    text: "My daughter puts everything in her mouth. Everything. This is the first craft-adjacent thing I've let her near without standing right next to her the whole time.",
    avatar: "JO",
    color: "bg-[#5BBFB5]",
    verified: true,
  },
  {
    name: "Sofia L.",
    handle: "@sofiaandkids",
    role: "Mom of three under five",
    rating: 5,
    text: "The Rainbow Rips pack is legitimately beautiful. She uses it for art projects, I use it as a five-minute reset between tasks. It's become a household item.",
    avatar: "SL",
    color: "bg-[#C4A8D4]",
    verified: true,
  },
  {
    name: "Marcus T.",
    handle: "@marcust_dad",
    role: "Dad, beta tester",
    rating: 5,
    text: "I didn't expect to be the kind of person who reviews toddler tape on the internet, but honestly — this thing earned it. Flight from Newark to LAX. Zero tantrums.",
    avatar: "MT",
    color: "bg-[#EDD97A]",
    verified: true,
  },
  {
    name: "Rachel K.",
    handle: "@rk_parentlife",
    role: "Occupational therapist & mom",
    rating: 5,
    text: "The tearing motion is genuinely great for fine motor development. I started recommending it to parents in my practice because I couldn't find anything else quite like it.",
    avatar: "RK",
    color: "bg-[#7ECFB3]",
    verified: true,
  },
  {
    name: "Leah V.",
    handle: "@leahvfamily",
    role: "Mom, high chair survivor",
    rating: 5,
    text: "High chair meals used to be a negotiation. Now I put a strip of Dino Dots on the tray and eat my food while it's actually hot. That alone is worth it.",
    avatar: "LV",
    color: "bg-[#E8735A]",
    verified: true,
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${i < count ? "fill-[#EDD97A] text-[#EDD97A]" : "text-[#1A1A1A]/20"}`}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

export function ReviewsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const prefersReducedMotion = useReducedMotion()

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.08 },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 90, damping: 18 },
    },
  }

  return (
    <section id="reviews" ref={ref} className="py-16 sm:py-24 bg-[#FFFBF5] relative overflow-hidden scroll-mt-24" aria-labelledby="reviews-heading">
      {/* Decorative strips */}
      <motion.div
        className="absolute top-12 right-8 sm:right-10 w-16 sm:w-20 h-2.5 sm:h-3 bg-[#EDD97A]/40 rounded-sm rotate-5 hidden sm:block"
        animate={prefersReducedMotion ? {} : { x: [0, -4, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-16 left-8 sm:left-10 w-24 sm:w-28 h-3 sm:h-4 bg-[#E8735A]/25 rounded-sm -rotate-3 hidden sm:block"
        animate={prefersReducedMotion ? {} : { x: [0, 6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.5 }}
          className="text-center mb-5 sm:mb-6"
        >
          <span className="inline-block bg-[#EDD97A]/30 text-[#1A1A1A] px-4 py-1.5 rounded-full text-xs font-mono tracking-widest mb-4 uppercase">
            Reviews
          </span>
          <h2 id="reviews-heading" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#1A1A1A] tracking-tight leading-[0.95]">
            Parents Are
            <span className="text-[#E8735A]"> Talking</span>
          </h2>
        </motion.div>

        {/* Aggregate rating */}
        <motion.div
          initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.15 }}
          className="flex items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-14"
        >
          <div className="flex gap-0.5 sm:gap-1" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-[#EDD97A] text-[#EDD97A]" />
            ))}
          </div>
          <span className="text-[#1A1A1A] font-black text-lg sm:text-xl">4.9</span>
          <span className="text-[#1A1A1A]/40 text-xs sm:text-sm font-mono">from 847 beta reviews</span>
        </motion.div>

        {/* Review cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
          role="list"
          aria-label="Customer reviews"
        >
          {reviews.map((review) => (
            <motion.article
              key={review.name}
              variants={itemVariants}
              whileHover={prefersReducedMotion ? {} : { y: -3 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-[#1A1A1A]/5 flex flex-col gap-3 sm:gap-4"
              role="listitem"
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 ${review.color} rounded-full flex items-center justify-center text-white font-black text-[10px] sm:text-xs flex-shrink-0`}
                    aria-hidden="true"
                  >
                    {review.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-[#1A1A1A] text-xs sm:text-sm leading-none">{review.name}</h3>
                      {review.verified && (
                        <span className="text-[#5BBFB5]" title="Verified beta tester" aria-label="Verified beta tester">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
                            <path d="M6 0l1.5 2.5 3-.5-1 2.8 2 2.2-2.8.5L6 10 4.3 7.5 1.5 7l2-2.2-1-2.8 3 .5z" />
                          </svg>
                        </span>
                      )}
                    </div>
                    <p className="text-[#1A1A1A]/40 text-[10px] sm:text-xs font-mono mt-0.5">{review.role}</p>
                  </div>
                </div>
                <StarRating count={review.rating} />
              </div>

              {/* Review text */}
              <p className="text-[#1A1A1A]/70 text-xs sm:text-sm leading-relaxed flex-1">
                {review.text}
              </p>

              {/* Handle */}
              <p className="text-[#1A1A1A]/30 text-[10px] sm:text-xs font-mono">{review.handle}</p>
            </motion.article>
          ))}
        </motion.div>

        {/* Bottom trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.4 }}
          className="text-center text-[#1A1A1A]/40 text-[10px] sm:text-xs font-mono mt-8 sm:mt-10"
        >
          All reviews are from verified beta testers. Product not yet commercially available.
        </motion.p>
      </div>
    </section>
  )
}
