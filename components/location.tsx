"use client"

import { useLanguage } from "@/context/language-context"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { MapPin, Phone, Mail } from "lucide-react"

export function Location() {
  const { t } = useLanguage()
  const { ref, isVisible } = useScrollReveal(0.1)

  return (
    <section className="alpana-overlay relative py-24 lg:py-32">
      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div
          className={`mb-16 text-center transition-all duration-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-primary">
            {t("location.label")}
          </span>
          <h2 className="mt-4 font-serif text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
            {t("location.title")}
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-primary/40" />
        </div>

        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          {/* Map */}
          <div
            className={`w-full overflow-hidden rounded-sm border border-border lg:w-2/3 transition-all duration-700 ease-out ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2435.9!2d4.887!3d52.3676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDIyJzAzLjQiTiA0wrA1MycxMy4yIkU!5e0!3m2!1snl!2snl!4v1"
              width="100%"
              height="400"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.9) contrast(1.1)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Aroma Amoris location"
            />
          </div>

          {/* Contact Details */}
          <div
            className={`flex w-full flex-col justify-center lg:w-1/3 transition-all duration-700 ease-out ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="flex flex-col gap-8">
              <div className="flex items-start gap-4">
                <MapPin size={20} className="mt-1 shrink-0 text-primary" />
                <div>
                  <h3 className="text-sm font-medium tracking-wider uppercase text-foreground">
                    Address
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {t("location.address")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone size={20} className="mt-1 shrink-0 text-primary" />
                <div>
                  <h3 className="text-sm font-medium tracking-wider uppercase text-foreground">
                    Telefoon
                  </h3>
                  <a
                    href="tel:+31201234567"
                    className="mt-1 block text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {t("location.phone")}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail size={20} className="mt-1 shrink-0 text-primary" />
                <div>
                  <h3 className="text-sm font-medium tracking-wider uppercase text-foreground">
                    Email
                  </h3>
                  <a
                    href="mailto:info@aromaamoris.nl"
                    className="mt-1 block text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {t("location.email")}
                  </a>
                </div>
              </div>

              <div className="mt-4 h-px w-full bg-border/50" />

              <div>
                <h3 className="text-sm font-medium tracking-wider uppercase text-foreground">
                  {t("location.hours")}
                </h3>
                <div className="mt-3 flex flex-col gap-1.5 text-sm text-muted-foreground">
                  <p>{t("footer.hours.monThu")}</p>
                  <p>{t("footer.hours.friSat")}</p>
                  <p>{t("footer.hours.sun")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
