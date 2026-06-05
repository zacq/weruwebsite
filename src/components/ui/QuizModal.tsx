"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Dummy answers — replace correct index per question when real answers arrive
const QUESTIONS = [
  {
    q: "When did Weru TV start broadcasting?",
    options: ["2012", "2016", "2014"],
    correct: 1,
  },
  {
    q: "What is American Extravaganza?",
    options: ["A weekly music variety show", "A travel documentary series", "A morning talk show"],
    correct: 0,
  },
  {
    q: "Which stand-up comedy show once featured on Weru TV?",
    options: ["Churchill Show", "Laugh Factory Live", "Comedy Masala"],
    correct: 1,
  },
  {
    q: "Name three drama shows that aired on Weru TV.",
    options: [
      "Tahidi High, Imenti & Wendo",
      "Selina, Zora & Makutano Junction",
      "Mwisho wa Lami, Papa Shirandula & Inspekta Mwala",
    ],
    correct: 0,
  },
  {
    q: "Who hosts the Gikaro show on Weru TV?",
    options: ["James Mwangi", "John Kamau", "Peter Njoroge"],
    correct: 1,
  },
  {
    q: "Who paired with Phineas Imaana for news bulletins in 2017?",
    options: ["Mary Wanjiku", "Grace Wanjiru", "Anne Wairimu"],
    correct: 2,
  },
  {
    q: "When does Gaaru E Ciaca air?",
    options: ["Weekdays at 6:00 PM", "Sundays at 8:00 PM", "Saturdays at 7:00 PM"],
    correct: 0,
  },
  {
    q: "Who hosts Gichunki Gia Ciaca?",
    options: ["Samuel Gitau", "Joseph Mwangi", "David Kamau"],
    correct: 1,
  },
  {
    q: "Where is Weru TV located?",
    options: ["Nairobi CBD", "Nyeri Town", "Meru Town"],
    correct: 1,
  },
  {
    q: "Name the first two hosts of Reggamania.",
    options: ["DJ Roots & MC Fire", "Ras Kimani & Mama Africa", "Sipho & Reggae Dan"],
    correct: 1,
  },
];

type Phase = "quiz" | "contact" | "done";

