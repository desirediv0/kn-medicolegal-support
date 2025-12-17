"use client";

import Link from "next/link";

export default function MedicalRecordsPage() {
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
                        Medical Records & Documentation
                    </h1>
                </div>
            </section>

            <section className="py-12 md:py-16">
                <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-16 space-y-8">
                    <div className="prose prose-lg max-w-none">
                        <div className="space-y-6 text-gray-700 leading-relaxed">
                            <p className="text-base md:text-lg">
                                Good documentation is your strongest medicolegal defence. Courts value the medical records as credible evidence unless they are manipulated or fabricated. These records are created by the doctors in their language and are kept in their custody. There is no reason, therefore, to neglect them. If your medical records are poor, your legal defence will be poor. If an important contention is not reflected in the medical records, it will be presumed that it was not done/improperly done, as the case may be.
                            </p>
                        </div>

                        <div className="mt-12 space-y-6">
                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Key Principles of Medical Records</h2>

                                <div className="space-y-4 text-gray-700 leading-relaxed">
                                    <p>
                                        The medical records should be carefully & legibly written or entered in EMR. Each entry should be clear, dated, timed, factual, and contemporaneous. Avoid abbreviations that are not standard. Medical records should reflect the care provided, in support of your defence. Accurate medical records and proper consent are the strongest pillars of medicolegal safety.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Essential Records to Maintain</h2>

                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Primary Records</h3>
                                        <p className="text-gray-700 mb-3">Focus particularly on the following records:</p>
                                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                            <li>Initial Assessment record</li>
                                            <li>Progress notes</li>
                                            <li>Informed Consent</li>
                                            <li>Operation/procedure notes</li>
                                            <li>Anaesthesia notes</li>
                                            <li>Discharge/Death/Referral summary</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Additional Important Records</h3>
                                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                            <li>Estimate sheets</li>
                                            <li>Counselling sheets</li>
                                            <li>Mortality notes</li>
                                            <li>Referral notes</li>
                                            <li>Nursing charts</li>
                                        </ul>
                                        <p className="text-gray-700 mt-3">All these records should be prepared very carefully.</p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Documentation Requirements</h2>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">OPD Prescriptions</h3>
                                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                            <li>OPD prescriptions should be complete and legibly written.</li>
                                            <li>Retain an office copy</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Billing & Receipts</h3>
                                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                            <li>Bills & receipts should be issued as a routine</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Transfer Notes</h3>
                                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                            <li>Transfer notes (internal & external transfers) must be well documented</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Signature & Dating Requirements</h3>
                                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                            <li>All notes must have a recognizable signature, date & time</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Critical Prohibitions</h2>

                                <div className="space-y-4">
                                    <div className="bg-red-50 border-l-4 border-red-500 p-4">
                                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                            <li className="font-semibold">Never fabricate/manipulate medical records</li>
                                            <li className="font-semibold">Never issue false medical certificates</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Statutory Documentation</h2>

                                <div className="space-y-4">
                                    <p className="text-gray-700">
                                        Be very careful with the statutory documentation related to PNDT, MTP, ART & THOTA Acts and strictly follow the guidelines.
                                    </p>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

