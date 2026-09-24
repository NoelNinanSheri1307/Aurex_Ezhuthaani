"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  speakGenericBrowser,
  speakPiperNeural,
  stopSpeech,
  getCurrentTtsEngine,
} from "@/lib/tts";
import { API_URL } from "@/lib/api";
import {
  Volume2,
  Square,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Sparkles,
  Layers,
  ArrowLeft,
  Cpu,
  Globe,
  Radio,
  Sliders,
  Check,
  X,
  Award,
} from "lucide-react";

const BENCHMARK_SAMPLES = [
  {
    id: "zha-phonemes",
    label: "1. Special Tamil Phonemes ('ழ', 'ள', 'ற', 'ண')",
    text: "தமிழ் எழுத்துகளில் ழ, ள, ற, ண, ங, ஞ போன்ற ஒலிகள் தனித்துவமானவை.",
    judgeTip: "Notice how generic browser TTS mispronounces 'ழ' (zha), whereas Ezhuthaani Piper Neural model pronounces native retroflex 'ழ' correctly!",
  },
  {
    id: "thirukkural",
    label: "2. Thirukkural Meter & Rhythm",
    text: "அகர முதல எழுத்தெல்லாம் ஆதி பகவன் முதற்றே உலகு.",
    judgeTip: "Notice the rhythm and cadence difference in classical Tamil poetry reading.",
  },
  {
    id: "children-rhyme",
    label: "3. Children Rhyme & Storybook Expression",
    text: "மழை வந்தது மழை வந்தது! யானை குடை பிடித்தது! மரம் பச்சை ஆனது!",
    judgeTip: "Hear the friendly, natural intonation suited for young Tamil learners.",
  },
  {
    id: "daily-greeting",
    label: "4. Daily Conversation & Greeting",
    text: "வணக்கம்! நீங்கள் தமிழ் மொழியை எளிதாகக் கற்கலாம். வாழ்த்துகள்!",
    judgeTip: "Compare sentence pacing and clarity.",
  },
];

