import Link from "next/link";

export default function SanjayNarulaPage() {
    return (
        <main className="min-h-screen bg-white text-gray-900">
            <section className="border-b border-gray-200 bg-gray-50">
                <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-10 py-10 md:py-14">
                    <div className="space-y-3">
                        <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-gray-600">
                            About the Expert
                        </p>
                        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
                            Dr Sanjay Narula
                        </h1>
                        <p className="text-sm md:text-base text-gray-700">
                            MBBS, MS, FIAGES — General surgeon and experienced medicolegal expert
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-white">
                <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-10 py-10 md:py-14">
                    <div className="space-y-4 text-sm md:text-base leading-relaxed text-gray-800">
                        <p>
                            Dr Sanjay Narula, MBBS, MS, FIAGES, is a qualified general surgeon and experienced
                            medicolegal expert. He has 36 years of surgical experience following his MS in General
                            Surgery from PGIMS, Rohtak, in 1989. He has been chairman of the District Medical
                            Negligence Board for many years and has conducted more than 600 enquiries. He was
                            instrumental in making the first disaster management plan for Haryana and was the
                            contributing author to the “patient safety guidelines” published by the Government of
                            India.
                        </p>
                        <p>
                            He has conducted more than 2000 postmortem examinations and done hundreds of MLC cases.
                            He has been part of SIT, a member of the State crisis committee, and associated with
                            medicolegal investigations in some high-profile cases. He has been providing medicolegal
                            support to doctors and hospitals and has helped several hospitals to formulate guidelines
                            in tricky situations.
                        </p>
                    </div>

                    <div className="mt-8">
                        <Link
                            href="/about"
                            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                        >
                            ← Back to About Us
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}


