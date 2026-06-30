"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function PageSkeleton({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn("w-full space-y-6 p-6", className)}
    >
      <div className="space-y-3">
        <div className="h-8 w-1/3 rounded-lg animate-pulse" style={{ background: "var(--surface-hover)" }} />
        <div className="h-4 w-1/2 rounded-lg animate-pulse" style={{ background: "var(--border)" }} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-2xl overflow-hidden shadow-soft" style={{ background: "var(--surface)" }}>
            <div className="aspect-[4/3] animate-pulse" style={{ background: "var(--border)" }} />
            <div className="p-4 space-y-3">
              <div className="h-5 w-3/4 rounded animate-pulse" style={{ background: "var(--surface-hover)" }} />
              <div className="h-4 w-1/2 rounded animate-pulse" style={{ background: "var(--border)" }} />
              <div className="h-4 w-full rounded animate-pulse" style={{ background: "var(--border)" }} />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function SkeletonLoader({ rows = 3, className }: { rows?: number; className?: string }) {
  return (
    <div className={cn("space-y-4", className)}>
      {[...Array(rows)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="h-16 rounded-xl animate-pulse"
          style={{ background: "var(--surface-hover)" }}
        />
      ))}
    </div>
  );
}
