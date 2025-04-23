import { useEffect } from "react";

export function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm overflow-y-auto h-full w-full"
      onClick={onClose}
    >
      <div
        className="min-h-screen flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="animate-in fade-in-0 slide-in-from-bottom-5 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
