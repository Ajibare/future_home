"use client";

import { useParams, useRouter } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/page-header";
import { TeamForm, type TeamFormValue } from "@/components/admin/team-form";
import { AdminFormSkeleton } from "@/components/admin/loading";
import { useAdminItem, useAdminMutations } from "@/hooks/use-admin-resource";
import type { TeamMember } from "@/types";
import { toast } from "sonner";

export default function EditTeamMemberPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { data: member, isLoading } = useAdminItem<TeamMember>("team", params.id);
  const { update } = useAdminMutations<TeamMember>("team");

  const handleSubmit = async (value: TeamFormValue) => {
    try {
      await update.mutateAsync({ id: params.id, body: value });
      toast.success("Team member updated");
      router.push("/admin/team");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update team member");
    }
  };

  return (
    <div>
      <AdminPageHeader title="Edit Team Member" description={member?.name} />
      {isLoading ? (
        <AdminFormSkeleton />
      ) : member ? (
        <TeamForm initialValue={member} onSubmit={handleSubmit} isSubmitting={update.isPending} submitLabel="Save Changes" />
      ) : (
        <p style={{ color: "var(--text-muted)" }}>Team member not found.</p>
      )}
    </div>
  );
}
