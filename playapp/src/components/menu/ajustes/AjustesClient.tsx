// src/app/menu/ajustes/AjustesClient.tsx
"use client";

import { useTheme } from "@/app/context/ThemeContext";
import { useState, useEffect } from "react";

export default function AjustesClient() {
  const { darkMode, setDarkMode, fontSize, setFontSize } = useTheme();

  const [originalUsername, setOriginalUsername] = useState("Johanna Doe");
  const [username, setUsername] = useState(originalUsername);

  const [originalEmail, setOriginalEmail] = useState("jhon@gmail.com");
  const [email, setEmail] = useState(originalEmail);
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const hasUsernameChanged = username !== originalUsername;
  const hasEmailChanged = email !== originalEmail;

  const handleSaveUsername = () => {
    setOriginalUsername(username);
  };

  const handleSaveEmail = () => {
    if (!validateEmail(email)) {
      setEmailError("Por favor ingresa un email válido.");
      return;
    }
    setEmailError("");
    setOriginalEmail(email);
  };

  return (
    <div className="max-w-lg mx-auto p-4 transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-6">Ajustes</h2>

      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Usuario</h3>

        {/* Nombre */}
        <label className="block mb-1">Nombre de usuario</label>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            className={`flex-1 border rounded px-3 py-2 outline-none ${
              darkMode
                ? "border-white bg-gray-800 text-white"
                : "border-black"
            }`}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {hasUsernameChanged && (
            <button
              onClick={handleSaveUsername}
              className={`px-3 py-2 rounded whitespace-nowrap font-semibold ${
                darkMode ? "bg-white text-black" : "bg-black text-white"
              }`}
            >
              Guardar
            </button>
          )}
        </div>

        {/* Email */}
        <label className="block mt-6 mb-1">Email</label>
        <div className="flex gap-2 items-center">
          <input
            type="email"
            className={`flex-1 border rounded px-3 py-2 outline-none ${
              darkMode
                ? "border-white bg-gray-800 text-white"
                : "border-black"
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {hasEmailChanged && (
            <button
              onClick={handleSaveEmail}
              className={`px-3 py-2 rounded whitespace-nowrap font-semibold ${
                darkMode ? "bg-white text-black" : "bg-black text-white"
              }`}
            >
              Guardar
            </button>
          )}
        </div>
        {emailError && (
          <p className="text-red-500 mt-1 text-sm">{emailError}</p>
        )}
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-4">Interfaz</h3>

        <label className="block mb-1">
          Tamaño de letra: {fontSize}
        </label>
        <input
          type="range"
          min={15}
          max={30}
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          className="w-full mb-6"
        />

        <label className="block mb-2">Modo claro/oscuro</label>
        <div className="w-full mb-6">
          <label className="relative inline-block w-full h-12 cursor-pointer select-none">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <div className="w-full h-12 bg-gray-300 rounded-full peer-checked:bg-gray-700 transition-colors"></div>
            <div className="absolute top-1.5 left-1.5 w-9 h-9 bg-white rounded-full shadow-md peer-checked:left-[calc(100%-2.25rem)] peer-checked:bg-gray-900 transition-all"></div>
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-700 peer-checked:text-white select-none">
              ☀️
            </span>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-lg text-gray-700 peer-checked:text-white select-none">
              🌙
            </span>
          </label>
        </div>
      </section>
    </div>
  );
}
