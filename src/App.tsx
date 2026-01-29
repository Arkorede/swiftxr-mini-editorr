import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Editor3D } from "./components/Editor3D";
import { HotspotManager } from "./components/HotSpotManager";
import { GrapesJSEditor } from "./components/GrapesJSEditor";
import { useHotSpot } from "./hooks/useHotSpot";

export default function App() {
  const [uploadedFile, setUploadedFile] = useState<string>("");
  const [editorMode, setEditorMode] = useState<"3d" | "grapesjs">("grapesjs");

  const {
    hotspots,
    editingId,
    handleAddHotspot,
    handleUpdateHotspot,
    handleDeleteHotspot,
    handleStartEdit,
    handleCancelEdit,
    handleCloseEdit,
    clearHotspots,
  } = useHotSpot();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearHotspots();
    const file = event.target.files?.[0];

    if (file) {
      if (uploadedFile) {
        URL.revokeObjectURL(uploadedFile);
      }
      const url = URL.createObjectURL(file);
      setUploadedFile(url);
    }
  };

  if (editorMode === "grapesjs") {
    return (
      <div className="relative w-full h-screen">
        <div className="absolute top-0 right-1/2 z-50">
          <Button
            onClick={() => setEditorMode("3d")}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Switch to Original 3D Editor
          </Button>
        </div>
        <GrapesJSEditor />
      </div>
    );
  }

  return (
    <main className="w-full h-screen bg-linear-to-b from-slate-900 to-slate-800 relative">
      <div className="absolute inset-0 z-0 w-full h-screen">
        <Editor3D
          modelUrl={uploadedFile}
          hotspots={hotspots}
          editingId={editingId}
          handleAddHotspot={handleAddHotspot}
          onStartEdit={handleStartEdit}
          onUpdateHotspot={handleUpdateHotspot}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 z-20 bg-linear-to-b from-slate-900 to-transparent p-6 pointer-events-none">
        <div className="max-w-md pointer-events-auto">
          <h1 className="text-4xl font-bold text-white mb-4">
            3D Model Editor
          </h1>

          <div className="space-y-3 bg-slate-800 p-4 rounded-lg border-slate-800">
            <div>
              <label className="text-sm font-medium text-white block mb-2">
                Upload GLB Model
              </label>
              <Input
                type="file"
                accept=".glb"
                onChange={handleFileUpload}
                className="text-sm text-white file:text-white cursor-pointer"
              />
            </div>

            <Button
              onClick={() => setEditorMode("grapesjs")}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Switch to GrapesJS Editor
            </Button>

            <div className="text-xs text-slate-400 bg-slate-700 p-2 rounded">
              <h4 className="font-semibold mb-1">Controls:</h4>
              <ul className="list-disc list-inside">
                <li>Left Mouse: Rotate</li>
                <li>Right Mouse/Middle: Pan</li>
                <li>Scroll: Zoom</li>
                <li>Click Model: Add Hotspot</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 z-20 max-h-screen overflow-auto">
        <HotspotManager
          hotspots={hotspots}
          editingId={editingId}
          onStartEdit={handleStartEdit}
          onSaveEdit={handleCloseEdit}
          onCancelEdit={handleCancelEdit}
          onUpdateHotspot={handleUpdateHotspot}
          onDeleteHotspot={handleDeleteHotspot}
        />
      </div>
    </main>
  );
}
