"use client";

import { motion } from "framer-motion";
import { FileText, Mail, Phone } from "lucide-react";
import Link from "next/link";

export default function FeePackagesPage() {
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
                            Flexible Plans for Your Practice
                        </motion.p>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-medium"
                        >
                            <span className="bg-gradient-to-r from-[hsl(var(--contact-gradient-from))] to-[hsl(var(--contact-gradient-to))] bg-clip-text text-transparent">
                                Fee &
                            </span>{" "}
                            Packages
                        </motion.h1>
                    </div>
                </div>
            </section>

            {/* Coming Soon Section */}
            <section className="relative overflow-hidden bg-background py-16 md:py-24">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(196,248,42,0.05),transparent_50%)]" />

                <div className="relative mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="rounded-2xl border border-foreground/10 bg-white p-8 md:p-12 shadow-lg text-center"
                    >
                        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 mb-6">
                            <FileText className="h-10 w-10 text-blue-600" />
                        </div>

                        <h2 className="text-2xl md:text-3xl font-medium text-foreground mb-4">
                            Coming Soon
                        </h2>

                        <p className="text-base md:text-lg text-foreground/70 leading-relaxed mb-8 max-w-2xl mx-auto">
                            We are currently preparing detailed information about our fee structure and service packages. This page will be updated soon with comprehensive pricing options tailored to meet your medicolegal support needs.
                        </p>

                        <div className="border-t border-foreground/10 pt-8">
                            <p className="text-sm md:text-base text-foreground/80 mb-6">
                                For immediate inquiries about our services and pricing:
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-foreground px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-medium text-primary shadow-lg shadow-primary-foreground/20 transition hover:shadow-xl hover:scale-105"
                                >
                                    <Mail className="h-5 w-5" />
                                    Contact Us
                                </Link>

                                <Link
                                    href="/user/auth?mode=register"
                                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary-foreground px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-semibold text-foreground shadow-sm transition hover:bg-foreground/5 hover:border-primary-foreground"
                                >
                                    Register Now
                                </Link>
                            </div>
                        </div>
                    </motion.div>

                    {/* Additional Info Cards */}
                    <div className="grid gap-6 md:grid-cols-2 mt-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="rounded-xl border border-foreground/10 bg-white p-6 shadow-md"
                        >
                            <div className="flex items-start gap-4">
                                <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10">
                                    <Phone className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-foreground mb-2">
                                        Flexible Options
                                    </h3>
                                    <p className="text-sm text-foreground/70 leading-relaxed">
                                        We offer customized packages for individual doctors and hospitals, including annual and monthly support plans.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="rounded-xl border border-foreground/10 bg-white p-6 shadow-md"
                        >
                            <div className="flex items-start gap-4">
                                <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
                                    <FileText className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-foreground mb-2">
                                        Transparent Pricing
                                    </h3>
                                    <p className="text-sm text-foreground/70 leading-relaxed">
                                        Our pricing structure is designed to be clear and competitive, ensuring you receive excellent value for professional medicolegal support.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </main>
    );
}
