"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  MessageSquare,
  Users,
  Settings,
  Crown,
  PanelLeft,
  FileText,
  Shield,
  HardDrive,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const mainNavItems = [
  {
    label: "Admin Profile",
    icon: <Shield size={18} />,
    href: "/dashboard/profile",
  },
  { label: "Overview", icon: <Home size={18} />, href: "/dashboard" },
  {
    label: "Questions",
    icon: <MessageSquare size={18} />,
    href: "/dashboard/questions",
  },
  { label: "Users", icon: <Users size={18} />, href: "/dashboard/users" },
  { label: "Reports", icon: <FileText size={18} />, href: "/dashboard/reports" },
  { label: "Storage", icon: <HardDrive size={18} />, href: "/dashboard/storage" },
  { label: "Question Pricing", icon: <Settings size={18} />, href: "/dashboard/settings" },
];


export function AdminSidebar({ onWidthChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();


  const profileData = useMemo(
    () => ({
      name: session?.user?.name ?? "Administrator",
      email: session?.user?.email ?? "admin@example.com",
      avatar: session?.user?.image ?? "",
    }),
    [session]
  );

  // detect screen width
  useEffect(() => {
    const handleResize = () => {
      const large = window.innerWidth >= 1024;
      setIsLargeScreen(large);
      if (large) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // adjust sidebar width
  const sidebarWidth = isCollapsed ? 80 : 224;
  useEffect(() => {
    if (onWidthChange) onWidthChange(sidebarWidth);
  }, [sidebarWidth, onWidthChange]);

  const itemVariants = {
    open: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05 },
    }),
    closed: { opacity: 0, x: -20 },
  };

  return (
    <>
      {/* Mobile Hamburger */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="bg-white border border-gray-200 text-black hover:bg-gray-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Overlay (mobile only) */}
      <AnimatePresence>
        {!isLargeScreen && isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isLargeScreen ? 0 : isOpen ? 0 : -260,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "fixed lg:static top-0 left-0 h-[100dvh] bg-white border-r border-gray-200 z-50 flex flex-col px-3 py-4 overflow-y-auto transition-all duration-300",
          isCollapsed ? "w-20" : "w-56"
        )}
      >
        {/* Logo + Collapse */}
        <div className="flex items-center justify-between px-2 mb-6">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 via-primary to-primary flex items-center justify-center">
                <Crown size={18} className="text-white" />
              </div>
              <div className="flex flex-col">
                {profileData && (
                  <span className="font-bold text-sm text-black">
                    {profileData.name}
                  </span>
                )}
              </div>
            </div>
          )}
          <motion.button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`flex p-1 hover:bg-gray-100 rounded-lg transition-colors ${isCollapsed ? "mx-auto" : ""
              }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <PanelLeft
              size={16}
              className={cn("text-gray-600 transition-transform")}
            />
          </motion.button>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-1 flex-1">
          {mainNavItems.map((item, i) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);
            return (
              <motion.button
                key={item.label}
                custom={i}
                variants={itemVariants}
                initial={false}
                animate="open"
                whileHover={{ x: 2, backgroundColor: "#f3f4f6" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  router.push(item.href);
                  if (!isLargeScreen) setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-2 rounded-md transition-colors text-black hover:bg-gray-100 group",
                  isCollapsed && "justify-center",
                  isActive && !isCollapsed
                    ? "bg-gray-100 font-semibold"
                    : ""
                )}
                title={isCollapsed ? item.label : ""}
              >
                <span className="text-gray-600 flex-shrink-0">{item.icon}</span>
                {!isCollapsed && (
                  <span className="text-xs font-medium truncate">
                    {item.label}
                  </span>
                )}
              </motion.button>
            );
          })}



        </nav>

        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/dashboard/auth" })}
          className={`w-full flex items-center gap-3 p-3 duration-200 bg-red-500/10 rounded-xl hover:bg-red-500/20 cursor-pointer border border-transparent hover:border-red-500/30 hover:shadow-sm transition-all group mt-4 ${isCollapsed ? "justify-center" : ""}`}
        >
          <LogOut className="w-4 h-4 text-red-500 group-hover:text-red-600" />
          {!isCollapsed && (
            <span className="text-sm font-medium text-red-500 group-hover:text-red-600">
              Sign Out
            </span>
          )}
        </button>

      </motion.aside>
    </>
  );
}
