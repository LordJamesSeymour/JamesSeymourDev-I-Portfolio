import * as THREE from "three";

/**
 * Three.js-side config for the Arcade Machine reveal: the part/offset table and a
 * name-matching helper. Three-free copy (URL, callouts) lives in arcadeContent.ts,
 * so importing THIS module is what pulls in three — only the lazy scene does that.
 */

/**
 * Per-part explode config.
 * ---------------------------------------------------------------------------
 * `match` lists candidate object names tried (in order) against the GLB tree —
 * case-insensitive substring. The FIRST entry is the ACTUAL Blender object name
 * as it currently exists in PiecedTogether.glb (verified by traversal), including
 * its typos ("Butttonpannel", "Screem"); the later entries are corrected spellings
 * so the code keeps working if the model is re-exported with the typos fixed.
 *
 * `offset` is a direction in the model's local space, as a FRACTION of the model's
 * largest dimension (so it scales with whatever units the GLB uses). Three.js axes:
 * +Y up, +Z toward the camera (front of the cabinet), +X to the side. Multiplied by
 * eased scroll progress (0 assembled → 1 exploded). These are deliberate, readable
 * approximations — correct assembled positions matter more than exact mechanics.
 */
export interface PartConfig {
  /** Candidate names; first is the real (typo'd) GLB name, rest are aliases. */
  match: string[];
  /** Explode direction × distance, as a fraction of the model's max dimension.
   *  Applied in GROUP space (parent of every part, before the presentation yaw),
   *  using the cabinet's REAL measured axes (verified headlessly from the GLB):
   *    −X = FRONT (screen, button deck, coin panel — the player side)
   *    +X = interior / back-right (where the Pi lives)
   *    +Y = top (marquee)        −Y = floor
   *    +Z = the Lid SIDE panel    −Z = opposite side
   *  Added to each part's ORIGINAL position, scaled by eased scroll progress. */
  offset: [number, number, number];
  /** Scroll window [start, end] (0→1) over which THIS part travels from assembled
   *  to its exploded offset. Staggering the windows is what makes the reveal feel
   *  staged and un-stiff: the marquee/controls loosen first, the screen next, then
   *  the Pi, and finally the Lid settles at the very end. */
  window: [number, number];
  /** Optional explode tilt, as an Euler delta (radians) applied RELATIVE to the
   *  part's original baked GLB orientation, in group space, scaled by progress. */
  spin?: [number, number, number];
  /** Human label shown in the hover callout. */
  label: string;
  /** Descriptive copy for the hover callout. */
  tip: string;
}

/**
 * Exploded-view layout — a deliberate "product breakdown" that mirrors the Blender
 * reference. Offsets + screen-space framing were verified headlessly against the real
 * GLB (scripts/sim-mirror.mjs + final-verify.mjs) so nothing clips, hides behind the
 * body, or leaves the frame across the whole scroll (end camera at yaw 70°, landscape
 * stage). Final composition reads left → right like the reference:
 *
 *   Coin panel ─ lower-left  (coinpannel  → straight forward −X, −Y; no Z drift)
 *   Button deck ─ mid-left   (buttonpannel → straight forward −X, +Y; no Z drift)
 *   Chassis ─ left-of-centre anchor                 (chassis → fixed; pan puts it left)
 *   Marquee ─ above the chassis, modestly up        (lable  → +Y, small)
 *   Screen  ─ centre, separated + up                (screem → +Z right, +Y)
 *   Raspberry Pi ─ centre-right, internal reveal    (raspberryPi → +Z)
 *   Lid ─ far right, the side panel, farthest        (lid    → +Z, largest)
 *
 * KEY GEOMETRY:
 *  • Chassis (+ marquee) tuck LEFT (−Z) so the body anchors the left third and leaves
 *    the right open for screen/Pi/Lid (the camera also pans right to help).
 *  • Button + Coin pull forward off the front (−X) AND toward the left edge (−Z) — a
 *    straight outward pull that never cuts diagonally through the chassis (they clear
 *    it in X long before the −Z slide), ending near the lower/mid-LEFT.
 *  • Screen slides PURE sideways (+Z, ~no Y) so it leaves the cabinet cleanly to the
 *    RIGHT without clipping the chassis or floating diagonally up; verified 3D-clear
 *    of the chassis in scripts/sim-position.mjs.
 *  • Pi then Lid fan further +Z; at the END yaw (70°, <90°) +Z maps toward camera-right,
 *    so screen/Pi/Lid stay visible (none hidden), in that left→right order.
 */
