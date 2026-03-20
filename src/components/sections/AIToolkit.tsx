"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@/components/shared/Footer";

gsap.registerPlugin(ScrollTrigger);
import ParticleMesh from "@/components/effects/ParticleMesh";
import {
  aiTools,
  experimentingTools,
  CATEGORY_META,
  type AITool,
  type ToolCategory,
} from "@/lib/aiToolkitData";

// ── Logo with fallback ─────────────────────────────────────
function ToolLogo({ domain, name, size = 32 }: { domain: string; name: string; size?: number }) {
  const [err, setErr] = useState(false);
  const initials = name.slice(0, 2).toUpperCase();
  if (err) {
    return (
      <span
        className="flex items-center justify-center rounded-sm font-mono font-bold text-void bg-green-core/80 flex-shrink-0"
        style={{ width: size, height: size, fontSize: size * 0.38 }}
      >
        {initials}
      </span>
    );
  }
  return (
    <Image
      src={`https://logo.clearbit.com/${domain}`}
      alt={name}
      width={size}
      height={size}
      onError={() => setErr(true)}
      className="rounded-sm flex-shrink-0 object-contain"
      style={{ width: size, height: size }}
      unoptimized
    />
  );
}

// ── Typewriter Banner ──────────────────────────────────────
const LINES = [
  "> initialising neural_toolkit.exe ...",
  "> scanning 17 weapons ...",
  "> all systems armed. enter.",
];

function TypewriterBanner() {
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [curLine, setCurLine] = useState(0);
  const [curChar, setCurChar] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (curLine >= LINES.length) { setDone(true); return; }
    const line = LINES[curLine];
    if (curChar < line.length) {
      const t = setTimeout(() => setCurChar((c) => c + 1), 28);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setDisplayed((d) => [...d, line]);
      setCurLine((l) => l + 1);
      setCurChar(0);
    }, 400);
    return () => clearTimeout(t);
  }, [curLine, curChar]);

  const activeLine = curLine < LINES.length ? LINES[curLine].slice(0, curChar) : "";

  return (
    <div
      className="font-mono text-[11px] sm:text-[12px] leading-7 text-green-core/80
                 bg-void/60 border border-green-core/15 rounded-sm px-5 py-4
                 backdrop-blur-sm mb-12 sm:mb-16 max-w-xl"
    >
      {displayed.map((line, i) => (
        <div key={i} className="opacity-60">{line}</div>
      ))}
      {!done && (
        <div>
          {activeLine}
          <span
            className="inline-block w-[7px] h-[13px] bg-green-core align-middle ml-0.5"
            style={{ animation: "wipPulse 0.8s step-start infinite" }}
          />
        </div>
      )}
      {done && (
        <div className="text-green-core font-semibold">
          &gt; <span style={{ textShadow: "0 0 10px #00ff6a" }}>TOOLKIT ONLINE ✓</span>
        </div>
      )}
    </div>
  );
}

