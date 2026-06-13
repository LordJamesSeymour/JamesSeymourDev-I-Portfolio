import { useMemo, useRef } from "react";
import type { MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

/**
 * Decorative NES-style controllers for the Arcade Machine section background.
 *
 * Each controller is built ENTIRELY from three.js primitives (no images, SVGs, or
 * imported models) and rendered into its OWN small canvas. The canvas fills a
 * CSS-sized, clamped decorative box that is positioned section-relative (see the
 * `.amx__deco--one/--two` rules) — one in the upper-right by the section intro, one
 * in the lower-left near the transition to the overview. Because the box is
 * clamp()-bounded, the controller can never scale up with the viewport / browser
 * zoom: it stays proportional to the Arcade Machine content, not the screen.
 *
 * Animated: the A/B caps depress in alternation (B → A, one per ~2s), and each cable
 * sways with a gentle two-bone wiggle. pointer-events:none, and code-split (lazy) so
 * three.js stays out of the initial bundle.
 */

// --- Per-canvas framing -----------------------------------------------------------
// The controller is centred in its own (clamped) canvas and scaled to a fixed
// fraction of THAT canvas — so its on-screen size is governed by the CSS box size,
// never by the page viewport. This is the core of the "don't scale with zoom" fix.
const CONTROLLER_W = 4.0; // base controller width in local units (drives the scale)
const FILL = 0.84; // controller body width as a fraction of the canvas width
const BODY_Y_OFF = -0.16; // push the body down so the cable rises into the upper canvas

// Per-variant placement/look. `dir` mirrors the cable + choreography; tilt/yaw set
// the resting pose so each anchor reads as a tucked 3/4 prop. Easy to tune here.
const VARIANTS = {
  // Upper-right anchor (right of the "Inside the Arcade Machine" intro, above window).
  one: { dir: 1, phase: 0, tiltZ: -0.16, yaw: -0.42 },
  // Lower-left anchor (below/left of the window, near the section transition).
  two: { dir: -1, phase: 2.0, tiltZ: 0.15, yaw: 0.4 },
} as const;

export type ControllerVariant = keyof typeof VARIANTS;

// --- A/B press cadence: one cap per SLOT, B then A → a SLOT*2 loop ---------------
const SLOT = 2.0; // seconds each cap "owns" before handing off
const PRESS_DUR = 0.5; // seconds the depress pulse lasts at the start of a slot
const PRESS_DEPTH = 0.13; // local units the cap sinks
const BTN_Z = 0.13; // resting cap height above its recess
const GLOW_REST = 0.14; // idle emissive on the red caps
const GLOW_PEAK = 0.95; // emissive at full press

/** 0 → 1 → 0 smooth bump over PRESS_DUR at the start of a slot, else 0. */
function pressPulse(localT: number): number {
  if (localT < 0 || localT >= PRESS_DUR) return 0;
  return Math.sin((Math.PI * localT) / PRESS_DUR);
}

// Cable path control points (local to the cable root). Two segments nested so the
// upper half can sway relative to the lower — a soft wave with NO per-frame
// geometry rebuild. `dir` pushes the curve outward.
const LOWER_END = new THREE.Vector3(0, 1.15, 0);
const buildLowerCurve = (dir: number) =>
  new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0.18 * dir, 0.58, 0.04),
    LOWER_END.clone().setX(0.1 * dir),
  ]);
const buildUpperCurve = (dir: number) =>
  new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0.22 * dir, 0.74, 0),
    new THREE.Vector3(0.46 * dir, 1.7, 0),
  ]);

interface NesControllerProps {
  variant: ControllerVariant;
  activeRef: MutableRefObject<boolean>;
}

