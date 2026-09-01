"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/dashboard/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error || "Incorrect password.");
        return;
      }
      const dest = searchParams.get("from") || "/dashboard";
      router.replace(dest);
      router.refresh();
    } catch {
      setError("Connection failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#0A0A0A" }}>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl p-6 sm:p-8 flex flex-col gap-4"
        style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div>
          <span className="font-bold text-lg" style={{ color: "#f97d00" }}>Weru</span>
          <span className="font-bold text-lg text-white"> Command Center</span>
        </div>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
          Enter the dashboard password to continue.
        </p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
          className="text-sm px-3.5 py-3 rounded-xl text-white"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)" }}
        />

        {error && <p className="text-xs" style={{ color: "#f97d00" }}>{error}</p>}

        <button
          type="submit"
          disabled={!password || submitting}
          className="text-sm font-bold py-3 rounded-xl text-white transition-all disabled:opacity-40"
          style={{ background: "#f97d00" }}
        >
          {submitting ? "Checking…" : "Enter"}
        </button>
      </form>
    </div>
  );
}

export default function DashboardLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
