"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { INTERACTIVE_RHYMES, RhymeData } from "@/lib/rhymes";
import { CURATED_YOUTUBE_RHYMES, RhymeVideo } from "@/lib/rhymeVideos";
import YouTubeRhymeCard from "./YouTubeRhymeCard";
import YouTubeRhymePlayer from "./YouTubeRhymePlayer";
import StylusEmblem from "@/components/StylusEmblem";
import {
  Box,
  Play,
  Film,
  Compass,
  ArrowRight,
  Music,
  Feather,
  Smile,
  Layers,
  Sparkles,
  Zap,
} from "lucide-react";

// Mascot Orientation Asset Paths
const MASCOT_POSES = [
  "/assets/mascothappy.png",
  "/assets/mascotlanding.png",
  "/assets/mascotstudying.png",
  "/assets/mascotteaching.png",
  "/assets/mascotwinning.png",
  "/assets/mascotwithschoolbag.png",
];

export default function RhymesHome() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeVideo, setActiveVideo] = useState<RhymeVideo | null>(null);

  // Background Morph State (Starts dark, morphs to baby blue, then morphs back to dark on exit)
  const [isMorphed, setIsMorphed] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Automatic Mascot Orientation Pose State
  const [mascotIndex, setMascotIndex] = useState<number>(0);

  useEffect(() => {
    // Morph background into baby blue & white primary color scheme after page load
    const morphTimer = setTimeout(() => {
      setIsMorphed(true);
    }, 150);

    // Auto switch mascot poses every 2.8 seconds
    const poseInterval = setInterval(() => {
      setMascotIndex((prev) => (prev + 1) % MASCOT_POSES.length);
    }, 2800);

    return () => {
      clearTimeout(morphTimer);
      clearInterval(poseInterval);
    };
  }, []);

  // Handle Exit Animation (Morphs back from primary baby-blue to black and yellow accents)
  const handleNavigateAway = (targetUrl: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setIsExiting(true);
    setIsMorphed(false);
    setTimeout(() => {
      router.push(targetUrl);
    }, 600);
  };

  const categories = [
    { name: "All", color: "bg-blue-600 text-white border-blue-400 shadow-blue-500/30" },
    { name: "Animals", color: "bg-emerald-500 text-zinc-950 border-emerald-300 shadow-emerald-500/30" },
    { name: "Nature", color: "bg-yellow-400 text-zinc-950 border-yellow-200 shadow-yellow-400/30" },
    { name: "Colours", color: "bg-rose-500 text-white border-rose-300 shadow-rose-500/30" },
    { name: "Numbers", color: "bg-cyan-500 text-zinc-950 border-cyan-300 shadow-cyan-500/30" },
    { name: "Family", color: "bg-purple-500 text-white border-purple-300 shadow-purple-500/30" },
    { name: "Everyday Tamil", color: "bg-orange-500 text-white border-orange-300 shadow-orange-500/30" },
  ];

  const filteredInteractive = INTERACTIVE_RHYMES.filter((r) => {
    if (activeCategory === "All") return true;
    return r.category.toLowerCase() === activeCategory.toLowerCase();
  });

  const filteredVideos = CURATED_YOUTUBE_RHYMES.filter((v) => {
    if (activeCategory === "All") return true;
    return v.category.toLowerCase() === activeCategory.toLowerCase();
  });

  return (
    <motion.div
      initial={{ opacity: 0.9, backgroundColor: "#07070a" }}
      animate={{
        opacity: isExiting ? 0.85 : 1,
        backgroundColor: isMorphed && !isExiting ? "#e0f2fe" : "#07070a",
      }}
      transition={{ duration: isExiting ? 0.6 : 2.5, ease: "easeInOut" }}
      className={`min-h-screen relative overflow-hidden font-sans transition-colors duration-700 ${
        isExiting || !isMorphed ? "text-zinc-100" : "text-zinc-900"
      }`}
    >
      {/* Morphing Baby Blue & Soft White Clouds Background Effect */}
      <AnimatePresence>
        {isMorphed && !isExiting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-gradient-to-br from-[#dbeafe] via-[#eff6ff] via-[#e0f2fe] to-[#bae6fd] pointer-events-none"
          >
            {/* Ambient Soft White & Blue Floating Cloud Orbs */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.6, 0.9, 0.6],
                x: [0, 40, 0],
                y: [0, -30, 0],
              }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 left-10 w-[450px] h-[450px] rounded-full bg-white/80 blur-[100px] pointer-events-none"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.5, 0.8, 0.5],
                x: [0, -50, 0],
                y: [0, 40, 0],
              }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-20 right-10 w-[550px] h-[550px] rounded-full bg-sky-200/90 blur-[120px] pointer-events-none"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10 relative z-10">
        {/* Top Left Navigation: Back to Journey */}
        <div className="flex items-center justify-start">
          <button
            onClick={(e) => handleNavigateAway("/journey", e)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all text-xs font-mono shadow-md cursor-pointer font-bold ${
              isMorphed && !isExiting
                ? "bg-white/90 border border-sky-300 text-blue-900 hover:bg-blue-600 hover:text-white"
                : "bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-amber-400 hover:border-amber-500/40"
            }`}
          >
            <ArrowRight size={16} className="rotate-180" />
            <span>Back to Journey</span>
          </button>
        </div>

        {/* Hero Header Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`p-8 sm:p-12 rounded-3xl border-4 transition-all shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-md ${
            isMorphed && !isExiting
              ? "bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 border-white/80"
              : "bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-amber-950/40 border-zinc-800"
          }`}
        >
          <div className="space-y-4 max-w-xl text-center md:text-left z-10 text-white">
            {/* Badge Bar */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-mono text-xs font-extrabold shadow-md ${
                isMorphed && !isExiting
                  ? "bg-yellow-400 text-zinc-950"
                  : "bg-amber-500/10 border border-amber-500/30 text-amber-400"
              }`}
            >
              <Music size={14} className={isMorphed && !isExiting ? "text-zinc-950" : "text-amber-400"} />
              <span>Tamil Early Learning • பாட்டரங்கம்</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
              Tamil Rhymes <br />
              <span
                className={`font-tamil text-3xl sm:text-5xl drop-shadow-lg ${
                  isMorphed && !isExiting ? "text-yellow-300" : "text-amber-400"
                }`}
              >
                வாங்க பாடலாம்!
              </span>
            </h1>

            <p className="text-sky-100 text-sm sm:text-base font-medium leading-relaxed drop-shadow-sm">
              Interactive 3D WebGL storybooks, rhymes, and curated video learning for children and beginners.
            </p>
          </div>

          {/* Automatic Smooth Floating & Pose Switching Mascot */}
          <div className="relative z-10 shrink-0 flex flex-col items-center">
            <motion.div
              animate={{
                y: [0, -14, 0, -6, 0],
                rotate: [-4, 4, -2, 2, 0],
                scale: [1, 1.04, 0.98, 1.02, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className={`w-48 h-48 sm:w-60 sm:h-60 md:w-64 md:h-64 rounded-full border-4 p-4 shadow-2xl relative overflow-hidden flex items-center justify-center shrink-0 ${
                isMorphed && !isExiting ? "bg-white/95 border-yellow-400" : "bg-amber-500/10 border-amber-500/30"
              }`}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={mascotIndex}
                  initial={{ opacity: 0, scale: 0.85, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.85, rotate: 10 }}
                  transition={{ duration: 0.4 }}
                  src={MASCOT_POSES[mascotIndex]}
                  alt="Ezhuthaani Mascot"
                  className="w-full h-full object-contain filter drop-shadow-lg"
                />
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>

        {/* Explore By Topic Category Chips */}
        <div className="space-y-3">
          <h3
            className={`text-xs font-mono font-bold uppercase tracking-widest px-1 flex items-center gap-2 ${
              isMorphed && !isExiting ? "text-blue-900" : "text-amber-400"
            }`}
          >
            Explore By Topic
          </h3>
          <div className="flex flex-wrap items-center gap-2.5">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border shadow-md ${
                    isSelected
                      ? isMorphed && !isExiting
                        ? `${cat.color} scale-105 ring-4 ring-white`
                        : "bg-amber-500 text-zinc-950 border-amber-400 font-extrabold"
                      : isMorphed && !isExiting
                      ? "bg-white text-zinc-700 hover:text-blue-900 border-sky-200 hover:border-blue-400"
                      : "bg-zinc-900 text-zinc-400 hover:text-zinc-100 border-zinc-800"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* SECTION 1: INTERACTIVE 3D RHYMES */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Box size={22} className={isMorphed && !isExiting ? "text-blue-700" : "text-amber-400"} />
              <h2
                className={`text-xl sm:text-2xl font-extrabold font-tamil ${
                  isMorphed && !isExiting ? "text-blue-950" : "text-zinc-100"
                }`}
              >
                Interactive 3D World (3D பாட்டுகள்)
              </h2>
            </div>
            <span
              className={`text-xs font-mono font-bold hidden sm:inline ${
                isMorphed && !isExiting ? "text-blue-800" : "text-zinc-400"
              }`}
            >
              Interactive WebGL Storybook
            </span>
          </div>

          {/* SINGLE 3D INTERACTIVE BOX CARD */}
          {INTERACTIVE_RHYMES.length > 0 && (
            <div className="grid grid-cols-1 gap-6">
              {(() => {
                const rhyme = INTERACTIVE_RHYMES[0];
                return (
                  <motion.div
                    key={rhyme.id}
                    whileHover={{ y: -3 }}
                    className={`p-6 sm:p-8 rounded-3xl border-3 transition-all shadow-xl space-y-5 flex flex-col md:flex-row items-stretch justify-between gap-6 group ${
                      isMorphed && !isExiting
                        ? "bg-white border-emerald-400 hover:border-emerald-500"
                        : "bg-zinc-900/90 border-zinc-800 hover:border-amber-500/40"
                    }`}
                  >
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="px-3.5 py-1 rounded-full bg-emerald-500 text-zinc-950 border border-emerald-300 text-[11px] font-mono font-bold uppercase shadow-sm">
                          3D Interactive World
                        </span>
                        <span
                          className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-md border ${
                            isMorphed && !isExiting
                              ? "text-blue-900 bg-blue-100 border-blue-300"
                              : "text-amber-400 bg-amber-500/10 border-amber-500/30"
                          }`}
                        >
                          {rhyme.ageGroup}
                        </span>
                      </div>

                      <div>
                        <h3
                          className={`text-2xl sm:text-3xl font-extrabold font-tamil leading-tight transition-colors ${
                            isMorphed && !isExiting
                              ? "text-zinc-900 group-hover:text-blue-600"
                              : "text-zinc-100 group-hover:text-amber-300"
                          }`}
                        >
                          {rhyme.titleTa}
                        </h3>
                        <p
                          className={`text-sm font-mono font-bold mt-1 ${
                            isMorphed && !isExiting ? "text-blue-700" : "text-amber-400"
                          }`}
                        >
                          {rhyme.titleEn}
                        </p>
                        <p
                          className={`text-xs sm:text-sm mt-1.5 font-normal leading-relaxed ${
                            isMorphed && !isExiting ? "text-zinc-600" : "text-zinc-400"
                          }`}
                        >
                          {rhyme.subtitleEn}
                        </p>
                      </div>

                      {/* Vocabulary preview pills */}
                      <div className="flex flex-wrap items-center gap-2 pt-2">
                        {rhyme.vocabulary.map((v) => (
                          <span
                            key={v.id}
                            className={`px-3 py-1 rounded-xl font-tamil text-xs font-bold border ${
                              isMorphed && !isExiting
                                ? "bg-sky-100 border-sky-300 text-blue-900"
                                : "bg-zinc-950 border-zinc-800 text-zinc-300"
                            }`}
                          >
                            {v.tamil} ({v.english})
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center justify-center md:w-56">
                      <button
                        onClick={(e) => handleNavigateAway(`/rhymes/${rhyme.slug}`, e)}
                        className="w-full py-4 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer text-center"
                      >
                        <span>Enter 3D World</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </motion.div>
                );
              })()}
            </div>
          )}
        </div>

        {/* SECTION 2: CURATED YOUTUBE VIDEO RHYMES */}
        <div
          className={`space-y-5 pt-6 border-t ${
            isMorphed && !isExiting ? "border-sky-300" : "border-zinc-800"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Film size={22} className={isMorphed && !isExiting ? "text-rose-600" : "text-amber-400"} />
              <h2
                className={`text-xl sm:text-2xl font-extrabold font-tamil ${
                  isMorphed && !isExiting ? "text-blue-950" : "text-zinc-100"
                }`}
              >
                Video Rhymes (யூடியூப் காணொளிகள்)
              </h2>
            </div>
            <span
              className={`text-xs font-mono font-bold hidden sm:inline ${
                isMorphed && !isExiting ? "text-rose-700" : "text-zinc-400"
              }`}
            >
              Curated Classic Tamil Songs
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <YouTubeRhymeCard key={video.id} video={video} onPlay={(vid) => setActiveVideo(vid)} />
            ))}
          </div>
        </div>

        {/* Modal YouTube Player */}
        {activeVideo && (
          <YouTubeRhymePlayer
            youtubeId={activeVideo.youtubeId}
            titleTa={activeVideo.titleTa}
            titleEn={activeVideo.titleEn}
            onClose={() => setActiveVideo(null)}
          />
        )}
      </div>
    </motion.div>
  );
}
