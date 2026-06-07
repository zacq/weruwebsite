"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const slides = [
  {
    line1: "Central Kenya,",
    emphasis: "Always",
    line2: "On Air.",
    sub: "Live news, sports and culture broadcast from our studios in the heart of Nyeri — to screens across six countries.",
    bg: "/heroimages/studio%20area17.png",
  },
  {
    line1: "Your Cultural",
    emphasis: "Heritage,",
    line2: "Celebrated Daily.",
    sub: "Weru Studios brings the richness of Kikuyu culture and African arts to screens worldwide.",
    bg: "/heroimages/studio%20area15.png",
  },
  {
    line1: "Trusted News.",
    emphasis: "Real Stories.",
    line2: "Undeniable Impact.",
    sub: "The most trusted source for Central Kenya and the Mount Kenya region — now broadcast internationally.",
    bg: "/heroimages/studio%20area13.png",
  },
  {
    line1: "Reach",
    emphasis: "Millions",
    line2: "Across East Africa.",
    sub: "Kenya's premier regional TV channel — now broadcasting across 6 countries. Partner with us.",
    bg: "/heroimages/studio%20area16.png",
  },
];

const ON_AIR = [
  { time: "NOW · 7:00 AM", name: "Ntcto Cia",        genre: "News & Current Affairs", img: "/heroimages/studio%20area13.png", live: true  },
  { time: "10:00 AM",      name: "Kurukuru Bienine",  genre: "Sports Roundup",         img: "/heroimages/studio%20area15.png", live: false },
  { time: "1:00 PM",       name: "Mugithi Lounge",    genre: "Arts & Culture",          img: "/heroimages/studio%20area16.png", live: false },
];

