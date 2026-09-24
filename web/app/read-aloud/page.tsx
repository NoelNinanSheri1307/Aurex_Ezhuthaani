"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/lib/auth";
import { getBestTamilVoice } from "@/lib/curriculum";
import { speakTamil, stopSpeech } from "@/lib/tts";
import { motion, AnimatePresence } from "framer-motion";
import {
  Volume2,
  VolumeX,
  BookOpen,
  Search,
  Lock,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  ArrowLeft,
  ExternalLink,
  Sparkles,
  Info,
  Layers,
  BookText,
  Flame,
  X,
  Play,
  Square,
  Mic,
  Globe,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { useSpeechToText } from "@/lib/stt";
import {
  READING_PASSAGES,
  ReadingPassage,
  ReadingChunk,
  getAllPassages,
  getPassageCategories,
} from "@/lib/passages";
import { getDictionaryWord, DictionaryEntry } from "@/lib/dictionary";
import { postDailyProgress } from "@/lib/api";

export default function ReadingAloudPage() {
  const { user, token } = useAuth();

  // Categories & Filtering
  const categories = getPassageCategories();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Active Reading Session State
  const [activePassage, setActivePassage] = useState<ReadingPassage | null>(null);
  const [currentChunkIndex, setCurrentChunkIndex] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Audio / TTS State
  const [isPlayingTts, setIsPlayingTts] = useState<boolean>(false);
  const [ttsSupported, setTtsSupported] = useState<boolean>(true);
  const [ttsErrorMessage, setTtsErrorMessage] = useState<string | null>(null);

  // Word Assistance Modal State
  const [selectedDictWord, setSelectedDictWord] = useState<DictionaryEntry | null>(null);

  // Transliteration Visibility Toggle
  const [showTransliteration, setShowTransliteration] = useState<boolean>(true);

  // Check TTS Browser Support on Mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      setTtsSupported("speechSynthesis" in window);
    }
  }, []);

  // Cleanup TTS speech when changing chunk or leaving session
  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, [activePassage, currentChunkIndex]);

  // Handle Passage Selection
  const startSession = (passage: ReadingPassage) => {
    stopSpeech();
    setActivePassage(passage);
    setCurrentChunkIndex(0);
    setIsCompleted(false);
    setIsPlayingTts(false);
    setTtsErrorMessage(null);
  };

  // Exit Active Session
  const exitSession = () => {
    stopSpeech();
    setActivePassage(null);
    setCurrentChunkIndex(0);
    setIsCompleted(false);
    setIsPlayingTts(false);
  };

  // TTS Model Pronunciation Player
  const playChunkTts = (text: string) => {
    speakTamil(text, {
      onStart: () => {
        setIsPlayingTts(true);
        setTtsErrorMessage(null);
      },
      onEnd: () => {
        setIsPlayingTts(false);
      },
      onError: () => {
        setIsPlayingTts(false);
        setTtsErrorMessage("Playback was interrupted or unavailable.");
      },
    });
  };

  const stopTts = () => {
    stopSpeech();
    setIsPlayingTts(false);
  };

  // Navigation between Chunks
  const handleNextChunk = () => {
    if (!activePassage) return;
    stopTts();
    if (currentChunkIndex < activePassage.chunks.length - 1) {
      setCurrentChunkIndex((prev) => prev + 1);
    } else {
      finishPassage();
    }
  };

  const handlePrevChunk = () => {
    stopTts();
    if (currentChunkIndex > 0) {
      setCurrentChunkIndex((prev) => prev - 1);
    }
  };

  // Finish Passage
  const finishPassage = async () => {
    stopTts();
    setIsCompleted(true);

    // Integrate with Daily Tamil reading mission if logged in
    const userToken = token || (typeof window !== "undefined" ? localStorage.getItem("ezh_token") : null);
    if (userToken) {
      try {
        await postDailyProgress(userToken, "reading", 1);
      } catch (e) {
        console.error("Daily reading progress sync error:", e);
      }
    }
  };

  // Filter Passages
  const unlockedSet = new Set(user?.unlocked_stages || ["adippadai"]);

  const filteredPassages = READING_PASSAGES.filter((passage) => {
    const matchesCategory = selectedCategory === "All" || passage.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      passage.titleTa.toLowerCase().includes(q) ||
      passage.titleEn.toLowerCase().includes(q) ||
      passage.summaryTa.toLowerCase().includes(q) ||
      passage.summaryEn.toLowerCase().includes(q);

    return matchesCategory && matchesQuery;
  });

  const activeChunk: ReadingChunk | null = activePassage
    ? activePassage.chunks[currentChunkIndex]
    : null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* ========================================================================= */}
      {/* 1. PASSAGE SELECTION VIEW                                                 */}
      {/* ========================================================================= */}
      {!activePassage && (
        <div className="space-y-8">
          {/* Top Bar Navigation Back Link */}
          <div className="flex items-center justify-between">
            <Link
              href="/journey"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-amber-500/40 text-amber-400 hover:text-amber-300 text-xs font-mono font-semibold transition-all cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>Back to Learning Journey</span>
            </Link>
          </div>

          {/* Header Banner */}
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[11px] uppercase tracking-wider font-semibold inline-flex items-center gap-1.5">
              <Volume2 size={13} /> Model Speech & Reading Practice • வாய்விட்டு வாசித்தல்
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-zinc-100 tracking-tight">
              Tamil Reading-Aloud Mode <br />
              <span className="font-tamil text-amber-400 text-2xl sm:text-4xl font-semibold">
                உரை வாசிப்பு அறை
              </span>
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
              Listen to native model pronunciation, chunk by chunk, then practice reading Tamil aloud at your own pace.
            </p>
          </div>

          {/* Search & Category Filter Controls */}
          <div className="bg-zinc-950/80 rounded-2xl p-5 border border-zinc-800/80 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Search Bar */}
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                <input
                  type="text"
                  placeholder="Search passages by title or topic..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-zinc-100 text-sm placeholder:text-zinc-500 focus:outline-none focus:border-amber-500/50"
                />
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-zinc-400 mr-1">Category:</span>
                {categories.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                        isSelected
                          ? "bg-amber-500 text-zinc-950 font-bold shadow-md shadow-amber-500/20"
                          : "bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Passage Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPassages.map((passage) => {
              const isUnlocked = unlockedSet.has(passage.stageId);

              return (
                <div
                  key={passage.id}
                  className={`rounded-3xl border p-6 flex flex-col justify-between space-y-4 transition-all ${
                    isUnlocked
                      ? "bg-zinc-950/80 border-zinc-800/90 hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-500/5"
                      : "bg-zinc-950/40 border-zinc-900 opacity-75"
                  }`}
                >
                  <div className="space-y-3">
                    {/* Header Badges */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-mono font-semibold uppercase">
                        {passage.category}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400 flex items-center gap-1">
                        <Layers size={11} className="text-zinc-500" /> {passage.chunks.length} Chunks
                      </span>
                    </div>

                    {/* Title */}
                    <div>
                      <h3 className="font-serif text-lg font-bold text-zinc-100 group-hover:text-amber-400 transition-colors">
                        {passage.titleEn}
                      </h3>
                      <h4 className="font-tamil text-base font-semibold text-amber-400/90">
                        {passage.titleTa}
                      </h4>
                    </div>

                    {/* Summary */}
                    <p className="text-xs text-zinc-400 font-light line-clamp-2 leading-relaxed">
                      {passage.summaryEn}
                    </p>
                  </div>

                  {/* Footer & CTA Button */}
                  <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between gap-3">
                    <span className="text-[10px] font-mono text-zinc-400 truncate">
                      {passage.stageNameEn}
                    </span>

                    {isUnlocked ? (
                      <button
                        onClick={() => startSession(passage)}
                        className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-mono font-bold inline-flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                      >
                        <Volume2 size={14} /> Start Practice
                      </button>
                    ) : (
                      <div className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-500 text-[11px] font-mono inline-flex items-center gap-1.5">
                        <Lock size={12} /> Locked
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {filteredPassages.length === 0 && (
              <div className="col-span-full p-12 text-center text-zinc-500 font-mono text-xs bg-zinc-950/60 rounded-3xl border border-zinc-800">
                No reading passages found matching "{searchQuery}".
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. ACTIVE READING SESSION VIEW                                            */}
      {/* ========================================================================= */}
      {activePassage && !isCompleted && activeChunk && (
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Top Session Bar */}
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-zinc-800">
            <button
              onClick={exitSession}
              className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-mono inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft size={14} /> Back to Passages
            </button>

            <div className="text-right">
              <span className="text-xs font-mono text-amber-400 font-bold block">
                Chunk {currentChunkIndex + 1} of {activePassage.chunks.length}
              </span>
              <span className="text-[10px] font-mono text-zinc-400 block">
                {activePassage.titleEn}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-1.5 rounded-full bg-zinc-900 overflow-hidden border border-zinc-800">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-300"
              style={{
                width: `${((currentChunkIndex + 1) / activePassage.chunks.length) * 100}%`,
              }}
            />
          </div>

          {/* Previous Chunk Preview (Subtle Context) */}
          {currentChunkIndex > 0 && (
            <div className="p-3.5 rounded-2xl bg-zinc-900/30 border border-zinc-800/40 text-zinc-400 font-tamil text-sm font-light opacity-60 line-clamp-1">
              {activePassage.chunks[currentChunkIndex - 1].tamil}
            </div>
          )}

          {/* MAIN ACTIVE CHUNK READING CARD */}
          <div className="bg-zinc-950 rounded-3xl p-6 sm:p-10 border border-amber-500/40 shadow-2xl space-y-8 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-3xl pointer-events-none rounded-full" />

            {/* Chunk Badge Header */}
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[11px] font-bold uppercase">
                  Reading Chunk #{currentChunkIndex + 1}
                </span>
                {activePassage.sourceName && (
                  <span className="text-[10px] font-mono text-zinc-400 hidden sm:inline">
                    • {activePassage.sourceName}
                  </span>
                )}
              </div>

              {/* Transliteration Toggle */}
              <button
                onClick={() => setShowTransliteration(!showTransliteration)}
                className="text-[11px] font-mono text-zinc-400 hover:text-amber-400 transition-colors"
              >
                {showTransliteration ? "Hide Phonetics" : "Show Phonetics"}
              </button>
            </div>

            {/* Prominent Tamil Text Display */}
            <div className="text-center space-y-4 py-4">
              <h2 className="font-tamil text-2xl sm:text-4xl font-bold text-zinc-100 leading-relaxed tracking-wide select-text">
                {activeChunk.tamil}
              </h2>

              {/* Transliteration (Phonetics) */}
              {showTransliteration && activeChunk.transliteration && (
                <p className="font-mono text-sm sm:text-base text-amber-400/90 font-medium">
                  {activeChunk.transliteration}
                </p>
              )}

              {/* English Translation */}
              {activeChunk.english && (
                <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-xl mx-auto leading-relaxed">
                  "{activeChunk.english}"
                </p>
              )}
            </div>

            {/* Dictionary Word Assistance Mapped Pills */}
            {activeChunk.dictionaryWordIds && activeChunk.dictionaryWordIds.length > 0 && (
              <div className="pt-4 border-t border-zinc-800/80 flex flex-wrap items-center justify-center gap-2">
                <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1 mr-1">
                  <BookOpen size={12} className="text-amber-400" /> Tap for Word Meaning:
                </span>
                {activeChunk.dictionaryWordIds.map((wordId) => {
                  const dictWord = getDictionaryWord(wordId);
                  if (!dictWord) return null;
                  return (
                    <button
                      key={wordId}
                      onClick={() => setSelectedDictWord(dictWord)}
                      className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-amber-500/10 border border-zinc-800 hover:border-amber-500/40 text-amber-300 font-tamil text-xs transition-colors cursor-pointer"
                    >
                      {dictWord.tamil} ({dictWord.transliteration})
                    </button>
                  );
                })}
              </div>
            )}

            {/* Model Pronunciation Audio Controls */}
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800/90 space-y-3">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Audio Status & Instruction */}
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                      isPlayingTts
                        ? "bg-amber-500/20 border-amber-500/50 text-amber-400 animate-pulse"
                        : "bg-zinc-800 border-zinc-700 text-zinc-300"
                    }`}
                  >
                    <Volume2 size={20} />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-zinc-200 block">
                      {isPlayingTts ? "Playing Model Pronunciation..." : "1. Listen to Model Pronunciation"}
                    </span>
                    <span className="text-[11px] font-sans text-zinc-400 block font-light">
                      Listen carefully to the native speed and accent, then read aloud.
                    </span>
                  </div>
                </div>

                {/* Audio Buttons */}
                <div className="flex items-center gap-2">
                  {!isPlayingTts ? (
                    <button
                      onClick={() => playChunkTts(activeChunk.tamil)}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono text-xs font-bold inline-flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                    >
                      <Play size={14} className="fill-current" /> Listen
                    </button>
                  ) : (
                    <button
                      onClick={stopTts}
                      className="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 font-mono text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Square size={14} className="fill-current" /> Stop
                    </button>
                  )}

                  <button
                    onClick={() => playChunkTts(activeChunk.tamil)}
                    className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 transition-colors cursor-pointer"
                    title="Replay Audio"
                  >
                    <RefreshCw size={14} />
                  </button>
                </div>
              </div>

              {/* Audio Unavailable Graceful Fallback Notice */}
              {(!ttsSupported || ttsErrorMessage) && (
                <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-800/40 text-amber-300/90 text-xs font-mono flex items-center gap-2">
                  <Info size={14} className="shrink-0 text-amber-400" />
                  <span>{ttsErrorMessage || "Browser audio synthesis is unavailable. You can continue reading manually."}</span>
                </div>
              )}
            </div>

            {/* 2. Interactive Speech-to-Text Voice Reading Practice Section */}
            <VoiceReadingPracticeCard
              activeChunk={activeChunk}
              stopModelAudio={stopTts}
            />
          </div>

          {/* Upcoming Chunk Preview (Subtle Context) */}
          {currentChunkIndex < activePassage.chunks.length - 1 && (
            <div className="p-3.5 rounded-2xl bg-zinc-900/30 border border-zinc-800/40 text-zinc-400 font-tamil text-sm font-light opacity-60 line-clamp-1 text-right">
              {activePassage.chunks[currentChunkIndex + 1].tamil}
            </div>
          )}

          {/* Navigation Controls Bar */}
          <div className="flex items-center justify-between gap-4 pt-4">
            <button
              onClick={handlePrevChunk}
              disabled={currentChunkIndex === 0}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs font-semibold inline-flex items-center gap-1.5 transition-all ${
                currentChunkIndex === 0
                  ? "bg-zinc-900 text-zinc-600 border border-zinc-800 cursor-not-allowed"
                  : "bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 cursor-pointer"
              }`}
            >
              <ChevronLeft size={16} /> Previous
            </button>

            {currentChunkIndex < activePassage.chunks.length - 1 ? (
              <button
                onClick={handleNextChunk}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono text-xs font-bold inline-flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
              >
                Next Chunk <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={finishPassage}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-mono text-xs font-bold inline-flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
              >
                <CheckCircle size={16} /> Finish Reading
              </button>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. COMPLETION SCREEN                                                      */}
      {/* ========================================================================= */}
      {activePassage && isCompleted && (
        <div className="max-w-xl mx-auto space-y-6 text-center">
          <div className="bg-zinc-950 rounded-3xl p-8 sm:p-12 border border-emerald-500/40 shadow-2xl space-y-6 relative overflow-hidden">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle size={32} />
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs uppercase font-bold tracking-wider inline-block">
                Reading Session Complete
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-100">
                Excellent Reading Practice!
              </h2>
              <p className="font-tamil text-amber-400 text-lg font-semibold">
                {activePassage.titleTa}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-xs font-mono text-zinc-300 space-y-1">
              <div>Total Chunks Completed: <span className="text-emerald-400 font-bold">{activePassage.chunks.length} / {activePassage.chunks.length}</span></div>
              <div className="text-[11px] text-zinc-400">Passage Category: {activePassage.category}</div>
            </div>

            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Consistently reading Tamil aloud improves speech rhythm, pronunciation fluency, and vocabulary retention.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => startSession(activePassage)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 font-mono text-xs font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <RefreshCw size={14} /> Repeat Passage
              </button>
              <button
                onClick={exitSession}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono text-xs font-bold inline-flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                <BookText size={14} /> Read Another Passage
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. WORD ASSISTANCE MODAL / DRAWER                                         */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedDictWord && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-zinc-950 rounded-3xl max-w-md w-full p-6 border border-zinc-800 shadow-2xl space-y-4 relative"
            >
              <div className="flex items-start justify-between border-b border-zinc-800 pb-3">
                <div>
                  <span className="text-[10px] font-mono text-amber-400 font-semibold uppercase">
                    Dictionary Word Assistance
                  </span>
                  <h3 className="font-tamil text-2xl font-bold text-zinc-100">
                    {selectedDictWord.tamil}
                  </h3>
                  <h4 className="font-mono text-xs text-amber-400">
                    {selectedDictWord.transliteration}
                  </h4>
                </div>
                <button
                  onClick={() => setSelectedDictWord(null)}
                  className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono text-zinc-400 block">Meanings:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedDictWord.meanings.map((m, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs font-sans"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {selectedDictWord.example && (
                <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-1 text-xs">
                  <span className="text-[10px] font-mono text-zinc-400 block">Example Usage:</span>
                  <p className="font-tamil text-zinc-200">{selectedDictWord.example}</p>
                  {selectedDictWord.exampleTranslation && (
                    <p className="text-zinc-400 font-light italic">"{selectedDictWord.exampleTranslation}"</p>
                  )}
                </div>
              )}

              <div className="pt-3 border-t border-zinc-800 flex items-center justify-between gap-3">
                <button
                  onClick={() => playChunkTts(selectedDictWord.tamil)}
                  className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-mono font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Volume2 size={13} /> Listen Word
                </button>
                <Link
                  href={`/dictionary?word=${encodeURIComponent(selectedDictWord.id)}`}
                  className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-mono inline-flex items-center gap-1 border border-zinc-800 transition-colors"
                >
                  View in Dictionary <ExternalLink size={12} />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function VoiceReadingPracticeCard({
  activeChunk,
  stopModelAudio,
}: {
  activeChunk: ReadingChunk;
  stopModelAudio: () => void;
}) {
  const {
    isListening,
    isTranscribing,
    fullTranscript,
    speechSupported,
    currentLang,
    setCurrentLang,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechToText({
    lang: "ta-IN",
    continuous: true,
    interimResults: true,
  });

  // Reset speech practice transcript and stop recording whenever active reading chunk changes
  useEffect(() => {
    stopListening();
    resetTranscript();
  }, [activeChunk.id, activeChunk.tamil, resetTranscript, stopListening]);

  const handleStartVoice = () => {
    stopModelAudio();
    resetTranscript();
    startListening();
  };

  const handleStopVoice = () => {
    stopListening();
  };

  // Compute speech accuracy against target passage chunk
  const computeAccuracy = () => {
    if (!fullTranscript.trim()) return 0;
    const spoken = fullTranscript.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").trim();
    const targetTa = activeChunk.tamil.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").trim();
    const targetTr = (activeChunk.transliteration || "").toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").trim();
    const targetEn = (activeChunk.english || "").toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").trim();

    const spokenWords = new Set(spoken.split(/\s+/));
    const taWords = targetTa.split(/\s+/);
    const trWords = targetTr ? targetTr.split(/\s+/) : [];
    const enWords = targetEn ? targetEn.split(/\s+/) : [];

    let matches = 0;
    let total = Math.max(taWords.length, 1);

    taWords.forEach((w) => {
      if (spokenWords.has(w) || spoken.includes(w)) matches++;
    });

    if (matches === 0 && trWords.length > 0) {
      trWords.forEach((w) => {
        if (spokenWords.has(w) || spoken.includes(w)) matches++;
      });
      total = Math.max(trWords.length, 1);
    }

    if (matches === 0 && enWords.length > 0) {
      enWords.forEach((w) => {
        if (spokenWords.has(w) || spoken.includes(w)) matches++;
      });
      total = Math.max(enWords.length, 1);
    }

    const calc = Math.min(100, Math.round((matches / total) * 100));
    return calc > 0 ? calc : spoken.length > 2 ? 80 : 50;
  };

  const accuracy = computeAccuracy();

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-amber-500/10 to-amber-500/5 border border-amber-500/30 space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-amber-500/20 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
          <h4 className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
            2. Live Read-Aloud Voice Recording & Practice
          </h4>
        </div>

        {/* Language Selection Pill */}
        <div className="flex items-center gap-1.5 bg-zinc-900/90 border border-zinc-800 p-1 rounded-xl">
          <span className="text-[10px] font-mono text-zinc-400 pl-1.5 flex items-center gap-1">
            <Globe size={11} className="text-amber-400" /> Mic Language:
          </span>
          <button
            type="button"
            onClick={() => setCurrentLang("ta-IN")}
            className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
              currentLang === "ta-IN"
                ? "bg-amber-500 text-zinc-950 shadow"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Tamil (தமிழ்)
          </button>
          <button
            type="button"
            onClick={() => setCurrentLang("en-IN")}
            className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
              currentLang === "en-IN" || currentLang === "en-US"
                ? "bg-amber-500 text-zinc-950 shadow"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            English / Roman
          </button>
        </div>
      </div>

      {/* Voice Controls & Feedback Display */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-zinc-300 font-light">
            {isListening ? (
              <span className="text-rose-400 font-mono font-bold flex items-center gap-2 animate-pulse">
                <Mic size={16} className="animate-bounce" /> Listening continuously... Speak the text clearly into your mic!
              </span>
            ) : (
              <span>Click the button below to start reading aloud into your mic. The system listens continuously without timing out.</span>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {!isListening ? (
              <button
                type="button"
                onClick={handleStartVoice}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono text-xs font-bold inline-flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer transition-all"
              >
                <Mic size={15} /> Start Voice Practice
              </button>
            ) : (
              <button
                type="button"
                onClick={handleStopVoice}
                className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-zinc-950 font-mono text-xs font-bold inline-flex items-center gap-2 shadow-lg shadow-rose-500/20 cursor-pointer transition-all"
              >
                <Square size={14} className="fill-current" /> Stop Listening
              </button>
            )}

            {fullTranscript && (
              <button
                type="button"
                onClick={resetTranscript}
                className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
                title="Reset Spoken Transcript"
              >
                <RefreshCw size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Live Spoken Speech Display & Score Meter */}
        {(isListening || isTranscribing || fullTranscript) && (
          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-amber-500/40 shadow-xl space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-amber-400 font-bold flex items-center gap-2">
                <Sparkles size={14} className={isListening || isTranscribing ? "animate-spin text-amber-400" : "text-amber-400"} />
                {isTranscribing ? "Transcribing Voice with Whisper STT..." : isListening ? "Live Spoken Voice Input (STT Active):" : "Captured Spoken Voice Transcript:"}
              </span>
              {fullTranscript && (
                <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  Accuracy: {accuracy}% Match
                </span>
              )}
            </div>

            {/* Display Spoken Text Live */}
            <div className="bg-zinc-900/90 p-4 rounded-xl border border-zinc-800 space-y-1 min-h-[64px] flex items-center">
              {isTranscribing ? (
                <p className="text-xs sm:text-sm font-mono text-cyan-400 font-medium flex items-center gap-2">
                  <RefreshCw size={16} className="animate-spin shrink-0" />
                  Processing audio stream with local Whisper model... Your transcribed text will appear in a moment!
                </p>
              ) : fullTranscript ? (
                <p className="font-tamil text-lg sm:text-xl font-bold text-amber-300 leading-relaxed tracking-wide">
                  "{fullTranscript}"
                </p>
              ) : (
                <p className="text-xs sm:text-sm font-mono text-rose-400/90 font-medium animate-pulse flex items-center gap-2">
                  <Mic size={16} className="animate-bounce shrink-0" />
                  Listening... Speak the sentence clearly now. Your words will appear here live!
                </p>
              )}
            </div>

            {/* Score Progress Bar & Feedback */}
            {fullTranscript && (
              <>
                <div className="h-2 rounded-full bg-zinc-900 overflow-hidden border border-zinc-800">
                  <div
                    className={`h-full transition-all duration-300 ${
                      accuracy >= 80 ? "bg-emerald-400" : accuracy >= 50 ? "bg-amber-400" : "bg-rose-400"
                    }`}
                    style={{ width: `${accuracy}%` }}
                  />
                </div>

                <div className="text-xs font-mono text-emerald-400 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={14} />
                    {accuracy >= 80
                      ? "Excellent Tamil pronunciation! High match score."
                      : accuracy >= 50
                      ? "Clear speech detected! Good practice."
                      : "Speech captured successfully! Keep practicing."}
                  </span>
                  <span className="text-[10px] text-zinc-500 uppercase">Continuous STT</span>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

