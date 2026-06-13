---
checkpoint: 16
title: Surfers Quest Sprite Showcase
date: 2026-06-13
status: Complete
---

# CHECKPOINT 16 - Surfers Quest Sprite Showcase

> **Date:** 2026-06-13
> **Checkpoint #:** 16
> **Status:** Complete
> Previous: [[CHECKPOINT 15 - Extracted Bomberman]]
> Next: [[CHECKPOINT 17 - Surfers Quest Sprite Tuning]]
> Index: [[Checkpoint Hub]]

## Project Status

The Surfers Quest project page now has a focused sprite-animation layer around its existing
Gameplay Preview and Playable Web Demo. The native video, WebAssembly demo, editable text, project
data, controls, and every other project page remain intact.

## Completed Work

- [x] Copied 73 required 32 x 32 PNG frames into `public/SurfersQuest/Sprites/`.
- [x] Added `SurfersQuestSpriteShowcase.tsx` and isolated Surfers Quest-only CSS.
- [x] Added an 18-second player loop: spawn, run, Cherry collision, wall grab, land, exit,
      despawn, five-second reset, and respawn.
- [x] Added animated Frog and Melon side decorations.
- [x] Preserved pointer input and controls for the playable iframe.
- [x] Hid the route below 700 px and side sprites below 1060 px.
- [x] Added static reduced-motion fallbacks.
- [x] Verified desktop and mobile layout without horizontal overflow.
- [x] Verified `npm run build` succeeds.

## Important Decisions

- The decoration is mounted only in the Surfers Quest branch of `ProjectPage`.
- Movement is driven by `requestAnimationFrame`; frame swaps update every 80 ms.
- Decorative elements use `pointer-events: none` and never enter the demo canvas.
- Public paths pass through `resolvePublicAssetPath()` for Vite/GitHub Pages base-path support.
- Only the six required frame sets were copied from the native project.

## Related Notes

- [[Surfers Quest Sprite Showcase]]
- [[Surfers Quest Sprite Assets]]
- [[CHECKPOINT 15 - Extracted Bomberman]]
