import { Suspense } from "react";
import type { MutableRefObject } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";
import ArcadeMachineModel from "./ArcadeMachineModel";

interface ArcadeMachineSceneProps {
  progressRef: MutableRefObject<number>;
  activeRef: MutableRefObject<boolean>;
  reduced: boolean;
}

/**
 * The R3F <Canvas> for the arcade reveal — lights + model + grounding shadow.
 * Default export so it can be code-split with React.lazy (keeps three.js out of
 * the initial bundle until the section is near the viewport). Lighting is a
 * void/plum studio: neutral key + violet rim lights matching the site palette,
 * with a transparent clear colour so the cosmos background shows through.
 */
export default function ArcadeMachineScene({
  progressRef,
  activeRef,
  reduced,
}: ArcadeMachineSceneProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0.4, 8], fov: 35, near: 0.1, far: 100 }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0); // transparent — sit on the cosmos canvas
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.0;
      }}
    >
      {/* Low base so form + shadows read (not a washed-out, flat grey). */}
      <ambientLight intensity={0.26} />
      <hemisphereLight args={[0xcdd6ff, 0x140e22, 0.35]} />
      {/* Key light — defines the form and casts the contact-ready shadow. */}
      <directionalLight
        position={[6, 10, 7]}
        intensity={3.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0002}
      />
      {/* Violet rim from behind-left — the brand "edge light". */}
      <pointLight position={[-6, 4, -5]} intensity={70} color="#8052ff" decay={2} />
      {/* Soft cool front fill so the facing side isn't crushed. */}
      <pointLight position={[4, 1, 6]} intensity={22} color="#b9adff" decay={2} />

      <Suspense fallback={null}>
        <ArcadeMachineModel progressRef={progressRef} activeRef={activeRef} reduced={reduced} />
      </Suspense>

      <AdaptiveDpr pixelated={false} />
    </Canvas>
  );
}
