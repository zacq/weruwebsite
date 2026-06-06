import { studioGallery } from "@/data/studios";
import StudioGallery from "./StudioGallery";

export const dynamic    = "force-static";
export const revalidate = 3600;

export const metadata = {
  title: "Weru Studios — Behind the Broadcast",
  description:
    "A visual journey through Weru Studios — the cultural centre behind Central Kenya's most-watched TV channel.",
  robots: { index: false, follow: false },
};

export default function StudiosPage() {
  const hero    = studioGallery.find((p) => p.featured) ?? studioGallery[0];
  const gallery = studioGallery.filter((p) => !p.featured);

  return (
    <div style={{ background: "#0A0A0A", minHeight: "100dvh" }}>
      {/* Sticky top bar */}
      <header
        className="sticky top-0 z-50 flex items-center justify-between px-5 sm:px-10 h-14"
        style={{
          background: "rgba(10,10,10,0.85)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <a
          href="/"
          className="flex items-center gap-2 text-white/60 hover:text-white text-sm font-semibold transition-colors"
        >
          ← Back
        </a>
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-black text-white">
            w<span style={{ color: "#FACC15" }}>e</span>ru
          </span>
          <sup className="text-[9px] font-bold" style={{ color: "#f97d00" }}>STUDIOS</sup>
        </div>
        <div style={{ width: 64 }} />
      </header>

      {/* Hero image */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "clamp(340px, 55vh, 620px)" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={hero.src}
          alt={hero.caption}
          className="w-full h-full object-cover object-top"
          loading="eager"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.35) 50%, rgba(10,10,10,0.10) 100%)",
          }}
        />
        <div className="absolute bottom-8 left-6 sm:left-12">
          <p
            className="text-[11px] font-bold tracking-widest uppercase mb-2"
            style={{ color: "#FACC15" }}
          >
            ARTS · CULTURE · COMMUNITY
          </p>
          <h1 className="text-white font-extrabold text-3xl sm:text-5xl md:text-6xl leading-tight">
            Weru{" "}
            <span className="font-headline italic" style={{ color: "#FACC15" }}>
              Studios
            </span>
          </h1>
          <p className="text-white/55 text-sm sm:text-base mt-2">{hero.caption}</p>
        </div>
      </div>

      {/* Gallery grid */}
      <StudioGallery photos={gallery} />

      {/* Footer strip */}
      <div
        className="px-6 sm:px-12 py-10 text-center"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <p className="text-white/30 text-xs mb-4">
          All images from Weru Studios, Nyeri — Central Kenya
        </p>
        <a
          href="/#rate-card"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-black transition-all hover:opacity-90"
          style={{ background: "#f97d00" }}
        >
          Partner With Us →
        </a>
      </div>
    </div>
  );
}
