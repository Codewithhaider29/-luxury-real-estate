"use client"

import { useEffect, useState } from "react"
import LoadingScreen from "@/components/loading-screen"
import Header from "@/components/header"
import Hero from "@/components/hero"
import Statistics from "@/components/statistics"
import AboutParallax from "@/components/about-parallax"
import GalleryGrid from "@/components/gallery-grid"
import ListingsTable from "@/components/listings-table"
import Features from "@/components/features-section"
import FloorPlans from "@/components/floor-plans"
import Partners from "@/components/partners"
import UpcomingProjects from "@/components/upcoming-projects"
import Testimonials from "@/components/testimonials"
import ContactSection from "@/components/contact-section"
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
      <div id="about">
        <AboutParallax />
      </div>
      <GalleryGrid />
      <ListingsTable />
      <Features />
      <div id="properties">
        <FloorPlans />
      </div>
      
      <Partners />
      <UpcomingProjects />
      <Testimonials />
      <ContactSection />
      <Footer />
    </main>
  )
}
