"use client"

import { useEffect, useRef } from "react"
import { ArrowRight } from "lucide-react"

interface BlogPost {
  id: number
  image: string
  title: string
  excerpt: string
  date: string
  author: string
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    image: "/blog-architecture.jpg",
    title: "Residential Development Trends 2025",
    excerpt: "Discover the latest trends shaping the future of luxury residential architecture and design.",
    date: "Jan 15, 2025",
    author: "Sarah Chen",
  },
  {
    id: 2,
    image: "/blog-investment.jpg",
    title: "Smart Investment in Real Estate",
    excerpt: "Learn how to maximize returns on luxury property investments in today's market.",
    date: "Jan 10, 2025",
    author: "James Mitchell",
  },
  {
    id: 3,
    image: "/blog-sustainable.jpg",
    title: "Sustainable Luxury Living",
    excerpt: "Explore eco-friendly features that don't compromise on elegance and comfort.",
    date: "Jan 5, 2025",
    author: "Emma Rodriguez",
  },
]

export default function BlogSection() {
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
      const items = containerRef.current.querySelectorAll("[data-blog-item]")
      items.forEach((item) => observer.observe(item))
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className="bg-[#0B0B0B] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-5xl font-light text-white mb-4 text-balance">Latest Insights</h2>
          <p className="text-[#AAA] font-light">
            Stay updated with trends, tips, and stories from the luxury real estate world
          </p>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <div
              key={post.id}
              data-blog-item
              className="group flex flex-col opacity-0 transition-all duration-500"
              style={{
                animation: "fadeInUp 0.8s ease-out forwards",
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Image */}
              <div className="relative h-56 rounded-lg overflow-hidden mb-6">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col">
                <p className="text-[#C19B76] text-xs font-light tracking-widest mb-2">{post.date}</p>
                <h3 className="text-xl font-light text-white mb-3 leading-tight group-hover:text-[#C19B76] transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-[#AAA] font-light leading-relaxed mb-4 flex-1">{post.excerpt}</p>
                <div className="flex items-center justify-between pt-4 border-t border-[#222]">
                  <p className="text-[#666] text-xs font-light">By {post.author}</p>
                  <button className="text-[#C19B76] hover:text-white transition-colors duration-300">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
