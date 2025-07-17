// /src/components/menu/mensajes/ChatClient.tsx

"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTheme } from "@/app/context/ThemeContext";
import { messages as allMessages, ChatMessage } from "@/data/messages";
import { users } from "@/data/users";

export default function ChatClient({ contactId }: { contactId: number }) {
  const { darkMode, fontSize } = useTheme();
  const currentUserId = 1;
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const contact = users.find((u) => u.id === contactId);

  useEffect(() => {
    const filtered = allMessages
      .filter(
        (msg) =>
          (msg.fromId === currentUserId && msg.toId === contactId) ||
          (msg.fromId === contactId && msg.toId === currentUserId)
      )
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

    setMessages(filtered);
  }, [contactId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: ChatMessage = {
      fromId: currentUserId,
      toId: contactId,
      text: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  if (!contact) {
    return <div className="p-4 text-center">Usuario no encontrado</div>;
  }

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto" style={{ fontSize, height: 'calc(100vh - 60px)' }}>
      {/* HEADER fijo arriba */}
      <div
        className={`sticky top-0 z-20 flex items-center gap-3 px-4 h-[60px] border-b
          `}
      >
        <button
          onClick={() => router.push("/menu/mensajes")}
          className="text-xl font-bold"
        >
          ←
        </button>
        <Image
          src={contact.photo}
          alt={contact.username}
          width={40}
          height={40}
          className="w-10 h-10 rounded-full"
        />
        <h2 className="text-lg font-semibold">{contact.username}</h2>
      </div>

      {/* MENSAJES: ocupa el espacio entre header e input y tiene scroll */}
      <div
        className={`flex-1 overflow-y-auto px-4 py-2 space-y-2
          ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}
        style={{ maxHeight: 'calc(100vh - 120px)' }} // 120px = header(60) + input(60)
      >
        {messages.map((msg, index) => {
          const isOwn = msg.fromId === currentUserId;
          return (
            <div
              key={index}
              className={`max-w-[70%] px-3 py-2 rounded-lg text-sm break-words
                ${isOwn
                  ? `ml-auto ${darkMode ? "bg-blue-600 text-white" : "bg-blue-500 text-white"}`
                  : `${darkMode ? "bg-gray-700 text-white" : "bg-white text-black"}`
                }
              `}
            >
              {msg.text}
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* INPUT fijo abajo */}
      <div
        className={`sticky bottom-0 z-20 flex items-center px-4 py-2 border-t gap-2
          ${darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-300"}`}
      >
        <input
          type="text"
          placeholder="Escribir mensaje..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className={`flex-1 px-3 py-2 rounded border outline-none
            ${darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-black"}
          `}
        />
        <button
          onClick={handleSend}
          className={`px-4 py-2 rounded font-semibold
            ${darkMode ? "bg-blue-700 hover:bg-blue-600" : "bg-blue-500 hover:bg-blue-400 text-white"}
          `}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
