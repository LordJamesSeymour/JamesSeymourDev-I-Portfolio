# Current Status

> **Status:** In Progress
> Living snapshot of where the project is right now. Update at each [[Checkpoint Hub|checkpoint]].

## Phase
**Phase 2 (Premium 2D Visual Redesign) — COMPLETE.** Next: content pass, then Phase 3 (lightweight R3F hero, after approval).
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

## In Progress
- [ ] **Content pass:** edit the seeded `.txt` files with real copy (hero tagline, bio, project titles/descriptions); real email in `profile.ts`; start adding 🔴 high-priority project media → [[Editable Text Content System]] / [[Portfolio Asset Requirements Table]].
- [ ] **Optimize `CursorGameplay.mp4`** (865 MB, non-faststart) → short `+faststart` preview before deploy → [[cursor-video-deploy-blocker]].

## Blocked / Needs James Input
- [ ] Motion intensity (restrained ↔ flashy) + accent color → [[Visual Identity]] / [[Animation Direction]].
- [ ] Which projects get a real **3D model** vs. video-only (Arcade Machine = flagship) → [[3D Asset Requirements]].
- [ ] Real project descriptions, names, media, 3D/video → [[Missing Content Checklist]].
- [ ] CV + contact links → [[CV And Contact Assets]]; repo name / domain → [[GitHub Pages Deployment]].

## Not Started
- [ ] 3D layer (React Three Fiber) — **Arcade Machine reveal done** ([[CHECKPOINT 9 - Arcade Chassis Animation]]); remaining model-backed projects + optional Phase 3 hero pending → [[Immersive 3D Direction]].
- [ ] Real content pass (Phase 6) + optimization/deploy (Phase 7).
- [ ] Deployment pipeline (`.github/workflows/deploy.yml`).

## Latest Checkpoint
- [[CHECKPOINT 9 - Arcade Chassis Animation]] (2026-06-11) — Arcade Machine 3D reveal finished & reference-matched on `/projects/arcade-machine` (reversed orbit, screen-clip fixed, edge-clamped tooltips, landscape stage, scroll-to-top). Prior: [[CHECKPOINT 8 - GLB Models Import]] / [[CHECKPOINT 8 - GLB Models Implementation 1]]. See [[Checkpoint Hub]].

## Links
- Next steps → [[Next Actions]]
- Overview → [[Portfolio Website - Master Hub]]
- Design brief → [[Design System Brief]] · Skill plan → [[Skill Assisted Design Plan]]
- Phased plan → [[Technical Implementation Plan]] · [[Implementation Hub]] · `docs/Roadmap.md`
