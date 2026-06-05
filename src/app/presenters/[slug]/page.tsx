import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import { presenters } from "@/data/presenters";
import { LeadCaptureForm } from "./LeadCaptureForm";

export const dynamic    = "force-static";
export const revalidate = 3600;

export async function generateStaticParams() {
  return presenters.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = presenters.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `${p.name} — ${p.show} | Weru TV`,
    description: p.bio[0].slice(0, 155),
    openGraph: {
      title: `${p.name} | Weru TV`,
      description: p.bio[0].slice(0, 155),
      images: [{ url: p.imageSrc }],
    },
  };
}

const SOCIAL_LABELS: Record<string, { label: string; color: string }> = {
  facebook:  { label: "Facebook",    color: "#1877F2" },
  twitter:   { label: "X / Twitter", color: "#111111" },
  instagram: { label: "Instagram",   color: "#E1306C" },
  youtube:   { label: "YouTube",     color: "#FF0000" },
};

export default async function PresenterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const presenter = presenters.find((p) => p.slug === slug);
  if (!presenter) notFound();

  return (
    <>
      {/* ── Hero ─────────────────────────────────── */}
      <section
        className="relative overflow-hidden pt-28 pb-4 px-4"
        style={{ background: "#0A0A0A" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 65% -5%, rgba(249,125,0,0.13) 0%, rgba(200,16,46,0.07) 45%, transparent 70%)",
          }}
        />

        <div className="max-w-5xl mx-auto relative">
          <Link
            href="/presenters"
            className="inline-flex items-center gap-1.5 text-xs font-semibold mb-10 py-2 pr-2 transition-colors duration-150 hover:text-[#f97d00]"
            style={{ color: "rgba(255,255,255,0.38)" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            All presenters
          </Link>

          <div className="mb-5">
            <span
              className="inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-extrabold tracking-widest uppercase"
              style={{
                background: "rgba(249,125,0,0.10)",
                border: "1px solid rgba(249,125,0,0.28)",
                color: "#f97d00",
              }}
            >
              {presenter.show}
            </span>
          </div>

          <h1 className="text-balance text-[2.5rem] sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.05] tracking-tight mb-3">
            {presenter.name}
          </h1>

          <p className="text-sm font-medium tracking-wide" style={{ color: "rgba(255,255,255,0.40)" }}>
            {presenter.role}
            <span className="mx-2 opacity-40">·</span>
            <span style={{ color: "#f97d00" }}>{presenter.show}</span>
          </p>
        </div>
      </section>

      {/* ── Bio + Image ───────────────────────────── */}
      <section className="relative px-4 pt-8 pb-20" style={{ background: "#0A0A0A" }}>
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: "55%",
            height: "1px",
            background: "linear-gradient(to right, transparent, rgba(249,125,0,0.18), transparent)",
          }}
        />

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10 lg:gap-14 items-start">

            {/* LEFT — text */}
            <div className="order-2 lg:order-1">
              <article
                className="text-[0.9375rem] leading-[1.78]"
                style={{ color: "rgba(255,255,255,0.70)", maxWidth: "64ch" }}
              >
                <p className="mb-6">{presenter.bio[0]}</p>

                <blockquote
                  className="relative my-8 px-6 py-5 rounded-2xl overflow-hidden"
                  style={{
                    background: "rgba(249,125,0,0.06)",
                    backdropFilter: "blur(18px)",
                    WebkitBackdropFilter: "blur(18px)",
                    border: "1px solid rgba(249,125,0,0.18)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.28)",
                  }}
                >
                  <div
                    className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full"
                    style={{ background: "linear-gradient(to bottom, #f97d00, #C8102E)" }}
                  />
                  <p
                    className="italic text-base font-semibold leading-relaxed pl-2"
                    style={{ color: "rgba(255,255,255,0.82)" }}
                  >
                    &ldquo;{presenter.tagline}&rdquo;
                  </p>
                </blockquote>

                {presenter.programHistory.map((para, i) => (
                  <p key={i} className="mb-6">{para}</p>
                ))}
              </article>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mt-10">
                {presenter.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl px-3 py-4 text-center"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 16px rgba(0,0,0,0.28)",
                    }}
                  >
                    <p className="text-xl font-extrabold tabular-nums leading-none" style={{ color: "#f97d00" }}>
                      {stat.value}
                    </p>
                    <p className="text-[9px] text-white/35 mt-2 font-bold tracking-wider uppercase leading-tight">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Social links — CSS-only hover via .social-link */}
              {Object.keys(presenter.socialLinks).length > 0 && (
                <div className="mt-7 flex items-center gap-2.5 flex-wrap">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/25 mr-1">
                    Follow
                  </span>
                  {(Object.entries(presenter.socialLinks) as [string, string][]).map(
                    ([platform, url]) => {
                      const meta = SOCIAL_LABELS[platform];
                      if (!meta) return null;
                      return (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-link px-4 py-2 rounded-xl text-white text-xs font-bold"
                          style={{ background: meta.color, minHeight: "38px" }}
                        >
                          {meta.label}
                        </a>
                      );
                    }
                  )}
                </div>
              )}
            </div>

            {/* RIGHT — portrait */}
            <div className="order-1 lg:order-2 lg:sticky lg:top-24">
              <div className="relative mx-auto" style={{ maxWidth: "min(100%, 320px)" }}>
                <div
                  className="absolute -inset-10 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 45%, rgba(249,125,0,0.20) 0%, rgba(200,16,46,0.09) 42%, transparent 68%)",
                  }}
                />
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: "3/4" }}>
                  <Image
                    src={presenter.imageSrc}
                    alt={presenter.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 80vw, 38vw"
                    priority
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse 88% 78% at 50% 32%, transparent 38%, rgba(10,10,10,0.52) 68%, #0A0A0A 100%)",
                    }}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Lead capture form ────────────────────── */}
      <section
        className="relative px-4 py-10 overflow-hidden"
        style={{ background: "#0A0A0A" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 65% at 50% 50%, rgba(249,125,0,0.07) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-lg mx-auto relative">
          <div
            className="rounded-2xl px-5 py-6 sm:px-7 sm:py-7"
            style={{
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              border: "1px solid rgba(255,255,255,0.10)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.14), inset 0 -1px 0 rgba(0,0,0,0.28), 0 32px 80px rgba(0,0,0,0.52), 0 0 0 0.5px rgba(249,125,0,0.07)",
            }}
          >
            <LeadCaptureForm show={presenter.show} />
          </div>
        </div>
      </section>

      {/* ── Contextual links ─────────────────────── */}
      <section className="px-4 py-14" style={{ background: "#0A0A0A" }}>
        <div className="max-w-4xl mx-auto">
          <p
            className="text-[10px] font-extrabold tracking-widest uppercase mb-6"
            style={{ color: "rgba(255,255,255,0.20)" }}
          >
            Explore Weru TV
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { href: "/tv",             label: "Watch Weru TV live",   sub: "Stream now",            icon: "📺" },
              { href: "/tv#tv-schedule", label: "Full TV schedule",     sub: "Daily programme guide", icon: "📅" },
              { href: "/radio",          label: "Weru FM radio",        sub: "Listen live",           icon: "📻" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="explore-card flex items-center gap-4 px-5 py-4 rounded-2xl group"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
                  minHeight: "72px",
                }}
              >
                <span className="text-2xl shrink-0" aria-hidden="true">{item.icon}</span>
                <div>
                  <p className="text-white text-sm font-bold leading-snug group-hover:text-[#f97d00] transition-colors duration-150">
                    {item.label}
                  </p>
                  <p className="text-white/32 text-xs mt-0.5">{item.sub}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/presenters"
              className="text-xs font-semibold transition-colors duration-150 hover:text-[#f97d00]"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              ← Back to all presenters
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
