"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { tvSchedule } from "@/data/tvSchedule";

/* ─── Platform chips ─────────────────────────────────────────────────────── */
const PLATFORMS = [
  { name: "DStv 368", abbr: "D",  color: "#0057B8", href: "https://www.dstv.com/ke-en/what-is-on-dstv/channels/weru-tv/368" },
  { name: "Azam 342", abbr: "AZ", color: "#E8600A", href: "https://azamtv.co.ke" },
  { name: "Star 440", abbr: "ST", color: "#C8102E", href: "https://startimes.com/ke" },
];

const CARD_BASE: React.CSSProperties = {
  background: "rgba(40,6,6,0.88)",
  backdropFilter: "blur(16px)",
  border: "1px solid rgba(255,255,255,0.10)",
};

/* ─── TV card ─────────────────────────────────────────────────────────────── */
function TVCard({ style, delay = 0.35, compact = false }: { style?: React.CSSProperties; delay?: number; compact?: boolean }) {
  const controls = useAnimation();

  useEffect(() => {
    const run = async () => {
      await controls.start({
        opacity: 1, y: 0,
        transition: { delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      });
      controls.start({
        boxShadow: [
          "0 0 0 0px rgba(255,122,0,0), 0 4px 20px rgba(0,0,0,0.4)",
          "0 0 0 5px rgba(255,122,0,0.22), 0 0 28px 6px rgba(255,122,0,0.30)",
          "0 0 0 0px rgba(255,122,0,0), 0 4px 20px rgba(0,0,0,0.4)",
        ],
        transition: { duration: 2.2, repeat: Infinity, repeatDelay: 1.8, ease: "easeInOut" },
      });
    };
    run();
  }, [controls, delay]);

  return (
    <motion.div
      className="flex flex-col rounded-xl overflow-hidden"
      style={{ ...CARD_BASE, ...style }}
      initial={{ opacity: 0, y: 24 }}
      animate={controls}
      whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(255,122,0,0.35)" }}
    >
      <div className={`flex items-center justify-center px-3 ${compact ? "py-1.5" : "py-2.5"}`}>
        <span className={`font-display font-extrabold text-white tracking-wide ${compact ? "text-base" : "text-sm"}`}>WERU TV</span>
      </div>
      <div className={`px-3 ${compact ? "pb-2 gap-1.5" : "pb-3 gap-2"} flex flex-col items-center`}>
        <Link
          href="/tv"
          className={`w-full inline-flex items-center justify-center gap-1.5 px-3 rounded-lg font-bold transition-all hover:opacity-90 active:scale-95 ${compact ? "py-1 text-xs" : "py-2 text-sm"}`}
          style={{ background: "linear-gradient(180deg,#FF9425,#FF7A00)", color: "#1a1003", boxShadow: "0 4px 14px rgba(255,122,0,.30)" }}
        >
          ▶ Watch Live
        </Link>
        <div className="flex justify-center gap-1.5 flex-wrap">
          {PLATFORMS.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-1 px-1.5 py-1 rounded-lg transition-all hover:bg-white/10 active:scale-95"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
            >
              <span
                className="shrink-0 inline-flex items-center justify-center rounded text-[9px] font-black leading-none"
                style={{ width: 16, height: 16, background: p.color, color: "#fff", letterSpacing: "-0.3px" }}
              >
                {p.abbr}
              </span>
              <span className="text-[9px] font-semibold text-white whitespace-nowrap leading-none">{p.name}</span>
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── FM card ─────────────────────────────────────────────────────────────── */
function FMCard({ style, delay = 0.55, compact = false }: { style?: React.CSSProperties; delay?: number; compact?: boolean }) {
  const controls = useAnimation();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const streamUrl = process.env.NEXT_PUBLIC_RADIO_STREAM_URL ?? "";

  useEffect(() => {
    const run = async () => {
      await controls.start({
        opacity: 1, y: 0,
        transition: { delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      });
      controls.start({
        boxShadow: [
          "0 0 0 0px rgba(255,122,0,0), 0 4px 20px rgba(0,0,0,0.4)",
          "0 0 0 4px rgba(255,122,0,0.15), 0 0 20px 4px rgba(255,122,0,0.18)",
          "0 0 0 0px rgba(255,122,0,0), 0 4px 20px rgba(0,0,0,0.4)",
        ],
        transition: { duration: 2.2, repeat: Infinity, repeatDelay: 2.2, ease: "easeInOut" },
      });
    };
    run();
  }, [controls, delay]);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) { el.pause(); setPlaying(false); }
    else { el.play().then(() => setPlaying(true)).catch(() => {}); }
  };

  return (
    <motion.div
      className="flex flex-col rounded-xl overflow-hidden"
      style={{ ...CARD_BASE, ...style }}
      initial={{ opacity: 0, y: 24 }}
      animate={controls}
      whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(255,122,0,0.25)" }}
    >
      <div className={`flex items-center justify-center px-3 ${compact ? "py-1.5" : "py-2.5"}`}>
        <span className={`font-display font-extrabold text-white tracking-wide ${compact ? "text-sm" : "text-sm"}`}>WERU FM</span>
        <span className={`ml-1.5 font-extrabold ${compact ? "text-[11px]" : "text-xs"}`} style={{ color: "#FF7A00" }}>96.4</span>
      </div>
      <div className={`flex flex-col items-center px-3 ${compact ? "pb-2 gap-1" : "pb-3 gap-2"}`}>
        {streamUrl ? (
          <>
            <audio ref={audioRef} src={streamUrl} preload="none" />
            <button
              onClick={toggle}
              className={`w-full inline-flex items-center justify-center gap-1.5 px-3 rounded-lg font-bold transition-all hover:opacity-90 active:scale-95 ${compact ? "py-1 text-xs" : "py-2 text-sm"}`}
              style={
                playing
                  ? { background: "rgba(255,255,255,0.12)", color: "#fff", border: "1px solid rgba(255,255,255,0.18)" }
                  : { background: "linear-gradient(180deg,#FF9425,#FF7A00)", color: "#1a1003" }
              }
            >
              {playing ? "⏸ Pause" : "▶ Listen Live"}
            </button>
          </>
        ) : (
          <Link
            href="/radio"
            className={`w-full inline-flex items-center justify-center gap-1.5 px-3 rounded-lg font-bold transition-all hover:opacity-90 active:scale-95 ${compact ? "py-1 text-xs" : "py-2 text-sm"}`}
            style={{ background: "linear-gradient(180deg,#FF9425,#FF7A00)", color: "#1a1003" }}
          >
            ▶ Listen Live
          </Link>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Quiz bar (shared JSX) ───────────────────────────────────────────────── */
function QuizBar({ compact = false }: { compact?: boolean }) {
  return (
    <a
      href="/quiz"
      className={`inline-flex items-center gap-2 rounded-2xl w-full ${compact ? "px-3 py-1.5" : "px-4 py-2.5"}`}
      style={{
        background: "linear-gradient(145deg,#4A2000 0%,#7A3A00 55%,#5C2A00 100%)",
        border: "1px solid rgba(250,180,50,0.28)",
        boxShadow: "0 8px 28px rgba(0,0,0,.50), inset 0 1px 0 rgba(255,255,255,.06)",
      }}
    >
      <div className={`shrink-0 rounded-full grid place-items-center ${compact ? "w-6 h-6 text-sm" : "w-8 h-8 text-base"}`} style={{ background: "rgba(0,0,0,.35)" }}>
        🎯
      </div>
      <div className="min-w-0 flex-1">
        <p className={`font-display font-bold text-white leading-snug ${compact ? "text-xs" : "text-sm"}`}>10 for 10: Castle Escape</p>
        {!compact && (
          <p className="text-xs" style={{ color: "rgba(244,241,236,.58)" }}>
            10 questions for 10 years – win a night at Tafaria
          </p>
        )}
      </div>
      <span className={`shrink-0 rounded-full font-bold whitespace-nowrap ${compact ? "px-2 py-1 text-[10px]" : "px-3 py-1.5 text-xs"}`} style={{ background: "#FACC15", color: "#1a1003" }}>
        Start →
      </span>
    </a>
  );
}

/* ─── Schedule helpers ────────────────────────────────────────────────────── */
function parseMinutes(time: string): number {
  const [rawTime, period] = time.split(" ");
  const [h, m = 0] = rawTime.split(":").map(Number);
  let hours = h;
  if (period === "AM" && h === 12) hours = 0;
  if (period === "PM" && h !== 12) hours += 12;
  return hours * 60 + m;
}

function getCurrentShow() {
  const now = new Date();
  const DAY_NAMES = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"] as const;
  const todayName = DAY_NAMES[now.getDay()];
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const programs = tvSchedule.find(d => d.day === todayName)?.programs ?? [];
  if (!programs.length) return null;
  let idx = 0;
  for (let i = 0; i < programs.length; i++) {
    if (parseMinutes(programs[i].time) <= nowMinutes) idx = i;
  }
  return programs[idx];
}

/* ─── LIVE pill ───────────────────────────────────────────────────────────── */
function LivePill({ liveShow }: { liveShow: ReturnType<typeof getCurrentShow> }) {
  return (
    <motion.div
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
      style={{
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(10,10,12,0.55)",
        backdropFilter: "blur(8px)",
      }}
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1, duration: 0.5 }}
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
    </motion.div>
  );
}

/* ─── 4-line headline ─────────────────────────────────────────────────────── */
function Headline({ fontSize }: { fontSize: string }) {
  return (
    <motion.h1
      className="font-display font-extrabold text-white"
      style={{
        fontSize,
        letterSpacing: "clamp(-1px, -.3vw, -2px)",
        lineHeight: 1.0,
        display: "grid",
        gridTemplateRows: "repeat(4, 1fr)",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <span>Reach Millions</span>
      <span>Across</span>
      <em style={{ fontStyle: "italic", color: "#FF7A00" }}>East</em>
      <span>Africa.</span>
    </motion.h1>
  );
}

/* ─── Hero ────────────────────────────────────────────────────────────────── */
export default function HomeHero() {
  const [liveShow, setLiveShow] = useState<ReturnType<typeof getCurrentShow>>(null);

  useEffect(() => {
    setLiveShow(getCurrentShow());
    const t = setInterval(() => setLiveShow(getCurrentShow()), 60_000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative w-full overflow-hidden" style={{ height: "100dvh" }}>

      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/heroimages/Studio%20image.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -3,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(95deg,rgba(8,8,10,.92) 0%,rgba(8,8,10,.72) 32%,rgba(8,8,10,.20) 60%,rgba(8,8,10,.48) 100%)",
          zIndex: -2,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(60% 80% at 12% 70%,rgba(255,122,0,.28),transparent 60%)",
          mixBlendMode: "screen",
          zIndex: -1,
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: "18%", background: "linear-gradient(to bottom, transparent 0%, #060608 100%)", zIndex: 1 }}
      />

      {/* ── MOBILE layout (< sm): LIVE pill → Title → [spacer] → TV → FM → Quiz ── */}
      <div
        className="sm:hidden relative z-10 flex flex-col px-4"
        style={{ paddingTop: "3.5rem", height: "100dvh", paddingBottom: "18%" }}
      >
        {/* LIVE pill */}
        <div className="pt-2 shrink-0">
          <LivePill liveShow={liveShow} />
        </div>

        {/* Title */}
        <div className="shrink-0 mt-2">
          <Headline fontSize="clamp(30px, 9.5vw, 46px)" />
        </div>

        {/* Spacer — pushes cards toward bottom */}
        <div className="flex-1" />

        {/* TV card — full width, compact */}
        <div className="shrink-0">
          <TVCard style={{ width: "100%" }} delay={0.2} compact />
        </div>

        {/* FM card — slightly narrower, tight gap above quiz */}
        <div className="shrink-0 mt-2" style={{ width: "88%" }}>
          <FMCard style={{ width: "100%" }} delay={0.32} compact />
        </div>

        {/* Quiz bar — slightly smaller than FM card */}
        <div className="shrink-0 mt-1.5" style={{ width: "82%" }}>
          <QuizBar compact />
        </div>
      </div>

      {/* ── DESKTOP layout (sm+): title LHS, cards absolute RHS ──────────── */}
      <div
        className="hidden sm:flex relative z-10 flex-col"
        style={{ height: "100dvh", paddingTop: "3.5rem" }}
      >
        <div className="flex-1 px-10 md:px-12 pt-14 pb-4 max-w-2xl">
          <div className="mb-5 sm:mb-6">
            <LivePill liveShow={liveShow} />
          </div>
          <Headline fontSize="clamp(34px, 6.5vw, 76px)" />
        </div>
      </div>

      {/* Desktop cards — absolute RHS */}
      <div
        className="hidden sm:flex gap-3 absolute"
        style={{ right: "4%", bottom: "24%", zIndex: 10 }}
      >
        <TVCard style={{ width: "clamp(200px, 22vw, 300px)" }} />
        <FMCard style={{ width: "clamp(160px, 16vw, 240px)" }} />
      </div>

    </section>
  );
}
