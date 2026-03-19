// ============================================================
// useCursor — tracks mouse position for custom cursor
// ============================================================

"use client";

import { useEffect, useRef, useState } from "react";

export function useCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [hovering, setHovering] = useState(false);
  const rafRef = useRef<number>(0);
  const targetRef = useRef({ x: 0, y: 0 });
  const ringRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      setPos({ x: e.clientX, y: e.clientY });
    };

    const onClick = () => {
      setClicked(true);
      setTimeout(() => setClicked(false), 150);
    };

    // Track hover on interactive elements
    const onEnter = () => setHovering(true);
    const onLeave = () => setHovering(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);

    const interactives = document.querySelectorAll(
      "a, button, [role='button'], .interactive"
    );
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    // Smooth ring follow via rAF
    const animateRing = () => {
      ringRef.current.x += (targetRef.current.x - ringRef.current.x) * 0.12;
      ringRef.current.y += (targetRef.current.y - ringRef.current.y) * 0.12;
      rafRef.current = requestAnimationFrame(animateRing);
    };
    rafRef.current = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return { pos, ringPos: ringRef.current, clicked, hovering };
}
