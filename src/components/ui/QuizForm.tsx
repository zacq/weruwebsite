"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QUESTIONS = [
  {
    q: "When did Weru TV start broadcasting?",
    options: ["2012", "2016", "2014"],
    correct: 1,
  },
  {
    q: "What is Amerucan Extravaganza?",
    options: ["Weru TV 1st Anniversary", "A weekly music variety show", "A talent search competition"],
    correct: 0,
  },
  {
    q: "Which stand-up comedy show once featured on Weru TV?",
    options: ["Churchill Show", "Laugh Factory Live", "Tuune Mbaru"],
    correct: 2,
  },
  {
    q: "Name three drama shows that aired on Weru TV.",
    options: [
      "Witho, Kaiguetie, Chibu Nkobotia",
      "Selina, Zora & Makutano Junction",
      "Tahidi High, Imenti & Wendo",
    ],
    correct: 0,
  },
  {
    q: "Who hosts the Gikaro show on Weru TV?",
    options: ["James Mwangi", "John Kamau", "Stella Karimi Kaunty"],
    correct: 2,
  },
  {
    q: "Who paired with Phineas Imaana for news bulletins in 2017?",
    options: ["Mary Wanjiku", "Maureen Kinya", "Anne Wairimu"],
    correct: 1,
  },
  {
    q: "When does Gaaru E Ciaca air?",
    options: ["Thursday 8.20 PM", "Sundays at 8:00 PM", "Saturdays at 7:00 PM"],
    correct: 0,
  },
  {
    q: "Who hosts Gichunki Gia Ciaca?",
    options: ["Martin Gichunge", "Joseph Mwangi", "David Kamau"],
    correct: 0,
  },
  {
    q: "Where is Weru TV located?",
    options: ["Nairobi CBD", "Nyeri Town", "Kirogine, Meru"],
    correct: 2,
  },
  {
    q: "Name the first two hosts of Reggamania.",
    options: ["DJ Roots & MC Fire", "Empress Rita & Selector Prince", "Sipho & Reggae Dan"],
    correct: 1,
  },
];

type Phase = "quiz" | "contact" | "done";

