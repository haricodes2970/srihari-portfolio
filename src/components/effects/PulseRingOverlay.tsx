"use client";

// ============================================================
// PULSE RING OVERLAY — Projects section
// Random cyan rings expand outward from nodes, simulating data pulses
// ============================================================

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface Ring { id: number; x: string; y: string; }

interface PulseRingOverlayProps {
  isCalm?: boolean;
  count?: number;
}

export default function PulseRingOverlay({
  isCalm = false,
  count  = 6,
}: PulseRingOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef   = useRef(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const color = isCalm ? "94,234,212" : "0,212,255";

    let active = true;

    const spawnRing = () => {
      if (!active || !el) return;
      counterRef.current++;
      const id   = counterRef.current;
      const ring = document.createElement("div");
      ring.style.cssText = `
        position: absolute;
        border-radius: 50%;
        pointer-events: none;
        border: 1.5px solid rgba(${color}, 0.5);
        box-shadow: 0 0 8px rgba(${color}, 0.25), 0 0 20px rgba(${color}, 0.1);
        width: 12px;
        height: 12px;
        left: ${8 + Math.random() * 84}%;
        top:  ${8 + Math.random() * 84}%;
        transform: translate(-50%, -50%) scale(0);
        opacity: 0.5;
        will-change: transform, opacity;
      `;
      ring.dataset.ringId = String(id);
      el.appendChild(ring);

      gsap.fromTo(
        ring,
        { scale: 0, opacity: 0.5 },
        {
          scale:    3.5,
          opacity:  0,
          duration: 2.2,
          ease:     "power1.out",
          onComplete() {
            ring.remove();
          },
        }
      );

      // Next ring
      if (active) {
        const delay = 1200 + Math.random() * 3000;
        setTimeout(spawnRing, delay);
      }
    };

    // Stagger initial spawns
    for (let i = 0; i < count; i++) {
      setTimeout(spawnRing, i * 700);
    }

    return () => {
      active = false;
      // Remove lingering rings
      el.querySelectorAll("[data-ring-id]").forEach((r) => r.remove());
    };
  }, [isCalm, count]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    />
  );
}
