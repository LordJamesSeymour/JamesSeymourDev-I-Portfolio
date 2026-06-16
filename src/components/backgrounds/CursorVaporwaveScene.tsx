import { memo, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { gridVertexShader, gridFragmentShader } from "./cursorVaporwaveShaders";

interface NeonGridProps {
  active: boolean;
  reduced: boolean;
}

function NeonGrid({ active, reduced }: NeonGridProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 2.6 },
      uCell: { value: 2.0 },
      uLineHalf: { value: 0.045 },
      uNear: { value: 1.0 },
      uFar: { value: 95.0 },
      uColorNear: { value: new THREE.Color("#ff2d9b") },
      uColorFar: { value: new THREE.Color("#27e6ff") },
      uOpacity: { value: 0.9 },
    }),
    [],
  );

  useFrame((_, delta) => {
    const mat = materialRef.current;
    if (!mat || reduced || !active) return;
    mat.uniforms.uTime.value += Math.min(delta, 0.05);
  });

  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, 0, -28]}>
      <planeGeometry args={[140, 240, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={gridVertexShader}
        fragmentShader={gridFragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

interface CursorVaporwaveSceneProps {
  active: boolean;
  reduced: boolean;
}

function CursorVaporwaveScene({ active, reduced }: CursorVaporwaveSceneProps) {
  return (
    <Canvas
      className="cvw__canvas"
      dpr={[1, 1.5]}
      gl={{
        antialias: false,
        alpha: true,
        depth: false,
        stencil: false,
        powerPreference: "high-performance",
      }}
      camera={{ position: [0, 1.5, 6], fov: 74, near: 0.1, far: 200 }}
      onCreated={({ gl, camera }) => {
        gl.setClearColor(0x000000, 0);
        camera.lookAt(0, 1.15, -12);
      }}
      frameloop={active && !reduced ? "always" : "demand"}
    >
      <NeonGrid active={active} reduced={reduced} />
    </Canvas>
  );
}

export default memo(CursorVaporwaveScene);
