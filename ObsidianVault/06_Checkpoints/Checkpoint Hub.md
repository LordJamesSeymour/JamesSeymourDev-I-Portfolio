# Checkpoint Hub

> **Status:** In Progress
> Index of all project checkpoints. A checkpoint is a dated snapshot of the project — what's
> done, what's pending, and the decisions made — that you can always look back on.

## How the Checkpoint System Works
- Run **`/checkpoint "checkpoint name"`** to create a new checkpoint note.
- Each checkpoint:
  - Gets a numbered filename: `CHECKPOINT N - Name.md`.
  - Records the date, project status, what changed, completed work, pending work, and decisions.
  - **Links back** to the previous checkpoint and is **listed here**.
  - Uses `[[wikilinks]]` so it appears in the Obsidian graph.
- New checkpoints are based on `[[_Checkpoint Template]]`.
- After creating one: update the **Latest Checkpoint** section below and, if needed,
  the **Current Project Baseline**.

## Latest Checkpoint
- **[[CHECKPOINT 12 - Label status]]** — 2026-06-12
  - All eight projects now use the two-state `in-progress` / `completed` model. Cards display
    amber IN PROGRESS or green COMPLETED pills; visible PLACEHOLDER status labels are removed.
    Existing media fallbacks, editable copy, routing, and the Arcade 3D reveal remain intact.
    Browser verification and the production build pass.

## Chronological List of Checkpoints
1. [[CHECKPOINT 1 - Vault Architecture Created]] — 2026-06-10 — _baseline: vault architecture created_
2. [[CHECKPOINT 2 - 3D Immersive Direction]] — 2026-06-10 — _pivot to immersive 3D; base scaffolded_
3. [[CHECKPOINT 3 - Skill Assisted Design Prep]] — 2026-06-10 — _design brief + skill plan ready_
4. [[CHECKPOINT 4 - Immersive 3D Direction and Skill Preparation Complete]] — 2026-06-10 — _planning & prep phase complete; ready for implementation_
5. [[CHECKPOINT 5 - Dala Style and Design Skills Added]] — 2026-06-10 — _design skills installed; "Dala" style staged; reconcile vs. brief_
6. [[CHECKPOINT 6 - Premium Dala Inspired 2D Redesign Complete]] — 2026-06-11 — _Phase 2 premium 2D redesign implemented; tokens wired; particles + reveals; asset table_
7. [[CHECKPOINT 7 - Video Integration]] — 2026-06-11 — _hero portrait + parallax + real social links; featured 3×2 (6, data-driven); robust video media system; editable .txt content system_
8. [[CHECKPOINT 8 - GLB Models Import]] — 2026-06-11 — _content polish (bio/tagline/Unreal/skills font) + first GLB import → scroll-driven exploded-view 3D reveal; R3F/Three/Drei added (lazy, gated, code-split)_
8b. [[CHECKPOINT 8 - GLB Models Implementation 1]] — 2026-06-11 — _first 3D correction pass: Lid rotation fixed (relative quaternions), zero-clip explode, scroll 360→210vh, hover-inspection callouts_
9. [[CHECKPOINT 9 - Arcade Chassis Animation]] — 2026-06-11 — _reveal moved to its project page; orbit reversed (front-right hero → inverse 60°); exploded layout matches the Blender ref (screen clip fixed); landscape stage + 420vh; tooltip edge-clamping; scroll-to-top_
10. [[CHECKPOINT 10 - Added media 1]] — 2026-06-12 — _Cursor + Hammer real media integrated; reusable logo/YouTube detail media; optimized Cursor preview; next raw media batch collected_
11. [[CHECKPOINT 11 - Logos and Thumbnails 2]] — 2026-06-12 — _three project logos + exact thumbnail paths wired; native looping verified; ASF/WMV container blocker documented_
12. [[CHECKPOINT 12 - Label status]] — 2026-06-12 — _project statuses normalized to IN PROGRESS and COMPLETED; amber/green card pills verified_

<!-- Add new checkpoints below in order, newest at the bottom. -->

## Current Project Baseline
> The stable reference point for the project as of the latest checkpoint.

- **Phase:** **Phase 2 complete; 3D flagship live; focused content/media pass underway.** Four local
  video paths and four project logos are data-driven. Next: manually export genuine H.264 MP4
  containers over the wired preview paths.
- **Mission:** 3D scrollable immersive portfolio (enhanced, not a game) → [[Immersive 3D Direction]].
- **Design source of truth:** [[Design System Brief]] reconciled with [[DESIGN]] "Dala" → **void-black + violet `#8052ff` accent + bone type + hairline glass + particle cosmos**; skill governance: [[Skill Assisted Design Plan]].
- **Type:** Space Grotesk (display) + Plus Jakarta Sans (body). **Design tooling:** 6 design/UX skills installed (`skills-lock.json`, `.agents/skills/`).
- **Governing rule:** the 3D layer *enhances* the site but is **never required** (progressive enhancement).
- **Source of truth:** `docs/PRD.md` + the Obsidian vault.
- **Stack:** Vite + React 18 + TypeScript; **R3F / Three / Drei now installed** for the 3D layer (lazy + code-split, isolated in `src/components/three/`); particles = vanilla canvas, reveals = IntersectionObserver → [[Technical Implementation Plan]].
- **Content model:** Data-driven projects (`src/data/projects.ts`) — category/tags/featured ordering,
  two-state project status, media sources, `logo`, `showcaseVideo`, links, immersive settings,
  missing assets, and priority →
  [[Data Driven Project System]]. Written copy remains editable via `public/content/**.txt` with
  in-code fallbacks → [[Editable Text Content System]].
- **Hosting:** GitHub Pages, static, no backend → [[GitHub Pages Deployment]].
- **Website code:** Build green. Cursor.zip uses `/Cursor/Videos/cursor-short.mp4` with a poster,
  logo, and trailer; Hammer Moonbase uses `/Hammer/HammerMap.png` with an embedded flyby. The
  Arcade Machine exploded-view reveal remains live on `/projects/arcade-machine`. Every project
  card displays either an amber IN PROGRESS badge or a green COMPLETED badge.
- **Main blocker:** Remaining placeholder copy/media and manual export of genuine H.264 MP4
  previews. The files currently named `.mp4` still have ASF/WMV container signatures.

## Related
- [[_Checkpoint Template]] · [[Current Status]] · [[Next Actions]]
- [[Implementation Hub]] · [[Portfolio Website - Master Hub]]
