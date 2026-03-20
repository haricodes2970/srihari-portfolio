"use client";

// ============================================================
// GREEN CYBER BACKGROUND — Skills section
// Canvas matrix rain + scan line + diagonal grid + terminal cursors
// Cursor: scan line drifts toward mouse Y
// ============================================================

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface GreenCyberBgProps {
  isCalm?: boolean;
}

const KANA = ["ア", "カ", "サ", "タ", "ナ", "ハ", "マ", "ヤ", "ラ", "ワ", "0", "1"];

export default function GreenCyberBg({ isCalm = false }: GreenCyberBgProps) {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const scanRef     = useRef<HTMLDivElement>(null);
  const rafRef      = useRef<number>(0);
  const mouseY      = useRef<number>(-1);
  const scanY       = useRef<number>(0);
  const [cursors]   = useState(() =>
    Array.from({ length: 4 }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
    }))
  );
  const cursorRefs  = useRef<(HTMLSpanElement | null)[]>([]);

  const accent  = isCalm ? "134,239,172" : "0,255,65";
  const accentH = isCalm ? "#86EFAC" : "#00FF41";

  // ── Matrix rain canvas ───────────────────────────────────
  useEffect(() => {
    const pref = window.matchMedia("(prefers-reduced-motion: reduce)");
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    let W = 0, H = 0;

    const resize = () => {
      const p = canvas.parentElement;
      W = p ? p.clientWidth  : window.innerWidth;
      H = p ? p.clientHeight : window.innerHeight;
      if (W <= 0 || H <= 0) return;
      canvas.width  = W;
      canvas.height = H;
      initCols();
    };

    const FONT_SIZE = 13;
    let cols: { x: number; y: number; speed: number; swapTimer: number; char: string }[] = [];

    const initCols = () => {
      if (W <= 0) return;
      const totalCols = Math.floor(W / (FONT_SIZE + 4));
      const count = isMobile ? Math.floor(totalCols * 0.4) : totalCols;
      cols = Array.from({ length: count }, (_, i) => {
        const x = i * ((FONT_SIZE + 4) * (isMobile ? 1 / 0.4 : 1));
        return {
          x,
          y: Math.random() * H,
          speed: 0.8 + Math.random() * 1.5,
          swapTimer: 0,
          char: KANA[Math.floor(Math.random() * KANA.length)],
        };
      });
    };

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    resize();

    let last = 0;
    const tick = (ts: number) => {
      if (W === 0) { rafRef.current = requestAnimationFrame(tick); return; }
      const dt = ts - last;
      last = ts;
      if (dt > 100) { rafRef.current = requestAnimationFrame(tick); return; } // tab hidden

      // Fade trail
      ctx.fillStyle = isCalm
        ? "rgba(26,26,46,0.18)"
        : "rgba(0,0,0,0.16)";
      ctx.fillRect(0, 0, W, H);

      if (!pref.matches) {
        ctx.font = `bold ${FONT_SIZE}px monospace`;
        for (const col of cols) {
          col.swapTimer += dt;
          if (col.swapTimer > 120 + Math.random() * 200) {
            col.char = KANA[Math.floor(Math.random() * KANA.length)];
            col.swapTimer = 0;
          }
          // Head char — bright
          const headAlpha = isCalm ? 0.7 : 0.9;
          ctx.fillStyle = `rgba(${accent},${headAlpha})`;
          ctx.fillText(col.char, col.x, col.y);

          // Trailing ghost (dimmer)
          const trailAlpha = isCalm ? 0.2 : 0.25;
          ctx.fillStyle = `rgba(${accent},${trailAlpha})`;
          const prev = KANA[Math.floor(Math.random() * KANA.length)];
          ctx.fillText(prev, col.x, col.y - FONT_SIZE);

          col.y += col.speed;
          if (col.y > H) {
            col.y = -FONT_SIZE;
            col.speed = 0.8 + Math.random() * 1.5;
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [isCalm, accent]);

  // ── Scan line ────────────────────────────────────────────
  useEffect(() => {
    const el = scanRef.current;
    if (!el) return;
    const H = el.parentElement?.clientHeight ?? window.innerHeight;
    scanY.current = 0;

    // Base sweep
    const tl = gsap.to(scanY, {
      current: H,
      duration: isCalm ? 6 : 4,
      repeat: -1,
      ease: "none",
      onUpdate() {
        if (el) el.style.transform = `translateY(${scanY.current}px)`;
      },
    });

    // Mouse Y tracking
    const onMove = (e: MouseEvent) => { mouseY.current = e.clientY; };
    window.addEventListener("mousemove", onMove, { passive: true });

    // Smooth drift toward cursor
    const drift = setInterval(() => {
      if (mouseY.current < 0) return;
      const rect = el.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const relY = mouseY.current - rect.top;
      const diff = relY - scanY.current;
      scanY.current += diff * 0.06; // lerp
      if (el) el.style.transform = `translateY(${scanY.current}px)`;
    }, 16);

    return () => {
      tl.kill();
      clearInterval(drift);
      window.removeEventListener("mousemove", onMove);
    };
  }, [isCalm]);

  // ── Terminal cursor blinks ────────────────────────────────
  useEffect(() => {
    if (window.innerWidth < 768) return; // hide on mobile

    const cleanups: (() => void)[] = [];

    cursorRefs.current.forEach((el, i) => {
      if (!el) return;

      const blink = gsap.to(el, {
        opacity: 0,
        duration: 0.5 + Math.random() * 0.7,
        repeat: -1,
        yoyo: true,
        ease: "steps(1)",
        delay: i * 0.3,
      });

      // Teleport every 6-10s
      const interval = setInterval(() => {
        gsap.set(el, {
          left: `${5 + Math.random() * 85}%`,
          top:  `${10 + Math.random() * 75}%`,
        });
      }, 6000 + Math.random() * 4000);

      cleanups.push(() => { blink.kill(); clearInterval(interval); });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* Diagonal grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `repeating-linear-gradient(
            45deg,
            rgba(255,255,255,${isCalm ? "0.025" : "0.035"}) 0px,
            rgba(255,255,255,${isCalm ? "0.025" : "0.035"}) 1px,
            transparent 1px,
            transparent 40px
          )`,
        }}
      />

      {/* Matrix rain canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: isCalm ? 0.45 : 0.55 }}
      />

      {/* Scan line */}
      <div
        ref={scanRef}
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          top: 0,
          height: 2,
          background: `rgba(${accent},0.85)`,
          boxShadow: `0 0 12px ${accentH}, 0 0 30px rgba(${accent},0.35), 0 0 60px rgba(${accent},0.12)`,
          willChange: "transform",
        }}
      />

      {/* Terminal cursors */}
      {!( typeof window !== "undefined" && window.innerWidth < 768) &&
        cursors.map((c, i) => (
          <span
            key={c.id}
            ref={(el) => { cursorRefs.current[i] = el; }}
            className="absolute font-mono select-none hidden sm:block"
            style={{
              left:       `${c.x}%`,
              top:        `${c.y}%`,
              color:      accentH,
              fontSize:   "14px",
              opacity:    0.7,
              textShadow: `0 0 8px ${accentH}`,
            }}
          >
            ▊
          </span>
        ))
      }
    </div>
  );
}
