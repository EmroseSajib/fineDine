"use client"

import { useState } from "react"

type MenuItem = {
  name: string
  price: string
  description: string
}

type MenuCategory = {
  name: string
  items: MenuItem[]
}

const menuData: MenuCategory[] = [
  {
    name: "Starters",
    items: [
      {
        name: "Foie Gras Terrine",
        price: "$28",
        description: "Silky foie gras with brioche and fig compote",
      },
      {
        name: "Oyster Selection",
        price: "$24",
        description: "Fresh oysters from the finest origins",
      },
      {
        name: "Burrata & Truffle",
        price: "$20",
        description: "Creamy burrata with black truffle and aged balsamic",
      },
    ],
  },
  {
    name: "Main Course",
    items: [
      {
        name: "Beef Wellington",
        price: "$52",
        description: "Tender beef tenderloin wrapped in puff pastry",
      },
      {
        name: "Lobster Thermidor",
        price: "$48",
        description: "Classic preparation with champagne sauce",
      },
      {
        name: "Duck Confit",
        price: "$42",
        description: "Slow-cooked duck with seasonal vegetables",
      },
    ],
  },
  {
    name: "Desserts",
    items: [
      {
        name: "Chocolate Soufflé",
        price: "$16",
        description: "Dark chocolate soufflé with gold leaf",
      },
      {
        name: "Panna Cotta",
        price: "$14",
        description: "Silky vanilla panna cotta with berry coulis",
      },
      {
        name: "Crème Brûlée",
        price: "$12",
        description: "Classic French custard with caramelized sugar",
      },
    ],
  },
]

export default function MenuSection() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section id="menu" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-accent text-center mb-12">Our Menu</h2>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {menuData.map((category, index) => (
            <button
              key={category.name}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-2 text-sm font-semibold uppercase tracking-wider transition-colors ${
                activeTab === index
                  ? "bg-accent text-accent-foreground"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuData[activeTab].items.map((item) => (
            <div
              key={item.name}
              className="bg-secondary/50 p-6 rounded hover:bg-secondary/80 transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-serif text-xl text-foreground">{item.name}</h3>
                <span className="text-accent font-bold ml-2">{item.price}</span>
              </div>
              <p className="text-foreground/70 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
