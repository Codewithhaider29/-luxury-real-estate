"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          // Hold the 100% state briefly for visual satisfaction
          setTimeout(() => setIsComplete(true), 800) 
          return 100
        }
        // Simulated organic loading speeds
        const increment = prev > 80 ? Math.random() * 2 : Math.random() * 20
        return prev + increment
      })
    }, 120)

    return () => clearInterval(interval)
  }, [])

  const brandName = "BRICKSIO"

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.7, 0, 0.3, 1], delay: 1 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-white"
        >
          {/* Dual Curtain Reveal - Gold & White Layers */}
          <div className="absolute inset-0 flex">
            <motion.div
              initial={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 1.2, ease: [0.87, 0, 0.13, 1], delay: 0.6 }}
              className="w-1/2 h-full bg-[#0B0B0B] z-20"
            />
            <motion.div
              initial={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 1.2, ease: [0.87, 0, 0.13, 1], delay: 0.6 }}
              className="w-1/2 h-full bg-[#0B0B0B] z-20"
            />
          </div>

          {/* Centered Loading Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
            className="relative z-30 flex flex-col items-center gap-12"
          >
            {/* Logo Container */}
            <div className="relative group">
              {/* Spinning Aura */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-8 border border-dashed border-[#C19B76]/20 rounded-full"
              />
              
              {/* Pulsing Outer Ring */}
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-4 border-2 border-[#C19B76] rounded-full"
              />

              {/* Your Logo */}
              <div className="relative w-24 h-24 flex items-center justify-center p-4 bg-[#0B0B0B] rounded-full">
                <img 
                  src="/logo.svg" 
                  alt="Bricksio Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="flex flex-col items-center gap-6">
              {/* Staggered Brand Text Reveal */}
              <div className="flex overflow-hidden">
                {brandName.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ 
                      delay: i * 0.1, 
                      duration: 0.5, 
                      ease: [0.16, 1, 0.3, 1] 
                    }}
                    className="text-white text-xl font-light tracking-[0.4em] inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </div>

              {/* Minimalist Progress Indicator */}
              <div className="w-48 space-y-4">
                <div className="h-[2px] w-full bg-white/5 relative rounded-full overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-[#C19B76] shadow-[0_0_10px_#C19B76]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ type: "spring", damping: 20, stiffness: 40 }}
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <motion.span 
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-[9px] text-[#C19B76] font-bold uppercase tracking-[0.2em]"
                  >
                    Initialising
                  </motion.span>
                  <span className="text-[10px] text-white/40 font-mono tabular-nums">
                    {Math.floor(progress)}%
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}