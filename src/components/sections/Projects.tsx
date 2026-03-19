"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/shared/Footer";
import { projects } from "@/lib/data";
import { RANK_COLORS } from "@/lib/constants";
import type { Project, Rank } from "@/types";

// ── Rank badge ────────────────────────────────────────────
function RankBadge({ rank }: { rank: Rank }) {
  const c = RANK_COLORS[rank];
  return (
    <span className={`font-mono text-[9px] tracking-[2px] uppercase
                      px-2.5 py-1 rounded-sm border ${c.bg} ${c.text} ${c.border}`}>
      {rank} Rank
    </span>
  );
}

// ── WIP badge ─────────────────────────────────────────────
function WipBadge() {
  return (
    <span className="font-mono text-[8px] tracking-[2px] uppercase px-2.5 py-1
                     rounded-sm border bg-yellow-500/8 text-yellow-400 border-yellow-500/20"
          style={{ animation: "wipPulse 2s ease infinite" }}>
      In Progress
    </span>
  );
}

// ── Project card ──────────────────────────────────────────
function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (p: Project) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onOpen(project)}
      className="group bg-card border border-green-core/8 p-6 sm:p-7
                 flex flex-col relative overflow-hidden
                 transition-colors duration-250 cursor-pointer
                 hover:bg-card-h"
    >
      {/* Top green line sweep on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-px
                   bg-gradient-to-r from-transparent via-green-core to-transparent
                   scale-x-0 group-hover:scale-x-100
                   transition-transform duration-400 ease-out"
      />

      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <span className="font-mono text-[10px] tracking-[3px] text-text-dim">
          // {project.num}
        </span>
        <div className="flex items-center gap-2 flex-wrap justify-end">
          <RankBadge rank={project.rank} />
          {project.wip && <WipBadge />}
        </div>
      </div>

      {/* Title */}
      <h3
        className="font-display font-bold text-text-primary leading-snug mb-3"
        style={{ fontSize: "clamp(16px, 2.2vw, 20px)" }}
      >
        {project.title}
      </h3>

      {/* Overview */}
      <p className="font-ui font-light text-text-secondary leading-relaxed flex-1 mb-5"
         style={{ fontSize: "clamp(13px, 1.5vw, 14px)" }}>
        {project.overview}
      </p>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tech.slice(0, 6).map((t) => (
          <span key={t}
                className="font-mono text-[9px] tracking-[1px] text-text-dim
                           bg-surface border border-green-core/8 px-2.5 py-1 rounded-sm">
            {t}
          </span>
        ))}
        {project.tech.length > 6 && (
          <span className="font-mono text-[9px] tracking-[1px] text-text-dim
                           bg-surface border border-green-core/8 px-2.5 py-1 rounded-sm">
            +{project.tech.length - 6} more
          </span>
        )}
      </div>

      {/* Links row */}
      <div className="flex flex-wrap gap-4 items-center">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="font-mono text-[9px] tracking-[2px] uppercase text-green-core
                       flex items-center gap-1.5 transition-all duration-200
                       hover:gap-2.5"
          >
            {project.githubLabel ? `⌥ ${project.githubLabel}` : "⌥ GitHub →"}
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="font-mono text-[9px] tracking-[2px] uppercase text-green-core
                       flex items-center gap-1.5 transition-all duration-200
                       hover:gap-2.5"
          >
            ⬡ Live →
          </a>
        )}
        {!project.github && !project.live && project.wip && (
          <span className="font-mono text-[9px] tracking-[2px] uppercase text-text-dim">
            ⚒ Coming Soon
          </span>
        )}
        {/* Deep dive hint */}
        <span className="font-mono text-[9px] tracking-[2px] uppercase text-text-dim
                         ml-auto opacity-0 group-hover:opacity-100
                         transition-opacity duration-200">
          Deep Dive →
        </span>
      </div>
    </motion.div>
  );
}

