"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, Search, Heart, ChevronDown, Phone,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { useUIStore, usePropertyStore, useThemeStore } from "@/stores";
import { ThemeSwitcher } from "@/components/ui/theme-toggle";
import { NAVIGATION_ITEMS } from "@/constants";

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
  const { isMobileMenuOpen, setMobileMenuOpen, setSearchModalOpen } = useUIStore();
  const { wishlist } = usePropertyStore();
  const { theme } = useThemeStore();

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname, setMobileMenuOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" as const }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "glass-nav py-3 shadow-soft"
            : "bg-transparent py-5"
        )}
      >
        <div className="container flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Logo
              width={40}
              height={40}
              className="rounded-xl"
            />
            <div className="flex flex-col">
              <span className={cn(
                "font-display text-lg font-bold leading-tight transition-colors",
                isScrolled ? "text-dark-900" : "text-white"
              )}>
                Future Home
              </span>
              <span className={cn(
                "text-[10px] uppercase tracking-widest transition-colors",
                isScrolled ? "text-light-500" : "text-white/70"
              )}>
                Properties
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAVIGATION_ITEMS.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => "children" in item && item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive(item.href)
                      ? isScrolled ? "text-primary-700 dark:text-primary-400" : "text-white bg-white/20"
                      : isScrolled
                        ? "text-dark-700 hover:text-primary-700 dark:text-light-200 dark:hover:text-primary-400"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                  )}
                >
                  {item.label}
                  {"children" in item && item.children && <ChevronDown className="h-3.5 w-3.5" />}
                </Link>
                <AnimatePresence>
                  {"children" in item && item.children && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-1 w-56 rounded-xl bg-white dark:bg-dark-800 shadow-large border border-light-200 dark:border-dark-700 py-2"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-dark-700 dark:text-light-200 hover:bg-light-50 dark:hover:bg-dark-700 hover:text-primary-700 dark:hover:text-primary-400 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <button
              onClick={() => setSearchModalOpen(true)}
              className={cn(
                "hidden sm:flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200",
                isScrolled
                  ? "bg-light-100 hover:bg-light-200 text-dark-700"
                  : "bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
              )}
              aria-label="Search properties"
            >
              <Search className="h-4.5 w-4.5" />
            </button>
            <Link href="/wishlist" className="relative">
              <button
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200",
                  isScrolled
                    ? "bg-light-100 hover:bg-light-200 text-dark-700"
                    : "bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
                )}
                aria-label="Wishlist"
              >
                <Heart className="h-4.5 w-4.5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-red-500 rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </button>
            </Link>
            <Link href="/contact" className="hidden md:inline-flex">
              <Button size="sm" className="rounded-full">
                <Phone className="h-3.5 w-3.5" />
                Contact Us
              </Button>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={cn(
                "lg:hidden flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200",
                isScrolled
                  ? "bg-light-100 hover:bg-light-200 text-dark-700 dark:bg-dark-800 dark:hover:bg-dark-700 dark:text-light-200"
                  : "bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
              )}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white dark:bg-dark-900 shadow-large overflow-y-auto"
            >
              <div className="flex items-center justify-between p-4 border-b border-light-200 dark:border-dark-700">
                <span className="font-display text-lg font-bold text-dark-900 dark:text-light-50">Menu</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-light-100 dark:bg-dark-800 text-dark-700 dark:text-light-200"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="p-4 space-y-1">
                {NAVIGATION_ITEMS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                      isActive(item.href)
                        ? "bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400"
                        : "text-dark-700 dark:text-light-200 hover:bg-light-50 dark:hover:bg-dark-800"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="p-4 border-t border-light-200 dark:border-dark-700 space-y-2">
                <Link href="/contact" className="block">
                  <Button fullWidth>
                    <Phone className="h-4 w-4" />
                    Contact Us
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}