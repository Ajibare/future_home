"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, ArrowRight, Clock, User, Eye, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
      {/* Hero */}
      <section className="py-20 md:py-24 bg-light-50 dark:bg-dark-950">
        <div className="container">
          <motion.div {...fadeInUp} className="text-center max-w-2xl mx-auto">
            <Badge variant="primary" className="mb-4">Our Blog</Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-dark-900 dark:text-light-50 mb-4 text-balance">
              Real Estate Insights & Tips
            </h1>
            <p className="text-lg text-light-600 dark:text-dark-300 leading-relaxed">
              Stay informed with the latest trends, tips, and insights in Nigerian real estate.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white dark:bg-dark-900">
        <div className="container">
          <motion.div {...fadeInUp} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-medium transition-all",
                    selectedCategory === cat
                      ? "bg-primary-700 text-white"
                      : "bg-light-100 dark:bg-dark-800 text-dark-700 dark:text-light-300 hover:bg-light-200 dark:hover:bg-dark-700"
                  )}
                >
                  {cat === "all" ? "All Posts" : cat}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-light-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-light-200 dark:border-dark-700 bg-light-50 dark:bg-dark-800 text-sm text-dark-900 dark:text-light-50 placeholder:text-light-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </motion.div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-light-500 dark:text-dark-400">No articles found matching your criteria.</p>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredPosts.map((post, i) => (
                <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Link href={`/blog/${post.slug}`}>
                    <motion.article whileHover={{ y: -6 }} className="group h-full rounded-2xl overflow-hidden bg-light-50 dark:bg-dark-800 border border-light-200 dark:border-dark-700 hover:shadow-large transition-all duration-300">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute top-3 left-3">
                          <Badge variant="primary">{post.category.name}</Badge>
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-3 text-xs text-light-500 dark:text-dark-400 mb-3">
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime} min read</span>
                          <span>·</span>
                          <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{post.views.toLocaleString()}</span>
                        </div>
                        <h2 className="font-semibold text-lg text-dark-900 dark:text-light-50 group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors line-clamp-2 mb-2">{post.title}</h2>
                        <p className="text-sm text-light-500 dark:text-dark-400 line-clamp-2 mb-4">{post.excerpt}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-light-200 dark:border-dark-700">
                          <div className="flex items-center gap-2">
                            <img src={post.author.image} alt={post.author.name} className="w-7 h-7 rounded-full object-cover" />
                            <span className="text-xs text-light-600 dark:text-dark-300">{post.author.name}</span>
                          </div>
                          <ArrowRight className="h-4 w-4 text-light-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
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