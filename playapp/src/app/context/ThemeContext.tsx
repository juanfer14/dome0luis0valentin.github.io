// src/context/ThemeContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface ThemeContextProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  fontSize: number;
  setFontSize: (val: number) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(22);

  useEffect(() => {
    setIsClient(true);

    // Leer localStorage solo en cliente
    const savedDarkMode = localStorage.getItem("darkMode");
    const savedFontSize = localStorage.getItem("fontSize");

    if (savedDarkMode !== null) {
      setDarkMode(savedDarkMode === "true");
    }

    if (savedFontSize !== null) {
      setFontSize(Number(savedFontSize));
    }
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Aquí está el cambio clave: la clase "dark" va en <html>, no en <body>
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode, isClient]);

  useEffect(() => {
    if (!isClient) return;
    localStorage.setItem("fontSize", fontSize.toString());
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize, isClient]);

  if (!isClient) {
    // Evitar renderizar contenido que depende del estado hasta que estemos en cliente
    return null;
  }

  return (
    <ThemeContext.Provider
      value={{ darkMode, setDarkMode, fontSize, setFontSize }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme debe usarse dentro de ThemeProvider");
  }
  return context;
}
