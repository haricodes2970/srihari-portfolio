"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Footer from "@/components/shared/Footer";
import { GITHUB_URL, LINKEDIN_URL, SITE_EMAIL } from "@/lib/constants";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] },
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
                   px-5 sm:px-8 md:px-16 pt-28 sm:pt-32 pb-16 sm:pb-20"
      >
        {/* Section header */}
        <motion.div {...fadeUp(0)} className="mb-12 sm:mb-16">
          <div className="eyebrow mb-3">Origin Arc</div>
          <h2
            className="font-display font-bold text-text-primary leading-tight"
            style={{ fontSize: "clamp(28px, 5vw, 54px)" }}
          >
            Who Am I
          </h2>
        </motion.div>

        {/* Two column layout — stacks on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] xl:grid-cols-[340px_1fr]
                        gap-10 xl:gap-24 items-start">

          {/* ── Portrait ── */}
          <motion.div {...fadeUp(0.1)}
            className="relative max-w-[260px] sm:max-w-[300px] lg:max-w-none mx-auto lg:mx-0"
          >
            <div
              className="relative w-full border border-green-core/20 rounded-sm overflow-hidden bg-card"
              style={{ aspectRatio: "3/4" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-core/5 to-transparent z-10" />
              <div className="absolute top-3 left-3 w-4 h-4 sm:w-5 sm:h-5 border-t-2 border-l-2 border-green-core z-20" />
              <div className="absolute bottom-3 right-3 w-4 h-4 sm:w-5 sm:h-5 border-b-2 border-r-2 border-green-core z-20" />
              <Image
                src="/images/photo.jpg"
                alt="Srihari Prasad.S"
                fill
                className="object-cover relative z-10"
              />
            </div>

            {/* Infinity badge */}
            <div className="absolute -bottom-4 -right-4 bg-void border border-green-core/20
                            rounded-sm px-3 sm:px-4 py-2 sm:py-3">
              <div className="font-display font-black text-xl sm:text-2xl text-green-core leading-none">∞</div>
              <div className="font-mono text-[7px] sm:text-[8px] tracking-[2px] uppercase text-text-muted mt-1">
                Limitless
              </div>
            </div>
          </motion.div>

          {/* ── Content ── */}
          <div className="flex flex-col gap-5 sm:gap-6 pt-2 mt-6 lg:mt-0">

            {/* Quote */}
            <motion.blockquote
              {...fadeUp(0.2)}
              className="font-display text-green-core leading-snug pl-4 border-l-2 border-green-core"
              style={{ fontSize: "clamp(13px, 1.8vw, 16px)" }}
            >
              "I Build What I Think —<br />
              To Check My Current Limitations"
            </motion.blockquote>

            {/* Bio */}
            <motion.div {...fadeUp(0.3)} className="space-y-4">
              <p className="text-text-primary leading-relaxed font-ui"
                 style={{ fontSize: "clamp(14px, 1.6vw, 16px)" }}>
                Not an average person. I'm{" "}
                <strong className="text-green-core font-semibold">Srihari Prasad.S</strong>
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
                <strong className="text-green-core font-semibold">
                  I AM BETTER THAN WHAT YOU SAW ME YESTERDAY.
                </strong>
                {" "}That's not a tagline — that's my operating system.
              </p>
            </motion.div>

            {/* Meta cards */}
            <motion.div {...fadeUp(0.4)} className="grid grid-cols-2 gap-2 sm:gap-3 mt-1">
              {META.map((item) => (
                <div
                  key={item.label}
                  className="bg-card border border-green-core/8 rounded-sm p-3 sm:p-4
                             transition-colors duration-200 hover:border-green-core/20"
                >
                  <div className="font-mono text-[7px] sm:text-[8px] tracking-[3px]
                                  uppercase text-text-dim mb-1.5">
                    {item.label}
                  </div>
                  <div className="font-ui text-[13px] sm:text-[14px] font-semibold text-text-primary">
                    {item.value}
                  </div>
                </div>
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
                             transition-all duration-200
                             hover:text-green-core hover:border-green-core/20 hover:bg-green-core/5"
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
