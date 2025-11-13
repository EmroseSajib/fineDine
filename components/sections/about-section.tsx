"use client"

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="animate-slide-in-right">
            <img src="/professional-chef-cooking-in-fine-dining-kitchen.jpg" alt="Chef at work" className="w-full h-auto rounded" />
          </div>

          {/* Text Content */}
          <div className="animate-slide-in-left">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-accent mb-6">Our Story</h2>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              At Aroma Amoris, we believe that fine dining is more than just food—it's an experience that engages all
              your senses and nourishes your soul.
            </p>
            <p className="text-foreground/80 mb-4 leading-relaxed">
              Our chef brings decades of culinary expertise and a passion for creating dishes that tell stories of
              tradition, innovation, and artistry. Every plate is crafted with meticulous attention to detail.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              We source the finest ingredients from local and international suppliers, ensuring that each dish reflects
              the essence of quality and craftsmanship.
            </p>

            <h3 className="font-serif text-2xl text-accent mt-8 mb-3">Chef's Philosophy</h3>
            <p className="text-foreground/70 italic">
              "Cooking is not about technique alone; it's about creating memories and moments of joy that linger long
              after the meal is over."
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
