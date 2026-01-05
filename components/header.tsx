"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronRight, Menu, X } from "lucide-react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent, Variants } from "framer-motion"
import { scrollToSection } from "@/lib/scroll-utils"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  // Optimize scroll performance using Framer's hook
  useMotionValueEvent(scrollY, "change", (latest) => {
    const scrolled = latest > 50
    if (scrolled !== isScrolled) {
      setIsScrolled(scrolled)
    }
  })

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Properties", id: "properties" },
    { label: "Blog", id: "blog" },
  ]

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId)
    setIsMobileMenuOpen(false)
  }

  // Animation Variants
  const headerVariants: Variants = {
    top: { 
      backgroundColor: "rgba(11, 11, 11, 0)", 
      borderColor: "rgba(255, 255, 255, 0)",
      backdropFilter: "blur(0px)" 
    },
    scrolled: { 
      backgroundColor: "rgba(11, 11, 11, 0.8)", 
      borderColor: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(12px)" 
    }
  }

  const mobileMenuVariants: Variants = {
    closed: { opacity: 0, height: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    open: { opacity: 1, height: "auto", transition: { duration: 0.3, ease: "easeInOut" } }
  }

  const linkHoverVariants: Variants = {
    initial: { y: 0 },
    hover: { y: -2, color: "#C19B76" }
  }

  return (
    <motion.header
      initial="top"
      animate={isScrolled ? "scrolled" : "top"}
      variants={headerVariants}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 border-b"
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo Section */}
        <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => handleNavClick("home")}
        >
          <div className="relative w-20 h-10 transition-transform duration-500 group-hover:rotate-180">
            {/* Assuming logo.svg is a vector icon. If it's a full text logo, adjust width/height */}
            <Image 
                src="/logo.svg" 
                alt="Bricksio Logo" 
                fill
                className="object-contain"
            />
          </div>
         
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <motion.button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              initial="initial"
              whileHover="hover"
              variants={linkHoverVariants}
              className="relative text-sm text-[#CCC] font-light tracking-wide cursor-pointer py-2"
            >
              {link.label}
              {/* Animated Underline */}
              <motion.span 
                className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C19B76]"
                initial={{ scaleX: 0 }}
                variants={{ hover: { scaleX: 1 } }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-6">
          {/* CTA Button */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-white text-[#0B0B0B] rounded-full hover:bg-[#C19B76] hover:text-white transition-colors duration-300 font-medium text-sm shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(193,155,118,0.4)]"
          >
            <span>Contact Us</span>
            <ChevronRight className="w-4 h-4" />
          </motion.button>

          {/* Mobile Toggle */}
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="md:hidden text-white p-1"
          >
            <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                    <motion.div
                        key="close"
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 90 }}
                    >
                        <X className="w-6 h-6" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="menu"
                        initial={{ opacity: 0, rotate: 90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: -90 }}
                    >
                        <Menu className="w-6 h-6" />
                    </motion.div>
                )}
            </AnimatePresence>
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="md:hidden bg-[#0B0B0B] border-b border-[#222] overflow-hidden"
          >
            <div className="flex flex-col px-6 py-8 gap-6">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleNavClick(link.id)}
                  className="text-lg text-[#CCC] hover:text-[#C19B76] transition-colors duration-300 font-light text-left flex items-center justify-between group"
                >
                  {link.label}
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-[#C19B76]"/>
                </motion.button>
              ))}
              
              <motion.button 
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.4 }}
                 className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#C19B76] text-white rounded-full font-medium text-sm"
              >
                Contact Us
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}