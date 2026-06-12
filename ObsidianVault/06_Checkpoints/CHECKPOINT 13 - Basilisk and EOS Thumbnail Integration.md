---
checkpoint: 13
title: Basilisk and EOS Thumbnail Integration
date: 2026-06-12
status: Complete
---

# CHECKPOINT 13 — Basilisk and EOS Thumbnail Integration

> **Date:** 2026-06-12
> **Checkpoint #:** 13
> **Status:** Complete
> ← Previous: [[CHECKPOINT 12 - Label status]]
> → Next: _none yet_
> ⬆ Index: [[Checkpoint Hub]]

## Project Status
Focused Basilisk Engine + EOS Dedicated Server media pass is complete. Both projects are now fully
media-wired through the existing data-driven system: each has a local looping MP4 card/hero preview
with the cinematic veil, a header logo, and hosted YouTube showcase content. Basilisk uses a single
`YouTubeEmbed`; EOS introduces a new reusable **`YouTubeCarousel`** (two clips, edge arrows +
Instagram-style dots). No redesign, no new dependencies, no video re-encoding. The Dala dark
cinematic style, editable text system, project data system, Arcade Machine 3D reveal, and
ObsidianVault remain untouched. `npm run build` is green and the work was verified in-browser.

## What Changed Since the Previous Checkpoint
- Added optional `showcaseVideos?: ProjectVideoEmbed[]` to the project schema (additive; existing
  single `showcaseVideo` untouched) → [[Data Driven Project System]].
- Wired **Basilisk Engine**: `cover` video `/Basilisk/Videos/basilisk-short.mp4`, logo
  `/Basilisk/basilisk-logo.png`, single YouTube showcase `EFVWiAf81z0`, and a `links.video`.
- Wired **EOS Dedicated Server**: `cover` video `/EOS/Videos/eos-short.mp4`, logo
  `/EOS/EOS-logo.png` (uppercase, case-sensitive), and a two-entry `showcaseVideos` carousel
  (`qfgG6GS0QKE` + `EYpZmPbpHGE`).
- New reusable component `src/components/projects/YouTubeCarousel.tsx` — reuses `YouTubeEmbed`,
  one frame at a time, wrap-around arrows, accent-violet active dot vs. subtle inactive dots,
  active-tracking "Watch on YouTube" link, accessible labels; degrades to a plain embed for a
  single video.
- `ProjectPage` now renders the carousel when `showcaseVideos` is present (parallel to the existing
  single-embed block); `globals.css` gained `.youtube-carousel` styling using existing tokens.
- The hero "gameplay clip coming soon" / "showcase coming soon" placeholders are gone for both
  projects (replaced by the real cover video + showcase).
- Updated asset docs ([[Portfolio Asset Requirements Table]], [[Asset Collection Checklist]],
  [[Video Capture Requirements]]); added `"autoPort": true` to `.claude/launch.json`.

## Completed Work
- [x] Basilisk Engine logo wired → `/Basilisk/basilisk-logo.png`.
- [x] Basilisk Engine local MP4 preview (card + hero, native loop, muted, autoplay, playsInline) →
  `/Basilisk/Videos/basilisk-short.mp4`, cinematic veil retained.
- [x] Basilisk Engine YouTube showcase `EFVWiAf81z0` embedded on the detail page.
- [x] EOS Dedicated Server logo wired → `/EOS/EOS-logo.png`.
- [x] EOS Dedicated Server local MP4 preview (card + hero, native loop) → `/EOS/Videos/eos-short.mp4`.
- [x] EOS two-video carousel (`qfgG6GS0QKE`, `EYpZmPbpHGE`) with two dots; active dot changes on
  switch; iframe + watch link track the active clip → new `YouTubeCarousel`.
- [x] Browser-verified: asset URLs return 200/206 with correct types; cards loop with overlay; both
  detail pages render logo + showcase; no "coming soon" text; mobile (375px) layout clean; no
  console errors.
- [x] `npm run build` (`tsc --noEmit && vite build`) succeeds.
- [x] Existing single-embed projects (Cursor.zip, Hammer) unaffected.

## Pending Work
- [ ] Consider a smaller `+faststart` re-export of `eos-short.mp4` (~8.2 MB) and optional posters for
  both previews — deferred per the no-convert rule → [[Video Capture Requirements]].
- [ ] Confirm both EOS YouTube videos are public/unlisted so the embeds load for visitors.
- [ ] Manually export genuine H.264 MP4 containers for the four older wired preview paths
  (Cursor/Arcade/Surfers/Bomberman still carry ASF/WMV signatures) → [[Portfolio Asset Requirements Table]].
- [ ] Replace remaining placeholder descriptions and case-study TODO copy → [[Editable Text Content System]].

## Important Project Decisions
- **Multi-video showcases are data-driven via `showcaseVideos`.** A new optional array field drives a
  carousel; single-video projects keep using `showcaseVideo`. No component hardcodes media paths.
- **Reuse over reinvention.** The carousel wraps the existing `YouTubeEmbed` so the responsive 16:9
  frame styling stays identical; no carousel library was added.
- **Cover video drives both card and detail hero** (same pattern as Cursor.zip), which is what
  replaces the "coming soon" hero placeholder while the YouTube content sits below.
- **Exact case-sensitive paths** preserved for GitHub Pages (`EOS/EOS-logo.png` uppercase); supplied
  MP4s used directly with native `loop` — not trimmed, transcoded, or duplicated.

## Related Notes
- [[Portfolio Website - Master Hub]] · [[Current Status]] · [[Next Actions]]
- [[Data Driven Project System]] · [[Editable Text Content System]]
- [[Portfolio Asset Requirements Table]] · [[Asset Collection Checklist]] · [[Video Capture Requirements]]
- [[CHECKPOINT 12 - Label status]] · [[Checkpoint Hub]]
