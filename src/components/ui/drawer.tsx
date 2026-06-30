"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position?: "left" | "right" | "bottom";
  className?: string;
  showClose?: boolean;
}

const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  ({ open, onClose, children, position = "left", className, showClose = true }, ref) => {
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

    const positionClasses = {
      left: "inset-y-0 left-0 w-full max-w-md animate-slide-right",
      right: "inset-y-0 right-0 w-full max-w-md animate-slide-left",
      bottom: "inset-x-0 bottom-0 h-auto max-h-[90vh] animate-slide-up",
    };

    if (!open) return null;

    return (
      <div ref={ref} className="fixed inset-0 z-50">
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
          onClick={onClose}
          aria-hidden="true"
        />
        <div
          className={cn(
            "absolute shadow-large",
            positionClasses[position],
            position === "bottom" && "rounded-t-3xl",
            (position === "left" || position === "right") && "rounded-r-3xl",
            className
          )}
          style={{ background: "var(--surface)" }}
          role="dialog"
          aria-modal="true"
        >
          {showClose && (
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full p-2 transition-colors"
              style={{ color: "var(--text-muted)" }}
              aria-label="Close drawer"
            >
              <X className="h-5 w-5" />
            </button>
          )}
          <div className="h-full overflow-y-auto p-6">{children}</div>
        </div>
      </div>
    );
  }
);
Drawer.displayName = "Drawer";

export { Drawer };