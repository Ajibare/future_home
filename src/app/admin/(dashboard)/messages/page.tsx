"use client";

import * as React from "react";
import { Mail, MessageSquare, Trash2, Circle, CheckCircle2 } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/page-header";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { AdminTableSkeleton } from "@/components/admin/loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAdminList, useAdminMutations } from "@/hooks/use-admin-resource";
import type { SiteMessage } from "@/types";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";

const TYPE_LABEL: Record<SiteMessage["type"], string> = { contact: "Contact Form", newsletter: "Newsletter Signup" };

export default function AdminMessagesPage() {
  const { data: messages, isLoading } = useAdminList<SiteMessage>("messages");
  const { update, remove } = useAdminMutations<SiteMessage>("messages");
  const [pendingDelete, setPendingDelete] = React.useState<SiteMessage | null>(null);
  const [filter, setFilter] = React.useState<"all" | "contact" | "newsletter">("all");

  const filtered = (messages || []).filter((m) => filter === "all" || m.type === filter);

  const markRead = async (message: SiteMessage) => {
    if (message.status !== "new") return;
    try {
      await update.mutateAsync({ id: message.id, body: { status: "read" } });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update message");
    }
  };

  const handleDelete = async () => {
    if (!pendingDelete) return;
    try {
      await remove.mutateAsync(pendingDelete.id);
      toast.success("Message deleted");
      setPendingDelete(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete");
    }
  };

  return (
    <div>
      <AdminPageHeader title="Messages" description="Contact form submissions and newsletter signups." />

      <div className="flex items-center gap-2 mb-6">
        {(["all", "contact", "newsletter"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
            style={filter === f ? { background: "var(--primary)", color: "#fff" } : { background: "var(--surface)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}
          >
            {f === "all" ? "All" : TYPE_LABEL[f]}
          </button>
        ))}
      </div>

      {isLoading ? (
        <AdminTableSkeleton rows={5} />
      ) : !filtered.length ? (
        <div className="rounded-2xl p-12 text-center" style={{ background: "var(--surface)", border: "1px dashed var(--border)" }}>
          <p style={{ color: "var(--text-muted)" }}>No messages yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((m) => (
            <div
              key={m.id}
              onClick={() => markRead(m)}
              className="rounded-2xl p-5 cursor-pointer"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="flex items-center justify-center w-9 h-9 rounded-full shrink-0" style={{ background: "var(--primary-light)", color: "var(--primary)" }}>
                    {m.type === "newsletter" ? <Mail className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-sm" style={{ color: "var(--text)" }}>{m.name || m.email}</p>
                      {m.status === "new" && <Circle className="h-2 w-2 fill-current" style={{ color: "var(--primary)" }} />}
                      <Badge variant="default">{TYPE_LABEL[m.type]}</Badge>
                    </div>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{m.email}{m.phone ? ` · ${m.phone}` : ""}</p>
                    {m.subject && <p className="text-sm font-medium mt-2" style={{ color: "var(--text)" }}>{m.subject}</p>}
                    {m.message && <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>{m.message}</p>}
                    <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>{formatDate(m.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {m.status === "new" && <CheckCircle2 className="h-4 w-4" style={{ color: "var(--text-muted)" }} />}
                  <Button variant="ghost" size="icon-sm" onClick={(e) => { e.stopPropagation(); setPendingDelete(m); }}>
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
        title="Delete this message?"
        description="This message will be permanently removed."
      />
    </div>
  );
}
