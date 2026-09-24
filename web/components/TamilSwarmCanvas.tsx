"use client";

import { useEffect, useRef } from "react";

interface Particle {
  char: string;
  x: number;
  y: number;
  z: number; // 3D depth layer
  vx: number;
  vy: number;
  vz: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  color: string;
  isWordTarget: boolean;
  targetX?: number;
  targetY?: number;
}

const TAMIL_GLYPHS = [
  "அ", "ஆ", "இ", "ஈ", "உ", "ஊ", "எ", "ஏ", "ஐ", "ஒ", "ஓ", "ஔ",
  "க்", "ங்", "ச்", "ஞ்", "ட்", "ண்", "த்", "ந்", "ப்", "ம்", "ய்", "ர்", "ல்", "வ்", "ழ்", "ள்", "ற்", "ன்", "ஃ"
];

const TARGET_WORDS = [
  { word: "வணக்கம்", chars: ["வ", "ண", "க்", "க", "ம்"] },
  { word: "தமிழ்", chars: ["த", "மி", "ழ்"] },
  { word: "எழுத்தாணி", chars: ["எ", "ழூ", "த்", "தா", "ணி"] },
  { word: "திருக்குறள்", chars: ["தி", "ரு", "க்", "கு", "ற", "ள்"] },
  { word: "அன்பு", chars: ["அ", "ன்", "பு"] },
  { word: "அறம்", chars: ["அ", "ற", "ம்"] },
  { word: "கல்வி", chars: ["க", "ல்", "வி"] },
];

export default function TamilSwarmCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    // Create 85 floating 3D glyph particles
    const particleCount = Math.min(85, Math.floor(width / 18));
    const particles: Particle[] = [];

    const colors = ["#f59e0b", "#d97706", "#10b981", "#38bdf8", "#818cf8", "#a1a1aa"];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        char: TAMIL_GLYPHS[Math.floor(Math.random() * TAMIL_GLYPHS.length)],
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        vz: (Math.random() - 0.5) * 0.005,
        size: Math.floor(Math.random() * 12) + 16,
        alpha: Math.random() * 0.4 + 0.15,
        baseAlpha: Math.random() * 0.4 + 0.15,
        color: colors[Math.floor(Math.random() * colors.length)],
        isWordTarget: false,
      });
    }

    let currentWordIndex = 0;
    let state: "swarming" | "converging" | "holding" | "dispersing" = "swarming";
    let stateTimer = 0;

    const updateSwarm = () => {
      ctx.clearRect(0, 0, width, height);
      stateTimer++;

      if (state === "swarming" && stateTimer > 420) {
        state = "converging";
        stateTimer = 0;
        const targetObj = TARGET_WORDS[currentWordIndex];
        const chars = targetObj.chars;
        const totalWidth = chars.length * 48;
        const startX = width / 2 - totalWidth / 2;
        const centerY = height / 2 - 80;

        for (let i = 0; i < chars.length; i++) {
          const p = particles[i];
          p.isWordTarget = true;
          p.char = chars[i];
          p.targetX = startX + i * 48;
          p.targetY = centerY;
        }
      } else if (state === "converging" && stateTimer > 140) {
        state = "holding";
        stateTimer = 0;
      } else if (state === "holding" && stateTimer > 180) {
        state = "dispersing";
        stateTimer = 0;
      } else if (state === "dispersing" && stateTimer > 80) {
        state = "swarming";
        stateTimer = 0;
        currentWordIndex = (currentWordIndex + 1) % TARGET_WORDS.length;

        particles.forEach((p) => {
          p.isWordTarget = false;
          p.vx = (Math.random() - 0.5) * 0.8;
          p.vy = (Math.random() - 0.5) * 0.8;
        });
      }

      // Render Ambient Connection Constellation Web
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.strokeStyle = `rgba(245, 158, 11, ${0.09 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update & Render Particles
      particles.forEach((p) => {
        if (p.isWordTarget && p.targetX !== undefined && p.targetY !== undefined) {
          p.x += (p.targetX - p.x) * 0.08;
          p.y += (p.targetY - p.y) * 0.08;
          p.alpha = Math.min(0.9, p.alpha + 0.03);
        } else {
          // Mouse Repulsion Effect
          const mdx = p.x - mouseX;
          const mdy = p.y - mouseY;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 140) {
            const force = (140 - mdist) / 140;
            p.x += (mdx / mdist) * force * 3;
            p.y += (mdy / mdist) * force * 3;
          }

          p.x += p.vx * p.z;
          p.y += p.vy * p.z;
          p.z += p.vz;
          if (p.z < 0.3 || p.z > 2.5) p.vz *= -1;

          if (p.x < -30) p.x = width + 30;
          if (p.x > width + 30) p.x = -30;
          if (p.y < -30) p.y = height + 30;
          if (p.y > height + 30) p.y = -30;

          p.alpha = p.baseAlpha + Math.sin(stateTimer * 0.05 + p.x) * 0.1;
        }

        ctx.save();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.05, Math.min(1.0, p.alpha));
        const currentSize = Math.round(p.size * p.z);
        ctx.font = `${currentSize}px "Latha", "Mukta Malar", sans-serif`;
        ctx.fillText(p.char, p.x, p.y);
        ctx.restore();
      });

      animId = requestAnimationFrame(updateSwarm);
    };

    updateSwarm();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-40 mix-blend-screen"
    />
  );
}