export default function QuizForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(10).fill(null));
  const [phase, setPhase] = useState<Phase>("quiz");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const selectAnswer = (i: number) =>
    setAnswers((prev) => { const n = [...prev]; n[step] = i; return n; });

  const handleNext = () => step < 9 ? setStep((s) => s + 1) : setPhase("contact");
  const handleBack = () => step > 0 && setStep((s) => s - 1);

  const score = answers.filter((a, i) => a === QUESTIONS[i].correct).length;

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim()) return;
    setSubmitting(true);
    try {
      await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          answers: answers.map((a, i) => ({
            question: QUESTIONS[i].q,
            selected: a !== null ? QUESTIONS[i].options[a] : null,
            correct: a === QUESTIONS[i].correct,
          })),
          score,
        }),
      });
    } finally {
      setSubmitting(false);
      setPhase("done");
    }
  };

  const current = QUESTIONS[step];

  return (
    <AnimatePresence mode="wait">

      {/* ── Quiz phase ── */}
      {phase === "quiz" && (
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.22 }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <span className="text-[10px] sm:text-[11px] font-extrabold tracking-widest uppercase" style={{ color: "#FACC15" }}>
              Weru TV History
            </span>
            <span className="text-xs sm:text-sm font-semibold tabular-nums" style={{ color: "rgba(255,255,255,0.35)" }}>
              {step + 1}&thinsp;/&thinsp;10
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-px w-full mb-8 sm:mb-10 overflow-hidden" style={{ background: "rgba(255,255,255,0.10)" }}>
            <motion.div
              className="h-full"
              style={{ background: "#FACC15" }}
              initial={false}
              animate={{ width: `${((step + 1) / 10) * 100}%` }}
              transition={{ type: "spring", stiffness: 180, damping: 26 }}
            />
          </div>

          {/* Question */}
          <h2
            className="text-white font-bold leading-tight mb-7 sm:mb-10"
            style={{ fontSize: "clamp(1.35rem, 4vw, 2.4rem)" }}
          >
            {current.q}
          </h2>

          {/* Options — glass treatment per CLAUDE.md pattern */}
          <div className="flex flex-col gap-2.5 sm:gap-3 mb-8 sm:mb-12">
            {current.options.map((opt, i) => {
              const selected = answers[step] === i;
              return (
                <button
                  key={i}
                  onClick={() => selectAnswer(i)}
                  className="flex items-center gap-3 sm:gap-5 w-full px-4 sm:px-5 py-3.5 sm:py-4 rounded-2xl text-left transition-all duration-150"
                  style={{
                    background: selected ? "rgba(250,204,21,0.08)" : "rgba(255,255,255,0.04)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    border: selected ? "1px solid #FACC15" : "1px solid rgba(255,255,255,0.09)",
                    boxShadow: selected
                      ? "inset 0 1px 0 rgba(250,204,21,0.15), 0 0 24px rgba(250,204,21,0.10), 0 4px 16px rgba(0,0,0,0.25)"
                      : "inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 16px rgba(0,0,0,0.20)",
                  }}
                >
                  {/* Number circle */}
                  <span
                    className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-150"
                    style={{
                      border: selected ? "1.5px solid #FACC15" : "1.5px solid rgba(255,255,255,0.18)",
                      color: selected ? "#FACC15" : "rgba(255,255,255,0.35)",
                      background: selected ? "rgba(250,204,21,0.12)" : "transparent",
                    }}
                  >
                    {i + 1}
                  </span>

                  {/* Option text */}
                  <span
                    className="text-sm sm:text-base font-medium transition-colors duration-150 flex-1"
                    style={{ color: selected ? "#FACC15" : "rgba(255,255,255,0.75)" }}
                  >
                    {opt}
                  </span>

                  {/* Checkmark */}
                  {selected && (
                    <motion.span
                      className="ml-auto text-sm font-bold flex-shrink-0"
                      style={{ color: "#FACC15" }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                      ✓
                    </motion.span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-4">
            {step > 0 && (
              <button
                onClick={handleBack}
                className="text-sm font-semibold py-3 px-2 transition-colors duration-150"
                style={{ color: "rgba(255,255,255,0.35)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.70)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
              >
                ← Back
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={answers[step] === null}
              className="ml-auto px-6 sm:px-8 py-3.5 rounded-2xl text-black font-bold text-sm transition-all disabled:opacity-25 disabled:cursor-not-allowed"
              style={{ background: "#FACC15" }}
            >
              {step < 9 ? "Next →" : "Finish →"}
            </button>
          </div>
        </motion.div>
      )}

      {/* ── Contact phase ── */}
      {phase === "contact" && (
        <motion.div
          key="contact"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.22 }}
        >
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <span className="text-[10px] sm:text-[11px] font-extrabold tracking-widest uppercase" style={{ color: "#FACC15" }}>
              Almost there
            </span>
            <span className="text-xs sm:text-sm font-semibold tabular-nums" style={{ color: "rgba(255,255,255,0.35)" }}>
              10&thinsp;/&thinsp;10 ✓
            </span>
          </div>

          <div className="h-px w-full mb-8 sm:mb-10" style={{ background: "#FACC15" }} />

          <h2
            className="text-white font-bold leading-tight mb-3 sm:mb-4"
            style={{ fontSize: "clamp(1.35rem, 4vw, 2.4rem)" }}
          >
            Enter your details to complete your entry.
          </h2>
          <p className="text-sm mb-8 sm:mb-10" style={{ color: "rgba(255,255,255,0.40)" }}>
            All entries go into the draw — winners announced on Weru TV &amp; FM.
          </p>

          <div className="flex flex-col gap-4 sm:gap-5 mb-7 sm:mb-8">
            <div>
              <label className="block text-[10px] sm:text-[11px] font-bold tracking-widest uppercase mb-2" style={{ color: "rgba(255,255,255,0.40)" }}>
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="form-input w-full"
                autoComplete="name"
              />
            </div>
            <div>
              <label className="block text-[10px] sm:text-[11px] font-bold tracking-widest uppercase mb-2" style={{ color: "rgba(255,255,255,0.40)" }}>
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 0712 345 678"
                className="form-input w-full"
                autoComplete="tel"
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!name.trim() || !phone.trim() || submitting}
            className="w-full py-4 rounded-2xl text-black font-bold text-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ background: "#FACC15" }}
          >
            {submitting ? "Submitting…" : "Submit My Entry"}
          </button>

          <p className="text-xs text-center mt-4" style={{ color: "rgba(255,255,255,0.22)" }}>
            All entries go into the draw. Winners announced on Weru TV &amp; FM.
          </p>
        </motion.div>
      )}

      {/* ── Done phase ── */}
      {phase === "done" && (
        <motion.div
          key="done"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28 }}
        >
          <div className="h-px w-full mb-8 sm:mb-10" style={{ background: "#FACC15" }} />

          <p className="text-[10px] sm:text-[11px] font-extrabold tracking-widest uppercase mb-5 sm:mb-6" style={{ color: "#FACC15" }}>
            Entry received
          </p>

          <h2
            className="text-white font-bold leading-tight mb-4"
            style={{ fontSize: "clamp(1.35rem, 4vw, 2.4rem)" }}
          >
            You&apos;re in the draw!
          </h2>

          <p className="text-sm sm:text-base mb-3" style={{ color: "rgba(255,255,255,0.50)" }}>
            You scored{" "}
            <span className="font-bold" style={{ color: "#FACC15" }}>{score} out of 10</span>.
          </p>

          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.40)" }}>
            Thank you for entering the Castle Escape draw. Winners will be contacted directly and announced on Weru TV &amp; FM. Good luck!
          </p>
        </motion.div>
      )}

    </AnimatePresence>
  );
}
