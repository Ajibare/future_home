"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, EyeOff } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/page-header";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { Button } from "@/components/ui/button";
import { useAdminList, useAdminMutations } from "@/hooks/use-admin-resource";
import type { TeamMember } from "@/types";
import { toast } from "sonner";

export default function AdminTeamPage() {
  const { data: members, isLoading } = useAdminList<TeamMember>("team");
  const { remove } = useAdminMutations<TeamMember>("team");
  const [pendingDelete, setPendingDelete] = React.useState<TeamMember | null>(null);

  const handleDelete = async () => {
    if (!pendingDelete) return;
    try {
      await remove.mutateAsync(pendingDelete.id);
      toast.success("Team member removed");
      setPendingDelete(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete");
    }
  };

  return (
    <div>
      <AdminPageHeader
        title="Team"
        description="Manage the leadership team shown on the About page."
        action={<Link href="/admin/team/new"><Button><Plus className="h-4 w-4" /> Add Member</Button></Link>}
      />

      {isLoading ? (
        <p style={{ color: "var(--text-muted)" }}>Loading team...</p>
      ) : !members?.length ? (
        <div className="rounded-2xl p-12 text-center" style={{ background: "var(--surface)", border: "1px dashed var(--border)" }}>
          <p style={{ color: "var(--text-muted)" }}>No team members yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...members].sort((a, b) => a.order - b.order).map((member) => (
            <div key={member.id} className="rounded-2xl overflow-hidden" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
              <div className="relative aspect-square" style={{ background: "var(--surface-hover)" }}>
                {member.image && <Image src={member.image} alt={member.name} fill sizes="240px" className="object-cover" />}
                {member.isActive === false && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-black/60 text-white">
                    <EyeOff className="h-3 w-3" /> Hidden
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="font-semibold text-sm truncate" style={{ color: "var(--text)" }}>{member.name}</p>
                <p className="text-xs mb-3" style={{ color: "var(--primary)" }}>{member.role}</p>
                <div className="flex items-center justify-between">
                  <Link href={`/admin/team/${member.id}`}>
                    <Button variant="outline" size="sm"><Pencil className="h-3.5 w-3.5" /> Edit</Button>
                  </Link>
                  <Button variant="ghost" size="icon-sm" onClick={() => setPendingDelete(member)}>
                    <Trash2 className="h-4 w-4" style={{ color: "#ef4444" }} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        onClose={() => setPendingDelete(null)}
        onConfirm={handleDelete}
        isLoading={remove.isPending}
        title="Remove this team member?"
        description={`"${pendingDelete?.name}" will be permanently removed.`}
      />
    </div>
  );
}
