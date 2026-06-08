import type { Metadata } from "next";
import GalleryClient from "@/components/sections/GalleryClient";
import { albums } from "@/data/gallery";

export const dynamic    = "force-static";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Gallery — Events, Roadshows & Launches | Weru TV",
  description:
    "Ten years of meeting our audience in the field. Browse photos from Weru TV roadshows, launches, and outside broadcasts across the Mount Kenya region.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "Gallery — Weru TV",
    description:
      "Events, roadshows and community launches from Kenya's premier Kikuyu broadcaster.",
    siteName: "Weru Digital",
    type: "website",
    url: "https://werutv.co.ke/gallery",
    images: [{ url: "/Roadshow%20Images/Screenshot_1.png", width: 1280, height: 720, alt: "Weru TV 10-year roadshow event" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery — Weru TV Events & Roadshows",
    description:
      "Ten years of community roadshows and launches across the Mount Kenya region.",
    images: ["/Roadshow%20Images/Screenshot_1.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: "Weru TV Gallery — Events, Roadshows & Launches",
  description:
    "Ten years of meeting our audience in the field. Photos from Weru TV roadshows, launches, and outside broadcasts across the Mount Kenya region.",
  url: "https://werutv.co.ke/gallery",
  publisher: {
    "@type": "Organization",
    name: "Weru Digital",
    url: "https://werutv.co.ke",
  },
  about: {
    "@type": "Event",
    name: "Weru TV 10 Years of Media Excellence Roadshow",
    startDate: "2026-06",
    location: {
      "@type": "Place",
      name: "Mount Kenya Region",
      addressRegion: "Central Kenya",
      addressCountry: "KE",
    },
  },
};

export default function GalleryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GalleryClient albums={albums} />
    </>
  );
}
