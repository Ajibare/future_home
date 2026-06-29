export type PropertyType =
  | "apartment"
  | "house"
  | "duplex"
  | "townhouse"
  | "penthouse"
  | "villa"
  | "commercial"
  | "land"
  | "office"
  | "retail"
  | "warehouse";

export type PropertyStatus = "for-sale" | "for-rent" | "sold" | "rented" | "off-market";

export type PropertyCategory = "residential" | "commercial" | "land" | "luxury";

export type ListingType = "sale" | "rent";

export interface Location {
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  neighborhood?: string;
  landmark?: string;
}

export interface PropertyFeatures {
  bedrooms: number;
  bathrooms: number;
  parkingSpaces: number;
  area: number; // in sq ft or sq m
  areaUnit: "sqft" | "sqm";
  yearBuilt?: number;
  floors?: number;
  floorNumber?: number;
}

export interface PropertyAmenities {
  // Interior
  airConditioning: boolean;
  heating: boolean;
  furnished: boolean;
  kitchenAppliances: boolean;
  washerDryer: boolean;
  walkInCloset: boolean;
  fireplace: boolean;
  balcony: boolean;
  // Building
  elevator: boolean;
  security: boolean;
  concierge: boolean;
  gym: boolean;
  pool: boolean;
  spa: boolean;
  tennisCourt: boolean;
  basketballCourt: boolean;
  playground: boolean;
  garden: boolean;
  rooftop: boolean;
  // Utilities
  internet: boolean;
  cableTv: boolean;
  intercom: boolean;
  cctv: boolean;
  backupGenerator: boolean;
  solarPower: boolean;
  waterTreatment: boolean;
  // Accessibility
  wheelchairAccessible: boolean;
  petFriendly: boolean;
}

export interface PropertyImages {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

export interface Agent {
  id: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  whatsapp?: string;
  image: string;
  bio: string;
  licenseNumber?: string;
  yearsExperience: number;
  specialties: string[];
  languages: string[];
  social: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
  };
  rating: number;
  reviewCount: number;
  propertiesCount: number;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  type: PropertyType;
  status: PropertyStatus;
  category: PropertyCategory;
  listingType: ListingType;
  price: number;
  pricePerSqFt?: number;
  currency: string;
  location: Location;
  features: PropertyFeatures;
  amenities: PropertyAmenities;
  images: PropertyImages[];
  agent: Agent;
  isFeatured: boolean;
  isVerified: boolean;
  views: number;
  favoritesCount: number;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  virtualTourUrl?: string;
  videoUrl?: string;
  floorPlanUrl?: string;
  documents?: PropertyDocument[];
  nearbyPlaces?: NearbyPlace[];
}

export interface PropertyDocument {
  id: string;
  name: string;
  type: "pdf" | "image" | "doc";
  url: string;
  size: number;
}

export interface NearbyPlace {
  id: string;
  name: string;
  type: "school" | "hospital" | "restaurant" | "shopping" | "park" | "transport" | "bank" | "other";
  distance: number; // in meters
  rating?: number;
}

export interface SearchFilters {
  query?: string;
  listingType?: ListingType;
  propertyTypes?: PropertyType[];
  categories?: PropertyCategory[];
  status?: PropertyStatus[];
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  maxBedrooms?: number;
  minBathrooms?: number;
  maxBathrooms?: number;
  minArea?: number;
  maxArea?: number;
  cities?: string[];
  neighborhoods?: string[];
  amenities?: (keyof PropertyAmenities)[];
  isFeatured?: boolean;
  isVerified?: boolean;
  sortBy?: SortOption;
  page?: number;
  limit?: number;
}

export type SortOption =
  | "price-asc"
  | "price-desc"
  | "newest"
  | "oldest"
  | "popular"
  | "area-asc"
  | "area-desc"
  | "price-per-sqft-asc"
  | "price-per-sqft-desc";

export interface SearchResult {
  properties: Property[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  facets?: SearchFacets;
}

export interface SearchFacets {
  propertyTypes: { type: PropertyType; count: number }[];
  cities: { city: string; count: number }[];
  neighborhoods: { neighborhood: string; count: number }[];
  priceRange: { min: number; max: number };
  bedroomsRange: { min: number; max: number };
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  image?: string;
  role: "user" | "agent" | "admin";
  favorites: string[]; // property IDs
  compareList: string[]; // property IDs
  recentlyViewed: string[]; // property IDs
  createdAt: string;
  updatedAt: string;
}

export interface Inquiry {
  id: string;
  propertyId: string;
  userId?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  type: "viewing" | "info" | "offer" | "other";
  preferredDate?: string;
  preferredTime?: string;
  status: "new" | "contacted" | "scheduled" | "completed" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  image: string;
  content: string;
  rating: number;
  propertyId?: string;
  propertyTitle?: string;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: Author;
  category: BlogCategory;
  tags: string[];
  isFeatured: boolean;
  isPublished: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  readTime: number; // in minutes
  views: number;
  likes: number;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

export interface Author {
  id: string;
  name: string;
  title: string;
  image: string;
  bio: string;
  social: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  postCount: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  email: string;
  phone?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  order: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
  features: string[];
  ctaText?: string;
  ctaLink?: string;
}

export interface Statistic {
  id: string;
  label: string;
  value: string | number;
  suffix?: string;
  prefix?: string;
  icon?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  whatsapp?: string;
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  social: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
}

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
  megaMenu?: MegaMenuColumn[];
}

export interface MegaMenuColumn {
  title: string;
  items: { label: string; href: string; description?: string }[];
}

export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  twitterCard?: "summary" | "summary_large_image";
  structuredData?: Record<string, unknown>;
}

export interface PageProps {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}