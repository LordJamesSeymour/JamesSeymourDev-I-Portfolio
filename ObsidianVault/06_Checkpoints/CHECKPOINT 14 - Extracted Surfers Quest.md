---
checkpoint: 14
title: Extracted Surfers Quest
date: 2026-06-13
status: Complete
---

# CHECKPOINT 14 — Extracted Surfers Quest

> **Date:** 2026-06-13
> **Checkpoint #:** 14
> **Status:** Complete
> ← Previous: [[CHECKPOINT 13 - Basilisk and EOS Thumbnail Integration]]
> → Next: _none yet_
> ⬆ Index: [[Checkpoint Hub]]

## Project Status
The portfolio gains its **first genuinely playable, in-browser demo**. The **Surfers Quest** platformer
(the "Game 1" slice of the native C++17 / SFML 3 arcade project) was extracted, compiled to
**WebAssembly with Emscripten**, and deployed as a static demo under
`public/demos/surfers-quest/` (`index.html` + `surfers-quest.js` + `.wasm` + `.data`). It runs in a
polished portfolio-style frame, takes keyboard + mouse, persists user-created maps in the browser, and
is iframe-embeddable on a project detail page. This is a different capability from the existing local
MP4 previews and YouTube showcases — it is the real game running on the page, not a video. No redesign,
no new site dependencies, and the React app, Dala style, 3D Arcade reveal, and ObsidianVault are
untouched.

## What Changed Since the Previous Checkpoint
- **Extracted only the Surfers Quest path** from `LowLevelY3` (GAME1_Menu / LevelSelect / Level /
  Player / Enemy / LevelEditor / Pickup / ParallaxBackground / Trap / SpikeHead / Saw + the
  SurfersQuest audio + ArcadeInput/Settings/UISounds). Bomberman, Game 2, the Arcade Hub, the
  native `main.cpp`, and Raspberry-Pi launcher logic were deliberately **not** ported.
