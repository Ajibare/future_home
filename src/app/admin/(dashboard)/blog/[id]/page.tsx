"use client";

import { useParams, useRouter } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/page-header";
import { BlogForm, type BlogFormValue } from "@/components/admin/blog-form";
import { useAdminItem, useAdminMutations } from "@/hooks/use-admin-resource";
import type { BlogPost } from "@/types";
import { toast } from "sonner";

export default function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { data: post, isLoading } = useAdminItem<BlogPost>("blog", params.id);
  const { update } = useAdminMutations<BlogPost>("blog");

  const handleSubmit = async (value: BlogFormValue) => {
    try {
      await update.mutateAsync({ id: params.id, body: value });
      toast.success("Post updated");
      router.push("/admin/blog");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update post");
    }
  };

  return (
    <div>
      <AdminPageHeader title="Edit Blog Post" description={post?.title} />
      {isLoading ? (
        <p style={{ color: "var(--text-muted)" }}>Loading...</p>
      ) : post ? (
        <BlogForm initialValue={post} onSubmit={handleSubmit} isSubmitting={update.isPending} submitLabel="Save Changes" />
      ) : (
        <p style={{ color: "var(--text-muted)" }}>Post not found.</p>
      )}
    </div>
  );
}
