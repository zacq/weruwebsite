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
  const [mounted, setMounted] = useState(false);
  const [remaining, setRemaining] = useState<ReturnType<typeof getRemaining>>(null);

  useEffect(() => {
    setMounted(true);
    setRemaining(getRemaining());
    const t = setInterval(() => setRemaining(getRemaining()), 1000);
    return () => clearInterval(t);
  }, []);

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

  const live = mounted && remaining === null;

  return (
    <motion.a
      href={YOUTUBE_CHANNEL_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center rounded-xl overflow-hidden w-full"
      style={{
        background: "rgba(40,6,6,0.88)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.10)",
        ...style,
      }}
      initial={{ opacity: 0, y: 24 }}
      animate={controls}
      whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(255,59,48,0.25)" }}
    >
      <div className={`flex items-center justify-center gap-1.5 px-3 ${compact ? "py-1.5" : "py-2.5"}`}>
        <span style={{ color: "#FF3B30" }}>▶</span>
        <span className={`font-display font-extrabold text-white tracking-wide ${compact ? "text-base" : "text-sm"}`}>
          WERU YT
        </span>
      </div>
      <div className={`px-3 w-full ${compact ? "pb-2 gap-1" : "pb-3 gap-1.5"} flex flex-col items-center`}>
        {live ? (
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-xs"
            style={{ background: "#FF3B30", color: "#fff" }}
          >
            🔴 New episodes live
          </span>
        ) : (
          <>
            <p
              className="text-[10px] font-semibold uppercase tracking-wider text-center"
              style={{ color: "rgba(244,241,236,.55)" }}
            >
              New episodes premiere in
            </p>
            <div
              className="flex items-center gap-1.5 font-display font-extrabold text-white tabular-nums"
              style={{ fontSize: compact ? 14 : 16 }}
            >
              {remaining ? (
                <>
                  <span>{remaining.days}d</span>
                  <span>{String(remaining.hours).padStart(2, "0")}h</span>
                  <span>{String(remaining.minutes).padStart(2, "0")}m</span>
                  <span>{String(remaining.seconds).padStart(2, "0")}s</span>
                </>
              ) : (
                <span>&mdash;</span>
              )}
            </div>
          </>
        )}
        <span className="mt-1 text-[10px] font-bold" style={{ color: "#FACC15" }}>
          ▶ Watch on YouTube
        </span>
      </div>
    </motion.a>
  );
}
