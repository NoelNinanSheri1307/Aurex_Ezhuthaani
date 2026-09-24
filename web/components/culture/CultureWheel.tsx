"use client";

import { motion } from "framer-motion";
import {
  Utensils,
  Sparkles,
  Music,
  Landmark,
  BookOpen,
  Users,
  History,
  MapPin,
  Globe,
} from "lucide-react";
import StylusEmblem from "@/components/StylusEmblem";

const CATEGORY_ICONS: Record<string, any> = {
  Food: Utensils,
  Festivals: Sparkles,
  Arts: Music,
  Architecture: Landmark,
  "Language & Traditions": BookOpen,
  People: Users,
  History: History,
  Places: MapPin,
};

const CATEGORY_TAMIL: Record<string, string> = {
  Food: "உணவு",
  Festivals: "விழாக்கள்",
  Arts: "கலைகள்",
  Architecture: "கட்டிடக்கலை",
  "Language & Traditions": "மொழி & மரபு",
  People: "சான்றோர்கள்",
  History: "வரலாறு",
  Places: "இடங்கள்",
};

export default function CultureWheel({
  categories,
  activeCategory,
  onSelectCategory,
}: {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}) {
  // Exclude 'All' if passed in list for wheel calculation
  const wheelCategories = categories.filter((c) => c !== "All");
  const total = wheelCategories.length;
  const radius = 170; // Radial distance from center in px for desktop wheel

  return (
    <div className="w-full space-y-6">
      {/* ---------------- Desktop Interactive Radial Wheel (md and above) ---------------- */}
      <div className="hidden md:flex flex-col items-center justify-center relative py-6">
        <div className="relative w-[440px] h-[440px] flex items-center justify-center">
          {/* Background Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-amber-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* SVG Connecting Lines from Center to Sector Nodes */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {wheelCategories.map((cat, idx) => {
              const angle = (idx * (2 * Math.PI)) / total - Math.PI / 2;
              const x = 220 + radius * Math.cos(angle);
              const y = 220 + radius * Math.sin(angle);
              const isActive = activeCategory === cat;
              return (
                <line
                  key={cat}
                  x1="220"
                  y1="220"
                  x2={x}
                  y2={y}
                  stroke={isActive ? "#fbbf24" : "#27272a"}
                  strokeWidth={isActive ? "2" : "1"}
                  strokeDasharray={isActive ? "none" : "4 4"}
                  className="transition-all duration-300"
                />
              );
            })}
          </svg>

          {/* Central Hub Emblem Node */}
          <motion.button
            onClick={() => onSelectCategory("All")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`z-20 w-32 h-32 rounded-full border flex flex-col items-center justify-center p-3 shadow-2xl backdrop-blur-md transition-all cursor-pointer ${
              activeCategory === "All"
                ? "bg-amber-500/20 border-amber-400 shadow-amber-500/30 text-amber-300"
                : "bg-zinc-950/90 border-zinc-800 hover:border-amber-500/50 text-zinc-300"
            }`}
          >
            <StylusEmblem size={34} variant="landing" />
            <span className="font-serif text-sm font-bold mt-1 text-zinc-100">
              All Culture
            </span>
            <span className="font-tamil text-[11px] text-amber-400 font-medium">
              அனைத்தும்
            </span>
          </motion.button>

          {/* Orbiting Sector Nodes */}
          {wheelCategories.map((cat, idx) => {
            const angle = (idx * (2 * Math.PI)) / total - Math.PI / 2;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);
            const isActive = activeCategory === cat;
            const IconComponent = CATEGORY_ICONS[cat] || Globe;
            const taLabel = CATEGORY_TAMIL[cat] || cat;

            return (
              <motion.button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                style={{
                  left: `calc(50% + ${x}px - 48px)`,
                  top: `calc(50% + ${y}px - 48px)`,
                }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className={`absolute z-20 w-24 h-24 rounded-2xl border flex flex-col items-center justify-center p-2 text-center transition-colors cursor-pointer shadow-xl ${
                  isActive
                    ? "bg-amber-500 border-amber-400 text-zinc-950 font-bold shadow-amber-500/30 ring-4 ring-amber-500/20"
                    : "bg-zinc-950/90 border-zinc-800/90 hover:border-amber-500/60 text-zinc-300 hover:text-white"
                }`}
                title={`Explore ${cat}`}
              >
                <IconComponent size={20} className={isActive ? "text-zinc-950" : "text-amber-400"} />
                <span className="text-[11px] font-mono font-semibold tracking-tight mt-1 line-clamp-1 leading-tight">
                  {cat}
                </span>
                <span
                  className={`font-tamil text-[10px] leading-none mt-0.5 ${
                    isActive ? "text-zinc-900 font-semibold" : "text-amber-400/80"
                  }`}
                >
                  {taLabel}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* ---------------- Mobile Accessible Category Grid (sm and below) ---------------- */}
      <div className="md:hidden space-y-2">
        <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block px-1">
          Explore Categories
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            onClick={() => onSelectCategory("All")}
            className={`p-3 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
              activeCategory === "All"
                ? "bg-amber-500 border-amber-400 text-zinc-950 font-bold"
                : "bg-zinc-950 border-zinc-800 text-zinc-300"
            }`}
          >
            <Globe size={16} className={activeCategory === "All" ? "text-zinc-950" : "text-amber-400"} />
            <div>
              <div className="text-xs font-mono">All</div>
              <div className="font-tamil text-[10px] opacity-80">அனைத்தும்</div>
            </div>
          </button>

          {wheelCategories.map((cat) => {
            const isActive = activeCategory === cat;
            const IconComponent = CATEGORY_ICONS[cat] || Globe;
            const taLabel = CATEGORY_TAMIL[cat] || cat;

            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`p-3 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? "bg-amber-500 border-amber-400 text-zinc-950 font-bold"
                    : "bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700"
                }`}
              >
                <IconComponent size={16} className={isActive ? "text-zinc-950" : "text-amber-400"} />
                <div className="truncate">
                  <div className="text-xs font-mono truncate">{cat}</div>
                  <div className="font-tamil text-[10px] opacity-80 truncate">{taLabel}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