export default function HomeHero() {
  const [current, setCurrent] = useState(0);
  const n = slides.length;

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % n), 9000);
    return () => clearInterval(t);
  }, [n]);

  const slide = slides[current];
  const prev  = () => setCurrent((c) => (c - 1 + n) % n);
  const next  = () => setCurrent((c) => (c + 1) % n);

  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: "100dvh" }}>

      {/* ── Background — Ken Burns ───────────────────────────── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.bg}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${slide.bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            animation: "kenburns 26s ease-in-out infinite alternate",
            zIndex: -3,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        />
      </AnimatePresence>

      {/* Scrim */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(95deg,rgba(8,8,10,.94) 0%,rgba(8,8,10,.78) 32%,rgba(8,8,10,.30) 60%,rgba(8,8,10,.55) 100%)",
          zIndex: -2,
        }}
      />

      {/* Orange glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(60% 80% at 12% 70%,rgba(255,122,0,.30),transparent 60%)",
          mixBlendMode: "screen",
          zIndex: -1,
        }}
      />

      {/* ── Content ──────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col" style={{ minHeight: "100dvh" }}>

        {/* Hero text block */}
        <div className="flex-1 px-4 sm:px-10 md:px-12 pt-16 sm:pt-20 pb-4 max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              {/* LIVE NOW pill */}
              <motion.div
                className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-3.5 py-1.5 rounded-full mb-4 sm:mb-5"
                style={{
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(10,10,12,0.50)",
                  backdropFilter: "blur(6px)",
                }}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <span className="flex items-center gap-1.5 font-bold text-xs tracking-widest text-white uppercase">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="live-dot absolute inline-flex h-full w-full rounded-full bg-[#FF3B30] opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#FF3B30]" />
                  </span>
                  Live Now
                </span>
                <span className="text-xs" style={{ color: "rgba(244,241,236,.62)" }}>
                  <b className="text-white font-semibold">Ntcto Cia</b> · Morning Show
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/heroimages/studio%20area11.png"
                  alt=""
                  className="hidden sm:block w-16 h-9 object-cover rounded-lg shrink-0"
                  style={{ border: "1px solid rgba(255,255,255,0.12)" }}
                />
              </motion.div>

              {/* Headline */}
              <motion.h1
                className="font-display font-extrabold text-white leading-[.96] mb-3 sm:mb-4"
                style={{ fontSize: "clamp(28px,5.5vw,64px)", letterSpacing: "clamp(-1px,-.3vw,-1.8px)" }}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22 }}
              >
                {slide.line1}
                <br />
                <em className="font-headline not-italic" style={{ fontStyle: "italic", color: "#FF7A00" }}>
                  {slide.emphasis}
                </em>
                {" "}<span className="font-display">{slide.line2}</span>
              </motion.h1>

              {/* Sub-copy */}
              <motion.p
                className="text-sm sm:text-base leading-relaxed mb-5"
                style={{ color: "rgba(244,241,236,.62)", maxWidth: "420px" }}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34 }}
              >
                {slide.sub}
              </motion.p>

              {/* CTAs */}
              <motion.div
                className="flex flex-col min-[480px]:flex-row flex-wrap gap-2.5 sm:gap-3"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.46 }}
              >
                <Link
                  href="/tv"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:opacity-90 hover:scale-[1.03] active:scale-95"
                  style={{
                    background: "linear-gradient(180deg,#FF9425,#FF7A00)",
                    color: "#1a1003",
                    boxShadow: "0 12px 34px rgba(255,122,0,.36)",
                  }}
                >
                  ▶ Watch Live
                </Link>
                <Link
                  href="/tv"
                  className="glass-sm inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:bg-white/10 active:scale-95"
                >
                  Today&apos;s Schedule →
                </Link>
              </motion.div>

              {/* Slide dots */}
              <motion.div
                className="flex gap-2 items-center mt-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
              >
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === current ? 28 : 8,
                      height: 8,
                      minWidth: 8,
                      background: i === current ? "#FF7A00" : "rgba(255,255,255,.30)",
                    }}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ON AIR & UP NEXT rail */}
        <motion.div
          className="px-4 sm:px-10 md:px-12 pb-5 sm:pb-6"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-baseline gap-4 mb-2">
            <span
              className="font-bold text-xs tracking-[1.6px] uppercase"
              style={{ color: "rgba(244,241,236,.62)" }}
            >
              On Air &amp; Up Next
            </span>
            <Link
              href="/tv#tv-schedule"
              className="ml-auto text-sm font-semibold transition-opacity hover:opacity-80"
              style={{ color: "#FF7A00" }}
            >
              Full schedule →
            </Link>
          </div>

          <div className="flex gap-3.5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {ON_AIR.map((show, i) => (
              <div
                key={i}
                className="shrink-0 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1"
                style={{
                  flex: "0 0 clamp(160px,42vw,230px)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "#111",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,122,0,.6)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.12)"; }}
              >
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={show.img} alt={show.name} className="w-full object-cover" style={{ height: "clamp(80px,20vw,110px)" }} />
                  {show.live && (
                    <div
                      className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-white text-[11px] font-extrabold tracking-wide"
                      style={{ background: "rgba(255,59,48,.92)" }}
                    >
                      <span className="relative flex h-2 w-2">
                        <span className="live-dot absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                      </span>
                      LIVE
                    </div>
                  )}
                </div>
                <div className="px-3 py-2.5" style={{ background: "linear-gradient(180deg,rgba(17,17,19,.2),#0e0e10)" }}>
                  <p className="font-display text-[10px] font-bold tracking-wide mb-0.5" style={{ color: "#FF7A00" }}>{show.time}</p>
                  <p className="font-display font-bold text-white text-[15px] leading-snug tracking-tight mb-0.5">{show.name}</p>
                  <p className="text-[11px]" style={{ color: "rgba(244,241,236,.62)" }}>{show.genre}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quiz floating bar */}
      <div className="relative z-10 flex justify-center px-4 pb-5">
        <a
          href="/quiz"
          className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl"
          style={{
            background: "linear-gradient(145deg,#4A2000 0%,#7A3A00 55%,#5C2A00 100%)",
            border: "1px solid rgba(250,180,50,0.28)",
            boxShadow: "0 8px 28px rgba(0,0,0,.50), inset 0 1px 0 rgba(255,255,255,.06)",
          }}
        >
          <div
            className="shrink-0 w-8 h-8 rounded-full grid place-items-center text-base"
            style={{ background: "rgba(0,0,0,.35)" }}
          >
            🎯
          </div>
          <div className="min-w-0">
            <p className="font-display font-bold text-white text-sm leading-snug">10 for 10: Castle Escape</p>
            <p className="text-xs whitespace-nowrap" style={{ color: "rgba(244,241,236,.58)" }}>
              10 questions for 10 years – win a night at Tafaria
            </p>
          </div>
          <span
            className="shrink-0 px-4 py-1.5 rounded-full font-bold text-sm whitespace-nowrap"
            style={{ background: "#FACC15", color: "#1a1003" }}
          >
            Start Quiz →
          </span>
        </a>
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all hover:scale-110 text-base sm:text-xl"
        style={{ background: "rgba(255,255,255,.08)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,.14)" }}
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all hover:scale-110 text-base sm:text-xl"
        style={{ background: "rgba(255,255,255,.08)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,.14)" }}
        aria-label="Next slide"
      >
        ›
      </button>
    </section>
  );
}
