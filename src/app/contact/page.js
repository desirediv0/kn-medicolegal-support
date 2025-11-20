"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ContactForm } from "@/components/contact-form";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section with Light Background */}
      <section className="relative overflow-hidden bg-background border-b border-foreground/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(196,248,42,0.05),transparent_50%)]" />

        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 py-12 md:py-16 lg:px-16">
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold"
            >
              Have questions?{' '}
              <span className="block mt-2 bg-gradient-to-r from-[hsl(var(--contact-gradient-from))] to-[hsl(var(--contact-gradient-to))] bg-clip-text text-transparent">
                Get in touch!
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mx-auto max-w-2xl text-sm md:text-base text-foreground/70 leading-relaxed"
            >
              We&apos;re here to help you whenever you need us. Fill out the form
              below and we&apos;ll get back to you as soon as possible.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-12 md:py-20 lg:px-16">
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
                priority
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
      </section>
    </main>
  );
}
