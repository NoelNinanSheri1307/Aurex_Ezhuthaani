"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, BookOpen, Search, Sparkles, HelpCircle } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { getSavedWords } from "@/lib/api";
import StylusEmblem from "@/components/StylusEmblem";
import SidebarNav from "@/components/SidebarNav";
import TamilSwarmCanvas from "@/components/TamilSwarmCanvas";
import WordCard from "@/components/dictionary/WordCard";
import DictionarySearch from "@/components/dictionary/DictionarySearch";
import {
  searchDictionary,
  getDictionaryWord,
  getAllDictionaryEntries,
  fetchExternalDictionaryEntry,
  DictionaryEntry,
} from "@/lib/dictionary";

function DictionaryContent() {
  const { user, token, loading } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlWordParam = searchParams.get("word");

  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeEntry, setActiveEntry] = useState<DictionaryEntry | null>(null);
  const [externalEntry, setExternalEntry] = useState<DictionaryEntry | null>(null);
  const [isSearchingExternal, setIsSearchingExternal] = useState(false);

  const [savedWordIds, setSavedWordIds] = useState<Set<string>>(new Set());
  const [visibleCount, setVisibleCount] = useState(24);

  // Fetch saved words list ONCE for the user
  useEffect(() => {
    if (token) {
      getSavedWords(token)
        .then((list) => {
          setSavedWordIds(new Set(list.map((s) => s.word_id)));
        })
        .catch(() => {});
    }
  }, [token]);

  // Reset pagination when query or category changes
  useEffect(() => {
    setVisibleCount(24);
  }, [query, selectedCategory]);

  // Enforce auth requirement
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  // Handle URL word parameter on mount or change
  useEffect(() => {
    if (urlWordParam) {
      const match = getDictionaryWord(urlWordParam);
      if (match) {
        setActiveEntry(match);
        setQuery(match.tamil);
      } else {
        setQuery(urlWordParam);
        setActiveEntry(null);
      }
    }
  }, [urlWordParam]);

  const searchResults = searchDictionary(query, selectedCategory);

  // External Wiktionary & Translation API fallback lookup for any unbundled word
  useEffect(() => {
    let cancelled = false;
    const trimmed = query.trim();

    if (searchResults.length === 0 && trimmed.length > 0) {
      setIsSearchingExternal(true);
      fetchExternalDictionaryEntry(trimmed).then((entry) => {
        if (!cancelled) {
          setExternalEntry(entry);
          setIsSearchingExternal(false);
        }
      });
    } else {
      setExternalEntry(null);
      setIsSearchingExternal(false);
    }

    return () => {
      cancelled = true;
    };
  }, [query, searchResults.length]);

  if (loading || !user) {
    return (
      <main className="min-h-screen bg-[#07070a] flex items-center justify-center">
        <StylusEmblem variant="thinking" size={90} />
      </main>
    );
  }

  const displayResults = searchResults.length > 0 ? searchResults : externalEntry ? [externalEntry] : [];

  const handleSelectRelated = (word: DictionaryEntry) => {
    setActiveEntry(word);
    setQuery(word.tamil);
    router.push(`/dictionary?word=${encodeURIComponent(word.tamil)}`);
  };

  return (
    <main className="min-h-screen bg-[#07070a] pb-24 text-zinc-100 relative overflow-x-hidden">
      {/* Tamil Glyph Swarm Canvas Background */}
      <TamilSwarmCanvas />

      {/* Authenticated Sidebar Navigation & Header */}
      <SidebarNav />

      {/* Ambient Radial Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/10 blur-[130px] pointer-events-none rounded-full" />

      {/* Hero Header Section */}
      <section className="max-w-4xl mx-auto px-6 pt-12 pb-8 relative z-10 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-mono uppercase tracking-widest">
          <BookOpen size={13} className="text-amber-400" />
          <span>Tamil Dictionary · தமிழ் அகராதி</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-serif text-zinc-100 tracking-tight">
          Explore Tamil Words & Meanings
        </h1>

        <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-xl mx-auto leading-relaxed">
          Comprehensive dictionary for Tamil script learners. Look up definitions, transliteration, audio pronunciations, and contextual example sentences.
        </p>
      </section>

      {/* Search & Filter Controls */}
      <section className="max-w-4xl mx-auto px-6 mb-10 relative z-10">
        <DictionarySearch
          query={query}
          setQuery={(q) => {
            setQuery(q);
            if (activeEntry && q !== activeEntry.tamil) {
              setActiveEntry(null);
            }
          }}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </section>

      {/* Results Section */}
      <section className="max-w-4xl mx-auto px-6 relative z-10 space-y-6">
        {/* Count Summary */}
        <div className="flex items-center justify-between text-xs font-mono text-zinc-400 border-b border-zinc-900 pb-3">
          <span>
            Showing <strong className="text-amber-400">{displayResults.length}</strong> words
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-zinc-500">
            {externalEntry ? "Wiktionary API Fallback" : "Offline Access Ready"}
          </span>
        </div>

        {/* Searching External API Indicator */}
        {isSearchingExternal && (
          <div className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800 text-center font-mono text-xs text-amber-400 animate-pulse">
            Querying Wiktionary & Lexicon APIs for "{query}"...
          </div>
        )}

        {/* Word Cards List */}
        {displayResults.length > 0 ? (
          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {displayResults.slice(0, visibleCount).map((entry) => (
                <WordCard
                  key={entry.id}
                  entry={entry}
                  isInitiallySaved={savedWordIds.has(entry.id)}
                  onSelectRelated={handleSelectRelated}
                />
              ))}
            </AnimatePresence>

            {/* Load More Button if results exceed visibleCount */}
            {displayResults.length > visibleCount && (
              <div className="text-center pt-6">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 24)}
                  className="px-6 py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xl"
                >
                  Load More Words ({displayResults.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Empty / Not Found State */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-zinc-950/80 rounded-3xl p-10 border border-zinc-800/80 text-center space-y-4 max-w-md mx-auto"
          >
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-2">
              <HelpCircle size={32} />
            </div>
            <h3 className="font-serif text-xl text-zinc-100 font-bold">
              Word Not Found
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              No matching dictionary entry found for "<span className="text-amber-400 font-semibold">{query}</span>". Try searching in English, transliteration (e.g. <span className="text-zinc-300">ammaa</span>), or selecting a different category.
            </p>
            <button
              onClick={() => {
                setQuery("");
                setSelectedCategory("All");
              }}
              className="px-5 py-2.5 rounded-xl bg-amber-500 text-zinc-950 font-mono font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20 inline-block"
            >
              Reset Search Filter
            </button>
          </motion.div>
        )}
      </section>
    </main>
  );
}

export default function DictionaryPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#07070a] flex items-center justify-center">
          <StylusEmblem variant="thinking" size={90} />
        </main>
      }
    >
      <DictionaryContent />
    </Suspense>
  );
}
