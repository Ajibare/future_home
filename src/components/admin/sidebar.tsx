"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Building2, Newspaper, Users, Quote, Wrench, Settings, LogOut, X, Mail } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Properties", href: "/admin/properties", icon: Building2 },
  { label: "Blog", href: "/admin/blog", icon: Newspaper },
  { label: "Team", href: "/admin/team", icon: Users },
  { label: "Testimonials", href: "/admin/testimonials", icon: Quote },
  { label: "Services", href: "/admin/services", icon: Wrench },
  { label: "Messages", href: "/admin/messages", icon: Mail },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    toast.success("Signed out");
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="flex flex-col h-full" style={{ background: "var(--surface)", borderRight: "1px solid var(--border)" }}>
      <div className="flex items-center gap-3 px-5 h-16 shrink-0" style={{ borderBottom: "1px solid var(--border)" }}>
        <Logo width={32} height={32} />
        <div className="flex flex-col leading-tight">
          <span className="font-display text-sm font-bold" style={{ color: "var(--text)" }}>Future Homes</span>
          <span className="text-[10px] uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Admin</span>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors"
              style={
                isActive
                  ? { background: "var(--primary)", color: "#fff" }
                  : { color: "var(--text-secondary)" }
              }
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-3" style={{ borderTop: "1px solid var(--border)" }}>
        <button
          onClick={handleLogout}
          className={cn("flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full transition-colors")}
          style={{ color: "var(--text-secondary)" }}
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}

export function AdminSidebarClose({ onClose }: { onClose: () => void }) {
  return (
    <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-lg lg:hidden" style={{ color: "var(--text-muted)" }} aria-label="Close menu">
      <X className="h-5 w-5" />
    </button>
  );
}
