"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { StudioPhoto } from "@/data/studios";

const CATEGORIES = ["All", "Main Studio", "News Studio", "Live Stage", "Radio Booth", "Outdoor"];

export default function StudioGallery({ photos }: { photos: StudioPhoto[] }) {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<StudioPhoto | null>(null);

  const filtered =
    active === "All" ? photos : photos.filter((p) => p.category === active);

  return (
    <section className="px-4 sm:px-8 md:px-12 py-10 sm:py-14 max-w-7xl mx-auto">

      {/* Section label */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <p className="text-white/30 text-[10px] font-bold tracking-widest uppercase mb-1">
            BEHIND THE BROADCAST
          </p>
          <h2 className="text-white font-extrabold text-xl sm:text-2xl">
            The{" "}
            <span className="font-headline italic" style={{ color: "#f97d00" }}>
              Studio
            </span>{" "}
            Gallery
          </h2>
        </div>

        {/* Category filter pills */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const hasItems = cat === "All" || photos.some((p) => p.category === cat);
            if (!hasItems) return null;
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className="px-3 py-1 rounded-full text-xs font-bold transition-all duration-200"
                style={
                  active === cat
                    ? { background: "#f97d00", color: "#000" }
                    : {
                        background: "rgba(255,255,255,0.06)",
                        color: "rgba(255,255,255,0.55)",
                        border: "1px solid rgba(255,255,255,0.10)",
                      }
                }
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Masonry-style bento grid */}
      <motion.div
        layout
        className="grid gap-3"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(clamp(220px, 28vw, 320px), 1fr))",
        }}
      >
        <AnimatePresence>
          {filtered.map((photo, i) => (
            <motion.div
              key={photo.src + photo.caption}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              onClick={() => setLightbox(photo)}
              className="group relative overflow-hidden rounded-2xl cursor-zoom-in"
              style={{
                aspectRatio: i % 5 === 0 ? "4/3" : "3/4",
                background: "#111111",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt={photo.caption}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />

              {/* Hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.20) 60%, transparent 100%)",
                }}
              >
                <span
                  className="self-start text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded mb-2"
                  style={{ background: "#f97d00", color: "#000" }}
                >
                  {photo.category}
                </span>
                <p className="text-white font-bold text-sm leading-snug">{photo.caption}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-10"
            style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(12px)" }}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full"
              style={{ maxHeight: "85dvh" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={lightbox.src}
                alt={lightbox.caption}
                className="w-full rounded-2xl object-contain"
                style={{ maxHeight: "75dvh" }}
              />
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <span
                    className="text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded mr-2"
                    style={{ background: "#f97d00", color: "#000" }}
                  >
                    {lightbox.category}
                  </span>
                  <span className="text-white font-semibold text-sm">{lightbox.caption}</span>
                </div>
                <button
                  onClick={() => setLightbox(null)}
                  className="text-white/60 hover:text-white text-2xl leading-none transition-colors"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
