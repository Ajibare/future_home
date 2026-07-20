import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Settings } from "@/models/Settings";
import { requireAdmin } from "@/lib/auth";

function serialize(doc: Record<string, unknown>) {
  const { _id, __v, ...rest } = doc;
  return { id: String(_id), ...rest };
}

export async function GET() {
  await connectDB();
  const doc = await Settings.findOneAndUpdate(
    { key: "site" },
    { $setOnInsert: { key: "site" } },
    { new: true, upsert: true }
  ).lean();
  return NextResponse.json(serialize(doc as Record<string, unknown>));
}

export async function PUT(request: NextRequest) {
  const session = await requireAdmin(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  delete body.key;
  try {
    const doc = await Settings.findOneAndUpdate(
      { key: "site" },
      { $set: body },
      { new: true, upsert: true, runValidators: true }
    ).lean();
    return NextResponse.json(serialize(doc as Record<string, unknown>));
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to update settings";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
