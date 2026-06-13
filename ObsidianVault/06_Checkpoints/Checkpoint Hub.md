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
- **[[CHECKPOINT 22 - Super Bomberman Explosion Cross]]** — 2026-06-13
  - Completed the decorative blast with synchronized right and bottom continuation/end-cap pieces,
    producing the full nine-tile Bomberman cross outside the clipped preview card.
- **[[CHECKPOINT 21 - Super Bomberman Sprite Tuning]]** — 2026-06-13
  - Moved the mini-sequence beside the Gameplay Preview heading, reduced its sprites by 25%, changed
    bomb travel to a straight top-border slide, moved the blast outside the clipped media card, and
    switched the large left decoration to the source left-walk frames.
- **[[CHECKPOINT 20 - Super Bomberman Sprite Showcase]]** — 2026-06-13
  - Bomberman-only decorative composition: large Blue player and Chomper behind the content plus a
    10-second bomb placement, punch, corner-flight, explosion, and reset loop; reduced-motion and
    responsive fallbacks, demo input, Surfers Quest isolation, and production build verified.
- **[[CHECKPOINT 19 - Surfers Quest Background]]** — 2026-06-13
  - Final background-tuning pass: Frog moved farther left and rotated to `-30deg`; Melon pulled
    inward with responsive `150px / 70px / 55px` offsets; wall-grab orientation reversed while
    retaining preview-edge alignment, background layering, reduced motion, and demo input.
- **[[CHECKPOINT 18 - Surfers Quest Decoration Positioning]]** — 2026-06-13
  - Measured positioning pass: Frog moved into the left background, spawn cleared the heading,
    Cherry shifted right, wall grab aligned to the preview border, and Melon's transparent frame
    padding was cropped so the animated fruit is visible in the right-side space.
- **[[CHECKPOINT 17 - Surfers Quest Sprite Tuning]]** — 2026-06-13
  - Enlarged and rotated the Frog/Melon background decorations, clarified their layer order, added
    a native fall transition, mirrored wall grab, and split the route corner into platformer-like
    run → edge → fall → grab stages.
- **[[CHECKPOINT 16 - Surfers Quest Sprite Showcase]]** — 2026-06-13
  - Focused Surfers Quest-only decorative animation pass: real player run/wall-grab frames route
    around the Gameplay Preview, Cherry collision and exit reset loop, animated Frog/Melon side
    sprites, responsive hiding, reduced-motion fallback, and a green production build.
- **[[CHECKPOINT 15 - Extracted Bomberman]]** — 2026-06-13
  - Second playable in-browser demo: the **Bomberman-style game** (Game 0) extracted and compiled to
    **WebAssembly (Emscripten)** under `public/demos/bomberman/`, reusing the same **SFML 3 → SDL2
    shim** (only `sf::CircleShape` was added). Embedded on `/projects/bomberman-style-game` via a new
    reusable `PlayableDemo` component (full-size panel, page-level mute overlay, no inner-scroll trap,
    build-failed fallback). `bomberman.data` is only ~10 MB. IDBFS persists user maps + editor
    templates. Additive only — Surfers Quest demo, Arcade Machine 3D reveal, media and other pages
    untouched; `npm run build` green and browser-verified.

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
13. [[CHECKPOINT 13 - Basilisk and EOS Thumbnail Integration]] — 2026-06-12 — _Basilisk + EOS fully media-wired (logos, local MP4 previews, YouTube showcases); new reusable `YouTubeCarousel` (two-dot) + additive `showcaseVideos` schema field_
14. [[CHECKPOINT 14 - Extracted Surfers Quest]] — 2026-06-13 — _first playable in-browser demo: Surfers Quest extracted → WebAssembly (Emscripten) under `public/demos/surfers-quest/` via an SFML 3 → SDL2 shim (`sfml_shim/`); IDBFS map persistence; fixed negative-scale sprite flip + real animation folders + rate-limited footsteps; native arcade build untouched_
15. [[CHECKPOINT 15 - Extracted Bomberman]] — 2026-06-13 — _second playable demo: Bomberman (Game 0) → WebAssembly under `public/demos/bomberman/` reusing the SDL2 shim (added `sf::CircleShape`); ~10 MB bundle; new reusable `PlayableDemo` component (mute overlay, no inner-scroll, build-fail fallback) + IDBFS maps/templates; additive integration, build green & browser-verified_
16. [[CHECKPOINT 16 - Surfers Quest Sprite Showcase]] — 2026-06-13 — _Surfers Quest-only player route, Cherry pickup/exit loop, Frog and Melon frame animations, responsive hiding, reduced-motion fallback, build green_
17. [[CHECKPOINT 17 - Surfers Quest Sprite Tuning]] — 2026-06-13 — _4x Frog/Melon scale, intentional rotations and background layering, fall transition, mirrored wall grab, corrected corner and route landmarks_
18. [[CHECKPOINT 18 - Surfers Quest Decoration Positioning]] — 2026-06-13 — _Frog/background placement, title-safe spawn, right-shifted Cherry, edge-perfect wall grab, and cropped visible Melon_
19. [[CHECKPOINT 19 - Surfers Quest Background]] — 2026-06-13 — _Frog moved farther left and rotated to -30deg; Melon tucked inward with responsive offsets; wall-grab orientation reversed while preserving edge alignment and demo interaction_
20. [[CHECKPOINT 20 - Super Bomberman Sprite Showcase]] — 2026-06-13 — _Large Blue player/Chomper background sprites plus a bomb placement, punch, corner-flight, explosion, and reset loop isolated to the Bomberman-style project page_
21. [[CHECKPOINT 21 - Super Bomberman Sprite Tuning]] — 2026-06-13 — _Title-line sequence placement, 25% smaller sprites, straight top-border bomb slide, external top-right explosion, and left-walking large player_
22. [[CHECKPOINT 22 - Super Bomberman Explosion Cross]] — 2026-06-13 — _Completed the external nine-tile explosion with synchronized center, top, bottom, left, and right arms_

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
  two-state project status, media sources, `logo`, `showcaseVideo` / `showcaseVideos` (carousel),
  links, immersive settings, missing assets, and priority →
  [[Data Driven Project System]]. Written copy remains editable via `public/content/**.txt` with
  in-code fallbacks → [[Editable Text Content System]].
