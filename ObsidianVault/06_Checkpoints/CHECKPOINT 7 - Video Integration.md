---
checkpoint: 7
title: Video Integration
date: 2026-06-11
status: Complete
---

# CHECKPOINT 7 — Video Integration

> **Date:** 2026-06-11
> **Checkpoint #:** 7
> **Status:** Complete
> ← Previous: [[CHECKPOINT 6 - Premium Dala Inspired 2D Redesign Complete]]
> → Next: _none yet_
> ⬆ Index: [[Checkpoint Hub]]

## Project Status
Still on the **Phase 2 baseline (premium 2D, complete)**, now pushed deep into the
**content pass** with three controlled enhancement/fix passes layered on top — all
type-checked, building green, verified in-browser, and with **no new npm packages**.
The hero now carries James's real photo as a layered cinematic portrait; the real
social links are live; the Cursor.zip gameplay video is wired through a robust,
reusable media system; Featured Projects is a clean data-driven 3×2; and **all visible
copy is now editable from plain `.txt` files** without touching code. The one open
blocker is unchanged and known: the 865 MB `CursorGameplay.mp4` must be optimized
before deploy → [[cursor-video-deploy-blocker]] (memory) / see below.

## What Changed Since the Previous Checkpoint
**Pass A — Hero portrait + real links (enhancement):**
- Added `public/Profile.jpg` to the hero as a **layered foreground/background portrait**
  (`HeroPortrait`): an enlarged, blurred, void-tinted duplicate that melts the photo's
  bokeh into the cosmos, a breathing violet key-light, and the sharp subject radially
  masked into the void. True ML cutout wasn't feasible frontend-only, so this is an
  **approximated separation** leaning on the photo's existing depth-of-field.
- **Pointer parallax** (`usePointerParallax`): bg + frame translate by different amounts
  for depth — disabled under reduced-motion and on coarse/touch pointers.
- **Cinematic video veil** over the Cursor.zip cover: violet glow + vignette + top/bottom
  darkening + an edge focus-blur that keeps the centre sharp (motion preserved).
- **Real social links wired** (GitHub / LinkedIn / itch.io) via a reusable `SocialLinks`
  component reading `profile.links` (single source of truth) — in the hero, contact
  section, and footer; all `target="_blank" rel="noopener noreferrer"` + a11y labels.

**Pass B — Featured-6 + video reliability + editable content (correction pass):**
- **Featured Projects = exactly 6** (clean 3×2). Now **data-driven**: `featured: true` +
  `featuredPriority`, sorted and capped at `FEATURED_LIMIT = 6` in `getFeaturedProjects()`.
  Selection lives in `projects.ts`, not the component. The 6: Basilisk Engine, EOS
  Dedicated Server, Zombies VR, Cursor.zip, Arcade Machine, Surfers Quest.
- **Excluded from Featured:** **Hammer Moonbase Map** (James's least-proud piece — stays
  under Level Design) and **Bomberman-style Game** (to land on exactly 6). Nothing deleted.
