import { BlogPost } from "@/models/BlogPost";
import { listAndCreate } from "@/lib/crud";

export const { GET, POST } = listAndCreate(BlogPost, "isPublished");
