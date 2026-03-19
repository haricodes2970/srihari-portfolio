"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useUIStore } from "@/store/uiStore";
import { NAV_ITEMS } from "@/lib/constants";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 right-0 z-[100]
          flex items-center justify-between
          px-6 md:px-16 py-5
          transition-all duration-400
          ${scrolled
            ? "bg-void/85 backdrop-blur-[18px] border-b border-green-core/8"
            : "bg-transparent border-b border-transparent"
          }
        `}
      >
        {/* ── Logo ── */}
        <Link
          href="/"
          onClick={handleNavClick}
          className="font-display font-bold text-green-core text-[15px] tracking-[3px]
                     hover:opacity-80 transition-opacity duration-200"
          style={{ textShadow: "0 0 20px rgba(0,255,106,0.3)" }}
        >
          ⚔ SRIHARI
        </Link>

        {/* ── Desktop links ── */}
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
                    after:h-px after:bg-green-core
                    after:transition-all after:duration-250
                    ${isActive
                      ? "text-green-core after:w-full"
                      : "text-text-muted hover:text-green-core after:w-0 hover:after:w-full"
                    }
                  `}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ── Right side: Mode toggle + burger ── */}
        <div className="flex items-center gap-4">
          {/* Mode toggle — desktop only */}
          <button
            onClick={toggleMode}
            className="hidden md:flex items-center gap-2
                       font-mono text-[9px] tracking-[2px] uppercase
                       text-text-muted border border-green-core/8
                       px-4 py-1.5 rounded-sm
                       transition-all duration-200
                       hover:text-green-core hover:border-green-core/20 hover:bg-green-core/5"
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-green-core animate-pulse"
              style={{ boxShadow: "0 0 6px #00ff6a" }}
            />
            {mode === "zoro" ? "Calm Mode" : "Zoro Mode"}
          </button>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden flex flex-col gap-[5px] p-1"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-[1.5px] bg-text-secondary transition-all duration-300
                          ${menuOpen ? "rotate-45 translate-y-[6.5px]" : ""}`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-text-secondary transition-all duration-300
                          ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-text-secondary transition-all duration-300
                          ${menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`}
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
          className="absolute inset-0 bg-void/95 backdrop-blur-xl"
          onClick={() => setMenuOpen(false)}
        />

        {/* Menu panel */}
        <div
          className={`
            absolute top-0 right-0 h-full w-[260px]
            bg-deep border-l border-green-core/8
            flex flex-col justify-center gap-7 px-10
            transition-transform duration-400
            ${menuOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className={`
                  font-mono text-[13px] tracking-[3px] uppercase
                  transition-colors duration-200
                  ${isActive ? "text-green-core" : "text-text-muted hover:text-green-core"}
                `}
              >
                {isActive ? "→ " : ""}{item.label}
              </Link>
            );
          })}

          {/* Mode toggle in mobile menu */}
          <button
            onClick={() => { toggleMode(); setMenuOpen(false); }}
            className="font-mono text-[9px] tracking-[2px] uppercase
                       text-text-muted border border-green-core/8
                       px-4 py-2 rounded-sm mt-4
                       transition-all duration-200
                       hover:text-green-core hover:border-green-core/20"
          >
            {mode === "zoro" ? "⚔ Calm Mode" : "◎ Zoro Mode"}
          </button>
        </div>
      </div>
    </>
  );
}
