"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/page-header";
import { AdminFormSkeleton } from "@/components/admin/loading";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAdminItem, useAdminMutations } from "@/hooks/use-admin-resource";
import { LEGAL_PAGES_SEED } from "@/services/legal-seed-data";
import type { LegalPageContent } from "@/types";
import { toast } from "sonner";

const LABELS: Record<string, string> = {
  privacy: "Privacy Policy",
  terms: "Terms of Service",
  cookies: "Cookie Policy",
  accessibility: "Accessibility Statement",
};

type FormValue = Omit<LegalPageContent, "id">;

export default function EditLegalPage() {
  const router = useRouter();
  const params = useParams<{ slug: string }>();
  const slug = params.slug as FormValue["slug"];
  const { data, isLoading, isError } = useAdminItem<LegalPageContent>("legal", slug);
  const { update } = useAdminMutations<LegalPageContent>("legal");
  const [value, setValue] = React.useState<FormValue | null>(null);

  React.useEffect(() => {
    if (data) {
      setValue(data);
    } else if (isError && !isLoading) {
      const fallback = LEGAL_PAGES_SEED.find((p) => p.slug === slug);
      setValue(
        fallback
          ? { ...fallback, sections: fallback.sections.map((s) => ({ ...s })) }
          : { slug, title: LABELS[slug] || slug, lastUpdated: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }), intro: "", sections: [] }
      );
    }
  }, [data, isError, isLoading, slug]);

  const update_ = <K extends keyof FormValue>(key: K, val: FormValue[K]) => setValue((v) => (v ? { ...v, [key]: val } : v));
  const updateSection = (index: number, patch: Partial<FormValue["sections"][number]>) =>
    setValue((v) => (v ? { ...v, sections: v.sections.map((s, i) => (i === index ? { ...s, ...patch } : s)) } : v));
  const addSection = () =>
    setValue((v) => (v ? { ...v, sections: [...v.sections, { heading: `${v.sections.length + 1}. New Section`, body: "" }] } : v));
  const removeSection = (index: number) => setValue((v) => (v ? { ...v, sections: v.sections.filter((_, i) => i !== index) } : v));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value) return;
    if (!value.title.trim()) return toast.error("Title is required");
    try {
      await update.mutateAsync({ id: slug, body: value });
      toast.success("Page updated");
      router.push("/admin/legal");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update page");
    }
  };

  return (
    <div>
      <AdminPageHeader title={`Edit ${LABELS[slug] || slug}`} description={`Shown publicly at /${slug}`} />
      {isLoading || !value ? (
        <AdminFormSkeleton />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 pb-20 max-w-3xl">
          <div className="rounded-2xl p-5 sm:p-6 space-y-4" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
            <Input label="Page Title" value={value.title} onChange={(e) => update_("title", e.target.value)} required />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Last Updated" value={value.lastUpdated} onChange={(e) => update_("lastUpdated", e.target.value)} placeholder="e.g. July 20, 2026" />
            </div>
            <Textarea label="Intro Paragraph" value={value.intro} onChange={(e) => update_("intro", e.target.value)} />
          </div>

          <div className="space-y-4">
            {value.sections.map((section, i) => (
              <div key={i} className="rounded-2xl p-5 sm:p-6 space-y-3" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                <div className="flex items-center justify-between gap-3">
                  <Input value={section.heading} onChange={(e) => updateSection(i, { heading: e.target.value })} placeholder="Section heading" className="flex-1" />
                  <button type="button" onClick={() => removeSection(i)} aria-label="Remove section">
                    <Trash2 className="h-4 w-4" style={{ color: "#ef4444" }} />
                  </button>
                </div>
                <Textarea
                  value={section.body}
                  onChange={(e) => updateSection(i, { body: e.target.value })}
                  className="min-h-32"
                  hint="Blank line = new paragraph. Lines starting with “- ” become a bullet list. Use **bold** and [link text](url) for formatting."
                />
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addSection}><Plus className="h-4 w-4" /> Add Section</Button>
          </div>

          <div className="fixed bottom-0 left-0 right-0 lg:left-64 z-20 p-4 flex justify-end gap-3" style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
            <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
            <Button type="submit" disabled={update.isPending} loading={update.isPending}>Save Changes</Button>
          </div>
        </form>
      )}
    </div>
  );
}
