"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { StreamResponse } from "@/app/api/youtube-live/route";

const CHANNEL_ID = "UCKf9xsi0uL1mwdrq7PmZsQA";

export default function LiveStream() {
  const [stream, setStream] = useState<StreamResponse | null>(null);

  useEffect(() => {
    fetch("/api/youtube-live")
      .then((r) => r.json())
      .then(setStream)
      .catch(() => setStream({ type: "none" }));
  }, []);

  const isLive   = stream?.type === "youtube" && stream.isLive;
  const hasVideo = stream !== null && stream.type !== "none";

  // Build embed src based on stream type
  const embedSrc = (() => {
    if (!stream) return null;
    if (stream.type === "embed")   return stream.url;
    if (stream.type === "youtube") return `https://www.youtube.com/embed/${stream.videoId}?autoplay=1&mute=1&rel=0&modestbranding=1`;
    return null;
  })();

  const statusLabel = stream === null
    ? "Loading stream…"
    : stream.type === "embed"
    ? "Live from Weru Digital"
    : isLive
    ? "Streaming live from Weru Digital"
    : "Latest from Weru TV";

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
            <p className="text-white/65 text-xs mt-0.5">{statusLabel}</p>
          </div>

          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors duration-300"
            style={{ background: (stream?.type === "embed" || isLive) ? "#C8102E" : "rgba(0,0,0,0.30)" }}
          >
            {(stream?.type === "embed" || isLive) && (
              <span className="w-2 h-2 rounded-full bg-white live-dot inline-block" />
            )}
            <span className="text-white text-[11px] font-extrabold tracking-wider uppercase">
              {stream?.type === "embed" ? "LIVE" : isLive ? "LIVE" : "LATEST"}
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
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>

            {/* Loading skeleton */}
            {stream === null && (
              <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.7)" }}>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                  <span className="text-white/50 text-xs">Loading stream…</span>
                </div>
              </div>
            )}

            {/* Embed or YouTube iframe */}
            {embedSrc && (
              <iframe
                src={embedSrc}
                title="Weru TV — Live Stream"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                style={{ border: "none" }}
              />
            )}

            {/* Fallback — no source available */}
            {stream !== null && !hasVideo && (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center px-6"
                style={{ background: "rgba(0,0,0,0.80)" }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#C8102E] live-dot" />
                  <span className="text-white/60 text-xs font-bold uppercase tracking-widest">Weru TV</span>
                </div>
                <p className="text-white font-extrabold text-lg leading-tight">Watch live on YouTube</p>
                <p className="text-white/45 text-sm max-w-xs">
                  Tap below to open the Weru TV channel and watch the latest broadcast.
                </p>
                <a
                  href={`https://www.youtube.com/channel/${CHANNEL_ID}/live`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-extrabold"
                  style={{ background: "#FF0000" }}
                >
                  ▶ Open Live Stream
                </a>
              </div>
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
