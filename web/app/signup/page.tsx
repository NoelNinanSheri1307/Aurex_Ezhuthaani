"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth";
import { ApiError } from "@/lib/api";
import StylusEmblem from "@/components/StylusEmblem";
import { ArrowLeft, Lock, Mail, User, Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await register(name, email, password);
      router.push("/journey");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#07070a] bg-grid-pattern flex items-center justify-center px-6 relative text-zinc-100">
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-amber-400 transition-colors">
        <ArrowLeft size={16} /> Back to Home
      </Link>

      <div className="w-full max-w-sm relative z-10">
        <div className="text-center mb-8">
          <StylusEmblem size={90} variant="schoolbag" className="mx-auto mb-3" />
          <h1 className="text-3xl font-serif font-bold text-zinc-100">Begin Free Practice</h1>
          <p className="text-xs font-mono text-zinc-400 mt-1">Create your Ezhuthaani learner profile</p>
        </div>

        <form onSubmit={submit} className="bg-zinc-950/90 rounded-3xl p-8 border border-zinc-800/80 shadow-2xl space-y-5">
          <div>
            <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
              <User size={12} className="text-amber-400" /> Full Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Your name"
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm focus:border-amber-500/80 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
              <Mail size={12} className="text-amber-400" /> Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm focus:border-amber-500/80 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
              <Lock size={12} className="text-amber-400" /> Password
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                placeholder="Minimum 8 characters"
                className="w-full pl-4 pr-11 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm focus:border-amber-500/80 outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                className="absolute right-3 p-1.5 text-zinc-400 hover:text-amber-400 transition-colors cursor-pointer rounded-lg hover:bg-zinc-800/50"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={showPassword ? "eye" : "eye-off"}
                    initial={{ scale: 0.7, opacity: 0, rotate: -20 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0.7, opacity: 0, rotate: 20 }}
                    transition={{ duration: 0.15 }}
                  >
                    {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                  </motion.div>
                </AnimatePresence>
              </button>
            </div>
          </div>

          {error && <p className="text-rose-400 text-xs font-mono bg-rose-500/10 border border-rose-500/30 rounded-xl p-3">{error}</p>}

          <button
            type="submit"
            disabled={busy}
            className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-zinc-950 font-mono font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all"
          >
            {busy ? "Creating Profile…" : "Create Free Account"}
          </button>
        </form>

        <p className="text-center text-xs font-mono text-zinc-400 mt-6">
          Already registered?{" "}
          <Link href="/login" className="text-amber-400 font-bold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}

