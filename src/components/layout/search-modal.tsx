"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/stores";
import { MOCK_PROPERTIES, MOCK_BLOG_POSTS } from "@/services/mock-data";

export function SearchModal() {
  const { isSearchModalOpen, setSearchModalOpen } = useUIStore();
  const [query, setQuery] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isSearchModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => { document.body.style.overflow = ""; };
  }, [isSearchModalOpen]);

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => { if (e.key === "Escape") setSearchModalOpen(false); };
    if (isSearchModalOpen) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isSearchModalOpen, setSearchModalOpen]);

  const filteredProperties = query.length >= 2
    ? MOCK_PROPERTIES.filter((p) => p.title.toLowerCase().includes(query.toLowerCase()) || p.location.city.toLowerCase().includes(query.toLowerCase()) || p.location.neighborhood?.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
    : [];

  const filteredPosts = query.length >= 2
    ? MOCK_BLOG_POSTS.filter((p) => p.title.toLowerCase().includes(query.toLowerCase())).slice(0, 3)
    : [];

  const popularSearches = ["Lekki", "Victoria Island", "Apartment", "Duplex", "Land", "Commercial"];

  return (
    <AnimatePresence>
      {isSearchModalOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-start justify-center pt-[10vh]">
          <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }} onClick={() => setSearchModalOpen(false)} />
          <motion.div initial={{ opacity: 0, y: -20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.95 }} transition={{ duration: 0.2 }} className="relative w-full max-w-2xl mx-4 rounded-2xl overflow-hidden" style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "var(--shadow-large)" }}>
            <div className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
              <Search className="h-5 w-5 shrink-0" style={{ color: "var(--text-muted)" }} />
              <input ref={inputRef} type="text" placeholder="Search properties, locations, articles..." value={query} onChange={(e) => setQuery(e.target.value)} className="flex-1 bg-transparent focus:outline-none text-lg" style={{ color: "var(--text)" }} />
              <button onClick={() => setSearchModalOpen(false)} className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors" style={{ color: "var(--text-secondary)" }} aria-label="Close search">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-4">
              {query.length < 2 ? (
                <div>
                  <p className="text-xs uppercase tracking-wider font-medium mb-3" style={{ color: "var(--text-muted)" }}>Popular Searches</p>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((term) => (
                      <button key={term} onClick={() => setQuery(term)} className="px-4 py-2 rounded-xl text-sm transition-colors" style={{ background: "var(--surface-hover)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}>{term}</button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredProperties.length > 0 && (
                    <div>
                      <p className="text-xs uppercase tracking-wider font-medium mb-2" style={{ color: "var(--text-muted)" }}>Properties</p>
                      {filteredProperties.map((property) => (
                        <Link key={property.id} href={`/properties/${property.id}`} onClick={() => setSearchModalOpen(false)} className="flex items-center gap-3 p-3 rounded-xl transition-colors group">
                          <img src={property.images[0].url} alt={property.title} className="w-14 h-12 rounded-lg object-cover" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate" style={{ color: "var(--text)" }}>{property.title}</p>
                            <p className="text-xs flex items-center gap-1" style={{ color: "var(--text-muted)" }}><MapPin className="h-3 w-3" />{property.location.neighborhood}, {property.location.city}</p>
                          </div>
                          <ArrowRight className="h-4 w-4 transition-colors group-hover:text-[var(--primary)]" style={{ color: "var(--text-muted)" }} />
                        </Link>
                      ))}
                    </div>
                  )}
                  {filteredPosts.length > 0 && (
                    <div>
                      <p className="text-xs uppercase tracking-wider font-medium mb-2" style={{ color: "var(--text-muted)" }}>Articles</p>
                      {filteredPosts.map((post) => (
                        <Link key={post.id} href={`/blog/${post.slug}`} onClick={() => setSearchModalOpen(false)} className="flex items-center gap-3 p-3 rounded-xl transition-colors group">
                          <img src={post.coverImage} alt={post.title} className="w-14 h-12 rounded-lg object-cover" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate" style={{ color: "var(--text)" }}>{post.title}</p>
                            <p className="text-xs" style={{ color: "var(--text-muted)" }}>{post.readTime} min read</p>
                          </div>
                          <ArrowRight className="h-4 w-4 transition-colors group-hover:text-[var(--primary)]" style={{ color: "var(--text-muted)" }} />
                        </Link>
                      ))}
                    </div>
                  )}
                  {filteredProperties.length === 0 && filteredPosts.length === 0 && (
                    <p className="text-center py-8" style={{ color: "var(--text-muted)" }}>No results found for &ldquo;{query}&rdquo;</p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
