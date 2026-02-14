"use client";

const specials = [
  {
    name: "Pan-Seared Scallops",
    description:
      "Perfectly seared diver scallops with champagne foam and caviar",
    image: "/gourmet-pan-seared-scallops.jpg",
  },
  {
    name: "Wagyu Ribeye",
    description:
      "Japanese A5 Wagyu beef with truffle jus and roasted root vegetables",
    image: "/premium-wagyu-ribeye-steak.jpg",
  },
  {
    name: "Sommelier's Selection",
    description:
      "Chef's seasonal creation paired with wine from our curated collection",
    image: "/artisanal-plated-fine-dining-dish.jpg",
  },
];

export default function ChefSpecialsSection() {
  return (
    <section id="specials" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#475F84]">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-accent text-center mb-4">
          Chef's Specials
        </h2>
        <p className="text-center text-foreground/70 mb-12 max-w-2xl mx-auto">
          Experience our signature dishes that showcase the chef's creativity
          and commitment to excellence
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {specials.map((special, index) => (
            <div
              key={index}
              className="group overflow-hidden rounded cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden mb-4">
                <img
                  src={special.image || "/placeholder.svg"}
                  alt={special.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div>
                <h3 className="font-serif text-2xl text-accent mb-2">
                  {special.name}
                </h3>
                <p className="text-foreground/70">{special.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
