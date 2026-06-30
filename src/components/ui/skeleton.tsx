import * as React from "react";
import { cn } from "@/lib/utils";

const Skeleton = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "animate-pulse rounded-xl",
          className
        )}
        style={{ background: "var(--surface-hover)" }}
        {...props}
      />
    );
  }
);
Skeleton.displayName = "Skeleton";

const SkeletonText = React.forwardRef<HTMLDivElement, { lines?: number; className?: string }>(
  ({ lines = 3, className }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-2", className)} aria-busy="true" aria-label="Loading content">
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton
            key={i}
            className={cn("h-4", i === lines - 1 ? "w-3/4" : "w-full")}
          />
        ))}
      </div>
    );
  }
);
SkeletonText.displayName = "SkeletonText";

const SkeletonCard = React.forwardRef<HTMLDivElement, { className?: string }>(
  ({ className }, ref) => {
    return (
      <div ref={ref} className={cn("rounded-2xl overflow-hidden", className)} aria-busy="true" aria-label="Loading property card">
        <Skeleton className="aspect-[4/3] w-full" />
        <div className="p-4 space-y-3">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    );
  }
);
SkeletonCard.displayName = "SkeletonCard";

const SkeletonPropertyGrid = React.forwardRef<HTMLDivElement, { count?: number; className?: string }>(
  ({ count = 6, className }, ref) => {
    return (
      <div ref={ref} className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)} aria-busy="true" aria-label="Loading properties">
        {Array.from({ length: count }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }
);
SkeletonPropertyGrid.displayName = "SkeletonPropertyGrid";

export { Skeleton, SkeletonText, SkeletonCard, SkeletonPropertyGrid };