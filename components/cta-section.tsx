"use client"

import { useEffect, useRef } from "react"
import { Mail, Phone } from "lucide-react"

export default function CTASection() {
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
    <section
      ref={ref}
      className="bg-[#0B0B0B] py-20 px-6 opacity-0 animate-in"
      style={{
        backgroundImage:
          "url('data:image/svg+xml,%3Csvg width=%22100%22 height=%22100%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M20 80 L50 20 L80 80%22 fill=%22none%22 stroke=%22%23222%22 strokeWidth=%221%22/%3E%3C/svg%3E')",
      }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl font-light text-white mb-6 text-balance">Ready to find your perfect home?</h2>
        <p className="text-lg text-[#AAA] font-light mb-10 leading-relaxed">
          Contact our team of luxury real estate experts who will guide you through every step of the process
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <a
            href="tel:+1234567890"
            className="flex items-center gap-3 px-8 py-3.5 bg-[#C19B76] text-white rounded-full hover:bg-[#B8884A] transition-colors duration-300 font-medium text-sm group"
          >
            <Phone className="w-4 h-4" />
            +1 (234) 567-8900
          </a>
          <a
            href="mailto:info@bricksio.com"
            className="flex items-center gap-3 px-8 py-3.5 border border-[#C19B76] text-[#C19B76] rounded-full hover:bg-[#C19B76]/10 transition-colors duration-300 font-medium text-sm group"
          >
            <Mail className="w-4 h-4" />
            info@bricksio.com
          </a>
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
