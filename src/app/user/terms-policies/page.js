"use client";

const sections = [
  {
    title: "Terms of Service",
    items: [
      "KN Medicolegal Support provides medico-legal coordination, documentation, and advisory services strictly for registered clients and partner organisations.",
      "All users must ensure that shared information is accurate, lawful, and provided with appropriate authorisations.",
      "Services are delivered in accordance with the scope agreed during onboarding, including any addenda shared via email or within the client portal.",
    ],
  },
  {
    title: "Payment & Refund Policy",
    items: [
      "All invoices raised within the client portal or via direct engagements are payable in advance unless otherwise specified in writing.",
      "Once a payment is successfully completed, the fee becomes non-refundable. This includes situations where the client elects to discontinue a matter after we have initiated expert allocation, document preparation, or liaison activities.",
      "If a payment fails due to technical issues, our support desk will assist in reconciling the transaction or issuing a fresh payment link. Refunds are only processed for duplicate payments confirmed by our finance team within seven (7) working days.",
    ],
  },
  {
    title: "Confidentiality & Data Handling",
    items: [
      "All medical records, legal briefs, and personal identifiers supplied through the portal are encrypted at rest and in transit.",
      "We restrict access to client files on a need-to-know basis and maintain audit logs for every document interaction.",
      "Clients must refrain from sharing login credentials. Any suspected unauthorised access should be reported immediately at support@knmedicolegal.com.",
    ],
  },
  {
    title: "Grievance Redressal",
    items: [
      "For service clarifications, billing queries, or escalation of unresolved issues, please write to compliance@knmedicolegal.com with supporting details.",
      "We acknowledge grievances within two (2) business days and aim to resolve them within seven (7) business days, depending on complexity.",
    ],
  },
];

const TermsPolicies = () => {
  return (
    <div className="min-h-[100dvh] bg-background py-10 text-sm text-foreground sm:py-16">
      <div className="mx-auto w-full max-w-4xl rounded-2xl border border-primary/15 bg-white p-8 shadow-[0_24px_80px_rgba(15,48,68,0.12)] md:p-12">
        <header className="mb-10 space-y-3 text-center md:mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            KN Medicolegal Support
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-primary md:text-4xl">
            Terms & Policies
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-foreground/70 md:text-base">
            Please review the following terms carefully. By accessing the client
            portal, submitting documents, or remitting payments, you agree to be
            bound by these policies.
          </p>
        </header>

        <div className="space-y-10 md:space-y-12">
          {sections.map((section) => (
            <section key={section.title} className="space-y-4">
              <h2 className="text-xl font-semibold text-primary">{section.title}</h2>
              <ul className="space-y-3 rounded-2xl bg-secondary/50 p-5">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-3 text-foreground/80">
                    <span className="mt-1 inline-flex h-2.5 w-2.5 flex-shrink-0 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <footer className="mt-12 rounded-2xl border border-primary/20 bg-primary/10 p-6 text-center text-xs text-foreground/70 md:text-sm">
          For urgent compliance matters, reach us on the 24/7 coordination desk at{" "}
          <a
            href="mailto:support@knmedicolegal.com"
            className="font-semibold text-primary underline-offset-2 hover:underline"
          >
            support@knmedicolegal.com
          </a>{" "}
          or call +91 98765 43210.
        </footer>
      </div>
    </div>
  );
};

export default TermsPolicies;
