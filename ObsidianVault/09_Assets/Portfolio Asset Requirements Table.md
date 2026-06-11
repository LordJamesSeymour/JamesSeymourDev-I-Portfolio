# Portfolio Asset Requirements Table

> **Status:** Active — created during Phase 2 (Premium 2D Visual Redesign), 2026-06-11.
> The single checklist of every real asset needed to take each project from a styled
> **placeholder** to a finished, media-rich case study. The site already renders cleanly
> without any of these (polished generated placeholders fill the gaps) — this table is the
> plan for *upgrading* it as assets arrive.
>
> Wiring assets in is data-only: add `cover` / `media` / `thumbnail` / `screenshots` /
> `immersive.model` to the matching entry in [`src/data/projects.ts`](../../src/data/projects.ts).
> No component changes required. Schema: [`src/types/project.ts`](../../src/types/project.ts) ·
> see [[Data Driven Project System]] · [[Image Requirements]] · [[Video Capture Requirements]] ·
> [[3D Asset Requirements]] · [[Placeholder Asset Rules]].

---

## How the site uses these assets (render fallback chain)

For each project the page decides what to show, in this order:

1. **Real video** (`cover.type: "video"`) — looping, muted, inline; swaps to its `poster`
   under reduced-motion.
2. **Real image / gif** (`cover` or `thumbnail`).
3. **3D-ready placeholder** — caption reflects the planned `immersive.showcaseType`
   (e.g. *"3D model coming soon"*).
4. **"Media coming soon" panel** — the default on-brand cosmic placeholder (never an empty box).
5. **"James input needed" note** — a small amber dev-only badge listing what's missing
   (from `missingAssets`). Visible **only** in `npm run dev`; never shipped to the public site.

**Priority key:** 🔴 High = featured / first to finish · 🟡 Medium · ⚪ Low.

---

## Master table

| Project | Category | Status | Priority | Screenshots | Videos | 3D model | Written content | Suggested folder |
|---|---|---|---|---|---|---|---|---|
| Arcade Machine | C++ | Placeholder | 🔴 High | Cabinet photo, menu UI | Gameplay loop, menu nav, feature clip | ✅ **Delivered & wired** — `PiecedTogether.glb` (scroll-reveal) | Overview, role, tech, outcome | `public/media/arcade-machine/` · model: `public/models/arcade-machine/` |
| Surfers Quest | C++ | Placeholder | 🟡 Medium | Gameplay, level editor | Gameplay clip, movement clip | — (video-screen) | Overview, mechanics | `public/media/surfers-quest/` |
| Bomberman-style Game | C++ | Placeholder | 🟡 Medium | Gameplay, level editor | Bomb/explosion clip | — (video-screen) | Overview **+ choose original name** | `public/media/bomberman-style-game/` |
| EOS Dedicated Server | C++ | Placeholder | 🔴 High | Server console | (optional screen-capture) | — (floating-card) | Architecture, session flow, tech stack | `public/media/eos-dedicated-server/` |
| Basilisk Engine | C++ | Placeholder | 🔴 High | Editor, scene hierarchy | Viewport interaction, gizmo/inspector | optional engine mark | Scope, subsystems, challenges | `public/media/basilisk-engine/` |
| Cursor.zip | C# | **In progress** ✅ video wired | 🟡 Medium | A few stills | ✅ `CursorGameplay.mp4` (add poster) | — (video-screen) | **Define what it is** + final name | `public/media/cursor-zip/` |
| Zombies VR | C# | Placeholder | 🔴 High | In-headset stills | VR gameplay, combat/interaction clip | — (video-screen) | Engine + headset, interactions | `public/media/zombies-vr/` |
| Hammer Moonbase Map | Level Design | Placeholder | 🟡 Medium | In-game, Hammer editor, top-down | Walkthrough video | — (environment) | Layout, flow & pacing notes | `public/media/hammer-moonbase-map/` |

---

## File-naming & folder convention

Keep it predictable so wiring assets is copy-paste:

