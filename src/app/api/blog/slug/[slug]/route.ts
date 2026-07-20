import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { BlogPost } from "@/models/BlogPost";
import { requireAdmin } from "@/lib/auth";

export async function GET(request: NextRequest, context: { params: Promise<{ slug: string }> }) {
  await connectDB();
  const { slug } = await context.params;
  const session = await requireAdmin(request);
  const query = session ? { slug } : { slug, isPublished: true };
  const doc = await BlogPost.findOne(query).lean();
  if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const { _id, __v, ...rest } = doc as Record<string, unknown>;
  return NextResponse.json({ id: String(_id), ...rest });
}
