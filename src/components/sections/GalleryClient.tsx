"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import type { Album } from "@/data/gallery";

type Filter = "all" | "roadshow" | "launch";

// Base + responsive layout — inline styles only for non-responsive properties
const GALLERY_STYLES = `
  .gl-hero  { padding: 80px 40px 46px; }
  .gl-bar   { padding: 18px 40px; }
  .gl-grid  { padding: 30px 40px 56px; }
  .gl-cta   { margin: 0 40px 60px; padding: 52px 46px; }
  .gl-btns  { display: flex; gap: 14px; flex-wrap: wrap; position: relative; }
  .gl-links { padding: 0 40px 60px; }
  .gl-arrow { width: 52px; height: 52px; font-size: 22px; }
  /* lightbox two-column layout */
  .lb-body     { display: flex; flex-direction: row; flex: 1; min-height: 0; }
  .lb-stage    { flex: 1; position: relative; min-width: 0; overflow: hidden; }
  .lb-sidebar  { width: 200px; flex-shrink: 0; overflow-y: auto; display: grid; grid-template-columns: 1fr 1fr; gap: 6px; padding: 10px; align-content: start;
                 background: rgba(6,6,8,0.95); border-left: 1px solid rgba(255,255,255,0.08); }
  .lb-dots     { display: none; }
  .gl-arrow    { width: 52px; height: 52px; font-size: 22px; }

  @media (max-width: 768px) {
    .lb-body    { flex-direction: column; }
    .lb-sidebar { display: none; }
    .lb-dots    { display: flex; justify-content: center; align-items: center; gap: 6px; padding: 10px 16px 14px; flex-shrink: 0;
                  background: rgba(6,6,8,0.95); border-top: 1px solid rgba(255,255,255,0.08); }
    .gl-arrow   { width: 40px; height: 40px; font-size: 18px; }
  }

  @keyframes imgFadeIn {
    from { opacity: 0; transform: scale(1.015); }
    to   { opacity: 1; transform: scale(1); }
  }
`;

/* ── Album card ─────────────────────────────────────────── */
function AlbumCard({
  album,
  onClick,
  isPriority = false,
}: {
  album: Album;
  onClick: () => void;
  isPriority?: boolean;
}) {
  const cover       = album.images[0]?.src;
  const isClickable = !album.upcoming && album.images.length > 0;

  return (
    <div
      onClick={isClickable ? onClick : undefined}
      className="group"
      style={{
        position: "relative",
        aspectRatio: "4/3",
        borderRadius: "18px",
        overflow: "hidden",
        border: album.upcoming
          ? "1px dashed rgba(255,255,255,0.22)"
          : "1px solid rgba(255,255,255,0.12)",
        background: "#111",
        cursor: isClickable ? "pointer" : "default",
      }}
    >
      {cover ? (
        <>
          <img
            src={cover}
            alt={album.title}
            loading={isPriority ? "eager" : "lazy"}
            fetchPriority={isPriority ? "high" : "auto"}
            decoding={isPriority ? undefined : "async"}
            className="transition-transform duration-700 group-hover:scale-110"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, rgba(8,8,10,0.1) 30%, rgba(8,8,10,0.92))",
            }}
          />
        </>
      ) : (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(160deg, #15110a, #0c0c10)",
          }}
        >
          <span style={{ fontSize: "54px", opacity: 0.4 }}>
            {album.category === "launch" ? "🎬" : "📻"}
          </span>
        </div>
      )}

      {/* Category badge */}
      <div
        style={{
          position: "absolute",
          top: "16px",
          left: "16px",
          padding: "6px 12px",
          borderRadius: "999px",
          fontSize: "11px",
          fontWeight: 800,
          letterSpacing: "1px",
          textTransform: "uppercase",
          ...(album.upcoming
            ? { background: "rgba(255,255,255,0.16)", color: "#fff" }
            : { background: "rgba(255,122,0,0.92)", color: "#1a1003" }),
        }}
      >
        {album.upcoming ? "UPCOMING" : (album.badge ?? album.category.toUpperCase())}
      </div>

      {/* Photo count */}
      {!album.upcoming && album.images.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "5px 11px",
            borderRadius: "999px",
            fontSize: "12px",
            fontWeight: 700,
            color: "#fff",
            background: "rgba(8,8,10,0.6)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          📷 {album.images.length}
        </div>
      )}

      {/* Bottom info */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "22px",
        }}
      >
        <h3
          className="font-display"
          style={{
            fontWeight: 800,
            fontSize: "22px",
            color: "#fff",
            letterSpacing: "-0.5px",
            lineHeight: 1.08,
            margin: 0,
          }}
        >
          {album.title}
        </h3>
        <div
          style={{
            marginTop: "8px",
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            alignItems: "center",
            fontSize: "13.5px",
            color: "rgba(244,241,236,0.78)",
          }}
        >
          <span style={{ color: "#fff", fontWeight: 600 }}>{album.date}</span>
          <span>·</span>
          <span>{album.location}</span>
        </div>

        {isClickable ? (
          <p
            className="opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
            style={{ marginTop: "14px", fontSize: "14px", fontWeight: 700, color: "#FFC24B" }}
          >
            View Album →
          </p>
        ) : (
          <p style={{ marginTop: "14px", fontSize: "13px", color: "rgba(244,241,236,0.45)" }}>
            Photos coming soon
          </p>
        )}
      </div>
    </div>
  );
}

