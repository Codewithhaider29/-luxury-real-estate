"use client"

import { useEffect, useState } from "react"
import LoadingScreen from "@/components/loading-screen"
import Header from "@/components/header"
import Hero from "@/components/hero"
import Statistics from "@/components/statistics"
import AboutParallax from "@/components/about-parallax"
import FeaturesGrid from "@/components/features-grid"
import ParallaxBuilding from "@/components/parallax-building"
import GalleryGrid from "@/components/gallery-grid"
import ListingsTable from "@/components/listings-table"
import CTASection from "@/components/cta-section"
import Neighborhood from "@/components/neighborhood"
import FloorPlans from "@/components/floor-plans"
import BlogSection from "@/components/blog-section"
import Partners from "@/components/partners"
import UpcomingProjects from "@/components/upcoming-projects"
import Testimonials from "@/components/testimonials"
import Footer from "@/components/footer"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <main className="overflow-hidden">
      <Header />
      <div id="home">
        <Hero />
      </div>
      <Statistics />
      <ParallaxBuilding />
      <div id="about">
        <AboutParallax />
      </div>
      <FeaturesGrid />
      <GalleryGrid />
      <ListingsTable />
      <CTASection />
      <div id="properties">
        <Neighborhood />
        <FloorPlans />
      </div>
      <div id="blog">
        <BlogSection />
      </div>
      <Partners />
      <UpcomingProjects />
      <Testimonials />
      <Footer />
    </main>
  )
}
