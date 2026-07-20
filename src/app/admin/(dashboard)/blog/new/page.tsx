"use client";

import { useRouter } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/page-header";
import { BlogForm, type BlogFormValue } from "@/components/admin/blog-form";
import { useAdminMutations } from "@/hooks/use-admin-resource";
import type { BlogPost } from "@/types";
import { toast } from "sonner";

export default function NewBlogPostPage() {
  const router = useRouter();
  const { create } = useAdminMutations<BlogPost>("blog");

  const handleSubmit = async (value: BlogFormValue) => {
    try {
      await create.mutateAsync(value);
      toast.success("Post created");
      router.push("/admin/blog");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to create post");
    }
  };

  return (
    <div>
      <AdminPageHeader title="Write Blog Post" />
      <BlogForm onSubmit={handleSubmit} isSubmitting={create.isPending} submitLabel="Publish Post" />
    </div>
  );
}
