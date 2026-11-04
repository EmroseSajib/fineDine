"use client";

import { useLanguage } from "@/context/language-context";
import menuData from "@/data/menu.json";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import type { LucideIcon } from "lucide-react";
import { Gift, Snowflake, Sparkles, Star, TreePine } from "lucide-react";
import { useState } from "react";

type Category = "starters" | "desserts" | "drinks";

interface MenuItem {
  id: string;
  name: { nl: string; en: string };
  description: { nl: string; en: string };
  price: string;
}

interface ChristmasCourse {
  id: string;
  icon: LucideIcon;
  label: { nl: string; en: string };
  dish: { nl: string[]; en: string[] };
}

const christmasMenu = {
  title: { nl: "Kerstmenu 2026", en: "Christmas Menu 2026" },
  dates: { nl: "24, 25 en 26 december", en: "24, 25 & 26 December" },
  subtitle: { nl: "Viergangen", en: "Four-Course" },
  price: "€ 89,50",
  courses: [
    {
      id: "starter",
      icon: Snowflake,
      label: { nl: "Entree", en: "Starter" },
      dish: {
        nl: ["Gamba", "Zwarte rijst", "Kreeftensaus", "Paling"],
        en: ["Prawn", "Black rice", "Lobster sauce", "Eel"],
      },
    },
    {
      id: "intermediate",
      icon: Star,
      label: { nl: "Tussengerecht", en: "Intermediate course" },
      dish: {
        nl: ["Kwartelfilet", "Zwarte knoflook", "Kerrie blad", "Kokos"],
        en: ["Quail fillet", "Black garlic", "Curry leaf", "Coconut"],
      },
    },
    {
      id: "main",
      icon: TreePine,
      label: { nl: "Hoofdgerecht", en: "Main course" },
      dish: {
        nl: [
          "Hertenhaas",
          "Eendenlever mousse",
          "Kala Bhuna saus",
          "Truffeljus",
        ],
        en: [
          "Venison tenderloin",
          "Duck liver mousse",
          "Kala Bhuna sauce",
          "Truffle jus",
        ],
      },
    },
    {
      id: "dessert",
      icon: Gift,
      label: { nl: "Dessert", en: "Dessert" },
      dish: {
        nl: [
          "Pistache en Amandel basque",
          "Framboos saus",
          "Champagne sorbet",
          "Roos en saffraan mousse",
        ],
        en: [
          "Pistachio and Almond Basque",
          "Raspberry sauce",
          "Champagne sorbet",
          "Rose and saffron mousse",
        ],
      },
    },
  ] satisfies ChristmasCourse[],
};

export function MenuSection() {
  const { lang, t } = useLanguage();
  const { ref, isVisible } = useScrollReveal(0.1);
  const { ref: xmasRef, isVisible: xmasVisible } = useScrollReveal(0.1);
  const [activeCategory, setActiveCategory] = useState<Category>("starters");

  const categories: Category[] = ["starters", "desserts", "drinks"];
  const items = (menuData[activeCategory] as MenuItem[]) || [];

  return (
    <>
      <section id="menu" className="relative py-24 lg:py-32 ">
        <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-6">
          {/* Section Header */}
          <div
            className={`mb-16 text-center transition-all duration-700 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
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
          <div className="mx-auto mt-12 max-w-3xl rounded-md border border-border/40 bg-primary/5 px-6 py-6 text-center">
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
                  Voor elke wisseling van gang rekenen wij een toeslag van €
                  3,50.
                </>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Christmas Menu */}
      <section
        id="kerstmenu"
        className="relative overflow-hidden pb-24 lg:pb-32"
      >
        {/* Decorative background snowflakes */}
        <Snowflake className="pointer-events-none absolute left-[6%] top-10 h-16 w-16 text-primary/10" />
        <Snowflake className="pointer-events-none absolute right-[8%] top-40 h-24 w-24 rotate-12 text-primary/10" />
        <Snowflake className="pointer-events-none absolute bottom-20 left-[12%] h-20 w-20 -rotate-12 text-primary/10" />
        <Star className="pointer-events-none absolute bottom-32 right-[10%] h-10 w-10 text-primary/10" />

        <div ref={xmasRef} className="relative z-10 mx-auto max-w-7xl px-6">
          <div
            className={`mb-16 text-center transition-all duration-700 ease-out ${
              xmasVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <TreePine className="mx-auto mb-4 h-10 w-10 text-primary" />
            <span className="text-xs font-medium tracking-[0.3em] uppercase text-primary">
              {christmasMenu.dates[lang]}
            </span>
            <h2 className="mt-4 font-serif text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
              {christmasMenu.title[lang]}
            </h2>
            <p className="mt-4 font-serif text-lg text-muted-foreground">
              {christmasMenu.subtitle[lang]} —{" "}
              <span className="font-semibold text-primary">
                {christmasMenu.price}
              </span>
            </p>

            {/* Divider with sparkle */}
            <div className="mx-auto mt-6 flex max-w-xs items-center justify-center gap-3">
              <div className="h-px flex-1 bg-primary/40" />
              <Sparkles className="h-4 w-4 text-primary" />
              <div className="h-px flex-1 bg-primary/40" />
            </div>
          </div>

          <div className="mx-auto grid max-w-4xl gap-0">
            {christmasMenu.courses.map((course, index) => {
              const Icon = course.icon;
              return (
                <div
                  key={course.id}
                  className={`group border-b border-border/50 py-8 text-center transition-all duration-500 ease-out ${
                    xmasVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-6 opacity-0"
                  }`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="text-xs font-medium tracking-[0.3em] uppercase text-primary">
                    {course.label[lang]}
                  </h3>
                  <p className="mt-3 font-serif text-xl font-semibold leading-relaxed text-foreground transition-colors duration-300 group-hover:text-primary">
                    {course.dish[lang].join(" | ")}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Closing ornament */}
          <div className="mt-12 flex items-center justify-center gap-4 text-primary/60">
            <Snowflake className="h-5 w-5" />
            <Star className="h-5 w-5" />
            <Snowflake className="h-5 w-5" />
          </div>
        </div>
      </section>
    </>
  );
}
