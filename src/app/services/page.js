"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Scale,
  FileText,
  Building2,
  GraduationCap,
  AlertTriangle,
  ChevronDown,
  HelpCircle,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

export default function ServicesPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const services = [
    {
      icon: Shield,
      title: "Preventive Medicolegal Support",
      description:
        "We help you put systems in place that prevent disputes, reduce risk, and ensure regulatory compliance. This includes documentation audits, SOP development, consent system review, and staff training.",
      color: "blue",
      gradientFrom: "from-blue-500/10",
      gradientTo: "to-teal-500/10",
      iconColor: "text-blue-600",
    },
    {
      icon: Scale,
      title: "Defensive Legal Support",
      description:
        "If you face a legal notice, complaint, police inquiry, FIR, or medical council case, we guide you step-by-step with factual, record-based responses. We assist with drafting replies, affidavits, and court submissions.",
      color: "green",
      gradientFrom: "from-green-500/10",
      gradientTo: "to-emerald-500/10",
      iconColor: "text-green-600",
    },
    {
      icon: FileText,
      title: "Documentation Review & Improvement",
      description:
        "We review your records, consent forms, and clinical notes and help you strengthen them with standard best practices and specialty-specific recommendations.",
      color: "purple",
      gradientFrom: "from-purple-500/10",
      gradientTo: "to-pink-500/10",
      iconColor: "text-purple-600",
    },
    {
      icon: Building2,
      title: "Hospital Compliance & SOPs",
      description:
        "We assist hospitals with mandatory compliance (PCPNDT, BMW, MTP, CEA, Telemedicine guidelines), review of documentation, SOP creation, and internal file audits.",
      color: "orange",
      gradientFrom: "from-orange-500/10",
      gradientTo: "to-red-500/10",
      iconColor: "text-orange-600",
    },
    {
      icon: GraduationCap,
      title: "Training & Workshops",
      description:
        "We conduct customized medicolegal workshops, CME programs, nursing training, and mock drills on documentation, communication, violence prevention, and handling complications.",
      color: "cyan",
      gradientFrom: "from-cyan-500/10",
      gradientTo: "to-blue-500/10",
      iconColor: "text-cyan-600",
    },
    {
      icon: AlertTriangle,
      title: "Crisis Management",
      description:
        "We support clinicians and hospitals during critical incidents such as unexpected deaths, serious complications, disputes, crowd aggression, FIR threats, and negative media exposure.",
      color: "red",
      gradientFrom: "from-red-500/10",
      gradientTo: "to-orange-500/10",
      iconColor: "text-red-600",
    },
  ];

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
      question:
        "How should I respond if I receive a legal notice or complaint?",
      answer:
        "You should not reply without expert guidance. Share the notice with us, and we will render proper advice and help draft an appropriate, legally sound response based on facts and records.",
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
      question: "Do you provide emergency or urgent medicolegal support?",
      answer:
        "Yes. We offer priority access for urgent matters such as police inquiries, unexpected hospital deaths, or high-risk complications.",
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
          <div className="text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-xs md:text-sm font-semibold uppercase tracking-[0.3em] text-foreground/60 mb-4"
            >
              Your Safety Net in Complex Medicolegal Situations
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-medium"
            >
              <span className="bg-gradient-to-r from-[hsl(var(--contact-gradient-from))] to-[hsl(var(--contact-gradient-to))] bg-clip-text text-transparent">
                Our Services
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 max-w-2xl mx-auto text-sm md:text-base text-foreground/70 leading-relaxed"
            >
              Our comprehensive range of medicolegal services help to resolve
              your situation and protect your practice
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative overflow-hidden bg-background py-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(196,248,42,0.05),transparent_50%)]" />

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
          {/* Services Grid */}
          <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <div className="h-full rounded-2xl border border-foreground/10 bg-white p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:border-primary-foreground/30">
                    <motion.div
                      className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${service.gradientFrom} ${service.gradientTo}`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Icon className={`h-7 w-7 ${service.iconColor}`} />
                    </motion.div>
                    <h3 className="text-xl md:text-2xl font-medium text-foreground mb-3">
                      {service.title}
                    </h3>
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative overflow-hidden bg-background border-t border-foreground/10 py-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(196,248,42,0.05),transparent_50%)]" />

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
          {/* Header */}
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium">
                <span className="bg-gradient-to-r from-[hsl(var(--contact-gradient-from))] to-[hsl(var(--contact-gradient-to))] bg-clip-text text-transparent">
                  Frequently Asked
                </span>{" "}
                Questions
              </h2>
              <p className="mt-4 text-sm md:text-base text-foreground/60 max-w-2xl mx-auto">
                Common questions about our medicolegal services
              </p>
            </motion.div>
          </div>

          {/* FAQ Accordion */}
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="rounded-xl border border-foreground/10 bg-white shadow-md overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-start justify-between gap-4 p-6 text-left hover:bg-foreground/5 transition-colors"
                >
                  <div className="flex items-start gap-3 flex-1">
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 mt-0.5">
                      <HelpCircle className="h-4 w-4 text-blue-600" />
                    </div>
                    <h3 className="text-base md:text-lg font-medium text-foreground pr-4">
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
                      <div className="px-6 pb-6 pl-[4.5rem]">
                        <p className="text-sm md:text-base text-foreground/70 leading-relaxed">
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
      </section>
    </main>
  );
}
