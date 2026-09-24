"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { speak } from "@/lib/curriculum";
import { Volume2, CheckCircle2, XCircle, ArrowRight, BookOpen } from "lucide-react";

// -------------------------------------------------- read
export function ReadLesson({ content }: { content: { blocks: { h: string; p: string; ta?: string }[] } }) {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {content.blocks.map((b, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className="bg-zinc-950/90 rounded-2xl p-6 border border-zinc-800/80 shadow-xl shadow-black/50"
        >
          <h3 className="font-serif text-xl text-zinc-100 mb-2">{b.h}</h3>
          <p className="text-xs text-zinc-300 leading-relaxed font-light">{b.p}</p>
          {b.ta && (
            <div className="mt-4 p-4 rounded-xl bg-zinc-900 border border-amber-500/20 text-amber-400 font-tamil text-xl leading-loose">
              {b.ta}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

// -------------------------------------------------- letters
export function LettersLesson({
  content,
}: {
  content: { note?: string; items: { char: string; tr: string; example: { ta: string; tr: string; en: string } }[] };
}) {
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {content.note && <p className="text-zinc-400 font-mono text-xs mb-4 text-center">{content.note}</p>}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {content.items.map((it, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => speak(it.char)}
            className="bg-zinc-950/90 rounded-2xl p-5 border border-zinc-800/80 hover:border-amber-500/50 shadow-xl text-left transition-colors group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-tamil text-4xl font-bold text-amber-400 group-hover:scale-105 transition-transform">
                  {it.char}
                </span>
                <Volume2 size={16} className="text-zinc-500 group-hover:text-amber-400 transition-colors" />
              </div>
              <div className="text-xs font-mono font-semibold text-zinc-300">{it.tr}</div>
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-800/60 text-xs">
              <span className="font-tamil font-bold text-zinc-200">{it.example.ta}</span>{" "}
              <span className="text-zinc-400 font-mono text-[10px]">({it.example.tr})</span>
              <div className="text-zinc-400 font-light text-[11px] mt-0.5">{it.example.en}</div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------- uyirmei grid
const CONS = ["க", "ங", "ச", "ஞ", "ட", "ண", "த", "ந", "ப", "ம", "ய", "ர", "ல", "வ", "ழ", "ள", "ற", "ன"];
const SIGNS = ["", "ா", "ி", "ீ", "ு", "ூ", "ெ", "ே", "ை", "ொ", "ோ", "ௌ"];
const VOWEL_LABELS = ["a", "aa", "i", "ii", "u", "uu", "e", "ee", "ai", "o", "oo", "au"];

export function GridLesson({ content }: { content: { note?: string } }) {
  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {content.note && <p className="text-zinc-400 font-mono text-xs mb-4 text-center">{content.note}</p>}
      <div className="overflow-x-auto rounded-2xl border border-zinc-800/80 bg-zinc-950/90 p-2 shadow-2xl">
        <table className="border-collapse w-full text-center font-mono">
          <thead>
            <tr>
              <th className="p-3 text-xs text-amber-400 bg-zinc-900 sticky left-0 rounded-l-xl">+</th>
              {VOWEL_LABELS.map((v) => (
                <th key={v} className="p-3 text-xs text-zinc-400 uppercase">{v}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CONS.map((c) => (
              <tr key={c} className="border-t border-zinc-900">
                <td className="p-3 font-tamil text-xl font-bold text-amber-400 sticky left-0 bg-zinc-950">{c}</td>
                {SIGNS.map((s, j) => (
                  <td
                    key={j}
                    onClick={() => speak(c + s)}
                    className="p-3 font-tamil text-xl text-zinc-200 hover:text-amber-300 cursor-pointer hover:bg-zinc-900 rounded-lg transition-colors"
                  >
                    {c + s}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// -------------------------------------------------- vocab
export function VocabLesson({
  content,
}: {
  content: { note?: string; items: { ta: string; tr: string; en: string; emoji: string }[] };
}) {
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {content.note && <p className="text-zinc-400 font-mono text-xs mb-4 text-center">{content.note}</p>}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {content.items.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            whileHover={{ scale: 1.02 }}
            className="bg-zinc-950/90 rounded-2xl p-5 border border-zinc-800/80 hover:border-amber-500/50 shadow-xl text-center transition-colors group flex flex-col justify-between"
          >
            <button
              onClick={() => speak(it.ta)}
              className="w-full text-center cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-serif font-bold text-lg flex items-center justify-center mx-auto mb-3">
                {it.ta.charAt(0)}
              </div>
              <div className="font-tamil text-2xl font-bold text-amber-400 group-hover:scale-105 transition-transform">
                {it.ta}
              </div>
              <div className="text-xs font-mono text-zinc-400 mt-1">{it.tr}</div>
              <div className="text-xs text-zinc-200 font-semibold mt-2">{it.en}</div>
            </button>

            <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-center">
              <Link
                href={`/dictionary?word=${encodeURIComponent(it.ta)}`}
                className="text-[10px] font-mono text-amber-400/80 hover:text-amber-300 hover:underline uppercase tracking-wider flex items-center gap-1"
                title="Explore word in Dictionary"
              >
                <BookOpen size={11} />
                <span>Explore Word</span>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// -------------------------------------------------- sentence
export function SentenceLesson({
  content,
}: {
  content: { items: { ta: string; tr: string; en: string; parts: [string, string][] }[] };
}) {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {content.items.map((it, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className="bg-zinc-950/90 rounded-2xl p-6 border border-zinc-800/80 shadow-xl"
        >
          <button onClick={() => speak(it.ta)} className="font-tamil text-2xl font-bold text-amber-400 hover:underline flex items-center gap-2">
            {it.ta} <Volume2 size={18} className="text-zinc-500" />
          </button>
          <div className="text-xs font-mono text-zinc-400 mt-1">{it.tr}</div>
          <div className="text-sm text-zinc-200 mt-1 font-light">{it.en}</div>
          <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-zinc-800/60">
            {it.parts.map(([w, g], j) => (
              <Link
                key={j}
                href={`/dictionary?word=${encodeURIComponent(w)}`}
                className="bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-amber-500/40 rounded-lg px-3 py-1.5 text-center transition-colors group cursor-pointer"
                title={`Look up "${w}" in Dictionary`}
              >
                <div className="font-tamil text-sm font-semibold text-amber-300 group-hover:text-amber-400 flex items-center gap-1 justify-center">
                  <span>{w}</span>
                  <BookOpen size={10} className="text-zinc-500 group-hover:text-amber-400 transition-colors" />
                </div>
                <div className="text-[10px] font-mono text-zinc-400">{g}</div>
              </Link>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// -------------------------------------------------- build (tap words into order)
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function BuildLesson({
  content,
  onDone,
}: {
  content: { note?: string; items: { en: string; ta: string; words: string[] }[] };
  onDone: (score: number) => void;
}) {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number[]>([]);
  const [checked, setChecked] = useState<boolean | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const item = content.items[idx];
  const bank = useMemo(() => shuffle(item.words.map((_, i) => i)), [idx]);

  const pick = (bankIdx: number) => {
    if (checked !== null) return;
    setPicked((p) => [...p, bankIdx]);
  };
  const unpick = (posInPicked: number) => {
    if (checked !== null) return;
    setPicked((p) => p.filter((_, i) => i !== posInPicked));
  };

  const check = () => {
    const built = picked.map((bi) => item.words[bi]).join(" ");
    const correct = built === item.words.join(" ");
    setChecked(correct);
    if (correct) setCorrectCount((c) => c + 1);
  };

  const next = () => {
    if (idx + 1 >= content.items.length) {
      onDone(Math.round((correctCount / content.items.length) * 100));
    } else {
      setIdx((i) => i + 1);
      setPicked([]);
      setChecked(null);
    }
  };

  const isLast = idx + 1 >= content.items.length;

  return (
    <div className="max-w-xl mx-auto space-y-4">
      {content.note && <p className="text-zinc-400 font-mono text-xs mb-4 text-center">{content.note}</p>}
      <div className="bg-zinc-950/90 rounded-2xl p-6 border border-zinc-800/80 shadow-xl">
        <div className="text-xs font-mono text-amber-400 mb-2">
          Sentence {idx + 1} of {content.items.length}
        </div>
        <div className="text-zinc-100 font-semibold mb-6">{item.en}</div>

        <div className="min-h-[56px] flex flex-wrap gap-2 border-b-2 border-dashed border-zinc-800 pb-4 mb-6">
          {picked.map((bi, pos) => (
            <button
              key={pos}
              onClick={() => unpick(pos)}
              className="font-tamil text-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 rounded-xl px-4 py-1.5 font-bold"
            >
              {item.words[bi]}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {bank.map((bi) =>
            picked.includes(bi) ? null : (
              <button
                key={bi}
                onClick={() => pick(bi)}
                className="font-tamil text-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 rounded-xl px-4 py-1.5"
              >
                {item.words[bi]}
              </button>
            )
          )}
        </div>

        {checked !== null && (
          <div className={`rounded-xl p-4 mb-6 text-xs font-mono flex items-center gap-2 ${checked ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300" : "bg-rose-500/10 border border-rose-500/30 text-rose-300"}`}>
            {checked ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
            <span>{checked ? "Correct construction!" : `Correct order: `}</span>
            {!checked && <span className="font-tamil text-sm font-bold text-amber-300">{item.ta}</span>}
          </div>
        )}

        <div className="flex justify-end gap-2">
          {checked === null ? (
            <button
              onClick={check}
              disabled={picked.length !== item.words.length}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-zinc-950 font-mono font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20"
            >
              Check
            </button>
          ) : (
            <button
              onClick={next}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 flex items-center gap-2"
            >
              {isLast ? "Finish" : "Next"} <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------- reading (passage + comprehension)
export function ReadingLesson({
  content,
  onDone,
}: {
  content: {
    note?: string;
    hide_tr?: boolean;
    lines: { ta: string; tr: string; en: string }[];
    questions: { q: string; options: string[]; answer: number }[];
  };
  onDone: (score: number) => void;
}) {
  const [answers, setAnswers] = useState<(number | null)[]>(content.questions.map(() => null));
  const [checked, setChecked] = useState(false);

  const select = (qi: number, oi: number) => {
    if (checked) return;
    setAnswers((a) => a.map((v, i) => (i === qi ? oi : v)));
  };

  const check = () => setChecked(true);
  const finish = () => {
    const correct = content.questions.filter((q, i) => answers[i] === q.answer).length;
    onDone(Math.round((correct / content.questions.length) * 100));
  };

  const allAnswered = answers.every((a) => a !== null);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {content.note && <p className="text-zinc-400 font-mono text-xs text-center">{content.note}</p>}
      <div className="bg-zinc-950/90 rounded-2xl p-6 border border-zinc-800/80 shadow-xl space-y-4">
        {content.lines.map((l, i) => (
          <button key={i} onClick={() => speak(l.ta)} className="block text-left w-full hover:bg-zinc-900 rounded-xl p-3 transition-colors border border-transparent hover:border-zinc-800">
            <div className="font-tamil text-xl font-bold text-amber-400">{l.ta}</div>
            {!content.hide_tr && <div className="text-xs font-mono text-zinc-400 mt-0.5">{l.tr}</div>}
            <div className="text-xs text-zinc-300 font-light mt-0.5">{l.en}</div>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {content.questions.map((q, qi) => (
          <div key={qi} className="bg-zinc-950/90 rounded-2xl p-6 border border-zinc-800/80 shadow-xl">
            <div className="font-semibold text-zinc-100 text-sm mb-4">{q.q}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {q.options.map((opt, oi) => {
                const isSelected = answers[qi] === oi;
                const isCorrect = checked && oi === q.answer;
                const isWrong = checked && isSelected && oi !== q.answer;
                return (
                  <button
                    key={oi}
                    onClick={() => select(qi, oi)}
                    className={`text-left px-4 py-3 rounded-xl border text-xs font-mono transition-all ${
                      isCorrect
                        ? "bg-emerald-500/20 border-emerald-500/60 text-emerald-300"
                        : isWrong
                        ? "bg-rose-500/20 border-rose-500/60 text-rose-300"
                        : isSelected
                        ? "bg-amber-500/20 border-amber-500/60 text-amber-300"
                        : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        {!checked ? (
          <button
            onClick={check}
            disabled={!allAnswered}
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-zinc-950 font-mono font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20"
          >
            Check Answers
          </button>
        ) : (
          <button
            onClick={finish}
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20"
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
}
