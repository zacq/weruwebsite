"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { tvSchedule } from "@/data/tvSchedule";

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
    bg: "/heroimages/studio%20area16.png",
  },
  {
    line1: "Trusted News.",
    emphasis: "Real Stories.",
    line2: "Undeniable Impact.",
    sub: "The most trusted source for Central Kenya and the Mount Kenya region — now broadcast internationally.",
    bg: "/heroimages/studio%20area6.png",
  },
  {
    line1: "Reach",
    emphasis: "Millions",
    line2: "Across East Africa.",
    sub: "Kenya's premier regional TV channel — now broadcasting across 6 countries. Partner with us.",
    bg: "/heroimages/remove__https___202606181246.jpg",
  },
];

// Presenter name → image path
const PRESENTER_IMG: Record<string, string> = {
  "Stella Karimi Kaunty":           "/Presenters/stella-karimi.png",
  "Stella Karimi":                  "/Presenters/stella-karimi.png",
  "Martin Gichunge":                "/Presenters/martin-gichunge.png",
  "Martin Gichunge Dullah":         "/Presenters/martin-gichunge.png",
  "Makena Wa Matiri":               "/Presenters/makena-wa-matiri.png",
  "Munene Wa Kagwi":                "/Presenters/munene-wa-kagwi.png",
  "Edward Mutembei":                "/Presenters/edward-mutembei.png",
  "Nelly Kithinji":                 "/Presenters/nelly-githinji.png",
  "Nelly Githinji":                 "/Presenters/nelly-githinji.png",
  "Empress Rita":                   "/Presenters/empress-rita-natty.png",
  "Empress Natty":                  "/Presenters/empress-rita-natty.png",
  "Empress Rita & Empress Natty":   "/Presenters/empress-rita-natty.png",
  "MC Tash":                        "/Presenters/mc-tash.png",
  "Mwenda H Pilot":                 "/Presenters/mwenda-h-pilot.png",
  "Ajelyne George":                 "/Presenters/ajelyne-george.png",
  "Betty":                          "/Presenters/Betty%20-Ugima%20Ni%20Utonga.png",
  "Ntinyari Kinyua":                "/Presenters/nelly-githinji.png",
};

// Cycle through these when no specific presenter image is available
const ALL_PRESENTER_IMAGES = [
  "/Presenters/stella-karimi.png",
  "/Presenters/martin-gichunge.png",
  "/Presenters/ajelyne-george.png",
  "/Presenters/munene-wa-kagwi.png",
  "/Presenters/makena-wa-matiri.png",
  "/Presenters/nelly-githinji.png",
  "/Presenters/empress-rita-natty.png",
  "/Presenters/edward-mutembei.png",
  "/Presenters/mc-tash.png",
  "/Presenters/mwenda-h-pilot.png",
  "/Presenters/Betty%20-Ugima%20Ni%20Utonga.png",
];

function getPresenterImages(presenter: string): string[] {
  if (PRESENTER_IMG[presenter]) return [PRESENTER_IMG[presenter]];
  // Split compound names ("A & B", "A, B, C")
  const names = presenter.split(/\s*[&,]\s*/).map(n => n.trim());
  const imgs = names.flatMap(name => {
    if (PRESENTER_IMG[name]) return [PRESENTER_IMG[name]];
    const key = Object.keys(PRESENTER_IMG).find(
      k => k.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(k.toLowerCase())
    );
    return key ? [PRESENTER_IMG[key]] : [];
  });
  return [...new Set(imgs)];
}

// Pick one unique photo per card — no two cards ever share the same image
function pickUniquePhotos(programs: ReturnType<typeof getOnAirPrograms>): string[] {
  const used = new Set<string>();
  return programs.map((prog) => {
    const candidates = [...getPresenterImages(prog.presenter), ...ALL_PRESENTER_IMAGES];
    for (const img of candidates) {
      if (!used.has(img)) {
        used.add(img);
        return img;
      }
    }
    return ALL_PRESENTER_IMAGES[0];
  });
}

function parseMinutes(time: string): number {
  const [rawTime, period] = time.split(" ");
  const [h, m = 0] = rawTime.split(":").map(Number);
  let hours = h;
  if (period === "AM" && h === 12) hours = 0;
  if (period === "PM" && h !== 12) hours += 12;
  return hours * 60 + m;
}

