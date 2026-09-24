"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Volume2, HelpCircle, RefreshCw } from "lucide-react";
import StylusEmblem from "@/components/StylusEmblem";

interface GameShellProps {
  title: string;
  titleTa: string;
  subtitle: string;
  category?: string;
  wordIndex: number;
  totalWords: number;
  onRefresh?: () => void;
  onTts?: () => void;
  children: React.ReactNode;
}

export default function GameShell({
  title,
  titleTa,
  subtitle,
  category,
  wordIndex,
  totalWords,
  onRefresh,
  onTts,
  children,
}: GameShellProps) {
  const [isPlayingTts, setIsPlayingTts] = useState(false);

  const handleTtsClick = () => {
    if (onTts) {
      setIsPlayingTts(true);
      onTts();
      setTimeout(() => setIsPlayingTts(false), 1200);
    }
  };

  return (
    <div className="min-h-screen bg-[#07070a] text-zinc-100 flex flex-col font-sans">
      {/* Top Bar Header */}
      <header className="sticky top-0 z-30 bg-[#07070a]/90 backdrop-blur-md border-b border-zinc-800/80 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/journey"
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-amber-400 hover:border-amber-500/40 transition-all flex items-center gap-1.5"
              title="Return to Journey"
            >
              <ArrowLeft size={18} />
              <span className="text-xs font-mono hidden sm:inline">Back to Journey</span>
            </Link>
            <div className="flex items-center gap-2">
              <StylusEmblem size={26} variant="landing" />
              <div>
                <h1 className="text-sm sm:text-base font-bold text-zinc-100 flex items-center gap-2 leading-tight">
                  {title} <span className="text-amber-400 font-tamil font-semibold text-xs">{titleTa}</span>
                </h1>
                <p className="text-[10px] text-zinc-400 font-mono hidden sm:block">{subtitle}</p>
              </div>
            </div>
          </div>

          {/* Right Action Icons & Progress */}
          <div className="flex items-center gap-2.5">
            {category && (
              <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-mono font-semibold">
                {category}
              </span>
            )}

            {onTts && (
              <button
                onClick={handleTtsClick}
                className={`p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-amber-400 hover:border-amber-500/40 transition-all cursor-pointer ${
                  isPlayingTts ? "text-amber-400 border-amber-500/50 scale-105" : ""
                }`}
                title="Hear Pronunciation (TTS)"
              >
                <Volume2 size={18} className={isPlayingTts ? "animate-pulse" : ""} />
              </button>
            )}

            {onRefresh && (
              <button
                onClick={onRefresh}
                className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-amber-400 hover:border-amber-500/40 transition-all cursor-pointer"
                title="Shuffle / Next Pool"
              >
                <RefreshCw size={18} />
              </button>
            )}

            <div className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono font-bold">
              <span className="text-amber-400">{wordIndex + 1}</span> / {totalWords}
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 flex flex-col justify-center">
        {children}
      </main>
    </div>
  );
}
