"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

const navLinks = [
  { title: "Services", href: "#services" },
  { title: "Partners", href: "#partners" },
  { title: "Testimonials", href: "#testimonials" },
  { title: "Contact", href: "#contact" },
];

const serviceBuckets = [
  {
    title: "For Hospitals & Clinics",
    description:
      "Streamline medico-legal documentation, consent tracking, and patient communication with our dedicated care teams.",
    items: [
      "Bedside medicolegal assessments within 4 hours",
      "Chronological treatment summaries for insurance & court",
      "Consent validation and guardian communication logs",
      "Guidelines for medico-legal case filing and evidence storage",
    ],
  },
  {
    title: "For Law Firms & Insurers",
    description:
      "Get reliable expert opinions, structured reports, and court-ready documentation without chasing multiple providers.",
    items: [
      "Independent reviews of medical negligence allegations",
      "Detailed injury valuation reports and impairment ratings",
      "Expert witness preparation & remote testimony support",
      "Case-by-case concierge to coordinate with treating doctors",
    ],
  },
];

const quickSolutions = [
  {
    label: "Talk to a Medicolegal Expert",
    cta: "Chat Now",
    href: "#contact",
    background: "bg-primary-foreground text-primary",
  },
  {
    label: "Need a Case Summary?",
    cta: "Upload Documents",
    href: "/user/auth",
    background:
      "bg-white/10 text-primary-foreground border border-primary-foreground/40",
  },

];

const partnershipPillars = [
  {
    title: "Clinical Accuracy",
    detail:
      "Every report undergoes dual verification by certified medicolegal experts and practicing physicians.",
  },
  {
    title: "Secure Collaboration",
    detail:
      "Encrypted document exchange and audit trails keep your sensitive case files compliant with regulatory expectations.",
  },
  {
    title: "Always-On Assistance",
    detail:
      "Regional support teams respond around the clock to coordinate patients, families, law enforcement, and courts.",
  },
];

const testimonials = [
  {
    quote:
      "From emergency casualty cases to long-standing litigations, KN Medicolegal Support is the partner we trust for clarity and speed.",
    author: "Dr. Shalini Verma",
    role: "Chief Medical Administrator, MetroCare Hospitals",
  },
  {
    quote:
      "Their analysts translate complex clinical details into clear narratives. Our plaintiff briefs have never been stronger.",
    author: "Adv. Mohit Kapoor",
    role: "Senior Partner, Kapoor Legal Associates",
  },
  {
    quote:
      "Coordinating with families and law enforcement used to consume us. KN’s case managers keep every stakeholder aligned.",
    author: "Ms. Neha Kumar",
    role: "VP Claims, SecureGuard Insurance",
  },
];

const stats = [
  { value: "1800+", label: "Medicolegal cases documented" },
  { value: "95%", label: "Client satisfaction across partners" },
  { value: "6 hrs", label: "Average turnaround for emergency briefs" },
  { value: "24/7", label: "Specialist helpline availability" },
];

