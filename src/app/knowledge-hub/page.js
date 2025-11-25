"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, ChevronDown, ChevronUp, Shield, Scale, Share2, Brain } from "lucide-react";
import Link from "next/link";

const knowledgeHubData = [
    {
        id: 1,
        title: "Golden Rules to Prevent & Manage Medical Litigations",
        icon: Shield,
        color: "blue",
        summary: "Comprehensive guidelines on ethical practice, communication, documentation, and legal response to prevent and manage medical litigations effectively.",
        content: `Medical litigation has emerged as a growing concern in modern clinical practice. While technological advances have greatly improved diagnosis and treatment, they have also increased patient expectations and scrutiny of medical care. Studies show that most medico-legal disputes do not necessarily arise from clinical incompetence or deficient treatment but from ethical and non-medical reasons.

**Prevention of Litigations**

1. **Ethical Medical Practice**
   - Treat every patient as your own friend or relative
   - Follow the standard of care without any extraneous considerations
   - Resort to participative treatment, involving the patient/family in decision making
   - Do not exaggerate benefits or trivialize risks
   - Observe sensitivity, empathy & compassion
   - Do no harm

2. **Respect Patient Dignity & Privacy**
   - Handle patients with sensitivity and respect
   - Provide care with human touch, not just mechanical treatment
   - Protect patient confidentiality and privacy

3. **Continuous Professional Development**
   - Attend CMEs, Seminars, Workshops regularly
   - Discuss standard Guidelines, Protocols & SOPs
   - Audit adverse events and near-misses
   - Encourage a "learning not blaming" culture

4. **Communication Skills**
   - Develop good verbal & non-verbal communication
   - Counsel patients at all stages of treatment
   - Use tactful honesty in all communications
   - Train staff on proper communication
   - Document all important communications

5. **Managing Complications**
   - Detect complications promptly
   - Share honestly with family
   - Treat properly as per guidelines
   - Seek second opinions when needed
   - Document everything thoroughly

6. **Medical Records**
   - Good documentation is your strongest defense
   - Each entry should be clear, dated, timed, factual
   - Focus on Initial Assessment, Progress notes, Operation notes
   - Consent process must be detailed and patient-specific
   - Never fabricate or manipulate records

**Management of Litigation**

1. **When You Receive Legal Notice**
   - Read carefully and analyze all allegations
   - Examine and secure medical records
   - Draft defense on each allegation
   - Consult medicolegal consultant/advocate
   - Inform your insurance company

2. **Selecting a Medicolegal Consultant**
   - Should be knowledgeable with good communication skills
   - Must have medical background or experience in medical cases
   - Should be easily accessible and willing to discuss
   - Fee should be reasonable

3. **Criminal Proceedings**
   - Don't panic if you receive police summons
   - Cooperate with authorities
   - Prepare written statement
   - Understand bail provisions
   - Seek proper legal counsel`,
    },
    {
        id: 2,
        title: "PC-PNDT Act: Pre-conception and Pre-natal Diagnostic Techniques",
        icon: Scale,
        color: "green",
        summary: "Understanding the PC-PNDT Act, 1994 - regulations, compliance requirements, violations, and legal consequences for healthcare providers.",
        content: `The Pre-conception and Pre-natal Diagnostic Techniques (Prohibition of Sex Selection) Act, 1994 (PC-PNDT Act) is a central legislation enacted to prevent female foeticide and regulate the use of diagnostic techniques.

**Key Provisions**

The Act prohibits:
- Use of any technique for sex determination of foetus
- Sex selection before or after conception
- Restricts prenatal diagnostic procedures to detect genetic/congenital abnormalities only

**Compliance Requirements**

1. **Registration**
   - All genetic counselling centres must be registered
   - All laboratories and ultrasound clinics need registration
   - Strict record-keeping and reporting requirements

2. **Record Maintenance**
   - Form F must be maintained properly
   - Consent forms required
   - Machine logs to be updated
   - Regular audits essential

**Detection of Violations**

Violations may be detected by:
- Appropriate Authority (District Magistrate/Civil Surgeon)
- Authorized Officer during inspection
- Complaints from any person/organization
- Routine audit of records

**Common Violations**
- Non-registration or misuse of ultrasound machine
- Deficiency in maintenance of records
- Advertisement for sex determination
- Communication of foetal sex

**Penalties**

| Offence | First Offence | Subsequent Offence |
|---------|--------------|-------------------|
| Sex selection/determination | Up to 3 years + ₹10,000 fine | Up to 5 years + ₹50,000 fine |
| Non-maintenance of records | Same as above | — |
| Advertising | Up to 3 years + ₹10,000 fine | — |
| Medical Council action | 5 years suspension | Permanent removal |

**Legal Process**

1. Inspection, Search and Seizure (Section 30)
2. Show-Cause Notice issued
3. Suspension/Cancellation of Registration
4. Filing of Complaint before Court
5. Trial as criminal case (cognizable, non-bailable, non-compoundable)

**Important Notes**
- Offences are cognizable, non-bailable and non-compoundable
- Medical Council may suspend registration for 5 years (first offence)
- Permanent removal on second offence
- Regular audits are essential for compliance`,
    },
    {
        id: 3,
        title: "Social Media in Healthcare: Guidelines & Precautions",
        icon: Share2,
        color: "purple",
        summary: "Ethical use of social media by healthcare professionals, patient privacy protection, and managing online defamation or misinformation.",
        content: `Social media has transformed healthcare communication, offering opportunities for health education and professional collaboration. However, it poses ethical, legal, and professional challenges.

**Proper and Ethical Use by Doctors**

1. **Professionalism and Ethics**
   - Maintain same standards online as in clinical practice
   - Avoid derogatory comments about patients/colleagues
   - Follow NMC Code of Ethics Regulations

2. **Confidentiality and Privacy**
   - NEVER share patient photos or clinical details
   - Obtain explicit written consent for de-identified material
   - Avoid discussing patients in public groups/WhatsApp

3. **Advertising Restrictions**
   - NMC prohibits soliciting patients through advertisements
   - Can display name, qualifications, registration number
   - Avoid comparative claims ("best", "guaranteed cure")
   - No paid endorsements or testimonials

4. **Online Consultations**
   - Follow Telemedicine Practice Guidelines (2020)
   - Ensure patient verification, consent, documentation
   - Avoid diagnosis via informal social media chats

**Prohibited Activities**

Doctors must NOT:
- Post patient-identifiable data without consent
- Make misleading advertising claims
- Offer consultations through informal chats
- Criticize patients/colleagues publicly
- Endorse unverified products
- Discuss ongoing legal cases publicly

**Educational Communication**

Doctors are encouraged to:
- Share evidence-based health awareness messages
- Cite authentic sources (WHO, CDC, ICMR)
- Use disclaimers: "For educational purposes only"

**Managing Misuse by Patients/Public**

**Common Patterns:**
- Negative reviews with unverified claims
- Viral posts/videos naming doctors
- Secret recordings posted out of context
- Screenshots of private communications shared publicly
- Coordinated defamation campaigns

**Response Strategies:**

**Preventive Measures:**
1. Adopt clear social media policy
2. Display consent and recording policy
3. Maintain proper documentation
4. Designate official spokesperson

**When Misuse Occurs:**
1. Avoid direct confrontation online
2. Take screenshots and preserve evidence
3. Report/flag the content on platform
4. Issue professional clarification through official channels
5. File complaint with Cyber Crime Cell if needed
6. Engage medical associations for support

**Legal Recourse:**
- Criminal intimidation (Section 503 IPC)
- Defamation (Section 499 IPC)
- Cyber harassment (IT Act Sections 66A/67)
- Civil defamation proceedings
- Injunctions against defamatory posts`,
    },
    {
        id: 4,
        title: "AI in Healthcare: Responsible Use & Medicolegal Precautions",
        icon: Brain,
        color: "orange",
        summary: "Guidelines for safe and ethical use of Artificial Intelligence in healthcare, maintaining clinical autonomy, and understanding liability issues.",
        content: `Artificial Intelligence (AI) in healthcare uses algorithms, machine learning, and data analytics to assist in diagnosis, treatment planning, and patient monitoring. Responsible use is essential.

**Fundamental Principles**

1. **Use AI as Support, Not Substitute**
   - Treat AI as decision-support tool, not final decision
   - AI should not replace Human Intelligence
   - Doctor remains primary decision-maker
   - Validate AI suggestions with clinical findings

2. **Verify Source and Approval**
   - Use only AI tools cleared by CDSCO, FDA, or CE-marked
   - Avoid unverified consumer-grade applications
   - Maintain records of software version and approval

3. **Understand Limitations**
   - Know what the AI tool is designed to do
   - Be aware of data limitations and biases
   - Document any manual override with justification

4. **Maintain Transparency**
   - Inform patients when AI tools are used
   - Explain that final interpretation rests with doctor
   - Obtain informed consent where required

5. **Data Privacy and Security**
   - Ensure data is de-identified and stored securely
   - Comply with Digital Personal Data Protection Act, 2023
   - Avoid uploading to unauthorized cloud platforms
   - Regular security updates essential

**Medicolegal Precautions**

1. **Clinical Autonomy**
   - Never rely solely on AI output
   - Courts hold human clinician accountable, not software
   - Always record: "AI tool X used; results reviewed by Dr. ___"

2. **Documentation Requirements**
   - Record AI system used (name, version, date)
   - Document output obtained
   - Note clinician's independent assessment
   - Record final decision

3. **Avoid Overdependence**
   - Don't claim "AI-based superior diagnosis"
   - Over-reliance may be deficiency in service
   - Exaggerated claims = misrepresentation

4. **Institutional Responsibility**
   - Maintain AI governance policies
   - Ensure systems are validated and audited
   - Train staff on safe use
   - Clear chain of accountability

5. **Ethical Principles**
   - **Beneficence**: AI must improve outcomes
   - **Non-maleficence**: Prevent harm from bias/errors
   - **Autonomy**: Respect patient's right to know
   - **Justice**: Ensure equitable access

**Common Pitfalls to Avoid**

❌ Using free online AI tools without validation
❌ Blindly trusting AI-generated diagnosis
❌ Failing to document clinical reasoning
❌ Sharing patient images without anonymization
❌ Making claims like "AI-verified diagnosis"

**Key Takeaways**

✅ AI enhances care but doesn't replace clinical judgment
✅ Doctor's accountability remains central
✅ Transparency and documentation are essential
✅ Follow regulatory guidelines strictly
✅ Maintain patient privacy and data security

**Remember**: Artificial Intelligence should serve as a clinical assistant, not an autonomous decision-maker. The doctor's ethical judgment, compassion, and accountability remain central to safe practice.`,
    },
];

