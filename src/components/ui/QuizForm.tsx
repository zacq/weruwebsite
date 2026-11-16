"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { QuizQuestion } from "@/lib/getActiveQuiz";

const MAX_SCREENSHOTS = 3;
const MAX_EDGE = 1600;

// Screenshots straight off a phone can be 5MB+. Downscale and re-encode on the
// device so uploads are fast on mobile data and fit the server's request limit.
async function compressImage(file: File): Promise<File> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.8));
  if (!blob) throw new Error("compress failed");
  return new File([blob], file.name.replace(/\.\w+$/, "") + ".jpg", { type: "image/jpeg" });
}

const labelClass = "block text-[10px] sm:text-[11px] font-bold tracking-widest uppercase mb-2";
const labelStyle = { color: "rgba(255,255,255,0.40)" };

export default function QuizForm({
  quizId,
  questions,
  prize,
  promoSection,
}: {
  quizId: string;
  questions: QuizQuestion[];
  prize: string | null;
  promoSection?: ReactNode;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [county, setCounty] = useState("");
  const [files, setFiles] = useState<{ file: File; url: string }[]>([]);
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<"entered" | "duplicate" | null>(null);
  const [error, setError] = useState("");

  const allAnswered = questions.every((q) => answers[q.id]?.trim());
  const canSubmit = allAnswered && name.trim() && phone.trim() && consent && !submitting;

  const addFiles = async (list: FileList | null) => {
    if (!list) return;
    setError("");
    const picked = Array.from(list).filter((f) => f.type.startsWith("image/")).slice(0, MAX_SCREENSHOTS - files.length);
    try {
      const compressed = await Promise.all(picked.map(compressImage));
      setFiles((prev) => [...prev, ...compressed.map((file) => ({ file, url: URL.createObjectURL(file) }))].slice(0, MAX_SCREENSHOTS));
    } catch {
      setError("Couldn't read one of those images — try a different screenshot.");
    }
  };

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    setError("");
    const body = new FormData();
    body.set("quizId", quizId);
    body.set("name", name.trim());
    body.set("phone", phone.trim());
    body.set("email", email.trim());
    body.set("county", county.trim());
    body.set("answers", JSON.stringify(questions.map((q) => ({ questionId: q.id, answer: answers[q.id] ?? "" }))));
    files.forEach((f) => body.append("screenshots", f.file));
    try {
      const res = await fetch("/api/quiz", { method: "POST", body });
      const data = await res.json().catch(() => ({}));
      if (res.ok) setDone("entered");
      else if (data?.duplicate) setDone("duplicate");
      else setError(data?.error || "Something went wrong. Please check your details and try again.");
    } catch {
      setError("Connection failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {!done ? (
        <motion.div key="form" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.22 }}>
          <div className="flex flex-col gap-4 sm:gap-5 mb-10">
            {questions.map((q, i) => (
              <div
                key={q.id}
                className="rounded-2xl p-4 sm:p-5"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  border: answers[q.id]?.trim() ? "1px solid rgba(250,204,21,0.45)" : "1px solid rgba(255,255,255,0.09)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 16px rgba(0,0,0,0.20)",
                }}
              >
                <p className="text-[10px] sm:text-[11px] font-extrabold tracking-widest uppercase mb-2" style={{ color: "#FACC15" }}>
                  Question {i + 1}{q.label ? ` — ${q.label}` : ""}
                </p>
                <p className="text-white font-semibold leading-snug mb-3" style={{ fontSize: "clamp(1rem, 2.6vw, 1.2rem)" }}>
                  {q.q}
                </p>
                <textarea
                  value={answers[q.id] ?? ""}
                  onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                  rows={2}
                  maxLength={500}
                  placeholder="Your answer"
                  className="form-input w-full resize-y"
                />
              </div>
            ))}
          </div>

          <h2 className="text-white font-bold leading-tight mb-5" style={{ fontSize: "clamp(1.2rem, 3.5vw, 1.8rem)" }}>
            Your details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-6">
            <div>
              <label className={labelClass} style={labelStyle}>Full name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="form-input w-full" autoComplete="name" />
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>Phone number</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g. 0712 345 678" className="form-input w-full" autoComplete="tel" />
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>Email (optional)</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="form-input w-full" autoComplete="email" />
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>County / town (optional)</label>
              <input type="text" value={county} onChange={(e) => setCounty(e.target.value)} placeholder="e.g. Meru" className="form-input w-full" autoComplete="address-level2" />
            </div>
          </div>

          <div className="mb-6">
            <label className={labelClass} style={labelStyle}>Screenshots of your findings (optional, up to {MAX_SCREENSHOTS})</label>
            <div className="flex flex-wrap gap-2.5">
              {files.map((f, i) => (
                <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.15)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f.url} alt={`Screenshot ${i + 1}`} className="w-full h-full object-cover" />
                  <button
                    onClick={() => setFiles((prev) => prev.filter((_, j) => j !== i))}
                    className="absolute top-1 right-1 w-5 h-5 rounded-full text-[10px] font-bold"
                    style={{ background: "rgba(0,0,0,0.7)", color: "#fff" }}
                    aria-label="Remove screenshot"
                  >
                    ✕
                  </button>
                </div>
              ))}
              {files.length < MAX_SCREENSHOTS && (
                <label
                  className="w-20 h-20 rounded-xl flex items-center justify-center text-2xl cursor-pointer transition-colors hover:border-[#FACC15]"
                  style={{ border: "1px dashed rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.45)" }}
                >
                  +
                  <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} />
                </label>
              )}
            </div>
          </div>

          <label className="flex items-start gap-3 mb-6 cursor-pointer">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 flex-shrink-0" />
            <span className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
              I agree to the campaign Terms and Conditions and consent to WERU DIGITAL using my contact details to administer this competition and contact me regarding my entry.
            </span>
          </label>

          {error && <p className="text-xs text-center mb-3" style={{ color: "#f97d00" }}>{error}</p>}
          {!allAnswered && <p className="text-xs text-center mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>Answer all {questions.length} questions to submit.</p>}

          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="w-full py-4 rounded-2xl text-black font-bold text-sm transition-all active:scale-[0.99] disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ background: "#FACC15" }}
          >
            {submitting ? "Submitting…" : "Submit my answers"}
          </button>
        </motion.div>
      ) : (
        <motion.div key="done" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>
          <div className="h-px w-full mb-8 sm:mb-10" style={{ background: "#FACC15" }} />
          <p className="text-[10px] sm:text-[11px] font-extrabold tracking-widest uppercase mb-5 sm:mb-6" style={{ color: "#FACC15" }}>
            {done === "duplicate" ? "Already entered" : "Entry received"}
          </p>
          <h2 className="text-white font-bold leading-tight mb-4" style={{ fontSize: "clamp(1.35rem, 4vw, 2.4rem)" }}>
            {done === "duplicate" ? "You've already entered this week." : "Your answers are in!"}
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.40)" }}>
            {done === "duplicate"
              ? "Only one entry per phone number per quiz. Come back for next week's quiz!"
              : `Thanks for playing! Our team will check your answers after the quiz closes. Get every answer right and you're in the draw${prize ? ` for ${prize}` : ""}. Winners will be contacted directly and announced on WERU DIGITAL.`}
          </p>
          {done === "entered" && promoSection}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
