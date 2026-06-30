"use client"

import { useState } from "react"
import { useLanguage } from "@/context/language-context"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import Image from "next/image"
import { X } from "lucide-react"

const galleryImages = [
  { src: "/images/gallery-1.jpg", alt: "Gourmet dish presentation", span: "row-span-2" },
  { src: "/images/gallery-2.jpg", alt: "Wine cellar", span: "" },
  { src: "/images/gallery-3.jpg", alt: "Elegant dessert", span: "" },
  { src: "/images/gallery-4.jpg", alt: "Restaurant interior", span: "row-span-2" },
  { src: "/images/gallery-5.jpg", alt: "Wagyu steak", span: "" },
  { src: "/images/gallery-6.jpg", alt: "Cocktail crafting", span: "" },
]

export function Gallery() {
  const { t } = useLanguage()
  const { ref, isVisible } = useScrollReveal(0.1)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  return (
    <section id="gallery" className="relative py-24 lg:py-32">
      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div
          className={`mb-16 text-center transition-all duration-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-primary">
            {t("gallery.label")}
          </span>
          <h2 className="mt-4 font-serif text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
            {t("gallery.title")}
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-primary/40" />
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {galleryImages.map((img, index) => (
            <button
              key={img.src}
              onClick={() => setLightboxIndex(index)}
              className={`group relative overflow-hidden ${img.span} transition-all duration-700 ease-out ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${150 + index * 100}ms` }}
              aria-label={`View ${img.alt}`}
            >
              <div className={`relative ${img.span ? "aspect-[3/5]" : "aspect-square"} overflow-hidden`}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-background/0 transition-colors duration-300 group-hover:bg-background/20" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="text-xs font-medium tracking-[0.2em] uppercase text-foreground">
                    View
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-xl"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-label="Image lightbox"
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 z-50 text-foreground/70 transition-colors hover:text-foreground"
            aria-label="Close lightbox"
          >
            <X size={28} />
          </button>
          <div className="relative h-[80vh] w-[90vw] max-w-4xl">
            <Image
              src={galleryImages[lightboxIndex].src}
              alt={galleryImages[lightboxIndex].alt}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
          {/* Navigation */}
          <div className="absolute bottom-8 flex gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setLightboxIndex(
                  lightboxIndex > 0 ? lightboxIndex - 1 : galleryImages.length - 1
                )
              }}
              className="rounded-full border border-primary/30 px-6 py-2 text-sm text-foreground transition-all hover:bg-primary/10"
            >
              Prev
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setLightboxIndex(
                  lightboxIndex < galleryImages.length - 1 ? lightboxIndex + 1 : 0
                )
              }}
              className="rounded-full border border-primary/30 px-6 py-2 text-sm text-foreground transition-all hover:bg-primary/10"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
