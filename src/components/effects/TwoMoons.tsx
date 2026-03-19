"use client";

// ============================================================
// TWO MOONS — srihari-portfolio
// Atmospheric top-left moon pair (dark/Zoro mode only)
// A tribute to "2 Moons" by boywithuke
// ============================================================

import { useEffect, useRef } from "react";
import { useUIStore } from "@/store/uiStore";

export default function TwoMoons() {
  const mode    = useUIStore((s) => s.mode);
  const ref     = useRef<HTMLDivElement>(null);
  const isLight = mode === "calm";

  // Subtle float animation via JS so it's smooth
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    let raf: number;
    const tick = () => {
      frame += 0.008;
      const y = Math.sin(frame) * 5;
      el.style.transform = `translateY(${y}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Hidden in calm/light mode — moons belong to the night
  if (isLight) return null;

  return (
    <div
      ref={ref}
      className="absolute top-8 left-6 sm:top-10 sm:left-10 pointer-events-none z-10"
      aria-hidden
    >
      {/* Moon 1 — larger, slightly behind */}
      <div
        className="absolute"
        style={{
          width:  72,
          height: 72,
          borderRadius: "50%",
          background: "radial-gradient(circle at 38% 38%, #d4c4a0 0%, #a89060 40%, #6b5a30 80%, transparent 100%)",
          opacity: 0.22,
          top:  0,
          left: 0,
          boxShadow: "0 0 30px rgba(212,196,160,0.12), 0 0 60px rgba(212,196,160,0.06)",
          filter: "blur(0.5px)",
        }}
      />
      {/* Moon 1 — rim light */}
      <div
        className="absolute"
        style={{
          width:  72,
          height: 72,
          borderRadius: "50%",
          border: "1px solid rgba(212,196,160,0.18)",
          top:  0,
          left: 0,
        }}
      />

      {/* Moon 2 — smaller, offset right-down, brighter */}
      <div
        className="absolute"
        style={{
          width:  46,
          height: 46,
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 35%, #e8d8b0 0%, #c0a060 40%, #8a6a30 80%, transparent 100%)",
          opacity: 0.30,
          top:  32,
          left: 48,
          boxShadow: "0 0 20px rgba(232,216,176,0.18), 0 0 40px rgba(232,216,176,0.08)",
          filter: "blur(0.3px)",
        }}
      />
      {/* Moon 2 — rim */}
      <div
        className="absolute"
        style={{
          width:  46,
          height: 46,
          borderRadius: "50%",
          border: "1px solid rgba(232,216,176,0.22)",
          top:  32,
          left: 48,
        }}
      />

      {/* Glow halo behind both */}
      <div
        className="absolute"
        style={{
          width:  120,
          height: 100,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(212,196,140,0.06) 0%, transparent 70%)",
          top:  -14,
          left: -14,
          filter: "blur(8px)",
        }}
      />
    </div>
  );
}
