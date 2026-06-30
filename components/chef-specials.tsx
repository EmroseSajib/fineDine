"use client";

import { useLanguage } from "@/context/language-context";
import menuData from "@/data/menu.json";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import Image from "next/image";

interface ChefSpecialItem {
  id: string;
  name: { nl: string; en: string };
  description: { nl: string; en: string };
  price: string;
  image: string;
}

export function ChefSpecials() {
  const { lang, t } = useLanguage();
  const { ref, isVisible } = useScrollReveal(0.1);

  const specials = menuData.chefSpecials as ChefSpecialItem[];

  return (
    <section className="alpana-overlay-left relative py-24 lg:py-32">
      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div
          className={`mb-16 text-center transition-all duration-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-primary">
            {t("chefSpecial.label")}
          </span>
          <h2 className="mt-4 font-serif text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
            {t("chefSpecial.title")}
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-primary/40" />
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {specials.map((item, index) => (
            <div
              key={item.id}
              className={`group gold-glow relative overflow-hidden rounded-sm border border-primary/20 bg-card transition-all duration-700 ease-out hover:border-primary/40 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name[lang]}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-serif text-xl font-semibold text-foreground">
                  {item.name[lang]}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description[lang]}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-serif text-xl font-bold text-primary">
                    {item.price}
                  </span>
                  <div className="h-px flex-1 mx-4 bg-primary/20" />
                  <span className="text-xs tracking-[0.2em] uppercase text-primary/60">
                    {t("chefSpecial.label")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
