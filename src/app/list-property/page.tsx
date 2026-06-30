"use client";

import * as React from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, Grid3X3, List, X } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PropertyCard } from "@/components/property/property-card";
import { SkeletonPropertyGrid } from "@/components/ui/skeleton";
import { Drawer } from "@/components/ui/drawer";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { MOCK_PROPERTIES } from "@/services/mock-data";
import type { PropertyType, ListingType } from "@/types";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

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
];

function ListPropertyContent() {
  const searchParams = useSearchParams();
  const typeParam = (searchParams.get("type") as ListingType) || "sale";
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedType, setSelectedType] = React.useState<string>("all");
  const [selectedBedrooms, setSelectedBedrooms] = React.useState<number | undefined>();
  const [sortBy, setSortBy] = React.useState("newest");
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredProperties = React.useMemo(() => {
    let results = MOCK_PROPERTIES.filter((p) => p.listingType === typeParam);
    if (selectedType !== "all") results = results.filter((p) => p.type === selectedType);
    if (selectedBedrooms) results = results.filter((p) => p.features.bedrooms >= selectedBedrooms);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      results = results.filter((p) => p.title.toLowerCase().includes(q) || (p.location.neighborhood && p.location.neighborhood.toLowerCase().includes(q)) || p.location.city.toLowerCase().includes(q));
    }
    switch (sortBy) {
      case "price-asc": results.sort((a, b) => a.price - b.price); break;
      case "price-desc": results.sort((a, b) => b.price - a.price); break;
      case "area-desc": results.sort((a, b) => b.features.area - a.features.area); break;
      default: break;
    }
    return results;
  }, [typeParam, selectedType, selectedBedrooms, sortBy, searchQuery]);

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-sm mb-3" style={{ color: "var(--text)" }}>Property Type</h3>
        <div className="space-y-2">
          <button onClick={() => setSelectedType("all")} className="flex items-center gap-3 w-full text-left">
            <div className="w-4 h-4 rounded border-2 flex items-center justify-center" style={{ borderColor: "var(--border-strong)" }}>
              {selectedType === "all" && <div className="w-2 h-2 rounded-sm" style={{ background: "var(--primary)" }} />}
            </div>
            <span className="text-sm" style={{ color: "var(--text-secondary)" }}>All Types</span>
          </button>
          {propertyTypes.map((type) => (
            <button key={type.value} onClick={() => setSelectedType(type.value)} className="flex items-center gap-3 w-full text-left">
              <div className="w-4 h-4 rounded border-2 flex items-center justify-center" style={{ borderColor: "var(--border-strong)" }}>
                {selectedType === type.value && <div className="w-2 h-2 rounded-sm" style={{ background: "var(--primary)" }} />}
              </div>
              <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{type.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-sm mb-3" style={{ color: "var(--text)" }}>Bedrooms</h3>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <button key={num} onClick={() => setSelectedBedrooms(selectedBedrooms === num ? undefined : num)} className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all" style={selectedBedrooms === num ? { background: "var(--primary)", color: "#fff" } : { background: "var(--surface)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}>
              {num}+
            </button>
          ))}
        </div>
      </div>
      <Button fullWidth variant="outline" onClick={() => { setSelectedType("all"); setSelectedBedrooms(undefined); setSearchQuery(""); }}>Clear Filters</Button>
    </div>
  );

  return (
    <div className="overflow-hidden pt-24">
      <section className="py-12 md:py-16" style={{ background: "var(--bg-alt)" }}>
        <div className="container">
          <motion.div {...fadeInUp} className="text-center max-w-2xl mx-auto">
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2" style={{ color: "var(--text)" }}>
              Properties For {typeParam === "sale" ? "Sale" : "Rent"}
            </h1>
            <p style={{ color: "var(--text-secondary)" }}>
              {filteredProperties.length} properties available
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-8" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-28 rounded-2xl p-6" style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "var(--shadow-soft)" }}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-semibold flex items-center gap-2" style={{ color: "var(--text)" }}>
                    <SlidersHorizontal className="h-4 w-4" />Filters
                  </h2>
                </div>
                <FilterSidebar />
              </div>
            </aside>

            <div className="flex-1 min-w-0">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 rounded-2xl p-4" style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "var(--shadow-soft)" }}>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "var(--text-muted)" }} />
                    <input type="text" placeholder="Search properties..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-lg text-sm" style={{ background: "var(--bg)", border: "1px solid var(--border)", color: "var(--text)" }} />
                  </div>
                  <button onClick={() => setIsFilterOpen(true)} className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium" style={{ background: "var(--surface-hover)", color: "var(--text-secondary)" }}>
                    <SlidersHorizontal className="h-4 w-4" />Filters
                  </button>
                  <Select options={sortOptions} value={sortBy} onChange={(v) => setSortBy(v)} className="w-full sm:w-48" />
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="primary">{filteredProperties.length} results</Badge>
                  <div className="flex items-center rounded-lg p-1" style={{ background: "var(--surface-hover)" }}>
                    <button onClick={() => setViewMode("grid")} className="p-2 rounded-md transition-all" style={viewMode === "grid" ? { background: "var(--surface)", boxShadow: "var(--shadow-soft)", color: "var(--primary)" } : { color: "var(--text-muted)" }} aria-label="Grid view"><Grid3X3 className="h-4 w-4" /></button>
                    <button onClick={() => setViewMode("list")} className="p-2 rounded-md transition-all" style={viewMode === "list" ? { background: "var(--surface)", boxShadow: "var(--shadow-soft)", color: "var(--primary)" } : { color: "var(--text-muted)" }} aria-label="List view"><List className="h-4 w-4" /></button>
                  </div>
                </div>
              </motion.div>

              {isLoading ? (
                <SkeletonPropertyGrid count={6} />
              ) : filteredProperties.length === 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                  <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full" style={{ background: "var(--surface-hover)" }}>
                    <Search className="h-8 w-8" style={{ color: "var(--text-muted)" }} />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2" style={{ color: "var(--text)" }}>No properties found</h3>
                  <p style={{ color: "var(--text-muted)" }}>Try adjusting your filters to see more results.</p>
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
            </div>
          </div>
        </div>
      </section>

      <Drawer open={isFilterOpen} onClose={() => setIsFilterOpen(false)} position="left">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-lg" style={{ color: "var(--text)" }}>Filters</h2>
          <Badge variant="primary">{filteredProperties.length} results</Badge>
        </div>
        <FilterSidebar />
      </Drawer>
    </div>
  );
}

export default function ListPropertyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-24" style={{ background: "var(--bg-alt)" }}><div className="container"><div className="animate-pulse h-96 rounded-2xl" style={{ background: "var(--surface-hover)" }} /></div></div>}>
      <ListPropertyContent />
    </Suspense>
  );
}
