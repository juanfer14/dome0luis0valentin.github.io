// /components/menu/ClientLayout.tsx
"use client";

import { useEffect, useState } from "react";
import { SidebarContext } from "@/context/SidebarContext";
import Sidebar from "@/components/menu/layout/Sidebar";
import Topbar from "@/components/menu/layout/Topbar";
import { usePathname } from "next/navigation";
import MobileSearchModal from "./MobileSearchModal";
import { useTheme } from "@/app/context/ThemeContext";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { darkMode } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const pathname = usePathname();

  const getActiveSection = () => {
    if (pathname === "/menu") return "general";
    if (pathname.startsWith("/menu/ajustes")) return "ajustes";
    if (pathname.startsWith("/menu/mensajes")) return "mensajes";
    if (pathname.startsWith("/menu/ayuda")) return "ayuda";
    if (pathname.startsWith("/menu/sobre-nosotros")) return "ayuda";
    return "";
  };

  if (!mounted) return null;

  return (
    <SidebarContext.Provider value={{ sidebarOpen }}>
      <div
        className={`flex h-screen w-full min-w-0 overflow-hidden ${
          darkMode ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          active={getActiveSection()}
        />
        <div className="flex-1 flex flex-col min-w-0 relative z-0 h-full overflow-hidden">
          <Topbar
            onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
            onToggleSearch={() => setSearchOpen(true)}
          />
          <div className="flex-1 min-h-0 relative w-full overflow-y-auto">
            {children}
          </div>
          {searchOpen && (
            <MobileSearchModal onClose={() => setSearchOpen(false)} />
          )}
        </div>
      </div>
    </SidebarContext.Provider>
  );
}
