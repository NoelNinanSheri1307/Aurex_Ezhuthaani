"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Award,
  CheckCircle2,
  Lock,
  Share2,
  Sparkles,
  Zap,
  ShieldCheck,
  Check,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import Link from "next/link";

export type BadgeDetail = {
  id: string;
  order: number;
  title: string;
  titleTa: string;
  subtitle?: string;
  desc: string;
  isUnlocked: boolean;
  unlockedAt?: string;
  xpReward?: number;
};

interface BadgeModalProps {
  badge: BadgeDetail | null;
  onClose: () => void;
  onNavigateToStage?: (stageId: string) => void;
}

export default function BadgeModal({ badge, onClose, onNavigateToStage }: BadgeModalProps) {
  const [copied, setCopied] = useState(false);

  if (!badge) return null;

  const handleShare = () => {
    const text = `🏆 I earned the "${badge.title}" (${badge.titleTa}) Badge on Ezhuthaani Tamil Platform! 🚀`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl overflow-y-auto">
        {/* Backdrop click to dismiss */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 z-0"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 25 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { type: "spring", stiffness: 350, damping: 24 },
          }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          className="relative z-10 max-w-lg w-full bg-zinc-950 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_80px_rgba(245,158,11,0.2)] text-center space-y-6 overflow-hidden my-8"
        >
          {/* Ambient Glow Orbs in Background */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors cursor-pointer z-20"
          >
            <X size={18} />
          </button>

          {/* Expanded Badge Image Box with Floating Physics */}
          <div className="relative pt-4">
            <motion.div
              animate={
                badge.isUnlocked
                  ? {
                      y: [0, -10, 0],
                      rotate: [0, 1.5, -1.5, 0],
                    }
                  : {}
              }
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto flex items-center justify-center"
            >
              {/* Golden Ring Aura for Unlocked Badges */}
              {badge.isUnlocked && (
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-400/30 to-amber-600/20 blur-xl animate-pulse" />
              )}

              <img
                src={`/assets/badge${badge.order}.png`}
                alt={badge.title}
                className={`w-full h-full object-contain relative z-10 transition-all duration-500 ${
                  badge.isUnlocked
                    ? "drop-shadow-[0_0_25px_rgba(245,158,11,0.65)] scale-105"
                    : "grayscale opacity-40 scale-95"
                }`}
              />

              {!badge.isUnlocked && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 rounded-full backdrop-blur-sm border border-zinc-800">
                  <Lock size={36} className="text-zinc-400" />
                </div>
              )}
            </motion.div>

            {/* Status Pill Badge */}
            <div className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase border shadow-md">
              {badge.isUnlocked ? (
                <span className="bg-emerald-500/20 border-emerald-500/40 text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-400" /> Earned & Verified Badge
                </span>
              ) : (
                <span className="bg-zinc-900 border-zinc-800 text-zinc-400 flex items-center gap-1.5">
                  <Lock size={14} className="text-zinc-500" /> Milestone Locked
                </span>
              )}
            </div>
          </div>

          {/* Badge Header Titles */}
          <div className="space-y-1">
            <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest block">
              Stage 0{badge.order} Milestone Emblem
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-100">
              {badge.title}
            </h2>
            <h3 className="text-lg font-tamil font-semibold text-amber-400">
              {badge.titleTa}
            </h3>
            {badge.subtitle && (
              <p className="text-xs font-mono text-zinc-400 mt-1">{badge.subtitle}</p>
            )}
          </div>

          {/* Badge Description Box */}
          <div className="bg-zinc-900/70 border border-zinc-800/90 p-4 rounded-2xl text-left space-y-2 text-xs leading-relaxed text-zinc-300">
            <div className="flex items-center justify-between text-zinc-400 font-mono font-semibold">
              <span className="flex items-center gap-1 text-amber-400">
                <Sparkles size={14} /> Milestone Achievement
              </span>
              <span className="text-emerald-400 flex items-center gap-1 font-bold">
                <Zap size={13} /> +{badge.xpReward || 50} XP
              </span>
            </div>
            <p className="font-light text-zinc-300">{badge.desc}</p>
          </div>

          {/* Share & Interactive Actions Footer */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            {badge.isUnlocked ? (
              <button
                onClick={handleShare}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-amber-500/20"
              >
                {copied ? <Check size={16} /> : <Share2 size={16} />}
                {copied ? "Copied Achievement!" : "Share Badge Achievement"}
              </button>
            ) : (
              <Link
                href={`/quiz/${badge.id}`}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-amber-500/20"
              >
                <BookOpen size={16} /> Take Stage 0{badge.order} Quiz to Unlock <ArrowRight size={14} />
              </Link>
            )}

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 font-mono text-xs font-semibold transition-colors cursor-pointer"
            >
              Close Inspection
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
