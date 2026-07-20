"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Building2, Newspaper, Users, Quote, Wrench, Star, CheckCircle2, ArrowRight, Database, Mail } from "lucide-react";
import { adminApi } from "@/lib/admin-api";
import { AdminPageHeader } from "@/components/admin/page-header";
import { AdminStatsSkeleton } from "@/components/admin/loading";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";

interface Stats {
  properties: number;
  activeProperties: number;
  featuredProperties: number;
  blogPosts: number;
  teamMembers: number;
  testimonials: number;
  services: number;
  unreadMessages: number;
}

function StatCard({ icon: Icon, label, value, href }: { icon: React.ElementType; label: string; value: number; href: string }) {
  return (
    <Link href={href} className="rounded-2xl p-5 transition-all duration-200 hover:-translate-y-0.5" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center justify-center w-11 h-11 rounded-xl" style={{ background: "var(--primary-light)", color: "var(--primary)" }}>
          <Icon className="h-5 w-5" />
        </div>
        <ArrowRight className="h-4 w-4" style={{ color: "var(--text-muted)" }} />
      </div>
      <p className="font-display text-2xl font-bold" style={{ color: "var(--text)" }}>{value}</p>
      <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>{label}</p>
    </Link>
  );
}

export default function AdminDashboardPage() {
  const { data: stats, isLoading } = useQuery({ queryKey: ["admin-stats"], queryFn: () => adminApi.get<Stats>("/api/admin/stats") });
  const [isSeeding, setIsSeeding] = useState(false);

  const handleSeed = async () => {
    setIsSeeding(true);
    try {
      const result = await adminApi.post<{ seeded: Record<string, number> }>("/api/admin/seed", {});
      toast.success("Content synced to the database");
      console.log(result.seeded);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Seed failed");
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div>
      <AdminPageHeader
        title="Dashboard"
        description="Overview of everything on the site."
        action={
          <Button variant="outline" onClick={handleSeed} disabled={isSeeding} loading={isSeeding}>
            <Database className="h-4 w-4" />
            Sync Starting Content
          </Button>
        }
      />

      {isLoading ? (
        <div className="mb-8"><AdminStatsSkeleton count={8} /></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <StatCard icon={Building2} label="Total Properties" value={stats?.properties ?? 0} href="/admin/properties" />
          <StatCard icon={CheckCircle2} label="Active Listings" value={stats?.activeProperties ?? 0} href="/admin/properties" />
          <StatCard icon={Star} label="Featured Properties" value={stats?.featuredProperties ?? 0} href="/admin/properties" />
          <StatCard icon={Newspaper} label="Blog Posts" value={stats?.blogPosts ?? 0} href="/admin/blog" />
          <StatCard icon={Users} label="Team Members" value={stats?.teamMembers ?? 0} href="/admin/team" />
          <StatCard icon={Quote} label="Testimonials" value={stats?.testimonials ?? 0} href="/admin/testimonials" />
          <StatCard icon={Wrench} label="Services" value={stats?.services ?? 0} href="/admin/services" />
          <StatCard icon={Mail} label="Unread Messages" value={stats?.unreadMessages ?? 0} href="/admin/messages" />
        </div>
      )}

      <div className="rounded-2xl p-5" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
        <h3 className="font-semibold mb-3" style={{ color: "var(--text)" }}>Quick Links</h3>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/properties/new"><Button size="sm">Add Property</Button></Link>
          <Link href="/admin/blog/new"><Button size="sm" variant="outline">Write Blog Post</Button></Link>
          <Link href="/admin/team/new"><Button size="sm" variant="outline">Add Team Member</Button></Link>
          <Link href="/admin/settings"><Button size="sm" variant="outline">Edit Site Settings</Button></Link>
        </div>
      </div>
    </div>
  );
}
