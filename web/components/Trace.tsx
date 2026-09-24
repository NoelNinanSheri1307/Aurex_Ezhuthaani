"use client";
import { useCallback, useEffect, useRef, useState } from "react";

const SIZE = 200;
const DILATE_R = 7;

// ponytail: coverage + neatness only, no stroke order/direction check.
// Upgrade path: per-glyph stroke path dataset + point-sequence matching.
type Mask = { target: Uint8Array; near: Uint8Array; targetCount: number };

function buildTargetMask(char: string): Mask {
  const off = document.createElement("canvas");
  off.width = SIZE;
  off.height = SIZE;
  const ctx = off.getContext("2d")!;
  ctx.clearRect(0, 0, SIZE, SIZE);
  ctx.fillStyle = "#000";
  ctx.font = `${Math.floor(SIZE * 0.72)}px "Noto Sans Tamil", sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(char, SIZE / 2, SIZE / 2 + SIZE * 0.04);
  const data = ctx.getImageData(0, 0, SIZE, SIZE).data;
  const target = new Uint8Array(SIZE * SIZE);
  let targetCount = 0;
  for (let i = 0; i < SIZE * SIZE; i++) {
    if (data[i * 4 + 3] > 100) {
      target[i] = 1;
      targetCount++;
    }
  }
  const near = new Uint8Array(SIZE * SIZE);
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      if (!target[y * SIZE + x]) continue;
      for (let dy = -DILATE_R; dy <= DILATE_R; dy++) {
        const ny = y + dy;
        if (ny < 0 || ny >= SIZE) continue;
        const row = ny * SIZE;
        for (let dx = -DILATE_R; dx <= DILATE_R; dx++) {
          const nx = x + dx;
          if (nx < 0 || nx >= SIZE) continue;
          near[row + nx] = 1;
        }
      }
    }
  }
  return { target, near, targetCount };
}

function computeScore(ctx: CanvasRenderingContext2D, mask: Mask): number {
  if (mask.targetCount === 0) return 0;
  const data = ctx.getImageData(0, 0, SIZE, SIZE).data;
  let hit = 0;
  let drawnCount = 0;
  let outside = 0;
  for (let i = 0; i < SIZE * SIZE; i++) {
    if (data[i * 4 + 3] > 30) {
      drawnCount++;
      if (mask.target[i]) hit++;
      if (!mask.near[i]) outside++;
    }
  }
  const coverage = hit / mask.targetCount;
  const overshoot = drawnCount > 0 ? outside / drawnCount : 0;
  return Math.max(0, Math.min(100, Math.round(coverage * 100 - overshoot * 60)));
}

export default function Trace({ char, onComplete }: { char: string; onComplete: (score: number) => void }) {
  const bgRef = useRef<HTMLCanvasElement>(null);
  const drawRef = useRef<HTMLCanvasElement>(null);
  const maskRef = useRef<Mask | null>(null);
  const drawingRef = useRef(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDone(false);
    setScore(0);
    const bg = bgRef.current!;
    const draw = drawRef.current!;
    bg.width = draw.width = SIZE;
    bg.height = draw.height = SIZE;
    const bgCtx = bg.getContext("2d")!;
    bgCtx.clearRect(0, 0, SIZE, SIZE);
    bgCtx.fillStyle = "#cbd5e1";
    bgCtx.font = `${Math.floor(SIZE * 0.72)}px "Noto Sans Tamil", sans-serif`;
    bgCtx.textAlign = "center";
    bgCtx.textBaseline = "middle";
    bgCtx.fillText(char, SIZE / 2, SIZE / 2 + SIZE * 0.04);
    maskRef.current = buildTargetMask(char);
    draw.getContext("2d")!.clearRect(0, 0, SIZE, SIZE);
  }, [char]);

  const getPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = drawRef.current!.getBoundingClientRect();
    return { x: ((e.clientX - rect.left) / rect.width) * SIZE, y: ((e.clientY - rect.top) / rect.height) * SIZE };
  };

  const recompute = useCallback(() => {
    if (!maskRef.current) return;
    setScore(computeScore(drawRef.current!.getContext("2d")!, maskRef.current));
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    drawingRef.current = true;
    const ctx = drawRef.current!.getContext("2d")!;
    ctx.strokeStyle = "#f59e0b"; // Warm gold ink
    ctx.lineWidth = 14;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current) return;
    const ctx = drawRef.current!.getContext("2d")!;
    const { x, y } = getPos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const onPointerUp = () => {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    recompute();
  };

  const clear = () => {
    drawRef.current!.getContext("2d")!.clearRect(0, 0, SIZE, SIZE);
    setScore(0);
  };

  const finish = () => {
    setDone(true);
    onComplete(score);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="relative rounded-2xl border-2 border-amber-500/30 bg-zinc-950/90 shadow-2xl shadow-black/80 touch-none select-none overflow-hidden glow-amber"
        style={{ width: SIZE, height: SIZE }}
      >
        {/* Subtle grid guidelines for palm leaf tracing */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
        <canvas ref={bgRef} className="absolute inset-0 opacity-40" />
        <canvas
          ref={drawRef}
          className="absolute inset-0 cursor-crosshair touch-none"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        />
      </div>

      <div className="flex items-center gap-3 w-full max-w-[240px]">
        <div className="flex-1 h-2.5 rounded-full bg-zinc-800 overflow-hidden border border-zinc-700/50">
          <div
            className={`h-full transition-all duration-300 ${
              score >= 70 ? "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.5)]" : "bg-amber-500"
            }`}
            style={{ width: `${score}%` }}
          />
        </div>
        <span className="text-xs font-mono font-bold text-zinc-300 w-12 text-right">{score}%</span>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={clear}
          className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-mono text-zinc-300 hover:text-white transition-all"
        >
          Clear
        </button>
        <button
          onClick={finish}
          disabled={done}
          className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-xs font-mono font-bold text-zinc-950 uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all"
        >
          {done ? "Saved" : "Complete Trace"}
        </button>
      </div>
    </div>
  );
}
