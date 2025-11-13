"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  MessageSquare,
  Crown,
  PanelLeft,
  Loader2,
  Clock,
  User,
  FileText,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export function UserSidebar({ onWidthChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeQuestionId = searchParams.get("question");
  const { data: session, status } = useSession();

  const fetchQuestions = useCallback(async () => {
    if (!session?.user?.id) return;
    setLoading(true);
    try {
      const response = await fetch("/api/questions", { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Failed to load questions");
      }
      const data = await response.json();
      setQuestions(data.questions ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [session?.user?.id]);

  const profileData = useMemo(
    () => ({
      name: session?.user?.name ?? "User",
      email: session?.user?.email ?? "user@example.com",
      avatar: session?.user?.image ?? "",
    }),
    [session]
  );

  // Detect screen width
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

  useEffect(() => {
    if (status === "authenticated") {
      fetchQuestions();
    } else if (status === "unauthenticated") {
      setQuestions([]);
    }
  }, [status, fetchQuestions]);

  const handleSelectQuestion = (questionId) => {
    router.replace(`/user?question=${questionId}`, { scroll: false });
    if (!isLargeScreen) {
      setIsOpen(false);
    }
  };

  // Sidebar width adjust
  const sidebarWidth = isCollapsed ? 80 : 240;
  useEffect(() => {
    if (onWidthChange) onWidthChange(sidebarWidth);
  }, [sidebarWidth, onWidthChange]);

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
          isCollapsed ? "w-20" : "w-60"
        )}
      >
        {/* Logo + Collapse */}
        <div className="flex items-center justify-between px-2 mb-6">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-600 via-primary to-primary flex items-center justify-center">
                <Crown size={18} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm text-black">
                  {profileData ? profileData.name : "User"}
                </span>

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

        {/* Primary navigation */}
        {[
          { label: "Profile", href: "/user/profile", icon: <User size={18} /> },
          { label: "Message", href: "/user", icon: <Home size={18} /> },
          {
            label: "Message History",
            href: "/user/history",
            icon: <Clock size={18} />,
          },
          {
            label: "Terms & Policies",
            href: "/user/terms-policies",
            icon: <FileText className="w-4 h-4" />,
          }
        ].map((item) => {
          const isActive =
            item.href === "/user"
              ? pathname === "/user"
              : pathname.startsWith(item.href);
          return (
            <button
              key={item.label}
              onClick={() => {
                router.push(item.href);
                if (!isLargeScreen) setIsOpen(false);
              }}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 text-gray-800 transition-colors",
                isCollapsed && "justify-center",
                isActive && !isCollapsed ? "bg-gray-100" : ""
              )}
              title={isCollapsed ? item.label : ""}
            >
              <span className="text-gray-600">{item.icon}</span>
              {!isCollapsed && <span>{item.label}</span>}
            </button>
          );
        })}

        {/* Chat History Section */}
        <div className="mt-6 border-t border-gray-200 pt-4 flex-1 overflow-y-auto">
          {!isCollapsed && (
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">
              Questions
            </h3>
          )}
          <div className="space-y-1 overflow-x-hidden">
            {loading ? (
              <div className="flex items-center gap-2 text-sm text-gray-500 px-3 py-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                {!isCollapsed && <span>Loading...</span>}
              </div>
            ) : questions.length === 0 ? (
              <p className="text-xs text-gray-500 px-3 py-2">
                {!isCollapsed ? "No questions yet." : "No data"}
              </p>
            ) : (
              questions.map((question) => (
                <motion.button
                  key={question.id}
                  onClick={() => handleSelectQuestion(question.id)}
                  whileHover={{ x: 2 }}
                  className={cn(
                    "w-full text-left flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-gray-100 transition-all",
                    activeQuestionId === question.id
                      ? "bg-green-100 text-green-800"
                      : "text-gray-700",
                    isCollapsed && "justify-center"
                  )}
                  title={isCollapsed ? question.title : ""}
                >
                  <MessageSquare size={16} />
                  {!isCollapsed && (
                    <div className="flex flex-col items-start">
                      <span className="truncate text-xs font-medium">
                        {question.title}
                      </span>
                      <span className="text-[10px] text-gray-500 capitalize">
                        {question.status.toLowerCase()}
                      </span>
                    </div>
                  )}
                </motion.button>
              ))
            )}
          </div>
        </div>

        {/* Bottom Profile + Logout */}
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/user/auth" })}
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
