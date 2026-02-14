"use client";

import type React from "react";

import { useState } from "react";

export default function ReservationSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    guests: "2",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", date: "", time: "", guests: "2" });
    }, 3000);
  };

  return (
    <section
      id="reservation"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-[#475F84]"
    >
      <div className="max-w-2xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-accent text-center mb-4">
          Reserve Your Table
        </h2>
        <p className="text-center text-foreground/70 mb-12">
          Join us for an unforgettable culinary experience
        </p>

        {submitted ? (
          <div className="bg-accent text-accent-foreground p-8 rounded text-center animate-slide-up">
            <h3 className="font-serif text-2xl font-bold mb-2">Thank You!</h3>
            <p>
              Your reservation has been received. We look forward to welcoming
              you.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-foreground font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-background border border-border rounded text-foreground focus:outline-none focus:border-accent transition-colors"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-foreground font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-background border border-border rounded text-foreground focus:outline-none focus:border-accent transition-colors"
                placeholder="your@email.com"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-foreground font-semibold mb-2">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded text-foreground focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <div>
                <label className="block text-foreground font-semibold mb-2">
                  Time
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded text-foreground focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-foreground font-semibold mb-2">
                Number of Guests
              </label>
              <select
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-border rounded text-foreground focus:outline-none focus:border-accent transition-colors"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-accent text-accent-foreground font-bold py-3 rounded hover:bg-accent/90 transition-colors transform hover:scale-105"
            >
              Book Your Table
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
