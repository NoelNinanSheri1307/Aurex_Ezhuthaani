"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, Search, Volume2, ExternalLink, Trash2, ArrowLeft, RefreshCw, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { getSavedWords, unsaveWordApi } from "@/lib/api";
import { DICTIONARY_ENTRIES, DictionaryEntry } from "@/lib/dictionary";
import { speak } from "@/lib/curriculum";

export default function SavedTamilPage() {
  const { user, token, loading: authLoading } = useAuth();
  const [savedWordIds, setSavedWordIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchSaved = async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await getSavedWords(token);
      setSavedWordIds(data.map((item) => item.word_id));
    } catch (err: any) {
      setError(err.message || "Failed to load saved words from server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      fetchSaved();
    }
  }, [token, authLoading]);

  const handleUnsave = async (wordId: string) => {
    if (!token) return;
    try {
      await unsaveWordApi(token, wordId);
      setSavedWordIds((prev) => prev.filter((id) => id !== wordId));
    } catch (err: any) {
      alert(err.message || "Failed to remove saved word.");
    }
  };

  // Resolve dictionary entries for saved IDs
  const savedEntries = useMemo(() => {
    const map = new Map<string, DictionaryEntry>();
    DICTIONARY_ENTRIES.forEach((e) => map.set(e.id, e));
    return savedWordIds
      .map((id) => map.get(id))
      .filter((e): e is DictionaryEntry => e !== undefined);
  }, [savedWordIds]);

  // Filter entries based on search query
  const filteredEntries = useMemo(() => {
    if (!searchQuery.trim()) return savedEntries;
    const q = searchQuery.toLowerCase().trim();
    return savedEntries.filter(
      (entry) =>
        entry.tamil.includes(q) ||
        entry.transliteration.toLowerCase().includes(q) ||
        entry.meanings.some((m) => m.toLowerCase().includes(q)) ||
        entry.category.toLowerCase().includes(q)
    );
  }, [savedEntries, searchQuery]);

  if (authLoading || (loading && savedWordIds.length === 0 && !error)) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6 text-center">
        <div className="space-y-4">
          <div className="w-12 h-12 rounded-full border-2 border-amber-500/30 border-t-amber-400 animate-spin mx-auto" />
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-400">
            Loading your saved vocabulary...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Header Banner */}
      <div className="space-y-3 pb-6 border-b border-zinc-800/80">
        <div className="flex items-center gap-3">
          <Link
            href="/dictionary"
            className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors"
            title="Return to Dictionary"
          >
            <ArrowLeft size={18} />
          </Link>
          <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[11px] uppercase tracking-wider font-semibold flex items-center gap-1.5">
            <Bookmark size={13} /> Saved Tamil • சேமித்த தமிழ்
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-100">
          Saved Vocabulary <span className="font-tamil text-amber-400 text-2xl sm:text-3xl font-semibold">சேமித்த தமிழ்</span>
        </h1>
        <p className="text-zinc-400 text-sm max-w-2xl font-light">
          Your personal collection of bookmarked Tamil words, transliterations, and meanings saved across your learning journey.
        </p>
      </div>

      {/* Backend Failure Warning */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-between gap-4 text-rose-300 text-xs font-mono">
          <div className="flex items-center gap-2">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
          <button
            onClick={fetchSaved}
            className="px-3 py-1 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-200 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw size={12} /> Retry
          </button>
        </div>
      )}

      {/* Search & Filter Controls */}
      {savedEntries.length > 0 && (
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search saved words in Tamil, English, or transliteration..."
            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500/60 shadow-lg"
          />
        </div>
      )}

      {/* Empty State when no saved words exist */}
      {savedEntries.length === 0 && !loading && (
        <div className="bg-zinc-950/80 rounded-3xl p-8 sm:p-12 border border-zinc-800/80 text-center space-y-4 max-w-xl mx-auto shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
            <Bookmark size={28} />
          </div>
          <h2 className="font-serif text-2xl font-bold text-zinc-100">
            No saved words yet
          </h2>
          <p className="text-zinc-400 text-sm font-light leading-relaxed">
            Bookmark words while exploring the Dictionary or completing lessons to review them here anytime.
          </p>
          <div className="pt-2">
            <Link
              href="/dictionary"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono font-semibold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-amber-500/20"
            >
              <Search size={16} /> Explore Dictionary
            </Link>
          </div>
        </div>
      )}

      {/* Filtered Grid Display */}
      {filteredEntries.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence>
            {filteredEntries.map((entry) => (
              <motion.div
                key={entry.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-zinc-950/90 rounded-2xl p-5 border border-zinc-800/80 shadow-xl space-y-4 relative group"
              >
                {/* Header Metadata */}
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[10px] uppercase font-semibold">
                    {entry.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {/* Listen Speaker Button */}
                    <button
                      onClick={() => speak(entry.tamil)}
                      className="p-1.5 rounded-lg bg-zinc-900 hover:bg-amber-500/20 border border-zinc-800 hover:border-amber-500/30 text-zinc-400 hover:text-amber-400 transition-colors cursor-pointer"
                      title="Listen"
                    >
                      <Volume2 size={14} />
                    </button>
                    {/* Open in Dictionary Link */}
                    <Link
                      href={`/dictionary?word=${encodeURIComponent(entry.tamil)}`}
                      className="p-1.5 rounded-lg bg-zinc-900 hover:bg-amber-500/20 border border-zinc-800 hover:border-amber-500/30 text-zinc-400 hover:text-amber-400 transition-colors"
                      title="Open in Dictionary"
                    >
                      <ExternalLink size={14} />
                    </Link>
                    {/* Unsave Action */}
                    <button
                      onClick={() => handleUnsave(entry.id)}
                      className="p-1.5 rounded-lg bg-zinc-900 hover:bg-rose-500/20 border border-zinc-800 hover:border-rose-500/30 text-zinc-400 hover:text-rose-400 transition-colors cursor-pointer"
                      title="Remove from saved"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Word & Transliteration */}
                <div>
                  <h3 className="font-tamil text-3xl font-bold text-amber-400">
                    {entry.tamil}
                  </h3>
                  <p className="text-xs font-mono text-zinc-400 mt-0.5">
                    {entry.transliteration}
                  </p>
                </div>

                {/* Meanings */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {entry.meanings.map((meaning, idx) => (
                    <span
                      key={idx}
                      className="text-xs text-zinc-200 bg-zinc-900 px-2.5 py-1 rounded-lg border border-zinc-800"
                    >
                      {meaning}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* No Search Results */}
      {savedEntries.length > 0 && filteredEntries.length === 0 && (
        <div className="p-8 text-center bg-zinc-950/60 rounded-2xl border border-zinc-800 text-zinc-400 font-mono text-xs">
          No saved words match "{searchQuery}"
        </div>
      )}
    </div>
  );
}
