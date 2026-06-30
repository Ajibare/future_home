"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Share2, ArrowUpDown, Bed, Bath, Maximize, MapPin, Eye } from "lucide-react";
import { cn, formatCurrency, truncate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { usePropertyStore } from "@/stores";
import type { Property } from "@/types";
import { toast } from "sonner";

interface PropertyCardProps {
  property: Property;
  className?: string;
  variant?: "default" | "featured" | "compact";
}

const statusVariantMap: Record<string, "primary" | "info" | "success" | "danger" | "warning"> = {
  "for-sale": "primary",
  "for-rent": "info",
  "sold": "danger",
  "rented": "success",
  "off-market": "warning",
};

export function PropertyCard({ property, className, variant = "default" }: PropertyCardProps) {
  const { toggleWishlist, isInCompare, addToCompare } = usePropertyStore();
  const isInWishlist = usePropertyStore((s) => s.isInWishlist(property.id));

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/properties/${property.id}`;
    if (navigator.share) {
      await navigator.share({ title: property.title, url });
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(property.id);
    toast.success(isInWishlist ? "Removed from wishlist" : "Added to wishlist");
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInCompare(property.id)) return;
    addToCompare(property.id);
    toast.success("Added to compare");
  };

  const primaryImage = property.images.find((img) => img.isPrimary) || property.images[0];

  if (variant === "compact") {
    return (
      <Link href={`/properties/${property.id}`}>
        <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className={cn("group flex gap-4 p-3 rounded-xl transition-all duration-300", className)} style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <div className="relative w-28 h-28 rounded-lg overflow-hidden shrink-0">
            <img src={primaryImage.url} alt={primaryImage.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
            <div>
              <p className="font-semibold text-sm truncate" style={{ color: "var(--text)" }}>{property.title}</p>
              <p className="text-xs flex items-center gap-1 mt-1" style={{ color: "var(--text-muted)" }}>
                <MapPin className="h-3 w-3" /> {property.location.neighborhood}, {property.location.city}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-bold text-sm" style={{ color: "var(--primary)" }}>{formatCurrency(property.price)}</p>
              <Badge variant={statusVariantMap[property.status]} size="sm">
                {property.status.replace("-", " ")}
              </Badge>
            </div>
          </div>
        </motion.div>
      </Link>
    );
  }

  return (
    <Link href={`/properties/${property.id}`}>
      <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3, ease: "easeOut" as const }} className={cn("group rounded-2xl overflow-hidden transition-all duration-300", className)} style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <img src={primaryImage.url} alt={primaryImage.alt} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge variant={statusVariantMap[property.status]}>
              {property.status.replace("-", " ")}
            </Badge>
            {property.isFeatured && <Badge variant="featured">Featured</Badge>}
          </div>
          <div className="absolute top-3 right-3 flex gap-2">
            <button onClick={handleWishlist} className="flex items-center justify-center w-9 h-9 rounded-full backdrop-blur-md transition-all duration-200" style={{ background: isInWishlist ? "var(--danger)" : "rgba(255,255,255,0.3)", color: "#fff" }} aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}>
              <Heart className={cn("h-4 w-4", isInWishlist && "fill-current")} />
            </button>
            <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
              <button onClick={handleShare} className="flex items-center justify-center w-9 h-9 rounded-full backdrop-blur-md text-white hover:bg-white/50 transition-all" style={{ background: "rgba(255,255,255,0.3)" }} aria-label="Share property">
                <Share2 className="h-4 w-4" />
              </button>
              <button onClick={handleCompare} className="flex items-center justify-center w-9 h-9 rounded-full backdrop-blur-md text-white hover:bg-white/50 transition-all" style={{ background: "rgba(255,255,255,0.3)" }} aria-label="Compare property">
                <ArrowUpDown className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
            <div className="flex items-center gap-2 text-white text-xs">
              <Eye className="h-3.5 w-3.5" />
              <span>{property.views.toLocaleString()} views</span>
            </div>
            <Badge variant="default" className="border-0" style={{ background: "rgba(255,255,255,0.3)", color: "#fff", backdropFilter: "blur(8px)" }}>
              {property.listingType === "sale" ? "For Sale" : "For Rent"}
            </Badge>
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="font-semibold text-base line-clamp-1 transition-colors group-hover:text-[var(--primary)]" style={{ color: "var(--text)" }}>
              {property.title}
            </h3>
          </div>
          <p className="text-sm flex items-center gap-1.5 mb-4" style={{ color: "var(--text-muted)" }}>
            <MapPin className="h-3.5 w-3.5" style={{ color: "var(--primary)" }} />
            {truncate(property.location.neighborhood ? `${property.location.neighborhood}, ${property.location.city}` : property.location.address, 45)}
          </p>
          <div className="flex items-center gap-4 text-sm mb-4 pb-4" style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--border)" }}>
            {property.features.bedrooms > 0 && (
              <div className="flex items-center gap-1.5">
                <Bed className="h-4 w-4" style={{ color: "var(--text-muted)" }} />
                <span>{property.features.bedrooms} Bed{property.features.bedrooms > 1 ? "s" : ""}</span>
              </div>
            )}
            {property.features.bathrooms > 0 && (
              <div className="flex items-center gap-1.5">
                <Bath className="h-4 w-4" style={{ color: "var(--text-muted)" }} />
                <span>{property.features.bathrooms} Bath{property.features.bathrooms > 1 ? "s" : ""}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Maximize className="h-4 w-4" style={{ color: "var(--text-muted)" }} />
              <span>{property.features.area.toLocaleString()} {property.features.areaUnit}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-display text-xl font-bold" style={{ color: "var(--primary)" }}>
                {formatCurrency(property.price)}
              </p>
              {property.listingType === "rent" && (
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>per annum</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <img src={property.agent.image} alt={property.agent.name} className="w-8 h-8 rounded-full object-cover" style={{ border: "2px solid var(--border)" }} />
              <span className="text-xs hidden sm:block" style={{ color: "var(--text-muted)" }}>{property.agent.name.split(" ")[0]}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
