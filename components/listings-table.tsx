"use client"

import { motion, Variants } from "framer-motion"
import { ArrowUpRight, BedDouble, Bath, Car, Maximize, ArrowRight } from "lucide-react"

interface Property {
  id: number
  name: string
  sqft: number
  beds: number
  baths: number
  parking: number
  price: string
}

const properties: Property[] = [
  { id: 1, name: "Tower One 219A", sqft: 1600, beds: 3, baths: 2, parking: 1, price: "$25,800.00" },
  { id: 2, name: "Tower One 602A", sqft: 695, beds: 2, baths: 1, parking: 0, price: "$9,500.00" },
  { id: 3, name: "Tower Three 911D", sqft: 795, beds: 2, baths: 2, parking: 0, price: "$800.00" },
  { id: 4, name: "Tower Seven 503F", sqft: 1230, beds: 3, baths: 2, parking: 1, price: "$12,800.00" },
  { id: 5, name: "Tower Seven 803G", sqft: 2200, beds: 4, baths: 2, parking: 2, price: "$37,900.00" },
  { id: 6, name: "Tower Eight 209C", sqft: 1600, beds: 2, baths: 2, parking: 1, price: "$19,800.00" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
}

export default function ListingsTable() {
  return (
    <section className="bg-white py-24 px-6 border-t border-[#F0F0F0]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20 space-y-4"
        >
          <div className="inline-block w-12 h-[2px] bg-[#C19B76] mb-4" />
          <h2 className="text-4xl md:text-5xl font-light text-[#1a1a1a] tracking-tight">
            Available apartments ready for you
          </h2>
          <p className="text-[#666] font-light max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Move into thoughtfully designed apartments offering comfort, style, and convenience. Each space is crafted to suit your lifestyle.
          </p>
        </motion.div>

        {/* Listings Table */}
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-0"
        >
            {/* Table Header (Hidden on Mobile) */}
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-[#E5E5E5] text-xs font-bold tracking-[0.15em] text-[#999] uppercase px-6">
                <div className="col-span-3">Property Name</div>
                <div className="col-span-5 text-center">Specifications</div>
                <div className="col-span-2 text-right">Price</div>
                <div className="col-span-2 text-right">Action</div>
            </div>

            {/* Data Rows */}
            {properties.map((property) => (
                <motion.div 
                    key={property.id}
                    variants={itemVariants}
                    className="group relative grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-4 items-center py-8 md:py-6 border-b border-[#F0F0F0] hover:bg-[#FAFAFA] transition-colors duration-300 px-2 md:px-6 cursor-pointer"
                >
                    {/* Name */}
                    <div className="col-span-12 md:col-span-3">
                        <h3 className="text-[#1a1a1a] text-lg font-normal group-hover:text-[#C19B76] transition-colors duration-300">
                            {property.name}
                        </h3>
                    </div>

                    {/* Specifications */}
                    <div className="col-span-12 md:col-span-5 flex flex-wrap items-center md:justify-center gap-6 md:gap-10 text-[#888]">
                        
                        <div className="flex items-center gap-2 group/icon" title="Area">
                            <Maximize className="w-4 h-4 text-[#CCC] group-hover:text-[#C19B76] transition-colors duration-300" />
                            <span className="text-sm font-light text-[#555] group-hover:text-[#1a1a1a] transition-colors">{property.sqft} sqf</span>
                        </div>

                        <div className="flex items-center gap-2 group/icon" title="Bedrooms">
                            <BedDouble className="w-4 h-4 text-[#CCC] group-hover:text-[#C19B76] transition-colors duration-300" />
                            <span className="text-sm font-light text-[#555] group-hover:text-[#1a1a1a] transition-colors">{property.beds}</span>
                        </div>

                        <div className="flex items-center gap-2 group/icon" title="Bathrooms">
                            <Bath className="w-4 h-4 text-[#CCC] group-hover:text-[#C19B76] transition-colors duration-300" />
                            <span className="text-sm font-light text-[#555] group-hover:text-[#1a1a1a] transition-colors">{property.baths}</span>
                        </div>

                        <div className="flex items-center gap-2 group/icon" title="Parking">
                            <Car className="w-4 h-4 text-[#CCC] group-hover:text-[#C19B76] transition-colors duration-300" />
                            <span className="text-sm font-light text-[#555] group-hover:text-[#1a1a1a] transition-colors">{property.parking}</span>
                        </div>

                    </div>

                    {/* Price */}
                    <div className="col-span-6 md:col-span-2 md:text-right">
                        <span className="text-[#1a1a1a] text-lg font-medium tracking-wide">
                            {property.price}
                        </span>
                    </div>

                    {/* Action Button */}
                    <div className="col-span-6 md:col-span-2 flex justify-end">
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-6 py-2.5 rounded-sm bg-white border border-[#E5E5E5] text-[#1a1a1a] text-xs font-bold uppercase tracking-wider hover:bg-[#1a1a1a] hover:border-[#1a1a1a] hover:text-white transition-all duration-300"
                        >
                            Details
                            <ArrowUpRight className="w-3 h-3 text-[#C19B76] group-hover:text-white transition-colors" />
                        </motion.button>
                    </div>
                </motion.div>
            ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-20 flex justify-center"
        >
            <button className="flex items-center gap-3 px-8 py-4 bg-[#C19B76] text-white rounded-sm hover:bg-[#1a1a1a] transition-all duration-300 font-bold text-xs uppercase tracking-widest group shadow-xl shadow-[#C19B76]/20 hover:shadow-none">
              View Full Inventory
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
        </motion.div>

      </div>
    </section>
  )
}