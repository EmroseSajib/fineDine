"use client";

import { useLanguage } from "@/context/language-context";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import Image from "next/image";
import { useState } from "react";

export function OurStory() {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollReveal(0.15);

  // 👇 Add this
  const [showMore, setShowMore] = useState(false);

  return (
    <section
      id="about"
      className="alpana-gate relative overflow-hidden bg-black pt-10 md:py-28 lg:py-36"
    >
      {/* 🌑 Top cinematic shadow fade */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-black/90 via-black/60 to-transparent z-10" />

      {/* Soft luxury glow background */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div ref={ref} className="relative z-20 mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <div
          className={`text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="lg:mt-5 mt-20 font-serif text-4xl md:text-6xl text-primary leading-tight">
            {t("story.title")}
          </h2>

          <div className="mx-auto mt-6 h-px w-20 bg-primary/40" />
        </div>

        {/* GRID */}
        <div className="mt-20 grid gap-16 lg:grid-cols-12 items-start">
          {/* IMAGE HERO */}
          <div
            className={`lg:col-span-5 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="relative aspect-[4/5] overflow-hidden border border-white/10">
              <Image
                src="/images/story.jpg"
                alt="Aroma Amoris Story"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />

              {/* Luxury overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />

              {/* Caption */}
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-xs tracking-[0.3em] text-white/70 uppercase">
                  Aroma Amoris
                </p>
                <p className="mt-2 font-serif text-lg text-white/90 italic">
                  “Where two worlds meet on a plate”
                </p>
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="lg:col-span-7 space-y-14 relative">
            {/* subtle vertical line */}
            <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />

            {/* INTRO */}
            <div className="pl-8 border-l border-white/10">
              <h3 className="font-serif text-xl uppercase tracking-wide text-primary/90 mb-3">
                Origin
              </h3>

              {/* 👇 Mobile short text */}
              <div className="block md:hidden">
                <p className="text-white/70 leading-relaxed">
                  {showMore
                    ? t("story.intro")
                    : `${t("story.intro").slice(0, 180)}...`}
                </p>

                <button
                  onClick={() => setShowMore(!showMore)}
                  className="mt-4 text-sm uppercase tracking-[0.2em] text-primary border-b border-primary/40 pb-1 hover:text-white transition"
                >
                  {showMore ? "Read Less" : "Read More"}
                </button>
              </div>

              {/* 👇 Full text desktop */}
              <p className="hidden md:block text-white/70 leading-relaxed">
                {t("story.intro")}
              </p>
            </div>

            {/* 👇 Hide below content on mobile until read more */}
            <div
              className={`space-y-14 ${
                !showMore ? "hidden md:block" : "block"
              }`}
            >
              {/* CONCEPT */}
              <div className="pl-8 border-l border-white/10">
                <h3 className="font-serif text-xl uppercase tracking-wide text-primary/90 mb-3">
                  Concept
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {t("story.concept")}
                </p>
              </div>

              {/* FOUNDERS */}
              <div className="grid gap-6 md:grid-cols-3">
                {/* Aprul */}
                <div className="p-6 border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/[0.07] transition-all duration-500">
                  <h4 className="font-serif text-lg text-primary">
                    {t("story.aprul.name")}
                  </h4>
                  <p className="text-xs text-white/50 mb-3">
                    {t("story.aprul.role")}
                  </p>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {t("story.aprul.description")}
                  </p>
                </div>

                {/* Fahim */}
                <div className="p-6 border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/[0.07] transition-all duration-500">
                  <h4 className="font-serif text-lg text-primary">
                    {t("story.fahim.name")}
                  </h4>
                  <p className="text-xs text-white/50 mb-3">
                    {t("story.fahim.role")}
                  </p>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {t("story.fahim.description")}
                  </p>
                </div>

                {/* Esrat */}
                <div className="p-6 border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/[0.07] transition-all duration-500">
                  <h4 className="font-serif text-lg text-primary">
                    {t("story.esrat.name")}
                  </h4>
                  <p className="text-xs text-white/50 mb-3">
                    {t("story.esrat.role")}
                  </p>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {t("story.esrat.description")}
                  </p>
                </div>
              </div>

              {/* PHILOSOPHY */}
              <div className="border-t border-white/10 pt-10">
                <p className="text-white/80 italic leading-relaxed text-lg">
                  {t("story.ending")}
                </p>
                <p className="text-white/80 italic leading-relaxed text-lg">
                  {t("story.invitation")}
                </p>

                <p className="mt-6 text-primary font-serif italic text-xl">
                  {t("story.signtop")}
                </p>
                <p className=" text-primary font-serif italic text-xl">
                  {t("story.signature")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
