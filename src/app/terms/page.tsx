import { LegalPage } from "@/components/legal/legal-page";
import { COMPANY_INFO } from "@/constants";

export default function TermsOfServicePage() {
  return (
    <LegalPage
      title="Terms of Service"
      lastUpdated="July 20, 2026"
      intro={`These Terms of Service ("Terms") govern your use of the ${COMPANY_INFO.name} website and services. By accessing or using our site, you agree to be bound by these Terms.`}
      sections={[
        {
          heading: "1. Use of the Website",
          body: (
            <p>You may use this website to browse property listings, request services, and contact our team, provided you do so lawfully and do not interfere with the site&apos;s operation or attempt to gain unauthorized access to any part of it.</p>
          ),
        },
        {
          heading: "2. Property Listings",
          body: (
            <p>We make reasonable efforts to ensure property listings, prices, and descriptions are accurate, but details are subject to change without notice and should be independently verified before any transaction. Listings do not constitute a binding offer.</p>
          ),
        },
        {
          heading: "3. Enquiries, Valuations & Listing Requests",
          body: (
            <p>When you submit an enquiry, request a valuation, or list a property with us, you confirm that the information provided is accurate and that you are authorized to act on the property&apos;s behalf where applicable. We may contact you to follow up on your request.</p>
          ),
        },
        {
          heading: "4. Marketing Packages & Fees",
          body: (
            <p>Where paid marketing packages or services are purchased, applicable fees will be communicated to you in advance. Fees are non-refundable once the service has commenced, except where required by law.</p>
          ),
        },
        {
          heading: "5. Intellectual Property",
          body: (
            <p>All content on this website, including text, images, logos, and design, is owned by or licensed to {COMPANY_INFO.name} and may not be copied, reproduced, or distributed without our prior written consent.</p>
          ),
        },
        {
          heading: "6. Third-Party Links",
          body: (
            <p>Our website may contain links to third-party sites. We are not responsible for the content, accuracy, or practices of any third-party site linked from ours.</p>
          ),
        },
        {
          heading: "7. Limitation of Liability",
          body: (
            <p>{COMPANY_INFO.name} shall not be liable for any indirect, incidental, or consequential loss arising from your use of this website or reliance on information provided on it, to the fullest extent permitted by law.</p>
          ),
        },
        {
          heading: "8. Termination",
          body: (
            <p>We reserve the right to suspend or restrict access to our website or services for any user who violates these Terms.</p>
          ),
        },
        {
          heading: "9. Governing Law",
          body: (
            <p>These Terms are governed by the laws of the Federal Republic of Nigeria, and any disputes shall be subject to the exclusive jurisdiction of the courts of Lagos State.</p>
          ),
        },
        {
          heading: "10. Changes to These Terms",
          body: (
            <p>We may revise these Terms from time to time. Continued use of the website after changes are posted constitutes acceptance of the updated Terms.</p>
          ),
        },
        {
          heading: "11. Contact Us",
          body: (
            <p>Questions about these Terms can be sent to <a href={`mailto:${COMPANY_INFO.email}`} style={{ color: "var(--primary)" }}>{COMPANY_INFO.email}</a> or {COMPANY_INFO.phone}, {COMPANY_INFO.address}.</p>
          ),
        },
      ]}
    />
  );
}
