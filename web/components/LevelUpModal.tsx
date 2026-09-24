"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth";
import StylusEmblem from "@/components/StylusEmblem";
import { Award, Sparkles, Flame, CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";

const LEVEL_TITLES: { [key: number]: { en: string; ta: string } } = {
  1: { en: "Beginner Scribe", ta: "தொடக்க எழுத்தாளர்" },
  2: { en: "Scholar Apprentice", ta: "தமிழ் மாணவர்" },
  3: { en: "Tamil Connoisseur", ta: "தமிழ் அறிஞர்" },
  4: { en: "Master Linguist", ta: "தமிழ் வல்லுநர்" },
  5: { en: "Sangam Master", ta: "சங்க புலவர்" },
  6: { en: "Sovereign Academic", ta: "செம்மொழிப் பேரரசர்" },
};

export default function LevelUpModal() {
  const { user, levelUpData, clearLevelUpData } = useAuth();
  const audioPlayedRef = useRef<boolean>(false);

  // Sound Synth Effect for Level Up
  const playLevelUpSound = () => {
    if (typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      // Arpeggio notes: C5, E5, G5, C6
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);
        gain.gain.setValueAtTime(0, now + idx * 0.12);
        gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.12 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.45);
      });
    } catch {
      // Ignore audio autoplay restrictions
    }
  };

  useEffect(() => {
    if (levelUpData && !audioPlayedRef.current) {
      playLevelUpSound();
      audioPlayedRef.current = true;
    }
    if (!levelUpData) {
      audioPlayedRef.current = false;
    }
  }, [levelUpData]);

  if (!levelUpData || !user) return null;

  const levelUpInfo = levelUpData;

  const titleInfo = LEVEL_TITLES[levelUpInfo.newLevel] || {
    en: "Legendary Scholar",
    ta: "புகழ்பெற்ற புலவர்",
  };

  // XP Calculations for Next Level
  const currentLevelFloor = (levelUpInfo.newLevel - 1) ** 2 * 100;
  const nextLevelXpFloor = levelUpInfo.newLevel ** 2 * 100;
  const totalXpForNextLevel = nextLevelXpFloor - currentLevelFloor;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        {/* Animated Confetti Particles Backdrop */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 28 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: `${Math.random() * 100}vw`,
                y: "-10vh",
                rotate: 0,
                scale: Math.random() * 0.8 + 0.4,
              }}
              animate={{
                y: "110vh",
                rotate: Math.random() * 720 - 360,
              }}
              transition={{
                duration: Math.random() * 3 + 2.5,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 1.5,
              }}
              className="absolute w-3 h-3 rounded-sm"
              style={{
                backgroundColor: [
                  "#f59e0b",
                  "#10b981",
                  "#fbbf24",
                  "#3b82f6",
                  "#ec4899",
                  "#8b5cf6",
                ][i % 6],
              }}
            />
          ))}
        </div>

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="relative max-w-md w-full bg-zinc-950 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 text-center space-y-6 shadow-2xl shadow-amber-500/20 glow-amber"
        >
          {/* Glowing Header Badge */}
          <div className="space-y-2">
            <span className="px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-400 font-mono text-xs uppercase tracking-widest font-bold inline-flex items-center gap-1.5">
              <Sparkles size={14} className="text-amber-400 animate-spin" /> LEVEL UP UNLOCKED!
            </span>
            <h2 className="font-serif text-3xl font-bold text-zinc-100">
              Level {levelUpInfo.newLevel} Achieved!
            </h2>
          </div>

          {/* Celebratory Mascot Emblem */}
          <div className="relative py-2 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.08, 1], rotate: [0, 2, -2, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
            >
              <StylusEmblem size={110} variant="celebrate" />
            </motion.div>
          </div>

          {/* User Message */}
          <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-2">
            <p className="text-base font-semibold text-amber-300 font-serif">
              "Yay! You have moved on from Level {levelUpInfo.oldLevel} to Level {levelUpInfo.newLevel}!"
            </p>
            <p className="text-xs font-mono text-zinc-400">
              New Title Earned: <span className="text-emerald-400 font-bold">{titleInfo.en}</span> (
              <span className="font-tamil text-amber-400">{titleInfo.ta}</span>)
            </p>
          </div>

          {/* XP Game Scaling Formula Info */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-left space-y-2 text-xs font-mono">
            <div className="flex items-center justify-between text-amber-400 font-bold">
              <span className="flex items-center gap-1">
                <ShieldCheck size={14} /> Level {levelUpInfo.newLevel} Progress
              </span>
              <span>{user.xp} Total XP</span>
            </div>
            <p className="text-zinc-300 font-light text-[11px]">
              Next rank requires <span className="text-amber-300 font-bold">{totalXpForNextLevel} XP</span> for Level {levelUpInfo.newLevel + 1}. XP requirements increase quadratically per rank.
            </p>
          </div>

          {/* Continue Button */}
          <button
            onClick={clearLevelUpData}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 text-zinc-950 font-mono font-bold text-xs uppercase tracking-wider hover:from-amber-400 hover:to-amber-300 shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Continue Learning Journey</span>
            <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
