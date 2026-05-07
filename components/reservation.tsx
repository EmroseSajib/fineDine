// "use client";

// import { useLanguage } from "@/context/language-context";
// import { useScrollReveal } from "@/hooks/use-scroll-reveal";
// import { Check, Loader2 } from "lucide-react";
// import { useState, type FormEvent } from "react";

// export function Reservation() {
//   const { t } = useLanguage();
//   const { ref, isVisible } = useScrollReveal(0.1);
//   const [status, setStatus] = useState<
//     "idle" | "sending" | "success" | "error"
//   >("idle");

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setStatus("sending");

//     try {
//       // EmailJS integration - users need to add their own keys
//       const form = e.currentTarget;
//       const formData = new FormData(form);

//       // Check if EmailJS is configured
//       const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
//       const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
//       const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

//       if (serviceId && templateId && publicKey) {
//         const { default: emailjs } = await import("@emailjs/browser");
//         await emailjs.sendForm(serviceId, templateId, form, publicKey);
//       } else {
//         // Simulate send for demo
//         await new Promise((resolve) => setTimeout(resolve, 1500));
//         console.log(
//           "[v0] Reservation form data:",
//           Object.fromEntries(formData),
//         );
//       }

//       setStatus("success");
//       form.reset();
//       setTimeout(() => setStatus("idle"), 5000);
//     } catch {
//       setStatus("error");
//       setTimeout(() => setStatus("idle"), 4000);
//     }
//   };

//   return (
//     <section id="contact" className="alpana-overlay relative py-24 lg:py-32">
//       <div ref={ref} className="relative z-10 mx-auto max-w-3xl px-6">
//         {/* Section Header */}
//         <div
//           className={`mb-16 text-center transition-all duration-700 ease-out ${
//             isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
//           }`}
//         >
//           <span className="text-xs font-medium tracking-[0.3em] uppercase text-primary">
//             {t("reservation.label")}
//           </span>
//           <h2 className="mt-4 font-serif text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
//             <span className="text-balance">{t("reservation.title")}</span>
//           </h2>
//           <div className="mx-auto mt-6 h-px w-16 bg-primary/40" />
//         </div>

//         {/* Form */}
//         <form
//           onSubmit={handleSubmit}
//           className={`glass rounded-sm p-8 transition-all duration-700 ease-out md:p-12 ${
//             isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
//           }`}
//           style={{ transitionDelay: "200ms" }}
//         >
//           <div className="grid gap-6 md:grid-cols-2">
//             {/* Name */}
//             <div className="flex flex-col gap-2">
//               <label
//                 htmlFor="name"
//                 className="text-xs font-medium tracking-wider uppercase text-muted-foreground"
//               >
//                 {t("reservation.name")}
//               </label>
//               <input
//                 id="name"
//                 name="name"
//                 type="text"
//                 required
//                 className="border-b border-border bg-transparent px-0 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-foreground focus:outline-none transition-colors"
//               />
//             </div>

//             {/* Email */}
//             <div className="flex flex-col gap-2">
//               <label
//                 htmlFor="email"
//                 className="text-xs font-medium tracking-wider uppercase text-muted-foreground"
//               >
//                 {t("reservation.email")}
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 required
//                 className="border-b border-border bg-transparent px-0 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-foreground focus:outline-none transition-colors"
//               />
//             </div>

//             {/* Phone */}
//             <div className="flex flex-col gap-2">
//               <label
//                 htmlFor="phone"
//                 className="text-xs font-medium tracking-wider uppercase text-muted-foreground"
//               >
//                 {t("reservation.phone")}
//               </label>
//               <input
//                 id="phone"
//                 name="phone"
//                 type="tel"
//                 required
//                 className="border-b border-border bg-transparent px-0 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-foreground focus:outline-none transition-colors"
//               />
//             </div>

