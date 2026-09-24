"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth";
import { getDailyDashboard, postDailyProgress, toggleKuralReadApi, saveKuralReflectionApi } from "@/lib/api";
import { DailyDashboardResponse, DailyMissionItem } from "@/lib/types";
import { speakTamil, stopSpeech } from "@/lib/tts";
import StylusEmblem from "@/components/StylusEmblem";
import {
  CalendarCheck,
  Flame,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Blocks,
  PenTool,
  Award,
  Trophy,
  RefreshCw,
  Volume2,
  VolumeX,
  BookOpenCheck,
  Save,
  Check,
  MessageSquareQuote,
  Feather,
} from "lucide-react";

export default function DailyDashboardPage() {
  const { user, token, loading: authLoading } = useAuth();
  const [data, setData] = useState<DailyDashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Thirukkural state
  const [activeCommentary, setActiveCommentary] = useState<"mv" | "sp" | "mk">("mv");
  const [reflectionText, setReflectionText] = useState("");
  const [isSavingReflection, setIsSavingReflection] = useState(false);
  const [reflectionSavedMsg, setReflectionSavedMsg] = useState(false);
  const [isTogglingRead, setIsTogglingRead] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const loadDashboard = useCallback(async () => {
    const activeToken = token || localStorage.getItem("ezh_token");
    if (!activeToken) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const res = await getDailyDashboard(activeToken);
      setData(res);
      if (res.daily_kural?.reflection?.body) {
        setReflectionText(res.daily_kural.reflection.body);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load daily dashboard.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!authLoading && user) {
      loadDashboard();
    }
  }, [user, authLoading, loadDashboard]);

  // Formatted Date
  const todayFormatted = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const getMissionIcon = (type: DailyMissionItem["type"]) => {
    switch (type) {
      case "lesson":
        return <BookOpen size={20} className="text-amber-400" />;
      case "vocabulary":
        return <Blocks size={20} className="text-emerald-400" />;
      case "writing":
      case "reading":
        return <PenTool size={20} className="text-cyan-400" />;
      case "quiz":
        return <Trophy size={20} className="text-amber-300" />;
      default:
        return <Sparkles size={20} className="text-amber-400" />;
    }
  };

  const handleSpeakKural = () => {
    if (!data?.daily_kural) return;
    if (isPlayingAudio) {
      stopSpeech();
      setIsPlayingAudio(false);
      return;
    }

    const fullText = `${data.daily_kural.line1}. ${data.daily_kural.line2}`;
    setIsPlayingAudio(true);
    speakTamil(fullText, {
      onEnd: () => setIsPlayingAudio(false),
      onError: () => setIsPlayingAudio(false),
    });
  };

  const handleToggleRead = async () => {
    const activeToken = token || localStorage.getItem("ezh_token");
    if (!activeToken || isTogglingRead) return;
    try {
      setIsTogglingRead(true);
      const res = await toggleKuralReadApi(activeToken);
      setData(res);
    } catch (err: any) {
      console.error("Failed to toggle Kural read status:", err);
    } finally {
      setIsTogglingRead(false);
    }
  };

  const handleSaveReflection = async () => {
    const activeToken = token || localStorage.getItem("ezh_token");
    if (!activeToken || !data?.daily_kural || isSavingReflection) return;
    try {
      setIsSavingReflection(true);
      const res = await saveKuralReflectionApi(activeToken, data.daily_kural.number, reflectionText);
      setData(res);
      setReflectionSavedMsg(true);
      setTimeout(() => setReflectionSavedMsg(false), 3000);
    } catch (err: any) {
      console.error("Failed to save Kural reflection:", err);
    } finally {
      setIsSavingReflection(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07070a] text-zinc-100 flex flex-col justify-center items-center p-6 font-sans">
        <div className="flex flex-col items-center gap-4">
          <StylusEmblem size={48} variant="landing" />
          <div className="flex items-center gap-2 text-amber-400 font-mono text-sm">
            <RefreshCw size={18} className="animate-spin" />
            <span>Loading Today's Tamil Dashboard...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-[#07070a] text-zinc-100 flex flex-col justify-center items-center p-6 font-sans">
        <div className="max-w-md w-full p-6 rounded-3xl bg-zinc-900 border border-zinc-800 text-center space-y-4">
          <h2 className="text-lg font-bold text-zinc-200">Daily Dashboard Unavailable</h2>
          <p className="text-xs text-zinc-400">{error || "Failed to connect to backend server."}</p>
          <button
            onClick={loadDashboard}
            className="px-6 py-2.5 rounded-2xl bg-amber-500 text-zinc-950 font-bold text-xs hover:bg-amber-400 transition-colors cursor-pointer"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  const { progress, streak, missions, daily_bonus, daily_kural } = data;
  const progressPct = Math.round((progress.completed / progress.total) * 100);

  return (
    <div className="min-h-screen bg-[#07070a] text-zinc-100 flex flex-col font-sans">
      {/* Top Bar Navigation */}
      <header className="sticky top-0 z-30 bg-[#07070a]/90 backdrop-blur-md border-b border-zinc-800/80 px-4 py-3.5">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/journey"
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-amber-400 hover:border-amber-500/40 transition-all flex items-center gap-1.5"
            >
              <ArrowRight size={18} className="rotate-180" />
              <span className="text-xs font-mono hidden sm:inline">Journey</span>
            </Link>
            <div className="flex items-center gap-2">
              <StylusEmblem size={28} variant="landing" />
              <div>
                <h1 className="text-base font-bold text-zinc-100 flex items-center gap-2 leading-tight">
                  Daily Tamil <span className="text-amber-400 font-tamil font-semibold text-xs">இன்றைய தமிழ்</span>
                </h1>
                <p className="text-[10px] text-zinc-400 font-mono hidden sm:block">{todayFormatted}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono font-bold text-xs">
              <Flame size={14} className="text-amber-400 animate-pulse" />
              <span>{streak.current}d Streak</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Dashboard */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* Banner Hero Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-amber-950/20 border border-zinc-800 shadow-2xl relative overflow-hidden space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono">
                <CalendarCheck size={14} />
                <span>Today's Learning Loop</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-100">
                What will you learn today?
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-mono">
                Complete today's 4 core missions to maintain your streak and earn bonus XP.
              </p>
            </div>

            {/* Daily XP Stat */}
            <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 flex items-center gap-3 shrink-0">
              <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400">
                <Award size={24} />
              </div>
              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">
                  Today's XP
                </span>
                <span className="text-xl font-bold font-mono text-amber-300">
                  +{progress.xp_earned} XP
                </span>
              </div>
            </div>
          </div>

          {/* Progress Bar Container */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono font-semibold">
              <span className="text-zinc-300">Daily Mission Progress</span>
              <span className="text-amber-400 font-bold">
                {progress.completed} / {progress.total} Complete ({progressPct}%)
              </span>
            </div>
            <div className="h-3 rounded-full bg-zinc-950 border border-zinc-800 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 shadow-md"
              />
            </div>
          </div>
        </div>

        {/* DAILY THIRUKKURAL CARD */}
        {daily_kural && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 sm:p-8 rounded-3xl bg-zinc-900/90 border border-amber-500/30 shadow-2xl space-y-6 relative overflow-hidden"
          >
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600" />

            {/* Header: Title & Kural Number */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-zinc-800/80">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Feather size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-zinc-100 font-tamil flex items-center gap-2">
                    இன்றைய திருக்குறள்
                    <span className="text-xs font-mono font-normal text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                      குறள் #{daily_kural.number}
                    </span>
                  </h3>
                  <p className="text-[11px] text-zinc-400 font-mono">Daily Thirukkural Wisdom</p>
                </div>
              </div>

              {/* Read Status & XP Claim Button */}
              <button
                onClick={handleToggleRead}
                disabled={isTogglingRead}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${daily_kural.read
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30"
                    : "bg-amber-500 text-zinc-950 hover:bg-amber-400 shadow-md animate-pulse"
                  }`}
              >
                {daily_kural.read ? (
                  <>
                    <BookOpenCheck size={16} />
                    <span>Read (+5 XP)</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    <span>Mark as Read (+5 XP)</span>
                  </>
                )}
              </button>
            </div>

            {/* Couplet Lines & Audio Player */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/20 via-zinc-950 to-zinc-950 border border-amber-500/20 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5 font-tamil text-xl sm:text-2xl font-bold text-amber-200 leading-relaxed tracking-wide">
                  <p>{daily_kural.line1}</p>
                  <p>{daily_kural.line2}</p>
                </div>

                {/* Listen TTS Audio Button */}
                <button
                  onClick={handleSpeakKural}
                  title="Listen with Tamil TTS"
                  className={`p-3 rounded-2xl border transition-all cursor-pointer shrink-0 ${isPlayingAudio
                      ? "bg-amber-500 text-zinc-950 border-amber-400 animate-pulse"
                      : "bg-zinc-900 text-amber-400 border-amber-500/30 hover:bg-amber-500/20"
                    }`}
                >
                  {isPlayingAudio ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
              </div>

              {/* Transliteration */}
              <div className="pt-2 border-t border-zinc-800/60 font-mono text-xs text-zinc-400 space-y-0.5 italic">
                <p>{daily_kural.transliteration1}</p>
                <p>{daily_kural.transliteration2}</p>
              </div>
            </div>

            {/* English Translation & Explanation */}
            <div className="space-y-2 text-xs sm:text-sm text-zinc-300 leading-relaxed bg-zinc-950/60 p-4 rounded-2xl border border-zinc-800/80">
              <p className="font-semibold text-zinc-200">
                <span className="text-amber-400 font-mono uppercase text-xs">Couplet: </span>
                {daily_kural.couplet || daily_kural.translation}
              </p>
              <p className="text-zinc-400 text-xs">
                <span className="text-amber-400 font-mono uppercase text-[10px]">Explanation: </span>
                {daily_kural.explanation}
              </p>
            </div>

            {/* Commentary Tabs */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-zinc-800 pb-2 overflow-x-auto">
                <span className="text-xs font-mono text-zinc-400 mr-2 shrink-0">உரைகள் (Commentaries):</span>
                <button
                  onClick={() => setActiveCommentary("mv")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-tamil font-semibold transition-all cursor-pointer shrink-0 ${activeCommentary === "mv"
                      ? "bg-amber-500/20 border border-amber-500/40 text-amber-300"
                      : "bg-zinc-950 text-zinc-400 border border-zinc-800 hover:text-zinc-200"
                    }`}
                >
                  மு. வரதராசன்
                </button>
                <button
                  onClick={() => setActiveCommentary("sp")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-tamil font-semibold transition-all cursor-pointer shrink-0 ${activeCommentary === "sp"
                      ? "bg-amber-500/20 border border-amber-500/40 text-amber-300"
                      : "bg-zinc-950 text-zinc-400 border border-zinc-800 hover:text-zinc-200"
                    }`}
                >
                  சாலமன் பாப்பையா
                </button>
                <button
                  onClick={() => setActiveCommentary("mk")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-tamil font-semibold transition-all cursor-pointer shrink-0 ${activeCommentary === "mk"
                      ? "bg-amber-500/20 border border-amber-500/40 text-amber-300"
                      : "bg-zinc-950 text-zinc-400 border border-zinc-800 hover:text-zinc-200"
                    }`}
                >
                  மு. கருணாநிதி
                </button>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80 text-xs sm:text-sm font-tamil text-zinc-300 leading-relaxed min-h-[60px]">
                {activeCommentary === "mv" && (
                  <p>
                    <span className="text-amber-400 font-mono text-[10px] uppercase block mb-1">மு.வ உரை</span>
                    {daily_kural.mv}
                  </p>
                )}
                {activeCommentary === "sp" && (
                  <p>
                    <span className="text-amber-400 font-mono text-[10px] uppercase block mb-1">சாலமன் பாப்பையா உரை</span>
                    {daily_kural.sp}
                  </p>
                )}
                {activeCommentary === "mk" && (
                  <p>
                    <span className="text-amber-400 font-mono text-[10px] uppercase block mb-1">மு.கருணாநிதி உரை</span>
                    {daily_kural.mk}
                  </p>
                )}
              </div>
            </div>

            {/* Reflection / Understanding Textbox */}
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5 font-tamil">
                  <MessageSquareQuote size={16} className="text-amber-400" />
                  <span>எனது கருத்து / புரிதல் (My Reflection & Understanding)</span>
                </label>
                <span className="text-[10px] font-mono text-zinc-500">Saves to Notebook</span>
              </div>

              <textarea
                value={reflectionText}
                onChange={(e) => setReflectionText(e.target.value)}
                placeholder="இந்தத் திருக்குறள் பற்றி உங்களது எண்ணங்கள் அல்லது புரிதலை இங்கு எழுதுங்கள்..."
                rows={3}
                className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500/50 resize-y font-tamil"
              />

              <div className="flex items-center justify-between gap-2">
                {reflectionSavedMsg ? (
                  <span className="text-xs text-emerald-400 font-mono flex items-center gap-1 font-semibold">
                    <Check size={14} /> Saved to Notebook!
                  </span>
                ) : (
                  <span className="text-[11px] text-zinc-400 font-mono">
                    {daily_kural.reflection?.updated_at ? "Last saved: " + new Date(daily_kural.reflection.updated_at).toLocaleDateString() : "Not saved yet"}
                  </span>
                )}

                <button
                  onClick={handleSaveReflection}
                  disabled={isSavingReflection || !reflectionText.trim()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 text-zinc-950 font-bold text-xs hover:bg-amber-400 disabled:opacity-50 transition-all cursor-pointer"
                >
                  {isSavingReflection ? (
                    <RefreshCw size={14} className="animate-spin" />
                  ) : (
                    <Save size={14} />
                  )}
                  <span>Save Reflection</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* 4 DAILY MISSIONS LIST */}
        <div className="space-y-3">
          <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-zinc-400 px-1">
            Today's Missions
          </h3>

          <div className="grid grid-cols-1 gap-3">
            {missions.map((mission) => (
              <motion.div
                key={mission.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${mission.completed
                    ? "bg-emerald-950/20 border-emerald-500/30 text-zinc-200"
                    : "bg-zinc-900/90 border-zinc-800 text-zinc-100 hover:border-zinc-700"
                  }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl shrink-0 ${mission.completed ? "bg-emerald-500/20" : "bg-zinc-950 border border-zinc-800"}`}>
                    {getMissionIcon(mission.type)}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-zinc-100">{mission.title}</h4>
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[10px] font-bold">
                        +{mission.xp_reward} XP
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400">{mission.description}</p>

                    {/* Mission Micro Progress */}
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 pt-1">
                      <span>Progress:</span>
                      <span className="text-zinc-200 font-semibold">
                        {mission.progress} / {mission.target}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mission Action / Completion Badge */}
                <div className="shrink-0 w-full sm:w-auto flex justify-end">
                  {mission.completed ? (
                    <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 font-bold text-xs">
                      <CheckCircle2 size={16} />
                      <span>Completed</span>
                    </div>
                  ) : (
                    <Link
                      href={mission.action_url}
                      className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs transition-all shadow-md cursor-pointer w-full sm:w-auto"
                    >
                      <span>Start Activity</span>
                      <ArrowRight size={14} />
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* DAILY COMPLETION BONUS CARD */}
        <AnimatePresence>
          {daily_bonus.completed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 rounded-3xl bg-gradient-to-br from-emerald-950/80 to-zinc-900 border border-emerald-500/40 text-left space-y-3 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
                  <Trophy size={22} />
                  <span>All Daily Missions Completed!</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-mono text-xs font-bold">
                  +{daily_bonus.xp_reward} XP Bonus Claimed
                </span>
              </div>
              <p className="text-xs text-zinc-300">
                Congratulations! You completed all 4 daily Tamil learning missions. Your streak has been updated!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