// ── Project modal ─────────────────────────────────────────
function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  // Close on Escape
  if (typeof window !== "undefined") {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler, { once: true });
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[5000] flex items-center justify-center p-4 sm:p-6
                 bg-void/92 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="bg-card border border-green-core/20 rounded-sm
                   w-full max-w-2xl max-h-[88vh] overflow-y-auto
                   p-6 sm:p-10 relative"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 font-mono text-[9px] tracking-[2px]
                     uppercase text-text-muted border border-green-core/8
                     px-3 py-1.5 rounded-sm
                     transition-all duration-200
                     hover:text-green-core hover:border-green-core/20"
        >
          ✕ Close
        </button>

        {/* Rank + title */}
        <div className="mb-2">
          <RankBadge rank={project.rank} />
          {project.wip && <span className="ml-2"><WipBadge /></span>}
        </div>
        <h2
          className="font-display font-bold text-text-primary leading-snug mt-3 mb-6 pr-16"
          style={{ fontSize: "clamp(18px, 3vw, 26px)" }}
        >
          {project.title}
        </h2>

        {/* Overview */}
        <div className="mb-4">
          <p className="font-mono text-[9px] tracking-[3px] uppercase text-green-core mb-2">
            Mission Overview
          </p>
          <p className="font-ui text-text-secondary leading-relaxed font-light"
             style={{ fontSize: "clamp(13px, 1.5vw, 14px)" }}>
            {project.overview}
          </p>
        </div>

        <div className="h-px bg-green-core/8 my-5" />

        {/* Deep dive */}
        <div className="mb-5">
          <p className="font-mono text-[9px] tracking-[3px] uppercase text-green-core mb-3">
            Deep Dive
          </p>
          <div
            className="font-ui text-text-secondary leading-relaxed font-light space-y-3"
            style={{ fontSize: "clamp(13px, 1.5vw, 14px)" }}
            dangerouslySetInnerHTML={{
              __html: project.detail
                .replace(/\*\*(.*?)\*\*/g, '<strong class="text-text-primary font-medium">$1</strong>')
                .replace(/\n\n/g, '</p><p class="mt-3">')
                .replace(/^/, '<p>')
                .replace(/$/, '</p>'),
            }}
          />
        </div>

        <div className="h-px bg-green-core/8 my-5" />

        {/* Full tech stack */}
        <div className="mb-6">
          <p className="font-mono text-[9px] tracking-[3px] uppercase text-green-core mb-3">
            Full Tech Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t}
                    className="font-mono text-[9px] tracking-[1px] text-text-dim
                               bg-surface border border-green-core/8 px-2.5 py-1 rounded-sm">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Action links */}
        {(project.github || project.live || project.note) && (
          <div className="flex flex-wrap gap-3 mt-6">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] tracking-[3px] uppercase
                           text-void bg-green-core px-6 py-3 rounded-sm
                           transition-shadow duration-300
                           hover:shadow-[0_0_20px_rgba(0,255,106,0.3)]"
              >
                {project.githubLabel ? `⌥ ${project.githubLabel}` : "⌥ GitHub"}
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] tracking-[3px] uppercase
                           text-green-core border border-green-core/20 px-6 py-3 rounded-sm
                           transition-all duration-300
                           hover:border-green-core/40 hover:bg-green-core/5"
              >
                ⬡ Live Demo
              </a>
            )}
            {project.note && (
              <p className="font-mono text-[9px] tracking-[1px] text-text-dim
                            self-center w-full mt-1">
                {project.note}
              </p>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// ── Main section ──────────────────────────────────────────
export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <>
      <section
        id="projects"
        className="min-h-screen bg-deep border-t border-green-core/8
                   px-5 sm:px-8 md:px-16 pt-28 sm:pt-32 pb-16 sm:pb-20"
      >
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 sm:mb-14"
        >
          <div className="eyebrow mb-3">Battle Log</div>
          <h2
            className="font-display font-bold text-text-primary leading-tight"
            style={{ fontSize: "clamp(28px, 5vw, 54px)" }}
          >
            Missions Completed
          </h2>
          <p className="text-text-secondary font-ui font-light mt-3 max-w-lg"
             style={{ fontSize: "clamp(13px, 1.6vw, 15px)" }}>
            Ranked S → B. Every project is a real system built from scratch —
            not tutorials, not clones. Click any card for the full deep-dive.
          </p>
        </motion.div>

        {/* Rank legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-8"
        >
          {(["S", "A", "B"] as Rank[]).map((r) => (
            <div key={r} className="flex items-center gap-2">
              <RankBadge rank={r} />
              <span className="font-mono text-[8px] tracking-[1px] text-text-dim">
                {r === "S" ? "Elite" : r === "A" ? "Advanced" : "Solid"}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[1px]
                        bg-green-core/5">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onOpen={setSelected}
            />
          ))}
        </div>

        {/* Count */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-mono text-[9px] tracking-[3px] uppercase text-text-dim
                     mt-8 text-right"
        >
          {projects.filter((p) => !p.wip).length} shipped ·{" "}
          {projects.filter((p) => p.wip).length} in progress
        </motion.p>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal
            project={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
