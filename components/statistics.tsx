"use client"

import { useRef, useEffect } from "react"
import { motion, useInView, useSpring, useTransform, Variants } from "framer-motion"
import Image from "next/image"

// --- DATA ---
const stats = [
  { 
    id: 1, 
    value: 15, 
    suffix: "+", 
    label: "Years of experience", 
    image: "/review 1.svg" 
  },
  { 
    id: 2, 
    value: 98, 
    suffix: "%", 
    label: "Happy clients", 
    image: "/review 2.svg" 
  },
  { 
    id: 3, 
    value: 540, 
    suffix: "+", 
    label: "Properties sold", 
    image: "/review 3.svg" 
  },
]

// --- COUNTER COMPONENT ---
const Counter = ({ value, inView }: { value: number; inView: boolean }) => {
  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 20,
    duration: 2
  })
  
  const displayValue = useTransform(springValue, (latest) => Math.round(latest))

  useEffect(() => {
    if (inView) {
      springValue.set(value)
    }
  }, [inView, value, springValue])

  return <motion.span>{displayValue}</motion.span>
}

// --- MAIN COMPONENT ---
export default function Statistics() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  }

  return (
    // CHANGED: bg-[#0B0B0B] -> bg-[#f3efe9] (Light Beige)
    // CHANGED: border-white/5 -> border-black/5 (Dark border for contrast)
    <section className="bg-[#f3efe9] py-24 md:py-32 px-6 border-t border-black/5 overflow-hidden">
      <motion.div 
        ref={containerRef}
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16 md:gap-y-0 relative">
          
          {stats.map((stat, index) => (
            <motion.div 
              key={stat.id} 
              variants={itemVariants}
              className="relative group px-4 md:px-8"
            >
              
              {/* Vertical Divider (Desktop) */}
              {/* CHANGED: via-white/10 -> via-black/10 */}
              {index !== 0 && (
                 <motion.div 
                   initial={{ scaleY: 0 }}
                   animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                   transition={{ duration: 1, delay: 0.5 }}
                   className="hidden md:block absolute left-0 top-4 bottom-4 w-[1px] bg-gradient-to-b from-transparent via-black/10 to-transparent origin-top" 
                 />
              )}
              
              {/* Horizontal Divider (Mobile) */}
              {/* CHANGED: via-white/10 -> via-black/10 */}
              {index !== 0 && (
                 <div className="block md:hidden absolute -top-8 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-black/10 to-transparent" />
              )}

              {/* Card Content */}
              <div className="flex items-center justify-between gap-6">
                
                {/* Text Side */}
                <div className="flex flex-col">
                    <div className="flex items-start gap-1">
                        {/* CHANGED: text-white -> text-[#0B0B0B] (Dark text) */}
                        <span className="text-6xl lg:text-7xl font-light text-[#0B0B0B] tracking-tighter tabular-nums leading-none">
                           <Counter value={stat.value} inView={isInView} />
                        </span>
                        {/* Accent color kept the same as it looks good on beige */}
                        <span className="text-2xl lg:text-3xl font-light text-[#C19B76] mt-1">
                           {stat.suffix}
                        </span>
                    </div>
                    {/* CHANGED: text-white/40 -> text-black/40 (Darker opacity text) */}
                    <span className="text-black/40 text-xs lg:text-sm uppercase tracking-[0.2em] font-medium mt-4 group-hover:text-black/70 transition-colors duration-300">
                        {stat.label}
                    </span>
                </div>

                {/* Image Side */}
                <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0">
                    {/* Decorative glow behind image */}
                    <div className="absolute inset-0 bg-[#C19B76] blur-[40px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-full" />
                    
                    <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="relative w-full h-full"
                    >
                         <Image 
                            src={stat.image} 
                            alt={stat.label}
                            width={96}
                            height={96}
                            // Kept grayscale, but ensured it looks okay on light bg
                            className="object-contain drop-shadow-xl opacity-70 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                        />
                    </motion.div>
                </div>

              </div>
            </motion.div>
          ))}

        </div>
      </motion.div>
    </section>
  )
}