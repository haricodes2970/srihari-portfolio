"use client";

// ============================================================
// CYBERPUNK CRACK BACKGROUND — Contact section
// Distorted mixed cyan/green mesh + SVG crack lines + glitch strips + CRT scanlines
// Cursor-reactive: nodes scatter within 200px radius
// ============================================================

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface CyberpunkCrackBgProps { isCalm?: boolean; }

// ── Canvas mesh with cursor scatter ───────────────────────
function CrackMeshCanvas({ isCalm }: { isCalm: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse     = useRef({ x: -9999, y: -9999 });
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    interface CNode {
      x: number; y: number;
      vx: number; vy: number;
      baseX: number; baseY: number;
      radius: number;
      alpha: number;
      colorIdx: number;   // 0=cyan, 1=green
      flickerTimer: number;
    }

    let nodes: CNode[] = [];
    let W = 0, H = 0;

    const COLORS = isCalm
      ? ["94,234,212", "107,142,107"]   // teal + sage
      : ["0,212,255",  "0,255,65"];     // cyan + green

    const buildNodes = (w: number, h: number) => {
      const isMobile = w < 768;
      const n = isMobile ? 35 : 70;
      nodes = Array.from({ length: n }, () => {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const vx = (Math.random() - 0.5) * 0.5;
        const vy = (Math.random() - 0.5) * 0.5;
        return {
          x, y, vx, vy, baseX: x, baseY: y,
          radius: 1.2 + Math.random() * 2,
          alpha: 0.4 + Math.random() * 0.45,
          colorIdx: Math.round(Math.random()),
          flickerTimer: Math.random() * 500,
        };
      });
    };

    const resize = () => {
      const p = canvas.parentElement;
      const w = p ? p.clientWidth  : window.innerWidth;
      const h = p ? p.clientHeight : window.innerHeight;
      if (w <= 0 || h <= 0) return;
      const first = W === 0;
      canvas.width = w; canvas.height = h;
      W = w; H = h;
      if (first) buildNodes(W, H);
    };
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    resize();

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 }; };
    window.addEventListener("mousemove",  onMove,  { passive: true });
    window.addEventListener("mouseleave", onLeave, { passive: true });

    const SCATTER_R = 200;

    const tick = (dt: number) => {
      if (W === 0 || nodes.length === 0) { rafRef.current = requestAnimationFrame(() => tick(16)); return; }

      ctx.clearRect(0, 0, W, H);
      const mx = mouse.current.x;
      const my = mouse.current.y;

      for (const n of nodes) {
        // Flicker effect
        n.flickerTimer -= dt;
        if (n.flickerTimer <= 0) {
          n.alpha = 0.3 + Math.random() * 0.55;
          n.flickerTimer = 200 + Math.random() * 500;
        }

        // Cursor scatter — push away
        const dx = n.x - mx;
        const dy = n.y - my;
        const d  = Math.hypot(dx, dy);
        if (d < SCATTER_R && d > 1) {
          const f = (1 - d / SCATTER_R) * 0.06;
          n.vx += (dx / d) * f;
          n.vy += (dy / d) * f;
        }

        // Drift back toward base position
        n.vx += (n.baseX - n.x) * 0.001;
        n.vy += (n.baseY - n.y) * 0.001;
        n.vx *= 0.97;
        n.vy *= 0.97;
        n.x += n.vx;
        n.y += n.vy;

        // Wall clamp
        n.x = Math.max(0, Math.min(W, n.x));
        n.y = Math.max(0, Math.min(H, n.y));
      }

      // Edges
      const CONNECT = 150;
      ctx.lineWidth = 0.6;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d < CONNECT) {
            const a = (1 - d / CONNECT) * 0.35;
            const ci = COLORS[nodes[i].colorIdx];
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(${ci},${a})`;
            ctx.stroke();
          }
        }
      }

      // Nodes
      for (const n of nodes) {
        const c = COLORS[n.colorIdx];
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c},${n.alpha})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(() => tick(16));
    };

    rafRef.current = requestAnimationFrame(() => tick(16));
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [isCalm]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 w-full h-full"
      style={{ opacity: isCalm ? 0.5 : 0.65, zIndex: 0, pointerEvents: "none" }}
    />
  );
}

// ── SVG Crack lines ────────────────────────────────────────
function CrackLines({ isCalm }: { isCalm: boolean }) {
  const svgRef = useRef<SVGSVGElement>(null);

  const strokeColor = isCalm ? "#6B8E6B" : "#00FF41";
  const glowColor   = isCalm ? "rgba(107,142,107,0.4)" : "rgba(0,255,65,0.6)";

  // Pre-computed crack paths (main + branch)
  const cracks = [
    { d: "M 50 80 L 220 310 L 190 380",    bd: "M 220 310 L 280 280",   len: 380, blen: 80  },
    { d: "M 600 20 L 750 220 L 800 350",   bd: "M 750 220 L 810 190",   len: 380, blen: 80  },
    { d: "M 200 500 L 350 700",            bd: "M 350 700 L 400 680",   len: 240, blen: 60  },
    { d: "M 900 100 L 1050 350 L 1080 500",bd: "M 1050 350 L 1120 320", len: 450, blen: 90  },
    { d: "M 450 600 L 560 800",            bd: "M 560 800 L 610 770",   len: 220, blen: 55  },
  ];

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const lines  = svg.querySelectorAll<SVGPathElement>(".crack-main");
    const blines = svg.querySelectorAll<SVGPathElement>(".crack-branch");

    lines.forEach((line, i) => {
      const len = cracks[i]?.len ?? 300;
      gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(line, {
        strokeDashoffset: 0,
        duration: 1.2 + Math.random() * 0.8,
        delay: 0.5 + i * 0.35,
        ease: "power2.out",
        onComplete() {
          // Pulse after draw
          gsap.to(line, {
            opacity: 0.6, duration: 1.2, repeat: -1, yoyo: true, ease: "sine.inOut",
          });
        },
      });
    });

    blines.forEach((bl, i) => {
      const blen = cracks[i]?.blen ?? 80;
      gsap.set(bl, { strokeDasharray: blen, strokeDashoffset: blen });
      gsap.to(bl, {
        strokeDashoffset: 0,
        duration: 0.5,
        delay: 1.5 + i * 0.35,
        ease: "power2.out",
      });
    });
  }, []);   // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <svg
      ref={svgRef}
      aria-hidden
      viewBox="0 0 1200 900"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1, filter: `drop-shadow(0 0 6px ${glowColor})` }}
    >
      {cracks.map((c, i) => (
        <g key={i}>
          <path
            className="crack-main"
            d={c.d}
            fill="none"
            stroke={strokeColor}
            strokeWidth={isCalm ? 1.5 : 2}
            opacity={isCalm ? 0.55 : 0.85}
          />
          <path
            className="crack-branch"
            d={c.bd}
            fill="none"
            stroke={strokeColor}
            strokeWidth={isCalm ? 1 : 1.5}
            opacity={isCalm ? 0.35 : 0.55}
          />
        </g>
      ))}
    </svg>
  );
}

// ── Glitch strips ──────────────────────────────────────────
function GlitchStrips({ isCalm }: { isCalm: boolean }) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const interval = isCalm ? 9000 : 4000;

    const trigger = () => {
      const i   = Math.floor(Math.random() * refs.current.length);
      const el  = refs.current[i];
      if (!el) return;
      const shift = (isCalm ? 3 : 10) + Math.random() * (isCalm ? 3 : 8);
      gsap.to(el, {
        x: shift, duration: 0.05, ease: "none",
        onComplete() {
          gsap.to(el, { x: 0, duration: 0.02, ease: "none" });
        },
      });
    };

    const id = setInterval(trigger, interval + Math.random() * interval);
    return () => clearInterval(id);
  }, [isCalm]);

  return (
    <>
      {[15, 32, 54, 71, 88].map((yPct, i) => (
        <div
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          className="absolute left-0 right-0 pointer-events-none"
          style={{
            top:      `${yPct}%`,
            height:   `${10 + Math.random() * 30}px`,
            background: "transparent",
            willChange: "transform",
            zIndex: 2,
          }}
        />
      ))}
    </>
  );
}

// ── Main ──────────────────────────────────────────────────
export default function CyberpunkCrackBg({ isCalm = false }: CyberpunkCrackBgProps) {
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* Canvas mesh — mixed cyan+green nodes, cursor scatter */}
      <CrackMeshCanvas isCalm={isCalm} />

      {/* SVG diagonal crack lines, drawn on mount */}
      <CrackLines isCalm={isCalm} />

      {/* Glitch strips */}
      <GlitchStrips isCalm={isCalm} />

      {/* CRT scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 3,
          background: `repeating-linear-gradient(
            0deg,
            rgba(0,0,0,${isCalm ? "0.05" : "0.12"}) 0px,
            rgba(0,0,0,${isCalm ? "0.05" : "0.12"}) 1px,
            transparent 1px,
            transparent 3px
          )`,
        }}
      />
    </div>
  );
}
