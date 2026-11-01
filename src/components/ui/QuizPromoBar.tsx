import Link from "next/link";

export type QuizPromo = {
  title: string;
  subtitle: string;
};

export default function QuizPromoBar({ title, subtitle, compact = false }: QuizPromo & { compact?: boolean }) {
  return (
    <Link
      href="/quiz"
      className={`inline-flex items-center gap-2 rounded-2xl w-full ${compact ? "px-3 py-1.5" : "px-4 py-2.5"}`}
      style={{
        background: "linear-gradient(145deg,#4A2000 0%,#7A3A00 55%,#5C2A00 100%)",
        border: "1px solid rgba(250,180,50,0.28)",
        boxShadow: "0 8px 28px rgba(0,0,0,.50), inset 0 1px 0 rgba(255,255,255,.06)",
      }}
    >
      <div className={`shrink-0 rounded-full grid place-items-center ${compact ? "w-6 h-6 text-sm" : "w-8 h-8 text-base"}`} style={{ background: "rgba(0,0,0,.35)" }}>
        🎯
      </div>
      <div className="min-w-0 flex-1">
        <p className={`font-display font-bold text-white leading-snug ${compact ? "text-xs" : "text-sm"}`}>{title}</p>
        {!compact && (
          <p className="text-xs" style={{ color: "rgba(244,241,236,.58)" }}>
            {subtitle}
          </p>
        )}
      </div>
      <span className={`shrink-0 rounded-full font-bold whitespace-nowrap ${compact ? "px-2 py-1 text-[10px]" : "px-3 py-1.5 text-xs"}`} style={{ background: "#FACC15", color: "#1a1003" }}>
        Start →
      </span>
    </Link>
  );
}
