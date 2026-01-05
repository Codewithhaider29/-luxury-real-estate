"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"

interface GalleryItem {
  id: number
  image: string
  title: string
  category: string
  location: string
  cols: number // span-1 or span-2
  rows: number
}

const galleryItems: GalleryItem[] = [
  { id: 1, image: "/gallery-1.webp", title: "Grand Foyer", category: "Interior", location: "New York", cols: 2, rows: 2 },
  { id: 2, image: "/gallery-2.webp", title: "Master Suite", category: "Living", location: "London", cols: 1, rows: 1 },
  { id: 3, image: "/gallery-3.webp", title: "Chef's Kitchen", category: "Service", location: "Paris", cols: 1, rows: 2 },
  { id: 4, image: "/gallery-4.webp", title: "Infinity Pool", category: "Outdoor", location: "Dubai", cols: 1, rows: 1 },
  { id: 5, image: "/gallery-5.webp", title: "Formal Living", category: "Interior", location: "Milan", cols: 2, rows: 1 },
  { id: 6, image: "/gallery-6.webp", title: "Spa & Wellness", category: "Bath", location: "Tokyo", cols: 1, rows: 1 },
]

export default function GalleryGrid() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section className="bg-white py-24 px-6 md:px-12 border-t border-[#F0F0F0] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
              <div className="flex items-center gap-3">
                 <div className="w-8 h-[1px] bg-[#C19B76]"></div>
                 <span className="text-[#C19B76] text-xs font-bold tracking-[0.2em] uppercase">Visual Stories</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-light text-[#0B0B0B] leading-[0.9]">
                Curated <span className="font-serif italic text-[#C19B76]">Spaces.</span>
              </h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-md"
          >
             <p className="text-[#666] font-light text-sm leading-relaxed text-right md:text-left border-l-2 border-[#F0F0F0] pl-6">
                A glimpse into the extraordinary. Every angle captures the essence of refined living and architectural mastery, designed for those who appreciate the finer details.
             </p>
          </motion.div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[300px]">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
              className={`relative group rounded-sm overflow-hidden cursor-pointer
                ${item.cols === 2 ? "md:col-span-2" : "md:col-span-1"}
                ${item.rows === 2 ? "md:row-span-2" : "md:row-span-1"}
              `}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              
              {/* Image Container */}
              <div className="relative w-full h-full overflow-hidden">
                {/* Overlay that darkens non-hovered items */}
                <div 
                    className={`absolute inset-0 z-20 bg-white/60 transition-opacity duration-500 pointer-events-none
                    ${hoveredId !== null && hoveredId !== item.id ? "opacity-100" : "opacity-0"}`} 
                />

                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500 z-10" />

                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-[1.5s] ease-in-out group-hover:scale-110"
                />
              </div>

              {/* Hover Interactions */}
              <div className="absolute inset-0 z-30 p-8 flex flex-col justify-between">
                
                {/* Top Right Icon */}
                <div className="self-end">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out shadow-lg">
                        <ArrowUpRight className="w-5 h-5 text-[#0B0B0B]" />
                    </div>
                </div>

                {/* Bottom Content */}
                <div>
                   <div className="overflow-hidden">
                      <span className="inline-block text-white/80 text-xs font-medium tracking-[0.2em] uppercase translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                         {item.category} • {item.location}
                      </span>
                   </div>
                   <div className="overflow-hidden mt-2">
                      <h3 className="text-white text-3xl font-light tracking-wide translate-y-12 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                         {item.title}
                      </h3>
                   </div>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-16 flex justify-center">
             <button className="px-10 py-4 border border-[#E5E5E5] text-[#0B0B0B] text-sm tracking-widest uppercase hover:bg-[#0B0B0B] hover:text-white transition-colors duration-300">
                View Full Gallery
             </button>
        </div>

      </div>
    </section>
  )
}