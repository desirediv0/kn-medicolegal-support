"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ContactForm } from "@/components/contact-form";
import { Testimonials } from "@/components/testimonials";
import { Shield, Scale, FileText, Building2, GraduationCap, AlertTriangle, Target, ShieldCheck, Users, BookOpen, CheckCircle, Download, RefreshCw, ArrowRight, UserCircle, Award } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background text-foreground">
        {/* Subtle Background Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(196,248,42,0.08),transparent_50%)]" />

        {/* Decorative Star Elements */}
        <div className="absolute top-32 right-32 text-primary-foreground text-3xl opacity-60 animate-pulse hidden lg:block">✦</div>
        <div className="absolute bottom-48 left-16 text-primary-foreground text-2xl opacity-40 animate-pulse hidden lg:block" style={{ animationDelay: '0.5s' }}>✦</div>

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 py-12 md:py-20 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 md:space-y-8 ">
              {/* Tagline with animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.25em] text-foreground/60">
                  Your Partner in Safe, Secure Clinical Practice
                </p>
              </motion.div>

              {/* Main Heading with animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight">
                  Welcome to{' '}
                  <span className="block mt-2 md:mt-3">
                    KN Medicolegal{' '}
                    <span className="bg-gradient-to-r from-blue-600 via-teal-500 to-green-500 bg-clip-text text-transparent">
                      Support
                    </span>
                  </span>
                </h1>
              </motion.div>

              {/* Description with animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <p className="text-sm md:text-base lg:text-lg text-foreground/70 leading-relaxed">
                  We are here to support doctors and hospitals in navigating the
                  increasingly complex medicolegal landscape. Whether you need
                  preventive guidance, help with documentation, support during a
                  complication, or assistance in responding to legal/court notices,
                  we&apos;re just a call away.
                </p>
              </motion.div>

              {/* CTA Buttons with animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex flex-row gap-3 md:gap-4"
              >
                <Link
                  href="/user/auth"
                  className="inline-flex items-center justify-center rounded-full bg-primary-foreground px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-medium text-primary shadow-lg shadow-primary-foreground/20 transition hover:shadow-xl hover:scale-105 uppercase tracking-wider"
                >
                  Let&apos;s Talk
                </Link>
                <Link
                  href="/#services"
                  className="inline-flex items-center justify-center rounded-full border-2 border-foreground/20 px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-semibold text-foreground shadow-sm transition hover:bg-foreground/5 hover:border-foreground/40"
                >
                  Our Services
                </Link>
              </motion.div>
            </div>

            {/* Right Content - Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative "
            >
              <div className="relative w-full aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=800&fit=crop"
                  alt="Professional medical consultation"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Subtle Line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
      </section>



      {/* About Section */}
      <section
        id="about"
        className="relative overflow-hidden bg-background py-12"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(196,248,42,0.05),transparent_50%)]" />

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xs md:text-sm font-semibold uppercase tracking-[0.3em] text-foreground/60 mb-4"
            >
              Precision • Protection • Professional Support
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-4xl lg:text-5xl font-medium"
            >
              <span className="bg-gradient-to-r from-[hsl(var(--contact-gradient-from))] to-[hsl(var(--contact-gradient-to))] bg-clip-text text-transparent">
                About
              </span>{' '}
              Us
            </motion.h2>
          </div>

          {/* Content Grid */}
          <div className="grid gap-3 md:gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10">
            {/* Card 1 - Who We Are */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="h-full rounded-2xl border border-foreground/10 bg-white p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300">
                <motion.div
                  className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Target className="h-7 w-7 text-blue-600" />
                </motion.div>
                <h3 className="text-xl md:text-2xl font-medium text-foreground mb-3">
                  Who We Are
                </h3>
                <p className="text-sm md:text-base text-foreground/70 leading-relaxed">
                  We are a team of qualified & experienced doctors with medicolegal
                  expertise and compliance professionals dedicated to helping healthcare
                  providers navigate real-world medicolegal challenges with confidence
                  and clarity.
                </p>
              </div>
            </motion.div>

            {/* Card 2 - Our Mission */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="h-full rounded-2xl border border-foreground/10 bg-white p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300">
                <motion.div
                  className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <ShieldCheck className="h-7 w-7 text-green-600" />
                </motion.div>
                <h3 className="text-xl md:text-2xl font-medium text-foreground mb-3">
                  Our Mission
                </h3>
                <p className="text-sm md:text-base text-foreground/70 leading-relaxed">
                  To empower clinicians with practical, easy-to-implement medicolegal
                  knowledge and support — so you can focus on what matters most:
                  exceptional patient care.
                </p>
              </div>
            </motion.div>

            {/* Card 3 - Why Choose Us */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="h-full rounded-2xl border border-foreground/10 bg-white p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300">
                <motion.div
                  className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Users className="h-7 w-7 text-purple-600" />
                </motion.div>
                <h3 className="text-xl md:text-2xl font-medium text-foreground mb-3">
                  Professional Support
                </h3>
                <p className="text-sm md:text-base text-foreground/70 leading-relaxed mb-4">
                  For Doctors, By Doctors — Trusted Medicolegal Support
                </p>
              </div>
            </motion.div>
          </div>

          {/* Why Choose Us - Expanded */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="rounded-2xl border border-foreground/10 bg-white p-6 md:p-8 shadow-md"
          >
            <h3 className="text-2xl font-medium text-foreground mb-6 text-center">
              Why Choose Us
            </h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                "We speak your language — medical plus legal",
                "Practical, real-world advice",
                "Fast response times",
                "Strict confidentiality",
                "Comprehensive support: preventive + defensive",
                "Nationwide support for doctors and hospitals",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-foreground text-primary font-medium text-xs">
                    ✓
                  </span>
                  <span className="text-sm md:text-base text-foreground/80">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>






      {/* Services Section */}
      <section
        id="services"
        className="relative overflow-hidden bg-background py-12"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(196,248,42,0.05),transparent_50%)]" />

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-medium"
            >
              <span className="bg-gradient-to-r from-[hsl(var(--contact-gradient-from))] to-[hsl(var(--contact-gradient-to))] bg-clip-text text-transparent">
                Our services
              </span>{' '}
              help to resolve your situation
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 text-sm md:text-base text-foreground/60 max-w-2xl mx-auto"
            >
              Your Safety Net in Complex Medicolegal Situations
            </motion.p>
          </div>

          {/* Services Grid */}
          <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Service 1 - Preventive */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="h-full rounded-2xl border border-foreground/10 bg-white p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:border-primary-foreground/30">
                <motion.div
                  className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/10 to-teal-500/10"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Shield className="h-7 w-7 text-blue-600" />
                </motion.div>
                <h3 className="text-xl md:text-2xl font-medium text-foreground mb-3">
                  Preventive Medicolegal Support
                </h3>
                <p className="text-sm md:text-base text-foreground/70 leading-relaxed">
                  We help you put systems in place that prevent disputes, reduce
                  risk, and ensure regulatory compliance. This includes
                  documentation audits, SOP development, consent system review,
                  and staff training.
                </p>
              </div>
            </motion.div>

            {/* Service 2 - Legal */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="h-full rounded-2xl border border-foreground/10 bg-white p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:border-primary-foreground/30">
                <motion.div
                  className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Scale className="h-7 w-7 text-green-600" />
                </motion.div>
                <h3 className="text-xl md:text-2xl font-medium text-foreground mb-3">
                  Defensive Legal Support
                </h3>
                <p className="text-sm md:text-base text-foreground/70 leading-relaxed">
                  If you face a legal notice, complaint, police inquiry, FIR, or
                  medical council case, we guide you step-by-step with factual,
                  record-based responses. We assist with drafting replies,
                  affidavits, and court submissions.
                </p>
              </div>
            </motion.div>

            {/* Service 3 - Documentation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="h-full rounded-2xl border border-foreground/10 bg-white p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:border-primary-foreground/30">
                <motion.div
                  className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FileText className="h-7 w-7 text-purple-600" />
                </motion.div>
                <h3 className="text-xl md:text-2xl font-medium text-foreground mb-3">
                  Documentation Review & Improvement
                </h3>
                <p className="text-sm md:text-base text-foreground/70 leading-relaxed">
                  We review your records, consent forms, and clinical notes and
                  help you strengthen them with standard best practices and
                  specialty-specific recommendations.
                </p>
              </div>
            </motion.div>

            {/* Service 4 - Hospital Compliance */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="h-full rounded-2xl border border-foreground/10 bg-white p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:border-primary-foreground/30">
                <motion.div
                  className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/10 to-red-500/10"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Building2 className="h-7 w-7 text-orange-600" />
                </motion.div>
                <h3 className="text-xl md:text-2xl font-medium text-foreground mb-3">
                  Hospital Compliance & SOPs
                </h3>
                <p className="text-sm md:text-base text-foreground/70 leading-relaxed">
                  We assist hospitals with mandatory compliance (PCPNDT, BMW, MTP,
                  CEA, Telemedicine guidelines), review of documentation, SOP
                  creation, and internal file audits.
                </p>
              </div>
            </motion.div>

            {/* Service 5 - Training */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="h-full rounded-2xl border border-foreground/10 bg-white p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:border-primary-foreground/30">
                <motion.div
                  className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <GraduationCap className="h-7 w-7 text-cyan-600" />
                </motion.div>
                <h3 className="text-xl md:text-2xl font-medium text-foreground mb-3">
                  Training & Workshops
                </h3>
                <p className="text-sm md:text-base text-foreground/70 leading-relaxed">
                  We conduct customized medicolegal workshops, CME programs,
                  nursing training, and mock drills on documentation,
                  communication, violence prevention, and handling complications.
                </p>
              </div>
            </motion.div>

            {/* Service 6 - Crisis */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="h-full rounded-2xl border border-foreground/10 bg-white p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:border-primary-foreground/30">
                <motion.div
                  className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-red-500/10 to-orange-500/10"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <AlertTriangle className="h-7 w-7 text-red-600" />
                </motion.div>
                <h3 className="text-xl md:text-2xl font-medium text-foreground mb-3">
                  Crisis Management
                </h3>
                <p className="text-sm md:text-base text-foreground/70 leading-relaxed">
                  We support clinicians and hospitals during critical incidents
                  such as unexpected deaths, serious complications, disputes,
                  crowd aggression, FIR threats, and negative media exposure.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Expert Team Section */}
      <section className="relative overflow-hidden bg-background py-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(196,248,42,0.05),transparent_50%)]" />

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xs md:text-sm font-semibold uppercase tracking-[0.3em] text-foreground/60 mb-4"
            >
              Meet Our Experts
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-4xl lg:text-5xl font-medium"
            >
              <span className="bg-gradient-to-r from-[hsl(var(--contact-gradient-from))] to-[hsl(var(--contact-gradient-to))] bg-clip-text text-transparent">
                Expert
              </span>{' '}
              Team
            </motion.h2>
          </div>

          {/* Team Cards */}
          <div className="grid gap-4 md:gap-8 md:grid-cols-2 max-w-5xl mx-auto">
            {/* Dr. Promod Kumar Kohli */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl border border-foreground/10 bg-white p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
                  <UserCircle className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-foreground">Dr. Promod Kumar Kohli</h3>
                  <p className="text-sm text-foreground/60">Medicolegal Expert & Surgeon</p>
                </div>
              </div>

              <p className="text-sm text-foreground/70 leading-relaxed mb-4">
                Qualified & experienced surgeon and medicolegal expert with experience as consultant surgeon, Dean of Medical Education, and Medical Director.
              </p>

              <div className="flex items-center gap-2 text-xs text-foreground/60">
                <Award className="h-4 w-4 text-blue-600" />
                <span>MS, PhD (Surgery), LLB, PGD-MLS | Since 2003</span>
              </div>
            </motion.div>

            {/* Dr. Sanjay Narula */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl border border-foreground/10 bg-white p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-500/10 to-emerald-500/10">
                  <UserCircle className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-foreground">Dr. Sanjay Narula</h3>
                  <p className="text-sm text-foreground/60">MBBS, MS, FIAGES</p>
                </div>
              </div>

              <p className="text-sm text-foreground/70 leading-relaxed mb-4">
                Qualified general surgeon and experienced medicolegal expert with 36 years of surgical experience. Former Chairman of District Medical Negligence Board.
              </p>

              <div className="flex items-center gap-2 text-xs text-foreground/60">
                <Award className="h-4 w-4 text-green-600" />
                <span>600+ Enquiries | 2000+ Postmortems | High-profile Cases</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Testimonials Section */}
      <div className="max-w-7xl mx-auto px-4 ">
        <Testimonials />
      </div>


      {/* Knowledge Hub Section */}
      <section className="relative overflow-hidden bg-background border-y border-foreground/10 py-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(196,248,42,0.05),transparent_50%)]" />

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xs md:text-sm font-semibold uppercase tracking-[0.3em] text-foreground/60 mb-4"
            >
              Empowering Safe Practice Through Knowledge
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-4xl lg:text-5xl font-medium"
            >
              <span className="bg-gradient-to-r from-[hsl(var(--contact-gradient-from))] to-[hsl(var(--contact-gradient-to))] bg-clip-text text-transparent">
                Knowledge
              </span>{' '}
              Hub
            </motion.h2>
          </div>

          {/* Content Grid */}
          <div className="grid gap-2 md:gap-8 md:grid-cols-2 md:items-center">
            {/* Left - Visual Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="rounded-2xl border border-foreground/10 bg-white p-5 md:p-10 shadow-lg">
                <div className="mb-2 md:mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl md:text-3xl font-medium text-foreground mb-4">
                  Essential Resources for Healthcare Professionals
                </h3>
                <p className="text-sm md:text-base text-foreground/70 leading-relaxed">
                  This section includes important information of use to the healthcare
                  professionals. This information is accessible to all the registered
                  users of the site. The sign-up users also have the facility of
                  downloading this material if desired.
                </p>
              </div>
            </motion.div>

            {/* Right - Features Grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-4 md:space-y-6"
            >
              {/* Feature 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-start gap-4 rounded-xl border border-foreground/10 bg-white p-3 md:p-6 shadow-md"
              >
                <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="text-base md:text-lg font-medium text-foreground mb-1">Accessible</h4>
                  <p className="text-sm md:text-base text-foreground/70">
                    Available to all registered users anytime, anywhere
                  </p>
                </div>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-start gap-4 rounded-xl border border-foreground/10 bg-white p-6 shadow-md"
              >
                <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
                  <Download className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-base md:text-lg font-medium text-foreground mb-1">Downloadable</h4>
                  <p className="text-sm md:text-base text-foreground/70">
                    Download materials for offline reference and study
                  </p>
                </div>
              </motion.div>

              {/* Feature 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-start gap-4 rounded-xl border border-foreground/10 bg-white p-6 shadow-md"
              >
                <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10">
                  <RefreshCw className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="text-base md:text-lg font-medium text-foreground mb-1">Updated</h4>
                  <p className="text-sm md:text-base text-foreground/70">
                    Regularly updated with latest guidelines and case laws
                  </p>
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="pt-4"
              >
                <Link
                  href="/knowledge-hub"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-foreground px-8 py-4 text-base font-medium text-primary shadow-lg shadow-primary-foreground/20 transition hover:shadow-xl hover:scale-105"
                >
                  Explore Knowledge Hub
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section
        id="contact"
        className="relative overflow-hidden bg-background border-y border-foreground/10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(196,248,42,0.05),transparent_50%)]" />

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 py-12 md:py-20 lg:px-16">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl md:text-4xl lg:text-5xl font-medium"
            >
              Have questions?{' '}
              <span className="block mt-2 bg-gradient-to-r from-[hsl(var(--contact-gradient-from))] to-[hsl(var(--contact-gradient-to))] bg-clip-text text-transparent">
                Get in touch!
              </span>
            </motion.h2>
          </div>

          {/* Content Grid */}
          <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 items-start">
            {/* Left - Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=800&fit=crop"
                  alt="Professional consultation"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
              </div>

              {/* Contact Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-6 rounded-2xl border border-foreground/10 bg-white p-6 shadow-lg"
              >
                <h3 className="text-lg md:text-xl font-medium text-foreground mb-4">
                  Contact us for:
                </h3>
                <ul className="space-y-2 text-sm text-foreground/70">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-foreground mt-0.5">✓</span>
                    <span>Medicolegal consultations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-foreground mt-0.5">✓</span>
                    <span>Review of your case or documents</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-foreground mt-0.5">✓</span>
                    <span>Hospital compliance assistance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-foreground mt-0.5">✓</span>
                    <span>Training for your staff</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-foreground mt-0.5">✓</span>
                    <span>Urgent support during complications or disputes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-foreground mt-0.5">✓</span>
                    <span>Medicolegal help in litigation, police investigation, or medical council complaints</span>
                  </li>
                </ul>
              </motion.div>
            </motion.div>

            {/* Right - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <div className="rounded-2xl border border-foreground/10 bg-white p-6 md:p-8 shadow-lg">
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main >
  );
}
