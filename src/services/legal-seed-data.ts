import { COMPANY_INFO } from "@/constants";

export const LEGAL_PAGES_SEED = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    lastUpdated: "July 20, 2026",
    intro: `${COMPANY_INFO.name} ("we", "us", "our") respects your privacy and is committed to protecting the personal information you share with us when you use our website and services.`,
    sections: [
      {
        heading: "1. Information We Collect",
        body: "We may collect the following types of information:\n\n- Contact details you provide, such as your name, email address, and phone number when you submit an inquiry, request a valuation, or list a property.\n- Account information if you register on our platform.\n- Usage data, such as pages visited, search filters used, and time spent on the site.\n- Device and technical information, including IP address, browser type, and general location.",
      },
      {
        heading: "2. How We Use Your Information",
        body: "- To respond to inquiries and connect you with the right agent or service.\n- To process property listing requests, valuations, and marketing package orders.\n- To send updates about properties, market insights, or offers you've opted into.\n- To improve our website, services, and user experience.\n- To comply with legal obligations and protect against fraud.",
      },
      {
        heading: "3. Sharing Your Information",
        body: "We do not sell your personal information. We may share limited information with agents, service providers, or legal advisers directly involved in fulfilling your request (for example, connecting you with the relevant property agent), and with third parties where required by law.",
      },
      {
        heading: "4. Cookies & Tracking",
        body: "We use cookies and similar technologies to keep the site functional and to understand how visitors use it. See our [Cookie Policy](/cookies) for details on the cookies we use and how to manage them.",
      },
      {
        heading: "5. Data Security",
        body: "We apply reasonable technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction. No method of transmission over the internet is completely secure, and we cannot guarantee absolute security.",
      },
      {
        heading: "6. Your Rights",
        body: "In line with the Nigeria Data Protection Act, you have the right to access, correct, or request deletion of your personal data, and to object to or restrict certain processing. To exercise these rights, contact us using the details below.",
      },
      {
        heading: "7. Data Retention",
        body: "We retain personal information only for as long as necessary to fulfil the purposes described in this policy, or as required by law.",
      },
      {
        heading: "8. Changes to This Policy",
        body: "We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date.",
      },
      {
        heading: "9. Contact Us",
        body: `If you have questions about this Privacy Policy, contact us at [${COMPANY_INFO.email}](mailto:${COMPANY_INFO.email}) or ${COMPANY_INFO.phone}, ${COMPANY_INFO.address}.`,
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of Service",
    lastUpdated: "July 20, 2026",
    intro: `These Terms of Service ("Terms") govern your use of the ${COMPANY_INFO.name} website and services. By accessing or using our site, you agree to be bound by these Terms.`,
    sections: [
      {
        heading: "1. Use of the Website",
        body: "You may use this website to browse property listings, request services, and contact our team, provided you do so lawfully and do not interfere with the site's operation or attempt to gain unauthorized access to any part of it.",
      },
      {
        heading: "2. Property Listings",
        body: "We make reasonable efforts to ensure property listings, prices, and descriptions are accurate, but details are subject to change without notice and should be independently verified before any transaction. Listings do not constitute a binding offer.",
      },
      {
        heading: "3. Enquiries, Valuations & Listing Requests",
        body: "When you submit an enquiry, request a valuation, or list a property with us, you confirm that the information provided is accurate and that you are authorized to act on the property's behalf where applicable. We may contact you to follow up on your request.",
      },
      {
        heading: "4. Marketing Packages & Fees",
        body: "Where paid marketing packages or services are purchased, applicable fees will be communicated to you in advance. Fees are non-refundable once the service has commenced, except where required by law.",
      },
      {
        heading: "5. Intellectual Property",
        body: `All content on this website, including text, images, logos, and design, is owned by or licensed to ${COMPANY_INFO.name} and may not be copied, reproduced, or distributed without our prior written consent.`,
      },
      {
        heading: "6. Third-Party Links",
        body: "Our website may contain links to third-party sites. We are not responsible for the content, accuracy, or practices of any third-party site linked from ours.",
      },
      {
        heading: "7. Limitation of Liability",
        body: `${COMPANY_INFO.name} shall not be liable for any indirect, incidental, or consequential loss arising from your use of this website or reliance on information provided on it, to the fullest extent permitted by law.`,
      },
      {
        heading: "8. Termination",
        body: "We reserve the right to suspend or restrict access to our website or services for any user who violates these Terms.",
      },
      {
        heading: "9. Governing Law",
        body: "These Terms are governed by the laws of the Federal Republic of Nigeria, and any disputes shall be subject to the exclusive jurisdiction of the courts of Lagos State.",
      },
      {
        heading: "10. Changes to These Terms",
        body: "We may revise these Terms from time to time. Continued use of the website after changes are posted constitutes acceptance of the updated Terms.",
      },
      {
        heading: "11. Contact Us",
        body: `Questions about these Terms can be sent to [${COMPANY_INFO.email}](mailto:${COMPANY_INFO.email}) or ${COMPANY_INFO.phone}, ${COMPANY_INFO.address}.`,
      },
    ],
  },
  {
    slug: "cookies",
    title: "Cookie Policy",
    lastUpdated: "July 20, 2026",
    intro: "This Cookie Policy explains what cookies are, how we use them on our website, and how you can manage your preferences.",
    sections: [
      {
        heading: "1. What Are Cookies",
        body: "Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences and understand how the site is used.",
      },
      {
        heading: "2. Types of Cookies We Use",
        body: "- **Essential cookies** — required for core site functionality, such as navigation and remembering your theme preference.\n- **Preference cookies** — remember choices you make, such as saved searches or wishlist items.\n- **Analytics cookies** — help us understand how visitors use the site so we can improve it.",
      },
      {
        heading: "3. Third-Party Cookies",
        body: "Some cookies may be set by third-party services we use, such as analytics or map providers, to support features on our site.",
      },
      {
        heading: "4. Managing Cookies",
        body: "Most browsers let you control cookies through their settings, including blocking or deleting them. Disabling essential cookies may affect how parts of our website function.",
      },
      {
        heading: "5. Changes to This Policy",
        body: "We may update this Cookie Policy periodically to reflect changes in the cookies we use. Updates will be posted on this page.",
      },
      {
        heading: "6. Contact Us",
        body: `Questions about our use of cookies can be sent to [${COMPANY_INFO.email}](mailto:${COMPANY_INFO.email}).`,
      },
    ],
  },
  {
    slug: "accessibility",
    title: "Accessibility Statement",
    lastUpdated: "July 20, 2026",
    intro: `${COMPANY_INFO.name} is committed to ensuring our website is accessible to everyone, including people with disabilities.`,
    sections: [
      {
        heading: "1. Our Commitment",
        body: "We strive to make our website usable for the widest possible audience, regardless of ability or the technology used to access it.",
      },
      {
        heading: "2. Accessibility Standards",
        body: "We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA, which cover recommendations for making web content more accessible for people with visual, auditory, motor, and cognitive disabilities.",
      },
      {
        heading: "3. Measures We Take",
        body: "- Providing text alternatives for images and icons.\n- Ensuring sufficient color contrast in both light and dark themes.\n- Supporting keyboard navigation across interactive elements.\n- Using clear, consistent page structure and labelling for forms and controls.",
      },
      {
        heading: "4. Known Limitations",
        body: "Despite our efforts, some parts of the website may not yet be fully accessible. We are continuously working to identify and resolve these issues.",
      },
      {
        heading: "5. Feedback",
        body: `If you encounter any accessibility barriers while using our website, please let us know so we can address them. Contact us at [${COMPANY_INFO.email}](mailto:${COMPANY_INFO.email}) or ${COMPANY_INFO.phone}.`,
      },
    ],
  },
] as const;
