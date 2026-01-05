"use client"

import { useEffect, useRef, useState } from "react"

interface FloorPlan {
  id: number
  name: string
  area: string
  beds: number
  baths: number
  parking: number
  image: string
}

const floorPlans: FloorPlan[] = [
  {
    id: 1,
    name: "Studio",
    area: "450 sqft",
    beds: 0,
    baths: 1,
    parking: 1,
    image: "/floor-plan-studio.jpg",
  },
  {
    id: 2,
    name: "One Bedroom",
    area: "750 sqft",
    beds: 1,
    baths: 1,
    parking: 1,
    image: "/floor-plan-1bed.jpg",
  },
  {
    id: 3,
    name: "Two Bedroom",
    area: "1200 sqft",
    beds: 2,
    baths: 2,
    parking: 2,
    image: "/floor-plan-2bed.jpg",
  },
  {
    id: 4,
    name: "Penthouse",
    area: "3500 sqft",
    beds: 4,
    baths: 4,
    parking: 3,
    image: "/floor-plan-penthouse.jpg",
  },
]

export default function FloorPlans() {
  const [activeId, setActiveId] = useState<number>(2)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          ref.current?.classList.add("animate-in")
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const activePlan = floorPlans.find((p) => p.id === activeId)

  return (
    <section
      ref={ref}
      className="bg-[#0B0B0B] py-20 px-6 opacity-0 animate-in"
      style={{
        backgroundImage:
          "url('data:image/svg+xml,%3Csvg width=%22100%22 height=%22100%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Ccircle cx=%2250%22 cy=%2250%22 r=%2230%22 fill=%22none%22 stroke=%22%23222%22 strokeWidth=%221%22/%3E%3C/svg%3E')",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-5xl font-light text-white mb-4 text-balance">Floor Plans</h2>
          <p className="text-[#AAA] font-light">Choose from our selection of thoughtfully designed layouts</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-stretch">
          {/* Plan selector */}
          <div className="space-y-3">
            {floorPlans.map((plan, index) => (
              <button
                key={plan.id}
                onClick={() => setActiveId(plan.id)}
                className={`w-full text-left p-6 rounded-lg transition-all duration-300 border ${
                  activeId === plan.id
                    ? "bg-[#111] border-[#C19B76]"
                    : "bg-transparent border-[#222] hover:border-[#333]"
                }`}
                style={{
                  animation: `slideIn 0.5s ease-out ${index * 50}ms forwards`,
                  opacity: 0,
                }}
              >
                <h3
                  className={`font-light text-xl mb-4 transition-colors duration-300 ${
                    activeId === plan.id ? "text-white" : "text-[#CCC]"
                  }`}
                >
                  {plan.name}
                </h3>
                <div className="space-y-2 text-sm font-light">
                  <p
                    className={`transition-colors duration-300 ${
                      activeId === plan.id ? "text-[#C19B76]" : "text-[#666]"
                    }`}
                  >
                    {plan.area}
                  </p>
                  <p
                    className={`transition-colors duration-300 ${activeId === plan.id ? "text-[#AAA]" : "text-[#666]"}`}
                  >
                    {plan.beds > 0 ? `${plan.beds} Bedroom${plan.beds > 1 ? "s" : ""}` : "Studio"} • {plan.baths} Bath
                    {plan.baths > 1 ? "s" : ""}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Floor plan image and specs */}
          <div className="lg:col-span-2">
            {activePlan && (
              <div className="space-y-8">
                {/* Floor plan image */}
                <div className="relative h-96 rounded-lg overflow-hidden border border-[#222]">
                  <img
                    src={activePlan.image || "/placeholder.svg"}
                    alt={activePlan.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Specifications */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="p-4 bg-[#111] rounded-lg border border-[#222]">
                    <p className="text-[#666] text-xs font-light mb-2">AREA</p>
                    <p className="text-white font-light text-lg">{activePlan.area}</p>
                  </div>
                  <div className="p-4 bg-[#111] rounded-lg border border-[#222]">
                    <p className="text-[#666] text-xs font-light mb-2">BEDROOMS</p>
                    <p className="text-white font-light text-lg">{activePlan.beds || "Studio"}</p>
                  </div>
                  <div className="p-4 bg-[#111] rounded-lg border border-[#222]">
                    <p className="text-[#666] text-xs font-light mb-2">BATHROOMS</p>
                    <p className="text-white font-light text-lg">{activePlan.baths}</p>
                  </div>
                  <div className="p-4 bg-[#111] rounded-lg border border-[#222]">
                    <p className="text-[#666] text-xs font-light mb-2">PARKING</p>
                    <p className="text-white font-light text-lg">{activePlan.parking}</p>
                  </div>
                </div>
              </div>
            )}
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

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-in {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  )
}
