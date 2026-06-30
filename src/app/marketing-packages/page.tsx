"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, CheckCircle2, Phone, Mail, Star, Zap, Shield,
  Camera, Video, Globe, FileText, Share2, TrendingUp, Eye, Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { COMPANY_INFO } from "@/constants";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true, margin: "-50px" },
};

const packages = [
  {
    name: "Basic",
    price: "₦50,000",
    description: "Essential marketing for property sellers",
    features: [
      "Professional photography (10 shots)",
      "Property description writing",
      "Listing on our website",
      "Social media promotion (1 platform)",
      "Lead management dashboard",
    ],
    icon: Camera,
    popular: false,
  },
  {
    name: "Standard",
    price: "₦150,000",
    description: "Comprehensive marketing for faster sales",
    features: [
      "Professional photography (20 shots)",
      "Drone aerial photography",
      "Virtual tour (360°)",
      "Property description writing",
      "Listing on 5+ property portals",
      "Social media promotion (3 platforms)",
      "Print marketing materials",
      "Lead management dashboard",
      "Weekly performance reports",
    ],
    icon: Video,
    popular: true,
  },
  {
    name: "Premium",
    price: "₦350,000",
    description: "Maximum exposure for luxury properties",
    features: [
      "Professional photography (unlimited)",
      "Drone aerial photography & videography",
      "Cinematic property video",
      "Virtual tour (360°)",
      "Property website/landing page",
      "Listing on 10+ property portals",
      "Social media campaign (all platforms)",
      "Google Ads campaign",
      "Print marketing materials",
      "Dedicated account manager",
      "Weekly performance reports",
      "Open house event coordination",
    ],
    icon: Star,
    popular: false,
  },
];

export default function MarketingPackagesPage() {
  return (
    <div className="overflow-hidden pt-24">
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&h=1080&fit=crop" alt="Marketing packages" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
        <div className="container relative z-10">
          <motion.div {...fadeInUp} className="max-w-3xl">
            <Badge variant="primary" className="mb-6" style={{ background: "rgba(15,157,148,0.2)", color: "#5eead4", borderColor: "rgba(15,157,148,0.3)" }}>
              Marketing Packages
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance">
              Sell Faster with
              <span className="block bg-gradient-to-r from-teal-400 to-teal-300 bg-clip-text text-transparent">
                Professional Marketing
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl">
              Choose from our tailored marketing packages designed to maximize your property's visibility and attract qualified buyers faster.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20" style={{ background: "var(--bg)" }}>
        <div className="container">
          <motion.div {...staggerContainer} className="grid md:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <motion.div key={i} {...fadeInUp}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="h-full rounded-2xl overflow-hidden relative"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "var(--shadow-soft)" }}
                >
                  {pkg.popular && (
                    <div className="absolute top-0 right-0">
                      <div className="px-4 py-1 text-xs font-semibold text-white" style={{ background: "var(--primary)" }}>
                        MOST POPULAR
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-center w-14 h-14 rounded-xl mb-4" style={{ background: "var(--primary-light)" }}>
                      <pkg.icon className="h-7 w-7" style={{ color: "var(--primary)" }} />
                    </div>
                    <h3 className="font-display text-2xl font-bold mb-1" style={{ color: "var(--text)" }}>{pkg.name}</h3>
                    <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>{pkg.description}</p>
                    <p className="font-display text-3xl font-bold mb-6" style={{ color: "var(--primary)" }}>{pkg.price}</p>
                    <ul className="space-y-3 mb-6">
                      {pkg.features.map((feature, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" style={{ color: "var(--success)" }} />
                          <span style={{ color: "var(--text-secondary)" }}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/contact">
                      <Button fullWidth variant={pkg.popular ? "default" : "outline"}>
                        Get Started <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20" style={{ background: "var(--bg-alt)" }}>
        <div className="container">
          <motion.div {...fadeInUp} className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: "var(--text)" }}>
              Why Our Marketing Works
            </h2>
          </motion.div>
          <motion.div {...staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Eye, title: "Maximum Visibility", description: "Your property seen by thousands of qualified buyers across multiple platforms." },
              { icon: Camera, title: "Professional Media", description: "High-quality photos and videos that showcase your property at its best." },
              { icon: Target, title: "Targeted Reach", description: "Strategic advertising to reach your ideal buyer demographic." },
              { icon: TrendingUp, title: "Faster Sales", description: "Properties marketed with our packages sell 3x faster on average." },
            ].map((item, i) => (
              <motion.div key={i} {...fadeInUp}>
                <div className="text-center p-6 rounded-2xl" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                  <div className="flex items-center justify-center w-14 h-14 rounded-xl mx-auto mb-4" style={{ background: "var(--primary-light)" }}>
                    <item.icon className="h-7 w-7" style={{ color: "var(--primary)" }} />
                  </div>
                  <h3 className="font-semibold mb-2" style={{ color: "var(--text)" }}>{item.title}</h3>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=800&fit=crop" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(15,122,110,0.92), rgba(13,148,136,0.85))" }} />
        </div>
        <div className="container relative z-10">
          <motion.div {...fadeInUp} className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Ready to Market Your Property?</h2>
            <p className="text-lg text-teal-100 mb-8">Choose a package that fits your needs and budget. Contact us to get started.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" variant="secondary" style={{ background: "#fff", color: "var(--primary)" }}>
                  <Phone className="h-4 w-4" /> Contact Us
                </Button>
              </Link>
              <Link href="/list-property?type=sale">
                <Button size="lg" variant="outline" style={{ borderColor: "rgba(255,255,255,0.3)", color: "#fff", background: "transparent" }}>
                  View Listings <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
