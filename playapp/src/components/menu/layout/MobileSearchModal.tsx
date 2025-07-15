'use client'

import { useTheme } from "@/app/context/ThemeContext";

export default function MobileSearchModal({ onClose }: { onClose: () => void }) {
  const { darkMode } = useTheme();

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black/60 z-50 sm:hidden flex items-center justify-center px-4"
    >
      <div
        className={`w-full max-w-md rounded-xl shadow-lg px-4 py-3 flex items-center gap-2 ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        <input
          type="text"
          placeholder="Buscar..."
          className={`w-full bg-transparent text-sm focus:outline-none ${
            darkMode ? "placeholder-gray-300 text-white" : "text-black"
          }`}
        />
        <button
          onClick={onClose}
          className={`text-xl ${darkMode ? "text-gray-300" : "text-gray-600"}`}
        >
          ✖
        </button>
      </div>
    </div>
  );
}
