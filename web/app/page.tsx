"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth";
import StylusEmblem from "@/components/StylusEmblem";
import TamilSwarmCanvas from "@/components/TamilSwarmCanvas";
import { useCurriculum } from "@/lib/curriculum";
import { BounceCardTrigger, FannedCardItem } from "@/components/BounceCardTrigger";
import { Sparkles, Compass, Feather, ArrowRight, ShieldCheck, BookOpen, Award, Layers, Type, Bot, Mic, Brain, Lock, CheckCircle2 } from "lucide-react";

const STAGE_CARDS_MAP: Record<string, FannedCardItem[]> = {
  adippadai: [
    { glyphOrSymbol: "அ", title: "Ammaa", subtext: "Mother · Vowel 1", borderColor: "border-emerald-500/40", shadowColor: "shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(16,185,129,0.2)]", textColor: "text-emerald-400", x: -65, y: -130, rotate: -9, delay: 0.02 },
    { glyphOrSymbol: "ஆ", title: "Aadu", subtext: "Goat · Vowel 2", borderColor: "border-emerald-400/40", shadowColor: "shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(16,185,129,0.2)]", textColor: "text-emerald-300", x: 0, y: -145, rotate: 0, delay: 0.08 },
    { glyphOrSymbol: "இ", title: "Ilai", subtext: "Leaf · Vowel 3", borderColor: "border-teal-400/40", shadowColor: "shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(20,184,166,0.2)]", textColor: "text-teal-300", x: 65, y: -130, rotate: 9, delay: 0.14 },
  ],
  ezhuthukkal: [
    { glyphOrSymbol: "க்", title: "Pulli Dot", subtext: "Pure Mei Consonant", borderColor: "border-sky-500/40", shadowColor: "shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(14,165,233,0.2)]", textColor: "text-sky-400", x: -65, y: -130, rotate: -9, delay: 0.02 },
    { glyphOrSymbol: "கா", title: "Ka + Aa", subtext: "Uyirmei Grid 1", borderColor: "border-sky-400/40", shadowColor: "shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(14,165,233,0.2)]", textColor: "text-sky-300", x: 0, y: -145, rotate: 0, delay: 0.08 },
    { glyphOrSymbol: "கி", title: "Ka + I", subtext: "Uyirmei Grid 2", borderColor: "border-blue-400/40", shadowColor: "shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(96,165,250,0.2)]", textColor: "text-blue-300", x: 65, y: -130, rotate: 9, delay: 0.14 },
  ],
  payirchi: [
    { glyphOrSymbol: "எ", title: "Canvas Stroke", subtext: "Live Mask Match", borderColor: "border-amber-500/40", shadowColor: "shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(245,158,11,0.2)]", textColor: "text-amber-400", x: -65, y: -130, rotate: -9, delay: 0.02 },
    { glyphOrSymbol: "ழ", title: "Retroflex Zh", subtext: "Signature Curl", borderColor: "border-amber-400/40", shadowColor: "shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(245,158,11,0.2)]", textColor: "text-amber-300", x: 0, y: -145, rotate: 0, delay: 0.08 },
    { glyphOrSymbol: "தமிழ்", title: "Word Trace", subtext: "Complete Glyph", borderColor: "border-orange-400/40", shadowColor: "shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(251,146,60,0.2)]", textColor: "text-orange-300", x: 65, y: -130, rotate: 9, delay: 0.14 },
  ],
  sollkal: [
    { glyphOrSymbol: "வணக்கம்", title: "VaNakkam", subtext: "Greetings", borderColor: "border-purple-500/40", shadowColor: "shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(168,85,247,0.2)]", textColor: "text-purple-400", x: -65, y: -130, rotate: -9, delay: 0.02 },
    { glyphOrSymbol: "நன்றி", title: "NanRi", subtext: "Gratitude", borderColor: "border-purple-400/40", shadowColor: "shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(168,85,247,0.2)]", textColor: "text-purple-300", x: 0, y: -145, rotate: 0, delay: 0.08 },
    { glyphOrSymbol: "குடும்பம்", title: "Kudumbam", subtext: "Family", borderColor: "border-indigo-400/40", shadowColor: "shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(129,140,248,0.2)]", textColor: "text-indigo-300", x: 65, y: -130, rotate: 9, delay: 0.14 },
  ],
  vaakkiyam: [
    { glyphOrSymbol: "சொல்", title: "SOV Syntax", subtext: "Subject Object Verb", borderColor: "border-rose-500/40", shadowColor: "shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(244,63,94,0.2)]", textColor: "text-rose-400", x: -65, y: -130, rotate: -9, delay: 0.02 },
    { glyphOrSymbol: "நான்", title: "Naan", subtext: "I read Tamil", borderColor: "border-rose-400/40", shadowColor: "shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(244,63,94,0.2)]", textColor: "text-rose-300", x: 0, y: -145, rotate: 0, delay: 0.08 },
    { glyphOrSymbol: "கேள்வி", title: "Kelvi", subtext: "Interrogative Suffix", borderColor: "border-pink-400/40", shadowColor: "shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(244,114,182,0.2)]", textColor: "text-pink-300", x: 65, y: -130, rotate: 9, delay: 0.14 },
  ],
  vasippu: [
    { glyphOrSymbol: "காலை", title: "Kaalai", subtext: "Morning Passage", borderColor: "border-cyan-500/40", shadowColor: "shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(6,182,212,0.2)]", textColor: "text-cyan-400", x: -65, y: -130, rotate: -9, delay: 0.02 },
    { glyphOrSymbol: "காகம்", title: "Kaagam", subtext: "Classical Tale", borderColor: "border-cyan-400/40", shadowColor: "shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(6,182,212,0.2)]", textColor: "text-cyan-300", x: 0, y: -145, rotate: 0, delay: 0.08 },
    { glyphOrSymbol: "புத்தி", title: "Puthi", subtext: "Comprehension Analysis", borderColor: "border-blue-400/40", shadowColor: "shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(96,165,250,0.2)]", textColor: "text-blue-300", x: 65, y: -130, rotate: 9, delay: 0.14 },
  ],
  puthagam: [
    { glyphOrSymbol: "குறள்", title: "Thirukkural", subtext: "1,330 Couplets", borderColor: "border-indigo-500/40", shadowColor: "shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(99,102,241,0.2)]", textColor: "text-indigo-400", x: -65, y: -130, rotate: -9, delay: 0.02 },
    { glyphOrSymbol: "அறம்", title: "Aathichoodi", subtext: "Avvaiyar Classics", borderColor: "border-indigo-400/40", shadowColor: "shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(99,102,241,0.2)]", textColor: "text-indigo-300", x: 0, y: -145, rotate: 0, delay: 0.08 },
    { glyphOrSymbol: "நூல்", title: "Ilakkiyam", subtext: "Mastery Certification", borderColor: "border-violet-400/40", shadowColor: "shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(167,139,250,0.2)]", textColor: "text-violet-300", x: 65, y: -130, rotate: 9, delay: 0.14 },
  ],
};

