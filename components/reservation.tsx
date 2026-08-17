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
  const [dietaryError, setDietaryError] = useState("");
  const [dateError, setDateError] = useState("");
  const [dietaryPreferences, setDietaryPreferences] = useState("");
  const [allergyInput, setAllergyInput] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [allergyError, setAllergyError] = useState("");
  const today = new Date().toISOString().split("T")[0];

  const allergyString = useMemo(() => {
    const text = allergyInput.toLowerCase();

    const result = ALLERGY_OPTIONS.map((item) =>
      text.includes(item.label.toLowerCase()) ? "1" : "0",
    );

    // Make sure Taurus always receives exactly 15 positions
    while (result.length < 15) {
      result.push("0");
    }

    return result.slice(0, 15).join("");
  }, [allergyInput]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!dietaryPreferences.trim()) {
      setDietaryError(t("reservation.dietaryError"));
      return;
    }

    if (!allergyInput.trim()) {
      setAllergyError(t("reservation.allergyError"));
      return;
    }

    setAllergyError("");
    setDietaryError("");
    setStatus("sending");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();

    const guests = Number(formData.get("guests") || 1);
    const date = String(formData.get("date") || "");
    const time = String(formData.get("time") || "");

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

    /**
     * Taurus uses UTF-16LE → Base64
     */
    const encodeTaurus = (value: string): string => {
      const utf16 = new Uint8Array(value.length * 2);

      for (let i = 0; i < value.length; i++) {
        const code = value.charCodeAt(i);

        utf16[i * 2] = code & 0xff;
        utf16[i * 2 + 1] = code >> 8;
      }

      let binary = "";

      for (let i = 0; i < utf16.length; i++) {
        binary += String.fromCharCode(utf16[i]);
      }

      return btoa(binary);
    };

    // Encode the parameters that Taurus requires as Base64
    const encodedEmail = encodeTaurus(email);
    const encodedPhone = encodeTaurus(phone);
    const encodedMessage = encodeTaurus(note);
    const encodedName = encodeTaurus(name);

    // Taurus: YYYYMMDD
    const formattedDate = date.replace(/-/g, "");

    // Taurus: HH:mm:ss.000
    const formattedTime = `${time}:00.000`;

    /**
     * Taurus parameters
     */
    const BedrijfsGUID = "6e0889dc3ea244c3bb87adacb5278f0e";
    const nSelectedArrangementID = 0;
    const bZetOpWachtlijst = 0;
    const bZetOpAanvraag = 0;
    const Goedkeuring = marketingConsent ? 1 : 0;

    const tGeselecteerdeEindTijd = "000000";
    const tGeselecteerdeActiviteitTijd = "000000";
    const sGeselecteerdeActiviteitTijdTekst = "";
    const sVervolgkeuzes = "";
    const Bron = 8;

    const sNation = "EN";

    const apiUrl =
      `https://reserveereenvoudig.nl/AddReservering/` +
      `${BedrijfsGUID}/` +
      `${nSelectedArrangementID}/` +
      `${formattedTime}/` +
      `${formattedDate}/` +
      `${guests}/` +
      `${encodedEmail}/` +
      `${encodedPhone}/` +
      `${encodedMessage}/` +
      `Taurus/` +
      `${sNation}/` +
      `${bZetOpWachtlijst}/` +
      `${bZetOpAanvraag}/` +
      `${Goedkeuring}/` +
      `0/` +
      `0/` +
      `0/` +
      `0/` +
      `1/` +
      `${allergyString}`;

    console.log("Taurus URL:", apiUrl);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({}),
      });

      const result = await response.json();

      console.log("Taurus response:", result);

      if (!response.ok) {
        throw new Error(
          result?.Melding || result?.message || "Reservation failed",
        );
      }

      if (result?.Status === "FOUT") {
        throw new Error(result?.Melding || "Reservation failed");
      }

      if (result?.Status === "GOED") {
        setStatus("success");

        form.reset();
        setDietaryPreferences("");
        setAllergyInput("");
        setMarketingConsent(false);

        setTimeout(() => {
          setStatus("idle");
        }, 5000);

        return;
      }

      throw new Error("Unexpected response from reservation API");
    } catch (error) {
      console.error("Reservation error:", error);

      setStatus("error");

      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong",
      );

      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    }
  };
  const handleDateChange = (e: any) => {
    const selectedDate = new Date(e.target.value);

    // Remove time from dates for accurate comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    selectedDate.setHours(0, 0, 0, 0);

    // Prevent past dates
    if (selectedDate < today) {
      e.target.value = "";
      setDateError("Please select a future date.");
      return;
    } else {
      setDateError("");
    }

    // Prevent Monday and Tuesday
    const day = selectedDate.getDay();

    if (day === 1 || day === 2) {
      e.target.value = "";
      setDateError("Monday and Tuesday are not available for booking.");
      return;
    }

    // Valid date
  };

  return (
    <section id="contact" className=" relative py-24 lg:py-32">
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
                {t("reservation.name")} <span className="text-red-500">*</span>
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
                <span className="text-red-500">*</span>
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
                <span className="text-red-500">*</span>
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
                {t("reservation.guests")}{" "}
                <span className="text-red-500">*</span>
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
                {t("reservation.numberofCourse")}
              </label>

              <select
                id="courses"
                name="courses"
                defaultValue=""
                className="border-b border-border bg-transparent px-0 py-3 text-foreground focus:border-foreground focus:outline-none transition-colors"
              >
                <option value="" className="bg-card text-foreground">
                  {t("reservation.selectCourse")}
                </option>

                {[3, 4, 5].map((n) => (
                  <option key={n} value={n} className="bg-card text-foreground">
                    {n} {t("reservation.courses")}
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
                <span className="text-red-500">*</span>
              </label>

              <input
                id="date"
                name="date"
                type="date"
                required
                min={today}
                onChange={handleDateChange}
                className="border-b border-border bg-transparent px-0 py-3 text-foreground focus:border-foreground focus:outline-none transition-colors"
              />
              {dateError && (
                <p className="mt-1 text-sm text-red-500">{dateError}</p>
              )}
            </div>

            {/* Time */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="time"
                className="text-xs font-medium tracking-wider uppercase text-muted-foreground"
              >
                {t("reservation.time")} <span className="text-red-500">*</span>
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
              {t("reservation.dietary")} <span className="text-red-500">*</span>
            </label>

            <input
              id="dietaryPreferences"
              name="dietaryPreferences"
              type="text"
              list="diet-suggestions"
              value={dietaryPreferences}
              onChange={(e) => {
                setDietaryPreferences(e.target.value);

                if (e.target.value.trim()) {
                  setDietaryError("");
                }
              }}
              placeholder={`${t("reservation.typeof")}: Vegetarian, Vegan, Halal...`}
              className={`border-b bg-transparent px-0 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none transition-colors ${
                dietaryError
                  ? "border-red-500"
                  : "border-border focus:border-foreground"
              }`}
            />

            {dietaryError && (
              <p className="mt-1 text-sm text-red-500">{dietaryError}</p>
            )}

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
              {t("reservation.allergy")} <span className="text-red-500">*</span>
            </label>

            <input
              id="allergies"
              name="allergies"
              type="text"
              list="allergy-suggestions"
              value={allergyInput}
              onChange={(e) => {
                setAllergyInput(e.target.value);

                if (e.target.value.trim()) {
                  setAllergyError("");
                }
              }}
              placeholder={`${t("reservation.typeof")}: Gluten, Milk, Nuts...`}
              className={`border-b bg-transparent px-0 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none transition-colors ${
                allergyError
                  ? "border-red-500"
                  : "border-border focus:border-foreground"
              }`}
            />

            {allergyError && (
              <p className="mt-1 text-sm text-red-500">{allergyError}</p>
            )}

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
              placeholder={t("reservation.notes")}
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
              {t("reservation.receive")}
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
