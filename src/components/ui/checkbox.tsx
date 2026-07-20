import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function Checkbox({
  checked,
  onChange,
  label,
  className,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  className?: string;
}) {
  return (
    <label className={cn("flex items-center gap-2.5 cursor-pointer text-sm select-none", className)} style={{ color: "var(--text-secondary)" }}>
      <span
        className="relative flex items-center justify-center w-4.5 h-4.5 rounded-md shrink-0 transition-colors"
        style={{
          width: "18px",
          height: "18px",
          background: checked ? "var(--primary)" : "var(--surface)",
          border: `1px solid ${checked ? "var(--primary)" : "var(--border)"}`,
        }}
      >
        {checked && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
      </span>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="sr-only" />
      {label}
    </label>
  );
}
