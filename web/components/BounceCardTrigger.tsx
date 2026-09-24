"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface FannedCardItem {
  glyphOrSymbol?: string;
  badgeImg?: string;
  subtext: string;
  title: string;
  borderColor: string;   // e.g. "border-amber-400/40"
  shadowColor: string;   // e.g. "shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_25px_rgba(245,158,11,0.25)]"
  textColor: string;     // e.g. "text-amber-300"
  x: number;             // Horizontal offset from center
  y: number;             // Vertical elevation above the card
  rotate: number;        // Fan angle in degrees
  delay: number;         // Stagger delay in seconds
}

export function BounceCardTrigger({
  title,
  titleTa,
  subtitle,
  description,
  badge,
  icon,
  cards,
  accentColor = "from-amber-500/20 via-emerald-500/10 to-transparent",
  onClick,
  onCardClick,
}: {
  title: string;
  titleTa?: string;
  subtitle: string;
  description: string;
  badge?: string;
  icon?: string;
  cards: FannedCardItem[];
  accentColor?: string;
  onClick?: () => void;
  onCardClick?: (index: number) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`relative p-[1px] rounded-2xl bg-gradient-to-br ${accentColor} transition-all duration-300 ${
        isHovered ? "z-40" : "z-10"
      }`}
    >
      {/* =================================================================== */}
      {/* FLOATING BOUNCE CARDS CONTAINER */}
      {/* =================================================================== */}
      <AnimatePresence>
        {isHovered && cards.length > 0 && (
          <div className="absolute inset-x-0 top-0 pointer-events-none flex justify-center">
            {cards.map((photo, idx) => (
              <motion.div
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onCardClick) onCardClick(idx);
                }}
                // Starts collapsed inside the box
                initial={{ opacity: 0, scale: 0.15, y: 30, x: 0, rotate: 0 }}
                // Pops out with spring physics
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: photo.y,
                  x: photo.x,
                  rotate: photo.rotate,
                  transition: {
                    type: "spring",
                    stiffness: 350,
                    damping: 21,
                    mass: 0.8,
                    delay: photo.delay,
                  },
                }}
                // Retracts smoothly back into the box
                exit={{
                  opacity: 0,
                  scale: 0.2,
                  y: 20,
                  x: 0,
                  rotate: 0,
                  transition: {
                    duration: 0.22,
                    ease: [0.32, 0, 0.67, 0],
                  },
                }}
                // Direct hover on card: straightens and zooms for inspection
                whileHover={{
                  scale: 1.15,
                  rotate: 0,
                  y: photo.y - 18,
                  zIndex: 60,
                  transition: { duration: 0.18 },
                }}
                className="absolute pointer-events-auto origin-bottom cursor-pointer"
              >
                <div
                  className={`w-36 sm:w-44 p-3 rounded-xl bg-zinc-950/95 border ${photo.borderColor} ${photo.shadowColor} backdrop-blur-md flex flex-col items-center justify-center text-center`}
                >
                  {photo.badgeImg ? (
                    <img
                      src={photo.badgeImg}
                      alt={photo.title}
                      className="w-14 h-14 object-contain mb-1.5 drop-shadow-[0_0_12px_rgba(245,158,11,0.5)]"
                    />
                  ) : (
                    <div className="text-3xl sm:text-4xl mb-1.5 font-tamil font-bold text-zinc-100">
                      {photo.glyphOrSymbol}
                    </div>
                  )}
                  <span className={`text-[11px] font-mono font-semibold ${photo.textColor} tracking-tight truncate`}>
                    {photo.title}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-mono mt-0.5">
                    {photo.subtext}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* =================================================================== */}
      {/* TRIGGER CARD BODY */}
      {/* =================================================================== */}
      <div className="h-full p-6 bg-zinc-950/90 rounded-[15px] group cursor-pointer flex flex-col justify-between relative overflow-visible border border-zinc-800/80 hover:border-zinc-700/80 transition-colors">
        <div>
          {badge && (
            <div className="flex items-center justify-end mb-3">
              <span className="text-xs px-2 py-0.5 rounded bg-zinc-800 text-amber-400 font-mono border border-zinc-700">
                {badge}
              </span>
            </div>
          )}

          <div className="flex items-baseline gap-3 mb-1">
            {icon && <span className="text-2xl">{icon}</span>}
            <h3 className="text-xl font-serif text-zinc-100 tracking-wide font-normal">
              {title}
            </h3>
            {titleTa && (
              <span className="text-base font-tamil font-bold text-amber-400/90">
                {titleTa}
              </span>
            )}
          </div>

          <p className="text-xs text-amber-500/80 font-mono mb-2 uppercase tracking-wider">
            {subtitle}
          </p>
          <p className="text-xs text-zinc-400 leading-relaxed font-light">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
