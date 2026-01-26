import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { type HotSpotProps } from "./HotSpot";

interface HotspotManagerProps {
  hotspots: HotSpotProps[];
  onUpdateHotspot: (id: string, label: string) => void;
  onDeleteHotspot: (id: string) => void;
}

export const HotspotManager = ({
  hotspots,
  onUpdateHotspot,
  onDeleteHotspot,
}: HotspotManagerProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingLabel, setEditingLabel] = useState<string>("");

  const startEdit = (id: string, currentLabel: string) => {
    setEditingId(id);
    setEditingLabel(currentLabel);
  };

  const saveEdit = (id: string) => {
    if (editingLabel.trim()) {
      onUpdateHotspot(id, editingLabel.trim());
    }
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingLabel("");
  };

  return (
    <div className="w-full md:w-80 bg-slate-900 border-l border-slate-700 flex flex-col overflow-hidden">
      <div className="p-4 border-b border-slate-700 bg-slate-800">
        <h2 className="text-lg font-bold text-white">Hotspots</h2>
        <p className="text-xs text-slate-400 mt-1">
          {hotspots.length} hotspot{hotspots.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {hotspots.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-slate-400 text-sm">
              Click on the model to add hotspots
            </p>
          </div>
        ) : (
          hotspots.map((hotspot) => (
            <Card
              key={hotspot.id}
              className="p-3 bg-slate-800 border-slate-700"
            >
              {editingId === hotspot.id ? (
                <div className="space-y-2">
                  <Input
                    value={editingLabel}
                    onChange={(e) => setEditingLabel(e.target.value)}
                    placeholder="Label"
                    className="text-sm text-white"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => saveEdit(hotspot.id)}
                      className="flex-1 text-xs"
                    >
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={cancelEdit}
                      className="flex-1 text-xs bg-red-400 text-white border-0"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-white text-sm">
                        {hotspot.label}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Position: ({hotspot.position[0].toFixed(2)},{" "}
                        {hotspot.position[1].toFixed(2)},{" "}
                        {hotspot.position[2].toFixed(2)})
                      </p>
                    </div>
                    <button
                      onClick={() => onDeleteHotspot(hotspot.id)}
                      className="text-slate-400 hover:text-red-400 transition-colors p-1 cursor-pointer"
                      title="Delete hotspot"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => startEdit(hotspot.id, hotspot.label)}
                    className="w-full text-xs"
                  >
                    Edit Label
                  </Button>
                </div>
              )}
            </Card>
          ))
        )}
      </div>

      {hotspots.length > 0 && (
        <div className="p-4 border-t border-slate-700 bg-slate-800 text-xs text-slate-400">
          <p>Click {"Edit Label"} to rename hotspots</p>
        </div>
      )}
    </div>
  );
};
