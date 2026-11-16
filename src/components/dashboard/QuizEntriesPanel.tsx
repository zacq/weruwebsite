"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import TrendChart from "./TrendChart";
import StatCard from "./StatCard";
import { apiJson, formatDateTime, type DashEntry, type DashQuestion, type DashQuiz } from "./quizTypes";

type Draw = { id: string; winnerEntryId: string; poolSize: number; createdAt: string; drawnByName: string | null };
type Notification = { id: string; entryId: string | null; channel: "sms" | "email"; recipient: string; status: string; error: string | null; createdAt: string };
type Data = { entries: DashEntry[]; draws: Draw[]; notifications: Notification[]; channels: { sms: boolean; email: boolean } };
type Filter = "unmarked" | "correct" | "all" | DashEntry["drawStatus"];

const DRAW_OPTIONS: DashEntry["drawStatus"][] = ["pending", "contacted", "winner", "disqualified"];
const DRAW_LABEL: Record<DashEntry["drawStatus"], string> = { pending: "Pending", contacted: "Contacted", winner: "Winner", disqualified: "Disqualified" };

const screenshotUrl = (key: string) => `/api/dashboard/quiz-screenshots?key=${encodeURIComponent(key)}`;

function csvEscape(value: unknown): string {
  const s = String(value ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export default function QuizEntriesPanel({ quiz, questions }: { quiz: DashQuiz; questions: DashQuestion[] }) {
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("unmarked");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const [notifying, setNotifying] = useState<DashEntry | null>(null);

  const load = useCallback(async () => {
    try {
      const next = await apiJson<Data>(`/api/dashboard/quizzes/${quiz.id}/entries`);
      setData(next);
      if (!next.entries.some((e) => !e.reviewed)) setFilter((f) => (f === "unmarked" ? "all" : f));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load entries");
    }
  }, [quiz.id]);

  useEffect(() => { load(); }, [load]);

  const entries = useMemo(() => data?.entries ?? [], [data]);
  const visible = useMemo(() => {
    const term = search.trim().toLowerCase();
    return entries.filter((e) => {
      const matchesFilter =
        filter === "all" ? true :
        filter === "unmarked" ? !e.reviewed :
        filter === "correct" ? e.eligible :
        e.drawStatus === filter;
      const matchesSearch = !term || e.name.toLowerCase().includes(term) || e.phone.includes(term) || (e.county ?? "").toLowerCase().includes(term);
      return matchesFilter && matchesSearch;
    });
  }, [entries, filter, search]);

  const stats = useMemo(() => ({
    total: entries.length,
    unmarked: entries.filter((e) => !e.reviewed).length,
    correct: entries.filter((e) => e.eligible).length,
    pool: entries.filter((e) => e.eligible && e.drawStatus === "pending").length,
    winners: entries.filter((e) => e.drawStatus === "winner").length,
  }), [entries]);

  const trendRecords = useMemo(
    () => entries.map((e) => ({ id: e.id, createdTime: e.submittedAt, fields: { "Submitted At": e.submittedAt } })),
    [entries]
  );

  const answerKeyFor = (questionId: string) => questions.find((q) => q.id === questionId)?.answerKey;

  const patchEntry = async (entry: DashEntry, body: Record<string, unknown>) => {
    try {
      const { entry: updated } = await apiJson<{ entry: DashEntry }>(`/api/dashboard/quiz-entries/${entry.id}`, {
        method: "PATCH",
        body: JSON.stringify(body),
      });
      setData((d) => d && { ...d, entries: d.entries.map((e) => (e.id === entry.id ? updated : e)) });
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update entry");
      return null;
    }
  };

  const mark = async (entry: DashEntry, index: number, value: boolean | null) => {
    const marks = entry.answers.map((a, i) => (i === index ? value : a.correct));
    const updated = await patchEntry(entry, { marks });
    // Move on to the next unmarked entry once this one is fully marked.
    if (updated?.reviewed && filter === "unmarked") {
      const next = visible.find((e) => e.id !== entry.id && !e.reviewed);
      setOpen(next?.id ?? null);
    }
  };

  const markAll = (entry: DashEntry, value: boolean) => mark({ ...entry, answers: entry.answers.map((a) => ({ ...a, correct: value })) }, 0, value);

  const draw = async () => {
    if (!window.confirm(`Draw a winner at random from ${stats.pool} fully correct entries?`)) return;
    setError(null);
    try {
      const { winner, poolSize } = await apiJson<{ winner: DashEntry; poolSize: number }>(`/api/dashboard/quizzes/${quiz.id}/draw`, { method: "POST" });
      setNotice(`Winner drawn from ${poolSize} entries: ${winner.name} (${winner.phone}).`);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Draw failed");
    }
  };

  const exportCsv = () => {
    const headers = ["Name", "Phone", "Email", "County/Town", ...questions.map((q, i) => `Q${i + 1}`), "Score", "Out of", "Marked", "All correct", "Draw status", "Submitted"];
    const rows = visible.map((e) => [
      e.name, e.phone, e.email, e.county,
      ...questions.map((q) => e.answers.find((a) => a.questionId === q.id)?.answer ?? ""),
      e.score, e.total, e.reviewed ? "Yes" : "No", e.eligible ? "Yes" : "No", DRAW_LABEL[e.drawStatus], e.submittedAt,
    ]);
    const csv = [headers, ...rows].map((r) => r.map(csvEscape).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `${quiz.slug}-entries-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!data) {
    return error
      ? <div className="px-4 py-3 rounded-xl text-sm" style={{ background: "rgba(220,38,38,0.08)", color: "#b91c1c" }}>{error}</div>
      : <div className="h-56 rounded-2xl bg-white animate-pulse" style={{ border: "1px solid rgba(0,0,0,0.06)" }} />;
  }

  const closed = quiz.effectiveStatus === "closed" || quiz.effectiveStatus === "archived";
  const canDraw = closed && stats.unmarked === 0 && stats.pool > 0;
  const entryName = (id: string | null) => entries.find((e) => e.id === id)?.name ?? "—";

  return (
    <div className="flex flex-col gap-4">
      {error && <div className="px-4 py-3 rounded-xl text-sm" style={{ background: "rgba(220,38,38,0.08)", color: "#b91c1c" }}>{error}</div>}
      {notice && <div className="px-4 py-3 rounded-xl text-sm" style={{ background: "rgba(34,197,94,0.10)", color: "#15803d" }}>{notice}</div>}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Entries" value={stats.total} />
        <StatCard label="To mark" value={stats.unmarked} subLabel={stats.unmarked ? "needs review" : "all marked"} />
        <StatCard label="All correct" value={stats.correct} subLabel={`${stats.pool} in draw pool`} />
        <StatCard label="Winners" value={stats.winners} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-4 items-start">
        <div className="rounded-2xl bg-white p-4 sm:p-5" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
          <h3 className="text-sm font-bold mb-3">Entries per day</h3>
          <TrendChart records={trendRecords} dateField="Submitted At" days={14} />
        </div>

        <div className="rounded-2xl bg-white p-4 sm:p-5 flex flex-col gap-3" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
          <h3 className="text-sm font-bold">Prize draw</h3>
          <p className="text-xs text-black/45">
            {!closed
              ? "Available once the quiz closes."
              : stats.unmarked > 0
                ? `Mark the remaining ${stats.unmarked} entries first so every correct entry gets a fair chance.`
                : "Picks one entry at random from the fully correct, pending entries. Draw again to add winners or replace a disqualified one."}
          </p>
          <button
            onClick={draw}
            disabled={!canDraw}
            className="self-start text-xs font-semibold px-4 py-2.5 rounded-lg text-white disabled:opacity-30 transition-all active:scale-95"
            style={{ background: "#f97d00", boxShadow: "0 2px 10px rgba(249,125,0,0.25)" }}
          >
            Draw a winner
          </button>
          {data.draws.length > 0 && (
            <ul className="flex flex-col gap-1.5 text-xs">
              {data.draws.map((d) => (
                <li key={d.id} className="flex justify-between gap-2">
                  <span className="font-medium">{entryName(d.winnerEntryId)}</span>
                  <span className="text-black/40 tabular-nums">from {d.poolSize} · {formatDateTime(d.createdAt)}{d.drawnByName ? ` · ${d.drawnByName}` : ""}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {notifying && (
        <NotifyForm
          entry={notifying}
          quiz={quiz}
          channels={data.channels}
          onClose={() => setNotifying(null)}
          onSent={(msg) => { setNotice(msg); setNotifying(null); load(); }}
          onError={setError}
        />
      )}

      <div className="rounded-2xl bg-white overflow-hidden" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="p-3 sm:p-4 flex flex-col sm:flex-row gap-2 sm:items-center">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, phone or county"
            className="flex-1 text-sm px-3 py-2 rounded-lg"
            style={{ border: "1px solid rgba(0,0,0,0.12)" }}
          />
          <select value={filter} onChange={(e) => setFilter(e.target.value as Filter)} className="text-sm px-3 py-2 rounded-lg bg-white" style={{ border: "1px solid rgba(0,0,0,0.12)" }}>
            <option value="unmarked">To mark ({stats.unmarked})</option>
            <option value="correct">All correct ({stats.correct})</option>
            <option value="all">All entries ({stats.total})</option>
            {DRAW_OPTIONS.map((s) => <option key={s} value={s}>{DRAW_LABEL[s]}</option>)}
          </select>
          <button onClick={exportCsv} className="text-xs font-semibold px-3.5 py-2.5 rounded-lg bg-white transition-all hover:border-black/25 active:scale-95" style={{ border: "1px solid rgba(0,0,0,0.12)" }}>
            Export CSV ({visible.length})
          </button>
        </div>

        <div className="flex flex-col">
          {visible.map((e) => {
            const isOpen = open === e.id;
            return (
              <div key={e.id} style={{ borderTop: "1px solid rgba(0,0,0,0.05)", background: e.drawStatus === "winner" ? "rgba(250,204,21,0.10)" : undefined }}>
                <button
                  onClick={() => setOpen(isOpen ? null : e.id)}
                  className="w-full text-left px-4 py-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm hover:bg-black/[0.02] transition-colors"
                >
                  <span className="font-medium min-w-[9rem]">{e.name}</span>
                  <span className="tabular-nums text-black/60">{e.phone}</span>
                  <span className="text-xs tabular-nums font-semibold" style={{ color: !e.reviewed ? "#c2650a" : e.eligible ? "#15803d" : "rgba(0,0,0,0.45)" }}>
                    {!e.reviewed ? "To mark" : `${e.score}/${e.total}${e.eligible ? " · all correct" : ""}`}
                  </span>
                  {e.screenshots.length > 0 && <span className="text-xs text-black/40">{e.screenshots.length} screenshot{e.screenshots.length > 1 ? "s" : ""}</span>}
                  <span className="ml-auto text-xs text-black/40 tabular-nums">{formatDateTime(e.submittedAt)}</span>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 flex flex-col gap-3">
                    {e.answers.map((a, i) => {
                      const key = answerKeyFor(a.questionId);
                      return (
                        <div key={a.questionId} className="rounded-xl p-3 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3" style={{ background: "rgba(0,0,0,0.025)" }}>
                          <div className="min-w-0">
                            <p className="text-[11px] font-bold text-black/40 mb-1">Q{i + 1}. {a.question}</p>
                            <p className="text-sm font-medium whitespace-pre-wrap break-words">{a.answer}</p>
                            {key && <p className="text-xs mt-1.5" style={{ color: "#15803d" }}>Key: {key}</p>}
                          </div>
                          <div className="flex gap-1.5 self-center">
                            <button
                              onClick={() => mark(e, i, a.correct === true ? null : true)}
                              className="text-xs font-bold px-3 py-2 rounded-lg transition-all active:scale-95"
                              style={{ background: a.correct === true ? "#15803d" : "rgba(21,128,61,0.08)", color: a.correct === true ? "#fff" : "#15803d" }}
                            >
                              ✓ Correct
                            </button>
                            <button
                              onClick={() => mark(e, i, a.correct === false ? null : false)}
                              className="text-xs font-bold px-3 py-2 rounded-lg transition-all active:scale-95"
                              style={{ background: a.correct === false ? "#b91c1c" : "rgba(185,28,28,0.08)", color: a.correct === false ? "#fff" : "#b91c1c" }}
                            >
                              ✗ Wrong
                            </button>
                          </div>
                        </div>
                      );
                    })}

                    {e.screenshots.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {e.screenshots.map((k, i) => (
                          <a key={k} href={screenshotUrl(k)} target="_blank" rel="noopener noreferrer" className="block w-28 h-28 rounded-lg overflow-hidden transition-transform hover:scale-[1.03]" style={{ border: "1px solid rgba(0,0,0,0.1)" }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={screenshotUrl(k)} alt={`Screenshot ${i + 1} from ${e.name}`} className="w-full h-full object-cover" loading="lazy" />
                          </a>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <button onClick={() => markAll(e, true)} className="font-semibold px-3 py-2 rounded-lg hover:opacity-80" style={{ background: "rgba(21,128,61,0.08)", color: "#15803d" }}>All correct</button>
                      <span className="text-black/40">{[e.email, e.county].filter(Boolean).join(" · ")}</span>
                      <select
                        value={e.drawStatus}
                        onChange={(ev) => patchEntry(e, { drawStatus: ev.target.value })}
                        className="ml-auto px-2 py-1.5 rounded-lg bg-white"
                        style={{ border: "1px solid rgba(0,0,0,0.12)" }}
                      >
                        {DRAW_OPTIONS.map((s) => <option key={s} value={s}>{DRAW_LABEL[s]}</option>)}
                      </select>
                      <button onClick={() => setNotifying(e)} className="font-semibold px-3 py-2 rounded-lg hover:opacity-80" style={{ color: "#f97d00" }}>Message</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          {visible.length === 0 && (
            <p className="px-4 py-8 text-center text-sm text-black/30" style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }}>
              {filter === "unmarked" && entries.length > 0 ? "Everything is marked." : "No entries."}
            </p>
          )}
        </div>
      </div>

      {data.notifications.length > 0 && (
        <div className="rounded-2xl bg-white p-4 sm:p-5" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
          <h3 className="text-sm font-bold mb-3">Messages sent</h3>
          <ul className="flex flex-col gap-1.5 text-xs">
            {data.notifications.map((n) => (
              <li key={n.id} className="flex flex-wrap justify-between gap-2">
                <span><b>{n.channel.toUpperCase()}</b> → {entryName(n.entryId)} ({n.recipient})</span>
                <span className="tabular-nums" style={{ color: n.status === "sent" ? "#15803d" : "#b91c1c" }}>
                  {n.status}{n.error ? `: ${n.error}` : ""} · {formatDateTime(n.createdAt)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function NotifyForm({
  entry, quiz, channels, onClose, onSent, onError,
}: {
  entry: DashEntry;
  quiz: DashQuiz;
  channels: { sms: boolean; email: boolean };
  onClose: () => void;
  onSent: (msg: string) => void;
  onError: (msg: string) => void;
}) {
  const firstName = entry.name.split(" ")[0];
  const [channel, setChannel] = useState<"sms" | "email">(channels.sms || !channels.email ? "sms" : "email");
  const [subject, setSubject] = useState(`You've won — ${quiz.title}`);
  const [message, setMessage] = useState(
    `Congratulations ${firstName}! You are a winner in the ${quiz.title}${quiz.prize ? ` and have won ${quiz.prize}` : ""}. Our team will call you on ${entry.phone} to arrange your prize. — WERU DIGITAL`
  );
  const [sending, setSending] = useState(false);
  const available = channel === "sms" ? channels.sms : channels.email && Boolean(entry.email);

  const send = async () => {
    setSending(true);
    try {
      await apiJson(`/api/dashboard/quiz-entries/${entry.id}/notify`, {
        method: "POST",
        body: JSON.stringify({ channel, message, subject }),
      });
      onSent(`${channel === "sms" ? "SMS" : "Email"} sent to ${entry.name}.`);
    } catch (err) {
      onError(err instanceof Error ? err.message : "Send failed");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="rounded-2xl bg-white p-4 sm:p-5 flex flex-col gap-3" style={{ border: "1px solid rgba(249,125,0,0.35)", boxShadow: "0 4px 20px rgba(249,125,0,0.10)" }}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold">Message {entry.name}</h3>
        <button onClick={onClose} className="text-xs text-black/40 hover:text-black/70">Cancel</button>
      </div>
      <div className="flex flex-wrap gap-2">
        {(["sms", "email"] as const).map((c) => (
          <button
            key={c}
            onClick={() => setChannel(c)}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
            style={{ background: channel === c ? "#0A0A0A" : "rgba(0,0,0,0.05)", color: channel === c ? "#fff" : "#0A0A0A" }}
          >
            {c === "sms" ? `SMS · ${entry.phone}` : `Email · ${entry.email ?? "none"}`}
          </button>
        ))}
      </div>
      {channel === "email" && (
        <input value={subject} onChange={(e) => setSubject(e.target.value)} className="text-sm px-3 py-2 rounded-lg" style={{ border: "1px solid rgba(0,0,0,0.12)" }} />
      )}
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} className="text-sm px-3 py-2 rounded-lg" style={{ border: "1px solid rgba(0,0,0,0.12)" }} />
      {channel === "sms" && <p className="text-[11px] text-black/40 tabular-nums">{message.length} characters · {Math.ceil(message.length / 160)} SMS</p>}
      {!available && (
        <p className="text-xs" style={{ color: "#c2650a" }}>
          {channel === "sms" ? "SMS isn't set up yet — add AT_USERNAME and AT_API_KEY on Netlify." : entry.email ? "Email isn't set up yet — add RESEND_API_KEY and RESEND_FROM on Netlify." : "This entry has no email address."}
        </p>
      )}
      <button
        onClick={send}
        disabled={!available || sending || !message.trim()}
        className="self-start text-xs font-semibold px-4 py-2.5 rounded-lg text-white disabled:opacity-30 transition-all active:scale-95"
        style={{ background: "#f97d00" }}
      >
        {sending ? "Sending…" : "Send"}
      </button>
    </div>
  );
}
