import mongoose, { Schema } from "mongoose";
import { applyIdTransform } from "@/lib/schema-utils";

const LegalSectionSchema = new Schema(
  {
    heading: { type: String, required: true },
    body: { type: String, default: "" },
  },
  { _id: false }
);

const LegalPageSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, enum: ["privacy", "terms", "cookies", "accessibility"] },
    title: { type: String, required: true },
    lastUpdated: { type: String, default: "" },
    intro: { type: String, default: "" },
    sections: { type: [LegalSectionSchema], default: [] },
  },
  { timestamps: true }
);

applyIdTransform(LegalPageSchema);

export const LegalPage = mongoose.models.LegalPage || mongoose.model("LegalPage", LegalPageSchema);
