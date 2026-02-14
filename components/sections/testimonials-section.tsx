"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const testimonials = [
  {
    quote:
      "An absolutely magical evening. Every course was a masterpiece, and the service was impeccable.",
    author: "Sarah Mitchell",
    rating: 5,
  },
  {
    quote:
      "The most extraordinary dining experience I've ever had. The flavors, the presentation, the atmosphere—perfection.",
    author: "James Anderson",
    rating: 5,
  },
  {
    quote:
      "Aroma Amoris has set a new standard for fine dining. Highly recommend for special occasions.",
    author: "Elena Rodriguez",
    rating: 5,
  },
  {
    quote:
      "A culinary journey like no other. Every detail was thoughtfully crafted. Simply unforgettable.",
    author: "Michael Chen",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#3b5479]">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-accent text-center mb-12">
          Guest Reviews
        </h2>

        <div className="relative">
          {/* Testimonial Card */}
          <div className="bg-secondary/50 p-8 md:p-12 rounded">
            <div className="text-2xl md:text-3xl text-accent mb-6">"</div>
            <p className="text-foreground/80 text-lg mb-6 italic leading-relaxed">
              {testimonials[current].quote}
            </p>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-accent font-semibold">
                  {testimonials[current].author}
                </p>
                <div className="flex gap-1 mt-2">
                  {Array(testimonials[current].rating)
                    .fill(0)
                    .map((_, i) => (
                      <span key={i} className="text-accent">
                        ★
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-2 bg-accent text-accent-foreground rounded hover:bg-accent/90 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={next}
              className="p-2 bg-accent text-accent-foreground rounded hover:bg-accent/90 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2 h-2 rounded-full transition-colors ${index === current ? "bg-accent" : "bg-accent/30"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
