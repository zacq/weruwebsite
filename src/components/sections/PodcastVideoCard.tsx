"use client";

import { useState } from "react";
import Image from "next/image";

export default function PodcastVideoCard({
  youtubeId,
  title,
  subtitle,
}: {
  youtubeId: string;
  title: string;
  subtitle?: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className="flex flex-col rounded-2xl overflow-hidden transition-all duration-150 hover:scale-[1.01]"
      style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 16px rgba(0,0,0,0.3)",
      }}
    >
      <div className="relative w-full aspect-video bg-black">
        {playing ? (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 w-full h-full"
            aria-label={`Play ${title}`}
          >
            <Image
              src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/35" />
            <span
              className="absolute inset-0 m-auto w-14 h-14 rounded-full grid place-items-center transition-transform group-hover:scale-110"
              style={{ background: "rgba(249,125,0,0.92)" }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span
              className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold text-white"
              style={{ background: "rgba(0,0,0,0.65)" }}
            >
              ▶ YouTube
            </span>
          </button>
        )}
      </div>
      <div className="flex flex-col gap-1 p-4">
        <p className="text-white font-bold text-sm leading-snug">{title}</p>
        {subtitle && <p className="text-white/45 text-xs leading-relaxed">{subtitle}</p>}
      </div>
    </div>
  );
}
