"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ImageUploader } from "@/components/admin/image-uploader";
import type { Property, PropertyImages } from "@/types";
import { toast } from "sonner";

const PROPERTY_TYPE_OPTIONS = ["apartment", "house", "duplex", "townhouse", "penthouse", "villa", "commercial", "land", "office", "retail", "warehouse"].map((v) => ({ value: v, label: v[0].toUpperCase() + v.slice(1) }));
const STATUS_OPTIONS = ["for-sale", "for-rent", "sold", "rented", "off-market"].map((v) => ({ value: v, label: v.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase()) }));
const CATEGORY_OPTIONS = ["residential", "commercial", "land", "luxury"].map((v) => ({ value: v, label: v[0].toUpperCase() + v.slice(1) }));
const LISTING_TYPE_OPTIONS = [{ value: "sale", label: "For Sale" }, { value: "rent", label: "For Rent" }];
const AREA_UNIT_OPTIONS = [{ value: "sqft", label: "sq ft" }, { value: "sqm", label: "sq m" }];

const AMENITY_GROUPS: { title: string; keys: (keyof Property["amenities"])[] }[] = [
  { title: "Interior", keys: ["airConditioning", "heating", "furnished", "kitchenAppliances", "washerDryer", "walkInCloset", "fireplace", "balcony"] },
  { title: "Building", keys: ["elevator", "security", "concierge", "gym", "pool", "spa", "tennisCourt", "basketballCourt", "playground", "garden", "rooftop"] },
  { title: "Utilities", keys: ["internet", "cableTv", "intercom", "cctv", "backupGenerator", "solarPower", "waterTreatment"] },
  { title: "Accessibility", keys: ["wheelchairAccessible", "petFriendly"] },
];

function amenityLabel(key: string) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
}

const emptyAmenities = Object.fromEntries(AMENITY_GROUPS.flatMap((g) => g.keys).map((k) => [k, false])) as unknown as Property["amenities"];

export type PropertyFormValue = Omit<Property, "id" | "createdAt" | "updatedAt" | "views" | "favoritesCount"> & { isActive?: boolean };

const emptyValue: PropertyFormValue = {
  title: "",
  description: "",
  shortDescription: "",
  type: "apartment",
  status: "for-sale",
  category: "residential",
  listingType: "sale",
  price: 0,
  currency: "NGN",
  location: { address: "", city: "", state: "", country: "Nigeria", neighborhood: "" },
  features: { bedrooms: 0, bathrooms: 0, parkingSpaces: 0, area: 0, areaUnit: "sqft" },
  amenities: emptyAmenities,
  images: [],
  agent: {
    id: "agent-1",
    name: "",
    title: "Agent",
    email: "",
    phone: "",
    image: "",
    bio: "",
    yearsExperience: 0,
    specialties: [],
    languages: [],
    social: {},
    rating: 5,
    reviewCount: 0,
    propertiesCount: 0,
  },
  isFeatured: false,
  isVerified: false,
  isActive: true,
};

