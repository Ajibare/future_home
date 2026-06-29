"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Phone, Mail, MapPin, Clock, Send, MessageCircle,
  CheckCircle2, Globe, ExternalLink, Play
} from "lucide-react";

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
      <section className="relative py-20 md:py-24 bg-light-50 dark:bg-dark-950">
        <div className="container">
          <motion.div {...fadeInUp} className="text-center max-w-2xl mx-auto">
            <Badge variant="primary" className="mb-4">Contact Us</Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-dark-900 dark:text-light-50 mb-4 text-balance">
              Get in Touch
            </h1>
            <p className="text-lg text-light-600 dark:text-dark-300 leading-relaxed">
              Have a question or ready to start your property journey? We&apos;re here to help. Reach out to us through any of the channels below.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-24 bg-white dark:bg-dark-900">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <motion.div {...fadeInUp} className="lg:col-span-3">
              <div className="rounded-2xl bg-light-50 dark:bg-dark-800 border border-light-200 dark:border-dark-700 p-6 md:p-8">
                <h2 className="font-display text-2xl font-bold text-dark-900 dark:text-light-50 mb-2">Send Us a Message</h2>
                <p className="text-light-500 dark:text-dark-400 mb-6">Fill out the form below and we&apos;ll get back to you within 24 hours.</p>
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
                    <Send className="h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div {...fadeInUp} className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl bg-white dark:bg-dark-800 border border-light-200 dark:border-dark-700 p-6 shadow-soft">
                <h3 className="font-semibold text-dark-900 dark:text-light-50 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <a href={`tel:${COMPANY_INFO.phone.replace(/\s/g, "")}`} className="flex items-start gap-4 p-3 rounded-xl hover:bg-light-50 dark:hover:bg-dark-700 transition-colors group">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 group-hover:bg-primary-700 group-hover:text-white transition-all shrink-0">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-dark-900 dark:text-light-50">Phone</p>
                      <p className="text-sm text-light-500 dark:text-dark-400">{COMPANY_INFO.phone}</p>
                    </div>
                  </a>
                  <a href={`https://wa.me/2348088880708`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-3 rounded-xl hover:bg-light-50 dark:hover:bg-dark-700 transition-colors group">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 group-hover:bg-green-500 group-hover:text-white transition-all shrink-0">
                      <MessageCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-dark-900 dark:text-light-50">WhatsApp</p>
                      <p className="text-sm text-light-500 dark:text-dark-400">{COMPANY_INFO.phone2}</p>
                    </div>
                  </a>
                  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY_INFO.address)}`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-3 rounded-xl hover:bg-light-50 dark:hover:bg-dark-700 transition-colors group">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 group-hover:bg-primary-700 group-hover:text-white transition-all shrink-0">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-dark-900 dark:text-light-50">Office Address</p>
                      <p className="text-sm text-light-500 dark:text-dark-400">{COMPANY_INFO.address}</p>
                    </div>
                  </a>
                  <a href={`mailto:${COMPANY_INFO.email}`} className="flex items-start gap-4 p-3 rounded-xl hover:bg-light-50 dark:hover:bg-dark-700 transition-colors group">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 group-hover:bg-primary-700 group-hover:text-white transition-all shrink-0">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-dark-900 dark:text-light-50">Email</p>
                      <p className="text-sm text-light-500 dark:text-dark-400">{COMPANY_INFO.email}</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="rounded-2xl bg-white dark:bg-dark-800 border border-light-200 dark:border-dark-700 p-6 shadow-soft">
                <h3 className="font-semibold text-dark-900 dark:text-light-50 mb-4">Office Hours</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-light-600 dark:text-dark-300">
                      <Clock className="h-4 w-4 text-primary-500" />
                      Monday - Friday
                    </span>
                    <span className="font-medium text-dark-900 dark:text-light-50">{COMPANY_INFO.hours.weekdays}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-light-600 dark:text-dark-300">
                      <Clock className="h-4 w-4 text-primary-500" />
                      Saturday
                    </span>
                    <span className="font-medium text-dark-900 dark:text-light-50">{COMPANY_INFO.hours.saturday}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-light-600 dark:text-dark-300">
                      <Clock className="h-4 w-4 text-primary-500" />
                      Sunday
                    </span>
                    <span className="font-medium text-dark-900 dark:text-light-50">{COMPANY_INFO.hours.sunday}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white dark:bg-dark-800 border border-light-200 dark:border-dark-700 p-6 shadow-soft">
                <h3 className="font-semibold text-dark-900 dark:text-light-50 mb-4">Follow Us</h3>
                <div className="flex items-center gap-3">
                  {COMPANY_INFO.social.facebook && (
                    <a href={COMPANY_INFO.social.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-11 h-11 rounded-xl bg-light-100 dark:bg-dark-700 text-light-600 dark:text-dark-300 hover:bg-primary-700 hover:text-white transition-all" aria-label="Facebook">
                      <SocialIcon type="facebook" className="h-5 w-5" />
                    </a>
                  )}
                  {COMPANY_INFO.social.twitter && (
                    <a href={COMPANY_INFO.social.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-11 h-11 rounded-xl bg-light-100 dark:bg-dark-700 text-light-600 dark:text-dark-300 hover:bg-primary-700 hover:text-white transition-all" aria-label="Twitter">
                      <SocialIcon type="twitter" className="h-5 w-5" />
                    </a>
                  )}
                  {COMPANY_INFO.social.instagram && (
                    <a href={COMPANY_INFO.social.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-11 h-11 rounded-xl bg-light-100 dark:bg-dark-700 text-light-600 dark:text-dark-300 hover:bg-primary-700 hover:text-white transition-all" aria-label="Instagram">
                      <SocialIcon type="instagram" className="h-5 w-5" />
                    </a>
                  )}
                  {COMPANY_INFO.social.linkedin && (
                    <a href={COMPANY_INFO.social.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-11 h-11 rounded-xl bg-light-100 dark:bg-dark-700 text-light-600 dark:text-dark-300 hover:bg-primary-700 hover:text-white transition-all" aria-label="LinkedIn">
                      <SocialIcon type="linkedin" className="h-5 w-5" />
                    </a>
                  )}
                  {COMPANY_INFO.social.youtube && (
                    <a href={COMPANY_INFO.social.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-11 h-11 rounded-xl bg-light-100 dark:bg-dark-700 text-light-600 dark:text-dark-300 hover:bg-primary-700 hover:text-white transition-all" aria-label="YouTube">
                      <SocialIcon type="youtube" className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Google Map */}
      <section className="bg-light-50 dark:bg-dark-950 pb-16">
        <div className="container">
          <motion.div {...fadeInUp} className="rounded-2xl overflow-hidden border border-light-200 dark:border-dark-700 shadow-soft">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.08348!2d3.4576!3d6.4478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf4f4f8c7b8b5%3A0x7c8b5c4f4b4f4b4b!2s18A%20Onikepo%20Akande%20St%2C%20Lekki%20Phase%201%2C%20Lekki%2C%20Lagos!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Future Home Properties Office Location"
              className="w-full"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}