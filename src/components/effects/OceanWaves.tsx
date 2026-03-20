"use client";

// ============================================================
// OCEAN WAVES — Hero + About section background
// Three layered clip-path wave shapes animated by GSAP
// Sits at absolute bottom of section, pointer-events-none
// ============================================================

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function OceanWaves() {
  const w1 = useRef<HTMLDivElement>(null);
  const w2 = useRef<HTMLDivElement>(null);
  const w3 = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pref = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (pref.matches) return;

    // Wave 1 — slowest, deepest
    gsap.to(w1.current, {
      x: "-18px",
      y: "-5px",
      duration: 5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
    // Wave 2 — medium speed
    gsap.to(w2.current, {
      x: "14px",
      y: "-4px",
      duration: 3.8,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: 0.6,
    });
    // Wave 3 — fastest, topmost
    gsap.to(w3.current, {
      x: "-10px",
      y: "-3px",
      duration: 2.9,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: 1.1,
    });
    // Shore line shimmer
    gsap.to(line.current, {
      opacity: 0.06,
      duration: 2.4,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: 0.5,
    });
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute bottom-0 left-0 right-0 h-52 overflow-hidden z-0"
    >
      {/* Wave 1 — deepest fill, dark navy/void */}
      <div
        ref={w1}
        className="absolute inset-0 will-change-transform"
        style={{
          background: "rgba(0,255,106,0.025)",
          clipPath:
            "polygon(0 42%, 8% 35%, 18% 44%, 28% 36%, 38% 44%, 48% 34%, 58% 44%, 68% 35%, 78% 44%, 88% 36%, 100% 44%, 100% 100%, 0 100%)",
        }}
      />
      {/* Wave 2 — mid fill */}
      <div
        ref={w2}
        className="absolute inset-0 will-change-transform"
        style={{
          background: "rgba(0,255,106,0.018)",
          clipPath:
            "polygon(0 55%, 10% 47%, 22% 57%, 32% 47%, 44% 57%, 54% 46%, 66% 57%, 76% 47%, 88% 57%, 96% 48%, 100% 57%, 100% 100%, 0 100%)",
        }}
      />
      {/* Wave 3 — topmost, transparent + just a glowing edge */}
      <div
        ref={w3}
        className="absolute inset-0 will-change-transform"
        style={{
          background: "transparent",
          clipPath:
            "polygon(0 68%, 12% 60%, 24% 70%, 36% 60%, 48% 70%, 60% 60%, 72% 70%, 84% 60%, 96% 70%, 100% 62%, 100% 100%, 0 100%)",
          borderTop: "none",
          boxShadow: "none",
          outline: "none",
        }}
      >
        {/* Green edge glow painted on top clip edge */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(0,255,106,0.25) 30%, rgba(0,255,106,0.12) 60%, transparent 100%)",
            filter: "blur(1px)",
          }}
        />
      </div>

      {/* Shore / horizon line */}
      <div
        ref={line}
        className="absolute left-0 right-0 will-change-transform"
        style={{
          bottom: "52%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(0,255,106,0.12) 20%, rgba(0,255,106,0.08) 80%, transparent)",
          opacity: 0.04,
        }}
      />
    </div>
  );
}
