"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { ArrowRight, MapPin, Home, Shield, Leaf } from "lucide-react"
import Image from "next/image"

export default function AboutSection() {
  const containerRef = useRef(null)
  
  // Parallax Logic using Scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Transform values for parallax effect
  const yBack = useTransform(scrollYProgress, [0, 1], [100, -100])
  const yFront = useTransform(scrollYProgress, [0, 1], [150, -150])

  return (
    <section className="bg-white py-24 lg:py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* --- TOP ROW: Content & Layered Images --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32">
          
          {/* Left: Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8 z-10"
          >
             <div className="flex items-center gap-3">
                <div className="h-[1px] w-12 bg-[#C19B76]"></div>
                <span className="text-[#C19B76] text-sm font-bold tracking-[0.2em] uppercase">
                  Who we are
                </span>
             </div>

            <h2 className="text-5xl md:text-6xl font-light text-[#0B0B0B] leading-[1.1] text-balance">
              Curating homes for the <span className="text-[#C19B76] font-serif italic">discerning few.</span>
            </h2>
            
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-[#333]">
                Discover carefully chosen residences crafted to suit your lifestyle needs.
              </h3>
              <p className="text-[#666] font-light leading-relaxed text-lg max-w-lg">
                We believe a home is more than just a place to live—it's a canvas for your life's best moments. From modern city penthouses to tranquil countryside estates, every property in our collection is selected for its architectural integrity and enduring value.
              </p>
            </div>

            <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 px-8 py-4 bg-[#0B0B0B] text-white rounded-sm hover:bg-[#C19B76] transition-colors duration-300 font-medium text-sm tracking-wide group"
            >
              Read our story
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          {/* Right: Parallax Images Container */}
          <div ref={containerRef} className="relative h-[500px] lg:h-[700px] w-full hidden lg:block">
            
            {/* Back Image (Larger) */}
            <motion.div 
              style={{ y: yBack }}
              className="absolute top-0 right-0 w-[85%] h-[550px] rounded-sm overflow-hidden"
            >
               {/* Decorative Gradient Overlay */}
               <div className="absolute inset-0 bg-black/10 z-10" />
               <div className="relative w-full h-full">
                  <Image 
                      src="/about-2.webp" 
                      alt="Architecture"
                      fill
                      className="object-cover"
                  />
               </div>
            </motion.div>

            {/* Front Image (Smaller/Floating) */}
            <motion.div 
              style={{ y: yFront }}
              className="absolute bottom-20 left-0 w-[55%] h-[400px] rounded-sm overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-8 border-white z-20"
            >
                <div className="relative w-full h-full">
                    <Image 
                        src="/about-1.webp" 
                        alt="Interior Detail"
                        fill
                        className="object-cover"
                    />
                </div>
            </motion.div>
            
            {/* Decorative Elements */}
            <div className="absolute top-10 right-[-20px] w-32 h-32 border border-[#C19B76]/20 rounded-full -z-10"></div>
          </div>
          
          {/* Mobile Only Image Stack */}
          <div className="lg:hidden w-full relative space-y-4">
              <div className="w-full h-64 relative rounded-lg overflow-hidden">
                 <Image src="/about-2.webp" alt="Architecture" fill className="object-cover" />
              </div>
              <div className="w-[90%] h-64 relative rounded-lg overflow-hidden ml-auto shadow-xl">
                 <Image src="/about-1.webp" alt="Interior" fill className="object-cover" />
              </div>
          </div>

        </div>

        {/* --- BOTTOM ROW: Features Grid --- */}
        <FeaturesGrid />

      </div>
    </section>
  )
}

function FeaturesGrid() {
    const features = [
        { icon: MapPin, title: "Prime Location", desc: "Situated in the most coveted districts." },
        { icon: Home, title: "Spacious Interiors", desc: "Open layouts designed for modern living." },
        { icon: Shield, title: "Private Security", desc: "24/7 surveillance for your peace of mind." },
        { icon: Leaf, title: "Eco Friendly", desc: "Sustainable materials and energy efficiency." },
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 border-t border-[#EEE] pt-16">
          {features.map((feature, index) => (
            <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group cursor-pointer"
            >
              <div className="mb-6 relative">
                 {/* Icon Background Blob */}
                 <div className="absolute -inset-2 bg-[#F5F5F5] rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out origin-center" />
                 
                 <div className="relative w-14 h-14 flex items-center justify-center border border-[#E5E5E5] bg-white text-[#0B0B0B] group-hover:border-[#C19B76] group-hover:bg-[#C19B76] group-hover:text-white transition-all duration-300 shadow-sm">
                    <feature.icon strokeWidth={1.5} className="w-6 h-6" />
                 </div>
              </div>
              
              <h4 className="text-[#0B0B0B] text-lg font-medium mb-3 group-hover:text-[#C19B76] transition-colors">
                {feature.title}
              </h4>
              <p className="text-[#666] text-sm leading-relaxed max-w-[240px]">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
    )
}