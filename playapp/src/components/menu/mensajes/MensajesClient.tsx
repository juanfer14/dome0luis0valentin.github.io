// /src/components/menu/mensajes/MensajesClient.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { users } from "@/data/users";
import { messages, getChatContacts } from "@/data/messages";
import { useTheme } from "@/app/context/ThemeContext";

function formatTime(date: Date): string {
  const now = new Date();
  const isToday = now.toDateString() === date.toDateString();

  return isToday
    ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : date.toLocaleDateString();
}

export default function MensajesClient() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const { darkMode } = useTheme();

  const currentUserId = 1;
  const chats = getChatContacts(currentUserId, messages, users);

  const filtered = chats.filter((chat) =>
    chat.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full max-w-md mx-auto p-4 overflow-x-hidden">
      <h2 className="text-xl font-bold mb-4">Mensajes</h2>

      <input
        type="text"
        placeholder="Buscar usuario..."
        className={`w-full p-2 mb-4 rounded border outline-none transition-all
      ${
        darkMode
          ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
          : "bg-white border-gray-300 text-black"
      }`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No se encontraron chats.
        </p>
      )}

      {filtered.map((chat) => (
        <div
          key={chat.id}
          className={`flex items-start gap-3 mb-4 cursor-pointer p-2 rounded-lg transition-colors
        ${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}
      `}
          onClick={() => router.push(`/menu/mensajes/${chat.id}`)}
        >
          <Image
            src={chat.photo}
            alt={chat.username}
            width={50}
            height={50}
            className="rounded-full flex-shrink-0"
          />

          <div className="flex-1 min-w-0 overflow-hidden">
            <div className="flex items-center justify-between gap-2">
              <h4 className="font-semibold truncate">{chat.username}</h4>
              <span className="text-xs text-gray-500 whitespace-nowrap flex-shrink-0">
                {formatTime(chat.lastMessage.timestamp)}
              </span>
            </div>
            <p
              className={`text-sm truncate ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {chat.lastMessage.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
