"use client";

import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, Share2, MapPin, Bed, Bath, Maximize, Calendar, Eye, Phone, Mail,
  ChevronLeft, ChevronRight, Car, Shield, Dumbbell, Waves, TreePine, Wifi,
  CheckCircle2, ArrowLeft, Printer, Star, MessageCircle, Clock, Award
} from "lucide-react";
import { cn, formatCurrency, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PropertyCard } from "@/components/property/property-card";
import { GoogleMap } from "@/components/ui/google-map";
import { MOCK_PROPERTIES } from "@/services/mock-data";
import { usePropertyStore } from "@/stores";
import { toast } from "sonner";
import type { Property } from "@/types";

function getProperty(id: string): Property | undefined {
  return MOCK_PROPERTIES.find((p) => p.id === id);
}

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const property = getProperty(id);
  const [currentImage, setCurrentImage] = React.useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("overview");
  const { toggleWishlist, isInWishlist, addToCompare, isInCompare } = usePropertyStore();

  if (!property) {
    notFound();
  }

  const isInWishlist_ = isInWishlist(property.id);
  const isInCompare_ = isInCompare(property.id);
  const similarProperties = MOCK_PROPERTIES.filter((p) => p.id !== property.id && (p.category === property.category || p.type === property.type)).slice(0, 4);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: property.title, url });
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    }
  };

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % property.images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + property.images.length) % property.images.length);

  const activeAmenities = Object.entries(property.amenities).filter(([, v]) => v).map(([k]) => k);

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white dark:bg-dark-950">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link href="/properties" className="inline-flex items-center gap-2 text-sm text-light-500 dark:text-dark-400 hover:text-primary-700 dark:hover:text-primary-400 mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Properties
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="relative rounded-2xl overflow-hidden">
              <div className="relative aspect-[16/10] cursor-pointer" onClick={() => setIsLightboxOpen(true)}>
                <img src={property.images[currentImage].url} alt={property.images[currentImage].alt} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950/30 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge variant={property.status === "for-sale" ? "primary" : "info"} className="text-sm px-3 py-1.5">
                    {property.status.replace("-", " ")}
                  </Badge>
                  {property.isFeatured && <Badge variant="featured" className="text-sm px-3 py-1.5">Featured</Badge>}
                </div>
                <div className="absolute bottom-4 right-4 flex items-center gap-2 text-white text-sm bg-dark-950/50 backdrop-blur-md rounded-full px-3 py-1.5">
                  <Eye className="h-4 w-4" />
                  {property.images.length} photos
                </div>
              </div>
              <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-all" aria-label="Previous image">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/40 transition-all" aria-label="Next image">
                <ChevronRight className="h-5 w-5" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                {property.images.map((_, i) => (
                  <button key={i} onClick={(e) => { e.stopPropagation(); setCurrentImage(i); }} className={cn("w-2 h-2 rounded-full transition-all", i === currentImage ? "bg-white w-6" : "bg-white/50 hover:bg-white/80")} aria-label={`View image ${i + 1}`} />
                ))}
              </div>
            </motion.div>

            {/* Thumbnail Strip */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {property.images.map((img, i) => (
                <button key={img.id} onClick={() => setCurrentImage(i)} className={cn("shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all", i === currentImage ? "border-primary-500" : "border-transparent opacity-60 hover:opacity-100")}>
                  <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Property Info */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="font-display text-2xl md:text-3xl font-bold text-dark-900 dark:text-light-50 mb-2">{property.title}</h1>
                  <p className="flex items-center gap-1.5 text-light-500 dark:text-dark-400">
                    <MapPin className="h-4 w-4 text-primary-500" />
                    {property.location.address}, {property.location.neighborhood}, {property.location.city}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => { toggleWishlist(property.id); toast.success(isInWishlist_ ? "Removed from wishlist" : "Added to wishlist"); }} className={cn("flex items-center justify-center w-10 h-10 rounded-xl border transition-all", isInWishlist_ ? "bg-red-50 border-red-200 text-red-500 dark:bg-red-900/20 dark:border-red-800" : "border-light-200 dark:border-dark-700 text-light-500 hover:border-light-300 dark:hover:border-dark-600")} aria-label="Add to wishlist">
                    <Heart className={cn("h-5 w-5", isInWishlist_ && "fill-current")} />
                  </button>
                  <button onClick={handleShare} className="flex items-center justify-center w-10 h-10 rounded-xl border border-light-200 dark:border-dark-700 text-light-500 hover:border-light-300 dark:hover:border-dark-600 transition-all" aria-label="Share property">
                    <Share2 className="h-5 w-5" />
                  </button>
                  <button onClick={() => window.print()} className="flex items-center justify-center w-10 h-10 rounded-xl border border-light-200 dark:border-dark-700 text-light-500 hover:border-light-300 dark:hover:border-dark-600 transition-all" aria-label="Print property">
                    <Printer className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 py-4 border-y border-light-100 dark:border-dark-800">
                {property.features.bedrooms > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400"><Bed className="h-5 w-5" /></div>
                    <div><p className="font-semibold text-dark-900 dark:text-light-50">{property.features.bedrooms}</p><p className="text-xs text-light-500 dark:text-dark-400">Bedrooms</p></div>
                  </div>
                )}
                {property.features.bathrooms > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400"><Bath className="h-5 w-5" /></div>
                    <div><p className="font-semibold text-dark-900 dark:text-light-50">{property.features.bathrooms}</p><p className="text-xs text-light-500 dark:text-dark-400">Bathrooms</p></div>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400"><Maximize className="h-5 w-5" /></div>
                  <div><p className="font-semibold text-dark-900 dark:text-light-50">{property.features.area.toLocaleString()}</p><p className="text-xs text-light-500 dark:text-dark-400">{property.features.areaUnit}</p></div>
                </div>
                {property.features.parkingSpaces > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400"><Car className="h-5 w-5" /></div>
                    <div><p className="font-semibold text-dark-900 dark:text-light-50">{property.features.parkingSpaces}</p><p className="text-xs text-light-500 dark:text-dark-400">Parking</p></div>
                  </div>
                )}
                {property.features.yearBuilt && property.features.yearBuilt > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400"><Calendar className="h-5 w-5" /></div>
                    <div><p className="font-semibold text-dark-900 dark:text-light-50">{property.features.yearBuilt}</p><p className="text-xs text-light-500 dark:text-dark-400">Year Built</p></div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Tabs */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Tabs defaultValue="overview" onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="amenities">Amenities</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                  <div className="rounded-2xl bg-light-50 dark:bg-dark-900 border border-light-200 dark:border-dark-800 p-6">
                    <h3 className="font-semibold text-lg text-dark-900 dark:text-light-50 mb-4">Description</h3>
                    <p className="text-light-600 dark:text-dark-300 leading-relaxed whitespace-pre-line">{property.description}</p>
                  </div>
                </TabsContent>
                <TabsContent value="amenities">
                  <div className="rounded-2xl bg-light-50 dark:bg-dark-900 border border-light-200 dark:border-dark-800 p-6">
                    <h3 className="font-semibold text-lg text-dark-900 dark:text-light-50 mb-4">Amenities & Features</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {activeAmenities.map((amenity) => (
                        <div key={amenity} className="flex items-center gap-2 text-sm text-dark-700 dark:text-light-300">
                          <CheckCircle2 className="h-4 w-4 text-primary-500" />
                          {amenity.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="location">
                  <div className="rounded-2xl border p-6" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
                    <h3 className="font-semibold text-lg mb-4" style={{ color: "var(--text)" }}>Location</h3>
                    <div className="aspect-[16/9] rounded-xl mb-4 overflow-hidden" style={{ border: "1px solid var(--border)" }}>
                      <GoogleMap lat={property.location.coordinates?.lat ?? 0} lng={property.location.coordinates?.lng ?? 0} zoom={15} apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} />
                    </div>
                    <p style={{ color: "var(--text-secondary)" }}>{property.location.address}, {property.location.neighborhood}, {property.location.city}, {property.location.state}</p>
                    {property.nearbyPlaces && property.nearbyPlaces.length > 0 && (
                      <div className="mt-6">
                        <h4 className="font-semibold text-sm mb-3" style={{ color: "var(--text)" }}>Nearby Places</h4>
                        <div className="space-y-2">
                          {property.nearbyPlaces.map((place) => (
                            <div key={place.id} className="flex items-center justify-between text-sm">
                              <span style={{ color: "var(--text)" }}>{place.name}</span>
                              <span style={{ color: "var(--text-muted)" }}>{(place.distance / 1000).toFixed(1)} km</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="sticky top-28 space-y-6">
              <div className="rounded-2xl bg-white dark:bg-dark-800 border border-light-200 dark:border-dark-700 p-6 shadow-soft">
                <div className="mb-4">
                  <p className="font-display text-3xl font-bold text-primary-700 dark:text-primary-400">{formatCurrency(property.price)}</p>
                  {property.listingType === "rent" && <p className="text-sm text-light-500 dark:text-dark-400">per annum</p>}
                </div>
                <div className="space-y-3">
                  <Button fullWidth size="lg">
                    <Phone className="h-4 w-4" />
                    Schedule Viewing
                  </Button>
                  <Button fullWidth variant="outline" size="lg">
                    <MessageCircle className="h-4 w-4" />
                    Contact Agent
                  </Button>
                </div>
              </div>

              <div className="rounded-2xl bg-white dark:bg-dark-800 border border-light-200 dark:border-dark-700 p-6 shadow-soft">
                <h3 className="font-semibold text-dark-900 dark:text-light-50 mb-4">Listed by</h3>
                <div className="flex items-center gap-3 mb-4">
                  <img src={property.agent.image} alt={property.agent.name} className="w-14 h-14 rounded-xl object-cover" />
                  <div>
                    <p className="font-semibold text-dark-900 dark:text-light-50">{property.agent.name}</p>
                    <p className="text-sm text-light-500 dark:text-dark-400">{property.agent.title}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={cn("h-3 w-3", i < Math.floor(property.agent.rating) ? "text-amber-400 fill-amber-400" : "text-light-300 dark:text-dark-600")} />
                      ))}
                      <span className="text-xs text-light-500 ml-1">({property.agent.reviewCount})</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <a href={`tel:${property.agent.phone}`} className="flex items-center gap-3 p-3 rounded-xl bg-light-50 dark:bg-dark-700 hover:bg-light-100 dark:hover:bg-dark-600 transition-colors text-sm text-dark-700 dark:text-light-300">
                    <Phone className="h-4 w-4 text-primary-500" /> {property.agent.phone}
                  </a>
                  <a href={`mailto:${property.agent.email}`} className="flex items-center gap-3 p-3 rounded-xl bg-light-50 dark:bg-dark-700 hover:bg-light-100 dark:hover:bg-dark-600 transition-colors text-sm text-dark-700 dark:text-light-300">
                    <Mail className="h-4 w-4 text-primary-500" /> {property.agent.email}
                  </a>
                  {property.agent.whatsapp && (
                    <a href={`https://wa.me/${property.agent.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors text-sm text-green-700 dark:text-green-400">
                      <MessageCircle className="h-4 w-4" /> WhatsApp
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-16">
            <h2 className="font-display text-2xl font-bold text-dark-900 dark:text-light-50 mb-6">Similar Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </motion.section>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] bg-dark-950/95 flex items-center justify-center" onClick={() => setIsLightboxOpen(false)}>
            <button onClick={() => setIsLightboxOpen(false)} className="absolute top-6 right-6 text-white/80 hover:text-white z-10">
              <X className="h-8 w-8" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white">
              <ChevronLeft className="h-10 w-10" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white">
              <ChevronRight className="h-10 w-10" />
            </button>
            <img src={property.images[currentImage].url} alt={property.images[currentImage].alt} className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg" />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm">
              {currentImage + 1} / {property.images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function X({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 6 6 18" /><path d="m6 6 12 12" />
    </svg>
  );
}