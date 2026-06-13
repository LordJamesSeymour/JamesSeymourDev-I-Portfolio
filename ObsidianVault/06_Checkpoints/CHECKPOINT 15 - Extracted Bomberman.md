---
checkpoint: 15
title: Extracted Bomberman
date: 2026-06-13
status: Complete
---

# CHECKPOINT 15 — Extracted Bomberman

> **Date:** 2026-06-13
> **Checkpoint #:** 15
> **Status:** Complete
> ← Previous: [[CHECKPOINT 14 - Extracted Surfers Quest]]
> → Next: _none yet_
> ⬆ Index: [[Checkpoint Hub]]

## Project Status
The second playable in-browser demo is live: the **Bomberman-style game** (Game 0 of the native
C++17 / SFML 3 arcade project) was extracted, compiled to **WebAssembly (Emscripten)** through the
existing **SFML 3 → SDL2 shim**, and embedded on its project page
(`/projects/bomberman-style-game`) as a real playable panel — menu, level select, grid gameplay
(move + place bombs), and the level editor with browser-persistent maps. It reuses the
infrastructure built for Surfers Quest, and was done as a focused, additive pass: the Surfers Quest
demo, the Arcade Machine 3D reveal, every video preview/logo/supporting section, and the production
build all remain intact. `npm run build` is green and the demo was verified in-browser.

## What Changed Since the Previous Checkpoint
- **Extracted only the Bomberman (Game 0) slice** from `LowLevelY3` — `BombermanEnemy/Level/Player`,
  `GAME1_BombermanWindow` (game controller), `GAME1_BombermanMenu/LevelSelect/LevelEditor`,
  header-only `BombermanTypes/Bomb/Audio`, plus the shared `ArcadeInput/Settings/UISounds`. No Hub,
  Surfers Quest, or Game 2. It is self-contained, like the Surfers Quest slice.
- **Reused the SFML 3 → SDL2 shim verbatim** — proof it generalises. The only shim addition was
  `sf::CircleShape` (Bomberman uses it solely as a missing-texture power-up fallback).
- **New web entry** `src_web/BombermanWebMain.cpp` (guarded by `BOMBERMAN_WEB_BUILD`) driving
  Menu → Level Select → Game + Editor with `emscripten_set_main_loop`. The game controller
  self-contains gameplay, so the driver is thin.
- **Second `bomberman` target** in `web/CMakeLists.txt` (same shim + SDL2 ports). Output
  `bomberman.js/.wasm/.data` — `bomberman.data` is only **~10 MB** (the 121 MB `Game#0/SplashScreen`
  is excluded; only the ~11 MB `Resources` is packaged) — far lighter than Surfers Quest's 75 MB.
- **IDBFS map persistence** (`web/bomberman-pre.js`) mounted over `Game#0/Bomberman/Maps`; first
  launch seeds the 6 levels **and** the editor templates.
- **One safe native-source fix:** added a missing `#include <filesystem>` to
  `GAME1_BombermanLevelSelect.h` (it used `std::filesystem::path` in signatures and only compiled
  natively via transitive includes). Harmless to native, required for web.
- **Reusable React component** `src/components/projects/PlayableDemo.tsx` — iframe panel + page-level
  mute overlay (postMessage) + fullscreen + reset-maps + controls + loading-safe embed. Used for
  Bomberman; the Surfers Quest inline block was left untouched.
- **`ProjectPage.tsx`**: added a Bomberman slug branch (Gameplay Preview video + `PlayableDemo`).
  **`globals.css`**: two additive class aliases (`.project-detail__playable-media`,
  `.project-detail__media--playable-video`). No existing rules changed.
- **`embed.html`** adds a build-failed fallback (script `onerror` + watchdog) the Surfers Quest one
  lacked.
- New `build_web_bomberman.ps1`; updated `WEB_PORT_NOTES.md` (§9) and a demo `README.md`.

## Completed Work
- [x] Bomberman slice compiled to WebAssembly via the SDL2 shim (`bomberman.js/.wasm/.data`).
- [x] `sf::CircleShape` added to the shim; `web/CMakeLists.txt` gained a `bomberman` target.
- [x] `src_web/BombermanWebMain.cpp` + `web/bomberman-pre.js` (IDBFS maps + templates seeding).
- [x] Reusable `PlayableDemo.tsx`; Bomberman branch wired into `ProjectPage.tsx` (additive).
- [x] Stripped `embed.html` with mute bridge + loading state + build-failed fallback.
- [x] Demo deployed to `public/demos/bomberman/`; `build_web_bomberman.ps1` added.
- [x] **Verified in-browser:** menu + level select + grid gameplay render; keyboard moves the player
      and places bombs; 9 map files seed into IDBFS; mute toggle persists; no console errors. The
      project page embeds the demo at full size with **no inner-scroll trap**; logo/title/video
      preview preserved.
- [x] Regression-checked: Surfers Quest demo page and Arcade Machine 3D reveal still render.
- [x] `npm run build` (`tsc --noEmit && vite build`) succeeds.

## Pending Work
- [ ] Finalise the project's **real name + description** (still "Bomberman-style Game (placeholder
      name)") → [[Editable Text Content System]].
- [ ] Consider the same demo treatment for other C++ games if desired (Game 2 is a locked placeholder).
- [ ] Decide whether to trim **Surfers Quest's** 75 MB `.data` before public GitHub Pages hosting
      (Bomberman at ~10 MB is already fine) → [[GitHub Pages Deployment]].
- [ ] Carry the still-open native MP4 export work forward (unrelated) → [[Portfolio Asset Requirements Table]].

## Important Project Decisions
- **Reuse over re-port.** The SFML→SDL2 shim, IDBFS pattern, build pipeline, and embed/mute pattern
  from Surfers Quest were reused wholesale; only Bomberman-specific glue was added.
- **Additive integration, not a redesign.** A new `PlayableDemo` component + one slug branch + two
  CSS aliases — the Surfers Quest demo, other project pages, and the Arcade Machine reveal were not
  modified.
- **Mistakes from the first extraction explicitly avoided:** no tiny scrolling iframe (stripped embed
  + fixed-aspect container), mute overlay kept outside the game, no media/cards deleted, GitHub-Pages
  case-sensitive paths preserved, and a build-failed fallback added.
- **Web build stays isolated from the native arcade build** (guarded `src_web`/`sfml_shim`/`web`
  trees + `BOMBERMAN_WEB_BUILD`); the only native touch is a standard missing include.

## Related Notes
- [[Portfolio Website - Master Hub]] · [[Current Status]] · [[Next Actions]]
- [[Data Driven Project System]] · [[GitHub Pages Deployment]] · [[Editable Text Content System]]
- [[CHECKPOINT 14 - Extracted Surfers Quest]] · [[Checkpoint Hub]]
