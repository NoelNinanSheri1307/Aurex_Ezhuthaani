"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth";
import StylusEmblem from "@/components/StylusEmblem";
import LevelUpModal from "@/components/LevelUpModal";
import {
  Compass,
  Type,
  BookOpen,
  BookText,
  Library,
  Bookmark,
  FileText,
  Landmark,
  History as HistoryIcon,
  ScrollText,
  Milestone,
  Map,
  Blocks,
  Gamepad2,
  CalendarCheck,
  User as UserIcon,
  LogOut,
  Flame,
  Menu,
  X,
  ChevronRight,
  Volume2,
  ArrowLeft,
  Music,
} from "lucide-react";

export default function SidebarNav() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const xpForNextLevel = (lvl: number) => lvl * lvl * 100;
  const currLevelFloor = (user.level - 1) ** 2 * 100;
  const currLevelSpan = xpForNextLevel(user.level) - currLevelFloor;
  const xpIntoLevel = user.xp - currLevelFloor;
  const levelPct = Math.min(100, Math.round((xpIntoLevel / currLevelSpan) * 100));

  const navItems = [
    { href: "/daily", label: "Daily Tamil", labelTa: "இன்றைய தமிழ்", icon: CalendarCheck },
    { href: "/journey", label: "Journey", labelTa: "பயணம்", icon: Compass },
    { href: "/library", label: "Library Archive", labelTa: "நூல் நிலையம்", icon: Library },
    { href: "/rhymes", label: "Tamil Rhymes", labelTa: "தமிழ் பாடல்கள்", icon: Music },
    { href: "/read-aloud", label: "Reading Aloud", labelTa: "உரை வாசிப்பு", icon: Volume2 },
    { href: "/word-builder", label: "Word Builder", labelTa: "சொல் உருவாக்கி", icon: Blocks },
    { href: "/hangman", label: "Hangman", labelTa: "சொல் விளையாட்டு", icon: Gamepad2 },
    { href: "/script", label: "Script", labelTa: "எழுத்துக்கள்", icon: Type },
    { href: "/script-history", label: "Script History", labelTa: "எழுத்து வரலாறு", icon: ScrollText },
    { href: "/map", label: "Map Explorer", labelTa: "வரலாற்று வரைபடம்", icon: Map },
    { href: "/dictionary", label: "Dictionary", labelTa: "அகராதி", icon: BookOpen },
    { href: "/history", label: "History", labelTa: "வரலாறு", icon: HistoryIcon },
    { href: "/saved", label: "Saved", labelTa: "சேமித்த தமிழ்", icon: Bookmark },
    { href: "/notes", label: "Notes", labelTa: "என் குறிப்புகள்", icon: FileText },
    { href: "/profile", label: "Profile", labelTa: "சுயவிவரம்", icon: UserIcon },
  ];

  const activeItem = navItems.find((item) => pathname.startsWith(item.href) && (item.href !== "/journey" || pathname === "/journey")) || navItems[0];

  return (
    <>
      {/* Sticky Authenticated Header */}
      <header className="sticky top-0 z-40 bg-[#07070a]/90 backdrop-blur-md border-b border-zinc-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          
          {/* Left: Brand Logo & Title + Universal Sidebar Drawer Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-amber-500/40 text-zinc-300 hover:text-amber-400 transition-all flex items-center gap-2 cursor-pointer shadow-sm group"
              title="Open Navigation Sidebar"
              aria-label="Open Navigation Sidebar"
            >
              <Menu size={18} className="text-amber-400 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-mono font-semibold text-zinc-300 hidden sm:inline group-hover:text-amber-300">
                Menu
              </span>
            </button>

            <Link href="/journey" className="flex items-center gap-2.5 group">
              <StylusEmblem size={34} variant="landing" />
              <div className="hidden sm:flex flex-col">
                <span className="font-serif text-base font-bold text-zinc-100 group-hover:text-amber-400 transition-colors leading-tight">
                  Ezhuthaani <span className="font-tamil text-amber-400 text-xs font-semibold">எழுத்தாணி</span>
                </span>
                <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">
                  Tamil Masterclass
                </span>
              </div>
            </Link>
            {/* Back to Journey Button when outside /journey */}
            {pathname !== "/journey" && (
              <Link
                href="/journey"
                className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 font-mono text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                title="Return to Learning Journey"
              >
                <ArrowLeft size={14} />
                <span className="hidden sm:inline">Back to Journey</span>
                <span className="sm:hidden">Journey</span>
              </Link>
            )}
          </div>

          {/* User Level XP Progress Bar */}
          <div className="flex-1 max-w-xs hidden lg:block">
            <div className="flex items-center justify-between text-[11px] font-mono font-semibold text-zinc-400 mb-1">
              <span>Level {user.level}</span>
              <span className="text-amber-400">{user.xp} XP</span>
            </div>
            <div className="h-2 rounded-full bg-zinc-800 overflow-hidden border border-zinc-700/50">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-500"
                style={{ width: `${levelPct}%` }}
              />
            </div>
          </div>

          {/* Right: Active Section Badge + Streak & Logout */}
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Active Section Badge (Static, No Hover Popup) */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-zinc-300">
              <activeItem.icon size={14} className="text-amber-400" />
              <span className="text-xs font-mono font-bold text-amber-300">
                {activeItem.label}
              </span>
            </div>

            {/* Streak Counter Badge */}
            <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono font-bold text-xs shrink-0">
              <Flame size={14} className="text-amber-400 animate-pulse" />
              <span>{user.streak}d</span>
            </div>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-rose-400 hover:border-zinc-700 transition-colors shrink-0 cursor-pointer"
              title="Log Out"
              aria-label="Log Out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-out Sidebar Overlay Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 cursor-pointer"
            />

            {/* Sidebar Content Panel */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-zinc-950 border-r border-zinc-800/80 z-50 flex flex-col justify-between p-6 shadow-2xl overflow-y-auto"
            >
              <div>
                {/* Header inside Sidebar */}
                <div className="flex items-center justify-between pb-6 border-b border-zinc-900 mb-6">
                  <div className="flex items-center gap-3">
                    <StylusEmblem size={36} variant="landing" />
                    <div>
                      <span className="font-serif text-lg font-bold text-zinc-100 block">
                        Ezhuthaani
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">
                        Learner Hub
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* User Card */}
                <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 mb-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-zinc-100 truncate max-w-[160px]">
                      {user.name}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-[10px] uppercase font-bold">
                      Lvl {user.level}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-zinc-400 truncate">
                    {user.email}
                  </div>

                  <div className="pt-2 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-amber-400 font-bold">{user.xp} XP</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <Flame size={12} /> {user.streak} Days
                    </span>
                  </div>
                </div>

                {/* Navigation Links Group */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest px-2 block mb-2">
                    Learning Features
                  </span>
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const IconComponent = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center justify-between px-4 py-3 rounded-2xl transition-all ${
                          isActive
                            ? "bg-amber-500 text-zinc-950 font-bold shadow-lg shadow-amber-500/20"
                            : "bg-zinc-900/50 hover:bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <IconComponent size={18} className={isActive ? "text-zinc-950" : "text-amber-400"} />
                          <div>
                            <div className="text-xs font-mono tracking-wider">{item.label}</div>
                            <div className="font-tamil text-[11px] opacity-80">{item.labelTa}</div>
                          </div>
                        </div>
                        <ChevronRight size={16} className={isActive ? "text-zinc-950" : "text-zinc-600"} />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Logout Button */}
              <div className="pt-6 border-t border-zinc-900">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    logout();
                  }}
                  className="w-full py-3 px-4 rounded-2xl bg-zinc-900 hover:bg-rose-500/10 border border-zinc-800 hover:border-rose-500/30 text-rose-400 font-mono text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogOut size={16} />
                  <span>Log Out</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Global Level-Up Celebration Modal */}
      <LevelUpModal />
    </>
  );
}
