import type { Metadata } from "next";
import QuizForm from "@/components/ui/QuizForm";

export const dynamic    = "force-static";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "10 for 10: Castle Escape — Weru TV",
  description:
    "Think you know Weru TV? Answer 10 questions and stand a chance to win a one-night stay at Tafaria Castle.",
  openGraph: {
    title: "10 for 10: Castle Escape — Weru TV",
    description:
      "Think you know Weru TV? Answer 10 questions and stand a chance to win a one-night stay at Tafaria Castle.",
  },
};

export default function QuizPage() {
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
            Celebrating 10 years
          </p>
          <h1
            className="text-white font-bold leading-none mb-3 sm:mb-4"
            style={{ fontSize: "clamp(2rem, 7vw, 4rem)", letterSpacing: "-0.02em" }}
          >
            10 for 10:<br />Castle Escape
          </h1>
          <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.40)" }}>
            Answer all 10 questions and stand a chance to win a one-night stay at{" "}
            <span className="font-semibold" style={{ color: "#FACC15" }}>Tafaria Castle</span>.
          </p>
        </div>

        {/* Quiz */}
        <QuizForm />

      </div>
    </div>
  );
}
