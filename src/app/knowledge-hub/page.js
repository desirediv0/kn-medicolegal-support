"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { FileText, Download } from "lucide-react";

const coreTopics = [
    {
        title: "Golden Rules for Doctors & Hospitals",
        body: [
            "Ethical practice, empathy, and clear communication reduce medico-legal risk.",
            "Participative decision-making; do not exaggerate benefits or downplay risks.",
            "Respect dignity, privacy, and confidentiality at every interaction.",
        ],
    },
    {
        title: "Healthcare Risk Prevention & Management",
        body: [
            "Audit adverse events and near-misses; foster a learning culture.",
            "Regular training, CMEs, adherence to SOPs, guidelines, and protocols.",
            "Identify and mitigate operational risks across departments.",
        ],
    },
    {
        title: "Medical Records & Documentation",
        body: [
            "Clear, dated, timed, factual entries are your strongest defence.",
            "Emphasize initial assessment, progress notes, operation notes, and specialty-specific documentation.",
            "Never fabricate or manipulate records; ensure accessibility and traceability.",
        ],
    },
    {
        title: "Consent Process & Ethical Practice",
        body: [
            "Use patient- and procedure-specific consent with risk/benefit discussion.",
            "Consent must be voluntary, comprehensible, and properly recorded.",
            "Respect patient autonomy and cultural sensitivities.",
        ],
    },
    {
        title: "Management of Complications",
        body: [
            "Detect complications early; communicate promptly and honestly.",
            "Follow guidelines for stabilization and escalation; seek second opinions when needed.",
            "Document chronology, decisions, and discussions thoroughly.",
        ],
    },
    {
        title: "Hospital Violence: Prevention & Handling",
        body: [
            "Zero-tolerance policies; train staff on de-escalation and crowd management.",
            "Maintain incident response protocols; coordinate with security and authorities.",
            "Preserve documentation and evidence; communicate via designated spokespersons.",
        ],
    },
    {
        title: "Litigation Management (Legal Notices, Consumer Court, Police Summons)",
        body: [
            "On receiving notice/summons: analyze allegations, secure records, draft factual replies.",
            "Engage medicolegal counsel; notify insurer where applicable.",
            "For criminal matters: cooperate, prepare written statements, understand bail provisions.",
        ],
    },
    {
        title: "Proper Indemnity Insurance",
        body: [
            "Maintain adequate professional indemnity; know coverage, exclusions, limits.",
            "Align coverage with practice scope and institution size.",
            "Keep policies updated; document notifications and claims correspondence.",
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
                                    href={`/knowledge-hub/topic/${topic.title.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="inline-block text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                                >
                                    Click here to read more
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
                            <h3 className="text-lg font-semibold text-gray-900">PC-PNDT Act</h3>
                            <div className="space-y-2 text-sm text-gray-700 leading-relaxed">
                                <p>Overview: Prohibits sex selection; regulates diagnostic techniques; mandates registration and record-keeping.</p>
                                <p>Compliance: Registration of centres, accurate Form F, consent forms, machine logs, periodic audits.</p>
                                <p>Penalties: Cognizable, non-bailable, non-compoundable offences; suspension/cancellation of registration; professional suspension for violations.</p>
                                <p>Procedure: Inspections by appropriate authority, show-cause notices, potential criminal proceedings for violations.</p>
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
                                <p>Ethical use: Maintain professionalism; avoid patient-identifiable data; comply with NMC code and advertising restrictions.</p>
                                <p>Privacy: Do not post clinical images or details; avoid informal consultations; use disclaimers for educational posts.</p>
                                <p>Misuse handling: Preserve evidence, report/flag content, issue formal clarifications, seek legal remedies for defamation or harassment.</p>
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
                                <p>Principles: AI as decision-support, not replacement; clinician remains accountable.</p>
                                <p>Validation: Use approved/validated tools; document tool version, output, and clinician judgment.</p>
                                <p>Consent & transparency: Inform patients when AI is used; obtain consent when appropriate.</p>
                                <p>Data protection: De-identify data; comply with privacy laws; avoid unapproved platforms.</p>
                                <p>Liability: Over-reliance or exaggerated claims can constitute deficiency in service or misrepresentation.</p>
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
