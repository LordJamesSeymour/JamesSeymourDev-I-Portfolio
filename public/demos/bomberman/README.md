# Bomberman — Web Demo

A browser-playable build of the **Bomberman-style game** (the "Game 0" slice of
my C++17 / SFML 3 arcade project), compiled to WebAssembly with Emscripten via an
SFML 3 → SDL2 compatibility shim.

## Files in this folder

| File | Source | Notes |
|------|--------|-------|
| `embed.html` | hand-authored | Stripped canvas page loaded by the project-page iframe. Page-level title/controls/mute live in the React app, not here. |
| `README.md` | hand-authored | This file. |
| `bomberman.js` | **build output** | Emscripten glue. |
| `bomberman.wasm` | **build output** | Compiled game + shim. |
| `bomberman.data` | **build output** | Packaged assets (~10 MB: textures/audio/font/default maps). |

The three build outputs are produced by the build script (below); `embed.html`
expects them next to it.

## How it's embedded

The Bomberman project page (`/projects/bomberman-style-game`) embeds
`embed.html` in a fixed-aspect iframe via the reusable
`src/components/projects/PlayableDemo.tsx`. The page provides the heading,
controls, fullscreen, "Reset browser maps", and a **mute overlay** (top-left,
outside the canvas) that talks to the iframe over `postMessage`. The embed page
itself is just the full-viewport canvas, so there is no inner scrollbar.

## How map saves work in the browser

- The level editor saves maps into **this browser's IndexedDB** (Emscripten
  IDBFS), not to the website's files.
- Saved maps are private to this browser/device — never uploaded or shared.
- On first launch the shipped default levels + templates are seeded into that
  storage so level-select is never empty.
- "Reset browser maps" (button on the project page, or `BombermanResetMaps()` in
  the console) clears them and restores the defaults on reload.

## Rebuilding

From the game repo (`C:\Users\james\OneDrive\Escritorio\LowLevelY3`):

```powershell
.\build_web_bomberman.ps1
```

It installs Emscripten (first run only), builds the `bomberman` target, and
copies `bomberman.js/.wasm/.data` into this folder. Details and the full
extraction write-up are in `WEB_PORT_NOTES.md` in the game repo.

## Controls

**Play:** `WASD` / arrows move · `Space` place bomb · `E`/`Shift` punch · `R`
restart · `Esc` back to menu.
**Editor:** left-click paint · right-click erase · middle-click pick · scroll
hotbar · `F5` save · `Esc` leave.

## Known limitations

- Single player, keyboard + mouse only (no gamepad).
- Audio starts after the first click (browser autoplay policy); the mute button
  controls it from the page.
