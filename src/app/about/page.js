"use client";

import { motion } from "framer-motion";
import { UserCircle, Award, BookOpen, Scale, FileCheck, Building, Users as UsersIcon, Briefcase } from "lucide-react";

export default function AboutPage() {
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
              Precision, Protection, and Professional Support
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-medium"
            >
              <span className="bg-gradient-to-r from-[hsl(var(--contact-gradient-from))] to-[hsl(var(--contact-gradient-to))] bg-clip-text text-transparent">
                About
              </span>{' '}
              Us
            </motion.h1>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-12 md:py-20 lg:px-16">
        {/* Our Expert Team */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4">
              Our Expert Team
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Meet the experienced professionals dedicated to your medicolegal support
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Dr. Promod Kumar Kohli */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl border border-foreground/10 bg-white p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
                  <UserCircle className="h-10 w-10 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-medium text-foreground">Dr. Promod Kumar Kohli</h3>
                  <p className="text-sm text-foreground/60">Medicolegal Expert & Surgeon</p>
                </div>
              </div>

              <p className="text-foreground/80 leading-relaxed mb-6">
                Dr Promod Kumar Kohli is a qualified & experienced surgeon and
                a qualified & experienced Medicolegal expert. His experience
                has seen him in different capacities in practically all
                categories of hospitals – as a consultant surgeon, Dean of
                Medical Education, and as Medical Director.
              </p>

              <div className="pt-4 border-t border-foreground/10 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="h-5 w-5 text-blue-600" />
                  <p className="font-semibold text-foreground">Qualifications:</p>
                </div>
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-foreground mt-0.5">•</span>
                    <span>Graduated in 1973 from Medical College, Rohtak</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-foreground mt-0.5">•</span>
                    <span>MS (Surgery), MNAMS (Surgery), PhD (Surgery) from PGIMER, Chandigarh</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-foreground mt-0.5">•</span>
                    <span>LLB (DU), PGD-MLS (Pune), PGD-HHM (Pune)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-foreground mt-0.5">•</span>
                    <span>Medicolegal experience since 2003</span>
                  </li>
                </ul>
              </div>

              <p className="pt-4 border-t border-foreground/10 italic text-sm text-foreground/70">
                Retired from active clinical work since 2021 and now devotes
                his professional time & energy only to medicolegal services.
              </p>
            </motion.div>

            {/* Dr. Sanjay Narula */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl border border-foreground/10 bg-white p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-500/10 to-emerald-500/10">
                  <UserCircle className="h-10 w-10 text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-medium text-foreground">Dr. Sanjay Narula</h3>
                  <p className="text-sm text-foreground/60">MBBS, MS, FIAGES</p>
                </div>
              </div>

              <p className="text-foreground/80 leading-relaxed mb-6">
                Dr Sanjay Narula is a qualified general surgeon and experienced
                medicolegal expert. He has 36 years of surgical experience
                following his MS in General Surgery from PGIMS, Rohtak, in 1989.
              </p>

              <div className="pt-4 border-t border-foreground/10">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="h-5 w-5 text-green-600" />
                  <p className="font-semibold text-foreground">Key Achievements:</p>
                </div>
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-foreground mt-0.5">•</span>
                    <span>Chairman of District Medical Negligence Board (many years)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-foreground mt-0.5">•</span>
                    <span>Conducted more than 600 enquiries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-foreground mt-0.5">•</span>
                    <span>Instrumental in making the first disaster management plan for Haryana</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-foreground mt-0.5">•</span>
                    <span>Contributing author to &quot;patient safety guidelines&quot; published by Government of India</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-foreground mt-0.5">•</span>
                    <span>Conducted more than 2000 postmortem examinations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-foreground mt-0.5">•</span>
                    <span>Done hundreds of MLC cases</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-foreground mt-0.5">•</span>
                    <span>Part of SIT, member of State crisis committee</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-foreground mt-0.5">•</span>
                    <span>Associated with medicolegal investigations in high-profile cases</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Provided */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-medium mb-4">
              <span className="bg-gradient-to-r from-[hsl(var(--contact-gradient-from))] to-[hsl(var(--contact-gradient-to))] bg-clip-text text-transparent">
                Services
              </span>{' '}
              Provided
            </h2>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Briefcase, text: "Medicolegal Consultation (on phone, Chat, Email, in-person)" },
              { icon: FileCheck, text: "Drafting of Legal documents (Reply, Evidence, Arguments, Affidavits, MOUs, etc.)" },
              { icon: Scale, text: "Drafting of Expert opinions for Expert evidence" },
              { icon: BookOpen, text: "Medical Research on contentious issues" },
              { icon: Scale, text: "Legal research for relevant case laws" },
              { icon: UsersIcon, text: "Inputs to Advocates for medicolegal support" },
              { icon: FileCheck, text: "Hospital Medical record file audits" },
              { icon: Building, text: "On-site emergency medicolegal support" },
              { icon: Award, text: "Annual/monthly medicolegal support packages for individual doctors/hospitals" },
            ].map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="rounded-xl border border-foreground/10 bg-white p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10">
                      <Icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed">{service.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Relevant Acts & Rules */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-medium text-foreground">
              Relevant Acts & Rules
            </h2>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              "CPA 2019",
              "PC-PNDT Act",
              "MTP Act",
              "NMC guidelines 2023 (held in abeyance)",
              "Telemedicine guidelines",
            ].map((act, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="rounded-xl border border-foreground/10 bg-white p-6 shadow-md"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-foreground text-primary font-medium text-sm">
                    {index + 1}
                  </span>
                  <p className="text-foreground/80 font-medium">{act}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Relevant Case Laws */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-medium text-foreground">
              Relevant Case Laws
            </h2>
            <p className="text-foreground/60 mt-2">Which all doctors must read</p>
          </motion.div>

          <div className="space-y-4 max-w-4xl mx-auto">
            {[
              "Jacob Mathew vs State of Punjab; 2005 (6) SCC 1",
              "Samira Kohli vs Dr Prabha Manchanda",
              "Kusum Sharma & ors vs Batra Hospital and Medical Research Centre; 2010(2) BCR 599",
              "Nizam's Institute of Medical Sciences vs Prasanth S. Dhananka & ors; Civil appeal no.4119 of 1999",
            ].map((caseLaw, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="rounded-xl border border-foreground/10 bg-white p-6 shadow-md"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-foreground text-primary font-medium text-sm">
                    {index + 1}
                  </span>
                  <p className="text-foreground/80 leading-relaxed">{caseLaw}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
