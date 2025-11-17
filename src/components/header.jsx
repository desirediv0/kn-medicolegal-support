"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { title: "Home", href: "/" },
  { title: "About Us", href: "/about" },
  { title: "Services", href: "/#services" },
  { title: "FAQ", href: "/faq" },
  { title: "Contact Us", href: "/contact" },
];

export function Header() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const profileData = useMemo(
    () => ({
      name: session?.user?.name,
      role: session?.user?.role,
    }),
    [session]
  );

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-primary/95 backdrop-blur supports-[backdrop-filter]:bg-primary/80">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-4 sm:px-10 lg:px-16">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="relative h-12 md:h-16 w-12 md:w-16 overflow-hidden rounded-2xl border border-primary-foreground/40 bg-white p-1 flex items-center justify-center"
            onClick={closeMenu}
          >
            <Image
              src="/logo.png"
              alt="KN Medicolegal Support logo"
              width={80}
              height={80}
              priority
            />
          </Link>
          <div className="flex flex-col text-[10px] md:text-xs font-semibold uppercase tracking-[0.35em] text-primary-foreground">
            <span>KN</span>
            <span className="hidden sm:inline">Medicolegal Support</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 text-sm font-medium text-primary-foreground/90 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="transition hover:text-primary-foreground"
            >
              {link.title}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Button */}
        <div className="hidden md:flex items-center gap-3">
          {profileData?.name ? (
            <Link
              href={
                profileData.role === "ADMIN"
                  ? "/dashboard/profile"
                  : "/user/profile"
              }
              className="inline-flex items-center justify-center rounded-full bg-primary-foreground px-4 md:px-5 py-1 md:py-2 text-xs md:text-sm font-semibold text-primary shadow-lg shadow-black/10 transition hover:shadow-xl"
            >
              Welcome, {profileData && profileData?.name?.split(" ")[0]}
            </Link>
          ) : (
            <Link
              href="/user/auth"
              className="inline-flex items-center justify-center rounded-full bg-primary-foreground px-4 md:px-5 py-2 md:py-2 text-xs md:text-sm font-semibold text-primary shadow-lg shadow-black/10 transition hover:shadow-xl text-nowrap"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-primary-foreground hover:bg-primary-foreground/10 rounded-lg transition"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-primary-foreground/20 bg-primary/95 backdrop-blur">
          <div className="mx-auto max-w-7xl px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                onClick={closeMenu}
                className="block py-2 text-sm font-medium text-primary-foreground/90 hover:text-primary-foreground transition"
              >
                {link.title}
              </Link>
            ))}
            <div className="pt-3 border-t border-primary-foreground/20">
              {profileData?.name ? (
                <Link
                  href={
                    profileData.role === "ADMIN"
                      ? "/dashboard/profile"
                      : "/user/profile"
                  }
                  onClick={closeMenu}
                  className="inline-flex items-center justify-center rounded-full bg-primary-foreground px-4 py-2 text-sm font-semibold text-primary shadow-lg shadow-black/10 transition hover:shadow-xl w-full"
                >
                  Welcome, {profileData && profileData?.name?.split(" ")[0]}
                </Link>
              ) : (
                <Link
                  href="/user/auth"
                  onClick={closeMenu}
                  className="inline-flex items-center justify-center rounded-full bg-primary-foreground px-4 py-2 text-sm font-semibold text-primary shadow-lg shadow-black/10 transition hover:shadow-xl w-full"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

