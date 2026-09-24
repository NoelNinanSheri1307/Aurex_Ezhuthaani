"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth";
import { useCurriculum } from "@/lib/curriculum";
import StylusEmblem from "@/components/StylusEmblem";
import SidebarNav from "@/components/SidebarNav";
import TamilSwarmCanvas from "@/components/TamilSwarmCanvas";
import type { Stage } from "@/lib/types";
import { BounceCardTrigger, FannedCardItem } from "@/components/BounceCardTrigger";
import BadgeModal, { BadgeDetail } from "@/components/BadgeModal";
import {
  Flame,
  Award,
  ChevronDown,
  CheckCircle2,
  Lock,
  Play,
  LogOut,
  User as UserIcon,
  Sprout,
  Type,
  Feather,
  MessageSquare,
  Puzzle,
  BookOpen,
  BookMarked,
} from "lucide-react";

const STAGE_ICON_MAP: Record<string, React.ReactNode> = {
  adippadai: <Sprout size={22} className="text-emerald-400" />,
  ezhuthukkal: <Type size={22} className="text-sky-400" />,
  payirchi: <Feather size={22} className="text-amber-400" />,
  sollkal: <MessageSquare size={22} className="text-purple-400" />,
  vaakkiyam: <Puzzle size={22} className="text-rose-400" />,
  vasippu: <BookOpen size={22} className="text-cyan-400" />,
  puthagam: <BookMarked size={22} className="text-indigo-400" />,
};

