// ============================================================
// CARD — srihari-portfolio
// TODO: Base card with border, hover effect, green top line
// Props: children, onClick, className
// ============================================================

"use client";

interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function Card({ children, onClick, className }: CardProps) {
  // TODO: Implement
  return <div onClick={onClick} className={className}>{children}</div>;
}
