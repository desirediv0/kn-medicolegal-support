"use client";
import { ContactForm } from "@/components/contact-form";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_55%)]" />
        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-20 text-center sm:px-10">
          <h1 className="text-3xl font-semibold sm:text-4xl">Contact Us</h1>
          <p className="mx-auto max-w-3xl text-base sm:text-lg">
            We&apos;re here to help you whenever you need us. Fill out the form
            below and we&apos;ll get back to you as soon as possible.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 lg:px-16">
        <div className=" mx-auto">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Information */}
            <div className="space-y-8">


              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
                <h3 className="text-xl font-semibold text-primary mb-4">
                  Contact us for:
                </h3>
                <ul className="space-y-2 text-sm text-foreground/80">
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
              </div>
            </div>

            {/* Contact Form */}
            <div className="rounded-2xl border border-primary/20 bg-white/70 p-8 shadow-lg max-h-min">
              <h2 className="text-2xl font-semibold text-primary mb-6">
                Send us a Message
              </h2>
              <div className="bg-white rounded-xl p-6 border border-primary/10">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