function getOnAirPrograms() {
  const now = new Date();
  const DAY_NAMES = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"] as const;
  const todayName = DAY_NAMES[now.getDay()];
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const todayPrograms = tvSchedule.find(d => d.day === todayName)?.programs ?? [];
  if (!todayPrograms.length) return [];

  let currentIdx = 0;
  for (let i = 0; i < todayPrograms.length; i++) {
    if (parseMinutes(todayPrograms[i].time) <= nowMinutes) currentIdx = i;
  }

  return [0, 1, 2].map(offset => {
    const prog = todayPrograms[(currentIdx + offset) % todayPrograms.length];
    return { ...prog, isNow: offset === 0 };
  });
}

// Card — image is fixed per program, only changes when the program itself changes
function ShowCard({ prog, photo }: { prog: ReturnType<typeof getOnAirPrograms>[0]; photo: string }) {
  const timeLabel = prog.isNow ? `NOW · ${prog.time}` : prog.time;

  return (
    <div
      className="shrink-0 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1"
      style={{
        flex: "0 0 clamp(160px,42vw,230px)",
        border: `1px solid ${prog.isNow ? "rgba(255,122,0,.55)" : "rgba(255,255,255,0.12)"}`,
        background: "#111",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,122,0,.6)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = prog.isNow ? "rgba(255,122,0,.55)" : "rgba(255,255,255,0.12)"; }}
    >
      {/* Image area — presenter photo, updates only when program changes */}
      <div className="relative overflow-hidden" style={{ height: "clamp(80px,20vw,110px)" }}>
        <AnimatePresence mode="sync">
          <motion.img
            key={photo}
            src={photo}
            alt={prog.presenter}
            className="absolute inset-0 w-full h-full object-cover object-top"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          />
        </AnimatePresence>
        {/* Dark gradient at bottom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 55%)" }}
        />
        {prog.isNow && (
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

      {/* Info */}
      <div className="px-3 py-2.5" style={{ background: "linear-gradient(180deg,rgba(17,17,19,.2),#0e0e10)" }}>
        <p className="font-display text-[10px] font-bold tracking-wide mb-0.5" style={{ color: "#FF7A00" }}>{timeLabel}</p>
        <p className="font-display font-bold text-white text-[15px] leading-snug tracking-tight mb-0.5">{prog.name}</p>
        <p className="text-[11px]" style={{ color: "rgba(244,241,236,.62)" }}>{prog.tag}</p>
      </div>
    </div>
  );
}

export default function HomeHero() {
  const [current, setCurrent]   = useState(0);
  const [onAir, setOnAir]       = useState<ReturnType<typeof getOnAirPrograms>>([]);
  const n = slides.length;

  // Compute schedule on mount and refresh every minute
  useEffect(() => {
    setOnAir(getOnAirPrograms());
    const t = setInterval(() => setOnAir(getOnAirPrograms()), 60_000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % n), 9000);
    return () => clearInterval(t);
  }, [n]);

  const slide = slides[current];
  const prev  = () => setCurrent((c) => (c - 1 + n) % n);
  const next  = () => setCurrent((c) => (c + 1) % n);

  const liveShow = onAir[0];

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
            zIndex: -3,
          }}
          initial={{ opacity: 0, scale: 1.0, filter: "blur(0px)" }}
          animate={{ opacity: 1, scale: 1.08, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(20px)" }}
          transition={{
            opacity: { duration: 1.1, ease: "easeInOut" },
            filter:  { duration: 0.75, ease: "easeIn" },
            scale:   { duration: 10, ease: "linear" },
          }}
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
                  <b className="text-white font-semibold">{liveShow?.name ?? "Nteto Cia Weru"}</b>
                  {" · "}{liveShow?.tag ?? "Morning Show"}
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/heroimages/studio%20area17.png"
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
        {onAir.length > 0 && (
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
              {pickUniquePhotos(onAir).map((photo, i) => (
                <ShowCard key={onAir[i].id} prog={onAir[i]} photo={photo} />
              ))}
            </div>
          </motion.div>
        )}
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
