"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Menu,
    X,
    Home,
    MessageSquare,
    LogOut,
    Crown,
    PanelLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

export function UserSidebar({ onWidthChange }) {
    const [isOpen, setIsOpen] = useState(false)
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [isLargeScreen, setIsLargeScreen] = useState(false)
    const [activeChat, setActiveChat] = useState(null)
    const router = useRouter()

    // Mock chat history data
    const chatHistory = [
        { id: 1, title: "Investment Plan", date: "2h ago" },
        { id: 2, title: "Crypto Basics", date: "Yesterday" },
        { id: 3, title: "Stock Market Guide", date: "2 days ago" },
        { id: 4, title: "Mutual Fund Strategy", date: "1 week ago" },
    ]

    // Detect screen width
    useEffect(() => {
        const handleResize = () => {
            const large = window.innerWidth >= 1024
            setIsLargeScreen(large)
            if (large) {
                setIsOpen(true)
            } else {
                setIsOpen(false)
            }
        }
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    // Sidebar width adjust
    const sidebarWidth = isCollapsed ? 80 : 240
    useEffect(() => {
        if (onWidthChange) onWidthChange(sidebarWidth)
    }, [sidebarWidth, onWidthChange])

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
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-600 to-emerald-700 flex items-center justify-center">
                                <Crown size={18} className="text-white" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-sm text-black">User Panel</span>
                                <span className="text-xs text-gray-500">Pro Access</span>
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
                            className={cn(
                                "text-gray-600 transition-transform",

                            )}
                        />
                    </motion.button>
                </div>

                {/* Dashboard Link */}
                <button
                    onClick={() => {
                        router.push("/user")
                        !isLargeScreen && setIsOpen(false)
                    }}
                    className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 text-gray-800 transition-colors",
                        isCollapsed && "justify-center"
                    )}
                    title={isCollapsed ? "Dashboard" : ""}
                >
                    <Home size={18} className="text-gray-600" />
                    {!isCollapsed && <span>Dashboard</span>}
                </button>

                {/* Chat History Section */}
                <div className="mt-6 border-t border-gray-200 pt-4 flex-1 overflow-y-auto">
                    {!isCollapsed && (
                        <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                            Chat History
                        </h3>
                    )}
                    <div className="space-y-1 overflow-x-hidden">
                        {chatHistory.map((chat) => (
                            <motion.button
                                key={chat.id}
                                onClick={() => setActiveChat(chat.id)}
                                whileHover={{ x: 2 }}
                                className={cn(
                                    "w-full text-left flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-gray-100 transition-all",
                                    activeChat === chat.id
                                        ? "bg-green-100 text-green-800"
                                        : "text-gray-700",
                                    isCollapsed && "justify-center"
                                )}
                                title={isCollapsed ? chat.title : ""}
                            >
                                <MessageSquare size={16} />
                                {!isCollapsed && (
                                    <div className="flex flex-col items-start">
                                        <span className="truncate text-xs font-medium">
                                            {chat.title}
                                        </span>
                                        <span className="text-[10px] text-gray-500">
                                            {chat.date}
                                        </span>
                                    </div>
                                )}
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Bottom Profile + Logout */}
                <div className="flex flex-col gap-2 pt-3 border-t border-gray-200">
                    <button
                        onClick={() => router.push("/user/profile")}
                        className={cn(
                            "w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-100 transition-colors text-xs",
                            isCollapsed && "justify-center"
                        )}
                    >
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                            <AvatarFallback>UU</AvatarFallback>
                        </Avatar>
                        {!isCollapsed && (
                            <div className="flex flex-col items-start">
                                <span className="text-xs font-semibold text-black truncate">
                                    User Name
                                </span>
                                <span className="text-xs text-gray-500 truncate">
                                    user@example.com
                                </span>
                            </div>
                        )}
                    </button>

                    <button
                        className={cn(
                            "flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors font-medium text-xs",
                            isCollapsed && "px-2"
                        )}
                    >
                        <LogOut size={16} />
                        {!isCollapsed && <span>Logout</span>}
                    </button>
                </div>
            </motion.aside>
        </>
    )
}
