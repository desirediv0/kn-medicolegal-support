"use client";

import Link from "next/link";

export default function AIHealthcarePage() {
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
                        Artificial Intelligence (AI) in Healthcare
                    </h1>
                </div>
            </section>

            <section className="py-12 md:py-16">
                <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-16 space-y-8">
                    <div className="prose prose-lg max-w-none">
                        <div className="space-y-6 text-gray-700 leading-relaxed">
                            <p className="text-base md:text-lg">
                                Artificial Intelligence (AI) in healthcare refers to the use of algorithms, machine learning, and data analytics to assist in diagnosis, treatment planning, patient monitoring, and administrative efficiency. When used properly, AI can enhance clinical accuracy, reduce errors, and optimize patient care. However, because AI systems depend on data quality, algorithmic design, and human interpretation, doctors must exercise professional judgment and ethical vigilance while integrating AI tools into patient-specific practice.
                            </p>
                            <p className="text-base md:text-lg">
                                Artificial Intelligence can greatly enhance medical care - but it must serve as a clinical assistant, not an autonomous decision-maker. The doctor&apos;s ethical judgment, compassion, and accountability remain central to safe practice. Responsible use of AI requires awareness, transparency, and documentation, combined with strict adherence to professional ethics and data protection norms. When carefully integrated, AI can strengthen both clinical outcomes and medico-legal defensibility, fostering a future where technology empowers - not replaces - the art of healing.
                            </p>
                        </div>

                        <div className="mt-12 space-y-10">
                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Important advice</h2>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Use AI as a Support, but not a Substitute</h3>
                                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                            <li>Treat AI output as a decision-support tool, not a final decision. AI (Artificial Intelligence) should not be allowed to replace HI (Human Intelligence).</li>
                                            <li>The clinician remains the primary decision-maker, responsible for diagnosis, treatment, and consent.</li>
                                            <li>Always validate AI-generated suggestions with clinical findings, guidelines, and patient-specific context.</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Verify the Source and Regulatory Approval</h3>
                                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                            <li>Use only AI tools cleared by regulatory bodies (such as CDSCO, FDA, or CE-marked software).</li>
                                            <li>Avoid unverified or consumer-grade applications for clinical use.</li>
                                            <li>Maintain records of software version, approval details, and manufacturer credentials.</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Understand the Algorithm&apos;s Scope and Limitations</h3>
                                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                            <li>Know what the AI tool is designed to do (e.g., detect diabetic retinopathy, analyse ECG patterns, predict sepsis).</li>
                                            <li>Be aware of data limitations (age, gender, ethnicity bias) that may affect accuracy.</li>
                                            <li>Document any manual override or deviation from AI recommendation with justification.</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Maintain Transparency with Patients</h3>
                                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                            <li>Inform patients when AI tools are used in their care (e.g., &quot;AI-assisted image analysis was used&quot;).</li>
                                            <li>Explain that final interpretation rests with the doctor, not the machine.</li>
                                            <li>Obtain informed consent for AI-assisted diagnosis or treatment where required.</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">5. Data Privacy and Cybersecurity</h3>
                                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                            <li>Ensure data fed into AI systems is de-identified and stored securely in compliance with the Digital Personal Data Protection Act, 2023, and institutional policies.</li>
                                            <li>Avoid uploading patient data to cloud-based or third-party AI platforms unless authorized and encrypted.</li>
                                            <li>Regularly update passwords, firewalls, and antivirus systems.</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Medicolegal and Ethical Precautions</h2>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Maintain Clinical Autonomy</h3>
                                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                            <li>Never rely solely on AI output to make or deny a diagnosis or intervention.</li>
                                            <li>Courts will hold the human clinician accountable, not the software, for any medical error.</li>
                                            <li>Always record in the patient file: &quot;AI tool X was used; results reviewed and interpreted by Dr. ___.&quot;</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Documentation and Audit Trail</h3>
                                        <p className="text-gray-700 mb-3">Keep a clear record of:</p>
                                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                            <li>The AI system used (name, version, date).</li>
                                            <li>The output obtained.</li>
                                            <li>The clinician&apos;s independent assessment and final decision.</li>
                                        </ul>
                                        <p className="text-gray-700 mt-3 ml-4">
                                            This documentation provides legal defensibility and transparency in case of litigation.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Avoid Overdependence or Misrepresentation</h3>
                                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                            <li>Do not claim or advertise &quot;AI-based superior diagnosis or cure&quot; unless scientifically validated and approved.</li>
                                            <li>Over-reliance or exaggerated claims may be construed as a deficiency in service or misrepresentation under consumer law.</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Liability and Institutional Responsibility</h3>
                                        <p className="text-gray-700 mb-3">Hospitals should maintain AI governance policies, ensuring:</p>
                                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                            <li>All AI systems are procured, validated, and periodically audited.</li>
                                            <li>Staff are trained in safe use and awareness of medico-legal implications.</li>
                                            <li>There is a clear chain of accountability in case of system malfunction.</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">5. Ethical and Human Oversight</h3>
                                        <p className="text-gray-700 mb-3">Uphold the ethical principles of:</p>
                                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                            <li><strong>Beneficence</strong> – AI must improve patient outcomes.</li>
                                            <li><strong>Non-maleficence</strong> – Prevent harm due to algorithmic bias or errors.</li>
                                            <li><strong>Autonomy</strong> – Respect the patient&apos;s right to know and consent.</li>
                                            <li><strong>Justice</strong> – Ensure equitable access to AI benefits across patient groups.</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">6. Common Pitfalls to Avoid</h3>
                                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                            <li>Using free online AI tools (e.g., chatbots, image analysers) for clinical advice without validation.</li>
                                            <li>Blindly trusting AI-generated differential diagnosis.</li>
                                            <li>Failing to document your own clinical reasoning.</li>
                                            <li>Sharing patient images with AI platforms without anonymization.</li>
                                            <li>Making promotional claims like &quot;AI-verified diagnosis&quot; or &quot;robotic accuracy&quot;.</li>
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

