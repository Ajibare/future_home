import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { Message } from "@/models/Message";

function serialize(doc: Record<string, unknown>) {
  const { _id, __v, ...rest } = doc;
  return { id: String(_id), ...rest };
}

export async function GET(request: NextRequest) {
  const session = await requireAdmin(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await connectDB();
  const docs = await Message.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(docs.map((d) => serialize(d as Record<string, unknown>)));
}

export async function POST(request: NextRequest) {
  await connectDB();
  const body = await request.json().catch(() => null);
  if (!body || !body.email || !body.type) {
    return NextResponse.json({ error: "Email and type are required" }, { status: 400 });
  }
  try {
    const doc = await Message.create({
      type: body.type,
      name: body.name,
      email: body.email,
      phone: body.phone,
      subject: body.subject,
      message: body.message,
      status: "new",
    });
    return NextResponse.json(serialize(doc.toObject()), { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to send message";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