- **Diagnosed the "video won't show on desktop" bug:** the path was already correct
  (`/CursorGameplay.mp4`); the real cause is the MP4's atom order `ftyp → mdat(865 MB) →
  moov` — the `moov` index is at the **end** (not faststart), so the browser must download
  all 865 MB before decoding a frame (`readyState` stays 0 → poster shows). **Not** a
  CSS/z-index bug.
- **New robust media system** → `ProjectMedia` (orchestrator) + `VideoPreview` +
  `MediaPlaceholder`; replaced/removed the old `CoverMedia`. Video tries `cover.sources`
  in order (optimized → full), falls back to the premium placeholder if all fail; reduced
  motion → still poster. Data model now supports an **optimized preview path** and an
  **external hosted URL** (`links.video`).
- **Editable text content system** (`public/content/**.txt`): a `useTextContent(path,
  fallback)` hook + `content.ts` helpers, wired into hero, header, about, featured,
  projects page, contact, footer, and per-project title/short/long/needs. Missing/failed
  files fall back to in-code copy (never crashes); base-URL aware for GitHub Pages.

## Completed Work
- [x] Hero real photo as a layered, parallax portrait composition (`HeroPortrait`, `usePointerParallax`) — reduced-motion + mobile safe → [[Animation Direction]] / [[Visual Identity]].
- [x] Cinematic blurred/gradient veil over the live video cover; premium + readable.
- [x] Real social links (GitHub/LinkedIn/itch.io) via reusable `SocialLinks` from `profile.links` → [[CV And Contact Assets]].
- [x] **Featured Projects = data-driven 3×2 (exactly 6)**; `featured` + `featuredPriority` + `FEATURED_LIMIT` → [[Data Driven Project System]].
- [x] **Hammer Moonbase excluded from Featured** (kept under Level Design); Bomberman also off-featured.
- [x] Diagnosed + fixed the desktop video path/rendering question (root cause: non-faststart 865 MB MP4) → [[cursor-video-deploy-blocker]].
- [x] Reusable media layer `ProjectMedia` / `VideoPreview` / `MediaPlaceholder` with ordered-source + placeholder fallback (CoverMedia removed).
- [x] **Editable `.txt` content system** (16 site + 32 project files) + `useTextContent` hook + helpers; wired across all visible copy with fallbacks → [[Editable Text Content System]].
- [x] Docs: [[Editable Text Content System]] (vault) + `public/content/README.md`.
- [x] `npm run typecheck` + `npm run build` green; verified live (6 featured, 3 columns, video element present, `.txt` edit reflected in DOM). **No new packages.**

## Pending Work
- [ ] **Optimize `CursorGameplay.mp4`** (the blocker): re-encode short `+faststart` ~720p loop → `public/videos/cursor-preview.mp4`, prepend to `cursor-zip.cover.sources`; ffmpeg not installed on this machine → [[cursor-video-deploy-blocker]] / [[Video Capture Requirements]].
- [ ] **Real written copy:** edit the seeded `.txt` files (hero tagline, bio, project titles/descriptions) — still placeholders → [[Editable Text Content System]] / [[Missing Content Checklist]].
- [ ] Real bio / tagline / email in `profile.ts` (links now real; email + CV still absent) → [[CV And Contact Assets]].
- [ ] Drop in 🔴 high-priority project media (Arcade cabinet + loop, Basilisk editor clip) → [[Portfolio Asset Requirements Table]].
- [ ] Confirm an original, non-trademarked public name for the Bomberman-style game → [[Project Content Hub]].
- [ ] *(Awaiting James)* motion intensity + which projects get a real **3D model** → [[3D Asset Requirements]].
- [ ] **Phase 3 (after approval):** lightweight React Three Fiber hero, isolated + gated → [[Immersive 3D Direction]].
- [ ] Deployment pipeline (`.github/workflows/deploy.yml`) → [[GitHub Pages Deployment]].

## Important Project Decisions
- **Foreground/background separation = approximated, not ML.** Frontend-only, no new deps; lean on the photo's real depth-of-field + layered blur/mask/glow. Practical over fragile.
- **Featured selection is data-driven** (`featured` + `featuredPriority`, capped at 6) — never hardcoded in the component; the grid is always a clean 3×2.
- **Hammer Moonbase intentionally not featured** (least-proud work) but preserved in the full Level Design list.
- **Video reliability via ordered `sources` + graceful placeholder**, and the real root cause of the desktop issue identified (moov-at-end / non-faststart) — fix is asset-side (optimize + faststart), code is ready.
- **Editable copy lives in `.txt`; structure stays in code.** `projects.ts` keeps category, tags, featured status, media/video paths, links; `.txt` holds only the words. Fallbacks remain in code so nothing breaks on a missing file.
- **Still no new dependencies**; ObsidianVault and `docs/` untouched except the new content-system note. Evolve, don't replace.

## Related Notes
- [[Portfolio Website - Master Hub]] · [[Current Status]] · [[Next Actions]]
- [[Editable Text Content System]] · [[Data Driven Project System]] · [[Portfolio Asset Requirements Table]]
- [[Video Capture Requirements]] · [[CV And Contact Assets]] · [[Animation Direction]] · [[Visual Identity]]
- [[Immersive 3D Direction]] · [[GitHub Pages Deployment]] · [[Implementation Hub]]
- [[CHECKPOINT 6 - Premium Dala Inspired 2D Redesign Complete]] · [[Checkpoint Hub]]
