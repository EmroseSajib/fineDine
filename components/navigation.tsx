"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Menu", href: "#menu" },
    { label: "Specials", href: "#specials" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            {/* <div className="text-2xl font-serif font-bold text-accent">
              Aroma Amoris
            </div> */}
            <img src="/logoAroma.png" alt="" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm uppercase tracking-wider text-foreground/80 hover:text-accent transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}

            <button
              onClick={() => {
                const section = document.getElementById("reservation");
                section?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 py-2 bg-accent text-accent-foreground text-sm font-semibold rounded hover:bg-accent/90 transition-colors"
              style={{ animationDelay: "0.4s" }}
            >
              Book a Table
            </button>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-border">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block px-4 py-2 text-sm uppercase tracking-wider text-foreground/80 hover:text-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button className="w-full mt-4 mx-4 px-4 py-2 bg-accent text-accent-foreground text-sm font-semibold rounded">
              Book a Table
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
