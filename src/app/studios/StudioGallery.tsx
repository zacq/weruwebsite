"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { StudioPhoto } from "@/data/studios";
import { STUDIO_CATEGORIES } from "@/data/studios";

export default function StudioGallery({ photos }: { photos: StudioPhoto[] }) {
  const [active, setActive]   = useState<string>("All");
  const [lbIdx,  setLbIdx]    = useState<number | null>(null);

  const filtered = active === "All" ? photos : photos.filter((p) => p.category === active);

  const openLb  = (i: number) => setLbIdx(i);
  const closeLb = () => setLbIdx(null);
  const prev    = useCallback(() => setLbIdx((i) => (i! - 1 + filtered.length) % filtered.length), [filtered.length]);
  const next    = useCallback(() => setLbIdx((i) => (i! + 1) % filtered.length), [filtered.length]);

  return (
    <>
      {/* ── Sticky filter bar ─────────────────────────────── */}
      <div
        className="sticky z-30 flex items-center gap-2.5 px-5 sm:px-10 py-4 overflow-x-auto no-scrollbar"
        style={{
          top: "56px",
          background: "rgba(8,8,10,.84)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,.10)",
        }}
      >
        {STUDIO_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className="shrink-0 px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 whitespace-nowrap"
            style={
              active === cat
                ? { background: "linear-gradient(180deg,#FF9425,#FF7A00)", color: "#1a1003", border: "none" }
                : { background: "transparent", color: "rgba(244,241,236,.60)", border: "1px solid rgba(255,255,255,.14)" }
            }
          >
            {cat}
          </button>
        ))}
        <span
          className="ml-4 shrink-0 text-sm font-medium"
          style={{ color: "rgba(244,241,236,.45)" }}
        >
          {filtered.length} {filtered.length === 1 ? "set" : "sets"}
        </span>
      </div>

      {/* ── Masonry gallery ───────────────────────────────── */}
      <div className="columns-1 sm:columns-2 [column-gap:16px] px-5 sm:px-10 py-7">
        {filtered.map((photo, i) => (
          <motion.div
            key={photo.src}
            layout
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            onClick={() => openLb(i)}
            className="group relative overflow-hidden cursor-pointer"
            style={{
              breakInside: "avoid",
              marginBottom: "16px",
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,.10)",
              background: "#111",
              display: "block",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt={photo.caption}
              loading={i < 4 ? "eager" : "lazy"}
              className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
              style={{ display: "block" }}
            />

            {/* Hover overlay */}
            <div
              className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "linear-gradient(180deg,transparent 40%,rgba(8,8,10,.88))" }}
            >
              <p
                className="text-[10px] font-bold tracking-[1.4px] uppercase mb-1"
                style={{ color: "#FF7A00" }}
              >
                {photo.category}
              </p>
              <p className="font-display font-bold text-white text-[18px] leading-snug tracking-tight">
                {photo.caption}
              </p>
            </div>

            {/* Zoom icon */}
            <div
              className="absolute top-3 right-3 w-9 h-9 rounded-full grid place-items-center opacity-0 group-hover:opacity-100 transition-all duration-300 text-white text-xs"
              style={{
                background: "rgba(8,8,10,.62)",
                border: "1px solid rgba(255,255,255,.14)",
              }}
            >
              ⤢
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Lightbox ──────────────────────────────────────── */}
      <AnimatePresence>
        {lbIdx !== null && (
          <motion.div
            key="lb"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-12"
            style={{ background: "rgba(5,5,7,.95)", backdropFilter: "blur(10px)" }}
            onClick={closeLb}
          >
            {/* Close */}
            <button
              onClick={closeLb}
              className="absolute top-6 right-7 w-11 h-11 rounded-full grid place-items-center text-white text-xl font-light transition-all hover:scale-110"
              style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.14)" }}
              aria-label="Close"
            >
              ✕
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-12 sm:h-12 rounded-full grid place-items-center text-white text-xl sm:text-2xl transition-all hover:bg-[#FF7A00] hover:text-[#1a1003] hover:border-transparent"
              style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.14)" }}
              aria-label="Previous"
            >
              ‹
            </button>

            {/* Image */}
            <motion.div
              key={lbIdx}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="flex flex-col items-center gap-5 max-w-4xl w-full"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={filtered[lbIdx].src}
                alt={filtered[lbIdx].caption}
                className="rounded-xl object-contain w-full"
                style={{ maxHeight: "76dvh", boxShadow: "0 30px 80px rgba(0,0,0,.60)" }}
              />
              <div className="flex items-center gap-3">
                <span
                  className="text-[10px] font-bold tracking-[1.6px] uppercase px-2.5 py-1 rounded"
                  style={{ background: "#FF7A00", color: "#1a1003" }}
                >
                  {filtered[lbIdx].category}
                </span>
                <span className="font-display font-bold text-white text-lg">
                  {filtered[lbIdx].caption}
                </span>
              </div>
            </motion.div>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-12 sm:h-12 rounded-full grid place-items-center text-white text-xl sm:text-2xl transition-all hover:bg-[#FF7A00] hover:text-[#1a1003] hover:border-transparent"
              style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.14)" }}
              aria-label="Next"
            >
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
