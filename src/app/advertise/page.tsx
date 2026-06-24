import AdvertiseSection from "@/components/sections/AdvertiseSection";
import Footer from "@/components/layout/Footer";

export const dynamic    = "force-static";
export const revalidate = 3600;

export const metadata = {
  title: "Advertise with Weru TV & FM — Reach Millions Across East Africa",
  description:
    "Grow your brand on air. TV spots, radio jingles, digital placements and live coverage across Weru TV and Weru FM 96.4. Get pricing via WhatsApp.",
  openGraph: {
    title: "Advertise with Weru TV & FM",
    description:
      "Reach 1.97M+ monthly viewers and 483K+ radio listeners. Prime time spots, sponsorships, digital & social — one trusted media partner.",
    images: ["/Werulogo.jpeg"],
  },
};

export default function AdvertisePage() {
  return (
    <>
      <AdvertiseSection />
      <Footer />
    </>
  );
}
