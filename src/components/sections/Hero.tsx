"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Footer from "@/components/shared/Footer";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
});

const ROLES = ["AI / ML", "Full Stack Dev", "AI Agent Maker", "Prompt Engineer"];

function CornerMark({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const base = "absolute w-8 h-8 sm:w-12 sm:h-12 border-green-core/20 border-solid";
  const styles = {
    tl: "top-16 sm:top-20 left-4 sm:left-10 border-t border-l",
    tr: "top-16 sm:top-20 right-4 sm:right-10 border-t border-r",
    bl: "bottom-16 sm:bottom-20 left-4 sm:left-10 border-b border-l",
    br: "bottom-16 sm:bottom-20 right-4 sm:right-10 border-b border-r",
  };
  return <div className={`${base} ${styles[position]}`} />;
}

export default function Hero() {
  return (
    <>
      <section
        id="hero"
        className="relative h-screen min-h-[600px] flex flex-col items-center
                   justify-center overflow-hidden text-center px-5 sm:px-8"
      >
        {/* Grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,255,106,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,106,0.06) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
          }}
        />

        {/* Radial glow */}
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: "min(700px, 100vw)",
            height: "min(700px, 100vw)",
            background: "radial-gradient(ellipse, rgba(0,255,106,0.07) 0%, transparent 70%)",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            animation: "pulseGlow 4s ease-in-out infinite",
          }}
        />

        {/* Kanji watermark — hidden on small phones */}
        <div
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2
                     select-none pointer-events-none font-display font-black
                     leading-none hidden sm:block"
          style={{
            fontSize: "clamp(60px, 10vw, 160px)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(0,255,106,0.06)",
          }}
        >
          ⚔
        </div>

        {/* Corner marks */}
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
            style={{ fontSize: "clamp(9px, 2vw, 11px)", letterSpacing: "clamp(4px, 2vw, 8px)" }}
          >
            // Domain of a Builder
          </motion.p>

          {/* Headline */}
          <motion.h1
            {...fadeUp(0.55)}
            className="font-display font-black leading-[0.92] tracking-tight w-full"
            style={{ fontSize: "clamp(40px, 8.5vw, 96px)" }}
          >
            <span className="block text-text-primary">You Think,</span>
            <span
              className="block text-green-core"
              style={{ textShadow: "0 0 60px rgba(0,255,106,0.25), 0 0 120px rgba(0,255,106,0.1)" }}
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
            className="my-6 mx-auto"
            style={{
              width: 56,
              height: 1,
              background: "linear-gradient(90deg, transparent, #00ff6a, transparent)",
            }}
          />

          {/* Role tags */}
          <motion.div
            {...fadeUp(1.25)}
            className="flex flex-wrap gap-2 justify-center"
          >
            {ROLES.map((role) => (
              <span
                key={role}
                className="font-mono uppercase text-text-secondary border border-green-core/20
                           bg-green-core/5 px-3 py-1.5 rounded-sm"
                style={{ fontSize: "clamp(8px, 1.5vw, 9px)", letterSpacing: "2px" }}
              >
                {role}
              </span>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            {...fadeUp(1.4)}
            className="flex flex-col sm:flex-row gap-3 mt-9 justify-center w-full sm:w-auto"
          >
            <Link
              href="/projects"
              className="font-mono uppercase text-void bg-green-core
                         px-8 py-3.5 rounded-sm text-center
                         transition-shadow duration-300
                         hover:shadow-[0_0_28px_rgba(0,255,106,0.35)]"
              style={{ fontSize: "clamp(9px, 1.5vw, 10px)", letterSpacing: "3px" }}
            >
              View Battle Log
            </Link>
            <Link
              href="/contact"
              className="font-mono uppercase text-green-core
                         border border-green-core/20 px-8 py-3.5 rounded-sm text-center
                         transition-all duration-300
                         hover:border-green-core/40 hover:bg-green-core/5"
              style={{ fontSize: "clamp(9px, 1.5vw, 10px)", letterSpacing: "3px" }}
            >
              Get In Touch
            </Link>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          {...fadeUp(1.9)}
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
