import { Html } from "@react-three/drei";
import { Input } from "./ui/input";

export type HotSpotProps = {
  position: [number, number, number];
  label: string;
  id: string;
};

type HotSpotComponentProps = HotSpotProps & {
  isEditing: boolean;
  onStartEdit: () => void;
  onUpdateLabel: (label: string) => void;
};

export const HotSpot = ({
  position,
  label,
  isEditing,
  onStartEdit,
  onUpdateLabel,
}: HotSpotComponentProps) => {
  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onStartEdit();
      }}
    >
      <mesh>
        <sphereGeometry args={[0.02, 32, 32]} />
        <meshStandardMaterial
          color="#ef4444"
          emissive="#dc2626"
          emissiveIntensity={0.6}
        />
      </mesh>

      <mesh scale={0.8}>
        <sphereGeometry args={[0.02, 32, 32]} />
        <meshBasicMaterial color="#fca5a5" wireframe={true} />
      </mesh>

      <Html
        position={[0.15, 0.0109, 0]}
        center
        distanceFactor={1}
        style={{ pointerEvents: "none" }}
      >
        {isEditing ? (
          <Input
            value={label}
            onChange={(e) => onUpdateLabel(e.target.value)}
            className="text-4xl! font-bold bg-red-600 text-white border-0! h-auto! px-6! py-3! rounded-lg shadow-lg min-w-50 pointer-events-auto"
            autoFocus
          />
        ) : (
          <div
            className="bg-red-600 cursor-pointer text-white px-6 py-3 rounded-lg shadow-lg text-4xl font-bold pointer-events-auto whitespace-nowrap text-center"
            onClick={onStartEdit}
          >
            {label}
          </div>
        )}
      </Html>
    </group>
  );
};
