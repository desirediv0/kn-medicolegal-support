"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_55%)]" />
        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-16 sm:px-10 lg:px-16 text-center">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            About Us
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-primary-foreground/80">
            Precision, Protection, and Professional Support
          </p>
        </div>
      </section>

      <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 lg:px-16">
        {/* About Us - Doctors */}
        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-primary mb-8 text-center">
            Our Expert Team
          </h2>
          <div className="grid gap-8 lg:grid-cols-2">
            <Card className="rounded-2xl border border-primary/20 bg-white/70 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">
                  Dr. Promod Kumar Kohli
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-foreground/80 leading-relaxed">
                <p>
                  Dr Promod Kumar Kohli is a qualified & experienced surgeon and
                  a qualified & experienced Medicolegal expert. His experience
                  has seen him in different capacities in practically all
                  categories of hospitals – as a consultant surgeon, Dean of
                  Medical Education, and as Medical Director.
                </p>
                <div className="pt-3 border-t border-primary/10">
                  <p className="font-semibold text-primary mb-2">Qualifications:</p>
                  <ul className="space-y-1 text-sm">
                    <li>• Graduated in 1973 from Medical College, Rohtak</li>
                    <li>• MS (Surgery), MNAMS (Surgery), PhD (Surgery) from PGIMER, Chandigarh</li>
                    <li>• LLB (DU), PGD-MLS (Pune), PGD-HHM (Pune)</li>
                    <li>• Medicolegal experience since 2003</li>
                  </ul>
                </div>
                <p className="pt-3 border-t border-primary/10 italic text-sm">
                  Retired from active clinical work since 2021 and now devotes
                  his professional time & energy only to medicolegal services.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border border-primary/20 bg-white/70 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">
                  Dr. Sanjay Narula
                </CardTitle>
                <p className="text-sm text-foreground/70">MBBS, MS, FIAGES</p>
              </CardHeader>
              <CardContent className="space-y-3 text-foreground/80 leading-relaxed">
                <p>
                  Dr Sanjay Narula is a qualified general surgeon and experienced
                  medicolegal expert. He has 36 years of surgical experience
                  following his MS in General Surgery from PGIMS, Rohtak, in 1989.
                </p>
                <div className="pt-3 border-t border-primary/10">
                  <p className="font-semibold text-primary mb-2">Key Achievements:</p>
                  <ul className="space-y-1 text-sm">
                    <li>• Chairman of District Medical Negligence Board (many years)</li>
                    <li>• Conducted more than 600 enquiries</li>
                    <li>• Instrumental in making the first disaster management plan for Haryana</li>
                    <li>• Contributing author to &quot;patient safety guidelines&quot; published by Government of India</li>
                    <li>• Conducted more than 2000 postmortem examinations</li>
                    <li>• Done hundreds of MLC cases</li>
                    <li>• Part of SIT, member of State crisis committee</li>
                    <li>• Associated with medicolegal investigations in high-profile cases</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Services Provided */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-primary mb-8 text-center">
            Services Provided
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Medicolegal Consultation (on phone, Chat, Email, in-person)",
              "Drafting of Legal documents (Reply, Evidence, Arguments, Affidavits, MOUs, etc.)",
              "Drafting of Expert opinions for Expert evidence",
              "Medical Research on contentious issues",
              "Legal research for relevant case laws",
              "Inputs to Advocates for medicolegal support",
              "Hospital Medical record file audits",
              "On-site emergency medicolegal support",
              "Annual/monthly medicolegal support packages for individual doctors/hospitals",
            ].map((service, index) => (
              <Card
                key={index}
                className="rounded-2xl border border-primary/20 bg-white/70 shadow-md hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-xs">
                      {String.fromCharCode(97 + index)}
                    </span>
                    <p className="text-foreground/80 leading-relaxed">{service}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>


        {/* Relevant Acts & Rules */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-primary mb-8 text-center">
            Relevant Acts & Rules
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              "CPA 2019",
              "PC-PNDT Act",
              "MTP Act",
              "NMC guidelines 2023 (held in abeyance)",
              "Telemedicine guidelines",
            ].map((act, index) => (
              <Card
                key={index}
                className="rounded-2xl border border-primary/20 bg-white/70 shadow-md"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-xs">
                      {String.fromCharCode(97 + index)}
                    </span>
                    <p className="text-foreground/80 font-medium">{act}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Relevant Case Laws */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-primary mb-8 text-center">
            Relevant Case Laws which all doctors must read
          </h2>
          <div className="space-y-4">
            {[
              "Jacob Mathew vs State of Punjab; 2005 (6) SCC 1",
              "Samira Kohli vs Dr Prabha Manchanda",
              "Kusum Sharma & ors vs Batra Hospital and Medical Research Centre; 2010(2) BCR 599",
              "Nizam's Institute of Medical Sciences vs Prasanth S. Dhananka & ors; Civil appeal no.4119 of 1999",
            ].map((caseLaw, index) => (
              <Card
                key={index}
                className="rounded-2xl border border-primary/20 bg-white/70 shadow-md"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-xs">
                      {String.fromCharCode(97 + index)}
                    </span>
                    <p className="text-foreground/80 leading-relaxed">{caseLaw}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
