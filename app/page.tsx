"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import HeroSection from "@/components/sections/hero-section"
import AboutSection from "@/components/sections/about-section"
import MenuSection from "@/components/sections/menu-section"
import ChefSpecialsSection from "@/components/sections/chef-specials-section"
import GallerySection from "@/components/sections/gallery-section"
import ReservationSection from "@/components/sections/reservation-section"
import TestimonialsSection from "@/components/sections/testimonials-section"
import LocationSection from "@/components/sections/location-section"
import Footer from "@/components/footer"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <main className="bg-background text-foreground">
      <Navigation />
      <HeroSection isLoaded={isLoaded} />
      <AboutSection />
      <MenuSection />
      <ChefSpecialsSection />
      <GallerySection />
      <ReservationSection />
      <TestimonialsSection />
      <LocationSection />
      <Footer />
    </main>
  )
}
