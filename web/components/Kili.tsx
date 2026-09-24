"use client";

type Mood = "idle" | "happy" | "sad" | "celebrate" | "thinking";

export default function Kili({ mood = "idle", size = 96, className = "" }: { mood?: Mood; size?: number; className?: string }) {
  const eyes = mood === "sad" ? (
    <>
      <path d="M40 45 Q44 41 48 45" stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M58 45 Q62 41 66 45" stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </>
  ) : mood === "happy" || mood === "celebrate" ? (
    <>
      <path d="M38 44 Q44 38 50 44" stroke="#1a1a1a" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M56 44 Q62 38 68 44" stroke="#1a1a1a" strokeWidth="3" fill="none" strokeLinecap="round" />
    </>
  ) : (
    <>
      <circle cx="44" cy="44" r="4.5" fill="#1a1a1a" />
      <circle cx="62" cy="44" r="4.5" fill="#1a1a1a" />
      <circle cx="45.5" cy="42.5" r="1.3" fill="#fff" />
      <circle cx="63.5" cy="42.5" r="1.3" fill="#fff" />
    </>
  );

  const beak =
    mood === "sad" ? (
      <path d="M46 56 Q53 60 60 56 Q53 62 46 56" fill="#f6ad2e" stroke="#c97c0e" strokeWidth="1" />
    ) : mood === "happy" || mood === "celebrate" ? (
      <path d="M44 55 Q53 66 62 55 Q53 60 44 55" fill="#f6ad2e" stroke="#c97c0e" strokeWidth="1" />
    ) : (
      <path d="M45 55 Q53 62 61 55 Q53 58 45 55" fill="#f6ad2e" stroke="#c97c0e" strokeWidth="1" />
    );

  return (
    <svg
      viewBox="0 0 106 110"
      width={size}
      height={size}
      className={`${mood === "celebrate" ? "animate-wobble" : ""} ${className}`}
    >
      <ellipse cx="53" cy="102" rx="16" ry="4" fill="#000" opacity="0.08" />
      {/* tail */}
      <path d="M53 70 Q30 95 20 108 Q42 100 55 82 Z" fill="#2f9e52" />
      <path d="M53 70 Q34 90 26 106 Q45 98 55 80 Z" fill="#3ba55c" />
      {/* body */}
      <ellipse cx="53" cy="58" rx="34" ry="38" fill="#3ba55c" />
      <ellipse cx="53" cy="62" rx="24" ry="26" fill="#68d391" opacity="0.55" />
      {/* wing */}
      <path d="M78 45 Q95 55 88 80 Q72 78 68 58 Z" fill="#2f9e52" />
      {/* head patch */}
      <circle cx="53" cy="40" r="26" fill="#3ba55c" />
      {/* cheeks */}
      <circle cx="33" cy="52" r="5" fill="#ff9eb0" opacity="0.6" />
      <circle cx="73" cy="52" r="5" fill="#ff9eb0" opacity="0.6" />
      {eyes}
      {beak}
      {/* red band like a ring-necked parakeet */}
      <path d="M32 58 Q53 68 74 58" stroke="#e0433b" strokeWidth="2.5" fill="none" opacity="0.85" />
      {mood === "celebrate" && null}
    </svg>
  );
}
