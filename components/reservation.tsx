"use client";

import { useLanguage } from "@/context/language-context";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Check, Loader2 } from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "success" | "error";

const ALLERGY_OPTIONS = [
  { key: "egg", label: "Egg" },
  { key: "gluten", label: "Gluten" },
  { key: "lupin", label: "Lupin" },
  { key: "milk", label: "Milk" },
  { key: "mustard", label: "Mustard" },
  { key: "nuts", label: "Nuts" },
  { key: "peanuts", label: "Peanuts" },
  { key: "crustaceans", label: "Crustaceans" },
  { key: "celery", label: "Celery" },
  { key: "sesame", label: "Sesame" },
  { key: "soy", label: "Soy" },
  { key: "fish", label: "Fish" },
  { key: "molluscs", label: "Molluscs" },
  { key: "sulphurDioxide", label: "Sulphur dioxide" },
] as const;

const DIET_OPTIONS = [
  "Vegetarian",
  "Vegan",
  "Halal",
  "Lactose free",
  "Gluten free",
  "No alcohol",
] as const;

export function Reservation() {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollReveal(0.1);

  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [dietaryPreferences, setDietaryPreferences] = useState("");
  const [allergyInput, setAllergyInput] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const allergyString = useMemo(() => {
    const text = allergyInput.toLowerCase();

    return ALLERGY_OPTIONS.map((item) =>
      text.includes(item.label.toLowerCase()) ? "1" : "0",
    ).join("");
  }, [allergyInput]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatus("sending");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const message = String(formData.get("message") || "").trim();
    const courses = String(formData.get("courses") || "").trim();

    const coursesText = courses ? `Number of courses: ${courses}` : "";

    const dietaryText = dietaryPreferences.trim()
      ? `Dietary preferences: ${dietaryPreferences.trim()}`
      : "";

    const allergiesText = allergyInput.trim()
      ? `Allergies: ${allergyInput.trim()}`
      : "";

    const note = [coursesText, dietaryText, allergiesText, message]
      .filter(Boolean)
      .join(" | ");

    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      guests: Number(formData.get("guests") || 1),
      date: String(formData.get("date") || ""),
      time: String(formData.get("time") || ""),
      message: note,
      nation: "EN",
      arrangementId: 0,
      waitingList: 0,
      requestList: 0,
      approval: marketingConsent ? 1 : 0,
      allergens: allergyString,
    };

    try {
      const response = await fetch("/api/reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Reservation failed");
      }

      setStatus("success");

      form.reset();
      setDietaryPreferences("");
      setAllergyInput("");
      setMarketingConsent(false);

      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    } catch (error) {
      setStatus("error");

      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong",
      );

      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    }
  };

  return (
    <section id="contact" className="alpana-overlay relative py-24 lg:py-32">
      <div ref={ref} className="relative z-10 mx-auto max-w-3xl px-6">
        <div
          className={`mb-16 text-center transition-all duration-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-primary">
            {t("reservation.label")}
          </span>

          <h2 className="mt-4 font-serif text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
            <span className="text-balance">{t("reservation.title")}</span>
          </h2>

          <div className="mx-auto mt-6 h-px w-16 bg-primary/40" />
        </div>

        <form
          onSubmit={handleSubmit}
          className={`glass rounded-sm p-8 transition-all duration-700 ease-out md:p-12 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <div className="grid gap-6 md:grid-cols-2">
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="text-xs font-medium tracking-wider uppercase text-muted-foreground"
              >
                {t("reservation.name")}
              </label>

              <input
                id="name"
                name="name"
                type="text"
                required
                className="border-b border-border bg-transparent px-0 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-foreground focus:outline-none transition-colors"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-xs font-medium tracking-wider uppercase text-muted-foreground"
              >
                {t("reservation.email")}
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                className="border-b border-border bg-transparent px-0 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-foreground focus:outline-none transition-colors"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="phone"
                className="text-xs font-medium tracking-wider uppercase text-muted-foreground"
              >
                {t("reservation.phone")}
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="border-b border-border bg-transparent px-0 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-foreground focus:outline-none transition-colors"
              />
            </div>

            {/* Guests */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="guests"
                className="text-xs font-medium tracking-wider uppercase text-muted-foreground"
              >
                {t("reservation.guests")}
              </label>

              <select
                id="guests"
                name="guests"
                required
                defaultValue="2"
                className="border-b border-border bg-transparent px-0 py-3 text-foreground focus:border-foreground focus:outline-none transition-colors"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n} className="bg-card text-foreground">
                    {n}
                  </option>
                ))}
              </select>
            </div>

            {/* Number of courses */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="courses"
                className="text-xs font-medium tracking-wider uppercase text-muted-foreground"
              >
                Number of courses (optional)
              </label>

              <select
                id="courses"
                name="courses"
                defaultValue=""
                className="border-b border-border bg-transparent px-0 py-3 text-foreground focus:border-foreground focus:outline-none transition-colors"
              >
                <option value="" className="bg-card text-foreground">
                  Select courses
                </option>

                {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                  <option key={n} value={n} className="bg-card text-foreground">
                    {n} Course{n > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="date"
                className="text-xs font-medium tracking-wider uppercase text-muted-foreground"
              >
                {t("reservation.date")}
              </label>

              <input
                id="date"
                name="date"
                type="date"
                required
                min={today}
                className="border-b border-border bg-transparent px-0 py-3 text-foreground focus:border-foreground focus:outline-none transition-colors"
              />
            </div>

            {/* Time */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="time"
                className="text-xs font-medium tracking-wider uppercase text-muted-foreground"
              >
                {t("reservation.time")}
              </label>

              <select
                id="time"
                name="time"
                required
                defaultValue="19:00"
                className="border-b border-border bg-transparent px-0 py-3 text-foreground focus:border-foreground focus:outline-none transition-colors"
              >
                {[
                  "17:00",
                  "17:30",
                  "18:00",
                  "18:30",
                  "19:00",
                  "19:30",
                  "20:00",
                  "20:30",
                  "21:00",
                  "21:30",
                  "22:00",
                ].map((time) => (
                  <option
                    key={time}
                    value={time}
                    className="bg-card text-foreground"
                  >
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Dietary preferences */}
          <div className="mt-8 flex flex-col gap-2">
            <label
              htmlFor="dietaryPreferences"
              className="text-xs font-medium tracking-wider uppercase text-muted-foreground"
            >
              Dietary preferences
            </label>

            <input
              id="dietaryPreferences"
              name="dietaryPreferences"
              type="text"
              list="diet-suggestions"
              value={dietaryPreferences}
              onChange={(e) => setDietaryPreferences(e.target.value)}
              placeholder="Type or choose: Vegetarian, Vegan, Halal..."
              className="border-b border-border bg-transparent px-0 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-foreground focus:outline-none transition-colors"
            />

            <datalist id="diet-suggestions">
              {DIET_OPTIONS.map((diet) => (
                <option key={diet} value={diet} />
              ))}
            </datalist>
          </div>

          {/* Allergies */}
          <div className="mt-8 flex flex-col gap-2">
            <label
              htmlFor="allergies"
              className="text-xs font-medium tracking-wider uppercase text-muted-foreground"
            >
              Allergies
            </label>

            <input
              id="allergies"
              name="allergies"
              type="text"
              list="allergy-suggestions"
              value={allergyInput}
              onChange={(e) => setAllergyInput(e.target.value)}
              placeholder="Type or choose: Gluten, Milk, Nuts..."
              className="border-b border-border bg-transparent px-0 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-foreground focus:outline-none transition-colors"
            />

            <datalist id="allergy-suggestions">
              {ALLERGY_OPTIONS.map((item) => (
                <option key={item.key} value={item.label} />
              ))}
            </datalist>
          </div>

          {/* Message */}
          <div className="mt-8 flex flex-col gap-2">
            <label
              htmlFor="message"
              className="text-xs font-medium tracking-wider uppercase text-muted-foreground"
            >
              {t("reservation.message")}
            </label>

            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Additional notes..."
              className="border-b border-border bg-transparent px-0 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-foreground focus:outline-none transition-colors resize-none"
            />
          </div>

          {/* Marketing */}
          <div className="mt-8">
            <label className="flex items-center gap-3 text-sm text-muted-foreground">
              <input
                type="checkbox"
                checked={marketingConsent}
                onChange={(e) => setMarketingConsent(e.target.checked)}
                className="h-4 w-4"
              />
              Receive promotions and updates
            </label>
          </div>

          {/* Submit */}
          <div className="mt-10">
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center gap-2 bg-primary px-8 py-4 text-sm font-medium uppercase tracking-wider text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {status === "sending" && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}

              {status === "success" && <Check className="h-4 w-4" />}

              {status === "sending"
                ? "Sending..."
                : status === "success"
                  ? "Reserved"
                  : t("reservation.submit")}
            </button>

            {status === "error" && (
              <p className="mt-4 text-sm text-red-500">{errorMessage}</p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
