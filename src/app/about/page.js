"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  const experts = [
    {
      name: "Dr. Promod Kumar Kohli",
      title: "Medicolegal Expert & Surgeon",
      photo: "/pkk.png",
      bio: [
        "Qualified surgeon and seasoned medicolegal expert with leadership roles across hospitals as Consultant Surgeon, Dean of Medical Education, and Medical Director.",
        "Medicolegal experience with a focus on documentation strength, compliance, and defence strategy.",
      ],
    },
    {
      name: "Dr. Sanjay Narula",
      title: "MBBS, MS, FIAGES — Medicolegal Expert",
      photo: "/sanjay-narula.jpeg",
      bio: [
        "General surgeon with 36+ years of clinical experience; extensive medicolegal practice including high-profile investigations.",
        "Former Chairman, District Medical Negligence Board; contributor to disaster management and patient safety guidelines.",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Intro Section */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-10 py-12 md:py-16">
          <div className="space-y-4">
            <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-gray-600">
              KN Medicolegal Support
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight">
              Experts in Medicolegal Guidance for Healthcare Professionals
            </h1>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl">
              We are experienced clinicians and medicolegal specialists focused on preventing, anticipating, and defending medicolegal risks with clear, actionable guidance tailored to hospitals and doctors.
            </p>
          </div>
        </div>
      </section>

      {/* Experts Section */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-10 py-12 md:py-16">
          <div className="space-y-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">Our Expert Team</h2>
            <p className="text-gray-700 max-w-3xl">
              Seasoned medicolegal professionals with decades of clinical leadership and case experience.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {experts.map((expert) => (
              <div
                key={expert.name}
                className="rounded-xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm"
              >
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="h-32 w-32 md:h-40 md:w-40 rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200 mb-4 shadow-sm">
                    <Image
                      src={expert.photo}
                      alt={expert.name}
                      width={160}
                      height={160}
                      className="h-full w-full object-cover"
                      priority
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900">{expert.name}</h3>
                    <p className="text-sm md:text-base font-medium text-gray-700">{expert.title}</p>
                  </div>
                </div>
                <div className="space-y-2 text-gray-700 leading-relaxed text-center md:text-left">
                  {expert.bio.map((line, idx) => (
                    <p key={idx} className="text-sm md:text-base">
                      {line}
                    </p>
                  ))}
                </div>
                <div className="mt-4 text-center md:text-left">
                  <Link
                    href={`/about/expert/${expert.name.toLowerCase().replace(/\s+/g, '-').replace('dr.-', '')}`}
                    className="inline-block text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    Click here to read more
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Long Description */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-10 py-12 md:py-16">
          <div className="space-y-6 max-w-4xl text-gray-800 leading-relaxed">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">Our Approach</h2>
            <p className="text-base md:text-lg">
              KN Medicolegal Support was founded by seasoned surgeons who have worked across the full spectrum of healthcare settings. For several decades they have been providing structured guidance to strengthen documentation, ensure compliance, and build defensible clinical practice systems.
            </p>
            <p className="text-base md:text-lg">
              We prioritize clear, pragmatic advice tailored to real-world clinical workflows. Our focus spans preventive protocols, early issue recognition, and robust defence strategies for legal notices, court matters, and medical council cases.
            </p>
            <p className="text-base md:text-lg">
              Every engagement is handled with confidentiality and professionalism—aimed at protecting patient safety and clinician credibility.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
