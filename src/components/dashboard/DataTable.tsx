"use client";

import { useMemo, useState } from "react";
import type { DashboardTableConfig, ColumnConfig } from "@/lib/dashboardTables";
import type { AirtableRecord } from "./types";
import RecordDetailModal from "./RecordDetailModal";

type DataTableProps = {
  config: DashboardTableConfig;
  records: AirtableRecord[];
  onPatch: (recordId: string, fields: Record<string, unknown>) => void;
  onDelete: (recordId: string) => void;
};

function formatCell(value: unknown, column: ColumnConfig): string {
  if (value === undefined || value === null || value === "") return "—";
  if (column.type === "array") return Array.isArray(value) ? value.join(", ") : String(value);
  if (column.type === "date") {
    const d = new Date(String(value));
    return Number.isNaN(d.getTime()) ? String(value) : d.toLocaleDateString("en-GB");
  }
  if (column.type === "datetime") {
    const d = new Date(String(value));
    return Number.isNaN(d.getTime())
      ? String(value)
      : d.toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
  }
  return String(value);
}

export default function DataTable({ config, records, onPatch, onDelete }: DataTableProps) {
  const [search, setSearch] = useState("");
  const [detailRecord, setDetailRecord] = useState<AirtableRecord | null>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return records;
    const q = search.trim().toLowerCase();
    return records.filter((r) => {
      const name = String(r.fields[config.nameField] ?? "").toLowerCase();
      const phone = String(r.fields.Phone ?? "").toLowerCase();
      return name.includes(q) || phone.includes(q);
    });
  }, [records, search, config.nameField]);

  const sorted = useMemo(
    () =>
      [...filtered].sort((a, b) => {
        const da = new Date(String(a.fields[config.dateField] ?? a.createdTime)).getTime();
        const db = new Date(String(b.fields[config.dateField] ?? b.createdTime)).getTime();
        return db - da;
      }),
    [filtered, config.dateField]
  );

  return (
    <div className="rounded-2xl bg-white overflow-hidden" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
      <div className="p-4 flex items-center justify-between gap-3" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or phone…"
          className="text-sm px-3 py-2 rounded-lg w-full max-w-xs"
          style={{ border: "1px solid rgba(0,0,0,0.12)" }}
        />
        <span className="text-xs text-black/40 whitespace-nowrap">{sorted.length} of {records.length}</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: "rgba(0,0,0,0.02)" }}>
              {config.columns.map((col) => (
                <th key={col.key} className="text-left px-4 py-2.5 font-semibold text-black/50 text-xs uppercase tracking-wide whitespace-nowrap">
                  {col.label}
                </th>
              ))}
              {config.detailField && <th className="px-4 py-2.5" />}
              {config.deletable && <th className="px-4 py-2.5" />}
            </tr>
          </thead>
          <tbody>
            {sorted.map((record) => (
              <tr key={record.id} style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }}>
                {config.columns.map((col) => {
                  const value = record.fields[col.key];
                  if (col.editable && col.type === "select") {
                    return (
                      <td key={col.key} className="px-4 py-2">
                        <select
                          value={String(value ?? col.options?.[0] ?? "")}
                          onChange={(e) => onPatch(record.id, { [col.key]: e.target.value })}
                          className="text-xs px-2 py-1.5 rounded-lg"
                          style={{ border: "1px solid rgba(0,0,0,0.15)" }}
                        >
                          {col.options?.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </td>
                    );
                  }
                  if (col.editable && col.type === "number") {
                    return (
                      <td key={col.key} className="px-4 py-2">
                        <input
                          type="number"
                          defaultValue={typeof value === "number" ? value : 0}
                          onBlur={(e) => {
                            const n = Number(e.target.value);
                            if (!Number.isNaN(n) && n !== value) onPatch(record.id, { [col.key]: n });
                          }}
                          className="text-xs w-16 px-2 py-1.5 rounded-lg tabular-nums"
                          style={{ border: "1px solid rgba(0,0,0,0.15)" }}
                        />
                      </td>
                    );
                  }
                  return (
                    <td key={col.key} className="px-4 py-2.5 whitespace-nowrap" style={{ color: "#0A0A0A" }}>
                      {formatCell(value, col)}
                    </td>
                  );
                })}
                {config.detailField && (
                  <td className="px-4 py-2 text-right">
                    <button
                      onClick={() => setDetailRecord(record)}
                      className="text-xs font-semibold whitespace-nowrap"
                      style={{ color: "#f97d00" }}
                    >
                      View →
                    </button>
                  </td>
                )}
                {config.deletable && (
                  <td className="px-4 py-2 text-right">
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete this entry for ${String(record.fields[config.nameField] ?? "this record")}? This cannot be undone.`)) {
                          onDelete(record.id);
                        }
                      }}
                      className="text-xs font-semibold text-red-600 hover:text-red-700 whitespace-nowrap"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
            {sorted.length === 0 && (
              <tr>
                <td colSpan={config.columns.length + 2} className="px-4 py-8 text-center text-black/30 text-sm">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {detailRecord && config.detailField && (
        <RecordDetailModal record={detailRecord} detailField={config.detailField} onClose={() => setDetailRecord(null)} />
      )}
    </div>
  );
}
