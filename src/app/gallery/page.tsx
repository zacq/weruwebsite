import type { Metadata } from "next";
import GalleryClient from "@/components/sections/GalleryClient";
import { getGalleryAlbums } from "@/lib/getGalleryAlbums";

export const dynamic    = "force-static";
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const albums = await getGalleryAlbums();
  const ogImage =
    albums.find((a) => !a.upcoming && a.images.length > 0)?.images[0].src ?? undefined;

  return {
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
      images: ogImage ? [{ url: ogImage, width: 1280, height: 720, alt: "Weru TV roadshow event" }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: "Gallery — Weru TV Events & Roadshows",
      description:
        "Ten years of community roadshows and launches across the Mount Kenya region.",
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

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

export default async function GalleryPage() {
  const albums = await getGalleryAlbums();
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
