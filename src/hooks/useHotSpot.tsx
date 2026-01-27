import { useState } from "react";
import { type HotSpotProps } from "@/components/HotSpot";
import { Vector3 } from "three";

export const useHotSpot = () => {
  const [hotspots, setHotspots] = useState<HotSpotProps[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [originalLabel, setOriginalLabel] = useState<string>("");

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

  const handleStartEdit = (id: string) => {
    const hotspot = hotspots.find((h) => h.id === id);
    if (hotspot) {
      setOriginalLabel(hotspot.label);
      setEditingId(id);
    }
  };

  const handleCloseEdit = () => {
    setEditingId(null);
    setOriginalLabel("");
  };

  const handleCancelEdit = () => {
    if (editingId && originalLabel) {
      handleUpdateHotspot(editingId, originalLabel);
    }
    handleCloseEdit();
  };

  const clearHotspots = () => {
    setHotspots([]);
    setEditingId(null);
    setOriginalLabel("");
  };

  return {
    hotspots,
    setHotspots,
    editingId,
    setEditingId,
    handleAddHotspot,
    handleUpdateHotspot,
    handleDeleteHotspot,
    handleStartEdit,
    handleCancelEdit,
    handleCloseEdit,
    clearHotspots,
  };
};
