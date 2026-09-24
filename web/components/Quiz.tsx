"use client";
import { useState } from "react";
import StylusEmblem from "./StylusEmblem";
import type { McqQuestion } from "@/lib/types";
import { motion } from "framer-motion";
import BadgeModal, { BadgeDetail } from "./BadgeModal";

export default function Quiz({
  questions,
  stageOrder,
  stageTitle,
  stageTitleTa,
  onSubmit,
}: {
  questions: McqQuestion[];
  stageOrder?: number;
  stageTitle?: string;
  stageTitleTa?: string;
  onSubmit: (answers: number[]) => Promise<{ score: number; passed: boolean; badge: string | null; xp_gained: number; unlocked_next: string[] }>;
}) {
  const [answers, setAnswers] = useState<(number | null)[]>(questions.map(() => null));
  const [result, setResult] = useState<Awaited<ReturnType<typeof onSubmit>> | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<BadgeDetail | null>(null);

  const select = (qi: number, oi: number) => {
    if (result) return;
    setAnswers((a) => a.map((v, i) => (i === qi ? oi : v)));
  };

  const allAnswered = answers.every((a) => a !== null);

  const submit = async () => {
    setSubmitting(true);
    try {
      const r = await onSubmit(answers as number[]);
      setResult(r);
    } finally {
      setSubmitting(false);
    }
  };

  if (result) {
    const badgeImgSrc = stageOrder ? `/assets/badge${stageOrder}.png` : null;

    return (
      <div className="max-w-md mx-auto text-center py-12 px-6 bg-zinc-950/90 rounded-3xl border border-zinc-800/80 shadow-2xl my-8">
        <StylusEmblem variant={result.passed ? "celebrate" : "default"} size={120} className="mx-auto mb-4" />
        <h2 className="text-3xl font-serif font-bold text-zinc-100 mb-1">
          {result.passed ? "Milestone Achieved!" : "So close — try again!"}
        </h2>
        <p className="text-xs font-mono text-zinc-400 mb-6">You scored <span className="text-amber-400 font-bold text-sm">{result.score}%</span></p>

        {result.passed && (
          <div
            onClick={() => {
              if (stageOrder) {
                setSelectedBadge({
                  id: `stage-${stageOrder}`,
                  order: stageOrder,
                  title: stageTitle || "Milestone Badge",
                  titleTa: stageTitleTa || "மைல்கல் விருது",
                  desc: "Congratulations on achieving 70%+ score on this stage milestone quiz! Badge verified and added to your profile.",
                  isUnlocked: true,
                  xpReward: result.xp_gained || 50,
                });
              }
            }}
            className="flex flex-col items-center justify-center bg-amber-500/10 border border-amber-500/30 hover:border-amber-500/60 rounded-3xl p-6 mb-6 glow-amber space-y-3 cursor-pointer transition-all group"
          >
            {badgeImgSrc ? (
              <motion.div
                initial={{ scale: 0.4, rotate: -15 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="relative w-24 h-24 my-1"
              >
                <img
                  src={badgeImgSrc}
                  alt={stageTitle || "Milestone Badge"}
                  className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(245,158,11,0.6)] group-hover:scale-110 transition-transform duration-300"
                />
              </motion.div>
            ) : (
              <span className="text-4xl mb-1">{result.badge || "🛡️"}</span>
            )}
            <div className="text-center">
              <span className="text-amber-400 font-mono font-bold text-sm block uppercase tracking-wider group-hover:text-amber-300 transition-colors">
                {stageTitle ? `${stageTitle} Badge Unlocked!` : "Milestone Badge Unlocked!"}
              </span>
              {stageTitleTa && (
                <span className="text-xs text-amber-300 font-tamil font-bold block mt-0.5">
                  {stageTitleTa}
                </span>
              )}
              <span className="text-[10px] text-zinc-400 font-mono mt-1 block">
                Click badge emblem to inspect details & share!
              </span>
            </div>
          </div>
        )}

        {result.xp_gained > 0 && (
          <div className="text-emerald-400 font-mono font-bold text-sm mb-6">
            +{result.xp_gained} XP Awarded
          </div>
        )}

        <a
          href="/journey"
          className="inline-block px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all"
        >
          Return to Journey Map
        </a>

        {/* Expanded Badge Inspection Modal */}
        <BadgeModal
          badge={selectedBadge}
          onClose={() => setSelectedBadge(null)}
        />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-32">
      {questions.map((q, qi) => (
        <div key={qi} className="bg-zinc-950/90 rounded-2xl p-6 border border-zinc-800/80 shadow-xl">
          <div className="font-semibold text-zinc-100 text-sm mb-4">
            <span className="text-amber-400 font-mono mr-2">{qi + 1}.</span> {q.q}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {q.options.map((opt, oi) => (
              <button
                key={oi}
                onClick={() => select(qi, oi)}
                className={`text-left px-4 py-3 rounded-xl border text-xs font-mono transition-all ${
                  answers[qi] === oi
                    ? "bg-amber-500/20 border-amber-500/60 text-amber-300"
                    : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}
      <div className="fixed bottom-0 left-0 right-0 bg-[#07070a]/90 backdrop-blur-md border-t border-zinc-800/80 p-5 flex justify-center z-40">
        <button
          onClick={submit}
          disabled={!allAnswered || submitting}
          className="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-zinc-950 font-mono font-bold text-xs uppercase tracking-wider shadow-xl shadow-amber-500/20 transition-all"
        >
          {submitting ? "Checking Answers…" : "Submit Milestone Quiz"}
        </button>
      </div>
    </div>
  );
}
