"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Mail, MessageSquare, CheckCheck, Inbox } from "lucide-react";
import { useAdminNotifications } from "@/hooks/use-notifications";
import { useAdminMutations } from "@/hooks/use-admin-resource";
import { timeAgo } from "@/lib/utils";
import type { SiteMessage } from "@/types";
import { toast } from "sonner";

export function NotificationBell() {
  const router = useRouter();
  const { data, markAllRead } = useAdminNotifications();
  const { update } = useAdminMutations<SiteMessage>("messages");
  const [isOpen, setIsOpen] = React.useState(false);
  const [justArrived, setJustArrived] = React.useState(false);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const previousCount = React.useRef<number | null>(null);

  const unreadCount = data?.unreadCount ?? 0;
  const recent = data?.recent ?? [];

  React.useEffect(() => {
    if (data === undefined) return;
    if (previousCount.current !== null && unreadCount > previousCount.current) {
      const newest = recent[0];
      toast.message("New message received", {
        description: newest ? `${newest.name || newest.email} — ${newest.subject || (newest.type === "newsletter" ? "Newsletter signup" : "Contact form")}` : undefined,
        icon: <Bell className="h-4 w-4" />,
      });
      setJustArrived(true);
      const timer = setTimeout(() => setJustArrived(false), 2000);
      return () => clearTimeout(timer);
    }
    previousCount.current = unreadCount;
  }, [unreadCount, data, recent]);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleItemClick = async (message: SiteMessage) => {
    setIsOpen(false);
    if (message.status === "new") {
      try {
        await update.mutateAsync({ id: message.id, body: { status: "read" } });
      } catch {
        // ignore — non-critical
      }
    }
    router.push("/admin/messages");
  };

  return (
    <div className="relative" ref={panelRef}>
      <motion.button
        onClick={() => setIsOpen((v) => !v)}
        className="relative flex items-center justify-center w-10 h-10 rounded-xl transition-colors"
        style={{ background: "var(--surface-hover)", color: "var(--text-secondary)" }}
        aria-label="Notifications"
        animate={justArrived ? { rotate: [0, -12, 10, -8, 6, 0] } : {}}
        transition={{ duration: 0.5 }}
      >
        <Bell className="h-[18px] w-[18px]" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center">
            <span className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping" style={{ background: "var(--primary)" }} />
            <span
              className="relative flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold text-white"
              style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-hover))" }}
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-[min(360px,92vw)] rounded-2xl shadow-large overflow-hidden z-50"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
              <h3 className="font-semibold text-sm" style={{ color: "var(--text)" }}>Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={() => markAllRead.mutate()}
                  disabled={markAllRead.isPending}
                  className="flex items-center gap-1 text-xs font-medium"
                  style={{ color: "var(--primary)" }}
                >
                  <CheckCheck className="h-3.5 w-3.5" /> Mark all read
                </button>
              )}
            </div>

            <div className="max-h-96 overflow-y-auto">
              {recent.length === 0 ? (
                <div className="flex flex-col items-center gap-2 py-10 px-4 text-center">
                  <Inbox className="h-6 w-6" style={{ color: "var(--text-muted)" }} />
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>No messages yet</p>
                </div>
              ) : (
                recent.map((message) => (
                  <button
                    key={message.id}
                    onClick={() => handleItemClick(message)}
                    className="flex items-start gap-3 w-full px-4 py-3 text-left transition-colors"
                    style={{ borderBottom: "1px solid var(--border)", background: message.status === "new" ? "var(--primary-light)" : "transparent" }}
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full shrink-0" style={{ background: "var(--surface-hover)", color: "var(--primary)" }}>
                      {message.type === "newsletter" ? <Mail className="h-3.5 w-3.5" /> : <MessageSquare className="h-3.5 w-3.5" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium truncate" style={{ color: "var(--text)" }}>{message.name || message.email}</p>
                        <span className="text-[11px] shrink-0" style={{ color: "var(--text-muted)" }}>{timeAgo(message.createdAt)}</span>
                      </div>
                      <p className="text-xs truncate mt-0.5" style={{ color: "var(--text-muted)" }}>
                        {message.subject || (message.type === "newsletter" ? "Newsletter signup" : message.message) || message.email}
                      </p>
                    </div>
                    {message.status === "new" && <span className="w-2 h-2 rounded-full shrink-0 mt-1.5" style={{ background: "var(--primary)" }} />}
                  </button>
                ))
              )}
            </div>

            <button
              onClick={() => { setIsOpen(false); router.push("/admin/messages"); }}
              className="block w-full text-center py-3 text-xs font-medium"
              style={{ color: "var(--primary)" }}
            >
              View all messages
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
