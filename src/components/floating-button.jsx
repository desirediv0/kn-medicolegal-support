"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { FaUser, FaUserShield, FaSignInAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const publicRoutes = ["/", "/about", "/faq", "/contact"];

export function FloatingButton() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  // Only show on public routes
  if (!publicRoutes.includes(pathname)) {
    return null;
  }

  const handleClick = () => {
    if (status === "loading") return;

    if (!session?.user) {
      // Not logged in - go to auth
      router.push("/user/auth");
    } else if (session.user.role === "ADMIN") {
      // Admin - go to dashboard
      router.push("/dashboard");
    } else {
      // User - go to user page
      router.push("/user");
    }
  };

  // Determine icon and text based on session
  let icon, label;
  if (status === "loading") {
    icon = <FaSignInAlt className="w-5 h-5" />;
    label = "Loading...";
  } else if (!session?.user) {
    icon = <FaSignInAlt className="w-5 h-5" />;
    label = "Login";
  } else if (session.user.role === "ADMIN") {
    icon = <FaUserShield className="w-5 h-5" />;
    label = "Dashboard";
  } else {
    icon = <FaUser className="w-5 h-5" />;
    label = "My Account";
  }

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-primary text-primary-foreground px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group"
      aria-label={label}
    >
      <span className="flex items-center justify-center w-8 h-8 bg-primary-foreground/20 rounded-full group-hover:bg-primary-foreground/30 transition-colors">
        {icon}
      </span>
      <span className="font-medium text-sm hidden sm:inline-block">
        {label}
      </span>
    </motion.button>
  );
}

