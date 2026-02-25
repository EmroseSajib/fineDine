"use client";

import { ChefSpecials } from "@/components/chef-specials";
import { Footer } from "@/components/footer";
import { Gallery } from "@/components/gallery";
import Hero from "@/components/hero";
import { Location } from "@/components/location";
import { MenuSection } from "@/components/menu-section";
import { Navbar } from "@/components/navbar";
import { OurStory } from "@/components/our-story";
import { Reservation } from "@/components/reservation";
import { Reviews } from "@/components/reviews";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <main>
      <Navbar />
      <Hero isLoaded={isLoaded} />
      <OurStory />
      <MenuSection />
      <ChefSpecials />
      <Gallery />
      <Reservation />
      <Reviews />
      <Location />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
