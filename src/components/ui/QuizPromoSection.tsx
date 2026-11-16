import type { QuizPromoCopy } from "@/db/schema";

// Post-entry promo block for the quiz sponsor. All copy comes from the quiz's
// promo_copy field, edited in the dashboard — never hardcode campaign text here.
export default function QuizPromoSection({ promo }: { promo: QuizPromoCopy }) {
  if (!promo.heading && !promo.body && !promo.primaryCta) return null;

  return (
    <div className="mt-10 sm:mt-14 pt-8 sm:pt-10" style={{ borderTop: "1px solid rgba(255,255,255,0.10)" }}>
      {promo.eyebrow && (
        <p className="text-[10px] sm:text-[11px] font-extrabold tracking-widest uppercase mb-3" style={{ color: "#FACC15" }}>
          {promo.eyebrow}
        </p>
      )}
      {promo.heading && (
        <h3 className="text-white font-bold leading-tight mb-3" style={{ fontSize: "clamp(1.25rem, 3.5vw, 1.75rem)" }}>
          {promo.heading}
        </h3>
      )}
      {promo.body && (
        <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>
          {promo.body}
        </p>
      )}

      {promo.highlights && promo.highlights.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 mb-8">
          {promo.highlights.map((label) => (
            <div
              key={label}
              className="aspect-[4/3] rounded-xl flex items-end p-3"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px dashed rgba(255,255,255,0.18)",
              }}
            >
              <span className="text-[11px] font-semibold" style={{ color: "rgba(255,255,255,0.40)" }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      )}

      {(promo.primaryCta || promo.secondaryCta) && (
        <div className="flex flex-col sm:flex-row gap-3">
          {promo.primaryCta && (
            <a
              href={promo.primaryCta.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-3.5 rounded-2xl font-bold text-sm uppercase tracking-wide presenter-submit-btn"
              style={{ background: "#f97d00", color: "#1a1003" }}
            >
              {promo.primaryCta.label}
            </a>
          )}
          {promo.secondaryCta && (
            <a
              href={promo.secondaryCta.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-3.5 rounded-2xl font-bold text-sm uppercase tracking-wide glass-sm"
              style={{ color: "#fff" }}
            >
              {promo.secondaryCta.label}
            </a>
          )}
        </div>
      )}
    </div>
  );
}
