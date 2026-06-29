"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, ArrowUp, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { COMPANY_INFO } from "@/constants";

export function FloatingElements() {
  const [showBackToTop, setShowBackToTop] = React.useState(false);
  const [showTooltip, setShowTooltip] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(true), 3000);
    const hideTimer = setTimeout(() => setShowTooltip(false), 8000);
    return () => { clearTimeout(timer); clearTimeout(hideTimer); };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {showBackToTop && (
          <motion.button initial={{ opacity: 0, scale: 0.8, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: 10 }} onClick={scrollToTop} className="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-dark-800 border border-light-200 dark:border-dark-700 shadow-medium text-dark-700 dark:text-light-200 hover:bg-light-50 dark:hover:bg-dark-700 transition-colors" aria-label="Back to top">
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
      <div className="relative">
        <AnimatePresence>
          {showTooltip && (
            <motion.div initial={{ opacity: 0, x: 10, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: 10, scale: 0.9 }} className="absolute bottom-14 right-0 w-48 rounded-xl bg-white dark:bg-dark-800 border border-light-200 dark:border-dark-700 shadow-medium p-3">
              <p className="text-xs text-dark-700 dark:text-light-300">Need help? Chat with us on WhatsApp!</p>
            </motion.div>
          )}
        </AnimatePresence>
        <a href="https://wa.me/2348088880708" target="_blank" rel="noopener noreferrer" onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)} className="flex items-center justify-center w-14 h-14 rounded-full bg-green-500 text-white shadow-glow hover:bg-green-600 transition-all hover:scale-110" aria-label="Chat on WhatsApp">
          <MessageCircle className="h-6 w-6" />
        </a>
      </div>
    </div>
  );
}