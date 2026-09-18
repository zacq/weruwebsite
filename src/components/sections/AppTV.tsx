"use client";

import Link from "next/link";
import LiveStream from "@/components/sections/LiveStream";
import TVScheduleSection from "@/components/sections/TVScheduleSection";
import { tvSchedule } from "@/data/tvSchedule";

function todayName() {
  const names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;
  return names[new Date().getDay()];
}

function parseStartHour(time: string): number {
  const [rawTime, period] = time.split(" ");
  const [h, m] = rawTime.split(":").map(Number);
  let hour = h + (m ?? 0) / 60;
  if (period === "PM" && h !== 12) hour += 12;
  if (period === "AM" && h === 12) hour = 0;
  return hour;
}

export default function AppTV() {
  const programs = tvSchedule.find((d) => d.day === todayName())?.programs ?? [];
  const now = new Date().getHours() + new Date().getMinutes() / 60;
  let idx = -1;
  for (let i = 0; i < programs.length; i++) {
    if (parseStartHour(programs[i].time) <= now) idx = i;
  }
  const current = idx >= 0 ? programs[idx] : undefined;

  return (
    <div style={{ background: "#0A0A0A", paddingTop: "calc(56px + env(safe-area-inset-top))" }}>
      <div className="px-4 pt-4 pb-2">
        <p className="text-white font-extrabold text-xl">Weru TV</p>
      </div>

      <div className="px-4 pb-4">
        <LiveStream compact />
        {current && (
          <div className="mt-3">
            <p className="text-white font-extrabold text-sm">{current.name}</p>
            <p className="text-white/45 text-xs mt-0.5">{current.tag} · {current.time} · {current.presenter}</p>
          </div>
        )}
        <div className="flex gap-3 mt-3">
          <Link href="/radio" className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: "rgba(255,255,255,0.06)" }}>
            🎙 Weru FM
          </Link>
        </div>
      </div>

      <TVScheduleSection />
    </div>
  );
}
