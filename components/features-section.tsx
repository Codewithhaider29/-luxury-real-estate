"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const features = [
  {
    id: 1,
    title: "Business Center",
    description: "Access modern business centers with meeting rooms, fast connectivity, and professional amenities designed to boost productivity.",
    top: "20%",
    left: "25%"
  },
  {
    id: 2,
    title: "Grocery & Essentials",
    description: "On-site essentials store ensures quick access to daily needs and fresh produce without leaving your community.",
    top: "60%",
    left: "15%"
  },
  {
    id: 3,
    title: "Transport Links",
    description: "Benefit from excellent transport links and seamless connectivity, ensuring quick access to major urban hubs.",
    top: "35%",
    left: "55%"
  },
  {
    id: 4,
    title: "Fine Dining",
    description: "A vibrant selection of cafés and restaurants nearby, offering diverse cuisines and perfect social settings.",
    top: "82%",
    left: "40%"
  },
  {
    id: 5,
    title: "Wellness Zone",
    description: "Rejuvenate in our exclusive wellness zone, featuring state-of-the-art fitness and tranquil spa spaces.",
    top: "70%",
    left: "75%"
  }
]

export default function NeighborhoodMap() {
  const [activeId, setActiveId] = useState(1)

  return (
    <section className="bg-white py-24 px-6 md:px-12 border-t border-[#F0F0F0]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center mb-20 space-y-4"
        >
          <div className="w-12 h-[2px] bg-[#C19B76] mb-2" />
          <h2 className="text-4xl md:text-6xl font-light text-[#0B0B0B] tracking-tight">
            Convenience at your <span className="italic font-serif text-[#C19B76]">doorstep</span>
          </h2>
          <p className="text-[#666] font-light max-w-xl text-sm md:text-base leading-relaxed">
            Strategically located to provide the perfect balance between urban energy and residential serenity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* --- LEFT: Map Interface --- */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-square md:aspect-[4/3] rounded-sm overflow-hidden bg-[#F9F9F9] shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
          >
            <Image 
              src="/feat.png" 
              alt="Neighborhood Map" 
              fill
              className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-[2s]"
            />

            {/* Markers */}
            {features.map((feature) => (
              <button
                key={feature.id}
                onClick={() => setActiveId(feature.id)}
                className="absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none z-30"
                style={{ top: feature.top, left: feature.left }}
              >
                <div className="relative group">
                  {/* Pulse Animation for Active Pin */}
                  {activeId === feature.id && (
                    <motion.div 
                        layoutId="pulse"
                        className="absolute inset-0 bg-[#C19B76]/40 rounded-full"
                        animate={{ scale: [1, 2.5], opacity: [0.7, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                  
                  {/* The Pin Body */}
                  <motion.div 
                    animate={{ 
                        scale: activeId === feature.id ? 1.2 : 1,
                        backgroundColor: activeId === feature.id ? "#0B0B0B" : "rgba(255,255,255,0.9)" 
                    }}
                    className={`relative w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 transition-colors duration-300 ${
                        activeId === feature.id ? "border-[#C19B76]" : "border-white"
                    }`}
                  >
                    <span className={`text-xs font-bold ${activeId === feature.id ? "text-white" : "text-[#0B0B0B]"}`}>
                        {feature.id}
                    </span>
                  </motion.div>
                </div>
              </button>
            ))}
          </motion.div>

          {/* --- RIGHT: Accordion List --- */}
<div className="divide-y divide-[#F0F0F0]">
  {features.map((feature) => (
    <div key={feature.id} className="relative">
      {/* Main Trigger Button */}
      <button
        onClick={() => setActiveId(feature.id)}
        className="w-full py-8 flex items-start gap-8 text-left transition-all group"
      >
        <span className={`text-sm font-bold tracking-tighter pt-1 transition-colors duration-300 ${
          activeId === feature.id ? "text-[#C19B76]" : "text-[#CCC]"
        }`}>
          0{feature.id}
        </span>

        <div className="flex-1">
          <h3 className={`text-xl md:text-2xl font-normal transition-colors duration-300 ${
            activeId === feature.id ? "text-[#0B0B0B]" : "text-[#999] group-hover:text-[#666]"
          }`}>
            {feature.title}
          </h3>

          <AnimatePresence>
            {activeId === feature.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              >
                <div className="overflow-hidden">
                  <p className="pt-4 text-[#666] text-sm md:text-base leading-relaxed max-w-md font-light">
                    {feature.description}
                  </p>
                  
                  {/* CHANGED: motion.button to motion.div to avoid nested buttons */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 text-[#C19B76] text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all cursor-pointer"
                  >
                    Explore Location
                    <div className="w-4 h-[1px] bg-[#C19B76]" />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </button>
    </div>
  ))}
</div>

        </div>
      </div>
    </section>
  )
}