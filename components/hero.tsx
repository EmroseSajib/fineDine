"use client";

import { useLanguage } from "@/context/language-context";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

interface HeroSectionProps {
  isLoaded: boolean;
}

export default function Hero({ isLoaded }: HeroSectionProps) {
  const { t } = useLanguage();

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/coverImage.png"
          alt="Restaurant Background"
          fill
          priority
          quality={100}
          className="object-cover object-bottom"
        />
      </div>

      {/* Black Shadow Overlay */}
      <div className="absolute inset-0 bg-black/10 z-10" />

      {/* Extra Gradient Shadow */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 z-10" />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
        {/* Logo */}
        <Image
          src="/images/logo2.png"
          alt="Aroma Amoris Logo"
          width={160}
          height={160}
          priority
          className="w-auto h-28 md:h-36 object-contain mb-4"
        />

        <div
          className={`max-w-4xl transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Title */}
          <h1
            className="font-tangerine text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-wider drop-shadow-2xl"
            style={{ transitionDelay: "200ms" }}
          >
            Aroma Amoris
          </h1>

          {/* Subtitle */}
          <p
            className="mt-4 text-2xl md:text-4xl text-white/90 font-light tracking-wider font-tangerine drop-shadow-lg"
            style={{ animationDelay: "0.2s" }}
          >
            {t("hero.subtitle")}
          </p>

          {/* Button */}
          <button
            onClick={() => {
              const section = document.getElementById("contact");
              section?.scrollIntoView({ behavior: "smooth" });
            }}
            className="mt-8 px-8 py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary/80 transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            Book a Table
          </button>
        </div>

        {/* Scroll Icon */}
        <div className="absolute bottom-8 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white" />
        </div>
      </div>
    </section>
  );
}
