"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const PREMIERE_AT = new Date("2026-10-18T18:00:00+03:00").getTime();
const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@WeruDigitalOfficial";

function getRemaining() {
  const diff = PREMIERE_AT - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1000),
  };
}

function useCountdown() {
  const [mounted, setMounted] = useState(false);
  const [remaining, setRemaining] = useState<ReturnType<typeof getRemaining>>(null);

  useEffect(() => {
    setMounted(true);
    setRemaining(getRemaining());
    const t = setInterval(() => setRemaining(getRemaining()), 1000);
    return () => clearInterval(t);
  }, []);

  return { live: mounted && remaining === null, remaining };
}

/* ─── Compact single-row pill — mobile hero ─────────────────────────────── */
export function WeruYTChip({ delay = 0.3 }: { delay?: number }) {
  const { live, remaining } = useCountdown();

  return (
    <motion.a
      href={YOUTUBE_CHANNEL_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-3 py-1.5 rounded-full w-full"
      style={{
        border: "1px solid rgba(255,59,48,0.22)",
        background: "rgba(40,6,6,0.70)",
        backdropFilter: "blur(8px)",
      }}
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <span style={{ color: "#FF3B30" }}>▶</span>
      <span className="font-bold text-xs text-white whitespace-nowrap">WERU YT</span>
      <span className="text-white/30">·</span>
      {live ? (
        <span className="font-bold text-xs whitespace-nowrap" style={{ color: "#FF3B30" }}>
          🔴 Live now
        </span>
      ) : (
        <span className="text-xs text-white/65 tabular-nums whitespace-nowrap">
          {remaining ? `${remaining.days}d ${String(remaining.hours).padStart(2, "0")}h ${String(remaining.minutes).padStart(2, "0")}m` : "—"}
        </span>
      )}
      <span className="ml-auto text-[10px] font-bold whitespace-nowrap" style={{ color: "#FACC15" }}>
        Watch →
      </span>
    </motion.a>
  );
}

/* ─── Full card — desktop hero ───────────────────────────────────────────── */
export default function WeruYTCard({
  style,
  delay = 0.7,
  compact = false,
}: {
  style?: React.CSSProperties;
  delay?: number;
  compact?: boolean;
}) {
  const controls = useAnimation();
  const { live, remaining } = useCountdown();

  useEffect(() => {
    const run = async () => {
      await controls.start({
        opacity: 1, y: 0,
        transition: { delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      });
      controls.start({
        boxShadow: [
          "0 0 0 0px rgba(255,0,0,0), 0 4px 20px rgba(0,0,0,0.4)",
          "0 0 0 4px rgba(255,0,0,0.18), 0 0 20px 4px rgba(255,0,0,0.22)",
          "0 0 0 0px rgba(255,0,0,0), 0 4px 20px rgba(0,0,0,0.4)",
        ],
        transition: { duration: 2.2, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" },
      });
    };
    run();
  }, [controls, delay]);

  return (
    <motion.a
      href={YOUTUBE_CHANNEL_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 rounded-xl w-full px-3 py-2"
      style={{
        background: "rgba(40,6,6,0.88)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.10)",
        ...style,
      }}
      initial={{ opacity: 0, y: 24 }}
      animate={controls}
      whileHover={{ y: -2, boxShadow: "0 12px 30px rgba(255,59,48,0.22)" }}
    >
      <span style={{ color: "#FF3B30" }}>▶</span>
      <span className={`font-display font-extrabold text-white tracking-wide shrink-0 ${compact ? "text-xs" : "text-[11px]"}`}>
        WERU YT
      </span>
      <span className="text-white/25 shrink-0">·</span>
      {live ? (
        <span className="font-bold text-xs whitespace-nowrap" style={{ color: "#FF3B30" }}>
          🔴 Live now
        </span>
      ) : (
        <span className="font-display font-bold text-white text-xs tabular-nums whitespace-nowrap">
          {remaining ? `${remaining.days}d ${String(remaining.hours).padStart(2, "0")}h ${String(remaining.minutes).padStart(2, "0")}m` : "—"}
        </span>
      )}
      <span className="ml-auto text-[10px] font-bold whitespace-nowrap" style={{ color: "#FACC15" }}>
        Watch →
      </span>
    </motion.a>
  );
}
