"use client";

import { motion } from "framer-motion";

interface Video {
  id: string;
  title: string;
  thumbnail?: string;
  duration?: string;
  views?: string;
  youtubeId?: string;
}

const placeholderVideos: Video[] = [
  { id: "1", title: "Weru TV Evening News", duration: "28:14", views: "12K" },
  { id: "2", title: "Morning Show Highlights", duration: "15:30", views: "8.4K" },
  { id: "3", title: "Sports Digest — Weekend", duration: "20:05", views: "6.1K" },
  { id: "4", title: "Cultural Showcase Special", duration: "44:52", views: "18K" },
  { id: "5", title: "Gichunki — Latest Episode", duration: "35:20", views: "22K" },
  { id: "6", title: "Reggaemani — Live Show", duration: "56:10", views: "15K" },
  { id: "7", title: "Uria Ndagitari — Health Tips", duration: "24:40", views: "9.7K" },
  { id: "8", title: "Tuburuke Na Tash — Mix", duration: "42:00", views: "31K" },
];

function VideoCard({ video, index }: { video: Video; index: number }) {
  const href = video.youtubeId
    ? `https://www.youtube.com/watch?v=${video.youtubeId}`
    : `https://youtube.com/@werutv`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      whileHover={{ y: -4 }}
    >
      {/* Thumbnail */}
      <div
        className="relative w-full overflow-hidden rounded-xl"
        style={{ paddingBottom: "56.25%", background: "#0A0A0A" }}
      >
        {video.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={video.thumbnail}
            alt={video.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          /* Placeholder with Weru logo watermark */
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-black" style={{ color: "rgba(249,125,0,0.3)" }}>
              w<span style={{ color: "rgba(250,204,21,0.3)" }}>e</span>ru
            </span>
            <sup className="text-[9px] font-bold" style={{ color: "rgba(249,125,0,0.2)" }}>TV</sup>
          </div>
        )}

        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ background: "rgba(0,0,0,0.45)" }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg"
            style={{ background: "rgba(249,125,0,0.9)" }}
          >
            ▶
          </div>
        </div>

        {/* Duration badge */}
        {video.duration && (
          <div
            className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded text-white text-[10px] font-bold"
            style={{ background: "rgba(0,0,0,0.8)" }}
          >
            {video.duration}
          </div>
        )}
      </div>

      {/* Title */}
      <p
        className="text-white text-xs font-semibold mt-2 leading-snug line-clamp-2 group-hover:text-[#f97d00] transition-colors"
      >
        {video.title}
      </p>
      {video.views && (
        <p className="text-white/45 text-[10px] mt-0.5">{video.views} views</p>
      )}
    </motion.a>
  );
}

export default function VideoGrid({ videos = placeholderVideos }: { videos?: Video[] }) {
  return (
    <section className="px-4 py-10" style={{ background: "#f97d00" }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-white font-extrabold text-xl sm:text-2xl text-center">Latest Videos</h2>
          <div className="flex items-center justify-center gap-2 mt-1.5">
            <span className="w-2 h-2 rounded-full" style={{ background: "#f97d00", border: "2px solid #fff" }} />
            <span className="text-white/80 text-xs font-medium">New Uploads</span>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {videos.map((v, i) => (
            <VideoCard key={v.id} video={v} index={i} />
          ))}
        </div>

        {/* See more */}
        <div className="text-center mt-8">
          <motion.a
            href="https://youtube.com/@werutv"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-white font-bold text-sm"
            style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.25)" }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            ▶ View All on YouTube
          </motion.a>
        </div>
      </div>
    </section>
  );
}
