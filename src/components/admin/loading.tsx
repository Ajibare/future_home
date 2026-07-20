import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function AdminLoader({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24" role="status" aria-live="polite">
      <Loader2 className="h-6 w-6 animate-spin" style={{ color: "var(--primary)" }} />
      <p className="text-sm" style={{ color: "var(--text-muted)" }}>{label}</p>
    </div>
  );
}

export function AdminTableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "var(--surface)", border: "1px solid var(--border)" }} aria-busy="true" aria-label="Loading list">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4" style={{ borderBottom: i === rows - 1 ? "none" : "1px solid var(--border)" }}>
          <Skeleton className="w-14 h-11 shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-1/4" />
          </div>
          <Skeleton className="h-8 w-20 rounded-lg" />
        </div>
      ))}
    </div>
  );
}

export function AdminGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" aria-busy="true" aria-label="Loading grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-2xl overflow-hidden" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <Skeleton className="aspect-[4/3] w-full rounded-none" />
          <div className="p-4 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function AdminFormSkeleton() {
  return (
    <div className="space-y-6 max-w-2xl" aria-busy="true" aria-label="Loading form">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="rounded-2xl p-5 sm:p-6 space-y-4" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-11 w-full" />
          <Skeleton className="h-11 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      ))}
    </div>
  );
}

export function AdminStatsSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" aria-busy="true" aria-label="Loading stats">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-2xl p-5" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <Skeleton className="w-11 h-11 rounded-xl mb-4" />
          <Skeleton className="h-7 w-16 mb-2" />
          <Skeleton className="h-4 w-24" />
        </div>
      ))}
    </div>
  );
}
