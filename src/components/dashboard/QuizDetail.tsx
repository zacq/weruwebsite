"use client";

import { useCallback, useEffect, useState } from "react";
import QuizDetailsForm from "./QuizDetailsForm";
import QuizQuestionEditor from "./QuizQuestionEditor";
import QuizEntriesPanel from "./QuizEntriesPanel";
import { STATUS_STYLE, apiJson, formatDateTime, type DashQuestion, type DashQuiz } from "./quizTypes";

type Tab = "details" | "questions" | "entries";

export default function QuizDetail({ quizId, onBack }: { quizId: string; onBack: () => void }) {
  const [quiz, setQuiz] = useState<DashQuiz | null>(null);
  const [questions, setQuestions] = useState<DashQuestion[]>([]);
  const [tab, setTab] = useState<Tab>("details");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const data = await apiJson<{ quiz: DashQuiz; questions: DashQuestion[] }>(`/api/dashboard/quizzes/${quizId}`);
      setQuiz(data.quiz);
      setQuestions(data.questions);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load quiz");
    }
  }, [quizId]);

  useEffect(() => { load(); }, [load]);

  const patch = async (body: Record<string, unknown>, successMessage: string) => {
    setError(null);
    setNotice(null);
    try {
      const data = await apiJson<{ quiz: DashQuiz }>(`/api/dashboard/quizzes/${quizId}`, {
        method: "PATCH",
        body: JSON.stringify(body),
      });
      setQuiz(data.quiz);
      setNotice(successMessage);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this quiz and its questions? This cannot be undone.")) return;
    try {
      await apiJson(`/api/dashboard/quizzes/${quizId}`, { method: "DELETE" });
      onBack();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  };

  if (!quiz) {
    return error
      ? <div className="px-4 py-3 rounded-xl text-sm" style={{ background: "rgba(220,38,38,0.08)", color: "#b91c1c" }}>{error}</div>
      : <div className="h-56 rounded-2xl bg-white animate-pulse" style={{ border: "1px solid rgba(0,0,0,0.06)" }} />;
  }

  const style = STATUS_STYLE[quiz.effectiveStatus];
  const s = quiz.effectiveStatus;
  const btn = "text-xs font-semibold px-3 py-2 rounded-lg transition-all duration-150 active:scale-95";

  return (
    <div className="flex flex-col gap-4">
      <button onClick={onBack} className="self-start text-xs font-semibold text-black/50 hover:text-black/80 transition-colors">
        ← All quizzes
      </button>

      <div className="rounded-2xl bg-white p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center gap-4" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h2 className="font-bold text-lg tracking-tight" style={{ color: "#0A0A0A" }}>{quiz.title}</h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: style.bg, color: style.color }}>{style.label}</span>
          </div>
          <p className="text-xs text-black/45">{formatDateTime(quiz.startsAt)} → {formatDateTime(quiz.endsAt)}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {(s === "draft" || s === "archived") && (
            <button onClick={() => patch({ status: "published" }, "Published. It goes live at its start time.")} className={btn} style={{ background: "#15803d", color: "#fff" }}>
              Publish
            </button>
          )}
          {(s === "live" || s === "scheduled") && (
            <button onClick={() => patch({ status: "draft" }, "Unpublished — moved back to draft.")} className={btn} style={{ background: "rgba(0,0,0,0.05)" }}>
              Unpublish
            </button>
          )}
          {s === "live" && (
            <button
              onClick={() => window.confirm("Close this quiz now? It will stop accepting entries immediately.") && patch({ endsAt: new Date().toISOString() }, "Quiz closed.")}
              className={btn}
              style={{ background: "#b91c1c", color: "#fff" }}
            >
              Close now
            </button>
          )}
          {s === "closed" && (
            <button onClick={() => patch({ status: "archived" }, "Archived.")} className={btn} style={{ background: "rgba(0,0,0,0.05)" }}>
              Archive
            </button>
          )}
          {(s === "draft" || s === "archived") && (
            <button onClick={handleDelete} className={btn} style={{ color: "#b91c1c" }}>Delete</button>
          )}
        </div>
      </div>

      {error && <div className="px-4 py-3 rounded-xl text-sm" style={{ background: "rgba(220,38,38,0.08)", color: "#b91c1c" }}>{error}</div>}
      {notice && <div className="px-4 py-3 rounded-xl text-sm" style={{ background: "rgba(34,197,94,0.10)", color: "#15803d" }}>{notice}</div>}

      <div className="flex gap-1 p-1 rounded-xl self-start" style={{ background: "rgba(0,0,0,0.05)" }}>
        {(["details", "questions", "entries"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-150"
            style={{ background: tab === t ? "#fff" : "transparent", color: tab === t ? "#0A0A0A" : "rgba(0,0,0,0.5)", boxShadow: tab === t ? "0 1px 3px rgba(0,0,0,0.08)" : "none" }}
          >
            {t === "details" ? "Details" : t === "questions" ? `Questions (${questions.length})` : "Entries & draw"}
          </button>
        ))}
      </div>

      {tab === "details" && <QuizDetailsForm quiz={quiz} onSave={(body) => patch(body, "Saved.")} />}
      {tab === "questions" && (
        <QuizQuestionEditor
          quizId={quiz.id}
          questions={questions}
          isLive={s === "live"}
          onChange={setQuestions}
          onError={setError}
        />
      )}
      {tab === "entries" && <QuizEntriesPanel quiz={quiz} questions={questions} />}
    </div>
  );
}