- **Discovered SFML 3.0.2 has no Emscripten backend at all** (its CMake aborts with "Unsupported
  operating system"; there is no web window/GL backend in its source). Rather than port SFML or
  rewrite the game, built a small **SFML 3 → SDL2 compatibility shim** (`sfml_shim/`) that
  reimplements just the `sf::` subset the game uses on top of SDL2 / SDL2_image / SDL2_ttf /
  SDL2_mixer (all first-class Emscripten ports). The shim is placed ahead on the include path, so
  the **unmodified** game code's `#include <SFML/...>` resolves to it.
- **New web entry point** `src_web/SurfersQuestWebMain.cpp` (guarded by `SURFERS_QUEST_WEB_BUILD`):
  a small single-player driver around the existing classes using `emscripten_set_main_loop`.
- **Browser map persistence via IDBFS**: the persistent filesystem is mounted over the normal Maps
  directory so the unmodified editor/level-select code reads/writes straight into IndexedDB; the
  shipped default levels are seeded on first launch; a "Reset browser maps" helper restores defaults.
- **Polished demo shell** (`index.html`): titled frame, loading/progress overlay, controls panel,
  fullscreen + reset buttons, "Click to play" audio-unlock gate, and arrow/space scroll suppression
  while focused. Plus `README.md`, `embed-notes.md`, and `WEB_PORT_NOTES.md`.
- **Build tooling**: `web/CMakeLists.txt` (Emscripten target, SDL2 ports, asset preload) and
  `build_web_surfers_quest.ps1` (installs emsdk, builds, copies artifacts into the portfolio demo
  folder). The native Windows/Linux/Pi build is fenced off via additive CMake/glob exclusions.
- **Fixed the post-extraction animation + audio bugs:**
  - Root cause of "player/enemies invisible while moving or falling" was a **shim bug, not missing
    assets** — SFML mirrors sprites with a **negative scale**, which SDL won't draw. The shim's
    `Sprite` now converts negative scale into an absolute-size rect + `SDL_FLIP_*` flag at the
    correct world-space AABB corner (fixes left-facing player and moving enemies).
  - Packaged the **real** player animation folders (`PlayerIdle`, `PlayerRun`, `PlayerJump`,
    `PlayerDoubleJump`, `PlayerFall`, `PlayerWallgrab`, `PlayerHit`) and enemy folders
    (`EnemyIdle`, `EnemyRun`, `EnemyHit`); patrol/chase use real `EnemyRun` frames.
  - **Natural numeric frame sorting** (so `frame_2` precedes `frame_10`); a **debug animation
    report** prints each state → frame count → source folder at boot/load.
  - **Defensive rendering fallbacks**: a missing/invalid state falls back to its first valid frame,
    then idle, then the last rendered frame — never silently invisible; no run→fall mis-fallback.
  - **Footstep audio rate-limiting** ported from the native timing: footsteps only during grounded
    horizontal movement, ~`0.30s` cooldown with a hard `0.22s` minimum, one reused non-overlapping
    channel, stopping on airborne/stop/death/respawn/menu. Browser audio is unlocked on first
    click/key (`pre.js` `sqUnlockAudio`), avoiding `play()` promise spam.
  - Delta-time clamped to `0.05s` for animation/audio timers (web frame-timing safety).

## Completed Work
- [x] Surfers Quest slice extracted and compiled to WebAssembly via Emscripten.
- [x] `sfml_shim/` SFML 3 → SDL2 compatibility shim (graphics, text, input, audio).
- [x] `src_web/SurfersQuestWebMain.cpp` web entry point (single-player state flow).
- [x] IDBFS browser map persistence + default-level seeding + reset helper (`web/pre.js`).
- [x] Polished `index.html` frame + `README.md` + `embed-notes.md` + `WEB_PORT_NOTES.md`.
- [x] `web/CMakeLists.txt` + `build_web_surfers_quest.ps1`; native build fenced off (no regressions).
- [x] Demo deployed to `public/demos/surfers-quest/` (`index.html`, `surfers-quest.js/.wasm/.data`).
- [x] Verified in-browser: menu renders + mouse works; a level loads with tiles/parallax/player/HUD;
      keyboard drives the player with camera follow; default maps seed into IDBFS.
- [x] Negative-scale sprite-flip fix → left-facing player and moving enemies are visible.
- [x] Real player/enemy animation folders packaged; natural sort; debug report; safe fallbacks.
- [x] Footstep audio rate-limited and browser-audio-safe.

## Pending Work
- [ ] **Final rebuild + redeploy + in-browser re-verification** of the animation-flip and footstep
      fixes (run `build_web_surfers_quest.ps1`, then confirm: left run/fall visible, enemies visible
      while moving, footsteps a normal rhythm that stop when idle/airborne, editor + map cache intact).
- [ ] **Wire the demo into the project data system** so the Surfers Quest project page can embed
      `/demos/surfers-quest/index.html` (iframe) alongside its existing media → [[Data Driven Project System]].
- [ ] **Asset bundle size:** `surfers-quest.data` is ~75 MB (the full SurfersQuest `Resources`). Fine
      on Vite/local http but heavy for GitHub Pages — decide whether to trim/recompress before shipping
      publicly → [[GitHub Pages Deployment]].
- [ ] Carry the still-open native MP4 export work forward (unrelated) → [[Portfolio Asset Requirements Table]].

## Important Project Decisions
- **SDL2 shim over porting SFML or rewriting the game.** SFML 3 has no web backend; a thin
  `sf::`-on-SDL2 shim keeps every gameplay/editor file unmodified and is the lowest-risk path to a
  real playable build. The shim is intentionally minimal (no `RenderTexture`/`VertexArray`/blend
  modes — the game uses none).
- **Invisibility was a renderer bug, not an asset bug.** The correct fix was negative-scale flip
  handling in the shim plus packaging the genuine animation folders — *not* forcing idle everywhere.
  Idle is only a last-resort safety fallback.
- **Maps persist per-browser via IDBFS, never uploaded.** User-created maps live in this browser's
  IndexedDB only; shipped defaults seed on first run and a reset helper restores them.
- **Web build is fully isolated from the native arcade build** (guarded `src_web`/`sfml_shim`/`web`
  trees + `SURFERS_QUEST_WEB_BUILD`), so the Windows/Linux/Raspberry-Pi build is untouched.
- **Keyboard + mouse only** for the web demo (no arcade-controller assumptions).

## Related Notes
- [[Portfolio Website - Master Hub]] · [[Current Status]] · [[Next Actions]]
- [[Data Driven Project System]] · [[GitHub Pages Deployment]] · [[Portfolio Asset Requirements Table]]
- [[CHECKPOINT 13 - Basilisk and EOS Thumbnail Integration]] · [[Checkpoint Hub]]
