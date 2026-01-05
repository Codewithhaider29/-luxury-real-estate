"use client"

import { motion, Variants } from "framer-motion"
import Image from "next/image"

const partners = [
  { name: "KingandFay", src: "/01.svg" },
  { name: "Gabriel", src: "/02.svg" },
  { name: "Windler", src: "/03.svg" },
  { name: "Weber", src: "/04.svg" },
  { name: "Leuschke", src: "/05.svg" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.21, 1, 0.36, 1] },
  },
}

export default function Partners() {
  return (
    <section className="bg-white py-24 md:py-32 px-6 border-t border-[#F0F0F0]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-[1px] bg-[#C19B76]" />
            <span className="text-[#C19B76] text-xs font-bold uppercase tracking-[0.3em]">
              Trusted Collaboration
            </span>
            <div className="w-10 h-[1px] bg-[#C19B76]" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-light text-[#0B0B0B] leading-snug">
            Partnering with global leaders to achieve <br className="hidden md:block" />
            <span className="font-serif italic text-[#C19B76]">excellence and lasting success.</span>
          </h2>
        </motion.div>

        {/* Partners Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border-l border-t border-[#F0F0F0]"
        >
          {partners.map((partner) => (
            <motion.div
              key={partner.name}
              variants={itemVariants}
              whileHover={{ backgroundColor: "#FAFAFA" }}
              className="group relative flex flex-col items-center justify-center aspect-square p-8 border-r border-b border-[#F0F0F0] transition-colors duration-500"
            >
              {/* Animated Corner Border */}
              <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#C19B76] transition-all duration-500 group-hover:w-full" />
              
              <div className="relative w-16 h-16 md:w-20 md:h-20 mb-6 transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-110">
                <Image
                  src={partner.src}
                  alt={partner.name}
                  fill
                  className="object-contain p-2"
                />
              </div>

              <motion.div 
                initial={{ opacity: 0.4 }}
                whileHover={{ opacity: 1 }}
                className="text-center"
              >
                <h3 className="text-[10px] md:text-xs font-bold text-[#999] group-hover:text-[#0B0B0B] uppercase tracking-[0.2em] transition-colors duration-300">
                  {partner.name}
                </h3>
              </motion.div>
              
              {/* Subtle accent dot */}
              <div className="absolute bottom-4 right-4 w-1 h-1 bg-[#C19B76] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Tagline */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16 text-[#AAA] text-xs font-light tracking-widest"
        >
          JOIN OVER 50+ LUXURY BRANDS IN OUR NETWORK
        </motion.p>
      </div>
    </section>
  )
}