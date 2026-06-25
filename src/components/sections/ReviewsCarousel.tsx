"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [reviews, setReviews]       = useState<Review[]>(FALLBACK_REVIEWS);
  const [rating, setRating]         = useState<number | null>(null);
  const [reviewCount, setReviewCount] = useState<number | null>(null);
  const [isLive, setIsLive]         = useState(false);

  useEffect(() => {
    fetch("/api/google-reviews")
      .then((r) => r.json())
      .then((data) => {
        if (data.error || !data.reviews?.length) return;
        setReviews(data.reviews.map(mapGoogleReview));
        if (data.rating)           setRating(data.rating);
        if (data.userRatingCount)  setReviewCount(data.userRatingCount);
        setIsLive(true);
      })
      .catch(() => {});
  }, []);

  return { reviews, rating, reviewCount, isLive };
}

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

function ReviewCard({
  review,
  position,
  onClick,
}: {
  review: Review;
  position: "center" | "left" | "right";
  onClick: () => void;
}) {
  const isCenter = position === "center";

  return (
    <motion.div
      onClick={!isCenter ? onClick : undefined}
      animate={{
        scale: isCenter ? 1 : 0.88,
        opacity: isCenter ? 1 : 0.45,
        x: position === "left" ? "-42%" : position === "right" ? "42%" : "0%",
        zIndex: isCenter ? 10 : 5,
      }}
      transition={{ type: "spring", stiffness: 220, damping: 28 }}
      className={`absolute top-0 rounded-2xl p-6 flex flex-col gap-4 ${isCenter ? "glass-card" : "glass"}`}
      style={{
        width: "clamp(260px, 32vw, 340px)",
        left: "50%",
        marginLeft: "clamp(-130px, -16vw, -170px)",
        cursor: isCenter ? "default" : "pointer",
        border: isCenter ? "1px solid rgba(249,125,0,0.28)" : "1px solid rgba(255,255,255,0.07)",
        boxShadow: isCenter
          ? "0 0 60px rgba(249,125,0,0.10), inset 0 1px 0 rgba(249,125,0,0.18), inset 0 -1px 0 rgba(0,0,0,0.12)"
          : "none",
      }}
    >
      {/* Avatar (blank) + name */}
      <div className="flex items-center gap-3">
        <div
          className="shrink-0 rounded-full"
          style={{ width: 56, height: 56, border: "2px solid rgba(249,125,0,0.45)", background: "rgba(249,125,0,0.08)" }}
        />
        <div>
          <p className="text-white font-bold text-sm leading-tight">{review.name}</p>
          {review.location
            ? <p className="text-white/40 text-[11px]">{review.location}</p>
            : review.timeDescription && <p className="text-white/40 text-[11px]">{review.timeDescription}</p>
          }
        </div>
      </div>

      <Stars count={review.rating} />

      <p className="text-white/70 text-sm leading-relaxed line-clamp-4">
        &ldquo;{review.text}&rdquo;
      </p>

      <p className="text-white/30 text-[10px] font-bold tracking-wide">Google Review</p>
    </motion.div>
  );
}

export default function ReviewsCarousel() {
  const { reviews, rating, reviewCount, isLive } = useGoogleReviews();
  const [current, setCurrent] = useState(0);
  const n = reviews.length;
  const touchStartX = useRef(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % n), 4800);
    return () => clearInterval(t);
  }, [n]);

  const prev = () => setCurrent((c) => (c - 1 + n) % n);
  const next = () => setCurrent((c) => (c + 1) % n);

  const leftIdx  = (current - 1 + n) % n;
  const rightIdx = (current + 1) % n;

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd   = (e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (delta > 45) next();
    else if (delta < -45) prev();
  };

  // Card height — clamp between 220px (tight tablets) and 260px (desktop)
  const CARD_H = 240;

  return (
    <section
      className="py-14 sm:py-20 overflow-hidden relative"
      style={{ background: "#0D1117" }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Ambient glow behind cards */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(249,125,0,0.06) 0%, transparent 65%)" }}
      />
      {/* Header */}
      <motion.div
        className="text-center mb-10 px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-[11px] font-bold tracking-widest uppercase mb-3" style={{ color: "#f97d00" }}>
          VIEWER REVIEWS
        </p>
        <h2 className="font-display text-white font-extrabold text-2xl sm:text-3xl md:text-4xl">
          What Our Viewers{" "}
          <span className="font-headline italic" style={{ color: "#FACC15" }}>Say</span>
        </h2>
        <div className="flex items-center justify-center gap-1 mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="text-lg" style={{ color: "#FACC15" }}>★</span>
          ))}
          <span className="text-white/40 text-xs ml-2">
            {rating !== null ? `${rating.toFixed(1)} / 5` : "4.5 / 5"} on Google
            {reviewCount !== null && ` · ${reviewCount.toLocaleString()} reviews`}
          </span>
          {isLive && (
            <span className="ml-2 text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e" }}>
              LIVE
            </span>
          )}
        </div>
      </motion.div>

      {/* 3-card track — hidden on mobile, shown on sm+ */}
      <div className="hidden sm:block relative w-full" style={{ height: CARD_H + 32 }}>
        <ReviewCard review={reviews[leftIdx]}  position="left"   onClick={prev} />
        <ReviewCard review={reviews[current]}  position="center" onClick={() => {}} />
        <ReviewCard review={reviews[rightIdx]} position="right"  onClick={next} />
      </div>

      {/* Single card — mobile only */}
      <div className="sm:hidden px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={reviews[current].id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
            className="glass rounded-2xl p-6 flex flex-col gap-4"
            style={{ border: "1px solid rgba(249,125,0,0.20)" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="shrink-0 rounded-full"
                style={{ width: 52, height: 52, border: "2px solid rgba(249,125,0,0.45)", background: "rgba(249,125,0,0.08)" }}
              />
              <div>
                <p className="text-white font-bold text-sm">{reviews[current].name}</p>
                {reviews[current].location
                  ? <p className="text-white/40 text-[11px]">{reviews[current].location}</p>
                  : reviews[current].timeDescription && <p className="text-white/40 text-[11px]">{reviews[current].timeDescription}</p>
                }
              </div>
            </div>
            <Stars count={reviews[current].rating} />
            <p className="text-white/70 text-sm leading-relaxed">
              &ldquo;{reviews[current].text}&rdquo;
            </p>
            <p className="text-white/30 text-[10px] font-bold tracking-wide">Google Review</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Arrow buttons + dots */}
      <div className="flex items-center justify-center gap-6 mt-8 px-4">
        <button
          onClick={prev}
          className="w-11 h-11 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-all text-lg"
          style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.10)" }}
          aria-label="Previous review"
        >
          ‹
        </button>
        <div className="flex gap-2 items-center">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? 20 : 8,
                height: 8,
                minWidth: 8,
                background: i === current ? "#f97d00" : "rgba(255,255,255,0.18)",
              }}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="w-11 h-11 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-all text-lg"
          style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.10)" }}
          aria-label="Next review"
        >
          ›
        </button>
      </div>
    </section>
  );
}
