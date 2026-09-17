"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "weru_notify_live";

export default function MeNotificationToggle() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(localStorage.getItem(STORAGE_KEY) === "1");
  }, []);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
  };

  return (
    <button
      onClick={toggle}
      role="switch"
      aria-checked={enabled}
      className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl active:scale-[0.98] transition-transform"
      style={{ background: "rgba(255,255,255,0.05)" }}
    >
      <span className="text-left">
        <span className="block text-sm font-semibold text-white">Notify me when live</span>
        <span className="block text-xs text-white/45 mt-0.5">Get an alert when Weru TV or FM 96.4 goes live</span>
      </span>
      <span
        className="relative shrink-0 w-11 h-6 rounded-full transition-colors"
        style={{ background: enabled ? "#f97d00" : "rgba(255,255,255,0.15)" }}
      >
        <span
          className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all"
          style={{ left: enabled ? "22px" : "2px" }}
        />
      </span>
    </button>
  );
}
