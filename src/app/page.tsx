import HeroSection from "@/components/sections/HeroSection";
import HeadlineTicker from "@/components/sections/HeadlineTicker";
import VideoGrid from "@/components/sections/VideoGrid";
import TVProgramLineup from "@/components/sections/TVProgramLineup";
import RadioSection from "@/components/sections/RadioSection";
import AdvertiseSection from "@/components/sections/AdvertiseSection";
import NewsGrid from "@/components/sections/NewsGrid";
import ReviewsCarousel from "@/components/sections/ReviewsCarousel";
import PartnersCarousel from "@/components/sections/PartnersCarousel";
import RateCardForm from "@/components/sections/RateCardForm";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero — Live TV player (left) + headline carousel (right) */}
      <HeroSection />

      {/* 2. Scrolling headlines ticker */}
      <HeadlineTicker />

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
