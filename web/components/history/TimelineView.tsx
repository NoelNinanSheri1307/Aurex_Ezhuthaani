"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ContentImage from "@/components/ContentImage";
import {
  Calendar,
  MapPin,
  ArrowRight,
  Sparkles,
  LayoutGrid,
  ListOrdered,
} from "lucide-react";
import Link from "next/link";
import { HistoryItemSummary } from "@/lib/types";

export default function TimelineView({
  items,
  activeEra,
  onSelectEra,
}: {
  items: HistoryItemSummary[];
  activeEra: string;
  onSelectEra: (era: string) => void;
}) {
  const [viewMode, setViewMode] = useState<"timeline" | "grid">("timeline");

  return (
    <div className="space-y-6">
      {/* View Mode Toggle Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
          Showing {items.length} Historical Milestone{items.length === 1 ? "" : "s"}
        </span>

        <div className="flex items-center gap-1.5 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
          <button
            onClick={() => setViewMode("timeline")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === "timeline"
                ? "bg-amber-500 text-zinc-950 font-bold"
                : "text-zinc-400 hover:text-white"
            }`}
            title="Chronological Timeline View"
          >
            <ListOrdered size={14} />
            <span>Timeline</span>
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === "grid"
                ? "bg-amber-500 text-zinc-950 font-bold"
                : "text-zinc-400 hover:text-white"
            }`}
            title="Grid View"
          >
            <LayoutGrid size={14} />
            <span>Grid</span>
          </button>
        </div>
      </div>

      {/* ---------------- CHRONOLOGICAL TIMELINE VIEW ---------------- */}
      {viewMode === "timeline" && (
        <div className="relative pl-6 sm:pl-10 space-y-8 before:absolute before:left-3 sm:before:left-5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-amber-500 before:via-amber-500/40 before:to-zinc-800">
          <AnimatePresence>
            {items.map((item, index) => (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="relative group"
              >
                {/* Glowing Node Dot on Timeline Track */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-4 w-4 h-4 rounded-full bg-zinc-950 border-2 border-amber-400 group-hover:bg-amber-400 group-hover:scale-125 transition-all shadow-lg shadow-amber-500/30 z-10" />

                {/* Timeline Card Container */}
                <div className="bg-zinc-950/90 rounded-3xl p-6 border border-zinc-800/80 shadow-xl space-y-4 group-hover:border-amber-500/40 transition-all">
                  {/* Top Metadata Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-900 pb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 font-mono text-[11px] font-bold flex items-center gap-1.5">
                        <Calendar size={12} /> {item.date_label}
                      </span>
                      {item.era && (
                        <span className="px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-[10px] uppercase">
                          {item.era}
                        </span>
                      )}
                    </div>

                    {item.region && (
                      <span className="text-[10px] font-mono text-zinc-400 flex items-center gap-1">
                        <MapPin size={11} className="text-amber-400" /> {item.region}
                      </span>
                    )}
                  </div>

                  {/* Title & Narrative */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    <div className="md:col-span-2 space-y-2">
                      <h2 className="font-tamil text-2xl sm:text-3xl font-bold text-amber-400 group-hover:text-amber-300 transition-colors">
                        {item.title_ta}
                      </h2>
                      <p className="font-serif text-xl font-bold text-zinc-100">
                        {item.title_en}
                      </p>
                      <p className="text-xs text-zinc-400 font-light leading-relaxed pt-1">
                        {item.summary_en}
                      </p>
                    </div>

                    {/* Image Banner preview */}
                    <div className="h-36 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/80 hidden sm:block">
                      <ContentImage
                        src={item.image_url}
                        alt={item.title_en}
                        era={item.era}
                        aspectRatio="h-36 w-full"
                      />
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="pt-3 border-t border-zinc-900 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-zinc-500 truncate max-w-[200px]">
                      Source: {item.source_name}
                    </span>

                    <Link
                      href={`/history/${item.slug}`}
                      className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-amber-500 border border-zinc-800 hover:border-amber-400 text-zinc-300 hover:text-zinc-950 font-mono text-xs uppercase font-semibold transition-all flex items-center gap-1.5 group/btn"
                    >
                      <span>Explore Milestone</span>
                      <ArrowRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* ---------------- GRID VIEW ---------------- */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-zinc-950/90 rounded-3xl border border-zinc-800/80 overflow-hidden shadow-xl flex flex-col justify-between group hover:border-amber-500/40 transition-all"
              >
                <div>
                  <div className="h-44 w-full relative overflow-hidden bg-zinc-900">
                    <ContentImage
                      src={item.image_url}
                      alt={item.title_en}
                      era={item.era}
                      aspectRatio="h-44 w-full"
                    />
                    <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-amber-500/30 text-amber-400 font-mono text-[10px] font-bold">
                      {item.date_label}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">

                    <div>
                      <h3 className="font-tamil text-2xl font-bold text-amber-400">
                        {item.title_ta}
                      </h3>
                      <p className="font-serif text-lg font-bold text-zinc-100">
                        {item.title_en}
                      </p>
                    </div>

                    <p className="text-xs text-zinc-400 font-light line-clamp-3 leading-relaxed">
                      {item.summary_en}
                    </p>

                    {item.era && (
                      <span className="inline-block text-[10px] font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800 uppercase">
                        {item.era}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-500 truncate max-w-[120px]">
                    {item.source_name}
                  </span>
                  <Link
                    href={`/history/${item.slug}`}
                    className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-amber-500 border border-zinc-800 hover:border-amber-400 text-zinc-300 hover:text-zinc-950 font-mono text-xs uppercase font-semibold transition-all flex items-center gap-1.5 group/btn"
                  >
                    <span>Explore</span>
                    <ArrowRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
