import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-light-100 text-dark-800 dark:bg-dark-700 dark:text-light-200",
        primary: "bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300",
        success: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
        warning: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
        danger: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
        info: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
        outline: "border border-light-300 text-dark-700 dark:border-dark-600 dark:text-light-300",
        sold: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
        rented: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
        featured: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
        new: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
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

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, dot, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(badgeVariants({ variant, size }), className)} {...props}>
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