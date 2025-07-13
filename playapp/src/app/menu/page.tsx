// /app/menu/page.tsx
"use client";
import dynamic from "next/dynamic";
const MapComponent = dynamic(() => import("@/components/menu/mapa/MapComponent"), { ssr: false });

export default function MenuPage() {
  return <MapComponent />;
}
