import { LanguageProvider } from "@/context/language-context";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aroma Amoris | Fine Dining Restaurant",
  description:
    "Ervaar de ultieme fine dining bij Aroma Amoris in Amsterdam. Seizoensgebonden ingrediënten, vakmanschap en een onwankelbare toewijding aan perfectie.",
  keywords: [
    "fine dining",
    "restaurant",
    "Amsterdam",
    "Nederland",
    "luxury dining",
    "Aroma Amoris",
  ],
  openGraph: {
    title: "Aroma Amoris | Fine Dining Restaurant",
    description:
      "Fine dining in het hart van Nederland. Een unieke culinaire ervaring.",
    type: "website",
    locale: "nl_NL",
    alternateLocale: "en_US",
    siteName: "Aroma Amoris",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: "Aroma Amoris",
              image: "/images/hero-poster.jpg",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Keizersgracht 123",
                addressLocality: "Amsterdam",
                postalCode: "1015 CJ",
                addressCountry: "NL",
              },
              telephone: "+31201234567",
              servesCuisine: "French, European, Fine Dining",
              priceRange: "$$$$",
              openingHours: [
                "Mo-Th 17:00-23:00",
                "Fr-Sa 17:00-00:00",
                "Su 12:00-22:00",
              ],
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <LanguageProvider>{children}</LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
