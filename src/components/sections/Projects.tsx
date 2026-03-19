// ============================================================
// PROJECTS SECTION — srihari-portfolio
// ============================================================
// PHASE 1 — Layout     : card grid (auto-fill 340px)
// PHASE 2 — Cards      : rank, num, title, desc, tech tags, links
// PHASE 3 — Hover      : green top line sweep, bg lighten
// PHASE 4 — Modal      : click opens ProjectModal with deep-dive
//                        content from data.ts
// DATA: import { projects } from "@/lib/data"
// ORDER: S → A → B (already sorted in data.ts)
// WIP cards: show yellow "In Progress" badge
// ============================================================

"use client";

import Footer from "@/components/shared/Footer";

export default function Projects() {
  return (
    <>
      <section id="projects" className="min-h-screen">
        {/* TODO Phase 1: SectionHeader eyebrow="Battle Log" title="Missions Completed" */}
        {/* TODO Phase 2: projects.map → ProjectCard */}
        {/* TODO Phase 4: ProjectModal component */}

        <p className="text-green-core font-mono text-sm tracking-widest p-20">
          Projects Section — TODO
        </p>
      </section>
      <Footer />
    </>
  );
}
