# Current Status

> **Status:** In Progress
> Living snapshot of where the project is right now. Update at each [[Checkpoint Hub|checkpoint]].

## Phase
**Phase 2 (Premium 2D Visual Redesign) — COMPLETE.** The flagship 3D reveal is live and the focused
content/media pass is underway.
Mission: **3D scrollable immersive portfolio** → [[Immersive 3D Direction]].
Design source of truth: [[Design System Brief]] reconciled with [[DESIGN]] "Dala" → **void-black + violet accent + bone type + particle cosmos** · governance: [[Skill Assisted Design Plan]].

## What's Done
- [x] Obsidian vault + project-management architecture created.
- [x] Source-of-truth PRD (`docs/PRD.md`) pivoted to the immersive direction → [[PRD Summary]].
- [x] **Base website scaffolded & type-checks clean** (`npm run typecheck` → 0 errors): Vite + React 18
      + TS + React Router; data-driven `projects.ts` (8 placeholders) + helpers; `profile.ts`;
      layout/home/projects/ui components; `ProjectMedia`; SVG placeholders; dark tokens + BEM-ish CSS.
      *(Original Milestones 1–3 effectively done.)*
- [x] 3D direction planning pass (PRD, [[Technical Implementation Plan]], [[Immersive 3D Direction]],
      [[Data Driven Project System]], [[3D Asset Requirements]], [[Video Capture Requirements]], etc.).
- [x] **Skill-assisted design prep:** [[Design System Brief]] + [[Skill Assisted Design Plan]] created;
      [[UI Style Guide]] filled in; [[Implementation Hub]] refreshed; cross-links wired.
- [x] **Design skills installed** (6 → `skills-lock.json`, `.agents/skills/`) + **"Dala" style extracted** to
      tokens (`src/styles/tokens.json`, `src/styles/variables.css`, `DESIGN.md` / [[DESIGN]]).
- [x] First real media added → `public/CursorGameplay.mp4`, `public/Profile.jpg`.
- [x] **Dala ↔ brief reconciled** and tokens wired (`src/styles/tokens.css` + `globals.css`) → void-black + violet.
- [x] **Phase 2 — Premium 2D Visual Redesign implemented** (typecheck + build green; verified in-browser):
      cinematic hero, double-bezel project panels, category-grouped Projects page, `ParticleField`
      cosmos + `Reveal` scroll animation (reduced-motion safe), restyled nav/buttons/tags/footer/detail.
      **No new packages.** → [[CHECKPOINT 6 - Premium Dala Inspired 2D Redesign Complete]].
- [x] **Schema extended for future media/3D** (`thumbnail`/`screenshots`/`immersive`/`missingAssets`/`priority`)
      + premium placeholders + dev-only "Needs:" notes; `Cursor.zip` plays a real video → [[Data Driven Project System]].
- [x] **Asset plan created** → [[Portfolio Asset Requirements Table]].
- [x] **Hero portrait + parallax + real social links** ([[CHECKPOINT 7 - Video Integration]]): `public/Profile.jpg` wired as a layered foreground/background portrait (`HeroPortrait`, `usePointerParallax`, reduced-motion + touch safe); real GitHub/LinkedIn/itch.io links via reusable `SocialLinks` from `profile.links`.
- [x] **Featured Projects = data-driven 3×2 (exactly 6)** via `featured` + `featuredPriority` + `FEATURED_LIMIT`; Hammer Moonbase + Bomberman excluded (kept in full list) → [[Data Driven Project System]].
- [x] **Robust media system** `ProjectMedia` / `VideoPreview` / `MediaPlaceholder` (ordered `sources` → premium placeholder fallback; supports optimized path + external URL); root cause of the desktop video bug found (non-faststart 865 MB MP4) → [[cursor-video-deploy-blocker]].
- [x] **Editable `.txt` content system** for all visible copy (`public/content/**`, `useTextContent`, in-code fallbacks) + docs → [[Editable Text Content System]].
- [x] **First 3D layer live — Arcade Machine exploded-view reveal** on `/projects/arcade-machine` (`src/components/three/`, R3F/Three/Drei, lazy + code-split + fallback-backed). Reference-matched: reversed orbit (front-right hero → inverse 60°), chassis-left layout, screen slides clear (no clip), Pi visible, Lid far right, edge-clamped hover tooltips, landscape stage + 420vh staged scroll, scroll-to-top. Verified headlessly + in-browser; build green → [[CHECKPOINT 9 - Arcade Chassis Animation]] / [[Immersive 3D Direction]].
- [x] **First focused media batch integrated** ([[CHECKPOINT 10 - Added media 1]]): Cursor.zip has a
      local preview path, poster, logo, and YouTube trailer; Hammer Moonbase Map has a
      real thumbnail/detail hero and YouTube flyby. Reusable `ProjectLogo` / `YouTubeEmbed`
      components, base-aware public paths, graceful fallback, and reduced-motion behavior are live.
