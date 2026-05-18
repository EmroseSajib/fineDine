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
  { key: "contact", href: "#location" },
];

export function Navbar() {
  const { lang, setLang, t } = useLanguage();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#1a1a1a38]/70 backdrop-blur-2xl border-b border-white/10 py-3 shadow-2xl"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-6">
          {/* LOGO */}
          <a href="#home" className="relative z-50 flex items-center">
            <Image
              src="/images/logo.png"
              alt="Aroma Amoris Logo"
              width={140}
              height={140}
              className="h-12 md:h-14 w-auto object-contain transition-all duration-300"
              priority
            />
          </a>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="font-tangerine text-[2rem] tracking-wide text-white transition-all duration-300 hover:text-[#FFD700]"
              >
                {t(`nav.${link.key}`)}
              </a>
            ))}

            {/* LANGUAGE SWITCHER */}
            <div className="flex items-center rounded-full border border-white/20 bg-white/5 p-1 backdrop-blur-md">
              <button
                onClick={() => setLang("nl")}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-300 ${
                  lang === "nl"
                    ? "bg-[#FFD700] text-black"
                    : "text-white/70 hover:text-white"
                }`}
              >
                NL
              </button>

              <button
                onClick={() => setLang("en")}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-300 ${
                  lang === "en"
                    ? "bg-[#FFD700] text-black"
                    : "text-white/70 hover:text-white"
                }`}
              >
                EN
              </button>
            </div>

            {/* CTA */}
            <a
              href="#contact"
              className="rounded-full border border-[#FFD700]/50 bg-[#FFD700]/10 px-6 py-2.5 text-sm font-medium tracking-[0.15em] uppercase text-[#FFD700] transition-all duration-300 hover:bg-[#FFD700] hover:text-black"
            >
              {t("nav.reserve")}
            </a>
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md transition-all duration-300 lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          mobileOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* BACKDROP */}
        <div className="absolute inset-0 bg-[#182733]/90 backdrop-blur-2xl" />

        {/* GLOW */}
        <div className="absolute left-1/2 top-1/3 h-[250px] w-[250px] -translate-x-1/2 rounded-full bg-[#FFD700]/10 blur-3xl" />

        {/* CONTENT */}
        <div className="relative flex h-full flex-col items-center justify-center px-6">
          {/* MENU LINKS */}
          <div className="flex flex-col items-center gap-7">
            {navLinks.map((link, index) => (
              <a
                key={link.key}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-tangerine text-5xl tracking-wide text-white transition-all duration-300 hover:scale-110 hover:text-[#FFD700]"
                style={{
                  transitionDelay: `${index * 80}ms`,
                }}
              >
                {t(`nav.${link.key}`)}
              </a>
            ))}
          </div>

          {/* DIVIDER */}
          <div className="my-10 h-px w-40 bg-gradient-to-r from-transparent via-[#FFD700]/60 to-transparent" />

          {/* LANGUAGE */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang("nl")}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${
                lang === "nl"
                  ? "bg-[#FFD700] text-black"
                  : "border border-white/15 bg-white/5 text-white"
              }`}
            >
              NL
            </button>

            <button
              onClick={() => setLang("en")}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${
                lang === "en"
                  ? "bg-[#FFD700] text-black"
                  : "border border-white/15 bg-white/5 text-white"
              }`}
            >
              EN
            </button>
          </div>

          {/* CTA */}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="mt-8 rounded-full border border-[#FFD700]/50 bg-[#FFD700]/10 px-8 py-3 text-sm font-semibold tracking-[0.2em] uppercase text-[#FFD700] transition-all duration-300 hover:bg-[#FFD700] hover:text-black"
          >
            {t("nav.reserve")}
          </a>
        </div>
      </div>

      {/* RESERVATION MODAL */}
      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-md px-4">
          <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl">
            {/* CLOSE */}
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white transition-all hover:bg-[#FFD700] hover:text-black"
            >
              ✕
            </button>

            {/* IFRAME */}
            <iframe
              src="https://reserveereenvoudig.nl/tafelreservering?Company=6e0889dc3ea244c3bb87adacb5278f0e"
              className="h-[85vh] w-full"
              style={{ border: "none" }}
            />
          </div>
        </div>
      )}
    </>
  );
}
