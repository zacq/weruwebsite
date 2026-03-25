import HeroBanner from "@/components/sections/HeroBanner";
import ShowsCarousel from "@/components/sections/ShowsCarousel";
import LiveStream from "@/components/sections/LiveStream";
import VideoGrid from "@/components/sections/VideoGrid";
import AdvertiseSection from "@/components/sections/AdvertiseSection";
import NewsGrid from "@/components/sections/NewsGrid";
import RadioSection from "@/components/sections/RadioSection";
import ReviewsCarousel from "@/components/sections/ReviewsCarousel";
import PartnersCarousel from "@/components/sections/PartnersCarousel";
import RateCardForm from "@/components/sections/RateCardForm";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero — Live TV + Radio CTAs */}
      <HeroBanner />

      {/* 2. Featured TV Shows Carousel (hooks visitors) */}
      <ShowsCarousel />

      {/* 3. Live TV Embed */}
      <LiveStream />

      {/* 4. Latest Videos Grid */}
      <VideoGrid />

      {/* 5. Advertise With Us (PRD — conversion section) */}
      <AdvertiseSection />

      {/* 6. Latest Headlines / News */}
      <NewsGrid />

      {/* 7. Radio Section — player + show carousel */}
      <RadioSection />

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
