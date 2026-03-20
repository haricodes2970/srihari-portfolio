"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/shared/Footer";
import { skills } from "@/lib/data";
import type { Skill, SkillCategory } from "@/types";
import ParticleMesh from "@/components/effects/ParticleMesh";

const TABS: { label: string; value: SkillCategory | "all" }[] = [
  { label: "All Styles",  value: "all"      },
  { label: "AI / ML",     value: "ai"       },
  { label: "Frontend",    value: "frontend" },
  { label: "Backend",     value: "backend"  },
  { label: "Tools & Ops", value: "tools"    },
];

// ── Skill Detail Modal ────────────────────────────────────
function SkillModal({ skill, onClose }: { skill: Skill; onClose: () => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const levelLabel =
    skill.level >= 90 ? "Master" :
    skill.level >= 80 ? "Advanced" :
    skill.level >= 70 ? "Proficient" : "Solid";

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
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0,  scale: 1    }}
        exit={{ opacity: 0, y: 14, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="bg-card border border-green-core/20 rounded-sm
                   w-full max-w-lg relative overflow-hidden p-7 sm:p-9"
        style={{ boxShadow: "0 0 60px rgba(0,255,106,0.08), 0 40px 80px rgba(0,0,0,0.6)" }}
      >
        {/* Top accent */}
        <div className="absolute top-0 left-0 right-0 h-px"
             style={{ background: "linear-gradient(90deg, transparent, var(--color-accent), transparent)",
                      boxShadow: "0 0 8px var(--color-accent)" }} />
        {/* Scan line */}
        <div className="scan-overlay" />

        {/* Close */}
        <button onClick={onClose}
          className="absolute top-4 right-4 font-mono text-[9px] tracking-[2px] uppercase
                     text-text-muted border border-green-core/10 px-3 py-1.5 rounded-sm z-10
                     transition-all duration-200 hover:text-green-core hover:border-green-core/30">
          ✕
        </button>

        {/* Style name */}
        <p className="font-mono text-[9px] tracking-[3px] uppercase text-green-core mb-1">
          {skill.styleName}
        </p>

        {/* Skill name + level */}
        <div className="flex items-end justify-between mb-2">
          <h2 className="font-display font-bold text-text-primary"
              style={{ fontSize: "clamp(20px, 3vw, 26px)" }}>
            {skill.name}
          </h2>
          <div className="text-right">
            <div className="font-mono text-green-core font-bold"
                 style={{ fontSize: "clamp(22px, 4vw, 32px)", textShadow: "0 0 20px rgba(0,255,106,0.4)" }}>
              {skill.level}%
            </div>
            <div className="font-mono text-[8px] tracking-[2px] uppercase text-text-muted">
              {levelLabel}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-[3px] bg-surface rounded-full overflow-hidden mb-6">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${skill.level}%` }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, var(--color-accent-dark), var(--color-accent))",
              boxShadow: "0 0 10px var(--color-accent-glow)",
            }}
          />
        </div>

        <div className="h-px mb-5"
             style={{ background: "linear-gradient(90deg, rgba(0,255,106,0.15), transparent)" }} />

        {/* Why this % */}
        <div className="mb-5">
          <p className="font-mono text-[9px] tracking-[3px] uppercase text-green-core mb-2">
            Why {skill.level}%
          </p>
          <p className="font-ui text-text-secondary leading-relaxed font-light"
             style={{ fontSize: "clamp(13px, 1.5vw, 14px)" }}>
            {skill.why}
          </p>
        </div>

        <div className="h-px mb-5"
             style={{ background: "linear-gradient(90deg, rgba(0,255,106,0.1), transparent)" }} />

        {/* Tools */}
        <div className="mb-5">
          <p className="font-mono text-[9px] tracking-[3px] uppercase text-green-core mb-3">
            Tools & Libraries
          </p>
          <div className="flex flex-wrap gap-2">
            {skill.tools.map((t, i) => (
              <motion.span key={t}
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.04 }}
                className="font-mono text-[9px] tracking-[1px] text-text-secondary
                           bg-surface border border-green-core/12 px-2.5 py-1 rounded-sm
                           hover:border-green-core/30 hover:text-green-core transition-colors duration-200">
                {t}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="h-px mb-5"
             style={{ background: "linear-gradient(90deg, rgba(0,255,106,0.1), transparent)" }} />

        {/* Used in */}
        <div>
          <p className="font-mono text-[9px] tracking-[3px] uppercase text-green-core mb-3">
            Applied In
          </p>
          <div className="flex flex-col gap-2">
            {skill.usedIn.map((proj, i) => (
              <motion.div key={proj}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.06 }}
                className="flex items-center gap-2 font-ui text-text-secondary font-light"
                style={{ fontSize: "clamp(12px, 1.4vw, 13px)" }}>
                <span className="w-1 h-1 rounded-full bg-green-core flex-shrink-0"
                      style={{ boxShadow: "0 0 4px var(--color-accent)" }} />
                {proj}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Skill Card ────────────────────────────────────────────
function SkillCard({ skill, delay, onClick }: {
  skill: Skill; delay: number; onClick: () => void;
}) {
  const barRef = useRef<HTMLDivElement>(null);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setFilled(true); obs.disconnect(); } },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className="group bg-surface border border-green-core/8 p-5 sm:p-6
                 relative overflow-hidden card-shine cursor-pointer
                 transition-all duration-300
                 hover:bg-card-h hover:border-green-core/25
                 hover:shadow-[0_0_28px_rgba(0,255,106,0.08)]"
    >
      {/* Left accent bar */}
      <div className="absolute top-0 left-0 w-[3px] bg-green-core transition-all duration-500"
           style={{ height: filled ? "100%" : "0%",
                    boxShadow: filled ? "0 0 8px var(--color-accent)" : "none" }} />

      {/* Click hint */}
      <div className="absolute top-3 right-3 font-mono text-[7px] tracking-[1.5px] uppercase
                      text-text-dim opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        tap to expand
      </div>

      {/* Style name */}
      <p className="font-mono text-[9px] tracking-[3px] uppercase text-green-core mb-1.5 pl-1">
        {skill.styleName}
      </p>

      {/* Skill name */}
      <h3 className="font-display font-bold text-text-primary mb-0.5 pl-1
                     group-hover:text-green-core transition-colors duration-300"
          style={{ fontSize: "clamp(15px, 2vw, 17px)" }}>
        {skill.name}
      </h3>

      {/* Bar */}
      <div ref={barRef} className="mt-4 h-[2px] bg-void rounded-full overflow-hidden">
        <div className="h-full rounded-full"
             style={{
               width: filled ? `${skill.level}%` : "0%",
               background: "linear-gradient(90deg, var(--color-accent-dark), var(--color-accent))",
               boxShadow: "0 0 10px var(--color-accent-glow)",
               transition: `width 1.4s cubic-bezier(0.16,1,0.3,1) ${delay * 0.25}s`,
             }} />
      </div>

      {/* Level */}
      <p className="font-mono text-[10px] text-text-muted mt-1.5 text-right
                    group-hover:text-green-core transition-colors duration-300">
        {skill.level}%
      </p>

      {/* Bottom hover line */}
      <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100
                      transition-opacity duration-500"
           style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,106,0.3), transparent)" }} />
    </motion.div>
  );
}

