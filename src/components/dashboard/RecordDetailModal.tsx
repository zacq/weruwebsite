"use client";

import type { AirtableRecord } from "./types";

type AnswerEntry = { question: string; selected: string | null; correct: boolean };

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
          <ol className="flex flex-col gap-2.5">
            {answers.map((a, i) => (
              <li
                key={i}
                className="rounded-xl px-4 py-3 text-sm"
                style={{
                  background: a.correct ? "rgba(34,197,94,0.08)" : "rgba(220,38,38,0.06)",
                  border: `1px solid ${a.correct ? "rgba(34,197,94,0.25)" : "rgba(220,38,38,0.2)"}`,
                }}
              >
                <p className="font-medium mb-1" style={{ color: "#0A0A0A" }}>
                  {i + 1}. {a.question}
                </p>
                <p className={a.correct ? "text-green-700" : "text-red-700"}>
                  {a.correct ? "✓" : "✗"} {a.selected ?? "No answer"}
                </p>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
