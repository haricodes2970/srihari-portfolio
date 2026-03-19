"use client";

import { motion } from "framer-motion";
import Footer from "@/components/shared/Footer";

// ── Floating sword decoration ─────────────────────────────
function FloatingSword({ delay = 0, height = 80 }: { delay?: number; height?: number }) {
  return (
    <div
      className="flex flex-col items-center opacity-25"
      style={{ animation: `float 3s ease-in-out ${delay}s infinite` }}
    >
      <div
        className="w-[2px] rounded-t-sm"
        style={{
          height,
          background: "linear-gradient(180deg, #00ff6a 0%, #007a30 60%, #444 100%)",
          boxShadow: "0 0 8px rgba(0,255,106,0.4)",
        }}
      />
      <div className="w-4 h-[5px] bg-neutral-600 rounded-sm border border-neutral-500" />
      <div className="w-[5px] h-6 bg-neutral-700 rounded-b-sm" />
    </div>
  );
}

export default function Certificates() {
  return (
    <>
      <section
        id="certificates"
        className="min-h-screen bg-void border-t border-green-core/8
                   px-5 sm:px-8 md:px-16 pt-28 sm:pt-32 pb-16 sm:pb-20"
      >
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 sm:mb-16"
        >
          <div className="eyebrow mb-3">Archive</div>
          <h2
            className="font-display font-bold text-text-primary leading-tight"
            style={{ fontSize: "clamp(28px, 5vw, 54px)" }}
          >
            Collected Achievements
          </h2>
          <p className="text-text-secondary font-ui font-light mt-3 max-w-md"
             style={{ fontSize: "clamp(13px, 1.6vw, 15px)" }}>
            Proof of battles won. This archive is always being updated.
          </p>
        </motion.div>

        {/* ── Placeholder state ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center
                     min-h-[400px] sm:min-h-[480px] text-center gap-8"
        >
          {/* Three swords */}
          <div className="flex items-end gap-5 sm:gap-7">
            <FloatingSword delay={0}   height={60}  />
            <FloatingSword delay={0.8} height={88}  />
            <FloatingSword delay={1.6} height={60}  />
          </div>

          {/* Message */}
          <div className="flex flex-col items-center gap-3">
            <h3
              className="font-display font-bold text-text-secondary"
              style={{ fontSize: "clamp(18px, 3vw, 28px)" }}
            >
              Archive Being Assembled
            </h3>
            <p className="font-mono text-[10px] tracking-[4px] uppercase text-text-dim">
              Certificates loading into the vault…
            </p>
          </div>

          {/* Status badge */}
          <div
            className="font-mono text-[9px] tracking-[3px] uppercase text-green-core
                       border border-green-core/15 bg-green-core/5
                       px-5 py-2.5 rounded-sm"
          >
            ⚔ Check Back Soon — Swords Are Being Sharpened
          </div>

          {/* Grid preview skeleton — shows what it'll look like */}
          <div className="w-full max-w-2xl mt-4">
            <p className="font-mono text-[8px] tracking-[3px] uppercase text-text-dim mb-4">
              // Coming layout preview
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="aspect-[4/3] bg-card border border-green-core/8
                             rounded-sm flex flex-col items-center justify-center gap-2
                             relative overflow-hidden"
                >
                  {/* Shimmer effect */}
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      background:
                        "linear-gradient(105deg, transparent 40%, rgba(0,255,106,0.04) 50%, transparent 60%)",
                      animation: `shimmer 2.5s ease-in-out ${i * 0.3}s infinite`,
                    }}
                  />
                  <div className="w-6 h-6 rounded-sm bg-green-core/8 border border-green-core/10" />
                  <div className="w-16 h-1.5 rounded-full bg-green-core/8" />
                  <div className="w-10 h-1 rounded-full bg-green-core/5" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/*
          ══════════════════════════════════════════════════
          WHEN YOU'RE READY TO ADD CERTIFICATES:
          ══════════════════════════════════════════════════

          1. Add certificates to src/lib/data.ts:
             export const certificates: Certificate[] = [
               {
                 id: "aws-cloud",
                 name: "AWS Cloud Practitioner",
                 issuer: "Amazon Web Services",
                 date: "2024",
                 image: "/certificates/aws-cloud.jpg",
                 link: "https://...",
               },
               ...
             ];

          2. Add cert images to: /public/certificates/

          3. Replace the placeholder above with the grid below:
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
               {certificates.map((cert) => (
                 <CertCard key={cert.id} cert={cert} />
               ))}
             </div>
          ══════════════════════════════════════════════════
        */}
      </section>

      {/* Shimmer keyframe */}
      <style>{`
        @keyframes shimmer {
          0%, 100% { transform: translateX(-100%); }
          50%       { transform: translateX(100%); }
        }
      `}</style>

      <Footer />
    </>
  );
}
