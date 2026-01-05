"use client"

import { useEffect, useRef } from "react"

const partners = [
  { name: "KingandFay", logo: "👑" },
  { name: "Gabriel Architects", logo: "🏛️" },
  { name: "Urban Design Co", logo: "🌆" },
  { name: "Heritage Homes", logo: "🏠" },
  { name: "Modern Living", logo: "🔷" },
  { name: "Elite Estates", logo: "💎" },
]

export default function Partners() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          containerRef.current?.classList.add("animate-in")
        }
      },
      { threshold: 0.1 },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={containerRef} className="bg-[#0B0B0B] py-20 px-6 opacity-0 animate-in">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-white mb-2 text-balance">Trusted Partners</h2>
          <p className="text-[#AAA] font-light">Collaborating with industry-leading designers and developers</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-6 rounded-lg border border-[#222] hover:border-[#C19B76]/50 transition-all duration-300 group"
              style={{
                animation: `slideIn 0.5s ease-out ${index * 50}ms forwards`,
                opacity: 0,
              }}
            >
              <div className="text-center">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {partner.logo}
                </div>
                <p className="text-[#666] text-xs font-light group-hover:text-[#C19B76] transition-colors duration-300">
                  {partner.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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
