"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, Award, Target, Eye, Users, CheckCircle2,
  Star, Mail, Phone, Heart, Globe, MessageCircle, ExternalLink, Play
} from "lucide-react";

const SocialIcon = ({ type, className }: { type: string; className?: string }) => {
  switch (type) {
    case "linkedin": return <Globe className={className} />;
    case "twitter": return <MessageCircle className={className} />;
    case "instagram": return <ExternalLink className={className} />;
    default: return <Globe className={className} />;
  }
};
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { COMPANY_INFO, STATISTICS, TEAM_MEMBERS, WHY_CHOOSE_US } from "@/constants";

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

export default function AboutPage() {
  return (
    <div className="overflow-hidden pt-24">
      {/* Hero */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=800&fit=crop" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-950/85 to-dark-900/70" />
        </div>
        <div className="container relative z-10">
          <motion.div {...fadeInUp} className="max-w-2xl">
            <Badge variant="primary" className="mb-4 bg-primary-500/20 text-primary-300 border-primary-500/30">About Us</Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 text-balance">
              Learn More About Us
            </h1>
            <p className="text-lg text-light-300 leading-relaxed">
              It will interest you to know that we are ever near you. Your comfort matters so much to our business and we are dedicated to serving you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-28 bg-white dark:bg-dark-900">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp}>
              <Badge variant="primary" className="mb-4">Our Story</Badge>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-dark-900 dark:text-light-50 mb-6 text-balance">
                Building Dreams, Delivering Excellence
              </h2>
              <div className="space-y-4 text-light-600 dark:text-dark-300 leading-relaxed">
                <p>
                  Future Home Properties was founded with a singular vision: to transform the real estate experience in Nigeria. What started as a small team of passionate professionals has grown into one of Lagos&apos; most trusted real estate firms.
                </p>
                <p>
                  Over the years, we have helped thousands of families find their dream homes, assisted investors in building profitable portfolios, and partnered with developers in creating iconic properties that define Lagos&apos; skyline.
                </p>
                <p>
                  Our journey is driven by a commitment to excellence, transparency, and an unwavering dedication to our clients&apos; success. Every property we represent, every deal we close, and every relationship we build is a testament to our values.
                </p>
              </div>
            </motion.div>
            <motion.div {...fadeInUp} className="relative">
              <div className="rounded-2xl overflow-hidden aspect-[4/5]">
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=1000&fit=crop" alt="Our office" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 glass rounded-2xl p-5 shadow-large">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary-700 text-white">
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-bold text-dark-900 dark:text-light-50">15+ Years</p>
                    <p className="text-sm text-light-500 dark:text-dark-400">Excellence in Real Estate</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 md:py-28 bg-light-50 dark:bg-dark-950">
        <div className="container">
          <motion.div {...staggerContainer} className="grid md:grid-cols-2 gap-8">
            <motion.div {...fadeInUp} className="rounded-2xl bg-white dark:bg-dark-800 border border-light-200 dark:border-dark-700 p-8 shadow-soft">
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 mb-5">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="font-display text-2xl font-bold text-dark-900 dark:text-light-50 mb-4">Our Mission</h3>
              <p className="text-light-600 dark:text-dark-300 leading-relaxed">
                To provide exceptional real estate services that exceed our clients&apos; expectations. We are committed to making property ownership and investment accessible, transparent, and rewarding for everyone. Efficient property management is a key success factor for entrepreneurial activity, and we strive to be the catalyst that transforms our clients&apos; real estate aspirations into reality.
              </p>
            </motion.div>
            <motion.div {...fadeInUp} className="rounded-2xl bg-white dark:bg-dark-800 border border-light-200 dark:border-dark-700 p-8 shadow-soft">
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 mb-5">
                <Eye className="h-6 w-6" />
              </div>
              <h3 className="font-display text-2xl font-bold text-dark-900 dark:text-light-50 mb-4">Our Vision</h3>
              <p className="text-light-600 dark:text-dark-300 leading-relaxed">
                To be Nigeria&apos;s most trusted and innovative real estate company, setting the standard for excellence in property sales, rentals, and management. We envision a future where every Nigerian has access to quality housing and where real estate investment is a pathway to generational wealth.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-28 bg-white dark:bg-dark-900">
        <div className="container">
          <motion.div {...fadeInUp} className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="primary" className="mb-4">Why Choose Us?</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-dark-900 dark:text-light-50 mb-4 text-balance">
              Efficient Property Management
            </h2>
            <p className="text-light-600 dark:text-dark-300 text-lg leading-relaxed">
              Efficient property management is a key success factor for entrepreneurial activity in the real estate sector. Here&apos;s why we stand out.
            </p>
          </motion.div>
          <motion.div {...staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE_US.map((item) => (
              <motion.div key={item.id} {...fadeInUp}>
                <div className="h-full p-6 rounded-2xl bg-light-50 dark:bg-dark-800 border border-light-200 dark:border-dark-700 hover:shadow-medium transition-all duration-300">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 mb-4">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-dark-900 dark:text-light-50 mb-2">{item.title}</h3>
                  <p className="text-sm text-light-500 dark:text-dark-400 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-primary-800 to-primary-700">
        <div className="container">
          <motion.div {...staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATISTICS.map((stat) => (
              <motion.div key={stat.id} {...fadeInUp} className="text-center">
                <p className="font-display text-4xl md:text-5xl font-bold text-white">
                  {stat.prefix}{stat.value}{stat.suffix}
                </p>
                <p className="text-sm text-primary-100 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 md:py-28 bg-light-50 dark:bg-dark-950">
        <div className="container">
          <motion.div {...fadeInUp} className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="primary" className="mb-4">Our Team</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-dark-900 dark:text-light-50 mb-4 text-balance">
              Meet Our Leadership Team
            </h2>
            <p className="text-light-600 dark:text-dark-300 text-lg leading-relaxed">
              The experienced professionals driving our vision forward.
            </p>
          </motion.div>
          <motion.div {...staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((member) => (
              <motion.div key={member.id} {...fadeInUp}>
                <motion.div whileHover={{ y: -6 }} className="h-full rounded-2xl bg-white dark:bg-dark-800 border border-light-200 dark:border-dark-700 overflow-hidden hover:shadow-large transition-all duration-300 group">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                      {member.linkedin && <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-9 h-9 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-all" aria-label="LinkedIn"><SocialIcon type="linkedin" className="h-4 w-4" /></a>}
                      {member.twitter && <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-9 h-9 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-all" aria-label="Twitter"><SocialIcon type="twitter" className="h-4 w-4" /></a>}
                      {member.instagram && <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-9 h-9 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-all" aria-label="Instagram"><SocialIcon type="instagram" className="h-4 w-4" /></a>}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-dark-900 dark:text-light-50">{member.name}</h3>
                    <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-2">{member.role}</p>
                    <p className="text-xs text-light-500 dark:text-dark-400 line-clamp-3 leading-relaxed">{member.bio}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-white dark:bg-dark-900">
        <div className="container">
          <motion.div {...fadeInUp} className="rounded-3xl bg-gradient-to-r from-primary-800 to-primary-700 p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
            </div>
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Ready to Work With Us?</h2>
              <p className="text-lg text-primary-100 mb-8 max-w-xl mx-auto">
                Let our expert team help you find the perfect property or maximize your real estate investment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" variant="secondary" className="bg-white text-primary-700 hover:bg-light-100">
                    <Mail className="h-4 w-4" />
                    Get in Touch
                  </Button>
                </Link>
                <Link href="/properties">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    View Properties
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}