"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Scale,
  FileText,
  Building2,
  GraduationCap,
  AlertTriangle,
} from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      icon: Shield,
      title: "Preventive Medicolegal Support",
      description:
        "We help you put systems in place that prevent disputes, reduce risk, and ensure regulatory compliance. We also help you in anticipating a medicolegal dispute and help resolve it at that stage itself. This includes documentation audits, SOP development, consent system review, and staff training.",
      color: "blue",
      gradientFrom: "from-blue-500/10",
      gradientTo: "to-teal-500/10",
      iconColor: "text-blue-600",
    },
    {
      icon: Scale,
      title: "Support in court complaint and legal proceedings",
      description:
        "If you face a legal notice, complaint, police inquiry, FIR, or medical council case, we guide you step-by-step with factual, record-based responses. We assist with drafting replies, affidavits, and court submissions. We also empower your advocate even if he/she is not from our panel.",
      color: "green",
      gradientFrom: "from-green-500/10",
      gradientTo: "to-emerald-500/10",
      iconColor: "text-green-600",
    },
    {
      icon: FileText,
      title: "Review & input on medical records and reports",
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
        "We conduct customized medicolegal workshops, CME programs, nursing training, and mock drills. We conduct lectures & group discussions on risk management, system improvement, and legal safety in clinical practice.",
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
              Our comprehensive range of medicolegal services helps to manage your medicolegal risks to protect your medical practice.
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
    </main>
  );
}
