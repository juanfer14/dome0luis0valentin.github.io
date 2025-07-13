"use client";

import Image from "next/image";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  active: string; // "general", "mensajes", "ajustes", etc.
}

export default function Sidebar({ isOpen, onClose, active }: SidebarProps) {
  return (
    <>
      {/* 🔲 Overlay oscuro solo en móviles */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        id="sidebar"
        className={`fixed md:relative w-64 bg-gray-900 text-white flex flex-col justify-between p-4 h-full z-40 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex flex-col flex-grow overflow-auto">
          <p className="mt-2 text-sm text-white block md:hidden">
            Bienvenido John
          </p>

          {/* ✖ Botón cerrar (solo mobile) */}
          <div className="flex justify-end md:hidden mb-4">
            <button onClick={onClose} className="text-white text-2xl">
              ✖
            </button>
          </div>

          <div className="flex items-center mb-10">
            <Image
              src="https://img.icons8.com/ios-filled/50/ffffff/beach.png"
              width={32}
              height={32}
              alt="Logo de Playapp"
              className="mr-2"
            />
            <span className="text-xl font-bold">Playapp</span>
          </div>

          <nav className="space-y-4">
            <a
              href="/menu"
              className={`flex items-center gap-2 px-2 py-2 rounded text-sm font-semibold ${
                active === "general"
                  ? "bg-gray-800 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <span>🗺️</span>
              <span>Vista general</span>
            </a>
            <a
              href="#"
              className={`flex items-center gap-2 px-2 py-2 rounded text-sm ${
                active === "mensajes"
                  ? "bg-gray-800 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <span>📩</span>
              <span>Mensajes</span>
              <span className="ml-auto bg-gray-600 text-sm px-2 py-0.5 rounded-full">
                2
              </span>
            </a>
          </nav>
        </div>

        <hr className="border-gray-700 my-4" />

        <div className="mt-auto space-y-2">
          <a
            href="#"
            className={`flex items-center gap-2 px-2 py-2 rounded text-sm ${
              active === "ajustes"
                ? "bg-gray-800 text-white"
                : "text-gray-300 hover:bg-gray-800"
            }`}
          >
            <span>⚙️</span>
            <span>Ajustes</span>
          </a>
          <a
            href="#"
            className={`flex items-center gap-2 px-2 py-2 rounded text-sm ${
              active === "ayuda"
                ? "bg-gray-800 text-white"
                : "text-gray-300 hover:bg-gray-800"
            }`}
          >
            <span>ℹ️</span>
            <span>Ayuda</span>
          </a>
          <a
            href="#"
            className={`flex items-center gap-2 px-2 py-2 rounded text-sm ${
              active === "sobre-nosotros"
                ? "bg-gray-800 text-white"
                : "text-gray-300 hover:bg-gray-800"
            }`}
          >
            <span>👥</span>
            <span>Sobre Nosotros</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-2 px-2 py-2 text-sm text-red-400 hover:bg-gray-800 hover:text-white rounded"
          >
            <span>🚪</span>
            <span>Cerrar Sesión</span>
          </a>
        </div>
      </aside>
    </>
  );
}
