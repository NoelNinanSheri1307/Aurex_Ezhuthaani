"use client";

import { motion } from "framer-motion";
import { Play, Film } from "lucide-react";
import { RhymeVideo } from "@/lib/rhymeVideos";

interface YouTubeRhymeCardProps {
  video: RhymeVideo;
  onPlay: (video: RhymeVideo) => void;
}

export default function YouTubeRhymeCard({ video, onPlay }: YouTubeRhymeCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="p-4 rounded-3xl bg-zinc-900/90 border border-zinc-800 hover:border-amber-500/40 transition-all shadow-xl space-y-3 flex flex-col justify-between group"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800">
        <img
          src={video.thumbnailUrl}
          alt={video.titleTa}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <button
            onClick={() => onPlay(video)}
            className="w-12 h-12 rounded-full bg-amber-500 text-zinc-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform cursor-pointer"
            title="Play Video"
          >
            <Play size={22} className="fill-zinc-950 translate-x-0.5" />
          </button>
        </div>
        <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-zinc-950/80 border border-zinc-800 text-[10px] font-mono text-amber-400">
          {video.category}
        </span>
      </div>

      <button
        onClick={() => onPlay(video)}
        className="w-full py-2.5 rounded-xl bg-zinc-950 hover:bg-amber-500/10 border border-zinc-800 hover:border-amber-500/40 text-amber-400 font-mono text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-1"
      >
        <Film size={14} />
        <span>Watch Video</span>
      </button>
    </motion.div>
  );
}
