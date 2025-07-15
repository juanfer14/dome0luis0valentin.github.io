// /src/data/messages.ts

import { User } from "./users";

export type ChatMessage = {
  fromId: number;
  toId: number;
  text: string;
  timestamp: Date;
};

export const messages: ChatMessage[] = [
  {
    fromId: 2,
    toId: 1,
    text: "¿Vi tu comentario de Punta Indio, es posta?",
    timestamp: new Date("2025-07-15T09:30:00"),
  },
  {
    fromId: 1,
    toId: 2,
    text: "Hola, sí, está buenísimo!!!",
    timestamp: new Date("2025-07-15T09:31:00"),
  },
  {
    fromId: 2,
    toId: 1,
    text: "¿Cuándo planeás ir? Estoy pensando en ir este fin de semana.",
    timestamp: new Date("2025-07-15T09:32:30"),
  },
  {
    fromId: 1,
    toId: 2,
    text: "Todavía no decidí, pero ese finde me viene bien.",
    timestamp: new Date("2025-07-15T09:33:15"),
  },
  {
    fromId: 2,
    toId: 1,
    text: "Perfecto, avisame así organizamos algo con amigos.",
    timestamp: new Date("2025-07-15T09:34:00"),
  },
  {
    fromId: 1,
    toId: 2,
    text: "Dale, te mando mensaje cuando tenga todo listo.",
    timestamp: new Date("2025-07-15T09:35:20"),
  },
  {
    fromId: 2,
    toId: 1,
    text: "Genial! Y si necesitas alguna recomendación de dónde comer, tengo varios datos.",
    timestamp: new Date("2025-07-15T09:36:45"),
  },
  {
    fromId: 1,
    toId: 2,
    text: "¡Perfecto! Me vendrán bien, gracias.",
    timestamp: new Date("2025-07-15T09:37:30"),
  },
  {
    fromId: 2,
    toId: 1,
    text: "También podríamos llevar unas mates para la tarde.",
    timestamp: new Date("2025-07-15T09:38:00"),
  },
  {
    fromId: 1,
    toId: 2,
    text: "Buena idea, me encantaría.",
    timestamp: new Date("2025-07-15T09:39:10"),
  },
  {
    fromId: 2,
    toId: 1,
    text: "¿Querés que te pase la dirección exacta del lugar?",
    timestamp: new Date("2025-07-15T09:40:25"),
  },
  {
    fromId: 1,
    toId: 2,
    text: "Sí, por favor.",
    timestamp: new Date("2025-07-15T09:41:05"),
  },
  {
    fromId: 2,
    toId: 1,
    text: "Te la mando por acá en un rato.",
    timestamp: new Date("2025-07-15T09:42:15"),
  },
  {
    fromId: 1,
    toId: 2,
    text: "Gracias, quedo atento.",
    timestamp: new Date("2025-07-15T09:43:00"),
  },
  {
    fromId: 2,
    toId: 1,
    text: "¿Vas a llevar algo para hacer un asado?",
    timestamp: new Date("2025-07-15T09:44:30"),
  },
  {
    fromId: 1,
    toId: 2,
    text: "Podría encargar algo, ¿qué te parece?",
    timestamp: new Date("2025-07-15T09:45:10"),
  },
  {
    fromId: 2,
    toId: 1,
    text: "Me parece perfecto. Yo llevo la carne.",
    timestamp: new Date("2025-07-15T09:46:00"),
  },
  {
    fromId: 1,
    toId: 2,
    text: "Genial, avisame si necesitás que lleve algo más.",
    timestamp: new Date("2025-07-15T09:47:00"),
  },
  {
    fromId: 2,
    toId: 1,
    text: "Quizás unas bebidas, pero después lo coordinamos.",
    timestamp: new Date("2025-07-15T09:48:15"),
  },
  {
    fromId: 1,
    toId: 2,
    text: "Dale, quedo a la espera. ¡Gracias por la organización!",
    timestamp: new Date("2025-07-15T09:49:00"),
  },
  // Mensajes de otros usuarios, para no perder contexto
  {
    fromId: 3,
    toId: 1,
    text: "Encontré este lugar en p...",
    timestamp: new Date("2025-07-15T09:46:00"),
  },
  {
    fromId: 1,
    toId: 3,
    text: "Buenísimo, pasame las fotos",
    timestamp: new Date("2025-07-15T09:47:00"),
  },
  {
    fromId: 4,
    toId: 1,
    text: "Hola, vendo lanchas, te interesa?",
    timestamp: new Date("2025-07-14T13:00:00"),
  },
];



export function getChatContacts(currentUserId: number, messages: ChatMessage[], users: User[]) {
  const contactMap = new Map<number, ChatMessage>();

  messages.forEach((msg) => {
    const contactId = msg.fromId === currentUserId ? msg.toId : msg.fromId;
    if (!contactMap.has(contactId)) {
      contactMap.set(contactId, msg);
    } else {
      const existing = contactMap.get(contactId)!;
      if (msg.timestamp > existing.timestamp) {
        contactMap.set(contactId, msg);
      }
    }
  });

  return Array.from(contactMap.entries())
    .map(([id, lastMessage]) => {
      const user = users.find((u) => u.id === id)!;
      return {
        ...user,
        lastMessage,
      };
    })
    .sort(
      (a, b) =>
        b.lastMessage.timestamp.getTime() - a.lastMessage.timestamp.getTime()
    );
}