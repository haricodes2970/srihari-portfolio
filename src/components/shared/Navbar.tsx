"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useUIStore } from "@/store/uiStore";
import { NAV_ITEMS } from "@/lib/constants";

export default function Navbar() {
  const pathname  = usePathname();
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [ripple,   setRipple]     = useState(false);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const { mode, toggleMode, triggerSlash } = useUIStore();

  // Frosted glass on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = () => {
    triggerSlash();
    setMenuOpen(false);
  };

  const handleToggle = () => {
    toggleMode();
    setRipple(true);
    setTimeout(() => setRipple(false), 500);
  };

  const isZoro = mode === "zoro";

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 right-0 z-[100]
          flex items-center justify-between
          px-6 md:px-16 py-5
          transition-all duration-400
          ${scrolled
            ? "bg-void/88 backdrop-blur-[20px] border-b border-green-core/10 shadow-[0_1px_0_rgba(0,255,106,0.04)]"
            : "bg-transparent border-b border-transparent"
          }
        `}
      >
        {/* ── Logo ── */}
        <Link
          href="/"
          onClick={handleNavClick}
          className="font-display font-bold text-green-core text-[15px] tracking-[3px]
                     hover:opacity-80 transition-all duration-200 group relative"
          style={{ textShadow: "0 0 24px rgba(0,255,106,0.35)" }}
        >
          ⚔ SRIHARI PRASAD S
          <span
            className="absolute -bottom-px left-0 h-px bg-green-core
                       w-0 group-hover:w-full transition-all duration-300"
            style={{ boxShadow: "0 0 6px #00ff6a" }}
          />
        </Link>

        {/* ── Desktop nav links ── */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={handleNavClick}
                  className={`
                    font-mono text-[10px] tracking-[2.5px] uppercase
                    relative transition-colors duration-200
                    after:content-[''] after:absolute after:bottom-[-4px] after:left-0
                    after:h-px after:transition-all after:duration-250
                    ${isActive
                      ? "text-green-core after:w-full after:bg-green-core after:shadow-[0_0_6px_#00ff6a]"
                      : "text-text-muted hover:text-green-core after:w-0 after:bg-green-core hover:after:w-full"
                    }
                  `}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ── Right side ── */}
        <div className="flex items-center gap-4">
          {/* Mode toggle — desktop */}
          <button
            ref={toggleBtnRef}
            onClick={handleToggle}
            className={`
              hidden md:flex items-center gap-2.5 relative overflow-hidden
              font-mono text-[9px] tracking-[2px] uppercase
              px-4 py-1.5 rounded-sm border
              transition-all duration-300
              ${isZoro
                ? "text-green-core border-green-core/25 bg-green-core/6 hover:border-green-core/40 hover:bg-green-core/10 shadow-[0_0_16px_rgba(0,255,106,0.1)]"
                : "text-text-muted border-green-core/10 hover:text-green-core hover:border-green-core/20 hover:bg-green-core/5"
              }
            `}
          >
            {/* Ripple effect */}
            {ripple && <span className="toggle-ripple" />}

            {/* Status dot */}
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300"
              style={{
                background:  isZoro ? "#00ff6a" : "#4a5568",
                boxShadow:   isZoro ? "0 0 8px #00ff6a, 0 0 16px rgba(0,255,106,0.3)" : "none",
                animation:   isZoro ? "wipPulse 2s ease-in-out infinite" : "none",
              }}
            />

            {/* Label */}
            <span className="relative z-10">
              {isZoro ? "⚔ Zoro Mode" : "◎ Calm Mode"}
            </span>
          </button>

          {/* Hamburger — mobile */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden flex flex-col gap-[5px] p-1"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-[1.5px] bg-text-secondary transition-all duration-300
                          ${menuOpen ? "rotate-45 translate-y-[6.5px] bg-green-core" : ""}`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-text-secondary transition-all duration-300
                          ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-text-secondary transition-all duration-300
                          ${menuOpen ? "-rotate-45 -translate-y-[6.5px] bg-green-core" : ""}`}
            />
          </button>
        </div>
      </nav>

      {/* ── Mobile menu overlay ── */}
      <div
        className={`
          fixed inset-0 z-[99] md:hidden
          transition-all duration-400
          ${menuOpen ? "visible opacity-100" : "invisible opacity-0"}
        `}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-void/95 backdrop-blur-2xl"
          onClick={() => setMenuOpen(false)}
        />

        {/* Menu panel */}
        <div
          className={`
            absolute top-0 right-0 h-full w-[260px]
            bg-deep border-l border-green-core/10
            flex flex-col justify-center gap-6 px-10
            transition-transform duration-400
            ${menuOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          {/* Top accent */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(0,255,106,0.3), transparent)",
            }}
          />

          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className={`
                  font-mono text-[13px] tracking-[3px] uppercase
                  transition-all duration-200 flex items-center gap-2
                  ${isActive
                    ? "text-green-core"
                    : "text-text-muted hover:text-green-core hover:translate-x-1"
                  }
                `}
              >
                {isActive && (
                  <span
                    className="w-1 h-1 rounded-full bg-green-core flex-shrink-0"
                    style={{ boxShadow: "0 0 6px #00ff6a" }}
                  />
                )}
                {item.label}
              </Link>
            );
          })}

          {/* Mode toggle in mobile menu */}
          <button
            onClick={() => { handleToggle(); setMenuOpen(false); }}
            className={`
              relative font-mono text-[9px] tracking-[2px] uppercase
              border px-4 py-2.5 rounded-sm mt-2 overflow-hidden
              transition-all duration-300
              ${isZoro
                ? "text-green-core border-green-core/30 bg-green-core/8 shadow-[0_0_14px_rgba(0,255,106,0.12)]"
                : "text-text-muted border-green-core/10 hover:text-green-core hover:border-green-core/20"
              }
            `}
          >
            <span className="flex items-center gap-2.5 justify-center">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: isZoro ? "#00ff6a" : "#4a5568",
                  boxShadow:  isZoro ? "0 0 6px #00ff6a" : "none",
                }}
              />
              {isZoro ? "⚔ Zoro Mode Active" : "◎ Switch to Zoro Mode"}
            </span>
          </button>

          {/* Bottom accent */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(0,255,106,0.15), transparent)",
            }}
          />
        </div>
      </div>
    </>
  );
}
