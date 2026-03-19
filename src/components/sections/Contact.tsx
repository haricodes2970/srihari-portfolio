// ============================================================
// CONTACT SECTION — srihari-portfolio
// ============================================================
// PHASE 1 — Layout     : 2-col (links | message form)
// PHASE 2 — Left col   : headline, email link, GitHub + LinkedIn cards
// PHASE 3 — Right col  : name / email / message fields
//                        Submit opens mailto: link
// No backend needed — mailto is sufficient for now
// ============================================================

"use client";

import Footer from "@/components/shared/Footer";

export default function Contact() {
  return (
    <>
      <section id="contact" className="min-h-screen">
        {/* TODO Phase 1: SectionHeader eyebrow="Final Arc" title="Let's Build Together" */}
        {/* TODO Phase 2: Email, GitHub, LinkedIn links */}
        {/* TODO Phase 3: Contact form → mailto */}

        <p className="text-green-core font-mono text-sm tracking-widest p-20">
          Contact Section — TODO
        </p>
      </section>
      <Footer />
    </>
  );
}
