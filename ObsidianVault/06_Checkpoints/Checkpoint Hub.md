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
- **[[CHECKPOINT 9 - Arcade Chassis Animation]]** — 2026-06-11
  - **Arcade Machine 3D reveal finished & reference-matched, on its own page.** The reveal was
    **moved off the home page to `/projects/arcade-machine`** (full-width showcase gated on
    `revealType`; "3D MODEL COMING SOON" placeholder replaced; home keeps a card-only preview) and the
    page now **loads from the top** (`ScrollToTop` + manual scroll restoration). **Camera/orbit reversed**
    to a premium orientation (`START_MODEL_YAW` 130° — front faces right — → `END_MODEL_YAW` 70°, inverse
    ~60°). **Final exploded layout reworked to the Blender reference:** chassis tucked LEFT, marquee
    modestly up, **Screen slides pure sideways (`+Z`) clear of the chassis (clip fixed)**, Pi visible,
    Lid far right; **Button/Coin pulled straight forward + to the left edge** (no diagonal clip).
    **Landscape stage** (3:2 / 4:3), **420vh** staged scroll, dolly+pan tuned. **New tooltip edge-clamping**
    (`is-flip-x` / `is-flip-down`) so the far-right Lid callout stays inside the frame. Verified headlessly
    (`scripts/final-verify.mjs`: no clip / no hide / in-frame) **and in-browser** (the preview now renders
    the canvas). Build green; three.js still code-split. → [[Immersive 3D Direction]].

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

<!-- Add new checkpoints below in order, newest at the bottom. -->

## Current Project Baseline
> The stable reference point for the project as of the latest checkpoint.

- **Phase:** **Phase 2 (Premium 2D Redesign) complete; the 3D layer is live** — the flagship Arcade Machine has a finished scroll-driven exploded-view reveal on its project page. Next: content pass + extend the reveal pattern / Phase 3.
- **Mission:** 3D scrollable immersive portfolio (enhanced, not a game) → [[Immersive 3D Direction]].
- **Design source of truth:** [[Design System Brief]] reconciled with [[DESIGN]] "Dala" → **void-black + violet `#8052ff` accent + bone type + hairline glass + particle cosmos**; skill governance: [[Skill Assisted Design Plan]].
- **Type:** Space Grotesk (display) + Plus Jakarta Sans (body). **Design tooling:** 6 design/UX skills installed (`skills-lock.json`, `.agents/skills/`).
- **Governing rule:** the 3D layer *enhances* the site but is **never required** (progressive enhancement).
- **Source of truth:** `docs/PRD.md` + the Obsidian vault.
- **Stack:** Vite + React 18 + TypeScript; **R3F / Three / Drei now installed** for the 3D layer (lazy + code-split, isolated in `src/components/three/`); particles = vanilla canvas, reveals = IntersectionObserver → [[Technical Implementation Plan]].
- **Content model:** Data-driven projects (`src/data/projects.ts`) — category/tags/`featured`+`featuredPriority`/media `sources`/links/`immersive`/`missingAssets`/`priority` → [[Data Driven Project System]]. **Written copy is now editable via `public/content/**.txt`** (with in-code fallbacks) → [[Editable Text Content System]]. Asset plan: [[Portfolio Asset Requirements Table]].
- **Hosting:** GitHub Pages, static, no backend → [[GitHub Pages Deployment]].
- **Website code:** **Phase 2 redesign live + content pass underway; typecheck + build green.** Real hero portrait (`Profile.jpg`, layered + parallax) and real social links live; **Featured = data-driven 3×2 (6 projects)**; robust media layer (`ProjectMedia`/`VideoPreview`/`MediaPlaceholder`). `Cursor.zip` wired to its video; other projects use premium placeholders. **Arcade Machine 3D exploded-view reveal live on `/projects/arcade-machine`** (reversed orbit, reference-matched layout, edge-clamped tooltips, landscape stage; lazy + gated + fallback-backed).
- **Main blocker:** **Optimize `CursorGameplay.mp4`** (865 MB, non-faststart — can't deploy / slow desktop load) → [[cursor-video-deploy-blocker]]; plus James input — real written copy/media, motion intensity, which projects get a real 3D model → [[Missing Content Checklist]] / [[Open Questions]].

## Related
- [[_Checkpoint Template]] · [[Current Status]] · [[Next Actions]]
- [[Implementation Hub]] · [[Portfolio Website - Master Hub]]
