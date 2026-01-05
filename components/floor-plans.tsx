"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Maximize, BedDouble, Bath, Car } from "lucide-react"

// 1. DATA: Defined the floor plan types
const floorPlans = [
  {
    id: 1,
    name: "Studio",
    specs: { area: "450 sqf", beds: "01", baths: "01", parking: "01" }
  },
  {
    id: 2,
    name: "Simplex",
    specs: { area: "750 sqf", beds: "02", baths: "01", parking: "01" }
  },
  {
    id: 3,
    name: "Duplex",
    specs: { area: "1200 sqf", beds: "03", baths: "02", parking: "02" }
  },
  {
    id: 4,
    name: "Double height",
    specs: { area: "1600 sqf", beds: "03", baths: "03", parking: "02" }
  },
  {
    id: 5,
    name: "Penthouse",
    specs: { area: "3500 sqf", beds: "05", baths: "04", parking: "03" }
  },
]

export default function FloorPlans() {
  const [activeId, setActiveId] = useState(1)

  // Find active data to display
  const activePlan = floorPlans.find((p) => p.id === activeId) || floorPlans[0]

  return (
    <section className="bg-white py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-16 max-w-lg">
          <h2 className="text-4xl md:text-5xl font-light text-[#1A1A1A] mb-6">
            Apartment types
          </h2>
          <p className="text-[#666] leading-relaxed">
            Choose from a variety of apartment types, each crafted to suit diverse lifestyles and needs.
          </p>
        </div>

        {/* --- MAIN GRID LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* 1. LEFT COLUMN: Tabs Selection */}
          <div className="lg:col-span-3 flex flex-col space-y-0 border-l-2 border-[#E5E5E5]">
            {floorPlans.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setActiveId(plan.id)}
                className={`relative pl-6 py-4 text-left text-lg font-medium transition-colors duration-300 focus:outline-none ${
                  activeId === plan.id 
                    ? "text-[#1A1A1A]" 
                    : "text-[#999] hover:text-[#666]"
                }`}
              >
                {/* Active Indicator Line */}
                {activeId === plan.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute left-[-2px] top-0 bottom-0 w-[2px] bg-[#1A1A1A]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {plan.name}
              </button>
            ))}
          </div>

          {/* 2. CENTER COLUMN: Floor Plan Image */}
          <div className="lg:col-span-6 flex justify-center py-8 lg:py-0">
            <div className="relative w-full max-w-md aspect-[3/4]">
                 {/* Using AnimatePresence to crossfade between identical images 
                     (gives the feeling of data changing even if image is same)
                 */}
                 <AnimatePresence mode="wait">
                    <motion.img 
                        key={activeId} // Re-trigger animation on tab change
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                        src="/floor-plan-studio.webp"  // Locked to single image as requested
                        alt="Floor Plan Blueprint"
                        className="w-full h-full object-contain grayscale contrast-125" 
                        // Added grayscale/contrast to make it look like a technical drawing
                    />
                 </AnimatePresence>
            </div>
          </div>

          {/* 3. RIGHT COLUMN: Specifications List */}
          <div className="lg:col-span-3">
             <div className="space-y-0">
                
                {/* Spec Item: Area */}
                <div className="flex items-center justify-between py-4 border-b border-[#E5E5E5]">
                    <div className="flex items-center gap-3 text-[#666]">
                        <Maximize strokeWidth={1.5} className="w-5 h-5" />
                        <span className="font-light">Area</span>
                    </div>
                    <span className="font-medium text-[#1A1A1A]">{activePlan.specs.area}</span>
                </div>

                {/* Spec Item: Bedroom */}
                <div className="flex items-center justify-between py-4 border-b border-[#E5E5E5]">
                    <div className="flex items-center gap-3 text-[#666]">
                        <BedDouble strokeWidth={1.5} className="w-5 h-5" />
                        <span className="font-light">Bedroom</span>
                    </div>
                    <span className="font-medium text-[#1A1A1A]">{activePlan.specs.beds}</span>
                </div>

                {/* Spec Item: Bathroom */}
                <div className="flex items-center justify-between py-4 border-b border-[#E5E5E5]">
                    <div className="flex items-center gap-3 text-[#666]">
                        <Bath strokeWidth={1.5} className="w-5 h-5" />
                        <span className="font-light">Bathroom</span>
                    </div>
                    <span className="font-medium text-[#1A1A1A]">{activePlan.specs.baths}</span>
                </div>

                {/* Spec Item: Parking */}
                <div className="flex items-center justify-between py-4 border-b border-[#E5E5E5]">
                    <div className="flex items-center gap-3 text-[#666]">
                        <Car strokeWidth={1.5} className="w-5 h-5" />
                        <span className="font-light">Parking</span>
                    </div>
                    <span className="font-medium text-[#1A1A1A]">{activePlan.specs.parking}</span>
                </div>

             </div>

             <div className="mt-8">
                 <p className="text-[#888] text-sm leading-relaxed">
                     Each apartment combines smart design and modern style, ensuring comfort and convenience every day.
                 </p>
             </div>
          </div>

        </div>
      </div>
    </section>
  )
}