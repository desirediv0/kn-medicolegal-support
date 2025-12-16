"use client";

const sections = [
  {
    title: "Privacy Policy Overview",
    items: [
      "KN Medicolegal Support is committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.",
      "We understand the sensitive nature of medical and legal information and implement strict security measures to protect your data.",
      "By using our services, you consent to the collection and use of information in accordance with this policy.",
      "This policy applies to all users of our website, mobile applications, and services, including clients, partners, and visitors.",
    ],
  },
  {
    title: "Information We Collect",
    items: [
      "Personal Information: Name, email address, phone number, professional qualifications, registration numbers, and organizational affiliations.",
      "Medical Information: Medical records, case documents, consent forms, and clinical notes that you choose to share with us.",
      "Legal Information: Legal notices, court documents, complaints, and related correspondence shared for advisory purposes.",
      "Technical Information: IP address, browser type, device information, cookies, and usage patterns when you interact with our platform.",
      "Payment Information: Billing details, payment history, and transaction records (payment details are processed securely and are not stored on our servers).",
      "Communication Records: Messages, emails, chat transcripts, and other communications exchanged through our platform.",
    ],
  },
  {
    title: "How We Use Your Information",
    items: [
      "Service Delivery: To provide medicolegal consultations, medicolegal audits, drafting of legal documents, compliance assistance, and other requested services.",
      "Account Management: To create and manage your account, process registrations, and authenticate your identity.",
      "Communication: To respond to your inquiries, send service updates, notifications, and important information about your account.",
      "Payment Processing: To process payments, manage subscriptions, and handle billing-related communications. Payments are processed through secure methods including UPI, bank transfers, and cash payments as agreed.",
      "Improvement of Services: To analyze usage patterns, improve our services, develop new features, and enhance user experience.",
      "Legal Compliance: To comply with applicable laws, regulations, court orders, and regulatory requirements.",
      "Security: To detect, prevent, and address fraud, unauthorized access, and other security threats.",
    ],
  },
  {
    title: "Confidentiality & Data Handling",
    items: [
      "All medical records, legal briefs, and personal identifiers supplied through the portal are encrypted at rest and in transit using industry-standard encryption protocols.",
      "We restrict access to client files on a need-to-know basis and maintain audit logs for every document interaction and access event.",
      "Clients must refrain from sharing login credentials. Any suspected unauthorized access should be reported immediately at support@knmedicolegal.com.",
      "All staff members and consultants are bound by strict confidentiality agreements and professional codes of conduct.",
      "We implement multi-layer security measures including firewalls, intrusion detection systems, and regular security audits.",
    ],
  },
  {
    title: "Data Sharing and Disclosure",
    items: [
      "We do not sell, rent, or trade your personal or medical information to third parties for marketing purposes.",
      "We may share information with trusted service providers who assist in delivering our services (e.g., cloud hosting, payment processing) under strict confidentiality agreements.",
      "Information may be disclosed if required by law, court order, or regulatory authority, or to protect our rights and the safety of our users.",
      "We may share anonymized, aggregated data for research, statistical analysis, or service improvement purposes, which cannot be used to identify individuals.",
      "In case of business transfers, mergers, or acquisitions, user information may be transferred to the acquiring entity with appropriate privacy protections.",
    ],
  },
  {
    title: "Data Retention",
    items: [
      "We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy.",
      "Medical and legal documents are retained in accordance with legal and regulatory requirements, which may extend beyond the termination of services.",
      "Account information is retained for a minimum period required by law and business needs, typically 7 years from the last interaction.",
      "You may request (in writing) deletion of your data, subject to legal and regulatory retention requirements.",
    ],
  },
  {
    title: "Your Rights and Choices",
    items: [
      "Access: You have the right to access, review, and obtain a copy of your personal information held by us.",
      "Correction: You can request correction of inaccurate or incomplete information.",
      "Deletion: You may request deletion of your data, subject to legal retention requirements.",
      "Data Portability: You can request a copy of your data in a structured, machine-readable format.",
      "Opt-Out: You can opt out of marketing communications while still receiving essential service-related messages.",
      "Account Controls: You can update your account information, preferences, and privacy settings through your account dashboard.",
    ],
  },
  {
    title: "Cookies and Tracking Technologies",
    items: [
      "We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and improve our services.",
      "Cookies help us remember your preferences, maintain session security, and provide personalized content.",
      "You can control cookie preferences through your browser settings, though disabling cookies may affect some functionality.",
      "We use both session cookies (temporary) and persistent cookies (stored on your device) as necessary for service operation.",
    ],
  },
  {
    title: "Security Measures",
    items: [
      "We employ industry-standard security measures including SSL/TLS encryption for data transmission.",
      "All data stored on our servers is encrypted at rest using advanced encryption standards.",
      "Regular security audits, vulnerability assessments, and penetration testing are conducted to identify and address potential threats.",
      "Access controls, multi-factor authentication, and role-based permissions are implemented to restrict unauthorized access.",
      "All employees and consultants undergo background checks and sign strict confidentiality agreements.",
      "We maintain incident response procedures to quickly address and mitigate any security breaches.",
    ],
  },
  {
    title: "Third-Party Links and Services",
    items: [
      "Our website may contain links to third-party websites or services. We are not responsible for the privacy practices of these external sites.",
      "We encourage you to review the privacy policies of any third-party services you access through our platform.",
      "Payment processing is handled through secure methods including UPI, bank transfers, and cash payments as agreed with clients.",
    ],
  },
  {
    title: "Children's Privacy",
    items: [
      "Our services are intended for healthcare professionals and organizations. We do not knowingly collect information from individuals under 18 years of age.",
      "If we become aware that we have collected information from a minor, we will take steps to delete such information promptly.",
    ],
  },
  {
    title: "Changes to This Privacy Policy",
    items: [
      "We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements.",
      "We will notify users of significant changes through email notifications or prominent notices on our platform.",
      "The 'Last Updated' date at the top of this policy indicates when the most recent changes were made.",
      "Continued use of our services after policy changes constitutes acceptance of the updated terms.",
    ],
  },
];

