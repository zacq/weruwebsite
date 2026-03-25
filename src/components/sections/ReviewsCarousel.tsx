"use client";

import { motion } from "framer-motion";

const reviews = [
  {
    id: 1,
    name: "James Mwangi",
    rating: 5,
    text: "Weru TV is the best Kikuyu channel! Always informative and entertaining. I never miss the evening news.",
    avatar: "JM",
  },
  {
    id: 2,
    name: "Grace Wanjiku",
    rating: 5,
    text: "The radio programs are amazing. Tutharimwe Morning Show sets the perfect tone for my day. God bless Weru FM!",
    avatar: "GW",
  },
  {
    id: 3,
    name: "Peter Kariuki",
    rating: 5,
    text: "I advertised my business on Weru TV and saw incredible results within the first week. Highly recommended!",
    avatar: "PK",
  },
  {
    id: 4,
    name: "Mary Njeri",
    rating: 5,
    text: "Gichunki is my favourite show! Martin Gichunge brings so much energy and cultural pride to every episode.",
    avatar: "MN",
  },
  {
    id: 5,
    name: "Samuel Gitau",
    rating: 4,
    text: "Really good coverage of local news in the Mount Kenya region. Keeps me updated even when I'm away from home.",
    avatar: "SG",
  },
  {
    id: 6,
    name: "Agnes Kamau",
    rating: 5,
    text: "The Uria Ndagitari show has helped me so much with health knowledge. Thank you Weru TV for this kind of content.",
    avatar: "AK",
  },
  {
    id: 7,
    name: "David Ngugi",
    rating: 5,
    text: "Best community media platform in Kenya. Weru TV truly represents the voice of our people.",
    avatar: "DN",
  },
  {
    id: 8,
    name: "Ruth Muthoni",
    rating: 5,
    text: "Reggaemani with Empress Rita is on another level! Perfect weekend vibes. I listen every Saturday.",
    avatar: "RM",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="text-sm"
          style={{ color: i < count ? "#FACC15" : "rgba(255,255,255,0.2)" }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: (typeof reviews)[0] }) {
  return (
    <div
      className="shrink-0 w-72 glass rounded-2xl p-5 mx-2"
      style={{ border: "1px solid rgba(255,255,255,0.12)" }}
    >
      <Stars count={review.rating} />
      <p className="text-white/75 text-sm leading-relaxed mt-3 mb-4 line-clamp-4">
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
          style={{ background: "#f97d00", color: "#fff" }}
        >
          {review.avatar}
        </div>
        <div>
          <p className="text-white font-semibold text-sm">{review.name}</p>
          <p className="text-white/40 text-[10px]">Google Review</p>
        </div>
      </div>
    </div>
  );
}

export default function ReviewsCarousel() {
  const doubled = [...reviews, ...reviews];

  return (
    <section className="py-12 overflow-hidden" style={{ background: "#111111" }}>
      {/* Header */}
      <motion.div
        className="text-center mb-8 px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-white font-extrabold text-2xl sm:text-3xl">
          What Our Viewers Say
        </h2>
        <div className="flex items-center justify-center gap-1 mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="text-xl" style={{ color: "#FACC15" }}>★</span>
          ))}
          <span className="text-white/50 text-sm ml-2">4.9 / 5 on Google</span>
        </div>
      </motion.div>

      {/* Auto-scrolling track */}
      <div className="relative flex gap-0 overflow-hidden">
        <div className="scroll-left flex">
          {doubled.map((r, i) => (
            <ReviewCard key={`${r.id}-${i}`} review={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
