"use client"

import { useState } from "react"
import { X } from "lucide-react"

const galleryImages = [
  {
    src: "/restaurant-interior-elegant-ambiance.jpg",
    alt: "Restaurant Interior",
  },
  {
    src: "/gourmet-plated-dish-fine-dining.jpg",
    alt: "Signature Dish",
  },
  {
    src: "/wine-glasses-table-setting.jpg",
    alt: "Wine Selection",
  },
  {
    src: "/restaurant-kitchen-professional-cooking.jpg",
    alt: "Chef in Kitchen",
  },
  {
    src: "/fine-dining-dessert-presentation.jpg",
    alt: "Dessert Collection",
  },
  {
    src: "/fine-dining-private-dining-room.jpg",
    alt: "Dining Room",
  },
]

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-accent text-center mb-12">Gallery</h2>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-max">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded cursor-pointer group ${
                index === 1 || index === 4 ? "md:col-span-1 md:row-span-2" : ""
              }`}
              style={{
                height: index === 1 || index === 4 ? "500px" : "300px",
              }}
              onClick={() => setSelectedImage(image.src)}
            >
              <img
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
              <img src={selectedImage || "/placeholder.svg"} alt="Gallery" className="w-full h-auto rounded" />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-10 right-0 text-foreground hover:text-accent transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
