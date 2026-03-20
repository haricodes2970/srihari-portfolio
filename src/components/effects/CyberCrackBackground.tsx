"use client";

// ============================================================
// CYBER CRACK BACKGROUND — Contact section
// SVG crack lines draw themselves via strokeDashoffset on mount
// Random glitch flicker via GSAP delayedCall loop
// CRT scanline overlay via CSS
// ============================================================

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// Pre-defined crack path coordinates — diagonal slashes
const CRACKS = [
  { d: "M120,0 L90,90 L160,140 L110,240 L180,300",   w: 1.5, opacity: 0.45 },
  { d: "M600,20 L650,110 L580,160 L640,270",          w: 1.0, opacity: 0.30 },
  { d: "M1000,0 L960,80 L1040,130 L980,230 L1060,290", w: 1.5, opacity: 0.40 },
  { d: "M300,80 L270,170 L340,210 L290,310",          w: 0.8, opacity: 0.22 },
  { d: "M800,60 L840,150 L770,190 L830,300",          w: 0.8, opacity: 0.22 },
  { d: "M1300,30 L1260,120 L1340,170",                w: 1.0, opacity: 0.28 },
  // Branch cracks
  { d: "M110,80 L78,115",                             w: 0.7, opacity: 0.18 },
  { d: "M645,110 L680,130",                           w: 0.7, opacity: 0.16 },
  { d: "M970,85 L1005,100 L985,130",                  w: 0.6, opacity: 0.15 },
  { d: "M160,200 L190,215",                           w: 0.6, opacity: 0.14 },
];

export default function CyberCrackBackground() {
  const svgRef    = useRef<SVGSVGElement>(null);
  const glitchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pref = window.matchMedia("(prefers-reduced-motion: reduce)");
    const svg  = svgRef.current;
    if (!svg) return;

    const paths = Array.from(svg.querySelectorAll<SVGPathElement>("path.crack"));

    // ── Draw each crack on mount via strokeDashoffset ──
    paths.forEach((path, i) => {
      const len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 });
      gsap.to(path, {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 1.1 + i * 0.18,
        delay:    0.1 + i * 0.12,
        ease:     "power2.out",
      });
    });

    // ── Glitch flicker loop ──
    if (!pref.matches && glitchRef.current) {
      const glitch = () => {
        if (!glitchRef.current) return;
        gsap.timeline({ onComplete: () => gsap.delayedCall(2.5 + Math.random() * 4.5, glitch) })
          .to(glitchRef.current, { x: (Math.random() - 0.5) * 10, skewX: (Math.random() - 0.5) * 2, opacity: 0.09, duration: 0.06, ease: "none" })
          .to(glitchRef.current, { x: -(Math.random()) * 6,        skewX: 0,                          opacity: 0.05, duration: 0.06, ease: "none" })
          .to(glitchRef.current, { x: 0,                           skewX: 0,                          opacity: 0.05, duration: 0.08, ease: "none" });
      };
      gsap.delayedCall(1.8, glitch);
    }
  }, []);

  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {/* Crack SVG layer */}
      <div ref={glitchRef} className="absolute inset-0" style={{ opacity: 0.05 }}>
        <svg
          ref={svgRef}
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1440 600"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="crackGlow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {CRACKS.map((c, i) => (
            <path
              key={i}
              d={c.d}
              className="crack"
              fill="none"
              stroke={
                i % 3 === 0
                  ? `rgba(0,255,106,${c.opacity})`
                  : i % 3 === 1
                  ? `rgba(0,220,80,${c.opacity * 0.75})`
                  : `rgba(140,255,160,${c.opacity * 0.55})`
              }
              strokeWidth={c.w}
              strokeLinecap="round"
              filter="url(#crackGlow)"
            />
          ))}
        </svg>
      </div>

      {/* CRT horizontal scanlines — ultra-subtle */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.025) 3px, rgba(0,0,0,0.025) 4px)",
          opacity: 0.6,
        }}
      />

      {/* Red glitch artifact — flicker accent */}
      <div
        className="absolute pointer-events-none"
        style={{
          top:    "35%",
          left:   "0",
          right:  "0",
          height: "1px",
          background: "rgba(255,0,60,0.06)",
          animation: "glitch 4s step-end infinite",
        }}
      />
    </div>
  );
}
