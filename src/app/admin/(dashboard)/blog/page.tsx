"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, EyeOff } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/page-header";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAdminList, useAdminMutations } from "@/hooks/use-admin-resource";
import type { BlogPost } from "@/types";
import { toast } from "sonner";

export default function AdminBlogPage() {
  const { data: posts, isLoading } = useAdminList<BlogPost>("blog");
  const { remove } = useAdminMutations<BlogPost>("blog");
  const [pendingDelete, setPendingDelete] = React.useState<BlogPost | null>(null);

  const handleDelete = async () => {
    if (!pendingDelete) return;
    try {
      await remove.mutateAsync(pendingDelete.id);
      toast.success("Post deleted");
      setPendingDelete(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete");
    }
  };

  return (
    <div>
      <AdminPageHeader
        title="Blog Posts"
        description="Manage articles and market insights."
        action={<Link href="/admin/blog/new"><Button><Plus className="h-4 w-4" /> Write Post</Button></Link>}
      />

      {isLoading ? (
        <p style={{ color: "var(--text-muted)" }}>Loading posts...</p>
      ) : !posts?.length ? (
        <div className="rounded-2xl p-12 text-center" style={{ background: "var(--surface)", border: "1px dashed var(--border)" }}>
          <p style={{ color: "var(--text-muted)" }}>No blog posts yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <div key={post.id} className="rounded-2xl overflow-hidden" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
              <div className="relative aspect-video" style={{ background: "var(--surface-hover)" }}>
                {post.coverImage && <Image src={post.coverImage} alt="" fill sizes="360px" className="object-cover" />}
                {!post.isPublished && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-black/60 text-white">
                    <EyeOff className="h-3 w-3" /> Draft
                  </div>
                )}
              </div>
              <div className="p-4">
                <Badge variant="primary" className="mb-2">{post.category.name}</Badge>
                <h3 className="font-semibold text-sm line-clamp-2 mb-3" style={{ color: "var(--text)" }}>{post.title}</h3>
                <div className="flex items-center justify-between">
                  <Link href={`/admin/blog/${post.id}`}>
                    <Button variant="outline" size="sm"><Pencil className="h-3.5 w-3.5" /> Edit</Button>
                  </Link>
                  <Button variant="ghost" size="icon-sm" onClick={() => setPendingDelete(post)}>
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
        title="Delete this post?"
        description={`"${pendingDelete?.title}" will be permanently removed.`}
      />
    </div>
  );
}
