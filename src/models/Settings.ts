import mongoose, { Schema } from "mongoose";
import { applyIdTransform } from "@/lib/schema-utils";

const SettingsSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, default: "site" },
    name: { type: String, required: true, default: "Future Homes Properties" },
    tagline: { type: String, default: "" },
    description: { type: String, default: "" },
    address: { type: String, default: "" },
    phone: { type: String, default: "" },
    phone2: { type: String, default: "" },
    email: { type: String, default: "" },
    whatsapp: { type: String, default: "" },
    hours: {
      weekdays: { type: String, default: "" },
      saturday: { type: String, default: "" },
      sunday: { type: String, default: "" },
    },
    social: {
      facebook: String,
      twitter: String,
      instagram: String,
      linkedin: String,
      youtube: String,
    },
    statistics: {
      type: [
        {
          _id: false,
          id: String,
          label: String,
          value: String,
          prefix: String,
          suffix: String,
        },
      ],
      default: [],
    },
    whyChooseUs: {
      type: [
        {
          _id: false,
          id: String,
          title: String,
          description: String,
          icon: String,
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

applyIdTransform(SettingsSchema);

export const Settings = mongoose.models.Settings || mongoose.model("Settings", SettingsSchema);
