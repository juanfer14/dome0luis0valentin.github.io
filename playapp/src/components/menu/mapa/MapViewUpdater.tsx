import { useMap } from "react-leaflet";
import { useEffect } from "react";

interface MapViewUpdaterProps {
  center: [number, number];
  zoom: number;
}

export default function MapViewUpdater({ center, zoom }: MapViewUpdaterProps) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(center, zoom); // O podés usar map.setView(center, zoom)
  }, [center, zoom, map]);

  return null;
}
