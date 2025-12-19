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
                <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-16 space-y-12">
                    <div className="prose prose-lg max-w-none">
                        {/* Introduction */}
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

                        {/* Healthcare Risk Prevention */}
                        <div className="mt-16">
                            <h2 className="text-3xl font-semibold text-gray-900 mb-6 pb-3 border-b-2 border-gray-300">
                                Healthcare Risk Prevention
                            </h2>
                            <p className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
                                Prevention of litigations through ethical medical practice, respect for patient dignity, continuous professional development, effective communication, proper documentation, and proactive risk management.
                            </p>

                            <div className="space-y-10">
                                <div>
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">1. Ethical medical practice</h3>
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
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">2. Respect Patient Dignity & Privacy</h3>
                                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                        <li>A human being in trouble has come for help. He deserves to be handled with sensitivity and respect.</li>
                                        <li>Mechanical care without human touch compromises the patient&apos;s trust in the treating team. Remember that doctors are not mere technicians.</li>
                                        <li>Sensitivity & empathy help to increase the confidence & will-power of the patient and his trust in the doctor</li>
                                        <li>Patient discloses his personal details to the care providers, in good faith. Their confidentiality & privacy are the basic requirements of healthcare service, and they ought to be protected</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">3. Continuous Professional Development and Quality Improvement</h3>
                                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                        <li>Attend CMEs, Seminars, Workshops, and medico-legal awareness programs regularly. Participate in them actively – to learn or to contribute to knowledge sharing</li>
                                        <li>Discuss the standard Guidelines, Protocols & SOPs, etc, in the hospital or departmental clinical meetings</li>
                                        <li>Audit adverse events, near-misses, and complaints to strengthen systems.</li>
                                        <li>Encourage a &quot;learning, not blaming&quot; culture within your institution.</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">4. Communication skills</h3>
                                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                        <li>Inculcate good verbal & non-verbal communication skills</li>
                                        <li>Counsel the patient/family members at all stages of treatment & care so that they actually participate in decision making</li>
                                        <li>Counselling should be done by the treating consultant or a senior team member, especially for discussing adverse events or breaking bad news</li>
                                        <li>Tactful honesty should be resorted to in all communications</li>
                                        <li>Train your staff on proper communication skills so that your staff does not negate the impact of your efforts with the patient/family members</li>
                                        <li>Document all important communications</li>
                                        <li>Use soft and simple language, with good listening skills. Avoid medical jargon with patients. Do not make tall promises or guarantees of results</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">5. Second opinion & referral</h3>
                                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                        <li>Be liberal in second opinions and referrals, in case of need.</li>
                                        <li>Do not ignore/reject the request of the patient for the choice of a particular doctor/hospital for such an opinion/referral</li>
                                        <li>Discuss the contentious issue with the visiting consultant and explain the details to the patient/family</li>
                                        <li>See that the second opinion is documented, as well as the plan of further care</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">6. Managing Complications</h3>
                                    <p className="text-gray-700 mb-3">
                                        Complications can happen even in the best hands. What matters is how you respond. Complications during the course of medical/surgical treatment may be anticipated or may happen unexpectedly. It does not always mean medical negligence. The courts are well aware of this. Complications can occur due to several factors, which may be related to the disease process itself or the patient&apos;s aberrant body response, or unexplained reasons, besides the possibility of a deficiency of treatment & care. The courts tend to differentiate medical negligence from other reasons. What should be done to convince the court that there was no negligence in managing the complication? Some points to remember are:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                        <li>Adequate assessment, evaluation of the patient, and due precautions were taken in the treatment & care, as per standard guidelines. This is particularly important for taking due precautions & preparations in the pre-operative period of a surgical patient.</li>
                                        <li>The treatment/procedure was conducted, as per standard guidelines</li>
                                        <li>When a complication occurs, it is detected promptly, shared with the family, and treated promptly & properly</li>
                                        <li>Honest (but tactful) communication with the family means sharing what has happened, its possible causes, the further plan of care, and the probable prognosis.</li>
                                        <li>The communication should be made directly by the treating consultant rather than a junior member of the team, even if (in odd circumstances) the communication happens physically or virtually</li>
                                        <li>The evaluation & treatment of the complication should be done as per standard guidelines</li>
                                        <li>Second opinions, if required, should be done promptly from the proper specialist. If the family has a different choice of the referral consultant, respect their choice after adequate counselling</li>
                                        <li>Referral to another hospital, if required, should be done promptly and to a proper facility and in a proper manner. If the family has a different choice of the hospital, respect their choice after adequate counselling.</li>
                                        <li>All the important aspects should be properly documented</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">7. Critical Patient Transfer Protocol</h3>
                                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                        <li>If the critical patient needs to be transferred to another hospital, discuss with the family, respect their choice of the hospital, after proper counselling</li>
                                        <li>Referral in time to a proper facility after discussing with the destination hospital for the availability of the ICU bed & the relevant consultant, depending upon the facts & circumstances of the case</li>
                                        <li>Transfer in a well-equipped ACLS ambulance with one (or preferably two) qualified escorts, depending upon the facts & circumstances of the case</li>
                                        <li>Proper documented handover at the start & at the destination of the journey</li>
                                        <li>Proper documented monitoring during the journey</li>
                                        <li>Prepare the detailed transfer report and annex it to the patient file, on return.</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">8. Medical Records</h3>
                                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                        <li>Good documentation is your strongest medicolegal defence. Courts value the medical records as credible evidence unless they are manipulated or fabricated. These records are created by the doctors in their language and are kept in their custody. There is no reason, therefore, to neglect them. If your medical records are poor, your legal defence will be poor. If an important contention is not reflected in the medical records, it will be presumed that it was not done/improperly done, as the case may be. The medical records should be carefully & legibly written or entered in EMR. Each entry should be clear, dated, timed, factual, and contemporaneous. Avoid abbreviations that are not standard. Medical records should reflect the care provided, in support of your defence. Accurate medical records and proper consent are the strongest pillars of medicolegal safety.</li>
                                        <li>Focus particularly on the Initial Assessment record, Progress notes, Informed Consent, Operation/procedure notes, Anaesthesia notes, Discharge/Death/Referral summary. Estimate sheets, counselling sheets, mortality notes, referral notes, and nursing charts are other important records to be prepared very carefully.</li>
                                        <li>Consent process should be taken seriously, as consent is the most common contentious issue in medical litigation. It should follow a detailed counselling process by a responsible member of the treating team. The consent document should be patient-specific, doctor (team) specific, procedure specific, with mention of the expected benefits and the common risks of the procedure and signatures (with name, date & time) at the correct places of the patient (if competent) or his kin (if patient is not competent), of two witnesses and the doctor who had counselled him. There should be no blank spaces. Important aspects may be handwritten, endorsed by the consent giver.</li>
                                        <li>OPD prescriptions should be complete and legibly written. Retain an office copy</li>
                                        <li>Bills & receipts should be issued as a routine</li>
                                        <li>Transfer notes (internal & external transfers) must be well documented</li>
                                        <li>All notes must have a recognizable signature, date & time</li>
                                        <li>Never fabricate/manipulate medical records</li>
                                        <li>Never issue false medical certificates</li>
                                        <li>Be very careful with the statutory documentation related to PNDT, MTP, ART & THOTA Acts and strictly follow the guidelines</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">9. Schedule of hospital charges</h3>
                                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                        <li>High charges with liberal discounts are a good policy, as compared to low charges with high volumes.</li>
                                        <li>Transparency in documented estimates & billing is mandatory</li>
                                        <li>Always issue the hospital bill & receipt</li>
                                        <li>Discount should be initiated with an application from the patient/family</li>
                                        <li>Discount (on compassionate grounds) should be mentioned in the billing</li>
                                        <li>In case of complementary discounts, also, a proper bill should be generated, and the discount (on a complementary basis) mentioned</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">10. Proper Indemnity Insurance</h3>
                                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                        <li>Select the company carefully. Negotiation in a group can be useful</li>
                                        <li>Option for an adequate Sum Insured with proper AOA & AOY</li>
                                        <li>Maintain continuity of indemnity by timely renewals</li>
                                        <li>Formal intimation on receiving a legal notice or a court notice</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">11. Adverse Events</h3>
                                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                        <li>Accept that adverse events can occur during the treatment of patients</li>
                                        <li>Analyse it and tactfully communicate with the patient/family about what it is, what the possible factors led to it, what is the plan of care and what is the likely prognosis</li>
                                        <li>Document the event as well as the communication</li>
                                        <li>Audit all cases of serious adverse events</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">12. Proper Grievance Redressal</h3>
                                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                        <li>Most of the grievances arise from the lack of understanding about the protocols and communication gaps, rather than from the doctor&apos;s lack of competence or skills</li>
                                        <li>The grievances can be resolved better if an effort is made at the initial stage itself, and if done by the team leader himself, rather than a junior member of the team</li>
                                        <li>If the grievances are serious or prolonged, the formal grievance redressal mechanism of the hospital should be activated to resolve them.</li>
                                        <li>If professional bodies at the district level have a grievance redressal mechanism in place, that may be activated</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">13. Hospital Violence</h3>
                                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                        <li>Hospital violence is a growing concern. It should be prevented, if possible, anticipated when it can, and prudently handled under all circumstances.</li>
                                        <li>Good communication skills, frequent counselling, and a sensitive attitude generally help in preventing hospital violence.</li>
                                        <li>In vulnerable situations, anticipate trouble and alert the hospital security or the district administration, depending on the circumstances.</li>
                                        <li>During incidents of violence, prioritize safety, inform the fraternity, and try to collect in numbers. Communicate through a spokesperson. Call the hospital security and police immediately.</li>
                                        <li>A special App for alerts on historically black-listed persons and as a signal for collecting at the ground zero, can be very useful</li>
                                        <li>Document events, witnesses, and all communication</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">14. Responsible professional bodies</h3>
                                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                        <li>Measures to improve the doctor-patient relationship need to be planned & executed seriously & urgently by the professional bodies like the IMA</li>
                                        <li>Create collective Grievance redressal mechanisms for nursing homes/clinics, etc., in each city</li>
                                        <li>Build a rapport with the District Administration (for Branch level bodies) and the Governments (for state & National level bodies)</li>
                                        <li>Arrange medicolegal help by way of issuing case-specific, well-drafted expert opinions for the members in case of need</li>
                                        <li>Develop mechanisms for preventing/anticipating/handling hospital violence</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Healthcare Risk Management */}
                        <div className="mt-16">
                            <h2 className="text-3xl font-semibold text-gray-900 mb-6 pb-3 border-b-2 border-gray-300">
                                Healthcare Risk Management
                            </h2>
                            <p className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
                                Effective management of healthcare risks through systematic approaches to prevent, anticipate, and respond to medicolegal challenges. This section focuses on proper documentation, consent processes, managing complications, critical patient transfers, schedule of hospital charges, adverse events handling, grievance redressal mechanisms, and hospital violence management.
                            </p>

                            <div className="space-y-10">
                                <div>
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">Managing Complications</h3>
                                    <p className="text-gray-700 mb-3">
                                        Complications can happen even in the best hands. What matters is how you respond. Complications during the course of medical/surgical treatment may be anticipated or may happen unexpectedly. It does not always mean medical negligence. The courts are well aware of this. Complications can occur due to several factors, which may be related to the disease process itself or the patient&apos;s aberrant body response, or unexplained reasons, besides the possibility of a deficiency of treatment & care. The courts tend to differentiate medical negligence from other reasons. What should be done to convince the court that there was no negligence in managing the complication? Some points to remember are:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                        <li>Adequate assessment, evaluation of the patient, and due precautions were taken in the treatment & care, as per standard guidelines. This is particularly important for taking due precautions & preparations in the pre-operative period of a surgical patient.</li>
                                        <li>The treatment/procedure was conducted, as per standard guidelines</li>
                                        <li>When a complication occurs, it is detected promptly, shared with the family, and treated promptly & properly</li>
                                        <li>Honest (but tactful) communication with the family means sharing what has happened, its possible causes, the further plan of care, and the probable prognosis.</li>
                                        <li>The communication should be made directly by the treating consultant rather than a junior member of the team, even if (in odd circumstances) the communication happens physically or virtually</li>
                                        <li>The evaluation & treatment of the complication should be done as per standard guidelines</li>
                                        <li>Second opinions, if required, should be done promptly from the proper specialist. If the family has a different choice of the referral consultant, respect their choice after adequate counselling</li>
                                        <li>Referral to another hospital, if required, should be done promptly and to a proper facility and in a proper manner. If the family has a different choice of the hospital, respect their choice after adequate counselling.</li>
                                        <li>All the important aspects should be properly documented</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">Critical Patient Transfer Protocol</h3>
                                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                        <li>If the critical patient needs to be transferred to another hospital, discuss with the family, respect their choice of the hospital, after proper counselling</li>
                                        <li>Referral in time to a proper facility after discussing with the destination hospital for the availability of the ICU bed & the relevant consultant, depending upon the facts & circumstances of the case</li>
                                        <li>Transfer in a well-equipped ACLS ambulance with one (or preferably two) qualified escorts, depending upon the facts & circumstances of the case</li>
                                        <li>Proper documented handover at the start & at the destination of the journey</li>
                                        <li>Proper documented monitoring during the journey</li>
                                        <li>Prepare the detailed transfer report and annex it to the patient file, on return.</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">Medical Records & Documentation</h3>
                                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                        <li>Good documentation is your strongest medicolegal defence. Courts value the medical records as credible evidence unless they are manipulated or fabricated. These records are created by the doctors in their language and are kept in their custody. There is no reason, therefore, to neglect them. If your medical records are poor, your legal defence will be poor. If an important contention is not reflected in the medical records, it will be presumed that it was not done/improperly done, as the case may be. The medical records should be carefully & legibly written or entered in EMR. Each entry should be clear, dated, timed, factual, and contemporaneous. Avoid abbreviations that are not standard. Medical records should reflect the care provided, in support of your defence. Accurate medical records and proper consent are the strongest pillars of medicolegal safety.</li>
                                        <li>Focus particularly on the Initial Assessment record, Progress notes, Informed Consent, Operation/procedure notes, Anaesthesia notes, Discharge/Death/Referral summary. Estimate sheets, counselling sheets, mortality notes, referral notes, and nursing charts are other important records to be prepared very carefully.</li>
                                        <li>Consent process should be taken seriously, as consent is the most common contentious issue in medical litigation. It should follow a detailed counselling process by a responsible member of the treating team. The consent document should be patient-specific, doctor (team) specific, procedure specific, with mention of the expected benefits and the common risks of the procedure and signatures (with name, date & time) at the correct places of the patient (if competent) or his kin (if patient is not competent), of two witnesses and the doctor who had counselled him. There should be no blank spaces. Important aspects may be handwritten, endorsed by the consent giver.</li>
                                        <li>OPD prescriptions should be complete and legibly written. Retain an office copy</li>
                                        <li>Bills & receipts should be issued as a routine</li>
                                        <li>Transfer notes (internal & external transfers) must be well documented</li>
                                        <li>All notes must have a recognizable signature, date & time</li>
                                        <li>Never fabricate/manipulate medical records</li>
                                        <li>Never issue false medical certificates</li>
                                        <li>Be very careful with the statutory documentation related to PNDT, MTP, ART & THOTA Acts and strictly follow the guidelines</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">Schedule of Hospital Charges</h3>
                                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                        <li>High charges with liberal discounts are a good policy, as compared to low charges with high volumes.</li>
                                        <li>Transparency in documented estimates & billing is mandatory</li>
                                        <li>Always issue the hospital bill & receipt</li>
                                        <li>Discount should be initiated with an application from the patient/family</li>
                                        <li>Discount (on compassionate grounds) should be mentioned in the billing</li>
                                        <li>In case of complementary discounts, also, a proper bill should be generated, and the discount (on a complementary basis) mentioned</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">Adverse Events Management</h3>
                                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                        <li>Accept that adverse events can occur during the treatment of patients</li>
                                        <li>Analyse it and tactfully communicate with the patient/family about what it is, what the possible factors led to it, what is the plan of care and what is the likely prognosis</li>
                                        <li>Document the event as well as the communication</li>
                                        <li>Audit all cases of serious adverse events</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">Proper Grievance Redressal</h3>
                                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                        <li>Most of the grievances arise from the lack of understanding about the protocols and communication gaps, rather than from the doctor&apos;s lack of competence or skills</li>
                                        <li>The grievances can be resolved better if an effort is made at the initial stage itself, and if done by the team leader himself, rather than a junior member of the team</li>
                                        <li>If the grievances are serious or prolonged, the formal grievance redressal mechanism of the hospital should be activated to resolve them.</li>
                                        <li>If professional bodies at the district level have a grievance redressal mechanism in place, that may be activated</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">Hospital Violence Management</h3>
                                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                        <li>Hospital violence is a growing concern. It should be prevented, if possible, anticipated when it can, and prudently handled under all circumstances.</li>
                                        <li>Good communication skills, frequent counselling, and a sensitive attitude generally help in preventing hospital violence.</li>
                                        <li>In vulnerable situations, anticipate trouble and alert the hospital security or the district administration, depending on the circumstances.</li>
                                        <li>During incidents of violence, prioritize safety, inform the fraternity, and try to collect in numbers. Communicate through a spokesperson. Call the hospital security and police immediately.</li>
                                        <li>A special App for alerts on historically black-listed persons and as a signal for collecting at the ground zero, can be very useful</li>
                                        <li>Document events, witnesses, and all communication</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Management of Litigation */}
                        <div className="mt-16">
                            <h2 className="text-3xl font-semibold text-gray-900 mb-6 pb-3 border-b-2 border-gray-300">
                                Management of Litigation
                            </h2>
                            <p className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
                                Comprehensive guidance on managing legal proceedings when facing medical litigation, including legal notices, consumer court cases, police summons, FIR, and criminal proceedings. This section covers strategies for responding to legal notices, consumer court complaints, selecting medicolegal consultants/advocates, handling police summons, and understanding FIR & criminal proceedings including bail provisions.
                            </p>

                            <div className="space-y-10">
                                <div>
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">1. When you receive a legal notice</h3>
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
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">2. When you receive the notice from the Consumer Court</h3>
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
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">3. How to select a medicolegal consultant/advocate for your defence</h3>
                                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                        <li>Don&apos;t be tempted to select a medicolegal consultant/advocate merely because he is a friend or has been your patient or is likely to do it free of charge</li>
                                        <li>The main consideration should be (i) he should be knowledgeable (ii) he should have good communication and drafting skills (iii) he should have a medical background or must have done good number of medical negligence cases successfully (iv) he should be easily accessible (v) he should be willing to discuss the case with you frequently (vi) he should be amenable to listen to your suggestions/ambiguities/apprehensions and address them logically (vi) Fee should be reasonable</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">4. When you receive a summons from the police</h3>
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
                                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">5. FIR & Criminal Proceedings</h3>
                                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                        <li>If the medical board has opined that there was gross medical negligence or recklessness, the police will register the FIR and proceed further. Now the question of bail & quashing of FIR arises. Section 106 of BNS 2023 is a bailable offence related to death due to negligence. In a bailable offence, bail is given as a matter of right, and it may be given by the police officer himself. For instances of hurt/grievous hurt not resulting in death (Section 125 of BNS 2023), again, these are bailable offences. In case the FIR is under the offence of Culpable Homicide not amounting to murder (Section 105 of BNS 2023), it is a Non-Bailable Offence in which the Court has to be approached for Anticipatory Bail or regular bail, as required. In a Bailable offence, anticipatory bail is not required.</li>
                                        <li>If you wish to seek quashing of the FIR, the High Court (or, rarely under exceptional circumstances Supreme Court under Article 132 or 142 of the Constitution) will need to be moved. High Court uses inherent powers under S. 482 CrPC (now S. 528 of BNSS 2023) for this purpose. The High Court&apos;s power under this section is extraordinary and discretionary, to be used sparingly and with caution, and only to prevent abuse of the legal process or to secure the ends of justice.</li>
                                        <li>The defence in criminal medical negligence will need deep scrutiny of each aspect of the case. The medical aspects will need the support of a medicolegal consultant. However, for the technical law points and the oratory skills in the court, a competent advocate will be required.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
