"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { Home, Shield, Leaf, MapPin } from "lucide-react"

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Prime Location",
    description: "Situated in the heart of the city with easy access to shopping, dining, and culture",
  },
  {
    icon: <Home className="w-6 h-6" />,
    title: "Spacious Interiors",
    description: "Thoughtfully designed floor plans with premium finishes and abundant natural light",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Advanced Security",
    description: "State-of-the-art security systems and 24/7 concierge service for peace of mind",
  },
  {
    icon: <Leaf className="w-6 h-6" />,
    title: "Sustainable Living",
    description: "Eco-friendly materials and energy-efficient systems for a responsible lifestyle",
  },
]

export default function FeaturesGrid() {
  const containerRef = useRef<HTMLDivElement>(null)

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

    if (containerRef.current) {
      const items = containerRef.current.querySelectorAll("[data-feature]")
      items.forEach((item) => observer.observe(item))
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className="bg-[#0B0B0B] py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-light text-white mb-4 text-balance">Premium Amenities</h2>
          <p className="text-[#AAA] font-light max-w-2xl mx-auto">
            Discover what makes our properties exceptional, from architectural design to lifestyle features
          </p>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              data-feature
              className="p-8 border border-[#222] rounded-lg bg-gradient-to-br from-[#111] to-[#0B0B0B] hover:border-[#C19B76]/50 transition-all duration-300 group opacity-0 animate-in"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: "forwards",
              }}
            >
              <div className="text-[#C19B76] mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-light text-white mb-3">{feature.title}</h3>
              <p className="text-[#AAA] font-light leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-in {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  )
}
