"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle2, Phone, Mail, ArrowRight, Clock, User, Eye, Calendar,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { COMPANY_INFO } from "@/constants";

type Section = { id: string; title: string; body: string[] };

const GUIDE: Section[] = [
  {
    id: "intro",
    title: "The 2026 Home Buying Story Begins",
    body: [
      "In 2026, many buyers scroll through listings late at night, asking themselves the same question: Is now the right time to buy a home? The market feels calmer than before, but it still rewards buyers who act with purpose. Buying a home in 2026 is not about timing the market. It is about understanding it.",
      "Today's real estate market favors prepared buyers. Home prices have steadied in many areas. Mortgage rates feel more predictable. Technology now shapes nearly every step of the home buying process. Buyers who succeed take time to learn the market and plan their moves.",
    ],
  },
  {
    id: "market",
    title: "Understanding the Housing Market in 2026",
    body: [
      "The housing market in 2026 looks more balanced than in recent years. Buyers face less competition in many neighborhoods, but desirable homes still move fast. Sellers expect serious offers backed by strong financing.",
      "Smart buyers study local trends before touring homes. They look at pricing patterns, days on market, and neighborhood demand. This knowledge builds confidence and prevents costly mistakes.",
    ],
  },
  {
    id: "finances",
    title: "Preparing Your Finances to Buy a Home",
    body: [
      "Every successful home buying journey starts with strong financial preparation. In 2026, lenders focus on credit scores, income stability, and debt levels. Buyers who review their credit early often qualify for better mortgage rates.",
      "A clear budget keeps emotions in check. Monthly payments should feel comfortable, not stressful. Buyers also plan for property taxes, insurance, and long-term maintenance. Saving for a down payment and closing costs feels more manageable with a clear goal.",
    ],
  },
  {
    id: "preapproval",
    title: "Why Mortgage Pre-Approval Matters More Than Ever",
    body: [
      "Mortgage pre-approval sets the tone for the entire process. It shows sellers that you are ready to buy. It also defines your true price range.",
      "In 2026, buyers compare lenders more carefully. Many explore conventional loans, FHA loans, VA loans, adjustable-rate mortgages, and tailored products available through local lenders and mortgage professionals in your target country. The right loan choice depends on your long-term plans, not just the lowest rate.",
    ],
  },
  {
    id: "hunting",
    title: "House Hunting With Purpose in 2026",
    body: [
      "Home buying technology has changed, but emotions remain the same. Buyers still walk into homes and imagine daily life there. Virtual tours help narrow choices, but in-person visits seal decisions.",
      "Energy-efficient homes attract strong interest in 2026. Smart features add value and convenience. Buyers also think about resale value, even while falling in love with a space.",
    ],
  },
  {
    id: "offer",
    title: "Making a Strong Offer in Today's Real Estate Market",
    body: [
      "When the right home appears, strategy matters. Price plays a role, but certainty often matters more. Sellers prefer clean offers with solid financing and flexible timelines.",
      "A skilled real estate agent guides this step. They analyze market data, structure competitive offers, and protect the buyer's interests. Negotiation relies on facts, not pressure.",
    ],
  },
  {
    id: "inspections",
    title: "Inspections, Appraisals, and Peace of Mind",
    body: [
      "After offer acceptance, due diligence begins. Home inspections uncover issues that could affect safety or cost. Appraisals confirm the home's value for the lender.",
      "In 2026, digital tools speed up this phase. Buyers who stay engaged avoid surprises and move forward with confidence.",
    ],
  },
  {
    id: "closing",
    title: "Closing Day and the Start of Homeownership",
    body: [
      "Closing feels faster and simpler than in the past. Many documents are signed digitally. Final walk-throughs confirm that the home matches expectations. When buyers receive the keys, the journey shifts. Homeownership begins.",
    ],
  },
  {
    id: "life",
    title: "Life After Buying a Home in 2026",
    body: [
      "Buying a home marks the start of a long-term investment. New homeowners set maintenance plans, build equity, and personalize their space. They also watch market conditions for future opportunities.",
      "There is no perfect year to buy a home. Still, 2026 offers real opportunity for buyers who prepare and act with confidence. With the right plan and the right real estate professional, buying a home in 2026 can feel clear, strategic, and rewarding.",
    ],
  },
  {
    id: "sources",
    title: "Sources",
    body: [
      "National Association of Realtors — Existing Home Sales Reports",
      "Federal Housing Finance Agency — House Price Index",
      "U.S. Census Bureau — New Residential Sales & Construction",
      "Mortgage Bankers Association — Weekly Applications Survey",
      "S&P CoreLogic Case-Shiller Home Price Indices",
    ],
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

function TableOfContents() {
  return (
    <div className="rounded-2xl p-5" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
      <h3 className="font-semibold mb-4 text-base" style={{ color: "var(--text)" }}>In this guide</h3>
      <ul className="space-y-1.5">
        {GUIDE.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="text-sm transition-colors flex items-start gap-2"
              style={{ color: "var(--text-secondary)" }}
            >
              <ArrowRight className="h-3 w-3 mt-1.5 shrink-0" style={{ color: "var(--primary)" }} />
              <span>{section.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function BuyersGuidePage() {
  return (
    <div className="overflow-hidden pt-24">
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=800&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-950/85 to-dark-900/70" />
        </div>
        <div className="container relative z-10">
          <motion.div {...fadeInUp} className="max-w-2xl">
            <Badge variant="primary" className="mb-4 bg-primary-500/20 text-primary-300 border-primary-500/30">
              Buyer&apos;s Guide
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 text-balance">
              The Ultimate Guide: How to Buy a Home in 2026
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-light-300">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" /> Future Home Properties
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> 15 min read
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" /> Updated 2026
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-10">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 max-w-3xl"
            >
              {GUIDE.map((section) => (
                <section key={section.id} id={section.id} className="mb-14 last:mb-0 scroll-mt-28">
                  <h2 className="font-display text-2xl md:text-3xl font-bold mb-5" style={{ color: "var(--text)" }}>
                    {section.title}
                  </h2>
                  <div className="leading-relaxed space-y-5 text-base" style={{ color: "var(--text-secondary)" }}>
                    {section.id === "sources" ? (
                      <ul className="list-none space-y-2.5">
                        {section.body.map((src) => (
                          <li key={src} className="flex items-start gap-3">
                            <CheckCircle2 className="h-4 w-4 mt-1 shrink-0" style={{ color: "var(--primary)" }} />
                            <span>{src}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      section.body.map((paragraph) => (
                        <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                      ))
                    )}
                  </div>
                  {section.id === "intro" && (
                    <div className="mt-8 p-4 rounded-2xl flex flex-wrap items-center gap-x-6 gap-y-3 text-sm" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}>
                      <span className="flex items-center gap-2"><User className="h-4 w-4" style={{ color: "var(--primary)" }} /> Future Home Properties</span>
                      <span className="flex items-center gap-2"><Clock className="h-4 w-4" style={{ color: "var(--primary)" }} /> 15 min read</span>
                      <span className="flex items-center gap-2"><Eye className="h-4 w-4" style={{ color: "var(--primary)" }} /> Premium Guide</span>
                      <span className="flex items-center gap-2"><Calendar className="h-4 w-4" style={{ color: "var(--primary)" }} /> Updated 2026</span>
                    </div>
                  )}
                </section>
              ))}
            </motion.article>

            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="sticky top-28 space-y-6">
                <TableOfContents />
                <div className="rounded-2xl p-6 text-white" style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-hover))" }}>
                  <h3 className="font-semibold text-lg mb-2">Free Consultation</h3>
                  <p className="text-sm mb-4 leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
                    Talk to our real estate professionals and buy your first home with confidence.
                  </p>
                  <Link href="/contact">
                    <Button fullWidth variant="secondary" style={{ background: "#fff", color: "var(--primary)" }}>
                      <Phone className="h-4 w-4" />
                      Get in Touch
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20" style={{ background: "var(--bg-alt)" }}>
        <div className="container">
          <motion.div
            {...fadeInUp}
            className="max-w-2xl mx-auto text-center rounded-3xl p-8 md:p-12 text-white shadow-large"
            style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-hover))" }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">Need personalised guidance?</h2>
            <p className="mb-6 leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
              Our licensed agents understand every market. Book a private session and get advice tailored to your situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact">
                <Button size="lg" variant="secondary" style={{ background: "#fff", color: "var(--primary)" }}>
                  <Mail className="h-4 w-4" />
                  Email Our Team
                </Button>
              </Link>
              <a href={`tel:${COMPANY_INFO.phone}`}>
                <Button size="lg" variant="outline" style={{ borderColor: "rgba(255,255,255,0.4)", color: "#fff" }}>
                  <Phone className="h-4 w-4" />
                  {COMPANY_INFO.phone}
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
