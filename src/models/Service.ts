import mongoose, { Schema } from "mongoose";
import { applyIdTransform } from "@/lib/schema-utils";

const ServiceSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    icon: { type: String, default: "home" },
    image: String,
    features: { type: [String], default: [] },
    ctaText: String,
    ctaLink: String,
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

applyIdTransform(ServiceSchema);

export const Service = mongoose.models.Service || mongoose.model("Service", ServiceSchema);
