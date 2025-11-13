"use client";

import { ChevronDown } from "lucide-react";
import { useRef } from "react";

interface HeroSectionProps {
  isLoaded: boolean;
}

export default function HeroSection({ isLoaded }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="relative w-full h-screen overflow-hidden pt-20">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://vid.cdn-website.com/af96ba03/videos/PphcnapRdy9GokrBUKV5_Ciel+Bleu+%281%29-v.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
        <div
          className={`max-w-3xl transition-all duration-1000 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Restaurant Name */}
          <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 animate-fade-in">
            Aroma Amoris
          </h1>

          {/* Tagline */}
          <p
            className="text-xl md:text-2xl text-accent mb-8 font-light animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            Where Taste Meets Artistry
          </p>

          {/* CTA Button */}
          {/* <button
            className="px-8 py-3 bg-accent text-accent-foreground font-semibold rounded hover:bg-accent/90 transition-all duration-300 transform hover:scale-105 animate-slide-up"
            // href='#reservation'
            style={{ animationDelay: "0.4s" }}
          >
            Book a Table
          </button> */}
          <button
            onClick={() => {
              const section = document.getElementById("reservation");
              section?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-3 bg-accent text-accent-foreground font-semibold rounded hover:bg-accent/90 transition-all duration-300 transform hover:scale-105 animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            Book a Table
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 animate-bounce">
          <ChevronDown className="w-8 h-8 text-accent" />
        </div>
      </div>

      {/* Placeholder image since video won't work in preview */}
      <img
        src="/fine-dining-restaurant-interior-with-elegant-ambia.jpg"
        alt="Aroma Amoris Restaurant"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />
    </section>
  );
}