const STAGE_CARDS_MAP: Record<string, FannedCardItem[]> = {
  adippadai: [
    { glyphOrSymbol: "அ", title: "Ammaa", subtext: "Mother · Vowel 1", borderColor: "border-emerald-500/40", shadowColor: "shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(16,185,129,0.2)]", textColor: "text-emerald-400", x: -60, y: -125, rotate: -8, delay: 0.02 },
    { glyphOrSymbol: "ஆ", title: "Aadu", subtext: "Goat · Vowel 2", borderColor: "border-emerald-400/40", shadowColor: "shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(16,185,129,0.2)]", textColor: "text-emerald-300", x: 0, y: -140, rotate: 0, delay: 0.08 },
    { glyphOrSymbol: "இ", title: "Ilai", subtext: "Leaf · Vowel 3", borderColor: "border-teal-400/40", shadowColor: "shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(20,184,166,0.2)]", textColor: "text-teal-300", x: 60, y: -125, rotate: 8, delay: 0.14 },
  ],
  ezhuthukkal: [
    { glyphOrSymbol: "க்", title: "Pulli Dot", subtext: "Pure Mei Consonant", borderColor: "border-sky-500/40", shadowColor: "shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(14,165,233,0.2)]", textColor: "text-sky-400", x: -60, y: -125, rotate: -8, delay: 0.02 },
    { glyphOrSymbol: "கா", title: "Ka + Aa", subtext: "Uyirmei Grid 1", borderColor: "border-sky-400/40", shadowColor: "shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(14,165,233,0.2)]", textColor: "text-sky-300", x: 0, y: -140, rotate: 0, delay: 0.08 },
    { glyphOrSymbol: "கி", title: "Ka + I", subtext: "Uyirmei Grid 2", borderColor: "border-blue-400/40", shadowColor: "shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(96,165,250,0.2)]", textColor: "text-blue-300", x: 60, y: -125, rotate: 8, delay: 0.14 },
  ],
  payirchi: [
    { glyphOrSymbol: "எ", title: "Canvas Stroke", subtext: "Live Mask Match", borderColor: "border-amber-500/40", shadowColor: "shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(245,158,11,0.2)]", textColor: "text-amber-400", x: -60, y: -125, rotate: -8, delay: 0.02 },
    { glyphOrSymbol: "ழ", title: "Retroflex Zh", subtext: "Signature Curl", borderColor: "border-amber-400/40", shadowColor: "shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(245,158,11,0.2)]", textColor: "text-amber-300", x: 0, y: -140, rotate: 0, delay: 0.08 },
    { glyphOrSymbol: "தமிழ்", title: "Word Trace", subtext: "Complete Glyph", borderColor: "border-orange-400/40", shadowColor: "shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(251,146,60,0.2)]", textColor: "text-orange-300", x: 60, y: -125, rotate: 8, delay: 0.14 },
  ],
  sollkal: [
    { glyphOrSymbol: "வணக்கம்", title: "VaNakkam", subtext: "Greetings", borderColor: "border-purple-500/40", shadowColor: "shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(168,85,247,0.2)]", textColor: "text-purple-400", x: -60, y: -125, rotate: -8, delay: 0.02 },
    { glyphOrSymbol: "நன்றி", title: "NanRi", subtext: "Gratitude", borderColor: "border-purple-400/40", shadowColor: "shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(168,85,247,0.2)]", textColor: "text-purple-300", x: 0, y: -140, rotate: 0, delay: 0.08 },
    { glyphOrSymbol: "குடும்பம்", title: "Kudumbam", subtext: "Family", borderColor: "border-indigo-400/40", shadowColor: "shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(129,140,248,0.2)]", textColor: "text-indigo-300", x: 60, y: -125, rotate: 8, delay: 0.14 },
  ],
  vaakkiyam: [
    { glyphOrSymbol: "சொல்", title: "SOV Syntax", subtext: "Subject Object Verb", borderColor: "border-rose-500/40", shadowColor: "shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(244,63,94,0.2)]", textColor: "text-rose-400", x: -60, y: -125, rotate: -8, delay: 0.02 },
    { glyphOrSymbol: "நான்", title: "Naan", subtext: "I read Tamil", borderColor: "border-rose-400/40", shadowColor: "shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(244,63,94,0.2)]", textColor: "text-rose-300", x: 0, y: -140, rotate: 0, delay: 0.08 },
    { glyphOrSymbol: "கேள்வி", title: "Kelvi", subtext: "Interrogative Suffix", borderColor: "border-pink-400/40", shadowColor: "shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(244,114,182,0.2)]", textColor: "text-pink-300", x: 60, y: -125, rotate: 8, delay: 0.14 },
  ],
  vasippu: [
    { glyphOrSymbol: "காலை", title: "Kaalai", subtext: "Morning Passage", borderColor: "border-cyan-500/40", shadowColor: "shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(6,182,212,0.2)]", textColor: "text-cyan-400", x: -60, y: -125, rotate: -8, delay: 0.02 },
    { glyphOrSymbol: "காகம்", title: "Kaagam", subtext: "Classical Tale", borderColor: "border-cyan-400/40", shadowColor: "shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(6,182,212,0.2)]", textColor: "text-cyan-300", x: 0, y: -140, rotate: 0, delay: 0.08 },
    { glyphOrSymbol: "புத்தி", title: "Puthi", subtext: "Comprehension Analysis", borderColor: "border-blue-400/40", shadowColor: "shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(96,165,250,0.2)]", textColor: "text-blue-300", x: 60, y: -125, rotate: 8, delay: 0.14 },
  ],
  puthagam: [
    { glyphOrSymbol: "குறள்", title: "Thirukkural", subtext: "1,330 Couplets", borderColor: "border-indigo-500/40", shadowColor: "shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(99,102,241,0.2)]", textColor: "text-indigo-400", x: -60, y: -125, rotate: -8, delay: 0.02 },
    { glyphOrSymbol: "அறம்", title: "Aathichoodi", subtext: "Avvaiyar Classics", borderColor: "border-indigo-400/40", shadowColor: "shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(99,102,241,0.2)]", textColor: "text-indigo-300", x: 0, y: -140, rotate: 0, delay: 0.08 },
    { glyphOrSymbol: "நூல்", title: "Ilakkiyam", subtext: "Mastery Certification", borderColor: "border-violet-400/40", shadowColor: "shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(167,139,250,0.2)]", textColor: "text-violet-300", x: 60, y: -125, rotate: 8, delay: 0.14 },
  ],
};

