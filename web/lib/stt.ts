"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { API_URL } from "./api";

export interface SpeechToTextOptions {
  lang?: "ta-IN" | "en-IN" | "en-US";
  continuous?: boolean;
  interimResults?: boolean;
  onResult?: (transcript: string, isFinal: boolean) => void;
  onError?: (error: string) => void;
}

/**
 * Transcribe an audio Blob using local backend Whisper STT
 */
export async function transcribeAudioBlob(
  audioBlob: Blob,
  lang: string = "ta-IN"
): Promise<{ text: string; detected_language?: string; language_probability?: number; duration?: number }> {
  const formData = new FormData();
  formData.append("file", audioBlob, "recording.webm");
  
  const cleanLang = lang.startsWith("ta") ? "ta" : "en";
  formData.append("language", cleanLang);

  const res = await fetch(`${API_URL}/api/stt/transcribe`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Transcription service error (${res.status}): ${errorText}`);
  }

  return await res.json();
}

export function useSpeechToText(options: SpeechToTextOptions = {}) {
  const {
    lang = "ta-IN",
    interimResults = true,
    onResult,
    onError,
  } = options;

  const [isListening, setIsListening] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [currentLang, setCurrentLang] = useState<"ta-IN" | "en-IN" | "en-US">(lang);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const shouldListenRef = useRef(false);
  const accumulatedRef = useRef("");
  const gotWebSpeechResultRef = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const supported = !!SpeechRecognition || (!!navigator.mediaDevices && !!window.MediaRecorder);
      setSpeechSupported(supported);
    }
  }, []);

  const cleanupAudioRecording = useCallback(() => {
    if (mediaRecorderRef.current) {
      try {
        if (mediaRecorderRef.current.state !== "inactive") {
          mediaRecorderRef.current.stop();
        }
      } catch (e) {}
      mediaRecorderRef.current = null;
    }

    if (mediaStreamRef.current) {
      try {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      } catch (e) {}
      mediaStreamRef.current = null;
    }
  }, []);

  const stopListening = useCallback(async () => {
    shouldListenRef.current = false;

    // 1. Stop Web Speech Recognition if active
    if (recognitionRef.current) {
      try {
        const inst = recognitionRef.current;
        recognitionRef.current = null;
        inst.onstart = null;
        inst.onresult = null;
        inst.onerror = null;
        inst.onend = null;
        inst.stop();
      } catch (e) {}
    }

    setIsListening(false);
    setInterimTranscript("");

    // 2. Process MediaRecorder audio blob via backend Whisper for high accuracy Tamil & English
    const chunks = [...audioChunksRef.current];
    cleanupAudioRecording();

    if (chunks.length > 0) {
      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : MediaRecorder.isTypeSupported("audio/mp4")
        ? "audio/mp4"
        : "audio/ogg";
      const audioBlob = new Blob(chunks, { type: mimeType });

      if (audioBlob.size > 800) {
        setIsTranscribing(true);
        try {
          console.log("[STT] Transcribing audio blob via Whisper 'small' model with Tamil prompt priming...");
          const res = await transcribeAudioBlob(audioBlob, currentLang);
          if (res.text && res.text.trim()) {
            const finalWhisperText = res.text.trim();
            setTranscript(finalWhisperText);
            setInterimTranscript("");
            if (onResult) onResult(finalWhisperText, true);
          }
        } catch (err: any) {
          console.warn("[STT] Backend Whisper transcription error:", err);
          if (!accumulatedRef.current) {
            const msg = "Transcription failed. Please try speaking again.";
            setErrorMessage(msg);
            if (onError) onError(msg);
          }
        } finally {
          setIsTranscribing(false);
        }
      }
    }
  }, [cleanupAudioRecording, currentLang, onResult, onError]);

  const startListening = useCallback(
    async (customLang?: "ta-IN" | "en-IN" | "en-US") => {
      if (typeof window === "undefined") return;

      const activeLang = customLang || currentLang;
      shouldListenRef.current = true;
      gotWebSpeechResultRef.current = false;
      setErrorMessage(null);
      audioChunksRef.current = [];

      // 1. Obtain Microphone Stream & start MediaRecorder
      let stream: MediaStream | null = null;
      try {
        if (navigator.mediaDevices?.getUserMedia) {
          stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          mediaStreamRef.current = stream;

          if (window.MediaRecorder) {
            const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
              ? "audio/webm;codecs=opus"
              : MediaRecorder.isTypeSupported("audio/webm")
              ? "audio/webm"
              : "";
            
            const recorder = mimeType
              ? new MediaRecorder(stream, { mimeType })
              : new MediaRecorder(stream);

            recorder.ondataavailable = (event) => {
              if (event.data && event.data.size > 0) {
                audioChunksRef.current.push(event.data);
              }
            };
            recorder.start(200); // collect 200ms audio slices
            mediaRecorderRef.current = recorder;
          }
        }
      } catch (err: any) {
        console.warn("[STT] getUserMedia error:", err);
        if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
          const msg = "Microphone permission denied. Please allow microphone access in browser settings.";
          setErrorMessage(msg);
          if (onError) onError(msg);
          setIsListening(false);
          shouldListenRef.current = false;
          return;
        }
      }

      setIsListening(true);

      // 2. Attempt Browser Web Speech Recognition as fast real-time interim display layer
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        try {
          if (recognitionRef.current) {
            try {
              const old = recognitionRef.current;
              recognitionRef.current = null;
              old.stop();
            } catch (e) {}
          }

          const recognition = new SpeechRecognition();
          recognitionRef.current = recognition;
          recognition.lang = activeLang;
          recognition.continuous = false;
          recognition.interimResults = interimResults;
          recognition.maxAlternatives = 1;

          recognition.onresult = (event: any) => {
            let interimChunk = "";

            for (let i = event.resultIndex; i < event.results.length; ++i) {
              const res = event.results[i];
              const text = res[0]?.transcript || "";
              if (!res.isFinal && text.trim()) {
                interimChunk += text;
              }
            }

            if (interimChunk.trim()) {
              setInterimTranscript(interimChunk);
              if (onResult) onResult(interimChunk, false);
            }
          };

          recognition.onerror = (event: any) => {
            const errCode = event.error || "unknown_error";
            console.warn("[STT] Browser SpeechRecognition event error:", errCode);
          };

          recognition.onend = () => {};

          recognition.start();
        } catch (err: any) {
          console.warn("[STT] Could not start browser SpeechRecognition:", err);
        }
      }
    },
    [currentLang, interimResults, onResult, onError]
  );

  const resetTranscript = useCallback(() => {
    accumulatedRef.current = "";
    audioChunksRef.current = [];
    gotWebSpeechResultRef.current = false;
    setTranscript("");
    setInterimTranscript("");
    setErrorMessage(null);
  }, []);

  const toggleListening = useCallback(() => {
    if (isListening || shouldListenRef.current) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  return {
    isListening,
    isTranscribing,
    transcript,
    interimTranscript,
    fullTranscript: (transcript || interimTranscript).trim(),
    speechSupported,
    errorMessage,
    currentLang,
    setCurrentLang,
    startListening,
    stopListening,
    toggleListening,
    resetTranscript,
  };
}
