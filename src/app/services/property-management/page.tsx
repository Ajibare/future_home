"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, Home, Key, Building2, TrendingUp, Hammer, Scale,
  CheckCircle2, Phone, Mail, Shield, Clock, Users, Award, Wrench,
  FileText, MapPin, Calculator, ClipboardCheck, HandshakeIcon,
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

interface ServicePageProps {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  features: { icon: React.ElementType; title: string; description: string }[];
  benefits: string[];
  process: { step: string; title: string; description: string }[];
  ctaTitle: string;
  ctaDescription: string;
}

function ServicePage({
  badge,
  title,
  subtitle,
  description,
  icon: Icon,
  features,
  benefits,
  process,
  ctaTitle,
  ctaDescription,
}: ServicePageProps) {
  return (
    <div className="overflow-hidden pt-24">
      {/* Hero */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&h=1080&fit=crop"
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
        <div className="container relative z-10">
          <motion.div {...fadeInUp} className="max-w-3xl">
            <Badge variant="primary" className="mb-6" style={{ background: "rgba(15,157,148,0.2)", color: "#5eead4", borderColor: "rgba(15,157,148,0.3)" }}>
              {badge}
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Description */}
      <section className="py-16 md:py-20" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp}>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl" style={{ background: "var(--primary-light)" }}>
                  <Icon className="h-8 w-8" style={{ color: "var(--primary)" }} />
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--primary)" }}>Our Service</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>Professional excellence</p>
                </div>
              </div>
              <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {description}
              </p>
            </motion.div>
            <motion.div {...fadeInUp}>
              <div className="rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop"
                  alt={title}
                  className="w-full h-80 object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-20" style={{ background: "var(--bg-alt)" }}>
        <div className="container">
          <motion.div {...fadeInUp} className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: "var(--text)" }}>
              What We Offer
            </h2>
            <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
              Comprehensive solutions tailored to your needs
            </p>
          </motion.div>
          <motion.div {...staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div key={i} {...fadeInUp}>
                <div className="h-full rounded-2xl p-6" style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "var(--shadow-soft)" }}>
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl mb-4" style={{ background: "var(--primary-light)" }}>
                    <feature.icon className="h-6 w-6" style={{ color: "var(--primary)" }} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2" style={{ color: "var(--text)" }}>{feature.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-20" style={{ background: "var(--bg)" }}>
        <div className="container">
          <motion.div {...fadeInUp} className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: "var(--text)" }}>
              Why Choose Us
            </h2>
          </motion.div>
          <motion.div {...staggerContainer} className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {benefits.map((benefit, i) => (
              <motion.div key={i} {...fadeInUp}>
                <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                  <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0" style={{ color: "var(--success)" }} />
                  <span style={{ color: "var(--text-secondary)" }}>{benefit}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-20" style={{ background: "var(--bg-alt)" }}>
        <div className="container">
          <motion.div {...fadeInUp} className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: "var(--text)" }}>
              Our Process
            </h2>
            <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
              A streamlined approach to deliver exceptional results
            </p>
          </motion.div>
          <motion.div {...staggerContainer} className="grid md:grid-cols-4 gap-6">
            {process.map((item, i) => (
              <motion.div key={i} {...fadeInUp}>
                <div className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full mx-auto mb-4 text-white font-bold text-xl" style={{ background: "var(--primary)" }}>
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-2" style={{ color: "var(--text)" }}>{item.title}</h3>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=800&fit=crop" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(15,122,110,0.92), rgba(13,148,136,0.85))" }} />
        </div>
        <div className="container relative z-10">
          <motion.div {...fadeInUp} className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">{ctaTitle}</h2>
            <p className="text-lg text-teal-100 mb-8">{ctaDescription}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" variant="secondary" style={{ background: "#fff", color: "var(--primary)" }}>
                  <Phone className="h-4 w-4" /> Get in Touch
                </Button>
              </Link>
              <Link href="/list-property?type=sale">
                <Button size="lg" variant="outline" style={{ borderColor: "rgba(255,255,255,0.3)", color: "#fff", background: "transparent" }}>
                  View Properties <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

const propertyManagementFeatures = [
  { icon: Home, title: "Tenant Management", description: "Comprehensive tenant screening, onboarding, and ongoing relationship management." },
  { icon: Wrench, title: "Maintenance & Repairs", description: "24/7 maintenance coordination with trusted contractors and vendors." },
  { icon: Calculator, title: "Financial Reporting", description: "Detailed monthly statements, rent collection, and expense tracking." },
  { icon: Shield, title: "Property Inspections", description: "Regular inspections to ensure property standards and prevent issues." },
  { icon: FileText, title: "Lease Administration", description: "Professional lease drafting, renewals, and compliance management." },
  { icon: Users, title: "Owner Communication", description: "Transparent, regular updates on your property performance." },
];

const propertyManagementBenefits = [
  "Maximize rental income and occupancy rates",
  "Reduce vacancy periods with proactive marketing",
  "Maintain property value through preventive maintenance",
  "Ensure legal compliance with all regulations",
  "Access to vetted contractors and service providers",
  "Real-time financial reporting and analytics",
  "Professional tenant screening and selection",
  "24/7 emergency response and support",
];

const propertyManagementProcess = [
  { step: "1", title: "Consultation", description: "We assess your property and discuss your goals." },
  { step: "2", title: "Agreement", description: "We establish terms and service level agreements." },
  { step: "3", title: "Onboarding", description: "We take over all management responsibilities." },
  { step: "4", title: "Ongoing", description: "We provide continuous management and reporting." },
];

export default function PropertyManagementPage() {
  return (
    <ServicePage
      badge="Property Management"
      title="Professional Property Management"
      subtitle="Maximize your investment returns with our comprehensive property management solutions."
      description="Our property management service takes the stress out of being a landlord. We handle everything from tenant acquisition to maintenance, ensuring your investment property generates consistent returns while maintaining its value. With over 15 years of experience managing properties across Lagos, we have the expertise and systems to deliver exceptional results."
      icon={Building2}
      features={propertyManagementFeatures}
      benefits={propertyManagementBenefits}
      process={propertyManagementProcess}
      ctaTitle="Ready to Maximize Your Rental Income?"
      ctaDescription="Let us handle the day-to-day management while you enjoy the returns. Contact us today for a free property assessment."
    />
  );
}
