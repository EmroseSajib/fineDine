"use client";

import { useLanguage } from "@/context/language-context";
import Image from "next/image";

export function Footer() {
  const { t } = useLanguage();

  const quickLinks = [
    { label: t("nav.home"), href: "#home" },
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.menu"), href: "#menu" },
    { label: t("nav.gallery"), href: "#gallery" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  return (
    <footer className="relative border-t border-primary/20 ">
      {/* Golden accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid items-start gap-12 text-center md:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div className="flex flex-col items-center">
            <a href="#home" className="flex items-center justify-center">
              <Image
                src="/images/logo.png"
                alt="Aroma Amoris Logo"
                width={120}
                height={120}
                className="h-14 w-auto object-contain"
                priority
              />
            </a>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {t("hero.subtitle")}
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center">
            <h4 className="text-sm font-medium tracking-[0.25em] uppercase text-foreground">
              {t("footer.links")}
            </h4>

            <div className="mt-5 flex flex-col items-center gap-3">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-all duration-300 hover:text-primary hover:tracking-wide"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col items-center">
            <h4 className="text-sm font-medium tracking-[0.25em] uppercase text-foreground">
              {t("footer.social")}
            </h4>

            <div className="mt-5 flex items-center justify-center gap-5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/10 p-3 text-muted-foreground transition-all duration-300 hover:border-primary hover:text-primary"
                aria-label="Instagram"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-5 w-5"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/10 p-3 text-muted-foreground transition-all duration-300 hover:border-primary hover:text-primary"
                aria-label="Facebook"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/10 p-3 text-muted-foreground transition-all duration-300 hover:border-primary hover:text-primary"
                aria-label="X (Twitter)"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}

        <div className="mt-12 border-t border-border/50 pt-8 text-center">
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
            &copy; {new Date().getFullYear()} {t("footer.copyright")}{" "}
            <a
              href="https://taxis.it.com/" // 🔁 your IT website
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:text-amber-200 transition-colors"
            >
              <Image
                src="/images/taxislogo.png"
                alt="Aroma Amoris Logo"
                width={40}
                height={40}
                className="h-10 w-auto object-contain pb-3 "
                priority
              />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
