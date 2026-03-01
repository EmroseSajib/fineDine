"use client";

import { useLanguage } from "@/context/language-context";
import menuData from "@/data/menu.json";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useState } from "react";

type Category = "starters" | "desserts" | "drinks";

interface MenuItem {
  id: string;
  name: { nl: string; en: string };
  description: { nl: string; en: string };
  price: string;
}

export function MenuSection() {
  const { lang, t } = useLanguage();
  const { ref, isVisible } = useScrollReveal(0.1);
  const [activeCategory, setActiveCategory] = useState<Category>("starters");

  const categories: Category[] = ["starters", "desserts", "drinks"];
  const items = (menuData[activeCategory] as MenuItem[]) || [];

  return (
    <section
      id="menu"
      className="alpana-overlay relative py-24 lg:py-32 bg-[#2c3233]"
    >
      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div
          className={`mb-16 text-center transition-all duration-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-primary">
            {t("menu.label")}
          </span>
          <h2 className="mt-4 font-serif text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
            {t("menu.title")}
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-primary/40" />
        </div>

        {/* Category Tabs */}
        {/* <div
          className={`mb-12 flex flex-wrap items-center justify-center gap-2 transition-all duration-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-sm px-5 py-2.5 text-sm font-medium tracking-wide transition-all duration-300 ${
                activeCategory === cat
                  ? "border border-primary bg-primary/10 text-primary"
                  : "border border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
              }`}
            >
              {t(`menu.categories.${cat}`)}
            </button>
          ))}
        </div> */}

        {/* Menu Items */}
        <div className="mx-auto grid max-w-4xl gap-0">
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`group flex flex-col gap-2 border-b border-border/50 py-8 transition-all duration-500 ease-out sm:flex-row sm:items-start sm:justify-between ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <div className="flex-1">
                <h3 className="font-serif text-xl font-semibold text-foreground transition-colors duration-300 group-hover:text-primary">
                  {item?.name[lang]}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {item?.description[lang]}
                </p>
              </div>
              <div className="flex items-center gap-4 sm:ml-8">
                <div className="hidden h-px flex-1 bg-border/30 sm:block sm:min-w-[40px]" />
                <span className="font-serif text-lg font-semibold text-primary">
                  {item?.price}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="mx-auto  mt-12 max-w-3xl rounded-md border border-border/40  bg-primary/5 px-6 py-6 text-center">
          <p className="text-sm leading-relaxed text-amber-50/85">
            {lang === "en" ? (
              <>
                For matching wines with your dishes, please ask the host or
                hostess. <br />
                For each change of courses we charge an additional € 3,50.
              </>
            ) : (
              <>
                Voor bijpassende wijnen bij uw gerechten, vraag gerust de
                gastheer of gastvrouw. <br />
                Voor elke wisseling van gang rekenen wij een toeslag van € 3,50.
              </>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
