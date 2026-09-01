"use client";

import { useState } from "react";

type Question = {
  id: string;
  fields: { Question?: string; Options?: string; "Correct Answer"?: string; Order?: number; Quiz?: string[] };
};

type Props = {
  quizId: string;
  questions: Question[];
  onChange: (next: Question[]) => void;
  onError: (msg: string) => void;
};

function toOptions(raw?: string): string[] {
  return (raw ?? "").split("\n").map((o) => o.trim()).filter(Boolean);
}

export default function QuizQuestionEditor({ quizId, questions, onChange, onError }: Props) {
  const [busy, setBusy] = useState<string | null>(null);
  const sorted = [...questions].sort((a, b) => (a.fields.Order ?? 0) - (b.fields.Order ?? 0));

  const patchQuestion = async (id: string, patch: Record<string, unknown>) => {
    setBusy(id);
    try {
      const res = await fetch(`/api/dashboard/quiz-questions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      onChange(questions.map((q) => (q.id === id ? updated : q)));
    } catch {
      onError("Failed to save question — refresh to see the current state.");
    } finally {
      setBusy(null);
    }
  };

  const saveQuestion = (q: Question, questionText: string, options: string[], correctIndex: number) => {
    const cleanOptions = options.map((o) => o.trim()).filter(Boolean);
    const correctAnswer = cleanOptions[correctIndex] ?? cleanOptions[0];
    patchQuestion(q.id, { question: questionText, options: cleanOptions, correctAnswer });
  };

  const handleAddQuestion = async () => {
    if (sorted.length >= 10) return;
    const nextOrder = (sorted[sorted.length - 1]?.fields.Order ?? 0) + 1;
    setBusy("new");
    try {
      const res = await fetch("/api/dashboard/quiz-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quizId,
          question: "New question",
          options: ["Option A", "Option B"],
          correctAnswer: "Option A",
          order: nextOrder,
        }),
      });
      if (!res.ok) throw new Error();
      const created = await res.json();
      onChange([...questions, created]);
    } catch {
      onError("Failed to add question.");
    } finally {
      setBusy(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this question? This cannot be undone.")) return;
    setBusy(id);
    try {
      const res = await fetch(`/api/dashboard/quiz-questions/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      onChange(questions.filter((q) => q.id !== id));
    } catch {
      onError("Failed to delete question.");
    } finally {
      setBusy(null);
    }
  };

  const handleMove = async (index: number, dir: -1 | 1) => {
    const target = sorted[index + dir];
    const current = sorted[index];
    if (!target) return;
    const currentOrder = current.fields.Order ?? 0;
    const targetOrder = target.fields.Order ?? 0;
    setBusy(current.id);
    try {
      const [r1, r2] = await Promise.all([
        fetch(`/api/dashboard/quiz-questions/${current.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order: targetOrder }),
        }),
        fetch(`/api/dashboard/quiz-questions/${target.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order: currentOrder }),
        }),
      ]);
      if (!r1.ok || !r2.ok) throw new Error();
      const [u1, u2] = await Promise.all([r1.json(), r2.json()]);
      onChange(questions.map((q) => (q.id === u1.id ? u1 : q.id === u2.id ? u2 : q)));
    } catch {
      onError("Failed to reorder questions — refresh to see the current state.");
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="p-4 sm:p-5 flex flex-col gap-3" style={{ background: "rgba(0,0,0,0.015)" }}>
      {sorted.map((q, i) => (
        <QuestionRow
          key={q.id}
          index={i}
          total={sorted.length}
          question={q}
          busy={busy === q.id}
          onSave={(text, options, correctIndex) => saveQuestion(q, text, options, correctIndex)}
          onDelete={() => handleDelete(q.id)}
          onMoveUp={() => handleMove(i, -1)}
          onMoveDown={() => handleMove(i, 1)}
        />
      ))}

      <button
        onClick={handleAddQuestion}
        disabled={sorted.length >= 10 || busy === "new"}
        className="self-start text-xs font-semibold px-3.5 py-2 rounded-lg text-white disabled:opacity-30"
        style={{ background: "#0A0A0A" }}
      >
        {sorted.length >= 10 ? "10/10 questions — full" : "+ Add question"}
      </button>
    </div>
  );
}

function QuestionRow({
  index, total, question, busy, onSave, onDelete, onMoveUp, onMoveDown,
}: {
  index: number;
  total: number;
  question: Question;
  busy: boolean;
  onSave: (text: string, options: string[], correctIndex: number) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  const initialOptions = toOptions(question.fields.Options);
  const [text, setText] = useState(question.fields.Question ?? "");
  const [options, setOptions] = useState<string[]>(initialOptions.length ? initialOptions : ["", ""]);
  const [correctIndex, setCorrectIndex] = useState(
    Math.max(0, initialOptions.indexOf(question.fields["Correct Answer"] ?? ""))
  );

  const commit = (nextOptions = options, nextCorrect = correctIndex, nextText = text) =>
    onSave(nextText, nextOptions, nextCorrect);

  return (
    <div
      className="rounded-xl p-3.5 flex flex-col gap-2.5"
      style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", opacity: busy ? 0.6 : 1 }}
    >
      <div className="flex items-center gap-2">
        <div className="flex flex-col shrink-0">
          <button onClick={onMoveUp} disabled={index === 0} className="text-[10px] leading-none px-1 disabled:opacity-20" style={{ color: "#0A0A0A" }}>▲</button>
          <button onClick={onMoveDown} disabled={index === total - 1} className="text-[10px] leading-none px-1 disabled:opacity-20" style={{ color: "#0A0A0A" }}>▼</button>
        </div>
        <span className="text-[10px] font-bold tabular-nums shrink-0" style={{ color: "rgba(0,0,0,0.35)" }}>Q{index + 1}</span>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={() => commit()}
          placeholder="Question text"
          className="flex-1 text-sm px-2.5 py-2 rounded-lg min-w-0"
          style={{ border: "1px solid rgba(0,0,0,0.12)" }}
        />
        <button onClick={onDelete} className="text-xs font-semibold text-red-600 shrink-0 px-2 py-1.5">Delete</button>
      </div>

      <div className="flex flex-col gap-1.5 pl-8">
        {options.map((opt, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="radio"
              name={`correct-${question.id}`}
              checked={correctIndex === i}
              onChange={() => { setCorrectIndex(i); commit(options, i); }}
              title="Mark as correct answer"
            />
            <input
              type="text"
              value={opt}
              onChange={(e) => setOptions((prev) => prev.map((o, j) => (j === i ? e.target.value : o)))}
              onBlur={() => commit()}
              placeholder={`Option ${i + 1}`}
              className="flex-1 text-xs px-2.5 py-1.5 rounded-lg min-w-0"
              style={{ border: "1px solid rgba(0,0,0,0.10)" }}
            />
            {options.length > 2 && (
              <button
                onClick={() => {
                  const next = options.filter((_, j) => j !== i);
                  const nextCorrect = correctIndex === i ? 0 : correctIndex > i ? correctIndex - 1 : correctIndex;
                  setOptions(next);
                  setCorrectIndex(nextCorrect);
                  commit(next, nextCorrect);
                }}
                className="text-[11px] shrink-0 px-1.5"
                style={{ color: "rgba(0,0,0,0.35)" }}
              >
                ✕
              </button>
            )}
          </div>
        ))}
        {options.length < 4 && (
          <button
            onClick={() => setOptions((prev) => [...prev, ""])}
            className="self-start text-[11px] font-semibold px-2 py-1"
            style={{ color: "#f97d00" }}
          >
            + Add option
          </button>
        )}
      </div>
    </div>
  );
}
