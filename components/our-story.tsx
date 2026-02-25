"use client";

import { useLanguage } from "@/context/language-context";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import Image from "next/image";

export function OurStory() {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section id="about" className="alpana-gate relative py-24 lg:py-32">
      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Label */}
        <div
          className={`mb-16 text-center transition-all duration-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-foreground">
            {t("story.label")}
          </span>
          <h2 className="mt-4 font-serif text-4xl font-bold text-[#ffbf00be] md:text-5xl lg:text-6xl">
            <span className="text-balance">{t("story.title")}</span>
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-primary/40" />
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          {/* Image */}
          <div
            className={`relative w-full overflow-hidden lg:w-1/2 transition-all duration-1000 ease-out ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-12 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/story.jpg"
                alt="Chef preparing a fine dining dish"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Golden border accent */}
              <div className="absolute inset-0 border border-primary/20" />
            </div>
            {/* Decorative offset frame */}
            <div className="absolute -bottom-4 -right-4 -z-10 hidden h-full w-full border border-primary/10 lg:block" />
          </div>

          {/* Text */}
          <div
            className={`w-full lg:w-1/2 transition-all duration-1000 ease-out ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-12 opacity-0"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <p className="text-base leading-relaxed text-foreground/70 lg:text-lg">
              {t("story.p1")}
            </p>
            <p className="mt-6 text-base leading-relaxed text-foreground/70 lg:text-lg">
              {t("story.p2")}
            </p>
            <div className="mt-8 h-px w-24 bg-primary/30" />
            <p className="mt-6 font-serif text-lg italic text-primary/80">
              {'"L\'amour de la cuisine"'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
