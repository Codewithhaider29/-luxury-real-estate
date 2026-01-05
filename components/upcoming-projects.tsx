"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Project {
  id: number
  image: string
  name: string
  location: string
  completion: string
}

const projects: Project[] = [
  {
    id: 1,
    image: "/project-downtown.jpg",
    name: "Downtown Residences",
    location: "Financial District",
    completion: "Q3 2025",
  },
  {
    id: 2,
    image: "/project-waterfront.jpg",
    name: "Waterfront Tower",
    location: "Marina Bay",
    completion: "Q4 2025",
  },
  {
    id: 3,
    image: "/project-greenfield.jpg",
    name: "Greenfield Estate",
    location: "Suburban Heights",
    completion: "Q2 2026",
  },
  {
    id: 4,
    image: "/project-skyline.jpg",
    name: "Skyline Penthouse",
    location: "City Center",
    completion: "Q1 2026",
  },
]

export default function UpcomingProjects() {
  const [currentIndex, setCurrentIndex] = useState(0)
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

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  return (
    <section ref={ref} className="bg-[#0B0B0B] py-20 px-6 opacity-0 animate-in">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-5xl font-light text-white mb-2 text-balance">Upcoming Projects</h2>
            <p className="text-[#AAA] font-light">Exciting new developments coming soon to your city</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={prevSlide}
              className="p-3 border border-[#222] rounded-full hover:border-[#C19B76] transition-colors duration-300 text-[#666] hover:text-[#C19B76]"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 border border-[#222] rounded-full hover:border-[#C19B76] transition-colors duration-300 text-[#666] hover:text-[#C19B76]"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-lg">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {projects.map((project) => (
              <div key={project.id} className="w-full flex-shrink-0">
                <div className="relative h-96 md:h-[500px]">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000]/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <p className="text-[#C19B76] text-sm font-light mb-2">Completion: {project.completion}</p>
                    <h3 className="text-4xl font-light text-white mb-2">{project.name}</h3>
                    <p className="text-[#AAA] font-light">{project.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicators */}
        <div className="flex gap-2 justify-center mt-8">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "w-8 bg-[#C19B76]" : "w-2 bg-[#333]"
              }`}
            />
          ))}
        </div>
      </div>

      <style>{`
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
