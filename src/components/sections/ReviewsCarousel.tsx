"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  photo: string;
  timeDescription?: string;
}

const FALLBACK_REVIEWS: Review[] = [
  { id: 1, name: "James M'Murithi",  location: "Nyeri, Kenya",   rating: 5, text: "Weru TV is the best Kikuyu channel! Always informative and entertaining. I never miss the evening news.", photo: "" },
  { id: 2, name: "Grace Kanini",     location: "Nairobi, Kenya", rating: 5, text: "The radio programs are amazing. Tutharimwe Morning Show sets the perfect tone for my day. God bless Weru FM!", photo: "" },
  { id: 3, name: "Peter M'Rimberia", location: "Thika, Kenya",   rating: 5, text: "I advertised my business on Weru TV and saw incredible results within the first week. Highly recommended!", photo: "" },
  { id: 4, name: "Mary Kathambi",    location: "Muranga, Kenya", rating: 5, text: "Gichunki is my favourite show! Martin Gichunge brings so much energy and cultural pride to every episode.", photo: "" },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapGoogleReview(r: any, i: number): Review {
  return {
    id: i,
    name:  r.authorAttribution?.displayName ?? "Google Reviewer",
    location: "",
    rating: r.rating ?? 5,
    text:  r.text?.text ?? r.originalText?.text ?? "",
    photo: r.authorAttribution?.photoUri ?? "",
    timeDescription: r.relativePublishTimeDescription,
  };
}

function useGoogleReviews() {
  const [reviews, setReviews]         = useState<Review[]>(FALLBACK_REVIEWS);
  const [rating, setRating]           = useState<number | null>(null);
  const [reviewCount, setReviewCount] = useState<number | null>(null);
  const [isLive, setIsLive]           = useState(false);

  useEffect(() => {
    fetch("/api/google-reviews")
      .then((r) => r.json())
      .then((data) => {
        if (data.error || !data.reviews?.length) return;
        setReviews(data.reviews.map(mapGoogleReview));
        if (data.rating)          setRating(data.rating);
        if (data.userRatingCount) setReviewCount(data.userRatingCount);
        setIsLive(true);
      })
      .catch(() => {});
  }, []);

  return { reviews, rating, reviewCount, isLive };
}

function getInitials(name: string) {
  const parts = name.replace(/'/g, "").split(" ").filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

const AVATAR_PALETTE = [
  { bg: "rgba(249,125,0,0.14)",  border: "rgba(249,125,0,0.42)",  text: "#f97d00" },
  { bg: "rgba(250,204,21,0.10)", border: "rgba(250,204,21,0.38)", text: "#FACC15" },
  { bg: "rgba(34,197,94,0.10)",  border: "rgba(34,197,94,0.30)",  text: "#4ade80" },
  { bg: "rgba(139,92,246,0.12)", border: "rgba(139,92,246,0.32)", text: "#a78bfa" },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ color: i < count ? "#FACC15" : "rgba(255,255,255,0.18)", fontSize: "13px" }}>★</span>
      ))}
    </div>
  );
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const palette  = AVATAR_PALETTE[index % AVATAR_PALETTE.length];
  const initials = getInitials(review.name);

  return (
    <motion.div
      className="flex flex-col gap-4 rounded-2xl p-5 sm:p-6"
      style={{
        background:    "rgba(255,255,255,0.04)",
        border:        "1px solid rgba(255,255,255,0.08)",
        boxShadow:     "0 4px 24px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.07)",
        backdropFilter:"blur(16px)",
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.09, duration: 0.50, ease: [0.22, 1, 0.36, 1] }}
    >
      <Stars count={review.rating} />

      <p className="text-white/70 text-sm leading-relaxed flex-1">
        &ldquo;{review.text}&rdquo;
      </p>

      <div
        className="flex items-center gap-3 pt-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
      >
        {/* Squircle avatar with initials */}
        <div
          className="shrink-0 flex items-center justify-center text-[11px] font-extrabold"
          style={{
            width: 38, height: 38,
            borderRadius: "28%",
            background: palette.bg,
            border: `1.5px solid ${palette.border}`,
            color: palette.text,
            letterSpacing: "0.03em",
          }}
        >
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-white font-bold text-sm leading-tight truncate">{review.name}</p>
          <p className="text-white/40 text-[11px] mt-0.5">
            {review.location || review.timeDescription || "Kenya"}
          </p>
        </div>
        <span className="shrink-0 text-white/22 text-[10px] font-semibold">Google</span>
      </div>
    </motion.div>
  );
}

export default function ReviewsCarousel() {
  const { reviews, rating, reviewCount, isLive } = useGoogleReviews();
  const displayed = reviews.slice(0, 4);

  return (
    <section
      className="py-14 sm:py-20 px-4 sm:px-8 relative overflow-hidden"
      style={{ background: "#0D1117" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(249,125,0,0.05) 0%, transparent 70%)" }}
      />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          className="text-center mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[11px] font-bold tracking-wider mb-3" style={{ color: "#f97d00" }}>
            Viewer reviews
          </p>
          <h2 className="font-display text-white font-extrabold text-2xl sm:text-3xl md:text-4xl mb-3">
            What our viewers{" "}
            <span className="font-headline italic" style={{ color: "#FACC15" }}>say</span>
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} style={{ color: "#FACC15", fontSize: "15px" }}>★</span>
              ))}
            </div>
            <span className="text-white/40 text-xs">
              {rating !== null ? `${rating.toFixed(1)}` : "4.5"}/5 on Google
              {reviewCount !== null && ` · ${reviewCount.toLocaleString()} reviews`}
            </span>
            {isLive && (
              <span
                className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e" }}
              >
                LIVE
              </span>
            )}
          </div>
        </motion.div>

        {/* 2×2 review grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {displayed.map((review, i) => (
            <ReviewCard key={review.id} review={review} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
