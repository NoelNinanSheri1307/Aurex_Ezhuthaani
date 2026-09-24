"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  History,
  Search,
  RefreshCw,
  AlertCircle,
  BookOpen,
  Calendar,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import TimelineView from "@/components/history/TimelineView";
import { getHistoryItems, getHistoryEras } from "@/lib/api";
import { HistoryItemSummary } from "@/lib/types";

export default function HistoryTimelinePage() {
  const [eras, setEras] = useState<string[]>([
    "All",
    "Sangam Era",
    "Classical Era",
    "Pallava Period",
    "Chola Empire",
    "Pandya Kingdom",
    "Colonial Era",
    "Modern Era",
  ]);
  const [selectedEra, setSelectedEra] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [items, setItems] = useState<HistoryItemSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEras = async () => {
    try {
      const list = await getHistoryEras();
      if (list && list.length > 0) {
        setEras(["All", ...list]);
      }
    } catch {
      // Fallback to default eras
    }
  };

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getHistoryItems({
        era: selectedEra,
        q: searchQuery,
      });
      setItems(data);
    } catch (err: any) {
      setError(err.message || "Failed to load history timeline from server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEras();
  }, []);

  useEffect(() => {
    fetchItems();
  }, [selectedEra, searchQuery]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Top Left Navigation */}
      <div className="flex items-center justify-start">
        <Link
          href="/journey"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-amber-400 hover:border-amber-500/40 transition-all text-xs font-mono"
        >
          <ArrowRight size={16} className="rotate-180" />
          <span>Back to Journey</span>
        </Link>
      </div>

      {/* Header Banner */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[11px] uppercase tracking-wider font-semibold inline-flex items-center gap-1.5">
          <History size={13} /> History Timeline • தமிழ் வரலாற்றுப் பயணம்
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-zinc-100 tracking-tight">
          Tamil History Timeline <br />
          <span className="font-tamil text-amber-400 text-2xl sm:text-4xl font-semibold">
            தமிழ் வரலாற்றுப் பயணம்
          </span>
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
          Traverse two millennia of documented Tamil history through Sangam assemblies, maritime empires, architectural wonders, freedom struggles, and modern statehood.
        </p>
      </div>

      {/* Backend Error / Offline Warning */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-between gap-4 text-rose-300 text-xs font-mono">
          <div className="flex items-center gap-2">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
          <button
            onClick={fetchItems}
            className="px-3 py-1 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-200 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw size={12} /> Retry
          </button>
        </div>
      )}

      {/* Search & Era Filter Controls */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search historical events, dynasties, dates, or rulers..."
              className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500/60 shadow-lg"
            />
          </div>
        </div>

        {/* Era Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {eras.map((era) => {
            const isActive = selectedEra === era;
            return (
              <button
                key={era}
                onClick={() => setSelectedEra(era)}
                className={`px-3.5 py-1.5 rounded-xl font-mono text-xs uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-amber-500 border border-amber-400 text-zinc-950 font-bold shadow-lg shadow-amber-500/20"
                    : "bg-zinc-950 hover:bg-zinc-900 border border-zinc-800/80 text-zinc-400 hover:text-white"
                }`}
              >
                {era}
              </button>
            );
          })}
        </div>
      </div>

      {/* Loading State */}
      {loading && items.length === 0 && (
        <div className="py-16 text-center space-y-4">
          <div className="w-10 h-10 rounded-full border-2 border-amber-500/30 border-t-amber-400 animate-spin mx-auto" />
          <p className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
            Loading historical timeline...
          </p>
        </div>
      )}

      {/* Timeline View Component */}
      {!loading && items.length > 0 && (
        <TimelineView
          items={items}
          activeEra={selectedEra}
          onSelectEra={(era) => setSelectedEra(era)}
        />
      )}

      {/* Empty State */}
      {!loading && items.length === 0 && (
        <div className="p-12 text-center bg-zinc-950/60 rounded-3xl border border-zinc-800/80 max-w-md mx-auto space-y-3">
          <BookOpen className="text-amber-400 mx-auto" size={32} />
          <h3 className="font-serif text-xl font-bold text-zinc-100">
            No historical milestones found
          </h3>
          <p className="text-zinc-400 text-xs font-light">
            No historical items matched era "{selectedEra}"{searchQuery ? ` and search query "${searchQuery}"` : ""}.
          </p>
        </div>
      )}
    </div>
  );
}