- [x] **Second logo/thumbnail pass complete** ([[CHECKPOINT 11 - Logos and Thumbnails 2]]):
      Arcade Machine, Surfers Quest, and Bomberman-style logos plus exact case-sensitive preview
      paths are wired through `projects.ts`; native looping and polished fallback behavior verified.
- [x] **Project status labels normalized** ([[CHECKPOINT 12 - Label status]]): all eight projects
      now use `in-progress` or `completed`; cards show amber IN PROGRESS or green COMPLETED pills,
      with no visible PLACEHOLDER project-status labels.
- [x] **Basilisk + EOS media integration** ([[CHECKPOINT 13 - Basilisk and EOS Thumbnail Integration]]):
      both projects fully media-wired — local looping MP4 card/hero previews with the cinematic veil,
      header logos, and YouTube showcases. Basilisk uses a single `YouTubeEmbed` (`EFVWiAf81z0`);
      EOS uses a new reusable two-dot `YouTubeCarousel` (`qfgG6GS0QKE` + `EYpZmPbpHGE`). Schema gained
      optional `showcaseVideos`. No redesign, no new deps, no re-encoding; build + browser verified.
- [x] **GitHub Pages deployment workflow exists** at `.github/workflows/deploy.yml`.
- [x] **First playable in-browser demo** ([[CHECKPOINT 14 - Extracted Surfers Quest]]): the Surfers
      Quest platformer was extracted from the native SFML arcade project and compiled to
      **WebAssembly (Emscripten)** under `public/demos/surfers-quest/`. Since SFML 3 has no web
      backend, a thin **SFML 3 → SDL2 shim** (`sfml_shim/`) lets the unmodified game code compile;
      IDBFS persists user-created maps per-browser. The negative-scale sprite-flip invisibility bug
      and footstep audio spam were fixed; real player/enemy animation folders are packaged with
      natural sort, a debug report, and safe fallbacks. Native arcade build untouched.
- [x] **Second playable in-browser demo** ([[CHECKPOINT 15 - Extracted Bomberman]]): the
      Bomberman-style game (Game 0) extracted and compiled to **WebAssembly** under
      `public/demos/bomberman/`, reusing the same SDL2 shim (only `sf::CircleShape` added) and IDBFS
      maps/templates. Embedded on `/projects/bomberman-style-game` via a new reusable
      `PlayableDemo.tsx` (full-size panel, page-level mute overlay, no inner-scroll trap,
      build-failed fallback). ~10 MB bundle. Additive only — the Surfers Quest demo, Arcade Machine
      3D reveal, media and other pages are untouched; browser-verified and `npm run build` green.

- [x] **Surfers Quest decorative background complete** ([[CHECKPOINT 19 - Surfers Quest Background]]):
      the player route, Cherry/exit loop, and animated Frog/Melon decorations are isolated to the
      Surfers Quest project page. Frog and Melon remain beneath content with `pointer-events: none`;
      desktop positioning, responsive hiding, reduced motion, wall-grab edge alignment, and playable
      demo input are verified. `npm run build` remains green.
