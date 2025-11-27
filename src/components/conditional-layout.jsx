"use client";

import { usePathname } from "next/navigation";
import { Header } from "./header";
import { Footer } from "./footer";
import { FloatingButton } from "./floating-button";

const publicRoutes = ["/", "/about", "/faq", "/contact", "/services", "/index","/knowledge-hub", "/gallery","/fee-packages"];

const isPublicRoute = (pathname) => {
  if (!pathname) return false;

  // Check exact matches
  if (publicRoutes.includes(pathname)) return true;

  // Check if it's a knowledge-hub route
  if (pathname.startsWith("/knowledge-hub")) return true;

  return false;
};

export function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const showHeaderFooter = isPublicRoute(pathname);

  return (
    <>
      {showHeaderFooter && <Header />}
      {children}
      {showHeaderFooter && <Footer />}
      {showHeaderFooter && <FloatingButton />}
    </>
  );
}
