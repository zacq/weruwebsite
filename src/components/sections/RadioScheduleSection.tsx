"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { radioSchedule, type RadioDaySchedule } from "@/data/radioSchedule";

type Day = RadioDaySchedule["day"];

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

function parseStartHour(time: string): number {
  const start = time.split("–")[0].trim();
  const [rawTime, period] = start.split(" ");
  const [h, m] = rawTime.split(":").map(Number);
  let hour = h + (m ?? 0) / 60;
  if (period === "PM" && h !== 12) hour += 12;
  if (period === "AM" && h === 12) hour = 0;
  return hour;
}

function getCurrentIndex(programs: { time: string }[], isToday: boolean): number {
  if (!isToday) return -1;
  const now = new Date().getHours() + new Date().getMinutes() / 60;
  let idx = -1;
  for (let i = 0; i < programs.length; i++) {
    if (parseStartHour(programs[i].time) <= now) idx = i;
  }
  return idx;
}

function BellIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="15" height="15" viewBox="0 0 24 24" fill={filled ? "#f97d00" : "none"}
      stroke={filled ? "#f97d00" : "rgba(255,255,255,0.35)"}
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

export default function RadioScheduleSection() {
  const [selectedDay, setSelectedDay] = useState<Day>(todayName());
  const [animKey, setAnimKey] = useState(0);
  const [notified, setNotified] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("radio_notifications");
      if (stored) setNotified(new Set(JSON.parse(stored)));
    } catch { /* ignore */ }
  }, []);

  const handleDayChange = (day: Day) => {
    setSelectedDay(day);
    setAnimKey((k) => k + 1);
  };

  const handleNotify = (id: string, name: string) => {
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
      localStorage.setItem("radio_notifications", JSON.stringify([...next]));
    } catch { /* ignore */ }
  };

  const schedule = radioSchedule.find((d) => d.day === selectedDay);
  const programs = schedule?.programs ?? [];
  const currentIdx = getCurrentIndex(programs, selectedDay === todayName());

  return (
    <section id="radio-schedule" className="px-4 py-16" style={{ background: "#0D0D0D" }}>
      <div className="max-w-5xl mx-auto">

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
            <h2 className="text-white font-extrabold text-2xl sm:text-3xl">Full Radio Schedule</h2>
          </div>
          <p className="text-white/40 text-sm ml-4 pl-3">Every show, every day — pick a day to explore the full lineup.</p>
        </motion.div>

        {/* Pill day tabs */}
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
                className="shrink-0 relative flex flex-col items-center px-5 py-3 rounded-2xl text-[11px] font-bold tracking-widest uppercase transition-all duration-200"
                style={{
                  background: isActive
                    ? "linear-gradient(135deg, #f97d00 0%, #C8102E 100%)"
                    : "rgba(255,255,255,0.05)",
                  color: isActive ? "#fff" : "rgba(255,255,255,0.50)",
                  border: isActive ? "none" : "1px solid rgba(255,255,255,0.08)",
                  boxShadow: isActive ? "0 0 20px rgba(249,125,0,0.30)" : "none",
                }}
              >
                {SHORT[day]}
                {isToday && (
                  <span
                    className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full"
                    style={{ background: isActive ? "#fff" : "#f97d00", border: "2px solid #0D0D0D" }}
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
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {programs.map((program, i) => {
              const isNotified = notified.has(program.id);
              const isOnAir = i === currentIdx;
              const isNext = i === currentIdx + 1;
              const isPast = currentIdx >= 0 && i < currentIdx;

              return (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 18, scale: 0.97 }}
                  animate={{ opacity: isPast ? 0.40 : 1, y: 0, scale: 1 }}
                  transition={{ delay: i * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -3, scale: 1.015 }}
                  className="relative rounded-2xl p-5 flex flex-col gap-2"
                  style={{
                    background: isOnAir
                      ? "rgba(249,125,0,0.08)"
                      : "rgba(255,255,255,0.04)",
                    border: isOnAir
                      ? "1px solid rgba(249,125,0,0.35)"
                      : "1px solid rgba(255,255,255,0.07)",
                    boxShadow: isOnAir
                      ? "0 0 28px rgba(249,125,0,0.12), 0 4px 20px rgba(0,0,0,0.4)"
                      : "0 4px 16px rgba(0,0,0,0.25)",
                    transition: "box-shadow 0.2s, border-color 0.2s",
                  }}
                >
                  {/* Status badge */}
                  {(isOnAir || isNext) && (
                    <div className="flex items-center gap-1.5 mb-1">
                      {isOnAir ? (
                        <>
                          <span className="live-dot" />
                          <span className="text-[10px] font-extrabold tracking-widest uppercase" style={{ color: "#f97d00" }}>
                            On Air
                          </span>
                        </>
                      ) : (
                        <span className="text-[10px] font-extrabold tracking-widest uppercase text-white/40">
                          Up Next
                        </span>
                      )}
                    </div>
                  )}

                  {/* Time badge */}
                  <span
                    className="self-start text-[10px] font-extrabold px-2.5 py-0.5 rounded-full"
                    style={{
                      background: "rgba(249,125,0,0.12)",
                      color: "#f97d00",
                      border: "1px solid rgba(249,125,0,0.25)",
                    }}
                  >
                    {program.time}
                  </span>

                  <h3 className="text-white font-extrabold text-base leading-snug">{program.name}</h3>
                  <p className="text-xs font-semibold" style={{ color: "#f97d00" }}>Hosted by {program.host}</p>
                  <p className="text-white/50 text-xs leading-relaxed line-clamp-2 flex-1">{program.description}</p>

                  <button
                    onClick={() => handleNotify(program.id, program.name)}
                    className="self-end flex items-center gap-1.5 mt-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all duration-150"
                    style={{
                      background: isNotified ? "rgba(249,125,0,0.18)" : "rgba(255,255,255,0.07)",
                      color: isNotified ? "#f97d00" : "rgba(255,255,255,0.40)",
                      border: isNotified ? "1px solid rgba(249,125,0,0.30)" : "1px solid rgba(255,255,255,0.10)",
                    }}
                  >
                    <BellIcon filled={isNotified} />
                    {isNotified ? "Notified" : "Notify me"}
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl text-white text-sm font-semibold"
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
