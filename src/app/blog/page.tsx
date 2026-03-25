"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Footer from "@/components/layout/Footer";

const categories = ["All", "News", "Politics", "Business", "Entertainment", "Sports", "Health"];

const articles = [
  {
    id: "1", category: "NEWS", date: "JAN 30",
    title: "Why Wetangʼula is Warning MPs About Life After Parliament",
    excerpt: "National Assembly Speaker Moses Wetangula has pushed back against media reports that he says distort the truth about life after serving in Parliament.",
  },
  {
    id: "2", category: "POLITICS", date: "JAN 30",
    title: "Rigathi Gachagua Threatens Nationwide Protests Over Alleged Oppression",
    excerpt: "Democracy for the Citizens Party leader, Rigathi Gachagua, has threatened to lead nationwide protests over what he describes as systematic oppression.",
  },
  {
    id: "3", category: "NEWS", date: "JAN 30",
    title: "What Truphena Muthoni is Planning After Her Tree-Hugging Guinness World Record",
    excerpt: "No sooner had 22-year-old Kenyan environmentalist Truphena Muthoni broken her own Guinness World Record than she began planning her next conservation milestone.",
  },
  {
    id: "4", category: "POLITICS", date: "JAN 20",
    title: "Government to Preserve All Raila Odinga Tributes in National Archives",
    excerpt: "The Kenyan government has announced plans to permanently preserve local and international messages and tributes for the former Prime Minister.",
  },
  {
    id: "5", category: "BUSINESS", date: "JAN 20",
    title: "Ruto Launches New Ksh36,000 Funding for 90,000 Kenyan Youth",
    excerpt: "President William Ruto unveiled a new funding initiative aimed at empowering 90,000 Kenyan youth with Ksh36,000 each to support small businesses.",
  },
  {
    id: "6", category: "NEWS", date: "JAN 20",
    title: "Several Injured After 14-Seater Matatu Flips on Nairobi's Haile Selassie Avenue",
    excerpt: "A matatu overturned along Haile Selassie Avenue in Nairobi after reportedly losing its brakes. Several passengers were rushed to hospital for treatment.",
  },
  {
    id: "7", category: "BUSINESS", date: "JAN 20",
    title: "KETRACO Energises New 132kV Power Line to End Outages in Homa Bay",
    excerpt: "The government has energised the Sondu-Ndhiwa-Homa Bay-Awendo 132kV transmission line, marking a major milestone in electricity access expansion.",
  },
  {
    id: "8", category: "ENTERTAINMENT", date: "JAN 20",
    title: "Hilarious Memes Trending in Nairobi This End Month Weekend",
    excerpt: "As the month comes to an end, here's what's trending on the socials — from Facebook and Twitter to WhatsApp and Telegram.",
  },
  {
    id: "9", category: "NEWS", date: "JAN 20",
    title: "Junet: Collaboration with President Ruto Brings Quick Development",
    excerpt: "Suna East Member of Parliament Junet Mohamed has defended Nyanza leaders' decision to collaborate with President Ruto, citing tangible development results.",
  },
];

