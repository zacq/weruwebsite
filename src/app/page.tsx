import dynamic from "next/dynamic";
import HeroSection from "@/components/sections/HeroSection";
import HeadlineTicker from "@/components/sections/HeadlineTicker";
import { getNewsFeed } from "@/lib/getNewsFeed";

const VideoGrid = dynamic(
  () => import("@/components/sections/VideoGrid"),
  { loading: () => <div className="h-64 mx-4 my-10 rounded-2xl bg-black/20" /> }
);

const TVProgramLineup = dynamic(
  () => import("@/components/sections/TVProgramLineup"),
  { loading: () => <div className="h-64 mx-4 my-10 rounded-2xl bg-black/20" /> }
);

const RadioSection = dynamic(
  () => import("@/components/sections/RadioSection"),
  { loading: () => <div className="h-48 mx-4 my-10 rounded-2xl bg-black/20" /> }
);

const AdvertiseSection = dynamic(
  () => import("@/components/sections/AdvertiseSection"),
  { loading: () => <div className="h-48 mx-4 my-10 rounded-2xl bg-black/20" /> }
);

const NewsGrid = dynamic(
  () => import("@/components/sections/NewsGrid"),
  { loading: () => <div className="h-64 mx-4 my-10 rounded-2xl bg-black/20" /> }
);

const ReviewsCarousel = dynamic(
  () => import("@/components/sections/ReviewsCarousel"),
  { loading: () => <div className="h-64 mx-4 my-10 rounded-2xl bg-black/20" /> }
);

const PartnersCarousel = dynamic(
  () => import("@/components/sections/PartnersCarousel"),
  { loading: () => <div className="h-24 mx-4 my-6 rounded-2xl bg-black/20" /> }
);

const RateCardForm = dynamic(
  () => import("@/components/sections/RateCardForm"),
  { loading: () => <div className="h-48 mx-4 my-10 rounded-2xl bg-black/20" /> }
);

const Footer = dynamic(() => import("@/components/layout/Footer"));

export default async function HomePage() {
  const headlines = await getNewsFeed();

  return (
    <>
      {/* 1. Hero — Live TV player (left) + headline carousel (right) */}
      <HeroSection />

      {/* 2. Scrolling headlines ticker */}
      <HeadlineTicker headlines={headlines} />

      {/* 3. Latest Videos grid + View All on YouTube button */}
      <VideoGrid />

      {/* 4. TV Programs Lineup — day-tabbed schedule with notifications */}
      <TVProgramLineup />

      {/* 5. Live Radio player + radio schedule */}
      <RadioSection />

      {/* 6. Grow Your Brand / Advertise section */}
      <AdvertiseSection />

      {/* 7. Latest Headlines news grid */}
      <NewsGrid />

      {/* 8. Google Reviews carousel */}
      <ReviewsCarousel />

      {/* 9. Partners & Advertisers strip */}
      <PartnersCarousel />

      {/* 10. Rate Card enquiry form */}
      <RateCardForm />

      {/* Footer */}
      <Footer />
    </>
  );
}
