"use client"

import { useEffect, useRef } from "react"
import { ArrowRight } from "lucide-react"

export default function AboutParallax() {
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!parallaxRef.current) return

      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 20

      const image = parallaxRef.current.querySelector("[data-parallax]") as HTMLElement
      if (image) {
        image.style.transform = `translateX(${x}px) translateY(${y}px)`
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="bg-[#0B0B0B] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div ref={parallaxRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <h2 className="text-5xl font-light text-white mb-6 leading-tight text-balance">
              Experience elevated lifestyle through elegant urban homes
            </h2>
            <p className="text-[#AAA] font-light leading-relaxed mb-8 text-lg">
              Explore handpicked homes in premier locations, each offering a unique blend of luxury, comfort, and
              contemporary design. Our curated selection ensures every property meets our exacting standards for quality
              and sophistication.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-[#C19B76] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-[#CCC] font-light">Architectural excellence and timeless design</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-[#C19B76] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-[#CCC] font-light">Prime locations with exceptional accessibility</p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-[#C19B76] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-[#CCC] font-light">Premium amenities and smart home technology</p>
              </div>
            </div>

            <button className="flex items-center gap-2 px-6 py-3 bg-[#C19B76] text-white rounded-full hover:bg-[#B8884A] transition-colors duration-300 font-medium text-sm group">
              Explore Properties
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Image with parallax */}
          <div className="relative h-96 lg:h-full min-h-96 rounded-lg overflow-hidden">
            <div data-parallax className="absolute inset-0 transition-transform duration-200 ease-out">
              <img src="/luxury-bedroom.jpg" alt="Luxury Bedroom" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
