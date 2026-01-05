"use client"

import { useEffect, useState } from "react"
import { ChevronRight, Menu, X } from "lucide-react"
import { scrollToSection } from "@/lib/scroll-utils"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? "bg-[#0B0B0B]/95 backdrop-blur-md border-b border-[#222]" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavClick("home")}>
          <div className="w-8 h-8 rounded-full bg-[#C19B76] flex items-center justify-center text-[#0B0B0B] text-sm font-bold">
            ◆
          </div>
          <span className="text-white font-light tracking-widest text-sm">BRICKSIO</span>
        </div>

        {/* Center navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="text-sm text-[#CCC] hover:text-[#C19B76] transition-colors duration-300 font-light cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right side: Mobile menu button and CTA */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-white p-2">
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* CTA Button */}
          <button className="flex items-center gap-2 px-6 py-2.5 bg-white text-[#0B0B0B] rounded-full hover:bg-[#C19B76] hover:text-white transition-all duration-300 font-medium text-sm group">
            Contact Us
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0B0B0B]/98 backdrop-blur-md border-b border-[#222] px-6 py-4">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-sm text-[#CCC] hover:text-[#C19B76] transition-colors duration-300 font-light text-left cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
