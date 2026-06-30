"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone, Mail, Search, ChevronRight, Home, HelpCircle, ChevronDown,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { COMPANY_INFO } from "@/constants";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

interface FaqItem {
  value: string;
  question: string;
  answer: string;
}

interface FaqCategory {
  label: string;
  items: FaqItem[];
}

const FAQ_DATA: FaqCategory[] = [
  {
    label: "Buying a Property",
    items: [
      {
        value: "faq-buy-1",
        question: "What should I consider before buying a property in Nigeria?",
        answer:
          "Location, land title documentation (Certificate of Occupancy, Governor's Consent, or Deed of Assignment), soil quality, accessibility, proximity to infrastructure, and your budget. Always conduct due diligence through a qualified lawyer and verify all documents at the Land Registry before committing funds.",
      },
      {
        value: "faq-buy-2",
        question: "What documents should I request when buying land or property?",
        answer:
          "Essential documents include the Certificate of Occupancy (C of O) or Governor's Consent, the survey plan, the deed of assignment or contract of sale, tax clearance certificates, and recent utility bills. For properties on government-acquired land, confirm the Excision or Regularization status. A property lawyer should verify each document before you make any payment.",
      },
      {
        value: "faq-buy-3",
        question: "How do I know if land is not under government acquisition?",
        answer:
          "Conduct a search at the State Land Registry and engage a licensed surveyor to chart the land against the official survey master plan. Land under government acquisition cannot be legally sold or developed. Sites flagged as 'committed' or 'acquired' will block your building plans and future resale.",
      },
      {
        value: "faq-buy-4",
        question: "What is the difference between a C of O and a Governor's Consent?",
        answer:
          "A Certificate of Occupancy (C of O) is the highest form of land title, granted by the state government for a statutory right of occupancy, usually for 99 years. A Governor's Consent is required when you're buying a property that already has a C of O — it transfers the original owner's rights to you. Without it, the transaction is not legally binding.",
      },
      {
        value: "faq-buy-5",
        question: "Can a foreigner buy property in Nigeria?",
        answer:
          "Yes, foreigners and non-residents can legally acquire property in Nigeria, though the maximum statutory right of occupancy is capped at 25 years for non-Nigerians. You will need a Nigerian bank account, a valid residence or business permit for long-term arrangements, and a local solicitor to handle the documentation.",
      },
    ],
  },
  {
    label: "Selling a Property",
    items: [
      {
        value: "faq-sell-1",
        question: "How do I determine the right selling price for my property?",
        answer:
          "Commission a professional valuation surveyor or request a Comparative Market Analysis from a licensed real estate agent. They will benchmark similar properties sold recently in your area, factor in the condition of your building, and advise a realistic price range. Overpricing delays the sale; underpricing shortchanges your investment.",
      },
      {
        value: "faq-sell-2",
        question: "What agents or agency fees should I expect when selling?",
        answer:
          "Real estate agency commissions typically range from 5% to 10% of the sale price, depending on the property type and market. Clarify upfront whether the fee is borne by the buyer, the seller, or split between both, and ensure the agreement is documented in writing.",
      },
      {
        value: "faq-sell-3",
        question: "Do I need all property documents before I can sell?",
        answer:
          "Absolutely. Buyers and their lawyers will require your original title documents, survey plans, tax clearance, and proof of ownership before proceeding. If any documents are missing, initiate the perfection process at the Land Registry early — incomplete paperwork is the single biggest cause of failed transactions.",
      },
    ],
  },
  {
    label: "Renting & Letting",
    items: [
      {
        value: "faq-rent-1",
        question: "What is the typical rent payment structure in Nigeria?",
        answer:
          "Residential rent is often quoted as 'per annum', especially for housing in Lagos and Abuja. Some landlords accept 2-year rents upfront to provide a slight discount. Commercial rents can be annual, biannual, or quarterly depending on the agreement. Always clarify renewal timelines, escalation clauses, and chargeable service fees before signing.",
      },
      {
        value: "faq-rent-2",
        question: "What rights do tenants have against unlawful eviction?",
        answer:
          "Under Nigerian tenancy law, a landlord must serve a formal notice to quit and a notice of owner's intention to recover possession before eviction. The notice period depends on the tenancy duration and is governed by state tenancy laws, such as the Lagos State Tenancy Law of 2011. Tenants can challenge unlawful eviction at the Rent Tribunal.",
      },
      {
        value: "faq-rent-3",
        question: "Should I use a real estate agent when looking to rent?",
        answer:
          "Working with a registered agent saves time, provides access to verified listings, and prevents common fraud. Ensure the agent is licensed by the Nigerian Institution of Estate Surveyors and Valuers (NIESV) or the Estate Surveyors and Valuers Registration Board (ESVARBON), and avoid agents who demand viewing fees before showing you any property.",
      },
    ],
  },
  {
    label: "Investment & Finance",
    items: [
      {
        value: "faq-inv-1",
        question: "Is real estate a good investment in Nigeria right now?",
        answer:
          "Real estate remains one of Nigeria's most resilient asset classes. Rapid urbanisation, rising population, and infrastructure gaps in cities like Lagos, Abuja, and Port Harcourt keep demand high. Off-plan developments in Ibeju-Lekki, Epe, and the greater Lagos corridor have shown particularly strong capital appreciation over the past 5 years. Returns depend on location, timing, and holding period.",
      },
      {
        value: "faq-inv-2",
        question: "What is an off-plan property and should I invest in one?",
        answer:
          "An off-plan property is sold before construction is completed, usually at a discounted price in exchange for early commitment. They offer strong ROI if the developer is reputable, but carry higher risk if the project stalls or the land has title issues. Always verify the developer's track record, the land title, and the building approvals before paying.",
      },
      {
        value: "faq-inv-3",
        question: "How can I access mortgage financing in Nigeria?",
        answer:
          "Primary Mortgage Banks, commercial banks, and the Federal Mortgage Bank of Nigeria offer home loans with interest rates typically ranging from 15% to 28%, depending on the lender and your profile. Loan tenures can extend up to 25 years under the National Housing Fund. Compare offerings, confirm all charges, and engage a mortgage adviser before committing.",
      },
    ],
  },
  {
    label: "Legal & Documentation",
    items: [
      {
        value: "faq-legal-1",
        question: "Why do I need a real estate lawyer?",
        answer:
          "A lawyer performs due diligence on the property, drafts or reviews your sale agreement, verifies that the title is genuine and not under dispute, and handles registration at the Land Registry. Skipping legal review risks fraud, boundary disputes, or buying encumbered property — mistakes that cost multiples of the lawyer's fee to resolve.",
      },
      {
        value: "faq-legal-2",
        question: "What is the perfection of title and why does it matter?",
        answer:
          "Perfection of title is the process of upgrading your land documentation — for instance, obtaining an Excision or Governor's Consent, registering the Deed of Assignment at the Land Registry, and stamping the documents at the Federal Inland Revenue Service. Perfected title protects your ownership and makes the property easier to resell, finance, or develop.",
      },
      {
        value: "faq-legal-3",
        question: "How long does it take to perfect a land title in Nigeria?",
        answer:
          "The process varies by state. In Lagos, a Governor's Consent can take between 90 days and several months, depending on government workload and the completeness of the file. Starting with verified documents and an experienced conveyancing solicitor significantly reduces timeline risk.",
      },
    ],
  },
];

