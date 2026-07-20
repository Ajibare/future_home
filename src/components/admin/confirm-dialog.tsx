"use client";

import { AlertTriangle } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  isLoading,
  confirmLabel = "Delete",
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  isLoading?: boolean;
  confirmLabel?: string;
}) {
  return (
    <Dialog open={open} onClose={onClose} className="max-w-sm">
      <div className="flex flex-col items-center text-center pt-2">
        <div className="flex items-center justify-center w-12 h-12 rounded-full mb-4" style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}>
          <AlertTriangle className="h-6 w-6" />
        </div>
        <h3 className="font-semibold text-lg mb-2" style={{ color: "var(--text)" }}>{title}</h3>
        <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>{description}</p>
        <div className="flex gap-3 w-full">
          <Button variant="outline" fullWidth onClick={onClose} disabled={isLoading}>Cancel</Button>
          <Button fullWidth onClick={onConfirm} disabled={isLoading} loading={isLoading} style={{ background: "#ef4444" }}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
