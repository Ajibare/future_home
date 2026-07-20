"use client";

import * as React from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, Star, EyeOff } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/page-header";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { AdminGridSkeleton } from "@/components/admin/loading";
import { ImageUploader } from "@/components/admin/image-uploader";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useAdminList, useAdminMutations } from "@/hooks/use-admin-resource";
import type { Testimonial } from "@/types";
import { toast } from "sonner";

type FormValue = Omit<Testimonial, "id" | "createdAt">;

const emptyValue: FormValue = { name: "", role: "", company: "", image: "", content: "", rating: 5, isActive: true };

export default function AdminTestimonialsPage() {
  const { data: testimonials, isLoading } = useAdminList<Testimonial>("testimonials");
  const { create, update, remove } = useAdminMutations<Testimonial>("testimonials");
  const [editing, setEditing] = React.useState<Testimonial | null>(null);
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [pendingDelete, setPendingDelete] = React.useState<Testimonial | null>(null);
  const [value, setValue] = React.useState<FormValue>(emptyValue);

  const openCreate = () => { setEditing(null); setValue(emptyValue); setIsFormOpen(true); };
  const openEdit = (t: Testimonial) => { setEditing(t); setValue(t); setIsFormOpen(true); };
  const update_ = <K extends keyof FormValue>(key: K, val: FormValue[K]) => setValue((v) => ({ ...v, [key]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.name.trim() || !value.content.trim()) return toast.error("Name and testimonial content are required");
    try {
      if (editing) {
        await update.mutateAsync({ id: editing.id, body: value });
        toast.success("Testimonial updated");
      } else {
        await create.mutateAsync(value);
        toast.success("Testimonial added");
      }
      setIsFormOpen(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save testimonial");
    }
  };

  const handleDelete = async () => {
    if (!pendingDelete) return;
    try {
      await remove.mutateAsync(pendingDelete.id);
      toast.success("Testimonial deleted");
      setPendingDelete(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete");
    }
  };

  return (
    <div>
      <AdminPageHeader title="Testimonials" description="Manage client reviews shown on the homepage." action={<Button onClick={openCreate}><Plus className="h-4 w-4" /> Add Testimonial</Button>} />

      {isLoading ? (
        <AdminGridSkeleton count={6} />
      ) : !testimonials?.length ? (
        <div className="rounded-2xl p-12 text-center" style={{ background: "var(--surface)", border: "1px dashed var(--border)" }}>
          <p style={{ color: "var(--text-muted)" }}>No testimonials yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div key={t.id} className="rounded-2xl p-5" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0" style={{ background: "var(--surface-hover)" }}>
                  {t.image && <Image src={t.image} alt={t.name} fill sizes="40px" className="object-cover" />}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm truncate" style={{ color: "var(--text)" }}>{t.name}</p>
                  <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>{t.role}</p>
                </div>
                {t.isActive === false && <EyeOff className="h-3.5 w-3.5 ml-auto shrink-0" style={{ color: "var(--text-muted)" }} />}
              </div>
              <div className="flex items-center gap-0.5 mb-2">
                {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />)}
              </div>
              <p className="text-xs line-clamp-3 mb-3" style={{ color: "var(--text-secondary)" }}>{t.content}</p>
              <div className="flex items-center justify-between">
                <Button variant="outline" size="sm" onClick={() => openEdit(t)}><Pencil className="h-3.5 w-3.5" /> Edit</Button>
                <Button variant="ghost" size="icon-sm" onClick={() => setPendingDelete(t)}><Trash2 className="h-4 w-4" style={{ color: "#ef4444" }} /></Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={isFormOpen} onClose={() => setIsFormOpen(false)} className="max-w-lg">
        <h3 className="font-semibold text-lg mb-4" style={{ color: "var(--text)" }}>{editing ? "Edit Testimonial" : "Add Testimonial"}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <ImageUploader label="Photo" value={value.image} onChange={(url) => update_("image", url)} folder="testimonials" aspect="aspect-square max-w-[120px]" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Name" value={value.name} onChange={(e) => update_("name", e.target.value)} required />
            <Input label="Role" value={value.role} onChange={(e) => update_("role", e.target.value)} />
          </div>
          <Input label="Company" value={value.company || ""} onChange={(e) => update_("company", e.target.value)} />
          <Textarea label="Testimonial" value={value.content} onChange={(e) => update_("content", e.target.value)} required />
          <div className="grid grid-cols-2 gap-4 items-end">
            <Input label="Rating (1-5)" type="number" min={1} max={5} value={value.rating} onChange={(e) => update_("rating", Number(e.target.value))} />
            <Checkbox label="Active" checked={value.isActive ?? true} onChange={(c) => update_("isActive", c)} />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={create.isPending || update.isPending} loading={create.isPending || update.isPending}>Save</Button>
          </div>
        </form>
      </Dialog>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        onClose={() => setPendingDelete(null)}
        onConfirm={handleDelete}
        isLoading={remove.isPending}
        title="Delete this testimonial?"
        description={`The testimonial from "${pendingDelete?.name}" will be permanently removed.`}
      />
    </div>
  );
}
