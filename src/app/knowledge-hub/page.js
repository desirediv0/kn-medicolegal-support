"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { FileText, Download } from "lucide-react";

const coreTopics = [
    {
        title: "Golden Rules for Doctors & Hospitals",
        slug: "golden-rules-for-doctors-and-hospitals",
        body: [
            "Healthcare is no longer a 'bed of roses'. It is associated with significant risk to doctors, staff, and equipment. Prudence demands that such risks be prevented, anticipated, and managed properly to maintain the dignity & grace of medical practice and for the safety of doctors, staff & equipment.",
            "Medical litigation has emerged as a growing concern in modern clinical practice, following the inclusion of medical services under the purview of the Consumer Protection Act, 1986, as per a Supreme Court order in 1995, and reinforced by the enactment of the new Consumer Protection Act in 2019.",
            "Presented below are Golden Rules to prevent and effectively manage medical litigations. The principles emphasize empathetic communication, comprehensive informed consent, meticulous documentation, adherence to clinical standards, teamwork, and transparent handling of adverse events.",
        ],
    },
    {
        title: "Healthcare Risk Prevention",
        slug: "healthcare-risk-prevention",
        body: [
            "Prevention of litigations through ethical medical practice, respect for patient dignity, continuous professional development, effective communication, proper documentation, and proactive risk management.",
            "Key focus areas include ethical practice, patient dignity & privacy, continuous professional development, communication skills, second opinions & referrals, managing complications, critical patient transfer protocols, medical records, proper indemnity insurance, adverse events management, grievance redressal, and hospital violence prevention.",
        ],
    },
    {
        title: "Healthcare Risk Management",
        slug: "healthcare-risk-management",
        body: [
            "Effective management of healthcare risks through systematic approaches to prevent, anticipate, and respond to medicolegal challenges.",
            "Focuses on proper documentation, consent processes, managing complications, critical patient transfers, schedule of hospital charges, adverse events handling, grievance redressal mechanisms, and hospital violence management.",
        ],
    },
    {
        title: "Management of Litigation",
        slug: "management-of-litigation",
        body: [
            "Comprehensive guidance on managing legal proceedings when facing medical litigation, including legal notices, consumer court cases, police summons, FIR, and criminal proceedings.",
            "Covers strategies for responding to legal notices, consumer court complaints, selecting medicolegal consultants/advocates, handling police summons, and understanding FIR & criminal proceedings including bail provisions.",
        ],
    },
];

const actsData = [
    {
        title: "Consumer Protection Act, 2019",
        year: "2019",
        description:
            "Rights, redressal forums, and standards for services (including healthcare). Defines deficiency in service and consumer remedies.",
        pdfPath: "https://desirediv-storage.blr1.cdn.digitaloceanspaces.com/KN%20Medicolegal%20Support/CPA%202019.pdf",
    },
    {
        title: "Medical Termination of Pregnancy (Amendment) Act, 2021",
        year: "2021",
        description:
            "Regulates medical termination with updated gestation limits, provider qualifications, and consent requirements.",
        pdfPath: "https://desirediv-storage.blr1.cdn.digitaloceanspaces.com/KN%20Medicolegal%20Support/MTP%20Amendment%20Act%202021.pdf",
    },
    {
        title: "Pre-Conception & Pre-Natal Diagnostic Techniques Act, 1994 (PC-PNDT Act)",
        year: "1994",
        description:
            "Prohibits sex selection; regulates diagnostic techniques; mandates registration, record-keeping, and penalties for violations.",
        pdfPath: "https://desirediv-storage.blr1.cdn.digitaloceanspaces.com/KN%20Medicolegal%20Support/pre-conception-pre-natal-diagnostic-techniques-act-1994.pdf",
    },
    {
        title: "National Medical Commission – Registered Medical Practitioner (Professional Conduct) Regulations, 2023",
        year: "2023",
        description:
            "Professional conduct regulations for registered medical practitioners under the NMC, outlining duties, ethics, and standards of practice.",
        pdfPath: "https://desirediv-storage.blr1.cdn.digitaloceanspaces.com/KN%20Medicolegal%20Support/National-Medical-Commission-Registered-Medical-Practitioner-Professional-Conduct-Regulations-2023-Dt-02-08-2023.pdf",
    },
    {
        title: "Jacob Mathew vs State of Punjab & Anr (2005 – Supreme Court Guidelines)",
        year: "2005",
        description:
            "Supreme Court guidelines on criminal medical negligence; clarifies precautions before initiating criminal proceedings against doctors.",
        pdfPath: "https://desirediv-storage.blr1.cdn.digitaloceanspaces.com/KN%20Medicolegal%20Support/Jacob_Mathew_vs_State_Of_Punjab_Anr_on_5_August_2005.PDF",
    },
];