export default function Home() {
  const { user, loading } = useAuth();
  const { curriculum } = useCurriculum();
  const [activeTab, setActiveTab] = useState<"vowels" | "consonants" | "grid">("vowels");

  return (
    <main className="min-h-screen bg-[#07070a] relative text-zinc-100 overflow-x-hidden">
      {/* Tamil Glyph Swarm Background */}
      <TamilSwarmCanvas />

      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-[650px] right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[150px] pointer-events-none rounded-full" />

      {/* Navigation Header */}
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-6 border-b border-zinc-800/60 relative z-20 backdrop-blur-md bg-[#07070a]/70">
        <div className="flex items-center gap-3">
          <StylusEmblem size={38} />
          <div className="flex flex-col">
            <span className="font-serif text-xl tracking-wider text-zinc-100 font-bold flex items-center gap-1.5">
              Ezhuthaani <span className="font-tamil text-amber-400 text-sm font-semibold">எழுத்தாணி</span>
            </span>

          </div>
        </div>

        {!loading && (
          <div className="flex items-center gap-3">
            {user ? (
              <Link
                href="/journey"
                className="px-5 py-2.5 rounded-xl bg-amber-500 text-zinc-950 font-mono font-semibold text-xs tracking-wider uppercase hover:bg-amber-400 transition-all flex items-center gap-2 shadow-lg shadow-amber-500/20"
              >
                Continue Journey <ArrowRight size={14} />
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-xl text-zinc-400 hover:text-zinc-100 font-mono text-xs uppercase tracking-wider transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 text-zinc-950 font-mono font-semibold text-xs tracking-wider uppercase hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20 flex items-center gap-1.5"
                >
                  Start Journey
                </Link>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Editorial Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-24 relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-mono uppercase tracking-widest mb-8"
        >
          <Feather size={13} className="text-amber-400 animate-pulse" />
          Ancient Script · Learn the oldest living language in the world!
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-7xl font-serif text-zinc-100 leading-[1.08] tracking-tight max-w-4xl"
        >
          Master the ancient strokes of{" "}
          <span className="font-tamil font-bold text-amber-400 underline decoration-amber-500/40 underline-offset-8">
            தமிழ்
          </span>{" "}
          from first glyph to classical literature.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-zinc-400 mt-6 text-base sm:text-lg max-w-2xl font-light leading-relaxed"
        >
          Inspired by traditional Tamil manuscript writing (<span className="text-zinc-300 italic font-serif">ezhuthaani</span>) on dried palm leaves.
          Practice live stroke-tracing, master 247 letters, build sentences, and read Thirukkural.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href={user ? "/journey" : "/signup"}
            className="px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono font-bold text-sm tracking-wider uppercase shadow-xl shadow-amber-500/25 transition-all flex items-center gap-2"
          >
            {user ? "Resume Your Path" : "Begin Free Practice"} <ArrowRight size={16} />
          </Link>

          <Link
            href="#curriculum"
            className="px-6 py-4 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-300 font-mono text-xs tracking-wider uppercase hover:border-zinc-700 hover:text-white transition-all flex items-center gap-2"
          >
            <Compass size={15} className="text-amber-400" /> Explore 7 Stages
          </Link>
        </motion.div>

        {/* Mascot Emblem Highlight */}
        <div className="mt-14 relative flex items-center justify-center">
          <div className="w-48 h-48 rounded-full bg-amber-500/10 blur-2xl absolute" />
          <StylusEmblem size={160} variant="landing" className="relative z-10" />
        </div>
      </section>

      {/* Feature Pillar Highlights */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-b border-zinc-800/60 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        <div className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
              <Feather size={20} />
            </div>
            <h3 className="font-serif text-xl text-zinc-100 mb-2">HTML5 Stroke-Trace Masking</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Trace glyphs on an interactive canvas. Evaluates stroke coverage and neatness in real-time against rendered pixel masks.
            </p>
          </div>
          <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest mt-6">Stage 3 Practice</span>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <Layers size={20} />
            </div>
            <h3 className="font-serif text-xl text-zinc-100 mb-2">The 247 Letter Uyirmei System</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Understand 12 vowels (Uyir), 18 consonants (Mei), 216 combined script forms (Uyirmei), and the special Aaytham ஃ glyph.
            </p>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest mt-6">Interactive Grid</span>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-4">
              <BookOpen size={20} />
            </div>
            <h3 className="font-serif text-xl text-zinc-100 mb-2">Classical Literature Passage Engine</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Progress to authentic Sangam literature, Avvaiyar's Aathichoodi, and Thirukkural couplets with un-aided reading modes.
            </p>
          </div>
          <span className="text-[10px] font-mono text-sky-400 uppercase tracking-widest mt-6">Stage 7 Literature</span>
        </div>
      </section>

      {/* Spring-Physics Fanned Card Curriculum Showcase */}
      <section id="curriculum" className="max-w-6xl mx-auto px-6 py-24 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-2">
            Sequential Progression
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-zinc-100">
            The 7 Milestones of Ezhuthaani
          </h2>
          <p className="text-xs text-zinc-400 mt-3 font-light">
            Master Tamil step-by-step through interactive script cards and quizzes.
          </p>
        </div>

        {curriculum && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
            {curriculum.stages.map((stage) => {
              const cards = STAGE_CARDS_MAP[stage.id] || [];
              return (
                <BounceCardTrigger
                  key={stage.id}
                  title={stage.subtitle}
                  titleTa={stage.name_ta}
                  subtitle={`Stage 0${stage.order} · ${stage.name}`}
                  description={stage.blurb}
                  badge={stage.milestone.title}
                  cards={cards}
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.location.href = user ? "/journey" : "/signup";
                    }
                  }}
                />
              );
            })}
          </div>
        )}
      </section>

      {/* Integrated Features & Learning Tools Showcase */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-800/60 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-mono uppercase tracking-widest mb-4">
            <Sparkles size={12} className="text-amber-400" />
            <span>Interactive Learning Modules</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-zinc-100">
            Advanced Tamil Mastery Tools
          </h2>
          <p className="text-xs text-zinc-400 mt-3 font-light">
            Integrated features and interactive learning modules available across the Ezhuthaani platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Active Feature 1: Script Explorer */}
          <div className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800 hover:border-amber-500/50 shadow-xl flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-amber-500/10 rounded-full blur-xl group-hover:bg-amber-500/20 transition-all pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold">
                  <Type size={20} />
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] uppercase font-bold tracking-wider flex items-center gap-1">
                  <CheckCircle2 size={10} /> Active Now
                </span>
              </div>
              <h3 className="font-serif text-xl text-zinc-100 mb-2">Tamil Script Explorer</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light mb-4">
                Interactive builder for all 247 letters. Deep-dive into Uyir, Mei, Uyirmei, and Aaytham with audio pronunciation and full matrix grid.
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-800/80">
              <Link
                href={user ? "/script" : "/login"}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <span>Explore Script</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Active Feature 2: Tamil Rhymes */}
          <div className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800 hover:border-amber-500/50 shadow-xl flex flex-col justify-between relative overflow-hidden group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 font-bold">
                  <Sparkles size={20} />
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] uppercase font-bold tracking-wider flex items-center gap-1">
                  <CheckCircle2 size={10} /> Active Now
                </span>
              </div>
              <h3 className="font-serif text-xl text-zinc-100 mb-2">Tamil Rhymes (3D WebGL)</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light mb-4">
                Interactive 3D WebGL storybook scenes, tap-to-discover vocabulary, Piper TTS audio, and curated YouTube video rhymes.
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-800/80">
              <Link
                href={user ? "/rhymes" : "/login"}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <span>Enter Rhymes</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Active Feature 3: Ezhuthaani AI Assistant */}
          <div className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800 hover:border-amber-500/50 shadow-xl flex flex-col justify-between relative overflow-hidden group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400 font-bold">
                  <Bot size={20} />
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] uppercase font-bold tracking-wider flex items-center gap-1">
                  <CheckCircle2 size={10} /> Active Now
                </span>
              </div>
              <h3 className="font-serif text-xl text-zinc-100 mb-2">Ezhuthaani AI Assistant</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light mb-4">
                Conversational assistant grounded in ancient Tamil classics, grammar rules, literature, and persisted chat threads.
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-800/80">
              <Link
                href={user ? "/journey" : "/login"}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <span>Chat with AI</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Active Feature 4: Reading Aloud & Neural TTS */}
          <div className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800 hover:border-amber-500/50 shadow-xl flex flex-col justify-between relative overflow-hidden group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold">
                  <Mic size={20} />
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] uppercase font-bold tracking-wider flex items-center gap-1">
                  <CheckCircle2 size={10} /> Active Now
                </span>
              </div>
              <h3 className="font-serif text-xl text-zinc-100 mb-2">Reading Aloud & TTS</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light mb-4">
                Guided passage reading practice powered by local Piper Valluvar Neural TTS voice and chunk-by-chunk self-paced practice.
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-800/80">
              <Link
                href={user ? "/read-aloud" : "/login"}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <span>Practice Reading</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Uyirmei Mini-Matrix Showcase */}
      <section className="max-w-5xl mx-auto px-6 py-20 border-t border-zinc-800/60 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          <div>

            <h2 className="text-3xl font-serif text-zinc-100">Uyirmei</h2>
            <p className="text-xs text-zinc-400 mt-1">Consonants (Mei) + Vowels (Uyir) generate all 216 combined letters.</p>
          </div>

          <div className="flex items-center gap-2 p-1 bg-zinc-900 border border-zinc-800 rounded-xl font-mono text-xs">
            <button
              onClick={() => setActiveTab("vowels")}
              className={`px-3 py-1.5 rounded-lg transition-colors ${activeTab === "vowels" ? "bg-amber-500 text-zinc-950 font-bold" : "text-zinc-400 hover:text-white"
                }`}
            >
              12 Vowels
            </button>
            <button
              onClick={() => setActiveTab("consonants")}
              className={`px-3 py-1.5 rounded-lg transition-colors ${activeTab === "consonants" ? "bg-amber-500 text-zinc-950 font-bold" : "text-zinc-400 hover:text-white"
                }`}
            >
              18 Consonants
            </button>
          </div>
        </div>

        {activeTab === "vowels" ? (
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {[
              { ta: "அ", tr: "a", word: "அம்மா (Ammaa)" },
              { ta: "ஆ", tr: "aa", word: "ஆடு (Aadu)" },
              { ta: "இ", tr: "i", word: "இலை (Ilai)" },
              { ta: "ஈ", tr: "ii", word: "ஈ (Ii)" },
              { ta: "உ", tr: "u", word: "உடல் (Udal)" },
              { ta: "ஊ", tr: "uu", word: "ஊர் (Uur)" },
              { ta: "எ", tr: "e", word: "எலி (Eli)" },
              { ta: "ஏ", tr: "ee", word: "ஏணி (Eeni)" },
              { ta: "ஐ", tr: "ai", word: "ஐந்து (Ainthu)" },
              { ta: "ஒ", tr: "o", word: "ஒட்டகம் (Ottagam)" },
              { ta: "ஓ", tr: "oo", word: "ஓடு (Oodu)" },
              { ta: "ஔ", tr: "au", word: "ஔவை (Auvai)" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80 flex flex-col items-center justify-center text-center hover:border-amber-500/50 transition-colors group cursor-default"
              >
                <span className="font-tamil text-3xl font-bold text-amber-400 group-hover:scale-110 transition-transform">
                  {item.ta}
                </span>
                <span className="text-[11px] font-mono text-zinc-300 mt-1 font-semibold">{item.tr}</span>
                <span className="text-[9px] text-zinc-400 truncate w-full mt-0.5">{item.word}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {[
              { ta: "க்", tr: "k", name: "Kal (Stone)" },
              { ta: "ங்", tr: "ng", name: "Mangai" },
              { ta: "ச்", tr: "ch", name: "Chattai" },
              { ta: "ஞ்", tr: "nj", name: "Njaayiru" },
              { ta: "ட்", tr: "t", name: "Pattam" },
              { ta: "ண்", tr: "N", name: "MaN" },
              { ta: "த்", tr: "th", name: "Thalai" },
              { ta: "ந்த்", tr: "nh", name: "Nhathi" },
              { ta: "ப்", tr: "p", name: "Pal" },
              { ta: "ம்", tr: "m", name: "Maram" },
              { ta: "ய்", tr: "y", name: "Vaay" },
              { ta: "ர்", tr: "r", name: "Maram" },
              { ta: "ல்", tr: "l", name: "Paal" },
              { ta: "வ்", tr: "v", name: "Vaanam" },
              { ta: "ழ்", tr: "zh", name: "Thamizh" },
              { ta: "ள்", tr: "L", name: "VaaL" },
              { ta: "ற்", tr: "R", name: "AaRu" },
              { ta: "ன்", tr: "n", name: "Meen" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80 flex flex-col items-center justify-center text-center hover:border-emerald-500/50 transition-colors group cursor-default"
              >
                <span className="font-tamil text-3xl font-bold text-emerald-400 group-hover:scale-110 transition-transform">
                  {item.ta}
                </span>
                <span className="text-[11px] font-mono text-zinc-300 mt-1 font-semibold">{item.tr}</span>
                <span className="text-[9px] text-zinc-400 truncate w-full mt-0.5">{item.name}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Editorial Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-12 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400 relative z-10">
        <div className="flex items-center gap-2">
          <StylusEmblem size={26} />
          <span>Ezhuthaani (எழுத்தாணி) · Tamil Learning</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href={user ? "/journey" : "/signup"} className="hover:text-amber-400 transition-colors">
            Journey Map
          </Link>
          <Link href="/login" className="hover:text-amber-400 transition-colors">
            Account Login
          </Link>
        </div>
      </footer>
    </main>
  );
}
