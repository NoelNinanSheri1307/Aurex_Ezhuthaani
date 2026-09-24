"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { useCurriculum } from "@/lib/curriculum";
import { api } from "@/lib/api";
import StylusEmblem from "@/components/StylusEmblem";
import Quiz from "@/components/Quiz";
import { ArrowLeft } from "lucide-react";

export default function QuizPage() {
  const { stageId } = useParams<{ stageId: string }>();
  const { user, token, loading, refreshMe } = useAuth();
  const { curriculum } = useCurriculum();
  const router = useRouter();

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

  const stage = curriculum.stages.find((s) => s.id === stageId);
  if (!stage) {
    return (
      <main className="min-h-screen bg-[#07070a] flex items-center justify-center">
        <p className="text-zinc-500 font-mono text-xs">Stage not found.</p>
      </main>
    );
  }

  if (!user.unlocked_stages.includes(stage.id)) {
    return (
      <main className="min-h-screen bg-[#07070a] bg-grid-pattern flex items-center justify-center px-6 text-center text-zinc-100">
        <div className="bg-zinc-950/90 rounded-3xl p-10 border border-zinc-800/80 shadow-2xl max-w-sm">
          <StylusEmblem size={90} className="mx-auto mb-4" />
          <p className="text-zinc-200 font-serif text-lg font-bold">This milestone is locked.</p>
          <p className="text-zinc-400 font-mono text-xs mt-1">Complete previous stage quizzes to unlock.</p>
          <Link href="/journey" className="text-amber-400 font-mono text-xs font-bold mt-6 inline-block hover:underline">
            ← Return to Journey Map
          </Link>
        </div>
      </main>
    );
  }

  const submitQuiz = async (answers: number[]) => {
    const r = await api<{ score: number; passed: boolean; xp_gained: number; badge: string | null; unlocked_next: string[] }>(
      `/api/quiz/${stage.id}/submit`,
      { method: "POST", token: token!, body: JSON.stringify({ answers }) }
    );
    await refreshMe();
    return r;
  };

  return (
    <main className="min-h-screen bg-[#07070a] bg-grid-pattern pb-12 text-zinc-100">
      <header className="sticky top-0 z-30 bg-[#07070a]/90 backdrop-blur-md border-b border-zinc-800/80">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/journey" className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-amber-400 transition-colors">
            <ArrowLeft size={16} /> Back
          </Link>
          <div className="text-center">
            <div className="text-[10px] font-mono text-amber-500 uppercase tracking-widest">Milestone Assessment</div>
            <div className="font-tamil font-bold text-zinc-100 text-lg">{stage.milestone.title_ta}</div>
          </div>
          <span className="w-12" />
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 mt-10">
        <Quiz
          questions={stage.quiz.questions}
          stageOrder={stage.order}
          stageTitle={stage.milestone.title}
          stageTitleTa={stage.milestone.title_ta}
          onSubmit={submitQuiz}
        />
      </div>
    </main>
  );
}
