"use client"

import { useEffect, useRef } from "react"
import { Play } from "lucide-react"

export default function Hero() {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    if (textRef.current) {
      observer.observe(textRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#0B0B0B] pt-20">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/luxury-interior-living-room.jpg')",
            opacity: 0.4,
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B]/50 via-transparent to-[#0B0B0B]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Tag */}
        <div className="mb-6 inline-block">
          <span className="text-[#C19B76] text-xs font-light tracking-widest uppercase">Luxury Real Estate</span>
        </div>

        {/* Heading with staggered reveal */}
        <div ref={textRef} className="space-y-2 mb-6">
          <h1 className="text-5xl md:text-7xl font-light text-white leading-tight text-balance">
            Discover refined living
          </h1>
          <h1 className="text-5xl md:text-7xl font-light text-[#C19B76] leading-tight text-balance">
            in stylish contemporary residences
          </h1>
        </div>

        {/* Subheading */}
        <p className="text-lg text-[#AAA] font-light max-w-2xl mx-auto mb-10 leading-relaxed">
          Experience elevated lifestyle through elegant urban homes curated with meticulous attention to detail and
          architectural excellence.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button className="px-8 py-3.5 bg-[#C19B76] text-white rounded-full hover:bg-[#B8884A] transition-colors duration-300 font-medium text-sm">
            Explore Properties
          </button>
          <button className="flex items-center gap-3 px-8 py-3.5 border border-[#C19B76] text-[#C19B76] rounded-full hover:bg-[#C19B76]/10 transition-colors duration-300 font-medium text-sm group">
            <Play className="w-4 h-4" />
            Watch Tour
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2">
          <p className="text-[#666] text-xs font-light tracking-widest uppercase">Scroll</p>
          <div className="w-6 h-10 border border-[#C19B76] rounded-full flex items-center justify-center">
            <div
              className="w-1 h-2 bg-[#C19B76] rounded-full"
              style={{
                animation: "bounce 2s infinite",
              }}
            ></div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(8px);
          }
        }

        .animate-in {
          animation: fadeInUp 1s ease-out forwards;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
