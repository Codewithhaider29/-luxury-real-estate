"use client"

import { useEffect, useRef, useState } from "react"

interface Property {
  id: number
  name: string
  sqft: string
  beds: number
  baths: number
  price: string
}

const properties: Property[] = [
  { id: 1, name: "Tower One - 219A", sqft: "1,600 sqft", beds: 3, baths: 2, price: "$1,258,000" },
  { id: 2, name: "Tower One - 405B", sqft: "2,200 sqft", beds: 4, baths: 3, price: "$1,895,000" },
  { id: 3, name: "Tower Two - 1012", sqft: "1,950 sqft", beds: 3, baths: 2.5, price: "$1,575,000" },
  { id: 4, name: "Penthouse Suite - 2401", sqft: "3,500 sqft", beds: 4, baths: 4, price: "$3,450,000" },
  { id: 5, name: "Tower Three - 805C", sqft: "1,750 sqft", beds: 3, baths: 2, price: "$1,395,000" },
]

export default function ListingsTable() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
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

  return (
    <section ref={ref} className="bg-[#0B0B0B] py-20 px-6 opacity-0 animate-in">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-5xl font-light text-white mb-4 text-balance">Apartment Listings</h2>
          <p className="text-[#AAA] font-light">Browse our available properties and contact us for more information</p>
        </div>

        <div className="overflow-x-auto rounded-lg border border-[#222]">
          <table className="w-full text-left">
            <thead className="border-b border-[#222] bg-[#111]">
              <tr>
                <th className="px-6 py-4 text-white font-light text-sm">Property Name</th>
                <th className="px-6 py-4 text-white font-light text-sm">Size</th>
                <th className="px-6 py-4 text-white font-light text-sm">Beds / Baths</th>
                <th className="px-6 py-4 text-white font-light text-sm">Price</th>
                <th className="px-6 py-4 text-white font-light text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => (
                <tr
                  key={property.id}
                  onMouseEnter={() => setHoveredId(property.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`border-b border-[#222] transition-all duration-300 ${
                    hoveredId === property.id ? "bg-[#111]" : "bg-transparent hover:bg-[#0D0D0D]"
                  }`}
                >
                  <td className="px-6 py-4 text-white font-light">{property.name}</td>
                  <td className="px-6 py-4 text-[#AAA] font-light">{property.sqft}</td>
                  <td className="px-6 py-4 text-[#AAA] font-light">
                    {property.beds} BD / {property.baths} BA
                  </td>
                  <td className="px-6 py-4 text-[#C19B76] font-light">{property.price}</td>
                  <td className="px-6 py-4">
                    <button
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        hoveredId === property.id
                          ? "bg-[#C19B76] text-white"
                          : "bg-[#222] text-[#C19B76] hover:bg-[#333]"
                      }`}
                    >
                      Contact
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        @keyframes slideInUp {
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
          animation: slideInUp 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  )
}
