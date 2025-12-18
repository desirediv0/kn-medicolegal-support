"use client";

import Link from "next/link";

export default function GoldenRulesPage() {
    return (
        <main className="min-h-screen bg-white text-gray-900">
            <section className="border-b border-gray-200 bg-gray-50">
                <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 py-12 md:py-16 lg:px-16">
                    <Link
                        href="/knowledge-hub"
                        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
                    >
                        ← Back to Knowledge Hub
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
                        Golden Rules for Doctors & Hospitals
                    </h1>
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                        A structured framework to protect both patient interests and clinician integrity
                    </p>
                </div>
            </section>

            <section className="py-12 md:py-16">
                <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-16 space-y-8">
                    <div className="prose prose-lg max-w-none">
                        <div className="space-y-6 text-gray-700 leading-relaxed">
                            <p className="text-base md:text-lg">
                                Healthcare is no longer a &apos;bed of roses&apos;. It is associated with a significant risk to doctors, staff, and equipment. Prudence demands that such risks be prevented, anticipated, and managed properly to maintain the dignity & grace of medical practice and for the safety of doctors, staff & equipment.
                            </p>
                            <p className="text-base md:text-lg">
                                Medical litigation has emerged as a growing concern in modern clinical practice, following the inclusion of medical services under the purview of the Consumer Protection Act, 1986, as per a Supreme Court order in 1995, and reinforced by the enactment of the new Consumer Protection Act in 2019. While technological advances have greatly improved the diagnosis and treatment of complex ailments, they have also increased patient expectations and scrutiny of medical care. Studies show that most medico-legal disputes do not necessarily arise from clinical incompetence, medical negligence, or deficient care but from ethical and non-medical reasons. In the UG & PG curriculum, the &apos;art of medicine&apos; has largely been neglected, focusing only on the &apos;science of medicine&apos;. Doctors, therefore, find it difficult to acquire this &apos;art&apos; in the gradually degrading social ecosystem in general and the deteriorating Doctor-Patient relationship in particular.
                            </p>
                            <p className="text-base md:text-lg">
                                Presented below are some Golden Rules to prevent and effectively manage medical litigations. The principles emphasize empathetic communication, comprehensive informed consent, meticulous documentation, adherence to clinical standards, teamwork, and transparent handling of adverse events. They also highlight the importance of professional indemnity coverage, respect for patient dignity, continuing medical education, and prudent legal response. Together, these rules provide a structured framework to protect both patient interests and clinician integrity. It underscores that ethical practice, proper documentation, and good communication remain the best medico-legal defence.
                            </p>
                        </div>

                        <div className="mt-12 space-y-8">
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Core Topics</h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Healthcare Risk Prevention</h3>
                                        <p className="text-gray-700 mb-3">
                                            Prevention of litigations through ethical medical practice, respect for patient dignity, continuous professional development, effective communication, proper documentation, and proactive risk management.
                                        </p>
                                        <Link
                                            href="/knowledge-hub/topic/healthcare-risk-prevention"
                                            className="inline-block text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                                        >
                                            Read more →
                                        </Link>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Healthcare Risk Management</h3>
                                        <p className="text-gray-700 mb-3">
                                            Effective management of healthcare risks through systematic approaches to prevent, anticipate, and respond to medicolegal challenges.
                                        </p>
                                        <Link
                                            href="/knowledge-hub/topic/healthcare-risk-management"
                                            className="inline-block text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                                        >
                                            Read more →
                                        </Link>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Management of Litigation</h3>
                                        <p className="text-gray-700 mb-3">
                                            Comprehensive guidance on managing legal proceedings when facing medical litigation, including legal notices, consumer court cases, police summons, FIR, and criminal proceedings.
                                        </p>
                                        <Link
                                            href="/knowledge-hub/topic/management-of-litigation"
                                            className="inline-block text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                                        >
                                            Read more →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

