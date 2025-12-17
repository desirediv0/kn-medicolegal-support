"use client";

import Link from "next/link";

export default function ManagementOfComplicationsPage() {
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
                        Management of Complications
                    </h1>
                </div>
            </section>

            <section className="py-12 md:py-16">
                <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-16 space-y-8">
                    <div className="prose prose-lg max-w-none">
                        <div className="space-y-6 text-gray-700 leading-relaxed">
                            <p className="text-base md:text-lg">
                                Complications can happen even in the best hands. What matters is how you respond. Complications during the course of medical/surgical treatment may be anticipated or may happen unexpectedly. It does not always mean medical negligence. The courts are well aware of this.
                            </p>
                            <p className="text-base md:text-lg">
                                Complications can occur due to several factors, which may be related to the disease process itself or the patient&apos;s aberrant body response, or unexplained reasons, besides the possibility of a deficiency of treatment & care. The courts tend to differentiate medical negligence from other reasons.
                            </p>
                            <p className="text-base md:text-lg font-semibold">
                                What should be done to convince the court that there was no negligence in managing the complication?
                            </p>
                        </div>

                        <div className="mt-12 space-y-6">
                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Key Points to Remember</h2>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Pre-Procedure Assessment & Precautions</h3>
                                        <p className="text-gray-700">
                                            Adequate assessment, evaluation of the patient, and due precautions were taken in the treatment & care, as per standard guidelines. This is particularly important for taking due precautions & preparations in the pre-operative period of a surgical patient.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Standard Guidelines Compliance</h3>
                                        <p className="text-gray-700">
                                            The treatment/procedure was conducted, as per standard guidelines.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Prompt Detection & Communication</h3>
                                        <p className="text-gray-700 mb-3">
                                            When a complication occurs:
                                        </p>
                                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                            <li>It is detected promptly</li>
                                            <li>Shared with the family immediately</li>
                                            <li>Treated promptly & properly</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Honest & Tactful Communication</h3>
                                        <p className="text-gray-700 mb-3">
                                            Honest (but tactful) communication with the family means sharing:
                                        </p>
                                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                            <li>What has happened</li>
                                            <li>Its possible causes</li>
                                            <li>The further plan of care</li>
                                            <li>The probable prognosis</li>
                                        </ul>
                                        <p className="text-gray-700 mt-3">
                                            The communication should be made directly by the treating consultant rather than a junior member of the team, even if (in odd circumstances) the communication happens physically or virtually.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">5. Standard-Based Evaluation & Treatment</h3>
                                        <p className="text-gray-700">
                                            The evaluation & treatment of the complication should be done as per standard guidelines.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">6. Second Opinions & Referrals</h3>
                                        <p className="text-gray-700 mb-3">
                                            Second opinions, if required, should be done promptly from the proper specialist. If the family has a different choice of the referral consultant, respect their choice after adequate counselling.
                                        </p>
                                        <p className="text-gray-700">
                                            Referral to another hospital, if required, should be done promptly and to a proper facility and in a proper manner. If the family has a different choice of the hospital, respect their choice after adequate counselling.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">7. Comprehensive Documentation</h3>
                                        <p className="text-gray-700 font-semibold">
                                            All the important aspects should be properly documented, including:
                                        </p>
                                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                            <li>Initial assessment and precautions taken</li>
                                            <li>Procedure details and adherence to guidelines</li>
                                            <li>Complication detection and timeline</li>
                                            <li>Communication with family (what was said, when, by whom)</li>
                                            <li>Evaluation and treatment of the complication</li>
                                            <li>Second opinions obtained (if any)</li>
                                            <li>Referrals made (if any)</li>
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

