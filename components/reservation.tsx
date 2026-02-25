"use client";

import { useLanguage } from "@/context/language-context";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Check, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";

export function Reservation() {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollReveal(0.1);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    try {
      // EmailJS integration - users need to add their own keys
      const form = e.currentTarget;
      const formData = new FormData(form);

      // Check if EmailJS is configured
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey) {
        const { default: emailjs } = await import("@emailjs/browser");
        await emailjs.sendForm(serviceId, templateId, form, publicKey);
      } else {
        // Simulate send for demo
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log(
          "[v0] Reservation form data:",
          Object.fromEntries(formData),
        );
      }

      setStatus("success");
      form.reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section id="contact" className="alpana-overlay relative py-24 lg:py-32">
      <div ref={ref} className="relative z-10 mx-auto max-w-3xl px-6">
        {/* Section Header */}
        <div
          className={`mb-16 text-center transition-all duration-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-primary">
            {t("reservation.label")}
          </span>
          <h2 className="mt-4 font-serif text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
            <span className="text-balance">{t("reservation.title")}</span>
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-primary/40" />
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className={`glass rounded-sm p-8 transition-all duration-700 ease-out md:p-12 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <div className="grid gap-6 md:grid-cols-2">
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="text-xs font-medium tracking-wider uppercase text-muted-foreground"
              >
                {t("reservation.name")}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="border-b border-border bg-transparent px-0 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-foreground focus:outline-none transition-colors"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-xs font-medium tracking-wider uppercase text-muted-foreground"
              >
                {t("reservation.email")}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="border-b border-border bg-transparent px-0 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-foreground focus:outline-none transition-colors"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="phone"
                className="text-xs font-medium tracking-wider uppercase text-muted-foreground"
              >
                {t("reservation.phone")}
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="border-b border-border bg-transparent px-0 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-foreground focus:outline-none transition-colors"
              />
            </div>

            {/* Guests */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="guests"
                className="text-xs font-medium tracking-wider uppercase text-muted-foreground"
              >
                {t("reservation.guests")}
              </label>
              <select
                id="guests"
                name="guests"
                required
                className="border-b border-border bg-transparent px-0 py-3 text-foreground focus:border-foreground focus:outline-none transition-colors"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n} className="bg-card text-foreground">
                    {n}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="date"
                className="text-xs font-medium tracking-wider uppercase text-muted-foreground"
              >
                {t("reservation.date")}
              </label>
              <input
                id="date"
                name="date"
                type="date"
                required
                className="border-b border-border bg-transparent px-0 py-3 text-foreground focus:border-foreground focus:outline-none transition-colors"
              />
            </div>

            {/* Time */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="time"
                className="text-xs font-medium tracking-wider uppercase text-muted-foreground"
              >
                {t("reservation.time")}
              </label>
              <select
                id="time"
                name="time"
                required
                className="border-b border-border bg-transparent px-0 py-3 text-foreground focus:border-foreground focus:outline-none transition-colors"
              >
                {[
                  "17:00",
                  "17:30",
                  "18:00",
                  "18:30",
                  "19:00",
                  "19:30",
                  "20:00",
                  "20:30",
                  "21:00",
                  "21:30",
                  "22:00",
                ].map((time) => (
                  <option
                    key={time}
                    value={time}
                    className="bg-card text-foreground"
                  >
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Message */}
          <div className="mt-6 flex flex-col gap-2">
            <label
              htmlFor="message"
              className="text-xs font-medium tracking-wider uppercase text-muted-foreground"
            >
              {t("reservation.message")}
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              className="border-b border-border bg-transparent px-0 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-foreground focus:outline-none transition-colors resize-none"
            />
          </div>

          {/* Submit */}
          <div className="mt-8 flex flex-col items-center gap-4">
            <button
              type="submit"
              disabled={status === "sending" || status === "success"}
              className="flex items-center gap-2 rounded-sm border border-primary bg-primary/10 px-10 py-3 text-sm font-medium tracking-wider uppercase text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground disabled:opacity-60"
            >
              {status === "sending" && (
                <Loader2 size={16} className="animate-spin" />
              )}
              {status === "success" && <Check size={16} />}
              {status === "sending"
                ? t("reservation.sending")
                : status === "success"
                  ? t("reservation.success")
                  : t("reservation.submit")}
            </button>

            {status === "error" && (
              <p className="text-sm text-destructive">
                {t("reservation.error")}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
