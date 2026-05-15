import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Sports — Weru TV",
  description: "Kenyan and African sports news, match coverage, and analysis from Weru TV.",
};

export default function SportsPage() {
  return (
    <>
      <section
        className="min-h-screen flex flex-col items-center justify-center px-4 py-20"
        style={{ background: "#0A0A0A" }}
      >
        <span
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-extrabold tracking-widest uppercase mb-6"
          style={{
            background: "rgba(249,125,0,0.12)",
            border: "1.5px solid rgba(249,125,0,0.40)",
            color: "#f97d00",
          }}
        >
          Sports
        </span>
        <h1 className="text-white font-extrabold text-4xl sm:text-5xl text-center leading-tight mb-4">
          Coming Soon
        </h1>
        <p className="text-white/50 text-sm text-center max-w-md leading-relaxed">
          Live scores, match analysis, athlete interviews, and sports news from Kenya and across Africa. Launching shortly.
        </p>
      </section>
      <Footer />
    </>
  );
}
