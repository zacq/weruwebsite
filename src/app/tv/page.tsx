import LiveStream from "@/components/sections/LiveStream";
import ShowsCarousel from "@/components/sections/ShowsCarousel";
import VideoGrid from "@/components/sections/VideoGrid";
import RateCardForm from "@/components/sections/RateCardForm";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Weru TV — Live Television",
  description: "Watch Weru TV live stream and browse the latest TV shows and videos.",
};

export default function TVPage() {
  return (
    <>
      {/* Live stream hero */}
      <LiveStream />

      {/* TV Shows */}
      <ShowsCarousel title="Our TV Presenters and Shows" />

      {/* Latest Videos */}
      <VideoGrid />

      {/* Advertise CTA */}
      <div className="px-4 py-12 text-center" style={{ background: "#f97d00" }}>
        <p className="text-white font-extrabold text-2xl mb-2">Sponsor a Show or Buy Airtime</p>
        <p className="text-white/70 text-sm mb-6 max-w-md mx-auto">
          Put your brand in front of millions of engaged Kenyan viewers.
        </p>
        <a
          href="#rate-card"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-extrabold text-sm"
          style={{ background: "#111111" }}
        >
          📋 Get Rate Card
        </a>
      </div>

      <RateCardForm />
      <Footer />
    </>
  );
}
