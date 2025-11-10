"use client"
import { useState } from "react"
import { AdminSidebar } from "./_components/sidebar"

const Layout = ({ children }) => {
    const [sidebarWidth, setSidebarWidth] = useState(224)

    return (
        <div className="flex h-[100dvh] bg-gray-50 overflow-hidden">
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
