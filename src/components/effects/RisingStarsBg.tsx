"use client";

// ============================================================
// RISING STARS BACKGROUND — Certificates section
// Stars spawn at bottom, rise upward, fade at top
// ============================================================

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";

interface StarData { id: number; x: number; size: number; spin: boolean; }

interface RisingStarsBgProps { isCalm?: boolean; }

// 5-point star clip-path
const STAR_PATH =
  "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)";

export default function RisingStarsBg({ isCalm = false }: RisingStarsBgProps) {
  const [stars, setStars]  = useState<StarData[]>([]);
  const containerRef        = useRef<HTMLDivElement>(null);
  const counterRef          = useRef(0);
  const activeCount         = useRef(0);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const MAX_STARS = isMobile ? 10 : 18;
  const SPAWN_INTERVAL = isMobile ? 1200 : 700;

  const accentColor = isCalm ? "#86EFAC" : "#00FF41";
  const accentRgb   = isCalm ? "134,239,172" : "0,255,65";

  const removeStar = useCallback((id: number) => {
    setStars((prev) => prev.filter((s) => s.id !== id));
    activeCount.current--;
  }, []);

  // Animate a newly mounted star div
  const animateStar = useCallback((el: HTMLDivElement, id: number) => {
    const H       = containerRef.current?.clientHeight ?? window.innerHeight;
    const dur     = 6 + Math.random() * 7;
    const wobbleX = 20 + Math.random() * 30;

    gsap.set(el, { y: H + 40, opacity: 0 });
    gsap.to(el, {
      y: -100,
      duration: dur,
      ease: "power1.inOut",
      onComplete: () => removeStar(id),
    });
    // Fade in/out
    gsap.to(el, { opacity: 0.9, duration: dur * 0.15, ease: "power1.in" });
    gsap.to(el, { opacity: 0, duration: dur * 0.25, delay: dur * 0.75, ease: "power1.out" });
    // Wobble
    gsap.to(el, {
      x: `+=${wobbleX}`,
      duration: dur / 2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
    // Spin (some stars)
    if (Math.random() > 0.5) {
      gsap.to(el, {
        rotation: 360,
        duration: dur * 0.8,
        ease: "linear",
        repeat: -1,
      });
    }
  }, [removeStar]);

  // Spawn loop
  useEffect(() => {
    const interval = setInterval(() => {
      if (activeCount.current >= MAX_STARS) return;
      counterRef.current++;
      const id = counterRef.current;
      activeCount.current++;
      setStars((prev) => [
        ...prev,
        {
          id,
          x:    5 + Math.random() * 90,    // % from left
          size: 8 + Math.random() * 14,    // px
          spin: Math.random() > 0.5,
        },
      ]);
    }, SPAWN_INTERVAL + Math.random() * 400);

    return () => clearInterval(interval);
  }, [MAX_STARS, SPAWN_INTERVAL]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {stars.map((star) => (
        <div
          key={star.id}
          ref={(el) => { if (el) animateStar(el, star.id); }}
          style={{
            position: "absolute",
            left:        `${star.x}%`,
            width:       `${star.size}px`,
            height:      `${star.size}px`,
            background:  accentColor,
            clipPath:    STAR_PATH,
            boxShadow:   `0 0 ${star.size}px ${accentColor}, 0 0 ${star.size * 2}px rgba(${accentRgb}, 0.4)`,
            willChange:  "transform, opacity",
            opacity:     0,
          }}
        />
      ))}
    </div>
  );
}
