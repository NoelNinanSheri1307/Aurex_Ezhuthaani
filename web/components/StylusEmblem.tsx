"use client";

import Image from "next/image";

export type EmblemVariant =
  | "default"
  | "landing"
  | "celebrate"
  | "winning"
  | "thinking"
  | "studying"
  | "literature"
  | "teaching"
  | "happy"
  | "schoolbag"
  | "journey";

const MASCOT_IMAGES: Record<string, string> = {
  default: "/assets/mascotlanding.png",
  landing: "/assets/mascotlanding.png",
  celebrate: "/assets/mascotwinning.png",
  winning: "/assets/mascotwinning.png",
  thinking: "/assets/mascotstudying.png",
  studying: "/assets/mascotstudying.png",
  literature: "/assets/mascotteaching.png",
  teaching: "/assets/mascotteaching.png",
  happy: "/assets/mascothappy.png",
  schoolbag: "/assets/mascotwithschoolbag.png",
  journey: "/assets/mascotwithschoolbag.png",
};

export default function StylusEmblem({
  variant = "default",
  size = 96,
  className = "",
  alt = "Ezhuthaani Elephant Mascot",
}: {
  variant?: EmblemVariant;
  size?: number;
  className?: string;
  alt?: string;
}) {
  const imageSrc = MASCOT_IMAGES[variant] || MASCOT_IMAGES.default;

  return (
    <div
      style={{ width: size, height: size }}
      className={`relative inline-flex items-center justify-center shrink-0 group ${className}`}
    >
      <img
        src={imageSrc}
        alt={alt}
        width={size}
        height={size}
        className="w-full h-full object-contain filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-300"
      />
    </div>
  );
}

export { StylusEmblem as MascotEmblem, StylusEmblem as ElephantMascot };

