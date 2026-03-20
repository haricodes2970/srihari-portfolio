"use client";

// ============================================================
// PARTICLE MESH — cursor-reactive floating node network
// Dots connected by lines; nodes drift toward cursor.
// Used as the primary background on every section.
// Reference: aptifolio.com/themes (Synaptic / Data-Mesh style)
// ============================================================

import { useEffect, useRef } from "react";

interface Node {
  x: number; y: number;
  vx: number; vy: number;
  baseVx: number; baseVy: number;
  radius: number;
  alpha: number;
}

interface ParticleMeshProps {
  /** RGB string, no rgba() wrapper — e.g. "0,255,106" */
  nodeColor?:      string;
  lineColor?:      string;
  /** Desktop node count */
  count?:          number;
  /** Max px distance for a connection line */
  connectDist?:    number;
  /** Node drift speed multiplier */
  speed?:          number;
  /** Overall canvas opacity (0-1) */
  opacity?:        number;
}

export default function ParticleMesh({
  nodeColor   = "0,255,106",
  lineColor   = "0,255,106",
  count       = 80,
  connectDist = 160,
  speed       = 1,
  opacity     = 0.55,
}: ParticleMeshProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse     = useRef({ x: -9999, y: -9999 });
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const pref = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (pref.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── Resize handler ─────────────────────────────────────
    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width  = width;
      canvas.height = height;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // ── Build node pool ────────────────────────────────────
    const isMobile   = window.innerWidth < 768;
    const nodeCount  = isMobile ? Math.round(count * 0.35) : count;

    const nodes: Node[] = Array.from({ length: nodeCount }, () => {
      const vx = (Math.random() - 0.5) * 0.4 * speed;
      const vy = (Math.random() - 0.5) * 0.4 * speed;
      return {
        x:      Math.random() * canvas.width,
        y:      Math.random() * canvas.height,
        vx, vy,
        baseVx: vx,
        baseVy: vy,
        radius: 1.2 + Math.random() * 1.8,
        alpha:  0.35 + Math.random() * 0.5,
      };
    });

    // ── Mouse tracking ─────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 }; };
    window.addEventListener("mousemove", onMove,  { passive: true });
    window.addEventListener("mouseleave", onLeave, { passive: true });

    // ── Draw loop ──────────────────────────────────────────
    const CURSOR_R = 200;   // cursor influence radius

    const tick = () => {
      const W = canvas.width;
      const H = canvas.height;

      ctx.clearRect(0, 0, W, H);

      const mx = mouse.current.x;
      const my = mouse.current.y;

      // Update positions
      nodes.forEach((n) => {
        const dx = mx - n.x;
        const dy = my - n.y;
        const d  = Math.hypot(dx, dy);

        if (d < CURSOR_R && d > 1) {
          // Gentle attraction toward cursor
          const f = (1 - d / CURSOR_R) * 0.022;
          n.vx += (dx / d) * f;
          n.vy += (dy / d) * f;
        }

        // Soft damping — drifts back toward natural speed
        n.vx = n.vx * 0.993 + n.baseVx * 0.007;
        n.vy = n.vy * 0.993 + n.baseVy * 0.007;

        n.x += n.vx;
        n.y += n.vy;

        // Bounce off walls
        if (n.x < 0)    { n.x = 0; n.vx = Math.abs(n.vx); n.baseVx = Math.abs(n.baseVx); }
        if (n.x > W)    { n.x = W; n.vx = -Math.abs(n.vx); n.baseVx = -Math.abs(n.baseVx); }
        if (n.y < 0)    { n.y = 0; n.vy = Math.abs(n.vy); n.baseVy = Math.abs(n.baseVy); }
        if (n.y > H)    { n.y = H; n.vy = -Math.abs(n.vy); n.baseVy = -Math.abs(n.baseVy); }
      });

      // ── Draw node-to-node connection lines ─────────────
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d < connectDist) {
            const a = (1 - d / connectDist) * 0.35;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(${lineColor},${a})`;
            ctx.stroke();
          }
        }
      }

      // ── Draw cursor-to-node lines (web-of-light effect) ─
      if (mx > -999) {
        ctx.lineWidth = 0.4;
        nodes.forEach((n) => {
          const d = Math.hypot(mx - n.x, my - n.y);
          if (d < CURSOR_R) {
            const a = (1 - d / CURSOR_R) * 0.45;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(mx, my);
            ctx.strokeStyle = `rgba(${lineColor},${a})`;
            ctx.stroke();
          }
        });
      }

      // ── Draw nodes ─────────────────────────────────────
      nodes.forEach((n) => {
        const d   = Math.hypot(mx - n.x, my - n.y);
        const hot = d < CURSOR_R;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius + (hot ? 0.8 : 0), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${nodeColor},${hot ? Math.min(n.alpha + 0.2, 1) : n.alpha})`;
        ctx.fill();

        // Glow halo on nodes near cursor
        if (hot) {
          const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius * 4);
          glow.addColorStop(0, `rgba(${nodeColor},${(1 - d / CURSOR_R) * 0.25})`);
          glow.addColorStop(1, `rgba(${nodeColor},0)`);
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius * 4, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize",    resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [nodeColor, lineColor, count, connectDist, speed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 w-full h-full"
      style={{ opacity, zIndex: 0, pointerEvents: "none" }}
    />
  );
}
