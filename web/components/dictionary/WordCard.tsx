"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, BookOpen, Tag, Bookmark, BookmarkCheck, FileText, X, Check } from "lucide-react";
import { speak } from "@/lib/curriculum";
import { DictionaryEntry, getRelatedWords } from "@/lib/dictionary";
import { useAuth } from "@/lib/auth";
import { getSavedWords, saveWordApi, unsaveWordApi, createNoteApi } from "@/lib/api";

export default function WordCard({
  entry,
  onSelectRelated,
  isInitiallySaved,
  onSaveToggle,
}: {
  entry: DictionaryEntry;
  onSelectRelated?: (word: DictionaryEntry) => void;
  isInitiallySaved?: boolean;
  onSaveToggle?: (saved: boolean) => void;
}) {
  const related = getRelatedWords(entry);
  const { user, token } = useAuth();

  const [isSaved, setIsSaved] = useState<boolean>(isInitiallySaved || false);
  const [isSaving, setIsSaving] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");
  const [noteStatus, setNoteStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Sync saved state when entry changes or when prop updates
  useEffect(() => {
    if (isInitiallySaved !== undefined) {
      setIsSaved(isInitiallySaved);
    }
  }, [entry.id, isInitiallySaved]);

  const handleToggleSave = async () => {
    if (!token || !user) {
      alert("Please log in to save Tamil words.");
      return;
    }
    if (isSaving) return;
    setIsSaving(true);

    try {
      if (isSaved) {
        await unsaveWordApi(token, entry.id);
        setIsSaved(false);
        if (onSaveToggle) onSaveToggle(false);
      } else {
        await saveWordApi(token, entry.id);
        setIsSaved(true);
        if (onSaveToggle) onSaveToggle(true);
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
    setErrorMessage("");

    try {
      await createNoteApi(token, {
        content_type: "dictionary",
        content_id: entry.id,
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
      setErrorMessage(err.message || "Failed to create note.");
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.3 }}
        className="bg-zinc-950/90 rounded-3xl p-6 sm:p-8 border border-zinc-800/80 shadow-2xl shadow-black/80 relative overflow-hidden group"
      >
        {/* Background Subtle Ambient Glow */}
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-amber-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/10 transition-all" />

        {/* Header Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-zinc-900">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[11px] uppercase tracking-wider font-semibold flex items-center gap-1.5">
              <Tag size={12} />
              {entry.category}
            </span>
            {entry.stage && (
              <span className="px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono text-[10px] uppercase tracking-wider">
                {entry.stage}
              </span>
            )}
          </div>

          {/* Action Buttons: Listen, Save, Add Note */}
          <div className="flex items-center gap-2">
            {/* Listen Audio Speaker Button */}
            <button
              onClick={() => speak(entry.tamil)}
              className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 group/btn cursor-pointer"
              title="Listen to Tamil pronunciation"
            >
              <Volume2 size={15} className="group-hover/btn:scale-110 transition-transform" />
              <span>Listen</span>
            </button>

            {/* Save / Unsave Bookmark Control */}
            <button
              onClick={handleToggleSave}
              disabled={isSaving}
              className={`px-3 py-1.5 rounded-xl border font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                isSaved
                  ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/25"
                  : "bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-300 hover:text-amber-400"
              }`}
              title={isSaved ? "Remove from Saved Tamil" : "Save Tamil word"}
            >
              {isSaved ? (
                <>
                  <BookmarkCheck size={15} className="text-emerald-400" />
                  <span>Saved</span>
                </>
              ) : (
                <>
                  <Bookmark size={15} className="text-zinc-400 group-hover:text-amber-400" />
                  <span>Save</span>
                </>
              )}
            </button>

            {/* Add Note Button */}
            {user && (
              <button
                onClick={() => setShowNoteModal(true)}
                className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-amber-400 font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
                title="Add a personal note for this word"
              >
                <FileText size={15} className="text-amber-400" />
                <span>Note</span>
              </button>
            )}
          </div>
        </div>

        {/* Main Word Display */}
        <div className="space-y-2 mb-6">
          <div className="flex items-baseline gap-4">
            <h2 className="font-tamil text-4xl sm:text-5xl font-bold text-amber-400 tracking-wide">
              {entry.tamil}
            </h2>
            <span className="text-sm font-mono text-zinc-400 font-semibold">
              {entry.transliteration}
            </span>
          </div>

          {/* English Meanings */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {entry.meanings.map((meaning, idx) => (
              <span
                key={idx}
                className="text-sm font-light text-zinc-200 bg-zinc-900/80 px-3 py-1 rounded-lg border border-zinc-800"
              >
                {meaning}
              </span>
            ))}
          </div>
        </div>

        {/* Example Sentence Section */}
        {entry.example && (
          <div className="mt-6 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-2">
            <div className="text-[10px] font-mono text-amber-400 uppercase tracking-widest flex items-center gap-1">
              <BookOpen size={12} /> Example Usage
            </div>
            <p className="font-tamil text-lg font-semibold text-zinc-100">
              {entry.example}
            </p>
            {entry.exampleTranslation && (
              <p className="text-xs text-zinc-400 font-light italic">
                "{entry.exampleTranslation}"
              </p>
            )}
          </div>
        )}

        {/* Related Words Section */}
        {related.length > 0 && (
          <div className="mt-6 pt-4 border-t border-zinc-900">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block mb-3">
              Related Vocabulary
            </span>
            <div className="flex flex-wrap gap-2">
              {related.map((rel) => (
                <button
                  key={rel.id}
                  onClick={() => onSelectRelated && onSelectRelated(rel)}
                  className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-amber-500/40 text-amber-300 hover:text-amber-400 font-tamil text-sm font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{rel.tamil}</span>
                  <span className="text-[10px] font-mono text-zinc-400 font-normal">
                    ({rel.transliteration})
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.div>

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
                    Add Note for <span className="font-tamil text-amber-400">{entry.tamil}</span>
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
                    placeholder="e.g. Memory mnemonic or grammar tip..."
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
                    placeholder="Write your notes or explanations here..."
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500/60 font-sans"
                  />
                </div>

                {errorMessage && (
                  <p className="text-xs text-rose-400 font-mono">{errorMessage}</p>
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
    </>
  );
}

