"use client"

import { useEffect, useRef } from "react"

export default function ParallaxBuilding() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!imageRef.current || !containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const scrollProgress = Math.max(0, 1 - rect.top / window.innerHeight)
      const offset = scrollProgress * 100

      imageRef.current.style.transform = `translateY(${offset * 0.5}px)`
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section ref={containerRef} className="bg-[#0B0B0B] py-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden mb-12">
          <div ref={imageRef} className="absolute inset-0 transition-transform duration-100 ease-out">
            <img src="/luxury-skyscraper.jpg" alt="Modern Skyscraper" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6 text-balance">
            Architectural excellence meets contemporary living
          </h2>
          <p className="text-[#AAA] font-light leading-relaxed text-lg">
            Our properties are carefully selected from distinguished architects and developers who share our commitment
            to quality. Each residence is designed to provide an unparalleled living experience in the most desirable
            locations.
          </p>
        </div>
      </div>
    </section>
  )
}
