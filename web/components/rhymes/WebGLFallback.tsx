"use client";

import { motion } from "framer-motion";
import { InteractiveObjectMeta } from "@/lib/rhymes";
import { Volume2, BookOpen } from "lucide-react";

interface WebGLFallbackProps {
  interactiveObjects: InteractiveObjectMeta[];
  onObjectSelect: (objectId: string) => void;
  selectedObjectId: string | null;
}

export default function WebGLFallback({
  interactiveObjects,
  onObjectSelect,
  selectedObjectId,
}: WebGLFallbackProps) {
  return (
    <div className="w-full min-h-[420px] rounded-3xl bg-gradient-to-br from-emerald-950/90 via-slate-900 to-amber-950/80 border border-amber-500/30 p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
      {/* Background Graphic Accents */}
      <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      {/* Title Header */}
      <div className="space-y-1 z-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono">
          <BookOpen size={14} /> 2D Storybook Canvas
        </div>
        <h3 className="text-xl sm:text-2xl font-bold font-tamil text-zinc-100">
          தொட்டு விளையாடுங்கள் (Touch to Explore)
        </h3>
        <p className="text-xs text-zinc-400 font-mono">
          Tap any object below to hear its Tamil name and learn pronunciation.
        </p>
      </div>

      {/* Grid of Interactive Storybook Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 my-6 z-10">
        {interactiveObjects.map((obj) => {
          const isSelected = selectedObjectId === obj.objectId;
          return (
            <motion.button
              key={obj.objectId}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onObjectSelect(obj.objectId)}
              className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                isSelected
                  ? "bg-amber-500 text-zinc-950 border-amber-300 font-bold shadow-lg shadow-amber-500/20"
                  : "bg-zinc-900/90 hover:bg-zinc-800 text-zinc-100 border-zinc-800 hover:border-amber-500/40"
              }`}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold shadow-inner"
                style={{ backgroundColor: `${obj.color}25`, color: obj.color }}
              >
                {obj.tamil.charAt(0)}
              </div>
              <div>
                <span className="text-base font-bold font-tamil block leading-tight">
                  {obj.tamil}
                </span>
                <span className="text-[11px] font-mono opacity-70 block">
                  {obj.english}
                </span>
              </div>
              <Volume2 size={14} className={isSelected ? "text-zinc-950" : "text-amber-400"} />
            </motion.button>
          );
        })}
      </div>

      <div className="text-center text-[11px] font-mono text-zinc-500 z-10">
        Compatible 2D interactive view for all devices and screen readers.
      </div>
    </div>
  );
}
