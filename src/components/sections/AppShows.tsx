"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { PODCASTS } from "@/data/podcasts";
import type { Presenter } from "@/data/presenters";

function initials(name: string): string {
  return name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

const AVATAR_COLORS = ["#f97d00", "#C8102E", "#7A1010", "#FACC15"];

export default function AppShows({ presenters }: { presenters: Presenter[] }) {
  const [query, setQuery] = useState("");

  const filteredPodcasts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PODCASTS;
    return PODCASTS.filter((p) => p.title.toLowerCase().includes(q) || p.hosts.toLowerCase().includes(q));
  }, [query]);

  const filteredPresenters = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return presenters.slice(0, 8);
    return presenters.filter((p) => p.name.toLowerCase().includes(q));
  }, [presenters, query]);

  return (
    <div style={{ background: "#0A0A0A", paddingTop: "calc(56px + env(safe-area-inset-top))", minHeight: "100vh" }}>
      <div className="px-4 pt-4 pb-3">
        <p className="text-white font-extrabold text-xl mb-3">Shows</p>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search shows, presenters…"
          className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/35 outline-none"
          style={{ background: "rgba(255,255,255,0.06)" }}
        />
      </div>

      <div className="px-4 pb-2">
        <p className="text-white/50 text-xs font-bold uppercase tracking-wide mb-3">Presenters</p>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1">
          {filteredPresenters.map((p, i) => (
            <Link key={p.slug} href={`/presenters/${p.slug}`} className="shrink-0 flex flex-col items-center gap-1.5 w-14">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-extrabold"
                style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}
              >
                {initials(p.name)}
              </div>
              <span className="text-white/60 text-[10px] font-semibold truncate w-full text-center">{p.name.split(" ")[0]}</span>
            </Link>
          ))}
          {!query && presenters.length > 8 && (
            <Link href="/presenters" className="shrink-0 flex flex-col items-center gap-1.5 w-14">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white/70 text-xs font-bold" style={{ background: "rgba(255,255,255,0.08)" }}>
                +{presenters.length - 8}
              </div>
              <span className="text-white/60 text-[10px] font-semibold">All</span>
            </Link>
          )}
        </div>
      </div>

      <div className="px-4 pt-4 pb-8">
        <p className="text-white/50 text-xs font-bold uppercase tracking-wide mb-3">Podcasts</p>
        <div className="flex flex-col gap-2.5">
          {filteredPodcasts.map((show) => (
            <Link
              key={show.slug}
              href="/radio"
              className="flex items-center gap-3 rounded-2xl p-3.5"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-lg" style={{ background: "linear-gradient(145deg, #f97d00, #7A1010)" }}>
                🎙
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-white text-sm font-bold truncate">{show.title}</p>
                <p className="text-white/45 text-xs mt-0.5 truncate">{show.hosts}</p>
              </div>
            </Link>
          ))}
          {filteredPodcasts.length === 0 && (
            <p className="text-white/35 text-sm text-center py-8">Nothing matches &quot;{query}&quot;</p>
          )}
        </div>
      </div>
    </div>
  );
}
