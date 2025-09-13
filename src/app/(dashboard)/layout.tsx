"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  DashboardSidebar,
  DashboardHeader,
  MobileMenuOverlay,
  menuItems,
  type DashboardLayoutProps,
} from "@/src/components/layouts/dashboard";
import { ProtectedRoute } from "@/src/components/auth/protected-route";

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Close sidebar on route change (mobile)
    setSidebarOpen(false);
  }, [pathname]);

  const handleSidebarClose = () => setSidebarOpen(false);
  const handleMenuClick = () => setSidebarOpen(true);

  if (!mounted) return null;

  return (
    <ProtectedRoute requiresProfile={pathname !== "/profile-setup"}>
      <div className="bg-greys-100 min-h-screen overflow-x-hidden">
        {/* Mobile sidebar overlay */}
        <MobileMenuOverlay isOpen={sidebarOpen} onClose={handleSidebarClose} />

        {/* Top header - spans full width */}
        <DashboardHeader onMenuClick={handleMenuClick} />

        <div className="flex w-full">
          {/* Sidebar - positioned below header */}
          <DashboardSidebar
            isOpen={sidebarOpen}
            onClose={handleSidebarClose}
            menuItems={menuItems}
            currentPath={pathname}
          />

          {/* Main content */}
          <div className="bg-white-100 mt-18 min-h-screen w-0 flex-1 lg:ml-[300px]">
            {/* Page content */}
            <main className="w-full max-w-full overflow-hidden p-6 sm:p-6">
              {children}
            </main>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
