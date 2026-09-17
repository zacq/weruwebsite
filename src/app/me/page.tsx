import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import MeNotificationToggle from "@/components/sections/MeNotificationToggle";

export const dynamic = "force-static";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Settings — Weru TV",
  description: "Notification preferences, contact Weru TV, and app information.",
};

const PHONE = "+254700117026";
const WHATSAPP = "https://wa.me/254707065000?text=Weru%20TV%20App%20Enquiry";

export default function MePage() {
  return (
    <>
      <section className="pt-28 pb-16 px-4" style={{ background: "#0A0A0A" }}>
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-extrabold text-white mb-8 font-display">Settings</h1>

          <MeNotificationToggle />

          <p className="text-[11px] font-bold uppercase tracking-wider text-white/35 mt-8 mb-3">Contact</p>
          <div className="flex flex-col gap-2">
            <a
              href={`tel:${PHONE}`}
              className="flex items-center gap-2 px-4 py-3.5 rounded-xl text-sm font-semibold text-white active:scale-[0.98] transition-transform"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              📞 Call 0700 117026
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-3.5 rounded-xl text-sm font-semibold text-white active:scale-[0.98] transition-transform"
              style={{ background: "#25D366" }}
            >
              💬 WhatsApp Us
            </a>
          </div>

          <p className="text-[11px] font-bold uppercase tracking-wider text-white/35 mt-8 mb-3">Legal</p>
          <div className="flex flex-col gap-2">
            <a href="/privacy" className="px-4 py-3.5 rounded-xl text-sm font-semibold text-white/70 active:scale-[0.98] transition-transform" style={{ background: "rgba(255,255,255,0.05)" }}>
              Privacy Policy
            </a>
            <a href="/terms" className="px-4 py-3.5 rounded-xl text-sm font-semibold text-white/70 active:scale-[0.98] transition-transform" style={{ background: "rgba(255,255,255,0.05)" }}>
              Terms of Service
            </a>
          </div>

          <p className="text-center text-xs text-white/25 mt-10">Weru TV · v1.0.0</p>
        </div>
      </section>
      <Footer />
    </>
  );
}
