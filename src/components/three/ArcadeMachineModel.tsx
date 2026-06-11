import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { MutableRefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import type { ThreeEvent } from "@react-three/fiber";
import { useGLTF, ContactShadows, Html } from "@react-three/drei";
import * as THREE from "three";
import { ARCADE_PARTS, findPart } from "./arcadeConfig";
import { MODEL_URL } from "./arcadeContent";

interface ArcadeMachineModelProps {
  /** 0 (assembled) → 1 (exploded). Read every frame; never triggers React renders. */
  progressRef: MutableRefObject<number>;
  /** When false, the model skips per-frame work (section is off-screen). */
  activeRef: MutableRefObject<boolean>;
  /** Reduced motion / static mode: hold assembled, no idle drift. */
  reduced: boolean;
}

/** A cloned material plus the original emissive so hover-glow can be reverted. */
interface MatRef {
  mat: THREE.MeshStandardMaterial;
  emissive: THREE.Color;
  intensity: number;
}

interface AnimatedPart {
  key: string;
  obj: THREE.Object3D;
  /** Original position/orientation captured straight from the loaded GLB. */
  base: THREE.Vector3;
  baseQuat: THREE.Quaternion;
  /** Final explode translation (group space), reached at the end of `window`. */
  offset: THREE.Vector3;
  /** Scroll window [start, end] over which this part travels (staged reveal). */
  window: [number, number];
  /** Final explode tilt as a delta quaternion (group space), or null. */
  spinQuat: THREE.Quaternion | null;
  label: string;
  tip: string;
  mats: MatRef[];
}

/** smoothstep — soft ease in/out for a premium, non-linear feel. */
const smooth = (t: number) => t * t * (3 - 2 * t);

/** On-brand violet used for the hover emissive glow. */
const EMPHASIS = new THREE.Color(0x4a2fae);

// --- Presentation tuning (framing verified in scripts/sim-mirror.mjs + final-verify) --
// Whole-group orbit (the ROOT model rotation), authored in degrees for easy tuning.
// START ≈ 130° = assembled 3/4 hero with the cabinet FRONT facing RIGHT (screen +
// controls + "Retro Pi" marquee visible), matching the reference photo. END ≈ 70° is
// the inverse-direction ~60° turn into the exploded diagram (front squares up to the
// camera; parts fan out — controls to the lower-left, screen/Pi/Lid to the right).
const START_MODEL_YAW = THREE.MathUtils.degToRad(130);
const END_MODEL_YAW = THREE.MathUtils.degToRad(70);
const START_MODEL_PITCH = 0.05;
const END_MODEL_PITCH = -0.05;
// Camera dolly distance (× the framing radius): tight assembled → pulled back so the
// full exploded layout frames. PAN_END pans the camera right (× maxDim) as it explodes,
// shifting the chassis toward the left border so the parts have room to the right.
const DOLLY_NEAR_MULT = 1.4;
const DOLLY_FAR_MULT = 2.4;
const PAN_END = 0.42;

// Reused scratch objects so per-frame / per-hover work allocates nothing.
const _box = new THREE.Box3();
const _vec = new THREE.Vector3();
const _ndc = new THREE.Vector3();
const _delta = new THREE.Quaternion();
const _ident = new THREE.Quaternion();

// Tooltip edge thresholds (normalised device coords, −1…1). Past these the callout
// box flips to the opposite side so it always stays inside the canvas frame.
const TIP_FLIP_X = 0.3; // anchor this far right → box goes LEFT
const TIP_FLIP_DOWN = 0.4; // anchor this high → box drops BELOW the anchor

/** Toggle the subtle emissive highlight on every material of a part. */
function emphasize(part: AnimatedPart, on: boolean) {
  for (const r of part.mats) {
    if (on) {
      r.mat.emissive.copy(EMPHASIS);
      r.mat.emissiveIntensity = 0.9;
    } else {
      r.mat.emissive.copy(r.emissive);
      r.mat.emissiveIntensity = r.intensity;
    }
  }
}

export default function ArcadeMachineModel({
  progressRef,
  activeRef,
  reduced,
}: ArcadeMachineModelProps) {
  const { scene } = useGLTF(MODEL_URL);
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const tipRef = useRef<THREE.Group>(null);
  const tipElRef = useRef<HTMLDivElement>(null);
  const curProgress = useRef(0);

  // Which part the pointer is over. `hovered` (the key) drives the callout's
  // React render; the refs let the per-frame loop read it without re-subscribing.
  const [hovered, setHovered] = useState<string | null>(null);
  const hoveredRef = useRef<AnimatedPart | null>(null);
  const hoveredKeyRef = useRef<string | null>(null);
  const tipPos = useRef<[number, number, number]>([0, 0, 0]);

  // Clone + measure + recenter ONCE per loaded scene. Cloning keeps the cached
  // gltf pristine (safe across HMR / remounts). We also clone every material so a
  // hover glow on one part can't bleed into another (clone(true) shares materials).
  const { model, parts, objToPart, size } = useMemo(() => {
    const cloned = scene.clone(true);

    const box = new THREE.Box3().setFromObject(cloned);
    const center = new THREE.Vector3();
    const dims = new THREE.Vector3();
    box.getCenter(center);
    box.getSize(dims);
    // Recenter so the model's centre sits at the origin → clean rotation pivot.
    cloned.position.set(-center.x, -center.y, -center.z);

    const maxDim = Math.max(dims.x, dims.y, dims.z) || 1;

    const collected: AnimatedPart[] = [];
    const map = new Map<THREE.Object3D, AnimatedPart>();
    const missing: string[] = [];

    for (const [key, cfg] of Object.entries(ARCADE_PARTS)) {
      const obj = findPart(cloned, cfg.match);
      if (!obj) {
        missing.push(`${key} (${cfg.match[0]})`);
        continue;
      }

      const mats: MatRef[] = [];
      obj.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (!mesh.isMesh) return;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        const cloneMat = (m: THREE.Material) => {
          const c = m.clone() as THREE.MeshStandardMaterial;
          if (c.emissive instanceof THREE.Color) {
            mats.push({ mat: c, emissive: c.emissive.clone(), intensity: c.emissiveIntensity ?? 1 });
          }
          return c;
        };
        mesh.material = Array.isArray(mesh.material)
          ? mesh.material.map(cloneMat)
          : cloneMat(mesh.material);
      });

      const part: AnimatedPart = {
        key,
        obj,
        base: obj.position.clone(),
        baseQuat: obj.quaternion.clone(),
        offset: new THREE.Vector3(cfg.offset[0], cfg.offset[1], cfg.offset[2]).multiplyScalar(maxDim),
        window: cfg.window,
        spinQuat: cfg.spin
          ? new THREE.Quaternion().setFromEuler(new THREE.Euler(cfg.spin[0], cfg.spin[1], cfg.spin[2]))
          : null,
        label: cfg.label,
        tip: cfg.tip,
        mats,
      };
      collected.push(part);
      map.set(obj, part);
    }

    if (import.meta.env.DEV && missing.length) {
      console.warn(`[ArcadeMachineModel] parts not found in GLB: ${missing.join(", ")}`);
    }

    return { model: cloned, parts: collected, objToPart: map, size: { max: maxDim, y: dims.y } };
  }, [scene]);

  // Assembled + exploded camera distances, so the view dollies back as the model
  // spreads (keeps the hero shot tight, yet frames the full exploded layout).
  const dolly = useRef({ near: 8, far: 12, y: 0, pan: 0 });
  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    const radius = size.max * 0.6;
    const half = Math.sin((cam.fov * Math.PI) / 360) || 0.3;
    const near = (radius / half) * DOLLY_NEAR_MULT; // assembled — tight hero framing
    const far = (radius / half) * DOLLY_FAR_MULT; // exploded — pulled back for the full fan
    const y = size.y * 0.05;
    const pan = size.max * PAN_END; // camera pans right as it explodes to re-centre the fan
    dolly.current = { near, far, y, pan };
    cam.position.set(0, y, near);
    cam.near = Math.max(0.01, near - radius * 2.5);
    cam.far = far + radius * 6;
    cam.lookAt(0, 0, 0);
    cam.updateProjectionMatrix();
  }, [camera, size]);

  // Resolve a raycast hit (a leaf mesh) up to the named part it belongs to.
  const resolve = useCallback(
    (o: THREE.Object3D | null): AnimatedPart | null => {
      let cur: THREE.Object3D | null = o;
      while (cur) {
        const p = objToPart.get(cur);
        if (p) return p;
        cur = cur.parent;
      }
      return null;
    },
    [objToPart],
  );

  const setHover = useCallback(
    (part: AnimatedPart | null) => {
      const key = part?.key ?? null;
      if (key === hoveredKeyRef.current) return;
      if (hoveredRef.current) emphasize(hoveredRef.current, false);
      hoveredRef.current = part;
      hoveredKeyRef.current = key;
      if (part) {
        emphasize(part, true);
        // Seed the callout anchor at the part's current world centre so it doesn't
        // flash at screen-centre for a frame before useFrame takes over.
        part.obj.updateWorldMatrix(true, true);
        _box.setFromObject(part.obj).getCenter(_vec);
        tipPos.current = [_vec.x, _vec.y, _vec.z];
      }
      document.body.style.cursor = part ? "pointer" : "";
      setHovered(key);
    },
    [],
  );

  const onMove = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      setHover(resolve(e.object));
    },
    [resolve, setHover],
  );
  const onOut = useCallback(() => setHover(null), [setHover]);

  // Reset the cursor if we unmount mid-hover.
  useEffect(() => () => {
    document.body.style.cursor = "";
  }, []);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;
    if (!activeRef.current) return; // off-screen → don't burn cycles

    const target = reduced ? 0 : THREE.MathUtils.clamp(progressRef.current, 0, 1);
    // Frame-rate-independent glide toward the scroll target (softened a touch so the
    // motion reads as smooth, not stiff — the longer track does most of the work).
    const k = 1 - Math.pow(0.0022, Math.min(delta, 0.05));
    curProgress.current += (target - curProgress.current) * k;
    const p = curProgress.current;
    const eased = smooth(p);

    // Whole-group orbit: assembled 3/4 hero (front facing right) → ~60° the INVERSE
    // way into the exploded technical view. Gradual across the whole scroll (global eased).
    const yaw = THREE.MathUtils.lerp(START_MODEL_YAW, END_MODEL_YAW, eased);
    const pitch = THREE.MathUtils.lerp(START_MODEL_PITCH, END_MODEL_PITCH, eased);
    // Idle drift that fades out as the user scrolls in (off under reduced motion).
    const idle = reduced ? 0 : Math.sin(state.clock.elapsedTime * 0.4) * 0.04 * (1 - p);
    group.rotation.set(pitch, yaw + idle, 0);

    // Dolly back + pan right as the model explodes so the wider fan stays framed + centred.
    const cam = camera as THREE.PerspectiveCamera;
    const panX = dolly.current.pan * eased;
    cam.position.set(
      panX,
      dolly.current.y,
      THREE.MathUtils.lerp(dolly.current.near, dolly.current.far, eased),
    );
    cam.lookAt(panX, 0, 0);

    // Per-part STAGED explode: each part eases over its own scroll window, so the
    // breakdown unfolds in sequence (marquee/controls → screen → Pi → Lid) instead of
    // all parts moving in lockstep. Position is base + offset·(windowed eased); at
    // progress 0 every part holds its exact Blender pose.
    for (const part of parts) {
      const [ws, we] = part.window;
      const local = we > ws ? THREE.MathUtils.clamp((p - ws) / (we - ws), 0, 1) : p;
      const pe = smooth(local);
      part.obj.position.set(
        part.base.x + part.offset.x * pe,
        part.base.y + part.offset.y * pe,
        part.base.z + part.offset.z * pe,
      );
      if (part.spinQuat) {
        _delta.copy(_ident).slerp(part.spinQuat, pe);
        part.obj.quaternion.copy(part.baseQuat).premultiply(_delta);
      }
    }

    // Keep the hover callout anchored to the live world centre of the hovered part.
    const hp = hoveredRef.current;
    const tip = tipRef.current;
    if (hp && tip) {
      hp.obj.updateWorldMatrix(true, true);
      _box.setFromObject(hp.obj).getCenter(_vec);
      tip.position.copy(_vec);

      // Collision-aware placement: project the anchor to the canvas and flip the box
      // toward the centre when it nears the right/top edge, so it never gets clipped
      // by the panel border (e.g. the far-right Lid). Direct class toggle = no rerender.
      const el = tipElRef.current;
      if (el) {
        _ndc.copy(_vec).project(camera);
        el.classList.toggle("is-flip-x", _ndc.x > TIP_FLIP_X);
        el.classList.toggle("is-flip-down", _ndc.y > TIP_FLIP_DOWN);
      }
    }
  });

  const hoveredPart = hovered ? parts.find((pt) => pt.key === hovered) ?? null : null;

  return (
    <>
      <group ref={groupRef} onPointerMove={onMove} onPointerOut={onOut} onPointerDown={onMove}>
        <primitive object={model} />
      </group>

      {hoveredPart && (
        <group ref={tipRef} position={tipPos.current}>
          <Html
            wrapperClass="amx-tip-wrap"
            style={{ pointerEvents: "none" }}
            zIndexRange={[30, 0]}
          >
            <div className="amx-tip" ref={tipElRef}>
              <svg className="amx-tip__line" width="1" height="1" aria-hidden="true">
                <line x1="0" y1="0" x2="76" y2="-64" />
                <circle className="amx-tip__dot" cx="0" cy="0" r="4" />
              </svg>
              <div className="amx-tip__box">
                <span className="amx-tip__name">{hoveredPart.label}</span>
                <span className="amx-tip__desc">{hoveredPart.tip}</span>
              </div>
            </div>
          </Html>
        </group>
      )}

      {/* Soft contact shadow grounds the cabinet; sits just under its base and
          does NOT rotate with the model. */}
      <ContactShadows
        position={[0, -size.y / 2 + size.max * 0.002, 0]}
        opacity={0.45}
        scale={size.max * 1.6}
        blur={2.8}
        far={size.max}
        resolution={1024}
        color="#000000"
      />
    </>
  );
}

// Hint the loader so the GLB can start fetching as soon as this module is imported
// (the module itself is only loaded lazily, when the section nears the viewport).
useGLTF.preload(MODEL_URL);