export function PropertyForm({
  initialValue,
  onSubmit,
  isSubmitting,
  submitLabel,
}: {
  initialValue?: Partial<PropertyFormValue>;
  onSubmit: (value: PropertyFormValue) => Promise<void>;
  isSubmitting: boolean;
  submitLabel: string;
}) {
  const router = useRouter();
  const [value, setValue] = React.useState<PropertyFormValue>({ ...emptyValue, ...initialValue });

  const update = <K extends keyof PropertyFormValue>(key: K, val: PropertyFormValue[K]) => setValue((v) => ({ ...v, [key]: val }));
  const updateNested = <K extends "location" | "features" | "agent">(key: K, patch: Partial<PropertyFormValue[K]>) =>
    setValue((v) => ({ ...v, [key]: { ...v[key], ...patch } }));

  const addImage = () => {
    const newImage: PropertyImages = { id: `img-${Date.now()}`, url: "", alt: value.title || "Property image", isPrimary: value.images.length === 0, order: value.images.length };
    update("images", [...value.images, newImage]);
  };
  const updateImage = (index: number, url: string) => {
    const next = [...value.images];
    next[index] = { ...next[index], url };
    update("images", next);
  };
  const removeImage = (index: number) => {
    const next = value.images.filter((_, i) => i !== index).map((img, i) => ({ ...img, order: i }));
    update("images", next);
  };
  const setPrimaryImage = (index: number) => {
    update("images", value.images.map((img, i) => ({ ...img, isPrimary: i === index })));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.title.trim()) return toast.error("Title is required");
    if (!value.location.city.trim()) return toast.error("City is required");
    // if (!value.agent.name.trim() || !value.agent.email.trim()) return toast.error("Agent name and email are required");
    if (value.price <= 0) return toast.error("Price must be greater than 0");
    await onSubmit(value);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-20">
      <Section title="Basic Information">
        <Input label="Title" value={value.title} onChange={(e) => update("title", e.target.value)} required />
        <Textarea label="Short Description" value={value.shortDescription} onChange={(e) => update("shortDescription", e.target.value)} hint="Shown in property cards" />
        <Textarea label="Full Description" value={value.description} onChange={(e) => update("description", e.target.value)} className="min-h-[160px]" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select label="Property Type" options={PROPERTY_TYPE_OPTIONS} value={value.type} onChange={(v) => update("type", v as PropertyFormValue["type"])} />
          <Select label="Category" options={CATEGORY_OPTIONS} value={value.category} onChange={(v) => update("category", v as PropertyFormValue["category"])} />
          <Select label="Listing Type" options={LISTING_TYPE_OPTIONS} value={value.listingType} onChange={(v) => update("listingType", v as PropertyFormValue["listingType"])} />
          <Select label="Status" options={STATUS_OPTIONS} value={value.status} onChange={(v) => update("status", v as PropertyFormValue["status"])} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Price (NGN)" type="number" min={0} value={value.price} onChange={(e) => update("price", Number(e.target.value))} required />
          <Input label="Currency" value={value.currency} onChange={(e) => update("currency", e.target.value)} />
        </div>
        <div className="flex flex-wrap gap-6 pt-1">
          <Checkbox label="Featured" checked={value.isFeatured} onChange={(c) => update("isFeatured", c)} />
          <Checkbox label="Verified" checked={value.isVerified} onChange={(c) => update("isVerified", c)} />
          <Checkbox label="Active (visible on site)" checked={value.isActive ?? true} onChange={(c) => update("isActive", c)} />
        </div>
      </Section>

      <Section title="Location">
        <Input label="Address" value={value.location.address} onChange={(e) => updateNested("location", { address: e.target.value })} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="City" value={value.location.city} onChange={(e) => updateNested("location", { city: e.target.value })} required />
          <Input label="State" value={value.location.state} onChange={(e) => updateNested("location", { state: e.target.value })} />
          <Input label="Neighborhood" value={value.location.neighborhood || ""} onChange={(e) => updateNested("location", { neighborhood: e.target.value })} />
          <Input label="Landmark" value={value.location.landmark || ""} onChange={(e) => updateNested("location", { landmark: e.target.value })} />
        </div>
      </Section>

      <Section title="Features">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <Input label="Bedrooms" type="number" min={0} value={value.features.bedrooms} onChange={(e) => updateNested("features", { bedrooms: Number(e.target.value) })} />
          <Input label="Bathrooms" type="number" min={0} value={value.features.bathrooms} onChange={(e) => updateNested("features", { bathrooms: Number(e.target.value) })} />
          <Input label="Parking Spaces" type="number" min={0} value={value.features.parkingSpaces} onChange={(e) => updateNested("features", { parkingSpaces: Number(e.target.value) })} />
          <Input label="Area" type="number" min={0} value={value.features.area} onChange={(e) => updateNested("features", { area: Number(e.target.value) })} />
          <Select label="Area Unit" options={AREA_UNIT_OPTIONS} value={value.features.areaUnit} onChange={(v) => updateNested("features", { areaUnit: v as "sqft" | "sqm" })} />
          <Input label="Year Built" type="number" value={value.features.yearBuilt || ""} onChange={(e) => updateNested("features", { yearBuilt: Number(e.target.value) })} />
        </div>
      </Section>

      <Section title="Images">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {value.images.map((img, i) => (
            <div key={img.id} className="relative">
              <ImageUploader value={img.url} onChange={(url) => updateImage(i, url)} folder="properties" />
              <div className="flex items-center justify-between mt-2">
                <button type="button" onClick={() => setPrimaryImage(i)} className="flex items-center gap-1 text-xs" style={{ color: img.isPrimary ? "var(--primary)" : "var(--text-muted)" }}>
                  <Star className={`h-3.5 w-3.5 ${img.isPrimary ? "fill-current" : ""}`} /> {img.isPrimary ? "Primary" : "Set primary"}
                </button>
                <button type="button" onClick={() => removeImage(i)} className="text-xs flex items-center gap-1" style={{ color: "#ef4444" }}>
                  <Trash2 className="h-3.5 w-3.5" /> Remove
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addImage}
            className="aspect-video rounded-xl flex flex-col items-center justify-center gap-2 text-sm"
            style={{ border: "1px dashed var(--border)", color: "var(--text-muted)" }}
          >
            <Plus className="h-5 w-5" /> Add Image
          </button>
        </div>
      </Section>

      <Section title="Amenities">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {AMENITY_GROUPS.map((group) => (
            <div key={group.title}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--text-muted)" }}>{group.title}</p>
              <div className="grid grid-cols-1 gap-2.5">
                {group.keys.map((key) => (
                  <Checkbox
                    key={key}
                    label={amenityLabel(key)}
                    checked={Boolean(value.amenities[key])}
                    onChange={(c) => update("amenities", { ...value.amenities, [key]: c })}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* <Section title="Listing Agent">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Name" value={value.agent.name} onChange={(e) => updateNested("agent", { name: e.target.value })} required />
          <Input label="Title" value={value.agent.title} onChange={(e) => updateNested("agent", { title: e.target.value })} />
          <Input label="Email" type="email" value={value.agent.email} onChange={(e) => updateNested("agent", { email: e.target.value })} required />
          <Input label="Phone" value={value.agent.phone} onChange={(e) => updateNested("agent", { phone: e.target.value })} />
          <Input label="WhatsApp" value={value.agent.whatsapp || ""} onChange={(e) => updateNested("agent", { whatsapp: e.target.value })} />
        </div>
        <ImageUploader label="Agent Photo" value={value.agent.image} onChange={(url) => updateNested("agent", { image: url })} folder="agents" aspect="aspect-square max-w-[160px]" />
        <Textarea label="Agent Bio" value={value.agent.bio} onChange={(e) => updateNested("agent", { bio: e.target.value })} />
      </Section> */}

      <div className="fixed bottom-0 left-0 right-0 lg:left-64 z-20 p-4 flex justify-end gap-3" style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
        <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
        <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>{submitLabel}</Button>
      </div>
    </form>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-5 sm:p-6 space-y-4" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
      <h3 className="font-semibold" style={{ color: "var(--text)" }}>{title}</h3>
      {children}
    </div>
  );
}
