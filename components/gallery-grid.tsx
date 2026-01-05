"use client"

import { useEffect, useRef } from "react"

interface GalleryItem {
  id: number
  image: string
  title: string
  cols: number
  rows: number
}

const galleryItems: GalleryItem[] = [
  { id: 1, image: "/gallery-stairs.jpg", title: "Modern Staircase", cols: 2, rows: 2 },
  { id: 2, image: "/gallery-bedroom.jpg", title: "Master Bedroom", cols: 1, rows: 1 },
  { id: 3, image: "/gallery-kitchen.jpg", title: "Premium Kitchen", cols: 1, rows: 2 },
  { id: 4, image: "/gallery-pool.jpg", title: "Luxury Pool", cols: 1, rows: 1 },
  { id: 5, image: "/gallery-living.jpg", title: "Living Room", cols: 2, rows: 1 },
  { id: 6, image: "/gallery-bathroom.jpg", title: "Spa Bathroom", cols: 1, rows: 1 },
]

export default function GalleryGrid() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("loaded")
          }
        })
      },
      { threshold: 0.1 },
    )

    if (containerRef.current) {
      const items = containerRef.current.querySelectorAll("[data-gallery-item]")
      items.forEach((item) => observer.observe(item))
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className="bg-[#0B0B0B] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-light text-white mb-4 text-balance">Gallery</h2>
          <p className="text-[#AAA] font-light">Explore our curated selection of premium properties</p>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              data-gallery-item
              className={`group relative overflow-hidden rounded-lg cursor-pointer opacity-0 transition-all duration-500 hover:scale-105 md:col-span-${item.cols} md:row-span-${item.rows}`}
              style={{
                gridColumn: item.cols > 1 ? `span ${item.cols}` : "span 1",
                gridRow: item.rows > 1 ? `span ${item.rows}` : "span 1",
                animation: "fadeIn 0.8s ease-out forwards",
              }}
            >
              <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white font-light text-lg">{item.title}</h3>
                <p className="text-[#C19B76] text-sm font-light">View Details</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .loaded {
          animation: fadeIn 0.8s ease-out forwards !important;
        }
      `}</style>
    </section>
  )
}
