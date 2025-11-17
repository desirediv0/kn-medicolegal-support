"use client";

export default function FAQPage() {
  const faqs = [
    {
      question: "What medicolegal services do you provide?",
      answer:
        "We offer end-to-end medicolegal support, including advisory services, case assessment, documentation guidance, litigation assistance, risk prevention strategies, compliance audits, and crisis response. For court appearances, we have advocates on our panel. We provide the medicolegal support, on your behalf, to the advocate you select – from the panel or otherwise.",
    },
    {
      question: "Do you help with both preventive and defensive legal matters?",
      answer:
        "Yes. We focus on preventing litigation through good practices and also assist in defending cases if a court notice on a complaint or legal notice is served.",
    },
    {
      question: "How should I respond if I receive a legal notice or complaint?",
      answer:
        "You should not reply without expert guidance. Share the notice with us, and we will render proper advice and help draft an appropriate, legally sound response based on facts and records.",
    },
    {
      question: "Do you assist with police, FIR, and MLC-related matters?",
      answer:
        "Yes. We provide guidance on how to respond, what documents to prepare, and how to ensure that your rights and responsibilities are protected.",
    },
    {
      question:
        "Can you help with documentation, consent forms, and record-keeping standards?",
      answer:
        "Absolutely. We review and improve consent formats, counselling sheets, progress notes, operation notes, discharge summaries, and other aspects of medical records to align with best medicolegal practices.",
    },
    {
      question:
        "What support do you offer when complications or adverse events occur?",
      answer:
        "We provide early advisory input to ensure correct documentation, communication strategy, and legal preparedness. Early involvement of a medicolegal expert provides a solution or at least reduces escalation. Medicolegal risk management should be initiated early rather than late.",
    },
    {
      question:
        "Do you provide expert medical opinions or medico-legal assessments?",
      answer:
        "Yes. We assist in preparing expert views, technical opinions, and help identify suitable experts when needed. However, we ourselves do not issue expert opinions on our medical specialty in our name.",
    },
    {
      question:
        "Can you represent or guide us in consumer court or medical council proceedings or in criminal courts?",
      answer:
        "We provide end-to-end assistance, including drafting replies, preparing affidavits, documentation review, and guiding legal counsel for all forums. For court appearances, we have advocates on our panel. We provide the medicolegal support, on your behalf, to the advocate you select – from the panel or otherwise.",
    },
    {
      question: "Do you help manage negative media or social-media issues?",
      answer:
        "Yes. We guide you on safe communication practices, reputation management, and appropriate responses without increasing legal risk.",
    },
    {
      question:
        "How do you ensure the confidentiality of sensitive clinical information on this website?",
      answer:
        "All client information is treated with strict confidentiality. We work with signed NDAs if required and maintain secure data handling protocols.",
    },
    {
      question: "What is your fee structure?",
      answer:
        "Our fee depends on the type of service — advisory, drafting, representation, audit, or training. There is an item-wise fee as well as annual/monthly packages for individual doctors and for hospitals. We provide transparent estimates before formal engagement.",
    },
    {
      question: "Do you provide emergency or urgent medicolegal support?",
      answer:
        "Yes. We offer priority access for urgent matters such as police inquiries, unexpected hospital deaths, or high-risk complications.",
    },
    {
      question: "Do you offer training, workshops, or medicolegal audits?",
      answer:
        "Yes. We offer monthly/annual packages for individual doctors & hospitals for medicolegal services. This includes comprehensive medicolegal services, which also include conducting structured workshops, staff training, CME/CPD modules, and hospital-wide medicolegal audits.",
    },
    {
      question: "Can you help with compliance under PCPNDT & MTP rules?",
      answer:
        "Yes. We assist with compliance review, documentation, periodic audits, and guidance on statutory obligations. We also help with the litigation, as for other medicolegal services.",
    },
    {
      question: "Do you assist with telemedicine-related legal requirements?",
      answer:
        "Yes. We help with telemedicine documentation, consent, digital prescription norms, and data privacy compliance.",
    },
    {
      question: "Do you offer online consultations and nationwide support?",
      answer:
        "Yes. We provide remote support over phone, chat, email, and video consultations, serving clients across India.",
    },
    {
      question:
        "What should I do if a patient/relative threatens litigation or violence?",
      answer:
        "Stay calm, avoid confrontation, and maintain clear communication. See details on the Information segment of this site. Contact us for guidance on legal and safety steps.",
    },
    {
      question: "How quickly can I expect a response from your team?",
      answer:
        "We respond promptly — usually within the same working day in routine cases. Emergency cases receive priority support.",
    },
    {
      question: "Can you help in settling disputes or mediation with patients?",
      answer:
        "Yes. We assist in early resolution strategies, mediation, and communication plans to avoid escalation whenever possible. If an out-of-court settlement occurs, we help in drafting the settlement terms in writing.",
    },
    {
      question: "Why should I choose your medicolegal service?",
      answer:
        "We combine medical understanding with legal expertise, offering practical, timely, and confidential support tailored to healthcare professionals.",
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 lg:px-16">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary mb-4">
            Medicolegal Services for Doctors & Hospitals
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl mb-6">
            Frequently Asked Questions (FAQ)
          </h1>
          <div className="max-w-4xl mx-auto space-y-4 text-foreground/80">
            <p>
              Welcome! This FAQ section is created especially for our fellow
              doctors and healthcare colleagues. Here, you&apos;ll find
              straightforward, practical answers to the questions that commonly
              arise in your mind when you visit our site.
            </p>
            <p>
              Though the information section of the site provides more details,
              the FAQs give you an idea of what you should expect from us to
              make your medicolegal journey easier, clearer, and more confident.
              If something concerns you or you need personalised guidance, we&apos;re
              always here to support you.
            </p>
            <p className="font-semibold text-primary">
              The common questions that come to your mind on visiting this site
              are answered below.
            </p>
          </div>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl border border-primary/20 bg-white/70 p-8 shadow-lg"
            >
              <h2 className="text-xl font-semibold text-primary mb-4">
                {index + 1}. {faq.question}
              </h2>
              <p className="text-foreground/80 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