- **One folder per project:** `public/media/<slug>/` (slug matches `projects.ts`).
- **Cover video:** `<slug>-cover.mp4` + poster `<slug>-cover.jpg`.
- **Thumbnail:** `<slug>-thumb.jpg` (1280×720, 16:9).
- **Screenshots:** `<slug>-01.jpg`, `<slug>-02.jpg`, …
- **3D models:** `public/models/<slug>.glb` (Draco-compressed).
- **Reference in data** as web paths: `"/media/<slug>/<slug>-cover.mp4"`, `"/models/<slug>.glb"`.
- Budgets (see [[Video Capture Requirements]] / [[3D Asset Requirements]]): video loops short &
  compressed (≤ ~1–2 MB), images `.webp`/`.jpg` sized to display, GLB ≤ ~1–3 MB.

> **Note:** the already-wired `Cursor.zip` clip currently lives at `public/CursorGameplay.mp4`.
> It works as-is; optionally move it to `public/media/cursor-zip/cursor-zip-cover.mp4` later for tidiness.

---

## Per-project detail

### Arcade Machine — C++ · 🔴 High · showcase: `model` (scroll-reveal / exploded-view)
- **Screenshots:** cabinet photo (the physical machine), menu/attract-mode UI, thumbnail.
- **Videos:** gameplay loop (cover), menu-navigation walkthrough, short feature showcase clip.
- **3D model:** ✅ **delivered & wired** — `public/models/arcade-machine/PiecedTogether.glb` (~5 MB,
  assembled multi-part cabinet). Drives the live scroll-driven **exploded-view** showcase section
  (`#arcade-build`). Set in data via `immersive.model` + `immersive.revealType: "exploded-view"`.
  Parts: `Chasis`, `Lid`, `Lable`, `Butttonpannel`, `Screem`, `Coinpannel`, `RaspberryPi`. Future:
  Draco compression + truer pivots/materials. See [[3D Asset Requirements]] §8 · [[Immersive 3D Direction]] §9b.
- **Written:** what the project is, James's role, tech, notable challenges, final result.
- **Optional extra:** marquee art, control-panel close-up, build/BOM photos.
- **Suggested files:** `arcade-machine-cover.mp4` (+`.jpg`), `arcade-machine-menu.mp4`,
  `arcade-machine-cabinet.jpg`, `arcade-machine-thumb.jpg`, `models/arcade-machine.glb`.
- **Notes for James:** highest-wow project — the physical cabinet + a real 3D model is the
  signature moment. Prioritise the cabinet photo and one clean gameplay loop first.

### Surfers Quest — C++ · 🟡 Medium · showcase: `video-screen`
- **Screenshots:** in-game gameplay (2–3), level-editor view if you have one, thumbnail.
- **Videos:** short gameplay clip (cover), player-movement showcase.
- **Written:** overview + core mechanic / what makes it interesting.
- **Optional extra:** early-vs-final comparison, tooling shots.
- **Suggested files:** `surfers-quest-cover.mp4` (+`.jpg`), `surfers-quest-01.jpg`,
  `surfers-quest-editor.jpg`, `surfers-quest-thumb.jpg`.
- **Notes for James:** a 5–8s movement loop sells this well; doesn't need a model.

### Bomberman-style Game — C++ · 🟡 Medium · showcase: `video-screen`
- **Decision first:** ⚠️ pick an **original, non-trademarked public name** (rename the entry's
  `name`; keep the `slug` or update it consistently).
- **Screenshots:** gameplay grid, level-editor view, thumbnail.
- **Videos:** bomb/explosion gameplay clip (cover).
- **Written:** overview, mechanics, what you built vs. used.
- **Optional extra:** power-up showcase, multiplayer shot.
- **Suggested files:** `bomberman-style-game-cover.mp4` (+`.jpg`), `bomberman-style-game-01.jpg`.
- **Notes for James:** use original, non-copyrighted art for any public capture.

### EOS Dedicated Server — C++ · 🔴 High · showcase: `floating-card`
- **Screenshots:** server console output, optional dashboard/log capture.
- **Videos:** optional — a short console/session screen-capture if it reads well.
- **Diagrams (key):** architecture diagram, network/session flow diagram.
- **Written:** what it does, EOS features used, session lifecycle, tech stack.
- **Optional extra:** latency/scaling notes, infra diagram.
- **Suggested files:** `eos-dedicated-server-architecture.png`,
  `eos-dedicated-server-flow.png`, `eos-dedicated-server-console.jpg`.