function xpForNextLevel(level: number) {
  return level * level * 100;
}

export default function JourneyPage() {
  const { user, loading, logout } = useAuth();
  const { curriculum } = useCurriculum();
  const router = useRouter();
  const [openStage, setOpenStage] = useState<string | null>(null);
  const [selectedBadge, setSelectedBadge] = useState<BadgeDetail | null>(null);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [loading, user, router]);

  if (loading || !user || !curriculum) {
    return (
      <main className="min-h-screen bg-[#07070a] flex items-center justify-center">
        <StylusEmblem variant="thinking" size={90} />
      </main>
    );
  }

  const unlockedSet = new Set(user.unlocked_stages);
  const completedSet = new Set(user.completed_stages);
  const currLevelFloor = (user.level - 1) ** 2 * 100;
  const currLevelSpan = xpForNextLevel(user.level) - currLevelFloor;
  const xpIntoLevel = user.xp - currLevelFloor;
  const levelPct = Math.min(100, Math.round((xpIntoLevel / currLevelSpan) * 100));

  return (
    <main className="min-h-screen bg-[#07070a] pb-24 text-zinc-100 relative overflow-x-hidden">
      {/* Tamil Glyph Swarm Background */}
      <TamilSwarmCanvas />

      {/* Authenticated Sidebar Navigation & Header */}
      <SidebarNav />

      {/* Path Title & Banner */}
      <section className="max-w-4xl mx-auto px-6 pt-12 pb-8 text-center relative z-10">
        <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-2">
          Milestone Progression Path
        </span>
        <h1 className="text-4xl font-serif text-zinc-100">
          Your Tamil Learning Journey
        </h1>
        <p className="text-xs text-zinc-400 mt-2 font-light max-w-md mx-auto">
          Pass each stage's milestone quiz to unlock the next level on the path.
        </p>
      </section>

      {/* Vertical Milestone Path Cards */}
      <div className="max-w-3xl mx-auto px-6 space-y-8 relative z-10">
        {curriculum.stages.map((stage, idx) => {
          const unlocked = unlockedSet.has(stage.id);
          const completed = completedSet.has(stage.id);
          const isOpen = openStage === stage.id;
          const cards = STAGE_CARDS_MAP[stage.id] || [];
          const stageIcon = STAGE_ICON_MAP[stage.id] || <Sprout size={22} className="text-amber-400" />;

          return (
            <div key={stage.id} className="relative">
              {/* Vertical connector line */}
              {idx < curriculum.stages.length - 1 && (
                <div className="absolute left-7 top-20 bottom-0 w-0.5 bg-zinc-800/80 -z-10" />
              )}

              <div
                className={`rounded-2xl border transition-all duration-300 ${
                  unlocked
                    ? "bg-zinc-950/90 border-zinc-800/80 shadow-lg shadow-black/50"
                    : "bg-zinc-950/40 border-zinc-900 opacity-60"
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <button
                      onClick={() => unlocked && setOpenStage(isOpen ? null : stage.id)}
                      disabled={!unlocked}
                      className="flex items-center gap-4 text-left flex-1 group"
                    >
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 border ${
                          completed
                            ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400"
                            : unlocked
                            ? "bg-amber-500/10 border-amber-500/40 text-amber-400"
                            : "bg-zinc-900 border-zinc-800 text-zinc-600"
                        }`}
                      >
                        {unlocked ? stageIcon : <Lock size={20} />}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-serif text-xl text-zinc-100 font-bold group-hover:text-amber-400 transition-colors">
                            {stage.subtitle}
                          </span>
                          <span className="font-tamil text-base font-bold text-amber-400/90">
                            {stage.name_ta}
                          </span>
                          {completed && (
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedBadge({
                                  id: stage.id,
                                  order: stage.order,
                                  title: stage.milestone.title,
                                  titleTa: stage.milestone.title_ta,
                                  subtitle: stage.subtitle,
                                  desc: stage.milestone.desc,
                                  isUnlocked: true,
                                  xpReward: 50,
                                });
                              }}
                              className="text-xs px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 font-mono border border-amber-500/40 hover:bg-amber-500/30 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                            >
                              <img src={`/assets/badge${stage.order}.png`} alt={stage.milestone.title} className="w-4 h-4 object-contain" />
                              {stage.milestone.title} Badge (Inspect)
                            </span>
                          )}
                        </div>

                        <div className="text-xs text-zinc-400 mt-1 font-mono">
                          Stage 0{stage.order} · {stage.lessons.length} Lessons
                        </div>
                      </div>
                    </button>

                    {unlocked && (
                      <button
                        onClick={() => setOpenStage(isOpen ? null : stage.id)}
                        className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
                      >
                        <ChevronDown size={18} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                    )}
                  </div>

                  {/* Fanned cards preview inline */}
                  {unlocked && (
                    <div className="my-4 pt-2">
                      <BounceCardTrigger
                        title={stage.subtitle}
                        titleTa={stage.name_ta}
                        subtitle={`Stage 0${stage.order}`}
                        description={stage.blurb}
                        badge={stage.milestone.title}
                        cards={cards}
                        onClick={() => setOpenStage(isOpen ? null : stage.id)}
                        onCardClick={() => {
                          setSelectedBadge({
                            id: stage.id,
                            order: stage.order,
                            title: stage.milestone.title,
                            titleTa: stage.milestone.title_ta,
                            subtitle: stage.subtitle,
                            desc: stage.milestone.desc,
                            isUnlocked: completed,
                            xpReward: 50,
                          });
                        }}
                      />
                    </div>
                  )}

                  {/* Accordion Lesson Details */}
                  <AnimatePresence>
                    {isOpen && unlocked && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-zinc-800/80 pt-5 mt-4 space-y-3"
                      >
                        <p className="text-xs text-zinc-400 leading-relaxed font-light mb-4">
                          {stage.blurb}
                        </p>

                        <div className="space-y-2">
                          {stage.lessons.map((lesson) => {
                            const done = user.progress[lesson.id] !== undefined;
                            return (
                              <Link
                                key={lesson.id}
                                href={`/lesson/${lesson.id}`}
                                className="flex items-center justify-between px-4 py-3 rounded-xl bg-zinc-900/80 border border-zinc-800/80 hover:border-amber-500/50 hover:bg-zinc-900 transition-all group"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-amber-500/10 group-hover:text-amber-400 transition-colors">
                                    <Play size={12} />
                                  </div>
                                  <div>
                                    <div className="font-tamil text-sm font-semibold text-zinc-200 group-hover:text-amber-300 transition-colors">
                                      {lesson.title_ta}
                                    </div>
                                    <div className="text-xs text-zinc-400 font-mono">
                                      {lesson.title} · <span className="uppercase text-[10px] text-zinc-400">{lesson.type}</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center gap-3 text-xs font-mono">
                                  {done && (
                                    <span className="flex items-center gap-1 text-emerald-400 font-bold">
                                      <CheckCircle2 size={14} /> Done
                                    </span>
                                  )}
                                  <span className="text-amber-400">+{lesson.xp} XP</span>
                                </div>
                              </Link>
                            );
                          })}
                        </div>

                        <Link
                          href={`/quiz/${stage.id}`}
                          className={`block text-center mt-6 px-5 py-3 rounded-xl font-mono font-bold text-xs uppercase tracking-wider transition-all ${
                            completed
                              ? "bg-zinc-900 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10"
                              : "bg-amber-500 hover:bg-amber-400 text-zinc-950 shadow-lg shadow-amber-500/20"
                          }`}
                        >
                          {completed
                            ? `Retake Milestone Quiz (${stage.milestone.title})`
                            : `Take Milestone Quiz → ${stage.milestone.title}`}
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Expanded Badge Modal */}
      <BadgeModal
        badge={selectedBadge}
        onClose={() => setSelectedBadge(null)}
      />
    </main>
  );
}
