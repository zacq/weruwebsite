import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Politics — Weru TV",
  description: "Latest political news and analysis from Kenya, covering Parliament, elections, and governance.",
};

export default function PoliticsPage() {
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
          Politics
        </span>
        <h1 className="text-white font-extrabold text-4xl sm:text-5xl text-center leading-tight mb-4">
          Coming Soon
        </h1>
        <p className="text-white/50 text-sm text-center max-w-md leading-relaxed">
          In-depth political coverage — Parliament, elections, governance, and the stories that shape Kenya. Launching shortly.
        </p>
      </section>
      <Footer />
    </>
  );
}
