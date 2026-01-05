"use client"

import { useState, useEffect, useCallback } from "react"
import { ArrowRight } from "lucide-react"
import { motion, AnimatePresence, Variants } from "framer-motion"

// --- DATA ---
const SLIDES = [
  {
    id: 1,
    image: "/bg-image-1.webp",
    subtext: "Modern Aesthetics",
    headlinePart1: "Discover refined",
    headlinePart2: "Living Spaces.",
    description: "Experience elevated lifestyle through elegant urban homes curated with meticulous attention to detail and architectural excellence."
  },
  {
    id: 2,
    image: "/bg-image-2.webp",
    subtext: "Urban Tranquility",
    headlinePart1: "Experience true",
    headlinePart2: "Serenity & Calm.",
    description: "Escape the city noise without leaving the city. Our spaces are designed to provide a peaceful sanctuary amidst the urban rush."
  },
  {
    id: 3,
    image: "/bg-image-3.webp",
    subtext: "Architectural Excellence",
    headlinePart1: "Embrace modern",
    headlinePart2: "Design Vision.",
    description: "Where cutting-edge geometry meets functional luxury. Every corner is a testament to world-class engineering and thoughtful design."
  },
]

const AUTOPLAY_DURATION = 6000 // Slightly slower for a premium feel

// --- ANIMATION VARIANTS ---

// Variants for the text container to stagger its children
const textContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.4 // Wait for background to start settling
    }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, when: "beforeChildren" }
  }
}

// Variants for individual text items (slide up and fade in)
const textItemVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 80, damping: 20 }
  },
  exit: { y: -20, opacity: 0, transition: { duration: 0.3 } }
}


export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const handleNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length)
  }, [])

  // Autoplay Logic tied to the duration
  useEffect(() => {
    const timer = setTimeout(() => {
      handleNextSlide()
    }, AUTOPLAY_DURATION)

    // Reset timer if user manually clicks next
    return () => clearTimeout(timer)
  }, [currentSlide, handleNextSlide])


  // Calculation for Circle Stroke
  const radius = 36
  const circumference = 2 * Math.PI * radius

  const slideData = SLIDES[currentSlide]

  return (
    <section className="relative w-full h-screen flex flex-col justify-center overflow-hidden bg-[#0B0B0B] font-sans">

      {/* --- BACKGROUND LAYERS (Using AnimatePresence for smooth crossfades) --- */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slideData.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} // Custom cubic-bezier for premium feel
          className="absolute inset-0 z-0"
        >
          {/* The image itself does the slow zoom effect */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${slideData.image}')` }}
            initial={{ scale: 1 }}
            animate={{ scale: 1.08 }}
            transition={{ duration: AUTOPLAY_DURATION / 1000 + 2, ease: "linear" }}
          />
          {/* Gradient overlays for text readability */}
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B]/95 via-[#0B0B0B]/50 to-transparent" />
        </motion.div>
      </AnimatePresence>


      {/* --- CONTENT CONTAINER --- */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 h-full flex flex-col justify-center">
        {/* AnimatePresence ensures old text leaves before new text enters */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide} // Key change triggers the animation
            variants={textContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="max-w-4xl space-y-8 mt-20"
          >

            {/* Subtext Tag */}
            <div className="overflow-hidden">
               <motion.div variants={textItemVariants} className="flex items-center gap-4">
                  <motion.div 
                    initial={{ scaleX: 0, originX: 0 }} 
                    animate={{ scaleX: 1 }} 
                    transition={{ duration: 0.8, delay: 0.5 }} 
                    className="h-[2px] w-12 bg-[#C19B76]" 
                  />
                  <span className="text-[#C19B76] text-sm font-medium tracking-[0.25em] uppercase">
                    {slideData.subtext}
                  </span>
               </motion.div>
            </div>

            {/* Dynamic Headlines */}
            <div className="space-y-0">
              <div className="overflow-hidden">
                <motion.h1 variants={textItemVariants} className="text-5xl md:text-8xl lg:text-9xl font-light text-white leading-[1.1] tracking-tight">
                  {slideData.headlinePart1}
                </motion.h1>
              </div>
              <div className="overflow-hidden pt-2">
                 <motion.h1 variants={textItemVariants} className="text-5xl md:text-8xl lg:text-9xl font-light text-[#C19B76] italic leading-[1.1] tracking-tight">
                   {slideData.headlinePart2}
                 </motion.h1>
              </div>
            </div>

            {/* Dynamic Description */}
            <motion.p variants={textItemVariants} className="text-lg md:text-xl text-white/70 font-light max-w-xl leading-relaxed">
              {slideData.description}
            </motion.p>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* --- RIGHT SIDE: RUNNING BAR / EXPLORE BUTTON --- */}
      <div className="absolute bottom-12 right-6 md:right-16 z-20 flex items-center gap-8">
        <motion.span 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="hidden md:block text-white/60 text-xs tracking-[0.2em] uppercase font-medium"
        >
          Next Property
        </motion.span>

        <motion.button
            onClick={handleNextSlide}
            whileHover="hover"
            initial="initial"
            className="relative w-24 h-24 flex items-center justify-center group focus:outline-none"
        >
          {/* Base grey circle */}
          <svg className="absolute w-full h-full transform -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="1"
              fill="transparent"
            />
          </svg>

          {/* Animated Progress Circle */}
          <svg className="absolute w-full h-full transform -rotate-90">
            <motion.circle
              // Key is vital here: it forces the element to remake itself on slide change, resetting the animation
              key={currentSlide} 
              cx="50%"
              cy="50%"
              r={radius}
              stroke="#C19B76"
              strokeWidth="2"
              fill="transparent"
              strokeDasharray={circumference}
              // Animate from full offset (empty) to 0 offset (full)
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: AUTOPLAY_DURATION / 1000, ease: "linear" }}
              strokeLinecap="round"
            />
          </svg>

          {/* Center Button & Icon */}
          <motion.div 
              variants={{
                  initial: { scale: 1, backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)" },
                  hover: { scale: 1.1, backgroundColor: "#C19B76", borderColor: "#C19B76" }
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute w-16 h-16 backdrop-blur-sm rounded-full flex items-center justify-center border"
           >
              <motion.div variants={{ hover: { x: 4 } }}>
                  <ArrowRight className="text-white w-6 h-6" />
              </motion.div>
          </motion.div>
        </motion.button>

        {/* Slide Counter */}
        <div className="absolute -bottom-10 right-8 flex items-center gap-2 text-sm font-medium font-mono">
           <motion.span 
             key={currentSlide}
             initial={{ opacity: 0, y: -10 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-white"
           >
             0{currentSlide + 1}
           </motion.span>
           <span className="text-[#C19B76] tx-xs">/</span>
           <span className="text-white/40">0{SLIDES.length}</span>
        </div>
      </div>
    </section>
  )
}