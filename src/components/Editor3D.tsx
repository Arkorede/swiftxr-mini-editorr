import { Canvas, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Environment,
  Html,
  PerspectiveCamera,
} from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import { type HotSpotProps } from "./HotSpot";
import { Vector3, Mesh, Box3 } from "three";
import { HotSpot } from "./HotSpot";
import { type ThreeEvent } from "@react-three/fiber";

type ModelProps = {
  url: string;
  onHotspotAdd: (position: Vector3) => void;
  autoFitCamera?: boolean;
};

type EditorProps = {
  modelUrl: string;
  hotspots: HotSpotProps[];
  editingId: string | null;
  handleAddHotspot: (position: Vector3) => void;
  onStartEdit: (id: string) => void;
  onUpdateHotspot: (id: string, label: string) => void;
  backgroundColor?: string;
  modelScale?: number;
  cameraPosition?: [number, number, number];
  autoFitCamera?: boolean;
};

const Model = ({ url, onHotspotAdd, autoFitCamera = true }: ModelProps) => {
  const { scene } = useGLTF(url);
  const { camera, controls } = useThree();
  const hasFitCamera = useRef(false);

  const handlePointClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onHotspotAdd(e.point);
  };

  useEffect(() => {
    if (!scene || !autoFitCamera || hasFitCamera.current) return;

    hasFitCamera.current = true;
    const box = new Box3().setFromObject(scene);
    const center = box.getCenter(new Vector3());
    const size = box.getSize(new Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = 50;
    const cameraDistance = maxDim / (2 * Math.tan((fov * Math.PI) / 360));

    camera.position.set(center.x, center.y, center.z + cameraDistance * 2.5);
    camera.lookAt(center);
    camera.updateProjectionMatrix();

    if (controls) {
      (controls as any).target.copy(center);
      (controls as any).update();
    }
  }, [scene, autoFitCamera]);

  useEffect(() => {
    hasFitCamera.current = false;
  }, [url]);

  // Cleanup when URL changes
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
    <group onClick={handlePointClick}>
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
  editingId,
  onUpdateHotspot,
  onStartEdit,
  backgroundColor = "#0f172a",
  modelScale = 1,
  cameraPosition = [0, 0, 5],
  autoFitCamera = true,
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
    <div className="w-full h-full flex flex-col relative">
      <Canvas
        camera={{
          position: cameraPosition,
          fov: 50,
          near: 0.1,
          far: 1000,
        }}
        gl={{ antialias: true, alpha: false, preserveDrawingBuffer: true }}
        className="w-full h-full outline-none"
      >
        <color attach="background" args={[backgroundColor]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <pointLight position={[-10, -10, -5]} intensity={0.4} />

        <PerspectiveCamera makeDefault position={cameraPosition} fov={50} />

        <Environment preset="studio" />

        <Suspense fallback={<LoadingFallback />}>
          <group scale={modelScale}>
            <Model
              url={modelUrl}
              onHotspotAdd={handleAddHotspot}
              autoFitCamera={autoFitCamera}
            />
          </group>
        </Suspense>

        {hotspots.map((hotspot) => (
          <HotSpot
            key={hotspot.id}
            position={hotspot.position}
            id={hotspot.id}
            label={hotspot.label}
            isEditing={editingId === hotspot.id}
            onStartEdit={() => onStartEdit(hotspot.id)}
            onUpdateLabel={(label) => onUpdateHotspot(hotspot.id, label)}
          />
        ))}

        <OrbitControls
          autoRotate={false}
          enableDamping={false}
          dampingFactor={0.05}
          enablePan={true}
          enableZoom={true}
        />
      </Canvas>
    </div>
  );
};
