import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all duration-200",
  {
    variants: {
      variant: {
        default: "",
        primary: "",
        success: "",
        warning: "",
        danger: "",
        info: "",
        outline: "border",
        sold: "",
        rented: "",
        featured: "",
        new: "",
      },
      size: {
        sm: "px-2 py-0.5 text-[10px]",
        default: "px-3 py-1 text-xs",
        lg: "px-4 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const variantStyles: Record<string, React.CSSProperties> = {
  default: { background: "var(--surface-hover)", color: "var(--text-secondary)" },
  primary: { background: "var(--primary-light)", color: "var(--primary-text)" },
  success: { background: "rgba(5, 150, 105, 0.1)", color: "var(--success)" },
  warning: { background: "rgba(245, 158, 11, 0.1)", color: "var(--accent)" },
  danger: { background: "rgba(220, 38, 38, 0.1)", color: "var(--danger)" },
  info: { background: "rgba(14, 165, 233, 0.1)", color: "#0ea5e9" },
  outline: { background: "transparent", borderColor: "var(--border)", color: "var(--text-secondary)" },
  sold: { background: "rgba(220, 38, 38, 0.1)", color: "var(--danger)" },
  rented: { background: "rgba(5, 150, 105, 0.1)", color: "var(--success)" },
  featured: { background: "rgba(245, 158, 11, 0.1)", color: "var(--accent)" },
  new: { background: "rgba(139, 92, 246, 0.1)", color: "#8b5cf6" },
};

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, dot, children, ...props }, ref) => {
    const style = variantStyles[variant || "default"] || variantStyles.default;
    return (
      <div ref={ref} className={cn(badgeVariants({ variant, size }), className)} style={style} {...props}>
        {dot && (
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
        )}
        {children}
      </div>
    );
  }
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
