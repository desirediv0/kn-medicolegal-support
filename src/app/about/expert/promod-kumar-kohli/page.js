import Link from "next/link";

export default function PromodKumarKohliPage() {
    return (
        <main className="min-h-screen bg-white text-gray-900">
            <section className="border-b border-gray-200 bg-gray-50">
                <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-10 py-10 md:py-14">
                    <div className="space-y-3">
                        <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-gray-600">
                            About the Expert
                        </p>
                        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
                            Dr Promod Kumar Kohli
                        </h1>
                        <p className="text-sm md:text-base text-gray-700">
                            Qualified &amp; experienced surgeon and medicolegal expert
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-white">
                <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-10 py-10 md:py-14">
                    <div className="space-y-4 text-sm md:text-base leading-relaxed text-gray-800">
                        <p>
                            Dr Promod Kumar Kohli is a qualified &amp; experienced surgeon and a qualified &amp;
                            experienced medicolegal expert. His experience has seen him in different capacities in
                            practically all categories of hospitals – as a consultant surgeon, Dean of Medical
                            Education, and as Medical Director. He graduated in 1973 from the Medical College,
                            Rohtak, and obtained his MS (Surgery), MNAMS (Surgery), and PhD (Surgery) from PGIMER,
                            Chandigarh.
                        </p>
                        <p>
                            He gained medicolegal experience since 2003, holding an LLB (DU), PGD-MLS (Pune), and
                            PGD-HHM (Pune). He has retired from active clinical work since 2021 and now devotes his
                            professional time &amp; energy only to medicolegal services.
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


