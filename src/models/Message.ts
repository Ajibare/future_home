import mongoose, { Schema } from "mongoose";
import { applyIdTransform } from "@/lib/schema-utils";

const MessageSchema = new Schema(
  {
    type: { type: String, enum: ["contact", "newsletter"], required: true },
    name: String,
    email: { type: String, required: true },
    phone: String,
    subject: String,
    message: String,
    status: { type: String, enum: ["new", "read", "archived"], default: "new" },
  },
  { timestamps: true }
);

applyIdTransform(MessageSchema);

export const Message = mongoose.models.Message || mongoose.model("Message", MessageSchema);
