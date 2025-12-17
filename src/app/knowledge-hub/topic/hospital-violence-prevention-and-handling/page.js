"use client";

import Link from "next/link";

export default function HospitalViolencePage() {
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
                        Hospital Violence: Prevention & Handling
                    </h1>
                </div>
            </section>

            <section className="py-12 md:py-16">
                <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-16 space-y-8">
                    <div className="prose prose-lg max-w-none">
                        <div className="space-y-6 text-gray-700 leading-relaxed">
                            <p className="text-base md:text-lg">
                                Hospital violence is a growing concern. It should be prevented, if possible, anticipated when it can, and prudently handled under all circumstances.
                            </p>
                        </div>

                        <div className="mt-12 space-y-10">
                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Prevention Strategies</h2>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Communication & Attitude</h3>
                                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                            <li>Good communication skills, frequent counselling, and a sensitive attitude generally help in preventing hospital violence.</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Anticipation & Alert</h3>
                                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                            <li>In vulnerable situations, anticipate trouble and alert the hospital security or the district administration, depending on the circumstances.</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6">During Incidents of Violence</h2>

                                <div className="space-y-6">
                                    <div className="bg-red-50 border-l-4 border-red-500 p-4">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Immediate Actions</h3>
                                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                            <li><strong>Prioritize safety</strong> - Ensure the safety of all staff, patients, and visitors</li>
                                            <li><strong>Inform the fraternity</strong> - Alert other doctors and medical professionals</li>
                                            <li><strong>Collect in numbers</strong> - Try to gather support from colleagues and staff</li>
                                            <li><strong>Communicate through a spokesperson</strong> - Designate one person to handle communication</li>
                                            <li><strong>Call hospital security immediately</strong> - Alert security personnel</li>
                                            <li><strong>Call police immediately</strong> - Contact law enforcement authorities</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Technology & Tools</h2>

                                <div className="space-y-4">
                                    <p className="text-gray-700">
                                        A special App for alerts on historically black-listed persons and as a signal for collecting at the ground zero, can be very useful.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Documentation Requirements</h2>

                                <div className="space-y-4">
                                    <p className="text-gray-700 mb-3">Document the following comprehensively:</p>
                                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                        <li>Events - What happened, when, where, who was involved</li>
                                        <li>Witnesses - Names and contact details of all witnesses</li>
                                        <li>All communication - Record all interactions, statements, and responses</li>
                                        <li>Injuries - Document any injuries sustained by staff, patients, or others</li>
                                        <li>Property damage - Record any damage to hospital property</li>
                                        <li>Police reports - Maintain copies of all police reports and FIRs</li>
                                    </ul>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Institutional Measures</h2>

                                <div className="space-y-4">
                                    <p className="text-gray-700">
                                        Hospitals should establish clear protocols for preventing and handling violence, including:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                        <li>Security measures and surveillance</li>
                                        <li>Staff training on de-escalation techniques</li>
                                        <li>Designated security personnel and protocols</li>
                                        <li>Coordination with local police and administration</li>
                                        <li>Support systems for affected staff</li>
                                    </ul>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

