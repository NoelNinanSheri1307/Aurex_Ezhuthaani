"use client";

import { useState } from "react";
import { Search, X, Filter, Mic, Globe, Sparkles } from "lucide-react";
import { getAllCategories } from "@/lib/dictionary";
import { useSpeechToText } from "@/lib/stt";

export default function DictionarySearch({
  query,
  setQuery,
  selectedCategory,
  setSelectedCategory,
}: {
  query: string;
  setQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}) {
  const categories = getAllCategories();

  const {
    isListening,
    isTranscribing,
    fullTranscript,
    speechSupported,
    currentLang,
    setCurrentLang,
    toggleListening,
    resetTranscript,
  } = useSpeechToText({
    lang: "ta-IN",
    continuous: true,
    interimResults: true,
    onResult: (text) => {
      if (text) {
        setQuery(text);
      }
    },
  });

  const handleToggleMic = () => {
    if (!isListening) {
      resetTranscript();
    }
    toggleListening();
  };

  const toggleLanguage = () => {
    const nextLang = currentLang === "ta-IN" ? "en-IN" : "ta-IN";
    setCurrentLang(nextLang);
  };

  return (
    <div className="space-y-6">
      {/* Primary Search Input with Mic STT Button */}
      <div className="relative max-w-2xl mx-auto">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
          <Search size={20} />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Tamil word, English meaning, or speak (e.g. தமிழ், mother, ammaa)..."
          className={`w-full pl-12 pr-36 py-4 rounded-2xl bg-zinc-950/90 border text-zinc-100 placeholder:text-zinc-500 text-sm font-sans outline-none transition-all shadow-xl ${
            isListening
              ? "border-rose-500/70 ring-2 ring-rose-500/20"
              : "border-zinc-800 focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/20"
          }`}
        />

        {/* Action Controls inside Input (Language + Mic + Clear) */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          {/* STT Language Toggle Button */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="px-2 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-300 hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer"
            title={`Speech language: ${currentLang === "ta-IN" ? "Tamil" : "English"}. Click to switch.`}
          >
            <Globe size={12} className="text-amber-400" />
            <span>{currentLang === "ta-IN" ? "TA" : "EN"}</span>
          </button>

          {/* Microphone Speech-to-Text Button */}
          <button
            type="button"
            onClick={handleToggleMic}
            className={`p-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              isListening
                ? "bg-rose-500/20 border border-rose-500/40 text-rose-400 animate-pulse"
                : "bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-amber-400 hover:text-amber-300"
            }`}
            title={
              isListening
                ? "Listening... Click to stop"
                : speechSupported
                ? `Click to speak (${currentLang === "ta-IN" ? "Tamil" : "English"})`
                : "Speech recognition unavailable"
            }
          >
            <Mic size={18} className={isListening ? "animate-bounce" : ""} />
            {isListening && (
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider pr-1">
                Listening
              </span>
            )}
          </button>

          {/* Clear Search Button */}
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                resetTranscript();
              }}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
              title="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Voice Recording / Transcribing Status Badge */}
      {isTranscribing ? (
        <div className="flex items-center justify-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 py-2 px-4 rounded-xl max-w-md mx-auto">
          <Sparkles size={14} className="text-cyan-400 animate-spin" />
          <span>Processing speech with local Whisper model...</span>
        </div>
      ) : isListening ? (
        <div className="flex items-center justify-center gap-2 text-xs font-mono text-rose-400 bg-rose-500/10 border border-rose-500/30 py-2 px-4 rounded-xl max-w-md mx-auto animate-pulse">
          <Sparkles size={14} className="text-rose-400" />
          <span>
            Listening continuously in {currentLang === "ta-IN" ? "Tamil" : "English"}... Speak at your normal pace!
          </span>
        </div>
      ) : null}

      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
        <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 mr-2 shrink-0">
          <Filter size={14} className="text-amber-400" />
          <span>Category:</span>
        </div>
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-amber-500 text-zinc-950 font-bold shadow-lg shadow-amber-500/20"
                  : "bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}

