"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  overlayClassName?: string;
}

const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  ({ open, onClose, children, className, overlayClassName }, ref) => {
    React.useEffect(() => {
      if (open) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
      return () => {
        document.body.style.overflow = "";
      };
    }, [open]);

    React.useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      if (open) document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }, [open, onClose]);

    if (!open) return null;

    return (
      <div ref={ref} className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className={cn("absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in", overlayClassName)}
          onClick={onClose}
          aria-hidden="true"
        />
        <div
          className={cn(
            "relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-large animate-scale-in dark:bg-dark-800",
            className
          )}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-2 text-light-500 hover:bg-light-100 hover:text-dark-900 transition-colors dark:text-dark-400 dark:hover:bg-dark-700 dark:hover:text-light-50"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
          {children}
        </div>
      </div>
    );
  }
);
Dialog.displayName = "Dialog";

export { Dialog };