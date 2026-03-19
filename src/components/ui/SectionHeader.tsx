// ============================================================
// SECTION HEADER — srihari-portfolio
// TODO: Eyebrow label + main title + optional description
// Props: eyebrow, title, description
// ============================================================

"use client";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export default function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  // TODO: Implement with reveal animation
  return (
    <div>
      <p>{eyebrow}</p>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
