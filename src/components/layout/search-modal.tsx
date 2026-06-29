"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, MapPin, Building, ArrowRight } from "lucide-react";
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
          <div className="absolute inset-0 bg-dark-950/60 backdrop-blur-sm" onClick={() => setSearchModalOpen(false)} />
          <motion.div initial={{ opacity: 0, y: -20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.95 }} transition={{ duration: 0.2 }} className="relative w-full max-w-2xl mx-4 rounded-2xl bg-white dark:bg-dark-800 shadow-large overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-light-200 dark:border-dark-700">
              <Search className="h-5 w-5 text-light-400 shrink-0" />
              <input ref={inputRef} type="text" placeholder="Search properties, locations, articles..." value={query} onChange={(e) => setQuery(e.target.value)} className="flex-1 bg-transparent text-dark-900 dark:text-light-50 placeholder:text-light-400 focus:outline-none text-lg" />
              <button onClick={() => setSearchModalOpen(false)} className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-light-100 dark:hover:bg-dark-700 text-light-500 transition-colors" aria-label="Close search">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-4">
              {query.length < 2 ? (
                <div>
                  <p className="text-xs uppercase tracking-wider text-light-500 dark:text-dark-400 font-medium mb-3">Popular Searches</p>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((term) => (
                      <button key={term} onClick={() => setQuery(term)} className="px-4 py-2 rounded-xl bg-light-100 dark:bg-dark-700 text-sm text-dark-700 dark:text-light-300 hover:bg-primary-50 hover:text-primary-700 dark:hover:bg-primary-900/20 dark:hover:text-primary-400 transition-colors">{term}</button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredProperties.length > 0 && (
                    <div>
                      <p className="text-xs uppercase tracking-wider text-light-500 dark:text-dark-400 font-medium mb-2">Properties</p>
                      {filteredProperties.map((property) => (
                        <Link key={property.id} href={`/properties/${property.id}`} onClick={() => setSearchModalOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-light-50 dark:hover:bg-dark-700 transition-colors group">
                          <img src={property.images[0].url} alt={property.title} className="w-14 h-12 rounded-lg object-cover" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-dark-900 dark:text-light-50 truncate">{property.title}</p>
                            <p className="text-xs text-light-500 dark:text-dark-400 flex items-center gap-1"><MapPin className="h-3 w-3" />{property.location.neighborhood}, {property.location.city}</p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-light-400 group-hover:text-primary-500 transition-colors" />
                        </Link>
                      ))}
                    </div>
                  )}
                  {filteredPosts.length > 0 && (
                    <div>
                      <p className="text-xs uppercase tracking-wider text-light-500 dark:text-dark-400 font-medium mb-2">Articles</p>
                      {filteredPosts.map((post) => (
                        <Link key={post.id} href={`/blog/${post.slug}`} onClick={() => setSearchModalOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-light-50 dark:hover:bg-dark-700 transition-colors group">
                          <img src={post.coverImage} alt={post.title} className="w-14 h-12 rounded-lg object-cover" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-dark-900 dark:text-light-50 truncate">{post.title}</p>
                            <p className="text-xs text-light-500 dark:text-dark-400">{post.readTime} min read</p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-light-400 group-hover:text-primary-500 transition-colors" />
                        </Link>
                      ))}
                    </div>
                  )}
                  {filteredProperties.length === 0 && filteredPosts.length === 0 && (
                    <p className="text-center text-light-500 dark:text-dark-400 py-8">No results found for &ldquo;{query}&rdquo;</p>
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