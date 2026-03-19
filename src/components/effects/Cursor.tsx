"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const slashRef = useRef<HTMLDivElement>(null);

  const mouse  = useRef({ x: 0, y: 0 });
  const ring   = useRef({ x: 0, y: 0 });
  const rafId  = useRef<number>(0);

  const [clicked,  setClicked]  = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // Hide on mobile / touch
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${e.clientX - 3.5}px, ${e.clientY - 3.5}px)`;
      }
    };

    const onClick = (e: MouseEvent) => {
      setClicked(true);
      if (slashRef.current) {
        slashRef.current.style.transform =
          `translate(${e.clientX - 20}px, ${e.clientY - 10}px)`;
      }
      setTimeout(() => setClicked(false), 150);
    };

    // Hover detection on interactive elements
    const onEnter = () => setHovering(true);
    const onLeave = () => setHovering(false);

    const addHoverListeners = () => {
      document
        .querySelectorAll("a, button, [role='button'], input, textarea")
        .forEach((el) => {
          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mouseleave", onLeave);
        });
    };
    addHoverListeners();

    // Smooth ring with rAF
    const animRing = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${ring.current.x - 14}px, ${ring.current.y - 14}px)`;
      }
      rafId.current = requestAnimationFrame(animRing);
    };
    rafId.current = requestAnimationFrame(animRing);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      cancelAnimationFrame(rafId.current);
      document
        .querySelectorAll("a, button, [role='button'], input, textarea")
        .forEach((el) => {
          el.removeEventListener("mouseenter", onEnter);
          el.removeEventListener("mouseleave", onLeave);
        });
    };
  }, []);

  return (
    <>
      {/* Main dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]
                   w-[7px] h-[7px] rounded-full bg-green-core"
        style={{ boxShadow: "0 0 10px #00ff6a, 0 0 20px rgba(0,255,106,0.3)" }}
      />

      {/* Lagging ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]
                   rounded-full border border-green-core
                   transition-[width,height,opacity] duration-200"
        style={{
          width: hovering ? 44 : 28,
          height: hovering ? 44 : 28,
          opacity: hovering ? 0.2 : 0.4,
        }}
      />

      {/* Click slash */}
      <div
        ref={slashRef}
        className="fixed top-0 left-0 pointer-events-none z-[9997]
                   transition-opacity duration-150"
        style={{ opacity: clicked ? 1 : 0 }}
      >
        <div
          className="w-9 h-[2px] rounded-full"
          style={{
            background: "linear-gradient(90deg, transparent, #00ff6a, #fff, #00ff6a, transparent)",
            boxShadow: "0 0 8px #00ff6a",
            transform: "rotate(-35deg)",
          }}
        />
        <div
          className="w-6 h-[1.5px] rounded-full mt-1 ml-1.5"
          style={{
            background: "linear-gradient(90deg, transparent, #00ff6a, transparent)",
            transform: "rotate(20deg)",
            opacity: 0.6,
          }}
        />
      </div>
    </>
  );
}
