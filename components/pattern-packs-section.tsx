"use client"

import { motion, useInView, AnimatePresence, useReducedMotion } from "framer-motion"
import { useRef, useState } from "react"
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react"
import { PRODUCTS, formatPrice, type Product } from "@/lib/products"
import { CheckoutModal, useCheckout } from "@/components/checkout"

// Filter to just the pattern packs (not starter pack)
const patternPacks = PRODUCTS.filter(p => p.id !== 'starter-pack')

// Tape Roll SVG Component
function TapeRollVisual({ colors, pattern, isHovered }: { colors: string[]; pattern: string; isHovered: boolean }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="relative w-full aspect-square flex items-center justify-center">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Outer roll */}
        <circle
          cx="100"
          cy="100"
          r="85"
          fill="none"
          stroke={colors[0]}
          strokeWidth="30"
          className="transition-all duration-300"
        />
        {/* Color rings */}
        {colors.slice(1, 5).map((color, i) => (
          <motion.circle
            key={i}
            cx="100"
            cy="100"
            r={70 - i * 12}
            fill="none"
            stroke={color}
            strokeWidth="10"
            initial={{ pathLength: 0.9 }}
            animate={prefersReducedMotion ? {} : { 
              pathLength: isHovered ? 1 : 0.9,
              rotate: isHovered ? 10 : 0 
            }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          />
        ))}
        {/* Inner cardboard core */}
        <circle cx="100" cy="100" r="25" fill="#D4A574" />
        <circle cx="100" cy="100" r="20" fill="#C4956A" />
        <circle cx="100" cy="100" r="12" fill="#8B7355" />

        {/* Pattern overlay based on type */}
        {pattern === "dots" && (
          <g opacity="0.3">
            {[...Array(8)].map((_, i) => (
              <circle
                key={i}
                cx={100 + Math.cos((i * Math.PI) / 4) * 60}
                cy={100 + Math.sin((i * Math.PI) / 4) * 60}
                r="6"
                fill="white"
              />
            ))}
          </g>
        )}
        {pattern === "shapes" && (
          <g opacity="0.25">
            <rect x="70" y="50" width="12" height="12" fill="white" transform="rotate(15 76 56)" />
            <polygon points="130,45 138,60 122,60" fill="white" />
            <circle cx="55" cy="100" r="6" fill="white" />
            <rect x="140" y="95" width="10" height="10" fill="white" transform="rotate(-10 145 100)" />
          </g>
        )}
      </svg>

      {/* Floating torn tape piece */}
      <motion.div
        className="absolute -top-2 -right-2"
        animate={prefersReducedMotion ? {} : {
          y: isHovered ? -8 : 0,
          rotate: isHovered ? 15 : 8,
        }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <svg width="50" height="30" viewBox="0 0 50 30">
          <path
            d={`M5,5 Q10,2 15,5 L45,8 Q48,15 45,22 L15,25 Q10,28 5,25 Q2,15 5,5`}
            fill={colors[0]}
            opacity="0.9"
          />
          {/* Torn edge */}
          <path
            d="M5,5 L3,8 L6,10 L2,14 L5,16 L3,20 L5,25"
            fill="none"
            stroke={colors[0]}
            strokeWidth="2"
          />
        </svg>
      </motion.div>
    </div>
  )
}

// Pattern Swatches Component
function PatternSwatches({ colors, isHovered }: { colors: string[]; isHovered: boolean }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="flex gap-1.5 justify-center mt-4">
      {colors.map((color, i) => (
        <motion.div
          key={i}
          className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
          style={{ backgroundColor: color }}
          initial={{ scale: 1 }}
          animate={prefersReducedMotion ? {} : { 
            scale: isHovered ? 1.15 : 1,
            y: isHovered ? -4 : 0 
          }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            delay: i * 0.03 
          }}
        />
      ))}
    </div>
  )
}

