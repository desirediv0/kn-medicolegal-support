"use client";

import { ContactForm } from "@/components/contact-form";
import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Header Section */}
      <section className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-12 md:py-16 lg:px-16">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
              Contact Us
            </h1>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              Get in touch with our medicolegal experts. We&apos;re here to assist you with consultations,
              documentation review, compliance support, and any medicolegal queries.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-12 md:py-16 border-b border-gray-200">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Email IDs */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                  <Mail className="h-6 w-6 text-gray-700" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-900 mb-4">
                    Email IDs
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900 mb-1">
                        <a
                          href="mailto:support@knmedicolegal.com"
                          className="hover:text-gray-700 transition-colors break-all"
                        >
                          support@knmedicolegal.com
                        </a>
                      </p>
                      <p className="text-xs text-gray-600">
                        User support & queries
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 mb-1">
                        <a
                          href="mailto:info@knmedicolegal.com"
                          className="hover:text-gray-700 transition-colors break-all"
                        >
                          info@knmedicolegal.com
                        </a>
                      </p>
                      <p className="text-xs text-gray-600">
                        General information
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 mb-1">
                        <a
                          href="mailto:compliance@knmedicolegal.com"
                          className="hover:text-gray-700 transition-colors break-all"
                        >
                          compliance@knmedicolegal.com
                        </a>
                      </p>
                      <p className="text-xs text-gray-600">
                        Compliance & legal correspondence
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-600 leading-relaxed">
                      <strong className="text-gray-900">When to use which email:</strong><br />
                      Use <strong>support@knmedicolegal.com</strong> for account issues, service queries, and technical support.<br />
                      Use <strong>info@knmedicolegal.com</strong> for general inquiries and information requests.<br />
                      Use <strong>compliance@knmedicolegal.com</strong> for legal matters, compliance issues, and formal correspondence.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone Numbers */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                  <Phone className="h-6 w-6 text-gray-700" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-900 mb-4">
                    Phone Numbers
                  </h3>
                  <div className="space-y-3 text-sm text-gray-700">
                    <p>
                      <a href="tel:+919876543210" className="hover:text-gray-900 transition-colors font-medium">
                        +91 98765 43210
                      </a>
                    </p>
                    <p>
                      <a href="tel:+919717891104" className="hover:text-gray-900 transition-colors font-medium">
                        +91 97178 91104
                      </a>
                    </p>
                    <p>
                      <a href="tel:+919810433402" className="hover:text-gray-900 transition-colors font-medium">
                        +91 98104 33402
                      </a>
                    </p>
                  </div>
                  <p className="text-xs text-gray-600 mt-4 pt-4 border-t border-gray-200">
                    Available: Monday - Saturday, 9:00 AM - 6:00 PM IST<br />
                    We respond within 24-48 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 md:py-16">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-16">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
              Send us a Message
            </h2>
            <p className="text-gray-600">
              Fill out the form below and we&apos;ll get back to you as soon as possible.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8">
            <ContactForm />
          </div>

          {/* Additional Information */}
          <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Contact us for:
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-gray-500 mt-1">•</span>
                <span>Medicolegal consultations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-500 mt-1">•</span>
                <span>Review of your case or documents</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-500 mt-1">•</span>
                <span>Hospital compliance assistance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-500 mt-1">•</span>
                <span>Training for your staff</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-500 mt-1">•</span>
                <span>Urgent support during complications or disputes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-500 mt-1">•</span>
                <span>Medicolegal help in litigation, police investigation, or medical council complaints</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
