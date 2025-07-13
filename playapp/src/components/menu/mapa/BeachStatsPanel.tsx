// /components/menu/mapa/BeachStatsPanel.tsx

import React from "react";
import { useRouter } from "next/navigation";
import { BeachWithScores } from "@/data/beaches";

interface BeachStatsPanelProps {
  beach: BeachWithScores,
  onClose: () => void;
}

export default function BeachStatsPanel({
  beach,
  onClose,
}: BeachStatsPanelProps) {
  const router = useRouter();

  const handleOpinar = () => {
    router.push(`/menu/opinar?playa=${beach.id}`);
  };

  // Función para obtener emoji según valor (1 a 4)
  const getEmoji = (score: number) => {
    if (score === 4) return "😀";
    if (score === 3) return "🙂";
    if (score === 2) return "😐";
    return "🙁";
  };

   // Función para obtener emoji según valor (1 a 10)
  const getEmojiFinalScore = (score: number) => {
    if (score >= 7) return "😀";
    if (score >= 5) return "🙂";
    if (score >= 3) return "😐";
    return "🙁";
  };

  // Función para obtener color bg según valor (1 a 4)
  const getEmojiColor = (score: number) => {
    if (score >= 7) return "bg-green-400";
    if (score >= 5) return "bg-yellow-300";
    if (score >= 3) return "bg-orange-500";
    return "bg-red-600";
  };

  function getTextColorForBackground(
    color: "green" | "yellow" | "orange" | "red"
  ): "white" | "black" {
    return color === "yellow" || color === "green" ? "black" : "white";
  }

  const getTextColorForFinalScore = (
    score: number
  ): "text-white" | "text-black" => {
    if (score >= 7) return "text-black"; // verde claro → negro
    if (score >= 5) return "text-black"; // amarillo claro → negro
    if (score >= 3) return "text-white"; // naranja medio → blanco
    return "text-white"; // rojo oscuro → blanco
  };

  if (!beach.scores) {
    return (
      <div className="p-4 text-white">
        No hay datos de puntuación para esta playa.
      </div>
    );
  }

  const scores = beach.scores!;
  const score = scores.finalScore;
  const scoreColor = getEmojiColor(score);
  const textColor = getTextColorForFinalScore(score);

  

  return (
    <aside className="bg-gray-900 text-black rounded-t-3xl shadow-xl p-4 w-full max-w-[700px] mx-auto">
      {/* Cabecera */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">{beach.name}</h2>
        <button
          onClick={onClose}
          className="text-white text-2xl font-semibold hover:text-gray-400"
          aria-label="Cerrar panel"
        >
          ✕
        </button>
      </div>

      {/* Contenido en 2 columnas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <StatItem
          color={getColor(scores.arena)}
          icon="🏖️"
          label="Calidad de Arena"
          value={scores.arena}
          emoji={getEmoji(scores.arena)}
          textColor={getTextColorForBackground(getColor(scores.arena))}
        />
        <StatItem
          color={getColor(scores.agua)}
          icon="🌊"
          label="Calidad del Agua"
          value={scores.agua}
          emoji={getEmoji(scores.agua)}
          textColor={getTextColorForBackground(getColor(scores.agua))}
        />
        <StatItem
          color={getColor(scores.concurrencia)}
          icon="👨‍👩‍👧"
          label="Concurrencia"
          value={scores.concurrencia}
          emoji={getEmoji(scores.concurrencia)}
          textColor={getTextColorForBackground(getColor(scores.concurrencia))}
        />
        <StatItem
          color={getColor(scores.limpieza)}
          icon="🧹"
          label="Limpieza"
          value={scores.limpieza}
          emoji={getEmoji(scores.limpieza)}
          textColor={getTextColorForBackground(getColor(scores.limpieza))}
        />
        <StatItem
          color={getColor(scores.tranquilidad)}
          icon="☮️"
          label="Tranquilidad"
          value={scores.tranquilidad}
          emoji={getEmoji(scores.tranquilidad)}
          textColor={getTextColorForBackground(getColor(scores.tranquilidad))}
        />
        <StatItem
          color={getColor(scores.atracciones)}
          icon="🎡"
          label="Atracciones"
          value={scores.atracciones}
          emoji={getEmoji(scores.atracciones)}
          textColor={getTextColorForBackground(getColor(scores.atracciones))}
        />
      </div>

      {/* Barra de puntuación */}
      <div
        className={`flex items-center justify-between px-4 py-2 rounded-lg mb-4 ${scoreColor}`}
      >
        <span className={`text-2xl ${textColor}`}>
          {getEmojiFinalScore(score)}
        </span>
        <span
          className={`font-bold ${textColor}`}
        >
          Puntuación: {scores.finalScore.toFixed(2)}/10
        </span>
      </div>

      {/* Botón Opinar */}
      <button
        onClick={handleOpinar}
        className="w-full bg-white text-gray-900 font-semibold py-2 rounded-lg shadow hover:bg-gray-200 transition"
      >
        Opinar
      </button>
    </aside>
  );
}

// Helper para asignar color según valor 1-4 (igual lógica que getEmojiColor, pero para StatItem.color)
function getColor(score: number): "green" | "yellow" | "orange" | "red" {
  if (score === 4) return "green";
  if (score === 3) return "yellow";
  if (score === 2) return "orange";
  return "red";
}

// Modificamos StatItem para recibir además value y emoji props
interface StatItemProps {
  color: "green" | "yellow" | "orange" | "red";
  icon: string;
  label: string;
  value: number;
  emoji: string;
  textColor?: "white" | "black";
}

function StatItem({
  color,
  icon,
  label,
  value,
  emoji,
  textColor = "white",
}: StatItemProps) {
  const bg = {
    green: "bg-green-400",
    yellow: "bg-yellow-300",
    orange: "bg-orange-500",
    red: "bg-red-600",
  }[color];

  const txt = textColor === "white" ? "text-white" : "text-black";

  return (
    <div className={`${bg} flex items-center justify-between p-2 rounded-lg`}>
      <div className="flex items-center gap-3">
        <span className="text-xl">{icon}</span>
        <span className={`font-bold ${txt}`}>{label.toUpperCase()}</span>
      </div>
      <div className="flex items-center gap-2 font-bold text-xl">
        <span className={txt}>{value}</span>
        <span>{emoji}</span>
      </div>
    </div>
  );
}
