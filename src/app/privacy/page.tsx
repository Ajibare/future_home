import { LegalPage } from "@/components/legal/legal-page";
import { COMPANY_INFO } from "@/constants";

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated="July 20, 2026"
      intro={`${COMPANY_INFO.name} ("we", "us", "our") respects your privacy and is committed to protecting the personal information you share with us when you use our website and services.`}
      sections={[
        {
          heading: "1. Information We Collect",
          body: (
            <>
              <p>We may collect the following types of information:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Contact details you provide, such as your name, email address, and phone number when you submit an inquiry, request a valuation, or list a property.</li>
                <li>Account information if you register on our platform.</li>
                <li>Usage data, such as pages visited, search filters used, and time spent on the site.</li>
                <li>Device and technical information, including IP address, browser type, and general location.</li>
              </ul>
            </>
          ),
        },
        {
          heading: "2. How We Use Your Information",
          body: (
            <ul className="list-disc pl-5 space-y-1.5">
              <li>To respond to inquiries and connect you with the right agent or service.</li>
              <li>To process property listing requests, valuations, and marketing package orders.</li>
              <li>To send updates about properties, market insights, or offers you&apos;ve opted into.</li>
              <li>To improve our website, services, and user experience.</li>
              <li>To comply with legal obligations and protect against fraud.</li>
            </ul>
          ),
        },
        {
          heading: "3. Sharing Your Information",
          body: (
            <p>We do not sell your personal information. We may share limited information with agents, service providers, or legal advisers directly involved in fulfilling your request (for example, connecting you with the relevant property agent), and with third parties where required by law.</p>
          ),
        },
        {
          heading: "4. Cookies & Tracking",
          body: (
            <p>We use cookies and similar technologies to keep the site functional and to understand how visitors use it. See our <a href="/cookies" style={{ color: "var(--primary)" }}>Cookie Policy</a> for details on the cookies we use and how to manage them.</p>
          ),
        },
        {
          heading: "5. Data Security",
          body: (
            <p>We apply reasonable technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction. No method of transmission over the internet is completely secure, and we cannot guarantee absolute security.</p>
          ),
        },
        {
          heading: "6. Your Rights",
          body: (
            <p>In line with the Nigeria Data Protection Act, you have the right to access, correct, or request deletion of your personal data, and to object to or restrict certain processing. To exercise these rights, contact us using the details below.</p>
          ),
        },
        {
          heading: "7. Data Retention",
          body: (
            <p>We retain personal information only for as long as necessary to fulfil the purposes described in this policy, or as required by law.</p>
          ),
        },
        {
          heading: "8. Changes to This Policy",
          body: (
            <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date.</p>
          ),
        },
        {
          heading: "9. Contact Us",
          body: (
            <p>If you have questions about this Privacy Policy, contact us at <a href={`mailto:${COMPANY_INFO.email}`} style={{ color: "var(--primary)" }}>{COMPANY_INFO.email}</a> or {COMPANY_INFO.phone}, {COMPANY_INFO.address}.</p>
          ),
        },
      ]}
    />
  );
}
