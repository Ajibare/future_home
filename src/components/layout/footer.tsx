"use client";

import * as React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock, ArrowRight, Send, Heart, Globe, MessageCircle, ExternalLink, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/ui/logo";
import { COMPANY_INFO, FOOTER_LINKS } from "@/constants";
import { toast } from "sonner";

const SocialIcon = ({ type, className }: { type: string; className?: string }) => {
  switch (type) {
    case "facebook": return <Globe className={className} />;
    case "twitter": return <MessageCircle className={className} />;
    case "instagram": return <ExternalLink className={className} />;
    case "linkedin": return <Globe className={className} />;
    case "youtube": return <Play className={className} />;
    default: return <Globe className={className} />;
  }
};

export function Footer() {
  const [email, setEmail] = React.useState("");
  const [isSubscribing, setIsSubscribing] = React.useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribing(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Successfully subscribed to newsletter!");
    setEmail("");
    setIsSubscribing(false);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: "var(--bg-alt)", borderTop: "1px solid var(--border)", color: "var(--text-secondary)" }}>
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <Logo width={48} height={48} />
              <div className="flex flex-col">
                <span className="font-display text-xl font-bold" style={{ color: "var(--text)" }}>Future Homes</span>
                <span className="text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Properties</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm">
              Your comfort matters so much to our business and we are dedicated to serving you. Discover premium real estate properties across Nigeria.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 shrink-0" style={{ color: "var(--primary)" }} />
                <span>{COMPANY_INFO.address}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 shrink-0" style={{ color: "var(--primary)" }} />
                <a href={`tel:${COMPANY_INFO.phone}`} className="transition-colors" style={{ color: "var(--text-secondary)" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--primary)"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-secondary)"}>{COMPANY_INFO.phone}</a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 shrink-0" style={{ color: "var(--primary)" }} />
                <a href={`mailto:${COMPANY_INFO.email}`} className="transition-colors" style={{ color: "var(--text-secondary)" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--primary)"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-secondary)"}>{COMPANY_INFO.email}</a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock className="h-4 w-4 shrink-0" style={{ color: "var(--primary)" }} />
                <span>Mon-Fri: {COMPANY_INFO.hours.weekdays}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {Object.entries(COMPANY_INFO.social).map(([key, url]) => url && (
                <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-secondary)" }} aria-label={key}>
                  <SocialIcon type={key} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4" style={{ color: "var(--text)" }}>Properties</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.buy.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm flex items-center gap-1 group" style={{ color: "var(--text-muted)" }}>
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4" style={{ color: "var(--text)" }}>Services</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm flex items-center gap-1 group" style={{ color: "var(--text-muted)" }}>
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="font-semibold mb-4 mt-6" style={{ color: "var(--text)" }}>Resources</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.resources.slice(0, 3).map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm flex items-center gap-1 group" style={{ color: "var(--text-muted)" }}>
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4" style={{ color: "var(--text)" }}>Stay Updated</h4>
            <p className="text-sm mb-4">Subscribe to our newsletter for the latest properties and market insights.</p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <Button type="submit" fullWidth disabled={isSubscribing} loading={isSubscribing}>
                <Send className="h-4 w-4" />
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid var(--border)" }}>
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            &copy; {currentYear} Future Homes Properties. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {FOOTER_LINKS.legal.map((link) => (
              <Link key={link.label} href={link.href} className="text-xs transition-colors" style={{ color: "var(--text-muted)" }}>{link.label}</Link>
            ))}
          </div>
          <a href="https://sapok.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs transition-all duration-200" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}>
            <Heart className="h-3 w-3" style={{ color: "var(--primary)" }} />
            <span>Made in Lagos</span>
            <span style={{ color: "var(--text-muted)" }}>·</span>
            <span style={{ color: "var(--primary)", fontWeight: 500 }}>Developed by SAPOK</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
