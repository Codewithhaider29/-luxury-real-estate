"use client"

import { useState } from "react"
import { motion, Variants } from "framer-motion"
import { ArrowRight, Phone, Mail, MapPin, Instagram, Linkedin, Twitter } from "lucide-react"

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  }

  return (
    <section className="bg-white py-24 px-6 lg:px-12 relative overflow-hidden">
      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#C19B76]/5 -skew-x-12 translate-x-1/2 pointer-events-none" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-7xl mx-auto relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* --- LEFT COLUMN: Info --- */}
          <div className="space-y-12">
            <motion.div variants={itemVariants} className="space-y-6">
              <span className="text-[#C19B76] text-sm font-bold tracking-[0.3em] uppercase block">
                Get in touch
              </span>
              <h2 className="text-5xl md:text-7xl font-serif text-[#1A1A1A] leading-[1.1]">
                Arrange a <br />
                <span className="text-[#C19B76] italic font-light">site visit</span>
              </h2>
              <p className="text-gray-500 font-light text-lg leading-relaxed max-w-md">
                Schedule a personal tour today and explore our homes firsthand to find the perfect space for your lifestyle.
              </p>
            </motion.div>

            {/* Contact Details */}
            <motion.div variants={itemVariants} className="space-y-8">
              {[
                { icon: Phone, label: "Call Us", value: "+1 (888) 456 7890" },
                { icon: Mail, label: "Email Us", value: "info@bricksio.com" },
                { icon: MapPin, label: "Visit Office", value: "410 Sandtown, California 94001" },
              ].map((detail, idx) => (
                <div key={idx} className="flex items-start gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-[#C19B76] group-hover:bg-[#C19B76] group-hover:text-white transition-all duration-500 shadow-sm">
                    <detail.icon strokeWidth={1.2} className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[#C19B76] text-xs font-bold uppercase tracking-widest mb-1">{detail.label}</p>
                    <p className="text-[#1A1A1A] text-xl font-medium group-hover:text-[#C19B76] transition-colors duration-300">
                      {detail.value}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex gap-4 pt-4">
              {[Instagram, Linkedin, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-100 text-gray-400 hover:text-[#C19B76] hover:border-[#C19B76] hover:shadow-lg transition-all duration-300">
                  <Icon size={20} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* --- RIGHT COLUMN: The Form --- */}
          <motion.div 
            variants={itemVariants}
            className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-50"
          >
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] text-gray-400 uppercase font-bold tracking-widest ml-1">Your Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    className="w-full bg-gray-50/50 border-b border-gray-200 py-4 px-1 text-[#1A1A1A] focus:outline-none focus:border-[#C19B76] transition-all placeholder:text-gray-300"
                    placeholder="Full Name"
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-3">
                  <label className="text-[10px] text-gray-400 uppercase font-bold tracking-widest ml-1">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    className="w-full bg-gray-50/50 border-b border-gray-200 py-4 px-1 text-[#1A1A1A] focus:outline-none focus:border-[#C19B76] transition-all placeholder:text-gray-300"
                    placeholder="+1 (000) 000-0000"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] text-gray-400 uppercase font-bold tracking-widest ml-1">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  className="w-full bg-gray-50/50 border-b border-gray-200 py-4 px-1 text-[#1A1A1A] focus:outline-none focus:border-[#C19B76] transition-all placeholder:text-gray-300"
                  placeholder="email@example.com"
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] text-gray-400 uppercase font-bold tracking-widest ml-1">Message</label>
                <textarea 
                  name="message"
                  rows={4}
                  className="w-full bg-gray-50/50 border-b border-gray-200 py-4 px-1 text-[#1A1A1A] focus:outline-none focus:border-[#C19B76] transition-all resize-none placeholder:text-gray-300"
                  placeholder="Tell us about your requirements..."
                  onChange={handleChange}
                />
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-6 bg-[#1A1A1A] text-white rounded-2xl font-bold tracking-widest uppercase text-xs hover:bg-[#C19B76] transition-all duration-500 shadow-xl flex items-center justify-center gap-3 group"
              >
                Submit Request
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </form>
          </motion.div>

        </div>
      </motion.div>
    </section>
  )
}