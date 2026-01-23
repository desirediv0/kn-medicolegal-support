"use client";

import Image from "next/image";

export default function FeePackagesPage() {
    return (
        <main className="min-h-screen bg-white text-gray-900">
            {/* Header */}
            <section className="border-b border-gray-200 bg-gray-50">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-12 lg:px-16">
                    <div className="max-w-3xl space-y-3">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900">
                            Fee & Packages
                        </h1>
                        <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                            Transparent medico-legal services. No hidden charges.
                        </p>
                    </div>
                </div>
            </section>

            {/* Section A: Medicolegal Consultation */}
            <section className="py-12 border-b border-gray-200">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
                    <div className="mb-6">
                        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
                            A. Medicolegal Consultation
                        </h2>
                        <p className="text-gray-600 text-sm md:text-base">
                            In complaint cases of Medical Negligence, PNDT, MTP, ART
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-3">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Medicolegal Consultation</h3>
                            <span className="text-xl font-bold text-gray-900">Rs. 1,500/-</span>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            Professional consultation for medical negligence, PNDT, MTP, ART, and related complaint cases.
                        </p>
                        <button
                            onClick={() => document.getElementById('payment-section')?.scrollIntoView({ behavior: 'smooth' })}
                            className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-gray-900 rounded-md hover:bg-gray-800 transition-colors"
                        >
                            Pay Now
                        </button>
                    </div>
                </div>
            </section>

            {/* Section B: Item-wise Services */}
            <section className="py-12 border-b border-gray-200">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
                    <div className="mb-6">
                        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
                            B. Item-wise Services
                        </h2>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Service 1 */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-3">
                            <div className="flex items-start justify-between">
                                <h3 className="text-base font-semibold text-gray-900 flex-1">
                                    Reply to Notice from Government authority (PNDT, MTP, ART, RTI etc)
                                </h3>
                                <span className="text-lg font-bold text-gray-900 ml-4">Rs. 5,000/-</span>
                            </div>
                            <button
                                onClick={() => document.getElementById('payment-section')?.scrollIntoView({ behavior: 'smooth' })}
                                className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-gray-900 rounded-md hover:bg-gray-800 transition-colors"
                            >
                                Pay Now
                            </button>
                        </div>

                        {/* Service 2 */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-3">
                            <div className="flex items-start justify-between">
                                <h3 className="text-base font-semibold text-gray-900 flex-1">
                                    Drafting of Administrative MOU, Contracts etc
                                </h3>
                                <span className="text-lg font-bold text-gray-900 ml-4">Rs. 5,000/-</span>
                            </div>
                            <button
                                onClick={() => document.getElementById('payment-section')?.scrollIntoView({ behavior: 'smooth' })}
                                className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-gray-900 rounded-md hover:bg-gray-800 transition-colors"
                            >
                                Pay Now
                            </button>
                        </div>

                        {/* Service 3 */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-3">
                            <h3 className="text-base font-semibold text-gray-900">
                                File audit, medical research on contentious issues, and case laws
                            </h3>
                            <p className="text-sm text-gray-600">Depending on the case</p>
                        </div>

                        {/* Service 4 */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-3">
                            <h3 className="text-base font-semibold text-gray-900">
                                Drafting of medicolegal documents
                            </h3>
                            <p className="text-sm text-gray-600">Depending on the complexity of the concerned matter</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section C: Annual Package for Individual Doctors */}
            <section className="py-12 border-b border-gray-200">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
                    <div className="mb-8">
                        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
                            C. Annual Package for Individual Doctors
                        </h2>
                        <p className="text-gray-600 text-sm md:text-base">
                            Services are offered according to the selected category (Category I, II, or III).
                        </p>
                    </div>

                    {/* Pricing Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 text-center hover:border-gray-900 transition-colors">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Category I</h3>
                            <p className="text-sm text-gray-600 mb-3">(Basic)</p>
                            <p className="text-3xl font-bold text-gray-900 mb-1">Rs. 15,000</p>
                            <p className="text-xs text-gray-600 mb-4">per annum</p>
                            <button
                                onClick={() => document.getElementById('payment-section')?.scrollIntoView({ behavior: 'smooth' })}
                                className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-gray-900 rounded-md hover:bg-gray-800 transition-colors"
                            >
                                Pay Now
                            </button>
                        </div>

                        <div className="bg-white border-2 border-gray-900 rounded-lg p-6 text-center shadow-lg transform scale-105">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Category II</h3>
                            <p className="text-sm text-gray-600 mb-3">(Premier)</p>
                            <p className="text-3xl font-bold text-gray-900 mb-1">Rs. 25,000</p>
                            <p className="text-xs text-gray-600 mb-4">per annum</p>
                            <button
                                onClick={() => document.getElementById('payment-section')?.scrollIntoView({ behavior: 'smooth' })}
                                className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-gray-900 rounded-md hover:bg-gray-800 transition-colors"
                            >
                                Pay Now
                            </button>
                        </div>

                        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 text-center hover:border-gray-900 transition-colors">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Category III</h3>
                            <p className="text-sm text-gray-600 mb-3">(Comprehensive)</p>
                            <p className="text-3xl font-bold text-gray-900 mb-1">Rs. 35,000</p>
                            <p className="text-xs text-gray-600 mb-4">per annum</p>
                            <button
                                onClick={() => document.getElementById('payment-section')?.scrollIntoView({ behavior: 'smooth' })}
                                className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-gray-900 rounded-md hover:bg-gray-800 transition-colors"
                            >
                                Pay Now
                            </button>
                        </div>
                    </div>

                    {/* Comparison Table */}
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 w-16">
                                            S.no
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                                            Nature of service
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
                                        <td className="px-4 py-3 text-center text-sm text-gray-600 font-medium">1</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">
                                            Consultations/Chats (online and/or offline)
                                        </td>
                                        <td className="px-4 py-3 text-center border-l border-gray-200">
                                            <span className="inline-flex items-center justify-center min-w-[60px] px-3 py-1.5 rounded-md text-sm font-semibold bg-green-50 text-green-700 border border-green-200">
                                                YES
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center border-l border-gray-200">
                                            <span className="inline-flex items-center justify-center min-w-[60px] px-3 py-1.5 rounded-md text-sm font-semibold bg-green-50 text-green-700 border border-green-200">
                                                YES
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center border-l border-gray-200">
                                            <span className="inline-flex items-center justify-center min-w-[60px] px-3 py-1.5 rounded-md text-sm font-semibold bg-green-50 text-green-700 border border-green-200">
                                                YES
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                        <td className="px-4 py-3 text-center text-sm text-gray-600 font-medium">2</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">
                                            Advance Chats (online and/or offline)
                                        </td>
                                        <td className="px-4 py-3 text-center border-l border-gray-200">
                                            <span className="inline-flex items-center justify-center min-w-[60px] px-3 py-1.5 rounded-md text-sm font-semibold bg-green-50 text-green-700 border border-green-200">
                                                YES
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center border-l border-gray-200">
                                            <span className="inline-flex items-center justify-center min-w-[60px] px-3 py-1.5 rounded-md text-sm font-semibold bg-green-50 text-green-700 border border-green-200">
                                                YES
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center border-l border-gray-200">
                                            <span className="inline-flex items-center justify-center min-w-[60px] px-3 py-1.5 rounded-md text-sm font-semibold bg-green-50 text-green-700 border border-green-200">
                                                YES
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 text-center text-sm text-gray-600 font-medium">3</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">
                                            Discussion of the case with the advocate (on panel or otherwise)
                                        </td>
                                        <td className="px-4 py-3 text-center border-l border-gray-200">
                                            <span className="inline-flex items-center justify-center min-w-[60px] px-3 py-1.5 rounded-md text-sm font-semibold bg-green-50 text-green-700 border border-green-200">
                                                YES
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center border-l border-gray-200">
                                            <span className="inline-flex items-center justify-center min-w-[60px] px-3 py-1.5 rounded-md text-sm font-semibold bg-green-50 text-green-700 border border-green-200">
                                                YES
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center border-l border-gray-200">
                                            <span className="inline-flex items-center justify-center min-w-[60px] px-3 py-1.5 rounded-md text-sm font-semibold bg-green-50 text-green-700 border border-green-200">
                                                YES
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                        <td className="px-4 py-3 text-center text-sm text-gray-600 font-medium">4</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">
                                            Medicolegal screening of medical records in litigation cases
                                        </td>
                                        <td className="px-4 py-3 text-center border-l border-gray-200">
                                            <span className="inline-flex items-center justify-center min-w-[60px] px-3 py-1.5 rounded-md text-sm font-semibold bg-green-50 text-green-700 border border-green-200">
                                                YES
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center border-l border-gray-200">
                                            <span className="inline-flex items-center justify-center min-w-[60px] px-3 py-1.5 rounded-md text-sm font-semibold bg-green-50 text-green-700 border border-green-200">
                                                YES
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center border-l border-gray-200">
                                            <span className="inline-flex items-center justify-center min-w-[60px] px-3 py-1.5 rounded-md text-sm font-semibold bg-green-50 text-green-700 border border-green-200">
                                                YES
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 text-center text-sm text-gray-600 font-medium">5</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">
                                            Preparing the Defense Strategy
                                        </td>
                                        <td className="px-4 py-3 text-center border-l border-gray-200">
                                            <span className="inline-flex items-center justify-center min-w-[60px] px-3 py-1.5 rounded-md text-sm font-semibold bg-green-50 text-green-700 border border-green-200">
                                                YES
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center border-l border-gray-200">
                                            <span className="inline-flex items-center justify-center min-w-[60px] px-3 py-1.5 rounded-md text-sm font-semibold bg-green-50 text-green-700 border border-green-200">
                                                YES
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center border-l border-gray-200">
                                            <span className="inline-flex items-center justify-center min-w-[60px] px-3 py-1.5 rounded-md text-sm font-semibold bg-green-50 text-green-700 border border-green-200">
                                                YES
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                        <td className="px-4 py-3 text-center text-sm text-gray-600 font-medium">6</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">
                                            Reply to Legal Notice
                                        </td>
                                        <td className="px-4 py-3 text-center border-l border-gray-200">
                                            <span className="inline-flex items-center justify-center min-w-[60px] px-3 py-1.5 rounded-md text-sm font-semibold bg-red-50 text-red-700 border border-red-200">
                                                NO
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center border-l border-gray-200">
                                            <span className="inline-flex items-center justify-center min-w-[60px] px-3 py-1.5 rounded-md text-sm font-semibold bg-green-50 text-green-700 border border-green-200">
                                                YES
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center border-l border-gray-200">
                                            <span className="inline-flex items-center justify-center min-w-[60px] px-3 py-1.5 rounded-md text-sm font-semibold bg-green-50 text-green-700 border border-green-200">
                                                YES
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 text-center text-sm text-gray-600 font-medium">7</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">
                                            Reply to Administrative notices
                                        </td>
                                        <td className="px-4 py-3 text-center border-l border-gray-200">
                                            <span className="inline-flex items-center justify-center min-w-[60px] px-3 py-1.5 rounded-md text-sm font-semibold bg-red-50 text-red-700 border border-red-200">
                                                NO
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center border-l border-gray-200">
                                            <span className="inline-flex items-center justify-center min-w-[60px] px-3 py-1.5 rounded-md text-sm font-semibold bg-green-50 text-green-700 border border-green-200">
                                                YES
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center border-l border-gray-200">
                                            <span className="inline-flex items-center justify-center min-w-[60px] px-3 py-1.5 rounded-md text-sm font-semibold bg-green-50 text-green-700 border border-green-200">
                                                YES
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                        <td className="px-4 py-3 text-center text-sm text-gray-600 font-medium">8</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">
                                            Drafting of Documents in litigation (Medical Negligence cases) in SMC / NMC / Consumer courts
                                        </td>
                                        <td className="px-4 py-3 text-center border-l border-gray-200">
                                            <span className="inline-flex items-center justify-center min-w-[60px] px-3 py-1.5 rounded-md text-sm font-semibold bg-red-50 text-red-700 border border-red-200">
                                                NO
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center border-l border-gray-200">
                                            <span className="inline-flex items-center justify-center min-w-[60px] px-3 py-1.5 rounded-md text-sm font-semibold bg-green-50 text-green-700 border border-green-200">
                                                YES
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center border-l border-gray-200">
                                            <span className="inline-flex items-center justify-center min-w-[60px] px-3 py-1.5 rounded-md text-sm font-semibold bg-green-50 text-green-700 border border-green-200">
                                                YES
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 text-center text-sm text-gray-600 font-medium">9</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">
                                            Drafting of Documents in litigation (other than Medical Negligence cases), eg, PNDT, ART, Criminal cases
                                        </td>
                                        <td className="px-4 py-3 text-center border-l border-gray-200">
                                            <span className="inline-flex items-center justify-center min-w-[60px] px-3 py-1.5 rounded-md text-sm font-semibold bg-red-50 text-red-700 border border-red-200">
                                                NO
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center border-l border-gray-200">
                                            <span className="inline-flex items-center justify-center min-w-[60px] px-3 py-1.5 rounded-md text-sm font-semibold bg-red-50 text-red-700 border border-red-200">
                                                NO
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center border-l border-gray-200">
                                            <span className="inline-flex items-center justify-center min-w-[60px] px-3 py-1.5 rounded-md text-sm font-semibold bg-green-50 text-green-700 border border-green-200">
                                                YES
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                        <td className="px-4 py-3 text-center text-sm text-gray-600 font-medium">10</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">
                                            Drafting of Expert opinion
                                        </td>
                                        <td className="px-4 py-3 text-center border-l border-gray-200">
                                            <span className="inline-flex items-center justify-center min-w-[60px] px-3 py-1.5 rounded-md text-sm font-semibold bg-red-50 text-red-700 border border-red-200">
                                                NO
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center border-l border-gray-200">
                                            <span className="inline-flex items-center justify-center min-w-[60px] px-3 py-1.5 rounded-md text-sm font-semibold bg-red-50 text-red-700 border border-red-200">
                                                NO
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center border-l border-gray-200">
                                            <span className="inline-flex items-center justify-center min-w-[60px] px-3 py-1.5 rounded-md text-sm font-semibold bg-green-50 text-green-700 border border-green-200">
                                                YES
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 text-center text-sm text-gray-600 font-medium">11</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">
                                            Medical research on contentious issues in dispute
                                        </td>
                                        <td className="px-4 py-3 text-center border-l border-gray-200">
                                            <span className="inline-flex items-center justify-center min-w-[60px] px-3 py-1.5 rounded-md text-sm font-semibold bg-red-50 text-red-700 border border-red-200">
                                                NO
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center border-l border-gray-200">
                                            <span className="inline-flex items-center justify-center min-w-[60px] px-3 py-1.5 rounded-md text-sm font-semibold bg-red-50 text-red-700 border border-red-200">
                                                NO
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center border-l border-gray-200">
                                            <span className="inline-flex items-center justify-center min-w-[60px] px-3 py-1.5 rounded-md text-sm font-semibold bg-green-50 text-green-700 border border-green-200">
                                                YES
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="bg-gray-50">
                                        <td className="px-4 py-3 text-center text-sm text-gray-600 font-medium">12</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">
                                            Legal research for case laws
                                        </td>
                                        <td className="px-4 py-3 text-center border-l border-gray-200">
                                            <span className="inline-flex items-center justify-center min-w-[60px] px-3 py-1.5 rounded-md text-sm font-semibold bg-red-50 text-red-700 border border-red-200">
                                                NO
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center border-l border-gray-200">
                                            <span className="inline-flex items-center justify-center min-w-[60px] px-3 py-1.5 rounded-md text-sm font-semibold bg-red-50 text-red-700 border border-red-200">
                                                NO
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center border-l border-gray-200">
                                            <span className="inline-flex items-center justify-center min-w-[60px] px-3 py-1.5 rounded-md text-sm font-semibold bg-green-50 text-green-700 border border-green-200">
                                                YES
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 text-center text-sm text-gray-600 font-medium">13</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">
                                            Medicolegal Audit of morbidity/mortality cases (for self-improvement on a prophylaxis basis or in litigation)
                                        </td>
                                        <td className="px-4 py-3 text-center border-l border-gray-200">
                                            <span className="inline-flex items-center justify-center min-w-[60px] px-3 py-1.5 rounded-md text-sm font-semibold bg-red-50 text-red-700 border border-red-200">
                                                NO
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center border-l border-gray-200">
                                            <span className="inline-flex items-center justify-center min-w-[60px] px-3 py-1.5 rounded-md text-sm font-semibold bg-red-50 text-red-700 border border-red-200">
                                                NO
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center border-l border-gray-200">
                                            <span className="inline-flex items-center justify-center min-w-[60px] px-3 py-1.5 rounded-md text-sm font-semibold bg-green-50 text-green-700 border border-green-200">
                                                YES
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="bg-gray-100 border-t-2 border-gray-300">
                                        <td className="px-4 py-3 text-center text-sm font-semibold text-gray-900">14</td>
                                        <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                                            Fee per annum
                                        </td>
                                        <td className="px-4 py-3 text-center border-l border-gray-200">
                                            <span className="text-base font-bold text-gray-900">Rs. 15,000</span>
                                        </td>
                                        <td className="px-4 py-3 text-center border-l border-gray-200">
                                            <span className="text-base font-bold text-gray-900">Rs. 25,000</span>
                                        </td>
                                        <td className="px-4 py-3 text-center border-l border-gray-200">
                                            <span className="text-base font-bold text-gray-900">Rs. 35,000</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section D: Hospital Retainership Fee per month */}
            <section className="py-12 border-b border-gray-200">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
                    <div className="mb-8">
                        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
                            D. Hospital Retainership Fee per month
                        </h2>
                    </div>

                    {/* Basic Services Table */}
                    <div className="space-y-8">
                        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <div className="bg-gray-900 text-white px-6 py-4">
                                <h3 className="text-lg font-semibold">I. Basic Services</h3>
                            </div>
                            <div className="p-6">
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 text-sm text-gray-700">
                                    <li className="flex items-start">
                                        <span className="text-green-600 mr-2">✓</span>
                                        <span>General medicolegal consultations</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-600 mr-2">✓</span>
                                        <span>Specific consultation/discussion on medicolegal cases</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-600 mr-2">✓</span>
                                        <span>Drafting of all medicolegal documents</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-600 mr-2">✓</span>
                                        <span>Medical research on contentious issues related to specific complaints</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-600 mr-2">✓</span>
                                        <span>Legal research on case laws related to specific complaints</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-600 mr-2">✓</span>
                                        <span>Online communication – synchronous & asynchronous – may be undertaken any number of times</span>
                                    </li>
                                    <li className="flex items-start md:col-span-2">
                                        <span className="text-green-600 mr-2">✓</span>
                                        <span>The services will apply to ALL the doctors & staff of the hospital</span>
                                    </li>
                                </ul>

                                <div className="overflow-x-auto">
                                    <table className="w-full border border-gray-200">
                                        <thead>
                                            <tr className="bg-gray-50">
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-r border-gray-200">
                                                    Hospital Category
                                                </th>
                                                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">
                                                    Fee (per month)
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            <tr>
                                                <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-200">
                                                    Hospital with &lt; 50 beds
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <span className="text-base font-bold text-gray-900">Rs. 10,000/- pm</span>
                                                </td>
                                            </tr>
                                            <tr className="bg-gray-50">
                                                <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-200">
                                                    Hospital with 51-100 beds
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <span className="text-base font-bold text-gray-900">Rs. 20,000/- pm</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-200">
                                                    Hospital with 100-200 beds
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <span className="text-base font-bold text-gray-900">Rs. 30,000/- pm</span>
                                                </td>
                                            </tr>
                                            <tr className="bg-gray-50">
                                                <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-200">
                                                    Hospital with &gt; 200 beds
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <span className="text-base font-bold text-gray-900">Rs. 40,000/- pm</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Comprehensive Services Table */}
                        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <div className="bg-gray-900 text-white px-6 py-4">
                                <h3 className="text-lg font-semibold">II. Comprehensive Services</h3>
                            </div>
                            <div className="p-6">
                                <p className="text-sm font-semibold text-gray-800 mb-4">
                                    All services from Basic (a to g), plus:
                                </p>
                                <ul className="grid grid-cols-1 gap-3 mb-6 text-sm text-gray-700">
                                    <li className="flex items-start">
                                        <span className="text-blue-600 mr-2 font-bold">i.</span>
                                        <span>Preventive File audit of medical records (up to 10 files per month)</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-600 mr-2 font-bold">ii.</span>
                                        <span>One lecture or group discussion on a medicolegal issue per month (on a day & time of mutual convenience)</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-600 mr-2 font-bold">iii.</span>
                                        <span>Site visit for case discussion to be fixed, not more than twice a month.</span>
                                    </li>
                                </ul>

                                <div className="overflow-x-auto">
                                    <table className="w-full border border-gray-200">
                                        <thead>
                                            <tr className="bg-gray-50">
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-r border-gray-200">
                                                    Hospital Category
                                                </th>
                                                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">
                                                    Fee (per month)
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            <tr>
                                                <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-200">
                                                    Hospital with &lt; 50 beds
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <span className="text-base font-bold text-gray-900">Rs. 20,000/- pm</span>
                                                </td>
                                            </tr>
                                            <tr className="bg-gray-50">
                                                <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-200">
                                                    Hospital with 51-100 beds
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <span className="text-base font-bold text-gray-900">Rs. 30,000/- pm</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-200">
                                                    Hospital with 100-200 beds
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <span className="text-base font-bold text-gray-900">Rs. 40,000/- pm</span>
                                                </td>
                                            </tr>
                                            <tr className="bg-gray-50">
                                                <td className="px-4 py-3 text-sm text-gray-700 border-r border-gray-200">
                                                    Hospital with &gt; 200 beds
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <span className="text-base font-bold text-gray-900">Rs. 50,000/- pm</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Clinics and Diagnostic Centers */}
                        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <div className="bg-gray-900 text-white px-6 py-4">
                                <h3 className="text-lg font-semibold">III. For clinics, diagnostic centers</h3>
                            </div>
                            <div className="p-6">
                                <p className="text-base text-gray-700">
                                    To be decided after discussion
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Payment Information Section */}
            <section id="payment-section" className="py-12 border-b border-gray-200 bg-gray-50">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
                    <div className="mb-8">
                        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
                            Payment Information
                        </h2>
                        <p className="text-gray-600 text-sm md:text-base">
                            Make payments via QR code or bank transfer
                        </p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* QR Code Payment Section */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">SCAN TO PAY</h3>
                                <div className="relative w-full max-w-sm aspect-square bg-white rounded-lg border-2 border-gray-200 p-4 mx-auto">
                                    <div className="relative w-full h-full">
                                        <Image
                                            src="/qr.jpeg"
                                            alt="Payment QR Code"
                                            fill
                                            className="object-contain rounded-lg"
                                            priority
                                            sizes="(max-width: 768px) 100vw, 400px"
                                        />
                                    </div>
                                </div>
                                <div className="text-center space-y-2">
                                    <p className="text-sm font-medium text-gray-900">UPI ID: drsanjaynarula@sbi</p>
                                    <p className="text-xs text-gray-600">Use any UPI app</p>
                                </div>
                            </div>

                            {/* Bank Transfer Section */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 mb-4">
                                    <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                    <h3 className="text-lg font-semibold text-gray-900">Bank Transfer</h3>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                                    <div>
                                        <p className="text-xs font-medium text-gray-600 mb-1">Bank</p>
                                        <p className="text-sm font-semibold text-gray-900">State Bank of India</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-gray-600 mb-1">A/C No.</p>
                                        <p className="text-sm font-semibold text-gray-900">44717262489</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-gray-600 mb-1">IFSC</p>
                                        <p className="text-sm font-semibold text-gray-900">SBIN0060414</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact/Footer Section */}
            <section className="py-12 bg-white">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-16">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 md:p-8 text-center">
                        <p className="text-base text-gray-800 leading-relaxed mb-4">
                            You may visit our website{' '}
                            <a href="https://www.knmedicolegal.com" className="text-blue-600 hover:underline font-medium">
                                www.knmedicolegal.com
                            </a>
                            , register and avail of the services or directly call:
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-900">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                                <span className="font-semibold">Dr Sanjay Narula</span>
                                <span className="text-gray-600">98104 33402</span>
                            </div>
                            <span className="hidden sm:inline text-gray-400">|</span>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                                <span className="font-semibold">Dr PK Kohli</span>
                                <span className="text-gray-600">97178 91104</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
