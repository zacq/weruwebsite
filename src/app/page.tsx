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

const CultureSection = lazyImport(
  () => import("@/components/sections/CultureSection"),
  { loading: () => <div className="h-48 mx-4 my-10 rounded-2xl bg-black/20" /> }
);

const PlatformsSection = lazyImport(
  () => import("@/components/sections/PlatformsSection"),
  { loading: () => <div className="h-64 mx-4 my-10 rounded-2xl bg-black/20" /> }
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
      <HomeHero />

      {/* Quiz bar — desktop only; mobile version lives inside HomeHero */}
      <div className="hidden sm:flex justify-center px-4 py-4" style={{ background: "#060608" }}>
        <a
          href="/quiz"
          className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl"
          style={{
            background: "linear-gradient(145deg,#4A2000 0%,#7A3A00 55%,#5C2A00 100%)",
            border: "1px solid rgba(250,180,50,0.28)",
            boxShadow: "0 8px 28px rgba(0,0,0,.50), inset 0 1px 0 rgba(255,255,255,.06)",
          }}
        >
          <div className="shrink-0 w-8 h-8 rounded-full grid place-items-center text-base" style={{ background: "rgba(0,0,0,.35)" }}>
            🎯
          </div>
          <div className="min-w-0">
            <p className="font-display font-bold text-white text-sm leading-snug">10 for 10: Castle Escape</p>
            <p className="text-xs whitespace-nowrap" style={{ color: "rgba(244,241,236,.58)" }}>
              10 questions for 10 years – win a night at Tafaria
            </p>
          </div>
          <span className="shrink-0 px-4 py-1.5 rounded-full font-bold text-sm whitespace-nowrap" style={{ background: "#FACC15", color: "#1a1003" }}>
            Start Quiz →
          </span>
        </a>
      </div>

      <CultureSection />
      <PlatformsSection />
      <ReviewsCarousel />
      <PartnersCarousel />
      <RateCardForm />
      <Footer />
    </>
  );
}