const PrivacyPage = () => {
  return (
    <div className="min-h-[100dvh] bg-background py-10 text-sm text-foreground sm:py-16">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        <div className="mx-auto w-full max-w-4xl rounded-2xl border border-primary/15 bg-white p-8 shadow-[0_24px_80px_rgba(15,48,68,0.12)] md:p-12">
          <header className="mb-10 space-y-3 text-center md:mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              KN Medicolegal Support
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-primary md:text-4xl">
              Privacy Policy
            </h1>
            <p className="mx-auto max-w-2xl text-sm text-foreground/70 md:text-base">
              Your privacy is important to us. This policy explains how we
              collect, use, protect, and handle your personal and medical
              information when you use our services.
            </p>
            <p className="text-xs text-foreground/60 mt-4">
              Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </header>

          <div className="space-y-10 md:space-y-12">
            {sections.map((section) => (
              <section key={section.title} className="space-y-4">
                <h2 className="text-xl font-semibold text-primary">
                  {section.title}
                </h2>
                <ul className="space-y-3 rounded-2xl bg-secondary/50 p-5">
                  {section.items.map((item, index) => (
                    <li key={index} className="flex gap-3 text-foreground/80">
                      <span className="mt-1 inline-flex h-2.5 w-2.5 flex-shrink-0 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <footer className="mt-12 rounded-2xl border border-primary/20 bg-primary/10 p-6 text-center text-xs text-foreground/70 md:text-sm">
            <p className="mb-2">
              For privacy-related inquiries, data access requests, or to exercise
              your rights, please contact us:
            </p>
            <p>
              Email:{" "}
              <a
                href="mailto:support@knmedicolegal.com"
                className="font-semibold text-primary underline-offset-2 hover:underline"
              >
                support@knmedicolegal.com
              </a>
            </p>
            <p className="mt-2">
              Phone:{" "}
              <a
                href="tel:+919876543210"
                className="font-semibold text-primary underline-offset-2 hover:underline"
              >
                +91 98765 43210
              </a>
            </p>
            <p className="mt-4 text-xs text-foreground/60">
              We are committed to protecting your privacy and will respond to
              your inquiries within 48 hours.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
