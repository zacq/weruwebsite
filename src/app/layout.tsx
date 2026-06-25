import type { Metadata } from "next";
import { Bricolage_Grotesque, Fraunces, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import FloatingCTA from "@/components/ui/FloatingCTA";
import ViewerCaptureModal from "@/components/ui/ViewerCaptureModal";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const serif = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["italic"],
  variable: "--font-serif",
  display: "swap",
});

const ui = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-ui",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://werudigital.co.ke"),
  title: "Weru TV & Radio — Watch. Listen. Connect.",
  description:
    "Kenya's premier Kikuyu-language TV and radio broadcaster. Watch Weru TV live on DStv 368, Azam 342 & Startimes 440. Listen to Weru FM 96.4 across Central Kenya.",
  openGraph: {
    title: "Weru TV & Radio — Watch. Listen. Connect.",
    description: "Kenya's premier Kikuyu broadcaster. Live TV on DStv 368, Azam 342, Startimes 440. Weru FM 96.4 across East Africa.",
    siteName: "Weru Digital",
    type: "website",
    images: [{ url: "/logo.png", width: 400, height: 133, alt: "Weru TV & Radio logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Weru TV & Radio",
    description: "Kenya's premier Kikuyu-language TV & radio broadcaster. Watch live on DStv 368, Azam 342, Startimes 440.",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Weru TV & Radio",
    url: "https://werudigital.co.ke",
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: "https://werudigital.co.ke/blog?q={search_term_string}" },
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BroadcastService",
    name: "Weru TV",
    alternateName: ["Weru Digital", "Weru FM 96.4"],
    description: "Kenya's premier Kikuyu-language TV and radio broadcaster, reaching 6 countries across East Africa on DStv 368, Azam TV 342, and Startimes 440.",
    url: "https://werudigital.co.ke",
    broadcastAffiliateOf: { "@type": "Organization", name: "Weru Digital" },
    inLanguage: ["sw", "ki", "en"],
    areaServed: ["KE", "UG", "TZ", "RW", "ZW", "ZM"],
    sameAs: [
      "https://www.youtube.com/@werutvfm3411",
      "https://www.facebook.com/WeruTV",
      "https://x.com/werutv",
      "https://tiktok.com/@werutv",
    ],
    contactPoint: [
      { "@type": "ContactPoint", telephone: "+254700117026", contactType: "customer support" },
      { "@type": "ContactPoint", telephone: "+254707065000", contactType: "sales" },
      { "@type": "ContactPoint", email: "weruofficial@gmail.com", contactType: "general" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Weru TV & Radio",
    description: "Kenya's premier Kikuyu-language broadcaster based in Nyeri, reaching 6 East African countries.",
    url: "https://werudigital.co.ke",
    telephone: "+254700117026",
    email: "weruofficial@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nyeri",
      addressRegion: "Nyeri County",
      addressCountry: "KE",
    },
    geo: { "@type": "GeoCoordinates", latitude: -0.4169, longitude: 36.9519 },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    sameAs: [
      "https://www.youtube.com/@werutvfm3411",
      "https://www.facebook.com/WeruTV",
    ],
  },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`h-full ${display.variable} ${serif.variable} ${ui.variable}`}>
      <head>
        {/* Preload the first hero image so the browser fetches it before JS runs — critical for LCP on high-latency connections */}
        <link rel="preload" as="image" href="/heroimages/HomePage.png" fetchPriority="high" />
        {jsonLd.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <FloatingCTA />
        <ViewerCaptureModal />
      </body>
    </html>
  );
}
