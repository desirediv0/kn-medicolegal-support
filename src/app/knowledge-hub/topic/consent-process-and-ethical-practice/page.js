"use client";

import Link from "next/link";

export default function ConsentProcessPage() {
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
                        Consent Process & Ethical Practice
                    </h1>
                </div>
            </section>

            <section className="py-12 md:py-16">
                <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-16 space-y-8">
                    <div className="prose prose-lg max-w-none">
                        <div className="space-y-6 text-gray-700 leading-relaxed">
                            <p className="text-base md:text-lg">
                                Consent process should be taken seriously, as consent is the most common contentious issue in medical litigation. It should follow a detailed counselling process by a responsible member of the treating team.
                            </p>
                        </div>

                        <div className="mt-12 space-y-10">
                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Essential Elements of Valid Consent</h2>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Patient-Specific Consent</h3>
                                        <p className="text-gray-700 mb-3">
                                            The consent document should be patient-specific, doctor (team) specific, procedure specific, with mention of the expected benefits and the common risks of the procedure.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Required Signatures</h3>
                                        <p className="text-gray-700 mb-3">Signatures (with name, date & time) at the correct places of:</p>
                                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                            <li>The patient (if competent) or his kin (if patient is not competent)</li>
                                            <li>Two witnesses</li>
                                            <li>The doctor who had counselled him</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Document Completeness</h3>
                                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                            <li>There should be no blank spaces.</li>
                                            <li>Important aspects may be handwritten, endorsed by the consent giver.</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Counselling Process</h2>

                                <div className="space-y-4 text-gray-700 leading-relaxed">
                                    <p>
                                        Consent should follow a detailed counselling process by a responsible member of the treating team. The counselling should:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>Explain the procedure in clear, simple language</li>
                                        <li>Discuss expected benefits and common risks</li>
                                        <li>Address patient/family questions and concerns</li>
                                        <li>Allow sufficient time for decision-making</li>
                                        <li>Be documented appropriately</li>
                                    </ul>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Ethical Practice Principles</h2>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Ethical medical practice</h3>
                                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                            <li>Treat every patient as your own friend or relative</li>
                                            <li>Follow the standard of care without any extraneous considerations</li>
                                            <li>Resort to participative treatment, involving the patient/family in decision making wherever possible.</li>
                                            <li>Do not exaggerate the benefits or trivialize the risks of the planned treatment option as compared to the other alternatives</li>
                                            <li>Observe sensitivity, empathy & compassion, as much as possible</li>
                                            <li>Do no harm</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Respect Patient Dignity & Privacy</h3>
                                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                            <li>A human being in trouble has come for help. He deserves to be handled with sensitivity and respect.</li>
                                            <li>Mechanical care without human touch compromises the patient&apos;s trust in the treating team. Remember that doctors are not mere technicians.</li>
                                            <li>Sensitivity & empathy help to increase the confidence & will-power of the patient and his trust in the doctor</li>
                                            <li>Patient discloses his personal details to the care providers, in good faith. Their confidentiality & privacy are the basic requirements of healthcare service, and they ought to be protected</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

