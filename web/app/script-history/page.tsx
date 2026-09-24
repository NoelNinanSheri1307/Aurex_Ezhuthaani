"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ContentImage from "@/components/ContentImage";
import {
  ScrollText,
  Calendar,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  AlertCircle,
  Feather,
  Globe,
  Tag,
  Type,
  Volume2,
  VolumeX,
  Bookmark,
  BookmarkCheck,
  FileText,
  CheckCircle2,
  HelpCircle,
  Award,
  BookOpen,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { speakTamil, stopSpeech } from "@/lib/tts";
import {
  getScriptHistoryItems,
  getScriptHistoryDetail,
  getScriptHistoryQuiz,
  getSavedScriptHistory,
  saveScriptHistoryApi,
  unsaveScriptHistoryApi,
  createNoteApi,
} from "@/lib/api";
import {
  ScriptHistoryItemSummary,
  ScriptHistoryItemDetail,
  ScriptHistoryQuizQuestion,
} from "@/lib/types";

export default function ScriptHistoryPage() {
  const { token } = useAuth();
  const [items, setItems] = useState<ScriptHistoryItemSummary[]>([]);
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [activeDetail, setActiveDetail] = useState<ScriptHistoryItemDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [detailLoading, setDetailLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Active Tab View: "overview" | "developments" | "examples" | "quiz"
  const [activeTab, setActiveTab] = useState<"overview" | "developments" | "examples" | "quiz">("overview");

  // Quiz State
  const [quizQuestions, setQuizQuestions] = useState<ScriptHistoryQuizQuestion[]>([]);
  const [currentQuizIdx, setCurrentQuizIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qIdx: number]: "a" | "b" | "c" | "d" }>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);

  const [savedSlugs, setSavedSlugs] = useState<Set<string>>(new Set());

  // Note modal state
  const [showNoteModal, setShowNoteModal] = useState<boolean>(false);
  const [noteTitle, setNoteTitle] = useState<string>("");
  const [noteBody, setNoteBody] = useState<string>("");
  const [noteSaving, setNoteSaving] = useState<boolean>(false);
  const [noteSuccess, setNoteSuccess] = useState<boolean>(false);

  // TTS state
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [imgError, setImgError] = useState<boolean>(false);

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getScriptHistoryItems();
      setItems(data);
      if (data.length > 0) {
        fetchDetail(data[0].slug);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load script history from server.");
    } finally {
      setLoading(false);
    }
  };

  const fetchDetail = async (slug: string) => {
    setDetailLoading(true);
    setImgError(false);
    try {
      const detail = await getScriptHistoryDetail(slug);
      setActiveDetail(detail);
    } catch {
      // Fallback
    } finally {
      setDetailLoading(false);
    }
  };

  const fetchQuiz = async () => {
    try {
      const quiz = await getScriptHistoryQuiz();
      setQuizQuestions(quiz);
    } catch {
      // Fallback handled in code
    }
  };

  const fetchSaved = async () => {
    if (!token) return;
    try {
      const savedList = await getSavedScriptHistory(token);
      setSavedSlugs(new Set(savedList.map((s) => s.slug)));
    } catch {
      // Fallback
    }
  };

  useEffect(() => {
    fetchItems();
    fetchQuiz();
  }, []);

  useEffect(() => {
    fetchSaved();
  }, [token]);

  useEffect(() => {
    if (items[activeIdx]) {
      fetchDetail(items[activeIdx].slug);
    }
  }, [activeIdx, items]);

  const activeItem = items[activeIdx] || null;

  const handleToggleSave = async (slug: string) => {
    if (!token) {
      alert("Please sign in to save script history items.");
      return;
    }
    const isSaved = savedSlugs.has(slug);
    try {
      if (isSaved) {
        await unsaveScriptHistoryApi(token, slug);
        const next = new Set(savedSlugs);
        next.delete(slug);
        setSavedSlugs(next);
      } else {
        await saveScriptHistoryApi(token, slug);
        const next = new Set(savedSlugs);
        next.add(slug);
        setSavedSlugs(next);
      }
    } catch (err: any) {
      alert(err.message || "Failed to update saved status.");
    }
  };

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !activeItem) return;
    if (!noteBody.trim()) return;
    setNoteSaving(true);
    try {
      await createNoteApi(token, {
        content_type: "script_history",
        content_id: activeItem.slug,
        title: noteTitle.trim() || `Notes on ${activeItem.title_en}`,
        body: noteBody.trim(),
      });
      setNoteSuccess(true);
      setTimeout(() => {
        setNoteSuccess(false);
        setShowNoteModal(false);
        setNoteBody("");
      }, 1500);
    } catch (err: any) {
      alert(err.message || "Failed to save note.");
    } finally {
      setNoteSaving(false);
    }
  };

  const speakText = (text: string) => {
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
      return;
    }
    setIsSpeaking(true);
    speakTamil(text, {
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  };

  // Quiz Option Click
  const handleSelectOption = (optionKey: "a" | "b" | "c" | "d") => {
    if (quizSubmitted) return;
    setSelectedAnswers({ ...selectedAnswers, [currentQuizIdx]: optionKey });
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    quizQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.answer) {
        score += 1;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
    setCurrentQuizIdx(0);
  };

  const scriptGlyphSymbols = ["𑀢", "𑁍", "𑌗", "𑀘", "𑁄", "ஔ"];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Top Navigation & Header Banner */}
      <div className="space-y-4">
        <Link
          href="/journey"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-amber-400 hover:border-amber-500/40 text-xs font-semibold transition-all shadow-md group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform text-amber-400" />
          <span>Back to Learning Journey</span>
        </Link>

        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[11px] uppercase tracking-wider font-semibold inline-flex items-center gap-1.5">
            <ScrollText size={13} /> Evolution of Tamil Writing • தமிழ் எழுத்து வரலாறு
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-zinc-100 tracking-tight">
            Tamil Script History <br />
            <span className="font-tamil text-amber-400 text-2xl sm:text-4xl font-semibold">
              தமிழ் எழுத்து வரிவடிவ வளர்ச்சி
            </span>
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
            Journey through 2,600 years of writing evolution: from Tamil-Brahmi rock bed inscriptions to Vatteluttu, Pallava Grantha flourishes, Imperial Chola stone engraving, printing press typography, and modern 247-character Unicode standard.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/script"
              className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-amber-500/40 text-amber-400 text-xs font-mono font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Type size={14} /> Practice Modern Tamil Script Explorer <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="p-12 rounded-3xl bg-zinc-950/80 border border-zinc-800 text-center space-y-4 max-w-md mx-auto">
          <div className="w-10 h-10 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-zinc-400 font-mono text-xs">Unrolling historical script manuscripts...</p>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="p-8 rounded-2xl bg-red-950/20 border border-red-900/50 text-center space-y-4 max-w-xl mx-auto">
          <AlertCircle className="mx-auto text-red-400" size={36} />
          <h3 className="text-lg font-bold text-zinc-100">Failed to load script history</h3>
          <p className="text-xs text-zinc-400 font-mono">{error}</p>
          <button
            onClick={fetchItems}
            className="px-4 py-2 rounded-xl bg-red-900/40 hover:bg-red-800/60 text-red-200 text-xs font-semibold inline-flex items-center gap-2 border border-red-700/50 cursor-pointer"
          >
            <RefreshCw size={14} /> Retry
          </button>
        </div>
      )}

      {/* Interactive Timeline Controls */}
      {!loading && !error && items.length > 0 && (
        <div className="space-y-8">
          {/* Timeline Nodes Bar */}
          <div className="bg-zinc-950/90 rounded-3xl p-4 sm:p-6 border border-zinc-800/80 shadow-2xl overflow-x-auto">
            <div className="flex items-center min-w-max justify-between gap-4 relative px-4 py-2">
              <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-zinc-800 -translate-y-1/2 z-0" />

              {items.map((item, idx) => {
                const isActive = activeIdx === idx;
                return (
                  <button
                    key={item.slug}
                    onClick={() => {
                      setActiveIdx(idx);
                      setActiveTab("overview");
                    }}
                    className={`relative z-10 flex flex-col items-center gap-2 group focus:outline-none transition-all cursor-pointer ${
                      isActive ? "scale-105" : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex flex-col items-center justify-center font-mono font-bold transition-all border ${
                        isActive
                          ? "bg-gradient-to-br from-amber-400 to-amber-600 text-zinc-950 border-amber-300 shadow-lg shadow-amber-500/20"
                          : "bg-zinc-900 border-zinc-700/80 text-zinc-300 group-hover:border-amber-500/50"
                      }`}
                    >
                      <span className="text-lg leading-none">{scriptGlyphSymbols[idx % scriptGlyphSymbols.length]}</span>
                      <span className="text-[10px] opacity-80">Phase {idx + 1}</span>
                    </div>
                    <div className="text-center space-y-0.5 max-w-[130px]">
                      <span className={`block font-serif text-xs font-semibold truncate ${isActive ? "text-amber-400" : "text-zinc-300"}`}>
                        {item.script || item.title_en}
                      </span>
                      <span className="block text-[10px] font-mono text-zinc-500 truncate">
                        {item.period}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* TAB SECTION SWITCHER FOR ACTIVE PHASE */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-zinc-900/80 rounded-2xl border border-zinc-800 max-w-2xl mx-auto">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "overview"
                  ? "bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <BookOpen size={14} /> Overview & History
            </button>
            <button
              onClick={() => setActiveTab("developments")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "developments"
                  ? "bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Feather size={14} /> Key Developments
            </button>
            <button
              onClick={() => setActiveTab("examples")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "examples"
                  ? "bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <ScrollText size={14} /> Inscriptional Examples
            </button>
            <button
              onClick={() => setActiveTab("quiz")}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "quiz"
                  ? "bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <HelpCircle size={14} /> Phase Quiz
            </button>
          </div>

          {/* ACTIVE SCRIPT PHASE CONTAINER */}
          {activeItem && (
            <motion.div
              key={activeItem.slug}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-zinc-950/80 rounded-3xl p-6 sm:p-10 border border-zinc-800/80 space-y-6 shadow-2xl relative overflow-hidden"
            >
              {/* Header Title & Badges */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[11px] uppercase tracking-wider font-semibold">
                      Phase {activeIdx + 1} of {items.length}
                    </span>
                    {activeItem.script && (
                      <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-[11px]">
                        Script: {activeItem.script}
                      </span>
                    )}
                    {activeItem.period && (
                      <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono text-[11px] flex items-center gap-1">
                        <Calendar size={12} /> {activeItem.period}
                      </span>
                    )}
                  </div>

                  <h2 className="font-serif text-2xl sm:text-4xl font-bold text-zinc-100">
                    {activeItem.title_en}
                  </h2>
                  <h3 className="font-tamil text-xl sm:text-2xl font-semibold text-amber-400">
                    {activeItem.title_ta}
                  </h3>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => {
                      setNoteTitle(`Notes on ${activeItem.title_en}`);
                      setShowNoteModal(true);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-amber-400 text-xs font-mono font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <FileText size={14} className="text-amber-400" /> Add Note
                  </button>

                  <button
                    onClick={() => handleToggleSave(activeItem.slug)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold inline-flex items-center gap-1.5 border transition-all cursor-pointer ${
                      savedSlugs.has(activeItem.slug)
                        ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
                        : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-amber-500/40"
                    }`}
                  >
                    {savedSlugs.has(activeItem.slug) ? (
                      <>
                        <BookmarkCheck size={14} className="text-amber-400" /> Saved Phase
                      </>
                    ) : (
                      <>
                        <Bookmark size={14} /> Save Phase
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => speakText(activeDetail?.short_intro_ta || activeItem.summary_ta)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-mono font-medium inline-flex items-center gap-1.5 border transition-all cursor-pointer ${
                      isSpeaking
                        ? "bg-amber-500/20 border-amber-500 text-amber-300 animate-pulse"
                        : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-amber-500/40"
                    }`}
                  >
                    {isSpeaking ? <VolumeX size={14} /> : <Volume2 size={14} className="text-amber-400" />}
                    <span>TTS</span>
                  </button>
                </div>
              </div>

              {/* TAB CONTENT 1: OVERVIEW & HISTORY */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Hero Banner / Script Image */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-4">
                      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block">
                          Epigraphic Significance
                        </span>
                        <p className="text-xs sm:text-sm text-amber-100 font-light leading-relaxed">
                          {activeDetail?.historical_significance_en || activeItem.historical_significance || activeDetail?.short_intro_en}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-serif text-lg font-bold text-zinc-100">Overview</h4>
                        <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed whitespace-pre-line">
                          {activeDetail?.overview_en || activeDetail?.content_en || activeItem.summary_en}
                        </p>
                      </div>

                      <div className="space-y-2 pt-2">
                        <h4 className="font-tamil text-lg font-semibold text-amber-400">வரலாற்று அறிமுகம்</h4>
                        <p className="text-xs sm:text-sm font-tamil text-amber-100/90 leading-relaxed whitespace-pre-line">
                          {activeDetail?.overview_ta || activeDetail?.content_ta || activeItem.summary_ta}
                        </p>
                      </div>
                    </div>

                    {/* Image / Glyph Symbol Panel */}
                    <div className="space-y-4">
                      <div className="h-64 sm:h-72 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 relative flex items-center justify-center">
                        {activeDetail?.image_url && !imgError ? (
                          <img
                            src={activeDetail.image_url}
                            alt={activeItem.title_en}
                            onError={() => setImgError(true)}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-center p-6 space-y-3">
                            <span className="text-6xl text-amber-400 block font-serif">
                              {scriptGlyphSymbols[activeIdx % scriptGlyphSymbols.length]}
                            </span>
                            <span className="text-xs font-mono text-zinc-400 block">
                              Phase {activeIdx + 1}: {activeItem.script}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Writing Media & Region Pills */}
                      <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3 text-xs font-mono">
                        <div>
                          <span className="text-amber-400 text-[10px] uppercase font-bold block">Writing Materials:</span>
                          <span className="text-zinc-300">{activeDetail?.writing_materials_en || "Granite cave beds, palm leaves, metal plates"}</span>
                        </div>
                        <div>
                          <span className="text-amber-400 text-[10px] uppercase font-bold block">Geographic Usage:</span>
                          <span className="text-zinc-300">{activeDetail?.where_used_en || "Tamilakam & Indian Ocean Ports"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB CONTENT 2: KEY DEVELOPMENTS */}
              {activeTab === "developments" && (
                <div className="space-y-6">
                  <h4 className="font-serif text-xl font-bold text-zinc-100">
                    Phonetic & Structural Developments in {activeItem.title_en}
                  </h4>

                  {activeDetail?.key_developments && activeDetail.key_developments.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeDetail.key_developments.map((dev, idx) => (
                        <div key={idx} className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2 hover:border-amber-500/40 transition-colors">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-400 font-mono text-xs font-bold flex items-center justify-center">
                              {idx + 1}
                            </span>
                            <h5 className="font-serif text-sm font-bold text-zinc-100">{dev.title_en}</h5>
                          </div>
                          <h6 className="font-tamil text-xs font-semibold text-amber-400/90">{dev.title_ta}</h6>
                          <p className="text-xs text-zinc-300 font-light leading-relaxed">{dev.description_en}</p>
                          <p className="text-xs font-tamil text-zinc-400 leading-relaxed pt-1">{dev.description_ta}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-zinc-500 font-mono text-xs bg-zinc-900/40 rounded-2xl">
                      Key developments catalogued for {activeItem.title_en}.
                    </div>
                  )}
                </div>
              )}

              {/* TAB CONTENT 3: INSCRIPTIONAL EXAMPLES */}
              {activeTab === "examples" && (
                <div className="space-y-6">
                  <h4 className="font-serif text-xl font-bold text-zinc-100">
                    Archaeological & Inscriptional Manuscripts
                  </h4>

                  {activeDetail?.important_examples && activeDetail.important_examples.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {activeDetail.important_examples.map((ex, idx) => (
                        <div key={idx} className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-4 shadow-xl overflow-hidden flex flex-col justify-between hover:border-amber-500/40 transition-colors">
                          <div className="space-y-3">
                            {ex.image_url && (
                              <div className="h-56 rounded-xl overflow-hidden bg-zinc-950/90 border border-zinc-800/80 relative flex items-center justify-center p-1 group">
                                <img
                                  src={ex.image_url}
                                  alt={ex.name_en}
                                  className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                                  onError={(e) => {
                                    (e.target as HTMLElement).style.display = "none";
                                  }}
                                />
                              </div>
                            )}
                            <div className="space-y-1">
                              <span className="px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-mono uppercase font-bold">
                                Example {idx + 1}
                              </span>
                              <h5 className="font-serif text-base font-bold text-zinc-100">{ex.name_en}</h5>
                              <h6 className="font-tamil text-xs font-semibold text-amber-400">{ex.name_ta}</h6>
                            </div>
                            <p className="text-xs text-zinc-300 font-light leading-relaxed">{ex.description_en}</p>
                            <p className="text-xs font-tamil text-zinc-400 leading-relaxed">{ex.description_ta}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-zinc-500 font-mono text-xs bg-zinc-900/40 rounded-2xl">
                      Inscriptional examples recorded for {activeItem.title_en}.
                    </div>
                  )}
                </div>
              )}

              {/* TAB CONTENT 4: SCRIPT HISTORY QUIZ */}
              {activeTab === "quiz" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
                    <div>
                      <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                        Script History Knowledge Check
                      </span>
                      <h4 className="font-serif text-xl font-bold text-zinc-100">
                        Interactive Phase Quiz ({quizQuestions.length} Questions)
                      </h4>
                    </div>
                    {quizSubmitted && (
                      <button
                        onClick={resetQuiz}
                        className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-amber-400 hover:border-amber-500/40 cursor-pointer"
                      >
                        Reset Quiz
                      </button>
                    )}
                  </div>

                  {quizQuestions.length > 0 ? (
                    <div className="space-y-6">
                      {/* Question Navigation */}
                      <div className="flex items-center gap-2 overflow-x-auto pb-2">
                        {quizQuestions.map((q, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentQuizIdx(idx)}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer shrink-0 ${
                              currentQuizIdx === idx
                                ? "bg-amber-500 text-zinc-950 font-bold shadow-md shadow-amber-500/20"
                                : selectedAnswers[idx]
                                ? "bg-zinc-800 text-amber-300 border border-zinc-700"
                                : "bg-zinc-900 text-zinc-400 border border-zinc-800"
                            }`}
                          >
                            Q{idx + 1}
                          </button>
                        ))}
                      </div>

                      {/* Active Quiz Question Card */}
                      {(() => {
                        const q = quizQuestions[currentQuizIdx] || quizQuestions[0];
                        const userAns = selectedAnswers[currentQuizIdx];
                        const isCorrect = userAns === q.answer;

                        return (
                          <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/90 border border-zinc-800 space-y-6 shadow-xl">
                            <div className="space-y-2">
                              <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold">
                                Question {currentQuizIdx + 1} of {quizQuestions.length}
                              </span>
                              <h5 className="font-serif text-base sm:text-lg font-bold text-zinc-100">
                                {q.question.en}
                              </h5>
                              <h6 className="font-tamil text-sm font-semibold text-amber-400/90">
                                {q.question.ta}
                              </h6>
                            </div>

                            {/* Options A, B, C, D */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {(["a", "b", "c", "d"] as const).map((optKey) => {
                                const opt = q.options[optKey];
                                const isSelected = userAns === optKey;
                                const isAnswerKey = q.answer === optKey;

                                let btnStyle = "bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-amber-500/40";
                                if (isSelected) {
                                  btnStyle = "bg-amber-500/20 border-amber-500 text-amber-300 shadow-md shadow-amber-500/10";
                                }
                                if (quizSubmitted) {
                                  if (isAnswerKey) {
                                    btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold";
                                  } else if (isSelected && !isAnswerKey) {
                                    btnStyle = "bg-red-500/20 border-red-500 text-red-300";
                                  }
                                }

                                return (
                                  <button
                                    key={optKey}
                                    onClick={() => handleSelectOption(optKey)}
                                    className={`p-4 rounded-2xl border transition-all text-left space-y-1 group cursor-pointer ${btnStyle}`}
                                  >
                                    <div className="flex items-center justify-between">
                                      <span className="w-6 h-6 rounded-full bg-zinc-900 border border-zinc-700 text-xs font-mono font-bold text-zinc-300 flex items-center justify-center uppercase">
                                        {optKey}
                                      </span>
                                      {quizSubmitted && isAnswerKey && (
                                        <CheckCircle2 size={16} className="text-emerald-400" />
                                      )}
                                    </div>
                                    <p className="text-xs font-semibold text-zinc-200">{opt.en}</p>
                                    <p className="text-xs font-tamil text-amber-400/80">{opt.ta}</p>
                                  </button>
                                );
                              })}
                            </div>

                            {/* Submit Button */}
                            {!quizSubmitted && (
                              <div className="pt-2 flex justify-end">
                                <button
                                  onClick={handleSubmitQuiz}
                                  disabled={Object.keys(selectedAnswers).length < quizQuestions.length}
                                  className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-amber-500/10"
                                >
                                  Submit Quiz Answers
                                </button>
                              </div>
                            )}

                            {/* Score Display Modal after submission */}
                            {quizSubmitted && (
                              <div className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-center space-y-3">
                                <Award className="mx-auto text-amber-400" size={32} />
                                <h5 className="font-serif text-lg font-bold text-zinc-100">
                                  Quiz Score: {quizScore} / {quizQuestions.length}
                                </h5>
                                <p className="text-xs text-zinc-300 font-mono">
                                  {quizScore === quizQuestions.length
                                    ? "Perfect Score! You have mastered 2,600 years of Tamil script evolution."
                                    : "Great effort! Review the historical developments and try again to refine your knowledge."}
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })()}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-zinc-500 font-mono text-xs bg-zinc-900/40 rounded-2xl">
                      Script history quiz dataset initializing...
                    </div>
                  )}
                </div>
              )}

              {/* Provenance Footer */}
              <div className="pt-4 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-500">
                <span>Source: Archaeological Survey of India & Cre-A Palaeography</span>
                {activeDetail?.license && (
                  <span className="px-2.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                    License: {activeDetail.license}
                  </span>
                )}
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Add Note Modal */}
      {showNoteModal && activeItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-zinc-100 flex items-center gap-2">
                <FileText size={18} className="text-amber-400" /> Add Script History Note
              </h3>
              <button
                onClick={() => setShowNoteModal(false)}
                className="text-zinc-500 hover:text-zinc-300 text-xs font-mono cursor-pointer"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleCreateNote} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-zinc-400 block mb-1">Note Title</label>
                <input
                  type="text"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-100 text-xs focus:outline-none focus:border-amber-500/50"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-mono text-zinc-400 block mb-1">Note Body</label>
                <textarea
                  rows={4}
                  placeholder="Record your observations on this script phase..."
                  value={noteBody}
                  onChange={(e) => setNoteBody(e.target.value)}
                  className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-100 text-xs focus:outline-none focus:border-amber-500/50"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNoteModal(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={noteSaving}
                  className="px-5 py-2 rounded-xl bg-amber-500 text-zinc-950 font-bold text-xs font-mono hover:bg-amber-400 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {noteSuccess ? "Saved Note!" : noteSaving ? "Saving..." : "Save Note"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
