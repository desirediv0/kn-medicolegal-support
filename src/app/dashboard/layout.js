"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { AdminSidebar } from "./_components/sidebar";

const PAGE_TITLES = {
    "/dashboard": "Overview",
    "/dashboard/profile": "Admin Profile",
    "/dashboard/questions": "Questions",
    "/dashboard/questions/history": "Questions History",
    "/dashboard/users": "Users",
    "/dashboard/reports": "Reports",
    "/dashboard/settings": "Settings",
    "/dashboard/storage": "Storage",
};

const Layout = ({ children }) => {
    const pathname = usePathname();
    const [, setSidebarWidth] = useState(224);
    const hideSidebar = pathname?.startsWith("/dashboard/auth");

    const currentTitle = useMemo(() => {
        if (!pathname) return "Dashboard";
        const match = Object.keys(PAGE_TITLES).find((path) =>
            pathname.startsWith(path)
        );
        return PAGE_TITLES[match] ?? "Dashboard";
    }, [pathname]);

    if (hideSidebar) {
        return <div className="min-h-[100dvh] bg-background">{children}</div>;
    }

    return (
        <div className="flex h-[100dvh] overflow-hidden bg-gray-50">
            <AdminSidebar onWidthChange={setSidebarWidth} />
            <main className="flex-1 flex flex-col min-h-[100dvh] transition-all duration-300">
                <header className="sticky top-0 z-30 flex h-16 w-full items-center border-b border-primary/20 bg-primary px-4 text-primary-foreground shadow-md backdrop-blur">
                    <div className="text-center md:text-left w-full">
                        <h1 className="text-lg font-semibold leading-tight">{currentTitle}</h1>
                        <p className="text-xs opacity-80">Medicolegal Support Admin Console</p>
                    </div>
                </header>
                <div className="flex-1 overflow-y-auto px-3 pb-6 pt-4">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
