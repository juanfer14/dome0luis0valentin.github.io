// /src/app/menu/mensajes/[id]/page.tsx

import { Metadata } from "next";
import ChatClient from "@/components/menu/mensajes/ChatClient";

export const metadata: Metadata = {
  title: "Mensajes | Playapp",
};

// Adaptación para Next.js 15 si params es un Promise
type Props = {
  params: Promise<{ id: string }>;
};

export default async function ChatPage(props: Props) {
  const { id } = await props.params;
  const contactId = Number(id);

  return <ChatClient contactId={contactId} />;
}
