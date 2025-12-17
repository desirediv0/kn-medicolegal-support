"use client";

import Link from "next/link";

export default function ProperIndemnityInsurancePage() {
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
                        Proper Indemnity Insurance
                    </h1>
                </div>
            </section>

            <section className="py-12 md:py-16">
                <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-16 space-y-8">
                    <div className="prose prose-lg max-w-none">
                        <div className="space-y-6 text-gray-700 leading-relaxed">
                            <p className="text-base md:text-lg">
                                Professional indemnity insurance is a critical component of medico-legal risk management. It provides financial protection against claims of negligence, errors, or omissions in professional practice. Maintaining adequate coverage and understanding your policy terms is essential for protecting both your practice and personal assets.
                            </p>
                        </div>

                        <div className="mt-12 space-y-10">
                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Key Considerations for Selecting Indemnity Insurance</h2>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Select the company carefully</h3>
                                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                            <li>Choose a reputable insurance company with a track record in professional indemnity</li>
                                            <li>Negotiation in a group can be useful - consider group policies through professional associations</li>
                                            <li>Compare coverage, exclusions, and premium rates across different insurers</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Adequate Sum Insured with proper AOA & AOY</h3>
                                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                            <li><strong>Sum Insured:</strong> Ensure the coverage amount is adequate for your practice size and risk profile</li>
                                            <li><strong>AOA (Aggregate of All):</strong> Total coverage limit for all claims during the policy period</li>
                                            <li><strong>AOY (Any One Year):</strong> Maximum coverage for claims in a single year</li>
                                            <li>Consider the potential costs of legal defence, settlements, and compensation when determining coverage limits</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Maintain continuity of indemnity by timely renewals</h3>
                                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                            <li>Never let your policy lapse - maintain continuous coverage</li>
                                            <li>Set reminders for renewal dates well in advance</li>
                                            <li>Consider automatic renewal options if available</li>
                                            <li>A gap in coverage can leave you vulnerable to claims</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Formal intimation on receiving a legal notice or a court notice</h3>
                                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                            <li>Immediately inform your insurance company when you receive any legal notice or court summons</li>
                                            <li>Most policies require prompt notification - check your policy terms for specific timelines</li>
                                            <li>Provide all relevant documents and information to the insurer</li>
                                            <li>Failure to notify promptly may result in denial of coverage</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Understanding Policy Terms</h2>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Coverage Scope</h3>
                                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                            <li>Legal defence costs</li>
                                            <li>Compensation payments</li>
                                            <li>Settlement amounts</li>
                                            <li>Court costs and expenses</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Common Exclusions</h3>
                                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                            <li>Intentional acts or criminal conduct</li>
                                            <li>Known claims or circumstances before policy inception</li>
                                            <li>Claims outside the policy period</li>
                                            <li>Regulatory or disciplinary proceedings (may require separate coverage)</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Best Practices</h2>

                                <div className="space-y-4">
                                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                        <li>Review your policy annually to ensure it meets your current practice needs</li>
                                        <li>Keep copies of all policy documents in a safe, accessible location</li>
                                        <li>Document all communications with your insurer</li>
                                        <li>Understand the claims process and requirements</li>
                                        <li>Consider additional coverage for specific high-risk procedures or areas of practice</li>
                                        <li>Maintain records of all policy renewals and payments</li>
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