//             {/* Guests */}
//             <div className="flex flex-col gap-2">
//               <label
//                 htmlFor="guests"
//                 className="text-xs font-medium tracking-wider uppercase text-muted-foreground"
//               >
//                 {t("reservation.guests")}
//               </label>
//               <select
//                 id="guests"
//                 name="guests"
//                 required
//                 className="border-b border-border bg-transparent px-0 py-3 text-foreground focus:border-foreground focus:outline-none transition-colors"
//               >
//                 {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
//                   <option key={n} value={n} className="bg-card text-foreground">
//                     {n}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Date */}
//             <div className="flex flex-col gap-2">
//               <label
//                 htmlFor="date"
//                 className="text-xs font-medium tracking-wider uppercase text-muted-foreground"
//               >
//                 {t("reservation.date")}
//               </label>
//               <input
//                 id="date"
//                 name="date"
//                 type="date"
//                 required
//                 className="border-b border-border bg-transparent px-0 py-3 text-foreground focus:border-foreground focus:outline-none transition-colors"
//               />
//             </div>

//             {/* Time */}
//             <div className="flex flex-col gap-2">
//               <label
//                 htmlFor="time"
//                 className="text-xs font-medium tracking-wider uppercase text-muted-foreground"
//               >
//                 {t("reservation.time")}
//               </label>
//               <select
//                 id="time"
//                 name="time"
//                 required
//                 className="border-b border-border bg-transparent px-0 py-3 text-foreground focus:border-foreground focus:outline-none transition-colors"
//               >
//                 {[
//                   "17:00",
//                   "17:30",
//                   "18:00",
//                   "18:30",
//                   "19:00",
//                   "19:30",
//                   "20:00",
//                   "20:30",
//                   "21:00",
//                   "21:30",
//                   "22:00",
//                 ].map((time) => (
//                   <option
//                     key={time}
//                     value={time}
//                     className="bg-card text-foreground"
//                   >
//                     {time}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Message */}
//           <div className="mt-6 flex flex-col gap-2">
//             <label
//               htmlFor="message"
//               className="text-xs font-medium tracking-wider uppercase text-muted-foreground"
//             >
//               {t("reservation.message")}
//             </label>
//             <textarea
//               id="message"
//               name="message"
//               rows={3}
//               className="border-b border-border bg-transparent px-0 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-foreground focus:outline-none transition-colors resize-none"
//             />
//           </div>

//           {/* Submit */}
//           <div className="mt-8 flex flex-col items-center gap-4">
//             <button
//               type="submit"
//               disabled={status === "sending" || status === "success"}
//               className="flex items-center gap-2 rounded-sm border border-primary bg-primary/10 px-10 py-3 text-sm font-medium tracking-wider uppercase text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground disabled:opacity-60"
//             >
//               {status === "sending" && (
//                 <Loader2 size={16} className="animate-spin" />
//               )}
//               {status === "success" && <Check size={16} />}
//               {status === "sending"
//                 ? t("reservation.sending")
//                 : status === "success"
//                   ? t("reservation.success")
//                   : t("reservation.submit")}
//             </button>

//             {status === "error" && (
//               <p className="text-sm text-destructive">
//                 {t("reservation.error")}
//               </p>
//             )}
//           </div>
//         </form>
//       </div>
//     </section>
//   );
// }
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

type AllergyKey = (typeof ALLERGY_OPTIONS)[number]["key"];

type AllergiesState = Record<AllergyKey, boolean>;

const initialAllergies: AllergiesState = {
  egg: false,
  gluten: false,
  lupin: false,
  milk: false,
  mustard: false,
  nuts: false,
  peanuts: false,
  crustaceans: false,
  celery: false,
  sesame: false,
  soy: false,
  fish: false,
  molluscs: false,
  sulphurDioxide: false,
};