const caseLawsData = [
    {
        title: "Kusum Sharma & Ors vs Batra Hospital Medical Research Centre",
        year: "2010",
        court: "Supreme Court of India",
        description: "Principles on standard of care and medical negligence; guidance on compensation.",
        pdfPath: "https://desirediv-storage.blr1.cdn.digitaloceanspaces.com/KN%20Medicolegal%20Support/Kusum_Sharma_Ors_vs_Batra_Hospital_Med_Research_Centre_on_10_February_2010.PDF",
    },
    {
        title: "Nizam’s Institute of Medical Sciences vs Prasanth S. Dhananka",
        year: "2009",
        court: "Supreme Court of India",
        description: "Institutional liability, informed consent, and compensation considerations.",
        pdfPath: "https://desirediv-storage.blr1.cdn.digitaloceanspaces.com/KN%20Medicolegal%20Support/Nizam'S_Institute_Of_Medical_Sciences_vs_Prasanth_S_Dhananka_Ors_on_14_May_2009.PDF",
    },
    {
        title: "Samira Kohli vs Dr. Prabha Manchanda",
        year: "2008",
        court: "Supreme Court of India",
        description: "Landmark decision defining informed consent in medical procedures.",
        pdfPath: "https://desirediv-storage.blr1.cdn.digitaloceanspaces.com/KN%20Medicolegal%20Support/Samira_Kohli_vs_Dr_Prabha_Manchanda_Anr_on_16_January_2008.PDF",
    },
];

