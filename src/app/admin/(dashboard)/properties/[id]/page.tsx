"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/page-header";
import { PropertyForm, type PropertyFormValue } from "@/components/admin/property-form";
import { AdminFormSkeleton } from "@/components/admin/loading";
import { useAdminItem, useAdminMutations } from "@/hooks/use-admin-resource";
import type { Property } from "@/types";
import { toast } from "sonner";

export default function EditPropertyPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { data: property, isLoading } = useAdminItem<Property>("properties", params.id);
  const { update } = useAdminMutations<Property>("properties");

  const handleSubmit = async (value: PropertyFormValue) => {
    try {
      await update.mutateAsync({ id: params.id, body: value });
      toast.success("Property updated");
      router.push("/admin/properties");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update property");
    }
  };

  return (
    <div>
      <AdminPageHeader title="Edit Property" description={property?.title} />
      {isLoading ? (
        <AdminFormSkeleton />
      ) : property ? (
        <PropertyForm initialValue={property} onSubmit={handleSubmit} isSubmitting={update.isPending} submitLabel="Save Changes" />
      ) : (
        <p style={{ color: "var(--text-muted)" }}>Property not found.</p>
      )}
    </div>
  );
}
