// Headless GLB inspector — confirms part names + measures each part's base
// transform/size so the exploded offsets can be computed from the REAL Blender
// alignment (not guessed). Run: node scripts/inspect-glb.mjs
import { readFileSync } from "node:fs";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// --- minimal DOM shims so GLTFLoader.parse() doesn't choke on textures in Node.
globalThis.self = globalThis;
globalThis.createImageBitmap = async () => ({ width: 1, height: 1, close() {} });

const FILE =
  "public/models/arcade-machine/PiecedTogether.glb";

const buf = readFileSync(FILE);
const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);

const loader = new GLTFLoader();
loader.parse(
  ab,
  "",
  (gltf) => {
    const root = gltf.scene;

    // Recenter exactly like ArcadeMachineModel does.
    const box = new THREE.Box3().setFromObject(root);
    const center = new THREE.Vector3();
    const dims = new THREE.Vector3();
    box.getCenter(center);
    box.getSize(dims);
    root.position.set(-center.x, -center.y, -center.z);
    root.updateMatrixWorld(true);
    const maxDim = Math.max(dims.x, dims.y, dims.z) || 1;

    console.log("=== MODEL ===");
    console.log("dims:", fmt(dims), "maxDim:", maxDim.toFixed(4));
    console.log("");

    console.log("=== ALL NAMED OBJECTS ===");
    root.traverse((o) => {
      if (o.name) console.log(`  ${o.type.padEnd(10)} "${o.name}"`);
    });
    console.log("");

    // The configured part names (first match candidate = real GLB name).
    const PARTS = {
      chasis: ["Chasis", "Chassis"],
      lid: ["Lid"],
      lable: ["Lable", "Label", "Marquee"],
      screem: ["Screem", "Screen"],
      buttonpannel: ["Butttonpannel", "Buttonpannel", "Button"],
      coinpannel: ["Coinpannel", "Coin"],
      raspberrypi: ["RaspberryPi", "Raspberry", "Pi"],
    };

    const find = (cands) => {
      for (const c of cands) {
        let hit = null;
        root.traverse((o) => {
          if (!hit && o.name === c) hit = o;
        });
        if (hit) return hit;
        const needle = c.toLowerCase();
        root.traverse((o) => {
          if (!hit && o.name && o.name.toLowerCase().includes(needle)) hit = o;
        });
        if (hit) return hit;
      }
      return null;
    };

    console.log("=== PART BASE TRANSFORMS (model-local, recentered) ===");
    const out = {};
    for (const [key, cands] of Object.entries(PARTS)) {
      const obj = find(cands);
      if (!obj) {
        console.log(`  ${key.padEnd(13)} NOT FOUND (${cands.join(", ")})`);
        continue;
      }
      const b = new THREE.Box3().setFromObject(obj);
      const c = new THREE.Vector3();
      const s = new THREE.Vector3();
      b.getCenter(c);
      b.getSize(s);
      out[key] = {
        name: obj.name,
        center: c.toArray(),
        size: s.toArray(),
        // center as a FRACTION of maxDim (units the offsets use)
        centerFrac: c.clone().multiplyScalar(1 / maxDim).toArray(),
        sizeFrac: s.clone().multiplyScalar(1 / maxDim).toArray(),
      };
      console.log(
        `  ${key.padEnd(13)} "${obj.name}"\n` +
          `      center ${fmt(c)}  (frac ${fmtA(out[key].centerFrac)})\n` +
          `      size   ${fmt(s)}  (frac ${fmtA(out[key].sizeFrac)})`,
      );
    }

    console.log("\n=== JSON (for offset math) ===");
    console.log(JSON.stringify({ maxDim, parts: out }, null, 0));
  },
  (err) => {
    console.error("PARSE ERROR:", err);
    process.exit(1);
  },
);

function fmt(v) {
  return `[${v.x.toFixed(3)}, ${v.y.toFixed(3)}, ${v.z.toFixed(3)}]`;
}
function fmtA(a) {
  return `[${a.map((n) => n.toFixed(3)).join(", ")}]`;
}