// ── Main ──────────────────────────────────────────────────
export default function Skills() {
  const [active,   setActive]   = useState<SkillCategory | "all">("all");
  const [selected, setSelected] = useState<Skill | null>(null);

  const filtered = active === "all" ? skills : skills.filter((s) => s.category === active);

  return (
    <>
      <section id="skills"
        className="min-h-screen bg-void border-t border-green-core/8
                   px-5 sm:px-8 md:px-16 pt-28 sm:pt-32 pb-16 sm:pb-20 relative overflow-hidden">
        {/* Particle mesh — cursor-reactive node network */}
        <ParticleMesh count={80} connectDist={160} nodeColor="0,255,106" lineColor="0,255,106" opacity={0.75} />
        <div className="scan-overlay" />

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 sm:mb-12 relative z-10">
          <div className="eyebrow mb-3">Training Arc</div>
          <h2 className="font-display font-bold text-text-primary leading-tight"
              style={{ fontSize: "clamp(28px, 5vw, 54px)" }}>
            Combat Abilities
          </h2>
          <p className="text-text-secondary font-ui font-light mt-3 max-w-md"
             style={{ fontSize: "clamp(13px, 1.6vw, 15px)" }}>
            Every skill is a weapon. Click any card to see the honest breakdown —
            what I know, what I've built, and why that number.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-8 sm:mb-10 relative z-10">
          {TABS.map((tab) => {
            const isActive = active === tab.value;
            return (
              <button key={tab.value} onClick={() => setActive(tab.value)}
                className={`relative font-mono text-[9px] tracking-[2px] uppercase
                  px-4 py-2 rounded-sm border overflow-hidden transition-all duration-250
                  ${isActive
                    ? "text-void bg-green-core border-green-core shadow-[0_0_20px_rgba(0,255,106,0.3)]"
                    : "text-text-muted border-green-core/8 hover:text-text-secondary hover:border-green-core/20 hover:bg-green-core/5"
                  }`}>
                {isActive && (
                  <motion.span layoutId="tab-bg" className="absolute inset-0 bg-green-core"
                    style={{ zIndex: -1 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }} />
                )}
                {tab.label}
              </button>
            );
          })}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2px] relative z-10">
            {filtered.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} delay={i * 0.04}
                onClick={() => setSelected(skill)} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Count */}
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
          className="font-mono text-[9px] tracking-[3px] uppercase text-text-dim
                     mt-8 text-right relative z-10">
          {filtered.length} / {skills.length} abilities · click any to expand
        </motion.p>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selected && <SkillModal skill={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>

      <Footer />
    </>
  );
}
