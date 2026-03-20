"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Footer from "@/components/shared/Footer";
import TwoMoons from "@/components/effects/TwoMoons";
import ParticleMesh from "@/components/effects/ParticleMesh";

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 20 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
});

const ROLES = ["AI / ML", "Full Stack Dev", "AI Agent Maker", "Prompt Engineer"];

// Ambient floating dots — each has a stable position + random timing
const AMBIENT_DOTS = Array.from({ length: 22 }, (_, i) => ({
  id:    i,
  left:  `${5 + Math.floor(((i * 43) % 90))}%`,
  top:   `${10 + Math.floor(((i * 67) % 80))}%`,
  size:  1 + (i % 3),
  dur:   5 + (i % 4) * 1.5,
  delay: (i % 6) * 0.8,
  opacity: 0.08 + (i % 4) * 0.04,
}));

function CornerMark({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const base = "absolute pointer-events-none";
  const sizes: Record<string, string> = {
    tl: "top-16 sm:top-20 left-4  sm:left-10",
    tr: "top-16 sm:top-20 right-4 sm:right-10",
    bl: "bottom-16 sm:bottom-20 left-4  sm:left-10",
    br: "bottom-16 sm:bottom-20 right-4 sm:right-10",
  };
  const borders: Record<string, string> = {
    tl: "border-t border-l",
    tr: "border-t border-r",
    bl: "border-b border-l",
    br: "border-b border-r",
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={`
        ${base} ${sizes[position]}
        w-8 h-8 sm:w-12 sm:h-12
        border-green-core/25 border-solid ${borders[position]}
      `}
    />
  );
}

export default function Hero() {
  const lineRef = useRef<HTMLDivElement>(null);

  // Subtle mouse parallax on the glow
  useEffect(() => {
    const glow = lineRef.current;
    if (!glow) return;
    const onMove = (e: MouseEvent) => {
      const cx = e.clientX / window.innerWidth  - 0.5;
      const cy = e.clientY / window.innerHeight - 0.5;
      glow.style.transform = `translate(calc(-50% + ${cx * 28}px), calc(-50% + ${cy * 28}px))`;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <section
        id="hero"
        className="relative h-screen min-h-[600px] flex flex-col items-center
                   justify-center overflow-hidden text-center px-5 sm:px-8"
      >
        {/* Two moons — dark mode only */}
        <TwoMoons />

        {/* Particle mesh — cursor-reactive floating node network */}
        <ParticleMesh count={90} connectDist={160} opacity={0.8} />

        {/* ── Grid background ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,255,106,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,106,0.055) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse 85% 85% at 50% 50%, black 30%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 85% 85% at 50% 50%, black 30%, transparent 100%)",
          }}
        />

        {/* ── Scan line overlay ── */}
        <div className="scan-overlay" />

        {/* ── Radial glow (mouse parallax) ── */}
        <div
          ref={lineRef}
          className="absolute pointer-events-none rounded-full"
          style={{
            width: "min(800px, 120vw)",
            height: "min(800px, 120vw)",
            background:
              "radial-gradient(ellipse, rgba(0,255,106,0.075) 0%, transparent 70%)",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            transition: "transform 0.15s ease-out",
            animation: "pulseGlow 5s ease-in-out infinite",
          }}
        />

        {/* ── Ambient floating dots ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {AMBIENT_DOTS.map((dot) => (
            <div
              key={dot.id}
              className="absolute rounded-full bg-green-core"
              style={{
                left:    dot.left,
                top:     dot.top,
                width:   `${dot.size}px`,
                height:  `${dot.size}px`,
                opacity: dot.opacity,
                boxShadow: `0 0 ${dot.size * 4}px rgba(0,255,106,0.4)`,
                animation: `ambientFloat ${dot.dur}s ease-in-out infinite ${dot.delay}s`,
              }}
            />
          ))}
        </div>

        {/* ── Kanji watermark ── */}
        <div
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2
                     select-none pointer-events-none font-display font-black
                     leading-none hidden sm:block"
          style={{
            fontSize: "clamp(60px, 10vw, 160px)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(0,255,106,0.07)",
            animation: "float 7s ease-in-out infinite",
          }}
        >
          ⚔
        </div>

        {/* ── Corner marks ── */}
        <CornerMark position="tl" />
        <CornerMark position="tr" />
        <CornerMark position="bl" />
        <CornerMark position="br" />

        {/* ── Main content ── */}
        <div className="relative z-10 flex flex-col items-center w-full max-w-4xl mx-auto">

          {/* Label */}
          <motion.p
            {...fadeUp(0.3)}
            className="font-mono uppercase text-text-muted mb-5"
            style={{
              fontSize: "clamp(9px, 2vw, 11px)",
              letterSpacing: "clamp(4px, 2vw, 8px)",
            }}
          >
            // Domain of a Builder
          </motion.p>

          {/* Headline — glitch on hover */}
          <motion.h1
            {...fadeUp(0.55)}
            className="font-display font-black leading-[0.92] tracking-tight w-full"
            style={{ fontSize: "clamp(40px, 8.5vw, 96px)" }}
          >
            <span className="block text-text-primary">You Think,</span>
            <span
              className="block text-green-core shimmer-text"
              data-text="I Make It Real"
              style={{
                textShadow: "0 0 60px rgba(0,255,106,0.2), 0 0 120px rgba(0,255,106,0.08)",
              }}
            >
              I Make It Real
            </span>
          </motion.h1>

          {/* Name */}
          <motion.p
            {...fadeUp(0.8)}
            className="font-ui font-light text-text-secondary mt-4 uppercase"
            style={{
              fontSize: "clamp(11px, 2.2vw, 19px)",
              letterSpacing: "clamp(3px, 1.5vw, 8px)",
            }}
          >
            Srihari Prasad.S
          </motion.p>

          {/* Tagline */}
          <motion.p
            {...fadeUp(0.95)}
            className="font-mono text-text-dim mt-2"
            style={{ fontSize: "clamp(9px, 1.4vw, 12px)", letterSpacing: "3px" }}
          >
            — Thinking is Limitless —
          </motion.p>

          {/* Divider */}
          <motion.div
            {...fadeUp(1.1)}
            className="my-6 mx-auto relative"
            style={{
              width: 72,
              height: 1,
              background: "linear-gradient(90deg, transparent, #00ff6a, transparent)",
            }}
          >
            {/* Center diamond */}
            <div
              className="absolute top-1/2 left-1/2"
              style={{
                width: 5,
                height: 5,
                background: "#00ff6a",
                transform: "translate(-50%, -50%) rotate(45deg)",
                boxShadow: "0 0 8px #00ff6a",
              }}
            />
          </motion.div>

          {/* Role tags — staggered */}
          <motion.div
            {...fadeUp(1.25)}
            className="flex flex-wrap gap-2 justify-center"
          >
            {ROLES.map((role, i) => (
              <motion.span
                key={role}
                initial={{ opacity: 0, y: 12, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 1.3 + i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-mono uppercase text-text-secondary border border-green-core/20
                           bg-green-core/5 px-3 py-1.5 rounded-sm
                           transition-all duration-300
                           hover:border-green-core/40 hover:text-green-core hover:bg-green-core/10
                           hover:shadow-[0_0_14px_rgba(0,255,106,0.15)]"
                style={{ fontSize: "clamp(8px, 1.5vw, 9px)", letterSpacing: "2px" }}
              >
                {role}
              </motion.span>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            {...fadeUp(1.55)}
            className="flex flex-col sm:flex-row gap-3 mt-9 justify-center w-full sm:w-auto"
          >
            <Link
              href="/projects"
              className="group relative font-mono uppercase text-void bg-green-core
                         px-8 py-3.5 rounded-sm text-center overflow-hidden
                         transition-all duration-300
                         hover:shadow-[0_0_32px_rgba(0,255,106,0.4),0_0_64px_rgba(0,255,106,0.15)]"
              style={{ fontSize: "clamp(9px, 1.5vw, 10px)", letterSpacing: "3px" }}
            >
              <span className="relative z-10">View Battle Log</span>
              {/* shine sweep */}
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100
                           transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 1.5s ease infinite",
                }}
              />
            </Link>
            <Link
              href="/contact"
              className="font-mono uppercase text-green-core
                         border border-green-core/25 px-8 py-3.5 rounded-sm text-center
                         transition-all duration-300
                         hover:border-green-core/50 hover:bg-green-core/6
                         hover:shadow-[0_0_20px_rgba(0,255,106,0.12)]"
              style={{ fontSize: "clamp(9px, 1.5vw, 10px)", letterSpacing: "3px" }}
            >
              Get In Touch
            </Link>
          </motion.div>

          {/* Status line */}
          <motion.div
            {...fadeUp(1.8)}
            className="mt-8 flex items-center gap-3"
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-green-core"
              style={{
                boxShadow: "0 0 6px #00ff6a",
                animation: "wipPulse 1.8s ease-in-out infinite",
              }}
            />
            <span
              className="font-mono text-text-dim"
              style={{ fontSize: "9px", letterSpacing: "3px" }}
            >
              SYSTEM ONLINE · READY TO BUILD
            </span>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          {...fadeUp(2.1)}
          className="absolute bottom-7 left-1/2 -translate-x-1/2
                     flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[8px] tracking-[3px] uppercase text-text-dim">
            Scroll
          </span>
          <div
            className="w-px h-8 sm:h-10"
            style={{
              background: "linear-gradient(180deg, #00ff6a, transparent)",
              animation: "scrollPulse 2s ease-in-out infinite",
            }}
          />
        </motion.div>
      </section>
      <Footer />
    </>
  );
}
