import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { Property } from "@/models/Property";
import { BlogPost } from "@/models/BlogPost";
import { Testimonial } from "@/models/Testimonial";
import { TeamMember } from "@/models/TeamMember";
import { Service } from "@/models/Service";
import { Settings } from "@/models/Settings";
import { MOCK_PROPERTIES, MOCK_BLOG_POSTS, MOCK_TESTIMONIALS } from "@/services/mock-data";
import { TEAM_MEMBERS, SERVICES, COMPANY_INFO, STATISTICS, WHY_CHOOSE_US } from "@/constants";

function stripMockId<T extends { id: string }>(item: T) {
  const { id: _id, ...rest } = item;
  return rest;
}

export async function POST(request: NextRequest) {
  const session = await requireAdmin(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const results: Record<string, number> = {};

  if ((await Property.countDocuments()) === 0) {
    const inserted = await Property.insertMany(MOCK_PROPERTIES.map(stripMockId));
    results.properties = inserted.length;
  }

  if ((await BlogPost.countDocuments()) === 0) {
    const inserted = await BlogPost.insertMany(MOCK_BLOG_POSTS.map(stripMockId));
    results.blogPosts = inserted.length;
  }

  if ((await Testimonial.countDocuments()) === 0) {
    const inserted = await Testimonial.insertMany(MOCK_TESTIMONIALS.map(stripMockId));
    results.testimonials = inserted.length;
  }

  if ((await TeamMember.countDocuments()) === 0) {
    const inserted = await TeamMember.insertMany(TEAM_MEMBERS.map(stripMockId));
    results.teamMembers = inserted.length;
  }

  if ((await Service.countDocuments()) === 0) {
    const inserted = await Service.insertMany(SERVICES.map(stripMockId));
    results.services = inserted.length;
  }

  await Settings.findOneAndUpdate(
    { key: "site" },
    { $setOnInsert: { key: "site", ...COMPANY_INFO, statistics: STATISTICS, whyChooseUs: WHY_CHOOSE_US } },
    { upsert: true }
  );
  results.settings = 1;

  return NextResponse.json({ success: true, seeded: results });
}
