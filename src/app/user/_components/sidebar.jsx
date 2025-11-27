"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  MessageSquare,
  PanelLeft,
  Loader2,
  Clock,
  User,
  FileText,
  LogOut,
  MessageCircle,
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
          className="bg-primary text-primary-foreground border border-primary/40 hover:bg-primary/90 hover:text-primary-foreground shadow-md"
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
          "fixed lg:static top-0 left-0 h-[100dvh] bg-background text-foreground border-r border-border shadow-lg z-50 flex flex-col px-3 py-6 overflow-y-auto transition-all duration-300",
          isCollapsed ? "w-20" : "w-56"
        )}
      >
        {/* Logo + Collapse */}
        <div className="flex items-center justify-between px-2 mb-6">
          {!isCollapsed && (
            <div className="flex items-center gap-1">

              <span className="font-semibold text-sm text-foreground/90">
                Hello,{" "}
                {profileData ? profileData.name.split(" ")[0]
                  : "User"}
              </span>

            </div>
          )}
          <motion.button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`flex p-1 hover:bg-primary-foreground/10 rounded-lg transition-colors ${isCollapsed ? "mx-auto" : ""
              }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <PanelLeft
              size={16}
              className={cn("text-foreground transition-transform")}
            />
          </motion.button>
        </div>

        {/* Primary navigation */}
        {[
          { label: "General Chat", href: "/user", icon: <MessageCircle size={18} /> },
          { label: "Advance Chat", href: "/user/advance-chat", icon: <MessageCircle size={18} className="text-primary" /> },
          {
            label: "General Chat History",
            href: "/user/history",
            icon: <Clock size={18} />,
          },
          {
            label: "Advance Chat History",
            href: "/user/advance-chat/history",
            icon: <Clock size={18} className="text-primary" />,
          },
          { label: "Profile", href: "/user/profile", icon: <User size={18} /> },
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
                "flex items-center text-start gap-2 px-3 py-2 rounded-md text-sm font-medium text-foreground/80 transition-colors hover:bg-muted",
                isCollapsed && "justify-center",
                isActive && !isCollapsed ? "bg-accent text-accent-foreground" : ""
              )}
              title={isCollapsed ? item.label : ""}
            >
              <span className="opacity-90">{item.icon}</span>
              {!isCollapsed && <span>{item.label}</span>}
            </button>
          );
        })}

        {/* Chat History Section */}
        <div className="mt-6 border-t border-gray-200 pt-4 flex-1 overflow-y-auto">
          {!isCollapsed && (
            <h3 className="text-xs font-semibold text-foreground/80 uppercase mb-2">
              Questions
            </h3>
          )}
          <div className="space-y-1 overflow-x-hidden">
            {loading ? (
              <div className="flex items-center gap-2 text-sm text-foreground/70 px-3 py-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                {!isCollapsed && <span>Loading...</span>}
              </div>
            ) : questions.length === 0 ? (
              <p className="text-xs text-foreground/70 px-3 py-2">
                {!isCollapsed ? "No questions yet." : "No data"}
              </p>
            ) : (
              questions.map((question) => (
                <motion.button
                  key={question.id}
                  onClick={() => handleSelectQuestion(question.id)}
                  whileHover={{ x: 2 }}
                  className={cn(
                    "w-full text-left flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-all text-foreground/80 hover:bg-muted",
                    activeQuestionId === question.id
                      ? "bg-accent text-accent-foreground"
                      : "text-foreground/80",
                    isCollapsed && "justify-center"
                  )}
                  title={isCollapsed ? question.title : ""}
                >
                  <MessageSquare size={16} />
                  {!isCollapsed && (
                    <div className="flex flex-col items-start">
                      <span className="truncate text-xs font-medium text-foreground">
                        {question.title}
                      </span>
                      <span className="text-[10px] text-foreground/70 capitalize">
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
          className={`w-full flex items-center gap-3 p-3 duration-200 bg-red-500/30 rounded-xl hover:bg-red-500/20 cursor-pointer border border-red-500/10 hover:border-red-500/40 hover:shadow-sm transition-all group mt-4 text-red-500 ${isCollapsed ? "justify-center" : ""}`}
        >
          <LogOut className="w-4 h-4" />
          {!isCollapsed && (
            <span className="text-sm font-medium">
              Sign Out
            </span>
          )}
        </button>


      </motion.aside>
    </>
  );
}
