"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Mic,
  MicOff,
  Sparkles,
  Volume2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Trash2,
  ArrowLeft,
  Globe,
  Settings,
  Terminal,
  Activity,
  Play,
  Square,
  Cpu,
  Radio,
} from "lucide-react";
import SidebarNav from "@/components/SidebarNav";
import TamilSwarmCanvas from "@/components/TamilSwarmCanvas";
import { useSpeechToText, transcribeAudioBlob } from "@/lib/stt";
import { API_URL } from "@/lib/api";

type EventLog = {
  id: string;
  time: string;
  type: "info" | "success" | "warning" | "error" | "speech";
  message: string;
};

export default function SttLabPage() {
  // Environment Checks
  const [speechApiSupported, setSpeechApiSupported] = useState<boolean | null>(null);
  const [apiType, setApiType] = useState<string>("None");
  const [micPermission, setMicPermission] = useState<"unknown" | "granted" | "denied">("unknown");
  const [browserInfo, setBrowserInfo] = useState<string>("");
  const [backendSttStatus, setBackendSttStatus] = useState<{
    available: boolean;
    model_size?: string;
    error?: string;
  } | null>(null);

  // Configuration
  const [selectedLang, setSelectedLang] = useState<"ta-IN" | "en-IN" | "en-US">("ta-IN");

  // Audio Level Meter / Visualizer
  const [audioLevel, setAudioLevel] = useState<number>(0);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Whisper Backend Test Recording
  const [isWhisperRecording, setIsWhisperRecording] = useState(false);
  const [whisperTranscribing, setWhisperTranscribing] = useState(false);
  const [whisperResultText, setWhisperResultText] = useState("");
  const whisperRecorderRef = useRef<MediaRecorder | null>(null);
  const whisperChunksRef = useRef<Blob[]>([]);

  // Logs
  const [eventLogs, setEventLogs] = useState<EventLog[]>([]);

  const addLog = (type: EventLog["type"], message: string) => {
    const timestamp = new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      fractionalSecondDigits: 3,
    });
    setEventLogs((prev) => [
      {
        id: Math.random().toString(),
        time: timestamp,
        type,
        message,
      },
      ...prev.slice(0, 99),
    ]);
  };

  // Upgraded STT Hook with Whisper Fallback
  const stt = useSpeechToText({
    lang: selectedLang,
    interimResults: true,
    onResult: (text, isFinal) => {
      addLog(isFinal ? "speech" : "info", `${isFinal ? "💬 Final Result:" : "... Interim:"} "${text}"`);
    },
    onError: (err) => {
      addLog("error", `STT Error: ${err}`);
    },
  });

  // Check Backend STT Health on Mount
  const checkBackendStt = async () => {
    try {
      addLog("info", "Checking local backend Whisper STT service status...");
      const res = await fetch(`${API_URL}/api/stt/status`);
      if (res.ok) {
        const data = await res.json();
        setBackendSttStatus(data);
        addLog("success", `Backend Whisper STT: ${data.available ? "AVAILABLE" : "UNAVAILABLE"} (Model: ${data.model_size || "none"})`);
      } else {
        setBackendSttStatus({ available: false, error: `HTTP ${res.status}` });
        addLog("warning", `Backend STT status check returned HTTP ${res.status}`);
      }
    } catch (err: any) {
      console.warn("Backend STT status error:", err);
      setBackendSttStatus({ available: false, error: err.message });
      addLog("warning", `Backend STT reachability check failed: ${err.message}`);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBrowserInfo(navigator.userAgent);
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        setSpeechApiSupported(true);
        const name = (window as any).SpeechRecognition
          ? "Standard SpeechRecognition API"
          : "webkitSpeechRecognition (Chromium Prefix)";
        setApiType(name);
        addLog("info", `Browser Web Speech API detected: ${name}`);
      } else {
        setSpeechApiSupported(false);
        setApiType("Not Supported in this Browser");
        addLog("info", "Browser Web Speech API not supported; hybrid fallback will handle mic recording.");
      }

      checkBackendStt();
    }
  }, []);

  // Request Microphone Permissions via getUserMedia & start Volume Meter
  const requestMicPermission = async () => {
    addLog("info", "Requesting microphone permission via navigator.mediaDevices.getUserMedia...");
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        addLog("error", "navigator.mediaDevices.getUserMedia is unavailable in this browser context.");
        setMicPermission("denied");
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      setMicPermission("granted");
      addLog("success", "Microphone access GRANTED by browser! Audio tracks active.");
      setupAudioMeter(stream);
    } catch (err: any) {
      console.error("getUserMedia error:", err);
      setMicPermission("denied");
      addLog("error", `Microphone permission DENIED or Failed: ${err.name} - ${err.message}`);
    }
  };

  // Setup Audio Decibel Meter Visualizer
  const setupAudioMeter = (stream: MediaStream) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      const audioCtx = new AudioCtx();
      audioCtxRef.current = audioCtx;
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const updateVolume = () => {
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const avg = sum / dataArray.length;
        const normalized = Math.min(100, Math.round((avg / 128) * 100));
        setAudioLevel(normalized);
        animFrameRef.current = requestAnimationFrame(updateVolume);
      };

      updateVolume();
    } catch (e) {
      console.warn("Audio visualizer setup skipped:", e);
    }
  };

  const stopAudioMeter = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (audioCtxRef.current) {
      try {
        audioCtxRef.current.close();
      } catch (e) {}
      audioCtxRef.current = null;
    }
    setAudioLevel(0);
  };

  // Direct Whisper Backend Test Recording
  const startWhisperRecordingTest = async () => {
    setWhisperResultText("");
    whisperChunksRef.current = [];
    addLog("info", `Starting direct audio recording for local Whisper STT test (Lang: "${selectedLang}")...`);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setupAudioMeter(stream);

      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : "";

      const recorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);

      whisperRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          whisperChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = async () => {
        stopAudioMeter();
        stream.getTracks().forEach((t) => t.stop());

        const audioBlob = new Blob(whisperChunksRef.current, { type: recorder.mimeType || "audio/webm" });
        addLog("info", `Audio recording stopped. Blob size: ${(audioBlob.size / 1024).toFixed(1)} KB. Sending to backend Whisper...`);

        if (audioBlob.size < 500) {
          addLog("warning", "Audio recording was empty or too brief.");
          return;
        }

        setWhisperTranscribing(true);
        try {
          const res = await transcribeAudioBlob(audioBlob, selectedLang);
          addLog("success", `Whisper Backend Result: "${res.text}" (Detected: ${res.detected_language}, Prob: ${res.language_probability})`);
          setWhisperResultText(res.text || "(No speech recognized)");
        } catch (err: any) {
          addLog("error", `Whisper Backend Error: ${err.message}`);
          setWhisperResultText(`Error: ${err.message}`);
        } finally {
          setWhisperTranscribing(false);
        }
      };

      recorder.start(250);
      setIsWhisperRecording(true);
      addLog("success", "🔴 Recording active... Speak Tamil or English now!");
    } catch (err: any) {
      addLog("error", `Failed to start mic recording: ${err.message}`);
    }
  };

  const stopWhisperRecordingTest = () => {
    if (whisperRecorderRef.current && whisperRecorderRef.current.state !== "inactive") {
      whisperRecorderRef.current.stop();
    }
    setIsWhisperRecording(false);
  };

  const clearTranscripts = () => {
    stt.resetTranscript();
    setWhisperResultText("");
    addLog("info", "Cleared transcripts.");
  };

  return (
    <main className="min-h-screen bg-[#07070a] text-zinc-100 pb-24 relative overflow-x-hidden">
      <TamilSwarmCanvas />
      <SidebarNav />

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-8 space-y-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-900 pb-6">
          <div className="space-y-1">
            <Link
              href="/read-aloud"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 hover:text-amber-300 mb-2"
            >
              <ArrowLeft size={14} /> Back to Reading Aloud
            </Link>
            <h1 className="text-3xl font-serif font-bold text-zinc-100 tracking-tight flex items-center gap-2">
              <Sparkles className="text-amber-400" size={28} /> Speech-To-Text (STT) Diagnostic Laboratory
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 font-light">
              Interactive test bench combining Web Speech API inspection with local Faster-Whisper backend speech recognition.
            </p>
          </div>

          <button
            onClick={requestMicPermission}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold inline-flex items-center gap-2 border transition-all cursor-pointer ${
              micPermission === "granted"
                ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400"
                : "bg-amber-500 text-zinc-950 hover:bg-amber-400 border-amber-500 shadow-lg shadow-amber-500/20"
            }`}
          >
            <Mic size={16} />
            {micPermission === "granted" ? "Mic Access Granted" : "Grant Mic Access"}
          </button>
        </div>

        {/* Diagnostic Status Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Browser Web Speech API */}
          <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-5 space-y-3 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <Globe size={14} className="text-amber-400" /> Web Speech API
              </span>
              {speechApiSupported ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  <CheckCircle2 size={12} /> Ready
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-full">
                  <XCircle size={12} /> Unsupported
                </span>
              )}
            </div>
            <div className="text-sm font-semibold text-zinc-200 truncate">{apiType}</div>
            <div className="text-[11px] font-mono text-zinc-500 leading-relaxed">
              Provides real-time streaming speech recognition in Chrome, Edge, and Safari.
            </div>
          </div>

          {/* Card 2: Local Faster-Whisper Backend */}
          <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-5 space-y-3 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <Cpu size={14} className="text-cyan-400" /> Backend Whisper STT
              </span>
              {backendSttStatus?.available ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full">
                  <CheckCircle2 size={12} /> Active ({backendSttStatus.model_size})
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                  <RefreshCw size={12} className="animate-spin" /> Checking...
                </span>
              )}
            </div>
            <div className="text-sm font-semibold text-zinc-200 truncate">
              {backendSttStatus?.available ? `Whisper (${backendSttStatus.model_size} int8 CPU)` : "Connecting to FastAPI..."}
            </div>
            <div className="text-[11px] font-mono text-zinc-500 leading-relaxed">
              100% local offline speech recognition powered by Python Faster-Whisper.
            </div>
          </div>

          {/* Card 3: Mic Audio Signal Meter */}
          <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-5 space-y-3 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <Activity size={14} className="text-emerald-400" /> Audio Signal Level
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold">{audioLevel}%</span>
            </div>

            <div className="h-3.5 bg-zinc-950 border border-zinc-800 rounded-full overflow-hidden p-0.5 relative">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-rose-500 rounded-full transition-all duration-75"
                style={{ width: `${audioLevel}%` }}
              />
            </div>
            <div className="text-[11px] font-mono text-zinc-500 flex justify-between">
              <span>Silence</span>
              <span>Speak to test level</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* STT Controls & Practice Section */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-6 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
            <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
              <Radio className="text-amber-400" size={20} /> STT Practice & Test Controls
            </h2>

            {/* Language Selector */}
            <div className="flex items-center gap-3">
              <label className="text-xs font-mono text-zinc-400">Target Language:</label>
              <select
                value={selectedLang}
                onChange={(e) => {
                  const val = e.target.value as any;
                  setSelectedLang(val);
                  stt.setCurrentLang(val);
                  addLog("info", `Language changed to: ${val}`);
                }}
                className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 text-xs font-mono text-zinc-200 focus:outline-none focus:border-amber-400"
              >
                <option value="ta-IN">Tamil (ta-IN / தமிழ்)</option>
                <option value="en-IN">English (en-IN)</option>
                <option value="en-US">English (en-US)</option>
              </select>
            </div>
          </div>

          {/* Action Buttons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Button 1: Hybrid STT (useSpeechToText) */}
            <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400">Option 1: Universal Hybrid STT</span>
                {stt.isListening && <span className="animate-ping w-2 h-2 rounded-full bg-amber-400" />}
              </div>
              <p className="text-xs text-zinc-400">
                Uses real-time Web Speech with automatic local Whisper fallback on network drop.
              </p>
              <button
                onClick={stt.toggleListening}
                disabled={stt.isTranscribing}
                className={`w-full py-3 px-4 rounded-xl font-mono text-xs font-bold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                  stt.isListening
                    ? "bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/20 animate-pulse"
                    : "bg-amber-500 text-zinc-950 hover:bg-amber-400 border-amber-500 shadow-lg shadow-amber-500/20"
                }`}
              >
                {stt.isListening ? <Square size={16} /> : <Play size={16} />}
                {stt.isListening ? "Stop Hybrid STT" : "Start Hybrid STT Test"}
              </button>
            </div>

            {/* Button 2: Direct Local Whisper Test */}
            <div className="bg-zinc-950/80 border border-zinc-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400">Option 2: Direct Whisper Audio Test</span>
                {isWhisperRecording && <span className="animate-ping w-2 h-2 rounded-full bg-cyan-400" />}
              </div>
              <p className="text-xs text-zinc-400">
                Records mic clip via MediaRecorder and transcribes directly using python Faster-Whisper.
              </p>
              <button
                onClick={isWhisperRecording ? stopWhisperRecordingTest : startWhisperRecordingTest}
                disabled={whisperTranscribing}
                className={`w-full py-3 px-4 rounded-xl font-mono text-xs font-bold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                  isWhisperRecording
                    ? "bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/20 animate-pulse"
                    : whisperTranscribing
                    ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/40"
                    : "bg-cyan-500 text-zinc-950 hover:bg-cyan-400 border-cyan-500 shadow-lg shadow-cyan-500/20"
                }`}
              >
                {whisperTranscribing ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" /> Transcribing with Whisper...
                  </>
                ) : isWhisperRecording ? (
                  <>
                    <Square size={16} /> Stop & Transcribe Audio
                  </>
                ) : (
                  <>
                    <Mic size={16} /> Record & Transcribe via Whisper
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Transcribed Text Display Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                Recognized Text Output:
              </span>
              <button
                onClick={clearTranscripts}
                className="text-xs font-mono text-zinc-500 hover:text-zinc-300 flex items-center gap-1 cursor-pointer"
              >
                <Trash2 size={12} /> Clear Output
              </button>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 min-h-[120px] font-sans text-base leading-relaxed text-zinc-100 flex flex-col justify-between relative overflow-hidden">
              {stt.isTranscribing || whisperTranscribing ? (
                <div className="flex items-center justify-center py-6 gap-3 text-cyan-400 font-mono text-sm">
                  <RefreshCw size={18} className="animate-spin" />
                  Local Whisper is transcribing your speech...
                </div>
              ) : stt.fullTranscript || whisperResultText ? (
                <div className="space-y-3">
                  {stt.fullTranscript && (
                    <div className="text-amber-200">
                      <span className="text-xs font-mono text-amber-500 block mb-1">Hybrid STT Output:</span>
                      {stt.fullTranscript}
                    </div>
                  )}
                  {whisperResultText && (
                    <div className="text-cyan-200">
                      <span className="text-xs font-mono text-cyan-500 block mb-1">Direct Whisper Output:</span>
                      {whisperResultText}
                    </div>
                  )}
                </div>
              ) : (
                <span className="text-zinc-600 italic text-sm">
                  Click one of the test buttons above and speak into your microphone in Tamil or English...
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Real-time Event Logger Terminal */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-4 backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Terminal size={14} /> Diagnostic Event Logger & Console
            </span>
            <span className="text-xs font-mono text-zinc-500">{eventLogs.length} events logged</span>
          </div>

          <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-4 font-mono text-xs max-h-72 overflow-y-auto space-y-1.5 selection:bg-amber-500 selection:text-black">
            {eventLogs.length === 0 ? (
              <span className="text-zinc-700 italic">No events recorded yet.</span>
            ) : (
              eventLogs.map((log) => (
                <div key={log.id} className="flex items-start gap-2.5 leading-snug">
                  <span className="text-zinc-600 shrink-0 text-[10px]">{log.time}</span>
                  <span
                    className={`break-all ${
                      log.type === "success"
                        ? "text-emerald-400"
                        : log.type === "error"
                        ? "text-rose-400 font-bold"
                        : log.type === "warning"
                        ? "text-amber-400"
                        : log.type === "speech"
                        ? "text-cyan-300 font-semibold"
                        : "text-zinc-400"
                    }`}
                  >
                    {log.message}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