export const ARCADE_PARTS: Record<string, PartConfig> = {
  // Body tucks toward the LEFT border (−Z) to anchor the diagram and free up the right.
  chassis: {
    match: ["Chassis", "Chasis"],
    offset: [0, 0, -0.25],
    window: [0, 1],
    label: "Chassis",
    tip: "A custom chassis designed in Tinkercad and 3D-printed in tough PLA. Its hollow interior houses the electronics that power the arcade machine.",
  },
  // Marquee / sign rises modestly (FIX 4) and tracks the chassis left so it sits above it.
  lable: {
    match: ["Lable", "Label", "Marquee"],
    offset: [-0.05, 0.4, -0.25],
    window: [0.25, 0.7],
    label: "Marquee",
    tip: "A decorative marquee that gives the machine a distinctive identity and completes its arcade cabinet styling.",
  },
  // Button deck pulled forward off the front (−X) toward the LEFT edge (−Z), up a touch
  // → upper-left. Clears the chassis in X before sliding, so no diagonal clip.
  buttonpannel: {
    match: ["Butttonpannel", "Buttonpannel", "ButtonPanel", "Button"],
    offset: [-0.42, 0.22, -0.42],
    window: [0.28, 0.82],
    label: "Button Panel",
    tip: "A decorative control panel that frames the buttons and completes the machine’s arcade-inspired appearance.",
  },
  // Coin panel pulled forward (−X) toward the LEFT edge (−Z) + lower → lower-left,
  // clear of and below the button deck.
  coinpannel: {
    match: ["Coinpannel", "CoinPanel", "Coin"],
    offset: [-0.52, -0.32, -0.38],
    window: [0.3, 0.88],
    label: "Coin Panel",
    tip: "A decorative coin panel that reinforces the machine’s classic arcade aesthetic.",
  },
  // Screen slides PURE sideways out the +Z side (≈no Y) → finishes to the RIGHT of the
  // chassis, upright, fully clear of it (no clip, no diagonal-up).
  screem: {
    match: ["Screem", "Screen"],
    offset: [0, 0.03, 0.6],
    window: [0.45, 0.9],
    label: "Screen",
    tip: "A 7-inch Elecrow display selected for its compatibility with the Raspberry Pi 5 and its suitability for the console’s required dimensions.",
  },
  // The Pi pulls further +Z, just below the line, kept clear to the right of the screen.
  raspberryPi: {
    match: ["Raspberry Pi", "RaspberryPi", "Raspberry", "Pi"],
    offset: [0.05, -0.08, 1.0],
    window: [0.6, 1.0],
    label: "Raspberry Pi",
    tip: "A Raspberry Pi 5 kit running Linux and providing the computing hardware required to run the games and operate the machine.",
  },
  // Lid is the +Z side panel — lifts straight off its thin axis to the FAR right,
  // the last and farthest piece, settling right at the end of the scroll.
  lid: {
    match: ["Lid"],
    offset: [0, 0.1, 1.45],
    window: [0.6, 1.0],
    label: "Lid",
    tip: "A removable enclosure that conceals and protects the cables, connections and accessories stored inside the machine.",
  },
};

/** Find the first object in `root` whose name matches any candidate (case-insensitive). */
export function findPart(root: THREE.Object3D, candidates: string[]): THREE.Object3D | null {
  for (const cand of candidates) {
    // Exact name first.
    let hit: THREE.Object3D | null = null;
    root.traverse((o) => {
      if (!hit && o.name === cand) hit = o;
    });
    if (hit) return hit;
    // Then case-insensitive substring.
    const needle = cand.toLowerCase();
    root.traverse((o) => {
      if (!hit && o.name && o.name.toLowerCase().includes(needle)) hit = o;
    });
    if (hit) return hit;
  }
  return null;
}
