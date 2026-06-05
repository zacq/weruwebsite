import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import { presenters } from "@/data/presenters";
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

      {/* Grid */}
      <section
        className="px-4 py-16"
        style={{ background: "#0D0D0D" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {presenters.map((presenter, i) => (
              <Link
                key={presenter.slug}
                href={`/presenters/${presenter.slug}`}
                className="group flex flex-col rounded-2xl overflow-hidden transition-transform duration-200 hover:scale-[1.02]"
                style={{
                  background: "#161616",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {/* 1:1 image */}
                <div className="relative w-full" style={{ aspectRatio: "1/1" }}>
                  <Image
                    src={presenter.imageSrc}
                    alt={presenter.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    priority={i < 4}
                    loading={i < 4 ? "eager" : "lazy"}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)",
                    }}
                  />
                </div>

                {/* Info */}
                <div className="p-4 flex-1 flex flex-col gap-1">
                  <p
                    className="text-[10px] font-extrabold tracking-widest uppercase"
                    style={{ color: "#f97d00" }}
                  >
                    {presenter.show}
                  </p>
                  <p className="text-white text-sm font-bold leading-snug">{presenter.name}</p>
                  <p className="text-white/45 text-xs mt-auto pt-2 group-hover:text-[#f97d00] transition-colors">
                    Read profile →
                  </p>
                </div>
              </Link>
            ))}
          </div>
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
