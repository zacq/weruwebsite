import lazyImport from "next/dynamic";
import HomeHero from "@/components/sections/HomeHero";
import AppGate from "@/components/layout/AppGate";
import AppHome from "@/components/sections/AppHome";
import { getHotMixes } from "@/lib/getHotMixes";
import { getPresenters } from "@/lib/getPresenters";
import { getPartners } from "@/lib/getPartners";
import { getNewsFeed } from "@/lib/getNewsFeed";
import { getActiveQuiz } from "@/lib/getActiveQuiz";
import QuizPromoBar, { type QuizPromo } from "@/components/ui/QuizPromoBar";
import { OG_LOGO_URL } from "@/lib/brandAssets";

// Mirrors the kill-switch in src/app/quiz/page.tsx — hides quiz promos sitewide when paused.
const QUIZ_PAUSED = process.env.QUIZ_PAUSED === "true";

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
    images: [OG_LOGO_URL],
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

const MultiStreamAdvantageSection = lazyImport(
  () => import("@/components/sections/MultiStreamAdvantageSection"),
  { loading: () => <div className="h-48 mx-4 my-10 rounded-2xl bg-black/20" /> }
);

const RadioPlatformsSection = lazyImport(
  () => import("@/components/sections/RadioPlatformsSection"),
  { loading: () => <div className="h-64 mx-4 my-10 rounded-2xl bg-black/20" /> }
);

const HotMixesSection = lazyImport(
  () => import("@/components/sections/HotMixesSection"),
  { loading: () => <div className="h-64 mx-4 my-10 rounded-2xl bg-black/20" /> }
);

const OurBrandsSection = lazyImport(
  () => import("@/components/sections/OurBrandsSection"),
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

const Footer = lazyImport(() => import("@/components/layout/Footer"));

export default async function HomePage() {
  const hotMixes = await getHotMixes();
  const presenters = await getPresenters();
  const partners = await getPartners();
  const feed = await getNewsFeed();

  const activeQuiz = QUIZ_PAUSED ? null : await getActiveQuiz();
  const quizPromo: QuizPromo | null = activeQuiz
    ? {
        title: activeQuiz.title,
        subtitle: `${activeQuiz.questions.length} questions — win ${activeQuiz.prize}`,
      }
    : null;

  return (
    <AppGate
      appContent={<AppHome feed={feed} quizPromo={quizPromo} />}
      webContent={
        <>
          <HomeHero videoUrl={process.env.HOME_HERO_VIDEO_URL} quizPromo={quizPromo} />

          {/* Quiz bar — desktop only; mobile version lives inside HomeHero */}
          {quizPromo && (
            <div className="hidden sm:flex justify-center px-4 py-4" style={{ background: "#060608" }}>
              <div className="max-w-md w-full">
                <QuizPromoBar title={quizPromo.title} subtitle={quizPromo.subtitle} />
              </div>
            </div>
          )}

          <CultureSection presenters={presenters} quizPromo={quizPromo} />
          <PlatformsSection />
          <MultiStreamAdvantageSection />
          <RadioPlatformsSection />
          <HotMixesSection mixes={hotMixes} />
          <OurBrandsSection />
          <ReviewsCarousel />
          <PartnersCarousel partners={partners} />
          <Footer />
        </>
      }
    />
  );
}
