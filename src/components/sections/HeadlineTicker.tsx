const headlines = [
  "300 Kenyan Youth Set to Receive Empowerment Grants",
  "Several Injured After 14-Seater Matatu Flips on Nairobi's Haile Selassie Avenue",
  "Junet: Collaboration with President Ruto Brings Quick Development to Region",
  "KETRACO Energises New 132kV Power Line to End Outages in Homa Bay",
  "Government to Preserve All Raila Odinga Tributes in National Archives",
  "Ruto Launches New Ksh36,000 Funding for 90,000 Kenyan Youth",
  "Why Wetangʼula is Warning MPs About Life After Parliament",
];

const text = headlines.join("   •   ");

export default function HeadlineTicker() {
  return (
    <div
      className="w-full h-8 flex items-center overflow-hidden shrink-0"
      style={{ background: "#000000" }}
    >
      {/* Label */}
      <div
        className="shrink-0 h-full px-3 flex items-center text-white text-[11px] font-extrabold tracking-widest uppercase"
        style={{ background: "#C8102E", whiteSpace: "nowrap" }}
      >
        HEADLINES
      </div>

      {/* Scrolling text */}
      <div className="flex-1 overflow-hidden relative">
        <div className="ticker-track inline-flex whitespace-nowrap">
          <span className="text-white/85 text-xs px-6">{text}</span>
          <span className="text-white/85 text-xs px-6">{text}</span>
        </div>
      </div>
    </div>
  );
}
