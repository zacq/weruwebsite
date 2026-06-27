"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { presenters, type PresenterCategory } from "@/data/presenters";

const CATEGORIES: PresenterCategory[] = ["News Anchors", "Program Presenters", "Reporters"];

export default function PresenterTabs() {
  const [active, setActive] = useState<PresenterCategory>("News Anchors");

  const filtered = presenters.filter((p) => p.category === active);

  return (
    <>
      {/* Category tabs */}
      <div className="grid grid-cols-3 border rounded-2xl overflow-hidden mb-10"
        style={{ borderColor: "rgba(249,125,0,0.25)", background: "rgba(255,255,255,0.02)" }}>
        {CATEGORIES.map((cat) => {
          const isActive = cat === active;
          return (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="relative py-4 px-3 text-sm font-bold transition-all duration-200"
              style={{
                color: isActive ? "#f97d00" : "rgba(255,255,255,0.35)",
                background: isActive ? "rgba(249,125,0,0.08)" : "transparent",
                borderRight: cat !== "Reporters" ? "1px solid rgba(249,125,0,0.25)" : undefined,
              }}
            >
              {isActive && (
                <motion.span
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-[2px]"
                  style={{ background: "#f97d00" }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              {cat}
            </button>
          );
        })}
      </div>

      {/* Presenter grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5"
        >
          {filtered.length === 0 ? (
            <p className="col-span-full text-center text-white/30 py-16 text-sm">
              No presenters in this category yet.
            </p>
          ) : (
            filtered.map((presenter, i) => (
              <Link
                key={presenter.slug}
                href={`/presenters/${presenter.slug}`}
                className="group flex flex-col rounded-2xl overflow-hidden transition-transform duration-200 hover:scale-[1.02]"
                style={{
                  background: "#161616",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="relative w-full" style={{ aspectRatio: "1/1" }}>
                  <Image
                    src={presenter.imageSrc}
                    alt={presenter.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    priority={i < 4}
                    loading={i < 4 ? "eager" : "lazy"}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)" }}
                  />
                </div>

                <div className="p-4 flex-1 flex flex-col gap-1">
                  <p className="text-[10px] font-extrabold tracking-widest uppercase" style={{ color: "#f97d00" }}>
                    {presenter.show}
                  </p>
                  <p className="text-white text-sm font-bold leading-snug">{presenter.name}</p>
                  <p className="text-white/45 text-xs mt-auto pt-2 group-hover:text-[#f97d00] transition-colors">
                    Read profile →
                  </p>
                </div>
              </Link>
            ))
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
