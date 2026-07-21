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
  const [unreadCount, recent] = await Promise.all([
    Message.countDocuments({ status: "new" }),
    Message.find().sort({ createdAt: -1 }).limit(6).lean(),
  ]);

  return NextResponse.json({
    unreadCount,
    recent: recent.map((d) => serialize(d as Record<string, unknown>)),
  });
}

export async function PATCH(request: NextRequest) {
  const session = await requireAdmin(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  await Message.updateMany({ status: "new" }, { $set: { status: "read" } });
  return NextResponse.json({ success: true });
}
