"use client";

import { motion } from "framer-motion";

interface TamilTileProps {
  grapheme: string;
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
  status?: "default" | "correct" | "incorrect" | "highlight";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function TamilTile({
  grapheme,
  onClick,
  selected = false,
  disabled = false,
  status = "default",
  size = "md",
  className = "",
}: TamilTileProps) {
  const sizeClasses = {
    sm: "w-10 h-10 text-base font-semibold",
    md: "w-12 h-12 sm:w-14 sm:h-14 text-xl sm:text-2xl font-bold",
    lg: "w-14 h-14 sm:w-16 sm:h-16 text-2xl sm:text-3xl font-bold",
  };

  const statusClasses = {
    default: selected
      ? "bg-amber-500/20 border-amber-400/80 text-amber-300 shadow-md shadow-amber-500/10"
      : "bg-zinc-900/90 border-zinc-700/80 text-zinc-100 hover:border-amber-500/50 hover:text-amber-300 hover:bg-zinc-850",
    correct: "bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-lg shadow-emerald-500/20",
    incorrect: "bg-red-500/20 border-red-400 text-red-300 shadow-lg shadow-red-500/20",
    highlight: "bg-amber-500/30 border-amber-400 text-amber-200 animate-pulse",
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05, y: -2 } : undefined}
      whileTap={!disabled ? { scale: 0.95 } : undefined}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative inline-flex items-center justify-center rounded-xl border font-tamil transition-all cursor-pointer select-none
        ${sizeClasses[size]}
        ${statusClasses[status]}
        ${disabled ? "opacity-40 cursor-not-allowed hover:transform-none hover:border-zinc-700" : ""}
        ${className}
      `}
    >
      <span className="leading-none transform translate-y-[-1px]">{grapheme}</span>
    </motion.button>
  );
}
