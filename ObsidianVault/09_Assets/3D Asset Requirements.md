# 3D Asset Requirements

> **Status:** In Progress — **first model delivered & wired** (Arcade Machine cabinet)
> **Last updated:** 2026-06-11
> Spec for any 3D model James provides for the immersive layer. Goal: cinematic models that stay
> **light, web-safe, and GitHub Pages-friendly**. Read with [[Immersive 3D Direction]] and
> [[Video Capture Requirements]].

---

## 1. Preferred Format — GLB / glTF 2.0

- **Deliver `.glb`** (binary glTF: geometry + textures + materials in one file). This is the only
  format the site loads directly (via Drei `useGLTF`).
- glTF 2.0 PBR materials (metallic-roughness). Avoid engine-specific materials/shaders.
- **Not accepted directly:** `.fbx`, `.blend`, `.obj`, `.max`, `.unity`, `.uasset`. These are fine as
  *source* files (keep them!), but must be **exported to GLB** before use. Blender's "glTF Binary
  (.glb)" exporter is the reference path.
- If you can only provide a source file, drop it in the staging area (below) and note it — converting
  to an optimized GLB is part of the implementation work, not a blocker for sending it.

---

## 2. Optimization Requirements (the budget)

The web is not a game engine. Treat these as targets, not absolutes — flag anything that can't hit them.

| Concern | Target | Notes |
|---|---|---|
| File size (per model) | **≤ 1–3 MB** compressed | Hard ceiling ~5 MB. Bigger = lazy-load only + warn. |
| Geometry | **≤ ~50–150k triangles** | Hero/featured props can go higher; background props lower. |
| Compression | **Draco** (geometry) and/or **meshopt** | Apply at export or via `gltf-transform` / `gltfpack`. |
| Textures | **≤ 1K–2K**, power-of-two, **KTX2/Basis** if possible | One material set where you can; atlas textures. |
| Texture maps | baseColor (+ normal, +ORM if needed) | Skip maps that don't read on a small web prop. |
| Draw calls / meshes | as few as possible | Merge meshes; fewer materials = fewer draw calls. |
| Animation | short, looping, optional | Keep rigs simple; bake where possible. |
| Up axis / scale | **Y-up, real-world metres, centred** | Model centred on origin so the `CameraRig` can frame it. |
| Cleanup | apply transforms, remove cameras/lights/hidden geo | Scene lighting comes from `SceneLights`, not the file. |

**Pipeline tools (implementation-side):** `gltf-transform optimize`, `gltfpack` (meshopt), Draco
compression, KTX2 texture conversion. Drei's `useGLTF` can use a Draco/meshopt decoder.

> Rule of thumb: **if a single model is heavier than the entire rest of the page, it's too heavy.**

---

## 3. Naming Conventions

- **Files:** lowercase, hyphenated, **matching the project `slug`** → `<slug>.glb`.
  - `arcade-machine.glb`, `basilisk-engine.glb`, `zombies-vr-headset.glb`.
  - Variants/extras: `<slug>--<variant>.glb` → `arcade-machine--lowpoly.glb`.
- **Textures (if external):** `<slug>--<map>.ktx2` → `arcade-machine--basecolor.ktx2`.
- **Source files (kept, not shipped):** `<slug>.<ext>` under the source/staging folder
  (`arcade-machine.blend`).
- Keep names **stable** — they are referenced from `projects.ts` (`media.model3d`). Renaming a
  shipped model means editing data.

---

## 4. Folder Locations

```text
public/
  models/                # shipped, web-ready GLBs (referenced as "/models/<slug>.glb")
    arcade-machine.glb
  models/draco/          # (optional) Draco/meshopt decoder if self-hosted

ObsidianVault/09_Assets/_staging/   # OR a repo-external folder:
  source-3d/             # raw .blend/.fbx/.obj source files (NOT shipped to the site)
```

- **Web-ready GLBs live in `public/models/`** → referenced from data as `/models/<slug>.glb` and they
  copy verbatim into the build (GitHub Pages-safe).
- **Raw/source files are never shipped.** Keep them outside `public/` (a `source-3d/` folder or
  external drive) so they don't bloat the deploy. Note their location here when supplied.
- Referenced in code via `Project.media.model3d` → [[Data Driven Project System]].

---

## 5. Which Projects MAY Use a 3D Model

Models are a premium accent — used where a recognisable object adds "wow", not everywhere.

