"use client";

import Link from "next/link";
import LiveStream from "@/components/sections/LiveStream";
import HeadlineTicker from "@/components/sections/HeadlineTicker";
import { type Headline } from "@/lib/getNewsFeed";
import { tvSchedule } from "@/data/tvSchedule";
import { radioSchedule, type RadioDaySchedule } from "@/data/radioSchedule";

type Day = RadioDaySchedule["day"];

function todayName(): Day {
  const names: Day[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return names[new Date().getDay()];
}

function parseStartHour(time: string): number {
  const start = time.split(/[–-]/)[0].trim();
  const [rawTime, period] = start.split(" ");
  const [h, m] = rawTime.split(":").map(Number);
  let hour = h + (m ?? 0) / 60;
  if (period === "PM" && h !== 12) hour += 12;
  if (period === "AM" && h === 12) hour = 0;
  return hour;
}

function getCurrentTvShow() {
  const programs = tvSchedule.find((d) => d.day === todayName())?.programs ?? [];
  const now = new Date().getHours() + new Date().getMinutes() / 60;
  let idx = -1;
  for (let i = 0; i < programs.length; i++) {
    if (parseStartHour(programs[i].time) <= now) idx = i;
  }
  if (idx < 0) return undefined;
  return { program: programs[idx], untilTime: programs[idx + 1]?.time };
}

function initials(name: string): string {
  return name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

const AVATAR_COLORS = ["#f97d00", "#C8102E", "#7A1010", "#FACC15"];

export default function AppHome({ feed }: { feed: Headline[] }) {
  const current = getCurrentTvShow();
  const radioToday = radioSchedule.find((d) => d.day === todayName())?.programs ?? [];
  const upcomingRadio = radioToday.slice(0, 3);

  return (
    <div style={{ background: "#0A0A0A", paddingTop: "calc(56px + env(safe-area-inset-top))" }}>
      <HeadlineTicker headlines={feed} />

      <div className="px-4 py-5 flex flex-col gap-5">
        {/* Live TV tile */}
        <div>
          <LiveStream compact />
          <div className="flex items-center justify-between gap-3 mt-3">
            <div className="min-w-0">
              <p className="text-white font-extrabold text-sm truncate">{current?.program.name ?? "Weru TV"}</p>
              <p className="text-white/45 text-xs mt-0.5">
                Weru TV{current?.untilTime ? ` · until ${current.untilTime}` : ""}
              </p>
            </div>
            <Link
              href="/tv"
              className="shrink-0 px-4 py-2 rounded-full text-xs font-bold"
              style={{ border: "1px solid rgba(249,125,0,0.5)", color: "#f97d00" }}
            >
              Schedule
            </Link>
          </div>
        </div>

        {/* Shelf: Radio + Shows */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/radio" className="rounded-2xl p-4" style={{ background: "linear-gradient(160deg, rgba(249,125,0,0.18), rgba(249,125,0,0.04))", border: "1px solid rgba(249,125,0,0.25)" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97d00" strokeWidth="1.8"><circle cx="12" cy="14" r="3" /><path d="M4 14a8 8 0 0 1 16 0" strokeLinecap="round" /></svg>
            <p className="text-white font-bold text-sm mt-2.5">Weru FM 96.4</p>
            <p className="text-white/45 text-[11px] mt-0.5">On air{radioToday[0] ? ` · ${radioToday[0].name}` : ""}</p>
          </Link>
          <Link href="/podcast" className="rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8"><rect x="3" y="3" width="8" height="8" rx="1.5" /><rect x="13" y="3" width="8" height="8" rx="1.5" /><rect x="3" y="13" width="8" height="8" rx="1.5" /><rect x="13" y="13" width="8" height="8" rx="1.5" /></svg>
            <p className="text-white font-bold text-sm mt-2.5">Shows</p>
            <p className="text-white/45 text-[11px] mt-0.5">Browse all podcasts</p>
          </Link>
        </div>

        {/* On air today */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-white font-extrabold text-base">On air today</p>
            <Link href="/radio" className="text-xs font-bold" style={{ color: "#f97d00" }}>All shows</Link>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {upcomingRadio.map((program, i) => (
              <div key={program.id} className="shrink-0 w-32 rounded-2xl p-3.5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-extrabold mb-2.5"
                  style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}
                >
                  {initials(program.host)}
                </div>
                <p className="text-white text-xs font-bold leading-snug line-clamp-2">{program.name}</p>
                <p className="text-white/40 text-[10px] mt-1">{program.time.split(/[–-]/)[0].trim()}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quiz promo */}
        <a
          href="/quiz"
          className="flex items-center gap-3 rounded-2xl px-4 py-3"
          style={{
            background: "linear-gradient(145deg,#4A2000 0%,#7A3A00 55%,#5C2A00 100%)",
            border: "1px solid rgba(250,180,50,0.28)",
          }}
        >
          <div className="shrink-0 w-9 h-9 rounded-full grid place-items-center text-base" style={{ background: "rgba(0,0,0,.35)" }}>🎯</div>
          <div className="min-w-0 flex-1">
            <p className="text-white font-bold text-sm">96+4 Quiz</p>
            <p className="text-white/55 text-[11px]">Win a KSh 5,000 shopping voucher</p>
          </div>
          <span className="shrink-0 px-3 py-1.5 rounded-full font-bold text-xs" style={{ background: "#FACC15", color: "#1a1003" }}>Start →</span>
        </a>
      </div>
    </div>
  );
}
