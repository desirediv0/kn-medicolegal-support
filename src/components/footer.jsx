import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-primary text-white border-t border-white/10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-12 sm:px-10 lg:px-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <p className="text-base font-medium uppercase tracking-[0.3em] text-white">
              KN Medicolegal Support
            </p>
            <p className="text-sm text-white/80 leading-relaxed max-w-xl">
              Your Partner in Safe, Secure Clinical Practice. Supporting doctors
              and hospitals in navigating the complex medicolegal landscape.
            </p>
          </div>
          <div className="space-y-4 text-sm">
            <p className="font-medium uppercase tracking-[0.2em] text-white">
              Quick Links
            </p>
            <ul className="space-y-2.5 text-white/80">
              <li>
                <Link href="/" className="transition hover:text-primary-foreground inline-flex items-center gap-2">
                  <span className="text-primary-foreground">→</span> Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition hover:text-primary-foreground inline-flex items-center gap-2">
                  <span className="text-primary-foreground">→</span> About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="transition hover:text-primary-foreground inline-flex items-center gap-2">
                  <span className="text-primary-foreground">→</span> Services
                </Link>
              </li>
              <li>
                <Link href="/faq" className="transition hover:text-primary-foreground inline-flex items-center gap-2">
                  <span className="text-primary-foreground">→</span> FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition hover:text-primary-foreground inline-flex items-center gap-2">
                  <span className="text-primary-foreground">→</span> Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="h-px bg-white/10" />
        <p className="text-xs text-white/60 leading-relaxed">
          © {new Date().getFullYear()} KN Medicolegal Support. All rights
          reserved. We facilitate collaboration among healthcare providers,
          legal experts, and insurers while upholding patient confidentiality
          and regulatory compliance.
        </p>
      </div>
    </footer>
  );
}

