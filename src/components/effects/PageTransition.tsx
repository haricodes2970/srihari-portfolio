// ============================================================
// PAGE TRANSITION — srihari-portfolio
// TODO: Wraps children with Framer Motion page entrance
// Uses: usePageTransition hook (triggers slash on route change)
// Variant: fade up on enter
// ============================================================

"use client";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* TODO: motion.div with pageIn variants */}
      {children}
    </div>
  );
}
