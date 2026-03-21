"use client";

// ============================================================
// AI TOOLKIT — complete redesign
// 17 task-based comparison cards + experimenting lab + modals
// ============================================================

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@/components/shared/Footer";
import ParticleMesh from "@/components/effects/ParticleMesh";
import { useUIStore } from "@/store/uiStore";
import {
  toolkitTasks,
  experimentingTools,
  CATEGORY_META,
  type ToolkitTask,
  type TaskTool,
  type BonusTool,
  type ToolCategory,
} from "@/lib/aiToolkitData";

gsap.registerPlugin(ScrollTrigger);

// ── Logo with Clearbit → favicon → letter fallback ────────
function ToolLogo({
  domain, name, catColor, size = 32,
}: { domain: string; name: string; catColor?: string; size?: number }) {
  const [src,    setSrc]    = useState(`https://logo.clearbit.com/${domain}`);
  const [failed, setFailed] = useState(false);
  const tries = useRef(0);

  const onError = useCallback(() => {
    tries.current++;
    if (tries.current === 1) {
      setSrc(`https://www.google.com/s2/favicons?domain=${domain}&sz=64`);
    } else {
      setFailed(true);
    }
  }, [domain]);

  if (failed) {
    return (
      <span
        className="flex items-center justify-center rounded-lg font-bold text-white flex-shrink-0"
        style={{
          width: size, height: size, fontSize: size * 0.4,
          background: catColor ?? "#00ff6a",
        }}
      >
        {name.charAt(0).toUpperCase()}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={name}
      width={size}
      height={size}
      onError={onError}
      className="rounded-lg flex-shrink-0 object-contain"
      style={{ width: size, height: size }}
    />
  );
}

// ── Preferred badge ────────────────────────────────────────
function BadgeChip({ flag, catColor }: { flag: TaskTool["preferred"]; catColor: string }) {
  const MAP: Record<string, string> = {
    "true":      "👑 MY PICK",
    "combo":     "🤝 COMBO",
    "exploring": "🔬 EXPLORING",
    "partial":   "⚖️ DEPENDS",
  };
  const label = MAP[String(flag)];
  if (!label) return null;
  return (
    <span
      className="inline-block font-mono text-[9px] tracking-[1.5px] uppercase px-1.5 py-0.5 rounded-sm"
      style={{ color: catColor, background: catColor + "18" }}
    >
      {label}
    </span>
  );
}

// ── Typewriter banner ──────────────────────────────────────
const TYPEWRITER_TEXT =
  "I'm always experimenting with new AI tools. Check back every Sunday — this page updates weekly.";

function TypewriterBanner({ isCalm }: { isCalm: boolean }) {
  const [shown, setShown] = useState(0);
  const [done,  setDone]  = useState(false);
  const accent = isCalm ? "#86EFAC" : "#00FF41";

  useEffect(() => {
    if (shown >= TYPEWRITER_TEXT.length) { setDone(true); return; }
    const t = setTimeout(() => setShown((n) => n + 1), 22);
    return () => clearTimeout(t);
  }, [shown]);

  return (
    <div
      className="rounded-sm border px-5 py-4 mb-12 max-w-2xl"
      style={{
        background:  "rgba(0,0,0,0.45)",
        borderColor: accent + "25",
        backdropFilter: "blur(8px)",
      }}
    >
      <p
        className="font-mono text-[11px] sm:text-[12px] leading-relaxed"
        style={{ color: accent }}
      >
        <span className="opacity-50">&gt; </span>
        {TYPEWRITER_TEXT.slice(0, shown)}
        {!done && (
          <span
            className="inline-block w-[6px] h-[13px] align-middle ml-px"
            style={{ background: accent, animation: "wipPulse 0.7s step-start infinite" }}
          />
        )}
        {done && (
          <span
            className="inline-block w-[6px] h-[13px] align-middle ml-px"
            style={{ background: accent, animation: "wipPulse 1s step-start infinite" }}
          />
        )}
      </p>
    </div>
  );
}

// ── ThirdEye Live Dashboard Card ──────────────────────────
const THIRDEYE_URL = "https://thirdeye-five.vercel.app";

const TERMINAL_LINES = [
  "$ tracking ai_sessions ... OK",
  "$ syncing vscode_activity ... OK",
  "$ computing daily_usage ... OK",
  "$ dashboard ready ✓",
];

function ThirdEyeWidget({ isCalm }: { isCalm: boolean }) {
  const accent   = isCalm ? "#86EFAC" : "#00FF41";
  const cardRef  = useRef<HTMLDivElement>(null);
  const [lines,  setLines]  = useState<string[]>([]);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done,   setDone]   = useState(false);

  // Type out terminal lines sequentially
  useEffect(() => {
    if (lineIdx >= TERMINAL_LINES.length) { setDone(true); return; }
    const line = TERMINAL_LINES[lineIdx];
    if (charIdx < line.length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), 18);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setLines((prev) => [...prev, line]);
      setLineIdx((l) => l + 1);
      setCharIdx(0);
    }, 280);
    return () => clearTimeout(t);
  }, [lineIdx, charIdx]);

  // GSAP entrance
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    gsap.fromTo(el,
      { opacity: 0, y: 24, scale: 0.97 },
      { opacity: 1, y: 0,  scale: 1, duration: 0.7, ease: "expo.out", delay: 0.1 }
    );
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className="mb-14 sm:mb-20 relative"
    >
      <div
        className="relative overflow-hidden rounded-xl"
        style={{
          background:  "linear-gradient(135deg, rgba(0,255,65,0.04) 0%, rgba(0,180,255,0.04) 100%)",
          border:      `1px solid ${accent}25`,
          boxShadow:   `0 0 60px ${accent}08, inset 0 0 40px rgba(0,0,0,0.3)`,
        }}
      >
        {/* Top accent line */}
        <div
          className="h-[2px] w-full"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}, rgba(0,180,255,0.8), transparent)` }}
        />

        <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-6 items-center">
          {/* Left — terminal output */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              {/* Live dot */}
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: accent, boxShadow: `0 0 8px ${accent}`, animation: "wipPulse 1.5s ease-in-out infinite" }}
              />
              <span className="font-mono text-[10px] tracking-[3px] uppercase" style={{ color: accent }}>
                Live Tracking
              </span>
              <span className="font-mono text-[9px] text-text-dim">— ThirdEye Dashboard</span>
            </div>

            <h3
              className="font-display font-bold text-text-primary mb-1 leading-tight"
              style={{ fontSize: "clamp(16px, 2.5vw, 22px)" }}
            >
              My AI Usage, Live
            </h3>
            <p className="font-ui text-text-secondary font-light text-sm mb-5 max-w-sm">
              Every Claude session, VS Code hour, and AI tool interaction I make — tracked and visualised in real time.
            </p>

            {/* Terminal lines */}
            <div
              className="font-mono text-[10px] sm:text-[11px] leading-6 rounded-lg px-4 py-3"
              style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.05)" }}
            >
              {lines.map((line, i) => (
                <div key={i} style={{ color: line.includes("✓") ? accent : "#6B7280" }}>{line}</div>
              ))}
              {!done && lineIdx < TERMINAL_LINES.length && (
                <div style={{ color: "#9CA3AF" }}>
                  {TERMINAL_LINES[lineIdx].slice(0, charIdx)}
                  <span
                    className="inline-block w-[5px] h-[12px] align-middle ml-px"
                    style={{ background: accent, animation: "wipPulse 0.6s step-start infinite" }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right — CTA */}
          <div className="flex flex-col items-center sm:items-end gap-3">
            {/* Eye icon */}
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl mb-1"
              style={{
                background:  `radial-gradient(circle, ${accent}18 0%, transparent 70%)`,
                border:      `1px solid ${accent}30`,
                boxShadow:   `0 0 30px ${accent}12`,
              }}
            >
              👁️
            </div>
            <p className="font-mono text-[9px] tracking-[2px] uppercase text-text-dim text-center">
              Open Dashboard
            </p>
            <a
              href={THIRDEYE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 font-mono text-[10px] tracking-[2px] uppercase
                         font-semibold px-6 py-3 rounded-lg transition-all duration-250
                         hover:scale-105 active:scale-95"
              style={{
                background:  accent,
                color:       "#000",
                boxShadow:   `0 0 24px ${accent}40`,
              }}
            >
              View My Stats
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </a>
            <p className="font-mono text-[8px] tracking-[1px] text-text-dim text-center">
              thirdeye-five.vercel.app
            </p>
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          className="h-px w-full"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}20, transparent)` }}
        />
      </div>
    </motion.div>
  );
}

