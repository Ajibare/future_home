"use client";

import Link from "next/link";
import { FileText, Pencil } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/page-header";
import { AdminGridSkeleton } from "@/components/admin/loading";
import { Button } from "@/components/ui/button";
import { useAdminList } from "@/hooks/use-admin-resource";
import type { LegalPageContent } from "@/types";

const PAGES: { slug: LegalPageContent["slug"]; label: string; publicHref: string }[] = [
  { slug: "privacy", label: "Privacy Policy", publicHref: "/privacy" },
  { slug: "terms", label: "Terms of Service", publicHref: "/terms" },
  { slug: "cookies", label: "Cookie Policy", publicHref: "/cookies" },
  { slug: "accessibility", label: "Accessibility Statement", publicHref: "/accessibility" },
];

export default function AdminLegalPagesList() {
  const { data: pages, isLoading } = useAdminList<LegalPageContent>("legal");

  return (
    <div>
      <AdminPageHeader title="Legal Pages" description="Edit the Privacy Policy, Terms of Service, Cookie Policy, and Accessibility pages." />

      {isLoading ? (
        <AdminGridSkeleton count={4} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PAGES.map((page) => {
            const saved = pages?.find((p) => p.slug === page.slug);
            return (
              <div key={page.slug} className="rounded-2xl p-5" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                <div className="flex items-start gap-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0" style={{ background: "var(--primary-light)", color: "var(--primary)" }}>
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm" style={{ color: "var(--text)" }}>{saved?.title || page.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                      {saved ? `${saved.sections.length} sections · Updated ${saved.lastUpdated}` : "Not created yet"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Link href={`/admin/legal/${page.slug}`}>
                    <Button variant="outline" size="sm"><Pencil className="h-3.5 w-3.5" /> Edit</Button>
                  </Link>
                  <a href={page.publicHref} target="_blank" rel="noopener noreferrer" className="text-xs" style={{ color: "var(--primary)" }}>
                    View live page
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
