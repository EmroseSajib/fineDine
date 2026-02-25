"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useLanguage } from "@/context/language-context"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import reviewsData from "@/data/reviews.json"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"

export function Reviews() {
  const { lang, t } = useLanguage()
  const { ref, isVisible } = useScrollReveal(0.1)
  const [current, setCurrent] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = useCallback((index: number) => {
    setCurrent(index)
  }, [])

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % reviewsData.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + reviewsData.length) % reviewsData.length)
  }, [])

  useEffect(() => {
    intervalRef.current = setInterval(next, 5000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [next])

  const resetTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(next, 5000)
  }

  return (
    <section className="relative py-24 lg:py-32">
      <div ref={ref} className="relative z-10 mx-auto max-w-4xl px-6">
        {/* Section Header */}
        <div
          className={`mb-16 text-center transition-all duration-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-primary">
            {t("reviews.label")}
          </span>
          <h2 className="mt-4 font-serif text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
            <span className="text-balance">{t("reviews.title")}</span>
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-primary/40" />
        </div>

        {/* Review Carousel */}
        <div
          className={`relative transition-all duration-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          {/* Quote Icon */}
          <div className="mb-8 flex justify-center">
            <Quote size={40} className="text-primary/20" />
          </div>

          {/* Review Content */}
          <div className="relative min-h-[180px]">
            {reviewsData.map((review, index) => (
              <div
                key={review.id}
                className={`absolute inset-0 flex flex-col items-center text-center transition-all duration-700 ease-out ${
                  index === current
                    ? "translate-y-0 opacity-100"
                    : index < current
                      ? "-translate-y-8 opacity-0"
                      : "translate-y-8 opacity-0"
                }`}
              >
                <p className="font-serif text-lg leading-relaxed italic text-foreground/80 md:text-xl lg:text-2xl">
                  {`"${review.text[lang as "nl" | "en"]}"`}
                </p>
                <div className="mt-8 flex gap-1">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-primary text-primary" />
                  ))}
                </div>
                <p className="mt-3 text-sm font-medium tracking-wide text-primary">
                  {review.name}
                </p>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="mt-12 flex items-center justify-center gap-6">
            <button
              onClick={() => { prev(); resetTimer() }}
              className="text-muted-foreground transition-colors hover:text-primary"
              aria-label="Previous review"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {reviewsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => { goTo(index); resetTimer() }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === current ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/30"
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => { next(); resetTimer() }}
              className="text-muted-foreground transition-colors hover:text-primary"
              aria-label="Next review"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
