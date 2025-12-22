"use client";

const sections = [
  {
    title: "Terms of Service",
    items: [
      "KN Medicolegal Support provides medico-legal coordination, drafting of legal documents, and advisory services strictly for registered clients and partner organisations.",
      "All users must ensure that shared information is accurate, lawful, and provided with appropriate authorisations.",
      "Services are delivered in accordance with the scope agreed during onboarding, including any addenda shared via email or within the client portal.",
      "Users are responsible for maintaining the confidentiality of their account credentials and for all activities that occur under their account.",
      "Any misuse or unauthorized access to the platform will result in immediate termination of services and may lead to legal action.",
    ],
  },
  {
    title: "User Responsibilities",
    items: [
      "Users must provide accurate and complete information when registering and using our services.",
      "Users are responsible for ensuring that all documents and information shared comply with applicable laws and regulations.",
      "Users must not use our services for any illegal, fraudulent, or unauthorized purposes.",
      "Users must respect intellectual property rights and not reproduce, distribute, or modify any content without proper authorization.",
      "Users should report any suspected security breaches or unauthorized access immediately to knmedicolegal@gmail.com.",
    ],
  },
  {
    title: "Service Scope",
    items: [
      "Our services include medicolegal consultations, medicolegal audits, drafting of legal documents, compliance assistance, training programs, and crisis management support.",
      "Service availability may vary based on geographic location, technical constraints, and resource availability.",
      "We reserve the right to modify, suspend, or discontinue any aspect of our services at any time with reasonable notice to users.",
      "We provide expert advisory services but do not replace the need for qualified legal representation in formal legal proceedings.",
      "Response times for services may vary based on the complexity of the matter and current workload.",
    ],
  },
  {
    title: "Intellectual Property",
    items: [
      "All content, materials, documents, and resources provided through our platform are the intellectual property of KN Medicolegal Support or its licensors.",
      "Users may access and use content solely for their personal or organizational medicolegal needs.",
      "Unauthorized reproduction, distribution, or commercial use of our content is strictly prohibited.",
      "Users retain ownership of documents and information they submit, but grant us license to use such materials for service delivery purposes.",
    ],
  },
  {
    title: "Limitation of Liability",
    items: [
      "KN Medicolegal Support provides advisory and support services based on best practices and current regulations.",
      "We do not guarantee specific outcomes in legal proceedings or disputes.",
      "Our liability is limited to the extent permitted by law and shall not exceed the fees paid by the user for the specific service in question.",
      "We are not responsible for decisions made by users based on our advice, as users should consult with their own legal counsel for formal legal matters.",
    ],
  },
  {
    title: "Termination",
    items: [
      "We reserve the right to suspend or terminate user accounts that violate these terms or engage in fraudulent or illegal activities.",
      "Users may terminate their account at any time by contacting knmedicolegal@gmail.com.",
      "Upon termination, users' access to the platform and services will be immediately revoked.",
      "Provisions that by their nature should survive termination will remain in effect.",
    ],
  },
];

const TermsPage = () => {
  return (
    <div className="min-h-[100dvh] bg-background py-10 text-sm text-foreground sm:py-16">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        <div className="mx-auto w-full max-w-4xl rounded-2xl border border-primary/15 bg-white p-8 shadow-[0_24px_80px_rgba(15,48,68,0.12)] md:p-12">
          <header className="mb-10 space-y-3 text-center md:mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              KN Medicolegal Support
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-primary md:text-4xl">
              Terms of Service
            </h1>
            <p className="mx-auto max-w-2xl text-sm text-foreground/70 md:text-base">
              Please read these terms carefully. By accessing our website, using
              our services, or registering an account, you agree to be bound by
              these Terms of Service. If you do not agree with any part of these
              terms, please do not use our services.
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
              For questions about these Terms of Service, please contact us:
            </p>
            <p>
              Email:{" "}
              <a
                href="mailto:knmedicolegal@gmail.com"
                className="font-semibold text-primary underline-offset-2 hover:underline"
              >
                knmedicolegal@gmail.com
              </a>
            </p>
            <p className="mt-2">
              Phone:{" "}
              <a
                href="tel:+919717891104"
                className="font-semibold text-primary underline-offset-2 hover:underline"
              >
                +91 97178 91104
              </a>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
