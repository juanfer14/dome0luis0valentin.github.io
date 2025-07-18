// /src/components/menu/layout/Sidebar.tsx
"use client";

import Image from "next/image";
import { useTheme } from "@/app/context/ThemeContext";
import Link from 'next/link';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  active: string;
}

export default function Sidebar({ isOpen, onClose, active }: SidebarProps) {
  const { darkMode } = useTheme();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        id="sidebar"
        className={`fixed md:relative w-64 ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        } flex flex-col justify-between p-4 h-full z-40 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex flex-col flex-grow overflow-auto">
          <p className="mt-2 text-sm block md:hidden">
            Bienvenido John
          </p>

          <div className="flex justify-end md:hidden mb-4">
            <button onClick={onClose} className="text-2xl">
              ✖
            </button>
          </div>

          <div className="flex items-center mb-10">
            <Image
              src={`/images/${darkMode ? "beach-white.png" : "beach-black.png" }`}
              width={32}
              height={32}
              alt="Logo de Playapp"
              className="mr-2"
            />
            <span className="text-xl font-bold">Playapp</span>
          </div>

          <nav className="space-y-4">
            <Link
              href="/menu"
              className={`flex items-center gap-2 px-2 py-2 rounded text-sm font-semibold ${
                active === "general"
                  ? darkMode
                    ? "bg-gray-800 text-white"
                    : "bg-gray-200 text-black"
                  : darkMode
                  ? "text-gray-300 hover:bg-gray-800"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span>🗺️</span>
              <span>Vista general</span>
            </Link>
            <Link
              href="/menu/mensajes"
              className={`flex items-center gap-2 px-2 py-2 rounded text-sm ${
                active === "mensajes"
                  ? darkMode
                    ? "bg-gray-800 text-white"
                    : "bg-gray-200 text-black"
                  : darkMode
                  ? "text-gray-300 hover:bg-gray-800"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span>📩</span>
              <span>Mensajes</span>
              <span
                className={`ml-auto text-sm px-2 py-0.5 rounded-full ${
                  darkMode ? "bg-gray-600 text-white" : "bg-gray-300 text-black"
                }`}
              >
                2
              </span>
            </Link>
          </nav>
        </div>

        <hr className={`${darkMode ? "border-gray-700" : "border-gray-300"} my-4`} />

        <div className="mt-auto space-y-2">
          <Link
            href="/menu/ajustes"
            className={`flex items-center gap-2 px-2 py-2 rounded text-sm ${
              active === "ajustes"
                ? darkMode
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-black"
                : darkMode
                ? "text-gray-300 hover:bg-gray-800"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span>⚙️</span>
            <span>Ajustes</span>
          </Link>
          <Link
            href="#"
            className={`flex items-center gap-2 px-2 py-2 rounded text-sm ${
              active === "ayuda"
                ? darkMode
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-black"
                : darkMode
                ? "text-gray-300 hover:bg-gray-800"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span>ℹ️</span>
            <span>Ayuda</span>
          </Link>
          <Link
            href="#"
            className={`flex items-center gap-2 px-2 py-2 rounded text-sm ${
              active === "sobre-nosotros"
                ? darkMode
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-black"
                : darkMode
                ? "text-gray-300 hover:bg-gray-800"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span>👥</span>
            <span>Sobre Nosotros</span>
          </Link>
          <Link
            href="#"
            className={`flex items-center gap-2 px-2 py-2 text-sm rounded ${
              darkMode
                ? "text-red-400 hover:bg-gray-800 hover:text-white"
                : "text-red-600 hover:bg-gray-100 hover:text-black"
            }`}
          >
            <span>🚪</span>
            <span>Cerrar Sesión</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
