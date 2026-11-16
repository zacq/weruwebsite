"use client";

import { useCallback, useEffect, useState } from "react";
import QuizDetail from "./QuizDetail";
import { STATUS_STYLE, apiJson, formatDateTime, type DashQuiz } from "./quizTypes";

export default function QuizManagementPanel() {
  const [quizzes, setQuizzes] = useState<DashQuiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newPrize, setNewPrize] = useState("");

  const load = useCallback(async () => {
    setError(null);
    try {
      const data = await apiJson<{ quizzes: DashQuiz[] }>("/api/dashboard/quizzes");
      setQuizzes(data.quizzes);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load quizzes");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleCreate = async () => {
    try {
      const { quiz } = await apiJson<{ quiz: DashQuiz }>("/api/dashboard/quizzes", {
        method: "POST",
        body: JSON.stringify({ title: newTitle.trim(), prize: newPrize.trim() || null }),
      });
      setNewTitle("");
      setNewPrize("");
      setCreating(false);
      await load();
      setSelected(quiz.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create quiz");
    }
  };

  if (selected) {
    return <QuizDetail quizId={selected} onBack={() => { setSelected(null); load(); }} />;
  }

  if (loading) {
    return <div className="h-56 rounded-2xl bg-white animate-pulse" style={{ border: "1px solid rgba(0,0,0,0.06)" }} />;
  }

  const live = quizzes.find((q) => q.effectiveStatus === "live");

  return (
    <div className="flex flex-col gap-4">
      {error && (
        <div className="px-4 py-3 rounded-xl text-sm" style={{ background: "rgba(220,38,38,0.08)", color: "#b91c1c" }}>{error}</div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="text-sm text-black/50">
          {live ? <>Live now: <span className="font-semibold text-black/80">{live.title}</span> · closes {formatDateTime(live.endsAt)}</> : "No quiz is live right now."}
        </p>
        <button
          onClick={() => setCreating((c) => !c)}
          className="self-start sm:self-auto text-xs font-semibold px-3.5 py-2 rounded-lg text-white transition-all duration-150 active:scale-95"
          style={{ background: "#f97d00", boxShadow: "0 2px 10px rgba(249,125,0,0.25)" }}
        >
          {creating ? "Cancel" : "+ New quiz"}
        </button>
      </div>

      {creating && (
        <div className="rounded-2xl bg-white p-4 sm:p-5 flex flex-col gap-3" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
          <input
            type="text"
            placeholder="Quiz title (e.g. WERU DIGITAL Quiz Challenge — Week 1)"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="text-sm px-3 py-2.5 rounded-lg"
            style={{ border: "1px solid rgba(0,0,0,0.15)" }}
          />
          <input
            type="text"
            placeholder="Prize (optional — e.g. KSh 2,000 airtime)"
            value={newPrize}
            onChange={(e) => setNewPrize(e.target.value)}
            className="text-sm px-3 py-2.5 rounded-lg"
            style={{ border: "1px solid rgba(0,0,0,0.15)" }}
          />
          <button
            onClick={handleCreate}
            disabled={!newTitle.trim()}
            className="self-start text-xs font-semibold px-4 py-2.5 rounded-lg text-white disabled:opacity-40"
            style={{ background: "#0A0A0A" }}
          >
            Create draft quiz
          </button>
        </div>
      )}

      {quizzes.length === 0 && !creating && (
        <p className="text-sm text-black/30 py-8 text-center">No quizzes yet. Click &quot;+ New quiz&quot; to create one.</p>
      )}

      {quizzes.map((quiz) => {
        const style = STATUS_STYLE[quiz.effectiveStatus];
        return (
          <button
            key={quiz.id}
            onClick={() => setSelected(quiz.id)}
            className="text-left rounded-2xl bg-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.995]"
            style={{ border: "1px solid rgba(0,0,0,0.06)" }}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="font-bold text-sm" style={{ color: "#0A0A0A" }}>{quiz.title}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: style.bg, color: style.color }}>{style.label}</span>
              </div>
              <p className="text-xs text-black/40 truncate">{[quiz.campaign, quiz.prize].filter(Boolean).join(" · ") || "No prize set"}</p>
              <p className="text-[11px] text-black/35 mt-1">
                {formatDateTime(quiz.startsAt)} → {formatDateTime(quiz.endsAt)}
              </p>
            </div>
            <div className="flex gap-4 shrink-0 text-xs tabular-nums text-black/50">
              <span><b className="text-black/80">{quiz.questionCount ?? 0}</b> questions</span>
              <span><b className="text-black/80">{quiz.entryCount ?? 0}</b> entries</span>
              <span><b className="text-black/80">{quiz.unreviewedCount ?? 0}</b> to mark</span>
              <span><b className="text-black/80">{quiz.winnerCount ?? 0}</b> winners</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
