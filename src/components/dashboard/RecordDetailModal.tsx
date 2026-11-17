"use client";

import type { AirtableRecord } from "./types";

// `answer` is the current typed-answer format; `selected` is the old multiple-choice one.
// `correct` is null until staff mark the entry in Quiz Management.
type AnswerEntry = { question: string; answer?: string; selected?: string | null; correct: boolean | null };

const TONE = {
  true: { bg: "rgba(34,197,94,0.08)", border: "rgba(34,197,94,0.25)", text: "text-green-700", mark: "✓ " },
  false: { bg: "rgba(220,38,38,0.06)", border: "rgba(220,38,38,0.2)", text: "text-red-700", mark: "✗ " },
  null: { bg: "rgba(0,0,0,0.03)", border: "rgba(0,0,0,0.08)", text: "text-black/70", mark: "" },
};

type RecordDetailModalProps = {
  record: AirtableRecord;
  detailField: string;
  onClose: () => void;
};

export default function RecordDetailModal({ record, detailField, onClose }: RecordDetailModalProps) {
  const raw = record.fields[detailField];
  let answers: AnswerEntry[] = [];
  try {
    if (typeof raw === "string") answers = JSON.parse(raw);
  } catch {
    answers = [];
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-lg max-h-[85vh] sm:max-h-[80vh] overflow-y-auto rounded-2xl bg-white p-4 sm:p-6"
        style={{ boxShadow: "0 25px 60px rgba(0,0,0,0.35)" }}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="min-w-0">
            <h3 className="font-bold text-lg truncate" style={{ color: "#0A0A0A" }}>
              {String(record.fields.Name ?? "Entry")}
            </h3>
            <p className="text-xs text-black/40">{String(record.fields.Phone ?? "")}</p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 w-9 h-9 -mr-1.5 -mt-1 flex items-center justify-center rounded-full text-black/30 hover:text-black/70 hover:bg-black/5 active:scale-90 transition-all text-lg leading-none"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {answers.length === 0 ? (
          <p className="text-sm text-black/40">No answer breakdown available.</p>
        ) : (
          <>
          <ol className="flex flex-col gap-2.5">
            {answers.map((a, i) => {
              const tone = TONE[String(a.correct ?? null) as keyof typeof TONE];
              return (
                <li
                  key={i}
                  className="rounded-xl px-4 py-3 text-sm"
                  style={{ background: tone.bg, border: `1px solid ${tone.border}` }}
                >
                  <p className="font-medium mb-1" style={{ color: "#0A0A0A" }}>
                    {i + 1}. {a.question}
                  </p>
                  <p className={`${tone.text} whitespace-pre-wrap break-words`}>
                    {tone.mark}{a.answer ?? a.selected ?? "No answer"}
                  </p>
                </li>
              );
            })}
          </ol>
          {answers.some((a) => a.correct == null) && (
            <p className="mt-4 text-xs text-black/45">
              Not marked yet. Mark answers and view screenshots in Quiz Management → this quiz → Entries &amp; draw.
            </p>
          )}
          </>
        )}
      </div>
    </div>
  );
}
