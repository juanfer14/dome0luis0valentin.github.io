// /src/app/menu/mensajes/[id]/page.tsx
import ChatClient from "@/components/menu/mensajes/ChatClient";

export const metadata = {
  title: "Mensajes | Playapp",
};

export default function ChatPage({ params }: { params: { id: string } }) {
  const contactId = Number(params.id);

  return <ChatClient contactId={contactId} />;
}
