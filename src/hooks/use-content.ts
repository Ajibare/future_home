import { useQuery } from "@tanstack/react-query";
import type { Property, BlogPost, TeamMember, Testimonial, Service, ContactInfo } from "@/types";

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load ${url}`);
  return res.json();
}

export function useProperties() {
  return useQuery({ queryKey: ["public-properties"], queryFn: () => fetchJson<Property[]>("/api/properties") });
}

export function useProperty(id: string | undefined) {
  return useQuery({
    queryKey: ["public-property", id],
    queryFn: () => fetchJson<Property>(`/api/properties/${id}`),
    enabled: Boolean(id),
    retry: false,
  });
}

export function useBlogPosts() {
  return useQuery({ queryKey: ["public-blog"], queryFn: () => fetchJson<BlogPost[]>("/api/blog") });
}

export function useBlogPost(slug: string | undefined) {
  return useQuery({
    queryKey: ["public-blog-post", slug],
    queryFn: () => fetchJson<BlogPost>(`/api/blog/slug/${slug}`),
    enabled: Boolean(slug),
    retry: false,
  });
}

export function useTeamMembers() {
  return useQuery({ queryKey: ["public-team"], queryFn: () => fetchJson<TeamMember[]>("/api/team") });
}

export function useTestimonials() {
  return useQuery({ queryKey: ["public-testimonials"], queryFn: () => fetchJson<Testimonial[]>("/api/testimonials") });
}

export function useServices() {
  return useQuery({ queryKey: ["public-services"], queryFn: () => fetchJson<Service[]>("/api/services") });
}

export function useSiteSettings() {
  return useQuery({ queryKey: ["public-settings"], queryFn: () => fetchJson<ContactInfo & { name: string; tagline: string; description: string }>("/api/settings") });
}
