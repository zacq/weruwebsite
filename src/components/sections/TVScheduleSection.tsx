"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { tvSchedule, type DaySchedule, type ProgramTag } from "@/data/tvSchedule";

type Day = DaySchedule["day"];

const DAYS: Day[] = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
];

const SHORT: Record<Day, string> = {
  Monday: "Mon", Tuesday: "Tue", Wednesday: "Wed", Thursday: "Thu",
  Friday: "Fri", Saturday: "Sat", Sunday: "Sun",
};

function todayName(): Day {
  const names: Day[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return names[new Date().getDay()];
}

function parseHour(time: string): number {
  const [rawTime, period] = time.split(" ");
  const [h, m] = rawTime.split(":").map(Number);
  let hour = h + (m ?? 0) / 60;
  if (period === "PM" && h !== 12) hour += 12;
  if (period === "AM" && h === 12) hour = m / 60;
  return hour;
}

const TAG_COLORS: Record<ProgramTag, { bg: string; text: string; glow: string }> = {
  News:          { bg: "rgba(59,130,246,0.15)",  text: "#60a5fa", glow: "rgba(59,130,246,0.20)"  },
  Morning:       { bg: "rgba(245,158,11,0.15)",  text: "#fbbf24", glow: "rgba(245,158,11,0.20)"  },
  Health:        { bg: "rgba(16,185,129,0.15)",  text: "#34d399", glow: "rgba(16,185,129,0.20)"  },
  Business:      { bg: "rgba(139,92,246,0.15)",  text: "#a78bfa", glow: "rgba(139,92,246,0.20)"  },
  Entertainment: { bg: "rgba(236,72,153,0.15)",  text: "#f472b6", glow: "rgba(236,72,153,0.20)"  },
  Music:         { bg: "rgba(6,182,212,0.15)",   text: "#22d3ee", glow: "rgba(6,182,212,0.20)"   },
  Sports:        { bg: "rgba(34,197,94,0.15)",   text: "#4ade80", glow: "rgba(34,197,94,0.20)"   },
  Culture:       { bg: "rgba(249,125,0,0.15)",   text: "#f97d00", glow: "rgba(249,125,0,0.20)"   },
  Kids:          { bg: "rgba(251,191,36,0.15)",  text: "#fde68a", glow: "rgba(251,191,36,0.20)"  },
  Documentary:   { bg: "rgba(99,102,241,0.15)",  text: "#818cf8", glow: "rgba(99,102,241,0.20)"  },
  Magazine:      { bg: "rgba(217,119,6,0.15)",   text: "#fbbf24", glow: "rgba(217,119,6,0.20)"   },
};

function Initials({ name }: { name: string }) {
  const parts = name.split(" ").filter(Boolean);
  const init = parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : name.slice(0, 2).toUpperCase();
  return (
    <div
      className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-extrabold"
      style={{
        background: "rgba(249,125,0,0.15)",
        color: "#f97d00",
        border: "1px solid rgba(249,125,0,0.25)",
        letterSpacing: "0.05em",
      }}
    >
      {init}
    </div>
  );
}

export default function TVScheduleSection() {
  const [selectedDay, setSelectedDay] = useState<Day>(todayName());
  const [animKey, setAnimKey] = useState(0);

  const schedule = tvSchedule.find((d) => d.day === selectedDay);
  const programs = schedule?.programs ?? [];

  const now = new Date().getHours() + new Date().getMinutes() / 60;

  const handleDayChange = (day: Day) => {
    setSelectedDay(day);
    setAnimKey((k) => k + 1);
  };

  useEffect(() => {
    setAnimKey((k) => k + 1);
  }, []);

  return (
    <section id="tv-schedule" className="px-4 py-16" style={{ background: "#0D0D0D" }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 rounded-full" style={{ background: "#f97d00" }} />
            <h2 className="text-white font-extrabold text-2xl sm:text-3xl">Daily Program Schedule</h2>
          </div>
          <p className="text-white/40 text-sm ml-4 pl-3">
            Pick a day — explore every show, presenter, and airtime.
          </p>
        </motion.div>

        {/* Day selector */}
        <motion.div
          className="flex gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {DAYS.map((day) => {
            const isActive = day === selectedDay;
            const isToday = day === todayName();
            return (
              <button
                key={day}
                onClick={() => handleDayChange(day)}
                className="shrink-0 relative px-5 py-3 rounded-2xl text-xs font-bold transition-all duration-200"
                style={{
                  background: isActive
                    ? "linear-gradient(135deg, #f97d00 0%, #C8102E 100%)"
                    : "rgba(255,255,255,0.05)",
                  color: isActive ? "#fff" : "rgba(255,255,255,0.50)",
                  border: isActive ? "none" : "1px solid rgba(255,255,255,0.08)",
                  boxShadow: isActive ? "0 0 20px rgba(249,125,0,0.30)" : "none",
                }}
              >
                <span className="tracking-widest uppercase text-[11px]">{SHORT[day]}</span>
                {isToday && (
                  <span
                    className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full"
                    style={{
                      background: isActive ? "#fff" : "#f97d00",
                      border: "2px solid #0D0D0D",
                    }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Program cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={animKey}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {programs.map((program, i) => {
              const colors = TAG_COLORS[program.tag];
              const programHour = parseHour(program.time);
              const isCurrentlyAiring =
                selectedDay === todayName() &&
                i < programs.length - 1
                  ? programHour <= now && parseHour(programs[i + 1].time) > now
                  : selectedDay === todayName() && i === programs.length - 1 && programHour <= now;
              const isPast = selectedDay === todayName() && programHour < now && !isCurrentlyAiring;

              return (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 20, scale: 0.97 }}
                  animate={{ opacity: isPast ? 0.45 : 1, y: 0, scale: 1 }}
                  transition={{ delay: i * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className={`relative rounded-2xl p-5 flex flex-col gap-3 cursor-default ${isCurrentlyAiring ? "glass-orange" : isPast ? "glass-sm" : "glass"}`}
                  style={{
                    boxShadow: isCurrentlyAiring
                      ? `0 0 32px rgba(249,125,0,0.12), 0 4px 20px rgba(0,0,0,0.4)`
                      : "0 4px 20px rgba(0,0,0,0.3)",
                  }}
                >
                  {/* On-air badge */}
                  {isCurrentlyAiring && (
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      <span className="live-dot" />
                      <span className="text-[10px] font-extrabold tracking-widest uppercase" style={{ color: "#f97d00" }}>
                        On Air
                      </span>
                    </div>
                  )}

                  {/* Time + tag row */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="text-xs font-extrabold tabular-nums px-2.5 py-1 rounded-lg"
                      style={{ background: "rgba(249,125,0,0.12)", color: "#f97d00" }}
                    >
                      {program.time}
                    </span>
                    <span
                      className="text-[9px] font-extrabold tracking-widest uppercase px-2 py-1 rounded-md"
                      style={{ background: colors.bg, color: colors.text }}
                    >
                      {program.tag}
                    </span>
                  </div>

                  {/* Programme name */}
                  <p className="text-white font-extrabold text-base leading-snug">{program.name}</p>

                  {/* Description */}
                  <p className="text-white/40 text-xs leading-relaxed line-clamp-2 flex-1">{program.description}</p>

                  {/* Presenter */}
                  <div className="flex items-center gap-2.5 pt-1" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <Initials name={program.presenter} />
                    <div>
                      <p className="text-[10px] text-white/30 font-semibold uppercase tracking-wider">Presenter</p>
                      <p className="text-white/75 text-xs font-semibold">{program.presenter}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
