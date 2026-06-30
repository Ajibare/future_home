"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, CheckCircle2, Globe, ExternalLink, Play } from "lucide-react";

const SocialIcon = ({ type, className }: { type: string; className?: string }) => {
  switch (type) {
    case "facebook": return <Globe className={className} />;
    case "twitter": return <MessageCircle className={className} />;
    case "instagram": return <ExternalLink className={className} />;
    case "linkedin": return <Globe className={className} />;
    case "youtube": return <Play className={className} />;
    default: return <Globe className={className} />;
  }
};

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { COMPANY_INFO } from "@/constants";
import { toast } from "sonner";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    toast.success("Message sent successfully! We'll get back to you soon.");
    reset();
    setIsSubmitting(false);
  };

  return (
    <div className="overflow-hidden pt-24">
      {/* Hero */}
      <section className="relative py-20 md:py-24" style={{ background: "var(--bg-alt)" }}>
        <div className="container">
          <motion.div {...fadeInUp} className="text-center max-w-2xl mx-auto">
            <Badge variant="primary" className="mb-4">Contact Us</Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-balance" style={{ color: "var(--text)" }}>Get in Touch</h1>
            <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Have a question or ready to start your property journey? We&apos;re here to help. Reach out to us through any of the channels below.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-24" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <motion.div {...fadeInUp} className="lg:col-span-3">
              <div className="rounded-2xl p-6 md:p-8" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                <h2 className="font-display text-2xl font-bold mb-2" style={{ color: "var(--text)" }}>Send Us a Message</h2>
                <p className="mb-6" style={{ color: "var(--text-muted)" }}>Fill out the form below and we&apos;ll get back to you within 24 hours.</p>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Input label="Full Name" placeholder="John Doe" error={errors.name?.message} {...register("name")} />
                    <Input label="Email Address" type="email" placeholder="john@example.com" error={errors.email?.message} {...register("email")} />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Input label="Phone Number" type="tel" placeholder="+234 800 000 0000" error={errors.phone?.message} {...register("phone")} />
                    <Input label="Subject" placeholder="How can we help?" error={errors.subject?.message} {...register("subject")} />
                  </div>
                  <Textarea label="Message" placeholder="Tell us about your property needs..." rows={5} error={errors.message?.message} {...register("message")} />
                  <Button type="submit" size="lg" fullWidth disabled={isSubmitting} loading={isSubmitting}>
                    <Send className="h-4 w-4" /> Send Message
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div {...fadeInUp} className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl p-6 shadow-soft" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                <h3 className="font-semibold mb-4" style={{ color: "var(--text)" }}>Contact Information</h3>
                <div className="space-y-4">
                  <a href={`tel:${COMPANY_INFO.phone.replace(/\s/g, "")}`} className="flex items-start gap-4 p-3 rounded-xl transition-colors group" style={{ background: "transparent" }}>
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0 transition-all" style={{ background: "var(--primary-light)", color: "var(--primary)" }}>
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-sm" style={{ color: "var(--text)" }}>Phone</p>
                      <p className="text-sm" style={{ color: "var(--text-muted)" }}>{COMPANY_INFO.phone}</p>
                    </div>
                  </a>
                  <a href={`https://wa.me/2348088880708`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-3 rounded-xl transition-colors group">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0" style={{ background: "rgba(34,197,94,0.1)", color: "#16a34a" }}>
                      <MessageCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-sm" style={{ color: "var(--text)" }}>WhatsApp</p>
                      <p className="text-sm" style={{ color: "var(--text-muted)" }}>{COMPANY_INFO.phone2}</p>
                    </div>
                  </a>
                  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY_INFO.address)}`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-3 rounded-xl transition-colors group">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0" style={{ background: "var(--primary-light)", color: "var(--primary)" }}>
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-sm" style={{ color: "var(--text)" }}>Office Address</p>
                      <p className="text-sm" style={{ color: "var(--text-muted)" }}>{COMPANY_INFO.address}</p>
                    </div>
                  </a>
                  <a href={`mailto:${COMPANY_INFO.email}`} className="flex items-start gap-4 p-3 rounded-xl transition-colors group">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0" style={{ background: "var(--primary-light)", color: "var(--primary)" }}>
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-sm" style={{ color: "var(--text)" }}>Email</p>
                      <p className="text-sm" style={{ color: "var(--text-muted)" }}>{COMPANY_INFO.email}</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="rounded-2xl p-6 shadow-soft" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                <h3 className="font-semibold mb-4" style={{ color: "var(--text)" }}>Office Hours</h3>
                <div className="space-y-3">
                  {[
                    { day: "Monday - Friday", time: COMPANY_INFO.hours.weekdays },
                    { day: "Saturday", time: COMPANY_INFO.hours.saturday },
                    { day: "Sunday", time: COMPANY_INFO.hours.sunday },
                  ].map((item) => (
                    <div key={item.day} className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2" style={{ color: "var(--text-secondary)" }}>
                        <Clock className="h-4 w-4" style={{ color: "var(--primary)" }} />
                        {item.day}
                      </span>
                      <span className="font-medium" style={{ color: "var(--text)" }}>{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl p-6 shadow-soft" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                <h3 className="font-semibold mb-4" style={{ color: "var(--text)" }}>Follow Us</h3>
                <div className="flex items-center gap-3">
                  {Object.entries(COMPANY_INFO.social).map(([key, url]) => url && (
                    <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-11 h-11 rounded-xl transition-all" style={{ background: "var(--surface-hover)", color: "var(--text-secondary)", border: "1px solid var(--border)" }} aria-label={key}>
                      <SocialIcon type={key} className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Google Map */}
      <section className="pb-16" style={{ background: "var(--bg-alt)" }}>
        <div className="container">
          <motion.div {...fadeInUp} className="rounded-2xl overflow-hidden shadow-soft" style={{ border: "1px solid var(--border)" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.08348!2d3.4576!3d6.4478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf4f4f8c7b8b5%3A0x7c8b5c4f4b4f4b4b!2s18A%20Onikepo%20Akande%20St%2C%20Lekki%20Phase%201%2C%20Lekki%2C%20Lagos!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
              width="100%" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Future Home Properties Office Location" className="w-full" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
