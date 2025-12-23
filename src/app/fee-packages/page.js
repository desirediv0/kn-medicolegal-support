"use client";


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
                            Transparent medico-legal services as per official documentation. No assumptions, no marketing. No hidden charges.
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
                            <p>
                                Registration on this site is free. It permits you to access the contents of the Knowledge Hub, which has important medicolegal information and is updated periodically.
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

                    <div className="grid gap-6 md:gap-8 md:grid-cols-2">
                        {/* Free Registration Card */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900 capitalize">Free Registration</h3>
                                <span className="text-sm font-semibold text-green-500">Free</span>
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                Registration on this site is free. It permits you to access the contents of the Knowledge Hub, which has important medicolegal information and is updated periodically.
                            </p>
                        </div>



                        {/* Case specific formal medicolegal consultation Card */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900 capitalize">Case specific formal medicolegal consultation</h3>
                                <span className="text-sm font-semibold text-gray-900">₹10,000</span>
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                For complaint-related cases (civil, criminal, or consumer court complaint, or medical board or medical council proceedings, or a legal notice)
                            </p>
                            <p className="text-xs text-gray-600 mt-2">
                                <strong>Validity:</strong> 30 days
                            </p>
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
                            The fee for this will be decided on the advanced chat and will depend on the complexity of the document to be drafted – simple, complex, or very complex document.
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
                            Services are offered according to the selected category (Category I, II, or III). The essential features of different categories of membership are:
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
                                            Consultations / Chats (online and/or offline)
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
                                            Preparing the Defence Strategy
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
                                            Medicolegal Audit of morbidity / mortality cases (for self-improvement on a prophylaxis basis or in litigation)
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
                        <h3 className="text-lg font-semibold text-gray-900">The services include the following</h3>
                        <ul className="space-y-2 text-sm md:text-base text-gray-700 leading-relaxed list-disc list-inside">
                            <li>General medicolegal consultations</li>
                            <li>Specific consultation / discussion on medicolegal issues</li>
                            <li>Drafting of all medicolegal documents</li>
                            <li>File audit of medical records (up to 10 files per month)</li>
                            <li>Medical research on contentious issues related to specific complaints</li>
                            <li>Legal research on case laws related to specific complaints</li>
                            <li>One lecture or group discussion on a medicolegal issue per month (on a day &amp; time of mutual convenience)</li>
                            <li>
                                Site visit to be fixed, not more than twice a month. Online communication – synchronous &amp;
                                asynchronous – may be undertaken any number of times.
                            </li>
                        </ul>
                        <div className="text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-md p-4">
                            <strong>Important Note:</strong> The services will apply to ALL the doctors &amp; staff of the hospital.
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
