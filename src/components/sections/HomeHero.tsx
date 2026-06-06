"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/*
 * bg: real photo path — swap to actual hero images when available.
 * bgGradient: temporary gradient shown until bg image loads (or if omitted, used as full bg).
 * When you have real images, just add bg: "/heroimages/your-photo.jpg" and the gradient
 * becomes an overlay tint instead.
 */
const slides = [
  {
    eyebrow: "WERU TV · LIVE · 6 COUNTRIES",
    line1: "The Voice of",
    emphasis: "Central Kenya",
    line2: "Now Heard Worldwide",
    sub: "Available on Azam TV, DStv, Startimes & Zuku — across East Africa and beyond.",
    cta1: { label: "▶ Watch Live", href: "https://www.youtube.com/@werutvfm3411/live", external: true },
    cta2: { label: "View Schedule", href: "/tv", external: false },
    bg: "",
    bgGradient: "linear-gradient(135deg, #0a0600 0%, #1a0c00 30%, #0D1117 60%, #050810 100%)",
    accent: "#f97d00",
  },
  {
    eyebrow: "ARTS · CULTURE · COMMUNITY",
    line1: "Your Cultural",
    emphasis: "Heritage",
    line2: "Celebrated Daily",
    sub: "Weru Studios brings the richness of Kikuyu culture and African arts to screens worldwide.",
    cta1: { label: "▶ Watch Live", href: "https://www.youtube.com/@werutvfm3411/live", external: true },
    cta2: { label: "Our Shows", href: "/tv", external: false },
    bg: "",
    bgGradient: "linear-gradient(135deg, #090800 0%, #1a1500 30%, #0a0a08 60%, #0D1117 100%)",
    accent: "#FACC15",
  },
  {
    eyebrow: "AZAM TV · DSTV · STARTIMES · ZUKU",
    line1: "Trusted News.",
    emphasis: "Real Stories.",
    line2: "Undeniable Impact.",
    sub: "The most trusted source for Central Kenya and the Mount Kenya region — now broadcast internationally.",
    cta1: { label: "▶ Watch Live", href: "https://www.youtube.com/@werutvfm3411/live", external: true },
    cta2: { label: "Get in Touch", href: "#rate-card", external: false },
    bg: "",
    bgGradient: "linear-gradient(135deg, #08000a 0%, #14001e 30%, #0D1117 65%, #030508 100%)",
    accent: "#f97d00",
  },
  {
    eyebrow: "GROW YOUR BRAND WITH WERU TV",
    line1: "Reach",
    emphasis: "Millions",
    line2: "Across East Africa",
    sub: "Kenya's premier regional TV channel — now broadcasting across 6 countries. Partner with us.",
    cta1: { label: "Advertise with Us", href: "#advertise", external: false },
    cta2: { label: "Request Rate Card", href: "#rate-card", external: false },
    bg: "",
    bgGradient: "linear-gradient(135deg, #0a0400 0%, #1f0800 35%, #0D1117 65%, #050508 100%)",
    accent: "#f97d00",
  },
];

export default function HomeHero() {
  const [current, setCurrent] = useState(0);
  const n = slides.length;

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % n), 6000);
    return () => clearInterval(t);
  }, [n]);

  const slide = slides[current];

  const prev = () => setCurrent((c) => (c - 1 + n) % n);
  const next = () => setCurrent((c) => (c + 1) % n);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "100dvh", minHeight: "600px" }}
    >
      {/* Background — gradient base (always shown) */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current + "-bg"}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          style={{ background: slide.bgGradient }}
        />
      </AnimatePresence>

      {/* Background — photo layer (shown on top of gradient when image path is set) */}
      {slide.bg && (
        <AnimatePresence mode="sync">
          <motion.div
            key={slide.bg}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            style={{
              backgroundImage: `url(${slide.bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center top",
            }}
          />
        </AnimatePresence>
      )}

      {/* Gradient overlays — stronger when showing photo, lighter on gradient bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: slide.bg
            ? "linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.50) 55%, rgba(0,0,0,0.18) 100%)"
            : "linear-gradient(to right, rgba(0,0,0,0.30) 0%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 45%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 18%)",
        }}
      />

      {/* Accent radial glow — shifts with each slide */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current + "-glow"}
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6 }}
          style={{
            background: `radial-gradient(ellipse at 20% 50%, ${slide.accent}18 0%, transparent 55%)`,
          }}
        />
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-10 md:px-20 pt-16 pb-24">
        <div style={{ maxWidth: "660px" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-5 sm:mb-7">
                <div
                  className="w-7 h-7 rounded flex items-center justify-center shrink-0"
                  style={{ background: "rgba(249,125,0,0.20)", border: "1px solid rgba(249,125,0,0.40)" }}
                >
                  <span className="text-[10px] font-extrabold" style={{ color: "#f97d00" }}>W</span>
                </div>
                <p className="text-white/55 text-[11px] sm:text-xs font-bold tracking-widest uppercase">
                  {slide.eyebrow}
                </p>
              </div>

              {/* Headline — mixed serif italic + sans bold */}
              <h1 className="font-bold leading-[1.08] text-white mb-0 text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem]">
                {slide.line1}
              </h1>
              <h1
                className="font-headline italic leading-[1.08] mb-0 text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem]"
                style={{ color: slide.accent }}
              >
                {slide.emphasis}
              </h1>
              <h1 className="font-bold leading-[1.08] text-white mb-6 sm:mb-8 text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem]">
                {slide.line2}
              </h1>

              {/* Sub-copy */}
              <p
                className="text-white/65 text-sm sm:text-base leading-relaxed mb-8 sm:mb-10"
                style={{ maxWidth: "460px", textWrap: "balance" } as React.CSSProperties}
              >
                {slide.sub}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <a
                  href={slide.cta1.href}
                  target={slide.cta1.external ? "_blank" : undefined}
                  rel={slide.cta1.external ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold text-sm text-black transition-all duration-200 hover:opacity-90 hover:scale-[1.03]"
                  style={{ background: "#f97d00" }}
                >
                  {slide.cta1.label}
                </a>
                <a
                  href={slide.cta2.href}
                  target={slide.cta2.external ? "_blank" : undefined}
                  rel={slide.cta2.external ? "noopener noreferrer" : undefined}
                  className="glass-sm inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:bg-white/10"
                >
                  {slide.cta2.label} →
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all duration-200 text-xl hover:scale-110"
        style={{
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.14)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.14), 0 4px 16px rgba(0,0,0,0.30)",
        }}
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all duration-200 text-xl hover:scale-110"
        style={{
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.14)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.14), 0 4px 16px rgba(0,0,0,0.30)",
        }}
        aria-label="Next slide"
      >
        ›
      </button>

      {/* Dot navigation + Weru badge — bottom bar */}
      <div className="absolute bottom-7 left-6 sm:left-10 md:left-20 right-6 sm:right-10 z-20 flex items-center justify-between">
        {/* Dots */}
        <div className="flex gap-2 items-center">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? 28 : 8,
                height: 8,
                minWidth: 8,
                background: i === current ? "#f97d00" : "rgba(255,255,255,0.30)",
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Weru TV badge */}
        <div
          className="glass-sm px-3 py-1.5 rounded-lg flex items-center gap-1"
        >
          <span className="text-sm font-black text-white">
            w<span style={{ color: "#FACC15" }}>e</span>ru
          </span>
          <sup className="text-[9px] font-bold" style={{ color: "#f97d00" }}>TV</sup>
        </div>
      </div>
    </section>
  );
}
