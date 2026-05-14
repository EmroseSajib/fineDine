// "use client";

// import { useLanguage } from "@/context/language-context";
// import { ChevronDown } from "lucide-react";
// import Image from "next/image";

// interface HeroSectionProps {
//   isLoaded: boolean;
// }

// export default function Hero({ isLoaded }: HeroSectionProps) {
//   const { t } = useLanguage();

//   return (
//     <section className="relative w-full h-screen overflow-hidden">
//       {/* Background Image */}
//       <div className="absolute inset-0">
//         <Image
//           src="/images/coverImage.png"
//           alt="Restaurant Background"
//           fill
//           priority
//           quality={100}
//           className="object-cover object-center"
//         />
//       </div>

//       {/* Black Shadow Overlay */}
//       <div className="absolute inset-0  z-10" />

//       {/* Extra Gradient Shadow */}
//       <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 z-10" />

//       {/* Content */}
//       <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
//         {/* Logo */}
//         <Image
//           src="/images/logo2.png"
//           alt="Aroma Amoris Logo"
//           width={160}
//           height={160}
//           priority
//           className="w-auto h-28 md:h-36 object-contain mb-4"
//         />

//         <div
//           className={`max-w-4xl transition-all duration-1000 ${
//             isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
//           }`}
//         >
//           {/* Title */}
//           <h1
//             className="font-tangerine text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-wider drop-shadow-2xl"
//             style={{ transitionDelay: "200ms" }}
//           >
//             Aroma Amoris
//           </h1>

//           {/* Subtitle */}
//           <p
//             className="mt-4 text-2xl md:text-4xl text-white/90 font-light tracking-wider font-tangerine drop-shadow-lg"
//             style={{ animationDelay: "0.2s" }}
//           >
//             {t("hero.subtitle")}
//           </p>

//           {/* Button */}
//           <button
//             onClick={() => {
//               const section = document.getElementById("contact");
//               section?.scrollIntoView({ behavior: "smooth" });
//             }}
//             className="mt-8 px-8 py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary/80 transition-all duration-300 transform hover:scale-105 shadow-2xl"
//           >
//             {t("hero.table")}
//           </button>
//         </div>

//         {/* Scroll Icon */}
//         <div className="absolute bottom-8 animate-bounce">
//           <ChevronDown className="w-8 h-8 text-white" />
//         </div>
//       </div>
//     </section>
//   );
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
          src="https://res.cloudinary.com/dmjccgqva/video/upload/v1778782377/amoraamoris_z4wjeh.mp4"
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
            {t("hero.table")}
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