export default function KnowledgeHubPage() {
    const { data: session } = useSession();

    const handleDownload = (pdfPath, title) => {
        if (!pdfPath || typeof window === "undefined") return;
        const url = pdfPath.startsWith("http")
            ? pdfPath
            : new URL(pdfPath, window.location.href).toString();
        const link = document.createElement("a");
        link.href = url;
        const safeTitle = title ? `${title}.pdf` : "";
        link.setAttribute("download", safeTitle);
        link.setAttribute("rel", "noopener");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <main className="min-h-screen bg-white text-gray-900">
            {/* Introduction */}
            <section className="border-b border-gray-200 bg-gray-50">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-12 md:py-16 lg:px-16">
                    <div className="max-w-4xl space-y-4">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900">Knowledge Hub</h1>
                        <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                            Structured, educational medico-legal guidance for doctors and hospitals—focused on prevention,
                            anticipation, ethical practice, documentation strength, and effective litigation management.
                        </p>
                        <div className="rounded-md border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700">
                            Knowledge Hub content is accessible to registered users. Paid users can download Knowledge Hub content.
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Knowledge Topics */}
            <section className="py-12 md:py-16 border-b border-gray-200">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16 space-y-6">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">Core Knowledge Topics</h2>
                        <p className="text-sm md:text-base text-gray-700 mt-2">
                            Documentation-style summaries to help prevent, anticipate, and manage medicolegal risks.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        {coreTopics.map((topic) => (
                            <div key={topic.title} className="bg-white border border-gray-200 rounded-lg p-6 space-y-3">
                                <h3 className="text-lg font-semibold text-gray-900">{topic.title}</h3>
                                <div className="space-y-2 text-sm text-gray-700 leading-relaxed">
                                    {topic.body.map((line, idx) => (
                                        <p key={idx}>{line}</p>
                                    ))}
                                </div>
                                <Link
                                    href={`/knowledge-hub/topic/${topic.slug}`}
                                    className="inline-block text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                                >
                                    Read more
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Relevant Acts & Rules */}
            <section className="py-12 md:py-16 border-b border-gray-200">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16 space-y-6">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">Relevant Acts & Rules</h2>
                        <p className="text-sm md:text-base text-gray-700 mt-2">
                            Statutory frameworks governing healthcare practice.
                        </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {actsData.map((act) => (
                            <div key={act.title} className="bg-white border border-gray-200 rounded-lg p-5 space-y-3">
                                <div className="space-y-1">
                                    <h3 className="text-base font-semibold text-gray-900">{act.title}</h3>
                                    <p className="text-sm text-gray-700 leading-relaxed">{act.description}</p>
                                </div>
                                <div className="flex gap-3">
                                    {session ? (
                                        <>
                                            <button
                                                onClick={() => window.open(act.pdfPath, "_blank")}
                                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                            >
                                                <FileText className="h-4 w-4" />
                                                View
                                            </button>
                                            <button
                                                onClick={() => handleDownload(act.pdfPath, act.title)}
                                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                            >
                                                <Download className="h-4 w-4" />
                                                Download
                                            </button>
                                        </>
                                    ) : (
                                        <Link
                                            href="/user/auth?mode=register"
                                            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                        >
                                            Register to access
                                        </Link>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Relevant Case Laws */}
            <section className="py-12 md:py-16 border-b border-gray-200">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16 space-y-6">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">Relevant Case Laws</h2>
                        <p className="text-sm md:text-base text-gray-700 mt-2">
                            Key judgments every clinician should know.
                        </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {caseLawsData.map((caseLaw) => (
                            <div key={caseLaw.title} className="bg-white border border-gray-200 rounded-lg p-5 space-y-3">
                                <div className="space-y-1">
                                    <h3 className="text-base font-semibold text-gray-900">{caseLaw.title}</h3>
                                    <p className="text-sm text-gray-700">
                                        {caseLaw.year} • {caseLaw.court}
                                    </p>
                                    <p className="text-sm text-gray-700 leading-relaxed">{caseLaw.description}</p>
                                </div>
                                <div className="flex gap-3">
                                    {session ? (
                                        <>
                                            <button
                                                onClick={() => window.open(caseLaw.pdfPath, "_blank")}
                                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                            >
                                                <FileText className="h-4 w-4" />
                                                Read
                                            </button>
                                            <button
                                                onClick={() => handleDownload(caseLaw.pdfPath, caseLaw.title)}
                                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                            >
                                                <Download className="h-4 w-4" />
                                                Download
                                            </button>
                                        </>
                                    ) : (
                                        <Link
                                            href="/user/auth?mode=register"
                                            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                        >
                                            Register to access
                                        </Link>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Special Topics */}
            <section className="py-12 md:py-16">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16 space-y-8">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">Special Topics</h2>
                        <p className="text-sm md:text-base text-gray-700 mt-2">
                            Documentation-style overviews for high-risk areas.
                        </p>
                    </div>

                    <div className="space-y-8 max-w-5xl">
                        <article className="bg-white border border-gray-200 rounded-lg p-6 space-y-3">
                            <h3 className="text-lg font-semibold text-gray-900">Pre-conception and Pre-natal Diagnostic Techniques (Prohibition of Sex Selection) Act, 1994 (PC-PNDT Act)</h3>
                            <div className="space-y-2 text-sm text-gray-700 leading-relaxed">
                                <p>The Pre-conception and Pre-natal Diagnostic Techniques (Prohibition of Sex Selection) Act, 1994 (PC-PNDT Act) is a central legislation enacted to prevent female foeticide and regulate the use of diagnostic techniques such as ultrasonography and genetic testing. It prohibits the use of any technique for sex determination of the foetus before or after conception, and restricts prenatal diagnostic procedures solely to detect genetic or congenital abnormalities.</p>
                                <p>The Act mandates registration of all genetic counselling centres, laboratories, and ultrasound clinics, prescribes strict record-keeping and reporting requirements, and empowers Appropriate Authorities to inspect, search, seize equipment, and initiate prosecution for violations. Offences are cognizable, non-bailable, and non-compoundable, attracting imprisonment and fine, with disciplinary action by Medical Councils against erring practitioners.</p>
                                <p>Remember, PC-PNDT compliance requires accurate record-keeping, mandatory forms, and strict adherence to rules. Even clerical errors can attract penalties. Regular audits are essential.</p>
                            </div>
                            <Link
                                href="/knowledge-hub/topic/pc-pndt-act"
                                className="inline-block text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                            >
                                Click here to read more
                            </Link>
                        </article>

                        <article className="bg-white border border-gray-200 rounded-lg p-6 space-y-3">
                            <h3 className="text-lg font-semibold text-gray-900">Social Media in Healthcare</h3>
                            <div className="space-y-2 text-sm text-gray-700 leading-relaxed">
                                <p>Social media has emerged as a powerful tool in modern healthcare, transforming the way medical professionals, institutions, and patients communicate and share information. Platforms such as Facebook, X (Twitter), Instagram, LinkedIn, and YouTube enable rapid dissemination of health education, disease awareness, public health alerts, and professional collaboration.</p>
                                <p>For healthcare providers, social media offers opportunities to engage with the community, promote preventive health, and participate in academic discourse. However, its open and informal nature also poses ethical, legal, and professional challenges - particularly concerning patient confidentiality, data privacy, misinformation, and unregulated self-promotion.</p>
                                <p>Responsible, ethical, and policy-guided use of social media is therefore essential to harness its benefits while safeguarding patient interests and the integrity of the medical profession. This section covers proper and ethical use, misuse by patients/public, and management strategies.</p>
                            </div>
                            <Link
                                href="/knowledge-hub/topic/social-media-in-healthcare"
                                className="inline-block text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                            >
                                Click here to read more
                            </Link>
                        </article>

                        <article className="bg-white border border-gray-200 rounded-lg p-6 space-y-3">
                            <h3 className="text-lg font-semibold text-gray-900">Artificial Intelligence (AI) in Healthcare</h3>
                            <div className="space-y-2 text-sm text-gray-700 leading-relaxed">
                                <p>Artificial Intelligence (AI) in healthcare refers to the use of algorithms, machine learning, and data analytics to assist in diagnosis, treatment planning, patient monitoring, and administrative efficiency. When used properly, AI can enhance clinical accuracy, reduce errors, and optimize patient care.</p>
                                <p>However, because AI systems depend on data quality, algorithmic design, and human interpretation, doctors must exercise professional judgment and ethical vigilance while integrating AI tools into patient-specific practice. Artificial Intelligence can greatly enhance medical care - but it must serve as a clinical assistant, not an autonomous decision-maker.</p>
                                <p>The doctor&apos;s ethical judgment, compassion, and accountability remain central to safe practice. Responsible use of AI requires awareness, transparency, and documentation, combined with strict adherence to professional ethics and data protection norms.</p>
                            </div>
                            <Link
                                href="/knowledge-hub/topic/artificial-intelligence-ai-in-healthcare"
                                className="inline-block text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                            >
                                Click here to read more
                            </Link>
                        </article>
                    </div>
                </div>
            </section>
        </main>
    );
}