export default function QuizModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(10).fill(null));
  const [phase, setPhase] = useState<Phase>("quiz");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleOpen = () => {
    setStep(0);
    setAnswers(Array(10).fill(null));
    setPhase("quiz");
    setName("");
    setPhone("");
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const selectAnswer = (optionIndex: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[step] = optionIndex;
      return next;
    });
  };

  const handleNext = () => {
    if (step < 9) {
      setStep((s) => s + 1);
    } else {
      setPhase("contact");
    }
  };

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

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
    <>
      {/* Floating button — bottom-left, always visible */}
      <motion.button
        onClick={handleOpen}
        aria-label="Open quiz: 10 for 10 Castle Escape"
        className="fixed bottom-6 md:bottom-8 left-4 md:left-8 z-50 flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 text-black font-bold text-sm"
        style={{
          background: "#FACC15",
          borderRadius: "9999px",
          boxShadow: "0 0 28px rgba(250,204,21,0.55), 0 6px 20px rgba(0,0,0,0.4)",
          marginBottom: "env(safe-area-inset-bottom, 0px)",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 300, damping: 22 }}
        whileHover={{ scale: 1.07, boxShadow: "0 0 42px rgba(250,204,21,0.75), 0 6px 24px rgba(0,0,0,0.4)" }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-base" aria-hidden>🏆</span>
        <span>10 for 10</span>
      </motion.button>

      {/* Modal overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

            {/* Card */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="10 for 10: Castle Escape Quiz"
              className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl"
              style={{
                background: "rgba(10,10,10,0.97)",
                border: "1px solid rgba(250,204,21,0.22)",
                boxShadow: "0 0 60px rgba(250,204,21,0.1), 0 25px 60px rgba(0,0,0,0.65)",
              }}
              initial={{ scale: 0.9, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 24 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
            >
              {/* Sticky header */}
              <div
                className="sticky top-0 px-6 pt-6 pb-4 z-10"
                style={{ background: "rgba(10,10,10,0.97)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-white/30 hover:text-white/80 transition-colors text-lg leading-none p-1"
                  aria-label="Close quiz"
                >
                  ✕
                </button>

                <div className="flex items-center gap-2.5 mb-0.5">
                  <span className="text-2xl" aria-hidden>🏆</span>
                  <h2 className="text-white font-bold text-lg leading-tight">10 for 10: Castle Escape</h2>
                </div>
                <p className="text-white/45 text-xs mb-4 pl-9">
                  10 questions · 10 years · Win a night at Tafaria Castle
                </p>

                {phase === "quiz" && (
                  <>
                    <div className="h-1 w-full rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: "#FACC15" }}
                        initial={false}
                        animate={{ width: `${((step + 1) / 10) * 100}%` }}
                        transition={{ type: "spring", stiffness: 200, damping: 28 }}
                      />
                    </div>
                    <p className="text-white/35 text-xs mt-1.5">Question {step + 1} of 10</p>
                  </>
                )}
              </div>

              {/* Body */}
              <div className="px-6 pt-5 pb-6">
                <AnimatePresence mode="wait">

                  {/* ── Quiz phase ── */}
                  {phase === "quiz" && (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -18 }}
                      transition={{ duration: 0.18 }}
                    >
                      <p className="text-white font-semibold text-[15px] leading-snug mb-5">{current.q}</p>

                      <div className="flex flex-col gap-2.5 mb-6">
                        {current.options.map((opt, i) => {
                          const selected = answers[step] === i;
                          return (
                            <button
                              key={i}
                              onClick={() => selectAnswer(i)}
                              className="text-left px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-150"
                              style={{
                                border: selected
                                  ? "1px solid #FACC15"
                                  : "1px solid rgba(255,255,255,0.09)",
                                background: selected
                                  ? "rgba(250,204,21,0.11)"
                                  : "rgba(255,255,255,0.04)",
                                color: selected ? "#FACC15" : "rgba(255,255,255,0.75)",
                                transform: selected ? "scale(1.015)" : "scale(1)",
                              }}
                            >
                              <span
                                className="font-bold mr-2.5"
                                style={{ color: selected ? "#FACC15" : "rgba(255,255,255,0.3)" }}
                              >
                                {String.fromCharCode(65 + i)}.
                              </span>
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      <div className="flex gap-3">
                        {step > 0 && (
                          <button
                            onClick={handleBack}
                            className="flex-1 py-3 rounded-xl text-white/55 text-sm font-semibold transition-all hover:text-white"
                            style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                          >
                            Back
                          </button>
                        )}
                        <button
                          onClick={handleNext}
                          disabled={answers[step] === null}
                          className="flex-1 py-3 rounded-xl text-black font-bold text-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed"
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
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -18 }}
                      transition={{ duration: 0.18 }}
                    >
                      <div className="text-center mb-6">
                        <div className="text-4xl mb-3" aria-hidden>🎯</div>
                        <h3 className="text-white font-bold text-lg mb-1">Almost there!</h3>
                        <p className="text-white/45 text-sm">
                          Enter your details to complete your entry into the draw.
                        </p>
                      </div>

                      <div className="flex flex-col gap-4 mb-6">
                        <div>
                          <label className="block text-white/55 text-xs font-semibold mb-1.5 uppercase tracking-wider">
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
                          <label className="block text-white/55 text-xs font-semibold mb-1.5 uppercase tracking-wider">
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
                        className="w-full py-3.5 rounded-xl text-black font-bold text-sm transition-all disabled:opacity-35 disabled:cursor-not-allowed"
                        style={{ background: "#FACC15" }}
                      >
                        {submitting ? "Submitting…" : "Submit Entry"}
                      </button>

                      <p className="text-white/25 text-xs text-center mt-4 leading-relaxed">
                        All entries go into the draw. Winners announced on Weru TV.
                      </p>
                    </motion.div>
                  )}

                  {/* ── Done phase ── */}
                  {phase === "done" && (
                    <motion.div
                      key="done"
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.25 }}
                      className="text-center py-4"
                    >
                      <div className="text-5xl mb-4" aria-hidden>🎉</div>
                      <h3 className="text-white font-bold text-xl mb-2">Entry Received!</h3>
                      <p className="text-white/50 text-sm mb-5">
                        You scored{" "}
                        <span className="font-bold" style={{ color: "#FACC15" }}>
                          {score}/10
                        </span>
                      </p>
                      <div
                        className="rounded-xl p-4 mb-7 text-sm leading-relaxed"
                        style={{
                          background: "rgba(250,204,21,0.07)",
                          border: "1px solid rgba(250,204,21,0.18)",
                          color: "rgba(255,255,255,0.55)",
                        }}
                      >
                        Thank you for entering the Castle Escape draw. Winners will be announced on Weru TV and FM. Good luck!
                      </div>
                      <button
                        onClick={handleClose}
                        className="px-8 py-3 rounded-xl text-black font-bold text-sm"
                        style={{ background: "#FACC15" }}
                      >
                        Close
                      </button>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