function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = React.useState<string | null>(null);
  return (
    <div className="rounded-2xl divide-y" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderColor: "var(--border)" }}>
      {items.map((item) => {
        const isOpen = open === item.value;
        return (
          <div key={item.value} className="px-4">
            <button
              onClick={() => setOpen(isOpen ? null : item.value)}
              className="w-full flex items-center justify-between py-5 text-left font-semibold text-base transition-colors"
              style={{ color: "var(--text)" }}
            >
              <span>{item.question}</span>
              <ChevronDown className={`h-5 w-5 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} style={{ color: "var(--text-muted)" }} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredData = React.useMemo(() => {
    if (!searchQuery.trim()) return FAQ_DATA;
    const q = searchQuery.toLowerCase();
    return FAQ_DATA
      .map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) =>
            item.question.toLowerCase().includes(q) ||
            item.answer.toLowerCase().includes(q)
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [searchQuery]);

  const totalItems = React.useMemo(() => FAQ_DATA.reduce((acc, c) => acc + c.items.length, 0), []);

  return (
    <div className="overflow-hidden pt-24">
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=800&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-950/85 to-dark-900/70" />
        </div>
        <div className="container relative z-10">
          <motion.div {...fadeInUp} className="max-w-2xl">
            <Badge variant="primary" className="mb-4 bg-primary-500/20 text-primary-300 border-primary-500/30">
              Frequently Asked Questions
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 text-balance">
              Real Estate Answers You Can Trust
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              Clear, professional guidance for buyers, sellers, tenants and investors across the Nigerian real estate market.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20" style={{ background: "var(--bg)" }}>
        <div className="container max-w-3xl mx-auto">
          <motion.div {...fadeInUp} className="mb-10">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5" style={{ color: "var(--text-muted)" }} />
              <Input
                type="text"
                placeholder="Search questions (e.g. land title, mortgage, rent)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 rounded-2xl shadow-soft"
              />
            </div>
            <p className="mt-3 text-sm flex items-center gap-2" style={{ color: "var(--text-muted)" }}>
              <HelpCircle className="h-4 w-4" style={{ color: "var(--primary)" }} />
              {totalItems} real estate questions &middot; {FAQ_DATA.length} topics
            </p>
          </motion.div>

          {filteredData.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg font-medium mb-2" style={{ color: "var(--text)" }}>No matching questions found</p>
              <p style={{ color: "var(--text-muted)" }}>
                Try different keywords or contact our team for personalised assistance.
              </p>
            </div>
          ) : (
            <div className="space-y-10">
              {filteredData.map((category) => (
                <motion.div key={category.label} {...fadeInUp}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl" style={{ background: "var(--primary-light)", color: "var(--primary)" }}>
                      <Home className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="font-display text-xl font-bold" style={{ color: "var(--text)" }}>
                        {category.label}
                      </h2>
                      <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                        {category.items.length} question{category.items.length > 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                  <FaqAccordion items={category.items} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 md:py-20" style={{ background: "var(--bg-alt)" }}>
        <div className="container">
          <motion.div
            {...fadeInUp}
            className="max-w-2xl mx-auto text-center rounded-3xl p-8 md:p-12 text-white shadow-large"
            style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-hover))" }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">Still have questions?</h2>
            <p className="mb-6 leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
              Our team of licensed real estate professionals is ready to help you navigate any transaction.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact">
                <Button size="lg" variant="secondary" style={{ background: "#fff", color: "var(--primary)" }}>
                  <Mail className="h-4 w-4" />
                  Email Our Team
                </Button>
              </Link>
              <a href={`tel:${COMPANY_INFO.phone}`}>
                <Button size="lg" variant="outline" style={{ borderColor: "rgba(255,255,255,0.4)", color: "#fff", background: "rgba(255,255,255,0.1)" }}>
                  <Phone className="h-4 w-4" />
                  {COMPANY_INFO.phone}
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-10" style={{ background: "var(--bg)" }}>
        <div className="container">
          <motion.div {...fadeInUp} className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm" style={{ color: "var(--text-muted)" }}>
            <p>
              All answers are general guidance. For legal advice specific to your situation, please consult a licensed property lawyer.
            </p>
            <Link href="/guides" className="inline-flex items-center gap-1 font-medium hover:gap-2 transition-all" style={{ color: "var(--primary)" }}>
              Read our Buyer&apos;s Guide
              <ChevronRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
