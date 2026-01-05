"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

interface Testimonial {
  id: number
  quote: string
  author: string
  title: string
  avatar: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "The entire experience was seamless from viewing to closing. The attention to detail and professionalism was exceptional.",
    author: "Victoria Sterling",
    title: "Luxury Buyer",
    avatar: "👩‍💼",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "I couldn't have asked for a better team to guide me through this investment. Their market expertise is unparalleled.",
    author: "Michael Chen",
    title: "Real Estate Investor",
    avatar: "👨‍💼",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "Finding my dream home was made possible by their dedication and knowledge. Highly recommend their services.",
    author: "Isabella Rossi",
    title: "Homeowner",
    avatar: "👩",
    rating: 5,
  },
]

export default function Testimonials() {
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
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const current = testimonials[currentIndex]

  return (
    <section ref={ref} className="bg-[#0B0B0B] py-20 px-6 opacity-0 animate-in">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-5xl font-light text-white mb-16 text-balance">What Our Clients Say</h2>

        <div className="min-h-96 flex flex-col items-center justify-center">
          {/* Stars */}
          <div className="flex gap-2 mb-8 justify-center">
            {Array.from({ length: current.rating }).map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#C19B76] text-[#C19B76]" />
            ))}
          </div>

          {/* Quote */}
          <blockquote className="text-2xl md:text-3xl font-light text-white mb-8 italic leading-relaxed text-balance">
            "{current.quote}"
          </blockquote>

          {/* Author */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#111] border border-[#222] flex items-center justify-center text-3xl mb-4">
              {current.avatar}
            </div>
            <h3 className="text-xl font-light text-white mb-1">{current.author}</h3>
            <p className="text-[#C19B76] text-sm font-light">{current.title}</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-4 items-center justify-center mt-12">
          <button
            onClick={prevSlide}
            className="p-3 border border-[#222] rounded-full hover:border-[#C19B76] transition-colors duration-300 text-[#666] hover:text-[#C19B76]"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "w-8 bg-[#C19B76]" : "w-2 bg-[#333]"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="p-3 border border-[#222] rounded-full hover:border-[#C19B76] transition-colors duration-300 text-[#666] hover:text-[#C19B76]"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
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