- [x] **Super Bomberman sprite showcase complete**
      ([[CHECKPOINT 20 - Super Bomberman Sprite Showcase]]): large animated Blue player and Chomper
      decorations sit behind the preview/demo. The tuned 10-second sequence starts beside the
      Gameplay Preview heading, uses 25% smaller sprites, slides the bomb linearly along the top
      border, and explodes outside the clipped card at the top-right corner. The blast now renders
      the complete center/top/bottom/left/right cross, and the large player uses left-walk frames →
      [[CHECKPOINT 22 - Super Bomberman Explosion Cross]].
- [x] **Arcade Machine controller backdrop complete**
      ([[CHECKPOINT 23 - Arcade Machine Controller Backdrop]]): two decorative NES-style controllers
      built entirely from three.js primitives sit behind the "Inside the Arcade Machine" section.
      Each renders into its own `clamp()`-bounded canvas so it never scales with viewport/zoom; A/B
      caps depress in alternation, cables sway, `pointer-events:none`, lazy/code-split. The
      exploded-view reveal, callouts, and media are untouched.
- [x] **First real content pass complete**
      ([[CHECKPOINT 24 - Project Copy and Creative Process Pass]]): Arcade Machine, Surfers Quest, and
      the Bomberman-style game now have genuine card + Overview copy, replacing the seeded TODO/
      placeholder text. A new **Creative Process** case-study section was added through the schema
      (`creativeProcess`), `ProjectCaseStudy.tsx`, `projects.ts`, and editable
      `creative-process.txt` files; the Arcade reveal subtitle is now editable via
      `inside-description.txt` → [[Editable Text Content System]].

## In Progress
- [ ] **Content pass (continuing):** real copy for the remaining projects (Cursor.zip, Hammer
      Moonbase, Basilisk, EOS, Zombies VR) + site-level hero tagline/bio; real email in `profile.ts`;
      confirm the Bomberman-style game's final public title; start adding 🔴 high-priority project
      media → [[Editable Text Content System]] / [[Portfolio Asset Requirements Table]].
- [ ] **Next media batch:** manually export genuine H.264 MP4 files for Cursor.zip, Arcade Machine,
      Surfers Quest, and Super Bomberman at the wired `public/<Project>/Videos/` paths. The current
      `.mp4`-named files still contain ASF/WMV data, so browser previews correctly fall back.
- [ ] **Surfers Quest hosting footprint:** decide whether to trim the playable demo's ~75 MB asset
      bundle before public GitHub Pages hosting → [[CHECKPOINT 14 - Extracted Surfers Quest]] /
      [[Data Driven Project System]].

## Blocked / Needs James Input
- [ ] Motion intensity (restrained ↔ flashy) + accent color → [[Visual Identity]] / [[Animation Direction]].
- [ ] Which projects get a real **3D model** vs. video-only (Arcade Machine = flagship) → [[3D Asset Requirements]].
- [ ] Real project descriptions, names, media, 3D/video → [[Missing Content Checklist]].
- [ ] CV + contact links → [[CV And Contact Assets]]; repo name / domain → [[GitHub Pages Deployment]].

## Not Started
- [ ] 3D layer (React Three Fiber) — **Arcade Machine reveal done** ([[CHECKPOINT 9 - Arcade Chassis Animation]]); remaining model-backed projects + optional Phase 3 hero pending → [[Immersive 3D Direction]].
- [ ] Real content pass (Phase 6) + optimization/deploy (Phase 7).

## Latest Checkpoint
- [[CHECKPOINT 24 - Project Copy and Creative Process Pass]] (2026-06-14) — First real written
  content: genuine descriptions and case-study Overview for Arcade Machine, Surfers Quest, and the
  Bomberman-style game, plus a new **Creative Process** case-study section wired through the schema,
  UI, `projects.ts`, and editable `.txt` files. Prior:
  [[CHECKPOINT 23 - Arcade Machine Controller Backdrop]] (2026-06-14) — decorative three.js
  controller backdrop behind the Arcade Machine section. See [[Checkpoint Hub]].

## Links
- Next steps → [[Next Actions]]
- Overview → [[Portfolio Website - Master Hub]]
- Design brief → [[Design System Brief]] · Skill plan → [[Skill Assisted Design Plan]]
- Phased plan → [[Technical Implementation Plan]] · [[Implementation Hub]] · `docs/Roadmap.md`
