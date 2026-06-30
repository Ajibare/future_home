"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, Home, Key, Building2, TrendingUp, Hammer, Scale,
  CheckCircle2, Phone, Mail, Shield, Award, Users, Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { COMPANY_INFO, SERVICES } from "@/constants";

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

const iconMap: Record<string, React.ElementType> = {
  home: Home,
  key: Key,
  "building-2": Building2,
  "trending-up": TrendingUp,
  hammer: Hammer,
  scale: Scale,
};

const gradientPairs = [
  "from-teal-600 to-teal-700",
  "from-emerald-600 to-emerald-700",
  "from-cyan-600 to-cyan-700",
  "from-sky-600 to-sky-700",
  "from-blue-600 to-blue-700",
  "from-indigo-600 to-indigo-700",
];

export default function ServicesPage() {
  return (
    <div className="overflow-hidden pt-24">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&h=1080&fit=crop"
            alt="Real estate services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
        <div className="container relative z-10">
          <motion.div {...fadeInUp} className="max-w-3xl">
            <Badge variant="primary" className="mb-6" style={{ background: "rgba(15,157,148,0.2)", color: "#5eead4", borderColor: "rgba(15,157,148,0.3)" }}>
              Our Services
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance">
              Comprehensive Real Estate
              <span className="block bg-gradient-to-r from-teal-400 to-teal-300 bg-clip-text text-transparent">
                Solutions
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl">
              At Future Home Properties, we are committed to providing quality and affordable properties to our esteemed clients through active involvement in real estate development of budget properties, while also acquiring properties to meet specific needs of clients.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12" style={{ background: "var(--bg)" }}>
        <div className="container">
          <motion.div
            {...staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 rounded-2xl p-6 md:p-8"
            style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "var(--shadow-soft)" }}
          >
            {[
              { icon: Users, value: "2,500+", label: "Happy Clients" },
              { icon: Home, value: "1,200+", label: "Properties Sold" },
              { icon: Award, value: "15+", label: "Years Experience" },
              { icon: Target, value: "98%", label: "Client Satisfaction" },
            ].map((stat, i) => (
              <motion.div key={i} {...fadeInUp} className="text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl mx-auto mb-3" style={{ background: "var(--primary-light)" }}>
                  <stat.icon className="h-6 w-6" style={{ color: "var(--primary)" }} />
                </div>
                <p className="font-display text-2xl md:text-3xl font-bold" style={{ color: "var(--text)" }}>{stat.value}</p>
                <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Core Business Section */}
      <section className="py-20 md:py-28" style={{ background: "var(--bg-alt)" }}>
        <div className="container">
          <motion.div {...fadeInUp} className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="primary" className="mb-4">What We Do</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-balance" style={{ color: "var(--text)" }}>
              Our Core Business
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              We offer a comprehensive suite of real estate services designed to meet every need, from finding your dream home to maximizing your investment returns.
            </p>
          </motion.div>

          <motion.div {...staggerContainer} className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Key,
                title: "Renting",
                description: "Experience unparalleled living with our curated collection of premium rental properties. Each residence offers sophisticated design, modern amenities, and prime locations, redefining the essence of luxury and comfort. Discover your next exceptional home with us.",
                gradient: "from-teal-600 to-teal-700",
              },
              {
                icon: TrendingUp,
                title: "Investing",
                description: "Unlock exceptional opportunities and build enduring wealth with our exclusive real estate investment portfolio. We offer meticulously vetted properties with high growth potential, expert market insights, and personalized strategies designed to maximize your returns and secure your financial future.",
                gradient: "from-emerald-600 to-emerald-700",
              },
              {
                icon: Home,
                title: "Buying",
                description: "Discover a new standard of ownership with our exquisite collection of properties for sale. From architectural masterpieces to serene retreats, each listing represents the pinnacle of luxury, craftsmanship, and desirability. Let us guide you to the home that transcends expectations and truly reflects your aspirations.",
                gradient: "from-cyan-600 to-cyan-700",
              },
            ].map((service, i) => (
              <motion.div key={i} {...fadeInUp}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="h-full rounded-2xl overflow-hidden group"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "var(--shadow-soft)" }}
                >
                  <div className={`h-2 bg-gradient-to-r ${gradientPairs[i]}`} />
                  <div className="p-8">
                    <div className={`flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${gradientPairs[i]} text-white mb-6 shadow-lg`}>
                      <service.icon className="h-8 w-8" />
                    </div>
                    <h3 className="font-display text-2xl font-bold mb-4" style={{ color: "var(--text)" }}>
                      {service.title}
                    </h3>
                    <p className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {service.description}
                    </p>
                    <div className="mt-6 pt-6" style={{ borderTop: "1px solid var(--border)" }}>
                      <Link href="/contact" className="inline-flex items-center gap-2 font-medium transition-all hover:gap-3" style={{ color: "var(--primary)" }}>
                        Learn More <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* All Services Grid */}
      <section className="py-20 md:py-28" style={{ background: "var(--bg)" }}>
        <div className="container">
          <motion.div {...fadeInUp} className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="primary" className="mb-4">Expert Solutions</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-balance" style={{ color: "var(--text)" }}>
              Comprehensive Service Portfolio
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              From property sales to legal conveyancing, our team of experts provides end-to-end solutions for all your real estate needs.
            </p>
          </motion.div>

          <motion.div {...staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => {
              const Icon = iconMap[service.icon] || Home;
              return (
                <motion.div key={service.id} {...fadeInUp}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="h-full rounded-2xl p-6 group"
                    style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "var(--shadow-soft)" }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="flex items-center justify-center w-12 h-12 rounded-xl transition-transform group-hover:scale-110"
                        style={{ background: "var(--primary-light)" }}
                      >
                        <Icon className="h-6 w-6" style={{ color: "var(--primary)" }} />
                      </div>
                      <h3 className="font-semibold text-lg" style={{ color: "var(--text)" }}>
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.slice(0, 3).map((feature, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                          <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: "var(--success)" }} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-28" style={{ background: "var(--bg-alt)" }}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp}>
              <Badge variant="primary" className="mb-4">Why Choose Us</Badge>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-balance" style={{ color: "var(--text)" }}>
                Your Trusted Partner in Real Estate
              </h2>
              <p className="text-lg leading-relaxed mb-8" style={{ color: "var(--text-secondary)" }}>
                With over 15 years of experience in the Nigerian real estate market, we have built our reputation on trust, transparency, and exceptional results. Our team of professionals is dedicated to helping you achieve your real estate goals.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Shield, title: "Trusted & Licensed", desc: "Fully licensed and regulated real estate professionals" },
                  { icon: Award, title: "Award Winning", desc: "Recognized for excellence in real estate services" },
                  { icon: Users, title: "Client-Focused", desc: "Your needs and goals are our top priority" },
                  { icon: Target, title: "Results-Driven", desc: "Proven track record of successful transactions" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0" style={{ background: "var(--primary-light)" }}>
                      <item.icon className="h-5 w-5" style={{ color: "var(--primary)" }} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: "var(--text)" }}>{item.title}</p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div {...fadeInUp} className="relative">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop"
                  alt="Professional real estate team"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 rounded-2xl p-5 shadow-large" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl text-white" style={{ background: "var(--primary)" }}>
                    <Award className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-bold" style={{ color: "var(--text)" }}>15+ Years</p>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>Industry Excellence</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=800&fit=crop"
            alt="Luxury property"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(15,122,110,0.92), rgba(13,148,136,0.85))" }} />
        </div>
        <div className="container relative z-10">
          <motion.div {...fadeInUp} className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 text-balance">
              Ready to Start Your Real Estate Journey?
            </h2>
            <p className="text-lg text-teal-100 mb-8 max-w-xl mx-auto">
              Whether you're buying, selling, renting, or investing, our team of experts is here to guide you every step of the way. Get in touch today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" variant="secondary" style={{ background: "#fff", color: "var(--primary)" }}>
                  <Phone className="h-4 w-4" />
                  Contact Us Today
                </Button>
              </Link>
              <Link href="/properties">
                <Button size="lg" variant="outline" style={{ borderColor: "rgba(255,255,255,0.3)", color: "#fff" }}>
                  Browse Properties
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.2)" }}>
              <a href={`tel:${COMPANY_INFO.phone}`} className="flex items-center gap-2 text-white/90 hover:text-white transition-colors">
                <Phone className="h-4 w-4" />
                <span className="text-sm">{COMPANY_INFO.phone}</span>
              </a>
              <a href={`mailto:${COMPANY_INFO.email}`} className="flex items-center gap-2 text-white/90 hover:text-white transition-colors">
                <Mail className="h-4 w-4" />
                <span className="text-sm">{COMPANY_INFO.email}</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
