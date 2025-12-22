"use client";

const sections = [
  {
    title: "Refund Policy Overview",
    items: [
      "This Refund Policy outlines the terms and conditions under which refunds may be processed for payments made to KN Medicolegal Support.",
      "By making a payment, you acknowledge that you have read, understood, and agree to be bound by this Refund Policy.",
      "All refund requests are subject to review and processing in accordance with the terms stated herein.",
      "We are committed to fair and transparent refund processing while maintaining the integrity of our services.",
    ],
  },
  {
    title: "Payment Terms",
    items: [
      "All invoices raised within the client portal or via direct engagements are payable in advance unless otherwise specified in writing.",
      "Payment methods accepted include UPI, bank transfers, and cash payments as agreed with clients.",
      "Payment confirmation will be sent to your registered email address upon successful transaction completion.",
      "All payments are processed securely through agreed payment methods including UPI, bank transfers, and cash payments.",
    ],
  },
  {
    title: "Non-Refundable Payments",
    items: [
      "Once a payment is successfully completed, the fee becomes non-refundable. This includes situations where the client elects to discontinue a matter after we have initiated expert allocation, document preparation, or liaison activities.",
      "Services that have been partially or fully delivered are not eligible for refunds.",
      "Payments made for completed consultations, medicolegal audits, drafting of legal documents, training sessions, or advisory services that have been provided are non-refundable.",
      "Subscription fees, advance payments for ongoing services, and retainer fees are non-refundable once services have commenced.",
      "No refunds will be provided for services that have been delivered as per the agreed scope, even if the client is not satisfied with the outcome.",
    ],
  },
  {
    title: "Eligible Refund Scenarios",
    items: [
      "Duplicate Payments: If a payment is charged twice due to technical errors, we will process a full refund for the duplicate transaction within 7-10 business days after verification.",
      "Failed Services: If we are unable to deliver the service due to our technical failure or unavailability, and the client has not received any service, a full or partial refund may be issued at our discretion.",
      "Cancellation Before Service Commencement: If a service is cancelled by the client before any work has been initiated, a refund may be considered on a case-by-case basis, subject to administrative fees if applicable.",
      "Payment Processing Errors: If a payment is processed but the service was not activated due to technical issues on our end, we will either activate the service or provide a full refund.",
    ],
  },
  {
    title: "Refund Process",
    items: [
      "Refund requests must be submitted in writing to knmedicolegal@gmail.com within 7 days of the transaction date, except for duplicate payments which can be reported anytime.",
      "Include the following information in your refund request: transaction ID, payment date, amount, reason for refund request, and any supporting documents.",
      "We will acknowledge receipt of your refund request within 2 business days and begin our review process.",
      "Refund requests are reviewed by our finance team, and a decision will be communicated within 7-10 business days.",
      "If a refund is approved, it will be processed to the original payment method within 7-14 business days from the approval date.",
      "The time taken for the refund to reflect in your account depends on your bank or payment provider, which may take an additional 3-5 business days.",
    ],
  },
  {
    title: "Technical Payment Issues",
    items: [
      "If a payment fails due to technical issues, our support desk will assist in reconciling the transaction or issuing a fresh payment link.",
      "If money is debited from your account but the transaction failed, please contact us immediately with transaction details.",
      "We will investigate the issue and either complete the transaction or initiate a refund within 7-10 business days after verification.",
      "For payment processing-related issues, we coordinate to resolve discrepancies and process refunds as needed.",
    ],
  },
  {
    title: "Service-Specific Refund Terms",
    items: [
      "Consultation Services: Refunds are not available once a consultation session has been conducted, even if rescheduled.",
      "Document Review Services: Refunds are not available after the review has been initiated, as our experts' time and expertise have been utilized.",
      "Training Programs: Refunds are not available for completed training sessions. For cancelled programs before commencement, refunds may be considered subject to administrative charges.",
      "Subscription Services: Monthly or annual subscriptions are non-refundable, but you may cancel future billing cycles to prevent renewal.",
      "Advance Chat Services: Once access is granted and services have been used, payments are non-refundable.",
    ],
  },
  {
    title: "Partial Refunds",
    items: [
      "In exceptional circumstances, partial refunds may be considered when services are partially delivered but cannot be completed due to reasons beyond the client's control.",
      "Partial refunds, if approved, will be calculated based on the proportion of services not delivered.",
      "Administrative fees or processing charges may be deducted from partial refunds as applicable.",
    ],
  },
  {
    title: "Dispute Resolution",
    items: [
      "If you are not satisfied with a refund decision, you may escalate the matter to compliance@knmedicolegal.com with detailed information and supporting documents.",
      "We are committed to resolving disputes fairly and will review escalated cases within 14 business days.",
      "For urgent compliance matters, reach us on the 24/7 coordination desk at knmedicolegal@gmail.com or call +91 97178 91104.",
    ],
  },
  {
    title: "Contact Information",
    items: [
      "For refund inquiries, please contact: knmedicolegal@gmail.com",
      "For billing disputes or escalation: compliance@knmedicolegal.com",
      "Phone Support: +91 97178 91104 (Available 24/7 for urgent matters)",
      "Response Time: We acknowledge refund requests within 2 business days and aim to resolve them within 7-10 business days.",
    ],
  },
];

const RefundPage = () => {
  return (
    <div className="min-h-[100dvh] bg-background py-10 text-sm text-foreground sm:py-16">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        <div className="mx-auto w-full max-w-4xl rounded-2xl border border-primary/15 bg-white p-8 shadow-[0_24px_80px_rgba(15,48,68,0.12)] md:p-12">
          <header className="mb-10 space-y-3 text-center md:mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              KN Medicolegal Support
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-primary md:text-4xl">
              Refund Policy
            </h1>
            <p className="mx-auto max-w-2xl text-sm text-foreground/70 md:text-base">
              This policy outlines the terms and conditions for refunds of
              payments made for our services. Please read carefully before making
              a payment.
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
              For refund requests or inquiries, please contact us:
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
            <p className="mt-4 text-xs text-foreground/60">
              We acknowledge refund requests within 2 business days and aim to
              process approved refunds within 7-14 business days.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default RefundPage;
