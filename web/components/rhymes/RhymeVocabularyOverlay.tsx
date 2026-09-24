"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Volume2, X } from "lucide-react";
import { speakTamil } from "@/lib/tts";

interface RhymeVocabularyOverlayProps {
  selectedItem: {
    tamil: string;
    transliteration: string;
    english: string;
  } | null;
  onClose: () => void;
}

export default function RhymeVocabularyOverlay({
  selectedItem,
  onClose,
}: RhymeVocabularyOverlayProps) {
  if (!selectedItem) return null;

  const handleSpeak = () => {
    speakTamil(selectedItem.tamil);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="p-5 sm:p-6 rounded-3xl bg-white/95 border-4 border-yellow-400 shadow-2xl space-y-4 max-w-sm w-full mx-auto relative backdrop-blur-xl text-center"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-sky-100 hover:bg-sky-200 text-blue-950 transition-colors cursor-pointer"
          title="Close vocabulary overlay"
        >
          <X size={16} />
        </button>

        {/* Tamil Vocabulary Display */}
        <div className="space-y-1 pt-2">
          <h2 className="text-4xl sm:text-5xl font-extrabold font-tamil text-blue-950 leading-tight">
            {selectedItem.tamil}
          </h2>
          <p className="text-sm font-mono text-blue-800 font-bold">
            {selectedItem.transliteration}
          </p>
          <p className="text-xs font-sans text-zinc-600 font-medium">
            {selectedItem.english}
          </p>
        </div>

        {/* Audio Listen Button */}
        <button
          onClick={handleSpeak}
          className="w-full py-3 px-4 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-zinc-950 font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-yellow-400/30"
        >
          <Volume2 size={18} />
          <span>Listen in Tamil</span>
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
