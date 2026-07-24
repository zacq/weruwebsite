import RadioSection from "@/components/sections/RadioSection";
import RateCardForm from "@/components/sections/RateCardForm";
import Footer from "@/components/layout/Footer";

export const dynamic    = "force-static";
export const revalidate = 3600;

export const metadata = {
  title: "WERU FM 96.4 . '96 + 4 = 100'",
  description:
    "We don't just broadcast – we give 100%. We don't just reach audiences – we complete the circle. Weru is 100% entertainment. 100% information. 100% community. 100% movement. WE ARE 100% WERU!",
  openGraph: {
    title: "WERU FM 96.4 . '96 + 4 = 100'",
    description: "We don't just broadcast – we give 100%. We don't just reach audiences – we complete the circle. Weru is 100% entertainment. 100% information. 100% community. 100% movement. WE ARE 100% WERU!",
    url: "https://werudigital.co.ke/radio",
    siteName: "Weru Digital",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WERU FM 96.4 . '96 + 4 = 100'",
    description: "We don't just broadcast – we give 100%. We don't just reach audiences – we complete the circle. Weru is 100% entertainment. 100% information. 100% community. 100% movement. WE ARE 100% WERU!",
  },
};

export default function RadioPage() {
  return (
    <>
      <div className="h-20" />
      <RadioSection />

      {/* Advertise on radio CTA */}
      <div className="px-4 pt-12 pb-2 text-center" style={{ background: "#111111" }}>
        <p className="text-white font-extrabold text-2xl mb-2">Advertise on Weru FM</p>
        <p className="text-white/55 text-sm max-w-md mx-auto">
          Reach over 500,000 daily radio listeners across the Mount Kenya region.
        </p>
      </div>

      <RateCardForm />
      <Footer />
    </>
  );
}
