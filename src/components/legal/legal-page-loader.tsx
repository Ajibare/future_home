"use client";

import { LegalPage } from "@/components/legal/legal-page";
import { useLegalPage } from "@/hooks/use-content";
import { renderRichText } from "@/lib/rich-text";
import { Skeleton } from "@/components/ui/skeleton";

export function LegalPageLoader({ slug }: { slug: "privacy" | "terms" | "cookies" | "accessibility" }) {
  const { data, isLoading, isError } = useLegalPage(slug);

  if (isLoading || !data) {
    return (
      <div className="pt-24 pb-20" style={{ background: "var(--bg)" }}>
        <div className="container max-w-3xl mx-auto">
          <Skeleton className="h-4 w-32 mb-8" />
          <Skeleton className="h-9 w-2/3 mb-3" />
          <Skeleton className="h-4 w-40 mb-10" />
          <Skeleton className="h-20 w-full mb-10" />
          <div className="space-y-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="pt-24 pb-20 text-center" style={{ background: "var(--bg)" }}>
        <p style={{ color: "var(--text-muted)" }}>This page isn&apos;t available right now.</p>
      </div>
    );
  }

  return (
    <LegalPage
      title={data.title}
      lastUpdated={data.lastUpdated}
      intro={data.intro}
      sections={data.sections.map((s) => ({ heading: s.heading, body: renderRichText(s.body) }))}
    />
  );
}
