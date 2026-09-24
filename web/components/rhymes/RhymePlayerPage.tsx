"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { RhymeData } from "@/lib/rhymes";
import RhymeScene3D from "./RhymeScene3D";
import WebGLFallback from "./WebGLFallback";
import RhymeVocabularyOverlay from "./RhymeVocabularyOverlay";
import { speakTamil, stopSpeech } from "@/lib/tts";
import {
  ArrowLeft,
  Volume2,
  VolumeX,
  Layers,
  CheckCircle2,
  RotateCcw,
  Smile,
  BookOpen,
} from "lucide-react";

interface RhymePlayerPageProps {
  rhyme: RhymeData;
}

export default function RhymePlayerPage({ rhyme }: RhymePlayerPageProps) {
  const router = useRouter();
  const [use2DFallback, setUse2DFallback] = useState(false);
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);
  const [activeLineId, setActiveLineId] = useState<string | null>(null);
  const [isPlayingLine, setIsPlayingLine] = useState(false);
  const [discoverySuccess, setDiscoverySuccess] = useState(false);

  // Background Morph & Exit State
  const [isMorphed, setIsMorphed] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const morphTimer = setTimeout(() => {
      setIsMorphed(true);
    }, 150);
    return () => clearTimeout(morphTimer);
  }, []);

  const handleNavigateAway = (targetUrl: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setIsExiting(true);
    setIsMorphed(false);
    setTimeout(() => {
      router.push(targetUrl);
    }, 600);
  };

  // Check WebGL availability on mount
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setUse2DFallback(true);
    } catch {
      setUse2DFallback(true);
    }
  }, []);

  // Cleanup speech when unmounting
  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, []);

  const selectedVocabItem = rhyme.vocabulary.find((v) => v.objectId === selectedObjectId) || null;

  const handleObjectSelect = (objectId: string) => {
    setSelectedObjectId(objectId);
    const item = rhyme.vocabulary.find((v) => v.objectId === objectId);
    if (item) {
      speakTamil(item.tamil);
    }

    // Check Discovery mini-activity
    if (rhyme.discoveryPrompt && objectId === rhyme.discoveryPrompt.targetObjectId) {
      setDiscoverySuccess(true);
    }
  };

  const handlePlayLine = (line: typeof rhyme.lines[0]) => {
    if (isPlayingLine && activeLineId === line.id) {
      stopSpeech();
      setIsPlayingLine(false);
      setActiveLineId(null);
      return;
    }

    setActiveLineId(line.id);
    setIsPlayingLine(true);
    if (line.actionObject) {
      setSelectedObjectId(line.actionObject);
    }

    speakTamil(line.tamil, {
      onEnd: () => {
        setIsPlayingLine(false);
        setActiveLineId(null);
      },
      onError: () => {
        setIsPlayingLine(false);
        setActiveLineId(null);
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0.9, backgroundColor: "#07070a" }}
      animate={{
        opacity: isExiting ? 0.85 : 1,
        backgroundColor: isMorphed && !isExiting ? "#e0f2fe" : "#07070a",
      }}
      transition={{ duration: isExiting ? 0.6 : 2.2, ease: "easeInOut" }}
      className={`min-h-screen relative overflow-hidden font-sans transition-colors duration-700 ${
        isExiting || !isMorphed ? "text-zinc-100" : "text-zinc-900"
      }`}
    >
      {/* Ambient Soft White Clouds Background Effect */}
      <AnimatePresence>
        {isMorphed && !isExiting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-gradient-to-br from-[#dbeafe] via-[#eff6ff] via-[#e0f2fe] to-[#bae6fd] pointer-events-none"
          >
            <div className="absolute top-10 left-10 w-[450px] h-[450px] rounded-full bg-white/80 blur-[100px]" />
            <div className="absolute bottom-20 right-10 w-[550px] h-[550px] rounded-full bg-sky-200/90 blur-[120px]" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 relative z-10">
        {/* Top Header Navigation */}
        <div
          className={`flex flex-wrap items-center justify-between gap-3 pb-4 border-b ${
            isMorphed && !isExiting ? "border-sky-300" : "border-zinc-800"
          }`}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => handleNavigateAway("/rhymes", e)}
              className={`px-4 py-2 rounded-xl transition-all text-xs font-mono font-bold shadow-md flex items-center gap-1.5 cursor-pointer ${
                isMorphed && !isExiting
                  ? "bg-white/90 border border-sky-300 text-blue-900 hover:bg-blue-600 hover:text-white"
                  : "bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-amber-400 hover:border-amber-500/40"
              }`}
            >
              <ArrowLeft size={16} />
              <span>Back to Rhymes</span>
            </button>
            <div>
              <h1
                className={`text-xl sm:text-2xl font-extrabold font-tamil flex items-center gap-2 ${
                  isMorphed && !isExiting ? "text-blue-950" : "text-zinc-100"
                }`}
              >
                {rhyme.titleTa}
                <span
                  className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-md border shadow-sm ${
                    isMorphed && !isExiting
                      ? "text-zinc-950 bg-yellow-400 border-yellow-300"
                      : "text-amber-400 bg-amber-500/10 border-amber-500/30"
                  }`}
                >
                  {rhyme.category}
                </span>
              </h1>
              <p
                className={`text-xs font-mono font-bold ${
                  isMorphed && !isExiting ? "text-blue-900" : "text-zinc-400"
                }`}
              >
                {rhyme.titleEn}
              </p>
            </div>
          </div>

          {/* 3D vs 2D Mode Toggle */}
          <button
            onClick={() => setUse2DFallback(!use2DFallback)}
            className={`px-4 py-2 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-md cursor-pointer ${
              isMorphed && !isExiting
                ? "bg-white border-sky-300 text-blue-900 hover:bg-blue-600 hover:text-white"
                : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-amber-400"
            }`}
          >
            <Layers size={14} className="text-amber-500" />
            <span>Switch to {use2DFallback ? "3D WebGL" : "2D View"}</span>
          </button>
        </div>

        {/* Main Grid: 3D Scene Viewport + Interactive Rhyme Reader */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: 3D WebGL Scene or 2D Storybook Fallback (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            {!use2DFallback ? (
              <RhymeScene3D
                onObjectSelect={handleObjectSelect}
                selectedObjectId={selectedObjectId}
                activeActionObject={
                  activeLineId ? rhyme.lines.find((l) => l.id === activeLineId)?.actionObject || null : null
                }
              />
            ) : (
              <WebGLFallback
                interactiveObjects={rhyme.interactiveObjects}
                onObjectSelect={handleObjectSelect}
                selectedObjectId={selectedObjectId}
              />
            )}

            {/* Discovery Mini-Activity Banner */}
            {rhyme.discoveryPrompt && (
              <div
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg ${
                  discoverySuccess
                    ? "bg-emerald-500 text-zinc-950 border-emerald-300 font-bold"
                    : isMorphed && !isExiting
                    ? "bg-white border-sky-300 text-blue-950 font-medium"
                    : "bg-zinc-900 border-zinc-800 text-zinc-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-xl ${
                      discoverySuccess
                        ? "bg-zinc-950 text-emerald-400"
                        : isMorphed && !isExiting
                        ? "bg-blue-100 text-blue-700"
                        : "bg-amber-500/20 text-amber-400"
                    }`}
                  >
                    {discoverySuccess ? <CheckCircle2 size={22} /> : <Smile size={22} />}
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold font-tamil">
                      {discoverySuccess ? "அற்புதம்! (Wonderful!)" : rhyme.discoveryPrompt.questionTa}
                    </h4>
                    <p
                      className={`text-xs font-mono font-bold ${
                        isMorphed && !isExiting ? "text-zinc-700" : "text-zinc-400"
                      }`}
                    >
                      {discoverySuccess ? "You found the elephant! Great job!" : rhyme.discoveryPrompt.questionEn}
                    </p>
                  </div>
                </div>

                {discoverySuccess && (
                  <button
                    onClick={() => setDiscoverySuccess(false)}
                    className="px-3.5 py-1.5 rounded-xl bg-zinc-950 text-white font-mono font-bold text-xs hover:bg-zinc-800 transition-colors cursor-pointer shrink-0 shadow-md"
                  >
                    Play Again
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Right: Rhyme Lines & Accessible Vocabulary Object Panel (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Rhyme Lines Audio Reader */}
            <div
              className={`p-5 rounded-3xl border-3 space-y-4 shadow-xl ${
                isMorphed && !isExiting
                  ? "bg-white border-sky-300"
                  : "bg-zinc-900/90 border-zinc-800 text-zinc-100"
              }`}
            >
              <div
                className={`flex items-center gap-2 border-b pb-3 ${
                  isMorphed && !isExiting ? "border-sky-200" : "border-zinc-800"
                }`}
              >
                <BookOpen size={18} className={isMorphed && !isExiting ? "text-blue-700" : "text-amber-400"} />
                <h3
                  className={`text-base font-extrabold font-tamil ${
                    isMorphed && !isExiting ? "text-blue-950" : "text-zinc-100"
                  }`}
                >
                  பாடல் வரிகள் (Rhyme Lines)
                </h3>
              </div>

              <div className="space-y-3">
                {rhyme.lines.map((line) => {
                  const isActive = activeLineId === line.id;
                  return (
                    <div
                      key={line.id}
                      className={`p-3.5 rounded-2xl border transition-all space-y-1.5 ${
                        isActive
                          ? isMorphed && !isExiting
                            ? "bg-blue-600 text-white border-blue-400 shadow-md"
                            : "bg-amber-500/20 border-amber-500/50 text-amber-200"
                          : isMorphed && !isExiting
                          ? "bg-sky-50 border-sky-200 text-zinc-900 hover:border-blue-400"
                          : "bg-zinc-950 border-zinc-800/80 text-zinc-200"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p
                          className={`font-tamil text-base font-extrabold leading-snug ${
                            isActive
                              ? "text-yellow-300"
                              : isMorphed && !isExiting
                              ? "text-blue-950"
                              : "text-zinc-100"
                          }`}
                        >
                          {line.tamil}
                        </p>
                        <button
                          onClick={() => handlePlayLine(line)}
                          className={`p-2 rounded-xl border transition-all cursor-pointer shrink-0 ${
                            isActive && isPlayingLine
                              ? "bg-yellow-400 text-zinc-950 border-yellow-300 animate-pulse shadow-md"
                              : isMorphed && !isExiting
                              ? "bg-blue-600 text-white border-blue-400 hover:bg-blue-500"
                              : "bg-zinc-900 text-amber-400 border-amber-500/30 hover:bg-amber-500/20"
                          }`}
                          title="Listen line"
                        >
                          {isActive && isPlayingLine ? <VolumeX size={16} /> : <Volume2 size={16} />}
                        </button>
                      </div>
                      <p
                        className={`text-[11px] font-mono font-bold ${
                          isActive
                            ? "text-sky-100"
                            : isMorphed && !isExiting
                            ? "text-blue-900"
                            : "text-zinc-400"
                        }`}
                      >
                        {line.transliteration}
                      </p>
                      <p
                        className={`text-[11px] font-sans italic ${
                          isActive
                            ? "text-sky-100"
                            : isMorphed && !isExiting
                            ? "text-zinc-600"
                            : "text-zinc-400"
                        }`}
                      >
                        {line.english}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Accessible Vocabulary Object List */}
            <div
              className={`p-5 rounded-3xl border-3 space-y-3 shadow-xl ${
                isMorphed && !isExiting
                  ? "bg-white border-sky-300"
                  : "bg-zinc-900/90 border-zinc-800 text-zinc-100"
              }`}
            >
              <h3
                className={`text-xs font-mono font-extrabold uppercase tracking-widest ${
                  isMorphed && !isExiting ? "text-blue-900" : "text-zinc-400"
                }`}
              >
                Interactive Vocabulary Objects
              </h3>
              <div className="flex flex-wrap gap-2">
                {rhyme.vocabulary.map((vocab) => {
                  const isSelected = selectedObjectId === vocab.objectId;
                  return (
                    <button
                      key={vocab.id}
                      onClick={() => handleObjectSelect(vocab.objectId)}
                      className={`px-3 py-2 rounded-xl border text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? "bg-yellow-400 text-zinc-950 border-yellow-300 shadow-md scale-105"
                          : isMorphed && !isExiting
                          ? "bg-sky-100 border-sky-300 text-blue-950 hover:bg-blue-600 hover:text-white"
                          : "bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-amber-500/40"
                      }`}
                    >
                      <span className="font-tamil text-sm">{vocab.tamil}</span>
                      <span className="text-[10px] opacity-80">({vocab.english})</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Selected Object Vocabulary Overlay */}
        {selectedVocabItem && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-4 w-full max-w-sm">
            <RhymeVocabularyOverlay
              selectedItem={selectedVocabItem}
              onClose={() => setSelectedObjectId(null)}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}
