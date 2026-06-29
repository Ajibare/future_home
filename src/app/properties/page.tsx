"use client";

import * as React from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Grid3X3, List, SlidersHorizontal, Search, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { PropertyCard } from "@/components/property/property-card";
import { SkeletonPropertyGrid } from "@/components/ui/skeleton";
import { Drawer } from "@/components/ui/drawer";
import { MOCK_PROPERTIES } from "@/services/mock-data";
import type { SearchFilters, SortOption, PropertyType, ListingType } from "@/types";

const propertyTypes: { value: string; label: string }[] = [
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "duplex", label: "Duplex" },
  { value: "townhouse", label: "Townhouse" },
  { value: "penthouse", label: "Penthouse" },
  { value: "villa", label: "Villa" },
  { value: "commercial", label: "Commercial" },
  { value: "land", label: "Land" },
  { value: "office", label: "Office" },
];

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "area-desc", label: "Largest Area" },
  { value: "area-asc", label: "Smallest Area" },
];

function PropertiesContent() {
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const [filters, setFilters] = React.useState<SearchFilters>({
    listingType: (searchParams.get("listingType") as ListingType) || "sale",
    propertyTypes: searchParams.get("type") ? [searchParams.get("type") as PropertyType] : undefined,
    cities: searchParams.get("location") ? [searchParams.get("location")!] : undefined,
    query: searchParams.get("q") || "",
    sortBy: (searchParams.get("sort") as SortOption) || "newest",
    page: parseInt(searchParams.get("page") || "1"),
    limit: 12,
  });

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const updateFilter = (key: keyof SearchFilters, value: unknown) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const filteredProperties = React.useMemo(() => {
    let results = [...MOCK_PROPERTIES];
    if (filters.listingType) results = results.filter((p) => p.listingType === filters.listingType);
    if (filters.propertyTypes?.length) results = results.filter((p) => filters.propertyTypes!.includes(p.type));
    if (filters.cities?.length) results = results.filter((p) => filters.cities!.some((c) => p.location.city.toLowerCase().includes(c.toLowerCase())));
    if (filters.query) {
      const q = filters.query.toLowerCase();
      results = results.filter((p) => p.title.toLowerCase().includes(q) || p.location.city.toLowerCase().includes(q));
    }
    if (filters.minBedrooms) results = results.filter((p) => p.features.bedrooms >= filters.minBedrooms!);
    switch (filters.sortBy) {
      case "price-asc": results.sort((a, b) => a.price - b.price); break;
      case "price-desc": results.sort((a, b) => b.price - a.price); break;
      case "area-desc": results.sort((a, b) => b.features.area - a.features.area); break;
      default: break;
    }
    return results;
  }, [filters]);

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-sm text-dark-900 dark:text-light-50 mb-3">Listing Type</h3>
        <div className="flex gap-2">
          {(["sale", "rent"] as const).map((type) => (
            <button key={type} onClick={() => updateFilter("listingType", type)} className={cn("flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all", filters.listingType === type ? "bg-primary-700 text-white" : "bg-light-100 dark:bg-dark-800 text-dark-700 dark:text-light-300 hover:bg-light-200 dark:hover:bg-dark-700")}>
              {type === "sale" ? "For Sale" : "For Rent"}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-sm text-dark-900 dark:text-light-50 mb-3">Property Type</h3>
        <div className="space-y-2">
          {propertyTypes.map((type) => (
            <label key={type.value} className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" checked={filters.propertyTypes?.includes(type.value as PropertyType) || false} onChange={(e) => { const current = filters.propertyTypes || []; const next = e.target.checked ? [...current, type.value as PropertyType] : current.filter((t) => t !== type.value); updateFilter("propertyTypes", next.length > 0 ? next : undefined); }} className="w-4 h-4 rounded border-light-300 text-primary-700 focus:ring-primary-500" />
              <span className="text-sm text-dark-700 dark:text-light-300 group-hover:text-primary-700 dark:group-hover:text-primary-400">{type.label}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-sm text-dark-900 dark:text-light-50 mb-3">Bedrooms</h3>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <button key={num} onClick={() => updateFilter("minBedrooms", filters.minBedrooms === num ? undefined : num)} className={cn("px-4 py-2 rounded-xl text-sm font-medium transition-all", filters.minBedrooms === num ? "bg-primary-700 text-white" : "bg-light-100 dark:bg-dark-800 text-dark-700 dark:text-light-300 hover:bg-light-200")}>
              {num}+
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-sm text-dark-900 dark:text-light-50 mb-3">Price Range</h3>
        <div className="grid grid-cols-2 gap-3">
          <Input type="number" placeholder="Min price" value={filters.minPrice || ""} onChange={(e) => updateFilter("minPrice", e.target.value ? parseInt(e.target.value) : undefined)} className="h-10 text-sm" />
          <Input type="number" placeholder="Max price" value={filters.maxPrice || ""} onChange={(e) => updateFilter("maxPrice", e.target.value ? parseInt(e.target.value) : undefined)} className="h-10 text-sm" />
        </div>
      </div>
      <Button fullWidth variant="outline" onClick={() => setFilters({ listingType: "sale", page: 1, limit: 12, sortBy: "newest" })}>Clear All Filters</Button>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-16 bg-light-50 dark:bg-dark-950">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-dark-900 dark:text-light-50 mb-2">
            {filters.listingType === "sale" ? "Properties for Sale" : "Properties for Rent"}
          </h1>
          <p className="text-light-600 dark:text-dark-300">{filteredProperties.length} properties found</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-28 rounded-2xl bg-white dark:bg-dark-800 border border-light-200 dark:border-dark-700 p-6 shadow-soft">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-dark-900 dark:text-light-50 flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />Filters
                </h2>
              </div>
              <FilterSidebar />
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 rounded-2xl bg-white dark:bg-dark-800 border border-light-200 dark:border-dark-700 p-4 shadow-soft">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button onClick={() => setIsFilterOpen(true)} className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl bg-light-100 dark:bg-dark-700 text-dark-700 dark:text-light-300 text-sm font-medium hover:bg-light-200 dark:hover:bg-dark-600 transition-colors">
                  <Filter className="h-4 w-4" />Filters
                </button>
                <Select options={sortOptions} value={filters.sortBy || "newest"} onChange={(v) => updateFilter("sortBy", v as SortOption)} className="w-full sm:w-48" />
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="primary">{filteredProperties.length} results</Badge>
                <div className="flex items-center bg-light-100 dark:bg-dark-700 rounded-xl p-1">
                  <button onClick={() => setViewMode("grid")} className={cn("p-2 rounded-lg transition-all", viewMode === "grid" ? "bg-white dark:bg-dark-600 shadow-soft text-primary-700 dark:text-primary-400" : "text-light-500 dark:text-dark-400")} aria-label="Grid view"><Grid3X3 className="h-4 w-4" /></button>
                  <button onClick={() => setViewMode("list")} className={cn("p-2 rounded-lg transition-all", viewMode === "list" ? "bg-white dark:bg-dark-600 shadow-soft text-primary-700 dark:text-primary-400" : "text-light-500 dark:text-dark-400")} aria-label="List view"><List className="h-4 w-4" /></button>
                </div>
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              {isLoading ? (
                <SkeletonPropertyGrid count={6} />
              ) : filteredProperties.length === 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                  <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-light-100 dark:bg-dark-800"><Search className="h-8 w-8 text-light-400" /></div>
                  <h3 className="font-display text-xl font-semibold text-dark-900 dark:text-light-50 mb-2">No properties found</h3>
                  <p className="text-light-500 dark:text-dark-400 mb-6">Try adjusting your filters to see more results.</p>
                  <Button onClick={() => setFilters({ listingType: "sale", page: 1, limit: 12, sortBy: "newest" })}>Clear Filters</Button>
                </motion.div>
              ) : (
                <motion.div key={viewMode} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={cn("grid gap-6", viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1")}>
                  {filteredProperties.map((property, i) => (
                    <motion.div key={property.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                      <PropertyCard property={property} variant={viewMode === "list" ? "compact" : "default"} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <Drawer open={isFilterOpen} onClose={() => setIsFilterOpen(false)} position="left">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-lg text-dark-900 dark:text-light-50">Filters</h2>
          <Badge variant="primary">{filteredProperties.length} results</Badge>
        </div>
        <FilterSidebar />
      </Drawer>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-24 pb-16 bg-light-50 dark:bg-dark-950"><div className="container"><div className="animate-pulse h-96 rounded-2xl bg-light-200 dark:bg-dark-700" /></div></div>}>
      <PropertiesContent />
    </Suspense>
  );
}