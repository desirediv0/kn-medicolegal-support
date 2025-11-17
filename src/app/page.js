"use client";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_55%)]" />
        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 py-16 sm:px-10 lg:px-16">
          <div className="space-y-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-foreground/70">
              Your Partner in Safe, Secure Clinical Practice
            </p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Welcome to KN Medicolegal Support
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-primary-foreground/80 sm:text-xl">
              We are here to support doctors and hospitals in navigating the
              increasingly complex medicolegal landscape. Whether you need
              preventive guidance, help with documentation, support during a
              complication, or assistance in responding to legal/court notices,
              we&apos;re just a call away.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-2">
            <div className="mx-auto max-w-xl rounded-2xl border border-primary-foreground/30 bg-primary/20 p-8 backdrop-blur-lg">
              <h2 className="text-xl font-semibold mb-4">Our Commitment</h2>
              <p className="text-primary-foreground/90">
                To protect patient interests, support clinician interests, and
                strengthen trust in the healthcare system through clear,
                practical, evidence-based medicolegal guidance.
              </p>
            </div>

            <div className="mx-auto max-w-xl rounded-2xl border border-primary-foreground/30 bg-primary/20 p-8 backdrop-blur-lg">
              <h2 className="text-xl font-semibold mb-4">Quick Help</h2>
              <p className="text-primary-foreground/90 mb-6">
                If you&apos;re facing a sudden complication, legal notice, FIR
                threat, or unexpected patient event, click below for immediate
                steps or contact us for urgent assistance.
              </p>
              <Link
                href="/user/auth"
                className="inline-flex items-center justify-center rounded-full bg-primary-foreground px-6 py-3 text-base font-semibold text-primary shadow-lg shadow-black/20 transition hover:shadow-xl"
              >
                Get Immediate Help
              </Link>
            </div>
          </div>
        </div>
      </section>


      <section
        id="about"
        className="relative mx-auto w-full max-w-7xl px-6 py-16 sm:px-10 lg:px-16"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-transparent to-transparent"></div>

        {/* Header */}
        <div className="flex flex-col gap-3 text-center mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/90">
            Precision • Protection • Professional Support
          </p>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-foreground">
            About Us
          </h2>
          <div className="mx-auto mt-2 h-1 w-24 rounded-full bg-primary/60"></div>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">

          {/* Card 1 */}
          <div className="rounded-2xl border border-primary/20 bg-white/70 p-8 shadow-lg">
            <h3 className="text-2xl font-semibold text-primary mb-4">Who We Are</h3>
            <p className="text-foreground/80 leading-relaxed">
              We are a team of qualified & experienced doctors with medicolegal
              expertise and compliance professionals dedicated to helping healthcare
              providers navigate real-world medicolegal challenges with confidence
              and clarity.
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl border border-primary/20 bg-white/70 p-8 shadow-lg">
            <h3 className="text-2xl font-semibold text-primary mb-4">Our Mission</h3>
            <p className="text-foreground/80 leading-relaxed">
              To empower clinicians with practical, easy-to-implement medicolegal
              knowledge and support — so you can focus on what matters most:
              exceptional patient care.
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl border border-primary/20 bg-white/70 p-8 shadow-lg col-span-1 md:col-span-2">
            <h3 className="text-2xl font-semibold text-primary mb-3">Why Choose Us</h3>
            <p className="text-primary mb-6 italic">
              For Doctors, By Doctors — Trusted Medicolegal Support
            </p>

            <ul className="space-y-4 text-foreground/80">
              {[
                "We speak your language — medical plus legal",
                "Practical, real-world advice",
                "Fast response times",
                "Strict confidentiality",
                "Comprehensive support: preventive + defensive",
                "Nationwide support for doctors and hospitals",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center 
              rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>


      {/* Services Section */}
      <section
        id="services"
        className="relative overflow-hidden border-y border-primary/20 bg-primary/5 py-16"
      >
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col gap-6 text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              Your Safety Net in Complex Medicolegal Situations
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Services
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-primary/20 bg-white/70 p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-primary mb-4">
                Preventive Medicolegal Support
              </h3>
              <p className="text-foreground/80">
                We help you put systems in place that prevent disputes, reduce
                risk, and ensure regulatory compliance. This includes
                documentation audits, SOP development, consent system review,
                and staff training.
              </p>
            </div>

            <div className="rounded-2xl border border-primary/20 bg-white/70 p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-primary mb-4">
                Defensive Legal Support
              </h3>
              <p className="text-foreground/80">
                If you face a legal notice, complaint, police inquiry, FIR, or
                medical council case, we guide you step-by-step with factual,
                record-based responses. We assist with drafting replies,
                affidavits, and court submissions. We also provide expert inputs
                to your advocate – whether from our panel or otherwise.
              </p>
            </div>

            <div className="rounded-2xl border border-primary/20 bg-white/70 p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-primary mb-4">
                Documentation Review & Improvement
              </h3>
              <p className="text-foreground/80">
                We review your records, consent forms, and clinical notes and
                help you strengthen them with standard best practices and
                specialty-specific recommendations.
              </p>
            </div>

            <div className="rounded-2xl border border-primary/20 bg-white/70 p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-primary mb-4">
                Hospital Compliance & SOPs
              </h3>
              <p className="text-foreground/80">
                We assist hospitals with mandatory compliance (PCPNDT, BMW, MTP,
                CEA, Telemedicine guidelines), review of documentation, SOP
                creation, and internal file audits.
              </p>
            </div>

            <div className="rounded-2xl border border-primary/20 bg-white/70 p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-primary mb-4">
                Training & Workshops
              </h3>
              <p className="text-foreground/80">
                We conduct customized medicolegal workshops, CME programs,
                nursing training, and mock drills on documentation,
                communication, violence prevention, and handling complications.
              </p>
            </div>

            <div className="rounded-2xl border border-primary/20 bg-white/70 p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-primary mb-4">
                Crisis Management
              </h3>
              <p className="text-foreground/80">
                We support clinicians and hospitals during critical incidents
                such as unexpected deaths, serious complications, disputes,
                crowd aggression, FIR threats, and negative media exposure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Knowledge Hub Section */}
      <section className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-10 lg:px-16">
        <div className="flex flex-col gap-6 text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Empowering Safe Practice Through Knowledge
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Knowledge Hub
          </h2>
          <p className="mx-auto max-w-3xl text-base text-foreground/70 sm:text-lg">
            This section includes important information of use to the healthcare
            professionals. This information is accessible to all the registered
            users of the site. The sign-up users also have the facility of
            downloading this material if desired.
          </p>
        </div>
        <div className="text-center">
          <Link
            href="/knowledge-hub"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-lg shadow-black/20 transition hover:shadow-xl"
          >
            Explore Knowledge Hub
          </Link>
        </div>
      </section>

      {/* Contact Us Section */}
      <section
        id="contact"
        className="relative overflow-hidden bg-primary text-primary-foreground"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_55%)]" />
        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-5 px-6 py-10 text-center sm:px-10">
          <h2 className="text-3xl font-semibold sm:text-4xl">Contact Us</h2>
          <p className="mx-auto max-w-3xl text-base sm:text-lg">
            We&apos;re here to help you whenever you need us.
          </p>

          <div className="space-y-4 text-left  mx-auto">
            <p className="font-semibold mb-4">Contact us for:</p>
            <div className="grid md:grid-cols-2 max-w-7xl mx-auto gap-10">
              <ul className="space-y-2 text-sm sm:text-base">
                <li className="flex items-start gap-3">
                  <span className="mt-1">•</span>
                  <span>Medicolegal consultations</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1">•</span>
                  <span>Review of your case or documents</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1">•</span>
                  <span>Hospital compliance assistance</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1">•</span>
                  <span>Training for your staff</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1">•</span>
                  <span>
                    Urgent support during complications, disputes, or unexpected
                    events
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1">•</span>
                  <span>
                    Medicolegal help in case of litigation (consumer court or
                    criminal court), Police investigation, Medical Council
                    complaint, Social media exposure or any related matter
                  </span>
                </li>
              </ul>
              <div className="rounded-2xl border border-primary-foreground/30 bg-primary/20 p-6 md:p-8 backdrop-blur-lg">
                <h3 className="text-xl md:text-2xl font-semibold mb-6 text-center text-primary-foreground">
                  Send us a Message
                </h3>
                <div className="bg-white/10 rounded-xl p-4 md:p-6">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
