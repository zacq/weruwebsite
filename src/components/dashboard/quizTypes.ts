import type { QuizAnswer, QuizPromoCopy } from "@/db/schema";
import type { EffectiveQuizStatus } from "@/lib/quizStatus";

export type DashQuiz = {
  id: string;
  slug: string;
  campaign: string | null;
  title: string;
  tagline: string | null;
  steps: string[];
  prize: string | null;
  description: string | null;
  sponsor: string | null;
  prizeImageUrl: string | null;
  promoCopy: QuizPromoCopy | null;
  startsAt: string;
  endsAt: string | null;
  status: "draft" | "published" | "archived";
  effectiveStatus: EffectiveQuizStatus;
  questionCount?: number;
  entryCount?: number;
  winnerCount?: number;
  unreviewedCount?: number;
};

export type DashQuestion = {
  id: string;
  quizId: string;
  position: number;
  label: string | null;
  question: string;
  answerKey: string | null;
};

export type DashEntry = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  county: string | null;
  answers: QuizAnswer[];
  screenshots: string[];
  score: number;
  total: number;
  reviewed: boolean;
  eligible: boolean;
  drawStatus: "pending" | "contacted" | "winner" | "disqualified";
  submittedAt: string;
};

export const STATUS_STYLE: Record<EffectiveQuizStatus, { label: string; bg: string; color: string }> = {
  live:      { label: "Live",      bg: "rgba(34,197,94,0.12)",  color: "#15803d" },
  scheduled: { label: "Scheduled", bg: "rgba(59,130,246,0.12)", color: "#1d4ed8" },
  draft:     { label: "Draft",     bg: "rgba(249,125,0,0.12)",  color: "#c2650a" },
  closed:    { label: "Closed",    bg: "rgba(0,0,0,0.08)",      color: "rgba(0,0,0,0.65)" },
  archived:  { label: "Archived",  bg: "rgba(0,0,0,0.04)",      color: "rgba(0,0,0,0.40)" },
};

export function formatDateTime(iso: string | null): string {
  if (!iso) return "No end date";
  return new Date(iso).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

// <input type="datetime-local"> works in local time without a zone suffix.
export function toLocalInput(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function fromLocalInput(value: string): string | null {
  return value ? new Date(value).toISOString() : null;
}

export async function apiJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    cache: "no-store",
    ...init,
    headers: init?.body ? { "Content-Type": "application/json", ...init.headers } : init?.headers,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error || `Request failed (${res.status})`);
  return data as T;
}
