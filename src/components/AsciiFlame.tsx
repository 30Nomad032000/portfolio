"use client";

import { useEffect, useRef, useCallback } from "react";

/* ─── Configuration ─── */

/**
 * ASCII characters ordered by visual density (sparse → dense).
 * The fire simulation maps heat values (0–255) to this ramp.
 */
const CHAR_RAMP = " .`-':_,^=;><+!rc*/z?sLTv)J7(|Fi{C}fI31tlu[neoZ5Yxjya]2ESwqkP6h9d4VpOGbUAKXHm8RD#$Bg0MNWQ%&@";

/**
 * Color palette — maps normalised heat (0→1) to an rgba string.
 * Gradient: transparent → dark ember → Signal Red core → bright orange → white-hot tip
 */
function heatToColor(t: number, accent: [number, number, number]): string {
  // t is 0..1 where 1 = hottest
  if (t < 0.05) return "rgba(0,0,0,0)";
  if (t < 0.2) {
    const a = (t - 0.05) / 0.15;
    return `rgba(${Math.round(40 * a)},${Math.round(8 * a)},${Math.round(4 * a)},${(a * 0.6).toFixed(2)})`;
  }
  if (t < 0.45) {
    const a = (t - 0.2) / 0.25;
    const r = Math.round(40 + (accent[0] - 40) * a);
    const g = Math.round(8 + (accent[1] - 8) * a);
    const b = Math.round(4 + (accent[2] - 4) * a);
    return `rgba(${r},${g},${b},${(0.6 + a * 0.3).toFixed(2)})`;
  }
  if (t < 0.75) {
    const a = (t - 0.45) / 0.3;
    const r = Math.round(accent[0] + (255 - accent[0]) * a * 0.6);
    const g = Math.round(accent[1] + (140 - accent[1]) * a);
    const b = Math.round(accent[2] + (30 - accent[2]) * a);
    return `rgba(${r},${g},${b},${(0.9 + a * 0.1).toFixed(2)})`;
  }
  // white-hot tips
  const a = (t - 0.75) / 0.25;
  const r = Math.round(255);
  const g = Math.round(140 + 115 * a);
  const b = Math.round(30 + 200 * a);
  return `rgba(${r},${g},${b},1)`;
}

/* ─── Props ─── */

export interface AsciiFlameProps {
  /** Width of the flame grid in characters. Auto-calculated from container if omitted. */
  cols?: number;
  /** Height of the flame grid in characters. Auto-calculated from container if omitted. */
  rows?: number;
  /** Font size in pixels for each character cell */
  fontSize?: number;
  /** How fast the flame cools as it rises (higher = shorter flames). Default 1.4 */
  cooling?: number;
  /** Wind sway intensity (0 = none, 1 = gentle, 3 = strong). Default 1 */
  wind?: number;
  /** Ignition intensity at the base (0–255). Default 255 */
  ignition?: number;
  /** Base accent color as [r, g, b]. Defaults to Signal Red [230, 59, 46] */
  accent?: [number, number, number];
  /** CSS opacity for the entire canvas. Default 0.12 */
  opacity?: number;
  /** Additional className on the wrapper */
  className?: string;
  /** Target FPS. Default 24 (for that gritty low-fi feel) */
  fps?: number;
}

/* ─── Component ─── */

export default function AsciiFlame({
  cols: colsProp,
  rows: rowsProp,
  fontSize = 10,
  cooling = 1.4,
  wind = 1,
  ignition = 255,
  accent = [230, 59, 46],
  opacity = 0.12,
  className = "",
  fps = 24,
}: AsciiFlameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const rafId = useRef(0);
  const heatGrid = useRef<Float32Array | null>(null);
  const dims = useRef({ cols: 0, rows: 0 });

  const initGrid = useCallback(
    (cols: number, rows: number) => {
      dims.current = { cols, rows };
      heatGrid.current = new Float32Array(cols * rows);
    },
    []
  );

  /* The simulation step */
  const step = useCallback(() => {
    const grid = heatGrid.current;
    if (!grid) return;
    const { cols, rows } = dims.current;

    /* 1. Ignite the bottom row with random fuel */
    for (let x = 0; x < cols; x++) {
      const base = (rows - 1) * cols + x;
      grid[base] = Math.random() < 0.85 ? ignition * (0.7 + Math.random() * 0.3) : ignition * Math.random() * 0.3;
    }

    /* 2. Also ignite the second-to-last row for thicker flames */
    for (let x = 0; x < cols; x++) {
      const base = (rows - 2) * cols + x;
      grid[base] = Math.max(grid[base], ignition * (0.4 + Math.random() * 0.4));
    }

    /* 3. Propagate upward with cooling + wind sway */
    for (let y = 0; y < rows - 2; y++) {
      for (let x = 0; x < cols; x++) {
        // Sample from cells below with random horizontal offset (wind)
        const windOffset = Math.round((Math.random() - 0.5) * wind * 2);
        const sx = Math.min(cols - 1, Math.max(0, x + windOffset));

        // Average of cell below, cell two below, and diagonals for smoothness
        const below1 = grid[(y + 1) * cols + sx];
        const below2 = grid[Math.min(rows - 1, y + 2) * cols + x];
        const diagL = grid[(y + 1) * cols + Math.max(0, sx - 1)];
        const diagR = grid[(y + 1) * cols + Math.min(cols - 1, sx + 1)];

        const avg = (below1 + below2 + diagL + diagR) / 4;

        // Cool as it rises
        const cooled = avg - cooling * (1 + Math.random() * 0.6);
        grid[y * cols + x] = Math.max(0, cooled);
      }
    }
  }, [ignition, cooling, wind]);

  /* Render a frame to canvas */
  const render = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      const grid = heatGrid.current;
      if (!grid) return;
      const { cols, rows } = dims.current;
      const cellW = fontSize * 0.6; // monospace char width ≈ 0.6 × height
      const cellH = fontSize;

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.font = `${fontSize}px "Space Mono", "Courier New", monospace`;
      ctx.textBaseline = "top";

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const heat = grid[y * cols + x];
          if (heat < 3) continue; // skip empty cells

          const t = Math.min(1, heat / 255);
          const charIdx = Math.floor(t * (CHAR_RAMP.length - 1));
          const char = CHAR_RAMP[charIdx];

          ctx.fillStyle = heatToColor(t, accent);
          ctx.fillText(char, x * cellW, y * cellH);
        }
      }
    },
    [fontSize, accent]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    /* Size the canvas to fit the container */
    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const cellW = fontSize * 0.6;
      const cellH = fontSize;

      const cols = colsProp || Math.ceil(rect.width / cellW);
      const rows = rowsProp || Math.ceil(rect.height / cellH);

      canvas.width = Math.ceil(cols * cellW * dpr);
      canvas.height = Math.ceil(rows * cellH * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      initGrid(cols, rows);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    /* Animation loop throttled to target FPS */
    const interval = 1000 / fps;
    let last = 0;

    const loop = (time: number) => {
      rafId.current = requestAnimationFrame(loop);
      const delta = time - last;
      if (delta < interval) return;
      last = time - (delta % interval);

      step();
      render(ctx);
    };

    rafId.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId.current);
      ro.disconnect();
    };
  }, [fontSize, colsProp, rowsProp, fps, step, render, initGrid]);

  return (
    <div
      ref={wrapRef}
      className={`ascii-flame ${className}`}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        opacity,
        zIndex: 0,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
