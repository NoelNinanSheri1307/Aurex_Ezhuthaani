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
import {
  Sparkles,
  Lightbulb,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  Bookmark,
  FileText,
  Volume2,
  BookOpen,
  Shuffle,
  Layers,
} from "lucide-react";

type GameMode = "meaning-to-tamil" | "scrambled" | "multiple-choice";

interface AvailableTile {
  id: string;
  grapheme: string;
}

export default function WordBuilderPage() {
  const { user } = useAuth();
  const [isMounted, setIsMounted] = useState(false);
  const categories = useMemo(() => getAllCategories(), []);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Game Options State
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [gameMode, setGameMode] = useState<GameMode>("meaning-to-tamil");
  const [questionCount, setQuestionCount] = useState<number | "all">(10);

  // Candidate Pool State (Deterministic during SSR to prevent Hydration Mismatch)
  const candidatePool = useMemo(() => {
    let pool = DICTIONARY_ENTRIES;
    if (selectedCategory !== "All") {
      pool = pool.filter((e) => e.category === selectedCategory);
    }
    return isMounted ? shuffleArray(pool) : pool;
  }, [selectedCategory, isMounted]);

  const activePool = useMemo(() => {
    if (questionCount === "all" || typeof questionCount !== "number") {
      return candidatePool;
    }
    return candidatePool.slice(0, Math.min(questionCount, candidatePool.length));
  }, [candidatePool, questionCount]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const isGameFinished = currentIndex >= activePool.length && activePool.length > 0;
  const currentWord: DictionaryEntry | undefined = activePool[currentIndex];

  // Target Graphemes
  const targetGraphemes = useMemo(() => {
    if (!currentWord) return [];
    return getTamilGraphemes(currentWord.tamil);
  }, [currentWord]);

  // Tile Pool for Mode A & B
  const [availableTiles, setAvailableTiles] = useState<AvailableTile[]>([]);
  const [placedTiles, setPlacedTiles] = useState<AvailableTile[]>([]);
  
  // Multiple Choice Options for Mode C
  const [choiceOptions, setChoiceOptions] = useState<string[]>([]);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  // Status & Feedback
  const [status, setStatus] = useState<"building" | "correct" | "incorrect">("building");
  const [hintRevealed, setHintRevealed] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [noteSaved, setNoteSaved] = useState(false);

  // Initialize Round
  const initRound = useCallback(() => {
    if (!currentWord) return;

    setStatus("building");
    setHintRevealed(false);
    setPlacedTiles([]);
    setIsSaved(false);
    setShowNoteInput(false);
    setNoteSaved(false);
    setSelectedChoice(null);

    const targetUnits = getTamilGraphemes(currentWord.tamil);

    if (gameMode === "multiple-choice") {
      // Pick 3 distractors
      const distractors = DICTIONARY_ENTRIES.filter((e) => e.id !== currentWord.id)
        .map((e) => e.meanings[0])
        .filter((m, i, arr) => arr.indexOf(m) === i);
      const shuffledDistractors = shuffleArray(distractors).slice(0, 3);
      const choices = shuffleArray([currentWord.meanings[0], ...shuffledDistractors]);
      setChoiceOptions(choices);
    } else {
      // Build tile pool (target + distractors if Mode A, or scrambled target if Mode B)
      const distractorUnits = gameMode === "meaning-to-tamil" ? getDistractorGraphemes(targetUnits, 4) : [];
      const combined = [...targetUnits, ...distractorUnits];
      const tiles: AvailableTile[] = shuffleArray(combined).map((g, idx) => ({
        id: `${g}_${idx}_${Math.random().toString(36).substring(2, 6)}`,
        grapheme: g,
      }));
      setAvailableTiles(tiles);
    }
  }, [currentWord, gameMode]);

  useEffect(() => {
    initRound();
  }, [initRound]);

  // TTS Speaker
  const speakText = (text: string) => {
    speak(text, { rate: 0.9 });
  };

  // Handle Tile Placement
  const handleTileSelect = (tile: AvailableTile) => {
    if (status === "correct") return;
    setPlacedTiles((prev) => [...prev, tile]);
    setAvailableTiles((prev) => prev.filter((t) => t.id !== tile.id));
    setStatus("building");
  };

  const handleTileRemove = (tile: AvailableTile) => {
    if (status === "correct") return;
    setPlacedTiles((prev) => prev.filter((t) => t.id !== tile.id));
    setAvailableTiles((prev) => [...prev, tile]);
    setStatus("building");
  };

  const handleClear = () => {
    if (status === "correct") return;
    setAvailableTiles((prev) => [...prev, ...placedTiles]);
    setPlacedTiles([]);
    setStatus("building");
  };

  // Check Answer
  const handleCheck = () => {
    if (!currentWord) return;

    if (gameMode === "multiple-choice") {
      if (selectedChoice === currentWord.meanings[0]) {
        setStatus("correct");
        speakText(currentWord.tamil);
      } else {
        setStatus("incorrect");
      }
      return;
    }

    const constructed = placedTiles.map((t) => t.grapheme).join("");
    if (constructed === currentWord.tamil) {
      setStatus("correct");
      speakText(currentWord.tamil);
    } else {
      setStatus("incorrect");
    }
  };

  // Next Word
  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    initRound();
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
      // Fallback
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

  if (isGameFinished) {
    return (
      <GameShell
        title="Word Builder"
        titleTa="சொல் உருவாக்கி"
        subtitle="Construct Tamil words tile by tile"
        wordIndex={activePool.length}
        totalWords={activePool.length}
      >
        <div className="p-8 sm:p-12 rounded-3xl bg-zinc-900 border border-emerald-500/30 text-center space-y-6 max-w-lg mx-auto shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 size={36} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100">Session Complete!</h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-mono">
              You completed all {activePool.length} selected word questions!
            </p>
          </div>
          <button
            onClick={handleRestart}
            className="px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-amber-500/20"
          >
            Play Again
          </button>
        </div>
      </GameShell>
    );
  }

  if (!currentWord) {
    return (
      <GameShell
        title="Word Builder"
        titleTa="சொல் உருவாக்கி"
        subtitle="Construct Tamil words tile by tile"
        wordIndex={0}
        totalWords={1}
      >
        <div className="text-center py-12">Loading vocabulary...</div>
      </GameShell>
    );
  }

  return (
    <GameShell
      title="Word Builder"
      titleTa="சொல் உருவாக்கி"
      subtitle="Construct Tamil words tile by tile"
      category={currentWord.category}
      wordIndex={currentIndex + 1}
      totalWords={activePool.length}
      onRefresh={initRound}
      onTts={() => speakText(currentWord.tamil)}
    >
      <div className="space-y-6">
        {/* Controls Header: Category Selector & Mode Selector & Count Selector */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-zinc-900/80 border border-zinc-800">
          {/* Mode Tabs */}
          <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
            <button
              onClick={() => setGameMode("meaning-to-tamil")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                gameMode === "meaning-to-tamil"
                  ? "bg-amber-500 text-zinc-950 shadow-md font-bold"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Meaning → Tamil
            </button>
            <button
              onClick={() => setGameMode("scrambled")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                gameMode === "scrambled"
                  ? "bg-amber-500 text-zinc-950 shadow-md font-bold"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Scrambled
            </button>
            <button
              onClick={() => setGameMode("multiple-choice")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                gameMode === "multiple-choice"
                  ? "bg-amber-500 text-zinc-950 shadow-md font-bold"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Multiple Choice
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Question Count Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-zinc-400">Questions:</span>
              <select
                value={questionCount}
                onChange={(e) => {
                  const val = e.target.value === "all" ? "all" : parseInt(e.target.value, 10);
                  setQuestionCount(val);
                  setCurrentIndex(0);
                }}
                className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-amber-300 font-semibold focus:outline-none focus:border-amber-500/50"
              >
                <option value={5}>5 Questions</option>
                <option value={10}>10 Questions</option>
                <option value={15}>15 Questions</option>
                <option value={20}>20 Questions</option>
                <option value="all">All ({candidatePool.length})</option>
              </select>
            </div>

            {/* Category Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-zinc-400">Topic:</span>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentIndex(0);
                }}
                className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs text-amber-300 font-semibold focus:outline-none focus:border-amber-500/50"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Main Word Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/90 border border-zinc-800/90 shadow-2xl relative overflow-hidden text-center space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 text-zinc-400 text-xs font-mono">
              <Sparkles size={12} className="text-amber-400" />
              <span>{currentWord.category || "Vocabulary"}</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-100">
              {gameMode === "multiple-choice" ? (
                <span className="font-tamil text-amber-400 text-4xl sm:text-5xl block my-2">
                  {currentWord.tamil}
                </span>
              ) : (
                currentWord.meanings.join(" / ")
              )}
            </h2>
            <p className="text-xs sm:text-sm font-mono text-zinc-400">
              {gameMode === "multiple-choice" ? currentWord.transliteration : `Category: ${currentWord.category}`}
            </p>
          </div>

          {/* HINT BUTTON & BANNER */}
          {gameMode !== "multiple-choice" && (
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
                  Hint: Starts with <span className="font-tamil text-lg font-bold text-amber-400">{targetGraphemes[0]}</span> ({currentWord.transliteration})
                </motion.div>
              )}
            </div>
          )}

          {/* GAME AREA: MODES A & B (TILE BUILDER) */}
          {gameMode !== "multiple-choice" ? (
            <div className="space-y-6">
              {/* Answer Construction Tray */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block">
                  Constructed Word
                </span>
                <div className="min-h-[72px] p-3 rounded-2xl bg-zinc-950 border-2 border-dashed border-zinc-800 flex flex-wrap items-center justify-center gap-2 sm:gap-3 transition-colors">
                  {placedTiles.length === 0 ? (
                    <span className="text-xs text-zinc-600 font-mono italic">
                      Tap letter tiles below to build...
                    </span>
                  ) : (
                    placedTiles.map((tile) => (
                      <TamilTile
                        key={tile.id}
                        grapheme={tile.grapheme}
                        onClick={() => handleTileRemove(tile)}
                        status={status === "correct" ? "correct" : status === "incorrect" ? "incorrect" : "default"}
                      />
                    ))
                  )}
                </div>
              </div>

              {/* Available Tile Pool */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 px-1">
                  <span>Available Letter Tiles</span>
                  {placedTiles.length > 0 && status !== "correct" && (
                    <button
                      onClick={handleClear}
                      className="text-zinc-500 hover:text-red-400 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw size={12} /> Clear
                    </button>
                  )}
                </div>
                <div className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800 flex flex-wrap items-center justify-center gap-2 sm:gap-3 min-h-[80px]">
                  <AnimatePresence>
                    {availableTiles.map((tile) => (
                      <motion.div
                        key={tile.id}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                      >
                        <TamilTile grapheme={tile.grapheme} onClick={() => handleTileSelect(tile)} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          ) : (
            /* GAME AREA: MODE C (MULTIPLE CHOICE) */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto">
              {choiceOptions.map((choice, idx) => {
                const isSelected = selectedChoice === choice;
                const isCorrect = choice === currentWord.meanings[0];
                let btnStyle = "bg-zinc-950 border-zinc-800 text-zinc-200 hover:border-amber-500/50";
                if (status === "correct" && isCorrect) {
                  btnStyle = "bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold";
                } else if (status === "incorrect" && isSelected) {
                  btnStyle = "bg-red-500/20 border-red-400 text-red-300";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedChoice(choice);
                      setStatus("building");
                    }}
                    className={`p-4 rounded-2xl border text-sm font-semibold transition-all text-left flex items-center justify-between cursor-pointer ${btnStyle}`}
                  >
                    <span>{choice}</span>
                    {status === "correct" && isCorrect && <CheckCircle2 size={18} className="text-emerald-400" />}
                    {status === "incorrect" && isSelected && <XCircle size={18} className="text-red-400" />}
                  </button>
                );
              })}
            </div>
          )}

          {/* ACTION BUTTONS & FEEDBACK */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            {status !== "correct" ? (
              <button
                onClick={handleCheck}
                disabled={gameMode !== "multiple-choice" && placedTiles.length === 0}
                className="px-8 py-3 rounded-2xl bg-amber-500 text-zinc-950 font-bold text-sm hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <span>Check Answer</span>
                <CheckCircle2 size={18} />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-8 py-3 rounded-2xl bg-emerald-500 text-zinc-950 font-bold text-sm hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 cursor-pointer flex items-center gap-2 animate-bounce"
              >
                <span>Next Word</span>
                <ArrowRight size={18} />
              </button>
            )}
          </div>

          {/* INCORRECT FEEDBACK BANNER */}
          {status === "incorrect" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-semibold flex items-center justify-center gap-2"
            >
              <XCircle size={16} />
              <span>Not quite right yet. Rearrange or try again!</span>
            </motion.div>
          )}

          {/* SUCCESS REVEAL CARD */}
          <AnimatePresence>
            {status === "correct" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-6 rounded-3xl bg-gradient-to-br from-emerald-950/80 to-zinc-900 border border-emerald-500/40 text-left space-y-4 shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <CheckCircle2 size={20} />
                    <span>Correct Word!</span>
                  </div>
                  <button
                    onClick={() => speakText(currentWord.tamil)}
                    className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 transition-colors flex items-center gap-1.5 text-xs font-mono cursor-pointer"
                  >
                    <Volume2 size={16} /> Listen
                  </button>
                </div>

                <div className="space-y-1">
                  <h3 className="font-tamil text-3xl font-bold text-emerald-200">{currentWord.tamil}</h3>
                  <p className="text-xs font-mono text-zinc-300">
                    {currentWord.transliteration} — {currentWord.meanings.join(", ")}
                  </p>
                </div>

                {currentWord.example && (
                  <div className="p-3 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-1">
                    <p className="font-tamil text-sm text-zinc-200">{currentWord.example}</p>
                    {currentWord.exampleTranslation && (
                      <p className="text-xs text-zinc-400 italic">{currentWord.exampleTranslation}</p>
                    )}
                  </div>
                )}

                {/* Integration Actions */}
                <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-emerald-500/20">
                  <Link
                    href={`/dictionary?word=${encodeURIComponent(currentWord.tamil)}`}
                    className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-amber-400 hover:border-amber-500/40 text-xs font-medium transition-all flex items-center gap-1.5"
                  >
                    <BookOpen size={14} /> View in Dictionary
                  </Link>

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

                {/* Inline Note Input */}
                {showNoteInput && (
                  <div className="pt-2 space-y-2">
                    <textarea
                      value={noteContent}
                      onChange={(e) => setNoteContent(e.target.value)}
                      placeholder={`Add personal note for ${currentWord.tamil}...`}
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
        </div>
      </div>
    </GameShell>
  );
}
