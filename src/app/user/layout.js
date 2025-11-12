"use client";
import { Suspense, useState } from "react";
import { usePathname } from "next/navigation";
import { UserSidebar } from "./_components/sidebar";

const LayoutContent = ({ children }) => {
  const pathname = usePathname();
  const [sidebarWidth, setSidebarWidth] = useState(224);
  const hideSidebar = pathname?.startsWith("/user/auth");

  if (hideSidebar) {
    return <div className="min-h-[100dvh] bg-gray-50">{children}</div>;
  }

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-gray-50">
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
  );
};

const LayoutFallback = () => (
  <div className="flex h-[100dvh] items-center justify-center bg-gray-50 text-sm text-gray-500">
    Loading your dashboard…
  </div>
);

const Layout = ({ children }) => {
  return (
    <Suspense fallback={<LayoutFallback />}>
      <LayoutContent>{children}</LayoutContent>
    </Suspense>
  );
};

export default Layout;
