"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { StreamResponse } from "@/lib/getStreamSource";

const CHANNEL_ID = "UCKf9xsi0uL1mwdrq7PmZsQA";

export default function LiveStream({ initialStream }: { initialStream?: StreamResponse }) {
  const [stream, setStream] = useState<StreamResponse | null>(initialStream ?? null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (initialStream) return;
    fetch("/api/youtube-live")
      .then((r) => r.json())
      .then(setStream)
      .catch(() => setStream({ type: "none" }));
  }, [initialStream]);

  useEffect(() => {
    if (stream?.type !== "hls" || !videoRef.current) return;
    const video = videoRef.current;
    const url = stream.url;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = url;
      video.play().catch(() => {});
      return;
    }

    let hlsInstance: import("hls.js").default | null = null;
    import("hls.js").then(({ default: Hls }) => {
      if (!Hls.isSupported()) return;
      hlsInstance = new Hls({
        lowLatencyMode:           true,
        liveSyncDuration:         1,
        liveMaxLatencyDuration:   4,
        maxBufferLength:          4,
        maxMaxBufferLength:       8,
        backBufferLength:         0,
        highBufferWatchdogPeriod: 1,
      });
      hlsInstance.loadSource(url);
      hlsInstance.attachMedia(video);
      hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
    });

    return () => { hlsInstance?.destroy(); };
  }, [stream]);

  const embedSrc    = "https://player.restream.io/?token=644baa7151274e01b9ab045719866498";
  const isStreamLive = true;
  const hasVideo    = true;
  const statusLabel = "Live from Weru Digital";

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
            style={{ background: isStreamLive ? "#C8102E" : "rgba(0,0,0,0.30)" }}
          >
            {isStreamLive && (
              <span className="w-2 h-2 rounded-full bg-white live-dot inline-block" />
            )}
            <span className="text-white text-[11px] font-extrabold tracking-wider uppercase">
              {isStreamLive ? "LIVE" : "LATEST"}
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

            {/* HLS native video player */}
            {stream?.type === "hls" && (
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full"
                style={{ objectFit: "cover" }}
                autoPlay
                muted
                controls
                playsInline
              />
            )}

            {/* Platform embed or YouTube iframe */}
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
              href="/advertise"
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
