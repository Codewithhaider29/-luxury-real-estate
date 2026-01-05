"use client"

import { ArrowUpRight, MapPin } from "lucide-react"
import { motion, Variants } from "framer-motion"

interface Project {
  id: number
  image: string
  location: string
  title: string
  category: string
}

const projects: Project[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    location: "29 Green Lane, London",
    title: "The Oaks at Riverbend",
    category: "Residential"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800&auto=format&fit=crop",
    location: "62834 Cassin Ridges, Missoula",
    title: "Sierra Grove Villas",
    category: "Luxury Villa"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
    location: "62713 The Square, Arlochester",
    title: "Crystal Haven Townhomes",
    category: "Urban Living"
  },
]

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  }
}

export default function UpcomingProjects() {
  return (
    <section className="bg-white py-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-[#C19B76] text-sm font-bold uppercase tracking-[0.3em] mb-4 block"
            >
              Exclusivity
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-serif text-[#1A1A1A] leading-[1.1]"
            >
              Upcoming projects
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-500 max-w-sm leading-relaxed border-l-2 border-[#C19B76]/20 pl-6"
          >
            Stay informed about our upcoming projects, featuring innovative designs and modern amenities.
          </motion.p>
        </div>

        {/* Projects Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              className="group relative h-[550px] rounded-[2rem] overflow-hidden cursor-pointer bg-gray-100"
            >
              {/* Category Tag (Floating) */}
              <div className="absolute top-6 left-6 z-20">
                <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium tracking-wider uppercase">
                  {project.category}
                </span>
              </div>

              {/* Background Image with Zoom */}
              <motion.div className="absolute inset-0 w-full h-full">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-110"
                />
                {/* Refined Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              </motion.div>

              {/* Content Overlay */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  
                  <div className="flex items-center gap-2 text-white/70 text-sm mb-3">
                    <MapPin className="w-3.5 h-3.5 text-[#C19B76]" />
                    <span className="font-light tracking-wide">{project.location}</span>
                  </div>
                  
                  <h3 className="text-white text-3xl font-medium leading-tight mb-6">
                    {project.title}
                  </h3>

                  {/* Animated CTA Button */}
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <button className="flex items-center gap-2 bg-[#C19B76] text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-[#a6825f] transition-colors shadow-xl">
                      View details 
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}