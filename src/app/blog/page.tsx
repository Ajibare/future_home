"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, ArrowRight, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_BLOG_POSTS } from "@/services/mock-data";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");

  const categories = React.useMemo(() => {
    const cats = Array.from(new Set(MOCK_BLOG_POSTS.map((p) => p.category.name)));
    return ["all", ...cats];
  }, []);

  const filteredPosts = React.useMemo(() => {
    return MOCK_BLOG_POSTS.filter((post) => {
      const matchesSearch = !searchQuery || post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || post.category.name === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="overflow-hidden pt-24">
      <section className="py-20 md:py-24" style={{ background: "var(--bg-alt)" }}>
        <div className="container">
          <motion.div {...fadeInUp} className="text-center max-w-2xl mx-auto">
            <Badge variant="primary" className="mb-4">Our Blog</Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-balance" style={{ color: "var(--text)" }}>Real Estate Insights & Tips</h1>
            <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>Stay informed with the latest trends, tips, and insights in Nigerian real estate.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20" style={{ background: "var(--bg)" }}>
        <div className="container">
          <motion.div {...fadeInUp} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn("px-4 py-2 rounded-xl text-sm font-medium transition-all")}
                  style={selectedCategory === cat ? { background: "var(--primary)", color: "#fff" } : { background: "var(--surface)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}
                >
                  {cat === "all" ? "All Posts" : cat}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: "var(--text-muted)" }} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}
              />
            </div>
          </motion.div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p style={{ color: "var(--text-muted)" }}>No articles found matching your criteria.</p>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredPosts.map((post, i) => (
                <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Link href={`/blog/${post.slug}`}>
                    <motion.article whileHover={{ y: -6 }} className="group h-full rounded-2xl overflow-hidden transition-all duration-300" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute top-3 left-3">
                          <Badge variant="primary">{post.category.name}</Badge>
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-3 text-xs mb-3" style={{ color: "var(--text-muted)" }}>
                          <span>3 years ago</span>
                          <span>·</span>
                          <span>{post.category.name}</span>
                          <span>·</span>
                          <span>0 Comments</span>
                        </div>
                        <h2 className="font-semibold text-lg line-clamp-2 mb-2 transition-colors group-hover:text-[var(--primary)]" style={{ color: "var(--text)" }}>{post.title}</h2>
                        <p className="text-sm line-clamp-2 mb-4" style={{ color: "var(--text-muted)" }}>{post.excerpt}</p>
                        <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid var(--border)" }}>
                          <div className="flex items-center gap-2">
                            <img src={post.author.image} alt={post.author.name} className="w-7 h-7 rounded-full object-cover" />
                            <span className="text-xs" style={{ color: "var(--text-secondary)" }}>{post.author.name}</span>
                          </div>
                          <ArrowRight className="h-4 w-4 transition-all group-hover:translate-x-1 group-hover:text-[var(--primary)]" style={{ color: "var(--text-muted)" }} />
                        </div>
                      </div>
                    </motion.article>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
