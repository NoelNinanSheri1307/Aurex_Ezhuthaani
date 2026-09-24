"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ContentImage from "@/components/ContentImage";
import {
  ArrowLeft,
  Volume2,
  VolumeX,
  Bookmark,
  BookmarkCheck,
  FileText,
  ShieldCheck,
  Lock,
  ExternalLink,
  BookOpen,
  BookText,
  Calendar,
  Feather,
  Globe,
  Tag,
  Share2,
  Check,
  RefreshCw,
  AlertCircle,
  Landmark,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { speakTamil, stopSpeech } from "@/lib/tts";
import {
  getLiteratureDetail,
  getSavedLiterature,
  saveLiteratureApi,
  unsaveLiteratureApi,
  createNoteApi,
} from "@/lib/api";
import { LiteratureItemDetail } from "@/lib/types";

export default function LiteratureDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const { token, user } = useAuth();

  const [item, setItem] = useState<LiteratureItemDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [saveLoading, setSaveLoading] = useState<boolean>(false);

  // Note modal state
  const [showNoteModal, setShowNoteModal] = useState<boolean>(false);
  const [noteTitle, setNoteTitle] = useState<string>("");
  const [noteBody, setNoteBody] = useState<string>("");
  const [noteSaving, setNoteSaving] = useState<boolean>(false);
  const [noteSuccess, setNoteSuccess] = useState<boolean>(false);

  // TTS state
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [ttsSupported, setTtsSupported] = useState<boolean>(true);

  // Share state
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTtsSupported("speechSynthesis" in window);
    }
  }, []);

  const fetchDetail = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getLiteratureDetail(slug);
      setItem(data);
      if (data) {
        setNoteTitle(`Notes on ${data.title_en}`);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load literature details.");
    } finally {
      setLoading(false);
    }
  };

  const checkSaved = async () => {
    if (!token) return;
    try {
      const savedList = await getSavedLiterature(token);
      setIsSaved(savedList.some((s) => s.slug === slug));
    } catch {
      // Ignore fallback
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [slug]);

  useEffect(() => {
    checkSaved();
  }, [slug, token]);

  const handleToggleSave = async () => {
    if (!token) {
      router.push("/auth/login");
      return;
    }
    setSaveLoading(true);
    try {
      if (isSaved) {
        await unsaveLiteratureApi(token, slug);
        setIsSaved(false);
      } else {
        await saveLiteratureApi(token, slug);
        setIsSaved(true);
      }
    } catch (err: any) {
      alert(err.message || "Failed to save literature item.");
    } finally {
      setSaveLoading(false);
    }
  };

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      router.push("/auth/login");
      return;
    }
    if (!noteBody.trim()) return;
    setNoteSaving(true);
    try {
      await createNoteApi(token, {
        content_type: "literature",
        content_id: slug,
        title: noteTitle.trim() || `Notes on ${item?.title_en}`,
        body: noteBody.trim(),
      });
      setNoteSuccess(true);
      setTimeout(() => {
        setNoteSuccess(false);
        setShowNoteModal(false);
        setNoteBody("");
      }, 1500);
    } catch (err: any) {
      alert(err.message || "Failed to save note.");
    } finally {
      setNoteSaving(false);
    }
  };

  const speakText = (text: string) => {
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    speakTamil(text, {
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-12 h-12 rounded-full border-2 border-amber-500 border-t-transparent animate-spin mx-auto" />
        <p className="text-zinc-400 font-mono text-sm">Opening classical manuscript archive...</p>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <AlertCircle className="mx-auto text-red-400" size={40} />
        <h2 className="text-xl font-bold text-zinc-100">Literary Work Not Found</h2>
        <p className="text-sm text-zinc-400 font-mono">{error || "The requested work does not exist."}</p>
        <Link
          href="/literature"
          className="px-4 py-2 rounded-xl bg-amber-500/10 text-amber-400 text-xs font-semibold inline-flex items-center gap-1.5 border border-amber-500/30"
        >
          <ArrowLeft size={14} /> Return to Literature Library
        </Link>
      </div>
    );
  }

  const isPublicDomain = item.copyright_status?.includes("Public Domain");

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Navigation */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/literature"
          className="px-3.5 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-amber-400 text-xs font-mono font-medium inline-flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft size={14} /> Literature Library
        </Link>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
            title="Share Work Link"
          >
            {copied ? <Check size={16} className="text-emerald-400" /> : <Share2 size={16} />}
          </button>

          <button
            onClick={() => setShowNoteModal(true)}
            className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-amber-400 text-xs font-mono font-medium inline-flex items-center gap-1.5 transition-colors"
          >
            <FileText size={14} className="text-amber-400" /> Add Note
          </button>

          <button
            onClick={handleToggleSave}
            disabled={saveLoading}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold inline-flex items-center gap-1.5 border transition-all ${
              isSaved
                ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
                : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-amber-500/40"
            }`}
          >
            {isSaved ? (
              <>
                <BookmarkCheck size={14} className="text-amber-400" /> Saved
              </>
            ) : (
              <>
                <Bookmark size={14} /> Save Work
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Header Banner */}
      <div className="bg-zinc-950/80 rounded-3xl p-6 sm:p-8 border border-zinc-800/80 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[11px] uppercase tracking-wider font-semibold">
              {item.category}
            </span>
            {item.genre && (
              <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono text-[11px]">
                {item.genre}
              </span>
            )}
            {item.literary_tradition && (
              <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono text-[11px]">
                {item.literary_tradition}
              </span>
            )}
            {isPublicDomain ? (
              <span className="px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 font-mono text-[11px] flex items-center gap-1">
                <ShieldCheck size={12} /> Public Domain
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono text-[11px] flex items-center gap-1">
                <Lock size={12} /> Copyrighted — Educational Synopsis
              </span>
            )}
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-zinc-100 leading-tight">
            {item.title_en}
          </h1>
          <h2 className="font-tamil text-2xl sm:text-3xl font-semibold text-amber-400 leading-snug">
            {item.title_ta}
          </h2>
        </div>

        {/* Authorship & Era Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/60 text-xs font-mono">
          {item.author && (
            <div>
              <span className="text-zinc-500 text-[10px] uppercase block mb-0.5">Author / Poet</span>
              <span className="text-zinc-200 font-semibold flex items-center gap-1">
                <Feather size={12} className="text-amber-400" /> {item.author}
              </span>
            </div>
          )}
          {item.period && (
            <div>
              <span className="text-zinc-500 text-[10px] uppercase block mb-0.5">Period</span>
              <span className="text-zinc-200 font-semibold flex items-center gap-1">
                <Calendar size={12} /> {item.period}
              </span>
            </div>
          )}
          {item.era && (
            <div>
              <span className="text-zinc-500 text-[10px] uppercase block mb-0.5">Era</span>
              <span className="text-zinc-200 font-semibold">{item.era}</span>
            </div>
          )}
          {item.region && (
            <div>
              <span className="text-zinc-500 text-[10px] uppercase block mb-0.5">Region</span>
              <span className="text-zinc-200 font-semibold flex items-center gap-1">
                <Globe size={12} /> {item.region}
              </span>
            </div>
          )}
        </div>

        {/* Feature Image if available */}
        {item.image_url && (
          <div className="space-y-2">
            <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-zinc-800">
              <ContentImage src={item.image_url} alt={item.title_en} className="w-full h-full object-cover" />
            </div>
            {item.image_caption && (
              <p className="text-[11px] font-mono text-zinc-500 text-center">{item.image_caption}</p>
            )}
          </div>
        )}

        {/* Overview Synopses */}
        <div className="space-y-4 pt-2">
          <h3 className="text-sm font-mono uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-2">
            <BookOpen size={15} /> Overview & Literary Synopsis
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60 space-y-1.5">
              <span className="text-[10px] font-mono uppercase text-zinc-500">English Summary</span>
              <p className="text-xs text-zinc-300 font-light leading-relaxed">{item.summary_en}</p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60 space-y-1.5">
              <span className="text-[10px] font-mono uppercase text-zinc-500">தமிழ் சுருக்கம்</span>
              <p className="text-sm font-tamil text-amber-200/90 leading-relaxed">{item.summary_ta}</p>
            </div>
          </div>
        </div>

        {/* Text Content Section */}
        <div className="space-y-4 pt-4 border-t border-zinc-800/80">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-base font-serif font-bold text-zinc-100 flex items-center gap-2">
              <BookText size={18} className="text-amber-400" /> Literature Text & Translation
            </h3>
            {ttsSupported && (
              <button
                onClick={() => speakText(item.content_ta)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium inline-flex items-center gap-1.5 border transition-all ${
                  isSpeaking
                    ? "bg-amber-500/20 border-amber-500 text-amber-300 animate-pulse"
                    : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-amber-500/40"
                }`}
              >
                {isSpeaking ? (
                  <>
                    <VolumeX size={14} /> Stop TTS
                  </>
                ) : (
                  <>
                    <Volume2 size={14} className="text-amber-400" /> Listen Tamil TTS
                  </>
                )}
              </button>
            )}
          </div>

          {/* Tamil Text Block */}
          <div className="p-6 rounded-2xl bg-zinc-900/80 border border-amber-500/20 space-y-3 relative">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block">
              மூல உரை (Tamil Text / Excerpt)
            </span>
            <p className="font-tamil text-base sm:text-lg text-amber-100/95 leading-loose whitespace-pre-line tracking-wide">
              {item.content_ta}
            </p>
          </div>

          {/* English Commentary / Translation */}
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold block">
              English Commentary & Literary Context
            </span>
            <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed whitespace-pre-line">
              {item.content_en}
            </p>
          </div>

          {/* Copyright External Link Notice */}
          {!isPublicDomain && item.external_link && (
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between gap-4 text-xs font-mono">
              <div className="space-y-0.5">
                <span className="text-zinc-200 font-semibold">Legitimate External Library / Source</span>
                <p className="text-[11px] text-zinc-400">
                  Read full copyrighted edition via authorized library repositories.
                </p>
              </div>
              <a
                href={item.external_link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-semibold inline-flex items-center gap-1.5 border border-amber-500/30 transition-colors shrink-0"
              >
                Access Source <ExternalLink size={13} />
              </a>
            </div>
          )}
        </div>

        {/* Source & Provenance Attribution */}
        <div className="pt-4 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-500">
          <span>Source: {item.source_name}</span>
          {item.license && (
            <span className="px-2.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
              License: {item.license}
            </span>
          )}
        </div>
      </div>

      {/* Related Learning Section */}
      {item.related && item.related.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-serif text-lg font-bold text-zinc-100 flex items-center gap-2">
            <Landmark size={18} className="text-amber-400" /> Related Literature & Knowledge
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {item.related.map((rel) => {
              const targetRoute = rel.content_type === "article" ? `/knowledge/${rel.slug}` : rel.content_type === "history" ? `/history/${rel.slug}` : rel.content_type === "culture" ? `/culture/${rel.slug}` : `/literature/${rel.slug}`;
              return (
                <Link
                  key={rel.slug}
                  href={targetRoute}
                  className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80 hover:border-amber-500/40 transition-all space-y-2 group"
                >
                  <span className="text-[10px] font-mono text-amber-400/90 uppercase">{rel.category}</span>
                  <h4 className="font-serif text-sm font-semibold text-zinc-200 group-hover:text-amber-400 transition-colors line-clamp-1">
                    {rel.title_en}
                  </h4>
                  <p className="font-tamil text-xs text-amber-200/80 line-clamp-1">{rel.title_ta}</p>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Add Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-zinc-100 flex items-center gap-2">
                <FileText size={18} className="text-amber-400" /> Add Literature Note
              </h3>
              <button
                onClick={() => setShowNoteModal(false)}
                className="text-zinc-500 hover:text-zinc-300 text-xs font-mono"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleCreateNote} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-zinc-400 block mb-1">Note Title</label>
                <input
                  type="text"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-100 text-xs focus:outline-none focus:border-amber-500/50"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-mono text-zinc-400 block mb-1">Note Content</label>
                <textarea
                  rows={4}
                  placeholder="Record your thoughts, vocabulary, or literary insights..."
                  value={noteBody}
                  onChange={(e) => setNoteBody(e.target.value)}
                  className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-100 text-xs focus:outline-none focus:border-amber-500/50"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNoteModal(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={noteSaving}
                  className="px-5 py-2 rounded-xl bg-amber-500 text-zinc-950 font-bold text-xs font-mono hover:bg-amber-400 transition-colors disabled:opacity-50"
                >
                  {noteSuccess ? "Saved Note!" : noteSaving ? "Saving..." : "Save Note"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