- **Notes for James:** this is a *systems* project — clean diagrams + a tight written
  explanation carry it further than gameplay footage. Don't expose private keys/endpoints.

### Basilisk Engine — C++ · 🔴 High · showcase: `video-screen`
- **Screenshots:** editor overview, scene hierarchy/inspector, viewport.
- **Videos:** viewport interaction (cover), gizmo/inspector manipulation clip.
- **Written:** engine scope & goals, key subsystems, architecture decisions, challenges.
- **Optional extra:** engine logo / 3D mark, before/after of a subsystem.
- **Suggested files:** `basilisk-engine-cover.mp4` (+`.jpg`), `basilisk-engine-editor.jpg`,
  `basilisk-engine-hierarchy.jpg`.
- **Notes for James:** an editor capture showing live manipulation is the strongest proof of
  engine work — aim for one smooth 8–12s clip.

### Cursor.zip — C# · 🟡 Medium · showcase: `video-screen`
- **Status:** ✅ gameplay video already wired (`/CursorGameplay.mp4`).
- **Still needed:** a clear one-line **definition of what Cursor.zip is**, the **final public
  title**, a poster frame for the video, and 1–2 screenshots.
- **Suggested files:** `cursor-zip-cover.jpg` (poster), `cursor-zip-01.jpg`.
- **Notes for James:** add a `poster` to the cover so reduced-motion users see a still; confirm
  whether "Cursor.zip" is the public-facing name or a working title.

### Zombies VR — C# · 🔴 High · showcase: `video-screen`
- **Screenshots:** in-headset gameplay stills, thumbnail.
- **Videos:** VR gameplay (cover), interaction/combat clip.
- **Written:** engine (Unity?) + target headset/platform, core interactions.
- **Optional extra:** hand-tracking/locomotion showcase, mixed-reality capture.
- **Suggested files:** `zombies-vr-cover.mp4` (+`.jpg`), `zombies-vr-01.jpg`, `zombies-vr-thumb.jpg`.
- **Notes for James:** confirm headset (Quest? PCVR?) — recruiters ask. MR capture (player +
  game composited) is the premium option if you can get it.

### Hammer Moonbase Map — Level Design · 🟡 Medium · showcase: `environment`
- **Screenshots:** in-game beauty shots, Hammer editor view, top-down layout image.
- **Videos:** walkthrough video (cover) showing flow.
- **Written:** layout/flow/pacing rationale, target game / Source branch.
- **Optional extra:** annotated top-down (sightlines, cover, objectives).
- **Suggested files:** `hammer-moonbase-map-cover.mp4` (+`.jpg`), `hammer-moonbase-map-topdown.jpg`,
  `hammer-moonbase-map-editor.jpg`.
- **Notes for James:** the annotated top-down is gold for a level-design portfolio — it shows
  intent, not just looks.

---

## When you have an asset — the 2-minute wiring recipe

1. Drop the file in `public/media/<slug>/` (or `public/models/`).
2. Open [`src/data/projects.ts`](../../src/data/projects.ts), find the project, add e.g.:
   ```ts
   cover: { type: "video", src: "/media/arcade-machine/arcade-machine-cover.mp4",
            poster: "/media/arcade-machine/arcade-machine-cover.jpg",
            alt: "Arcade Machine gameplay loop" },
   thumbnail: "/media/arcade-machine/arcade-machine-thumb.jpg",
   screenshots: [{ type: "image", src: "/media/arcade-machine/arcade-machine-cabinet.jpg",
                   alt: "The arcade cabinet" }],
   ```
3. Remove the satisfied item from `missingAssets`; flip `status` to `"in-progress"` →
   `"complete"` as content fills in.
4. `npm run dev` to verify; the card/detail page swaps from placeholder to real media
   automatically.

## Related
- [[Data Driven Project System]] · [[Image Requirements]] · [[Video Capture Requirements]]
- [[3D Asset Requirements]] · [[Placeholder Asset Rules]] · [[Asset Collection Checklist]]
- [[Design System Brief]] · [[Missing Content Checklist]]
