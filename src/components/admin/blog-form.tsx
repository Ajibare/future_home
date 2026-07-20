"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/admin/image-uploader";
import type { BlogPost } from "@/types";
import { toast } from "sonner";

export type BlogFormValue = Omit<BlogPost, "id" | "createdAt" | "updatedAt" | "views" | "likes">;

const emptyValue: BlogFormValue = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImage: "",
  author: { id: "author-fh", name: "Future Homes Properties", title: "Real Estate Expert", image: "", bio: "", social: {} },
  category: { id: "cat-general", name: "General", slug: "general", description: "", postCount: 0 },
  tags: [],
  isFeatured: false,
  isPublished: true,
  publishedAt: new Date().toISOString(),
  readTime: 5,
  seo: {},
};

function slugify(text: string) {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function BlogForm({
  initialValue,
  onSubmit,
  isSubmitting,
  submitLabel,
}: {
  initialValue?: Partial<BlogFormValue>;
  onSubmit: (value: BlogFormValue) => Promise<void>;
  isSubmitting: boolean;
  submitLabel: string;
}) {
  const router = useRouter();
  const [value, setValue] = React.useState<BlogFormValue>({ ...emptyValue, ...initialValue });
  const [slugTouched, setSlugTouched] = React.useState(Boolean(initialValue?.slug));

  const update = <K extends keyof BlogFormValue>(key: K, val: BlogFormValue[K]) => setValue((v) => ({ ...v, [key]: val }));

  const handleTitleChange = (title: string) => {
    update("title", title);
    if (!slugTouched) update("slug", slugify(title));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.title.trim()) return toast.error("Title is required");
    if (!value.slug.trim()) return toast.error("Slug is required");
    await onSubmit(value);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-20">
      <Section title="Post Details">
        <Input label="Title" value={value.title} onChange={(e) => handleTitleChange(e.target.value)} required />
        <Input
          label="Slug"
          value={value.slug}
          onChange={(e) => { setSlugTouched(true); update("slug", slugify(e.target.value)); }}
          hint={`URL: /blog/${value.slug || "..."}`}
          required
        />
        <Textarea label="Excerpt" value={value.excerpt} onChange={(e) => update("excerpt", e.target.value)} hint="Shown in post previews" />
        <Textarea label="Content" value={value.content} onChange={(e) => update("content", e.target.value)} className="min-h-60" />
        <ImageUploader label="Cover Image" value={value.coverImage} onChange={(url) => update("coverImage", url)} folder="blog" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Category Name" value={value.category.name} onChange={(e) => update("category", { ...value.category, name: e.target.value, slug: slugify(e.target.value) })} />
          <Input label="Read Time (minutes)" type="number" min={1} value={value.readTime} onChange={(e) => update("readTime", Number(e.target.value))} />
        </div>
        <Input
          label="Tags"
          value={value.tags.join(", ")}
          onChange={(e) => update("tags", e.target.value.split(",").map((t) => t.trim()).filter(Boolean))}
          hint="Comma-separated"
        />
        <div className="flex flex-wrap gap-6 pt-1">
          <Checkbox label="Featured" checked={value.isFeatured} onChange={(c) => update("isFeatured", c)} />
          <Checkbox label="Published" checked={value.isPublished} onChange={(c) => update("isPublished", c)} />
        </div>
      </Section>

      <Section title="Author">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Author Name" value={value.author.name} onChange={(e) => update("author", { ...value.author, name: e.target.value })} />
          <Input label="Author Title" value={value.author.title} onChange={(e) => update("author", { ...value.author, title: e.target.value })} />
        </div>
        <ImageUploader label="Author Photo" value={value.author.image} onChange={(url) => update("author", { ...value.author, image: url })} folder="authors" aspect="aspect-square max-w-[160px]" />
        <Textarea label="Author Bio" value={value.author.bio} onChange={(e) => update("author", { ...value.author, bio: e.target.value })} />
      </Section>

      <div className="fixed bottom-0 left-0 right-0 lg:left-64 z-20 p-4 flex justify-end gap-3" style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
        <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
        <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>{submitLabel}</Button>
      </div>
    </form>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-5 sm:p-6 space-y-4" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
      <h3 className="font-semibold" style={{ color: "var(--text)" }}>{title}</h3>
      {children}
    </div>
  );
}
