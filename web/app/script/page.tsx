"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth";
import { speak } from "@/lib/curriculum";
import StylusEmblem from "@/components/StylusEmblem";
import SidebarNav from "@/components/SidebarNav";
import TamilSwarmCanvas from "@/components/TamilSwarmCanvas";
import {
  ArrowLeft,
  Volume2,
  Sparkles,
  BookOpen,
  Layers,
  Zap,
  Grid,
  Info,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";

// ==============================================================================
// SCRIPT DATA CONSTANTS (Reused & Derived from Curriculum Standard)
// ==============================================================================

interface UyirItem {
  char: string;
  tr: string;
  type: "Kuril" | "Nedil";
  desc: string;
  example: { ta: string; tr: string; en: string };
}

const UYIR_LIST: UyirItem[] = [
  { char: "அ", tr: "a", type: "Kuril", desc: "Short vowel 'a'", example: { ta: "அம்மா", tr: "Ammaa", en: "Mother" } },
  { char: "ஆ", tr: "aa", type: "Nedil", desc: "Long vowel 'aa'", example: { ta: "ஆடு", tr: "Aadu", en: "Goat" } },
  { char: "இ", tr: "i", type: "Kuril", desc: "Short vowel 'i'", example: { ta: "இலை", tr: "Ilai", en: "Leaf" } },
  { char: "ஈ", tr: "ii", type: "Nedil", desc: "Long vowel 'ee'", example: { ta: "ஈ", tr: "Ee", en: "Fly" } },
  { char: "உ", tr: "u", type: "Kuril", desc: "Short vowel 'u'", example: { ta: "உலகம்", tr: "Ulagam", en: "World" } },
  { char: "ஊ", tr: "uu", type: "Nedil", desc: "Long vowel 'oo'", example: { ta: "ஊர்", tr: "Oor", en: "Village" } },
  { char: "எ", tr: "e", type: "Kuril", desc: "Short vowel 'e'", example: { ta: "எலி", tr: "Eli", en: "Rat" } },
  { char: "ஏ", tr: "ee", type: "Nedil", desc: "Long vowel 'ay'", example: { ta: "ஏணி", tr: "Eeni", en: "Ladder" } },
  { char: "ஐ", tr: "ai", type: "Nedil", desc: "Dipthong 'ai'", example: { ta: "ஐந்து", tr: "Ainthu", en: "Five" } },
  { char: "ஒ", tr: "o", type: "Kuril", desc: "Short vowel 'o'", example: { ta: "ஒட்டகம்", tr: "Ottagam", en: "Camel" } },
  { char: "ஓ", tr: "oo", type: "Nedil", desc: "Long vowel 'oh'", example: { ta: "ஓடம்", tr: "Oodam", en: "Boat" } },
  { char: "ஔ", tr: "au", type: "Nedil", desc: "Dipthong 'au'", example: { ta: "ஔவையார்", tr: "Avvaiyaar", en: "Poetess" } },
];

interface MeiItem {
  char: string;
  stem: string;
  tr: string;
  group: "Vallinam" | "Mellinam" | "Idaiyinam";
  groupTa: string;
  example: { ta: string; tr: string; en: string };
}

const MEI_LIST: MeiItem[] = [
  // Vallinam (Hard)
  { char: "க்", stem: "க", tr: "k", group: "Vallinam", groupTa: "வல்லினம் (Hard)", example: { ta: "காகம்", tr: "Kaagam", en: "Crow" } },
  { char: "ச்", stem: "ச", tr: "ch", group: "Vallinam", groupTa: "வல்லினம் (Hard)", example: { ta: "சங்கு", tr: "Sangu", en: "Conch" } },
  { char: "ட்", stem: "ட", tr: "t", group: "Vallinam", groupTa: "வல்லினம் (Hard)", example: { ta: "பட்டம்", tr: "Pattam", en: "Kite" } },
  { char: "த்", stem: "த", tr: "th", group: "Vallinam", groupTa: "வல்லினம் (Hard)", example: { ta: "தம்பி", tr: "Thambi", en: "Brother" } },
  { char: "ப்", stem: "ப", tr: "p", group: "Vallinam", groupTa: "வல்லினம் (Hard)", example: { ta: "பந்து", tr: "Panthu", en: "Ball" } },
  { char: "ற்", stem: "ற", tr: "R", group: "Vallinam", groupTa: "வல்லினம் (Hard)", example: { ta: "காற்று", tr: "Kaatru", en: "Wind" } },

  // Mellinam (Soft)
  { char: "ங்", stem: "ங", tr: "ng", group: "Mellinam", groupTa: "மெல்லினம் (Soft)", example: { ta: "சங்கம்", tr: "Sangam", en: "Academy" } },
  { char: "ஞ்", stem: "ஞ", tr: "nj", group: "Mellinam", groupTa: "மெல்லினம் (Soft)", example: { ta: "ஞாயிறு", tr: "Gnaayiru", en: "Sun" } },
  { char: "ண்", stem: "ண", tr: "N", group: "Mellinam", groupTa: "மெல்லினம் (Soft)", example: { ta: "கண்", tr: "KaN", en: "Eye" } },
  { char: "ந்", stem: "ந", tr: "n", group: "Mellinam", groupTa: "மெல்லினம் (Soft)", example: { ta: "நரி", tr: "Nari", en: "Fox" } },
  { char: "ம்", stem: "ம", tr: "m", group: "Mellinam", groupTa: "மெல்லினம் (Soft)", example: { ta: "மரம்", tr: "Maram", en: "Tree" } },
  { char: "ன்", stem: "ன", tr: "n", group: "Mellinam", groupTa: "மெல்லினம் (Soft)", example: { ta: "மான்", tr: "Maan", en: "Deer" } },

  // Idaiyinam (Medium)
  { char: "ய்", stem: "ய", tr: "y", group: "Idaiyinam", groupTa: "இடையினம் (Medium)", example: { ta: "நாய்", tr: "Naay", en: "Dog" } },
  { char: "ர்", stem: "ர", tr: "r", group: "Idaiyinam", groupTa: "இடையினம் (Medium)", example: { ta: "தேர்", tr: "Theer", en: "Chariot" } },
  { char: "ல்", stem: "ல", tr: "l", group: "Idaiyinam", groupTa: "இடையினம் (Medium)", example: { ta: "பால்", tr: "Paal", en: "Milk" } },
  { char: "வ்", stem: "வ", tr: "v", group: "Idaiyinam", groupTa: "இடையினம் (Medium)", example: { ta: "செவ்வாய்", tr: "Sevvaay", en: "Tuesday" } },
  { char: "ழ்", stem: "ழ", tr: "zh", group: "Idaiyinam", groupTa: "இடையினம் (Medium)", example: { ta: "தமிழ்", tr: "Thamizh", en: "Tamil" } },
  { char: "ள்", stem: "ள", tr: "L", group: "Idaiyinam", groupTa: "இடையினம் (Medium)", example: { ta: "வாள்", tr: "VaaL", en: "Sword" } },
];

interface VowelSignMarker {
  vowelChar: string;
  tr: string;
  sign: string;
  signName: string;
}

const VOWEL_SIGNS: VowelSignMarker[] = [
  { vowelChar: "அ", tr: "a", sign: "", signName: "Base (Agaram)" },
  { vowelChar: "ஆ", tr: "aa", sign: "ா", signName: "Aakaaram (Kaal)" },
  { vowelChar: "இ", tr: "i", sign: "ி", signName: "Ikaram (Suzi)" },
  { vowelChar: "ஈ", tr: "ii", sign: "ீ", signName: "Eekaram (Suzi + Mel)" },
  { vowelChar: "உ", tr: "u", sign: "ு", signName: "Ukaram (Keezh)" },
  { vowelChar: "ஊ", tr: "uu", sign: "ூ", signName: "Ookaram (Keezh + Suzi)" },
  { vowelChar: "எ", tr: "e", sign: "ெ", signName: "Ekaram (Ottaikombu)" },
  { vowelChar: "ஏ", tr: "ee", sign: "ே", signName: "Eekaram (Erattaikombu)" },
  { vowelChar: "ஐ", tr: "ai", sign: "ை", signName: "Aikaram (Sangilikombu)" },
  { vowelChar: "ஒ", tr: "o", sign: "ொ", signName: "Okaram (Ottaikombu + Kaal)" },
  { vowelChar: "ஓ", tr: "oo", sign: "ோ", signName: "Ookaram (Erattaikombu + Kaal)" },
  { vowelChar: "ஔ", tr: "au", sign: "ௌ", signName: "Aukaram (Ottaikombu + Laa)" },
];

type TabType = "overview" | "uyir" | "mei" | "builder" | "ayutham" | "matrix";

export default function ScriptExplorerPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("builder");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <main className="min-h-screen bg-[#07070a] flex items-center justify-center">
        <StylusEmblem variant="thinking" size={90} />
      </main>
    );
  }
  
  // Uyirmei Builder Interactive State
  const [selectedMeiIndex, setSelectedMeiIndex] = useState<number>(0); // Default 'க்'
  const [selectedVowelIndex, setSelectedVowelIndex] = useState<number>(1); // Default 'ஆ'

  const currentMei = MEI_LIST[selectedMeiIndex];
  const currentVowel = VOWEL_SIGNS[selectedVowelIndex];
  const combinedChar = currentMei.stem + currentVowel.sign;
  const combinedTr = currentMei.tr + currentVowel.tr;

  return (
    <main className="min-h-screen bg-[#07070a] pb-24 text-zinc-100 relative overflow-x-hidden">
      {/* Tamil Glyph Swarm Background */}
      <TamilSwarmCanvas />

      {/* Authenticated Sidebar Navigation & Header */}
      <SidebarNav />

      {/* Hero Header */}
      <section className="max-w-5xl mx-auto px-6 pt-10 pb-6 relative z-10 text-center">
        <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-2">
          Independent Educational Matrix
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif text-zinc-100 font-normal">
          Tamil Script Architecture
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-3 max-w-2xl mx-auto font-light leading-relaxed">
          Master the logical anatomy of Tamil: 12 Vowels (<span className="text-emerald-400 font-tamil">உயிர்</span>) + 18 Consonants (<span className="text-sky-400 font-tamil">மெய்</span>) = 216 Syllables (<span className="text-amber-400 font-tamil">உயிர்மெய்</span>) + 1 Special Character (<span className="text-purple-400 font-tamil">ஆய்தம்</span>).
        </p>

        {/* Tab Navigation Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8 bg-zinc-950/80 p-1.5 rounded-2xl border border-zinc-800/80 max-w-3xl mx-auto shadow-xl">
          <button
            onClick={() => setActiveTab("builder")}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "builder"
                ? "bg-amber-500 text-zinc-950 shadow-lg shadow-amber-500/20"
                : "text-zinc-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            <Layers size={14} /> Interactive Builder
          </button>
          <button
            onClick={() => setActiveTab("uyir")}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "uyir"
                ? "bg-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/20"
                : "text-zinc-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            <BookOpen size={14} /> 12 Uyir (Vowels)
          </button>
          <button
            onClick={() => setActiveTab("mei")}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "mei"
                ? "bg-sky-500 text-zinc-950 shadow-lg shadow-sky-500/20"
                : "text-zinc-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            <Zap size={14} /> 18 Mei (Consonants)
          </button>
          <button
            onClick={() => setActiveTab("ayutham")}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "ayutham"
                ? "bg-purple-500 text-zinc-950 shadow-lg shadow-purple-500/20"
                : "text-zinc-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            <Sparkles size={14} /> Ayutham (ஃ)
          </button>
          <button
            onClick={() => setActiveTab("matrix")}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "matrix"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                : "text-zinc-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            <Grid size={14} /> 216 Grid Matrix
          </button>
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === "overview"
                ? "bg-zinc-800 text-zinc-100"
                : "text-zinc-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            <Info size={14} /> Overview
          </button>
        </div>
      </section>

      {/* Main Tab Content */}
      <section className="max-w-5xl mx-auto px-6 py-6 relative z-10">
        <AnimatePresence mode="wait">
          {/* =================================================================== */}
          {/* TAB 1: INTERACTIVE BUILDER */}
          {/* =================================================================== */}
          {activeTab === "builder" && (
            <motion.div
              key="builder"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Dynamic Equation Result Card */}
              <div className="bg-zinc-950/90 rounded-3xl p-8 border border-amber-500/30 shadow-2xl glow-amber text-center max-w-3xl mx-auto">
                <div className="text-xs font-mono uppercase text-amber-400 tracking-widest mb-4">
                  Syllable Construction Formula
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 my-6">
                  {/* Step 1: Consonant */}
                  <div className="bg-zinc-900/90 rounded-2xl p-5 border border-sky-500/30 text-center min-w-[100px]">
                    <span className="font-tamil text-4xl font-bold text-sky-400 block">
                      {currentMei.char}
                    </span>
                    <span className="text-xs font-mono text-zinc-400 block mt-1">
                      {currentMei.tr} (Body)
                    </span>
                  </div>

                  <span className="text-2xl font-serif text-amber-400 font-bold">+</span>

                  {/* Step 2: Vowel */}
                  <div className="bg-zinc-900/90 rounded-2xl p-5 border border-emerald-500/30 text-center min-w-[100px]">
                    <span className="font-tamil text-4xl font-bold text-emerald-400 block">
                      {currentVowel.vowelChar}
                    </span>
                    <span className="text-xs font-mono text-zinc-400 block mt-1">
                      {currentVowel.tr} (Life)
                    </span>
                  </div>

                  <span className="text-2xl font-serif text-amber-400 font-bold">=</span>

                  {/* Step 3: Resulting Syllable */}
                  <motion.button
                    key={combinedChar}
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => speak(combinedChar)}
                    className="bg-amber-500/10 rounded-2xl p-6 border-2 border-amber-400 text-center min-w-[120px] cursor-pointer group shadow-xl"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <span className="font-tamil text-5xl font-bold text-amber-300 group-hover:scale-110 transition-transform">
                        {combinedChar}
                      </span>
                      <Volume2 size={18} className="text-amber-400 group-hover:animate-pulse" />
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-400 block mt-2">
                      {combinedTr}
                    </span>
                  </motion.button>
                </div>

                <div className="text-xs font-mono text-zinc-400 mt-4 bg-zinc-900/80 rounded-xl p-3 inline-block border border-zinc-800">
                  Marker Name: <span className="text-zinc-200 font-bold">{currentVowel.signName}</span>
                  {currentVowel.sign && (
                    <span className="ml-2 text-amber-400 font-tamil font-bold">
                      (Vowel Marker: {currentVowel.sign})
                    </span>
                  )}
                </div>
              </div>

              {/* Selector Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Step 1: Consonant Selector */}
                <div className="bg-zinc-950/90 rounded-2xl p-6 border border-zinc-800/80 shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-serif text-lg text-sky-400 font-normal">
                      1. Select Consonant (மெய்)
                    </h3>
                    <span className="text-[10px] font-mono text-zinc-400">18 Options</span>
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    {MEI_LIST.map((m, idx) => (
                      <button
                        key={m.char}
                        onClick={() => {
                          setSelectedMeiIndex(idx);
                          speak(m.stem + currentVowel.sign);
                        }}
                        className={`p-2.5 rounded-xl text-center border transition-all ${
                          selectedMeiIndex === idx
                            ? "bg-sky-500/20 border-sky-400 text-sky-300 font-bold shadow-md shadow-sky-500/20 scale-105"
                            : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700"
                        }`}
                      >
                        <span className="font-tamil text-xl block">{m.char}</span>
                        <span className="text-[9px] font-mono text-zinc-400 block">{m.tr}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Vowel Selector */}
                <div className="bg-zinc-950/90 rounded-2xl p-6 border border-zinc-800/80 shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-serif text-lg text-emerald-400 font-normal">
                      2. Select Vowel (உயிர்)
                    </h3>
                    <span className="text-[10px] font-mono text-zinc-400">12 Options</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {VOWEL_SIGNS.map((v, idx) => (
                      <button
                        key={v.vowelChar}
                        onClick={() => {
                          setSelectedVowelIndex(idx);
                          speak(currentMei.stem + v.sign);
                        }}
                        className={`p-2.5 rounded-xl text-center border transition-all ${
                          selectedVowelIndex === idx
                            ? "bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold shadow-md shadow-emerald-500/20 scale-105"
                            : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700"
                        }`}
                      >
                        <span className="font-tamil text-xl block">{v.vowelChar}</span>
                        <span className="text-[9px] font-mono text-zinc-400 block">{v.tr}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* =================================================================== */}
          {/* TAB 2: UYIR VOWELS */}
          {/* =================================================================== */}
          {activeTab === "uyir" && (
            <motion.div
              key="uyir"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center max-w-xl mx-auto mb-6">
                <h2 className="text-2xl font-serif text-emerald-400">
                  12 Uyir Ezhuthukkal (உயிர் எழுத்துக்கள்)
                </h2>
                <p className="text-xs text-zinc-400 mt-1 font-mono">
                  The 'life' vowels. They stand alone and provide vocalization to Tamil speech.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {UYIR_LIST.map((u, i) => (
                  <motion.button
                    key={u.char}
                    whileHover={{ scale: 1.03 }}
                    onClick={() => speak(u.char)}
                    className="bg-zinc-950/90 rounded-2xl p-5 border border-zinc-800/80 hover:border-emerald-500/50 shadow-xl text-left transition-colors group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-baseline justify-between mb-2">
                        <span className="font-tamil text-4xl font-bold text-emerald-400 group-hover:scale-105 transition-transform">
                          {u.char}
                        </span>
                        <Volume2 size={16} className="text-zinc-500 group-hover:text-emerald-400 transition-colors" />
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono font-bold text-zinc-200">{u.tr}</span>
                        <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          {u.type}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 font-light">{u.desc}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-zinc-800/60 text-xs flex items-center justify-between">
                      <div>
                        <span className="font-tamil font-bold text-amber-400">{u.example.ta}</span>{" "}
                        <span className="text-zinc-400 font-mono text-[10px]">({u.example.tr})</span>
                        <div className="text-zinc-300 font-light text-[11px] mt-0.5">{u.example.en}</div>
                      </div>
                      <Link
                        href={`/dictionary?word=${encodeURIComponent(u.example.ta)}`}
                        onClick={(e) => e.stopPropagation()}
                        className="p-1 text-zinc-500 hover:text-amber-400 transition-colors"
                        title={`Look up "${u.example.ta}" in Dictionary`}
                      >
                        <BookOpen size={13} />
                      </Link>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* =================================================================== */}
          {/* TAB 3: MEI CONSONANTS */}
          {/* =================================================================== */}
          {activeTab === "mei" && (
            <motion.div
              key="mei"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="text-center max-w-xl mx-auto mb-6">
                <h2 className="text-2xl font-serif text-sky-400">
                  18 Mei Ezhuthukkal (மெய் எழுத்துக்கள்)
                </h2>
                <p className="text-xs text-zinc-400 mt-1 font-mono">
                  The 'body' consonants. Marked by a pulli (dot ·). Categorized into 3 phonetic groups.
                </p>
              </div>

              {/* Grouped by Phonetic Class */}
              {(["Vallinam", "Mellinam", "Idaiyinam"] as const).map((grp) => {
                const items = MEI_LIST.filter((m) => m.group === grp);
                const titleTa = items[0].groupTa;
                const groupColor =
                  grp === "Vallinam"
                    ? "border-rose-500/30 text-rose-400"
                    : grp === "Mellinam"
                    ? "border-sky-500/30 text-sky-400"
                    : "border-amber-500/30 text-amber-400";

                return (
                  <div key={grp} className="max-w-4xl mx-auto space-y-3">
                    <h3 className={`font-serif text-lg font-bold border-b pb-2 ${groupColor}`}>
                      {titleTa}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                      {items.map((m) => (
                        <motion.button
                          key={m.char}
                          whileHover={{ scale: 1.04 }}
                          onClick={() => speak(m.char)}
                          className="bg-zinc-950/90 rounded-2xl p-4 border border-zinc-800/80 hover:border-sky-500/50 shadow-xl text-left transition-colors group flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-baseline justify-between mb-1">
                              <span className="font-tamil text-3xl font-bold text-sky-400 group-hover:scale-105 transition-transform">
                                {m.char}
                              </span>
                              <Volume2 size={14} className="text-zinc-500 group-hover:text-sky-400" />
                            </div>
                            <span className="text-xs font-mono font-bold text-zinc-300">{m.tr}</span>
                          </div>

                          <div className="mt-3 pt-2 border-t border-zinc-800/60 text-[11px]">
                            <span className="font-tamil font-bold text-amber-400 block">{m.example.ta}</span>
                            <span className="text-zinc-400 font-light text-[10px] block">{m.example.en}</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}

          {/* =================================================================== */}
          {/* TAB 4: AYUTHAM */}
          {/* =================================================================== */}
          {activeTab === "ayutham" && (
            <motion.div
              key="ayutham"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-xl mx-auto"
            >
              <div className="bg-zinc-950/90 rounded-3xl p-8 border border-purple-500/40 shadow-2xl text-center space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mx-auto text-purple-400 font-tamil font-bold text-4xl">
                  ஃ
                </div>

                <div>
                  <h2 className="text-3xl font-serif font-bold text-zinc-100">
                    Ayutha Ezhuthu (ஆய்த எழுத்து)
                  </h2>
                  <p className="text-xs font-mono text-purple-400 mt-1">
                    The Special Character · Transliterated as 'ak' / 'eH'
                  </p>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed font-light text-left bg-zinc-900/80 p-4 rounded-2xl border border-zinc-800">
                  Represented by three distinct dots arranged in a triangle (ஃ), Ayutham is neither a standalone vowel nor a consonant. It modifies sound stress in classical Tamil words.
                </p>

                <div className="pt-4 border-t border-zinc-800/80 flex flex-col items-center gap-3">
                  <span className="text-xs font-mono text-zinc-400">Classic Usage Example:</span>
                  <button
                    onClick={() => speak("எஃகு")}
                    className="inline-flex items-center gap-3 bg-purple-500/10 border border-purple-500/30 px-6 py-3 rounded-xl hover:bg-purple-500/20 transition-all group cursor-pointer"
                  >
                    <span className="font-tamil text-2xl font-bold text-purple-300">எஃகு</span>
                    <span className="text-xs font-mono text-zinc-400">(eHku · Steel / Shield)</span>
                    <Volume2 size={16} className="text-purple-400 group-hover:animate-pulse" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* =================================================================== */}
          {/* TAB 5: 216 MATRIX GRID */}
          {/* =================================================================== */}
          {activeTab === "matrix" && (
            <motion.div
              key="matrix"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 max-w-5xl mx-auto"
            >
              <div className="text-center max-w-xl mx-auto mb-4">
                <h2 className="text-2xl font-serif text-amber-400">
                  216 Uyirmei Combination Matrix
                </h2>
                <p className="text-xs text-zinc-400 mt-1 font-mono">
                  Full 18 Consonants × 12 Vowels grid. Click any syllable cell to listen.
                </p>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-zinc-800/80 bg-zinc-950/90 p-3 shadow-2xl">
                <table className="border-collapse w-full text-center font-mono text-xs">
                  <thead>
                    <tr>
                      <th className="p-3 text-amber-400 bg-zinc-900 sticky left-0 rounded-l-xl font-bold">+</th>
                      {VOWEL_SIGNS.map((v) => (
                        <th key={v.vowelChar} className="p-3 text-zinc-400 uppercase font-bold">
                          {v.vowelChar} ({v.tr})
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {MEI_LIST.map((m) => (
                      <tr key={m.char} className="border-t border-zinc-900">
                        <td className="p-3 font-tamil text-xl font-bold text-amber-400 sticky left-0 bg-zinc-950 shadow-r">
                          {m.stem}
                        </td>
                        {VOWEL_SIGNS.map((v, j) => {
                          const combo = m.stem + v.sign;
                          return (
                            <td
                              key={j}
                              onClick={() => speak(combo)}
                              className="p-3 font-tamil text-xl text-zinc-200 hover:text-amber-300 cursor-pointer hover:bg-zinc-900 rounded-lg transition-colors"
                              title={`${m.stem} + ${v.vowelChar} = ${combo}`}
                            >
                              {combo}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* =================================================================== */}
          {/* TAB 6: OVERVIEW ARCHITECTURE */}
          {/* =================================================================== */}
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl mx-auto space-y-6"
            >
              <div className="bg-zinc-950/90 rounded-2xl p-6 border border-zinc-800/80 shadow-xl space-y-4">
                <h3 className="font-serif text-xl text-amber-400 font-bold">
                  The Logic of Tamil Script
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed font-light">
                  Unlike alphabetic scripts where letters sit side-by-side, Tamil is an <strong className="text-zinc-100">Abugida (alphasyllabary)</strong>. Consonants inherently carry a base vowel sound, and modifying vowel markers modify the syllable cleanly.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center">
                    <span className="font-tamil text-3xl font-bold text-emerald-400 block">12</span>
                    <span className="text-xs font-mono text-emerald-300 block mt-1 font-bold">Uyir (Vowels)</span>
                    <span className="text-[10px] text-zinc-400 font-light block mt-1">Stand-alone sounds</span>
                  </div>

                  <div className="p-4 rounded-xl bg-sky-500/10 border border-sky-500/30 text-center">
                    <span className="font-tamil text-3xl font-bold text-sky-400 block">18</span>
                    <span className="text-xs font-mono text-sky-300 block mt-1 font-bold">Mei (Consonants)</span>
                    <span className="text-[10px] text-zinc-400 font-light block mt-1">Pure consonant bodies</span>
                  </div>

                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center">
                    <span className="font-tamil text-3xl font-bold text-amber-400 block">216</span>
                    <span className="text-xs font-mono text-amber-300 block mt-1 font-bold">Uyirmei (Syllables)</span>
                    <span className="text-[10px] text-zinc-400 font-light block mt-1">Combined forms</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
