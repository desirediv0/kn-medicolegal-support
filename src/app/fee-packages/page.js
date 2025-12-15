"use client";

import Link from "next/link";


export default function FeePackagesPage() {
    return (
        <main className="min-h-screen bg-white text-gray-900">
            {/* Header */}
            <section className="border-b border-gray-200 bg-gray-50">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-12  lg:px-16">
                    <div className="max-w-3xl space-y-3">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900">
                            Fee & Packages
                        </h1>
                        <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                            Transparent medico-legal services as per official documentation. No assumptions, no marketing.
                        </p>
                    </div>
                </div>
            </section>

            {/* General Note */}
            <section className="py-12  border-b border-gray-200">
                <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-16">
                    <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8">
                        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">General Note</h2>
                        <div className="space-y-3 text-sm md:text-base text-gray-700 leading-relaxed">
                            <p>Registration on the site is free.</p>
                            <p>
                                Free registration permits access to the Knowledge Hub, which contains important medico-legal
                                information and is updated periodically.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Individual Services */}
            <section className="py-12  border-b border-gray-200">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
                    <div className="mb-8">
                        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">Individual Services</h2>
                        <p className="text-gray-600 text-sm md:text-base">Clear and transparent offerings</p>
                    </div>

                    <div className="grid gap-6 md:gap-8 md:grid-cols-3">
                        {/* Free Registration Card */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900">Free Registration</h3>
                                <span className="text-sm font-semibold text-gray-900">₹0</span>
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                Access: Knowledge Hub
                                <br />
                                Validity: Lifetime
                            </p>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                Free registration permits access to the Knowledge Hub, which contains important medico-legal
                                information and is updated periodically.
                            </p>
                            <Link
                                href="/user/auth?mode=register"
                                className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 transition-colors"
                            >
                                Register Free
                            </Link>
                        </div>

                        {/* General Chat Card */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900">General Chat</h3>
                                <span className="text-sm font-semibold text-gray-900">₹1,000 (one-time)</span>
                            </div>
                            <ul className="space-y-1 text-sm text-gray-700 leading-relaxed">
                                <li>Access: Group chat with medico-legal experts</li>
                                <li>Usage: Any number of times</li>
                                <li>Limitation: Case-specific complaints are NOT addressed</li>
                                <li>Validity: Indefinite</li>
                            </ul>
                            <Link
                                href="/user"
                                className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 transition-colors"
                            >
                                Start Chat
                            </Link>
                        </div>

                        {/* Advanced Chat Card */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900">Advanced Chat</h3>
                                <span className="text-sm font-semibold text-gray-900">₹10,000</span>
                            </div>
                            <ul className="space-y-1 text-sm text-gray-700 leading-relaxed">
                                <li>Purpose: Complaint-related medico-legal consultation</li>
                                <li>
                                    Covers: Civil, Criminal, Consumer Court complaints, Medical Board or Medical Council proceedings,
                                    and legal notices
                                </li>
                                <li>
                                    Mode: Online and/or offline chat or discussion, phone consultation, and in-person consultation
                                </li>
                                <li>Usage: Any number of times for a specific complaint</li>
                                <li>Validity: 1 month</li>
                                <li>Additional privilege: Upload and download documents</li>
                                <li>All case-related communication accessible on the user dashboard</li>
                            </ul>
                            <Link
                                href="/user/advance-chat"
                                className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 transition-colors"
                            >
                                Consult Now
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Drafting of Medicolegal Documents */}
            <section className="py-12  border-b border-gray-200">
                <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-16">
                    <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 space-y-3">
                        <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                            Drafting of Medicolegal Documents
                        </h2>
                        <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                            Fee will be decided during the Advanced Chat. It depends on the complexity of the document (simple,
                            complex, or very complex). No fixed pricing is displayed here.
                        </p>
                    </div>
                </div>
            </section>

            {/* Annual Package – Individual Doctors */}
            <section className="py-12  border-b border-gray-200">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
                    <div className="mb-8">
                        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
                            Annual Package for Individual Doctors
                        </h2>
                        <p className="text-gray-600 text-sm md:text-base">
                            Annual medicolegal support packages with comprehensive services
                        </p>
                    </div>

                    {/* Pricing Header */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                            <h3 className="text-base font-semibold text-gray-900 mb-1">Category I (Basic)</h3>
                            <p className="text-lg font-bold text-gray-900">₹15,000</p>
                            <p className="text-xs text-gray-600">per annum</p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                            <h3 className="text-base font-semibold text-gray-900 mb-1">Category II (Premier)</h3>
                            <p className="text-lg font-bold text-gray-900">₹25,000</p>
                            <p className="text-xs text-gray-600">per annum</p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                            <h3 className="text-base font-semibold text-gray-900 mb-1">Category III (Comprehensive)</h3>
                            <p className="text-lg font-bold text-gray-900">₹35,000</p>
                            <p className="text-xs text-gray-600">per annum</p>
                        </div>
                    </div>

                    {/* Comparison Table */}
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                                            Services
                                        </th>
                                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 border-l border-gray-200">
                                            Category I<br />
                                            <span className="text-xs font-normal text-gray-600">(Basic)</span>
                                        </th>
                                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 border-l border-gray-200">
                                            Category II<br />
                                            <span className="text-xs font-normal text-gray-600">(Premier)</span>
                                        </th>
                                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 border-l border-gray-200">
                                            Category III<br />
                                            <span className="text-xs font-normal text-gray-600">(Comprehensive)</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-4 py-3 text-sm text-gray-700">
                                            Consultations / Chats (online and/or offline)
                                        </td>
                                        <td className="px-4 py-3 text-center text-sm font-medium text-gray-900 border-l border-gray-200">
                                            {/* YES/NO - Update from document */}
                                        </td>
                                        <td className="px-4 py-3 text-center text-sm font-medium text-gray-900 border-l border-gray-200">
                                            {/* YES/NO - Update from document */}
                                        </td>
                                        <td className="px-4 py-3 text-center text-sm font-medium text-gray-900 border-l border-gray-200">
                                            {/* YES/NO - Update from document */}
                                        </td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                        <td className="px-4 py-3 text-sm text-gray-700">
                                            Advance Chats (online and/or offline)
                                        </td>
                                        <td className="px-4 py-3 text-center text-sm font-medium text-gray-900 border-l border-gray-200">
                                            {/* YES/NO - Update from document */}
                                        </td>
                                        <td className="px-4 py-3 text-center text-sm font-medium text-gray-900 border-l border-gray-200">
                                            {/* YES/NO - Update from document */}
                                        </td>
                                        <td className="px-4 py-3 text-center text-sm font-medium text-gray-900 border-l border-gray-200">
                                            {/* YES/NO - Update from document */}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 text-sm text-gray-700">
                                            Discussion of the case with the advocate (on panel or otherwise)
                                        </td>
                                        <td className="px-4 py-3 text-center text-sm font-medium text-gray-900 border-l border-gray-200">
                                            {/* YES/NO - Update from document */}
                                        </td>
                                        <td className="px-4 py-3 text-center text-sm font-medium text-gray-900 border-l border-gray-200">
                                            {/* YES/NO - Update from document */}
                                        </td>
                                        <td className="px-4 py-3 text-center text-sm font-medium text-gray-900 border-l border-gray-200">
                                            {/* YES/NO - Update from document */}
                                        </td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                        <td className="px-4 py-3 text-sm text-gray-700">
                                            Medicolegal screening of medical records in litigation cases
                                        </td>
                                        <td className="px-4 py-3 text-center text-sm font-medium text-gray-900 border-l border-gray-200">
                                            {/* YES/NO - Update from document */}
                                        </td>
                                        <td className="px-4 py-3 text-center text-sm font-medium text-gray-900 border-l border-gray-200">
                                            {/* YES/NO - Update from document */}
                                        </td>
                                        <td className="px-4 py-3 text-center text-sm font-medium text-gray-900 border-l border-gray-200">
                                            {/* YES/NO - Update from document */}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 text-sm text-gray-700">
                                            Preparing the Defence Strategy
                                        </td>
                                        <td className="px-4 py-3 text-center text-sm font-medium text-gray-900 border-l border-gray-200">
                                            {/* YES/NO - Update from document */}
                                        </td>
                                        <td className="px-4 py-3 text-center text-sm font-medium text-gray-900 border-l border-gray-200">
                                            {/* YES/NO - Update from document */}
                                        </td>
                                        <td className="px-4 py-3 text-center text-sm font-medium text-gray-900 border-l border-gray-200">
                                            {/* YES/NO - Update from document */}
                                        </td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                        <td className="px-4 py-3 text-sm text-gray-700">
                                            Reply to Legal Notice
                                        </td>
                                        <td className="px-4 py-3 text-center text-sm font-medium text-gray-900 border-l border-gray-200">
                                            {/* YES/NO - Update from document */}
                                        </td>
                                        <td className="px-4 py-3 text-center text-sm font-medium text-gray-900 border-l border-gray-200">
                                            {/* YES/NO - Update from document */}
                                        </td>
                                        <td className="px-4 py-3 text-center text-sm font-medium text-gray-900 border-l border-gray-200">
                                            {/* YES/NO - Update from document */}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 text-sm text-gray-700">
                                            Reply to Administrative Notices
                                        </td>
                                        <td className="px-4 py-3 text-center text-sm font-medium text-gray-900 border-l border-gray-200">
                                            {/* YES/NO - Update from document */}
                                        </td>
                                        <td className="px-4 py-3 text-center text-sm font-medium text-gray-900 border-l border-gray-200">
                                            {/* YES/NO - Update from document */}
                                        </td>
                                        <td className="px-4 py-3 text-center text-sm font-medium text-gray-900 border-l border-gray-200">
                                            {/* YES/NO - Update from document */}
                                        </td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                        <td className="px-4 py-3 text-sm text-gray-700">
                                            Drafting of documents in litigation (Medical Negligence cases) in SMC / NMC / Consumer Courts
                                        </td>
                                        <td className="px-4 py-3 text-center text-sm font-medium text-gray-900 border-l border-gray-200">
                                            {/* YES/NO - Update from document */}
                                        </td>
                                        <td className="px-4 py-3 text-center text-sm font-medium text-gray-900 border-l border-gray-200">
                                            {/* YES/NO - Update from document */}
                                        </td>
                                        <td className="px-4 py-3 text-center text-sm font-medium text-gray-900 border-l border-gray-200">
                                            {/* YES/NO - Update from document */}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 text-sm text-gray-700">
                                            Drafting of documents in litigation (other than Medical Negligence cases – PNDT, ART, Criminal cases)
                                        </td>
                                        <td className="px-4 py-3 text-center text-sm font-medium text-gray-900 border-l border-gray-200">
                                            {/* YES/NO - Update from document */}
                                        </td>
                                        <td className="px-4 py-3 text-center text-sm font-medium text-gray-900 border-l border-gray-200">
                                            {/* YES/NO - Update from document */}
                                        </td>
                                        <td className="px-4 py-3 text-center text-sm font-medium text-gray-900 border-l border-gray-200">
                                            {/* YES/NO - Update from document */}
                                        </td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                        <td className="px-4 py-3 text-sm text-gray-700">
                                            Drafting of Expert Opinion
                                        </td>
                                        <td className="px-4 py-3 text-center text-sm font-medium text-gray-900 border-l border-gray-200">
                                            {/* YES/NO - Update from document */}
                                        </td>
                                        <td className="px-4 py-3 text-center text-sm font-medium text-gray-900 border-l border-gray-200">
                                            {/* YES/NO - Update from document */}
                                        </td>
                                        <td className="px-4 py-3 text-center text-sm font-medium text-gray-900 border-l border-gray-200">
                                            {/* YES/NO - Update from document */}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 text-sm text-gray-700">
                                            Medical research on contentious issues in dispute
                                        </td>
                                        <td className="px-4 py-3 text-center text-sm font-medium text-gray-900 border-l border-gray-200">
                                            {/* YES/NO - Update from document */}
                                        </td>
                                        <td className="px-4 py-3 text-center text-sm font-medium text-gray-900 border-l border-gray-200">
                                            {/* YES/NO - Update from document */}
                                        </td>
                                        <td className="px-4 py-3 text-center text-sm font-medium text-gray-900 border-l border-gray-200">
                                            {/* YES/NO - Update from document */}
                                        </td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                        <td className="px-4 py-3 text-sm text-gray-700">
                                            Legal research for case laws
                                        </td>
                                        <td className="px-4 py-3 text-center text-sm font-medium text-gray-900 border-l border-gray-200">
                                            {/* YES/NO - Update from document */}
                                        </td>
                                        <td className="px-4 py-3 text-center text-sm font-medium text-gray-900 border-l border-gray-200">
                                            {/* YES/NO - Update from document */}
                                        </td>
                                        <td className="px-4 py-3 text-center text-sm font-medium text-gray-900 border-l border-gray-200">
                                            {/* YES/NO - Update from document */}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 text-sm text-gray-700">
                                            Medicolegal audit of morbidity / mortality cases (for self-improvement or litigation)
                                        </td>
                                        <td className="px-4 py-3 text-center text-sm font-medium text-gray-900 border-l border-gray-200">
                                            {/* YES/NO - Update from document */}
                                        </td>
                                        <td className="px-4 py-3 text-center text-sm font-medium text-gray-900 border-l border-gray-200">
                                            {/* YES/NO - Update from document */}
                                        </td>
                                        <td className="px-4 py-3 text-center text-sm font-medium text-gray-900 border-l border-gray-200">
                                            {/* YES/NO - Update from document */}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Mobile View - Stacked Cards */}
                    <div className="md:hidden mt-6 space-y-4">
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <h3 className="text-base font-semibold text-gray-900 mb-3">Category I (Basic) - ₹15,000/annum</h3>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li className="flex justify-between">
                                    <span>Consultations / Chats</span>
                                    <span className="font-medium">{/* YES/NO */}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Advance Chats</span>
                                    <span className="font-medium">{/* YES/NO */}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Discussion with advocate</span>
                                    <span className="font-medium">{/* YES/NO */}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Medicolegal screening</span>
                                    <span className="font-medium">{/* YES/NO */}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Defence Strategy</span>
                                    <span className="font-medium">{/* YES/NO */}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Reply to Legal Notice</span>
                                    <span className="font-medium">{/* YES/NO */}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Reply to Administrative Notices</span>
                                    <span className="font-medium">{/* YES/NO */}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Drafting (Medical Negligence)</span>
                                    <span className="font-medium">{/* YES/NO */}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Drafting (Other cases)</span>
                                    <span className="font-medium">{/* YES/NO */}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Expert Opinion</span>
                                    <span className="font-medium">{/* YES/NO */}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Medical research</span>
                                    <span className="font-medium">{/* YES/NO */}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Legal research</span>
                                    <span className="font-medium">{/* YES/NO */}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Medicolegal audit</span>
                                    <span className="font-medium">{/* YES/NO */}</span>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <h3 className="text-base font-semibold text-gray-900 mb-3">Category II (Premier) - ₹25,000/annum</h3>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li className="flex justify-between">
                                    <span>Consultations / Chats</span>
                                    <span className="font-medium">{/* YES/NO */}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Advance Chats</span>
                                    <span className="font-medium">{/* YES/NO */}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Discussion with advocate</span>
                                    <span className="font-medium">{/* YES/NO */}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Medicolegal screening</span>
                                    <span className="font-medium">{/* YES/NO */}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Defence Strategy</span>
                                    <span className="font-medium">{/* YES/NO */}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Reply to Legal Notice</span>
                                    <span className="font-medium">{/* YES/NO */}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Reply to Administrative Notices</span>
                                    <span className="font-medium">{/* YES/NO */}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Drafting (Medical Negligence)</span>
                                    <span className="font-medium">{/* YES/NO */}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Drafting (Other cases)</span>
                                    <span className="font-medium">{/* YES/NO */}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Expert Opinion</span>
                                    <span className="font-medium">{/* YES/NO */}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Medical research</span>
                                    <span className="font-medium">{/* YES/NO */}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Legal research</span>
                                    <span className="font-medium">{/* YES/NO */}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Medicolegal audit</span>
                                    <span className="font-medium">{/* YES/NO */}</span>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <h3 className="text-base font-semibold text-gray-900 mb-3">Category III (Comprehensive) - ₹35,000/annum</h3>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li className="flex justify-between">
                                    <span>Consultations / Chats</span>
                                    <span className="font-medium">{/* YES/NO */}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Advance Chats</span>
                                    <span className="font-medium">{/* YES/NO */}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Discussion with advocate</span>
                                    <span className="font-medium">{/* YES/NO */}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Medicolegal screening</span>
                                    <span className="font-medium">{/* YES/NO */}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Defence Strategy</span>
                                    <span className="font-medium">{/* YES/NO */}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Reply to Legal Notice</span>
                                    <span className="font-medium">{/* YES/NO */}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Reply to Administrative Notices</span>
                                    <span className="font-medium">{/* YES/NO */}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Drafting (Medical Negligence)</span>
                                    <span className="font-medium">{/* YES/NO */}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Drafting (Other cases)</span>
                                    <span className="font-medium">{/* YES/NO */}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Expert Opinion</span>
                                    <span className="font-medium">{/* YES/NO */}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Medical research</span>
                                    <span className="font-medium">{/* YES/NO */}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Legal research</span>
                                    <span className="font-medium">{/* YES/NO */}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Medicolegal audit</span>
                                    <span className="font-medium">{/* YES/NO */}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Monthly Package for Hospitals (Medicolegal Retainership) */}
            <section className="py-12 ">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16 space-y-8">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
                            Monthly Package for Hospitals (Medicolegal Retainership)
                        </h2>
                        <p className="text-gray-600 text-sm md:text-base">
                            Retainership details as provided. No assumptions or additions.
                        </p>
                    </div>

                    {/* Retainership Fee Table */}
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                                            Hospital Capacity
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-l border-gray-200">
                                            Retainership Fee (per month)
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-4 py-3 text-sm text-gray-700">Hospitals with less than 50 beds</td>
                                        <td className="px-4 py-3 text-sm font-semibold text-gray-900 border-l border-gray-200">₹20,000 per month</td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                        <td className="px-4 py-3 text-sm text-gray-700">Hospitals with 51 to 100 beds</td>
                                        <td className="px-4 py-3 text-sm font-semibold text-gray-900 border-l border-gray-200">₹30,000 per month</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 text-sm text-gray-700">Hospitals with 100 to 200 beds</td>
                                        <td className="px-4 py-3 text-sm font-semibold text-gray-900 border-l border-gray-200">₹40,000 per month</td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                        <td className="px-4 py-3 text-sm text-gray-700">Hospitals with more than 200 beds</td>
                                        <td className="px-4 py-3 text-sm font-semibold text-gray-900 border-l border-gray-200">₹50,000 per month</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Services Included */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">Services Included</h3>
                        <ul className="space-y-2 text-sm md:text-base text-gray-700 leading-relaxed list-disc list-inside">
                            <li>General medicolegal consultations</li>
                            <li>Specific consultation / discussion on medicolegal issues</li>
                            <li>Drafting of all medicolegal documents</li>
                            <li>File audit of medical records (up to 10 files per month)</li>
                            <li>Medical research on contentious issues related to specific complaints</li>
                            <li>Legal research on case laws related to specific complaints</li>
                            <li>One lecture or group discussion on a medicolegal issue per month</li>
                            <li>Site visits (not more than twice a month)</li>
                            <li>Online communication (synchronous & asynchronous) any number of times</li>
                        </ul>
                        <div className="text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-md p-4">
                            <strong>Important Note:</strong> The retainership services apply to ALL doctors and staff of the hospital.
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
