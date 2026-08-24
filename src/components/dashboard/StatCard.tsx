type StatCardProps = {
  label: string;
  value: number | string;
  subLabel?: string;
  accent?: string;
};

export default function StatCard({ label, value, subLabel, accent = "#f97d00" }: StatCardProps) {
  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-1 bg-white"
      style={{ border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
    >
      <span className="text-xs font-semibold tracking-wide uppercase text-black/40">{label}</span>
      <span className="text-3xl font-bold tabular-nums" style={{ color: "#0A0A0A" }}>
        {value}
      </span>
      {subLabel && (
        <span className="text-xs font-medium" style={{ color: accent }}>
          {subLabel}
        </span>
      )}
    </div>
  );
}
