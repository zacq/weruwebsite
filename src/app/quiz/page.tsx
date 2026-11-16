import type { Metadata } from "next";
import QuizForm from "@/components/ui/QuizForm";
import WeruExperience from "@/components/ui/WeruExperience";
import QuizPromoSection from "@/components/ui/QuizPromoSection";
import { getActiveQuiz } from "@/lib/getActiveQuiz";

export const dynamic    = "force-static";
export const revalidate = 3600;

// Emergency switch: forces the "on hold" page below regardless of the dashboard.
const QUIZ_PAUSED = process.env.QUIZ_PAUSED === "true";

export async function generateMetadata(): Promise<Metadata> {
  const quiz = QUIZ_PAUSED ? null : await getActiveQuiz();
  const title = quiz ? `${quiz.title} — Weru TV` : "Weru Website Experience — Weru TV";
  const description = quiz
    ? quiz.prize
      ? `Stand a chance to win ${quiz.prize}.`
      : quiz.tagline ?? quiz.description ?? `Answer ${quiz.questions.length} questions and stand a chance to win.`
    : "The quiz is on hold, but tell us something nice, nominate a cause for Weru to support, and find out how you can donate.";
  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function QuizPage() {
  const quiz = QUIZ_PAUSED ? null : await getActiveQuiz();

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: "#0A0A0A",
        // Gradient glows give the glass backdrop-filter something to render against
        backgroundImage: [
          "radial-gradient(ellipse 60% 40% at 80% 10%, rgba(250,204,21,0.10) 0%, transparent 70%)",
          "radial-gradient(ellipse 50% 50% at 10% 80%, rgba(249,125,0,0.08) 0%, transparent 65%)",
          "radial-gradient(ellipse 40% 30% at 50% 50%, rgba(200,16,46,0.04) 0%, transparent 70%)",
        ].join(", "),
      }}
    >
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-16 sm:pb-24">

        {!quiz ? (
          <>
            {/* Page intro — quiz on hold */}
            <div className="mb-10 sm:mb-14">
              <p
                className="text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-2 sm:mb-3"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                Quiz on hold
              </p>
              <h1
                className="text-white font-bold leading-none mb-3 sm:mb-4"
                style={{ fontSize: "clamp(2rem, 7vw, 4rem)", letterSpacing: "-0.02em" }}
              >
                A new quiz is coming — but we still want to hear from you.
              </h1>
              <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.40)" }}>
                Thank you to every Weru loyalist who played our last quiz — your energy keeps this station going.
              </p>
            </div>

            <WeruExperience />
          </>
        ) : (
          <>
            {/* Page intro — active quiz */}
            <div className="mb-10 sm:mb-14">
              <p
                className="text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-2 sm:mb-3"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                {quiz.campaign ?? "Weru Digital quiz"}
              </p>
              <h1
                className="text-white font-bold leading-none mb-3 sm:mb-4"
                style={{ fontSize: "clamp(2rem, 7vw, 4rem)", letterSpacing: "-0.02em" }}
              >
                {quiz.title}
              </h1>
              {quiz.description && (
                <p className="text-sm sm:text-base leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.60)" }}>
                  {quiz.description}
                </p>
              )}
              {quiz.prize && (
                <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.40)" }}>
                  Stand a chance to win{" "}
                  <span className="font-semibold" style={{ color: "#FACC15" }}>{quiz.prize}</span>!
                </p>
              )}

              {quiz.steps.length > 0 && (
                <ol className="mt-6 flex flex-col gap-2.5">
                  {quiz.steps.map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm" style={{ color: "rgba(255,255,255,0.70)" }}>
                      <span
                        className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold tabular-nums"
                        style={{ background: "rgba(250,204,21,0.12)", color: "#FACC15", border: "1px solid rgba(250,204,21,0.35)" }}
                      >
                        {i + 1}
                      </span>
                      <span className="pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              )}

              {quiz.promoCopy?.primaryCta && (
                <a
                  href={quiz.promoCopy.primaryCta.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center mt-6 px-5 py-3 rounded-2xl font-bold text-sm transition-all hover:-translate-y-0.5 active:scale-95"
                  style={{ background: "#f97d00", color: "#1a1003", boxShadow: "0 6px 20px rgba(249,125,0,0.30)" }}
                >
                  {quiz.promoCopy.primaryCta.label} →
                </a>
              )}

              {quiz.tagline && (
                <p className="mt-6 text-[11px] sm:text-xs font-extrabold tracking-[0.2em] uppercase" style={{ color: "#FACC15" }}>
                  {quiz.tagline}
                </p>
              )}
            </div>

            <QuizForm
              quizId={quiz.id}
              questions={quiz.questions}
              prize={quiz.prize}
              promoSection={quiz.promoCopy ? <QuizPromoSection promo={quiz.promoCopy} /> : undefined}
            />
          </>
        )}

      </div>
    </div>
  );
}
