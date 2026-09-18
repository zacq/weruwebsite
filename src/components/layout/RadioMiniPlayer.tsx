"use client";

import { useEffect, useState } from "react";
import { Capacitor } from "@capacitor/core";
import { useRadioPlayer } from "@/context/RadioPlayerContext";

export default function RadioMiniPlayer() {
  const [isNative, setIsNative] = useState(false);
  const { visible, playing, currentShowName, togglePlay, close } = useRadioPlayer();

  useEffect(() => {
    setIsNative(Capacitor.isNativePlatform());
  }, []);

  if (!isNative || !visible) return null;

  return (
    <div
      className="fixed left-0 right-0 z-40 flex items-center gap-3 px-4"
      style={{
        bottom: "calc(56px + env(safe-area-inset-bottom))",
        height: "64px",
        background: "#1a1210",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        className="shrink-0 w-10 h-10 rounded-lg"
        style={{ background: "linear-gradient(145deg, #f97d00, #C8102E)" }}
      />
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-bold truncate">{currentShowName ?? "Mūgambo wa Weru"}</p>
        <p className="text-[11px] font-semibold" style={{ color: playing ? "#f97d00" : "rgba(255,255,255,0.4)" }}>
          {playing ? "LIVE · 96.4 FM" : "PAUSED · 96.4 FM"}
        </p>
      </div>
      <button
        onClick={togglePlay}
        aria-label={playing ? "Pause radio" : "Play radio"}
        className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white active:scale-90 transition-transform"
        style={{ background: "#f97d00" }}
      >
        {playing ? "⏸" : "▶"}
      </button>
      <button
        onClick={close}
        aria-label="Close player"
        className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center active:scale-90 transition-transform"
        style={{ color: "rgba(255,255,255,0.5)" }}
      >
        ✕
      </button>
    </div>
  );
}
