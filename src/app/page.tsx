import ShowsCarousel from "@/components/sections/ShowsCarousel";
import HeadlineTicker from "@/components/sections/HeadlineTicker";
import LiveStream from "@/components/sections/LiveStream";
import VideoGrid from "@/components/sections/VideoGrid";
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
      {/* 1. Hero — Shows Carousel (directly below navbar) */}
      <ShowsCarousel />

      {/* 2. Headlines Ticker (below hero carousel) */}
      <HeadlineTicker />

      {/* 3. Live TV Embed */}
      <LiveStream />

      {/* 4. Latest Videos Grid */}
      <VideoGrid />

      {/* 5. Radio Section — moved above Advertise per PRD */}
      <RadioSection />

      {/* 6. Advertise With Us */}
      <AdvertiseSection />

      {/* 7. Latest Headlines / News */}
      <NewsGrid />

      {/* 8. Google Reviews Carousel (social proof) */}
      <ReviewsCarousel />

      {/* 9. Partners & Advertisers Strip */}
      <PartnersCarousel />

      {/* 10. Rate Card Enquiry Form (primary lead capture) */}
      <RateCardForm />

      {/* Footer */}
      <Footer />
    </>
  );
}
