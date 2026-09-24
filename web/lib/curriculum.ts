"use client";
import { useEffect, useState } from "react";
import { api } from "./api";
import type { Curriculum } from "./types";

import fallbackCurriculum from "./curriculumData.json";

let cache: Curriculum | null = null;

export function useCurriculum() {
  const [data, setData] = useState<Curriculum | null>(cache || (fallbackCurriculum as unknown as Curriculum));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cache) return;
    api<Curriculum>("/api/curriculum")
      .then((d) => {
        cache = d;
        setData(d);
      })
      .catch(() => {
        // Gracefully use bundled curriculum JSON if backend API is not running
        cache = fallbackCurriculum as unknown as Curriculum;
        setData(cache);
      })
      .finally(() => setLoading(false));
  }, []);

  return { curriculum: data, loading };
}

export function getBestTamilVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  // 1. Exact match for ta-IN or ta
  const exact = voices.find(
    (v) => v.lang.toLowerCase() === "ta-in" || v.lang.toLowerCase() === "ta"
  );
  if (exact) return exact;

  // 2. Partial match for ta or tamil in name/lang
  const partial = voices.find(
    (v) => v.lang.toLowerCase().startsWith("ta") || v.name.toLowerCase().includes("tamil")
  );
  if (partial) return partial;

  return null;
}

import { speakTamil } from "./tts";

export function speak(text: string, options?: { rate?: number; onEnd?: () => void; onError?: () => void }) {
  speakTamil(text, {
    rate: options?.rate,
    onEnd: options?.onEnd,
    onError: options?.onError,
  });
}
