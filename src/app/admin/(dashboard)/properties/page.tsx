"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Trash2, Star, EyeOff, Eye, Grid3X3, List, Bed, Bath, Maximize } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/page-header";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { AdminTableSkeleton, AdminGridSkeleton } from "@/components/admin/loading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAdminList, useAdminMutations } from "@/hooks/use-admin-resource";
import { formatCurrency } from "@/lib/utils";
import type { Property } from "@/types";
import { toast } from "sonner";

export default function AdminPropertiesPage() {
  const { data: properties, isLoading } = useAdminList<Property>("properties");
  const { remove } = useAdminMutations<Property>("properties");
  const [pendingDelete, setPendingDelete] = React.useState<Property | null>(null);
  const [viewMode, setViewMode] = React.useState<"table" | "grid">("table");

  const handleDelete = async () => {
    if (!pendingDelete) return;
    try {
      await remove.mutateAsync(pendingDelete.id);
      toast.success("Property deleted");
      setPendingDelete(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to delete");
    }
  };

  return (
    <div>
      <AdminPageHeader
        title="Properties"
        description="Manage every listing on the site."
        action={
          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-xl p-1" style={{ background: "var(--surface-hover)" }}>
              <button onClick={() => setViewMode("table")} className="p-2 rounded-lg transition-all" style={viewMode === "table" ? { background: "var(--surface)", boxShadow: "var(--shadow-soft)", color: "var(--primary)" } : { color: "var(--text-muted)" }} aria-label="Table view">
                <List className="h-4 w-4" />
              </button>
              <button onClick={() => setViewMode("grid")} className="p-2 rounded-lg transition-all" style={viewMode === "grid" ? { background: "var(--surface)", boxShadow: "var(--shadow-soft)", color: "var(--primary)" } : { color: "var(--text-muted)" }} aria-label="Grid view">
                <Grid3X3 className="h-4 w-4" />
              </button>
            </div>
            <Link href="/admin/properties/new"><Button><Plus className="h-4 w-4" /> Add Property</Button></Link>
          </div>
        }
      />

      {isLoading ? (
        viewMode === "table" ? <AdminTableSkeleton rows={6} /> : <AdminGridSkeleton count={8} />
      ) : !properties?.length ? (
        <EmptyState />
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {properties.map((property) => {
            const primaryImage = property.images.find((img) => img.isPrimary) || property.images[0];
            return (
              <div key={property.id} className="rounded-2xl overflow-hidden" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                <div className="relative aspect-[4/3]" style={{ background: "var(--surface-hover)" }}>
                  {primaryImage?.url && <Image src={primaryImage.url} alt="" fill sizes="320px" className="object-cover" />}
                  <div className="absolute top-2 left-2 flex items-center gap-1.5">
                    <Badge variant="default">{property.status.replace("-", " ")}</Badge>
                    {property.isFeatured && (
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black/50">
                        <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                      </span>
                    )}
                  </div>
                  {property.isActive === false && (
                    <div className="absolute top-2 right-2 flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-black/60 text-white">
                      <EyeOff className="h-3 w-3" /> Hidden
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <p className="font-semibold text-sm truncate mb-1" style={{ color: "var(--text)" }}>{property.title}</p>
                  <p className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>{property.location.city}{property.location.neighborhood ? `, ${property.location.neighborhood}` : ""}</p>
                  <p className="font-display text-base font-bold mb-3" style={{ color: "var(--primary)" }}>{formatCurrency(property.price)}</p>
                  <div className="flex items-center gap-3 text-xs mb-4 pb-4" style={{ color: "var(--text-muted)", borderBottom: "1px solid var(--border)" }}>
                    {property.features.bedrooms > 0 && <span className="flex items-center gap-1"><Bed className="h-3.5 w-3.5" /> {property.features.bedrooms}</span>}
                    {property.features.bathrooms > 0 && <span className="flex items-center gap-1"><Bath className="h-3.5 w-3.5" /> {property.features.bathrooms}</span>}
                    <span className="flex items-center gap-1"><Maximize className="h-3.5 w-3.5" /> {property.features.area.toLocaleString()} {property.features.areaUnit}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/properties/${property.id}`}>
                        <Button variant="outline" size="sm"><Pencil className="h-3.5 w-3.5" /> Edit</Button>
                      </Link>
                      <a href={`/properties/${property.id}`} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="icon-sm" aria-label="View live listing"><Eye className="h-4 w-4" /></Button>
                      </a>
                    </div>
                    <Button variant="ghost" size="icon-sm" onClick={() => setPendingDelete(property)}>
                      <Trash2 className="h-4 w-4" style={{ color: "#ef4444" }} />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl overflow-hidden" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <th className="text-left font-medium p-4" style={{ color: "var(--text-muted)" }}>Property</th>
                  <th className="text-left font-medium p-4" style={{ color: "var(--text-muted)" }}>Price</th>
                  <th className="text-left font-medium p-4" style={{ color: "var(--text-muted)" }}>Status</th>
                  <th className="text-left font-medium p-4" style={{ color: "var(--text-muted)" }}>Location</th>
                  <th className="text-right font-medium p-4" style={{ color: "var(--text-muted)" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((property) => {
                  const primaryImage = property.images.find((img) => img.isPrimary) || property.images[0];
                  return (
                    <tr key={property.id} style={{ borderBottom: "1px solid var(--border)" }}>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-14 h-11 rounded-lg overflow-hidden shrink-0" style={{ background: "var(--surface-hover)" }}>
                            {primaryImage?.url && <Image src={primaryImage.url} alt="" fill sizes="56px" className="object-cover" />}
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium truncate max-w-[220px]" style={{ color: "var(--text)" }}>{property.title}</p>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              {property.isFeatured && <Star className="h-3 w-3 text-amber-400 fill-amber-400" />}
                              {property.isActive === false && <EyeOff className="h-3 w-3" style={{ color: "var(--text-muted)" }} />}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4" style={{ color: "var(--text)" }}>{formatCurrency(property.price)}</td>
                      <td className="p-4"><Badge variant="default">{property.status.replace("-", " ")}</Badge></td>
                      <td className="p-4" style={{ color: "var(--text-muted)" }}>{property.location.city}</td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <a href={`/properties/${property.id}`} target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" size="icon-sm" aria-label="View live listing"><Eye className="h-4 w-4" /></Button>
                          </a>
                          <Link href={`/admin/properties/${property.id}`}>
                            <Button variant="ghost" size="icon-sm" aria-label="Edit property"><Pencil className="h-4 w-4" /></Button>
                          </Link>
                          <Button variant="ghost" size="icon-sm" onClick={() => setPendingDelete(property)}>
                            <Trash2 className="h-4 w-4" style={{ color: "#ef4444" }} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        onClose={() => setPendingDelete(null)}
        onConfirm={handleDelete}
        isLoading={remove.isPending}
        title="Delete this property?"
        description={`"${pendingDelete?.title}" will be permanently removed. This cannot be undone.`}
      />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl p-12 text-center" style={{ background: "var(--surface)", border: "1px dashed var(--border)" }}>
      <p style={{ color: "var(--text-muted)" }}>No properties yet.</p>
      <Link href="/admin/properties/new" className="inline-block mt-4">
        <Button><Plus className="h-4 w-4" /> Add your first property</Button>
      </Link>
    </div>
  );
}
