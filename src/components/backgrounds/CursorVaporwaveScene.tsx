import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";
import { gridVertexShader, gridFragmentShader } from "./cursorVaporwaveShaders";

/**
 * The R3F <Canvas> for the Cursor.zip vaporwave background — a single animated
 * neon perspective grid floor that scrolls toward the camera and fades into the
 * horizon. Default export so it can be code-split with React.lazy (keeps three.js
 * out of every other project page's bundle until the Cursor.zip page mounts it).
 *
 * The retro sun, statues and Win95 windows are CSS/SVG layers in
 * CursorVaporwaveBackground — only the grid needs real 3D perspective + a shader,
 * so this scene stays to ~2 draw calls and is cheap on laptops.
 */

interface NeonGridProps {
  reduced: boolean;
}

function NeonGrid({ reduced }: NeonGridProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Built once. Colours/scroll are tuned for the synthwave road look: hot magenta
  // in the foreground easing to electric cyan as the floor recedes.
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
    if (!mat) return;
    // Reduced motion: hold a single, static frame (no scroll).
    if (!reduced) {
      // Clamp delta so a tab-restore catch-up frame can't jump the floor.
      mat.uniforms.uTime.value += Math.min(delta, 0.05);
    }
  });

  return (
    // Flat floor: plane lies in the XY plane, rotated to the ground. Local +y maps
    // to world −z (into the screen), which the shader reads as depth.
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
  reduced: boolean;
}

export default function CursorVaporwaveScene({ reduced }: CursorVaporwaveSceneProps) {
  return (
    <Canvas
      className="cvw__canvas"
      // DPR capped at 1.75 (per the brief) — sharp enough, never oversamples.
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      // Eye above the floor looking forward + slightly down, so the horizon sits
      // a touch above centre (where the CSS sun is anchored).
      camera={{ position: [0, 1.5, 6], fov: 74, near: 0.1, far: 200 }}
      onCreated={({ gl, camera }) => {
        gl.setClearColor(0x000000, 0); // transparent — sit over the CSS sky + sun
        camera.lookAt(0, 1.15, -12);
      }}
      // Static frame for reduced motion; otherwise animate continuously.
      frameloop={reduced ? "demand" : "always"}
    >
      <NeonGrid reduced={reduced} />
      <AdaptiveDpr pixelated={false} />
    </Canvas>
  );
}