export default function TtsLabPage() {
  const [inputText, setInputText] = useState(BENCHMARK_SAMPLES[0].text);
  const [activeSampleId, setActiveSampleId] = useState(BENCHMARK_SAMPLES[0].id);
  const [status, setStatus] = useState<{ available: boolean; model_path?: string; sample_rate?: number } | null>(null);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [playingEngine, setPlayingEngine] = useState<"generic" | "piper" | null>(null);

  const checkStatus = async () => {
    setLoadingStatus(true);
    try {
      const res = await fetch(`${API_URL}/api/tts/status`);
      if (res.ok) {
        const data = await res.json();
        setStatus(data);
      } else {
        setStatus({ available: false });
      }
    } catch {
      setStatus({ available: false });
    } finally {
      setLoadingStatus(false);
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  // Play Generic Browser TTS (Web Speech API)
  const handlePlayGeneric = (textToSpeak?: string) => {
    const text = textToSpeak || inputText;
    if (!text.trim()) return;

    stopSpeech();
    setPlayingEngine("generic");

    speakGenericBrowser(text, {
      onStart: () => setPlayingEngine("generic"),
      onEnd: () => setPlayingEngine(null),
      onError: (err) => {
        setPlayingEngine(null);
        console.warn("Generic TTS playback error:", err);
      },
    });
  };

  // Play Custom Ezhuthaani Piper Neural Voice
  const handlePlayPiper = async (textToSpeak?: string) => {
    const text = textToSpeak || inputText;
    if (!text.trim()) return;

    stopSpeech();
    setPlayingEngine("piper");

    await speakPiperNeural(text, {
      onStart: () => setPlayingEngine("piper"),
      onEnd: () => setPlayingEngine(null),
      onError: (err) => {
        setPlayingEngine(null);
        console.warn("Piper Neural TTS playback error:", err);
      },
    });
  };

  const handleStop = () => {
    stopSpeech();
    setPlayingEngine(null);
  };

  return (
    <div className="min-h-screen bg-[#07070a] text-zinc-100 font-sans p-4 sm:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
          <div className="space-y-1">
            <Link
              href="/journey"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-amber-400 transition-colors mb-2"
            >
              <ArrowLeft size={14} /> Back to Journey
            </Link>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white flex items-center gap-3">
              <Cpu className="text-amber-400" size={32} /> TTS Voice Benchmark & Judge Lab
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm font-mono">
              Compare Generic Browser TTS vs. Ezhuthaani Neural Piper Voice Model side-by-side
            </p>
          </div>

          <button
            onClick={checkStatus}
            className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md"
          >
            <RefreshCw size={14} className={loadingStatus ? "animate-spin" : ""} /> Refresh Backend Model
          </button>
        </div>

        {/* Backend Model Readiness Status */}
        <div className="p-5 rounded-3xl bg-zinc-900/90 border border-zinc-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Layers size={22} />
            </div>
            <div>
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block">
                Backend Neural Engine
              </span>
              <h3 className="text-sm sm:text-base font-bold text-zinc-100">
                Piper Valluvar Neural Model (ONNX Server)
              </h3>
            </div>
          </div>

          {loadingStatus ? (
            <span className="text-xs font-mono text-zinc-400 animate-pulse">Checking status...</span>
          ) : status?.available ? (
            <div className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold flex items-center gap-2">
              <CheckCircle2 size={15} /> Piper Model Loaded & Online
            </div>
          ) : (
            <div className="px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono font-bold flex items-center gap-2">
              <XCircle size={15} /> Backend Model Offline (Simulated Fallback)
            </div>
          )}
        </div>

        {/* Preset Benchmark Sentences for Pitch Demonstration */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
            Select Pitch Demonstration Benchmark Sample:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {BENCHMARK_SAMPLES.map((sample) => {
              const isSelected = activeSampleId === sample.id;
              return (
                <div
                  key={sample.id}
                  onClick={() => {
                    setActiveSampleId(sample.id);
                    setInputText(sample.text);
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? "bg-amber-500/10 border-amber-500/60 text-amber-200 shadow-lg shadow-amber-500/10"
                      : "bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:border-zinc-700"
                  }`}
                >
                  <span className="text-xs font-mono font-bold block text-amber-400">{sample.label}</span>
                  <p className="font-tamil text-sm text-zinc-100 line-clamp-2 leading-relaxed">{sample.text}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Test Input Text Area */}
        <div className="space-y-2 bg-zinc-900/90 p-5 rounded-3xl border border-zinc-800 shadow-xl">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">
              Active Tamil Text for Comparison:
            </label>
            {playingEngine && (
              <button
                onClick={handleStop}
                className="px-3 py-1 rounded-xl bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/40 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Square size={13} /> Stop Playing
              </button>
            )}
          </div>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={3}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-white text-base focus:outline-none focus:border-amber-500 font-tamil leading-relaxed"
          />
        </div>

        {/* SIDE-BY-SIDE COMPARISON PLAYERS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* PLAYER CARD 1: GENERIC BROWSER TTS */}
          <div className="p-6 rounded-3xl bg-zinc-900/90 border border-zinc-800 space-y-5 shadow-2xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono font-bold uppercase">
                  <Globe size={16} /> Generic Browser TTS
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-400 text-[10px] font-mono">
                  Web Speech API
                </span>
              </div>

              <h2 className="text-lg font-bold text-zinc-200">Standard OS Voice Fallback</h2>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Uses the default browser `SpeechSynthesisUtterance`. High variance across devices, robotic timbre, and frequent mispronunciations of complex Tamil letters (e.g. ழ).
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-800 space-y-4">
              <button
                onClick={() => handlePlayGeneric()}
                className={`w-full py-3.5 px-4 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                  playingEngine === "generic"
                    ? "bg-rose-500 text-white animate-pulse border border-rose-400"
                    : "bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700"
                }`}
              >
                <Volume2 size={18} />
                <span>{playingEngine === "generic" ? "Playing Generic Voice..." : "Play Generic Browser TTS"}</span>
              </button>

              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 text-[11px] font-mono text-zinc-400 space-y-1">
                <span className="text-amber-400 font-bold block">Judge Observation:</span>
                <p>Listen for mechanical pauses and inaccurate pronunciation of Tamil letters like 'ழ' (zha).</p>
              </div>
            </div>
          </div>

          {/* PLAYER CARD 2: EZHUTHAANI PIPER NEURAL MODEL */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-950/40 via-zinc-900 to-zinc-950 border-2 border-amber-500/50 space-y-5 shadow-2xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold uppercase">
                  <Sparkles size={16} /> Ezhuthaani Neural Model
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-mono font-bold">
                  Piper Valluvar Model
                </span>
              </div>

              <h2 className="text-lg font-bold text-zinc-100">Custom Neural Voice Model</h2>
              <p className="text-xs text-amber-100/80 leading-relaxed font-light">
                Uses our custom-trained Piper Valluvar Neural Speech Synthesis model. Delivers authentic Tamil phoneme accuracy, natural cadence, and child-friendly pitch contours.
              </p>
            </div>

            <div className="pt-4 border-t border-amber-500/20 space-y-4">
              <button
                onClick={() => handlePlayPiper()}
                className={`w-full py-3.5 px-4 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20 ${
                  playingEngine === "piper"
                    ? "bg-amber-400 text-zinc-950 animate-pulse border border-amber-300"
                    : "bg-amber-500 hover:bg-amber-400 text-zinc-950"
                }`}
              >
                <Volume2 size={18} />
                <span>{playingEngine === "piper" ? "Playing Ezhuthaani Neural..." : "Play Ezhuthaani Piper Voice"}</span>
              </button>

              <div className="p-3 rounded-xl bg-zinc-950 border border-amber-500/30 text-[11px] font-mono text-amber-200 space-y-1">
                <span className="text-amber-400 font-bold block">Why We Built This:</span>
                <p>Native Tamil acoustic modeling ensures children learn correct Tamil pronunciation from day one.</p>
              </div>
            </div>
          </div>
        </div>

        {/* COMPARISON MATRIX FOR HACKATHON PITCH */}
        <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold font-mono text-amber-400 uppercase tracking-wider flex items-center gap-2">
            <Award size={18} /> Technical Comparison Matrix (For Hackathon Pitching)
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono text-left text-zinc-300">
              <thead className="bg-zinc-950 text-amber-400 uppercase text-[10px] tracking-wider border-b border-zinc-800">
                <tr>
                  <th className="p-3">Evaluation Metric</th>
                  <th className="p-3">Generic Browser TTS</th>
                  <th className="p-3">Ezhuthaani Piper Neural Model</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/80">
                <tr>
                  <td className="p-3 font-bold text-zinc-200">Tamil Phoneme Precision ('ழ' / 'ற')</td>
                  <td className="p-3 text-rose-400 flex items-center gap-1.5">
                    <X size={14} /> Variable / Incorrect Inflection
                  </td>
                  <td className="p-3 text-emerald-400 font-bold flex items-center gap-1.5">
                    <Check size={14} /> Native Retroflex Precision
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-zinc-200">Natural Cadence & Rhythm</td>
                  <td className="p-3 text-rose-400 flex items-center gap-1.5">
                    <X size={14} /> Monotone / Mechanical Pauses
                  </td>
                  <td className="p-3 text-emerald-400 font-bold flex items-center gap-1.5">
                    <Check size={14} /> Human-like Pitch Contour
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-zinc-200">Device Consistency</td>
                  <td className="p-3 text-zinc-400 flex items-center gap-1.5">
                    <X size={14} /> Inconsistent across OS/Browsers
                  </td>
                  <td className="p-3 text-emerald-400 font-bold flex items-center gap-1.5">
                    <Check size={14} /> Guaranteed Uniform Quality
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-zinc-200">Pedagogical Value for Kids</td>
                  <td className="p-3 text-zinc-400">Hard to understand for young learners</td>
                  <td className="p-3 text-amber-300 font-bold">Engaging, clear & authentic audio</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
