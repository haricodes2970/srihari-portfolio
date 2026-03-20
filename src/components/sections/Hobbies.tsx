"use client";

import { motion } from "framer-motion";
import Footer from "@/components/shared/Footer";
import { hobbies } from "@/lib/data";
import IsoFluxCanvas from "@/components/effects/IsoFluxCanvas";

export default function Hobbies() {
  return (
    <>
      <section
        id="hobbies"
        className="green-mesh min-h-screen bg-deep border-t border-green-core/8
                   px-5 sm:px-8 md:px-16 pt-28 sm:pt-32 pb-16 sm:pb-20
                   relative overflow-hidden"
      >
        {/* Isometric flux — floating cubes + mouse parallax */}
        <IsoFluxCanvas />
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 sm:mb-16"
        >
          <div className="eyebrow mb-3">Character Profile</div>
          <h2
            className="font-display font-bold text-text-primary leading-tight"
            style={{ fontSize: "clamp(28px, 5vw, 54px)" }}
          >
            The Other Side
          </h2>
          <p className="text-text-secondary font-ui font-light mt-3 max-w-md"
             style={{ fontSize: "clamp(13px, 1.6vw, 15px)" }}>
            What keeps the builder human. The interests that feed the ideas.
          </p>
        </motion.div>

        {/* Hobbies grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {hobbies.map((hobby, i) => (
            <motion.div
              key={hobby.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group bg-card border border-green-core/8 rounded-sm
                         p-5 sm:p-6 flex flex-col items-center gap-3 sm:gap-4
                         text-center relative overflow-hidden
                         transition-all duration-300
                         hover:border-green-core/20 hover:-translate-y-1
                         hover:shadow-[0_8px_32px_rgba(0,255,106,0.06)]"
            >
              {/* Radial glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100
                           transition-opacity duration-300 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(0,255,106,0.05) 0%, transparent 70%)",
                }}
              />

              {/* Icon */}
              <span className="text-3xl sm:text-4xl relative z-10 select-none
                               transition-transform duration-300 group-hover:scale-110">
                {hobby.icon}
              </span>

              {/* Name */}
              <div className="relative z-10">
                <p className="font-ui font-semibold text-text-primary"
                   style={{ fontSize: "clamp(13px, 1.8vw, 15px)" }}>
                  {hobby.name}
                </p>
                <p className="font-mono text-[8px] sm:text-[9px] tracking-[1px]
                               uppercase text-text-dim mt-1">
                  {hobby.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-mono text-[9px] tracking-[3px] uppercase text-text-dim
                     mt-12 text-center"
        >
          // A builder who knows where ideas come from
        </motion.p>
      </section>
      <Footer />
    </>
  );
}
