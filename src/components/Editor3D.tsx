import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Environment,
  Html,
  PerspectiveCamera,
} from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import { type HotSpotProps } from "./HotSpot";
import { Vector3, Group, Mesh } from "three";
import { HotSpot } from "./HotSpot";
import { type ThreeEvent } from "@react-three/fiber";

type ModelProps = {
  url: string;
  onHotspotAdd: (position: Vector3) => void;
};

type EditorProps = {
  modelUrl: string;
  hotspots: HotSpotProps[];
  handleAddHotspot: (position: Vector3) => void;
};

const Model = ({ url, onHotspotAdd }: ModelProps) => {
  const { scene } = useGLTF(url);
  const meshRef = useRef<Group>(null);

  const handlePointClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onHotspotAdd(e.point);
  };

  useEffect(() => {
    return () => {
      if (scene) {
        scene.traverse((object) => {
          if (object instanceof Mesh) {
            if (object.geometry) object.geometry.dispose();
            if (object.material) {
              if (Array.isArray(object.material)) {
                object.material.forEach((material) => material.dispose());
              } else {
                object.material.dispose();
              }
            }
          }
        });
      }
    };
  }, [scene]);

  return (
    <group ref={meshRef} onClick={handlePointClick}>
      <primitive object={scene} />
    </group>
  );
};

const LoadingFallback = () => {
  return (
    <Html center>
      <div className="bg-slate-800 text-white px-4 py-2 rounded-lg">
        Loading model...
      </div>
    </Html>
  );
};

export const Editor3D = ({
  modelUrl,
  hotspots,
  handleAddHotspot,
}: EditorProps) => {
  if (!modelUrl) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-slate-900">
        <p className="text-white text-4xl font-bold">
          Upload a model to get started
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col relative">
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 50,
          near: 0.1,
          far: 1000,
        }}
        gl={{ antialias: true, alpha: false, preserveDrawingBuffer: true }}
        className="w-full h-screen"
      >
        <color attach="background" args={["#0f172a"]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <pointLight position={[-10, -10, -5]} intensity={0.4} />

        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />

        <Environment preset="studio" />

        <Suspense fallback={<LoadingFallback />}>
          <Model url={modelUrl} onHotspotAdd={handleAddHotspot} />
        </Suspense>

        {hotspots.map((hotspot) => (
          <HotSpot
            key={hotspot.id}
            position={hotspot.position}
            id={hotspot.id}
            label={hotspot.label}
          />
        ))}

        <OrbitControls
          autoRotate={false}
          enableDamping={true}
          dampingFactor={0.05}
          enablePan={true}
          enableZoom={true}
        />
      </Canvas>
    </div>
  );
};
