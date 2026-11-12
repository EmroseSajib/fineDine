"use client";

import { useLanguage } from "@/context/language-context";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { MessageCircle } from "lucide-react";

export function Allergies() {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <section
      id="allergies"
      className="relative isolate overflow-hidden py-20 lg:py-24"
    >
      {/* Background atmosphere */}

      <div
        ref={ref}
        className={`mx-auto max-w-7xl px-6 transition-all duration-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center md:mb-20">
          {/* <span className="text-[10px] font-medium uppercase tracking-[0.45em] text-[#C5A46D] md:text-xs">
            Aroma Amoris
          </span> */}

          <h2 className="mt-4 font-serif text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
            <span className="text-balance">{t("allergies.title")}</span>
          </h2>

          <div className="mx-auto mt-7 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-[#C5A46D]/50" />
            <div className="h-1.5 w-1.5 rotate-45 bg-[#C5A46D]" />
            <div className="h-px w-12 bg-[#C5A46D]/50" />
          </div>

          <p className="mx-auto mt-7 max-w-xl text-sm leading-8 text-[#E7E0D4]/65 md:text-base">
            Please let us know about your dietary requirements before your
            visit.
          </p>
        </div>

        {/* Information panels */}
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 md:gap-7">
          {/* Dietary restrictions */}
          <article className="group relative border border-[#C5A46D]/20 bg-white/[0.025] p-8 transition-all duration-500 hover:border-[#C5A46D]/50 hover:bg-white/[0.045] md:p-10 lg:p-12">
            <div className="flex items-center justify-between">
              {/* <span className="font-serif text-4xl text-[#C5A46D]/50">01</span> */}
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#E7E0D4]/35">
                Dietary care
              </span>
            </div>

            <div className="my-8 h-px w-12 bg-[#C5A46D]/60 transition-all duration-500 group-hover:w-20" />

            <p className="max-w-lg font-serif text-lg leading-[1.9] text-[#F4EFE5]/85 md:text-lg">
              {t("allergies.paragraph1")}
            </p>
          </article>

          {/* Special arrangements */}
          <article className="group relative border border-[#C5A46D]/35 bg-[#C5A46D]/[0.055] p-8 transition-all duration-500 hover:border-[#C5A46D]/60 hover:bg-[#C5A46D]/[0.09] md:p-10 lg:p-12">
            <div className="flex items-center justify-between">
              {/* <span className="font-serif text-4xl text-[#C5A46D]/65">02</span> */}
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#E7E0D4]/40">
                Special requests
              </span>
            </div>

            <div className="my-8 h-px w-12 bg-[#C5A46D]/70 transition-all duration-500 group-hover:w-20" />

            <p className="max-w-lg font-serif text-lg leading-[1.9] text-[#F4EFE5]/90 md:text-lg">
              {t("allergies.paragraph2")}
            </p>
          </article>
        </div>

        {/* Contact area */}
        <div className="mx-auto mt-20 max-w-4xl text-center md:mt-24">
          <div className="mx-auto mb-8 flex items-center justify-center gap-4">
            <div className="h-px w-10 bg-[#C5A46D]/35" />
            <MessageCircle className="h-4 w-4 text-[#C5A46D]" />
            <div className="h-px w-10 bg-[#C5A46D]/35" />
          </div>

          <p className="mx-auto max-w-2xl font-serif text-lg italic leading-[1.9] text-[#F4EFE5]/85 md:text-xl">
            {t("allergies.contact")}
          </p>
        </div>
      </div>
    </section>
  );
}
