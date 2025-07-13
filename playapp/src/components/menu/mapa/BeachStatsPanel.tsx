// /components/menu/mapa/BeachStatsPanel.tsx

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { BeachWithScores, Rating } from "@/data/beaches";

import Image from "next/image";
import { beachLevelScoreUrls } from "@/data/beaches";

import { beachRatings } from "@/data/beaches";
import { users } from "@/data/users"; // o donde tengas definidos los usuarios

interface BeachStatsPanelProps {
  beach: BeachWithScores;
  onClose: () => void;
}

export default function BeachStatsPanel({
  beach,
  onClose,
}: BeachStatsPanelProps) {
  // Ahora la pestaña activa, por defecto "scores"
  const [activeTab, setActiveTab] = useState<"scores" | "opinions">("scores");


  const router = useRouter();

  const handleOpinar = () => {
    router.push(`/menu/opinar?playa=${beach.id}`);
  };

  const getIconUrlForScore = (score: number): string => {
    return beachLevelScoreUrls[
      `nivel${score}` as keyof typeof beachLevelScoreUrls
    ];
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

  const getUserById = (id: number) => users.find((u) => u.id === id);
  const opiniones = beachRatings[beach.id] ?? [];

  const scores = beach.scores!;
  const score = scores.finalScore;
  const scoreColor = getEmojiColor(score);
  const textColor = getTextColorForFinalScore(score);

  return (
    <aside className="bg-gray-900 text-black rounded-t-3xl shadow-xl w-full max-w-[700px] mx-auto h-[500px] overflow-y-auto p-4">
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

      {/* Tabs */}
      {opiniones.length > 0 && (
        <div className="flex space-x-2 mb-4">
          <button
            onClick={() => setActiveTab("scores")}
            className={`flex-1 py-2 rounded-t-lg font-semibold text-center ${
              activeTab === "scores"
                ? "bg-gray-700 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            Puntaje
          </button>
          <button
            onClick={() => setActiveTab("opinions")}
            className={`flex-1 py-2 rounded-t-lg font-semibold text-center ${
              activeTab === "opinions"
                ? "bg-gray-700 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            Opiniones ({opiniones.length})
          </button>
        </div>
      )}

      {/* Contenido en 2 columnas */}
      {activeTab === "scores" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <StatItem
              color={getColor(scores.arena)}
              icon="🏖️"
              label="Calidad de Arena"
              value={scores.arena}
              textColor={getTextColorForBackground(getColor(scores.arena))}
              iconUrl={getIconUrlForScore(scores.arena)}
            />
            <StatItem
              color={getColor(scores.agua)}
              icon="🌊"
              label="Calidad del Agua"
              value={scores.agua}
              textColor={getTextColorForBackground(getColor(scores.agua))}
              iconUrl={getIconUrlForScore(scores.agua)}
            />
            <StatItem
              color={getColor(scores.concurrencia)}
              icon="👨‍👩‍👧"
              label="Concurrencia"
              value={scores.concurrencia}
              textColor={getTextColorForBackground(
                getColor(scores.concurrencia)
              )}
              iconUrl={getIconUrlForScore(scores.concurrencia)}
            />
            <StatItem
              color={getColor(scores.limpieza)}
              icon="🧹"
              label="Limpieza"
              value={scores.limpieza}
              textColor={getTextColorForBackground(getColor(scores.limpieza))}
              iconUrl={getIconUrlForScore(scores.limpieza)}
            />
            <StatItem
              color={getColor(scores.tranquilidad)}
              icon="☮️"
              label="Tranquilidad"
              value={scores.tranquilidad}
              textColor={getTextColorForBackground(
                getColor(scores.tranquilidad)
              )}
              iconUrl={getIconUrlForScore(scores.tranquilidad)}
            />
            <StatItem
              color={getColor(scores.atracciones)}
              icon="🎡"
              label="Atracciones"
              value={scores.atracciones}
              textColor={getTextColorForBackground(
                getColor(scores.atracciones)
              )}
              iconUrl={getIconUrlForScore(scores.atracciones)}
            />
          </div>

          {/* Barra de puntuación */}
          <div
            className={`flex items-center justify-between px-4 py-2 rounded-lg mb-4 ${scoreColor}`}
          >
            <span className={`text-2xl ${textColor}`}>
              {getEmojiFinalScore(score)}
            </span>
            <span className={`font-bold ${textColor}`}>
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
        </>
      )}

      {activeTab === "opinions" && (
        <div className="mt-1">
          <h3 className="text-white text-lg font-semibold mb-2">
            Opiniones de usuarios
          </h3>
          <div className="space-y-4">
            {opiniones.map((op, idx) => {
              const user = getUserById(op.userId);
              const ratingItems: (keyof Rating)[] = [
                "arena",
                "agua",
                "concurrencia",
                "limpieza",
                "tranquilidad",
                "atracciones",
              ];

              return (
                <div
                  key={idx}
                  className="bg-white rounded-lg shadow px-4 py-3 flex flex-col gap-2"
                >
                  {/* Header con usuario */}
                  <div className="flex items-start gap-3">
                    <Image
                      src={user?.photo || "/default-user.png"}
                      alt={user?.username || "Usuario"}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm text-gray-900 font-semibold">
                        {user?.username || "Usuario anónimo"}
                      </p>
                      <p className="text-xs text-gray-500">{op.fecha}</p>
                      <p className="text-gray-800 mt-1 text-sm">
                        {op.comentario}
                      </p>
                    </div>
                  </div>

                  {/* Puntajes individuales */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                    {ratingItems.map((item) => {
                      const value = op.rating[item];
                      const nivel =
                        `nivel${value}` as keyof typeof beachLevelScoreUrls;
                      const iconUrl = beachLevelScoreUrls[nivel];
                      const label =
                        item.charAt(0).toUpperCase() + item.slice(1);

                      return (
                        <div key={item} className="flex items-center gap-2">
                          <Image
                            src={iconUrl}
                            alt={nivel}
                            width={30}
                            height={30}
                          />
                          <span className="text-sm text-gray-700">
                            {label}: {value}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
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

  textColor?: "white" | "black";
  iconUrl: string;
}

function StatItem({
  color,
  icon,
  label,
  value,

  textColor = "white",
  iconUrl,
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
        <Image
          src={iconUrl}
          alt={`Nivel ${value}`}
          width={70}
          height={70}
          className="ml-1"
        />
      </div>
    </div>
  );
}
