"use client";

import { useState } from "react";
import { apiJson, type DashQuestion } from "./quizTypes";

type Props = {
  quizId: string;
  questions: DashQuestion[];
  isLive: boolean;
  onChange: (next: DashQuestion[]) => void;
  onError: (msg: string) => void;
};

const MAX_QUESTIONS = 20;

export default function QuizQuestionEditor({ quizId, questions, isLive, onChange, onError }: Props) {
  const [busy, setBusy] = useState<string | null>(null);
  const sorted = [...questions].sort((a, b) => a.position - b.position);

  const save = async (id: string, patch: Partial<Pick<DashQuestion, "label" | "question" | "answerKey">>) => {
    setBusy(id);
    try {
      const { question } = await apiJson<{ question: DashQuestion }>(`/api/dashboard/quiz-questions/${id}`, {
        method: "PATCH",
        body: JSON.stringify(patch),
      });
      onChange(questions.map((q) => (q.id === id ? question : q)));
    } catch (err) {
      onError(err instanceof Error ? err.message : "Failed to save question");
    } finally {
      setBusy(null);
    }
  };

  const handleAdd = async () => {
    setBusy("new");
    try {
      const { question } = await apiJson<{ question: DashQuestion }>(`/api/dashboard/quizzes/${quizId}/questions`, {
        method: "POST",
        body: JSON.stringify({ question: "New question" }),
      });
      onChange([...questions, question]);
    } catch (err) {
      onError(err instanceof Error ? err.message : "Failed to add question");
    } finally {
      setBusy(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this question? This cannot be undone.")) return;
    setBusy(id);
    try {
      await apiJson(`/api/dashboard/quiz-questions/${id}`, { method: "DELETE" });
      onChange(questions.filter((q) => q.id !== id));
    } catch (err) {
      onError(err instanceof Error ? err.message : "Failed to delete question");
    } finally {
      setBusy(null);
    }
  };

  const handleMove = async (index: number, dir: -1 | 1) => {
    if (!sorted[index + dir]) return;
    const reordered = [...sorted];
    [reordered[index], reordered[index + dir]] = [reordered[index + dir], reordered[index]];
    const next = reordered.map((q, i) => ({ ...q, position: i + 1 }));
    onChange(next);
    try {
      await apiJson(`/api/dashboard/quizzes/${quizId}/questions`, {
        method: "PUT",
        body: JSON.stringify({ order: next.map((q) => q.id) }),
      });
    } catch (err) {
      onError(err instanceof Error ? err.message : "Failed to reorder — refresh to see the current state");
    }
  };

  return (
    <div className="rounded-2xl bg-white p-4 sm:p-5 flex flex-col gap-3" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
      <p className="text-xs text-black/45">
        Participants type their answers. The answer key is only visible to staff and is shown next to each entry when marking.
      </p>
      {isLive && (
        <p className="text-xs px-3 py-2 rounded-lg" style={{ background: "rgba(249,125,0,0.10)", color: "#c2650a" }}>
          This quiz is live. Editing a question changes what new participants see — existing entries keep the wording they answered.
        </p>
      )}

      {sorted.map((q, i) => (
        <QuestionRow
          key={q.id}
          index={i}
          total={sorted.length}
          question={q}
          busy={busy === q.id}
          onSave={(patch) => save(q.id, patch)}
          onDelete={() => handleDelete(q.id)}
          onMoveUp={() => handleMove(i, -1)}
          onMoveDown={() => handleMove(i, 1)}
        />
      ))}

      <button
        onClick={handleAdd}
        disabled={sorted.length >= MAX_QUESTIONS || busy === "new"}
        className="self-start text-xs font-semibold px-3.5 py-2 rounded-lg text-white disabled:opacity-30 transition-all active:scale-95"
        style={{ background: "#0A0A0A" }}
      >
        + Add question
      </button>
    </div>
  );
}

function QuestionRow({
  index, total, question, busy, onSave, onDelete, onMoveUp, onMoveDown,
}: {
  index: number;
  total: number;
  question: DashQuestion;
  busy: boolean;
  onSave: (patch: Partial<Pick<DashQuestion, "label" | "question" | "answerKey">>) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  const [label, setLabel] = useState(question.label ?? "");
  const [text, setText] = useState(question.question);
  const [answerKey, setAnswerKey] = useState(question.answerKey ?? "");

  const field = "text-sm px-2.5 py-2 rounded-lg min-w-0";
  const border = { border: "1px solid rgba(0,0,0,0.12)" };

  return (
    <div className="rounded-xl p-3.5 flex gap-2.5" style={{ border: "1px solid rgba(0,0,0,0.08)", opacity: busy ? 0.6 : 1 }}>
      <div className="flex flex-col items-center shrink-0 gap-1 pt-1">
        <button onClick={onMoveUp} disabled={index === 0} className="text-[10px] leading-none px-1 disabled:opacity-20">▲</button>
        <span className="text-[10px] font-bold tabular-nums text-black/35">Q{index + 1}</span>
        <button onClick={onMoveDown} disabled={index === total - 1} className="text-[10px] leading-none px-1 disabled:opacity-20">▼</button>
      </div>
      <div className="flex-1 flex flex-col gap-2 min-w-0">
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onBlur={() => label !== (question.label ?? "") && onSave({ label })}
          placeholder="Short label (optional) — e.g. The popularity test"
          className={`${field} text-xs`}
          style={border}
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={() => text !== question.question && onSave({ question: text })}
          rows={2}
          placeholder="Question"
          className={field}
          style={border}
        />
        <textarea
          value={answerKey}
          onChange={(e) => setAnswerKey(e.target.value)}
          onBlur={() => answerKey !== (question.answerKey ?? "") && onSave({ answerKey })}
          rows={2}
          placeholder="Answer key (staff only) — what counts as correct"
          className={field}
          style={{ border: "1px solid rgba(34,197,94,0.35)", background: "rgba(34,197,94,0.04)" }}
        />
      </div>
      <button onClick={onDelete} className="self-start text-xs font-semibold text-red-600 shrink-0 px-2 py-1.5 hover:opacity-70">Delete</button>
    </div>
  );
}
