// ============================================================
// BUTTON — srihari-portfolio
// TODO: Primary (green filled) + Secondary (outline) variants
// Props: variant, children, onClick, href, className
// ============================================================

"use client";

interface ButtonProps {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export default function Button({ variant = "primary", children, onClick, href, className }: ButtonProps) {
  // TODO: Implement
  return <button onClick={onClick} className={className}>{children}</button>;
}
