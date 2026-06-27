import Link from "next/link";
import Footer from "@/components/layout/Footer";
import PresenterTabs from "@/components/sections/PresenterTabs";
import type { Metadata } from "next";

export const dynamic    = "force-static";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Weru TV Presenters | Meet the Faces of Meru County Television",
  description:
    "Meet the talented presenters behind Weru TV's most-watched shows. From morning news to music, sports, and community programmes — discover the voices and faces of Central Kenya's leading TV channel.",
  openGraph: {
    title: "Weru TV Presenters | Meet the Faces of Meru County Television",
    description:
      "Discover the presenters who bring Weru TV to life every day — news anchors, entertainment hosts, lifestyle experts, and more.",
    url: "https://werutv.co.ke/presenters",
    siteName: "Weru TV",
    type: "website",
  },
};

export default function PresentersPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="pt-28 pb-16 px-4 text-center"
        style={{ background: "linear-gradient(160deg, #0A0A0A 0%, #1a0a00 100%)" }}
      >
        <p
          className="text-xs font-extrabold tracking-widest uppercase mb-3"
          style={{ color: "#f97d00" }}
        >
          Weru TV
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
          Our Presenters
        </h1>
        <p className="text-white/60 text-base max-w-xl mx-auto leading-relaxed">
          The talented individuals who bring{" "}
          <Link href="/tv" className="text-[#f97d00] hover:underline">
            Weru TV
          </Link>{" "}
          to life every day — news anchors, entertainment hosts, lifestyle experts, agricultural
          advisors, and cultural champions from across Central Kenya.
        </p>

        <div className="flex items-center justify-center gap-4 mt-8 flex-wrap">
          <Link
            href="/tv#tv-schedule"
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-80"
            style={{ background: "#f97d00" }}
          >
            View Full Schedule
          </Link>
          <Link
            href="/tv"
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-80"
            style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.15)" }}
          >
            📺 Watch Live
          </Link>
        </div>
      </section>

      {/* Tabbed grid */}
      <section className="px-4 py-16" style={{ background: "#0D0D0D" }}>
        <div className="max-w-6xl mx-auto">
          <PresenterTabs />
        </div>
      </section>

      {/* SEO contextual links section */}
      <section
        className="px-4 py-12"
        style={{ background: "#111111" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-white/40 text-sm leading-relaxed">
            Weru TV broadcasts across Meru County and the wider Central Kenya region.{" "}
            <Link href="/tv" className="text-[#f97d00] hover:underline">
              Watch Weru TV live
            </Link>
            , check the{" "}
            <Link href="/tv#tv-schedule" className="text-[#f97d00] hover:underline">
              daily programme schedule
            </Link>
            , or tune in to{" "}
            <Link href="/radio" className="text-[#f97d00] hover:underline">
              Weru FM radio
            </Link>{" "}
            for non-stop music and news throughout the day.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
