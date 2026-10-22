"use client";

import { X } from "lucide-react";
import { useState } from "react";

export function HolidayClosedPopup() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4 py-6">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 text-left shadow-2xl sm:p-8">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 rounded-full p-1 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
          aria-label="Sluiten"
        >
          <X size={20} />
        </button>

        <div className="mb-4 text-center text-4xl">❤️</div>

        <h2 className="mb-5 text-center text-xl font-bold text-gray-900 sm:text-2xl">
          Belangrijke mededeling
        </h2>

        <div className="space-y-4 text-sm leading-7 text-gray-600 sm:text-base">
          <p>Beste gasten,</p>

          <p>
            Vanwege een plotseling gezondheidsprobleem moest ik (Fahim, chef-kok
            van Aroma Amoris) een spoedoperatie ondergaan en heb ik een
            herstelperiode van twee weken nodig.
          </p>

          <p>
            Hierdoor zijn wij genoodzaakt Aroma Amoris tot{" "}
            <strong className="font-semibold text-gray-900">1 november</strong>{" "}
            te sluiten.
          </p>

          <p>
            Mijn excuses voor deze plotselinge sluiting; de situatie lag buiten
            mijn macht. Ik hoop u na 1 november weer te mogen verwelkomen.
          </p>

          <p>Hartelijk dank voor uw begrip en uw aanhoudende steun.</p>

          <p className="pt-2">
            Met vriendelijke groet,
            <br />
            <strong className="font-semibold text-gray-900">Fahim</strong>
            <br />
            Aroma Amoris
          </p>
        </div>

        <button
          onClick={() => setIsOpen(false)}
          className="mt-6 w-full rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
        >
          Begrepen
        </button>
      </div>
    </div>
  );
}
