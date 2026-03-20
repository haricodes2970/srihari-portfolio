"use client";

// ============================================================
// PARTICLE MESH — cursor-reactive floating node network
// Floating dots connected by lines; nodes pull toward cursor.
// Reference: aptifolio.com/themes (Synaptic / Responsive styles)
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
  nodeColor?:   string;   // RGB only — e.g. "0,255,106"
  lineColor?:   string;
  count?:       number;   // desktop node count
  connectDist?: number;   // max connection px
  speed?:       number;
  opacity?:     number;   // overall canvas opacity
  noCursor?:    boolean;  // disable cursor interaction (ambient drift only)
}

export default function ParticleMesh({
  nodeColor   = "0,255,106",
  lineColor   = "0,255,106",
  count       = 85,
  connectDist = 165,
  speed       = 1,
  opacity     = 0.75,
  noCursor    = false,
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

    let nodes: Node[] = [];
    let W = 0;
    let H = 0;

    // ── Initialise nodes (called once we have real dimensions) ─
    const buildNodes = (w: number, h: number) => {
      const isMobile = w < 768;
      const n        = isMobile ? Math.round(count * 0.38) : count;
      nodes = Array.from({ length: n }, () => {
        const vx = (Math.random() - 0.5) * 0.45 * speed;
        const vy = (Math.random() - 0.5) * 0.45 * speed;
        return {
          x: Math.random() * w,  y: Math.random() * h,
          vx, vy, baseVx: vx, baseVy: vy,
          radius: 1.4 + Math.random() * 2,
          alpha:  0.55 + Math.random() * 0.4,
        };
      });
    };

    // ── Resize: use parentElement.clientWidth (reliable for abs canvas) ─
    const resize = () => {
      const parent = canvas.parentElement;
      const newW   = parent ? parent.clientWidth  : window.innerWidth;
      const newH   = parent ? parent.clientHeight : window.innerHeight;

      if (newW <= 0 || newH <= 0) return;  // not laid out yet

      const firstTime = W === 0;
      canvas.width  = newW;
      canvas.height = newH;
      W = newW;
      H = newH;

      if (firstTime) buildNodes(W, H);
    };

    // ResizeObserver fires when parent actually has dimensions
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    resize();  // also try immediately

    window.addEventListener("resize", resize, { passive: true });

    // ── Mouse ──────────────────────────────────────────────
    const onMove  = (e: MouseEvent) => {
      if (noCursor) return;
      const r = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 }; };
    window.addEventListener("mousemove",  onMove,  { passive: true });
    window.addEventListener("mouseleave", onLeave, { passive: true });

    // ── Draw loop ──────────────────────────────────────────
    const CURSOR_R = 210;

    const tick = () => {
      // Wait until we have valid dimensions and nodes
      if (W === 0 || H === 0 || nodes.length === 0) {
        resize();  // keep retrying
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      ctx.clearRect(0, 0, W, H);
      const mx = mouse.current.x;
      const my = mouse.current.y;

      // ── Update positions ────────────────────────────────
      for (const n of nodes) {
        const dx = mx - n.x;
        const dy = my - n.y;
        const d  = Math.hypot(dx, dy);

        if (d < CURSOR_R && d > 1) {
          const f = (1 - d / CURSOR_R) * 0.025;
          n.vx += (dx / d) * f;
          n.vy += (dy / d) * f;
        }

        // Damping — drift back to natural velocity
        n.vx = n.vx * 0.992 + n.baseVx * 0.008;
        n.vy = n.vy * 0.992 + n.baseVy * 0.008;
        n.x += n.vx;
        n.y += n.vy;

        // Wall bounce
        if (n.x < 0)  { n.x = 0; n.vx = Math.abs(n.vx);  n.baseVx =  Math.abs(n.baseVx); }
        if (n.x > W)  { n.x = W; n.vx = -Math.abs(n.vx); n.baseVx = -Math.abs(n.baseVx); }
        if (n.y < 0)  { n.y = 0; n.vy = Math.abs(n.vy);  n.baseVy =  Math.abs(n.baseVy); }
        if (n.y > H)  { n.y = H; n.vy = -Math.abs(n.vy); n.baseVy = -Math.abs(n.baseVy); }
      }

      // ── Node-to-node edges ──────────────────────────────
      ctx.lineWidth = 0.65;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d < connectDist) {
            const a = (1 - d / connectDist) * 0.45;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(${lineColor},${a})`;
            ctx.stroke();
          }
        }
      }

      // ── Cursor web — lines from nearby nodes to cursor ──
      if (mx > -999) {
        ctx.lineWidth = 0.5;
        for (const n of nodes) {
          const d = Math.hypot(mx - n.x, my - n.y);
          if (d < CURSOR_R) {
            const a = (1 - d / CURSOR_R) * 0.55;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(mx, my);
            ctx.strokeStyle = `rgba(${lineColor},${a})`;
            ctx.stroke();
          }
        }
      }

      // ── Draw nodes ──────────────────────────────────────
      for (const n of nodes) {
        const d   = Math.hypot(mx - n.x, my - n.y);
        const hot = mx > -999 && d < CURSOR_R;
        const r   = n.radius + (hot ? 1.2 : 0);
        const a   = hot ? Math.min(n.alpha + 0.35, 1) : n.alpha;

        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${nodeColor},${a})`;
        ctx.fill();

        // Glow halo when near cursor
        if (hot) {
          const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 4.5);
          glow.addColorStop(0, `rgba(${nodeColor},${(1 - d / CURSOR_R) * 0.35})`);
          glow.addColorStop(1, `rgba(${nodeColor},0)`);
          ctx.beginPath();
          ctx.arc(n.x, n.y, r * 4.5, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("resize",     resize);
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [nodeColor, lineColor, count, connectDist, speed, noCursor]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 w-full h-full"
      style={{ opacity, zIndex: 0, pointerEvents: "none", display: "block" }}
    />
  );
}