- **Hosting:** GitHub Pages, static, no backend → [[GitHub Pages Deployment]].
- **Website code:** Build green. Cursor.zip uses `/Cursor/Videos/cursor-short.mp4` with a poster,
  logo, and trailer; Hammer Moonbase uses `/Hammer/HammerMap.png` with an embedded flyby.
  **Basilisk Engine** and **EOS Dedicated Server** are now media-wired — local looping MP4 previews
  (`/Basilisk/Videos/basilisk-short.mp4`, `/EOS/Videos/eos-short.mp4`), header logos, and YouTube
  showcases (Basilisk single `EFVWiAf81z0`; EOS two-clip `YouTubeCarousel`). The Arcade Machine
  exploded-view reveal remains live on `/projects/arcade-machine`. Every project card displays
  either an amber IN PROGRESS badge or a green COMPLETED badge.
- **Surfers Quest presentation:** `SurfersQuestSpriteShowcase` adds a decorative player route,
  Cherry collision/exit loop, and Frog/Melon background sprites without changing the preview
  video, playable demo, data model, editable copy, or other project pages. Frog and Melon sit on
  decoration layer `0` beneath the content, use `pointer-events: none`, and retain responsive and
  reduced-motion fallbacks.
- **Bomberman presentation:** `SuperBombermanSpriteShowcase` adds large Blue player/Chomper
  background sprites and a bomb-punch-corner-explosion loop without changing the reusable
  `PlayableDemo`, existing media, project data, or other project pages. The tuned sequence runs
  beside the preview heading, slides linearly along the top border, and explodes outside the clipped
  card at the top-right corner using a complete center/top/bottom/left/right cross.
- **Playable demo capability:** `public/demos/{surfers-quest,bomberman}/` host real WebAssembly builds
  of two arcade games (Emscripten), via a shared SFML 3 → SDL2 shim (`sfml_shim/`) so the unmodified
  game code compiles; IDBFS persists user maps in-browser. Embedded on their project pages via the
  reusable `PlayableDemo` component (fixed-aspect iframe, page-level mute overlay, no inner-scroll).
  Surfers Quest's ~75 MB `.data` is the main hosting consideration; Bomberman is ~10 MB →
  [[CHECKPOINT 14 - Extracted Surfers Quest]] · [[CHECKPOINT 15 - Extracted Bomberman]].
- **Main blocker:** Remaining placeholder copy/media and manual export of genuine H.264 MP4
  previews. The files currently named `.mp4` still have ASF/WMV container signatures.

## Related
- [[_Checkpoint Template]] · [[Current Status]] · [[Next Actions]]
- [[Implementation Hub]] · [[Portfolio Website - Master Hub]]
