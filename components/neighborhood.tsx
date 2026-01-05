"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Coffee, BookOpen, Bus, ShoppingCart, Utensils, ParkingCircle } from "lucide-react"

interface Amenity {
  id: number
  icon: React.ReactNode
  name: string
  description: string
  distance: string
}

const amenities: Amenity[] = [
  {
    id: 1,
    icon: <Coffee className="w-5 h-5" />,
    name: "Business Center",
    description: "Modern workspace with high-speed internet",
    distance: "In Building",
  },
  {
    id: 2,
    icon: <ShoppingCart className="w-5 h-5" />,
    name: "Grocery Market",
    description: "Premium supermarket with organic products",
    distance: "0.2 km away",
  },
  {
    id: 3,
    icon: <Bus className="w-5 h-5" />,
    name: "Transit Station",
    description: "Metro and bus hub for easy connectivity",
    distance: "0.3 km away",
  },
  {
    id: 4,
    icon: <Utensils className="w-5 h-5" />,
    name: "Fine Dining",
    description: "Michelin-starred restaurants nearby",
    distance: "0.4 km away",
  },
  {
    id: 5,
    icon: <BookOpen className="w-5 h-5" />,
    name: "Cultural Hub",
    description: "Museums, galleries, and theaters",
    distance: "0.5 km away",
  },
  {
    id: 6,
    icon: <ParkingCircle className="w-5 h-5" />,
    name: "Underground Parking",
    description: "Secure parking for all residents",
    distance: "In Building",
  },
]

export default function Neighborhood() {
  const [activeId, setActiveId] = useState<number>(1)
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simulate mask image change based on active amenity
    if (imageRef.current) {
      imageRef.current.style.backgroundPosition = `${activeId * 20}% center`
    }
  }, [activeId])

  return (
    <section className="bg-[#0B0B0B] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-5xl font-light text-white mb-4 text-balance">Neighborhood Convenience</h2>
          <p className="text-[#AAA] font-light">Located in the heart of the city with access to premium amenities</p>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-stretch">
          {/* Left side - Image with circular mask */}
          <div className="lg:col-span-1">
            <div
              ref={imageRef}
              className="w-full aspect-square rounded-full overflow-hidden bg-cover bg-center transition-all duration-500"
              style={{
                backgroundImage: "url('/neighborhood-map.jpg')",
                backgroundPosition: "center",
              }}
            ></div>
          </div>

          {/* Right side - Amenities list */}
          <div className="lg:col-span-2">
            <div className="space-y-3">
              {amenities.map((amenity, index) => (
                <button
                  key={amenity.id}
                  onClick={() => setActiveId(amenity.id)}
                  className={`w-full text-left p-6 rounded-lg transition-all duration-300 border ${
                    activeId === amenity.id
                      ? "bg-[#111] border-[#C19B76]"
                      : "bg-transparent border-[#222] hover:border-[#333]"
                  }`}
                  style={{
                    animation: `slideIn 0.5s ease-out ${index * 50}ms forwards`,
                    opacity: 0,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`mt-1 transition-colors duration-300 ${
                        activeId === amenity.id ? "text-[#C19B76]" : "text-[#666]"
                      }`}
                    >
                      {amenity.icon}
                    </div>
                    <div className="flex-1">
                      <h3
                        className={`font-light text-lg mb-1 transition-colors duration-300 ${
                          activeId === amenity.id ? "text-white" : "text-[#CCC]"
                        }`}
                      >
                        {amenity.name}
                      </h3>
                      <p
                        className={`text-sm font-light transition-colors duration-300 ${
                          activeId === amenity.id ? "text-[#AAA]" : "text-[#666]"
                        }`}
                      >
                        {amenity.description}
                      </p>
                    </div>
                    <span
                      className={`text-sm font-light whitespace-nowrap ml-4 transition-colors duration-300 ${
                        activeId === amenity.id ? "text-[#C19B76]" : "text-[#666]"
                      }`}
                    >
                      {amenity.distance}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  )
}