export default function KnowledgeHubPage() {
    const { data: session } = useSession();
    const [expandedTopic, setExpandedTopic] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const handleTopicClick = (topicId) => {
        if (!session) {
            setShowLoginModal(true);
            return;
        }
        setExpandedTopic(expandedTopic === topicId ? null : topicId);
    };

    const getIconColor = (color) => {
        const colors = {
            blue: "text-blue-600 bg-blue-500/10",
            green: "text-green-600 bg-green-500/10",
            purple: "text-purple-600 bg-purple-500/10",
            orange: "text-orange-600 bg-orange-500/10",
        };
        return colors[color] || colors.blue;
    };

    return (
        <main className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-background border-b border-foreground/10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(196,248,42,0.08),transparent_50%)]" />

                <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 py-12 md:py-20 lg:px-16">
                    <div className="text-center">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-xs md:text-sm font-semibold uppercase tracking-[0.3em] text-foreground/60 mb-4"
                        >
                            Empowering Safe Practice Through Knowledge
                        </motion.p>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-medium"
                        >
                            <span className="bg-gradient-to-r from-[hsl(var(--contact-gradient-from))] to-[hsl(var(--contact-gradient-to))] bg-clip-text text-transparent">
                                Knowledge
                            </span>{" "}
                            Hub
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="mt-6 max-w-2xl mx-auto text-sm md:text-base text-foreground/70 leading-relaxed"
                        >
                            Essential medicolegal information and guidelines for healthcare professionals.
                            {!session && (
                                <span className="block mt-2 text-primary-foreground font-medium">
                                    Register to access detailed content.
                                </span>
                            )}
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Topics Section */}
            <section className="relative overflow-hidden bg-background py-12">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(196,248,42,0.05),transparent_50%)]" />

                <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
                    <div className="space-y-4">
                        {knowledgeHubData.map((topic, index) => {
                            const Icon = topic.icon;
                            const isExpanded = expandedTopic === topic.id;

                            return (
                                <motion.div
                                    key={topic.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="rounded-2xl border border-foreground/10 bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                                >
                                    {/* Topic Header - Always Visible */}
                                    <button
                                        onClick={() => handleTopicClick(topic.id)}
                                        className="w-full p-6 md:p-8 text-left hover:bg-foreground/5 transition-colors"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${getIconColor(topic.color)}`}>
                                                <Icon className="h-6 w-6" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div>
                                                        <h3 className="text-lg md:text-xl font-medium text-foreground mb-2">
                                                            {topic.title}
                                                        </h3>
                                                        <p className="text-sm text-foreground/70 leading-relaxed">
                                                            {topic.summary}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-2 shrink-0">
                                                        {!session && (
                                                            <Lock className="h-5 w-5 text-foreground/40" />
                                                        )}
                                                        {session && (
                                                            isExpanded ? (
                                                                <ChevronUp className="h-5 w-5 text-foreground/60" />
                                                            ) : (
                                                                <ChevronDown className="h-5 w-5 text-foreground/60" />
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </button>

                                    {/* Topic Content - Only for Registered Users */}
                                    <AnimatePresence>
                                        {isExpanded && session && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-foreground/10">
                                                    <div className="prose prose-sm md:prose-base max-w-none mt-6">
                                                        <div className="whitespace-pre-line text-foreground/80 leading-relaxed">
                                                            {topic.content}
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Login Modal */}
            <AnimatePresence>
                {showLoginModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowLoginModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl"
                        >
                            <div className="text-center">
                                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground/10 mb-4">
                                    <Lock className="h-8 w-8 text-primary-foreground" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-medium text-foreground mb-3">
                                    Login Required
                                </h3>
                                <p className="text-sm md:text-base text-foreground/70 mb-6">
                                    Please register or login to access detailed content from our Knowledge Hub.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Link
                                        href="/user/auth?mode=register"
                                        className="flex-1 inline-flex items-center justify-center rounded-full border-2 border-primary-foreground px-6 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary-foreground hover:text-primary"
                                    >
                                        Register
                                    </Link>
                                    <Link
                                        href="/user/auth"
                                        className="flex-1 inline-flex items-center justify-center rounded-full bg-primary-foreground px-6 py-3 text-sm font-medium text-primary shadow-lg shadow-primary-foreground/20 transition hover:shadow-xl hover:scale-105"
                                    >
                                        Login
                                    </Link>
                                </div>
                                <button
                                    onClick={() => setShowLoginModal(false)}
                                    className="mt-4 text-sm text-foreground/60 hover:text-foreground underline"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
