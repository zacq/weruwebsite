"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { tvSchedule, type DaySchedule } from "@/data/tvSchedule";

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

function getCurrentWindowStart(programs: { time: string }[], isToday: boolean): number {
  if (!isToday) return 0;
  const now = new Date().getHours() + new Date().getMinutes() / 60;
  let idx = 0;
  for (let i = 0; i < programs.length; i++) {
    if (parseHour(programs[i].time) <= now) idx = i;
  }
  return Math.min(idx, Math.max(0, programs.length - 4));
}

function BellIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="16" height="16" viewBox="0 0 24 24" fill={filled ? "#f97d00" : "none"}
      stroke={filled ? "#f97d00" : "rgba(255,255,255,0.35)"}
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

const TAG_COLORS: Record<string, string> = {
  News: "#3b82f6", Morning: "#f59e0b", Health: "#10b981", Business: "#8b5cf6",
  Entertainment: "#ec4899", Music: "#06b6d4", Sports: "#22c55e",
  Culture: "#f97d00", Kids: "#fbbf24", Documentary: "#6366f1", Magazine: "#d97706",
};

export default function TVProgramLineup() {
  const [selectedDay, setSelectedDay] = useState<Day>(todayName());
  const [windowStart, setWindowStart] = useState(0);
  const [notified, setNotified] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<string | null>(null);

  const schedule = tvSchedule.find((d) => d.day === selectedDay);
  const programs = schedule?.programs ?? [];
  const visible = programs.slice(windowStart, windowStart + 4);
  const canNext = windowStart + 4 < programs.length;
  const canPrev = windowStart > 0;

  // Re-init window when day changes
  useEffect(() => {
    setWindowStart(getCurrentWindowStart(programs, selectedDay === todayName()));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDay]);

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (!canNext) return;
    const t = setTimeout(() => setWindowStart((w) => Math.min(w + 1, programs.length - 4)), 5000);
    return () => clearTimeout(t);
  }, [windowStart, canNext, programs.length]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("tv_notifications");
      if (stored) setNotified(new Set(JSON.parse(stored)));
    } catch { /* ignore */ }
  }, []);

  const handleNotify = useCallback((id: string, name: string) => {
    const next = new Set(notified);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
      setToast(`You'll be notified before "${name}" begins`);
      setTimeout(() => setToast(null), 3500);
    }
    setNotified(next);
    try {
      localStorage.setItem("tv_notifications", JSON.stringify([...next]));
    } catch { /* ignore */ }
  }, [notified]);

  return (
    <section id="tv-lineup" className="px-4 py-14" style={{ background: "#111111" }}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          className="flex items-center justify-between gap-3 mb-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-1 h-7 rounded-full" style={{ background: "#f97d00" }} />
            <div>
              <h2 className="text-white font-extrabold text-xl sm:text-2xl">TV Programs Lineup</h2>
              <p className="text-white/40 text-xs mt-0.5">Now showing — what&apos;s on air</p>
            </div>
          </div>
          <Link
            href="/tv"
            className="shrink-0 text-xs font-bold px-4 py-2 rounded-xl transition-all duration-200 hover:opacity-80"
            style={{ background: "rgba(249,125,0,0.12)", color: "#f97d00", border: "1px solid rgba(249,125,0,0.25)" }}
          >
            Full Schedule →
          </Link>
        </motion.div>

        {/* Day tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 no-scrollbar">
          {DAYS.map((day) => {
            const isActive = day === selectedDay;
            const isToday = day === todayName();
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className="shrink-0 flex flex-col items-center px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200"
                style={{
                  background: isActive ? "#f97d00" : "rgba(255,255,255,0.06)",
                  color: isActive ? "#fff" : "rgba(255,255,255,0.55)",
                  border: isActive ? "1.5px solid #f97d00" : "1.5px solid rgba(255,255,255,0.08)",
                }}
              >
                <span className="text-[10px] font-extrabold tracking-wider uppercase">{SHORT[day]}</span>
                {isToday && (
                  <span className="mt-0.5 w-1 h-1 rounded-full" style={{ background: isActive ? "#fff" : "#f97d00" }} />
                )}
              </button>
            );
          })}
        </div>

        {/* 4-row windowed list */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedDay}-${windowStart}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28 }}
              className="flex flex-col"
            >
              {visible.map((program, i) => {
                const isNotified = notified.has(program.id);
                const tagColor = TAG_COLORS[program.tag] ?? "#f97d00";
                return (
                  <motion.div
                    key={program.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.25 }}
                    className="flex items-center gap-4 px-4 py-4 rounded-xl transition-colors duration-150"
                    style={{
                      borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
                      background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)",
                    }}
                  >
                    {/* Time */}
                    <span className="shrink-0 w-20 text-xs font-bold tabular-nums" style={{ color: "#f97d00" }}>
                      {program.time}
                    </span>

                    {/* Name + tag */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-white font-semibold text-sm leading-snug">{program.name}</p>
                        <span
                          className="text-[9px] font-extrabold tracking-widest uppercase px-1.5 py-0.5 rounded-md"
                          style={{ background: `${tagColor}22`, color: tagColor }}
                        >
                          {program.tag}
                        </span>
                      </div>
                      <p className="text-white/35 text-xs mt-0.5">{program.presenter}</p>
                    </div>

                    {/* Bell */}
                    <button
                      onClick={() => handleNotify(program.id, program.name)}
                      className="shrink-0 p-1.5 rounded-lg transition-all duration-150 hover:bg-white/8"
                      aria-label={isNotified ? "Remove notification" : "Set notification"}
                    >
                      <BellIcon filled={isNotified} />
                    </button>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Progress dots */}
          <div className="flex justify-center gap-1.5 mt-5">
            {programs.map((_, i) => {
              const isInWindow = i >= windowStart && i < windowStart + 4;
              return (
                <button
                  key={i}
                  onClick={() => setWindowStart(Math.min(Math.max(0, i), programs.length - 4))}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: isInWindow ? 20 : 6,
                    height: 6,
                    background: isInWindow ? "#f97d00" : "rgba(255,255,255,0.15)",
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-8 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <Link
            href="/tv"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-white text-sm font-bold transition-all duration-200 hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #f97d00 0%, #C8102E 100%)",
              boxShadow: "0 0 24px rgba(249,125,0,0.30)",
            }}
          >
            See Full TV Schedule →
          </Link>
        </motion.div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl text-white text-sm font-semibold shadow-2xl"
            style={{
              background: "#111111",
              border: "1px solid rgba(249,125,0,0.40)",
              boxShadow: "0 0 24px rgba(249,125,0,0.20), 0 8px 32px rgba(0,0,0,0.6)",
              whiteSpace: "nowrap",
            }}
          >
            🔔 {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
