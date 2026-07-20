"use client";

import { useRouter } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/page-header";
import { TeamForm, type TeamFormValue } from "@/components/admin/team-form";
import { useAdminMutations } from "@/hooks/use-admin-resource";
import type { TeamMember } from "@/types";
import { toast } from "sonner";

export default function NewTeamMemberPage() {
  const router = useRouter();
  const { create } = useAdminMutations<TeamMember>("team");

  const handleSubmit = async (value: TeamFormValue) => {
    try {
      await create.mutateAsync(value);
      toast.success("Team member added");
      router.push("/admin/team");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to add team member");
    }
  };

  return (
    <div>
      <AdminPageHeader title="Add Team Member" />
      <TeamForm onSubmit={handleSubmit} isSubmitting={create.isPending} submitLabel="Add Member" />
    </div>
  );
}
