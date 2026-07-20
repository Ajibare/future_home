"use client";

import * as React from "react";
import { Plus, Pencil, Trash2, EyeOff, Wrench } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/page-header";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { AdminGridSkeleton } from "@/components/admin/loading";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useAdminList, useAdminMutations } from "@/hooks/use-admin-resource";
import type { Service } from "@/types";
import { toast } from "sonner";

type FormValue = Omit<Service, "id">;

const emptyValue: FormValue = { title: "", description: "", icon: "home", features: [], ctaText: "", ctaLink: "", order: 0, isActive: true };

const ICON_OPTIONS = [
  { value: "home", label: "Home" },
  { value: "key", label: "Key" },
  { value: "building-2", label: "Building" },
  { value: "trending-up", label: "Trending Up" },
  { value: "hammer", label: "Hammer" },
  { value: "scale", label: "Scale" },
];

export default function AdminServicesPage() {
  const { data: services, isLoading } = useAdminList<Service>("services");
  const { create, update, remove } = useAdminMutations<Service>("services");
  const [editing, setEditing] = React.useState<Service | null>(null);
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [pendingDelete, setPendingDelete] = React.useState<Service | null>(null);
  const [value, setValue] = React.useState<FormValue>(emptyValue);

  const openCreate = () => { setEditing(null); setValue(emptyValue); setIsFormOpen(true); };
  const openEdit = (s: Service) => { setEditing(s); setValue(s); setIsFormOpen(true); };
  const update_ = <K extends keyof FormValue>(key: K, val: FormValue[K]) => setValue((v) => ({ ...v, [key]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.title.trim()) return toast.error("Title is required");
    try {
      if (editing) {
        await update.mutateAsync({ id: editing.id, body: value });
        toast.success("Service updated");
      } else {
        await create.mutateAsync(value);
        toast.success("Service added");
      }
      setIsFormOpen(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save service");
    }
  };

  const handleDelete = async () => {
    if (!pendingDelete) return;
    try {
      await remove.mutateAsync(pendingDelete.id);
      toast.success("Service deleted");
      setPendingDelete(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete");
    }
  };

  return (
    <div>
      <AdminPageHeader title="Services" description="Manage the services listed on the site." action={<Button onClick={openCreate}><Plus className="h-4 w-4" /> Add Service</Button>} />

      {isLoading ? (
        <AdminGridSkeleton count={6} />
      ) : !services?.length ? (
        <div className="rounded-2xl p-12 text-center" style={{ background: "var(--surface)", border: "1px dashed var(--border)" }}>
          <p style={{ color: "var(--text-muted)" }}>No services yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...services].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).map((s) => (
            <div key={s.id} className="rounded-2xl p-5" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl" style={{ background: "var(--primary-light)", color: "var(--primary)" }}>
                  <Wrench className="h-5 w-5" />
                </div>
                {s.isActive === false && <EyeOff className="h-3.5 w-3.5" style={{ color: "var(--text-muted)" }} />}
              </div>
              <p className="font-semibold text-sm mb-1" style={{ color: "var(--text)" }}>{s.title}</p>
              <p className="text-xs line-clamp-2 mb-3" style={{ color: "var(--text-muted)" }}>{s.description}</p>
              <div className="flex items-center justify-between">
                <Button variant="outline" size="sm" onClick={() => openEdit(s)}><Pencil className="h-3.5 w-3.5" /> Edit</Button>
                <Button variant="ghost" size="icon-sm" onClick={() => setPendingDelete(s)}><Trash2 className="h-4 w-4" style={{ color: "#ef4444" }} /></Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={isFormOpen} onClose={() => setIsFormOpen(false)} className="max-w-lg">
        <h3 className="font-semibold text-lg mb-4" style={{ color: "var(--text)" }}>{editing ? "Edit Service" : "Add Service"}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Title" value={value.title} onChange={(e) => update_("title", e.target.value)} required />
          <Textarea label="Description" value={value.description} onChange={(e) => update_("description", e.target.value)} />
          <Select label="Icon" options={ICON_OPTIONS} value={value.icon} onChange={(v) => update_("icon", v)} />
          <Input
            label="Features"
            value={value.features.join(", ")}
            onChange={(e) => update_("features", e.target.value.split(",").map((f) => f.trim()).filter(Boolean))}
            hint="Comma-separated"
          />
          <div className="grid grid-cols-2 gap-4">
            <Input label="CTA Text" value={value.ctaText || ""} onChange={(e) => update_("ctaText", e.target.value)} />
            <Input label="CTA Link" value={value.ctaLink || ""} onChange={(e) => update_("ctaLink", e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4 items-end">
            <Input label="Display Order" type="number" value={value.order ?? 0} onChange={(e) => update_("order", Number(e.target.value))} />
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
        title="Delete this service?"
        description={`"${pendingDelete?.title}" will be permanently removed.`}
      />
    </div>
  );
}
