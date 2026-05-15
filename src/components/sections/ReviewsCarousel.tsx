"use client";

import { useState, useEffect } from "react";
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

// Per absolute-offset: how each ring of the orb looks
const ORB: Record<number, { scale: number; opacity: number; rotateY: number; x: number }> = {
  0: { scale: 1.00, opacity: 1.00, rotateY:  0,  x:    0 },
  1: { scale: 0.82, opacity: 0.78, rotateY: 30,  x:  268 },
  2: { scale: 0.64, opacity: 0.48, rotateY: 52,  x:  496 },
  3: { scale: 0.48, opacity: 0.18, rotateY: 64,  x:  690 },
};

const CARD_W = 280;
const CARD_H = 220; // approx rendered height

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="text-sm" style={{ color: i < count ? "#FACC15" : "rgba(255,255,255,0.18)" }}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function ReviewsCarousel() {
  const [current, setCurrent] = useState(0);
  const n = reviews.length;

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % n), 4200);
    return () => clearInterval(t);
  }, [n]);

  return (
    <section className="py-10 sm:py-14 overflow-hidden" style={{ background: "#111111" }}>

      {/* Header */}
      <motion.div
        className="text-center mb-8 px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-white font-extrabold text-xl sm:text-2xl md:text-3xl">
          What Our Viewers Say
        </h2>
        <div className="flex items-center justify-center gap-1 mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="text-lg sm:text-xl" style={{ color: "#FACC15" }}>★</span>
          ))}
          <span className="text-white/50 text-xs sm:text-sm ml-2">4.9 / 5 on Google</span>
        </div>
      </motion.div>

      {/* 3-D orb track */}
      <div
        className="relative w-full"
        style={{ height: CARD_H + 40, perspective: "1100px" }}
      >
        {reviews.map((review, i) => {
          // Shortest-path offset from center, wrapping around
          let offset = i - current;
          if (offset > n / 2)  offset -= n;
          if (offset < -n / 2) offset += n;

          const absOff = Math.abs(offset);
          const orb = ORB[absOff] ?? ORB[3];
          const sign = offset >= 0 ? 1 : -1;
          const visible = absOff <= 3;

          return (
            <motion.div
              key={review.id}
              onClick={() => absOff > 0 && setCurrent(i)}
              animate={{
                x: orb.x * sign,
                rotateY: -orb.rotateY * sign,
                scale: orb.scale,
                opacity: visible ? orb.opacity : 0,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 28, mass: 0.9 }}
              className="absolute glass rounded-2xl p-5"
              style={{
                width: CARD_W,
                left: "50%",
                top: "50%",
                marginLeft: -CARD_W / 2,
                marginTop: -(CARD_H / 2),
                zIndex: visible ? 10 - absOff * 2 : 0,
                cursor: absOff > 0 ? "pointer" : "default",
                pointerEvents: visible ? "auto" : "none",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              <Stars count={review.rating} />
              <p className="text-white/75 text-xs sm:text-sm leading-relaxed mt-3 mb-4 line-clamp-4">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{ background: "#f97d00", color: "#fff", minWidth: 36 }}
                >
                  {review.avatar}
                </div>
                <div className="min-w-0">
                  <p className="text-white font-semibold text-sm truncate">{review.name}</p>
                  <p className="text-white/40 text-[10px]">Google Review</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? 20 : 6,
              height: 6,
              background: i === current ? "#f97d00" : "rgba(255,255,255,0.20)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
