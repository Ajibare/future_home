"use client";

import * as React from "react";
import { Menu } from "lucide-react";
import { AdminSidebar, AdminSidebarClose } from "@/components/admin/sidebar";
import { ThemeSwitcher } from "@/components/ui/theme-toggle";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--bg)" }}>
      <aside className="hidden lg:block w-64 shrink-0">
        <AdminSidebar />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[85vw]">
            <AdminSidebarClose onClose={() => setMobileOpen(false)} />
            <AdminSidebar onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="flex items-center justify-between h-16 px-4 md:px-6 shrink-0" style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 -ml-2 rounded-lg"
            style={{ color: "var(--text)" }}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="hidden lg:block text-sm font-medium" style={{ color: "var(--text-muted)" }}>Admin Control Board</span>
          <div className="flex items-center gap-3 ml-auto">
            <ThemeSwitcher />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
