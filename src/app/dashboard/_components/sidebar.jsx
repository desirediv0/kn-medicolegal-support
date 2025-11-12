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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ProfileDropdown from "@/components/kokonutui/profile-dropdown";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const mainNavItems = [
  { label: "Overview", icon: <Home size={18} />, href: "/dashboard" },
  {
    label: "Questions",
    icon: <MessageSquare size={18} />,
    href: "/dashboard/questions",
  },
  { label: "Users", icon: <Users size={18} />, href: "/dashboard/users" },
  { label: "Reports", icon: <FileText size={18} />, href: "/dashboard/reports" },
];

const adminNavItems = [
  {
    label: "Admin Panel",
    icon: <Shield size={18} />,
    href: "/dashboard/profile",
  },
  { label: "Storage", icon: <HardDrive size={18} />, href: "/dashboard/storage" },
  { label: "Settings", icon: <Settings size={18} />, href: "/dashboard/settings" },
];

export function AdminSidebar({ onWidthChange }) {
  const [isOpen, setIsOpen] = useState(false); // mobile sidebar
  const [isAdminExpanded, setIsAdminExpanded] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  const profileMenu = useMemo(
    () => [
      { label: "Profile", href: "/dashboard/profile", icon: <Shield className="w-4 h-4" /> },
      { label: "Storage", href: "/dashboard/storage", icon: <HardDrive className="w-4 h-4" /> },
      { label: "Settings", href: "/dashboard/settings", icon: <Settings className="w-4 h-4" /> },
    ],
    []
  );

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
        setIsOpen(true); // Always open on large screen
      } else {
        setIsOpen(false); // closed on small screen
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
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Crown size={18} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm text-black">Dashboard</span>
                <span className="text-xs text-gray-500">Pro</span>
              </div>
            </div>
          )}
          <motion.button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`flex p-1 hover:bg-gray-100 rounded-lg transition-colors ${
              isCollapsed ? "mx-auto" : ""
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

          {/* Admin Section */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <button
              onClick={() => setIsAdminExpanded(!isAdminExpanded)}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors text-black hover:bg-gray-100",
                isCollapsed && "justify-center",
                adminNavItems.some((item) =>
                  pathname.startsWith(item.href)
                ) && !isCollapsed
                  ? "bg-gray-100 font-semibold"
                  : ""
              )}
            >
              <div className="flex items-center gap-2">
                <Shield size={18} className="text-gray-600" />
                {!isCollapsed && (
                  <span className="text-xs font-medium">Admin</span>
                )}
              </div>
              {!isCollapsed && (
                <motion.div animate={{ rotate: isAdminExpanded ? 180 : 0 }}>
                  <PanelLeft size={14} className="text-gray-600" />
                </motion.div>
              )}
            </button>

            <AnimatePresence>
              {isAdminExpanded && !isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 40 }}
                  className="space-y-0.5 mt-1"
                >
                  {adminNavItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => {
                        router.push(item.href);
                        if (!isLargeScreen) setIsOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-1.5 ml-1 rounded-md text-gray-700 hover:bg-gray-100 text-xs"
                    >
                      <span className="text-gray-600">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* User Section */}
        <ProfileDropdown
          isCollapsed={isCollapsed}
          menuItems={profileMenu}
          data={profileData}
          signOutRedirect="/dashboard/auth"
        />
      </motion.aside>
    </>
  );
}
