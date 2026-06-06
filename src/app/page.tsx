import lazyImport from "next/dynamic";
import HomeHero from "@/components/sections/HomeHero";

export const dynamic    = "force-static";
export const revalidate = 3600;

export const metadata = {
  title: "Weru TV — Kenya's Premier Regional TV Channel",
  description:
    "Weru TV is Central Kenya's most-watched Kikuyu channel, broadcasting live on Azam TV, DStv, Startimes & Zuku across 6 countries. News, culture, entertainment.",
  openGraph: {
    title: "Weru TV — Kenya's Premier Regional TV Channel",
    description:
      "Broadcasting live across East Africa — Azam TV CH 342, DStv CH 368, Startimes CH 440, Zuku CH 39.",
    images: ["/Werulogo.jpeg"],
  },
};

const PlatformsSection = lazyImport(
  () => import("@/components/sections/PlatformsSection"),
  { loading: () => <div className="h-64 mx-4 my-10 rounded-2xl bg-black/20" /> }
);

const WhyWeruSection = lazyImport(
  () => import("@/components/sections/WhyWeruSection"),
  { loading: () => <div className="h-64 mx-4 my-10 rounded-2xl bg-black/20" /> }
);

const CultureSection = lazyImport(
  () => import("@/components/sections/CultureSection"),
  { loading: () => <div className="h-48 mx-4 my-10 rounded-2xl bg-black/20" /> }
);

const AdvertiseSection = lazyImport(
  () => import("@/components/sections/AdvertiseSection"),
  { loading: () => <div className="h-48 mx-4 my-10 rounded-2xl bg-black/20" /> }
);

const ReviewsCarousel = lazyImport(
  () => import("@/components/sections/ReviewsCarousel"),
  { loading: () => <div className="h-64 mx-4 my-10 rounded-2xl bg-black/20" /> }
);

const PartnersCarousel = lazyImport(
  () => import("@/components/sections/PartnersCarousel"),
  { loading: () => <div className="h-24 mx-4 my-6 rounded-2xl bg-black/20" /> }
);

const RateCardForm = lazyImport(
  () => import("@/components/sections/RateCardForm"),
  { loading: () => <div className="h-48 mx-4 my-10 rounded-2xl bg-black/20" /> }
);

const Footer = lazyImport(() => import("@/components/layout/Footer"));

export default function HomePage() {
  return (
    <>
      {/* 1. Full-screen hero — image carousel */}
      <HomeHero />

      {/* 2. Watch Weru TV Everywhere — platforms & international coverage */}
      <PlatformsSection />

      {/* 3. Why Weru TV — premium differentiators */}
      <WhyWeruSection />

      {/* 4. Arts, Culture & Studios */}
      <CultureSection />

      {/* 5. Grow Your Brand */}
      <AdvertiseSection />

      {/* 6. What Our Viewers Say */}
      <ReviewsCarousel />

      {/* 7. Trusted by Leading Brands */}
      <PartnersCarousel />

      {/* 8. Rate Card Enquiry */}
      <RateCardForm />

      <Footer />
    </>
  );
}
