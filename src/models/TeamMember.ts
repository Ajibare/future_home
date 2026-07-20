import mongoose, { Schema } from "mongoose";
import { applyIdTransform } from "@/lib/schema-utils";

const TeamMemberSchema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    bio: { type: String, default: "" },
    image: { type: String, default: "" },
    email: { type: String, required: true },
    phone: String,
    linkedin: String,
    twitter: String,
    instagram: String,
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

applyIdTransform(TeamMemberSchema);

export const TeamMember = mongoose.models.TeamMember || mongoose.model("TeamMember", TeamMemberSchema);
