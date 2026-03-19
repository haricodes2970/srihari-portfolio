"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Footer from "@/components/shared/Footer";
import { GITHUB_URL, LINKEDIN_URL, SITE_EMAIL } from "@/lib/constants";

const fadeUp = (delay = 0) => ({
  initial:      { opacity: 0, y: 24 },
  whileInView:  { opacity: 1, y: 0 },
  viewport:     { once: true, margin: "-60px" },
  transition:   { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] },
});

const META = [
  { label: "Domain",   value: "AI / ML + Full Stack" },
  { label: "Status",   value: "Building Daily ⚔"     },
  { label: "Approach", value: "Idea → Ship → Iterate" },
  { label: "Rank",     value: "Still Ascending 📈"    },
];

const SOCIALS = [
  { icon: "⌥", label: "GitHub",   href: GITHUB_URL,             external: true  },
  { icon: "◈", label: "LinkedIn", href: LINKEDIN_URL,           external: true  },
  { icon: "✉", label: "Email",    href: `mailto:${SITE_EMAIL}`, external: false },
];

export default function About() {
  return (
    <>
      <section
        id="about"
        className="min-h-screen bg-deep border-t border-green-core/8
                   px-5 sm:px-8 md:px-16 pt-28 sm:pt-32 pb-16 sm:pb-20
                   relative overflow-hidden"
      >
        {/* Ambient scan line */}
        <div className="scan-overlay" />

        {/* Background ambient dots */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="ambient-dot"
            style={{
              left:    `${10 + i * 12}%`,
              top:     `${20 + (i % 3) * 25}%`,
              width:   `${1 + (i % 2)}px`,
              height:  `${1 + (i % 2)}px`,
              "--dur":   `${6 + i * 0.8}s`,
              "--delay": `${i * 0.5}s`,
              opacity: 0.08,
            } as React.CSSProperties}
          />
        ))}

        {/* Section header */}
        <motion.div {...fadeUp(0)} className="mb-12 sm:mb-16 relative z-10">
          <div className="eyebrow mb-3">Origin Arc</div>
          <h2
            className="font-display font-bold text-text-primary leading-tight"
            style={{ fontSize: "clamp(28px, 5vw, 54px)" }}
          >
            Who Am I
          </h2>
        </motion.div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] xl:grid-cols-[340px_1fr]
                        gap-10 xl:gap-24 items-start relative z-10">

          {/* ── Portrait ── */}
          <motion.div
            {...fadeUp(0.1)}
            className="relative max-w-[260px] sm:max-w-[300px] lg:max-w-none mx-auto lg:mx-0"
          >
            <div
              className="relative w-full border border-green-core/20 rounded-sm overflow-hidden
                         bg-card portrait-glow"
              style={{ aspectRatio: "3/4" }}
            >
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-core/6 to-transparent z-10 pointer-events-none" />

              {/* Scan line on portrait */}
              <div className="scan-overlay" />

              {/* Corner accents — inner */}
              <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-green-core z-20 pointer-events-none" />
              <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-green-core/40 z-20 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-green-core z-20 pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-green-core/40 z-20 pointer-events-none" />

              <Image
                src="/images/photo.jpg"
                alt="Srihari Prasad.S"
                fill
                className="object-cover relative z-10"
                priority
              />
            </div>

            {/* Infinity badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-4 -right-4 bg-void border border-green-core/25
                         rounded-sm px-3 sm:px-4 py-2 sm:py-3
                         hover:border-green-core/50 transition-all duration-300
                         hover:shadow-[0_0_20px_rgba(0,255,106,0.15)]"
            >
              <div className="font-display font-black text-xl sm:text-2xl text-green-core leading-none"
                   style={{ textShadow: "0 0 20px rgba(0,255,106,0.4)" }}>
                ∞
              </div>
              <div className="font-mono text-[7px] sm:text-[8px] tracking-[2px] uppercase text-text-muted mt-1">
                Limitless
              </div>
            </motion.div>

            {/* Side accent line */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -left-4 top-0 bottom-0 w-px origin-top"
              style={{
                background: "linear-gradient(180deg, #00ff6a, rgba(0,255,106,0.2), transparent)",
              }}
            />
          </motion.div>

          {/* ── Content ── */}
          <div className="flex flex-col gap-5 sm:gap-6 pt-2 mt-6 lg:mt-0">

            {/* Quote */}
            <motion.blockquote
              {...fadeUp(0.2)}
              className="font-display text-green-core leading-snug pl-4 border-l-2 border-green-core
                         relative"
              style={{ fontSize: "clamp(13px, 1.8vw, 16px)" }}
            >
              <span className="absolute -left-1 top-0 text-green-core/30 text-3xl leading-none select-none">
                "
              </span>
              "I Build What I Think —<br />
              To Check My Current Limitations"
            </motion.blockquote>

            {/* Bio */}
            <motion.div {...fadeUp(0.3)} className="space-y-4">
              <p className="text-text-primary leading-relaxed font-ui"
                 style={{ fontSize: "clamp(14px, 1.6vw, 16px)" }}>
                Not an average person. I'm{" "}
                <strong className="text-green-core font-semibold"
                        style={{ textShadow: "0 0 20px rgba(0,255,106,0.2)" }}>
                  Srihari Prasad.S
                </strong>
                {" "}— an AI/ML student and Full Stack developer who treats building as a game.
                Every project is a level. Every bug is a boss. Every shipped product is a victory.
              </p>
              <p className="text-text-secondary leading-relaxed font-ui font-light"
                 style={{ fontSize: "clamp(14px, 1.6vw, 16px)" }}>
                I <strong className="text-text-primary font-medium">Vibe Code a lot</strong> — not just
                writing code, but deeply understanding what I'm building, why it works, and how to make
                it better. I turn ideas into real, working systems — from AI agents and deepfake detectors
                to instant image-sharing platforms.
              </p>
              <p className="text-text-secondary leading-relaxed font-ui font-light"
                 style={{ fontSize: "clamp(14px, 1.6vw, 16px)" }}>
                <strong className="text-green-core font-semibold"
                        style={{ textShadow: "0 0 16px rgba(0,255,106,0.15)" }}>
                  I AM BETTER THAN WHAT YOU SAW ME YESTERDAY.
                </strong>
                {" "}That's not a tagline — that's my operating system.
              </p>
            </motion.div>

            {/* Meta cards */}
            <motion.div {...fadeUp(0.4)} className="grid grid-cols-2 gap-2 sm:gap-3 mt-1">
              {META.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-card border border-green-core/8 rounded-sm p-3 sm:p-4
                             card-shine
                             transition-all duration-300
                             hover:border-green-core/25 hover:shadow-[0_0_20px_rgba(0,255,106,0.07)]"
                >
                  <div className="font-mono text-[7px] sm:text-[8px] tracking-[3px]
                                  uppercase text-text-dim mb-1.5">
                    {item.label}
                  </div>
                  <div className="font-ui text-[13px] sm:text-[14px] font-semibold text-text-primary">
                    {item.value}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Social buttons */}
            <motion.div {...fadeUp(0.5)} className="flex flex-wrap gap-2 sm:gap-3 mt-1">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.external ? "_blank" : undefined}
                  rel={s.external ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-2 font-mono text-[9px] tracking-[2px]
                             uppercase text-text-secondary border border-green-core/8
                             px-3 sm:px-4 py-2 rounded-sm
                             transition-all duration-250
                             hover:text-green-core hover:border-green-core/30 hover:bg-green-core/5
                             hover:shadow-[0_0_14px_rgba(0,255,106,0.12)]"
                >
                  <span className="text-sm">{s.icon}</span>
                  {s.label}
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