// ── Experimenting Lab ──────────────────────────────────────
function ExperimentingLab({ isCalm }: { isCalm: boolean }) {
  const accent = isCalm ? "#86EFAC" : "#00FF41";
  return (
    <section className="mb-20 sm:mb-28">
      <div className="mb-8">
        <p className="font-mono text-[11px] tracking-[3px] uppercase text-text-dim mb-2">
          Side Lab
        </p>
        <h2
          className="font-display font-bold text-text-primary"
          style={{ fontSize: "clamp(22px, 4vw, 36px)" }}
        >
          Experimenting With
        </h2>
        <p className="text-text-secondary font-ui font-light text-sm mt-2 max-w-lg">
          Tools I'm actively testing and pushing to their limits.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {experimentingTools.map((tool, i) => (
          <motion.a
            key={tool.name}
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            className="block rounded-sm p-4 border border-dashed group
                       transition-all duration-300
                       hover:bg-surface hover:border-solid"
            style={{
              borderColor: accent + "30",
              background: "rgba(0,0,0,0.2)",
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <ToolLogo domain={tool.logoDomain} name={tool.name} catColor={accent} size={28} />
              <div>
                <p className="font-ui font-semibold text-text-primary text-sm leading-tight">
                  {tool.name}
                </p>
                <p className="font-mono text-[9px] tracking-[1.5px] uppercase text-text-dim">
                  {tool.category}
                </p>
              </div>
            </div>
            <p className="font-ui text-text-secondary font-light text-xs leading-relaxed">
              {tool.note}
            </p>
            <div className="flex items-center gap-2 mt-3">
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: accent, boxShadow: `0 0 6px ${accent}`, animation: "wipPulse 2s ease-in-out infinite" }}
              />
              <span className="font-mono text-[8px] tracking-[2px] uppercase" style={{ color: accent }}>
                Testing
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

// ── Category filter tabs ───────────────────────────────────
const CATS: Array<{ label: string; value: ToolCategory | "all" }> = [
  { label: "All",          value: "all"         },
  { label: "Coding",       value: "coding"      },
  { label: "AI / ML",      value: "aiml"        },
  { label: "Research",     value: "research"    },
  { label: "Content",      value: "content"     },
  { label: "Design",       value: "design"      },
  { label: "Productivity", value: "productivity"},
];

function getCatCount(cat: ToolCategory | "all") {
  if (cat === "all") return toolkitTasks.length;
  return toolkitTasks.filter((t) => t.category === cat).length;
}

function FilterTabs({
  active, onChange, isCalm,
}: { active: ToolCategory | "all"; onChange: (v: ToolCategory | "all") => void; isCalm: boolean }) {
  return (
    <div className="flex flex-wrap gap-2 mb-10">
      {CATS.map((cat) => {
        const isActive  = active === cat.value;
        const catColor  = cat.value !== "all" ? (isCalm ? CATEGORY_META[cat.value as ToolCategory].calmColor : CATEGORY_META[cat.value as ToolCategory].darkColor) : (isCalm ? "#86EFAC" : "#00FF41");
        return (
          <button
            key={cat.value}
            onClick={() => onChange(cat.value)}
            className="font-mono text-[9px] tracking-[2px] uppercase px-3.5 py-2 rounded-sm
                       border transition-all duration-200"
            style={isActive
              ? { background: catColor, color: "#000", borderColor: catColor, boxShadow: `0 0 18px ${catColor}40` }
              : { background: "transparent", color: isCalm ? "#555" : "#666", borderColor: "rgba(255,255,255,0.06)" }
            }
          >
            {cat.label}
            <span className="ml-1.5 opacity-60">{getCatCount(cat.value)}</span>
          </button>
        );
      })}
    </div>
  );
}

// ── Mini tool card (inside task card) ─────────────────────
function MiniToolCard({
  tool, catColor, isPreferred,
}: { tool: TaskTool; catColor: string; isPreferred: boolean }) {
  return (
    <div
      className="flex-1 rounded-lg p-3 flex flex-col gap-2 min-w-0"
      style={{
        background:  isPreferred ? catColor + "0C" : "rgba(255,255,255,0.03)",
        borderLeft:  isPreferred ? `2px solid ${catColor}` : "2px solid transparent",
      }}
    >
      <ToolLogo domain={tool.logoDomain} name={tool.name} catColor={catColor} size={28} />
      <div className="min-w-0">
        <p className="font-ui font-semibold text-text-primary text-[13px] leading-tight truncate">
          {tool.name}
        </p>
        <BadgeChip flag={tool.preferred} catColor={catColor} />
      </div>
    </div>
  );
}

// ── Task Card ──────────────────────────────────────────────
function TaskCard({
  task, isCalm, onClick,
}: { task: ToolkitTask; isCalm: boolean; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const meta    = CATEGORY_META[task.category];
  const color   = isCalm ? meta.calmColor : meta.darkColor;

  // GSAP hover
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const onIn  = () => gsap.to(el, { scale: 1.02, y: -4, duration: 0.25, ease: "power2.out",
      boxShadow: `0 12px 40px ${meta.glow}` });
    const onOut = () => gsap.to(el, { scale: 1, y: 0, duration: 0.3, ease: "power2.out",
      boxShadow: "0 0 0 rgba(0,0,0,0)" });
    el.addEventListener("mouseenter", onIn);
    el.addEventListener("mouseleave", onOut);
    return () => { el.removeEventListener("mouseenter", onIn); el.removeEventListener("mouseleave", onOut); };
  }, [meta.glow]);

  const bonusCount = task.bonus.length;
  const t1Pref  = task.tool1.preferred === true;
  const t2Pref  = task.tool2.preferred === true;

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className="rounded-xl cursor-pointer relative overflow-hidden"
      style={{
        background:  "#0D1117",
        border:      "1px solid rgba(255,255,255,0.06)",
        willChange:  "transform, box-shadow",
      }}
    >
      {/* Hover accent glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />

      <div className="p-5">
        {/* Category badge */}
        <span
          className="inline-block font-mono text-[10px] tracking-[1.5px] uppercase font-semibold
                     px-2.5 py-1 rounded-full mb-3"
          style={{ color, background: color + "18" }}
        >
          {meta.label}
        </span>

        {/* Task name */}
        <h3
          className="font-ui font-semibold text-white leading-tight mb-1"
          style={{ fontSize: "clamp(15px, 2vw, 18px)" }}
        >
          {task.task}
        </h3>

        {/* Subtitle */}
        <p className="text-[#9CA3AF] font-ui text-[13px] mb-4 leading-relaxed">
          {task.subtitle}
        </p>

        {/* Tool comparison box */}
        <div className="flex gap-2 mb-4">
          <MiniToolCard tool={task.tool1} catColor={color} isPreferred={t1Pref} />
          <MiniToolCard tool={task.tool2} catColor={color} isPreferred={t2Pref} />
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-[1px] text-[#4B5563]">
            {bonusCount > 0 ? `+ ${bonusCount} bonus tool${bonusCount > 1 ? "s" : ""}` : ""}
          </span>
          <span
            className="font-mono text-[10px] tracking-[2px] uppercase font-semibold"
            style={{ color }}
          >
            EXPLORE →
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Modal tool block ───────────────────────────────────────
function ModalToolBlock({
  tool, catColor, primary,
}: { tool: TaskTool; catColor: string; primary: boolean }) {
  return (
    <div
      className="rounded-xl p-5 sm:p-6"
      style={{
        background:  primary ? catColor + "0A" : "rgba(255,255,255,0.025)",
        borderLeft:  primary ? `3px solid ${catColor}` : "3px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Label */}
      <p
        className="font-mono text-[9px] tracking-[3px] uppercase mb-4 font-semibold"
        style={{ color: primary ? catColor : "#6B7280" }}
      >
        {primary ? "👑 MY PRIMARY PICK" : "ALSO IN MY WORKFLOW"}
      </p>

      {/* Logo + name */}
      <div className="flex items-center gap-3 mb-4">
        <ToolLogo domain={tool.logoDomain} name={tool.name} catColor={catColor} size={48} />
        <div>
          <p className="font-ui font-bold text-white text-base leading-tight">{tool.name}</p>
          <p className="font-ui text-[#6B7280] text-xs">{tool.by}</p>
        </div>
      </div>

      {/* Why good */}
      <div className="mb-4">
        <p className="font-mono text-[9px] tracking-[2px] uppercase text-[#6B7280] mb-2">
          WHY IT'S GOOD FOR THIS
        </p>
        <p className="font-ui text-[#D1D5DB] text-sm leading-relaxed">
          {tool.whyGood}
        </p>
      </div>

      {/* Key strengths */}
      <div className="mb-4">
        <p className="font-mono text-[9px] tracking-[2px] uppercase text-[#6B7280] mb-2">
          WHY I CHOSE IT
        </p>
        <ul className="space-y-1.5">
          {tool.keyStrengths.map((s) => (
            <li key={s} className="flex items-start gap-2 font-ui text-[#D1D5DB] text-sm">
              <span style={{ color: catColor }} className="mt-0.5 flex-shrink-0">›</span>
              {s}
            </li>
          ))}
        </ul>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {tool.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[9px] tracking-[1px] px-2 py-0.5 rounded-sm"
            style={{ background: catColor + "12", color: catColor + "CC" }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* CTA */}
      <a
        href={tool.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="block w-full text-center font-mono text-[10px] tracking-[2px] uppercase
                   py-3 rounded-lg border transition-all duration-200
                   hover:opacity-80"
        style={{
          borderColor: catColor + "50",
          color:       catColor,
          background:  catColor + "0A",
        }}
      >
        OPEN {tool.name.toUpperCase()} →
      </a>
    </div>
  );
}

// ── Task Modal ─────────────────────────────────────────────
function TaskModal({ task, isCalm, onClose }: { task: ToolkitTask; isCalm: boolean; onClose: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const meta    = CATEGORY_META[task.category];
  const color   = isCalm ? meta.calmColor : meta.darkColor;

  useEffect(() => {
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  useEffect(() => {
    if (!cardRef.current) return;
    const isMobile = window.innerWidth < 640;
    if (isMobile) {
      gsap.fromTo(cardRef.current, { y: "100%" }, { y: 0, duration: 0.4, ease: "expo.out" });
    } else {
      gsap.fromTo(cardRef.current,
        { scale: 0.95, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[5000] flex items-end sm:items-center justify-center
                 p-0 sm:p-4 bg-black/80"
      style={{ backdropFilter: "blur(10px)" }}
      onClick={onClose}
    >
      <div
        ref={cardRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-[700px] max-h-[92vh] sm:max-h-[88vh]
                   rounded-t-2xl sm:rounded-2xl overflow-y-auto relative"
        style={{
          background:  "#0D1117",
          border:      `1px solid ${color}25`,
          boxShadow:   `0 0 80px ${meta.glow}, 0 40px 80px rgba(0,0,0,0.7)`,
        }}
      >
        {/* Top accent line */}
        <div className="sticky top-0 h-[3px] w-full" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />

        <div className="p-6 sm:p-8">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 font-mono text-[9px] tracking-[2px] uppercase
                       text-[#6B7280] border border-white/8 px-3 py-1.5 rounded-sm z-10
                       hover:text-white hover:border-white/20 transition-all duration-200"
          >
            ✕ Close
          </button>

          {/* Category + task */}
          <span
            className="inline-block font-mono text-[10px] tracking-[2px] uppercase font-semibold
                       px-2.5 py-1 rounded-full mb-3"
            style={{ color, background: color + "18" }}
          >
            {meta.label}
          </span>

          <div
            className="w-24 h-px mb-4"
            style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
          />

          <h2
            className="font-ui font-bold text-white leading-tight mb-1"
            style={{ fontSize: "clamp(20px, 3.5vw, 28px)" }}
          >
            {task.task}
          </h2>
          <p className="text-[#9CA3AF] font-ui text-sm mb-6">{task.subtitle}</p>

          {/* Superpower */}
          <div
            className="flex items-start gap-3 mb-8 px-4 py-3 rounded-lg"
            style={{ borderLeft: `3px solid ${color}`, background: "rgba(255,255,255,0.03)" }}
          >
            <span className="text-base">⚡</span>
            <div>
              <p className="font-mono text-[9px] tracking-[2px] uppercase mb-0.5" style={{ color }}>
                SUPERPOWER
              </p>
              <p className="font-ui text-white font-medium text-sm italic">
                {task.superpower}
              </p>
            </div>
          </div>

          {/* Tool blocks */}
          <div className="space-y-4 mb-6">
            <ModalToolBlock tool={task.tool1} catColor={color} primary={task.tool1.preferred === true || task.tool1.preferred === "combo"} />
            <ModalToolBlock tool={task.tool2} catColor={color} primary={task.tool2.preferred === true} />
          </div>

          {/* Bonus tools */}
          {task.bonus.length > 0 && (
            <div
              className="rounded-xl p-5 mb-4"
              style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <p className="font-mono text-[9px] tracking-[3px] uppercase text-[#6B7280] mb-3">
                🔧 BONUS TOOLS I ALSO USE
              </p>
              <div className="flex flex-wrap gap-3">
                {task.bonus.map((b: BonusTool) => (
                  <a
                    key={b.name}
                    href={b.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/8
                               hover:border-white/20 transition-all duration-200"
                  >
                    <ToolLogo domain={b.logoDomain} name={b.name} catColor={color} size={18} />
                    <span className="font-ui text-[#D1D5DB] text-xs">{b.name}</span>
                    <span className="font-mono text-[9px] text-[#6B7280]">↗</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Special note */}
          {task.specialNote && (
            <div
              className="rounded-xl p-5"
              style={{ background: color + "08", border: `1px solid ${color}20` }}
            >
              <p className="font-mono text-[9px] tracking-[3px] uppercase mb-2" style={{ color }}>
                📝 NOTE
              </p>
              <p className="font-ui text-[#D1D5DB] text-sm leading-relaxed">
                {task.specialNote}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── Main section ───────────────────────────────────────────
export default function AIToolkit() {
  const [filter,   setFilter]   = useState<ToolCategory | "all">("all");
  const [selected, setSelected] = useState<ToolkitTask | null>(null);
  const mode   = useUIStore((s) => s.mode);
  const isCalm = mode === "calm";
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = filter === "all"
    ? toolkitTasks
    : toolkitTasks.filter((t) => t.category === filter);

  // Stagger cards on filter change
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const cards = el.querySelectorAll(".tk-card");
    gsap.fromTo(cards,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.04, ease: "expo.out" }
    );
  }, [filter]);

  return (
    <>
      <section
        id="ai-toolkit"
        className="min-h-screen bg-void border-t border-green-core/8
                   px-5 sm:px-8 md:px-16 pt-28 sm:pt-32 pb-16 sm:pb-24
                   relative overflow-hidden"
      >
        {/* Background — ambient mesh */}
        <ParticleMesh
          count={60}
          connectDist={150}
          nodeColor={isCalm ? "100,160,200" : "0,180,255"}
          lineColor={isCalm ? "100,160,200" : "0,160,230"}
          opacity={isCalm ? 0.4 : 0.55}
          noCursor
        />
        <div className="scan-overlay" />

        <div className="relative z-10">

          {/* ── PAGE HEADER ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <div className="eyebrow mb-3">Arsenal</div>
            <h1
              className="font-display font-bold text-text-primary leading-tight"
              style={{ fontSize: "clamp(32px, 6vw, 52px)" }}
            >
              AI Toolkit
            </h1>
            <p
              className="text-text-secondary font-ui font-light mt-3 max-w-lg"
              style={{ fontSize: "clamp(14px, 1.8vw, 17px)" }}
            >
              The tools behind every project I ship — organized by task, not hype.
            </p>
          </motion.div>

          {/* ── WEEKLY UPDATE BANNER ── */}
          <TypewriterBanner isCalm={isCalm} />

          {/* ── THIRDEYE LIVE DASHBOARD ── */}
          <ThirdEyeWidget isCalm={isCalm} />

          {/* ── EXPERIMENTING LAB ── */}
          <ExperimentingLab isCalm={isCalm} />

          {/* ── TOOLKIT SECTION HEADER ── */}
          <div className="mb-8">
            <p className="font-mono text-[11px] tracking-[3px] uppercase text-text-dim mb-2">
              My Toolkit
            </p>
            <h2
              className="font-display font-bold text-text-primary"
              style={{ fontSize: "clamp(22px, 4vw, 36px)" }}
            >
              17 Tasks · Click Any to Explore
            </h2>
          </div>

          {/* ── FILTER TABS ── */}
          <FilterTabs active={filter} onChange={setFilter} isCalm={isCalm} />

          {/* ── TASK CARD GRID ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <div
                ref={gridRef}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {filtered.map((task) => (
                  <div key={task.id} className="tk-card">
                    <TaskCard
                      task={task}
                      isCalm={isCalm}
                      onClick={() => setSelected(task)}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Count */}
          <p className="font-mono text-[9px] tracking-[3px] uppercase text-text-dim mt-6 text-right">
            {filtered.length} / {toolkitTasks.length} tasks shown
          </p>
        </div>
      </section>

      {/* ── MODAL ── */}
      <AnimatePresence>
        {selected && (
          <TaskModal
            task={selected}
            isCalm={isCalm}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
