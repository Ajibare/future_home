import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { Property } from "@/models/Property";
import { BlogPost } from "@/models/BlogPost";
import { TeamMember } from "@/models/TeamMember";
import { Testimonial } from "@/models/Testimonial";
import { Service } from "@/models/Service";
import { Message } from "@/models/Message";

export async function GET(request: NextRequest) {
  const session = await requireAdmin(request);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const [properties, activeProperties, featuredProperties, blogPosts, teamMembers, testimonials, services, unreadMessages] = await Promise.all([
    Property.countDocuments(),
    Property.countDocuments({ isActive: true }),
    Property.countDocuments({ isFeatured: true }),
    BlogPost.countDocuments(),
    TeamMember.countDocuments(),
    Testimonial.countDocuments(),
    Service.countDocuments(),
    Message.countDocuments({ status: "new" }),
  ]);

  return NextResponse.json({ properties, activeProperties, featuredProperties, blogPosts, teamMembers, testimonials, services, unreadMessages });
}
