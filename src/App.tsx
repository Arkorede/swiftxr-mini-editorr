import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Editor3D } from "./components/Editor3D";
import { HotspotManager } from "./components/HotSpotManager";
import { useHotSpot } from "./hooks/useHotSpot";

export default function App() {
  const [uploadedFile, setUploadedFile] = useState<string>("");
  const {
    hotspots,
    handleAddHotspot,
    handleUpdateHotspot,
    handleDeleteHotspot,
  } = useHotSpot();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      if (uploadedFile) {
        URL.revokeObjectURL(uploadedFile);
      }
      const url = URL.createObjectURL(file);
      setUploadedFile(url);
    }
  };

  return (
    <main className="w-full h-screen bg-linear-to-b from-slate-900 to-slate-800 relative">
      <div className="absolute inset-0 z-0 w-full h-screen">
        <Editor3D
          modelUrl={uploadedFile}
          hotspots={hotspots}
          handleAddHotspot={handleAddHotspot}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 z-20 bg-linear-to-b from-slate-900 to-transparent p-6 pointer-events-none">
        <div className="max-w-md pointer-events-auto">
          <h1 className="text-2xl font-bold text-white mb-4">
            3D Model Editor
          </h1>

          <div className="space-y-3 bg-slate-800 p-4 rounded-lg">
            <div>
              <label className="text-sm font-medium text-white block mb-2">
                Upload GLB Model
              </label>
              <Input
                type="file"
                accept=".glb,.gltf"
                onChange={handleFileUpload}
                className="text-sm"
              />
            </div>

            <div className="text-xs text-slate-400 bg-slate-700 p-2 rounded">
              <p className="font-semibold mb-1">Controls:</p>
              <p>• Left Mouse: Rotate</p>
              <p>• Right Mouse/Middle: Pan</p>
              <p>• Scroll: Zoom</p>
              <p>• Click Model: Add Hotspot</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 z-20">
        <HotspotManager
          hotspots={hotspots}
          onUpdateHotspot={handleUpdateHotspot}
          onDeleteHotspot={handleDeleteHotspot}
        />
      </div>
    </main>
  );
}
