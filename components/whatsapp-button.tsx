"use client"

import { MessageCircle } from "lucide-react"

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/31201234567?text=Hallo%2C%20ik%20wil%20graag%20een%20reservering%20maken"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-[#ffffff] shadow-lg transition-transform duration-300 hover:scale-110"
      aria-label="Contact via WhatsApp"
    >
      <MessageCircle size={24} fill="currentColor" />
      {/* Pulse animation */}
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20" />
    </a>
  )
}
