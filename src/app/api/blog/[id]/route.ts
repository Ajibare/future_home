import { BlogPost } from "@/models/BlogPost";
import { getUpdateDelete } from "@/lib/crud";

export const { GET, PUT, DELETE } = getUpdateDelete(BlogPost);