/* ── Lightbox ───────────────────────────────────────────── */
function Lightbox({
  album,
  index,
  onClose,
  onStep,
  onSelect,
}: {
  album: Album;
  index: number;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
  onSelect: (i: number) => void;
}) {
  const image = album.images[index];
  const touchStartX = useRef(0);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onStep(-1);
      if (e.key === "ArrowRight") onStep(1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onStep]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const btnBase: React.CSSProperties = {
    borderRadius: "50%",
    background: "rgba(255,255,255,0.10)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.16)",
    color: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "background 0.18s, color 0.18s",
  };

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", flexDirection: "column", background: "#06060a" }}
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        const delta = touchStartX.current - e.changedTouches[0].clientX;
        if (delta > 45) onStep(1);
        else if (delta < -45) onStep(-1);
      }}
    >
      {/* ── Header ── */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "12px 20px", flexShrink: 0,
        background: "rgba(6,6,10,0.90)", backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Orange accent bar */}
          <div style={{ width: 3, height: 22, borderRadius: 2, background: "#f97d00", flexShrink: 0 }} />
          <span className="font-display" style={{ fontWeight: 700, fontSize: "16px", color: "#fff", letterSpacing: "-0.2px" }}>
            {album.title}
          </span>
          <span style={{
            fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: 999,
            background: "rgba(249,125,0,0.15)", color: "#f97d00", border: "1px solid rgba(249,125,0,0.3)",
            fontVariantNumeric: "tabular-nums",
          }}>
            {index + 1} / {album.images.length}
          </span>
        </div>
        <button
          onClick={onClose}
          className="hover:bg-[#f97d00] hover:text-[#1a1003]"
          style={{ ...btnBase, width: "40px", height: "40px", fontSize: "16px" }}
          aria-label="Close"
        >✕</button>
      </div>

      {/* ── Body: image stage + sidebar ── */}
      <div className="lb-body">

        {/* ── Image stage ── */}
        <div className="lb-stage">
          <img
            key={image.src}
            src={image.src}
            alt={image.alt}
            decoding="async"
            style={{
              width: "100%", height: "100%", objectFit: "contain", display: "block",
              animation: "imgFadeIn 0.28s ease",
            }}
          />

          {/* Caption overlay */}
          {image.alt && (
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: 90,
              background: "linear-gradient(to top, rgba(6,6,10,0.92) 0%, transparent 100%)",
              display: "flex", alignItems: "flex-end", justifyContent: "center",
              padding: "0 80px 14px", pointerEvents: "none",
            }}>
              <p style={{ fontSize: "13px", color: "rgba(244,241,236,0.7)", textAlign: "center", margin: 0 }}>
                {image.alt}
              </p>
            </div>
          )}

          {/* Nav arrows */}
          <button
            onClick={() => onStep(-1)}
            className="gl-arrow hover:bg-[#f97d00] hover:text-[#1a1003]"
            style={{ ...btnBase, position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }}
            aria-label="Previous"
          >‹</button>
          <button
            onClick={() => onStep(1)}
            className="gl-arrow hover:bg-[#f97d00] hover:text-[#1a1003]"
            style={{ ...btnBase, position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)" }}
            aria-label="Next"
          >›</button>
        </div>

        {/* ── Thumbnail sidebar — desktop only ── */}
        <div className="lb-sidebar no-scrollbar">
          <div style={{ gridColumn: "1 / -1", padding: "2px 0 6px" }}>
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(244,241,236,0.35)", margin: 0 }}>
              All Photos
            </p>
          </div>
          {album.images.map((img, i) => (
            <button
              key={img.src}
              onClick={() => onSelect(i)}
              style={{ padding: 0, background: "none", border: "none", cursor: "pointer", position: "relative" }}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                style={{
                  width: "100%", aspectRatio: "4/3", objectFit: "cover",
                  borderRadius: 8,
                  opacity: i === index ? 1 : 0.5,
                  border: i === index ? "2px solid #f97d00" : "2px solid transparent",
                  transform: i === index ? "scale(1.04)" : "scale(1)",
                  transition: "all 0.2s",
                  display: "block",
                }}
              />
              {i === index && (
                <div style={{
                  position: "absolute", inset: 0, borderRadius: 8,
                  boxShadow: "inset 0 0 0 2px #f97d00, 0 0 12px rgba(249,125,0,0.35)",
                  pointerEvents: "none",
                }} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Dot counter — mobile only ── */}
      <div className="lb-dots">
        {album.images.map((_, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            style={{
              width: i === index ? 20 : 8, height: 8, minWidth: 8,
              borderRadius: 999,
              background: i === index ? "#f97d00" : "rgba(255,255,255,0.28)",
              border: "none", cursor: "pointer", padding: 0,
              transition: "all 0.25s",
            }}
            aria-label={`Photo ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Main page component ────────────────────────────────── */
export default function GalleryClient({ albums }: { albums: Album[] }) {
  const [filter, setFilter]           = useState<Filter>("all");
  const [activeAlbum, setActiveAlbum] = useState<Album | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const filtered     = albums.filter((a) => filter === "all" ? true : a.category === filter);
  const visibleCount = filtered.filter((a) => !a.upcoming).length;

  function openLightbox(album: Album) {
    if (album.upcoming || !album.images.length) return;
    setActiveAlbum(album);
    setActiveIndex(0);
  }

  const closeLightbox = useCallback(() => setActiveAlbum(null), []);
  const step = useCallback(
    (dir: 1 | -1) => {
      if (!activeAlbum) return;
      setActiveIndex((i) => (i + dir + activeAlbum.images.length) % activeAlbum.images.length);
    },
    [activeAlbum]
  );

  const heroImage =
    albums.find((a) => !a.upcoming && a.images.length > 0)?.images[0].src ?? "";

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GALLERY_STYLES }} />

      {/* ── Hero ──────────────────────────────────────────── */}
      <header
        style={{
          position: "relative",
          minHeight: "58vh",
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url('${heroImage}')`,
            backgroundSize: "cover",
            backgroundPosition: "center 38%",
            animation: "kenburns 32s ease-in-out infinite alternate",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(8,8,10,0.55) 0%, rgba(8,8,10,0.18) 38%, rgba(8,8,10,0.96) 100%)",
            zIndex: 1,
          }}
        />
        {/* padding via .gl-hero — responsive */}
        <div className="gl-hero" style={{ position: "relative", zIndex: 2, maxWidth: "880px" }}>
          <p
            style={{
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#FF7A00",
            }}
          >
            Events · Roadshows · Launches
          </p>
          <h1
            className="font-display"
            style={{
              fontWeight: 800,
              fontSize: "clamp(36px, 6.2vw, 82px)",
              lineHeight: 0.94,
              letterSpacing: "-2.5px",
              color: "#fff",
              marginTop: "14px",
            }}
          >
            Weru,{" "}
            <em className="font-headline" style={{ color: "#FF7A00", fontWeight: 600 }}>
              Out
            </em>{" "}
            in the Field.
          </h1>
          <p
            style={{
              marginTop: "18px",
              fontSize: "clamp(15px, 2vw, 18px)",
              lineHeight: 1.55,
              color: "rgba(244,241,236,0.82)",
              maxWidth: "560px",
            }}
          >
            Ten years of meeting our audience where they are — from packed market
            squares to community launches across the Mount Kenya region.
          </p>
        </div>
      </header>

      {/* ── Filter toolbar ────────────────────────────────── */}
      <div
        className="gl-bar"
        style={{
          position: "sticky",
          top: "56px",
          zIndex: 30,
          display: "flex",
          alignItems: "center",
          gap: "10px",
          flexWrap: "wrap",
          background: "rgba(8,8,10,0.82)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        {(["all", "roadshow", "launch"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "9px 18px",
              borderRadius: "999px",
              fontWeight: 600,
              fontSize: "14px",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.2s",
              ...(filter === f
                ? {
                    background: "linear-gradient(180deg, #FF9425, #FF7A00)",
                    color: "#1a1003",
                    border: "1px solid transparent",
                  }
                : {
                    background: "transparent",
                    color: "rgba(244,241,236,0.6)",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }),
            }}
          >
            {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
        <span style={{ marginLeft: "auto", fontSize: "13px", color: "rgba(244,241,236,0.6)", fontWeight: 500 }}>
          {visibleCount} {visibleCount === 1 ? "album" : "albums"}
        </span>
      </div>

      {/* ── Album grid ───────────────────────────────────── */}
      <main
        className="gl-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))",
          gap: "20px",
        }}
      >
        {filtered.map((album, index) => (
          <AlbumCard
            key={album.id}
            album={album}
            isPriority={index === 0}
            onClick={() => openLightbox(album)}
          />
        ))}
      </main>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section
        className="gl-cta"
        style={{
          borderRadius: "24px",
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(120deg, #1a0f02, #0c0c10)",
          border: "1px solid rgba(255,122,0,0.25)",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "-90px",
            top: "-90px",
            width: "360px",
            height: "360px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,122,0,0.32), transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <h2
          className="font-display"
          style={{
            fontWeight: 800,
            fontSize: "clamp(24px, 4vw, 44px)",
            letterSpacing: "-1.4px",
            color: "#fff",
            maxWidth: "620px",
            lineHeight: 1.03,
            position: "relative",
          }}
        >
          Hosting an event?{" "}
          <em className="font-headline" style={{ color: "#FF7A00", fontWeight: 600 }}>
            Bring Weru.
          </em>
        </h2>
        <p
          style={{
            color: "rgba(244,241,236,0.6)",
            marginTop: "14px",
            fontSize: "17px",
            maxWidth: "520px",
            position: "relative",
          }}
        >
          Roadshows, launches and outside broadcasts that put your brand in front of
          thousands. Let&apos;s plan your next activation.
        </p>
        <div className="gl-btns" style={{ marginTop: "26px" }}>
          <Link
            href="/#rate-card"
            className="explore-card"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "9px",
              padding: "15px 26px",
              borderRadius: "13px",
              fontWeight: 700,
              fontSize: "15.5px",
              textDecoration: "none",
              background: "linear-gradient(180deg, #FF9425, #FF7A00)",
              color: "#1a1003",
              boxShadow: "0 12px 30px rgba(255,122,0,0.34)",
              transition: "transform 0.18s",
            }}
          >
            Request Coverage →
          </Link>
          <Link
            href="/advertise"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "9px",
              padding: "15px 26px",
              borderRadius: "13px",
              fontWeight: 700,
              fontSize: "15.5px",
              textDecoration: "none",
              background: "rgba(255,255,255,0.06)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.12)",
              transition: "background 0.18s",
            }}
          >
            Advertise With Us
          </Link>
        </div>
      </section>

      {/* ── Internal links ───────────────────────────────── */}
      <nav className="gl-links" aria-label="Explore Weru TV">
        <p
          style={{
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            color: "rgba(244,241,236,0.35)",
            marginBottom: "14px",
          }}
        >
          Explore Weru TV
        </p>
        <ul style={{ display: "flex", gap: "10px", flexWrap: "wrap", listStyle: "none", padding: 0, margin: 0 }}>
          {[
            { label: "Watch Live TV",    href: "/tv" },
            { label: "Listen to Radio",  href: "/radio" },
            { label: "Our Presenters",   href: "/presenters" },
            { label: "Studios",          href: "/studios" },
            { label: "Latest News",      href: "/blog" },
          ].map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className="hover:text-[#FF7A00] hover:border-[rgba(255,122,0,0.5)] transition-colors"
                style={{
                  display: "inline-block",
                  padding: "8px 16px",
                  borderRadius: "999px",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "rgba(244,241,236,0.6)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  textDecoration: "none",
                }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Lightbox ─────────────────────────────────────── */}
      {activeAlbum && (
        <Lightbox
          album={activeAlbum}
          index={activeIndex}
          onClose={closeLightbox}
          onStep={step}
          onSelect={(i) => setActiveIndex(i)}
        />
      )}
    </>
  );
}
