"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Search, Plus, Edit2, Trash2, ExternalLink, RefreshCw, AlertCircle, X, Check, BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { getNotes, createNoteApi, updateNoteApi, deleteNoteApi } from "@/lib/api";
import { Note } from "@/lib/types";
import { DICTIONARY_ENTRIES, DictionaryEntry } from "@/lib/dictionary";

export default function MyNotesPage() {
  const { user, token, loading: authLoading } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal State for New / Edit Note
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [modalContentType, setModalContentType] = useState("dictionary");
  const [modalContentId, setModalContentId] = useState("general");
  const [modalStatus, setModalStatus] = useState<"idle" | "saving" | "error">("idle");
  const [modalError, setModalError] = useState("");

  // Deletion Modal / State
  const [deletingNoteId, setDeletingNoteId] = useState<number | null>(null);

  const dictionaryMap = useMemo(() => {
    const map = new Map<string, DictionaryEntry>();
    DICTIONARY_ENTRIES.forEach((e) => map.set(e.id, e));
    return map;
  }, []);

  const fetchUserNotes = async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await getNotes(token);
      setNotes(data);
    } catch (err: any) {
      setError(err.message || "Failed to load your notes from server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      fetchUserNotes();
    }
  }, [token, authLoading]);

  const openCreateModal = () => {
    setEditingNote(null);
    setModalTitle("");
    setModalBody("");
    setModalContentType("dictionary");
    setModalContentId(DICTIONARY_ENTRIES[0]?.id || "general");
    setModalStatus("idle");
    setModalError("");
    setShowModal(true);
  };

  const openEditModal = (note: Note) => {
    setEditingNote(note);
    setModalTitle(note.title || "");
    setModalBody(note.body);
    setModalContentType(note.content_type);
    setModalContentId(note.content_id);
    setModalStatus("idle");
    setModalError("");
    setShowModal(true);
  };

  const handleSaveNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    if (!modalBody.trim()) return;

    setModalStatus("saving");
    setModalError("");

    try {
      if (editingNote) {
        const updated = await updateNoteApi(token, editingNote.id, {
          title: modalTitle.trim() || undefined,
          body: modalBody.trim(),
        });
        setNotes((prev) => prev.map((n) => (n.id === editingNote.id ? updated : n)));
      } else {
        const created = await createNoteApi(token, {
          content_type: modalContentType,
          content_id: modalContentId,
          title: modalTitle.trim() || undefined,
          body: modalBody.trim(),
        });
        setNotes((prev) => [created, ...prev]);
      }
      setShowModal(false);
    } catch (err: any) {
      setModalStatus("error");
      setModalError(err.message || "Failed to save note.");
    }
  };

  const handleDeleteNote = async (noteId: number) => {
    if (!token) return;
    try {
      await deleteNoteApi(token, noteId);
      setNotes((prev) => prev.filter((n) => n.id !== noteId));
      setDeletingNoteId(null);
    } catch (err: any) {
      alert(err.message || "Failed to delete note.");
    }
  };

  // Filter notes
  const filteredNotes = useMemo(() => {
    if (!searchQuery.trim()) return notes;
    const q = searchQuery.toLowerCase().trim();
    return notes.filter((n) => {
      const titleMatch = n.title?.toLowerCase().includes(q);
      const bodyMatch = n.body.toLowerCase().includes(q);
      const dictEntry = dictionaryMap.get(n.content_id);
      const dictMatch =
        dictEntry &&
        (dictEntry.tamil.includes(q) ||
          dictEntry.transliteration.toLowerCase().includes(q) ||
          dictEntry.meanings.some((m) => m.toLowerCase().includes(q)));
      return titleMatch || bodyMatch || dictMatch;
    });
  }, [notes, searchQuery, dictionaryMap]);

  if (authLoading || (loading && notes.length === 0 && !error)) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6 text-center">
        <div className="space-y-4">
          <div className="w-12 h-12 rounded-full border-2 border-amber-500/30 border-t-amber-400 animate-spin mx-auto" />
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-400">
            Loading your personal notes...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-800/80">
        <div className="space-y-3">
          <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[11px] uppercase tracking-wider font-semibold inline-flex items-center gap-1.5">
            <FileText size={13} /> My Notes • என் குறிப்புகள்
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-100">
            Personal Notes <span className="font-tamil text-amber-400 text-2xl sm:text-3xl font-semibold">என் குறிப்புகள்</span>
          </h1>
          <p className="text-zinc-400 text-sm max-w-2xl font-light">
            Capture custom explanations, mnemonics, and learning notes attached to your Tamil vocabulary and lessons.
          </p>
        </div>

        <div>
          <button
            onClick={openCreateModal}
            className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono font-semibold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-amber-500/20 flex items-center gap-2 cursor-pointer"
          >
            <Plus size={16} /> New Note
          </button>
        </div>
      </div>

      {/* Backend Failure Warning */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-between gap-4 text-rose-300 text-xs font-mono">
          <div className="flex items-center gap-2">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
          <button
            onClick={fetchUserNotes}
            className="px-3 py-1 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-200 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw size={12} /> Retry
          </button>
        </div>
      )}

      {/* Search & Filter Controls */}
      {notes.length > 0 && (
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes by title, text, or attached Tamil word..."
            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500/60 shadow-lg"
          />
        </div>
      )}

      {/* Empty State */}
      {notes.length === 0 && !loading && (
        <div className="bg-zinc-950/80 rounded-3xl p-8 sm:p-12 border border-zinc-800/80 text-center space-y-4 max-w-xl mx-auto shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
            <FileText size={28} />
          </div>
          <h2 className="font-serif text-2xl font-bold text-zinc-100">
            No notes yet
          </h2>
          <p className="text-zinc-400 text-sm font-light leading-relaxed">
            Save something interesting while learning Tamil and add your own explanation or memory note.
          </p>
          <div className="pt-2">
            <button
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono font-semibold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              <Plus size={16} /> Create Your First Note
            </button>
          </div>
        </div>
      )}

      {/* Notes List */}
      {filteredNotes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence>
            {filteredNotes.map((note) => {
              const dictEntry = dictionaryMap.get(note.content_id);
              const formattedDate = note.updated_at
                ? new Date(note.updated_at).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : null;

              return (
                <motion.div
                  key={note.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-zinc-950/90 rounded-2xl p-6 border border-zinc-800/80 shadow-xl space-y-4 relative flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Attached Context Badge */}
                    <div className="flex items-center justify-between gap-2 pb-3 border-b border-zinc-900">
                      {dictEntry ? (
                        <Link
                          href={`/dictionary?word=${encodeURIComponent(dictEntry.tamil)}`}
                          className="px-2.5 py-1 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-tamil font-semibold text-sm transition-colors flex items-center gap-1.5 group"
                          title="Open attached word in Dictionary"
                        >
                          <BookOpen size={13} className="text-amber-400" />
                          <span>{dictEntry.tamil}</span>
                          <span className="text-[10px] font-mono text-zinc-400 font-normal">
                            ({dictEntry.transliteration})
                          </span>
                          <ExternalLink size={12} className="group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono text-[10px] uppercase">
                          {note.content_type}
                        </span>
                      )}

                      {/* Action buttons: Edit & Delete */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openEditModal(note)}
                          className="p-1.5 rounded-lg bg-zinc-900 hover:bg-amber-500/20 border border-zinc-800 hover:border-amber-500/30 text-zinc-400 hover:text-amber-400 transition-colors cursor-pointer"
                          title="Edit note"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => setDeletingNoteId(note.id)}
                          className="p-1.5 rounded-lg bg-zinc-900 hover:bg-rose-500/20 border border-zinc-800 hover:border-rose-500/30 text-zinc-400 hover:text-rose-400 transition-colors cursor-pointer"
                          title="Delete note"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Title */}
                    {note.title && (
                      <h3 className="font-serif text-lg font-bold text-zinc-100">
                        {note.title}
                      </h3>
                    )}

                    {/* Note Body */}
                    <p className="text-sm text-zinc-300 font-light leading-relaxed whitespace-pre-wrap">
                      {note.body}
                    </p>
                  </div>

                  {/* Timestamp Footer */}
                  {formattedDate && (
                    <div className="pt-3 border-t border-zinc-900 text-[10px] font-mono text-zinc-500">
                      Updated {formattedDate}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* No Filter Results */}
      {notes.length > 0 && filteredNotes.length === 0 && (
        <div className="p-8 text-center bg-zinc-950/60 rounded-2xl border border-zinc-800 text-zinc-400 font-mono text-xs">
          No notes match "{searchQuery}"
        </div>
      )}

      {/* Create / Edit Note Modal */}
      <AnimatePresence>
        {showModal && (
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
                    {editingNote ? "Edit Note" : "Create New Note"}
                  </h3>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1.5 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSaveNote} className="space-y-4">
                {!editingNote && (
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                      Attach to Dictionary Word
                    </label>
                    <select
                      value={modalContentId}
                      onChange={(e) => setModalContentId(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-amber-400 font-tamil font-semibold focus:outline-none focus:border-amber-500/60"
                    >
                      {DICTIONARY_ENTRIES.map((e) => (
                        <option key={e.id} value={e.id}>
                          {e.tamil} ({e.transliteration} — {e.meanings[0]})
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    Optional Title
                  </label>
                  <input
                    type="text"
                    value={modalTitle}
                    onChange={(e) => setModalTitle(e.target.value)}
                    placeholder="e.g. Memory trick or grammar note..."
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500/60"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    Note Details (Tamil / English)
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={modalBody}
                    onChange={(e) => setModalBody(e.target.value)}
                    placeholder="Write your personal notes, context, or explanations..."
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500/60 font-sans"
                  />
                </div>

                {modalError && (
                  <p className="text-xs text-rose-400 font-mono">{modalError}</p>
                )}

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 text-xs font-mono uppercase tracking-wider cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={modalStatus === "saving" || !modalBody.trim()}
                    className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-xs font-mono uppercase tracking-wider transition-colors disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
                  >
                    {modalStatus === "saving" ? "Saving..." : "Save Note"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deletingNoteId !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl p-6 shadow-2xl space-y-4 text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto">
                <Trash2 size={24} />
              </div>
              <h3 className="font-serif text-xl font-bold text-zinc-100">
                Delete this note?
              </h3>
              <p className="text-zinc-400 text-xs font-light leading-relaxed">
                This action will permanently delete your note from the database. It cannot be undone.
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setDeletingNoteId(null)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 text-xs font-mono uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteNote(deletingNoteId)}
                  className="px-5 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-semibold text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Delete Note
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
