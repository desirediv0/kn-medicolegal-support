"use client";

import { Suspense, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { UserSidebar } from "./_components/sidebar";
import Link from "next/link";
import Image from "next/image";
import UserWelcomeGuide from "@/components/user-welcome-guide";

const LayoutContent = ({ children }) => {
  const pathname = usePathname();
  const [, setSidebarWidth] = useState(224);
  const [showWelcomeGuide, setShowWelcomeGuide] = useState(false);
  const hideSidebar = pathname?.startsWith("/user/auth");

  // Listen for custom event to open guide manually from any page
  useEffect(() => {
    const handleOpenGuide = () => {
      setShowWelcomeGuide(true);
    };

    window.addEventListener("openWelcomeGuide", handleOpenGuide);
    return () => {
      window.removeEventListener("openWelcomeGuide", handleOpenGuide);
    };
  }, []);

  if (hideSidebar) {
    return <div className="min-h-[100dvh] bg-background">{children}</div>;
  }

  const navLinks = [
    { title: "Home", href: "/" },
    { title: "About Us", href: "/about" },
    { title: "Knowledge Hub", href: "/knowledge-hub" },
    { title: "Services", href: "/services" },
    { title: "Contact", href: "/contact" },
  ];

  return (
    <>
      {showWelcomeGuide && (
        <UserWelcomeGuide onClose={() => setShowWelcomeGuide(false)} />
      )}
      <div className="flex h-[100dvh] overflow-hidden bg-background">
        <UserSidebar onWidthChange={setSidebarWidth} />
        <main className="flex-1 flex flex-col min-h-[100dvh] transition-all duration-300">
        <nav className="flex items-center justify-between gap-6 bg-white text-foreground px-6 py-4 backdrop-blur-lg border-b border-foreground/10 shadow-sm mx-auto md:mx-0">
          <div className="flex items-center gap-3 justify-center">
            <Link
              href="/"
              className="relative h-16 w-auto pl-10 bg-white p-1 flex items-center justify-center scale-110 md:scale-125"
            >
              <Image
                src="/logo.png"
                alt="KN Medicolegal Support logo"
                width={80}
                height={80}
                priority
                className="scale-150"
              />
            </Link>

          </div>
          <div className="hidden items-center gap-8 text-sm font-medium text-primary/90 md:flex">
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
        </nav>
        <div className="flex-1 overflow-y-auto px-3 pb-6 pt-4">{children}</div>
        </main>
      </div>
    </>
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
