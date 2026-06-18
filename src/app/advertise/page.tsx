import type { Metadata } from "next";
import AdSubmissionForm from "@/components/sections/AdSubmissionForm";
import Footer from "@/components/layout/Footer";

export const dynamic    = "force-static";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Submit Your Ad — Weru TV & Weru FM 96.4",
  description:
    "Submit your TV or radio ad materials to Weru Digital. Specify your schedule, duration, and booking details — our team confirms within 24 hours.",
  openGraph: {
    title: "Advertise on Weru TV & Weru FM 96.4",
    description:
      "Ad submission portal — upload materials, choose your schedule, and book airtime on Kenya's leading Kikuyu-language broadcaster.",
    siteName: "Weru Digital",
  },
};

export default function AdvertisePage() {
  return (
    <>
      <AdSubmissionForm />
      <Footer />
    </>
  );
}
