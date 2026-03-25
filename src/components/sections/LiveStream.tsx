"use client";

import { motion } from "framer-motion";

interface LiveStreamProps {
  youtubeChannelId?: string;
  youtubeVideoId?: string;
  title?: string;
}

export default function LiveStream({
  youtubeChannelId = "UCxxxxxxxxxxxxxxxxxxxxxx",
  youtubeVideoId,
  title = "Weru TV — Live Stream",
}: LiveStreamProps) {
  // Prefer a specific live video ID; fall back to channel live stream
  const embedSrc = youtubeVideoId
    ? `https://www.youtube.com/embed/${youtubeVideoId}?autoplay=0&rel=0`
    : `https://www.youtube.com/embed/live_stream?channel=${youtubeChannelId}&autoplay=0&rel=0`;

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
            <p className="text-white/65 text-xs mt-0.5">Streaming live from Weru Digital</p>
          </div>
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{ background: "#C8102E" }}
          >
            <span className="w-2 h-2 rounded-full bg-white live-dot inline-block" />
            <span className="text-white text-[11px] font-extrabold tracking-wider uppercase">LIVE</span>
          </div>
        </motion.div>

        {/* Player container — glassmorphism overlay on a dark bg */}
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
          {/* 16:9 aspect ratio */}
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src={embedSrc}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              style={{ border: "none" }}
            />
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
