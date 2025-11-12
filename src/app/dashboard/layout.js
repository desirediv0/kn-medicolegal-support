"use client"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { AdminSidebar } from "./_components/sidebar"

const Layout = ({ children }) => {
    const pathname = usePathname()
    const [sidebarWidth, setSidebarWidth] = useState(224)
    const hideSidebar = pathname?.startsWith("/dashboard/auth")

    if (hideSidebar) {
        return <div className="min-h-[100dvh] bg-gray-50">{children}</div>
    }

    return (
        <div className="flex h-[100dvh] overflow-hidden bg-gray-50">
            <AdminSidebar onWidthChange={setSidebarWidth} />
            <main
                className="flex-1 overflow-y-auto transition-all duration-300"
                style={{
                    marginLeft: `clamp(0px, ${sidebarWidth}px, 0px)`,
                }}
            >
                <div className="p-2">{children}</div>
            </main>
        </div>
    )
}

export default Layout
