const FACILITIES = [
  "Swimming Pool",
  "Ziplining",
  "Spa & Wellness",
  "Nature Walks",
  "Archery",
  "Farm-to-Table Dining",
  "Accommodation & Resort Facilities",
];

export default function KisimaniPromoSection() {
  return (
    <div className="mt-10 sm:mt-14 pt-8 sm:pt-10" style={{ borderTop: "1px solid rgba(255,255,255,0.10)" }}>
      <p className="text-[10px] sm:text-[11px] font-extrabold tracking-widest uppercase mb-3" style={{ color: "#FACC15" }}>
        Discover the Kisimani Experience!
      </p>
      <h3 className="text-white font-bold leading-tight mb-3" style={{ fontSize: "clamp(1.25rem, 3.5vw, 1.75rem)" }}>
        Why wait to win a getaway when you can experience Kisimani today?
      </h3>
      <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>
        Discover a destination where nature, adventure and relaxation meet. Explore the facilities, enjoy exciting activities and plan your next getaway.
      </p>

      {/* Facility photo placeholders — swap each for a real photo before launch */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 mb-8">
        {FACILITIES.map((label) => (
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

      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href="https://kisimaniresort.com/home/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center py-3.5 rounded-2xl font-bold text-sm uppercase tracking-wide presenter-submit-btn"
          style={{ background: "#f97d00", color: "#1a1003" }}
        >
          Explore Kisimani
        </a>
        <a
          href="https://kisimaniresort.com/contact/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center py-3.5 rounded-2xl font-bold text-sm uppercase tracking-wide glass-sm"
          style={{ color: "#fff" }}
        >
          Make a Booking Enquiry
        </a>
      </div>
    </div>
  );
}
