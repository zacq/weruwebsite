"use client";

import { useCallback, useEffect, useState } from "react";
import QuizQuestionEditor from "./QuizQuestionEditor";

type Quiz = {
  id: string;
  fields: { Title?: string; Prize?: string; Status?: "Draft" | "Active" | "Archived" };
};

type Question = {
  id: string;
  fields: { Question?: string; Options?: string; "Correct Answer"?: string; Order?: number; Quiz?: string[] };
};

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  Active:   { bg: "rgba(34,197,94,0.12)", color: "#15803d" },
  Draft:    { bg: "rgba(249,125,0,0.12)", color: "#c2650a" },
  Archived: { bg: "rgba(0,0,0,0.06)",     color: "rgba(0,0,0,0.45)" },
};

export default function QuizManagementPanel() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newPrize, setNewPrize] = useState("");

  const fetchAll = useCallback(async () => {
    setError(null);
    try {
      const [quizRes, qRes] = await Promise.all([
        fetch("/api/dashboard/quizzes", { cache: "no-store" }),
        fetch("/api/dashboard/quiz-questions", { cache: "no-store" }),
      ]);
      if (!quizRes.ok || !qRes.ok) throw new Error("Failed to load quiz data");
      const quizData = await quizRes.json();
      const qData = await qRes.json();
      setQuizzes(quizData.records ?? []);
      setQuestions(qData.records ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load quiz data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const questionsFor = (quizId: string) =>
    questions.filter((q) => q.fields.Quiz?.includes(quizId));

  const handleCreate = async () => {
    if (!newTitle.trim() || !newPrize.trim()) return;
    try {
      const res = await fetch("/api/dashboard/quizzes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle.trim(), prize: newPrize.trim() }),
      });
      if (!res.ok) throw new Error();
      const created = await res.json();
      setQuizzes((prev) => [...prev, created]);
      setNewTitle("");
      setNewPrize("");
      setCreating(false);
      setExpanded(created.id);
    } catch {
      setError("Failed to create quiz.");
    }
  };

  const handleStatusChange = async (quizId: string, status: string) => {
    setQuizzes((prev) =>
      prev.map((q) => {
        if (q.id === quizId) return { ...q, fields: { ...q.fields, Status: status as Quiz["fields"]["Status"] } };
        if (status === "Active" && q.fields.Status === "Active") return { ...q, fields: { ...q.fields, Status: "Archived" } };
        return q;
      })
    );
    try {
      const res = await fetch(`/api/dashboard/quizzes/${quizId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setError("Failed to update quiz status — refresh to see the current state.");
    }
  };

  if (loading) {
    return <div className="h-56 rounded-2xl bg-white animate-pulse" style={{ border: "1px solid rgba(0,0,0,0.06)" }} />;
  }

  return (
    <div className="flex flex-col gap-4">
      {error && (
        <div className="px-4 py-3 rounded-xl text-sm" style={{ background: "rgba(220,38,38,0.08)", color: "#b91c1c" }}>
          {error}
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={() => setCreating((c) => !c)}
          className="text-xs font-semibold px-3.5 py-2 rounded-lg text-white transition-all duration-150 active:scale-95"
          style={{ background: "#f97d00", boxShadow: "0 2px 10px rgba(249,125,0,0.25)" }}
        >
          {creating ? "Cancel" : "+ New Quiz"}
        </button>
      </div>

      {creating && (
        <div className="rounded-2xl bg-white p-4 sm:p-5 flex flex-col gap-3" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
          <input
            type="text"
            placeholder="Quiz title (e.g. Twine Cietu SN2)"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="text-sm px-3 py-2.5 rounded-lg"
            style={{ border: "1px solid rgba(0,0,0,0.15)" }}
          />
          <input
            type="text"
            placeholder="Prize (e.g. KSh 5,000 shopping voucher plus a visit to the Weru Studios)"
            value={newPrize}
            onChange={(e) => setNewPrize(e.target.value)}
            className="text-sm px-3 py-2.5 rounded-lg"
            style={{ border: "1px solid rgba(0,0,0,0.15)" }}
          />
          <button
            onClick={handleCreate}
            disabled={!newTitle.trim() || !newPrize.trim()}
            className="self-start text-xs font-semibold px-4 py-2.5 rounded-lg text-white disabled:opacity-40"
            style={{ background: "#0A0A0A" }}
          >
            Create draft quiz
          </button>
        </div>
      )}

      {quizzes.length === 0 && !creating && (
        <p className="text-sm text-black/30 py-8 text-center">No quizzes yet. Click "+ New Quiz" to create one.</p>
      )}

      {quizzes.map((quiz) => {
        const qs = questionsFor(quiz.id);
        const status = quiz.fields.Status ?? "Draft";
        const style = STATUS_STYLE[status];
        const isComplete = qs.length === 10;
        const isExpanded = expanded === quiz.id;

        return (
          <div key={quiz.id} className="rounded-2xl bg-white overflow-hidden" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
            <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="font-bold text-sm" style={{ color: "#0A0A0A" }}>{quiz.fields.Title || "Untitled quiz"}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={style}>{status}</span>
                  <span className="text-[10px] font-semibold tabular-nums" style={{ color: isComplete ? "#15803d" : "#c2650a" }}>
                    {qs.length}/10 questions
                  </span>
                </div>
                <p className="text-xs text-black/40 truncate">{quiz.fields.Prize}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setExpanded(isExpanded ? null : quiz.id)}
                  className="text-xs font-semibold px-3 py-2 rounded-lg transition-opacity hover:opacity-70"
                  style={{ background: "rgba(0,0,0,0.05)", color: "#0A0A0A" }}
                >
                  {isExpanded ? "Hide questions" : "Edit questions"}
                </button>
                {status !== "Active" && (
                  <button
                    onClick={() => handleStatusChange(quiz.id, "Active")}
                    disabled={!isComplete}
                    title={isComplete ? "Make this the live quiz" : "Needs exactly 10 questions to activate"}
                    className="text-xs font-semibold px-3 py-2 rounded-lg text-white disabled:opacity-30"
                    style={{ background: "#15803d" }}
                  >
                    Activate
                  </button>
                )}
                {status !== "Archived" && (
                  <button
                    onClick={() => handleStatusChange(quiz.id, "Archived")}
                    className="text-xs font-semibold px-3 py-2 rounded-lg transition-opacity hover:opacity-70"
                    style={{ background: "rgba(0,0,0,0.05)", color: "rgba(0,0,0,0.55)" }}
                  >
                    Archive
                  </button>
                )}
              </div>
            </div>

            {isExpanded && (
              <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                <QuizQuestionEditor
                  quizId={quiz.id}
                  questions={qs}
                  onChange={(next) =>
                    setQuestions((prev) => [...prev.filter((q) => !q.fields.Quiz?.includes(quiz.id)), ...next])
                  }
                  onError={setError}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