export function Reservation() {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollReveal(0.1);

  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedDiets, setSelectedDiets] = useState<string[]>([]);
  const [allergies, setAllergies] = useState<AllergiesState>(initialAllergies);
  const [marketingConsent, setMarketingConsent] = useState(false);

  const allergyString = useMemo(() => {
    const order: AllergyKey[] = [
      "egg",
      "gluten",
      "lupin",
      "milk",
      "mustard",
      "nuts",
      "peanuts",
      "crustaceans",
      "celery",
      "sesame",
      "soy",
      "fish",
      "molluscs",
      "sulphurDioxide",
    ];

    return order.map((key) => (allergies[key] ? "1" : "0")).join("");
  }, [allergies]);

  const toggleDiet = (diet: string) => {
    setSelectedDiets((prev) =>
      prev.includes(diet)
        ? prev.filter((item) => item !== diet)
        : [...prev, diet],
    );
  };

  const toggleAllergy = (key: AllergyKey) => {
    setAllergies((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const message = String(formData.get("message") || "").trim();
    const dietaryText =
      selectedDiets.length > 0
        ? `Dietary preferences: ${selectedDiets.join(", ")}`
        : "";
    const selectedAllergyLabels = ALLERGY_OPTIONS.filter(
      (item) => allergies[item.key],
    ).map((item) => item.label);
    const allergiesText =
      selectedAllergyLabels.length > 0
        ? `Allergies: ${selectedAllergyLabels.join(", ")}`
        : "";

    const note = [dietaryText, allergiesText, message]
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
      setSelectedDiets([]);
      setAllergies(initialAllergies);
      setMarketingConsent(false);

      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong",
      );
      setTimeout(() => setStatus("idle"), 5000);
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
                className="border-b border-border bg-transparent px-0 py-3 text-foreground focus:border-foreground focus:outline-none transition-colors"
              />
            </div>

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

          <div className="mt-8">
            <p className="mb-4 text-xs font-medium tracking-wider uppercase text-muted-foreground">
              Dietary preferences
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {DIET_OPTIONS.map((diet) => (
                <label
                  key={diet}
                  className="flex items-center gap-3 rounded border border-border/60 px-3 py-3 text-sm text-foreground"
                >
                  <input
                    type="checkbox"
                    checked={selectedDiets.includes(diet)}
                    onChange={() => toggleDiet(diet)}
                    className="h-4 w-4"
                  />
                  <span>{diet}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <p className="mb-4 text-xs font-medium tracking-wider uppercase text-muted-foreground">
              Allergies
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {ALLERGY_OPTIONS.map((item) => (
                <label
                  key={item.key}
                  className="flex items-center gap-3 rounded border border-border/60 px-3 py-3 text-sm text-foreground"
                >
                  <input
                    type="checkbox"
                    checked={allergies[item.key]}
                    onChange={() => toggleAllergy(item.key)}
                    className="h-4 w-4"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2">
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
              placeholder="Extra request, occasion, seating preference, or notes"
              className="border-b border-border bg-transparent px-0 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-foreground focus:outline-none transition-colors resize-none"
            />
          </div>

          <div className="mt-6">
            <label className="flex items-start gap-3 text-sm text-foreground">
              <input
                type="checkbox"
                checked={marketingConsent}
                onChange={(e) => setMarketingConsent(e.target.checked)}
                className="mt-1 h-4 w-4"
              />
              <span>I agree to receive promotions and updates.</span>
            </label>
          </div>

          <div className="mt-8 flex flex-col items-center gap-4">
            <button
              type="submit"
              disabled={status === "sending" || status === "success"}
              className="flex items-center gap-2 rounded-sm border border-primary bg-primary/10 px-10 py-3 text-sm font-medium tracking-wider uppercase text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground disabled:opacity-60"
            >
              {status === "sending" && (
                <Loader2 size={16} className="animate-spin" />
              )}
              {status === "success" && <Check size={16} />}
              {status === "sending"
                ? t("reservation.sending")
                : status === "success"
                  ? t("reservation.success")
                  : t("reservation.submit")}
            </button>

            {status === "error" && (
              <p className="text-sm text-destructive">
                {errorMessage || t("reservation.error")}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
