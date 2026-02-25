"use client";

import { useLanguage } from "@/context/language-context";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const navLinks = [
  { key: "home", href: "#home" },
  { key: "about", href: "#about" },
  { key: "menu", href: "#menu" },
  { key: "gallery", href: "#gallery" },
  { key: "contact", href: "#contact" },
];

export function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-dark py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <a href="#home" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Aroma Amoris Logo"
            width={120}
            height={120}
            className="h-14 w-auto object-contain"
            priority
          />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:text-[#FFD700]"
            >
              {t(`nav.${link.key}`)}
            </a>
          ))}

          {/* Language Switcher */}
          <div className="flex items-center gap-1 rounded-full border border-white/70 px-1 py-1">
            <button
              onClick={() => setLang("nl")}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-all duration-300 ${
                lang === "nl"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-white hover:text-foreground"
              }`}
            >
              NL
            </button>
            <button
              onClick={() => setLang("en")}
              className={`rounded-full  px-3 py-1 text-xs font-medium transition-all duration-300 ${
                lang === "en"
                  ? "bg-[#FFD700] text-primary-foreground"
                  : "text-foreground hover:text-foreground"
              }`}
            >
              EN
            </button>
          </div>

          {/* Reserve CTA */}
          <a
            href="#contact"
            className="rounded-sm border border-primary bg-primary/10 px-5 py-2 text-sm font-medium tracking-wide text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground nimate-goldPulse"
          >
            {t("nav.reserve")}
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="relative z-50 text-foreground lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-background/95 backdrop-blur-xl transition-all duration-500 lg:hidden ${
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-serif text-2xl font-light tracking-wider text-foreground transition-colors duration-300 hover:text-primary"
            >
              {t(`nav.${link.key}`)}
            </a>
          ))}

          <div className="flex items-center gap-2 pt-4">
            <button
              onClick={() => setLang("nl")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                lang === "nl"
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground"
              }`}
            >
              NL
            </button>
            <button
              onClick={() => setLang("en")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                lang === "en"
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground"
              }`}
            >
              EN
            </button>
          </div>

          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="mt-4 rounded-sm border border-primary bg-primary/10 px-8 py-3 text-sm font-medium tracking-wide text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
          >
            {t("nav.reserve")}
          </a>
        </div>
      </div>
    </nav>
  );
}
