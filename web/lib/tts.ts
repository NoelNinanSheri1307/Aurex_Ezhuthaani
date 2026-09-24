import { API_URL } from "./api";

let activeAudio: HTMLAudioElement | null = null;
let activeObjectUrl: string | null = null;
let currentEngine: "piper" | "browser" | null = null;
let currentPlaybackId = 0;

export interface SpeakOptions {
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: unknown) => void;
  rate?: number;
}

/**
 * Stop any ongoing speech playback (both Piper audio element and browser speechSynthesis).
 */
export function stopSpeech(): void {
  currentPlaybackId++; // Invalidate any pending async fetches

  if (activeAudio) {
    try {
      activeAudio.pause();
      activeAudio.onended = null;
      activeAudio.onerror = null;
      activeAudio.src = "";
    } catch {
      // Ignore audio cleanup errors
    }
    activeAudio = null;
  }

  if (activeObjectUrl) {
    try {
      URL.revokeObjectURL(activeObjectUrl);
    } catch {
      // Ignore URL revocation errors
    }
    activeObjectUrl = null;
  }

  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // Ignore speechSynthesis cleanup errors
    }
  }

  currentEngine = null;
}

/**
 * Returns the currently active TTS engine ("piper", "browser", or null).
 */
export function getCurrentTtsEngine(): "piper" | "browser" | null {
  return currentEngine;
}

/**
 * Helper to check if text contains Tamil characters.
 */
export function containsTamil(text: string): boolean {
  return /[\u0B80-\u0BFF]/.test(text);
}

/**
 * Quick check if the backend Piper TTS service is reachable and loaded.
 */
export async function isPiperAvailable(): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(`${API_URL}/api/tts/status`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    if (!res.ok) return false;
    const data = await res.json();
    return Boolean(data?.available);
  } catch {
    return false;
  }
}

/**
 * Fallback to browser-native SpeechSynthesis (ta-IN or default).
 * Exported explicitly for TTS benchmarking and pitch comparison.
 */
export function speakGenericBrowser(text: string, options?: SpeakOptions, lang = "ta-IN"): void {
  const cleanText = (text || "").trim();
  if (!cleanText) return;

  stopSpeech();

  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    options?.onError?.(new Error("Browser speech synthesis not supported"));
    return;
  }

  try {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = lang;
    utterance.rate = options?.rate ?? 0.85;

    const voices = window.speechSynthesis.getVoices();
    const targetVoice =
      voices.find((v) => v.lang === lang || v.lang.startsWith(lang.slice(0, 2))) ||
      voices.find((v) => v.lang.includes("ta"));

    if (targetVoice) {
      utterance.voice = targetVoice;
    }

    utterance.onstart = () => {
      currentEngine = "browser";
      options?.onStart?.();
    };

    utterance.onend = () => {
      currentEngine = null;
      options?.onEnd?.();
    };

    utterance.onerror = (e) => {
      currentEngine = null;
      options?.onError?.(e);
    };

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    currentEngine = null;
    options?.onError?.(err);
  }
}

/**
 * Explicitly synthesize and play audio using backend Piper Valluvar Neural Model.
 * Does NOT fallback to browser speech, allowing exact neural quality inspection.
 */
export async function speakPiperNeural(text: string, options?: SpeakOptions): Promise<void> {
  const cleanText = (text || "").trim();
  if (!cleanText) return;

  stopSpeech();

  currentPlaybackId++;
  const thisPlaybackId = currentPlaybackId;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(`${API_URL}/api/tts/synthesize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: cleanText }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (thisPlaybackId !== currentPlaybackId) return;

    if (!res.ok) {
      throw new Error(`Piper TTS endpoint returned status ${res.status}`);
    }

    const blob = await res.blob();
    if (thisPlaybackId !== currentPlaybackId) return;

    if (!blob || blob.size === 0) {
      throw new Error("Empty audio response from Piper TTS");
    }

    const objectUrl = URL.createObjectURL(blob);
    activeObjectUrl = objectUrl;

    const audio = new Audio(objectUrl);
    activeAudio = audio;

    audio.onplay = () => {
      if (thisPlaybackId !== currentPlaybackId) {
        audio.pause();
        return;
      }
      currentEngine = "piper";
      options?.onStart?.();
    };

    audio.onended = () => {
      if (activeAudio === audio) {
        stopSpeech();
      }
      options?.onEnd?.();
    };

    audio.onerror = (e) => {
      if (activeAudio === audio) {
        stopSpeech();
      }
      options?.onError?.(e);
    };

    await audio.play();
  } catch (err) {
    if (thisPlaybackId === currentPlaybackId) {
      stopSpeech();
      options?.onError?.(err);
    }
  }
}


/**
 * Primary text-to-speech function for Ezhuthaani.
 * Uses Piper Valluvar Neural TTS as primary engine for Tamil text,
 * automatically falling back to browser speechSynthesis if Piper is unavailable or fails.
 */
export async function speakTamil(text: string, options?: SpeakOptions): Promise<void> {
  const cleanText = (text || "").trim();
  if (!cleanText) return;

  // Always stop previous speech before starting new utterance
  stopSpeech();

  // Assign a unique playback token to guard against async fetch races
  currentPlaybackId++;
  const thisPlaybackId = currentPlaybackId;

  // If text doesn't contain Tamil characters, use browser speech directly
  if (!containsTamil(cleanText)) {
    speakGenericBrowser(cleanText, options, "en-US");
    return;
  }

  // Attempt Piper Backend Synthesis
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(`${API_URL}/api/tts/synthesize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: cleanText }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    // Abort if another speakTamil call was made while fetching
    if (thisPlaybackId !== currentPlaybackId) {
      return;
    }

    if (!res.ok) {
      throw new Error(`Piper TTS endpoint returned status ${res.status}`);
    }

    const blob = await res.blob();
    if (thisPlaybackId !== currentPlaybackId) {
      return;
    }

    if (!blob || blob.size === 0) {
      throw new Error("Empty audio response from Piper TTS");
    }

    const objectUrl = URL.createObjectURL(blob);
    activeObjectUrl = objectUrl;

    const audio = new Audio(objectUrl);
    activeAudio = audio;

    audio.onplay = () => {
      if (thisPlaybackId !== currentPlaybackId) {
        audio.pause();
        return;
      }
      currentEngine = "piper";
      console.log("[Ezhuthaani TTS] Engine: PIPER Valluvar Neural TTS");
      options?.onStart?.();
    };

    audio.onended = () => {
      if (activeAudio === audio) {
        stopSpeech();
      }
      options?.onEnd?.();
    };

    audio.onerror = (e) => {
      console.warn("[Ezhuthaani TTS] Piper audio playback failed, triggering browser fallback:", e);
      if (activeAudio === audio) {
        stopSpeech();
        speakGenericBrowser(cleanText, options, "ta-IN");
      }
    };

    await audio.play();
  } catch (err) {
    if (thisPlaybackId === currentPlaybackId) {
      console.warn("[Ezhuthaani TTS] Piper synthesis request failed, triggering browser fallback:", err);
      stopSpeech();
      speakGenericBrowser(cleanText, options, "ta-IN");
    }
  }
}
