"use client";

// ============================================================
// MATRIX CANVAS — Skills section background
// Falling katakana characters (green cyber / hacker aesthetic)
// + GSAP periodic scan line sweep
// ============================================================

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const KATAKANA =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

export default function MatrixCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scanRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pref = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (pref.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const isMobile  = window.innerWidth < 768;
    const fontSize  = isMobile ? 12 : 14;
    const colWidth  = isMobile ? 22 : 20;

    const cols    = Math.floor((canvas.width || 800) / colWidth);
    const drops   = Array.from({ length: cols }, () => Math.random() * -60);
    // Randomise speed per column
    const speeds  = Array.from({ length: cols }, () => 0.12 + Math.random() * 0.25);

    let raf: number;
    const draw = () => {
      // Fade trail (semi-transparent fill over the canvas each frame)
      ctx.fillStyle = "rgba(0, 0, 0, 0.045)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = KATAKANA[Math.floor(Math.random() * KATAKANA.length)];
        const x    = i * colWidth;
        const y    = drops[i] * fontSize;

        // Head of column — brighter
        const isFront = drops[i] > 1 && drops[i] * fontSize > 0;
        ctx.fillStyle = isFront ? "rgba(180,255,200,0.5)" : "rgba(0,255,106,0.12)";
        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += speeds[i];
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    // ── GSAP scan line — sweeps top→bottom, then repeats ──
    if (scanRef.current) {
      gsap.fromTo(
        scanRef.current,
        { top: "-4px" },
        {
          top: "calc(100% + 4px)",
          duration: 3.5,
          ease: "none",
          repeat: -1,
          repeatDelay: 3,
        }
      );
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* Falling characters */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.09 }}
      />

      {/* GSAP scan line */}
      <div
        ref={scanRef}
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          height: "2px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(0,255,106,0.55) 30%, rgba(180,255,200,0.8) 50%, rgba(0,255,106,0.55) 70%, transparent 100%)",
          boxShadow: "0 0 16px rgba(0,255,106,0.4), 0 0 40px rgba(0,255,106,0.15)",
          top: "-4px",
        }}
      />

      {/* Terminal blink cursors — static decoration */}
      {[15, 38, 62, 81].map((pct, i) => (
        <div
          key={i}
          className="absolute font-mono text-green-core pointer-events-none"
          style={{
            left:     `${pct}%`,
            top:      `${20 + i * 18}%`,
            fontSize: "11px",
            opacity:  0.12,
            animation: `blink ${1.1 + i * 0.3}s step-end infinite`,
          }}
        >
          ▊
        </div>
      ))}
    </div>
  );
}
