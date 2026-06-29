"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Search, ArrowRight, Star, Shield, Award, Users, TrendingUp,
  Home, Building, Building2, MapPin, ChevronRight, Play, CheckCircle2,
  Phone, Mail, Clock, Heart, Eye
} from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PropertyCard } from "@/components/property/property-card";
import { MOCK_PROPERTIES, MOCK_TESTIMONIALS, MOCK_BLOG_POSTS } from "@/services/mock-data";
import { COMPANY_INFO, STATISTICS, WHY_CHOOSE_US, SERVICES, LAGOS_NEIGHBORHOODS } from "@/constants";

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

function SectionHeader({ badge, title, description, align = "center" }: { badge?: string; title: string; description?: string; align?: "center" | "left" }) {
  return (
    <motion.div
      {...fadeInUp}
      className={cn("max-w-2xl mb-12", align === "center" ? "mx-auto text-center" : "text-left")}
    >
      {badge && (
        <Badge variant="primary" className="mb-4">{badge}</Badge>
      )}
      <h2 className="font-display text-3xl md:text-4xl font-bold text-dark-900 dark:text-light-50 mb-4 text-balance">
        {title}
      </h2>
      {description && (
        <p className="text-light-600 dark:text-dark-300 text-lg leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}

function AnimatedCounter({ value, suffix = "", prefix = "" }: { value: string | number; suffix?: string; prefix?: string }) {
  const numValue = typeof value === "string" ? parseInt(value.replace(/[^0-9]/g, "")) : value;
  const displaySuffix = typeof value === "string" ? value.replace(/[0-9]/g, "") + suffix : suffix;
  return (
    <span className="font-display text-4xl md:text-5xl font-bold text-primary-700 dark:text-primary-400">
      {prefix}{numValue.toLocaleString()}{displaySuffix}
    </span>
  );
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchType, setSearchType] = React.useState<"sale" | "rent">("sale");

  const featuredProperties = MOCK_PROPERTIES.filter((p) => p.isFeatured).slice(0, 6);
  const latestProperties = MOCK_PROPERTIES.slice(0, 8);
  const testimonials = MOCK_TESTIMONIALS;
  const blogPosts = MOCK_BLOG_POSTS.slice(0, 3);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop"
            alt="Luxury property"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-950/80 via-dark-900/60 to-dark-900/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950/60 via-transparent to-transparent" />
        </div>
        <div className="container relative z-10 py-32 md:py-40">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" as const }}
            className="max-w-3xl"
          >
            <Badge variant="primary" className="mb-6 bg-primary-500/20 text-primary-300 border-primary-500/30">
              <Star className="h-3 w-3 fill-current" /> Nigeria&apos;s Premier Real Estate Company
            </Badge>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] text-balance">
              Find Your
              <span className="block text-gradient-dark">Dream Home</span>
            </h1>
            <p className="text-lg md:text-xl text-light-300 mb-10 max-w-xl leading-relaxed">
              Discover exceptional properties across Lagos and Nigeria. From luxury penthouses to family homes, your perfect property awaits.
            </p>
            <div className="glass rounded-2xl p-2 max-w-2xl">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex bg-dark-800/50 rounded-xl p-1 sm:w-40">
                  {(["sale", "rent"] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setSearchType(type)}
                      className={cn(
                        "flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all",
                        searchType === type
                          ? "bg-primary-700 text-white shadow-soft"
                          : "text-light-300 hover:text-white"
                      )}
                    >
                      {type === "sale" ? "Buy" : "Rent"}
                    </button>
                  ))}
                </div>
                <div className="flex-1 flex gap-2">
                  <Input
                    placeholder="Search by location, type, or keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-dark-800/50 border-dark-700 text-white placeholder:text-dark-400 focus:ring-primary-500 h-12"
                  />
                  <Button size="lg" className="px-6 h-12 shrink-0">
                    <Search className="h-5 w-5" />
                    <span className="hidden sm:inline">Search</span>
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-6">
              <span className="text-sm text-light-400">Popular:</span>
              {["Lekki", "Ikoyi", "Victoria Island", "Ajah"].map((loc) => (
                <Link
                  key={loc}
                  href={`/properties?location=${loc}`}
                  className="text-sm text-light-300 hover:text-primary-400 transition-colors underline underline-offset-2"
                >
                  {loc}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-white/60"
          >
            <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
            <ChevronRight className="h-5 w-5 rotate-90" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-dark-900 border-b border-light-100 dark:border-dark-800">
        <div className="container">
          <motion.div
            {...staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {STATISTICS.map((stat) => (
              <motion.div key={stat.id} {...fadeInUp} className="text-center">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                <p className="text-sm text-light-500 dark:text-dark-400 mt-2 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 md:py-28 bg-light-50 dark:bg-dark-950">
        <div className="container">
          <SectionHeader
            badge="Featured Properties"
            title="Exceptional Properties Curated for You"
            description="Hand-picked premium properties in Nigeria's most sought-after locations."
          />
          <motion.div
            {...staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {featuredProperties.map((property) => (
              <motion.div key={property.id} {...fadeInUp}>
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </motion.div>
          <motion.div {...fadeInUp} className="text-center mt-12">
            <Link href="/properties">
              <Button size="lg" variant="outline">
                View All Properties
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Property Categories */}
      <section className="py-20 md:py-28 bg-white dark:bg-dark-900">
        <div className="container">
          <SectionHeader
            badge="Property Categories"
            title="Browse by Property Type"
            description="Find exactly what you're looking for from our diverse portfolio."
          />
          <motion.div
            {...staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {[
              { icon: Home, label: "Houses", count: 245, href: "/properties?type=house" },
              { icon: Building, label: "Apartments", count: 189, href: "/properties?type=apartment" },
              { icon: Building2, label: "Commercial", count: 134, href: "/properties?category=commercial" },
              { icon: TrendingUp, label: "Land", count: 98, href: "/properties?type=land" },
              { icon: Star, label: "Luxury", count: 67, href: "/properties?category=luxury" },
              { icon: Building, label: "Offices", count: 54, href: "/properties?type=office" },
            ].map((cat) => (
              <motion.div key={cat.label} {...fadeInUp}>
                <Link href={cat.href}>
                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-light-50 dark:bg-dark-800 border border-light-200 dark:border-dark-700 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-medium transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 group-hover:bg-primary-700 group-hover:text-white transition-all duration-300">
                      <cat.icon className="h-6 w-6" />
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-sm text-dark-900 dark:text-light-50">{cat.label}</p>
                      <p className="text-xs text-light-500 dark:text-dark-400 mt-0.5">{cat.count} listings</p>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Popular Locations */}
      <section className="py-20 md:py-28 bg-light-50 dark:bg-dark-950">
        <div className="container">
          <SectionHeader
            badge="Popular Locations"
            title="Explore Nigeria's Finest Neighborhoods"
            description="From the vibrant streets of Victoria Island to the serene estates of Lekki."
          />
          <motion.div
            {...staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {[
              { name: "Victoria Island", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop", count: 45 },
              { name: "Lekki", image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&h=400&fit=crop", count: 67 },
              { name: "Ikoyi", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop", count: 34 },
              { name: "Ajah", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop", count: 28 },
              { name: "Eko Atlantic", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop", count: 19 },
              { name: "Banana Island", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop", count: 12 },
              { name: "Ikeja GRA", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop", count: 31 },
              { name: "Chevron", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=400&fit=crop", count: 23 },
            ].map((loc) => (
              <motion.div key={loc.name} {...fadeInUp}>
                <Link href={`/properties?location=${loc.name}`}>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="relative aspect-[4/3] rounded-2xl overflow-hidden group cursor-pointer"
                  >
                    <img src={loc.image} alt={loc.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-dark-900/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="font-semibold text-white text-lg">{loc.name}</p>
                      <p className="text-sm text-light-300">{loc.count} properties</p>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-28 bg-white dark:bg-dark-900">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp}>
              <Badge variant="primary" className="mb-4">Why Choose Us</Badge>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-dark-900 dark:text-light-50 mb-6 text-balance">
                Your Trusted Partner in Real Estate Excellence
              </h2>
              <p className="text-light-600 dark:text-dark-300 text-lg leading-relaxed mb-8">
                Efficient property management is a key success factor for entrepreneurial activity. We bring expertise, transparency, and dedication to every transaction, ensuring your real estate journey is seamless and rewarding.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {WHY_CHOOSE_US.slice(0, 4).map((item) => (
                  <div key={item.id} className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 shrink-0">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-dark-900 dark:text-light-50">{item.title}</p>
                      <p className="text-xs text-light-500 dark:text-dark-400 mt-0.5">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div {...fadeInUp} className="relative">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=1000&fit=crop" alt="Luxury interior" className="w-full h-full object-cover" />
              </div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="absolute -bottom-6 -left-6 glass rounded-2xl p-5 shadow-large"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary-700 text-white">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-bold text-dark-900 dark:text-light-50">15+ Years</p>
                    <p className="text-sm text-light-500 dark:text-dark-400">Industry Experience</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-light-50 to-white dark:from-dark-950 dark:to-dark-900">
        <div className="container">
          <SectionHeader
            badge="Our Services"
            title="Comprehensive Real Estate Solutions"
            description="From buying and selling to property management, we offer end-to-end services."
          />
          <motion.div
            {...staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {SERVICES.map((service) => (
              <motion.div key={service.id} {...fadeInUp}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="h-full p-6 rounded-2xl bg-white dark:bg-dark-800 border border-light-200 dark:border-dark-700 hover:shadow-large transition-all duration-300 group"
                >
                  <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 group-hover:bg-primary-700 group-hover:text-white transition-all duration-300 mb-5">
                    {service.icon === "home" && <Home className="h-6 w-6" />}
                    {service.icon === "key" && <Home className="h-6 w-6" />}
                    {service.icon === "building-2" && <Building2 className="h-6 w-6" />}
                    {service.icon === "trending-up" && <TrendingUp className="h-6 w-6" />}
                    {service.icon === "hammer" && <Building className="h-6 w-6" />}
                    {service.icon === "scale" && <Shield className="h-6 w-6" />}
                  </div>
                  <h3 className="font-semibold text-lg text-dark-900 dark:text-light-50 mb-2">{service.title}</h3>
                  <p className="text-sm text-light-500 dark:text-dark-400 leading-relaxed mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.slice(0, 3).map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-light-600 dark:text-dark-300">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28 bg-white dark:bg-dark-900">
        <div className="container">
          <SectionHeader
            badge="Testimonials"
            title="What Our Clients Say"
            description="Don't just take our word for it. Here's what our satisfied clients have to say."
          />
          <motion.div
            {...staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {testimonials.map((testimonial) => (
              <motion.div key={testimonial.id} {...fadeInUp}>
                <div className="h-full p-6 rounded-2xl bg-light-50 dark:bg-dark-800 border border-light-200 dark:border-dark-700">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-light-600 dark:text-dark-300 leading-relaxed mb-6 line-clamp-5">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-light-200 dark:border-dark-700">
                    <img src={testimonial.image} alt={testimonial.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="font-semibold text-sm text-dark-900 dark:text-light-50">{testimonial.name}</p>
                      <p className="text-xs text-light-500 dark:text-dark-400">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-20 md:py-28 bg-light-50 dark:bg-dark-950">
        <div className="container">
          <SectionHeader
            badge="Latest Insights"
            title="Real Estate Tips & Market Updates"
            description="Stay informed with the latest trends and insights in Nigerian real estate."
          />
          <motion.div
            {...staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {blogPosts.map((post) => (
              <motion.div key={post.id} {...fadeInUp}>
                <Link href={`/blog/${post.slug}`}>
                  <motion.article
                    whileHover={{ y: -6 }}
                    className="group h-full rounded-2xl overflow-hidden bg-white dark:bg-dark-800 border border-light-200 dark:border-dark-700 hover:shadow-large transition-all duration-300"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-3 left-3">
                        <Badge variant="primary">{post.category.name}</Badge>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-3 text-xs text-light-500 dark:text-dark-400 mb-3">
                        <span>{new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                        <span>·</span>
                        <span>{post.readTime} min read</span>
                      </div>
                      <h3 className="font-semibold text-base text-dark-900 dark:text-light-50 group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors line-clamp-2 mb-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-light-500 dark:text-dark-400 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-light-100 dark:border-dark-700">
                        <img src={post.author.image} alt={post.author.name} className="w-7 h-7 rounded-full object-cover" />
                        <span className="text-xs text-light-600 dark:text-dark-300">{post.author.name}</span>
                      </div>
                    </div>
                  </motion.article>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          <motion.div {...fadeInUp} className="text-center mt-12">
            <Link href="/blog">
              <Button size="lg" variant="outline">
                View All Articles
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=800&fit=crop" alt="Luxury property" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/80" />
        </div>
        <div className="container relative z-10">
          <motion.div {...fadeInUp} className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 text-balance">
              Ready to Find Your Dream Property?
            </h2>
            <p className="text-lg text-primary-100 mb-8">
              Let our expert team guide you through every step of your real estate journey. Get in touch today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" variant="secondary" className="bg-white/90 backdrop-blur-sm text-primary-700 hover:bg-white shadow-glow">
                  <Phone className="h-4 w-4" />
                  Contact Us Today
                </Button>
              </Link>
              <Link href="/properties">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  Browse Properties
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}