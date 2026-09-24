"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { useCurriculum } from "@/lib/curriculum";
import { api } from "@/lib/api";
import StylusEmblem from "@/components/StylusEmblem";
import Trace from "@/components/Trace";
import {
  ReadLesson,
  LettersLesson,
  GridLesson,
  VocabLesson,
  SentenceLesson,
  BuildLesson,
  ReadingLesson,
} from "@/components/lessons";
import { ArrowLeft, CheckCircle2, Flame, Award } from "lucide-react";

const SELF_PACED_TYPES = new Set(["read", "letters", "grid", "vocab", "sentence"]);

export default function LessonPage() {
  const { id } = useParams<{ id: string }>();
  const { user, token, loading, refreshMe } = useAuth();
  const { curriculum } = useCurriculum();
  const router = useRouter();
  const [result, setResult] = useState<{ xp_gained: number; xp: number; streak: number } | null>(null);
  const [traceIdx, setTraceIdx] = useState(0);

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

  const stage = curriculum.stages.find((s) => s.lessons.some((l) => l.id === id));
  const lesson = stage?.lessons.find((l) => l.id === id);

  if (!stage || !lesson) {
    return (
      <main className="min-h-screen bg-[#07070a] flex items-center justify-center">
        <p className="text-zinc-500 font-mono text-sm">Lesson not found.</p>
      </main>
    );
  }

  const complete = async (score: number) => {
    const r = await api<{ xp_gained: number; xp: number; streak: number }>(`/api/lessons/${lesson.id}/complete`, {
      method: "POST",
      token: token!,
      body: JSON.stringify({ score }),
    });
    await refreshMe();
    setResult(r);
  };

  if (result) {
    return (
      <main className="min-h-screen bg-[#07070a] flex items-center justify-center px-6">
        <div className="text-center bg-zinc-950/90 rounded-3xl p-10 border border-zinc-800/80 shadow-2xl max-w-md w-full">
          <StylusEmblem size={120} variant="celebrate" className="mx-auto mb-6" />
          <h2 className="text-3xl font-serif font-bold text-zinc-100">Lesson Complete!</h2>
          {result.xp_gained > 0 ? (
            <p className="text-emerald-400 font-mono font-bold text-sm mt-3 flex items-center justify-center gap-1">
              <Award size={16} /> +{result.xp_gained} XP Awarded
            </p>
          ) : (
            <p className="text-zinc-400 font-mono text-xs mt-2">Already completed previously</p>
          )}
          <p className="text-amber-400 font-mono font-bold text-xs mt-2 flex items-center justify-center gap-1">
            <Flame size={14} /> {result.streak} Day Streak
          </p>
          <Link
            href="/journey"
            className="inline-block mt-8 px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all"
          >
            Return to Journey
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#07070a] bg-grid-pattern pb-28 text-zinc-100">
      {/* Sticky Header */}
      <header className="sticky top-0 z-30 bg-[#07070a]/90 backdrop-blur-md border-b border-zinc-800/80">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/journey" className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-amber-400 transition-colors">
            <ArrowLeft size={16} /> Back
          </Link>
          <div className="text-center">
            <div className="text-[10px] font-mono text-amber-500 uppercase tracking-widest">{stage.subtitle}</div>
            <div className="font-tamil font-bold text-zinc-100 text-lg">{lesson.title_ta}</div>
          </div>
          <span className="text-xs font-mono text-amber-400 font-bold bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-full">
            +{lesson.xp} XP
          </span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 mt-10">
        {lesson.type === "read" && <ReadLesson content={lesson.content} />}
        {lesson.type === "letters" && <LettersLesson content={lesson.content} />}
        {lesson.type === "grid" && <GridLesson content={lesson.content} />}
        {lesson.type === "vocab" && <VocabLesson content={lesson.content} />}
        {lesson.type === "sentence" && <SentenceLesson content={lesson.content} />}
        {lesson.type === "build" && <BuildLesson content={lesson.content} onDone={complete} />}
        {lesson.type === "reading" && <ReadingLesson content={lesson.content} onDone={complete} />}
        {lesson.type === "trace" && (
          <TraceFlow items={lesson.content.items} idx={traceIdx} setIdx={setTraceIdx} onAllDone={complete} />
        )}
      </div>

      {SELF_PACED_TYPES.has(lesson.type) && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#07070a]/90 backdrop-blur-md border-t border-zinc-800/80 p-5 flex justify-center z-40">
          <button
            onClick={() => complete(100)}
            className="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono font-bold text-xs uppercase tracking-wider shadow-xl shadow-amber-500/20 transition-all flex items-center gap-2"
          >
            Mark Complete & Continue <CheckCircle2 size={16} />
          </button>
        </div>
      )}
    </main>
  );
}

function TraceFlow({
  items,
  idx,
  setIdx,
  onAllDone,
}: {
  items: { char: string; tr: string }[];
  idx: number;
  setIdx: (n: number) => void;
  onAllDone: (score: number) => void;
}) {
  const [scores, setScores] = useState<number[]>([]);
  const item = items[idx];

  const handleScore = (score: number) => {
    const next = [...scores, score];
    setScores(next);
    if (idx + 1 >= items.length) {
      const avg = Math.round(next.reduce((a, b) => a + b, 0) / next.length);
      onAllDone(avg);
    } else {
      setIdx(idx + 1);
    }
  };

  return (
    <div className="text-center max-w-md mx-auto space-y-4">
      <div className="text-xs font-mono text-amber-400 uppercase tracking-widest">
        Trace Glyphs · Letter {idx + 1} of {items.length}
      </div>
      <div className="text-zinc-300 font-mono text-xs">{item.tr}</div>
      <Trace char={item.char} onComplete={handleScore} />
    </div>
  );
}
