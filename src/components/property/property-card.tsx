"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart, Share2, ArrowUpDown, Bed, Bath, Maximize, MapPin, Eye
} from "lucide-react";
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
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "group flex gap-4 p-3 rounded-xl bg-white dark:bg-dark-800 border border-light-200 dark:border-dark-700 hover:shadow-medium transition-all duration-300",
            className
          )}
        >
          <div className="relative w-28 h-28 rounded-lg overflow-hidden shrink-0">
            <img src={primaryImage.url} alt={primaryImage.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
            <div>
              <p className="font-semibold text-sm text-dark-900 dark:text-light-50 truncate">{property.title}</p>
              <p className="text-xs text-light-500 dark:text-dark-400 flex items-center gap-1 mt-1">
                <MapPin className="h-3 w-3" /> {property.location.neighborhood}, {property.location.city}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-bold text-primary-700 dark:text-primary-400 text-sm">{formatCurrency(property.price)}</p>
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
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3, ease: "easeOut" as const }}
        className={cn(
          "group glass-card rounded-2xl overflow-hidden hover:shadow-large transition-all duration-300",
          className
        )}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={primaryImage.url}
            alt={primaryImage.alt}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge variant={statusVariantMap[property.status]}>
              {property.status.replace("-", " ")}
            </Badge>
            {property.isFeatured && (
              <Badge variant="featured">Featured</Badge>
            )}
          </div>
          <div className="absolute top-3 right-3 flex gap-2">
            <button
              onClick={handleWishlist}
              className={cn(
                "flex items-center justify-center w-9 h-9 rounded-full backdrop-blur-md transition-all duration-200",
                isInWishlist
                  ? "bg-red-500 text-white"
                  : "bg-white/20 text-white hover:bg-white/40"
              )}
              aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={cn("h-4 w-4", isInWishlist && "fill-current")} />
            </button>
            <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
              <button onClick={handleShare} className="flex items-center justify-center w-9 h-9 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-all" aria-label="Share property">
                <Share2 className="h-4 w-4" />
              </button>
              <button onClick={handleCompare} className="flex items-center justify-center w-9 h-9 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-all" aria-label="Compare property">
                <ArrowUpDown className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
            <div className="flex items-center gap-2 text-white text-xs">
              <Eye className="h-3.5 w-3.5" />
              <span>{property.views.toLocaleString()} views</span>
            </div>
            <Badge variant="default" className="bg-white/20 text-white backdrop-blur-md border-0">
              {property.listingType === "sale" ? "For Sale" : "For Rent"}
            </Badge>
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="font-semibold text-base text-dark-900 dark:text-light-50 group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors line-clamp-1">
              {property.title}
            </h3>
          </div>
          <p className="text-sm text-light-500 dark:text-dark-400 flex items-center gap-1.5 mb-4">
            <MapPin className="h-3.5 w-3.5 text-primary-500" />
            {truncate(property.location.neighborhood ? `${property.location.neighborhood}, ${property.location.city}` : property.location.address, 45)}
          </p>
          <div className="flex items-center gap-4 text-sm text-light-600 dark:text-dark-300 mb-4 pb-4 border-b border-light-100 dark:border-dark-700">
            {property.features.bedrooms > 0 && (
              <div className="flex items-center gap-1.5">
                <Bed className="h-4 w-4 text-light-400" />
                <span>{property.features.bedrooms} Bed{property.features.bedrooms > 1 ? "s" : ""}</span>
              </div>
            )}
            {property.features.bathrooms > 0 && (
              <div className="flex items-center gap-1.5">
                <Bath className="h-4 w-4 text-light-400" />
                <span>{property.features.bathrooms} Bath{property.features.bathrooms > 1 ? "s" : ""}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Maximize className="h-4 w-4 text-light-400" />
              <span>{property.features.area.toLocaleString()} {property.features.areaUnit}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-display text-xl font-bold text-primary-700 dark:text-primary-400">
                {formatCurrency(property.price)}
              </p>
              {property.listingType === "rent" && (
                <p className="text-xs text-light-500 dark:text-dark-400">per annum</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <img src={property.agent.image} alt={property.agent.name} className="w-8 h-8 rounded-full object-cover border-2 border-light-200 dark:border-dark-600" />
              <span className="text-xs text-light-500 dark:text-dark-400 hidden sm:block">{property.agent.name.split(" ")[0]}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}