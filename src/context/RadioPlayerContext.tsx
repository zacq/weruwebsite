"use client";

import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import { radioSchedule, type RadioDaySchedule } from "@/data/radioSchedule";

const RADIO_STREAM_URL = "https://stream.zeno.fm/d4gvmydrosbuv";
const RADIO_MOUNT_ID = RADIO_STREAM_URL.split("/").pop()!;
const METADATA_URL = `https://api.zeno.fm/mounts/metadata/subscribe/${RADIO_MOUNT_ID}`;

export type PlayedTrack = { title: string; at: Date };

type Day = RadioDaySchedule["day"];

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

function getCurrentShowName(): string | undefined {
  const schedule = radioSchedule.find((d) => d.day === todayName());
  const programs = schedule?.programs ?? [];
  const now = new Date().getHours() + new Date().getMinutes() / 60;
  let current: { name: string } | undefined;
  for (const program of programs) {
    if (parseStartHour(program.time) <= now) current = program;
  }
  return current?.name;
}

type RadioPlayerContextValue = {
  playing: boolean;
  volume: number;
  recentTracks: PlayedTrack[];
  currentShowName: string | undefined;
  hasLoaded: boolean;
  visible: boolean;
  togglePlay: () => void;
  setVolume: (v: number) => void;
  autoplayOnce: () => void;
  close: () => void;
};

const RadioPlayerContext = createContext<RadioPlayerContextValue | null>(null);

export function RadioPlayerProvider({ children }: { children: React.ReactNode }) {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.8);
  const [recentTracks, setRecentTracks] = useState<PlayedTrack[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const [currentShowName, setCurrentShowName] = useState<string | undefined>();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playingRef = useRef(false);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setCurrentShowName(getCurrentShowName());
    const t = setInterval(() => setCurrentShowName(getCurrentShowName()), 60_000);
    return () => clearInterval(t);
  }, []);

  // Live "recently played" — real metadata from Zeno.fm's stream, not invented.
  // Weru FM is presenter-hosted rather than an automated music rotation, so
  // this may legitimately stay empty if the station never tags a StreamTitle.
  useEffect(() => {
    const source = new EventSource(METADATA_URL);
    source.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const title: string | undefined = data?.streamTitle || data?.title;
        if (!title || !title.trim()) return;
        setRecentTracks((prev) => {
          if (prev[0]?.title === title) return prev;
          return [{ title, at: new Date() }, ...prev].slice(0, 5);
        });
      } catch { /* non-JSON keepalive event — ignore */ }
    };
    source.onerror = () => { /* browser auto-reconnects EventSource */ };
    return () => source.close();
  }, []);

  const ensureAudio = useCallback(() => {
    if (audioRef.current) return audioRef.current;
    const audio = new Audio(RADIO_STREAM_URL);
    audio.preload = "none";
    audio.volume = volume;
    audioRef.current = audio;

    const scheduleReconnect = (delayMs: number) => {
      if (!playingRef.current) return;
      if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
      reconnectTimerRef.current = setTimeout(() => {
        if (!playingRef.current || !audioRef.current) return;
        audioRef.current.src = RADIO_STREAM_URL;
        audioRef.current.load();
        audioRef.current.play().catch(() => {});
      }, delayMs);
    };

    audio.addEventListener("error", () => scheduleReconnect(3000));
    audio.addEventListener("stalled", () => scheduleReconnect(5000));
    audio.addEventListener("ended", () => scheduleReconnect(1000));

    setHasLoaded(true);
    return audio;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const togglePlay = useCallback(() => {
    const audio = ensureAudio();
    setVisible(true);
    if (playingRef.current) {
      if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
      audio.pause();
      playingRef.current = false;
      setPlaying(false);
    } else {
      audio.play().then(() => {
        playingRef.current = true;
        setPlaying(true);
      }).catch(() => {
        // Browser blocked autoplay — stays paused until a direct user gesture
      });
    }
  }, [ensureAudio]);

  // Called when the full /radio screen mounts — attempts autoplay exactly
  // once, matching the prior page-scoped behavior, but only if nothing has
  // been loaded yet elsewhere in the app (avoids restarting an already-
  // playing stream just because the user revisited the Radio tab).
  const autoplayOnce = useCallback(() => {
    if (hasLoaded) return;
    const audio = ensureAudio();
    setVisible(true);
    audio.play().then(() => {
      playingRef.current = true;
      setPlaying(true);
    }).catch(() => {
      // Autoplay blocked — user presses play manually
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasLoaded, ensureAudio]);

  const setVolume = useCallback((v: number) => {
    setVolumeState(v);
    if (audioRef.current) audioRef.current.volume = v;
  }, []);

  const close = useCallback(() => {
    if (audioRef.current && playingRef.current) {
      audioRef.current.pause();
      playingRef.current = false;
      setPlaying(false);
    }
    setVisible(false);
  }, []);

  useEffect(() => {
    return () => {
      if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
      audioRef.current?.pause();
    };
  }, []);

  return (
    <RadioPlayerContext.Provider
      value={{ playing, volume, recentTracks, currentShowName, hasLoaded, visible, togglePlay, setVolume, autoplayOnce, close }}
    >
      {children}
    </RadioPlayerContext.Provider>
  );
}

export function useRadioPlayer() {
  const ctx = useContext(RadioPlayerContext);
  if (!ctx) throw new Error("useRadioPlayer must be used within RadioPlayerProvider");
  return ctx;
}
