"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

interface LegalSection {
  heading: string;
  body: React.ReactNode;
}

export function LegalPage({
  title,
  lastUpdated,
  intro,
  sections,
}: {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <div className="pt-24 pb-20" style={{ background: "var(--bg)" }}>
      <div className="container max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm mb-8 transition-colors" style={{ color: "var(--text-muted)" }}>
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" as const }}>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-3 text-balance" style={{ color: "var(--text)" }}>{title}</h1>
          <p className="text-sm mb-10" style={{ color: "var(--text-muted)" }}>Last updated: {lastUpdated}</p>
          <p className="text-lg leading-relaxed mb-10" style={{ color: "var(--text-secondary)" }}>{intro}</p>
          <div className="space-y-10">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-xl font-semibold mb-3" style={{ color: "var(--text)" }}>{section.heading}</h2>
                <div className="leading-relaxed space-y-3" style={{ color: "var(--text-secondary)" }}>{section.body}</div>
              </section>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
