"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail, Phone, MapPin, Clock, ArrowRight,
  Send, Heart, Globe, MessageCircle, ExternalLink, Play
} from "lucide-react";
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
    <footer className="bg-dark-900 dark:bg-dark-950 text-light-200">
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <Logo width={48} height={48} />
              <div className="flex flex-col">
                <span className="font-display text-xl font-bold text-white">Future Home</span>
                <span className="text-xs uppercase tracking-widest text-light-400">Properties</span>
              </div>
            </Link>
            <p className="text-light-400 text-sm leading-relaxed max-w-sm">
              Your comfort matters so much to our business and we are dedicated to serving you.
              Discover premium real estate properties across Nigeria.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-light-400">
                <MapPin className="h-4 w-4 text-primary-500 shrink-0" />
                <span>{COMPANY_INFO.address}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-light-400">
                <Phone className="h-4 w-4 text-primary-500 shrink-0" />
                <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-primary-400 transition-colors">{COMPANY_INFO.phone}</a>
              </div>
              <div className="flex items-center gap-3 text-sm text-light-400">
                <Mail className="h-4 w-4 text-primary-500 shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-primary-400 transition-colors">{COMPANY_INFO.email}</a>
              </div>
              <div className="flex items-center gap-3 text-sm text-light-400">
                <Clock className="h-4 w-4 text-primary-500 shrink-0" />
                <span>Mon-Fri: {COMPANY_INFO.hours.weekdays}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {COMPANY_INFO.social.facebook && (
                <a href={COMPANY_INFO.social.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-xl bg-dark-800 hover:bg-primary-700 text-light-400 hover:text-white transition-all duration-200" aria-label="Facebook">
                  <SocialIcon type="facebook" className="h-4 w-4" />
                </a>
              )}
              {COMPANY_INFO.social.twitter && (
                <a href={COMPANY_INFO.social.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-xl bg-dark-800 hover:bg-primary-700 text-light-400 hover:text-white transition-all duration-200" aria-label="Twitter">
                  <SocialIcon type="twitter" className="h-4 w-4" />
                </a>
              )}
              {COMPANY_INFO.social.instagram && (
                <a href={COMPANY_INFO.social.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-xl bg-dark-800 hover:bg-primary-700 text-light-400 hover:text-white transition-all duration-200" aria-label="Instagram">
                  <SocialIcon type="instagram" className="h-4 w-4" />
                </a>
              )}
              {COMPANY_INFO.social.linkedin && (
                <a href={COMPANY_INFO.social.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-xl bg-dark-800 hover:bg-primary-700 text-light-400 hover:text-white transition-all duration-200" aria-label="LinkedIn">
                  <SocialIcon type="linkedin" className="h-4 w-4" />
                </a>
              )}
              {COMPANY_INFO.social.youtube && (
                <a href={COMPANY_INFO.social.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-xl bg-dark-800 hover:bg-primary-700 text-light-400 hover:text-white transition-all duration-200" aria-label="YouTube">
                  <SocialIcon type="youtube" className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Properties</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.buy.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-light-400 hover:text-primary-400 transition-colors flex items-center gap-1 group">
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
              {FOOTER_LINKS.rent.slice(0, 2).map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-light-400 hover:text-primary-400 transition-colors flex items-center gap-1 group">
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-light-400 hover:text-primary-400 transition-colors flex items-center gap-1 group">
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="font-semibold text-white mb-4 mt-6">Resources</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.resources.slice(0, 3).map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-light-400 hover:text-primary-400 transition-colors flex items-center gap-1 group">
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Stay Updated</h4>
            <p className="text-sm text-light-400 mb-4">Subscribe to our newsletter for the latest properties and market insights.</p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-dark-800 border-dark-700 text-white placeholder:text-dark-500 focus:ring-primary-500"
                required
              />
              <Button type="submit" fullWidth disabled={isSubscribing} loading={isSubscribing}>
                <Send className="h-4 w-4" />
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-dark-800">
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-light-500">
            &copy; {currentYear} Future Home Properties. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {FOOTER_LINKS.legal.map((link) => (
              <Link key={link.label} href={link.href} className="text-xs text-light-500 hover:text-primary-400 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
          <p className="text-xs text-light-500 flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> in Lagos
          </p>
        </div>
      </div>
    </footer>
  );
}