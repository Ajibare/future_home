import mongoose, { Schema } from "mongoose";
import { applyIdTransform } from "@/lib/schema-utils";

const AuthorSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    title: { type: String, default: "" },
    image: { type: String, default: "" },
    bio: { type: String, default: "" },
    social: {
      linkedin: String,
      twitter: String,
      instagram: String,
    },
  },
  { _id: false }
);

const CategorySchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, default: "" },
    image: String,
    postCount: { type: Number, default: 0 },
  },
  { _id: false }
);

const BlogPostSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, default: "" },
    content: { type: String, default: "" },
    coverImage: { type: String, default: "" },
    author: { type: AuthorSchema, required: true },
    category: { type: CategorySchema, required: true },
    tags: { type: [String], default: [] },
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    publishedAt: { type: Date, default: Date.now },
    readTime: { type: Number, default: 3 },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: { type: [String], default: [] },
    },
  },
  { timestamps: true }
);

applyIdTransform(BlogPostSchema);

export const BlogPost = mongoose.models.BlogPost || mongoose.model("BlogPost", BlogPostSchema);
