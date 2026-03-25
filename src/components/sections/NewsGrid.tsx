"use client";

import { motion } from "framer-motion";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image?: string;
  slug?: string;
}

const sampleArticles: Article[] = [
  {
    id: "1",
    title: "Why Wetangʼula is Warning MPs About Life After Parliament",
    excerpt:
      "National Assembly Speaker Moses Wetangula has pushed back against media reports that he says distort the truth about life after serving in Parliament.",
    category: "NEWS",
    date: "JAN 30",
  },
  {
    id: "2",
    title: "Rigathi Gachagua Threatens Nationwide Protests Over Alleged...",
    excerpt:
      "Democracy for the Citizens Party leader, Rigathi Gachagua, has threatened to lead nationwide protests over what he describes as systematic oppression.",
    category: "NEWS",
    date: "JAN 30",
  },
  {
    id: "3",
    title: "What Truphena Muthoni is Planning After Her Tree-Hugging Guinness World Record",
    excerpt:
      "No sooner had 22-year-old Kenyan environmentalist Truphena Muthoni broken her own Guinness World Record than she began planning her next conservation milestone.",
    category: "NEWS",
    date: "JAN 30",
  },
  {
    id: "4",
    title: "Government to Preserve All Raila Odinga Tributes in National Archives",
    excerpt:
      "The Kenyan government has announced plans to permanently preserve local and international messages and tributes for the former Prime Minister.",
    category: "NEWS",
    date: "JAN 20",
  },
  {
    id: "5",
    title: "Ruto Launches New Ksh36,000 Funding for 90,000 Kenyan Youth",
    excerpt:
      "President William Ruto on Thursday unveiled a new funding initiative aimed at empowering 90,000 Kenyan youth with Ksh36,000 each.",
    category: "NEWS",
    date: "JAN 20",
  },
  {
    id: "6",
    title: "Several Injured After 14-Seater Matatu Flips on Nairobi's Haile Selassie Avenue",
    excerpt:
      "A matatu overturned along Haile Selassie Avenue in Nairobi after reportedly losing its brakes. Several passengers were rushed to hospital.",
    category: "NEWS",
    date: "JAN 20",
  },
];

function ArticleCard({ article, index }: { article: Article; index: number }) {
  return (
    <motion.article
      className="group relative overflow-hidden rounded-2xl cursor-pointer"
      style={{ background: "#0A0A0A" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      whileHover={{ y: -5 }}
    >
      {/* Image / gradient placeholder */}
      <div
        className="w-full relative overflow-hidden"
        style={{
          paddingBottom: "55%",
          background: `linear-gradient(135deg, #7A1010 0%, #3d0505 100%)`,
        }}
      >
        {article.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.image}
            alt={article.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
          />
        ) : (
          <div className="absolute inset-0 flex items-end p-3">
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded"
              style={{ background: "#C8102E", color: "#fff" }}
            >
              {article.category}
            </span>
          </div>
        )}

        {/* Category badge overlay */}
        {article.image && (
          <div className="absolute bottom-2 left-2">
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded"
              style={{ background: "#C8102E", color: "#fff" }}
            >
              {article.category}
            </span>
          </div>
        )}

        {/* Date badge */}
        <div className="absolute top-2 left-2">
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded"
            style={{ background: "rgba(0,0,0,0.7)", color: "rgba(255,255,255,0.8)" }}
          >
            {article.date}
          </span>
        </div>
      </div>

      {/* Text */}
      <div className="p-4">
        <h3
          className="text-white font-bold text-sm leading-snug line-clamp-2 mb-2 group-hover:text-[#f97d00] transition-colors"
        >
          {article.title}
        </h3>
        <p className="text-white/50 text-xs leading-relaxed line-clamp-3">{article.excerpt}</p>
      </div>
    </motion.article>
  );
}

export default function NewsGrid({ articles = sampleArticles }: { articles?: Article[] }) {
  return (
    <section className="px-4 py-10" style={{ background: "#f97d00" }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-center gap-3 mb-7"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <div className="w-1 h-7 rounded-full" style={{ background: "#111111" }} />
          <h2 className="text-white font-extrabold text-xl sm:text-2xl uppercase tracking-wide">
            Latest Headlines
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((a, i) => (
            <ArticleCard key={a.id} article={a} index={i} />
          ))}
        </div>

        {/* View more */}
        <div className="text-center mt-8">
          <motion.a
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-white font-bold text-sm"
            style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.25)" }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            View All News →
          </motion.a>
        </div>
      </div>
    </section>
  );
}
