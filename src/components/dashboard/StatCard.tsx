type StatCardProps = {
  label: string;
  value: number | string;
  subLabel?: string;
  accent?: string;
};

export default function StatCard({ label, value, subLabel, accent = "#f97d00" }: StatCardProps) {
  return (
    <div
      className="rounded-2xl p-3.5 sm:p-5 flex flex-col gap-1 bg-white"
      style={{ border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(249,125,0,0.05), 0 1px 2px rgba(0,0,0,0.03)" }}
    >
      <span className="text-[10px] sm:text-xs font-semibold tracking-wide uppercase text-black/40 truncate">{label}</span>
      <span className="text-2xl sm:text-3xl font-bold tabular-nums" style={{ color: "#0A0A0A" }}>
        {value}
      </span>
      {subLabel && (
        <span className="text-[11px] sm:text-xs font-medium truncate" style={{ color: accent }}>
          {subLabel}
        </span>
      )}
    </div>
  );
}
