"use client";

import { Suspense, useState } from "react";
import { usePathname } from "next/navigation";
import { UserSidebar } from "./_components/sidebar";
import Link from "next/link";
import Image from "next/image";



const LayoutContent = ({ children }) => {
  const pathname = usePathname();
  const [, setSidebarWidth] = useState(224);
  const hideSidebar = pathname?.startsWith("/user/auth");



  if (hideSidebar) {
    return <div className="min-h-[100dvh] bg-background">{children}</div>;
  }

  const navLinks = [
    { title: "Home", href: "/" },
    { title: "Services", href: "/#services" },
    { title: "Testimonials", href: "/#testimonials" },
    { title: "Contact", href: "/#contact" },
  ];

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-background">
      <UserSidebar onWidthChange={setSidebarWidth} />
      <main className="flex-1 flex flex-col min-h-[100dvh] transition-all duration-300">

        <nav className="flex items-center justify-between gap-6  bg-[#1C2C36] text-foreground px-6 py-4 backdrop-blur-lg">
          <div className="flex items-center gap-3">
            <Link
              href="/user/profile"
              className="relative h-16 w-16 overflow-hidden rounded-2xl border border-primary-foreground/40 bg-white p-1 flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="KN Medicolegal Support logo"
                width={80}
                height={80}
                priority
              />
            </Link>
            <div className="flex flex-col text-xs font-semibold uppercase tracking-[0.35em] text-primary-foreground">
              <span>KN</span>
              <span>Medicolegal Support</span>
            </div>
          </div>
          <div className="hidden items-center gap-8 text-sm font-medium text-primary-foreground/90 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="transition hover:text-primary-foreground/80"
              >
                {link.title}
              </Link>
            ))}
          </div>

        </nav>
        <div className="flex-1 overflow-y-auto px-3 pb-6 pt-4">{children}</div>
      </main>
    </div>
  );
};

const LayoutFallback = () => (
  <div className="flex h-[100dvh] items-center justify-center bg-background text-sm text-foreground/70">
    Loading your dashboard…
  </div>
);

const Layout = ({ children }) => {
  return (
    <Suspense fallback={<LayoutFallback />}>
      <LayoutContent>{children}</LayoutContent>
    </Suspense>
  );
};

export default Layout;
