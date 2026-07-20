import { LegalPage } from "@/components/legal/legal-page";
import { COMPANY_INFO } from "@/constants";

export default function AccessibilityPage() {
  return (
    <LegalPage
      title="Accessibility Statement"
      lastUpdated="July 20, 2026"
      intro={`${COMPANY_INFO.name} is committed to ensuring our website is accessible to everyone, including people with disabilities.`}
      sections={[
        {
          heading: "1. Our Commitment",
          body: (
            <p>We strive to make our website usable for the widest possible audience, regardless of ability or the technology used to access it.</p>
          ),
        },
        {
          heading: "2. Accessibility Standards",
          body: (
            <p>We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA, which cover recommendations for making web content more accessible for people with visual, auditory, motor, and cognitive disabilities.</p>
          ),
        },
        {
          heading: "3. Measures We Take",
          body: (
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Providing text alternatives for images and icons.</li>
              <li>Ensuring sufficient color contrast in both light and dark themes.</li>
              <li>Supporting keyboard navigation across interactive elements.</li>
              <li>Using clear, consistent page structure and labelling for forms and controls.</li>
            </ul>
          ),
        },
        {
          heading: "4. Known Limitations",
          body: (
            <p>Despite our efforts, some parts of the website may not yet be fully accessible. We are continuously working to identify and resolve these issues.</p>
          ),
        },
        {
          heading: "5. Feedback",
          body: (
            <p>If you encounter any accessibility barriers while using our website, please let us know so we can address them. Contact us at <a href={`mailto:${COMPANY_INFO.email}`} style={{ color: "var(--primary)" }}>{COMPANY_INFO.email}</a> or {COMPANY_INFO.phone}.</p>
          ),
        },
      ]}
    />
  );
}
