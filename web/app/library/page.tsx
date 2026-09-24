"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Library,
  Milestone,
  BookText,
  Landmark,
  Search,
  Filter,
  Volume2,
  Bookmark,
  ExternalLink,
  MapPin,
  Calendar,
  Sparkles,
  Info,
  X,
  Share2,
  CheckCircle2,
  Layers,
  ArrowRight,
} from "lucide-react";
import SidebarNav from "@/components/SidebarNav";
import TamilSwarmCanvas from "@/components/TamilSwarmCanvas";
import { speakTamil, stopSpeech } from "@/lib/tts";
import { useAuth } from "@/lib/auth";
import {
  getInscriptionItems,
  getInscriptionDetail,
  getLiteratureItems,
  getLiteratureDetail,
  getKnowledgeItems,
  getKnowledgeDetail,
  getCultureItems,
  getCultureDetail,
  saveInscriptionApi,
  unsaveInscriptionApi,
  saveLiteratureApi,
  unsaveLiteratureApi,
  saveKnowledgeApi,
  unsaveKnowledgeApi,
  saveCultureApi,
  unsaveCultureApi,
  getSavedInscriptions,
  getSavedLiterature,
  getSavedKnowledge,
  getSavedCulture,
} from "@/lib/api";
import {
  InscriptionItemSummary,
  InscriptionItemDetail,
  LiteratureItemSummary,
  LiteratureItemDetail,
  KnowledgeItemSummary,
  KnowledgeItemDetail,
  CulturalItemSummary,
  CulturalItemDetail,
} from "@/lib/types";

type LibraryTab = "inscriptions" | "literature" | "knowledge" | "culture";

function LibraryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  const initialTab = (searchParams.get("tab") as LibraryTab) || "inscriptions";
  const [activeTab, setActiveTab] = useState<LibraryTab>(initialTab);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  // Data Loading States
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<any[]>([]);
  const [filterOptions, setFilterOptions] = useState<string[]>([]);
  const [savedSlugs, setSavedSlugs] = useState<Set<string>>(new Set());

  // Detail Modal State
  const [activeItemDetail, setActiveItemDetail] = useState<any | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  // Sync tab with URL
  useEffect(() => {
    const tabFromUrl = (searchParams.get("tab") as LibraryTab) || "inscriptions";
    if (tabFromUrl !== activeTab) {
      setActiveTab(tabFromUrl);
      setSelectedFilter("All");
      setSearchQuery("");
      setShowSavedOnly(false);
    }
  }, [searchParams]);

  // Handle Tab Change
  const handleTabChange = (tab: LibraryTab) => {
    setActiveTab(tab);
    setSelectedFilter("All");
    setSearchQuery("");
    setShowSavedOnly(false);
    router.push(`/library?tab=${tab}`, { scroll: false });
  };

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeItemDetail) {
        setActiveItemDetail(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeItemDetail]);

  // Fetch Items based on Active Tab
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    async function loadData() {
      try {
        if (activeTab === "inscriptions") {
          const res = await getInscriptionItems({
            period: selectedFilter,
            q: searchQuery,
          });
          if (isMounted) {
            setItems(res || []);
            const periods = Array.from(
              new Set((res || []).map((i) => i.period).filter((p): p is string => Boolean(p)))
            );
            setFilterOptions(["All", ...periods]);
          }
        } else if (activeTab === "literature") {
          const res = await getLiteratureItems({
            category: selectedFilter,
            q: searchQuery,
          });
          if (isMounted) {
            setItems(res || []);
            const categories = Array.from(
              new Set((res || []).map((i) => i.category).filter((c): c is string => Boolean(c)))
            );
            setFilterOptions(["All", ...categories]);
          }
        } else if (activeTab === "knowledge") {
          const res = await getKnowledgeItems({
            category: selectedFilter,
            q: searchQuery,
          });
          if (isMounted) {
            setItems(res || []);
            const categories = Array.from(
              new Set((res || []).map((i) => i.category).filter((c): c is string => Boolean(c)))
            );
            setFilterOptions(["All", ...categories]);
          }
        } else if (activeTab === "culture") {
          const res = await getCultureItems({
            category: selectedFilter,
            q: searchQuery,
          });
          if (isMounted) {
            setItems(res || []);
            const categories = Array.from(
              new Set((res || []).map((i) => i.category).filter((c): c is string => Boolean(c)))
            );
            setFilterOptions(["All", ...categories]);
          }
        }
      } catch (err) {
        console.error("Failed to load library items:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [activeTab, selectedFilter, searchQuery]);

  // Load Saved Bookmarks (Local storage + API sync)
  useEffect(() => {
    let initialSlugs = new Set<string>();

    try {
      const stored = localStorage.getItem("ezhuthaani_library_saved");
      if (stored) {
        const arr = JSON.parse(stored);
        if (Array.isArray(arr)) {
          arr.forEach((s: string) => initialSlugs.add(s));
        }
      }
    } catch (e) {}

    setSavedSlugs(initialSlugs);

    const token = typeof window !== "undefined" ? localStorage.getItem("ezhuthaani_token") : null;
    if (!token) return;

    async function loadSavedFromApi() {
      try {
        let savedList: any[] = [];
        if (activeTab === "inscriptions") savedList = await getSavedInscriptions(token!);
        else if (activeTab === "literature") savedList = await getSavedLiterature(token!);
        else if (activeTab === "knowledge") savedList = await getSavedKnowledge(token!);
        else if (activeTab === "culture") savedList = await getSavedCulture(token!);

        if (savedList && Array.isArray(savedList)) {
          setSavedSlugs((prev) => {
            const next = new Set(prev);
            savedList.forEach((s) => next.add(s.slug));
            try {
              localStorage.setItem("ezhuthaani_library_saved", JSON.stringify(Array.from(next)));
            } catch (err) {}
            return next;
          });
        }
      } catch (e) {}
    }

    loadSavedFromApi();
  }, [activeTab, user]);

  // Toggle Bookmark
  const handleToggleBookmark = async (slug: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    const isSaved = savedSlugs.has(slug);

    // Optimistically update local state & localStorage
    setSavedSlugs((prev) => {
      const next = new Set(prev);
      if (isSaved) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      try {
        localStorage.setItem("ezhuthaani_library_saved", JSON.stringify(Array.from(next)));
      } catch (err) {}
      return next;
    });

    const token = typeof window !== "undefined" ? localStorage.getItem("ezhuthaani_token") : null;
    if (!token) return;

    try {
      if (isSaved) {
        if (activeTab === "inscriptions") await unsaveInscriptionApi(token, slug);
        else if (activeTab === "literature") await unsaveLiteratureApi(token, slug);
        else if (activeTab === "knowledge") await unsaveKnowledgeApi(token, slug);
        else if (activeTab === "culture") await unsaveCultureApi(token, slug);
      } else {
        if (activeTab === "inscriptions") await saveInscriptionApi(token, slug);
        else if (activeTab === "literature") await saveLiteratureApi(token, slug);
        else if (activeTab === "knowledge") await saveKnowledgeApi(token, slug);
        else if (activeTab === "culture") await saveCultureApi(token, slug);
      }
    } catch (e) {
      console.warn("API bookmark sync error:", e);
    }
  };

  // Open Item Detail View
  const handleOpenDetail = async (slug: string) => {
    setLoadingDetail(true);
    try {
      let detail: any = null;
      if (activeTab === "inscriptions") detail = await getInscriptionDetail(slug);
      else if (activeTab === "literature") detail = await getLiteratureDetail(slug);
      else if (activeTab === "knowledge") detail = await getKnowledgeDetail(slug);
      else if (activeTab === "culture") detail = await getCultureDetail(slug);

      setActiveItemDetail(detail);
    } catch (e) {
      console.error("Failed to load item detail:", e);
    } finally {
      setLoadingDetail(false);
    }
  };

  const displayedItems = items.filter((item) => {
    if (showSavedOnly && !savedSlugs.has(item.slug)) return false;
    return true;
  });

  return (
    <main className="min-h-screen bg-[#07070a] text-zinc-100 pb-24 relative overflow-x-hidden selection:bg-amber-500 selection:text-black">
      <TamilSwarmCanvas />
      <SidebarNav />

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 space-y-8 relative z-10">
        {/* Header Title Section */}
        <div className="space-y-3 text-center sm:text-left border-b border-zinc-900 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Library size={14} /> Tamil Digital Heritage Library
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-zinc-100 tracking-tight">
            தமிழ் நூல் நிலைய காப்பகம் <br />
            <span className="text-amber-400 font-tamil text-2xl sm:text-4xl font-semibold">
              நூல் நிலையம் & தொல்லியல் காப்பகம்
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-2xl leading-relaxed">
            A single unified digital repository uniting ancient Tamil inscriptions, classical Sangam literature, traditional science systems, and vibrant living culture.
          </p>
        </div>

        {/* Unified Library Navigation Tabs (4 Modes) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-zinc-950/80 p-2 rounded-2xl border border-zinc-800/80 shadow-xl backdrop-blur-xl">
          <button
            onClick={() => handleTabChange("inscriptions")}
            className={`py-3 px-4 rounded-xl font-mono text-xs font-bold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
              activeTab === "inscriptions"
                ? "bg-amber-500 text-zinc-950 border-amber-400 shadow-lg shadow-amber-500/20"
                : "bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 border-zinc-800"
            }`}
          >
            <Milestone size={16} />
            <span>Inscriptions ({activeTab === "inscriptions" ? items.length : items.length || 0})</span>
          </button>

          <button
            onClick={() => handleTabChange("literature")}
            className={`py-3 px-4 rounded-xl font-mono text-xs font-bold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
              activeTab === "literature"
                ? "bg-amber-500 text-zinc-950 border-amber-400 shadow-lg shadow-amber-500/20"
                : "bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 border-zinc-800"
            }`}
          >
            <BookText size={16} />
            <span>Literature ({activeTab === "literature" ? items.length : items.length || 0})</span>
          </button>

          <button
            onClick={() => handleTabChange("knowledge")}
            className={`py-3 px-4 rounded-xl font-mono text-xs font-bold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
              activeTab === "knowledge"
                ? "bg-amber-500 text-zinc-950 border-amber-400 shadow-lg shadow-amber-500/20"
                : "bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 border-zinc-800"
            }`}
          >
            <Library size={16} />
            <span>Knowledge ({activeTab === "knowledge" ? items.length : items.length || 0})</span>
          </button>

          <button
            onClick={() => handleTabChange("culture")}
            className={`py-3 px-4 rounded-xl font-mono text-xs font-bold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
              activeTab === "culture"
                ? "bg-amber-500 text-zinc-950 border-amber-400 shadow-lg shadow-amber-500/20"
                : "bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 border-zinc-800"
            }`}
          >
            <Landmark size={16} />
            <span>Culture ({activeTab === "culture" ? items.length : items.length || 0})</span>
          </button>
        </div>

        {/* Search & Category Filter Controls Bar */}
        <div className="bg-zinc-950/80 rounded-2xl p-5 border border-zinc-800/80 space-y-4 shadow-xl backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input
                type="text"
                placeholder={`Search ${activeTab} by title, Tamil keyword...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-zinc-900/90 border border-zinc-800 rounded-xl text-zinc-100 text-sm placeholder:text-zinc-500 focus:outline-none focus:border-amber-500/50 font-sans"
              />
            </div>

            {/* Filter Pills & Bookmarked Only Toggle */}
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => setShowSavedOnly(!showSavedOnly)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                  showSavedOnly
                    ? "bg-amber-500 text-zinc-950 border-amber-400 shadow-md shadow-amber-500/20"
                    : "bg-zinc-900 text-zinc-400 hover:text-zinc-200 border-zinc-800"
                }`}
              >
                <Bookmark size={13} className={showSavedOnly ? "fill-current" : ""} />
                Bookmarked Only ({savedSlugs.size})
              </button>

              {filterOptions.length > 1 && (
                <div className="flex flex-wrap items-center gap-1.5 max-h-24 overflow-y-auto scrollbar-none">
                  {filterOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSelectedFilter(opt)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                        selectedFilter === opt
                          ? "bg-amber-500 text-zinc-950 font-bold shadow-md shadow-amber-500/20"
                          : "bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Item Cards Grid */}
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-10 h-10 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-mono text-zinc-500">Loading Tamil Library Archive...</p>
          </div>
        ) : displayedItems.length === 0 ? (
          <div className="py-20 text-center space-y-3 bg-zinc-950/60 rounded-3xl border border-zinc-800">
            <Info size={32} className="text-zinc-600 mx-auto" />
            <p className="text-sm font-mono text-zinc-400">
              {showSavedOnly
                ? "No bookmarked entries in this tab yet."
                : `No entries found matching "${searchQuery}" under ${activeTab}.`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedItems.map((item) => {
              const isSaved = savedSlugs.has(item.slug);

              return (
                <div
                  key={item.slug}
                  onClick={() => handleOpenDetail(item.slug)}
                  className="bg-zinc-950/80 rounded-3xl border border-zinc-800/90 hover:border-amber-500/40 p-6 flex flex-col justify-between space-y-4 transition-all hover:shadow-2xl hover:shadow-amber-500/5 cursor-pointer group relative overflow-hidden backdrop-blur-xl"
                >
                  {/* Card Image Banner */}
                  {item.image_url && (
                    <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800/80 mb-1 group flex items-center justify-center p-1.5">
                      <img
                        src={item.image_url}
                        alt={item.title_en}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    </div>
                  )}

                  {/* Top Header Badges */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-mono font-semibold uppercase">
                        {item.category || item.genre || activeTab}
                      </span>

                      <button
                        onClick={(e) => handleToggleBookmark(item.slug, e)}
                        className={`p-2 rounded-xl transition-all cursor-pointer ${
                          isSaved
                            ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                            : "bg-zinc-900 text-zinc-500 hover:text-zinc-200 border border-zinc-800"
                        }`}
                        title={isSaved ? "Remove Bookmark" : "Save Bookmark"}
                      >
                        <Bookmark size={14} className={isSaved ? "fill-current" : ""} />
                      </button>
                    </div>

                    {/* Titles */}
                    <div>
                      <h3 className="font-serif text-lg font-bold text-zinc-100 group-hover:text-amber-400 transition-colors leading-snug">
                        {item.title_en}
                      </h3>
                      <h4 className="font-tamil text-base font-semibold text-amber-400/90 mt-0.5">
                        {item.title_ta}
                      </h4>
                    </div>

                    {/* Summary */}
                    <p className="text-xs text-zinc-400 font-light line-clamp-3 leading-relaxed">
                      {item.summary_en || item.summary_ta}
                    </p>
                  </div>

                  {/* Card Footer Metadata */}
                  <div className="pt-4 border-t border-zinc-900 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                    <span className="truncate max-w-[160px]">
                      {item.period || item.era || item.region || "Tamil Heritage"}
                    </span>
                    <span className="text-amber-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-bold">
                      Read Entry <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Item Detail Modal / Drawer View */}
      <AnimatePresence>
        {activeItemDetail && (
          <div
            onClick={() => setActiveItemDetail(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-hidden cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-3xl w-full max-h-[88vh] flex flex-col shadow-2xl relative my-auto cursor-default overflow-hidden"
            >
              {/* Floating Close Button at top-right for high visibility in normal view */}
              <button
                onClick={() => setActiveItemDetail(null)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2.5 rounded-full bg-zinc-900/90 hover:bg-amber-500 hover:text-zinc-950 text-zinc-300 border border-zinc-700/80 transition-all shadow-xl cursor-pointer z-30 group"
                title="Close Modal (Esc)"
              >
                <X size={18} className="group-hover:scale-110 transition-transform" />
              </button>

              {/* Modal Header (Fixed at Top) */}
              <div className="p-5 sm:p-6 pb-4 border-b border-zinc-800/80 flex items-start justify-between gap-4 pr-14 shrink-0 bg-zinc-950">
                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-mono font-bold uppercase">
                    {activeItemDetail.category || activeTab}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-zinc-100">
                    {activeItemDetail.title_en}
                  </h2>
                  <h3 className="text-lg font-tamil text-amber-400 font-semibold">
                    {activeItemDetail.title_ta}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => speakTamil(activeItemDetail.title_ta)}
                    className="p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 transition-colors cursor-pointer"
                    title="Listen Tamil Title Pronunciation"
                  >
                    <Volume2 size={18} />
                  </button>
                </div>
              </div>

              {/* Scrollable Main Body */}
              <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1 scrollbar-thin">
                {/* Modal Image Banner */}
                {activeItemDetail.image_url && (
                  <div className="relative w-full h-48 sm:h-64 rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-inner flex items-center justify-center p-2">
                    <img
                      src={activeItemDetail.image_url}
                      alt={activeItemDetail.title_en}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                    {activeItemDetail.image_caption && (
                      <div className="absolute bottom-3 left-3 right-3 text-xs font-mono text-zinc-300 bg-zinc-950/90 px-3 py-1.5 rounded-xl border border-zinc-800/80 backdrop-blur-md flex items-center gap-2">
                        <Sparkles size={14} className="text-amber-400 shrink-0" />
                        <span>{activeItemDetail.image_caption}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Metadata Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800/80">
                  {activeItemDetail.period && (
                    <div>
                      <span className="text-zinc-500 block text-[10px]">PERIOD / ERA</span>
                      <span className="text-zinc-200 font-semibold">{activeItemDetail.period}</span>
                    </div>
                  )}
                  {activeItemDetail.author && (
                    <div>
                      <span className="text-zinc-500 block text-[10px]">AUTHOR / PATRON</span>
                      <span className="text-zinc-200 font-semibold">{activeItemDetail.author}</span>
                    </div>
                  )}
                  {activeItemDetail.region && (
                    <div>
                      <span className="text-zinc-500 block text-[10px]">LOCATION / REGION</span>
                      <span className="text-zinc-200 font-semibold">{activeItemDetail.region}</span>
                    </div>
                  )}
                </div>

                {/* Detail Content Body */}
                <div className="space-y-4 font-sans text-sm leading-relaxed text-zinc-300">
                  {activeItemDetail.content_ta && (
                    <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 space-y-2">
                      <span className="text-xs font-mono text-amber-400 font-bold block">
                        Tamil Text (தமிழ் உரை):
                      </span>
                      <p className="font-tamil text-base text-zinc-100 leading-loose">
                        {activeItemDetail.content_ta}
                      </p>
                    </div>
                  )}

                  {activeItemDetail.content_en && (
                    <div className="space-y-2">
                      <span className="text-xs font-mono text-zinc-400 font-bold block">
                        English Historical Overview:
                      </span>
                      <p className="text-zinc-300 font-light leading-relaxed">
                        {activeItemDetail.content_en}
                      </p>
                    </div>
                  )}

                  {activeItemDetail.historical_significance && (
                    <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-1 text-xs">
                      <span className="font-mono text-amber-400 font-bold block">
                        Historical Significance:
                      </span>
                      <p className="text-zinc-300 italic">{activeItemDetail.historical_significance}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer (Fixed at Bottom) */}
              <div className="p-4 sm:px-6 border-t border-zinc-800 flex items-center justify-start gap-4 shrink-0 bg-zinc-950">
                <button
                  onClick={() => handleToggleBookmark(activeItemDetail.slug)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2 border transition-all cursor-pointer ${
                    savedSlugs.has(activeItemDetail.slug)
                      ? "bg-amber-500 text-zinc-950 border-amber-400 shadow-md shadow-amber-500/20"
                      : "bg-zinc-900 text-zinc-300 hover:text-white border-zinc-800"
                  }`}
                >
                  <Bookmark size={15} className={savedSlugs.has(activeItemDetail.slug) ? "fill-current" : ""} />
                  {savedSlugs.has(activeItemDetail.slug) ? "Bookmarked" : "Bookmark Entry"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default function LibraryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#07070a]" />}>
      <LibraryContent />
    </Suspense>
  );
}
