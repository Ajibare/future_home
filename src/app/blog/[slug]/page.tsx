"use client";

import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Eye, Heart, Share2, User, Calendar, Tag, Globe, MessageCircle, ExternalLink } from "lucide-react";

const SocialIcon = ({ type, className }: { type: string; className?: string }) => {
  switch (type) {
    case "facebook": return <Globe className={className} />;
    case "twitter": return <MessageCircle className={className} />;
    case "linkedin": return <ExternalLink className={className} />;
    default: return <Globe className={className} />;
  }
};

import { cn, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_BLOG_POSTS } from "@/services/mock-data";
import { toast } from "sonner";

function getPost(slug: string) {
  return MOCK_BLOG_POSTS.find((p) => p.slug === slug);
}

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const post = getPost(slug);

  if (!post) notFound();

  const relatedPosts = MOCK_BLOG_POSTS.filter((p) => p.id !== post.id && p.category.id === post.category.id).slice(0, 3);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: post.title, url });
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <div className="overflow-hidden pt-24">
      {/* Hero */}
      <section className="relative">
        <div className="relative h-[50vh] md:h-[60vh]">
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,8,22,0.9), rgba(15,23,42,0.5), transparent)" }} />
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <div className="container pb-8 md:pb-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white mb-4 transition-colors">
                <ArrowLeft className="h-4 w-4" /> Back to Blog
              </Link>
              <Badge variant="primary" className="mb-3">{post.category.name}</Badge>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                <span>3 years ago</span>
                <span>·</span>
                <span>{post.category.name}</span>
                <span>·</span>
                <span>0 Comments</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2">
              <div className="max-w-none">
                <p className="text-xl leading-relaxed mb-8" style={{ color: "var(--text-secondary)" }}>{post.excerpt}</p>
                <div className="leading-relaxed space-y-6" style={{ color: "var(--text-secondary)" }}>
                  {post.content.split("\n\n").map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2 mt-10 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
                <Tag className="h-4 w-4" style={{ color: "var(--text-muted)" }} />
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                ))}
              </div>

              {/* Share */}
              <div className="flex items-center gap-3 mt-6">
                <span className="text-sm" style={{ color: "var(--text-muted)" }}>Share:</span>
                <button onClick={handleShare} className="flex items-center justify-center w-9 h-9 rounded-xl transition-all hover:text-white" style={{ background: "var(--surface-hover)", color: "var(--text-secondary)" }} aria-label="Share"><Share2 className="h-4 w-4" /></button>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-9 h-9 rounded-xl transition-all hover:bg-[#1877F2] hover:text-white" style={{ background: "var(--surface-hover)", color: "var(--text-secondary)" }} aria-label="Share on Facebook"><SocialIcon type="facebook" className="h-4 w-4" /></a>
                <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-9 h-9 rounded-xl transition-all hover:bg-[#1DA1F2] hover:text-white" style={{ background: "var(--surface-hover)", color: "var(--text-secondary)" }} aria-label="Share on Twitter"><SocialIcon type="twitter" className="h-4 w-4" /></a>
                <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-9 h-9 rounded-xl transition-all hover:bg-[#0A66C2] hover:text-white" style={{ background: "var(--surface-hover)", color: "var(--text-secondary)" }} aria-label="Share on LinkedIn"><SocialIcon type="linkedin" className="h-4 w-4" /></a>
              </div>

              {/* Author */}
              <div className="mt-10 p-6 rounded-2xl" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                <div className="flex items-start gap-4">
                  <img src={post.author.image} alt={post.author.name} className="w-16 h-16 rounded-xl object-cover" />
                  <div>
                    <p className="font-semibold" style={{ color: "var(--text)" }}>{post.author.name}</p>
                    <p className="text-sm mb-2" style={{ color: "var(--primary)" }}>{post.author.title}</p>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>{post.author.bio}</p>
                  </div>
                </div>
              </div>
            </motion.article>

            {/* Sidebar */}
            <motion.aside initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-6">
              <div className="sticky top-28 space-y-6">
                <div className="rounded-2xl p-5" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                  <h3 className="font-semibold mb-4" style={{ color: "var(--text)" }}>Related Articles</h3>
                  <div className="space-y-4">
                    {relatedPosts.map((rp) => (
                      <Link key={rp.id} href={`/blog/${rp.slug}`} className="flex gap-3 group">
                        <img src={rp.coverImage} alt={rp.title} className="w-20 h-16 rounded-lg object-cover shrink-0" />
                        <div>
                          <p className="text-sm font-medium line-clamp-2 transition-colors group-hover:text-[var(--primary)]" style={{ color: "var(--text)" }}>{rp.title}</p>
                          <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{rp.readTime} min read</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl p-6 text-white" style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-hover))" }}>
                  <h3 className="font-semibold text-lg mb-2">Stay Updated</h3>
                  <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.8)" }}>Subscribe to our newsletter for the latest articles.</p>
                  <Link href="/contact"><Button variant="secondary" fullWidth style={{ background: "#fff", color: "var(--primary)" }}>Subscribe</Button></Link>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </div>
  );
}
