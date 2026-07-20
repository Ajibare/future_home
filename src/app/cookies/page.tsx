import { LegalPage } from "@/components/legal/legal-page";
import { COMPANY_INFO } from "@/constants";

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      lastUpdated="July 20, 2026"
      intro="This Cookie Policy explains what cookies are, how we use them on our website, and how you can manage your preferences."
      sections={[
        {
          heading: "1. What Are Cookies",
          body: (
            <p>Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences and understand how the site is used.</p>
          ),
        },
        {
          heading: "2. Types of Cookies We Use",
          body: (
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong style={{ color: "var(--text)" }}>Essential cookies</strong> &mdash; required for core site functionality, such as navigation and remembering your theme preference.</li>
              <li><strong style={{ color: "var(--text)" }}>Preference cookies</strong> &mdash; remember choices you make, such as saved searches or wishlist items.</li>
              <li><strong style={{ color: "var(--text)" }}>Analytics cookies</strong> &mdash; help us understand how visitors use the site so we can improve it.</li>
            </ul>
          ),
        },
        {
          heading: "3. Third-Party Cookies",
          body: (
            <p>Some cookies may be set by third-party services we use, such as analytics or map providers, to support features on our site.</p>
          ),
        },
        {
          heading: "4. Managing Cookies",
          body: (
            <p>Most browsers let you control cookies through their settings, including blocking or deleting them. Disabling essential cookies may affect how parts of our website function.</p>
          ),
        },
        {
          heading: "5. Changes to This Policy",
          body: (
            <p>We may update this Cookie Policy periodically to reflect changes in the cookies we use. Updates will be posted on this page.</p>
          ),
        },
        {
          heading: "6. Contact Us",
          body: (
            <p>Questions about our use of cookies can be sent to <a href={`mailto:${COMPANY_INFO.email}`} style={{ color: "var(--primary)" }}>{COMPANY_INFO.email}</a>.</p>
          ),
        },
      ]}
    />
  );
}
