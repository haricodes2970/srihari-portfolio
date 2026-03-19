// ============================================================
// MODAL — srihari-portfolio
// TODO: Project detail modal with backdrop blur
// Uses: useUIStore (activeModal, closeModal)
// Framer Motion: fade in/scale up, fade out on close
// Keyboard: Escape closes
// ============================================================

"use client";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  // TODO: Implement with AnimatePresence
  if (!isOpen) return null;
  return (
    <div onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
