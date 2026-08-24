"use client";

import type { DashboardTableConfig } from "@/lib/dashboardTables";
import type { AirtableRecord } from "./types";

type ExportCsvButtonProps = {
  config: DashboardTableConfig;
  records: AirtableRecord[];
};

function csvEscape(value: unknown): string {
  const s = Array.isArray(value) ? value.join("; ") : String(value ?? "");
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export default function ExportCsvButton({ config, records }: ExportCsvButtonProps) {
  const handleExport = () => {
    const headers = config.columns.map((c) => c.label);
    const rows = records.map((r) => config.columns.map((c) => csvEscape(r.fields[c.key])));
    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${config.key}-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      className="text-xs font-semibold px-3.5 py-2.5 sm:py-2 rounded-lg whitespace-nowrap bg-white transition-all duration-150 hover:border-black/25 active:scale-95"
      style={{ border: "1px solid rgba(0,0,0,0.12)", color: "#0A0A0A" }}
    >
      Export CSV
    </button>
  );
}
