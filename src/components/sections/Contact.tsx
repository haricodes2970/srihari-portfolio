"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Footer from "@/components/shared/Footer";
import { SITE_EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/constants";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
});

const LINKS = [
  {
    icon: "⌥",
    label: "GitHub",
    value: "haricodes2970",
    href: GITHUB_URL,
  },
  {
    icon: "◈",
    label: "LinkedIn",
    value: "haricodes2970",
    href: LINKEDIN_URL,
  },
];

export default function Contact() {
  const [name, setName]     = useState("");
  const [email, setEmail]   = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent]     = useState(false);

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
                   flex flex-col justify-center"
      >
        {/* Section header */}
        <motion.div {...fadeUp(0)} className="mb-12 sm:mb-16">
          <div className="eyebrow mb-3">Final Arc</div>
          <h2
            className="font-display font-bold text-text-primary leading-tight"
            style={{ fontSize: "clamp(28px, 5vw, 54px)" }}
          >
            Let&apos;s Build Together
          </h2>
        </motion.div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-20 items-start max-w-5xl">

          {/* ── Left — Info ── */}
          <div className="flex flex-col gap-6">
            <motion.div {...fadeUp(0.1)}>
              <h3
                className="font-display font-bold text-text-primary leading-snug mb-3"
                style={{ fontSize: "clamp(20px, 3vw, 30px)" }}
              >
                Have an idea?{" "}
                <span className="text-green-core">Let&apos;s make it real.</span>
              </h3>
              <p className="font-ui font-light text-text-secondary leading-relaxed"
                 style={{ fontSize: "clamp(13px, 1.6vw, 15px)" }}>
                Whether it&apos;s an AI product, a full-stack system, or just a
                conversation about building something that doesn&apos;t exist yet —
                reach out. I&apos;m always interested in ambitious projects and
                people who think beyond the average.
              </p>
            </motion.div>

            {/* Email */}
            <motion.a
              {...fadeUp(0.2)}
              href={`mailto:${SITE_EMAIL}`}
              className="flex items-center gap-4 p-4 sm:p-5
                         bg-card border border-green-core/8 rounded-sm
                         transition-colors duration-200 hover:border-green-core/20
                         group"
            >
              <span className="text-xl">✉</span>
              <div>
                <p className="font-mono text-[8px] tracking-[3px] uppercase text-text-dim mb-1">
                  Email
                </p>
                <p className="font-ui font-medium text-text-primary text-sm sm:text-base
                               group-hover:text-green-core transition-colors duration-200">
                  {SITE_EMAIL}
                </p>
              </div>
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
                             bg-card border border-green-core/8 rounded-sm
                             transition-colors duration-200 hover:border-green-core/20
                             group"
                >
                  <span className="text-lg text-text-muted">{link.icon}</span>
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
                </a>
              ))}
            </motion.div>
          </div>

          {/* ── Right — Message form ── */}
          <motion.div
            {...fadeUp(0.2)}
            className="bg-card border border-green-core/8 rounded-sm p-6 sm:p-8"
          >
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
                className="w-full bg-surface border border-green-core/8 rounded-sm
                           px-4 py-2.5 font-ui text-sm text-text-primary
                           placeholder:text-text-dim outline-none
                           focus:border-green-core/25 transition-colors duration-200"
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
                className="w-full bg-surface border border-green-core/8 rounded-sm
                           px-4 py-2.5 font-ui text-sm text-text-primary
                           placeholder:text-text-dim outline-none
                           focus:border-green-core/25 transition-colors duration-200"
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
                className="w-full bg-surface border border-green-core/8 rounded-sm
                           px-4 py-2.5 font-ui text-sm text-text-primary
                           placeholder:text-text-dim outline-none resize-none
                           focus:border-green-core/25 transition-colors duration-200"
              />
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={!name.trim() || !message.trim()}
              className={`w-full font-mono text-[10px] tracking-[3px] uppercase
                          py-3.5 rounded-sm transition-all duration-300
                          ${sent
                            ? "bg-green-dim text-void"
                            : "bg-green-core text-void hover:shadow-[0_0_24px_rgba(0,255,106,0.3)]"
                          }
                          disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              {sent ? "✓ Message Sent" : "⚔ Send Message"}
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
