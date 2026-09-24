"use client";

import { useState, useEffect, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ContentImage from "@/components/ContentImage";
import {
  ArrowLeft,
  Volume2,
  Bookmark,
  BookmarkCheck,
  FileText,
  MapPin,
  Calendar,
  ExternalLink,
  ShieldCheck,
  BookOpen,
  ArrowRight,
  Landmark,
  History as HistoryIcon,
  X,
  Check,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { getHistoryDetail, getSavedHistory, saveHistoryApi, unsaveHistoryApi, createNoteApi } from "@/lib/api";
import { HistoryItemDetail } from "@/lib/types";
import { speak } from "@/lib/curriculum";

export default function HistoricalDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const { user, token } = useAuth();
  const [item, setItem] = useState<HistoryItemDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Note Modal State
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");
  const [noteStatus, setNoteStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [noteError, setNoteError] = useState("");

  const fetchDetail = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getHistoryDetail(slug);
      setItem(data);
    } catch (err: any) {
      setError(err.message || "Historical entry not found.");
    } finally {
      setLoading(false);
    }
  };

  const checkSavedState = async () => {
    if (!token) return;
    try {
      const savedList = await getSavedHistory(token);
      setIsSaved(savedList.some((s) => s.slug === slug));
    } catch {}
  };

  useEffect(() => {
    fetchDetail();
  }, [slug]);

  useEffect(() => {
    checkSavedState();
  }, [slug, token]);

  const handleToggleSave = async () => {
    if (!token || !user) {
      alert("Please log in to save historical milestones.");
      return;
    }
    if (isSaving) return;
    setIsSaving(true);
    try {
      if (isSaved) {
        await unsaveHistoryApi(token, slug);
        setIsSaved(false);
      } else {
        await saveHistoryApi(token, slug);
        setIsSaved(true);
      }
    } catch (err: any) {
      alert(err.message || "Failed to update saved state.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !user) {
      alert("Please log in to add notes.");
      return;
    }
    if (!noteBody.trim()) return;

    setNoteStatus("saving");
    setNoteError("");
    try {
      await createNoteApi(token, {
        content_type: "history",
        content_id: slug,
        title: noteTitle.trim() || undefined,
        body: noteBody.trim(),
      });
      setNoteStatus("success");
      setTimeout(() => {
        setShowNoteModal(false);
        setNoteStatus("idle");
        setNoteTitle("");
        setNoteBody("");
      }, 1000);
    } catch (err: any) {
      setNoteStatus("error");
      setNoteError(err.message || "Failed to create note.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6 text-center">
        <div className="space-y-4">
          <div className="w-12 h-12 rounded-full border-2 border-amber-500/30 border-t-amber-400 animate-spin mx-auto" />
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-400">
            Loading historical milestone...
          </p>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="p-8 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
          <BookOpen className="text-amber-400 mx-auto" size={36} />
          <h2 className="font-serif text-2xl font-bold text-zinc-100">
            Historical Milestone Not Found
          </h2>
          <p className="text-zinc-400 text-xs font-mono">{error || "Requested slug does not exist."}</p>
          <div className="pt-2">
            <Link
              href="/history"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-zinc-950 font-mono text-xs font-semibold uppercase tracking-wider"
            >
              <ArrowLeft size={16} /> Return to Timeline
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/history"
          className="p-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors flex items-center gap-2 text-xs font-mono uppercase tracking-wider"
        >
          <ArrowLeft size={16} />
          <span>History Timeline</span>
        </Link>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* TTS Speaker */}
          <button
            onClick={() => speak(`${item.title_ta}. ${item.summary_ta}`)}
            className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
            title="Listen to Tamil title & summary"
          >
            <Volume2 size={15} />
            <span>Listen</span>
          </button>

          {/* Save / Unsave */}
          <button
            onClick={handleToggleSave}
            disabled={isSaving}
            className={`px-3 py-1.5 rounded-xl border font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
              isSaved
                ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/25"
                : "bg-zinc-950 hover:bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-amber-400"
            }`}
          >
            {isSaved ? (
              <>
                <BookmarkCheck size={15} className="text-emerald-400" />
                <span>Saved</span>
              </>
            ) : (
              <>
                <Bookmark size={15} className="text-zinc-400" />
                <span>Save</span>
              </>
            )}
          </button>

          {/* Add Note */}
          {user && (
            <button
              onClick={() => setShowNoteModal(true)}
              className="px-3 py-1.5 rounded-xl bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-amber-400 font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <FileText size={15} className="text-amber-400" />
              <span>Note</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-400 font-mono text-xs font-bold flex items-center gap-1.5">
            <Calendar size={13} /> {item.date_label}
          </span>
          {item.era && (
            <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-[11px] uppercase tracking-wider">
              {item.era}
            </span>
          )}
          {item.region && (
            <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-[11px] uppercase tracking-wider flex items-center gap-1">
              <MapPin size={12} className="text-amber-400" /> {item.region}
            </span>
          )}
        </div>

        <h1 className="font-tamil text-4xl sm:text-6xl font-bold text-amber-400 tracking-wide">
          {item.title_ta}
        </h1>
        <p className="font-serif text-2xl sm:text-3xl font-bold text-zinc-100">
          {item.title_en}
        </p>
      </div>

      {/* Hero Image Banner */}
      <div className="rounded-3xl overflow-hidden border border-zinc-800/80 shadow-2xl bg-zinc-950">
        <ContentImage
          src={item.image_url}
          alt={item.title_en}
          era={item.era}
          aspectRatio="h-64 sm:h-96 w-full"
        />
        {item.image_caption && (
          <div className="p-3 bg-zinc-950/90 border-t border-zinc-900 text-xs font-mono text-zinc-400 text-center italic">
            {item.image_caption}
          </div>
        )}
      </div>

      {/* Dual Content Section (Tamil & English) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        {/* Tamil Narrative */}
        <div className="bg-zinc-950/90 rounded-3xl p-6 sm:p-8 border border-zinc-800/80 space-y-4 shadow-xl">
          <div className="text-xs font-mono text-amber-400 uppercase tracking-widest pb-2 border-b border-zinc-900 flex items-center justify-between">
            <span>வரலாற்று விவரிப்பு (Tamil)</span>
            <button
              onClick={() => speak(item.content_ta)}
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
            >
              <Volume2 size={14} /> Listen
            </button>
          </div>
          <p className="font-tamil text-lg text-zinc-100 leading-relaxed font-medium">
            {item.content_ta}
          </p>
        </div>

        {/* English Narrative */}
        <div className="bg-zinc-950/90 rounded-3xl p-6 sm:p-8 border border-zinc-800/80 space-y-4 shadow-xl">
          <div className="text-xs font-mono text-amber-400 uppercase tracking-widest pb-2 border-b border-zinc-900">
            English Narrative
          </div>
          <p className="text-sm text-zinc-300 font-light leading-relaxed">
            {item.content_en}
          </p>
        </div>
      </div>

      {/* Source Provenance Card */}
      <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800/80 space-y-3 shadow-lg">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400">
          <ShieldCheck size={16} /> Source Provenance & Historical References
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-400 pt-1">
          <div>
            <span className="text-zinc-500">Source: </span>
            <span className="text-zinc-200 font-semibold">{item.source_name}</span>
            <span className="ml-2 px-2 py-0.5 rounded bg-zinc-900 text-[10px] text-zinc-400 border border-zinc-800 uppercase">
              {item.source_type}
            </span>
          </div>

          {item.license && (
            <div>
              <span className="text-zinc-500">License: </span>
              <span className="text-amber-300">{item.license}</span>
            </div>
          )}

          {item.source_url && (
            <a
              href={item.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-amber-400 hover:underline"
            >
              <span>View Reference</span>
              <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>

      {/* Connected Cultural & Historical Knowledge */}
      {item.related && item.related.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-zinc-900">
          <h3 className="font-serif text-2xl font-bold text-zinc-100">
            Connected Knowledge & Culture
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {item.related.map((rel) => {
              const isCulture = rel.content_type === "culture";
              const targetPath = isCulture ? `/culture/${rel.slug}` : `/history/${rel.slug}`;

              return (
                <Link
                  key={rel.slug}
                  href={targetPath}
                  className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800 hover:border-amber-500/50 transition-all space-y-2 group"
                >
                  {rel.image_url && (
                    <div className="h-32 rounded-xl overflow-hidden bg-zinc-950 p-1 flex items-center justify-center">
                      <img
                        src={rel.image_url}
                        alt={rel.title_en}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>
                  )}
                  <div>
                    <h4 className="font-tamil text-lg font-bold text-amber-400">
                      {rel.title_ta}
                    </h4>
                    <p className="text-xs font-serif font-bold text-zinc-200 truncate">
                      {rel.title_en}
                    </p>
                  </div>
                  <div className="text-[10px] font-mono text-amber-400/80 flex items-center justify-between pt-1">
                    <span className="flex items-center gap-1">
                      {isCulture ? <Landmark size={10} /> : <HistoryIcon size={10} />}
                      {rel.category}
                    </span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Add Note Modal */}
      <AnimatePresence>
        {showNoteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 relative"
            >
              <div className="flex items-center justify-between pb-4 border-b border-zinc-900">
                <div className="flex items-center gap-2">
                  <FileText className="text-amber-400" size={20} />
                  <h3 className="font-serif text-xl font-bold text-zinc-100">
                    Add Note for <span className="font-tamil text-amber-400">{item.title_ta}</span>
                  </h3>
                </div>
                <button
                  onClick={() => setShowNoteModal(false)}
                  className="p-1.5 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSaveNote} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    Optional Title
                  </label>
                  <input
                    type="text"
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)}
                    placeholder="e.g. Historical dates or dynasty notes..."
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500/60"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    Note Details (Tamil / English)
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={noteBody}
                    onChange={(e) => setNoteBody(e.target.value)}
                    placeholder="Write your personal historical notes here..."
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500/60 font-sans"
                  />
                </div>

                {noteError && (
                  <p className="text-xs text-rose-400 font-mono">{noteError}</p>
                )}

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowNoteModal(false)}
                    className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 text-xs font-mono uppercase tracking-wider cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={noteStatus === "saving" || !noteBody.trim()}
                    className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-xs font-mono uppercase tracking-wider transition-colors disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
                  >
                    {noteStatus === "saving" ? (
                      "Saving..."
                    ) : noteStatus === "success" ? (
                      <>
                        <Check size={14} /> Saved!
                      </>
                    ) : (
                      "Save Note"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