// Product Card Component
function ProductCard({ 
  product, 
  index, 
  isHovered, 
  onHover, 
  onAddToCart 
}: { 
  product: Product
  index: number
  isHovered: boolean
  onHover: (id: string | null) => void
  onAddToCart: (id: string) => void
}) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onMouseEnter={() => onHover(product.id)}
      onMouseLeave={() => onHover(null)}
      className="relative"
    >
      <motion.div
        className="bg-white rounded-3xl p-6 shadow-sm border border-[#1A1A1A]/5 relative overflow-hidden h-full"
        whileHover={prefersReducedMotion ? {} : { 
          y: -8, 
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)" 
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Popular Badge */}
        {product.popular && (
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-4 right-4 bg-[#E8735A] text-white text-xs font-bold px-3 py-1 rounded-full z-10"
          >
            Popular
          </motion.div>
        )}

        {/* Product Visual */}
        <div className="mb-4">
          <TapeRollVisual
            colors={product.colors}
            pattern={product.pattern}
            isHovered={isHovered}
          />
        </div>

        {/* Pattern Swatches */}
        <PatternSwatches 
          colors={product.colors} 
          isHovered={isHovered} 
        />

        {/* Product Info */}
        <div className="mt-5 text-center">
          <h3 className="text-xl font-black text-[#1A1A1A] mb-1">
            {product.name}
          </h3>
          <p className="text-[#1A1A1A]/60 text-sm mb-4 leading-relaxed">
            {product.description}
          </p>

          {/* Price */}
          <div className="flex items-baseline justify-center gap-2 mb-4">
            <span className="text-2xl font-black text-[#1A1A1A]">
              {formatPrice(product.priceInCents)}
            </span>
            <span className="text-sm text-[#1A1A1A]/50">
              6 rolls
            </span>
          </div>

          {/* Add to Cart Button */}
          <motion.button
            onClick={() => onAddToCart(product.id)}
            className="w-full bg-[#1A1A1A] text-[#FFFBF5] py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8735A] focus-visible:ring-offset-2"
            whileHover={prefersReducedMotion ? {} : { 
              scale: 1.02, 
              backgroundColor: "#E8735A" 
            }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
          >
            <ShoppingBag className="w-4 h-4" />
            Add to Cart
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function PatternPacksSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const prefersReducedMotion = useReducedMotion()
  
  // Checkout state
  const { isOpen, productId, openCheckout, closeCheckout } = useCheckout()

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % patternPacks.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + patternPacks.length) % patternPacks.length)
  }

  // Get visible cards (show 4 on desktop)
  const getVisiblePacks = () => {
    const visible = []
    for (let i = 0; i < 4; i++) {
      visible.push(patternPacks[(currentIndex + i) % patternPacks.length])
    }
    return visible
  }

  return (
    <section id="packs" ref={ref} className="py-16 sm:py-24 bg-[#FFFBF5] relative overflow-hidden">
      {/* Decorative tape strips */}
      <div className="absolute top-16 left-8 w-32 h-4 bg-[#4ECDC4]/20 rounded-sm rotate-12 hidden sm:block" />
      <div className="absolute top-32 right-12 w-24 h-3 bg-[#E8735A]/20 rounded-sm -rotate-6 hidden sm:block" />
      <div className="absolute bottom-24 left-16 w-20 h-3 bg-[#F7DC6F]/30 rounded-sm rotate-3 hidden sm:block" />
      <div className="absolute bottom-40 right-20 w-28 h-4 bg-[#B19CD9]/20 rounded-sm -rotate-12 hidden sm:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block bg-[#1A1A1A] text-[#FFFBF5] px-4 py-1.5 rounded-full text-xs font-bold tracking-wider mb-4">
            PATTERN PACKS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-[#1A1A1A] tracking-tight leading-[0.95] text-balance">
            Pick Their Favorite
            <span className="text-[#E8735A]"> Rip</span>
          </h2>
          <p className="mt-4 text-[#1A1A1A]/60 max-w-xl mx-auto text-base sm:text-lg">
            Each pack includes 6 rolls of colorful, dissolvable tape in themed patterns.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows - hidden on mobile */}
          <motion.button
            onClick={prevSlide}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center border border-[#1A1A1A]/10 hover:bg-[#E8735A] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8735A]"
            whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
            aria-label="Previous pack"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          <motion.button
            onClick={nextSlide}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center border border-[#1A1A1A]/10 hover:bg-[#E8735A] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8735A]"
            whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
            aria-label="Next pack"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>

          {/* Cards Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:px-8"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            <AnimatePresence mode="wait">
              {getVisiblePacks().map((pack, index) => (
                <ProductCard
                  key={`${pack.id}-${currentIndex}-${index}`}
                  product={pack}
                  index={index}
                  isHovered={hoveredCard === pack.id}
                  onHover={setHoveredCard}
                  onAddToCart={openCheckout}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Carousel Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {patternPacks.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8735A] focus-visible:ring-offset-2 ${
                  index === currentIndex
                    ? "bg-[#E8735A] w-8"
                    : "bg-[#1A1A1A]/20 hover:bg-[#1A1A1A]/40"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-10 sm:mt-12"
        >
          <motion.button
            className="border-2 border-[#1A1A1A] text-[#1A1A1A] px-6 sm:px-8 py-3 rounded-full font-bold text-sm tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8735A] focus-visible:ring-offset-2"
            whileHover={prefersReducedMotion ? {} : { 
              scale: 1.02, 
              backgroundColor: "#1A1A1A", 
              color: "#FFFBF5" 
            }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
          >
            View All Patterns
          </motion.button>
        </motion.div>
      </div>

      {/* Checkout Modal */}
      {productId && (
        <CheckoutModal 
          productId={productId} 
          isOpen={isOpen} 
          onClose={closeCheckout} 
        />
      )}
    </section>
  )
}
