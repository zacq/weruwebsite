import RadioSection from "@/components/sections/RadioSection";
import RateCardForm from "@/components/sections/RateCardForm";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Weru FM Radio — Live Radio Stream",
  description: "Listen to Weru FM live radio stream and explore our exciting lineup of daily programs.",
};

export default function RadioPage() {
  return (
    <>
      <RadioSection />

      {/* Advertise on radio CTA */}
      <div className="px-4 py-12 text-center" style={{ background: "#111111" }}>
        <p className="text-white font-extrabold text-2xl mb-2">Advertise on Weru FM</p>
        <p className="text-white/55 text-sm mb-6 max-w-md mx-auto">
          Reach over 500,000 daily radio listeners across the Mount Kenya region.
        </p>
        <a
          href="#rate-card"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-extrabold text-sm"
          style={{ background: "#f97d00", boxShadow: "0 0 20px rgba(249,125,0,0.35)" }}
        >
          📋 Get Radio Rate Card
        </a>
      </div>

      <RateCardForm />
      <Footer />
    </>
  );
}
