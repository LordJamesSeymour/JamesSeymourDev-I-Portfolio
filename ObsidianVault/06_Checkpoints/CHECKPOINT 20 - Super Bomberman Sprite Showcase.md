---
checkpoint: 20
title: Super Bomberman Sprite Showcase
date: 2026-06-13
status: Complete
---

# CHECKPOINT 20 - Super Bomberman Sprite Showcase

> **Date:** 2026-06-13
> **Checkpoint #:** 20
> **Status:** Complete
> Previous: [[CHECKPOINT 19 - Surfers Quest Background]]
> Next: [[CHECKPOINT 21 - Super Bomberman Sprite Tuning]]
> Index: [[Checkpoint Hub]]

## Project Status

The Bomberman-style project page now has its own decorative sprite composition based on the
established Surfers Quest treatment. Existing media, logo, playable demo, controls, project data,
and all other project pages remain unchanged.

## Completed Work

- [x] Copied 37 required PNG frames into `public/SuperBomberman/Sprites/`.
- [x] Added a large walking Blue player behind the left side of the content.
- [x] Added a large animated Chomper behind the right side of the content.
- [x] Added a 10-second player, bomb placement, punch, flight, explosion, and reset loop.
- [x] Built the corner explosion from the original five explosion tile sets.
- [x] Kept side decorations at layer `0`, content at layer `1`, and the mini-sequence at layer `2`.
- [x] Kept all decorative sprites non-interactive with `pointer-events: none`.
- [x] Added static reduced-motion behavior.
- [x] Hid the complete decorative layer at 1060 px and below to protect tablet/mobile layout.
- [x] Verified the sequence completes and resets.
- [x] Verified the bomb impact lands on the Gameplay Preview's bottom-right corner.
- [x] Verified iframe and Fullscreen/Reset controls retain pointer input.
- [x] Verified Surfers Quest still renders its original decoration system.
- [x] Verified no browser console errors and no horizontal overflow.
- [x] Verified `npm run typecheck` and `npm run build` succeed.

## Important Project Decisions

- The right-facing punch pose is a single directional source frame; a short CSS lunge and overlap
  with the bomb's launch provide the animation beat.
- The blast extends left/up from the corner rather than covering demo controls below the preview.
- Bomberman decorations use their own component and stylesheet instead of generalizing the mature
  Surfers Quest route implementation.
- A small generic frame-path/frame-selection helper is shared-capable without changing Surfers
  Quest behavior.

## Related Notes

- [[Super Bomberman Sprite Showcase]]
- [[Super Bomberman Sprite Assets]]
- [[CHECKPOINT 19 - Surfers Quest Background]]
- [[CHECKPOINT 15 - Extracted Bomberman]]
