"use client";

// ============================================================
// RISING STARS CANVAS — Certificates section background
// ✦ particles rise from bottom with GSAP, loop endlessly
// Spawn rate halved on mobile. Green glow bloom on each star.
// ============================================================

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const STAR_CHARS = ["✦", "✧", "⋆", "★", "✸", "✺"];

interface StarEl {
  el: HTMLDivElement;
  tween: gsap.core.Tween;
}

function spawnStar(container: HTMLElement): StarEl {
  const el        = document.createElement("div");
  const char      = STAR_CHARS[Math.floor(Math.random() * STAR_CHARS.length)];
  const size      = 7 + Math.random() * 9;
  const leftPct   = Math.random() * 100;
  const alpha     = 0.25 + Math.random() * 0.45;
  const dur       = 4.5 + Math.random() * 5;
  const driftX    = (Math.random() - 0.5) * 70;
  const delay     = Math.random() * 6;
  const scale     = 0.7 + Math.random() * 0.8;

  el.textContent = char;
  Object.assign(el.style, {
    position:   "absolute",
    fontSize:   `${size}px`,
    color:      `rgba(0,255,106,${alpha})`,
    textShadow: `0 0 8px rgba(0,255,106,0.5), 0 0 20px rgba(0,255,106,0.2)`,
    left:       `${leftPct}%`,
    bottom:     "0px",
    pointerEvents: "none",
    willChange: "transform, opacity",
    transform:  `scale(${scale})`,
    userSelect: "none",
  });

  container.appendChild(el);

  const tween = gsap.fromTo(
    el,
    { y: 0, x: 0, opacity: 0, scale },
    {
      y:       -(container.offsetHeight + 60),
      x:       driftX,
      opacity: 0,
      scale:   scale * 0.5,
      duration: dur,
      delay,
      ease:    "power1.out",
      repeat:  -1,
      onRepeat() {
        // Randomise position and char on each repeat
        gsap.set(el, {
          x:    0,
          y:    0,
          opacity: 0,
          left: `${Math.random() * 100}%`,
          scale,
        });
        el.textContent = STAR_CHARS[Math.floor(Math.random() * STAR_CHARS.length)];
      },
      keyframes: [
        { opacity: alpha * 0.5, duration: dur * 0.12 },
        { opacity: alpha,       duration: dur * 0.50 },
        { opacity: 0,           duration: dur * 0.38 },
      ],
    }
  );

  return { el, tween };
}

export default function RisingStarsCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pref = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (pref.matches) return;

    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    const count    = isMobile ? 10 : 24;

    const stars: StarEl[] = Array.from({ length: count }, () => spawnStar(container));

    return () => {
      stars.forEach(({ el, tween }) => {
        tween.kill();
        el.remove();
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
