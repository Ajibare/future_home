"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  Calculator, MapPin, Home, Clock, CheckCircle2, Phone, Mail,
  ArrowRight, Building2, TrendingUp, Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { toast } from "sonner";
import { COMPANY_INFO } from "@/constants";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

const propertyTypes = [
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "duplex", label: "Duplex" },
  { value: "commercial", label: "Commercial" },
  { value: "land", label: "Land" },
  { value: "office", label: "Office" },
];

const locations = [
  { value: "lekki", label: "Lekki" },
  { value: "victoria-island", label: "Victoria Island" },
  { value: "ikoyi", label: "Ikoyi" },
  { value: "ikeja", label: "Ikeja" },
  { value: "yaba", label: "Yaba" },
  { value: "ajah", label: "Ajah" },
  { value: "eko-atlantic", label: "Eko Atlantic" },
  { value: "banana-island", label: "Banana Island" },
];

export default function ValuationPage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onSubmit = async (data: unknown) => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    toast.success("Valuation request submitted! Our team will contact you within 24 hours.");
    reset();
    setIsSubmitting(false);
  };

  return (
    <div className="overflow-hidden pt-24">
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&h=1080&fit=crop" alt="Property valuation" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
        <div className="container relative z-10">
          <motion.div {...fadeInUp} className="max-w-3xl">
            <Badge variant="primary" className="mb-6" style={{ background: "rgba(15,157,148,0.2)", color: "#5eead4", borderColor: "rgba(15,157,148,0.3)" }}>
              Property Valuation
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance">
              Get Your Property
              <span className="block bg-gradient-to-r from-teal-400 to-teal-300 bg-clip-text text-transparent">
                Professionally Valued
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl">
              Our expert valuers provide accurate, market-based property valuations for sales, purchases, mortgages, tax purposes, and investment decisions.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div {...fadeInUp}>
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-6" style={{ color: "var(--text)" }}>
                Request a Free Valuation
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Input label="Full Name" placeholder="John Doe" error={errors.name?.message as string} {...register("name", { required: "Name is required" })} />
                  <Input label="Phone Number" type="tel" placeholder="+234 800 000 0000" error={errors.phone?.message as string} {...register("phone", { required: "Phone is required" })} />
                </div>
                <Input label="Email Address" type="email" placeholder="john@example.com" error={errors.email?.message as string} {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })} />
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--text)" }}>Property Type</label>
                    <select className="w-full h-11 rounded-xl px-4 text-sm" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }} {...register("propertyType", { required: true })}>
                      <option value="">Select type</option>
                      {propertyTypes.map((type) => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--text)" }}>Location</label>
                    <select className="w-full h-11 rounded-xl px-4 text-sm" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }} {...register("location", { required: true })}>
                      <option value="">Select location</option>
                      {locations.map((loc) => (
                        <option key={loc.value} value={loc.value}>{loc.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Input label="Bedrooms" type="number" placeholder="e.g. 3" {...register("bedrooms")} />
                  <Input label="Area (sqm)" type="number" placeholder="e.g. 200" {...register("area")} />
                </div>
                <Textarea label="Additional Details" placeholder="Tell us more about your property..." rows={4} {...register("details")} />
                <Button type="submit" size="lg" fullWidth disabled={isSubmitting} loading={isSubmitting}>
                  <Calculator className="h-4 w-4" />
                  Request Valuation
                </Button>
              </form>
            </motion.div>

            <motion.div {...fadeInUp} className="space-y-6">
              <div className="rounded-2xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop" alt="Property valuation" className="w-full h-64 object-cover" />
              </div>
              <div className="rounded-2xl p-6" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                <h3 className="font-semibold text-lg mb-4" style={{ color: "var(--text)" }}>Why Choose Our Valuation?</h3>
                <ul className="space-y-3">
                  {[
                    "Certified professional valuers",
                    "Market-based accurate pricing",
                    "Detailed valuation report",
                    "Quick turnaround time",
                    "Accepted by banks and financial institutions",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0" style={{ color: "var(--success)" }} />
                      <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20" style={{ background: "var(--bg-alt)" }}>
        <div className="container">
          <motion.div {...fadeInUp} className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: "var(--text)" }}>
              Our Valuation Process
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Phone, title: "Submit Request", description: "Fill out the form with your property details." },
              { icon: Clock, title: "Schedule Inspection", description: "We arrange a convenient time to inspect your property." },
              { icon: Building2, title: "Market Analysis", description: "Our experts analyze comparable sales and market trends." },
              { icon: TrendingUp, title: "Receive Report", description: "Get a detailed valuation report within 5 business days." },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full mx-auto mb-4 text-white" style={{ background: "var(--primary)" }}>
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="font-semibold mb-2" style={{ color: "var(--text)" }}>{item.title}</h3>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>{item.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=800&fit=crop" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(15,122,110,0.92), rgba(13,148,136,0.85))" }} />
        </div>
        <div className="container relative z-10">
          <motion.div {...fadeInUp} className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Need a Property Valuation?</h2>
            <p className="text-lg text-teal-100 mb-8">Get an accurate, professional valuation from our certified experts today.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`tel:${COMPANY_INFO.phone}`}>
                <Button size="lg" variant="secondary" style={{ background: "#fff", color: "var(--primary)" }}>
                  <Phone className="h-4 w-4" /> Call Us
                </Button>
              </a>
              <a href={`mailto:${COMPANY_INFO.email}`}>
                <Button size="lg" variant="outline" style={{ borderColor: "rgba(255,255,255,0.3)", color: "#fff", background: "transparent" }}>
                  <Mail className="h-4 w-4" /> Email Us
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
