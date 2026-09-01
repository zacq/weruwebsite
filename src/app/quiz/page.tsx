import type { Metadata } from "next";
import QuizForm from "@/components/ui/QuizForm";
import { getActiveQuiz } from "@/lib/getActiveQuiz";

export const dynamic    = "force-static";
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const quiz = await getActiveQuiz();
  const title = quiz ? `${quiz.title} — Weru TV` : "Quiz — Weru TV";
  const description = quiz
    ? `Think you know Weru FM? Answer all 10 questions correctly and stand a chance to win a ${quiz.prize}.`
    : "Check back soon for the next Weru TV quiz.";
  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function QuizPage() {
  const quiz = await getActiveQuiz();

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#0A0A0A" }}>
        <div className="text-center max-w-md">
          <p className="text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "rgba(255,255,255,0.25)" }}>
            No quiz running
          </p>
          <h1 className="text-white font-bold text-3xl sm:text-4xl mb-4">Check back soon.</h1>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.40)" }}>
            There&apos;s no active quiz right now — follow Weru TV &amp; FM to know when the next one drops.
          </p>
        </div>
      </div>
    );
  }

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

        {/* Page intro */}
        <div className="mb-10 sm:mb-14">
          <p
            className="text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-2 sm:mb-3"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            {quiz.title}
          </p>
          <h1
            className="text-white font-bold leading-none mb-3 sm:mb-4"
            style={{ fontSize: "clamp(2rem, 7vw, 4rem)", letterSpacing: "-0.02em" }}
          >
            {quiz.title}
          </h1>
          <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.40)" }}>
            Answer all the questions correctly and stand a chance to win a{" "}
            <span className="font-semibold" style={{ color: "#FACC15" }}>{quiz.prize}</span>!
          </p>
        </div>

        {/* Quiz */}
        <QuizForm questions={quiz.questions} prize={quiz.prize} />

      </div>
    </div>
  );
}
