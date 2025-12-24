"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Menu, X, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { title: "Home", href: "/" },
  { title: "About Us", href: "/about" },
  { title: "Services", href: "/services" },
  { title: "Knowledge Hub", href: "/knowledge-hub" },
  { title: "Gallery", href: "/gallery" },
  { title: "Fee & Packages", href: "/fee-packages" },
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
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b border-foreground/10 bg-background backdrop-blur-md supports-[backdrop-filter]:bg-background/80 shadow-sm"
    >
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 md:gap-6 px-4 sm:px-6 py-3 md:py-4 lg:px-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-2 md:gap-3"
        >
          <Link
            href="/"
            className="relative h-16 w-auto overflow-hidden flex items-center justify-center  md:scale-x-110 transition-shadow"
            onClick={closeMenu}
          >
            <Image
              src="/logo.png"
              alt="KN Medicolegal Support logo"
              width={120}
              height={120}
              priority
            />
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hidden items-center gap-6 lg:gap-8 text-sm font-medium text-foreground/80 md:flex"
        >
          {navLinks.map((link, index) => (
            <motion.div
              key={link.title}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
            >
              <Link
                href={link.href}
                className="relative transition hover:text-foreground group"
              >
                {link.title}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary-foreground transition-all group-hover:w-full" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Desktop Auth Buttons */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="hidden md:flex items-center gap-2 lg:gap-3"
        >
          {profileData?.name ? (
            <Link
              href={
                profileData.role === "ADMIN"
                  ? "/dashboard"
                  : "/user/dashboard"
              }
              className="inline-flex items-center justify-center rounded-full bg-primary px-4 lg:px-6 py-2 lg:py-2.5 text-xs lg:text-sm font-semibold text-white shadow-md shadow-primary/30 transition hover:shadow-lg hover:scale-105 whitespace-nowrap"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/user/auth?mode=register"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary-foreground to-[hsl(var(--contact-gradient-to))] px-4 lg:px-5 py-2 lg:py-2.5 text-xs lg:text-sm font-semibold text-primary shadow-md shadow-primary-foreground/30 transition hover:shadow-lg hover:scale-105 whitespace-nowrap"
              >
                New User
              </Link>
              <Link
                href="/user/auth"
                className="inline-flex items-center justify-center rounded-full bg-primary px-4 lg:px-5 py-2 lg:py-2.5 text-xs lg:text-sm font-semibold text-white shadow-md shadow-primary/30 transition hover:shadow-lg hover:scale-105 whitespace-nowrap"
              >
                Login
              </Link>
            </>
          )}
        </motion.div>

        {/* Mobile User Icon & Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          {/* User Icon - Left of Hamburger */}
          <Link
            href={profileData?.name ? (profileData.role === "ADMIN" ? "/dashboard" : "/user") : "/user/auth"}
            className="p-2 text-foreground hover:bg-foreground/5 rounded-lg transition inline-flex items-center justify-center no-underline hover:no-underline border-none focus:ring-0"
            aria-label="User account"
          >
            <User size={24} />
          </Link>

          {/* Hamburger Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            onClick={toggleMenu}
            className="p-2 text-foreground hover:bg-foreground/5 rounded-lg transition inline-flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-foreground/10 bg-background/95 backdrop-blur-md overflow-hidden"
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 space-y-3">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="block py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition"
                  >
                    {link.title}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="pt-3 border-t border-foreground/10 space-y-2"
              >
                {profileData?.name ? (
                  <Link
                    href={
                      profileData.role === "ADMIN"
                        ? "/dashboard"
                        : "/user/dashboard"
                    }
                    onClick={closeMenu}
                    className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/30 transition hover:shadow-lg w-full"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/user/auth?mode=register"
                      onClick={closeMenu}
                      className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary-foreground to-[hsl(var(--contact-gradient-to))] px-4 py-2.5 text-sm font-semibold text-primary shadow-md shadow-primary-foreground/30 transition hover:shadow-lg w-full uppercase tracking-wider"
                    >
                      New User Registration
                    </Link>
                    <Link
                      href="/user/auth"
                      onClick={closeMenu}
                      className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/30 transition hover:shadow-lg w-full uppercase tracking-wider"
                    >
                      Login
                    </Link>
                  </>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

