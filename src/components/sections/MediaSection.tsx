"use client";

import { useState, useRef } from "react";
import Link from "next/link";


const DEEP_RED = "#4A0808";

function LiveBadge() {
  return (
    <span
      className="flex items-center gap-1 px-2 py-0.5 rounded-full text-white text-[10px] font-extrabold tracking-widest"
      style={{ background: "rgba(200,16,46,0.92)" }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-white live-dot shrink-0" />
      LIVE
    </span>
  );
}

function FMCard() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const streamUrl = process.env.NEXT_PUBLIC_RADIO_STREAM_URL ?? "";

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) { el.pause(); setPlaying(false); }
    else { el.play().then(() => setPlaying(true)).catch(() => {}); }
  };

  return (
    <div
      className="rounded-xl overflow-hidden flex flex-col"
      style={{ background: DEEP_RED, border: "1px solid rgba(255,255,255,0.08)" }}
    >
      {/* Header */}
      <div className="relative flex items-center justify-center px-3 py-2.5">
        <div className="flex items-baseline gap-1.5">
          <span className="font-display font-extrabold text-white text-sm tracking-wide">WERU FM</span>
          <span className="text-xs font-extrabold" style={{ color: "#FF7A00" }}>96.4</span>
        </div>
        <div className="absolute right-3"><LiveBadge /></div>
      </div>

      {/* Body */}
      <div className="flex flex-col items-center gap-2 px-3 pb-3">
        {streamUrl ? (
          <>
            <audio ref={audioRef} src={streamUrl} preload="none" />
            <button
              onClick={toggle}
              className="inline-flex items-center gap-1.5 px-6 py-2 rounded-lg font-bold text-sm transition-all hover:opacity-90 active:scale-95"
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
            className="inline-flex items-center gap-1.5 px-6 py-2 rounded-lg font-bold text-sm transition-all hover:opacity-90 active:scale-95"
            style={{ background: "linear-gradient(180deg,#FF9425,#FF7A00)", color: "#1a1003" }}
          >
            ▶ Listen Live
          </Link>
        )}

      </div>
    </div>
  );
}

export default function MediaSection() {
  return (
    <section className="px-4 sm:px-10 md:px-12 py-4" style={{ background: "#060608" }}>
      <div className="flex justify-center">
        <div style={{ width: "clamp(200px, 22vw, 280px)" }}>
          <FMCard />
        </div>
      </div>
    </section>
  );
}
