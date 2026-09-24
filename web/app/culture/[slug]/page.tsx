"use client";

import { useState, useEffect, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ContentImage from "@/components/ContentImage";
import {
  ArrowLeft,
  Volume2,
  Bookmark,
  BookmarkCheck,
  FileText,
  MapPin,
  Calendar,
  ExternalLink,
  ShieldCheck,
  BookOpen,
  ArrowRight,
  X,
  Check,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Trophy,
  Award,
  Sparkles,
  Map,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import {
  getCultureDetail,
  getSavedCulture,
  saveCultureApi,
  unsaveCultureApi,
  createNoteApi,
  getCultureQuiz,
} from "@/lib/api";
import { CulturalItemDetail, CultureQuizQuestion } from "@/lib/types";
import { LOCAL_CULTURE_DATA, LOCAL_CULTURE_QUIZ_DATA } from "@/lib/cultureLocalData";
import { speak } from "@/lib/curriculum";

export default function CulturalDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const { user, token } = useAuth();
  const [item, setItem] = useState<CulturalItemDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Note Modal State
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");
  const [noteStatus, setNoteStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [noteError, setNoteError] = useState("");

  // Quiz State for this specific topic
  const [quizQuestions, setQuizQuestions] = useState<CultureQuizQuestion[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [quizLanguage, setQuizLanguage] = useState<"en" | "ta">("en");

  const fetchDetail = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCultureDetail(slug);
      if (data) {
        setItem(data);
      } else {
        fallbackToLocalData();
      }
    } catch {
      fallbackToLocalData();
    } finally {
      setLoading(false);
    }
  };

  const fallbackToLocalData = () => {
    const localMatch = LOCAL_CULTURE_DATA.find((i) => i.slug === slug);
    if (localMatch) {
      setItem(localMatch);
      setError(null);
    } else {
      setError("Cultural item not found.");
    }
  };

  const checkSavedState = async () => {
    if (!token) return;
    try {
      const savedList = await getSavedCulture(token);
      setIsSaved(savedList.some((s) => s.slug === slug));
    } catch {}
  };

  useEffect(() => {
    fetchDetail();
  }, [slug]);

  useEffect(() => {
    checkSavedState();
  }, [slug, token]);

  // Load quiz questions for this topic
  useEffect(() => {
    const localQ = LOCAL_CULTURE_QUIZ_DATA[slug] || [];
    setQuizQuestions(localQ);

    getCultureQuiz(slug)
      .then((res) => {
        if (res && res.questions && res.questions.length > 0) {
          setQuizQuestions(res.questions);
        }
      })
      .catch(() => {});
  }, [slug]);

  const handleToggleSave = async () => {
    if (!token || !user) {
      alert("Please log in to save cultural items.");
      return;
    }
    if (isSaving) return;
    setIsSaving(true);
    try {
      if (isSaved) {
        await unsaveCultureApi(token, slug);
        setIsSaved(false);
      } else {
        await saveCultureApi(token, slug);
        setIsSaved(true);
      }
    } catch (err: any) {
      alert(err.message || "Failed to update saved state.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !user) {
      alert("Please log in to add notes.");
      return;
    }
    if (!noteBody.trim()) return;

    setNoteStatus("saving");
    setNoteError("");
    try {
      await createNoteApi(token, {
        content_type: "culture",
        content_id: slug,
        title: noteTitle.trim() || undefined,
        body: noteBody.trim(),
      });
      setNoteStatus("success");
      setTimeout(() => {
        setShowNoteModal(false);
        setNoteStatus("idle");
        setNoteTitle("");
        setNoteBody("");
      }, 1000);
    } catch (err: any) {
      setNoteStatus("error");
      setNoteError(err.message || "Failed to create note.");
    }
  };

  const handleOptionSelect = (optionIdx: number) => {
    if (isAnswered) return;
    setSelectedOption(optionIdx);
    setIsAnswered(true);

    const currentQ = quizQuestions[currentQIndex];
    if (currentQ && optionIdx === currentQ.answer_index) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQIndex + 1 < quizQuestions.length) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setQuizScore(0);
    setQuizCompleted(false);
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6 text-center">
        <div className="space-y-4">
          <div className="w-12 h-12 rounded-full border-2 border-amber-500/30 border-t-amber-400 animate-spin mx-auto" />
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-400">
            Loading cultural entry...
          </p>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="p-8 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
          <BookOpen className="text-amber-400 mx-auto" size={36} />
          <h2 className="font-serif text-2xl font-bold text-zinc-100">
            Cultural Item Not Found
          </h2>
          <p className="text-zinc-400 text-xs font-mono">{error || "Requested slug does not exist."}</p>
          <div className="pt-2">
            <Link
              href="/culture"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-zinc-950 font-mono text-xs font-semibold uppercase tracking-wider"
            >
              <ArrowLeft size={16} /> Return to Culture Hub
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Split content paragraphs by \n\n
  const paragraphsEn = (item.content_en || "").split("\n\n").filter(Boolean);
  const paragraphsTa = (item.content_ta || "").split("\n\n").filter(Boolean);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/culture"
          className="p-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors flex items-center gap-2 text-xs font-mono uppercase tracking-wider"
        >
          <ArrowLeft size={16} />
          <span>Culture Hub</span>
        </Link>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* TTS Speaker */}
          <button
            onClick={() => speak(`${item.title_ta}. ${item.summary_ta}`)}
            className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
            title="Listen to Tamil title & summary"
          >
            <Volume2 size={15} />
            <span>Listen</span>
          </button>

          {/* Save / Unsave */}
          <button
            onClick={handleToggleSave}
            disabled={isSaving}
            className={`px-3 py-1.5 rounded-xl border font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
              isSaved
                ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/25"
                : "bg-zinc-950 hover:bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-amber-400"
            }`}
          >
            {isSaved ? (
              <>
                <BookmarkCheck size={15} className="text-emerald-400" />
                <span>Saved</span>
              </>
            ) : (
              <>
                <Bookmark size={15} className="text-zinc-400" />
                <span>Save</span>
              </>
            )}
          </button>

          {/* Add Note */}
          {user && (
            <button
              onClick={() => setShowNoteModal(true)}
              className="px-3 py-1.5 rounded-xl bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-amber-400 font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <FileText size={15} className="text-amber-400" />
              <span>Note</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[11px] uppercase tracking-wider font-semibold">
            {item.category}
          </span>
          {item.region && (
            <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-[11px] uppercase tracking-wider flex items-center gap-1">
              <MapPin size={12} className="text-amber-400" /> {item.region}
            </span>
          )}
          {item.period && (
            <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-[11px] uppercase tracking-wider flex items-center gap-1">
              <Calendar size={12} className="text-amber-400" /> {item.period}
            </span>
          )}
          {item.latitude && item.longitude && (
            <Link
              href={`/map?lat=${item.latitude}&lng=${item.longitude}&name=${encodeURIComponent(
                item.location_name || item.title_en
              )}`}
              className="px-3 py-1 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-mono text-[11px] uppercase tracking-wider flex items-center gap-1 transition-colors"
            >
              <Map size={12} /> View on Map ({item.location_name || "Tamil Nadu"})
            </Link>
          )}
        </div>

        <div>
          <h1 className="font-tamil text-4xl sm:text-6xl font-bold text-amber-400 tracking-wide">
            {item.title_ta}
          </h1>
          <p className="font-serif text-2xl sm:text-3xl font-bold text-zinc-100 mt-1">
            {item.title_en}
          </p>
          {item.subtitle_en && (
            <p className="text-sm font-light text-zinc-400 italic mt-1">
              {item.subtitle_en}
            </p>
          )}
        </div>
      </div>

      {/* Hero Image Banner */}
      <div className="rounded-3xl overflow-hidden border border-zinc-800/80 shadow-2xl bg-zinc-950">
        <ContentImage
          src={item.image_url || `/assets/culture/${item.slug}.jpg`}
          alt={item.title_en}
          category={item.category}
          aspectRatio="h-64 sm:h-96 w-full"
        />
        {item.image_caption && (
          <div className="p-3 bg-zinc-950/90 border-t border-zinc-900 text-xs font-mono text-zinc-400 text-center italic">
            {item.image_caption}
          </div>
        )}
      </div>

      {/* Summary Highlight Box */}
      <div className="p-6 rounded-3xl bg-zinc-950/80 border border-zinc-800/80 space-y-3 shadow-xl">
        <h3 className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
          Summary • சுருக்கம்
        </h3>
        <p className="text-sm sm:text-base text-zinc-200 font-serif leading-relaxed">
          {item.summary_en}
        </p>
        <p className="font-tamil text-sm text-amber-300/90 leading-relaxed pt-1 border-t border-zinc-900">
          {item.summary_ta}
        </p>
      </div>

      {/* Dual Content Section (Tamil & English) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        {/* Tamil Explanation */}
        <div className="bg-zinc-950/90 rounded-3xl p-6 sm:p-8 border border-zinc-800/80 space-y-5 shadow-xl">
          <div className="text-xs font-mono text-amber-400 uppercase tracking-widest pb-2 border-b border-zinc-900 flex items-center justify-between">
            <span>தமிழ் விளக்கம் (Tamil)</span>
            <button
              onClick={() => speak(item.content_ta)}
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
            >
              <Volume2 size={14} /> Listen
            </button>
          </div>
          <div className="space-y-4">
            {paragraphsTa.map((p, idx) => (
              <p key={idx} className="font-tamil text-base sm:text-lg text-zinc-100 leading-relaxed font-medium">
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* English Explanation */}
        <div className="bg-zinc-950/90 rounded-3xl p-6 sm:p-8 border border-zinc-800/80 space-y-5 shadow-xl">
          <div className="text-xs font-mono text-amber-400 uppercase tracking-widest pb-2 border-b border-zinc-900">
            English Overview
          </div>
          <div className="space-y-4">
            {paragraphsEn.map((p, idx) => (
              <p key={idx} className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* EMBEDDED TOPIC QUIZ SECTION */}
      {quizQuestions.length > 0 && (
        <div className="bg-zinc-950/90 rounded-3xl p-6 sm:p-8 border border-zinc-800/80 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-zinc-900">
            <div className="flex items-center gap-2">
              <HelpCircle className="text-amber-400" size={20} />
              <div>
                <h3 className="font-serif text-xl font-bold text-zinc-100">
                  Topic Quiz • {item.title_en}
                </h3>
                <p className="text-xs font-mono text-zinc-400">
                  Test your understanding of {item.title_en} with 3 interactive questions
                </p>
              </div>
            </div>

            {/* Language Toggle */}
            <div className="flex items-center bg-zinc-900 p-1 rounded-xl border border-zinc-800">
              <button
                onClick={() => setQuizLanguage("en")}
                className={`px-3 py-1 rounded-lg text-xs font-mono uppercase font-semibold cursor-pointer ${
                  quizLanguage === "en" ? "bg-amber-500 text-zinc-950" : "text-zinc-400 hover:text-white"
                }`}
              >
                English
              </button>
              <button
                onClick={() => setQuizLanguage("ta")}
                className={`px-3 py-1 rounded-lg text-xs font-mono uppercase font-semibold cursor-pointer ${
                  quizLanguage === "ta" ? "bg-amber-500 text-zinc-950" : "text-zinc-400 hover:text-white"
                }`}
              >
                தமிழ்
              </button>
            </div>
          </div>

          {!quizCompleted ? (
            <div className="space-y-5">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>
                  Question {currentQIndex + 1} of {quizQuestions.length}
                </span>
                <span className="text-amber-400 font-bold">
                  Score: {quizScore} / {quizQuestions.length}
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 transition-all duration-300"
                  style={{
                    width: `${((currentQIndex + 1) / quizQuestions.length) * 100}%`,
                  }}
                />
              </div>

              {/* Question Text */}
              <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 space-y-1">
                <h4 className="font-serif text-lg font-bold text-zinc-100">
                  {quizLanguage === "ta"
                    ? quizQuestions[currentQIndex].question_ta
                    : quizQuestions[currentQIndex].question_en}
                </h4>
                {quizLanguage === "en" && (
                  <p className="font-tamil text-amber-400/90 text-xs">
                    {quizQuestions[currentQIndex].question_ta}
                  </p>
                )}
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(quizLanguage === "ta"
                  ? quizQuestions[currentQIndex].options_ta
                  : quizQuestions[currentQIndex].options_en
                ).map((optText, idx) => {
                  const currentQ = quizQuestions[currentQIndex];
                  const isCorrect = idx === currentQ.answer_index;
                  const isSelected = selectedOption === idx;

                  let cardStyle =
                    "bg-zinc-900/60 border-zinc-800/80 hover:border-amber-500/40 text-zinc-300";

                  if (isAnswered) {
                    if (isCorrect) {
                      cardStyle = "bg-emerald-500/20 border-emerald-500/60 text-emerald-200 font-bold";
                    } else if (isSelected) {
                      cardStyle = "bg-rose-500/20 border-rose-500/60 text-rose-200";
                    } else {
                      cardStyle = "bg-zinc-900/30 border-zinc-800/40 text-zinc-500 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleOptionSelect(idx)}
                      className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between gap-3 ${cardStyle}`}
                    >
                      <span>{optText}</span>
                      {isAnswered && (
                        <div>
                          {isCorrect ? (
                            <CheckCircle2 size={16} className="text-emerald-400" />
                          ) : isSelected ? (
                            <XCircle size={16} className="text-rose-400" />
                          ) : null}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1.5"
                >
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Sparkles size={13} /> Cultural Insight
                  </span>
                  <p className="text-xs text-zinc-200 font-light leading-relaxed">
                    {quizLanguage === "ta"
                      ? quizQuestions[currentQIndex].explanation_ta
                      : quizQuestions[currentQIndex].explanation_en}
                  </p>
                </motion.div>
              )}

              {/* Next Button */}
              {isAnswered && (
                <div className="flex justify-end pt-1">
                  <button
                    onClick={handleNextQuestion}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono text-xs uppercase font-bold tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>
                      {currentQIndex + 1 < quizQuestions.length ? "Next Question" : "View Results"}
                    </span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="py-6 text-center space-y-4 max-w-sm mx-auto">
              <Trophy size={36} className="text-amber-400 mx-auto" />
              <div className="space-y-1">
                <h4 className="font-serif text-xl font-bold text-zinc-100">
                  Topic Quiz Completed!
                </h4>
                <p className="text-xs text-zinc-400">
                  You scored <span className="text-amber-400 font-bold">{quizScore}</span> /{" "}
                  {quizQuestions.length} on {item.title_en}.
                </p>
              </div>
              <button
                onClick={handleRestartQuiz}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Retry Topic Quiz
              </button>
            </div>
          )}
        </div>
      )}

      {/* Source Provenance Card */}
      <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800/80 space-y-3 shadow-lg">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400">
          <ShieldCheck size={16} /> Source Provenance & Historical Attribution
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-400 pt-1">
          <div>
            <span className="text-zinc-500">Source: </span>
            <span className="text-zinc-200 font-semibold">{item.source_name}</span>
            <span className="ml-2 px-2 py-0.5 rounded bg-zinc-900 text-[10px] text-zinc-400 border border-zinc-800 uppercase">
              {item.source_type}
            </span>
          </div>

          {item.license && (
            <div>
              <span className="text-zinc-500">License: </span>
              <span className="text-amber-300">{item.license}</span>
            </div>
          )}

          {item.source_url && (
            <a
              href={item.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-amber-400 hover:underline"
            >
              <span>View Reference</span>
              <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>

      {/* Related Cultural Items */}
      {item.related && item.related.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-zinc-900">
          <h3 className="font-serif text-2xl font-bold text-zinc-100">
            Related Cultural Knowledge
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {item.related.map((rel) => (
              <Link
                key={rel.slug}
                href={`/culture/${rel.slug}`}
                className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800 hover:border-amber-500/50 transition-all space-y-2 group"
              >
                <div className="h-28 rounded-xl overflow-hidden bg-zinc-900">
                  <ContentImage
                    src={rel.image_url || `/assets/culture/${rel.slug}.jpg`}
                    alt={rel.title_en}
                    category={rel.category}
                    aspectRatio="h-28 w-full"
                  />
                </div>
                <div>
                  <h4 className="font-tamil text-lg font-bold text-amber-400">
                    {rel.title_ta}
                  </h4>
                  <p className="text-xs font-serif font-bold text-zinc-200 truncate">
                    {rel.title_en}
                  </p>
                </div>
                <div className="text-[10px] font-mono text-amber-400/80 flex items-center justify-between pt-1">
                  <span>{rel.category}</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Add Note Modal */}
      <AnimatePresence>
        {showNoteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 relative"
            >
              <div className="flex items-center justify-between pb-4 border-b border-zinc-900">
                <div className="flex items-center gap-2">
                  <FileText className="text-amber-400" size={20} />
                  <h3 className="font-serif text-xl font-bold text-zinc-100">
                    Add Note for <span className="font-tamil text-amber-400">{item.title_ta}</span>
                  </h3>
                </div>
                <button
                  onClick={() => setShowNoteModal(false)}
                  className="p-1.5 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSaveNote} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    Optional Title
                  </label>
                  <input
                    type="text"
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)}
                    placeholder="e.g. Cultural context or historical detail..."
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500/60"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    Note Details (Tamil / English)
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={noteBody}
                    onChange={(e) => setNoteBody(e.target.value)}
                    placeholder="Write your cultural notes or explanations here..."
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500/60 font-sans"
                  />
                </div>

                {noteError && (
                  <p className="text-xs text-rose-400 font-mono">{noteError}</p>
                )}

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowNoteModal(false)}
                    className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 text-xs font-mono uppercase tracking-wider cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={noteStatus === "saving" || !noteBody.trim()}
                    className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-xs font-mono uppercase tracking-wider transition-colors disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
                  >
                    {noteStatus === "saving" ? (
                      "Saving..."
                    ) : noteStatus === "success" ? (
                      <>
                        <Check size={14} /> Saved!
                      </>
                    ) : (
                      "Save Note"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
