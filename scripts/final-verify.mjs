// Final end-to-end check: mirrors the EXACT constants/offsets/windows now in
// arcadeConfig.ts + ArcadeMachineModel.tsx and verifies framing + no-hide across
// the whole scroll (p = 0 → 1). Run: node scripts/final-verify.mjs
import { readFileSync } from "node:fs";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

globalThis.self = globalThis;
globalThis.createImageBitmap = async () => ({ width: 1, height: 1, close() {} });

const FILE = "public/models/arcade-machine/PiecedTogether.glb";
const FOV = 35;
const ASPECT = 1.33; // tighter (sub-1040 breakpoint) — the binding case for framing
const smooth = (t) => t * t * (3 - 2 * t);

// --- constants mirrored from ArcadeMachineModel.tsx (REVERSED orbit) ----------
const YAW_START = THREE.MathUtils.degToRad(130), // front faces RIGHT (mirror of old 50°)
  YAW_END = THREE.MathUtils.degToRad(70), //   explode toward the left (mirror of old 110°)
  PITCH_START = 0.05,
  PITCH_END = -0.05,
  DOLLY_NEAR_MULT = 1.4,
  DOLLY_FAR_MULT = 2.4,
  PAN_END = 0.42;

// --- offsets + windows mirrored from arcadeConfig.ts --------------------------
const PARTS = {
  chasis: { name: "Chasis", offset: [0, 0, -0.25], window: [0, 1] },
  lable: { name: "Lable", offset: [-0.05, 0.4, -0.25], window: [0.25, 0.7] },
  buttonpannel: { name: "Butttonpannel", offset: [-0.42, 0.22, -0.42], window: [0.28, 0.82] },
  coinpannel: { name: "Coinpannel", offset: [-0.52, -0.32, -0.38], window: [0.3, 0.88] },
  screem: { name: "Screem", offset: [0, 0.03, 0.6], window: [0.45, 0.9] },
  raspberrypi: { name: "RaspberryPi", offset: [0.05, -0.08, 1.0], window: [0.6, 1.0] },
  lid: { name: "Lid", offset: [0, 0.1, 1.45], window: [0.6, 1.0] },
};

const buf = readFileSync(FILE);
const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
new GLTFLoader().parse(ab, "", (gltf) => {
  const root = gltf.scene;
  const box = new THREE.Box3().setFromObject(root);
  const center = new THREE.Vector3();
  const dims = new THREE.Vector3();
  box.getCenter(center);
  box.getSize(dims);
  root.position.set(-center.x, -center.y, -center.z);
  const maxDim = Math.max(dims.x, dims.y, dims.z) || 1;

  const group = new THREE.Group();
  group.add(root);

  const objs = {};
  const base = {};
  for (const [k, cfg] of Object.entries(PARTS)) {
    let o = null;
    root.traverse((n) => {
      if (!o && n.name === cfg.name) o = n;
    });
    objs[k] = o;
    base[k] = o.position.clone();
  }

  const half = Math.sin((FOV * Math.PI) / 360);
  const radius = maxDim * 0.6;
  const near = (radius / half) * DOLLY_NEAR_MULT;
  const far = (radius / half) * DOLLY_FAR_MULT;
  const camY = dims.y * 0.05;
  const cam = new THREE.PerspectiveCamera(FOV, ASPECT, 0.1, far * 10);

  let worst = "ok";
  for (const p of [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]) {
    const eased = smooth(p);
    group.rotation.set(
      THREE.MathUtils.lerp(PITCH_START, PITCH_END, eased),
      THREE.MathUtils.lerp(YAW_START, YAW_END, eased),
      0,
    );
    for (const [k, cfg] of Object.entries(PARTS)) {
      const [ws, we] = cfg.window;
      const local = we > ws ? THREE.MathUtils.clamp((p - ws) / (we - ws), 0, 1) : p;
      const pe = smooth(local);
      objs[k].position.set(
        base[k].x + cfg.offset[0] * maxDim * pe,
        base[k].y + cfg.offset[1] * maxDim * pe,
        base[k].z + cfg.offset[2] * maxDim * pe,
      );
    }
    group.updateMatrixWorld(true);

    const panX = maxDim * PAN_END * eased;
    cam.position.set(panX, camY, THREE.MathUtils.lerp(near, far, eased));
    cam.lookAt(panX, 0, 0);
    cam.updateMatrixWorld(true);
    cam.updateProjectionMatrix();

    const rects = {};
    for (const k of Object.keys(PARTS)) {
      const b = new THREE.Box3().setFromObject(objs[k]);
      let mnX = 1e9,
        mnY = 1e9,
        mxX = -1e9,
        mxY = -1e9,
        mnZ = 1e9;
      for (let i = 0; i < 8; i++) {
        const v = new THREE.Vector3(
          i & 1 ? b.max.x : b.min.x,
          i & 2 ? b.max.y : b.min.y,
          i & 4 ? b.max.z : b.min.z,
        ).project(cam);
        mnX = Math.min(mnX, v.x);
        mxX = Math.max(mxX, v.x);
        mnY = Math.min(mnY, v.y);
        mxY = Math.max(mxY, v.y);
        mnZ = Math.min(mnZ, v.z);
      }
      // how far THIS part is through its own travel window (1 = fully separated)
      const [ws, we] = PARTS[k].window;
      const sep = we > ws ? THREE.MathUtils.clamp((p - ws) / (we - ws), 0, 1) : p;
      rects[k] = { mnX, mnY, mxX, mxY, z: mnZ, sep };
    }

    const oof = [];
    for (const [k, r] of Object.entries(rects))
      if (r.mnX < -0.99 || r.mxX > 0.99 || r.mnY < -0.99 || r.mxY > 0.99) oof.push(k);

    // Real hide = a part that is essentially at its final separated spot (sep>0.85)
    // yet still mostly covered by a NEARER part. Parts still nested inside the
    // assembled body (low sep) are expected and ignored.
    const keys = Object.keys(rects);
    const hidden = [];
    for (let i = 0; i < keys.length; i++)
      for (let j = i + 1; j < keys.length; j++) {
        const a = rects[keys[i]],
          b2 = rects[keys[j]];
        const ix = Math.max(0, Math.min(a.mxX, b2.mxX) - Math.max(a.mnX, b2.mnX));
        const iy = Math.max(0, Math.min(a.mxY, b2.mxY) - Math.max(a.mnY, b2.mnY));
        const inter = ix * iy;
        if (inter <= 0) continue;
        const farK = a.z > b2.z ? keys[i] : keys[j];
        if (farK === "chasis" || rects[farK].sep < 0.85) continue;
        const fr = rects[farK];
        const cov = inter / ((fr.mxX - fr.mnX) * (fr.mxY - fr.mnY));
        if (cov > 0.5) hidden.push(`${farK} ${(cov * 100) | 0}%`);
      }

    const flag = oof.length || hidden.length;
    if (flag) worst = "ISSUES";
    console.log(
      `p=${p.toFixed(1)}  ${flag ? "⚠ " : "ok "}` +
        `frame:${oof.length ? "OUT[" + oof.join(",") + "]" : "in"}  ` +
        `hide:${hidden.length ? hidden.join(",") : "none"}`,
    );
  }
  console.log(`\nRESULT: ${worst}`);
});
