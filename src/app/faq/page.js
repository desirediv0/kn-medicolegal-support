"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

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

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background border-b border-foreground/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(196,248,42,0.08),transparent_50%)]" />

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 py-12 md:py-20 lg:px-16">
          <div className="text-center max-w-4xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-xs md:text-sm font-medium uppercase tracking-[0.3em] text-foreground/60 mb-4"
            >
              Medicolegal Services for Doctors & Hospitals
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6"
            >
              Frequently Asked{' '}
              <span className="bg-gradient-to-r from-[hsl(var(--contact-gradient-from))] to-[hsl(var(--contact-gradient-to))] bg-clip-text text-transparent">
                Questions
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4 text-sm md:text-base text-foreground/70"
            >
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 py-12 md:py-20 lg:px-16">
        <div className="space-y-3 md:space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.02 }}
              className="rounded-lg border border-foreground/10 bg-white overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                className="w-full flex items-start justify-between gap-4 p-5 md:p-6 text-left hover:bg-foreground/5 transition-colors"
              >
                <div className="flex items-start gap-3 flex-1">
                  <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-foreground/5 mt-0.5">
                    <HelpCircle className="h-4 w-4 text-foreground/70" />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-foreground pr-2">
                    {faq.question}
                  </h3>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="shrink-0"
                >
                  <ChevronDown className="h-5 w-5 text-foreground/60" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 md:px-6 pb-5 md:pb-6">
                      <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}

