"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@/components/shared/Footer";
import TwoMoons from "@/components/effects/TwoMoons";
import ParticleMesh from "@/components/effects/ParticleMesh";
import { GITHUB_URL, LINKEDIN_URL, SITE_EMAIL } from "@/lib/constants";
import { useUIStore } from "@/store/uiStore";

gsap.registerPlugin(ScrollTrigger);

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

// Floating kanji characters for atmosphere
const KANJI = ["刀", "心", "魂", "強", "道", "剣", "夢"];

export default function About() {
  const sectionRef  = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const kanjiRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const quoteRef    = useRef<HTMLQuoteElement>(null);
  const headingRef  = useRef<HTMLHeadingElement>(null);
  const mode        = useUIStore((s) => s.mode);
  const isCalm      = mode === "calm";

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Floating kanji ─────────────────────────────────
      kanjiRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          y:        `${-18 - i * 4}px`,
          x:        `${Math.sin(i) * 10}px`,
          opacity:  0,
          duration: 4 + i * 0.6,
          delay:    i * 0.4,
          ease:     "power1.inOut",
          repeat:   -1,
          yoyo:     true,
        });
      });

      // ── Portrait parallax on scroll ────────────────────
      if (portraitRef.current) {
        gsap.to(portraitRef.current, {
          y: -24,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start:   "top bottom",
            end:     "bottom top",
            scrub:   1.5,
          },
        });
      }

      // ── Jolly Roger watermark entrance ─────────────────
      const jolly = sectionRef.current?.querySelector(".jolly-roger");
      if (jolly) {
        gsap.fromTo(jolly,
          { opacity: 0, scale: 0.85 },
          { opacity: 0.045, scale: 1, duration: 2, ease: "power2.out", delay: 0.5 }
        );
      }

      // ── Wave animation (bottom SVG paths) ──────────────
      const wave1 = sectionRef.current?.querySelector(".wave1");
      const wave2 = sectionRef.current?.querySelector(".wave2");
      const wave3 = sectionRef.current?.querySelector(".wave3");
      if (wave1) gsap.to(wave1, { x: -80,  duration: 7,  repeat: -1, yoyo: true, ease: "sine.inOut" });
      if (wave2) gsap.to(wave2, { x:  60,  duration: 9,  repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1 });
      if (wave3) gsap.to(wave3, { x: -40,  duration: 11, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2 });

      // ── "Who Am I" — letter-by-letter Wanted reveal ────
      if (headingRef.current) {
        const text = headingRef.current.textContent || "";
        headingRef.current.innerHTML = text
          .split("")
          .map((c) => c === " " ? " " : `<span class="h-char" style="display:inline-block">${c}</span>`)
          .join("");
        const chars = headingRef.current.querySelectorAll(".h-char");
        gsap.fromTo(chars,
          { opacity: 0, y: 14 },
          {
            opacity: 1, y: 0,
            duration: 0.5,
            stagger: 0.04,
            ease: "power2.out",
            delay: 0.3,
            onComplete() {
              // Stamp jitter — wanted poster feel
              gsap.to(chars, {
                x: () => (Math.random() - 0.5) * 3,
                y: () => (Math.random() - 0.5) * 3,
                duration: 0.08,
                stagger: 0.01,
                ease: "none",
                yoyo: true,
                repeat: 2,
              });
            },
          }
        );
      }

      // ── Quote reveal with clip-path ────────────────────
      if (quoteRef.current) {
        gsap.fromTo(quoteRef.current,
          { clipPath: "inset(0 100% 0 0)", opacity: 0.5 },
          {
            clipPath: "inset(0 0% 0 0)",
            opacity:  1,
            duration: 1.2,
            ease:     "power2.out",
            scrollTrigger: {
              trigger: quoteRef.current,
              start:   "top 85%",
              once:    true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="about"
        className="min-h-screen bg-deep border-t border-green-core/8
                   px-5 sm:px-8 md:px-16 pt-28 sm:pt-32 pb-16 sm:pb-20
                   relative overflow-hidden"
      >
        {/* Two moons — top left, dark mode only */}
        <TwoMoons />

        {/* Ambient cyan mesh — non-cursor-reactive drift */}
        <ParticleMesh
          count={75}
          connectDist={165}
          nodeColor={isCalm ? "13,148,136" : "0,212,255"}
          lineColor={isCalm ? "13,148,136" : "0,180,220"}
          opacity={isCalm ? 0.55 : 0.70}
          noCursor
        />

        {/* ── Jolly Roger watermark — faint skull silhouette ── */}
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
        >
          <svg
            viewBox="0 0 200 200"
            className="w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] opacity-0 jolly-roger"
            style={{ filter: isCalm ? "none" : "drop-shadow(0 0 20px rgba(0,212,255,0.2))" }}
          >
            {/* Skull outline */}
            <ellipse cx="100" cy="85" rx="52" ry="48" fill="none"
              stroke={isCalm ? "rgba(13,148,136,0.08)" : "rgba(0,212,255,0.06)"} strokeWidth="2" />
            {/* Eye sockets */}
            <ellipse cx="82"  cy="80" rx="12" ry="13"
              fill={isCalm ? "rgba(13,148,136,0.06)" : "rgba(0,212,255,0.05)"} />
            <ellipse cx="118" cy="80" rx="12" ry="13"
              fill={isCalm ? "rgba(13,148,136,0.06)" : "rgba(0,212,255,0.05)"} />
            {/* Nose hole */}
            <ellipse cx="100" cy="96" rx="6" ry="7"
              fill={isCalm ? "rgba(13,148,136,0.05)" : "rgba(0,212,255,0.04)"} />
            {/* Teeth */}
            {[74, 84, 94, 104, 114, 124].map((x) => (
              <rect key={x} x={x} y="117" width="8" height="10" rx="1"
                fill={isCalm ? "rgba(13,148,136,0.07)" : "rgba(0,212,255,0.05)"} />
            ))}
            {/* Crossbones */}
            <line x1="30" y1="145" x2="170" y2="175" stroke={isCalm ? "rgba(13,148,136,0.06)" : "rgba(0,212,255,0.05)"} strokeWidth="6" strokeLinecap="round" />
            <line x1="170" y1="145" x2="30" y2="175" stroke={isCalm ? "rgba(13,148,136,0.06)" : "rgba(0,212,255,0.05)"} strokeWidth="6" strokeLinecap="round" />
            {/* Straw hat brim */}
            <ellipse cx="100" cy="42" rx="70" ry="10" fill="none"
              stroke={isCalm ? "rgba(13,148,136,0.07)" : "rgba(0,212,255,0.06)"} strokeWidth="2.5" />
            <ellipse cx="100" cy="37" rx="38" ry="18" fill="none"
              stroke={isCalm ? "rgba(13,148,136,0.07)" : "rgba(0,212,255,0.06)"} strokeWidth="2" />
          </svg>
        </div>

        {/* ── Bottom wave — Going Merry ocean ── */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 pointer-events-none z-0 overflow-hidden"
          style={{ height: 90 }}
        >
          <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className="w-full h-full">
            <path
              className="wave1"
              d="M0,55 C240,20 480,80 720,50 C960,20 1200,75 1440,45 L1440,90 L0,90 Z"
              fill={isCalm ? "rgba(180,220,210,0.18)" : "rgba(0,70,90,0.35)"}
            />
            <path
              className="wave2"
              d="M0,68 C200,40 400,75 600,58 C800,40 1000,72 1200,55 C1300,46 1380,60 1440,52 L1440,90 L0,90 Z"
              fill={isCalm ? "rgba(130,200,190,0.12)" : "rgba(0,50,70,0.25)"}
            />
            <path
              className="wave3"
              d="M0,78 C300,60 600,82 900,68 C1100,58 1300,74 1440,65 L1440,90 L0,90 Z"
              fill={isCalm ? "rgba(100,180,170,0.10)" : "rgba(0,35,55,0.20)"}
            />
          </svg>
        </div>

        {/* Scan line */}
        <div className="scan-overlay" />

        {/* Ambient background dots */}
        {[...Array(8)].map((_, i) => (
          <div key={i} className="ambient-dot"
            style={{
              left: `${10 + i * 12}%`, top: `${20 + (i % 3) * 25}%`,
              width: `${1 + (i % 2)}px`, height: `${1 + (i % 2)}px`,
              "--dur": `${6 + i * 0.8}s`, "--delay": `${i * 0.5}s`, opacity: 0.08,
            } as React.CSSProperties}
          />
        ))}

        {/* Floating kanji — right side */}
        <div className="absolute right-8 top-1/4 hidden lg:block pointer-events-none select-none">
          {KANJI.map((k, i) => (
            <div
              key={k}
              ref={(el) => { kanjiRefs.current[i] = el; }}
              className="font-display font-black mb-6"
              style={{
                fontSize:    `${22 - i * 1.5}px`,
                color:       "transparent",
                WebkitTextStroke: "1px rgba(0,255,106,0.08)",
                opacity:     0.06 + i * 0.01,
                marginLeft:  `${i % 2 === 0 ? 0 : 18}px`,
              }}
            >
              {k}
            </div>
          ))}
        </div>

        {/* Section header */}
        <motion.div {...fadeUp(0)} className="mb-12 sm:mb-16 relative z-10">
          <div className="eyebrow mb-3">Origin Arc</div>
          <h2
            ref={headingRef}
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
          <motion.div {...fadeUp(0.1)}
            className="relative max-w-[260px] sm:max-w-[300px] lg:max-w-none mx-auto lg:mx-0">
            <div ref={portraitRef}
              className="relative w-full border border-green-core/20 rounded-sm overflow-hidden
                         bg-card portrait-glow"
              style={{ aspectRatio: "3/4" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-core/6 to-transparent z-10 pointer-events-none" />
              <div className="scan-overlay" />

              {/* Corner accents */}
              <div className="absolute top-3 left-3  w-5 h-5 border-t-2 border-l-2 border-green-core z-20 pointer-events-none" />
              <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-green-core/40 z-20 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-green-core z-20 pointer-events-none" />
              <div className="absolute bottom-3 left-3  w-5 h-5 border-b-2 border-l-2 border-green-core/40 z-20 pointer-events-none" />

              <Image src="/images/photo.jpg" alt="Srihari Prasad.S" fill
                className="object-cover relative z-10" priority />
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
                   style={{ textShadow: "0 0 20px rgba(0,255,106,0.4)" }}>∞</div>
              <div className="font-mono text-[7px] sm:text-[8px] tracking-[2px] uppercase text-text-muted mt-1">
                Limitless
              </div>
            </motion.div>

            {/* Side accent line */}
            <motion.div
              initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -left-4 top-0 bottom-0 w-px origin-top"
              style={{ background: "linear-gradient(180deg, var(--color-accent), rgba(0,255,106,0.2), transparent)" }}
            />
          </motion.div>

          {/* ── Content ── */}
          <div className="flex flex-col gap-5 sm:gap-6 pt-2 mt-6 lg:mt-0">

            {/* Quote — GSAP clip-path reveal */}
            <blockquote
              ref={quoteRef}
              className="font-display text-green-core leading-snug pl-4 border-l-2 border-green-core relative"
              style={{ fontSize: "clamp(13px, 1.8vw, 16px)" }}
            >
              <span className="absolute -left-1 top-0 text-green-core/30 text-3xl leading-none select-none">"</span>
              "I Build What I Think —<br />
              To Check My Current Limitations"
            </blockquote>

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
                <motion.div key={item.label}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-card border border-green-core/8 rounded-sm p-3 sm:p-4 card-shine
                             transition-all duration-300
                             hover:border-green-core/25 hover:shadow-[0_0_20px_rgba(0,255,106,0.07)]"
                >
                  <div className="font-mono text-[7px] sm:text-[8px] tracking-[3px] uppercase text-text-dim mb-1.5">
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
                <a key={s.label} href={s.href}
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
