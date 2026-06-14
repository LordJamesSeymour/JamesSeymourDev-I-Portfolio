# Surfers Quest

## Status
Completed — real copy written ([[CHECKPOINT 24 - Project Copy and Creative Process Pass]]).
Playable WebAssembly demo + decorative sprite showcase are live on the project page.

## Category
C++

## Short Description
Surfers Quest is a C++/SFML side-scrolling platformer built for the Arcade Machine project. It
focuses on responsive movement, animated 2D characters, layered tile-based levels, hazards, enemies,
surface-aware audio, and a custom level editor designed for quick iteration.

## Overview (case study)
Surfers Quest is a platform game built around movement feel and level readability. The player can
run, jump, double jump, wall grab, wall jump, drop through one-way platforms, avoid spike traps and
interact with enemies across scrolling tile-based stages. The project uses SFML for rendering, input
and audio, with a custom level format that supports world metadata, player spawns, enemies, terrain
types, hazards and platform tiles.

## Creative Process (case study)
The creative process focused on translating familiar platformer ideas into a responsive custom
implementation. I researched common platforming techniques such as coyote time, jump buffering,
variable jump height, wall interaction and enemy behaviour, then tuned them through repeated testing.
One of the biggest challenges was making movement feel forgiving without losing precision, especially
when combining double jumps, wall grabs, drop-through platforms and hazards. I also built a custom
level editor shared in concept with the maze-action project, allowing levels to be painted with tile
tools, saved, loaded and previewed quickly. This made it much faster to test layouts, enemy
placement, world themes and difficulty progression.

## Source of truth (live site)
- `public/content/projects/surfers-quest/short-description.txt`
- `public/content/projects/surfers-quest/long-description.txt` → case-study **Overview**
- `public/content/projects/surfers-quest/creative-process.txt` → case-study **Creative Process**
- Fallbacks mirrored in `src/data/projects.ts`
→ [[Editable Text Content System]] · [[C++ Projects]] · [[Project Content Hub]]

## Technologies
- C++ / SFML (native) → WebAssembly (Emscripten) via the SFML 3 → SDL2 shim for the web demo

## Media Needed
- [ ] Gameplay screenshot
- [ ] Level editor screenshot
- [ ] Genuine H.264 MP4 preview (replace the ASF/WMV-container placeholder)
- [x] Playable in-browser demo ([[CHECKPOINT 14 - Extracted Surfers Quest]])
- [x] Decorative sprite showcase ([[CHECKPOINT 19 - Surfers Quest Background]])

## Case Study Sections To Write
- [x] Overview
- [x] Creative Process
- [ ] My role
- [ ] Key features
- [ ] Technical challenges
- [ ] Design decisions
- [ ] Final result

## James Input Needed
- [ ] Gameplay / level-editor screenshots
- [ ] GitHub / itch.io links (if any)
