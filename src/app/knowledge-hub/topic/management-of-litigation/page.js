"use client";

import Link from "next/link";

export default function ManagementOfLitigationPage() {
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
                        Management of Litigation
                    </h1>
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                        Comprehensive guidance on managing legal proceedings when facing medical litigation
                    </p>
                </div>
            </section>

            <section className="py-12 md:py-16">
                <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-16 space-y-8">
                    <div className="prose prose-lg max-w-none">
                        <div className="space-y-6 text-gray-700 leading-relaxed">
                            <p className="text-base md:text-lg">
                                Comprehensive guidance on managing legal proceedings when facing medical litigation, including legal notices, consumer court cases, police summons, FIR, and criminal proceedings. This section covers strategies for responding to legal notices, consumer court complaints, selecting medicolegal consultants/advocates, handling police summons, and understanding FIR & criminal proceedings including bail provisions.
                            </p>
                        </div>

                        <div className="mt-12 space-y-10">
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6">1. When you receive a legal notice</h2>
                                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                    <li>Read the notice carefully and jot down all the allegations. Analyse the allegations</li>
                                    <li>Examine & secure the medical records & look for gaps, if any</li>
                                    <li>Write down your defence on each allegation</li>
                                    <li>Consult your medicolegal consultant/advocate and then decide about the reply</li>
                                    <li>Formally inform your insurance company, which has indemnified you</li>
                                </ul>
                                <p className="text-gray-700 mt-3 ml-4">
                                    In short, never reply in haste. Your first response to the complaint is crucial. It forms the foundation of your defence throughout the court proceedings. Legal notices must be answered with a record-based, factual reply after reviewing all documentation. Avoid emotional language. Ensure your narrative is consistent and supported by notes
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6">2. When you receive the notice from the Consumer Court</h2>
                                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                    <li>Read the complaint carefully, identify all the allegations, and analyse each of them</li>
                                    <li>Examine & secure the medical records & look for gaps, if any</li>
                                    <li>Do medical research on contentious issues (standard guidelines & protocols on relevant issues)</li>
                                    <li>Write down your defence on each allegation</li>
                                    <li>Formally inform your insurance company, which has indemnified you, if not already done</li>
                                    <li>Consult your medicolegal consultant/advocate</li>
                                    <li>Prepare the strategy of defence in discussion with the medicolegal consultant/advocate</li>
                                    <li>Let the medicolegal consultant/advocate prepare the Reply to the complaint and send it to you for your inputs</li>
                                    <li>Vet the reply and discuss with the medicolegal consultant/advocate, before he finalizes the reply for submission</li>
                                    <li>Remain in the driver&apos;s seat & don&apos;t leave the task exclusively to the medicolegal consultant/advocate</li>
                                    <li>Try to attend important hearings of your case in the court and keep track of the status of the proceedings, the next date of hearing, and the further plan</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6">3. How to select a medicolegal consultant/advocate for your defence</h2>
                                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                    <li>Don&apos;t be tempted to select a medicolegal consultant/advocate merely because he is a friend or has been your patient or is likely to do it free of charge</li>
                                    <li>The main consideration should be (i) he should be knowledgeable (ii) he should have good communication and drafting skills (iii) he should have a medical background or must have done good number of medical negligence cases successfully (iv) he should be easily accessible (v) he should be willing to discuss the case with you frequently (vi) he should be amenable to listen to your suggestions/ambiguities/apprehensions and address them logically (vi) Fee should be reasonable</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6">4. When you receive a summons from the police</h2>
                                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                    <li>Don&apos;t panic. The police officer might come personally or call you on the phone</li>
                                    <li>Make him sit in your office and talk to him softly but with confidence. Ask about the details of the complaint and the complainant</li>
                                    <li>Seek a copy of the complaint</li>
                                    <li>Cooperate with him (i) attend his calls (ii) appear if he asks you to come to submit your statement (iii) it is better to prepare a written statement & take it along as a reference to dictate your statement as he writes (iv) if he seeks the medical records in writing, give the particular records that he is seeking (generally it is the Discharge/Death summary that he seeks initially) (v) in case you need some time for submission, request for 1-2 days for completing the records.</li>
                                    <li>As part of the preliminary enquiry, he will refer the matter to a medical board (through the Civil surgeon or State medical council). If he is not aware of this, you may refer to the Supreme Court guidelines in the Jacob Mathew case and guide him</li>
                                    <li>Only if the medical board prima facie holds that there was gross medical negligence or recklessness, further criminal proceedings can go on. The police or the complainant can seek a second medical opinion if not satisfied, but without such a decision of the medical board, criminal proceedings cannot go on. If you are not satisfied with the District Medical Board&apos;s opinion, you can also seek another opinion from the State Medical Council</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6">5. FIR & Criminal Proceedings</h2>
                                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                    <li>If the medical board has opined that there was gross medical negligence or recklessness, the police will register the FIR and proceed further. Now the question of bail & quashing of FIR arises. Section 106 of BNS 2023 is a bailable offence related to death due to negligence. In a bailable offence, bail is given as a matter of right, and it may be given by the police officer himself. For instances of hurt/grievous hurt not resulting in death (Section 125 of BNS 2023), again, these are bailable offences. In case the FIR is under the offence of Culpable Homicide not amounting to murder (Section 105 of BNS 2023), it is a Non-Bailable Offence in which the Court has to be approached for Anticipatory Bail or regular bail, as required. In a Bailable offence, anticipatory bail is not required.</li>
                                    <li>If you wish to seek quashing of the FIR, the High Court (or, rarely under exceptional circumstances Supreme Court under Article 132 or 142 of the Constitution) will need to be moved. High Court uses inherent powers under S. 482 CrPC (now S. 528 of BNSS 2023) for this purpose. The High Court&apos;s power under this section is extraordinary and discretionary, to be used sparingly and with caution, and only to prevent abuse of the legal process or to secure the ends of justice.</li>
                                    <li>The defence in criminal medical negligence will need deep scrutiny of each aspect of the case. The medical aspects will need the support of a medicolegal consultant. However, for the technical law points and the oratory skills in the court, a competent advocate will be required.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