// ── Tool Modal ─────────────────────────────────────────────
function ToolModal({ tool, onClose }: { tool: AITool; onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);
  const meta = CATEGORY_META[tool.category];

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  useEffect(() => {
    if (modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.92, y: 32 },
        { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "expo.out" }
      );
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[5000] flex items-center justify-center p-4
                 bg-void/90 backdrop-blur-2xl"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="bg-card border rounded-sm w-full max-w-lg relative overflow-hidden p-7 sm:p-9"
        style={{
          borderColor: meta.color + "33",
          boxShadow: `0 0 60px ${meta.glow}, 0 40px 80px rgba(0,0,0,0.6)`,
        }}
      >
        {/* Top accent */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${meta.color}, transparent)` }}
        />
        <div className="scan-overlay" />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 font-mono text-[9px] tracking-[2px] uppercase
                     text-text-muted border border-green-core/10 px-3 py-1.5 rounded-sm z-10
                     transition-all duration-200 hover:text-green-core hover:border-green-core/30"
        >
          ✕
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-5">
          <ToolLogo domain={tool.domain} name={tool.name} size={44} />
          <div>
            <span
              className="font-mono text-[9px] tracking-[3px] uppercase font-semibold"
              style={{ color: meta.color }}
            >
              {meta.label}
            </span>
            <h2
              className="font-display font-bold text-text-primary leading-tight"
              style={{ fontSize: "clamp(20px, 3vw, 26px)" }}
            >
              {tool.name}
            </h2>
            <p className="font-ui text-text-dim text-xs mt-0.5">{tool.tagline}</p>
          </div>
        </div>

        <div
          className="h-px mb-5"
          style={{ background: `linear-gradient(90deg, ${meta.color}40, transparent)` }}
        />

        {/* Description */}
        <div className="mb-5">
          <p className="font-mono text-[9px] tracking-[3px] uppercase mb-2" style={{ color: meta.color }}>
            What It Is
          </p>
          <p className="font-ui text-text-secondary leading-relaxed font-light text-sm">
            {tool.description}
          </p>
        </div>

        {/* How I use it */}
        <div className="mb-5">
          <p className="font-mono text-[9px] tracking-[3px] uppercase mb-2" style={{ color: meta.color }}>
            How I Use It
          </p>
          <p className="font-ui text-text-secondary leading-relaxed font-light text-sm">
            {tool.useCase}
          </p>
        </div>

        {/* Superpower */}
        <div
          className="mb-5 px-4 py-3 rounded-sm border"
          style={{ borderColor: meta.color + "20", background: meta.color + "08" }}
        >
          <p className="font-mono text-[9px] tracking-[3px] uppercase mb-1" style={{ color: meta.color }}>
            ⚡ Superpower
          </p>
          <p className="font-ui font-semibold text-text-primary text-sm">{tool.superpower}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tool.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[9px] tracking-[1px] text-text-secondary
                         bg-surface border border-green-core/12 px-2.5 py-1 rounded-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <a
          href={tool.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full font-mono text-[10px]
                     tracking-[3px] uppercase py-3 rounded-sm border transition-all duration-300
                     hover:shadow-[0_0_20px_rgba(0,255,106,0.2)]"
          style={{
            color: meta.color,
            borderColor: meta.color + "40",
            background: meta.color + "0f",
          }}
        >
          Open {tool.name} →
        </a>
      </div>
    </motion.div>
  );
}

// ── Toolkit Card ──────────────────────────────────────────
function ToolCard({ tool, index, onClick }: {
  tool: AITool; index: number; onClick: () => void;
}) {
  const meta = CATEGORY_META[tool.category];
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: (index % 8) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className="group bg-surface border border-green-core/8 rounded-sm p-5
                 relative overflow-hidden cursor-pointer
                 transition-all duration-300
                 hover:border-green-core/20 hover:-translate-y-1
                 hover:shadow-[0_8px_32px_rgba(0,255,106,0.07)]"
    >
      {/* Category left bar */}
      <div
        className="absolute top-0 left-0 w-[3px] h-0 group-hover:h-full transition-all duration-500 rounded-sm"
        style={{ background: meta.color, boxShadow: `0 0 8px ${meta.color}` }}
      />

      {/* Top right: category badge */}
      <span
        className="absolute top-3 right-3 font-mono text-[7px] tracking-[1.5px] uppercase
                   px-1.5 py-0.5 rounded-sm border"
        style={{ color: meta.color, borderColor: meta.color + "30", background: meta.color + "10" }}
      >
        {meta.label}
      </span>

      {/* Logo + name */}
      <div className="flex items-center gap-3 mb-3 pr-16">
        <ToolLogo domain={tool.domain} name={tool.name} size={28} />
        <h3
          className="font-display font-bold text-text-primary transition-colors duration-300
                     group-hover:text-green-core leading-tight"
          style={{ fontSize: "clamp(13px, 1.8vw, 15px)" }}
        >
          {tool.name}
        </h3>
      </div>

      {/* Tagline */}
      <p className="font-mono text-[9px] tracking-[1px] uppercase text-text-dim mb-2">
        {tool.tagline}
      </p>

      {/* Description preview */}
      <p className="font-ui text-text-secondary font-light text-xs leading-relaxed line-clamp-2">
        {tool.description}
      </p>

      {/* Expand hint */}
      <div
        className="absolute bottom-3 right-3 font-mono text-[7px] tracking-[1.5px] uppercase
                   text-text-dim opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        tap to expand
      </div>

      {/* Bottom hover line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${meta.color}50, transparent)` }}
      />
    </motion.div>
  );
}

