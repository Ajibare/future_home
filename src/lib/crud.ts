import { NextRequest, NextResponse } from "next/server";
import type { Model } from "mongoose";
import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/db";

function serialize(doc: Record<string, unknown>) {
  const { _id, __v, ...rest } = doc;
  return { id: String(_id), ...rest };
}

function errorMessage(err: unknown, fallback: string) {
  return err instanceof Error ? err.message : fallback;
}

export function listAndCreate(model: Model<Record<string, unknown>>, publishedField = "isActive") {
  async function GET(request: NextRequest) {
    await connectDB();
    const session = await requireAdmin(request);
    const query = session ? {} : { [publishedField]: true };
    const docs = await model.find(query).sort({ createdAt: -1 }).lean();
    return NextResponse.json(docs.map((d) => serialize(d as Record<string, unknown>)));
  }

  async function POST(request: NextRequest) {
    const session = await requireAdmin(request);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    await connectDB();
    const body = await request.json().catch(() => null);
    if (!body) return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    try {
      const doc = await model.create(body);
      return NextResponse.json(serialize(doc.toObject()), { status: 201 });
    } catch (err) {
      return NextResponse.json({ error: errorMessage(err, "Failed to create") }, { status: 400 });
    }
  }

  return { GET, POST };
}

export function getUpdateDelete(model: Model<Record<string, unknown>>) {
  async function GET(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
    await connectDB();
    const { id } = await context.params;
    const doc = await model.findById(id).lean();
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(serialize(doc as Record<string, unknown>));
  }

  async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    const session = await requireAdmin(request);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    await connectDB();
    const { id } = await context.params;
    const body = await request.json().catch(() => null);
    if (!body) return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    try {
      const doc = await model.findByIdAndUpdate(id, body, { new: true, runValidators: true }).lean();
      if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json(serialize(doc as Record<string, unknown>));
    } catch (err) {
      return NextResponse.json({ error: errorMessage(err, "Failed to update") }, { status: 400 });
    }
  }

  async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    const session = await requireAdmin(request);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    await connectDB();
    const { id } = await context.params;
    const doc = await model.findByIdAndDelete(id).lean();
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  }

  return { GET, PUT, DELETE };
}
