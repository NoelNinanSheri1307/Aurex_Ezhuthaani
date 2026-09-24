"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth";
import { api } from "@/lib/api";
import StylusEmblem from "@/components/StylusEmblem";
import {
  MessageSquare,
  Plus,
  Trash2,
  X,
  Send,
  Sparkles,
  Bot,
  PanelLeftClose,
  PanelLeft,
  BookOpen,
  Mic,
  Globe,
} from "lucide-react";
import { useSpeechToText } from "@/lib/stt";

type AIConv = {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
};

type AIMsg = {
  id: number;
  role: "user" | "assistant";
  content: string;
  created_at: string;
};

const SUGGESTIONS = [
  "Explain the 12 Uyir Ezhuthukkal (Vowels)",
  "What is Thirukkural Couplet 1 meaning?",
  "Difference between Vallinam and Mellinam",
  "Tell me about the Keezhadi Excavations",
];

function FormattedMessage({ content }: { content: string }) {
  const lines = content.split("\n");

  const renderInline = (text: string) => {
    const parts: React.ReactNode[] = [];
    let key = 0;
    const regex = /(\*\*[\s\S]*?\*\*|`[^`]+`|\*[^\*]+\*)/g;
    let lastIdx = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIdx) {
        parts.push(text.slice(lastIdx, match.index));
      }
      const str = match[0];
      if (str.startsWith("**") && str.endsWith("**") && str.length >= 4) {
        parts.push(
          <strong key={key++} className="font-bold text-amber-300">
            {str.slice(2, -2)}
          </strong>
        );
      } else if (str.startsWith("`") && str.endsWith("`") && str.length >= 2) {
        parts.push(
          <code key={key++} className="bg-zinc-800 text-amber-300 px-1.5 py-0.5 rounded font-mono text-[11px] border border-zinc-700/60">
            {str.slice(1, -1)}
          </code>
        );
      } else if (str.startsWith("*") && str.endsWith("*") && str.length >= 2) {
        parts.push(
          <em key={key++} className="italic text-zinc-300">
            {str.slice(1, -1)}
          </em>
        );
      } else {
        parts.push(str);
      }
      lastIdx = regex.lastIndex;
    }

    if (lastIdx < text.length) {
      parts.push(text.slice(lastIdx));
    }

    return parts;
  };

  return (
    <div className="space-y-1 text-xs sm:text-sm font-sans leading-relaxed">
      {lines.map((rawLine, idx) => {
        const trimmed = rawLine.trim();

        // Horizontal line
        if (trimmed === "---" || trimmed === "***" || trimmed === "___") {
          return <hr key={idx} className="my-2.5 border-zinc-800" />;
        }

        // Headings
        if (trimmed.startsWith("### ")) {
          return (
            <h4 key={idx} className="font-serif font-bold text-amber-400 text-sm mt-3 mb-1">
              {renderInline(trimmed.slice(4))}
            </h4>
          );
        }
        if (trimmed.startsWith("## ")) {
          return (
            <h3 key={idx} className="font-serif font-bold text-amber-300 text-base mt-3 mb-1">
              {renderInline(trimmed.slice(3))}
            </h3>
          );
        }
        if (trimmed.startsWith("# ")) {
          return (
            <h2 key={idx} className="font-serif font-bold text-amber-300 text-lg mt-4 mb-1">
              {renderInline(trimmed.slice(2))}
            </h2>
          );
        }

        // Indented sub-bullets (e.g. "    *   **தமிழ்:**")
        const indentMatch = rawLine.match(/^(\s+)([\*\-]\s+)(.*)/);
        if (indentMatch) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-5 my-0.5">
              <span className="text-amber-400/80 font-bold text-[10px] select-none mt-0.5">◦</span>
              <div className="flex-1">{renderInline(indentMatch[3])}</div>
            </div>
          );
        }

        // Top-level bullet item (e.g. "* item" or "- item")
        if (/^[\*\-]\s+/.test(trimmed)) {
          const itemText = trimmed.replace(/^[\*\-]\s+/, "");
          return (
            <div key={idx} className="flex items-start gap-2 pl-1 my-0.5">
              <span className="text-amber-400 font-bold text-xs select-none mt-0.5">•</span>
              <div className="flex-1">{renderInline(itemText)}</div>
            </div>
          );
        }

        // Numbered list item (e.g. "1.  item")
        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
        if (numMatch) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-0.5 my-1 font-medium">
              <span className="text-amber-400 font-mono text-xs select-none font-bold">{numMatch[1]}.</span>
              <div className="flex-1">{renderInline(numMatch[2])}</div>
            </div>
          );
        }

        // Empty line
        if (!trimmed) {
          return <div key={idx} className="h-1" />;
        }

        // Paragraph line
        return (
          <p key={idx} className="leading-relaxed">
            {renderInline(rawLine)}
          </p>
        );
      })}
    </div>
  );
}

export default function EzhuthaaniAIChatbot() {
  const { user, token } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [conversations, setConversations] = useState<AIConv[]>([]);
  const [activeConvId, setActiveConvId] = useState<number | null>(null);
  const [messages, setMessages] = useState<AIMsg[]>([]);

  const [input, setInput] = useState("");
  const [loadingConvs, setLoadingConvs] = useState(false);
  const [loadingMsgs, setLoadingMsgs] = useState(false);
  const [sending, setSending] = useState(false);

  const {
    isListening,
    isTranscribing,
    fullTranscript,
    speechSupported,
    currentLang,
    setCurrentLang,
    toggleListening,
    resetTranscript,
  } = useSpeechToText({
    lang: "ta-IN",
    continuous: true,
    interimResults: true,
    onResult: (text) => {
      if (text) {
        setInput(text);
      }
    },
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of message list
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, sending]);

  // Load conversations when opened & authenticated
  useEffect(() => {
    if (isOpen && token && user) {
      fetchConversations();
    }
  }, [isOpen, token, user]);

  const fetchConversations = async () => {
    if (!token) return;
    setLoadingConvs(true);
    try {
      const data = await api<AIConv[]>("/api/ai/conversations", { token });
      setConversations(data);
      if (data.length > 0 && !activeConvId) {
        selectConversation(data[0].id);
      } else if (data.length === 0) {
        handleCreateNewChat();
      }
    } catch {
      // Gracefully handle auth state
    } finally {
      setLoadingConvs(false);
    }
  };

  const selectConversation = async (convId: number) => {
    if (!token) return;
    setActiveConvId(convId);
    setLoadingMsgs(true);
    try {
      const msgs = await api<AIMsg[]>(`/api/ai/conversations/${convId}/messages`, { token });
      setMessages(msgs);
    } catch {
      setMessages([]);
    } finally {
      setLoadingMsgs(false);
    }
  };

  const handleCreateNewChat = async () => {
    if (!token) return;
    try {
      const newConv = await api<AIConv>("/api/ai/conversations", { method: "POST", token });
      setConversations((prev) => [newConv, ...prev]);
      setActiveConvId(newConv.id);
      setMessages([]);
    } catch (err) {
      console.error("Failed to create conversation", err);
    }
  };

  const handleDeleteConv = async (convId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!token) return;
    try {
      await api(`/api/ai/conversations/${convId}`, { method: "DELETE", token });
      const filtered = conversations.filter((c) => c.id !== convId);
      setConversations(filtered);
      if (activeConvId === convId) {
        if (filtered.length > 0) {
          selectConversation(filtered[0].id);
        } else {
          handleCreateNewChat();
        }
      }
    } catch (err) {
      console.error("Failed to delete conversation", err);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || !token || !activeConvId || sending) return;

    if (!textToSend) setInput("");

    // Optimistically add user message
    const tempUserMsg: AIMsg = {
      id: Date.now(),
      role: "user",
      content: text,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempUserMsg]);
    setSending(true);

    try {
      const res = await api<{ user_message: AIMsg; assistant_message: AIMsg }>(
        `/api/ai/conversations/${activeConvId}/messages`,
        {
          method: "POST",
          token,
          body: JSON.stringify({ content: text }),
        }
      );

      // Replace optimistic message and append assistant reply
      setMessages((prev) => {
        const withoutTemp = prev.filter((m) => m.id !== tempUserMsg.id);
        return [...withoutTemp, res.user_message, res.assistant_message];
      });

      // Refresh conversations list to update titles/timestamps
      const updatedConvs = await api<AIConv[]>("/api/ai/conversations", { token });
      setConversations(updatedConvs);
    } catch (err: any) {
      const errorMsg: AIMsg = {
        id: Date.now() + 1,
        role: "assistant",
        content: "வணக்கம்! An error occurred while communicating with Ezhuthaani AI. Please check your network connection.",
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setSending(false);
    }
  };

  if (!user) return null;

  return (
    <>
      {/* FLOATING CIRCULAR MASCOT TRIGGER BUTTON */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative group p-3 rounded-full bg-zinc-950 border-2 border-amber-500/60 shadow-[0_0_30px_rgba(245,158,11,0.35)] hover:shadow-[0_0_40px_rgba(245,158,11,0.55)] transition-all cursor-pointer flex items-center justify-center"
        >
          <StylusEmblem variant="landing" size={54} />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 border border-zinc-950"></span>
          </span>

          {/* Hover Tooltip */}
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-700 text-amber-300 font-mono text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
            Ezhuthaani AI Assistant ✦
          </span>
        </motion.button>
      </div>

      {/* CHATBOT MODAL OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-end p-2 sm:p-6 bg-black/60 backdrop-blur-sm pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 30 }}
              transition={{ type: "spring", stiffness: 350, damping: 26 }}
              className="relative w-full sm:w-[880px] h-[90vh] max-h-[720px] bg-zinc-950 border-2 border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col sm:flex-row glow-amber"
            >
              {/* SIDEBAR: CONVERSATION HISTORY */}
              <div
                className={`${sidebarOpen ? "w-full sm:w-64" : "hidden sm:hidden"
                  } border-r border-zinc-800 bg-zinc-900/80 p-4 flex flex-col justify-between shrink-0 transition-all`}
              >
                <div className="space-y-4 flex-1 flex flex-col overflow-hidden">
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                    <div className="flex items-center gap-2">
                      <Bot size={18} className="text-amber-400" />
                      <span className="font-serif font-bold text-sm text-zinc-100">Conversations</span>
                    </div>
                    <button
                      onClick={handleCreateNewChat}
                      className="p-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition-colors cursor-pointer"
                      title="New Chat"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    onClick={handleCreateNewChat}
                    className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-zinc-950 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:from-amber-400 hover:to-amber-300 transition-all shadow-md cursor-pointer shrink-0"
                  >
                    <Plus size={15} /> New Tamil Chat
                  </button>

                  <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
                    {loadingConvs ? (
                      <div className="text-center py-8 text-xs font-mono text-zinc-500">Loading history…</div>
                    ) : conversations.length === 0 ? (
                      <div className="text-center py-8 text-xs font-mono text-zinc-500">No past chats.</div>
                    ) : (
                      conversations.map((c) => (
                        <div
                          key={c.id}
                          onClick={() => selectConversation(c.id)}
                          className={`group flex items-center justify-between p-2.5 rounded-xl border text-xs font-mono transition-all cursor-pointer ${activeConvId === c.id
                              ? "bg-amber-500/15 border-amber-500/40 text-amber-300 font-semibold"
                              : "bg-zinc-950/40 border-zinc-800/80 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                            }`}
                        >
                          <div className="flex items-center gap-2 truncate pr-2">
                            <MessageSquare size={13} className="shrink-0 text-amber-500/70" />
                            <span className="truncate">{c.title}</span>
                          </div>
                          <button
                            onClick={(e) => handleDeleteConv(c.id, e)}
                            className="opacity-0 group-hover:opacity-100 p-1 hover:text-rose-400 text-zinc-500 transition-opacity shrink-0"
                            title="Delete"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-800 text-[10px] font-mono text-zinc-500 text-center">

                </div>
              </div>

              {/* MAIN CHAT AREA */}
              <div className="flex-1 flex flex-col h-full overflow-hidden bg-zinc-950">
                {/* MODAL HEADER */}
                <div className="px-5 py-3.5 border-b border-zinc-800/80 flex items-center justify-between bg-zinc-950/90 shrink-0">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSidebarOpen(!sidebarOpen)}
                      className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 cursor-pointer"
                      title="Toggle Sidebar"
                    >
                      {sidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeft size={18} />}
                    </button>
                    <StylusEmblem variant="literature" size={40} />
                    <div>
                      <h3 className="font-serif text-lg font-bold text-zinc-100 flex items-center gap-2">
                        Ezhuthaani AI Assistant
                        <span className="text-[10px] font-mono uppercase font-normal px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400">
                          Tamil Tutor
                        </span>
                      </h3>
                      <p className="text-[11px] font-mono text-zinc-400">
                        Ask about Tamil letters, grammar, Thirukkural, literature & culture
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 cursor-pointer transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>

                {/* MESSAGES BODY */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 custom-scrollbar">
                  {loadingMsgs ? (
                    <div className="flex items-center justify-center h-full">
                      <StylusEmblem variant="thinking" size={70} />
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-4 py-8">
                      <StylusEmblem variant="teaching" size={85} />
                      <div>
                        <h4 className="font-serif text-xl font-bold text-amber-300">
                          வணக்கம்! I am Ezhuthaani AI
                        </h4>
                        <p className="text-xs font-mono text-zinc-400 mt-1 leading-relaxed">
                          Your dedicated Tamil learning guide. Ask any question about Tamil grammar, script, Thirukkural couplets, or cultural history.
                        </p>
                      </div>

                      {/* Suggestion Chips */}
                      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                        {SUGGESTIONS.map((sug, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSendMessage(sug)}
                            className="p-3 rounded-xl bg-zinc-900/90 hover:bg-amber-500/10 border border-zinc-800 hover:border-amber-500/40 text-left text-xs font-mono text-zinc-300 hover:text-amber-300 transition-all flex items-center justify-between cursor-pointer group"
                          >
                            <span>{sug}</span>
                            <Sparkles size={12} className="text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    messages.map((m) => (
                      <div
                        key={m.id}
                        className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"
                          }`}
                      >
                        {m.role === "assistant" && (
                          <StylusEmblem variant="literature" size={32} className="shrink-0 mt-1" />
                        )}
                        <div
                          className={`rounded-2xl p-4 max-w-[85%] text-xs sm:text-sm font-sans leading-relaxed shadow-md ${m.role === "user"
                              ? "bg-amber-500/20 border border-amber-500/40 text-amber-100 rounded-br-xs"
                              : "bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-bl-xs"
                            }`}
                        >
                          <FormattedMessage content={m.content} />
                        </div>
                      </div>
                    ))
                  )}

                  {sending && (
                    <div className="flex gap-3 justify-start items-center">
                      <StylusEmblem variant="thinking" size={32} className="shrink-0" />
                      <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-amber-400 font-mono text-xs flex items-center gap-2">
                        <Sparkles size={14} className="animate-spin" /> Ezhuthaani AI is thinking…
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* INPUT BAR */}
                <div className="p-4 border-t border-zinc-800/80 bg-zinc-950/90 shrink-0 space-y-2">
                  {isListening && (
                    <div className="text-center font-mono text-xs text-rose-400 bg-rose-500/10 border border-rose-500/30 py-1.5 px-3 rounded-xl animate-pulse">
                      Listening continuously in {currentLang === "ta-IN" ? "Tamil" : "English"}... Speak your question!
                    </div>
                  )}

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (isListening) toggleListening();
                      handleSendMessage();
                    }}
                    className="flex items-center gap-2"
                  >
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={isListening ? "Listening to your voice..." : "Ask Ezhuthaani AI in Tamil or English..."}
                        disabled={sending}
                        className={`w-full pl-4 pr-16 py-3 rounded-2xl bg-zinc-900 border text-zinc-100 text-xs sm:text-sm font-mono placeholder:text-zinc-500 focus:outline-none transition-all disabled:opacity-50 ${
                          isListening ? "border-rose-500/70 ring-1 ring-rose-500/30" : "border-zinc-800 focus:border-amber-500/60"
                        }`}
                      />

                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setCurrentLang(currentLang === "ta-IN" ? "en-IN" : "ta-IN")}
                          className="px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] font-mono text-zinc-400 hover:text-amber-400"
                          title={`Current voice language: ${currentLang === "ta-IN" ? "Tamil" : "English"}`}
                        >
                          {currentLang === "ta-IN" ? "TA" : "EN"}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (!isListening) resetTranscript();
                            toggleListening();
                          }}
                          className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                            isListening
                              ? "bg-rose-500/20 text-rose-400 animate-pulse"
                              : "text-zinc-400 hover:text-amber-400"
                          }`}
                          title={isListening ? "Stop listening" : "Speak question"}
                        >
                          <Mic size={16} className={isListening ? "animate-bounce" : ""} />
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={!input.trim() || sending}
                      className="p-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-zinc-950 font-bold transition-all shadow-lg shadow-amber-500/20 cursor-pointer shrink-0"
                    >
                      <Send size={16} />
                    </button>
                  </form>
                  <div className="text-[10px] font-mono text-zinc-500 text-center">
                    Ezhuthaani AI answers questions strictly related to Tamil language & learning.
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
