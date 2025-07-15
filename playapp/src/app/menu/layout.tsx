// /app/menu/layout.tsx
"use client";

import ClientLayout from "@/components/menu/layout/ClientLayout";
import { BeachesProvider } from "../context/BeachesContext";
import { ThemeProvider, useTheme } from "../context/ThemeContext";
import { useEffect, useState } from "react";

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Renderiza algo neutro o vacío mientras se hidrata
    return null;
  }
  return (
    <ThemeProvider>
      <InnerLayout>{children}</InnerLayout>
    </ThemeProvider>
  );
}

function DarkModeEffect() {
  const { darkMode } = useTheme();

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [darkMode]);

  return null;
}

function InnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DarkModeEffect />
      <BeachesProvider>
        <ClientLayout>{children}</ClientLayout>
      </BeachesProvider>
    </>
  );
}
