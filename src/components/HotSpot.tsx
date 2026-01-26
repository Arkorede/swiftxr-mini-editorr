import { Html } from "@react-three/drei";

export type HotSpotProps = {
  position: [number, number, number];
  label: string;
  id: string;
};

export const HotSpot = ({ position, label }: HotSpotProps) => {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial
          color="#ef4444"
          emissive="#dc2626"
          emissiveIntensity={0.6}
        />
      </mesh>

      <mesh scale={0.8}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshBasicMaterial color="#fca5a5" wireframe={true} />
      </mesh>

      <Html
        position={[0, 0.3, 0]}
        center
        distanceFactor={1}
        scale={1}
        occlude="blending"
        style={{ pointerEvents: "none" }}
      >
        <div className="bg-red-600 text-white px-3 py-1 rounded-lg shadow-lg whitespace-nowrap text-sm font-semibold pointer-events-none">
          {label}
        </div>
      </Html>
    </group>
  );
};
