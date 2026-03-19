"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "@/store/uiStore";

function Sword({ delay, height }: { delay: number; height: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center"
    >
      <div
        className="w-[3px] rounded-t-sm"
        style={{
          height,
          background: "linear-gradient(180deg, #00ff6a 0%, #00c44f 55%, #555 100%)",
          boxShadow: "0 0 12px rgba(0,255,106,0.5)",
        }}
      />
      <div className="w-5 h-[6px] bg-neutral-600 rounded-sm border border-neutral-500" />
      <div className="w-[6px] h-7 bg-neutral-700 rounded-b-sm" />
    </motion.div>
  );
}

export default function LoadingScreen() {
  const setLoading = useUIStore((s) => s.setLoading);
  const [barWidth, setBarWidth] = useState(0);
  const [visible, setVisible]   = useState(true);

  useEffect(() => {
    // Start filling the bar shortly after mount
    const t1 = setTimeout(() => setBarWidth(100), 120);

    // Hide after content is ready (min 2s)
    const hide = () => {
      setVisible(false);
      setTimeout(() => setLoading(false), 900);
    };

    let t2: ReturnType<typeof setTimeout>;
    const onLoad = () => { t2 = setTimeout(hide, 400); };

    if (document.readyState === "complete") {
      t2 = setTimeout(hide, 2000);
    } else {
      window.addEventListener("load", onLoad, { once: true });
      // Fallback: hide after 3s regardless
      t2 = setTimeout(hide, 3000);
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("load", onLoad);
    };
  }, [setLoading]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[99999] bg-void
                     flex flex-col items-center justify-center gap-10"
        >
          {/* Three swords */}
          <div className="flex items-end gap-5">
            <Sword delay={0.1} height={80}  />
            <Sword delay={0.25} height={112} />
            <Sword delay={0.4} height={80}  />
          </div>

          {/* Energy bar */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-52 h-[2px] bg-surface rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${barWidth}%`,
                  background: "linear-gradient(90deg, #007a30, #00ff6a)",
                  boxShadow: "0 0 8px rgba(0,255,106,0.5)",
                  transition: "width 1.9s cubic-bezier(0.16,1,0.3,1)",
                }}
              />
            </div>
            <p
              className="font-mono text-[10px] tracking-[5px] uppercase text-text-dim"
              style={{ animation: "blink 1.4s ease infinite" }}
            >
              Entering the Domain…
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
