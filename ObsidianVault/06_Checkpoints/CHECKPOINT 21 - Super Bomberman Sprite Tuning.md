---
checkpoint: 21
title: Super Bomberman Sprite Tuning
date: 2026-06-13
status: Complete
---

# CHECKPOINT 21 - Super Bomberman Sprite Tuning

> **Date:** 2026-06-13
> **Checkpoint #:** 21
> **Status:** Complete
> Previous: [[CHECKPOINT 20 - Super Bomberman Sprite Showcase]]
> Next: [[CHECKPOINT 22 - Super Bomberman Explosion Cross]]
> Index: [[Checkpoint Hub]]

## Project Status

The Bomberman decorative mini-sequence now begins beside the Gameplay Preview heading, uses smaller
sprites, slides the bomb linearly along the preview's top border, and renders its explosion outside
the clipped video card. The large left decoration now uses the source left-walk animation.

## Completed Work

- [x] Copied the three `Player/Blue/Left` frames into
  `public/SuperBomberman/Sprites/Player/WalkLeft/`.
- [x] Kept the small sequence's right-facing walk and punch assets.
- [x] Moved the small player to `31.5%, 3.6%`, clearing the heading by approximately 55 px at the
  1280 px reference viewport.
- [x] Moved bomb placement to `36%, 3.6%`.
- [x] Reduced small player, bomb, and explosion sizes to 75% of their previous values.
- [x] Replaced the three-point arc with a two-point linear interpolation ending at `97.3%, 3.6%`.
- [x] Verified sampled bomb-flight y variance is `0px`.
- [x] Moved the explosion outside `.sb-sequence` as a sibling of the clipped media card.
- [x] Anchored the explosion to the preview stage's `top: 0; left: 100%` top-right corner.
- [x] Preserved the preview card's rounded `overflow: hidden` while the preview stage remains
  `overflow: visible`.
- [x] Preserved background/content/sequence layers and non-interactive pointer behavior.
- [x] Preserved Chomper, media, playable-demo controls, responsive hiding, and reduced motion.

## Important Project Decisions

- Only the large background player uses `PlayerLeft_*`; the small player still faces right toward
  the bomb's travel direction.
- Bomb flight has no vertical lift, bob, or midpoint keyframe.
- The blast remains visually connected to the top-right impact while living outside the clipped
  video element.

## Related Notes

- [[Super Bomberman Sprite Showcase]]
- [[Super Bomberman Sprite Assets]]
- [[CHECKPOINT 20 - Super Bomberman Sprite Showcase]]
