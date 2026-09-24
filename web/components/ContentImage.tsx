"use client";

import { useState } from "react";
import {
  Landmark,
  Sparkles,
  Utensils,
  BookOpen,
  Music,
  Users,
  History,
  MapPin,
  Globe,
  Compass,
} from "lucide-react";

interface ContentImageProps {
  src?: string | null;
  alt: string;
  category?: string | null;
  era?: string | null;
  className?: string;
  aspectRatio?: string;
}

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

export default function ContentImage({
  src,
  alt,
  category,
  era,
  className = "w-full h-full object-contain p-1",
  aspectRatio = "aspect-video",
}: ContentImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const IconComponent =
    (category && CATEGORY_ICONS[category]) ||
    (era ? Compass : Landmark);

  const renderFallback = !src || hasError;

  return (
    <div className={`relative overflow-hidden bg-zinc-900 ${aspectRatio} flex items-center justify-center group`}>
      {renderFallback ? (
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-amber-950/30 to-zinc-950 flex flex-col items-center justify-center p-6 text-center border border-amber-500/20">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-3 shadow-lg group-hover:scale-105 transition-transform">
            <IconComponent size={28} className="text-amber-400" />
          </div>
          <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-widest line-clamp-1">
            {category || era || "Ezhuthaani Heritage"}
          </span>
          <span className="text-sm font-serif font-bold text-zinc-200 mt-1 line-clamp-1 max-w-[90%]">
            {alt}
          </span>
        </div>
      ) : (
        <>
          {!isLoaded && (
            <div className="absolute inset-0 bg-zinc-900 animate-pulse flex items-center justify-center">
              <IconComponent size={24} className="text-zinc-700" />
            </div>
          )}
          <img
            src={src}
            alt={alt}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`${className} transition-opacity duration-300 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-60" />
        </>
      )}
    </div>
  );
}
