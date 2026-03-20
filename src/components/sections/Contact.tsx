"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Footer from "@/components/shared/Footer";
import { SITE_EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/constants";
import ParticleMesh from "@/components/effects/ParticleMesh";

const fadeUp = (delay = 0) => ({
  initial:      { opacity: 0, y: 20 },
  whileInView:  { opacity: 1, y: 0 },
  viewport:     { once: true, margin: "-40px" },
  transition:   { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
});

const LINKS = [
  { icon: "⌥", label: "GitHub",   value: "haricodes2970", href: GITHUB_URL   },
  { icon: "◈", label: "LinkedIn", value: "haricodes2970", href: LINKEDIN_URL },
];

export default function Contact() {
  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [message, setMessage] = useState("");
  const [sent,    setSent]    = useState(false);

  const handleSubmit = () => {
    if (!name.trim() || !message.trim()) return;
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body    = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:${SITE_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <>
      <section
        id="contact"
        className="min-h-screen bg-void border-t border-green-core/8
                   px-5 sm:px-8 md:px-16 pt-28 sm:pt-32 pb-16 sm:pb-20
                   flex flex-col justify-center relative overflow-hidden"
      >
        {/* Particle mesh — cursor-reactive node network */}
        <ParticleMesh count={70} connectDist={160} nodeColor="0,255,106" lineColor="0,255,80" opacity={0.52} />
        {/* Scan line */}
        <div className="scan-overlay" />

        {/* Section header */}
        <motion.div {...fadeUp(0)} className="mb-12 sm:mb-16 relative z-10">
          <div className="eyebrow mb-3">Final Arc</div>
          <h2
            className="font-display font-bold text-text-primary leading-tight"
            style={{ fontSize: "clamp(28px, 5vw, 54px)" }}
          >
            Let&apos;s Build Together
          </h2>
        </motion.div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-20 items-start max-w-5xl relative z-10">

          {/* ── Left — Info ── */}
          <div className="flex flex-col gap-6">
            <motion.div {...fadeUp(0.1)}>
              <h3
                className="font-display font-bold text-text-primary leading-snug mb-3"
                style={{ fontSize: "clamp(20px, 3vw, 30px)" }}
              >
                Have an idea?{" "}
                <span
                  className="text-green-core"
                  style={{ textShadow: "0 0 20px rgba(0,255,106,0.2)" }}
                >
                  Let&apos;s make it real.
                </span>
              </h3>
              <p
                className="font-ui font-light text-text-secondary leading-relaxed"
                style={{ fontSize: "clamp(13px, 1.6vw, 15px)" }}
              >
                Whether it&apos;s an AI product, a full-stack system, or just a
                conversation about building something that doesn&apos;t exist yet —
                reach out. I&apos;m always interested in ambitious projects and
                people who think beyond the average.
              </p>
            </motion.div>

            {/* Status indicator */}
            <motion.div
              {...fadeUp(0.15)}
              className="flex items-center gap-3 py-3 px-4 border border-green-core/10
                         bg-green-core/4 rounded-sm"
            >
              <span
                className="w-2 h-2 rounded-full bg-green-core flex-shrink-0"
                style={{
                  boxShadow: "0 0 8px #00ff6a",
                  animation: "wipPulse 2s ease-in-out infinite",
                }}
              />
              <span className="font-mono text-[9px] tracking-[2px] uppercase text-green-core">
                Available for projects · Responds fast
              </span>
            </motion.div>

            {/* Email */}
            <motion.a
              {...fadeUp(0.2)}
              href={`mailto:${SITE_EMAIL}`}
              className="flex items-center gap-4 p-4 sm:p-5
                         bg-card border border-green-core/8 rounded-sm card-shine
                         transition-all duration-300 group
                         hover:border-green-core/25
                         hover:shadow-[0_0_24px_rgba(0,255,106,0.08)]"
            >
              <span
                className="text-xl transition-transform duration-300 group-hover:scale-110"
                style={{ filter: "drop-shadow(0 0 6px rgba(0,255,106,0.3))" }}
              >
                ✉
              </span>
              <div>
                <p className="font-mono text-[8px] tracking-[3px] uppercase text-text-dim mb-1">
                  Email
                </p>
                <p className="font-ui font-medium text-text-primary text-sm sm:text-base
                               group-hover:text-green-core transition-colors duration-200">
                  {SITE_EMAIL}
                </p>
              </div>
              <span className="ml-auto font-mono text-[9px] text-text-dim
                               opacity-0 group-hover:opacity-100 transition-all duration-300
                               group-hover:translate-x-0 translate-x-1">
                →
              </span>
            </motion.a>

            {/* Social links */}
            <motion.div {...fadeUp(0.3)} className="flex flex-col gap-3">
              {LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4
                             bg-card border border-green-core/8 rounded-sm card-shine
                             transition-all duration-300 group
                             hover:border-green-core/25
                             hover:shadow-[0_0_20px_rgba(0,255,106,0.07)]"
                >
                  <span className="text-lg text-text-muted transition-all duration-300
                                   group-hover:text-green-core group-hover:scale-110">
                    {link.icon}
                  </span>
                  <div>
                    <p className="font-mono text-[8px] tracking-[3px] uppercase
                                  text-text-dim mb-1">
                      {link.label}
                    </p>
                    <p className="font-ui font-semibold text-text-primary text-sm
                                   group-hover:text-green-core transition-colors duration-200">
                      {link.value}
                    </p>
                  </div>
                  <span className="ml-auto font-mono text-[9px] text-text-dim
                                   opacity-0 group-hover:opacity-100 transition-all duration-300
                                   group-hover:translate-x-0 translate-x-1">
                    →
                  </span>
                </a>
              ))}
            </motion.div>
          </div>

          {/* ── Right — Message form ── */}
          <motion.div
            {...fadeUp(0.2)}
            className="bg-card border border-green-core/10 rounded-sm p-6 sm:p-8
                       relative overflow-hidden"
            style={{ boxShadow: "0 0 40px rgba(0,255,106,0.04)" }}
          >
            {/* Top accent */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(0,255,106,0.4), transparent)",
              }}
            />

            <h3 className="font-display font-bold text-text-primary text-base mb-6">
              Send a Message
            </h3>

            {/* Name */}
            <div className="mb-4">
              <label className="font-mono text-[8px] tracking-[3px] uppercase
                                text-text-dim block mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full bg-surface border border-green-core/10 rounded-sm
                           px-4 py-2.5 font-ui text-sm text-text-primary
                           placeholder:text-text-dim outline-none
                           transition-all duration-200"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="font-mono text-[8px] tracking-[3px] uppercase
                                text-text-dim block mb-2">
                Your Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-surface border border-green-core/10 rounded-sm
                           px-4 py-2.5 font-ui text-sm text-text-primary
                           placeholder:text-text-dim outline-none
                           transition-all duration-200"
              />
            </div>

            {/* Message */}
            <div className="mb-5">
              <label className="font-mono text-[8px] tracking-[3px] uppercase
                                text-text-dim block mb-2">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What are we building?"
                rows={4}
                className="w-full bg-surface border border-green-core/10 rounded-sm
                           px-4 py-2.5 font-ui text-sm text-text-primary
                           placeholder:text-text-dim outline-none resize-none
                           transition-all duration-200"
              />
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={!name.trim() || !message.trim()}
              className={`
                group relative w-full font-mono text-[10px] tracking-[3px] uppercase
                py-3.5 rounded-sm overflow-hidden
                transition-all duration-300
                disabled:opacity-40 disabled:cursor-not-allowed
                ${sent
                  ? "bg-green-dim text-void"
                  : "bg-green-core text-void hover:shadow-[0_0_30px_rgba(0,255,106,0.4),0_0_60px_rgba(0,255,106,0.15)]"
                }
              `}
            >
              <span className="relative z-10">
                {sent ? "✓ Message Sent" : "⚔ Send Message"}
              </span>
              {/* Shine sweep */}
              {!sent && (
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100
                             transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 1.5s ease infinite",
                  }}
                />
              )}
            </button>

            <p className="font-mono text-[8px] tracking-[2px] uppercase text-text-dim
                           text-center mt-3">
              Opens your email client · No tracking
            </p>
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  );
}
