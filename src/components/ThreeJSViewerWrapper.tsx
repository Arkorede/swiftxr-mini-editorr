import { useEffect, useState } from "react";
import { Editor3D } from "./Editor3D";
import { useHotSpot } from "@/hooks/useHotSpot";

interface ThreeJSViewerWrapperProps {
  modelUrl?: string;
  modelScale?: number;
  backgroundColor?: string;
  cameraPosition?: "front" | "side" | "top";
  width?: string;
  height?: string;
  autoFit?: boolean;
}

const CAMERA_PRESETS = {
  front: [0, 0, 5] as [number, number, number],
  side: [5, 0, 0] as [number, number, number],
  top: [0, 5, 0] as [number, number, number],
};

export const ThreeJSViewerWrapper = ({
  modelUrl = "",
  modelScale = 1,
  backgroundColor = "#0f172a",
  cameraPosition = "front",
  width = "100%",
  height = "500px",
  autoFit = true,
}: ThreeJSViewerWrapperProps) => {
  const {
    hotspots,
    editingId,
    handleAddHotspot,
    handleUpdateHotspot,
    handleStartEdit,
  } = useHotSpot();

  const [cameraPos, setCameraPos] = useState<[number, number, number]>(
    CAMERA_PRESETS[cameraPosition],
  );

  useEffect(() => {
    setCameraPos(CAMERA_PRESETS[cameraPosition]);
  }, [cameraPosition]);

  if (!modelUrl) {
    return (
      <div
        style={{
          width,
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor,
          color: "white",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        Upload a model in the settings panel
      </div>
    );
  }

  return (
    <div style={{ width, height, position: "relative" }}>
      <Editor3D
        modelUrl={modelUrl}
        hotspots={hotspots}
        editingId={editingId}
        handleAddHotspot={handleAddHotspot}
        onStartEdit={handleStartEdit}
        onUpdateHotspot={handleUpdateHotspot}
        backgroundColor={backgroundColor}
        modelScale={modelScale}
        cameraPosition={cameraPos}
        autoFitCamera={autoFit}
      />
    </div>
  );
};
