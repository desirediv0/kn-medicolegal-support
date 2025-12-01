import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-primary text-white border-t border-white/10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-12 sm:px-10 lg:px-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4 lg:col-span-2">
            <p className="text-lg font-semibold uppercase tracking-[0.2em] text-white">
              KN Medicolegal Support
            </p>
            <p className="text-sm text-white/80 leading-relaxed max-w-xl">
              Your Partner in Safe, Secure Clinical Practice. Supporting doctors
              and hospitals in navigating the complex medicolegal landscape.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 text-sm">
            <p className="font-semibold uppercase tracking-[0.15em] text-white">
              Quick Links
            </p>
            <ul className="space-y-2.5 text-white/80">
              <li>
                <Link
                  href="/"
                  className="transition hover:text-primary-foreground inline-flex items-center gap-2"
                >
                  <span className="text-primary-foreground">→</span> Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="transition hover:text-primary-foreground inline-flex items-center gap-2"
                >
                  <span className="text-primary-foreground">→</span> About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="transition hover:text-primary-foreground inline-flex items-center gap-2"
                >
                  <span className="text-primary-foreground">→</span> Services
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="transition hover:text-primary-foreground inline-flex items-center gap-2"
                >
                  <span className="text-primary-foreground">→</span> FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4 text-sm">
            <p className="font-semibold uppercase tracking-[0.15em] text-white">
              Resources
            </p>
            <ul className="space-y-2.5 text-white/80">
              <li>
                <Link
                  href="/knowledge-hub"
                  className="transition hover:text-primary-foreground inline-flex items-center gap-2"
                >
                  <span className="text-primary-foreground">→</span> Knowledge
                  Hub
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="transition hover:text-primary-foreground inline-flex items-center gap-2"
                >
                  <span className="text-primary-foreground">→</span> Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/fee-packages"
                  className="transition hover:text-primary-foreground inline-flex items-center gap-2"
                >
                  <span className="text-primary-foreground">→</span> Fee &
                  Packages
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="transition hover:text-primary-foreground inline-flex items-center gap-2"
                >
                  <span className="text-primary-foreground">→</span> Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/user/auth"
                  className="transition hover:text-primary-foreground inline-flex items-center gap-2"
                >
                  <span className="text-primary-foreground">→</span> Login /
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Policies */}
        <div className="space-y-4 text-sm">
          <p className="font-semibold uppercase tracking-[0.15em] text-white">
            Legal & Policies
          </p>
          <div className="flex flex-wrap gap-4 md:gap-6 text-white/80">
            <Link
              href="/terms-and-conditions"
              className="transition hover:text-primary-foreground inline-flex items-center gap-2 text-sm"
            >
              <span className="text-primary-foreground">→</span> Terms and
              Conditions
            </Link>
            <Link
              href="/privacy-policy"
              className="transition hover:text-primary-foreground inline-flex items-center gap-2 text-sm"
            >
              <span className="text-primary-foreground">→</span> Privacy Policy
            </Link>
            <Link
              href="/refund-policy"
              className="transition hover:text-primary-foreground inline-flex items-center gap-2 text-sm"
            >
              <span className="text-primary-foreground">→</span> Refund Policy
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/60 leading-relaxed text-center sm:text-left">
            © {new Date().getFullYear()} KN Medicolegal Support. All rights
            reserved.
          </p>
          <p className="text-xs text-white/60 leading-relaxed text-center sm:text-right">
            Upholding patient confidentiality and regulatory compliance.
          </p>
        </div>
      </div>
    </footer>
  );
}
