"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Testimonial {
  id: number
  quote: string
  author: string
  title: string
  image: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "From start to finish, the service we received was exceptional. The team was attentive, professional, and highly skilled, ensuring every detail reflected our vision.",
    author: "Chelsea Murphy",
    title: "Business Owner",
    image: "https://i.pravatar.cc/150?u=chelsea",
    rating: 5,
  },
  {
    id: 2,
    quote: "Working with this team has been an exceptional experience. From our initial consultation to the final steps, every detail was handled with professionalism.",
    author: "Della Stoltenberg",
    title: "Property Consultant",
    image: "https://i.pravatar.cc/150?u=della",
    rating: 5,
  },
  {
    id: 3,
    quote: "They truly turned our vision into reality. We highly recommend them to anyone looking for an extraordinary living space that exceeds all expectations.",
    author: "Mireyanv Kovacek",
    title: "Interior Designer",
    image: "https://i.pravatar.cc/150?u=mirey",
    rating: 5,
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prev) => (prev + newDirection + testimonials.length) % testimonials.length)
  }

  return (
    <section className="bg-white py-24 px-6 overflow-hidden relative">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full flex justify-center items-center opacity-[0.03] pointer-events-none">
         <span className="text-[40rem] font-serif leading-none select-none">“</span>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="relative min-h-[450px] md:min-h-[400px] flex flex-col items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 200, damping: 25 },
                opacity: { duration: 0.3 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = Math.abs(offset.x) > 50
                if (swipe && offset.x > 0) paginate(-1)
                else if (swipe && offset.x < 0) paginate(1)
              }}
              className="flex flex-col items-center cursor-grab active:cursor-grabbing"
            >
              {/* Gold Quote Icon */}
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                className="mb-8 p-3 rounded-full bg-[#C19B76]/10 text-[#C19B76]"
              >
                <Quote size={28} fill="currentColor" />
              </motion.div>

              {/* Quote Text */}
              <blockquote className="text-2xl md:text-3xl lg:text-4xl font-serif italic text-gray-800 mb-12 leading-relaxed text-center max-w-4xl px-4">
                {testimonials[currentIndex].quote}
              </blockquote>

              {/* Author Profile */}
              <div className="flex flex-col items-center gap-5">
                <div className="relative">
                  {/* Decorative outer ring */}
                  <div className="absolute inset-0 border-2 border-[#C19B76] rounded-full -m-2 opacity-20 scale-110" />
                  <div className="w-24 h-24 rounded-full overflow-hidden shadow-xl border-4 border-white">
                    <img 
                      src={testimonials[currentIndex].image} 
                      alt={testimonials[currentIndex].author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 tracking-tight">
                    {testimonials[currentIndex].author}
                  </h3>
                  <p className="text-[#C19B76] text-xs uppercase tracking-[0.2em] font-bold mt-1">
                    {testimonials[currentIndex].title}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="flex flex-col items-center gap-8 mt-16">
          <div className="flex items-center gap-12">
            <button
              onClick={() => paginate(-1)}
              className="group p-4 rounded-full border border-gray-100 bg-gray-50 text-gray-400 hover:bg-white hover:border-[#C19B76] hover:text-[#C19B76] hover:shadow-lg transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>

            {/* Pagination Dots */}
            <div className="flex gap-4">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1)
                    setCurrentIndex(idx)
                  }}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    idx === currentIndex ? "w-10 bg-[#C19B76]" : "w-2 bg-gray-200 hover:bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => paginate(1)}
              className="group p-4 rounded-full border border-gray-100 bg-gray-50 text-gray-400 hover:bg-white hover:border-[#C19B76] hover:text-[#C19B76] hover:shadow-lg transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}