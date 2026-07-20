"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/admin/image-uploader";
import type { TeamMember } from "@/types";
import { toast } from "sonner";

export type TeamFormValue = Omit<TeamMember, "id">;

const emptyValue: TeamFormValue = {
  name: "",
  role: "",
  bio: "",
  image: "",
  email: "",
  phone: "",
  linkedin: "",
  twitter: "",
  instagram: "",
  order: 0,
  isActive: true,
};

export function TeamForm({
  initialValue,
  onSubmit,
  isSubmitting,
  submitLabel,
}: {
  initialValue?: Partial<TeamFormValue>;
  onSubmit: (value: TeamFormValue) => Promise<void>;
  isSubmitting: boolean;
  submitLabel: string;
}) {
  const router = useRouter();
  const [value, setValue] = React.useState<TeamFormValue>({ ...emptyValue, ...initialValue });
  const update = <K extends keyof TeamFormValue>(key: K, val: TeamFormValue[K]) => setValue((v) => ({ ...v, [key]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.name.trim() || !value.role.trim()) return toast.error("Name and role are required");
    await onSubmit(value);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-20 max-w-2xl">
      <div className="rounded-2xl p-5 sm:p-6 space-y-4" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
        <ImageUploader label="Photo" value={value.image} onChange={(url) => update("image", url)} folder="team" aspect="aspect-square max-w-[200px]" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Name" value={value.name} onChange={(e) => update("name", e.target.value)} required />
          <Input label="Role" value={value.role} onChange={(e) => update("role", e.target.value)} required />
        </div>
        <Textarea label="Bio" value={value.bio} onChange={(e) => update("bio", e.target.value)} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Email" type="email" value={value.email} onChange={(e) => update("email", e.target.value)} />
          <Input label="Phone" value={value.phone || ""} onChange={(e) => update("phone", e.target.value)} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input label="LinkedIn URL" value={value.linkedin || ""} onChange={(e) => update("linkedin", e.target.value)} />
          <Input label="Twitter URL" value={value.twitter || ""} onChange={(e) => update("twitter", e.target.value)} />
          <Input label="Instagram URL" value={value.instagram || ""} onChange={(e) => update("instagram", e.target.value)} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
          <Input label="Display Order" type="number" value={value.order} onChange={(e) => update("order", Number(e.target.value))} />
          <Checkbox label="Active (visible on site)" checked={value.isActive ?? true} onChange={(c) => update("isActive", c)} />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 lg:left-64 z-20 p-4 flex justify-end gap-3" style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
        <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
        <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>{submitLabel}</Button>
      </div>
    </form>
  );
}
