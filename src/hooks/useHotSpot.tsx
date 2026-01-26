import { useState } from "react";
import { type HotSpotProps } from "@/components/HotSpot";
import { Vector3 } from "three";

export const useHotSpot = () => {
  const [hotspots, setHotspots] = useState<HotSpotProps[]>([]);

  const handleAddHotspot = (position: Vector3) => {
    const newHotspot: HotSpotProps = {
      id: `hotspot-${Date.now()}`,
      position: [position.x, position.y, position.z],
      label: `Hotspot ${hotspots.length + 1}`,
    };
    setHotspots([...hotspots, newHotspot]);
  };

  const handleUpdateHotspot = (id: string, label: string) => {
    setHotspots(hotspots.map((h) => (h.id === id ? { ...h, label } : h)));
  };

  const handleDeleteHotspot = (id: string) => {
    setHotspots(hotspots.filter((h) => h.id !== id));
  };

  return {
    hotspots,
    handleAddHotspot,
    handleUpdateHotspot,
    handleDeleteHotspot,
  };
};
