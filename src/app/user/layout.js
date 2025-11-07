"use client"
import { useState } from "react"
import { UserSidebar } from "./_components/sidebar"


const Layout = ({ children }) => {
    const [sidebarWidth, setSidebarWidth] = useState(224)

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            <UserSidebar onWidthChange={setSidebarWidth} />
            <main
                className="flex-1 overflow-y-auto transition-all duration-300"
                style={{
                    marginLeft: `clamp(0px, ${sidebarWidth}px, 0px)`,
                }}
            >
                <div>{children}</div>
            </main>
        </div>
    )
}

export default Layout
