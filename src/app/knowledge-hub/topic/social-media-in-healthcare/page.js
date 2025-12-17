"use client";

import Link from "next/link";

export default function SocialMediaPage() {
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
                        Social Media in Healthcare
                    </h1>
                </div>
            </section>

            <section className="py-12 md:py-16">
                <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-16 space-y-8">
                    <div className="prose prose-lg max-w-none">
                        <div className="space-y-6 text-gray-700 leading-relaxed">
                            <p className="text-base md:text-lg">
                                Social media has emerged as a powerful tool in modern healthcare, transforming the way medical professionals, institutions, and patients communicate and share information. Platforms such as Facebook, X (Twitter), Instagram, LinkedIn, and YouTube enable rapid dissemination of health education, disease awareness, public health alerts, and professional collaboration. For healthcare providers, social media offers opportunities to engage with the community, promote preventive health, and participate in academic discourse. However, its open and informal nature also poses ethical, legal, and professional challenges - particularly concerning patient confidentiality, data privacy, misinformation, and unregulated self-promotion. Responsible, ethical, and policy-guided use of social media is therefore essential to harness its benefits while safeguarding patient interests and the integrity of the medical profession.
                            </p>
                        </div>

                        <div className="mt-12 space-y-10">
                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Proper and Ethical Use of Social Media by Doctors</h2>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Professionalism and Ethical Conduct</h3>
                                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                            <li>Maintain the same standards of professionalism online as in clinical practice.</li>
                                            <li>Avoid posting derogatory, judgmental, or emotional comments about patients, colleagues, or institutions.</li>
                                            <li>Respect the Medical Council of India (now NMC) Code of Ethics Regulations and its digital communication advisories.</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Confidentiality and Privacy</h3>
                                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                            <li>Never share patient photographs, clinical details, investigations, or case narratives that can identify a patient, even if the name is omitted.</li>
                                            <li>Obtain explicit written consent if sharing de-identified patients&apos; clinical material (especially pictures) for academic or educational purposes.</li>
                                            <li>Avoid discussing patients&apos; details in public groups, WhatsApp chats, or online forums.</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Advertising and Self-Promotion</h3>
                                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                            <li>The NMC (erstwhile MCI) regulations prohibit soliciting patients through advertisements or misleading claims.</li>
                                            <li>Doctors may display their name, recognized qualifications, specialization, registration number, and contact details, but not comparative or performance claims (&quot;best&quot;, &quot;guaranteed cure&quot;, etc.).</li>
                                            <li>Avoid paid endorsements, testimonials, or promotional videos that can be construed as unethical advertising.</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Online Consultations and Telemedicine</h3>
                                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                            <li>Follow the Telemedicine Practice Guidelines (MoHFW, 2020) - issued under the NMC Act.</li>
                                            <li>Ensure patient identity verification, consent, documentation, and prescription format compliance.</li>
                                            <li>Avoid offering a diagnosis or prescription based on incomplete or informal social media interactions (Facebook, Instagram, etc.).</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">5. Prohibited Activities</h3>
                                        <p className="text-gray-700 mb-3 font-semibold">Doctors and staff must not:</p>
                                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                            <li>Post, comment, or share any patient-identifiable data, images, or reports without written consent.</li>
                                            <li>Advertise medical services using comparative, superlative, or misleading claims (&quot;best&quot;, &quot;guaranteed results&quot;, etc.).</li>
                                            <li>Offer consultations or prescriptions through informal social media chats.</li>
                                            <li>Criticize or mock patients, colleagues, or hospitals in any online forum.</li>
                                            <li>Endorse or promote non-scientific or unverified products.</li>
                                            <li>Post or respond to ongoing medico-legal cases publicly.</li>
                                        </ul>
                                        <p className="text-gray-700 mt-3 ml-4">
                                            Violation of these norms shall be treated as professional misconduct and may attract disciplinary or legal action.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">6. Educational and Public Health Communication</h3>
                                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                            <li>Doctors are encouraged to share general health awareness messages that are evidence-based and non-promotional.</li>
                                            <li>Cite authentic sources (WHO, CDC, MoHFW, ICMR).</li>
                                            <li>Use disclaimers such as: &quot;This information is for educational purposes and not a substitute for professional medical advice.&quot;</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Misuse of Social Media by Patients / Public Against Doctors or Hospitals</h2>

                                <div className="space-y-6">
                                    <p className="text-gray-700 leading-relaxed">
                                        Social media can serve as a powerful platform for health education and professional visibility, but for doctors, it is also a high-risk space for ethical and legal exposure. Responsible, transparent, and well-regulated use - coupled with institutional preparedness against online defamation or misinformation - is essential to protect both patient interests and professional dignity. Increasingly, patients or their relatives use social media to vent their grievances, and false or exaggerated stories sometimes amount to defamation, cyber harassment, or misinformation. Common patterns include:
                                    </p>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Posting Allegations or Negative Reviews</h3>
                                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                            <li>Unverified or exaggerated claims about poor outcome, alleged negligence, rudeness, or cost issues on Facebook, X (Twitter), Google reviews, etc.</li>
                                            <li>Viral posts or videos naming doctors or hospitals can severely harm professional reputation.</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Posting Photos or Videos from Hospital Premises</h3>
                                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                            <li>Patients or attendants may secretly record doctors or hospital staff or unclean areas or any other aspect with ulterior motives and post clips out of context.</li>
                                            <li>This violates hospital privacy policies and may breach data protection and confidentiality laws.</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Misuse of Private Communications</h3>
                                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                            <li>Screenshots of private messages, prescriptions, or WhatsApp advice or recorded telephonic conversations shared publicly.</li>
                                            <li>AI distorted video recordings, shared in WA groups for motivated defamation</li>
                                            <li>Distorted information, out of context, amounting to breach of doctor–patient confidentiality.</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Organized Defamation or Online Harassment</h3>
                                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                            <li>Coordinated campaigns or trolling targeting a doctor or institution after an adverse outcome.</li>
                                            <li>Manipulation of facts with selected posts shared out of context</li>
                                            <li>May amount to criminal intimidation (Section 503 IPC), defamation (Section 499 IPC), or cyber harassment (IT Act Sections 66A/67).</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Managing Misuse - Response and Prevention Strategies</h2>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">A. Institutional & Preventive Measures</h3>
                                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                            <li><strong>Digital Communication Policy:</strong> Every hospital or clinic should adopt a clear social media policy defining permissible use, confidentiality rules, and grievance procedures.</li>
                                            <li><strong>Display Consent and Recording Policy:</strong> Patients should be clearly informed that recording or posting hospital activities without permission is prohibited.</li>
                                            <li><strong>Maintain Proper Documentation:</strong> Accurate and contemporaneous medical records are the strongest defence if an online allegation escalates legally.</li>
                                            <li><strong>Designate a spokesperson:</strong> All official responses should come through a single authorized spokesperson; doctors should refrain from individual replies. Even the spokesperson should be very tactful in responding, without any anger or intimidating tone & tenor.</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">B. When Misuse Occurs</h3>
                                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                            <li><strong>Avoid Direct Confrontation Online:</strong> Do not reply immediately or emotionally, or in public threads.</li>
                                            <li><strong>Take Screenshots and Preserve Evidence:</strong> Document the post, time, and URL; such evidence is admissible under the IT Act.</li>
                                            <li><strong>Report or Flag the Content:</strong> Use in-built mechanisms to report defamation, impersonation, or privacy violations on the platform.</li>
                                            <li><strong>Issue a Professional Clarification (if needed):</strong> Only through official or legal channels, in factual and restrained language.</li>
                                            <li><strong>Seek Legal Recourse:</strong> If the situation escalates
                                                <ul className="list-disc list-inside space-y-1 ml-6 mt-2">
                                                    <li>File a written complaint with the Cyber Crime Cell or local police for defamation or harassment.</li>
                                                    <li>In serious cases, pursue civil defamation proceedings or injunctions against defamatory posts.</li>
                                                </ul>
                                            </li>
                                            <li><strong>Engage Medical Associations:</strong> Organizations like IMA, or other professional bodies, can mediate or issue public clarifications when the reputation of the profession is at stake. They should also exert pressure on the authorities for prompt & proper action against the offender.</li>
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