// ── Experimenting Lab ──────────────────────────────────────
function ExperimentingLab() {
  const labRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!labRef.current) return;
    const cards = labRef.current.querySelectorAll(".exp-card");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: {
          trigger: labRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <div ref={labRef} className="mt-20 sm:mt-28">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-8 sm:mb-10"
      >
        <div className="eyebrow mb-3">Side Lab</div>
        <h3
          className="font-display font-bold text-text-primary leading-tight"
          style={{ fontSize: "clamp(22px, 4vw, 38px)" }}
        >
          Experimenting With
        </h3>
        <p
          className="text-text-secondary font-ui font-light mt-2 max-w-md"
          style={{ fontSize: "clamp(13px, 1.5vw, 14px)" }}
        >
          Tools I&apos;m actively testing and pushing to their limits.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {experimentingTools.map((tool) => (
          <div
            key={tool.id}
            className="exp-card bg-card border border-green-core/8 rounded-sm p-4 sm:p-5
                       relative overflow-hidden group transition-all duration-300
                       hover:border-green-core/20 hover:-translate-y-0.5
                       hover:shadow-[0_6px_24px_rgba(0,255,106,0.06)]"
          >
            {/* Shimmer */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at center, rgba(0,255,106,0.04) 0%, transparent 70%)",
              }}
            />

            <div className="flex items-center gap-3 mb-2.5">
              <ToolLogo domain={tool.domain} name={tool.name} size={24} />
              <div>
                <p className="font-ui font-semibold text-text-primary text-xs leading-tight">
                  {tool.name}
                </p>
                <p className="font-mono text-[8px] tracking-[1px] uppercase text-text-dim">
                  {tool.tagline}
                </p>
              </div>
            </div>

            <p className="font-ui text-text-secondary font-light text-xs leading-relaxed line-clamp-3">
              {tool.note}
            </p>

            {/* Status pill */}
            <div className="flex items-center gap-1.5 mt-3">
              <span
                className="w-1.5 h-1.5 rounded-full bg-green-core flex-shrink-0"
                style={{ boxShadow: "0 0 6px #00ff6a", animation: "wipPulse 2s ease-in-out infinite" }}
              />
              <span className="font-mono text-[7px] tracking-[2px] uppercase text-green-core/70">
                In progress
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Category filter tabs ───────────────────────────────────
const ALL_CATS: Array<{ label: string; value: ToolCategory | "all" }> = [
  { label: "All",          value: "all" },
  { label: "Coding",       value: "coding" },
  { label: "AI / ML",      value: "ai-ml" },
  { label: "Research",     value: "research" },
  { label: "Content",      value: "content" },
  { label: "Design",       value: "design" },
  { label: "Productivity", value: "productivity" },
];

// ── Main ──────────────────────────────────────────────────
export default function AIToolkit() {
  const [active, setActive] = useState<ToolCategory | "all">("all");
  const [selected, setSelected] = useState<AITool | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = active === "all"
    ? aiTools
    : aiTools.filter((t) => t.category === active);

  // GSAP stagger on filter change
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".tool-card-wrap");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "expo.out" }
    );
  }, [active]);

  return (
    <>
      <section
        id="ai-toolkit"
        className="min-h-screen bg-void border-t border-green-core/8
                   px-5 sm:px-8 md:px-16 pt-28 sm:pt-32 pb-16 sm:pb-20
                   relative overflow-hidden"
      >
        {/* Particle mesh */}
        <ParticleMesh
          count={80}
          connectDist={160}
          nodeColor="0,212,255"
          lineColor="0,180,255"
          opacity={0.7}
        />
        <div className="scan-overlay" />

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 sm:mb-8 relative z-10"
        >
          <div className="eyebrow mb-3">Arsenal</div>
          <h2
            className="font-display font-bold text-text-primary leading-tight"
            style={{ fontSize: "clamp(28px, 5vw, 54px)" }}
          >
            AI Toolkit
          </h2>
          <p
            className="text-text-secondary font-ui font-light mt-3 max-w-md"
            style={{ fontSize: "clamp(13px, 1.6vw, 15px)" }}
          >
            Every tool I reach for when building. Tested, trusted, and wielded daily.
          </p>
        </motion.div>

        {/* ── Typewriter Banner ── */}
        <div className="relative z-10">
          <TypewriterBanner />
        </div>

        {/* ── Filter tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-8 sm:mb-10 relative z-10"
        >
          {ALL_CATS.map((cat) => {
            const isActive = active === cat.value;
            const meta = cat.value !== "all" ? CATEGORY_META[cat.value as ToolCategory] : null;
            return (
              <button
                key={cat.value}
                onClick={() => setActive(cat.value)}
                className={`relative font-mono text-[9px] tracking-[2px] uppercase
                  px-4 py-2 rounded-sm border overflow-hidden transition-all duration-250
                  ${isActive
                    ? "text-void border-transparent"
                    : "text-text-muted border-green-core/8 hover:text-text-secondary hover:border-green-core/20 hover:bg-green-core/5"
                  }`}
                style={isActive && meta ? {
                  background: meta.color,
                  boxShadow: `0 0 20px ${meta.glow}`,
                } : isActive ? {
                  background: "#00ff6a",
                  boxShadow: "0 0 20px rgba(0,255,106,0.3)",
                } : {}}
              >
                {cat.label}
              </button>
            );
          })}
        </motion.div>

        {/* ── Toolkit grid ── */}
        <div ref={gridRef} className="relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4"
            >
              {filtered.map((tool, i) => (
                <div key={tool.id} className="tool-card-wrap">
                  <ToolCard
                    tool={tool}
                    index={i}
                    onClick={() => setSelected(tool)}
                  />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Count */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-mono text-[9px] tracking-[3px] uppercase text-text-dim
                     mt-6 text-right relative z-10"
        >
          {filtered.length} / {aiTools.length} tools · click any to expand
        </motion.p>

        {/* ── Experimenting Lab ── */}
        <div className="relative z-10">
          <ExperimentingLab />
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ToolModal tool={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