| Project | 3D candidate? | Idea | Priority |
|---|---|---|---|
| [[Arcade Machine]] | ✅ **Yes — flagship** | Arcade cabinet GLB with a `VideoScreen` on the marquee/display | **1st** |
| [[Basilisk Engine]] | ✅ Maybe | Wireframe/viewport cube or stylised "editor viewport" prop | 2nd |
| [[Zombies VR]] | ✅ Maybe | VR headset GLB, optional floating controllers | 3rd |
| [[EOS Dedicated Server]] | ⚠ Abstract | Server-rack / network-node graph (could be procedural geometry, no GLB) | optional |
| [[Hammer Moonbase Map]] | ⚠ Maybe | Low-poly moonbase layout / blockout, or top-down map plane | optional |
| [[Surfers Quest]] | ❌ Video first | Gameplay clip on a screen | — |
| [[Bomberman Style Game]] | ❌ Video first | Gameplay clip on a screen (⚠ original assets only) | — |
| [[Cursor Zip]] | ❌ Video first | UI/screen capture on a panel | — |

> **Arcade Machine is the anchor.** James has confirmed 3D files exist for it — build the whole
> `ProjectModel` + `VideoScreen` pipeline around it first, then reuse for the rest.

---

## 6. Which Projects Use VIDEO Instead

Any project **without** a suitable model uses video/screenshots (the default path) — see
[[Video Capture Requirements]]. The immersive layer still showcases them via:
- `showcaseType: "video-screen"` — gameplay clip mapped onto an in-scene screen, **or**
- `showcaseType: "floating-card"` — glassy panel with the looping cover video, **or**
- `showcaseType: "placeholder"` — generated abstract prop until real media arrives.

A model is **never required**. The fallback chain is **model → video-screen → floating-card →
image → generated placeholder**.

---

## 7. Placeholder Strategy (no model yet)

Mirrors [[Placeholder Asset Rules]]: **never reference a missing `.glb`.**

- If `media.model3d` is unset, `ProjectModel` renders an **abstract procedural stand-in** — a
  lit primitive (rotating rounded cube / prism / low-poly shape) tinted to the project's accent,
  labelled with the project name. No file fetch, nothing 404s.
- `immersive.showcaseType: "placeholder"` forces this stand-in explicitly.
- The stand-in keeps the scene composition and camera framing identical, so dropping in the real GLB
  later is a one-line data change (`model3d: "/models/<slug>.glb"`).
- Track every "stand-in → real model" swap in [[Missing Content Checklist]].

---

## 8. DELIVERED — Arcade Machine cabinet (2026-06-11)

The flagship model is in the repo and drives the live scroll-reveal section (see
[[Immersive 3D Direction]] §9b).

- **Path:** `public/models/arcade-machine/PiecedTogether.glb` → served as
  `/models/arcade-machine/PiecedTogether.glb`. (Note: this is the **assembled** file under a
  per-project subfolder — it does **not** follow the `<slug>.glb` convention in §3/§4 yet; that's
  fine for the prototype. Renaming later = a one-line change to `immersive.model` in `projects.ts`.)
- **Size:** ~5 MB (at the §2 hard ceiling). **Not yet Draco/meshopt compressed** — a future pass should
  shrink it toward the ≤ 1–3 MB target. Acceptable for the first prototype; lazy-loaded + gated so it
  never blocks the page.
- **Contents:** one GLB containing **separate named parts**, assembled & aligned in Blender. Object
  names (typos preserved from Blender, matched case-insensitively in code with corrected aliases):
  `Chasis`, `Lid`, `Lable`, `Butttonpannel`, `Screem`, `Coinpannel`, `RaspberryPi`. **No baked
  animation** — the exploded-view motion is done in React Three Fiber.
- **Future refinements:** correct hinge pivots for the lid, distinct per-part materials and in-scene
  labels, Draco/meshopt compression, and (optionally) renaming to `arcade-machine.glb` per convention.

---

## What James Provides
- [x] `PiecedTogether.glb` (assembled cabinet) — **delivered & wired** (flagship). *Future: compress + refine pivots.*
- [ ] (Was) `arcade-machine.glb` web-ready single file — superseded by the assembled multi-part GLB above.
- [ ] (Optional) Basilisk Engine viewport prop / reference.
- [ ] (Optional) Zombies VR headset model / reference.
- [ ] For everything else: video instead → [[Video Capture Requirements]].

## Related
- [[Immersive 3D Direction]] · [[Video Capture Requirements]] · [[Data Driven Project System]]
- [[Asset Collection Checklist]] · [[Placeholder Asset Rules]] · [[Missing Content Checklist]]
