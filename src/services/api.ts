import { MOCK_PROPERTIES, MOCK_BLOG_POSTS, MOCK_TESTIMONIALS } from "./mock-data";
import type { Property, SearchFilters, SearchResult, BlogPost, Testimonial } from "@/types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const propertyService = {
  async getAll(filters?: Partial<SearchFilters>): Promise<SearchResult> {
    await delay(800);
    let properties = [...MOCK_PROPERTIES];

    if (filters) {
      if (filters.listingType) {
        properties = properties.filter((p) => p.listingType === filters.listingType);
      }
      if (filters.propertyTypes && filters.propertyTypes.length > 0) {
        properties = properties.filter((p) => filters.propertyTypes!.includes(p.type));
      }
      if (filters.categories && filters.categories.length > 0) {
        properties = properties.filter((p) => filters.categories!.includes(p.category));
      }
      if (filters.minPrice !== undefined) {
        properties = properties.filter((p) => p.price >= filters.minPrice!);
      }
      if (filters.maxPrice !== undefined) {
        properties = properties.filter((p) => p.price <= filters.maxPrice!);
      }
      if (filters.minBedrooms !== undefined && filters.minBedrooms > 0) {
        properties = properties.filter((p) => p.features.bedrooms >= filters.minBedrooms!);
      }
      if (filters.minBathrooms !== undefined && filters.minBathrooms > 0) {
        properties = properties.filter((p) => p.features.bathrooms >= filters.minBathrooms!);
      }
      if (filters.cities && filters.cities.length > 0) {
        properties = properties.filter((p) =>
          filters.cities!.some((c) => p.location.city.toLowerCase().includes(c.toLowerCase()))
        );
      }
      if (filters.query) {
        const q = filters.query.toLowerCase();
        properties = properties.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.location.city.toLowerCase().includes(q) ||
            p.location.neighborhood?.toLowerCase().includes(q)
        );
      }
      if (filters.sortBy) {
        switch (filters.sortBy) {
          case "price-asc": properties.sort((a, b) => a.price - b.price); break;
          case "price-desc": properties.sort((a, b) => b.price - a.price); break;
          case "newest": properties.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break;
          case "oldest": properties.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()); break;
          case "area-desc": properties.sort((a, b) => b.features.area - a.features.area); break;
          case "area-asc": properties.sort((a, b) => a.features.area - b.features.area); break;
          default: break;
        }
      }
    }

    const page = filters?.page || 1;
    const limit = filters?.limit || 12;
    const total = properties.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const paginatedProperties = properties.slice(start, start + limit);

    return { properties: paginatedProperties, total, page, limit, totalPages };
  },

  async getBySlug(slug: string): Promise<Property | null> {
    await delay(500);
    return MOCK_PROPERTIES.find((p) => p.id === slug) || null;
  },

  async getById(id: string): Promise<Property | null> {
    await delay(500);
    return MOCK_PROPERTIES.find((p) => p.id === id) || null;
  },

  async getFeatured(): Promise<Property[]> {
    await delay(600);
    return MOCK_PROPERTIES.filter((p) => p.isFeatured);
  },

  async getSimilar(propertyId: string, limit = 4): Promise<Property[]> {
    await delay(600);
    const property = MOCK_PROPERTIES.find((p) => p.id === propertyId);
    if (!property) return [];
    return MOCK_PROPERTIES
      .filter((p) => p.id !== propertyId && (p.category === property.category || p.type === property.type))
      .slice(0, limit);
  },
};

export const blogService = {
  async getAll(): Promise<BlogPost[]> {
    await delay(600);
    return MOCK_BLOG_POSTS;
  },

  async getBySlug(slug: string): Promise<BlogPost | null> {
    await delay(500);
    return MOCK_BLOG_POSTS.find((p) => p.slug === slug) || null;
  },

  async getFeatured(): Promise<BlogPost[]> {
    await delay(600);
    return MOCK_BLOG_POSTS.filter((p) => p.isFeatured);
  },

  async getRelated(postId: string, limit = 3): Promise<BlogPost[]> {
    await delay(600);
    const post = MOCK_BLOG_POSTS.find((p) => p.id === postId);
    if (!post) return [];
    return MOCK_BLOG_POSTS.filter((p) => p.id !== postId && p.category.id === post.category.id).slice(0, limit);
  },
};

export const testimonialService = {
  async getAll(): Promise<Testimonial[]> {
    await delay(500);
    return MOCK_TESTIMONIALS;
  },
};

export const searchService = {
  async autocomplete(query: string): Promise<{ properties: Property[]; suggestions: string[] }> {
    await delay(300);
    const q = query.toLowerCase();
    const properties = MOCK_PROPERTIES.filter(
      (p) => p.title.toLowerCase().includes(q) || p.location.city.toLowerCase().includes(q)
    ).slice(0, 5);
    const suggestions = Array.from(new Set(MOCK_PROPERTIES.map((p) => p.location.neighborhood || p.location.city))).filter((s) => s.toLowerCase().includes(q)).slice(0, 5);
    return { properties, suggestions };
  },
};