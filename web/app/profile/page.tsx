"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth";
import { useCurriculum } from "@/lib/curriculum";
import { api } from "@/lib/api";
import StylusEmblem from "@/components/StylusEmblem";
import SidebarNav from "@/components/SidebarNav";
import TamilSwarmCanvas from "@/components/TamilSwarmCanvas";
import { BounceCardTrigger, FannedCardItem } from "@/components/BounceCardTrigger";
import {
  ArrowLeft,
  Award,
  Flame,
  Zap,
  Trophy,
  Shield,
  X,
  Lock,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

import BadgeModal, { BadgeDetail } from "@/components/BadgeModal";

type LeaderRow = { name: string; xp: number; level: number; streak: number };

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const { curriculum } = useCurriculum();
  const router = useRouter();
  const [leaderboard, setLeaderboard] = useState<LeaderRow[]>([]);
  const [showAllBadgesModal, setShowAllBadgesModal] = useState<boolean>(false);
  const [selectedBadge, setSelectedBadge] = useState<BadgeDetail | null>(null);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [loading, user, router]);

  useEffect(() => {
    api<LeaderRow[]>("/api/leaderboard").then(setLeaderboard).catch(() => {});
  }, []);

  if (loading || !user || !curriculum) {
    return (
      <main className="min-h-screen bg-[#07070a] flex items-center justify-center">
        <StylusEmblem variant="thinking" size={90} />
      </main>
    );
  }

  const badges = curriculum.stages.filter((s) => user.completed_stages.includes(s.id));

  const fannedBadgeCards: FannedCardItem[] = badges.map((s, idx) => ({
    badgeImg: `/assets/badge${s.order}.png`,
    title: s.milestone.title,
    subtext: `Stage 0${s.order}`,
    borderColor: "border-amber-400/40",
    shadowColor: "shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_25px_rgba(245,158,11,0.25)]",
    textColor: "text-amber-300",
    x: idx === 0 ? -60 : idx === 1 ? 0 : 60,
    y: idx === 0 ? -125 : idx === 1 ? -140 : -125,
    rotate: idx === 0 ? -8 : idx === 1 ? 0 : 8,
    delay: idx * 0.06,
  }));

  return (
    <main className="min-h-screen bg-[#07070a] pb-24 text-zinc-100 relative overflow-x-hidden">
      {/* Tamil Swarm Canvas */}
      <TamilSwarmCanvas />

      {/* Authenticated Sidebar Navigation & Header */}
      <SidebarNav />

      <div className="max-w-3xl mx-auto px-6 mt-10 space-y-8 relative z-10">
        {/* User Card */}
        <div className="bg-zinc-950/90 rounded-3xl p-8 border border-zinc-800/80 shadow-2xl text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-amber-500/10 blur-3xl pointer-events-none" />
          <StylusEmblem size={100} variant="literature" className="mx-auto mb-4 relative z-10" />
          <h2 className="text-2xl font-serif font-bold text-zinc-100">{user.name}</h2>
          <p className="text-xs font-mono text-zinc-400 mt-1">{user.email}</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-zinc-800/80">
            <Stat label="Level" value={user.level} icon={<Zap size={16} className="text-amber-400" />} />
            <Stat label="Total XP" value={user.xp} icon={<Award size={16} className="text-emerald-400" />} />
            <Stat label="Current Streak" value={`${user.streak} d`} icon={<Flame size={16} className="text-amber-500 animate-pulse" />} />
            <Stat label="Best Streak" value={`${user.best_streak} d`} icon={<Trophy size={16} className="text-yellow-400" />} />
          </div>
        </div>

        {/* Milestone Badges Section with Spring-Physics Fanned Card Pop-Up */}
        <div className="bg-zinc-950/90 rounded-3xl p-8 border border-zinc-800/80 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="font-serif text-xl text-zinc-100 font-bold flex items-center gap-2">
                <Shield size={18} className="text-amber-400" /> Milestone Badges
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                {badges.length} of {curriculum.stages.length} badges unlocked
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAllBadgesModal(true)}
                className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 font-mono text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
              >
                <BookOpen size={14} /> View All 7 Badges & Requirements
              </button>
              <span className="text-xs font-mono text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-xl">
                {Math.round((badges.length / curriculum.stages.length) * 100)}%
              </span>
            </div>
          </div>

          {badges.length === 0 ? (
            <div className="text-center py-6 space-y-3">
              <p className="text-xs font-mono text-zinc-500">
                Complete your first stage milestone quiz to earn your inaugural badge.
              </p>
              <button
                onClick={() => setShowAllBadgesModal(true)}
                className="px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 font-mono text-xs font-semibold transition-colors cursor-pointer"
              >
                View Badges Catalog & Requirements ➔
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <BounceCardTrigger
                title="Earned Milestone Badges"
                subtitle={`${badges.length} Badges Showcase`}
                description="Click on any earned milestone badge to inspect its expanded emblem and share details!"
                cards={fannedBadgeCards}
                accentColor="from-amber-500/20 via-emerald-500/10 to-transparent"
                onCardClick={(idx) => {
                  const s = badges[idx];
                  if (s) {
                    setSelectedBadge({
                      id: s.id,
                      order: s.order,
                      title: s.milestone.title,
                      titleTa: s.milestone.title_ta,
                      subtitle: s.subtitle,
                      desc: s.milestone.desc,
                      isUnlocked: true,
                      xpReward: 50,
                    });
                  }
                }}
              />

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                {badges.map((s) => (
                  <div
                    key={s.id}
                    onClick={() =>
                      setSelectedBadge({
                        id: s.id,
                        order: s.order,
                        title: s.milestone.title,
                        titleTa: s.milestone.title_ta,
                        subtitle: s.subtitle,
                        desc: s.milestone.desc,
                        isUnlocked: true,
                        xpReward: 50,
                      })
                    }
                    className="text-center bg-zinc-900/80 rounded-2xl p-4 border border-zinc-800/90 hover:border-amber-500/50 hover:bg-zinc-900/90 transition-all group cursor-pointer"
                  >
                    <div className="relative w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                      <img
                        src={`/assets/badge${s.order}.png`}
                        alt={s.milestone.title}
                        className="w-full h-full object-contain drop-shadow-[0_0_12px_rgba(245,158,11,0.4)] group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="text-xs font-mono font-bold text-amber-300 group-hover:text-amber-200 transition-colors">
                      {s.milestone.title}
                    </div>
                    <div className="text-[10px] text-zinc-400 font-mono mt-0.5 font-tamil">{s.milestone.title_ta}</div>
                    <div className="text-[10px] text-zinc-500 font-mono mt-0.5">Stage 0{s.order}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Global Leaderboard */}
        <div className="bg-zinc-950/90 rounded-3xl p-8 border border-zinc-800/80 shadow-2xl">
          <h3 className="font-serif text-xl text-zinc-100 font-bold mb-6 flex items-center gap-2">
            <Trophy size={18} className="text-amber-400" /> Top Learners Leaderboard
          </h3>

          <div className="space-y-2 font-mono text-xs">
            {leaderboard.map((row, i) => (
              <div
                key={i}
                className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-colors ${
                  row.name === user.name
                    ? "bg-amber-500/10 border-amber-500/40 text-amber-300 font-bold"
                    : "bg-zinc-900/60 border-zinc-800/60 text-zinc-300"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className={`w-5 text-center font-bold ${i === 0 ? "text-yellow-400" : i === 1 ? "text-zinc-300" : i === 2 ? "text-amber-600" : "text-zinc-600"}`}>
                    #{i + 1}
                  </span>
                  <span className="font-semibold text-zinc-100">{row.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-amber-500/80 flex items-center gap-1">
                    <Flame size={12} /> {row.streak}d
                  </span>
                  <span className="text-emerald-400 font-bold">{row.xp} XP</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* All Milestone Badges Catalog Modal */}
      <AnimatePresence>
        {showAllBadgesModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative max-w-2xl w-full bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl my-8 max-h-[85vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between pb-4 border-b border-zinc-800 shrink-0">
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl font-bold text-zinc-100 flex items-center gap-2">
                    <Shield size={22} className="text-amber-400" /> All 7 Milestone Badges & Requirements
                  </h3>
                  <p className="text-xs text-zinc-400 font-light">
                    Score 70%+ on milestone quizzes to claim each badge and unlock the next stage.
                  </p>
                </div>
                <button
                  onClick={() => setShowAllBadgesModal(false)}
                  className="p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 cursor-pointer shrink-0"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Scrollable Badges List */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-1 custom-scrollbar">
                {curriculum.stages.map((stg) => {
                  const isUnlocked = user.completed_stages.includes(stg.id);
                  const isStageUnlocked = user.unlocked_stages.includes(stg.id);

                  return (
                    <div
                      key={stg.id}
                      onClick={() =>
                        setSelectedBadge({
                          id: stg.id,
                          order: stg.order,
                          title: stg.milestone.title,
                          titleTa: stg.milestone.title_ta,
                          subtitle: stg.subtitle,
                          desc: stg.milestone.desc,
                          isUnlocked,
                          xpReward: 50,
                        })
                      }
                      className={`p-5 rounded-2xl border transition-all space-y-3 cursor-pointer hover:border-amber-500/60 ${
                        isUnlocked
                          ? "bg-amber-500/10 border-amber-500/40 shadow-lg"
                          : isStageUnlocked
                          ? "bg-zinc-900/80 border-zinc-800"
                          : "bg-zinc-950/60 border-zinc-900 opacity-70"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-4">
                          <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
                            <img
                              src={`/assets/badge${stg.order}.png`}
                              alt={stg.milestone.title}
                              className={`w-full h-full object-contain transition-all duration-300 ${
                                isUnlocked
                                  ? "drop-shadow-[0_0_15px_rgba(245,158,11,0.5)] scale-100"
                                  : "grayscale opacity-40 scale-95"
                              }`}
                            />
                            {!isUnlocked && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
                                <Lock size={14} className="text-zinc-400" />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-zinc-800 text-amber-400">
                                Stage 0{stg.order}
                              </span>
                              <h4 className="font-serif text-base font-bold text-zinc-100">
                                {stg.milestone.title} ({stg.milestone.title_ta})
                              </h4>
                            </div>
                            <p className="text-xs font-mono text-zinc-400 mt-0.5">
                              {stg.name} — {stg.subtitle}
                            </p>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div>
                          {isUnlocked ? (
                            <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold inline-flex items-center gap-1">
                              <CheckCircle2 size={13} /> Unlocked (+50 XP)
                            </span>
                          ) : (
                            <span className="px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400 font-mono text-xs font-semibold inline-flex items-center gap-1">
                              <Lock size={13} /> Locked
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-xs text-zinc-300 font-light leading-relaxed">
                        {stg.milestone.desc}
                      </p>

                      {/* Claim Requirements Box */}
                      <div className="pt-3 border-t border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                        <div className="space-y-1 text-zinc-400">
                          <div>
                            <span className="text-amber-400 font-semibold">Requirement to Claim:</span> Complete stage lessons, score <span className="text-emerald-400 font-bold">≥ {stg.quiz.pass_score}%</span> on Stage {stg.order} Quiz.
                          </div>
                        </div>

                        {/* Action Link */}
                        <div className="shrink-0">
                          {isUnlocked ? (
                            <span className="text-xs font-mono text-emerald-400 font-bold inline-flex items-center gap-1">
                              <CheckCircle2 size={14} /> Badge Claimed (Click to Inspect)
                            </span>
                          ) : isStageUnlocked ? (
                            <Link
                              href={`/quiz/${stg.id}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowAllBadgesModal(false);
                              }}
                              className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold font-mono text-xs transition-colors inline-flex items-center gap-1 shadow-sm"
                            >
                              Take Quiz & Claim <ArrowRight size={14} />
                            </Link>
                          ) : (
                            <Link
                              href="/journey"
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowAllBadgesModal(false);
                              }}
                              className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 text-xs font-mono transition-colors inline-flex items-center gap-1"
                            >
                              Go to Journey <ArrowRight size={14} />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-zinc-800 flex justify-end shrink-0">
                <button
                  onClick={() => setShowAllBadgesModal(false)}
                  className="px-6 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-mono font-semibold transition-colors cursor-pointer"
                >
                  Close Catalog
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Expanded Badge Modal */}
      <BadgeModal
        badge={selectedBadge}
        onClose={() => setSelectedBadge(null)}
      />
    </main>
  );
}

function Stat({ label, value, icon }: { label: string; value: string | number; icon: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-1.5 font-serif text-2xl font-bold text-zinc-100">
        {icon}
        {value}
      </div>
      <div className="text-[11px] font-mono text-zinc-400 mt-0.5 uppercase tracking-wider">{label}</div>
    </div>
  );
}
