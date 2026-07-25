import mongoose, { Schema } from "mongoose";
import { applyIdTransform } from "@/lib/schema-utils";

const AMENITY_KEYS = [
  "airConditioning", "heating", "furnished", "kitchenAppliances", "washerDryer", "walkInCloset", "fireplace", "balcony",
  "elevator", "security", "concierge", "gym", "pool", "spa", "tennisCourt", "basketballCourt", "playground", "garden", "rooftop",
  "internet", "cableTv", "intercom", "cctv", "backupGenerator", "solarPower", "waterTreatment",
  "wheelchairAccessible", "petFriendly",
] as const;

const amenitiesSchemaDef = Object.fromEntries(
  AMENITY_KEYS.map((key) => [key, { type: Boolean, default: false }])
) as Record<(typeof AMENITY_KEYS)[number], { type: BooleanConstructor; default: false }>;

const LocationSchema = new Schema(
  {
    address: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    country: { type: String, required: true, default: "Nigeria" },
    postalCode: String,
    coordinates: {
      lat: Number,
      lng: Number,
    },
    neighborhood: String,
    landmark: String,
  },
  { _id: false }
);

const FeaturesSchema = new Schema(
  {
    bedrooms: { type: Number, default: 0 },
    bathrooms: { type: Number, default: 0 },
    parkingSpaces: { type: Number, default: 0 },
    area: { type: Number, default: 0 },
    areaUnit: { type: String, enum: ["sqft", "sqm"], default: "sqft" },
    yearBuilt: Number,
    floors: Number,
    floorNumber: Number,
  },
  { _id: false }
);

const ImageSchema = new Schema(
  {
    id: { type: String, default: "" },
    url: { type: String, default: "" },
    alt: { type: String, default: "" },
    isPrimary: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { _id: false }
);

const AgentSchema = new Schema(
  {
    id: { type: String, default: "" },
    name: { type: String, default: "" },
    title: { type: String, default: "Agent" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    whatsapp: String,
    image: { type: String, default: "" },
    bio: { type: String, default: "" },
    licenseNumber: String,
    yearsExperience: { type: Number, default: 0 },
    specialties: { type: [String], default: [] },
    languages: { type: [String], default: [] },
    social: {
      linkedin: String,
      twitter: String,
      instagram: String,
      facebook: String,
    },
    rating: { type: Number, default: 5 },
    reviewCount: { type: Number, default: 0 },
    propertiesCount: { type: Number, default: 0 },
  },
  { _id: false }
);

const NearbyPlaceSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, enum: ["school", "hospital", "restaurant", "shopping", "park", "transport", "bank", "other"] },
    distance: { type: Number, default: 0 },
    rating: Number,
  },
  { _id: false }
);

const DocumentSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, enum: ["pdf", "image", "doc"] },
    url: { type: String, required: true },
    size: { type: Number, default: 0 },
  },
  { _id: false }
);

const PropertySchema = new Schema(
  {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    shortDescription: { type: String, default: "" },
    type: {
      type: String,
      enum: ["apartment", "house", "duplex", "townhouse", "penthouse", "villa", "commercial", "land", "office", "retail", "warehouse"],
    },
    status: { type: String, enum: ["for-sale", "for-rent", "sold", "rented", "off-market"], default: "for-sale" },
    category: { type: String, enum: ["residential", "commercial", "land", "luxury"], default: "residential" },
    listingType: { type: String, enum: ["sale", "rent"] },
    price: { type: Number, default: 0 },
    pricePerSqFt: Number,
    currency: { type: String, default: "NGN" },
    location: { type: LocationSchema, default: () => ({}) },
    features: { type: FeaturesSchema, default: () => ({}) },
    amenities: { type: amenitiesSchemaDef, default: () => ({}) },
    images: { type: [ImageSchema], default: [] },
    agent: { type: AgentSchema, default: () => ({}) },
    isFeatured: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    views: { type: Number, default: 0 },
    favoritesCount: { type: Number, default: 0 },
    publishedAt: Date,
    virtualTourUrl: String,
    videoUrl: String,
    floorPlanUrl: String,
    documents: { type: [DocumentSchema], default: [] },
    nearbyPlaces: { type: [NearbyPlaceSchema], default: [] },
  },
  { timestamps: true }
);

applyIdTransform(PropertySchema);

export const Property = mongoose.models.Property || mongoose.model("Property", PropertySchema);