const cardColors = ["#6B0A0A", "#7A1010", "#8B0000"];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? articles
      : articles.filter((a) => a.category === activeCategory.toUpperCase());

  return (
    <>
      {/* Hero */}
      <div className="px-4 py-12 text-center" style={{ background: "#111111" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-extrabold tracking-widest uppercase mb-4"
            style={{
              background: "rgba(249,125,0,0.15)",
              border: "1px solid rgba(249,125,0,0.35)",
              color: "#f97d00",
            }}
          >
            📰 Weru Digital Blog
          </span>
          <h1 className="text-white font-extrabold text-3xl sm:text-4xl mt-2">
            Latest News & Headlines
          </h1>
          <p className="text-white/50 text-sm mt-2 max-w-md mx-auto">
            Stay informed with breaking news, politics, business, and entertainment from Kenya.
          </p>
        </motion.div>
      </div>

      {/* Category filter */}
      <div
        className="sticky top-14 z-40 px-4 py-3 overflow-x-auto no-scrollbar"
        style={{ background: "#0A0A0A", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="flex gap-2 max-w-5xl mx-auto w-max">
          {categories.map((cat) => {
            const active = activeCategory === cat;
            return (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all"
                style={{
                  background: active ? "#f97d00" : "rgba(255,255,255,0.08)",
                  color: "#fff",
                  border: active ? "1px solid #f97d00" : "1px solid rgba(255,255,255,0.12)",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Articles grid */}
      <div className="px-4 py-10" style={{ background: "#f97d00" }}>
        <div className="max-w-5xl mx-auto">
          {/* Featured article (first item) */}
          {filtered.length > 0 && (
            <motion.article
              className="rounded-2xl overflow-hidden mb-6 cursor-pointer group"
              style={{ background: cardColors[0] }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -4 }}
            >
              <div className="flex flex-col md:flex-row min-h-[200px]">
                {/* Placeholder image */}
                <div
                  className="md:w-2/5 flex items-center justify-center p-8"
                  style={{ background: "rgba(0,0,0,0.3)" }}
                >
                  <div className="text-center">
                    <span className="text-4xl font-black text-white/20">w<span style={{ color: "rgba(250,204,21,0.2)" }}>e</span>ru</span>
                    <sup className="text-sm font-bold" style={{ color: "rgba(249,125,0,0.2)" }}>TV</sup>
                  </div>
                </div>
                {/* Text */}
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ background: "#C8102E", color: "#fff" }}>
                      {filtered[0].category}
                    </span>
                    <span className="text-white/40 text-xs">{filtered[0].date}</span>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded"
                      style={{ background: "rgba(249,125,0,0.25)", color: "#f97d00" }}
                    >
                      FEATURED
                    </span>
                  </div>
                  <h2 className="text-white font-extrabold text-xl sm:text-2xl leading-snug mb-3 group-hover:text-[#FACC15] transition-colors">
                    {filtered[0].title}
                  </h2>
                  <p className="text-white/60 text-sm leading-relaxed">{filtered[0].excerpt}</p>
                  <div className="mt-4">
                    <span className="text-[#f97d00] text-sm font-bold">Read more →</span>
                  </div>
                </div>
              </div>
            </motion.article>
          )}

          {/* Rest of articles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.slice(1).map((article, i) => (
              <motion.article
                key={article.id}
                className="rounded-2xl overflow-hidden cursor-pointer group"
                style={{ background: cardColors[i % cardColors.length] }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                whileHover={{ y: -5 }}
              >
                {/* Placeholder image */}
                <div
                  className="w-full flex items-center justify-center"
                  style={{ paddingBottom: "50%", position: "relative", background: "rgba(0,0,0,0.35)" }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-black" style={{ color: "rgba(255,255,255,0.08)" }}>
                      w<span style={{ color: "rgba(250,204,21,0.08)" }}>e</span>ru
                    </span>
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ background: "#C8102E", color: "#fff" }}>
                      {article.category}
                    </span>
                  </div>
                  <div className="absolute top-2 left-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ background: "rgba(0,0,0,0.7)", color: "rgba(255,255,255,0.7)" }}>
                      {article.date}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-bold text-sm leading-snug line-clamp-2 mb-2 group-hover:text-[#f97d00] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-white/50 text-xs leading-relaxed line-clamp-3">{article.excerpt}</p>
                  <p className="text-[#f97d00] text-xs font-bold mt-3">Read more →</p>
                </div>
              </motion.article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-white/50 text-lg">No articles in this category yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* Blog advertise CTA */}
      <div className="px-4 py-10 text-center" style={{ background: "#111111" }}>
        <p className="text-white/50 text-sm mb-2">Reach our readers</p>
        <p className="text-white font-extrabold text-xl mb-4">Promote Your Brand Here</p>
        <a
          href="#rate-card"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-sm"
          style={{ background: "#f97d00", boxShadow: "0 0 16px rgba(249,125,0,0.35)" }}
        >
          📢 Advertise on Weru Blog
        </a>
      </div>

      <Footer />
    </>
  );
}
