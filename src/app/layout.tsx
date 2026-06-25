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
  metadataBase: new URL("https://werutv.co.ke"),
  title: "Weru TV & Radio — Watch. Listen. Connect.",
  description:
    "Kenya's premier broadcast experience. Watch live TV, listen to FM radio, and stay updated with the latest news from Weru Digital.",
  openGraph: {
    title: "Weru TV & Radio",
    description: "Kenya's premier broadcast experience. Watch. Listen. Connect.",
    siteName: "Weru Digital",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Weru TV & Radio",
    description: "Kenya's premier broadcast experience.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BroadcastService",
  name: "Weru TV",
  alternateName: "Weru Digital",
  description: "Kenya's premier Kikuyu-language TV and radio broadcaster, reaching 6 countries across East Africa.",
  url: "https://werutv.co.ke",
  broadcastAffiliateOf: {
    "@type": "Organization",
    name: "Weru Digital",
  },
  inLanguage: ["sw", "ki", "en"],
  areaServed: ["KE", "UG", "TZ", "RW", "ZW", "ZM"],
  sameAs: [
    "https://www.youtube.com/@werutvfm3411",
    "https://www.facebook.com/WeruTV",
  ],
  contactPoint: [
    { "@type": "ContactPoint", telephone: "+254700117026", contactType: "customer support" },
    { "@type": "ContactPoint", telephone: "+254707065000", contactType: "sales" },
    { "@type": "ContactPoint", email: "weruofficial@gmail.com", contactType: "general" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`h-full ${display.variable} ${serif.variable} ${ui.variable}`}>
      <head>
        {/* Preload the first hero image so the browser fetches it before JS runs — critical for LCP on high-latency connections */}
        <link rel="preload" as="image" href="/heroimages/studio%20area17.png" fetchPriority="high" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
