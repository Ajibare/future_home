import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");
    const errorId = error ? `${textareaId}-error` : undefined;
    const hintId = hint ? `${textareaId}-hint` : undefined;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-medium mb-2" style={{ color: "var(--text)" }}>
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          className={cn(
            "flex min-h-[100px] w-full rounded-xl px-4 py-3 text-sm transition-all duration-200 resize-none",
            "focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
          style={{
            borderColor: "var(--border)",
            background: "var(--surface)",
            color: "var(--text)",
          }}
          ref={ref}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={`${errorId || ""} ${hintId || ""}`.trim() || undefined}
          {...props}
        />
        {error && (
          <p id={errorId} className="mt-1.5 text-sm text-red-500" role="alert">{error}</p>
        )}
        {hint && !error && (
          <p id={hintId} className="mt-1.5 text-sm" style={{ color: "var(--text-muted)" }}>{hint}</p>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
