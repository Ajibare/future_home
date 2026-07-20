import mongoose, { Schema } from "mongoose";
import { applyIdTransform } from "@/lib/schema-utils";

const TestimonialSchema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, default: "" },
    company: String,
    image: { type: String, default: "" },
    content: { type: String, required: true },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    propertyId: String,
    propertyTitle: String,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

applyIdTransform(TestimonialSchema);

export const Testimonial = mongoose.models.Testimonial || mongoose.model("Testimonial", TestimonialSchema);
