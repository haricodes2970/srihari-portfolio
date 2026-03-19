"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Footer from "@/components/shared/Footer";
import { skills } from "@/lib/data";
import type { SkillCategory } from "@/types";

// ── Filter tabs ───────────────────────────────────────────
const TABS: { label: string; value: SkillCategory | "all" }[] = [
  { label: "All Styles",  value: "all"      },
  { label: "AI / ML",     value: "ai"       },
  { label: "Frontend",    value: "frontend" },
  { label: "Backend",     value: "backend"  },
  { label: "Tools & Ops", value: "tools"    },
];

// ── Single skill card ─────────────────────────────────────
function SkillCard({
  styleName,
  name,
  level,
  delay,
}: {
  styleName: string;
  name: string;
  level: number;
  delay: number;
}) {
  const barRef = useRef<HTMLDivElement>(null);
  const [filled, setFilled] = useState(false);

  // Fill bar when card enters viewport
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
      className="group bg-surface border border-green-core/8 p-5 sm:p-6
                 relative overflow-hidden
                 transition-colors duration-250
                 hover:bg-card-h hover:border-green-core/20"
    >
      {/* Left accent bar */}
      <div
        className="absolute top-0 left-0 w-[3px] bg-green-core
                   transition-all duration-350 ease-out"
        style={{ height: filled ? "100%" : "0%" }}
      />

      {/* Style name */}
      <p className="font-mono text-[9px] tracking-[3px] uppercase text-green-core mb-1.5 pl-1">
        {styleName}
      </p>

      {/* Skill name */}
      <h3 className="font-display font-bold text-text-primary mb-0.5 pl-1"
          style={{ fontSize: "clamp(15px, 2vw, 17px)" }}>
        {name}
      </h3>

      {/* Bar track */}
      <div ref={barRef} className="mt-4 h-[1.5px] bg-void rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: filled ? `${level}%` : "0%",
            background: "linear-gradient(90deg, #007a30, #00ff6a)",
            boxShadow: "0 0 8px rgba(0,255,106,0.4)",
            transition: `width 1.3s cubic-bezier(0.16,1,0.3,1) ${delay * 0.3}s`,
          }}
        />
      </div>

      {/* Level */}
      <p className="font-mono text-[10px] text-text-dim mt-1.5 text-right">{level}%</p>
    </motion.div>
  );
}

// ── Main section ──────────────────────────────────────────
export default function Skills() {
  const [active, setActive] = useState<SkillCategory | "all">("all");

  const filtered = active === "all"
    ? skills
    : skills.filter((s) => s.category === active);

  return (
    <>
      <section
        id="skills"
        className="min-h-screen bg-void border-t border-green-core/8
                   px-5 sm:px-8 md:px-16 pt-28 sm:pt-32 pb-16 sm:pb-20"
      >
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 sm:mb-12"
        >
          <div className="eyebrow mb-3">Training Arc</div>
          <h2
            className="font-display font-bold text-text-primary leading-tight"
            style={{ fontSize: "clamp(28px, 5vw, 54px)" }}
          >
            Combat Abilities
          </h2>
          <p className="text-text-secondary font-ui font-light mt-3 max-w-md"
             style={{ fontSize: "clamp(13px, 1.6vw, 15px)" }}>
            Every skill is a weapon. Every tool is a technique mastered through
            building real systems.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap gap-2 mb-8 sm:mb-10"
        >
          {TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActive(tab.value)}
              className={`
                font-mono text-[9px] tracking-[2px] uppercase
                px-4 py-2 rounded-sm border
                transition-all duration-200
                ${active === tab.value
                  ? "text-green-core border-green-core/30 bg-green-core/8"
                  : "text-text-muted border-green-core/8 hover:text-text-secondary hover:border-green-core/15"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[2px]">
          {filtered.map((skill, i) => (
            <SkillCard
              key={skill.name}
              styleName={skill.styleName}
              name={skill.name}
              level={skill.level}
              delay={i * 0.04}
            />
          ))}
        </div>

        {/* Count */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-mono text-[9px] tracking-[3px] uppercase text-text-dim mt-8 text-right"
        >
          {filtered.length} / {skills.length} abilities
        </motion.p>
      </section>
      <Footer />
    </>
  );
}
