// "use client"

// import { useEffect, useState } from "react"
// import { useLanguage } from "@/context/language-context"
// import { ChevronDown } from "lucide-react"
// import Image from "next/image"

// export function Hero() {
//   const { t } = useLanguage()
//   const [loaded, setLoaded] = useState(false)

//   useEffect(() => {
//     const timer = setTimeout(() => setLoaded(true), 200)
//     return () => clearTimeout(timer)
//   }, [])

//   return (
//     <section id="home" className="relative flex h-screen items-center justify-center overflow-hidden">
//       {/* Background Image with overlay */}
//       <div className="absolute inset-0">
//         <Image
//           src="/images/hero-poster.jpg"
//           alt="Aroma Amoris restaurant interior"
//           fill
//           className="object-cover"
//           priority
//           sizes="100vw"
//         />
//         <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
//       </div>

//       {/* Content */}
//       <div className="relative z-10 flex flex-col items-center px-6 text-center">
//         {/* Decorative line */}
//         <div
//           className={`mb-8 h-px w-16 bg-primary transition-all duration-1000 ease-out ${
//             loaded ? "w-24 opacity-100" : "w-0 opacity-0"
//           }`}
//         />

//         {/* Logo Text */}
//         <h1
//           className={`font-serif text-5xl font-bold tracking-wider text-gold-gradient transition-all duration-1000 ease-out sm:text-6xl md:text-7xl lg:text-8xl ${
//             loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
//           }`}
//           style={{ transitionDelay: "200ms" }}
//         >
//           <span className="text-balance">Aroma Amoris</span>
//         </h1>

//         {/* Subtitle */}
//         <p
//           className={`mt-6 max-w-lg text-sm font-light tracking-[0.3em] uppercase text-foreground/60 transition-all duration-1000 ease-out sm:text-base ${
//             loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
//           }`}
//           style={{ transitionDelay: "500ms" }}
//         >
//           {t("hero.subtitle")}
//         </p>

//         {/* Decorative line */}
//         <div
//           className={`mt-8 h-px w-16 bg-primary/40 transition-all duration-1000 ease-out ${
//             loaded ? "w-16 opacity-100" : "w-0 opacity-0"
//           }`}
//           style={{ transitionDelay: "700ms" }}
//         />
//       </div>

//       {/* Scroll Indicator */}
//       <div
//         className={`absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 transition-all duration-1000 ${
//           loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
//         }`}
//         style={{ transitionDelay: "1000ms" }}
//       >
//         <span className="text-xs tracking-[0.2em] uppercase text-foreground/40">
//           {t("hero.scroll")}
//         </span>
//         <ChevronDown size={16} className="animate-bounce text-primary/60" />
//       </div>
//     </section>
//   )
// }
"use client";

import { useLanguage } from "@/context/language-context";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

interface HeroSectionProps {
  isLoaded: boolean;
}

export default function Hero({ isLoaded }: HeroSectionProps) {
  const { t } = useLanguage();
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
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
        <Image
          src="/images/logo.png"
          alt="Aroma Amoris Logo"
          width={150}
          height={150}
          className="h-28 w-auto object-contain "
          priority
        />
        <div
          className={`max-w-3xl transition-all duration-1000 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Restaurant Name */}
          <h1
            className="font-tangerine text-6xl md:text-7xl lg:text-9xl font-bold text-foreground  animate-fade-in tracking-wider "
            style={{ transitionDelay: "200ms" }}
          >
            Aroma Amoris
          </h1>

          {/* Tagline */}
          <p
            className="text-xl md:text-4xl text-primary mb-8 font-light animate-slide-up tracking-wider font-tangerine
"
          >
            {/* Where Taste Meets Artistry */}
            {t("hero.subtitle")}
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
            className="px-8 py-3 bg-primary text-foreground font-semibold rounded hover:bg-accent/90 transition-all duration-300 transform hover:scale-105 animate-slide-up "
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
