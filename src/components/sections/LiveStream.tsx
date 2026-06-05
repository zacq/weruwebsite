"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CHANNEL_ID = "UCKf9xsi0uL1mwdrq7PmZsQA";

type StreamData = { videoId: string | null; isLive: boolean };

export default function LiveStream() {
  const [stream, setStream] = useState<StreamData | null>(null);

  useEffect(() => {
    fetch("/api/youtube-live")
      .then((r) => r.json())
      .then(setStream)
      .catch(() => setStream({ videoId: null, isLive: false }));
  }, []);

  // Prefer API-resolved video ID; fall back to channel live_stream URL
  const embedSrc = stream?.videoId
    ? `https://www.youtube.com/embed/${stream.videoId}?autoplay=0&rel=0&modestbranding=1`
    : `https://www.youtube.com/embed/live_stream?channel=${CHANNEL_ID}&autoplay=0&rel=0`;

  return (
    <section id="live" className="px-4 py-10" style={{ background: "#f97d00" }}>
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-5"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h2 className="text-white font-extrabold text-xl sm:text-2xl">Live TV</h2>
            <p className="text-white/65 text-xs mt-0.5">
              {stream === null
                ? "Loading stream…"
                : stream.isLive
                ? "Streaming live from Weru Digital"
                : "Latest from Weru TV"}
            </p>
          </div>

          {/* Badge — LIVE (red pulse) when live, LATEST (muted) otherwise */}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors duration-300"
            style={{ background: stream?.isLive ? "#C8102E" : "rgba(0,0,0,0.30)" }}
          >
            {stream?.isLive && (
              <span className="w-2 h-2 rounded-full bg-white live-dot inline-block" />
            )}
            <span className="text-white text-[11px] font-extrabold tracking-wider uppercase">
              {stream?.isLive ? "LIVE" : "LATEST"}
            </span>
          </div>
        </motion.div>

        {/* Player */}
        <motion.div
          className="relative overflow-hidden rounded-2xl"
          style={{
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 16px 56px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          {/* 16:9 wrapper */}
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            {/* Loading skeleton */}
            {stream === null && (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.7)" }}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                  <span className="text-white/50 text-xs">Loading stream…</span>
                </div>
              </div>
            )}

            {stream !== null && (
              <iframe
                src={embedSrc}
                title="Weru TV — Live Stream"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                style={{ border: "none" }}
              />
            )}
          </div>

          {/* Bottom bar */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ background: "rgba(0,0,0,0.6)", borderTop: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-white">
                w<span style={{ color: "#FACC15" }}>e</span>ru
              </span>
              <sup className="text-[9px] font-bold" style={{ color: "#f97d00" }}>TV</sup>
            </div>
            <a
              href="#rate-card"
              className="text-xs font-bold px-3 py-1 rounded-lg transition-all"
              style={{ background: "rgba(249,125,0,0.85)", color: "#fff" }}
            >
              📢 Advertise Here
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
