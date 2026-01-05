"use client"

import { useEffect, useRef, useState } from "react"

interface StatItem {
  number: string
  label: string
  icon: string
}

const stats: StatItem[] = [
  { number: "03+", label: "Years of experience", icon: "📈" },
  { number: "98%", label: "Happy clients", icon: "😊" },
  { number: "540+", label: "Properties sold", icon: "🏢" },
  { number: "2.5K", label: "Active listings", icon: "🔑" },
]

export default function Statistics() {
  const [counters, setCounters] = useState<Record<string, number>>({})
  const ref = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)

          // Animate counters
          stats.forEach((stat, index) => {
            const finalValue = Number.parseInt(stat.number)
            let currentValue = 0
            const increment = Math.ceil(finalValue / 50)

            const interval = setInterval(() => {
              currentValue += increment
              if (currentValue >= finalValue) {
                currentValue = finalValue
                clearInterval(interval)
              }
              setCounters((prev) => ({ ...prev, [index]: currentValue }))
            }, 30)
          })
        }
      },
      { threshold: 0.5 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  return (
    <section ref={ref} className="bg-[#0B0B0B] py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full border border-[#C19B76] flex items-center justify-center mb-4 text-lg">
                {stat.icon}
              </div>
              <div className="text-4xl md:text-5xl font-light text-[#C19B76] mb-2">
                {counters[index] !== undefined ? counters[index] : "0"}
                {stat.number.includes("+") ? "+" : "%"}
              </div>
              <p className="text-[#AAA] text-sm font-light">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
