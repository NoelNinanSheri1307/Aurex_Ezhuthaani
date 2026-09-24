"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { DICTIONARY_ENTRIES, DictionaryEntry, getAllCategories } from "@/lib/dictionary";
import { speak } from "@/lib/curriculum";
import { getTamilGraphemes, getDistractorGraphemes, shuffleArray } from "@/lib/graphemes";
import GameShell from "@/components/games/GameShell";
import TamilTile from "@/components/games/TamilTile";
import { useAuth } from "@/lib/auth";
import { completeHangmanApi, postDailyProgress } from "@/lib/api";
import {
  Gamepad2,
  Lightbulb,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  Bookmark,
  FileText,
  Volume2,
  BookOpen,
  Feather,
  Sparkles,
  Trophy,
  Award,
  Target,
  Layers,
  Star,
  Check,
} from "lucide-react";

const MAX_ATTEMPTS = 6;
const QUESTION_COUNT_OPTIONS: (number | "All")[] = [5, 10, 15, 20, 50, "All"];

export default function HangmanPage() {
  const { user, refreshMe } = useAuth();
  const [isMounted, setIsMounted] = useState(false);
  const categories = useMemo(() => getAllCategories(), []);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Question Count Session Configuration (Default 10 questions to prevent playing all 707)
  const [sessionQuestionCount, setSessionQuestionCount] = useState<number | "All">(10);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Candidate Pool Filtered by Category
  const candidatePool = useMemo(() => {
    let pool = DICTIONARY_ENTRIES;
    if (selectedCategory !== "All") {
      pool = pool.filter((e) => e.category === selectedCategory);
    }
    return isMounted ? shuffleArray(pool) : pool;
  }, [selectedCategory, isMounted]);

  // Session Pool Constrained by Selected Question Count
  const sessionPool = useMemo(() => {
    if (!candidatePool.length) return [];
    if (sessionQuestionCount === "All") return candidatePool;
    const count = typeof sessionQuestionCount === "number" ? sessionQuestionCount : 10;
    return candidatePool.slice(0, Math.min(count, candidatePool.length));
  }, [candidatePool, sessionQuestionCount]);

  // Game Index & Session Progress State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionSuccessCount, setSessionSuccessCount] = useState(0);
  const [sessionPlayedCount, setSessionPlayedCount] = useState(0);
  const [isSessionFinished, setIsSessionFinished] = useState(false);
  const [sessionResult, setSessionResult] = useState<{
    winPercentage: number;
    earnedBonus: boolean;
    xpGained: number;
    totalXP?: number;
  } | null>(null);
  const [isSubmittingSession, setIsSubmittingSession] = useState(false);

  const currentWord: DictionaryEntry | undefined = sessionPool[currentIndex];

  // Target Graphemes
  const targetGraphemes = useMemo(() => {
    if (!currentWord) return [];
    return getTamilGraphemes(currentWord.tamil);
  }, [currentWord]);

  // Game State per Word Round
  const [guessedGraphemes, setGuessedGraphemes] = useState<Set<string>>(new Set());
  const [attemptsLeft, setAttemptsLeft] = useState(MAX_ATTEMPTS);
  const [hintRevealed, setHintRevealed] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [noteSaved, setNoteSaved] = useState(false);

  // Keyboard Grapheme Selection Pool
  const keyboardPool = useMemo(() => {
    if (!targetGraphemes.length) return [];
    const distractors = getDistractorGraphemes(targetGraphemes, 12);
    const combined = [...new Set([...targetGraphemes, ...distractors])];
    return isMounted ? shuffleArray(combined) : combined;
  }, [targetGraphemes, isMounted]);

  // Derived Game Status for current word
  const isWon = useMemo(() => {
    if (!targetGraphemes.length) return false;
    return targetGraphemes.every((g) => guessedGraphemes.has(g));
  }, [targetGraphemes, guessedGraphemes]);

  const isLost = attemptsLeft <= 0 && !isWon;

  // Initialize Word Round
  const initRound = useCallback(() => {
    if (!currentWord) return;
    setGuessedGraphemes(new Set());
    setAttemptsLeft(MAX_ATTEMPTS);
    setHintRevealed(false);
    setIsSaved(false);
    setShowNoteInput(false);
    setNoteSaved(false);
  }, [currentWord]);

  useEffect(() => {
    initRound();
  }, [initRound]);

  // Reset entire session when changing category or question count
  const resetSession = useCallback(
    (newCategory?: string, newQuestionCount?: number | "All") => {
      if (newCategory !== undefined) setSelectedCategory(newCategory);
      if (newQuestionCount !== undefined) setSessionQuestionCount(newQuestionCount);
      setCurrentIndex(0);
      setSessionSuccessCount(0);
      setSessionPlayedCount(0);
      setIsSessionFinished(false);
      setSessionResult(null);
    },
    []
  );

  // TTS Speaker
  const speakText = (text: string) => {
    speak(text, { rate: 0.9 });
  };

  // Handle Key Click
  const handleGuess = (grapheme: string) => {
    if (isWon || isLost || guessedGraphemes.has(grapheme)) return;

    const nextGuessed = new Set(guessedGraphemes);
    nextGuessed.add(grapheme);
    setGuessedGraphemes(nextGuessed);

    if (!targetGraphemes.includes(grapheme)) {
      setAttemptsLeft((prev) => prev - 1);
    } else {
      speakText(grapheme);
    }
  };

  // Handle Win speech
  useEffect(() => {
    if (isWon && currentWord) {
      speakText(currentWord.tamil);
    }
  }, [isWon, currentWord]);

  // Next Word or Session Finish
  const handleNextWord = async () => {
    const isCurrentWon = isWon;
    const nextSuccess = sessionSuccessCount + (isCurrentWon ? 1 : 0);
    const nextPlayed = sessionPlayedCount + 1;
    setSessionSuccessCount(nextSuccess);
    setSessionPlayedCount(nextPlayed);

    if (currentIndex + 1 < sessionPool.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Reached end of session!
      const totalSessionQ = sessionPool.length;
      const winPercentage = Math.round((nextSuccess / totalSessionQ) * 100);
      const earnedBonus = winPercentage >= 80;

      setIsSubmittingSession(true);
      let awardedXP = 0;
      let newTotalXP: number | undefined = undefined;

      const activeToken = localStorage.getItem("ezh_token");
      if (activeToken) {
        try {
          const res = await completeHangmanApi(activeToken, totalSessionQ, nextSuccess);
          await postDailyProgress(activeToken, "vocabulary", nextSuccess);
          await refreshMe();
          awardedXP = res.xp_gained;
          newTotalXP = res.total_xp;
        } catch (e) {
          // Fallback local calculation
          if (earnedBonus) {
            awardedXP =
              totalSessionQ >= 50
                ? 250
                : totalSessionQ >= 20
                ? 100
                : totalSessionQ >= 15
                ? 75
                : totalSessionQ >= 10
                ? 50
                : 25;
          }
        }
      } else {
        if (earnedBonus) {
          awardedXP =
            totalSessionQ >= 50
              ? 250
              : totalSessionQ >= 20
              ? 100
              : totalSessionQ >= 15
              ? 75
              : totalSessionQ >= 10
              ? 50
              : 25;
        }
      }

      setIsSubmittingSession(false);
      setSessionResult({
        winPercentage,
        earnedBonus,
        xpGained: awardedXP,
        totalXP: newTotalXP,
      });
      setIsSessionFinished(true);
    }
  };

  // Save Word Handler
  const handleSaveWord = async () => {
    if (!currentWord) return;
    try {
      const activeToken = localStorage.getItem("ezh_token");
      if (!activeToken) return;
      const res = await fetch("/api/saved", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${activeToken}`,
        },
        body: JSON.stringify({ word_id: currentWord.id }),
      });
      if (res.ok) setIsSaved(true);
    } catch {
      setIsSaved(true);
    }
  };

  // Add Note Handler
  const handleAddNote = async () => {
    if (!currentWord || !noteContent.trim()) return;
    try {
      const activeToken = localStorage.getItem("ezh_token");
      if (!activeToken) return;
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${activeToken}`,
        },
        body: JSON.stringify({
          title: `Note: ${currentWord.tamil}`,
          body: noteContent.trim(),
          content_type: "word",
          content_id: currentWord.id,
        }),
      });
      if (res.ok) {
        setNoteSaved(true);
        setNoteContent("");
        setShowNoteInput(false);
      }
    } catch {
      setNoteSaved(true);
      setShowNoteInput(false);
    }
  };

  if (!currentWord && !isSessionFinished) {
    return (
      <GameShell
        title="Tamil Hangman"
        titleTa="சொல் விளையாட்டு"
        subtitle="Guess the Tamil word letter by letter"
        wordIndex={0}
        totalWords={1}
      >
        <div className="text-center py-12 text-zinc-400 font-mono">Loading vocabulary session...</div>
      </GameShell>
    );
  }

  return (
    <GameShell
      title="Tamil Hangman"
      titleTa="சொல் விளையாட்டு"
      subtitle="Guess the Tamil word letter by letter"
      category={currentWord?.category}
      wordIndex={currentIndex}
      totalWords={sessionPool.length}
      onRefresh={() => resetSession()}
      onTts={currentWord ? () => speakText(currentWord.tamil) : undefined}
    >
      <div className="space-y-6">
        {/* Top Control Bar: Topic & Question Count Selector */}
        <div className="p-3 sm:p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 flex flex-wrap items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-2">
            <Gamepad2 size={18} className="text-amber-400" />
            <span className="text-xs font-mono text-zinc-200 font-bold hidden sm:inline">Hangman Session</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Topic Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-mono text-zinc-400">Topic:</span>
              <select
                value={selectedCategory}
                onChange={(e) => resetSession(e.target.value, sessionQuestionCount)}
                className="bg-zinc-950 border border-zinc-800 rounded-xl px-2.5 py-1 text-xs text-amber-300 font-semibold focus:outline-none focus:border-amber-500/50 cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Question Count Selector (User Choice to avoid 707 questions) */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                <Target size={13} className="text-amber-400" /> Questions:
              </span>
              <select
                value={sessionQuestionCount}
                onChange={(e) => {
                  const val = e.target.value === "All" ? "All" : parseInt(e.target.value, 10);
                  resetSession(selectedCategory, val);
                }}
                className="bg-zinc-950 border border-amber-500/40 rounded-xl px-2.5 py-1 text-xs text-amber-300 font-bold focus:outline-none focus:border-amber-400 cursor-pointer shadow-sm shadow-amber-500/10"
              >
                {QUESTION_COUNT_OPTIONS.map((opt) => (
                  <option key={opt.toString()} value={opt.toString()}>
                    {opt === "All" ? `All (${candidatePool.length})` : `${opt} Words`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* SESSION FINISHED CELEBRATION MODAL CARD */}
        {isSessionFinished && sessionResult ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-6 sm:p-8 rounded-3xl border shadow-2xl space-y-6 text-center relative overflow-hidden ${
              sessionResult.earnedBonus
                ? "bg-gradient-to-b from-amber-950/60 via-zinc-900 to-zinc-950 border-amber-500/50"
                : "bg-zinc-900 border-zinc-800"
            }`}
          >
            {sessionResult.earnedBonus && (
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-500 animate-pulse" />
            )}

            <div className="flex flex-col items-center justify-center space-y-3">
              <div
                className={`w-20 h-20 rounded-3xl flex items-center justify-center border shadow-xl ${
                  sessionResult.earnedBonus
                    ? "bg-amber-500/20 border-amber-400/60 text-amber-300 shadow-amber-500/20"
                    : "bg-zinc-800 border-zinc-700 text-zinc-400"
                }`}
              >
                {sessionResult.earnedBonus ? (
                  <Trophy size={42} className="animate-bounce text-amber-300" />
                ) : (
                  <Target size={42} />
                )}
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-bold font-serif text-zinc-100">
                  {sessionResult.earnedBonus ? "Session Completed with Excellence!" : "Session Completed"}
                </h2>
                <p className="text-xs font-mono text-zinc-400 mt-1">
                  Topic: <span className="text-amber-400">{selectedCategory}</span> • {sessionPool.length} Words Played
                </p>
              </div>
            </div>

            {/* Win Rate & Accuracy Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto">
              <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-1">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">Accuracy</span>
                <span
                  className={`text-2xl font-bold font-mono ${
                    sessionResult.winPercentage >= 80 ? "text-emerald-400" : "text-amber-400"
                  }`}
                >
                  {sessionResult.winPercentage}%
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-1">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">Words Solved</span>
                <span className="text-2xl font-bold font-mono text-zinc-200">
                  {sessionSuccessCount} / {sessionPool.length}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-1">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">XP Earned</span>
                <span
                  className={`text-2xl font-bold font-mono flex items-center justify-center gap-1 ${
                    sessionResult.earnedBonus ? "text-amber-300" : "text-zinc-500"
                  }`}
                >
                  <Star size={18} className={sessionResult.earnedBonus ? "fill-amber-400 text-amber-400" : ""} />
                  +{sessionResult.xpGained}
                </span>
              </div>
            </div>

            {/* 80% Threshold Status Notice */}
            {sessionResult.earnedBonus ? (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/40 max-w-lg mx-auto flex items-center justify-center gap-3">
                <Sparkles size={20} className="text-amber-400 shrink-0" />
                <p className="text-xs text-amber-200 font-mono text-left">
                  <strong className="text-amber-300 font-bold block">80%+ Mastery Bonus Unlocked!</strong>
                  You completed {sessionResult.winPercentage}% of the questions correctly and earned +
                  {sessionResult.xpGained} XP!
                </p>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 max-w-lg mx-auto flex items-center justify-center gap-3">
                <Target size={20} className="text-zinc-400 shrink-0" />
                <p className="text-xs text-zinc-400 font-mono text-left">
                  <strong className="text-zinc-300 block">80% Accuracy Needed for Bonus XP</strong>
                  You achieved {sessionResult.winPercentage}% accuracy. Complete 80% or more of the questions to earn XP!
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => resetSession(selectedCategory, sessionQuestionCount)}
                className="px-6 py-3 rounded-2xl bg-amber-500 text-zinc-950 font-bold text-xs hover:bg-amber-400 transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
              >
                <RotateCcw size={16} />
                <span>Play Another Session ({sessionQuestionCount} Words)</span>
              </button>

              <button
                onClick={() => resetSession("All", 10)}
                className="px-5 py-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer"
              >
                <Layers size={16} />
                <span>Change Topic / Reset</span>
              </button>
            </div>
          </motion.div>
        ) : (
          /* Main Game Card for Word Guessing */
          <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/90 border border-zinc-800/90 shadow-2xl relative overflow-hidden text-center space-y-6">
            {/* Header Clue & Manuscript Stylus Attempt Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-zinc-800">
              {/* Clue Meaning */}
              <div className="text-left space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-semibold">
                  <Sparkles size={12} className="text-amber-400" />
                  <span>Meaning Clue</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-100">
                  {currentWord?.meanings.join(" / ")}
                </h2>
              </div>

              {/* Stylus Ink Attempt Counter */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                  <Feather size={14} className="text-amber-400" /> Ink Attempts:
                </span>
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: MAX_ATTEMPTS }).map((_, i) => (
                    <span
                      key={i}
                      className={`w-3.5 h-3.5 rounded-full transition-all border ${
                        i < attemptsLeft
                          ? "bg-amber-400 border-amber-300 shadow-sm shadow-amber-500/30"
                          : "bg-zinc-800 border-zinc-700 opacity-40"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Prominent Center Stage: Animated SVG Stickman Gallows Visualizer */}
            <div className="my-4 py-2 flex flex-col items-center justify-center space-y-2">
              <div className="p-4 sm:p-5 rounded-3xl bg-zinc-950/90 border border-zinc-800 shadow-2xl flex items-center justify-center relative overflow-hidden group">
                <span className="absolute top-2 left-3 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                  Gallows Visualizer ({MAX_ATTEMPTS - attemptsLeft} / {MAX_ATTEMPTS} Wrongs)
                </span>

                <svg width="180" height="180" viewBox="0 0 160 160" className="drop-shadow-xl mt-2">
                  {/* Gallows Base Stand */}
                  <line x1="15" y1="145" x2="115" y2="145" stroke="#52525b" strokeWidth="4" strokeLinecap="round" />
                  {/* Gallows Vertical Pole */}
                  <line x1="40" y1="145" x2="40" y2="15" stroke="#71717a" strokeWidth="4" strokeLinecap="round" />
                  {/* Gallows Top Beam */}
                  <line x1="40" y1="15" x2="105" y2="15" stroke="#71717a" strokeWidth="4" strokeLinecap="round" />
                  {/* Support Beam */}
                  <line x1="40" y1="40" x2="65" y2="15" stroke="#52525b" strokeWidth="3" strokeLinecap="round" />
                  {/* Rope */}
                  <line x1="105" y1="15" x2="105" y2="35" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="3 2" />

                  {/* Step 1 Wrong: Head */}
                  {MAX_ATTEMPTS - attemptsLeft >= 1 && (
                    <motion.circle
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      cx="105"
                      cy="48"
                      r="12"
                      stroke={attemptsLeft === 0 ? "#f43f5e" : "#fbbf24"}
                      strokeWidth="3"
                      fill="#18181b"
                    />
                  )}

                  {/* Step 2 Wrong: Torso Body */}
                  {MAX_ATTEMPTS - attemptsLeft >= 2 && (
                    <motion.line
                      initial={{ y2: 60, opacity: 0 }}
                      animate={{ y2: 95, opacity: 1 }}
                      transition={{ duration: 0.25 }}
                      x1="105"
                      y1="60"
                      x2="105"
                      y2="95"
                      stroke={attemptsLeft === 0 ? "#f43f5e" : "#fbbf24"}
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  )}

                  {/* Step 3 Wrong: Left Arm */}
                  {MAX_ATTEMPTS - attemptsLeft >= 3 && (
                    <motion.line
                      initial={{ x2: 105, y2: 68, opacity: 0 }}
                      animate={{ x2: 85, y2: 83, opacity: 1 }}
                      transition={{ duration: 0.25 }}
                      x1="105"
                      y1="68"
                      x2="85"
                      y2="83"
                      stroke={attemptsLeft === 0 ? "#f43f5e" : "#fbbf24"}
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  )}

                  {/* Step 4 Wrong: Right Arm */}
                  {MAX_ATTEMPTS - attemptsLeft >= 4 && (
                    <motion.line
                      initial={{ x2: 105, y2: 68, opacity: 0 }}
                      animate={{ x2: 125, y2: 83, opacity: 1 }}
                      transition={{ duration: 0.25 }}
                      x1="105"
                      y1="68"
                      x2="125"
                      y2="83"
                      stroke={attemptsLeft === 0 ? "#f43f5e" : "#fbbf24"}
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  )}

                  {/* Step 5 Wrong: Left Leg */}
                  {MAX_ATTEMPTS - attemptsLeft >= 5 && (
                    <motion.line
                      initial={{ x2: 105, y2: 95, opacity: 0 }}
                      animate={{ x2: 85, y2: 125, opacity: 1 }}
                      transition={{ duration: 0.25 }}
                      x1="105"
                      y1="95"
                      x2="85"
                      y2="125"
                      stroke={attemptsLeft === 0 ? "#f43f5e" : "#fbbf24"}
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  )}

                  {/* Step 6 Wrong: Right Leg + Defeat Eyes */}
                  {MAX_ATTEMPTS - attemptsLeft >= 6 && (
                    <>
                      <motion.line
                        initial={{ x2: 105, y2: 95, opacity: 0 }}
                        animate={{ x2: 125, y2: 125, opacity: 1 }}
                        transition={{ duration: 0.25 }}
                        x1="105"
                        y1="95"
                        x2="125"
                        y2="125"
                        stroke="#f43f5e"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      {/* Defeat Eyes (x x) */}
                      <line x1="99" y1="44" x2="103" y2="48" stroke="#f43f5e" strokeWidth="1.8" />
                      <line x1="103" y1="44" x2="99" y2="48" stroke="#f43f5e" strokeWidth="1.8" />
                      <line x1="107" y1="44" x2="111" y2="48" stroke="#f43f5e" strokeWidth="1.8" />
                      <line x1="111" y1="44" x2="107" y2="48" stroke="#f43f5e" strokeWidth="1.8" />
                    </>
                  )}
                </svg>
              </div>
            </div>

            {/* HINT BUTTON & BANNER */}
            <div>
              {!hintRevealed ? (
                <button
                  onClick={() => setHintRevealed(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold hover:bg-amber-500/20 transition-all cursor-pointer"
                >
                  <Lightbulb size={14} />
                  <span>Show Hint</span>
                </button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono inline-block"
                >
                  Hint: Transliteration is{" "}
                  <span className="font-semibold text-amber-200">{currentWord?.transliteration}</span> (
                  {targetGraphemes.length} letters)
                </motion.div>
              )}
            </div>

            {/* TARGET WORD BLANK SLOTS DISPLAY */}
            <div className="py-4">
              <div className="flex flex-wrap items-center justify-center gap-3 min-h-[72px]">
                {targetGraphemes.map((grapheme, idx) => {
                  const isGuessed = guessedGraphemes.has(grapheme) || isLost;
                  return (
                    <div
                      key={idx}
                      className={`w-12 h-14 sm:w-14 sm:h-16 rounded-2xl border-2 flex items-center justify-center font-tamil text-2xl sm:text-3xl font-bold transition-all ${
                        isGuessed
                          ? isLost && !guessedGraphemes.has(grapheme)
                            ? "bg-red-500/10 border-red-500/50 text-red-300"
                            : "bg-amber-500/20 border-amber-400 text-amber-300 shadow-md shadow-amber-500/10"
                          : "bg-zinc-950 border-zinc-700 text-transparent"
                      }`}
                    >
                      {isGuessed ? grapheme : "_"}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* TAMIL KEYBOARD / SELECTION POOL */}
            {!isWon && !isLost && (
              <div className="space-y-2">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block">
                  Guess a Tamil Letter
                </span>
                <div className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800 flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto">
                  {keyboardPool.map((grapheme) => {
                    const isGuessed = guessedGraphemes.has(grapheme);
                    const isCorrect = targetGraphemes.includes(grapheme);
                    let status: "default" | "correct" | "incorrect" = "default";
                    if (isGuessed) {
                      status = isCorrect ? "correct" : "incorrect";
                    }

                    return (
                      <TamilTile
                        key={grapheme}
                        grapheme={grapheme}
                        onClick={() => handleGuess(grapheme)}
                        disabled={isGuessed}
                        status={status}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* WIN STATE MODAL CARD */}
            <AnimatePresence>
              {isWon && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 rounded-3xl bg-gradient-to-br from-emerald-950/90 to-zinc-900 border border-emerald-500/40 text-left space-y-4 shadow-2xl"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
                      <CheckCircle2 size={22} />
                      <span>Word Guessed Successfully!</span>
                    </div>
                    {currentWord && (
                      <button
                        onClick={() => speakText(currentWord.tamil)}
                        className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 transition-colors flex items-center gap-1.5 text-xs font-mono cursor-pointer"
                      >
                        <Volume2 size={16} /> Listen
                      </button>
                    )}
                  </div>

                  {currentWord && (
                    <div className="space-y-1">
                      <h3 className="font-tamil text-3xl font-bold text-emerald-200">{currentWord.tamil}</h3>
                      <p className="text-xs font-mono text-zinc-300">
                        {currentWord.transliteration} — {currentWord.meanings.join(", ")}
                      </p>
                    </div>
                  )}

                  {currentWord?.example && (
                    <div className="p-3 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-1">
                      <p className="font-tamil text-sm text-zinc-200">{currentWord.example}</p>
                      {currentWord.exampleTranslation && (
                        <p className="text-xs text-zinc-400 italic">{currentWord.exampleTranslation}</p>
                      )}
                    </div>
                  )}

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-emerald-500/20">
                    <div className="flex flex-wrap items-center gap-2">
                      {currentWord && (
                        <Link
                          href={`/dictionary?word=${encodeURIComponent(currentWord.tamil)}`}
                          className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-amber-400 hover:border-amber-500/40 text-xs font-medium transition-all flex items-center gap-1.5"
                        >
                          <BookOpen size={14} /> View in Dictionary
                        </Link>
                      )}

                      <button
                        onClick={handleSaveWord}
                        disabled={isSaved}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                          isSaved
                            ? "bg-amber-500/20 border-amber-500/50 text-amber-300"
                            : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-amber-400 hover:border-amber-500/40"
                        }`}
                      >
                        <Bookmark size={14} /> {isSaved ? "Saved" : "Save Word"}
                      </button>

                      <button
                        onClick={() => setShowNoteInput(!showNoteInput)}
                        className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-amber-400 hover:border-amber-500/40 text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <FileText size={14} /> {noteSaved ? "Note Added" : "Add Note"}
                      </button>
                    </div>

                    <button
                      onClick={handleNextWord}
                      disabled={isSubmittingSession}
                      className="px-6 py-2.5 rounded-xl bg-emerald-500 text-zinc-950 font-bold text-xs hover:bg-emerald-400 transition-all flex items-center gap-1.5 cursor-pointer shadow-md disabled:opacity-50"
                    >
                      <span>{currentIndex + 1 < sessionPool.length ? "Next Word" : "Finish Session"}</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>

                  {showNoteInput && (
                    <div className="pt-2 space-y-2">
                      <textarea
                        value={noteContent}
                        onChange={(e) => setNoteContent(e.target.value)}
                        placeholder={`Add personal note for ${currentWord?.tamil}...`}
                        className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 focus:outline-none focus:border-amber-500/50"
                        rows={2}
                      />
                      <button
                        onClick={handleAddNote}
                        className="px-4 py-1.5 rounded-xl bg-amber-500 text-zinc-950 font-bold text-xs hover:bg-amber-400 transition-colors cursor-pointer"
                      >
                        Save Note
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* LOSS / REVEAL STATE MODAL CARD */}
            <AnimatePresence>
              {isLost && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 rounded-3xl bg-gradient-to-br from-red-950/80 to-zinc-900 border border-red-500/40 text-left space-y-4 shadow-2xl"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-red-400 font-bold text-base">
                      <XCircle size={22} />
                      <span>Out of Ink Attempts!</span>
                    </div>
                    {currentWord && (
                      <button
                        onClick={() => speakText(currentWord.tamil)}
                        className="p-2 rounded-xl bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-colors flex items-center gap-1.5 text-xs font-mono cursor-pointer"
                      >
                        <Volume2 size={16} /> Listen
                      </button>
                    )}
                  </div>

                  {currentWord && (
                    <div className="space-y-1">
                      <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block">
                        The word was:
                      </span>
                      <h3 className="font-tamil text-3xl font-bold text-amber-400">{currentWord.tamil}</h3>
                      <p className="text-xs font-mono text-zinc-300">
                        {currentWord.transliteration} — {currentWord.meanings.join(", ")}
                      </p>
                    </div>
                  )}

                  <div className="pt-2 flex items-center justify-between border-t border-red-500/20">
                    {currentWord && (
                      <Link
                        href={`/dictionary?word=${encodeURIComponent(currentWord.tamil)}`}
                        className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-amber-400 text-xs font-medium transition-all flex items-center gap-1.5"
                      >
                        <BookOpen size={14} /> View in Dictionary
                      </Link>
                    )}

                    <button
                      onClick={handleNextWord}
                      disabled={isSubmittingSession}
                      className="px-6 py-2.5 rounded-xl bg-amber-500 text-zinc-950 font-bold text-xs hover:bg-amber-400 transition-all flex items-center gap-1.5 cursor-pointer shadow-md disabled:opacity-50"
                    >
                      <span>{currentIndex + 1 < sessionPool.length ? "Try Next Word" : "Finish Session"}</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </GameShell>
  );
}
