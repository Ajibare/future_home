import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { LegalPage } from "@/models/LegalPage";

function serialize(doc: Record<string, unknown>) {
  const { _id, __v, ...rest } = doc;
  return { id: String(_id), ...rest };
}

export async function GET(_request: NextRequest, context: { params: Promise<{ slug: string }> }) {
  await connectDB();
  const { slug } = await context.params;
  const doc = await LegalPage.findOne({ slug }).lean();
  if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(serialize(doc as Record<string, unknown>));
}

export async function PUT(request: NextRequest, context: { params: Promise<{ slug: string }> }) {
  const session = await requireAdmin(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const { slug } = await context.params;
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  delete body.slug;
  try {
    const doc = await LegalPage.findOneAndUpdate(
      { slug },
      { $set: body },
      { new: true, upsert: true, runValidators: true }
    ).lean();
    return NextResponse.json(serialize(doc as Record<string, unknown>));
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to update page";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
