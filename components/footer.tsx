"use client";

import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#13283F] py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            {/* <h3 className="font-serif text-2xl text-accent mb-3">Aroma Amoris</h3> */}
            <img src="/logoAroma.png" alt="logo" />
            <p className="text-foreground/70 text-sm">
              Where Taste Meets Artistry. Experience fine dining at its finest.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-foreground mb-3">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#about"
                  className="text-foreground/70 hover:text-accent transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#menu"
                  className="text-foreground/70 hover:text-accent transition-colors"
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link
                  href="#gallery"
                  className="text-foreground/70 hover:text-accent transition-colors"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-foreground/70 hover:text-accent transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-bold text-foreground mb-3">Hours</h4>
            <ul className="text-foreground/70 text-sm space-y-1">
              <li>Tue-Thu: 5:00 PM - 11:00 PM</li>
              <li>Fri-Sat: 5:00 PM - 12:00 AM</li>
              <li>Sun: 5:00 PM - 10:00 PM</li>
              <li>Mon: Closed</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold text-foreground mb-3">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-foreground/70 hover:text-accent transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-foreground/70 hover:text-accent transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-foreground/70 hover:text-accent transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 text-center text-foreground/70 text-sm">
          <p>&copy; 2025 Aroma Amoris. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
