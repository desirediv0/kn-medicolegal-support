"use client";

import Image from "next/image";
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
              Prevention, Anticipation, and Defence
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
        {/* Introduction */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-foreground/10 bg-white p-6 md:p-8 shadow-lg"
          >
            <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
              KN Medicolegal Support has been established by two highly experienced & reputed surgeons who share a passion for risk management within the healthcare ecosystem. They have been providing medicolegal support services since 2003, informally & individually. Now they have provided a formal platform to render these services in a more structured manner collectively.
            </p>
          </motion.div>
        </section>

        {/* Founder Photographs Placeholder */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border-2 border-dashed border-foreground/20 bg-foreground/5 p-8 md:p-12 text-center"
          >
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground/10 mb-4">
              <UserCircle className="h-8 w-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl md:text-2xl font-medium text-foreground mb-2">
              Founder Photographs
            </h3>
            <p className="text-sm md:text-base text-foreground/60">
              Photographs will be added soon
            </p>
          </motion.div>
        </section>

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
                <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-full overflow-hidden bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
                  <Image
                    src="/dr-kohli.png"
                    alt="Dr. Promod Kumar Kohli"
                    width={80}
                    height={80}
                    className="object-cover"
                  />
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
                <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-full overflow-hidden bg-gradient-to-br from-green-500/10 to-emerald-500/10">
                  <Image
                    src="/dr-narula.png"
                    alt="Dr. Sanjay Narula"
                    width={80}
                    height={80}
                    className="object-cover"
                  />
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
      </div>
    </main>
  );
}
