"use client";

import * as React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/page-header";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { adminApi } from "@/lib/admin-api";
import type { ContactInfo, Statistic, WhyChooseUsItem } from "@/types";
import { toast } from "sonner";

type Settings = ContactInfo & {
  name: string;
  tagline: string;
  description: string;
  phone2?: string;
  statistics: Statistic[];
  whyChooseUs: WhyChooseUsItem[];
};

export default function AdminSettingsPage() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["settings"], queryFn: () => adminApi.get<Settings>("/api/settings") });
  const [value, setValue] = React.useState<Settings | null>(null);

  React.useEffect(() => {
    if (data) setValue({ ...data, statistics: data.statistics || [], whyChooseUs: data.whyChooseUs || [] });
  }, [data]);

  const save = useMutation({
    mutationFn: (body: Settings) => adminApi.put<Settings>("/api/settings", body),
    onSuccess: () => {
      toast.success("Settings updated");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (err) => toast.error(err instanceof Error ? err.message : "Failed to update settings"),
  });

  const update = <K extends keyof Settings>(key: K, val: Settings[K]) => setValue((v) => (v ? { ...v, [key]: val } : v));
  const updateHours = (key: keyof Settings["hours"], val: string) => setValue((v) => (v ? { ...v, hours: { ...v.hours, [key]: val } } : v));
  const updateSocial = (key: keyof Settings["social"], val: string) => setValue((v) => (v ? { ...v, social: { ...v.social, [key]: val } } : v));

  const updateStat = (index: number, patch: Partial<Statistic>) =>
    setValue((v) => (v ? { ...v, statistics: v.statistics.map((s, i) => (i === index ? { ...s, ...patch } : s)) } : v));
  const addStat = () =>
    setValue((v) => (v ? { ...v, statistics: [...v.statistics, { id: `stat-${Date.now()}`, label: "", value: "", suffix: "", prefix: "" }] } : v));
  const removeStat = (index: number) => setValue((v) => (v ? { ...v, statistics: v.statistics.filter((_, i) => i !== index) } : v));

  const updateWhy = (index: number, patch: Partial<WhyChooseUsItem>) =>
    setValue((v) => (v ? { ...v, whyChooseUs: v.whyChooseUs.map((w, i) => (i === index ? { ...w, ...patch } : w)) } : v));
  const addWhy = () =>
    setValue((v) => (v ? { ...v, whyChooseUs: [...v.whyChooseUs, { id: `why-${Date.now()}`, title: "", description: "", icon: "star" }] } : v));
  const removeWhy = (index: number) => setValue((v) => (v ? { ...v, whyChooseUs: v.whyChooseUs.filter((_, i) => i !== index) } : v));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value) save.mutate(value);
  };

  if (isLoading || !value) {
    return (
      <div>
        <AdminPageHeader title="Site Settings" description="Company info shown across the site." />
        <p style={{ color: "var(--text-muted)" }}>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <AdminPageHeader title="Site Settings" description="Company info shown across the site (footer, contact page, etc.)." />
      <form onSubmit={handleSubmit} className="space-y-6 pb-20 max-w-2xl">
        <Section title="Company">
          <Input label="Company Name" value={value.name} onChange={(e) => update("name", e.target.value)} />
          <Input label="Tagline" value={value.tagline} onChange={(e) => update("tagline", e.target.value)} />
          <Textarea label="Description" value={value.description} onChange={(e) => update("description", e.target.value)} />
        </Section>

        <Section title="Contact">
          <Input label="Address" value={value.address} onChange={(e) => update("address", e.target.value)} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Primary Phone" value={value.phone} onChange={(e) => update("phone", e.target.value)} />
            <Input label="Secondary Phone" value={value.phone2 || ""} onChange={(e) => update("phone2", e.target.value)} />
            <Input label="Email" type="email" value={value.email} onChange={(e) => update("email", e.target.value)} />
            <Input label="WhatsApp" value={value.whatsapp || ""} onChange={(e) => update("whatsapp", e.target.value)} />
          </div>
        </Section>

        <Section title="Business Hours">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input label="Weekdays" value={value.hours.weekdays} onChange={(e) => updateHours("weekdays", e.target.value)} />
            <Input label="Saturday" value={value.hours.saturday} onChange={(e) => updateHours("saturday", e.target.value)} />
            <Input label="Sunday" value={value.hours.sunday} onChange={(e) => updateHours("sunday", e.target.value)} />
          </div>
        </Section>

        <Section title="Social Links">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Facebook" value={value.social.facebook || ""} onChange={(e) => updateSocial("facebook", e.target.value)} />
            <Input label="Twitter / X" value={value.social.twitter || ""} onChange={(e) => updateSocial("twitter", e.target.value)} />
            <Input label="Instagram" value={value.social.instagram || ""} onChange={(e) => updateSocial("instagram", e.target.value)} />
            <Input label="LinkedIn" value={value.social.linkedin || ""} onChange={(e) => updateSocial("linkedin", e.target.value)} />
            <Input label="YouTube" value={value.social.youtube || ""} onChange={(e) => updateSocial("youtube", e.target.value)} />
          </div>
        </Section>

        <Section title="Homepage Statistics">
          <div className="space-y-3">
            {value.statistics.map((stat, i) => (
              <div key={stat.id} className="grid grid-cols-[1fr_1fr_auto_auto] gap-2 items-end">
                <Input label={i === 0 ? "Label" : undefined} value={stat.label} onChange={(e) => updateStat(i, { label: e.target.value })} placeholder="Properties Sold" />
                <Input label={i === 0 ? "Value" : undefined} value={String(stat.value)} onChange={(e) => updateStat(i, { value: e.target.value })} placeholder="2,500" />
                <Input label={i === 0 ? "Suffix" : undefined} value={stat.suffix || ""} onChange={(e) => updateStat(i, { suffix: e.target.value })} placeholder="+" className="w-16" />
                <Button type="button" variant="ghost" size="icon" onClick={() => removeStat(i)}><Trash2 className="h-4 w-4" style={{ color: "#ef4444" }} /></Button>
              </div>
            ))}
          </div>
          <Button type="button" variant="outline" size="sm" onClick={addStat}><Plus className="h-3.5 w-3.5" /> Add Statistic</Button>
        </Section>

        <Section title="Why Choose Us">
          <div className="space-y-4">
            {value.whyChooseUs.map((item, i) => (
              <div key={item.id} className="rounded-xl p-4 space-y-3" style={{ background: "var(--surface-hover)" }}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>Item {i + 1}</span>
                  <button type="button" onClick={() => removeWhy(i)}><Trash2 className="h-4 w-4" style={{ color: "#ef4444" }} /></button>
                </div>
                <Input value={item.title} onChange={(e) => updateWhy(i, { title: e.target.value })} placeholder="Title" />
                <Textarea value={item.description} onChange={(e) => updateWhy(i, { description: e.target.value })} placeholder="Description" className="min-h-20" />
              </div>
            ))}
          </div>
          <Button type="button" variant="outline" size="sm" onClick={addWhy}><Plus className="h-3.5 w-3.5" /> Add Item</Button>
        </Section>

        <div className="fixed bottom-0 left-0 right-0 lg:left-64 z-20 p-4 flex justify-end gap-3" style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
          <Button type="submit" disabled={save.isPending} loading={save.isPending}>Save Settings</Button>
        </div>
      </form>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-5 sm:p-6 space-y-4" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
      <h3 className="font-semibold" style={{ color: "var(--text)" }}>{title}</h3>
      {children}
    </div>
  );
}
