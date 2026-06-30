"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Heart, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/property/property-card";
import { usePropertyStore } from "@/stores";
import { MOCK_PROPERTIES } from "@/services/mock-data";
import { toast } from "sonner";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = usePropertyStore();
  const wishlistProperties = MOCK_PROPERTIES.filter((p) => wishlist.includes(p.id));

  const handleRemove = (id: string) => {
    removeFromWishlist(id);
    toast.success("Removed from wishlist");
  };

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: "var(--bg-alt)" }}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2" style={{ color: "var(--text)" }}>My Wishlist</h1>
          <p style={{ color: "var(--text-secondary)" }}>{wishlistProperties.length} saved properties</p>
        </motion.div>

        {wishlistProperties.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full" style={{ background: "var(--surface-hover)" }}>
              <Heart className="h-8 w-8" style={{ color: "var(--text-muted)" }} />
            </div>
            <h3 className="font-display text-xl font-semibold mb-2" style={{ color: "var(--text)" }}>No saved properties</h3>
            <p className="mb-6" style={{ color: "var(--text-muted)" }}>Start browsing and save properties you love!</p>
            <Link href="/properties"><Button size="lg">Browse Properties<ArrowRight className="h-4 w-4" /></Button></Link>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistProperties.map((property, i) => (
              <motion.div key={property.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="relative group">
                <PropertyCard property={property} />
                <button onClick={() => handleRemove(property.id)} className="absolute top-14 right-3 z-10 flex items-center justify-center w-9 h-9 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-soft hover:scale-110" style={{ background: "var(--surface)", color: "var(--danger)" }} aria-label="Remove from wishlist">
                  <Trash2 className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
