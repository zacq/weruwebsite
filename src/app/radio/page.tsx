import RadioSection from "@/components/sections/RadioSection";
import RadioScheduleSection from "@/components/sections/RadioScheduleSection";
import RateCardForm from "@/components/sections/RateCardForm";
import Footer from "@/components/layout/Footer";

export const dynamic    = "force-static";
export const revalidate = 3600;

export const metadata = {
  title: "Weru FM 96.4 — Listen Live to Kenya's Top Kikuyu Radio Station",
  description:
    "Stream Weru FM 96.4 live online — Kenya's leading Kikuyu-language radio station. Morning shows, news, music, farming tips and community programming from Nyeri, Central Kenya.",
  openGraph: {
    title: "Weru FM 96.4 — Listen Live Online",
    description: "Stream Kenya's top Kikuyu radio station live. Morning shows, news, music and farming from Nyeri, Central Kenya.",
    url: "https://werudigital.co.ke/radio",
    siteName: "Weru Digital",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Weru FM 96.4 — Live Kikuyu Radio from Nyeri",
    description: "Stream Weru FM 96.4 live online — Kenya's leading Kikuyu-language radio station.",
  },
};

export default function RadioPage() {
  return (
    <>
      <div className="h-20" />
      <RadioSection />

      {/* Full radio program schedule */}
      <RadioScheduleSection />

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