export default function Home() {
  const { data: session } = useSession();

  const profileData = useMemo(
    () => ({
      name: session?.user?.name,
      role: session?.user?.role,
    }),
    [session]
  );
  return (
    <main className="min-h-svh bg-background text-foreground">
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_55%)]" />
        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 pb-24 pt-10 sm:px-10 lg:px-16">
          <nav className="flex items-center justify-between gap-6 rounded-3xl border border-primary-foreground/30 bg-primary/20 px-6 py-4 backdrop-blur-lg">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="relative h-12 md:h-16 w-12 md:w-16 overflow-hidden rounded-2xl border border-primary-foreground/40 bg-white p-1 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="KN Medicolegal Support logo"
                  width={80}
                  height={80}
                  priority
                />
              </Link>
              <div className="flex flex-col text-[10px] md:text-xs font-semibold uppercase tracking-[0.35em] text-primary-foreground">
                <span>KN</span>
                <span>Medicolegal Support</span>
              </div>
            </div>
            <div className="hidden items-center gap-8 text-sm font-medium text-primary-foreground/90 md:flex">
              {navLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  className="transition hover:text-primary-foreground/80"
                >
                  {link.title}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-3">
              {
                profileData?.name ? (
                  <Link
                    href={profileData.role === "ADMIN" ? "/dashboard/profile" : "/user/profile"}
                    className="inline-flex items-center justify-center rounded-full bg-primary-foreground px-4 md:px-5 py-1 md:py-2 text-xs md:text-sm font-semibold text-primary shadow-lg shadow-black/10 transition hover:shadow-xl">
                    Welcome, {profileData && profileData?.name?.split(" ")[0]}
                  </Link>
                ) : (<Link
                  href="/user/auth"
                  className="inline-flex items-center justify-center rounded-full bg-primary-foreground px-4 md:px-5 py-2 md:py-2 text-xs md:text-sm font-semibold text-primary shadow-lg shadow-black/10 transition hover:shadow-xl text-nowrap"
                >
                  Sign In
                </Link>)
              }

            </div>
          </nav>

          <header className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-foreground/70">
                Compassion. Compliance. Clarity.
              </p>
              <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Integrated medicolegal services for every critical moment.
              </h1>
              <p className="max-w-2xl text-lg text-primary-foreground/80 sm:text-xl">
                KN Medicolegal Support pairs clinical expertise with legal
                rigour to help hospitals, insurers, and law firms move sensitive
                cases forward without delays. From bedside evaluations to expert
                testimony, we stand beside your team at every step.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={profileData?.name ? (profileData.role === "ADMIN" ? "/dashboard/profile" : "/user/profile") : "/user/auth"}
                  className="inline-flex items-center justify-center rounded-full bg-primary-foreground px-6 py-3 text-base font-semibold text-primary shadow-lg shadow-black/20 transition hover:shadow-xl"
                >
                  Enter Client Portal
                </Link>

              </div>
            </div>
            <div className="rounded-3xl border border-primary-foreground/40 bg-primary/20 p-6 shadow-[0_30px_120px_rgba(6,40,80,0.4)] backdrop-blur">
              <h2 className="text-lg font-semibold uppercase tracking-[0.2em] text-primary-foreground/80">
                Instant Actions
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {quickSolutions.map((solution) => (
                  <Link
                    key={solution.label}
                    href={solution.href}
                    className={`flex flex-col justify-between gap-3 rounded-2xl px-5 py-5 text-left shadow-[0_20px_60px_rgba(5,36,73,0.35)] transition hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(5,36,73,0.45)] ${solution.background}`}
                  >
                    <span className="text-sm uppercase tracking-[0.2em]">
                      {solution.label}
                    </span>
                    <span className="text-lg font-semibold">
                      {solution.cta}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </header>
        </div>
      </section>

      <section
        id="services"
        className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 lg:px-16"
      >
        <div className="flex flex-col gap-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Comprehensive Coverage
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Designed around the realities of healthcare and law
          </h2>
          <p className="mx-auto max-w-3xl text-base text-foreground/70 sm:text-lg">
            Whether you manage emergency departments, insurance claims, or a
            litigation docket, our specialists coordinate every moving part so
            you can focus on the people who matter.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          {serviceBuckets.map((bucket) => (
            <div
              key={bucket.title}
              className="flex flex-col gap-6 rounded-3xl border border-primary/20 bg-secondary/60 p-10 shadow-[0_22px_120px_rgba(10,60,110,0.15)]"
            >
              <div>
                <h3 className="text-2xl font-semibold text-primary">
                  {bucket.title}
                </h3>
                <p className="mt-3 text-foreground/70">{bucket.description}</p>
              </div>
              <ul className="grid gap-4">
                {bucket.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-2xl bg-white/40 p-4 text-sm font-medium text-foreground/80 shadow-sm shadow-primary/10"
                  >
                    <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section
        id="partners"
        className="relative overflow-hidden border-y border-primary/20 bg-primary/5 py-20"
      >
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary/20 to-transparent" />
        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 sm:px-10 lg:px-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              Partnership Promise
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              The safeguards you need, built into every engagement
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {partnershipPillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-3xl border border-primary/15 bg-white/70 p-8 text-foreground/75 shadow-[0_20px_80px_rgba(9,43,84,0.18)]"
              >
                <h3 className="text-xl font-semibold text-primary">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-6">{pillar.detail}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-6 rounded-3xl border border-primary/25 bg-primary text-primary-foreground p-8 sm:grid-cols-2">
            {stats.map((stat) => (
              <div
                key={stat.value}
                className="rounded-2xl bg-primary/40 p-6 text-center"
              >
                <p className="text-3xl font-semibold sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-primary-foreground/80">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="testimonials"
        className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 lg:px-16"
      >
        <div className="flex flex-col items-center gap-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Clients Speak
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Trusted by healthcare, legal, and insurance leaders
          </h2>
          <p className="max-w-3xl text-base text-foreground/70 sm:text-lg">
            Hear how KN Medicolegal Support transforms complex, high-stakes
            cases into clear, collaborative outcomes.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.author}
              className="flex h-full flex-col gap-5 rounded-3xl border border-primary/15 bg-white/80 p-8 text-left text-sm leading-6 text-foreground/75 shadow-[0_20px_80px_rgba(10,35,70,0.12)]"
            >
              <p className="text-base font-medium leading-relaxed">
                “{testimonial.quote}”
              </p>
              <figcaption className="mt-auto text-sm font-semibold text-primary">
                {testimonial.author}
                <span className="block text-xs font-medium text-primary/70">
                  {testimonial.role}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section
        id="contact"
        className="relative overflow-hidden bg-primary text-primary-foreground"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_55%)]" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-20 text-center sm:px-10">
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Let’s bring certainty to your medicolegal cases.
          </h2>
          <p className="mx-auto max-w-3xl text-base sm:text-lg">
            Share your requirements and our coordination desk will connect with
            you within 2 business hours. We can schedule on-site visits, remote
            consultations, or comprehensive onboarding for your organisation.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold uppercase tracking-[0.2em]">
            <a
              href="mailto:support@knmedicolegal.com"
              className="inline-flex items-center justify-center rounded-full bg-primary-foreground px-6 py-3 text-primary shadow-lg shadow-black/20 transition hover:shadow-xl"
            >
              support@knmedicolegal.com
            </a>
            <a
              href="tel:+919876543210"
              className="inline-flex items-center justify-center rounded-full border border-primary-foreground px-6 py-3 text-primary-foreground transition hover:bg-primary-foreground/15"
            >
              +91 98765 43210
            </a>
          </div>
          <div className="grid gap-3 text-xs text-primary-foreground/70 sm:text-sm">
            <span>
              Office: KN Medicolegal Support, 3rd Floor, Zenith Plaza, Bengaluru
            </span>
            <span>
              Operating in Mumbai • Delhi NCR • Pune • Hyderabad • Chennai •
              Kolkata
            </span>
          </div>
        </div>
      </section>

      <footer className="bg-primary/90 text-primary-foreground">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12 sm:px-10">
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-foreground/70">
                KN Medicolegal Support
              </p>
              <p className="text-sm text-primary-foreground/80">
                Comprehensive medicolegal coordination for hospitals, insurers,
                and legal teams across India.
              </p>
            </div>
            <div className="space-y-3 text-sm">
              <p className="font-semibold uppercase tracking-[0.2em] text-primary-foreground/60">
                Explore
              </p>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>
                  <Link
                    href="/user/auth"
                    className="transition hover:text-white"
                  >
                    Client Portal
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/auth"
                    className="transition hover:text-white"
                  >
                    Admin Sign-In
                  </Link>
                </li>
                <li>
                  <a href="#services" className="transition hover:text-white">
                    Service Overview
                  </a>
                </li>
                <li>
                  <a href="#partners" className="transition hover:text-white">
                    Partner Benefits
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3 text-sm">
              <p className="font-semibold uppercase tracking-[0.2em] text-primary-foreground/60">
                Connect
              </p>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>WhatsApp Hotline: +91 98989 98989</li>
                <li>Support Desk: support@knmedicolegal.com</li>
                <li>Media: media@knmedicolegal.com</li>
              </ul>
            </div>
          </div>
          <div className="h-px bg-primary-foreground/20" />
          <p className="text-xs text-primary-foreground/70">
            © {new Date().getFullYear()} KN Medicolegal Support. All rights
            reserved. We facilitate collaboration among healthcare providers,
            legal experts, and insurers while upholding patient confidentiality
            and regulatory compliance.
          </p>
        </div>
      </footer>
    </main>
  );
}
