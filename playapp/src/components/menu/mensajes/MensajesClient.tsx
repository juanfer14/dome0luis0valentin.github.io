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
    <div className={`max-w-md mx-auto p-4 `}>
      <h2 className="text-xl font-bold mb-4">Mensajes</h2>

      <input
        type="text"
        placeholder="Buscar usuario..."
        className={`w-full p-2 mb-4 rounded border outline-none transition-all
          ${darkMode ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400" : "bg-white border-gray-300 text-black"}
        `}
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
          className={`flex items-center gap-3 mb-4 cursor-pointer p-2 rounded-lg transition-colors
            ${darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}
          `}
          onClick={() => router.push(`/menu/mensajes/${chat.id}`)}
        >
          <Image
            src={chat.photo}
            alt={chat.username}
            width={50}
            height={50}
            className="rounded-full"
          />
          <div className="flex-1">
            <h4 className="font-semibold">{chat.username}</h4>
            <p className={`text-sm truncate ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              {chat.lastMessage.text}
            </p>
          </div>
          <span className="text-xs text-gray-500 whitespace-nowrap">
            {formatTime(chat.lastMessage.timestamp)}
          </span>
        </div>
      ))}
    </div>
  );
}