/** One controller group, built from primitives, with its own animation loop. */
function NesController({ variant, activeRef }: NesControllerProps) {
  const { dir, phase, tiltZ, yaw } = VARIANTS[variant];

  const anchor = useRef<THREE.Group>(null);
  const floatGroup = useRef<THREE.Group>(null);
  const aMesh = useRef<THREE.Mesh>(null);
  const bMesh = useRef<THREE.Mesh>(null);
  const aMat = useRef<THREE.MeshStandardMaterial>(null);
  const bMat = useRef<THREE.MeshStandardMaterial>(null);
  const cableLow = useRef<THREE.Group>(null);
  const cableUp = useRef<THREE.Group>(null);

  const lowerCurve = useMemo(() => buildLowerCurve(dir), [dir]);
  const upperCurve = useMemo(() => buildUpperCurve(dir), [dir]);

  useFrame((state) => {
    const a = anchor.current;
    if (!a) return;

    // Centre + scale to a fixed fraction of THIS canvas (which is CSS-clamped), so
    // the controller size tracks the content box — not the viewport. Runs every
    // frame (cheap) so resize stays correct with no first-frame flash.
    const vpW = state.viewport.width; // world units across this small canvas
    const vpH = state.viewport.height;
    a.position.set(0, vpH * BODY_Y_OFF, 0);
    a.scale.setScalar((vpW * FILL) / CONTROLLER_W);

    if (!activeRef.current) return; // section scrolled away → skip the animation work

    const t = state.clock.elapsedTime;

    // Idle hover + the variant's resting tilt/yaw + a whisper of sway.
    const f = floatGroup.current;
    if (f) {
      f.position.y = Math.sin(t * 0.5 + phase) * 0.05;
      f.rotation.z = tiltZ + Math.sin(t * 0.4 + phase) * 0.015;
      f.rotation.y = yaw + Math.sin(t * 0.3 + phase) * 0.02;
      f.rotation.x = -0.06;
    }

    // Alternating press: B owns slot 0, A owns slot 1 — never both at once.
    const cyc = (t + phase) % (SLOT * 2);
    const bAmt = cyc < SLOT ? pressPulse(cyc) : 0;
    const aAmt = cyc >= SLOT ? pressPulse(cyc - SLOT) : 0;
    if (bMesh.current) bMesh.current.position.z = BTN_Z - bAmt * PRESS_DEPTH;
    if (aMesh.current) aMesh.current.position.z = BTN_Z - aAmt * PRESS_DEPTH;
    if (bMat.current) bMat.current.emissiveIntensity = GLOW_REST + bAmt * GLOW_PEAK;
    if (aMat.current) aMat.current.emissiveIntensity = GLOW_REST + aAmt * GLOW_PEAK;

    // Two-bone cable wiggle — gentle, out-of-phase between the bones for a soft S.
    if (cableLow.current) cableLow.current.rotation.z = Math.sin(t * 0.7 + phase) * 0.05;
    if (cableUp.current) cableUp.current.rotation.z = Math.sin(t * 0.7 + phase + 1.7) * 0.08;
  });

  return (
    <group ref={anchor}>
      <group ref={floatGroup}>
        {/* Light-grey outer shell */}
        <RoundedBox args={[4, 1.7, 0.55]} radius={0.14} smoothness={3}>
          <meshStandardMaterial color="#b8bcc8" roughness={0.5} metalness={0.08} />
        </RoundedBox>

        {/* Dark face plate, inset and proud of the shell */}
        <RoundedBox
          args={[3.76, 1.44, 0.16]}
          radius={0.08}
          smoothness={3}
          position={[0, 0, 0.2]}
        >
          <meshStandardMaterial color="#26242c" roughness={0.55} metalness={0.05} />
        </RoundedBox>

        {/* Thin violet accent strip near the bottom — ties to the site's brand glow */}
        <mesh position={[0, -0.58, 0.3]}>
          <boxGeometry args={[3.42, 0.05, 0.015]} />
          <meshStandardMaterial
            color="#8052ff"
            emissive="#8052ff"
            emissiveIntensity={0.6}
            roughness={0.4}
          />
        </mesh>

        {/* D-PAD (left) — a charcoal cross from two boxes + a centre hub */}
        <group position={[-1.28, 0.06, 0.3]}>
          <mesh>
            <boxGeometry args={[0.34, 1.04, 0.18]} />
            <meshStandardMaterial color="#3c3b44" roughness={0.5} metalness={0.18} />
          </mesh>
          <mesh>
            <boxGeometry args={[1.04, 0.34, 0.18]} />
            <meshStandardMaterial color="#3c3b44" roughness={0.5} metalness={0.18} />
          </mesh>
          <mesh position={[0, 0, 0.07]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 0.12, 20]} />
            <meshStandardMaterial color="#2c2b33" roughness={0.6} />
          </mesh>
        </group>

        {/* SELECT / START (centre) — two dark pills on a slight housing */}
        <group position={[-0.05, -0.32, 0.28]}>
          <RoundedBox args={[1.18, 0.42, 0.1]} radius={0.05} smoothness={2}>
            <meshStandardMaterial color="#2c2b33" roughness={0.6} metalness={0.1} />
          </RoundedBox>
          <RoundedBox
            args={[0.4, 0.15, 0.12]}
            radius={0.06}
            smoothness={2}
            position={[-0.28, 0, 0.06]}
          >
            <meshStandardMaterial color="#16151b" roughness={0.5} />
          </RoundedBox>
          <RoundedBox
            args={[0.4, 0.15, 0.12]}
            radius={0.06}
            smoothness={2}
            position={[0.28, 0, 0.06]}
          >
            <meshStandardMaterial color="#16151b" roughness={0.5} />
          </RoundedBox>
        </group>

        {/* A / B action buttons (right) — B left, A right, classic NES red, animated.
            Each cylinder's axis is rotated to face the camera (+Z) so it presses
            along Z; a darker recess cylinder sits beneath for the seated look. */}
        <group position={[1.18, -0.04, 0.28]}>
          <mesh position={[-0.44, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.34, 0.34, 0.1, 28]} />
            <meshStandardMaterial color="#1b1a20" roughness={0.7} />
          </mesh>
          <mesh position={[0.44, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.34, 0.34, 0.1, 28]} />
            <meshStandardMaterial color="#1b1a20" roughness={0.7} />
          </mesh>
          {/* B */}
          <mesh ref={bMesh} position={[-0.44, 0, BTN_Z]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.26, 0.26, 0.16, 28]} />
            <meshStandardMaterial
              ref={bMat}
              color="#c0282f"
              emissive="#ff2a32"
              emissiveIntensity={GLOW_REST}
              roughness={0.35}
              metalness={0.12}
            />
          </mesh>
          {/* A */}
          <mesh ref={aMesh} position={[0.44, 0, BTN_Z]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.26, 0.26, 0.16, 28]} />
            <meshStandardMaterial
              ref={aMat}
              color="#c0282f"
              emissive="#ff2a32"
              emissiveIntensity={GLOW_REST}
              roughness={0.35}
              metalness={0.12}
            />
          </mesh>
        </group>

        {/* CABLE — exits the top (biased outward) and wiggles up into the page space.
            A short strain-relief nub at the base, then two nested tube bones. */}
        <group ref={cableLow} position={[0.62 * dir, 0.82, 0.0]}>
          <mesh position={[0, -0.04, 0]}>
            <cylinderGeometry args={[0.1, 0.13, 0.22, 16]} />
            <meshStandardMaterial color="#2a2a30" roughness={0.6} metalness={0.1} />
          </mesh>
          <mesh>
            <tubeGeometry args={[lowerCurve, 20, 0.05, 6, false]} />
            <meshStandardMaterial color="#2a2a30" roughness={0.6} metalness={0.1} />
          </mesh>
          <group ref={cableUp} position={[LOWER_END.x + 0.1 * dir, LOWER_END.y, LOWER_END.z]}>
            <mesh>
              <tubeGeometry args={[upperCurve, 22, 0.046, 6, false]} />
              <meshStandardMaterial color="#2a2a30" roughness={0.6} metalness={0.1} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}

