// /components/menu/mapa/MapComponent.tsx

"use client";

import { useSidebar } from "@/context/SidebarContext";

import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

import DropdownFilter from "./DropdownFilter";

import BeachStatsPanel from "@/components/menu/mapa/BeachStatsPanel";
import MapViewUpdater from "./MapViewUpdater"; // ajustá la ruta según corresponda

import styles from "./MapComponent.module.css";

import { useBeaches } from "@/app/context/BeachesContext";

import { useRef } from "react";

import { useTheme } from "@/app/context/ThemeContext"; // ✅

import { IconLevel, beachLevelIconUrls, faceIcons } from "@/data/beaches";
import { useState } from "react";

const getScoreLevel = (score: number): number => {
  if (score >= 7) return 1; // Nivel alto (verde)
  if (score >= 5) return 2; // Nivel medio-alto (amarillo)
  if (score >= 3) return 3; // Nivel medio (naranja)
  return 4; // Nivel bajo (rojo)
};

const getColor: Record<number, string> = {
  1: "#4ADE80", // Verde
  2: "#FCD34D", // Amarillo
  3: "#F97316", // Naranja
  4: "#DC2626", // Rojo
};

const faceCondition: Record<number, string> = {
  1: faceIcons.veryHappy,
  2: faceIcons.happy,
  3: faceIcons.neutral,
  4: faceIcons.annoyed,
};

const getIcon: Record<number, IconLevel> = {
  1: "nivel1",
  2: "nivel2",
  3: "nivel3",
  4: "nivel4",
};

const createIcon = (url: string) =>
  L.icon({
    iconUrl: url,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

export default function MapComponent() {
  const { darkMode } = useTheme();
  // Estado para seleccionar una playa
  const [selectedBeach, setSelectedBeach] = useState<number | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    -34.89, -57.922,
  ]);
  const [mapZoom, setMapZoom] = useState(11);

  const { beachesWithScores } = useBeaches();

  const handleShowStats = (index: number) => {
    const beach = beachesWithScores[index]; // accedés al objeto completo
    setSelectedBeach(index);
    setMapCenter(beach.coords);
    setMapZoom(15);
  };

  const markerRefs = useRef<(L.Marker | null)[]>([]);

  const { sidebarOpen } = useSidebar();

  return (
    <div
      className={`relative w-full h-full flex flex-col items-center justify-end ${
        sidebarOpen ? "pointer-events-none" : "pointer-events-auto"
      }`}
    >
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        className="w-full h-full min-h-0 z-0"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* 🔁 Aquí actualizás el centro y zoom dinámicamente */}
        <MapViewUpdater center={mapCenter} zoom={mapZoom} />

        <MarkerClusterGroup>
          {beachesWithScores.map(({ coords, name, scores }, index) => (
            <Marker
              key={name}
              position={coords as L.LatLngExpression}
              icon={createIcon(
                beachLevelIconUrls[
                  getIcon[getScoreLevel(scores?.finalScore ?? 1)]
                ]
              )}
              ref={(el) => {
                markerRefs.current[index] = el;
              }}
            >
              <Tooltip
                permanent
                direction="left"
                offset={[-30, -20]}
                className={styles.transparentTooltip}
              >
                {name}
              </Tooltip>
              <Popup>
                <div
                  style={{
                    textAlign: "center",
                    fontFamily: "sans-serif",
                    padding: "0.5rem",
                    backgroundColor: darkMode ? "#1f2937" : "#ffffff", // dark: gray-800
                    color: darkMode ? "#f3f4f6" : "#111827", // dark: gray-100
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                  }}
                >
                  <div
                    style={{
                      backgroundColor:
                        getColor[getScoreLevel(scores?.finalScore ?? 1)],
                      color:
                        getScoreLevel(scores?.finalScore ?? 1) < 3
                          ? "#000"
                          : "#fff",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "5px",
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {name}
                  </div>

                  <div
                    style={{
                      backgroundColor: darkMode ? "#374151" : "#f0f0f0", // dark: gray-700
                      border: `1px solid ${darkMode ? "#4b5563" : "#ccc"}`, // gray-600
                      padding: "0.75rem",
                      borderRadius: "5px",
                    }}
                  >
                    <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                      {faceCondition[getScoreLevel(scores?.finalScore ?? 1)]}
                    </div>
                    <div style={{ fontWeight: "bold", fontSize: "1rem" }}>
                      Puntaje: {scores?.finalScore ?? 1}/10
                    </div>
                    <button
                      onClick={() => {
                        handleShowStats(index);
                        markerRefs.current[index]?.closePopup();
                      }}
                      className={`mt-3 w-full font-semibold py-2 px-4 rounded-md shadow transition-colors duration-200 ${
                        darkMode
                          ? "bg-white text-gray-900 hover:bg-gray-200"
                          : "bg-black text-white hover:bg-gray-800"
                      }`}
                    >
                      Ver estadísticas
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
      {/* Aquí el dropdown con posición absoluta */}
      {selectedBeach === null && (
        <div
          className={`absolute top-4 right-4 z-10 ${
            sidebarOpen ? "opacity-50" : "opacity-100"
          }`}
        >
          <DropdownFilter />
        </div>
      )}

      {/* Panel de estadísticas */}
      {selectedBeach != null && (
        <div className="absolute bottom-0 w-full flex justify-center z-10 pointer-events-auto">
          <BeachStatsPanel
            beach={beachesWithScores[selectedBeach]}
            onClose={() => setSelectedBeach(null)}
          />
        </div>
      )}
    </div>
  );
}
