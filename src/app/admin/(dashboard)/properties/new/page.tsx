"use client";

import { useRouter } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/page-header";
import { PropertyForm, type PropertyFormValue } from "@/components/admin/property-form";
import { useAdminMutations } from "@/hooks/use-admin-resource";
import type { Property } from "@/types";
import { toast } from "sonner";

export default function NewPropertyPage() {
  const router = useRouter();
  const { create } = useAdminMutations<Property>("properties");

  const handleSubmit = async (value: PropertyFormValue) => {
    try {
      await create.mutateAsync(value);
      toast.success("Property created");
      router.push("/admin/properties");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to create property");
    }
  };

  return (
    <div>
      <AdminPageHeader title="Add Property" description="Create a new listing." />
      <PropertyForm onSubmit={handleSubmit} isSubmitting={create.isPending} submitLabel="Create Property" />
    </div>
  );
}
