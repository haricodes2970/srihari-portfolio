// ============================================================
// SKILLS SECTION — srihari-portfolio
// ============================================================
// PHASE 1 — Layout     : filter tabs + card grid
// PHASE 2 — Cards      : style name, skill name, category, bar
// PHASE 3 — Animation  : bar fills on scroll reveal (IntersectionObserver)
// PHASE 4 — Filter     : tab switching hides/shows categories
//                        (ai | frontend | backend | tools | all)
// DATA: import { skills } from "@/lib/data"
// ============================================================

"use client";

import Footer from "@/components/shared/Footer";

export default function Skills() {
  return (
    <>
      <section id="skills" className="min-h-screen">
        {/* TODO Phase 1: SectionHeader eyebrow="Training Arc" title="Combat Abilities" */}
        {/* TODO Phase 4: Filter tabs */}
        {/* TODO Phase 2: skills.map → SkillCard */}
        {/* TODO Phase 3: Bar fill animation on intersect */}

        <p className="text-green-core font-mono text-sm tracking-widest p-20">
          Skills Section — TODO
        </p>
      </section>
      <Footer />
    </>
  );
}
