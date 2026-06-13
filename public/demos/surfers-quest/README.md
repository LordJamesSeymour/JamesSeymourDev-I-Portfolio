# Surfers Quest — Web Demo

A browser-playable build of the **Surfers Quest** platformer (the Game 1 slice of
my C++17 / SFML 3 arcade project), compiled to WebAssembly with Emscripten.

## Files in this folder

| File | Source | Notes |
|------|--------|-------|
| `index.html` | hand-authored | Polished demo frame (canvas + controls + loader). Safe to commit. |
| `README.md` | hand-authored | This file. |
| `embed-notes.md` | hand-authored | How to embed the demo in a React/Vite page. |
| `surfers-quest.js` | **build output** | Emscripten glue. Produced by the build script. |
| `surfers-quest.wasm` | **build output** | Compiled game + SFML 3. |
| `surfers-quest.data` | **build output** | Packaged assets (textures/audio/fonts/default maps). Large (~tens of MB). |

The three build outputs are **not** generated until you run the build script in
the game repo (see below). `index.html` expects them to sit next to it.

## How to run it locally

The `.wasm` / `.data` files must be served over **http** — opening `index.html`
directly with `file://` will fail (browsers block `fetch` of local files).

From the portfolio root:

```bash
# Vite dev server (public/ is served at the web root)
npm run dev
# then open:  http://localhost:5173/demos/surfers-quest/index.html

# …or any static server:
npx serve public
python -m http.server 8000 --directory public
```

## Building the WebAssembly artifacts

These are produced in the **game** repo, not here:

```powershell
# in C:\Users\james\OneDrive\Escritorio\LowLevelY3
.\build_web_surfers_quest.ps1
```

The script installs Emscripten (first run only), cross-compiles SFML 3 + the
Surfers Quest slice, and copies `surfers-quest.js/.wasm/.data` into this folder.
Full details and troubleshooting are in `WEB_PORT_NOTES.md` in the game repo.

## Animation and audio behavior

- UI text uses the packaged original `assets/menu.ttf`. The web renderer uses
  SDL_ttf blended glyphs, one native outline pass, integer-aligned text, and
  normal browser canvas scaling so HUD/menu/editor text remains readable.
- `surfers-quest.data` packages the real player folders: `PlayerIdle`,
  `PlayerRun`, `PlayerJump`, `PlayerDoubleJump`, `PlayerFall`,
  `PlayerWallgrab`, and `PlayerHit`.
- It also packages `EnemyIdle`, `EnemyRun`, and `EnemyHit`. Patrol and chase use
  the real `EnemyRun` frames.
- Frames are naturally sorted by trailing number. The browser console prints
  each animation state, frame count, and source folder at startup/load time.
- If an optional state is genuinely missing or invalid, rendering falls back to
  that state's first valid frame, then idle, then the last rendered frame.
- Web animation timing is `0.14s` per idle frame, `0.10s` per player run frame,
  and `0.12s` per enemy movement frame. Delta time is clamped to `0.05s`.
- Browser footsteps play only during grounded horizontal movement, use a
  `0.30s` cooldown (hard minimum `0.22s`), and reuse one non-overlapping sound
  channel. They stop when movement stops, the player is airborne, gameplay
  ends, or the player dies/respawns. The first click/key unlocks browser audio.
- The original asset set has one jump frame and one fall frame, so those states
  are correct visible poses rather than multi-frame sequences.

## How map saves work in the browser

- The level editor saves maps into **this browser's IndexedDB** (via Emscripten
  IDBFS), not to the website's files.
- Saved maps are **private to this browser/device**. They are never uploaded to
  GitHub and are not shared between users or machines.
- On first launch the shipped default levels are copied into that storage so the
  level-select screen is never empty.
- A save survives a page refresh; the level-select screen reads from the
  persistent storage first.

### Reset / clear cached maps

- Click **“Reset browser maps”** under the game, **or**
- run `SurfersQuestResetMaps()` in the browser devtools console.

Either one deletes the maps stored in this browser and restores the shipped
defaults on reload.

## Embedding

See [`embed-notes.md`](embed-notes.md) for an `<iframe>` snippet and a React
component example.

## Known limitations

- **Single player only** (no local co-op). Keyboard + mouse only — no gamepad.
- The full native victory/score screen is replaced by a simple “Level complete”
  banner.
- Audio starts after the first click (browser autoplay policy) — hence the
  “Click to play” gate.
- First load downloads the asset bundle (`.data`), which can be sizeable; a
  progress bar is shown.
