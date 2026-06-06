"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { radioSchedule, type RadioDaySchedule } from "@/data/radioSchedule";

const RADIO_STREAM_URL = "/api/radio-stream";

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
  if (!isToday) return 0;
  const now = new Date().getHours() + new Date().getMinutes() / 60;
  let idx = 0;
  for (let i = 0; i < programs.length; i++) {
    if (parseStartHour(programs[i].time) <= now) idx = i;
  }
  return idx;
}

function BellIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="15" height="15" viewBox="0 0 24 24" fill={filled ? "#111" : "none"}
      stroke={filled ? "#111" : "rgba(255,255,255,0.55)"}
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

export default function RadioSection() {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [selectedDay, setSelectedDay] = useState<Day>(todayName());
  const [notified, setNotified] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("radio_notifications");
      if (stored) setNotified(new Set(JSON.parse(stored)));
    } catch { /* ignore */ }
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(RADIO_STREAM_URL);
      audioRef.current.preload = "none";
      audioRef.current.volume = volume;
    }
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  const volumeIcon = volume === 0 ? "🔇" : volume < 0.4 ? "🔈" : "🔊";

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
  const allPrograms = schedule?.programs ?? [];
  const currentIdx = getCurrentIndex(allPrograms, selectedDay === todayName());
  const visible = allPrograms.slice(currentIdx, currentIdx + 2);

  return (
    <section id="radio" className="w-full" style={{ background: "#f97d00" }}>

      {/* ── Live Radio Player ─────────────────────────── */}
      <div className="px-4 pt-6 pb-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            className="glass rounded-2xl overflow-hidden"
            style={{ background: "#111111" }}
            animate={{
              boxShadow: playing
                ? "0 0 48px rgba(200,16,46,0.40), 0 16px 48px rgba(0,0,0,0.6)"
                : "0 8px 32px rgba(0,0,0,0.45)",
            }}
            transition={{ duration: 0.6 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Main controls row */}
            <div className="flex items-center gap-4 sm:gap-6 px-5 sm:px-6 pt-7 pb-5">

              {/* Play / Pause button with pulsing rings */}
              <div className="relative shrink-0 flex items-center justify-center">
                {playing && (
                  <>
                    <motion.span
                      className="absolute rounded-full"
                      style={{ inset: -6, background: "#C8102E" }}
                      animate={{ scale: [1, 1.65, 1], opacity: [0.40, 0, 0.40] }}
                      transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                    />
                    <motion.span
                      className="absolute rounded-full"
                      style={{ inset: -12, background: "#C8102E" }}
                      animate={{ scale: [1, 1.45, 1], opacity: [0.20, 0, 0.20] }}
                      transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut", delay: 0.4 }}
                    />
                  </>
                )}
                <motion.button
                  onClick={togglePlay}
                  className="relative w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl z-10"
                  style={{
                    background: playing ? "#C8102E" : "#f97d00",
                    boxShadow: playing
                      ? "0 0 24px rgba(200,16,46,0.70)"
                      : "0 0 20px rgba(249,125,0,0.55)",
                  }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.90 }}
                  aria-label={playing ? "Pause radio" : "Play radio"}
                >
                  <motion.span
                    key={playing ? "pause" : "play"}
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.18 }}
                    style={{ display: "flex" }}
                  >
                    {playing ? "⏸" : "▶"}
                  </motion.span>
                </motion.button>
              </div>

              {/* Station info */}
              <div className="flex-1 min-w-0">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={playing ? "on-air" : "ready"}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="inline-block text-[10px] font-extrabold tracking-widest uppercase px-2.5 py-0.5 rounded mb-1.5"
                    style={{ background: playing ? "#C8102E" : "rgba(255,255,255,0.12)", color: "#fff" }}
                  >
                    {playing ? "● ON AIR" : "READY"}
                  </motion.span>
                </AnimatePresence>
                <p className="text-white font-extrabold text-base leading-tight">Weru FM</p>
                <p className="text-white/45 text-xs mt-0.5">96.4 MHz · Live Radio</p>
              </div>

              {/* EQ bars */}
              <div className="shrink-0 flex items-end gap-[3px] h-9">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className="eq-bar"
                    style={{
                      width: "4px",
                      height: playing ? undefined : "4px",
                      animationPlayState: playing ? "running" : "paused",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Volume row */}
            <div className="flex items-center gap-3 px-5 sm:px-6 pb-6">
              <span className="text-base shrink-0 select-none" style={{ lineHeight: 1 }}>{volumeIcon}</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="radio-volume flex-1"
                aria-label="Volume"
                style={{
                  background: `linear-gradient(to right, #f97d00 0%, #f97d00 ${volume * 100}%, rgba(255,255,255,0.12) ${volume * 100}%, rgba(255,255,255,0.12) 100%)`,
                }}
              />
              <span className="text-white/40 text-xs shrink-0 w-8 text-right tabular-nums">
                {Math.round(volume * 100)}%
              </span>
            </div>

            {/* Gradient bar */}
            <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #f97d00, #C8102E, #f97d00)" }} />
          </motion.div>
        </div>
      </div>

      {/* ── Radio Schedule Preview ─────────────────────── */}
      <div className="px-4 pb-10">
        <div className="max-w-5xl mx-auto">

          {/* Header row */}
          <motion.div
            className="flex items-center justify-between gap-3 mb-6"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <div>
              <h2 className="text-white font-extrabold text-xl sm:text-2xl leading-tight">Radio Program Schedule</h2>
              <p className="text-white/70 text-xs mt-1">On air now &amp; up next</p>
            </div>
            <Link
              href="/radio"
              className="shrink-0 text-xs font-bold px-4 py-2 rounded-xl transition-all duration-200"
              style={{
                background: "rgba(0,0,0,0.25)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              Full Schedule →
            </Link>
          </motion.div>

          {/* Pill day tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6 no-scrollbar">
            {DAYS.map((day) => {
              const isActive = day === selectedDay;
              const isToday = day === todayName();
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className="shrink-0 relative flex flex-col items-center px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200"
                  style={{
                    background: isActive ? "#111111" : "rgba(0,0,0,0.20)",
                    color: isActive ? "#f97d00" : "rgba(255,255,255,0.65)",
                    border: isActive ? "1.5px solid rgba(0,0,0,0.6)" : "1.5px solid rgba(255,255,255,0.18)",
                  }}
                >
                  <span className="text-[10px] font-extrabold tracking-wider uppercase">{SHORT[day]}</span>
                  {isToday && (
                    <span
                      className="mt-0.5 w-1 h-1 rounded-full"
                      style={{ background: isActive ? "#f97d00" : "rgba(255,255,255,0.7)" }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* 2-program preview */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDay}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {visible.map((program, i) => {
                const isNotified = notified.has(program.id);
                const isOnAir = i === 0 && selectedDay === todayName();
                return (
                  <motion.div
                    key={program.id}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                    className="glass-sm relative rounded-2xl p-5 flex flex-col gap-2"
                  >
                    {/* On-air / Up next badge */}
                    <div className="flex items-center gap-2 mb-1">
                      {isOnAir ? (
                        <div className="flex items-center gap-1.5">
                          <span className="live-dot" style={{ "--dot-color": "#fff" } as React.CSSProperties} />
                          <span className="text-[10px] font-extrabold tracking-widest uppercase text-white">On Air</span>
                        </div>
                      ) : (
                        <span className="text-[10px] font-extrabold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.50)" }}>
                          Up Next
                        </span>
                      )}
                    </div>

                    <span
                      className="self-start text-[10px] font-extrabold px-2.5 py-0.5 rounded-full"
                      style={{ background: "rgba(0,0,0,0.25)", color: "#fff", border: "1px solid rgba(255,255,255,0.20)" }}
                    >
                      {program.time}
                    </span>

                    <h3 className="text-white font-extrabold text-base leading-snug">{program.name}</h3>
                    <p className="text-xs font-semibold text-white/80">Hosted by {program.host}</p>
                    <p className="text-white/55 text-xs leading-relaxed line-clamp-2 flex-1">{program.description}</p>

                    <button
                      onClick={() => handleNotify(program.id, program.name)}
                      className="self-end flex items-center gap-1.5 mt-1 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all duration-150"
                      style={{
                        background: isNotified ? "#f97d00" : "rgba(255,255,255,0.15)",
                        color: isNotified ? "#111" : "rgba(255,255,255,0.70)",
                        border: "none",
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

          {/* CTA */}
          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/radio"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-200 hover:opacity-90"
              style={{
                background: "#111111",
                color: "#f97d00",
                boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
              }}
            >
              See Full Radio Schedule →
            </Link>
          </motion.div>
        </div>
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