interface ArcadeControllerDecorationProps {
  /** Which anchor zone this instance sits in (drives tilt + cable side). */
  variant: ControllerVariant;
  /** When false (section scrolled off-screen), per-frame animation is skipped. */
  activeRef: MutableRefObject<boolean>;
}

/**
 * One controller in its own R3F <Canvas> that fills its (CSS-clamped) decorative
 * box. Transparent clear colour so the cosmos background shows through; lighting is
 * a cheaper echo of the main arcade scene (neutral key + violet rim), NO shadows.
 */
export default function ArcadeControllerDecoration({
  variant,
  activeRef,
}: ArcadeControllerDecorationProps) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 12], fov: 35, near: 0.1, far: 100 }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.0;
      }}
    >
      <ambientLight intensity={0.5} />
      <hemisphereLight args={[0xcdd6ff, 0x140e22, 0.5]} />
      <directionalLight position={[4, 6, 8]} intensity={1.7} />
      {/* Violet rim from behind-left — the brand edge light. */}
      <pointLight position={[-6, 3, -4]} intensity={45} color="#8052ff" decay={2} />
      {/* Soft cool front fill. */}
      <pointLight position={[3, 0, 6]} intensity={16} color="#b9adff" decay={2} />

      <NesController variant={variant} activeRef={activeRef} />

      <AdaptiveDpr pixelated={false} />
    </Canvas>
  );
}
