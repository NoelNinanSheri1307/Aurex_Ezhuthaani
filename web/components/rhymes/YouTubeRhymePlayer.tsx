"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, AlertCircle, Play } from "lucide-react";
import { stopSpeech } from "@/lib/tts";

interface YouTubeRhymePlayerProps {
  youtubeId: string | null;
  titleTa?: string;
  titleEn?: string;
  onClose: () => void;
}

export default function YouTubeRhymePlayer({
  youtubeId,
  titleTa,
  titleEn,
  onClose,
}: YouTubeRhymePlayerProps) {
  const [embedError, setEmbedError] = useState(false);

  useEffect(() => {
    if (youtubeId) {
      // Stop any ongoing Piper/browser TTS playback when video opens
      stopSpeech();
      setEmbedError(false);
    }
  }, [youtubeId]);

  if (!youtubeId) return null;

  const embedUrl = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl space-y-0 relative"
        >
          {/* Top Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/80">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
                <Play size={16} />
              </div>
              <div>
                <h3 className="text-base font-bold font-tamil text-zinc-100 leading-tight">
                  {titleTa || "Tamil Video Rhyme"}
                </h3>
                {titleEn && <p className="text-xs font-mono text-zinc-400">{titleEn}</p>}
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 border border-zinc-800 transition-colors cursor-pointer"
              title="Close Video"
            >
              <X size={18} />
            </button>
          </div>

          {/* 16:9 Video Container */}
          <div className="relative w-full aspect-video bg-black flex items-center justify-center">
            {!embedError ? (
              <iframe
                src={embedUrl}
                title={titleTa || "Tamil Video Rhyme"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onError={() => setEmbedError(true)}
                className="w-full h-full border-0"
              />
            ) : (
              <div className="p-6 text-center space-y-3">
                <AlertCircle size={32} className="text-amber-400 mx-auto" />
                <p className="text-sm font-tamil text-zinc-200">
                  இந்த வீடியோவை இங்கே இயக்க முடியவில்லை.
                </p>
                <a
                  href={`https://www.youtube.com/watch?v=${youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono font-bold text-xs transition-colors cursor-pointer"
                >
                  <span>YouTube தளத்தில் பார்க்க</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
