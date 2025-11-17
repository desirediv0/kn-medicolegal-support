import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-primary/90 text-primary-foreground">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-12 sm:px-10 lg:px-16">
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-foreground/70">
              KN Medicolegal Support
            </p>
            <p className="text-sm text-primary-foreground/80">
              Your Partner in Safe, Secure Clinical Practice. Supporting doctors
              and hospitals in navigating the complex medicolegal landscape.
            </p>
          </div>
          <div className="space-y-3 text-sm">
            <p className="font-semibold uppercase tracking-[0.2em] text-primary-foreground/60">
              Quick Links
            </p>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>
                <Link href="/" className="transition hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#services" className="transition hover:text-white">
                  Services
                </Link>
              </li>

              <li>
                <Link href="/faq" className="transition hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

        </div>
        <div className="h-px bg-primary-foreground/20" />
        <p className="text-xs text-primary-foreground/70">
          © {new Date().getFullYear()} KN Medicolegal Support. All rights
          reserved. We facilitate collaboration among healthcare providers,
          legal experts, and insurers while upholding patient confidentiality
          and regulatory compliance.
        </p>
      </div>
    </footer>
  );
}

