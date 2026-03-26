"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/shared/Footer";
import { skills } from "@/lib/data";
import type { Skill, SkillCategory } from "@/types";
import GreenCyberBg from "@/components/effects/GreenCyberBg";
import { useUIStore } from "@/store/uiStore";

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

        {/* Skill name */}
        <h2 className="font-display font-bold text-text-primary mb-5"
            style={{ fontSize: "clamp(20px, 3vw, 26px)" }}>
          {skill.name}
        </h2>

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
      </motion.div>
    </motion.div>
  );
}

// ── Skill Card ────────────────────────────────────────────
function SkillCard({ skill, delay, onClick }: {
  skill: Skill; delay: number; onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setFilled(true); obs.disconnect(); } },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
      <motion.div ref={cardRef}
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

      {/* Skill name */}
      <h3 className="font-display font-bold text-text-primary mb-3 pl-1
                     group-hover:text-green-core transition-colors duration-300"
          style={{ fontSize: "clamp(15px, 2vw, 17px)" }}>
        {skill.name}
      </h3>

      {/* Tech chips */}
      <div className="flex flex-wrap gap-2 pl-1">
        {skill.tools.map((tool) => (
          <span
            key={tool}
            className="font-mono text-[9px] tracking-[1px] text-text-secondary
                       bg-surface border border-green-core/12 px-2.5 py-1 rounded-sm
                       hover:border-green-core/30 hover:text-green-core transition-colors duration-200"
          >
            {tool}
          </span>
        ))}
      </div>

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
  const mode   = useUIStore((s) => s.mode);
  const isCalm = mode === "calm";

  const filtered = active === "all" ? skills : skills.filter((s) => s.category === active);

  return (
    <>
      <section id="skills"
        className="min-h-screen bg-void border-t border-green-core/8
                   px-5 sm:px-8 md:px-16 pt-28 sm:pt-32 pb-16 sm:pb-20 relative overflow-hidden">
        {/* Green cyber background — matrix rain + scan line + grid */}
        <GreenCyberBg isCalm={isCalm} />

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
            Every skill is a weapon. Click any card to see the tools and tech
            I use across projects.
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
