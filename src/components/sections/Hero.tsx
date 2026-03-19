"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Footer from "@/components/shared/Footer";

// ── Animation variants ────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
});

const ROLES = [
  "AI / ML",
  "Full Stack Dev",
  "AI Agent Maker",
  "Prompt Engineer",
];

// ── Corner mark component ─────────────────────────────────
function CornerMark({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const base = "absolute w-12 h-12 border-[#00ff6a] border-opacity-20 border-solid";
  const styles = {
    tl: "top-20 left-10 border-t border-l",
    tr: "top-20 right-10 border-t border-r",
    bl: "bottom-20 left-10 border-b border-l",
    br: "bottom-20 right-10 border-b border-r",
  };
  return <div className={`${base} ${styles[position]}`} />;
}

export default function Hero() {
  return (
    <>
      <section
        id="hero"
        className="relative h-screen min-h-[640px] flex flex-col items-center justify-center overflow-hidden text-center px-6"
      >

        {/* ── Grid background ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,255,106,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,106,0.06) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
          }}
        />

        {/* ── Radial glow ── */}
        <div
          className="absolute pointer-events-none rounded-full animate-pulse-glow"
          style={{
            width: 700,
            height: 700,
            background:
              "radial-gradient(ellipse, rgba(0,255,106,0.07) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* ── Kanji watermark ── */}
        <div
          className="absolute right-8 top-1/2 -translate-y-1/2 select-none pointer-events-none
                     font-display font-black leading-none"
          style={{
            fontSize: "clamp(80px, 12vw, 160px)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(0,255,106,0.06)",
            letterSpacing: 4,
          }}
        >
          ⚔
        </div>

        {/* ── Corner marks ── */}
        <CornerMark position="tl" />
        <CornerMark position="tr" />
        <CornerMark position="bl" />
        <CornerMark position="br" />

        {/* ── Content ── */}
        <div className="relative z-10 flex flex-col items-center">

          {/* Label */}
          <motion.p
            {...fadeUp(0.3)}
            className="font-mono text-[11px] tracking-[8px] uppercase text-text-muted mb-6"
          >
            // Domain of a Builder
          </motion.p>

          {/* Main headline */}
          <motion.h1
            {...fadeUp(0.6)}
            className="font-display font-black leading-[0.95] tracking-tight"
            style={{ fontSize: "clamp(38px, 7.5vw, 96px)" }}
          >
            <span
              className="block text-text-primary"
              style={{ textShadow: "none" }}
            >
              You Think,
            </span>
            <span
              className="block text-green-core"
              style={{
                textShadow:
                  "0 0 60px rgba(0,255,106,0.25), 0 0 120px rgba(0,255,106,0.1)",
              }}
            >
              I Make It Real
            </span>
          </motion.h1>

          {/* Name */}
          <motion.p
            {...fadeUp(0.85)}
            className="font-ui font-light text-text-secondary mt-5"
            style={{
              fontSize: "clamp(13px, 2vw, 20px)",
              letterSpacing: "8px",
              textTransform: "uppercase",
            }}
          >
            Srihari Prasad S
          </motion.p>

          {/* Tagline */}
          <motion.p
            {...fadeUp(1.0)}
            className="font-mono text-text-dim mt-3"
            style={{ fontSize: "clamp(10px, 1.4vw, 13px)", letterSpacing: "4px" }}
          >
            — Thinking is Limitless —
          </motion.p>

          {/* Divider */}
          <motion.div
            {...fadeUp(1.15)}
            className="my-7 mx-auto"
            style={{
              width: 60,
              height: 1,
              background:
                "linear-gradient(90deg, transparent, #00ff6a, transparent)",
            }}
          />

          {/* Role tags */}
          <motion.div
            {...fadeUp(1.3)}
            className="flex flex-wrap gap-3 justify-center"
          >
            {ROLES.map((role) => (
              <span
                key={role}
                className="font-mono text-[9px] tracking-[2px] uppercase
                           text-text-secondary border border-green-core/20
                           bg-green-core/5 px-3 py-1.5 rounded-sm"
              >
                {role}
              </span>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            {...fadeUp(1.5)}
            className="flex flex-wrap gap-4 mt-11 justify-center"
          >
            <Link
              href="/projects"
              className="font-mono text-[10px] tracking-[3px] uppercase
                         bg-green-core text-void px-8 py-3.5 rounded-sm
                         relative overflow-hidden
                         transition-shadow duration-300
                         hover:shadow-[0_0_28px_rgba(0,255,106,0.35)]"
            >
              View Battle Log
            </Link>
            <Link
              href="/contact"
              className="font-mono text-[10px] tracking-[3px] uppercase
                         text-green-core border border-green-core/20 px-8 py-3.5 rounded-sm
                         transition-all duration-300
                         hover:border-green-core/40 hover:bg-green-core/5
                         hover:shadow-[0_0_16px_rgba(0,255,106,0.1)]"
            >
              Get In Touch
            </Link>
          </motion.div>
        </div>

        {/* ── Scroll hint ── */}
        <motion.div
          {...fadeUp(2.0)}
          className="absolute bottom-9 left-1/2 -translate-x-1/2
                     flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[8px] tracking-[3px] uppercase text-text-dim">
            Scroll
          </span>
          <div
            className="w-px h-10 animate-pulse"
            style={{
              background: "linear-gradient(180deg, #00ff6a, transparent)",
            }}
          />
        </motion.div>

      </section>
      <Footer />
    </>
  );
}
