// /components/menu/mapa/MapWrapper.tsx
"use client";

import dynamic from "next/dynamic";

// Aquí sí se permite ssr: false
const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
});

export default function MapWrapper() {
  return <MapComponent />;
}
