# Portfolio Asset Requirements Table

> **Status:** Active — created during Phase 2 (Premium 2D Visual Redesign), 2026-06-11.
> The single checklist of every real asset needed to take each project from a styled
> **placeholder** to a finished, media-rich case study. The site already renders cleanly
> without any of these (polished generated placeholders fill the gaps) — this table is the
> plan for *upgrading* it as assets arrive.
>
> Wiring assets in is data-driven: add `cover` / `media` / `thumbnail` / `screenshots` /
> `logo` / `showcaseVideo` / `immersive.model` to the matching entry in
> [`src/data/projects.ts`](../../src/data/projects.ts). Schema:
> [`src/types/project.ts`](../../src/types/project.ts) ·
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
| EOS Dedicated Server | C++ | **In progress** ✅ media wired | 🔴 High | Server console | ✅ MP4 preview + ✅ 2 YouTube clips (carousel) | — (floating-card) | Architecture, session flow, tech stack | `public/EOS/` |
| Basilisk Engine | C++ | **In progress** ✅ media wired | 🔴 High | Editor, scene hierarchy | ✅ MP4 preview + ✅ YouTube showcase | ✅ logo wired | Scope, subsystems, challenges | `public/Basilisk/` |
| Cursor.zip | C# | **In progress** ✅ media wired | 🟡 Medium | ✅ project logo; a few stills still useful | ✅ 8 s MP4 preview + poster · ✅ YouTube trailer | — (video-screen) | **Define what it is** + final name | `public/Cursor/` |
| Zombies VR | C# | Placeholder | 🔴 High | In-headset stills | VR gameplay, combat/interaction clip | — (video-screen) | Engine + headset, interactions | `public/media/zombies-vr/` |
| Hammer Moonbase Map | Level Design | **In progress** ✅ media wired | 🟡 Medium | ✅ card thumbnail · Hammer editor/top-down still needed | ✅ YouTube flyby | — (environment) | Layout, flow & pacing notes | `public/Hammer/` |

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

> **Current delivered paths:** Cursor.zip preview:
> `public/Cursor/Videos/cursor-short.mp4` (+ `cursor-short-poster.jpg`); logo:
> `public/Cursor/cursor-zip-logo.png`. Hammer thumbnail: `public/Hammer/HammerMap.png`.
> Basilisk Engine: logo `public/Basilisk/basilisk-logo.png`, preview
> `public/Basilisk/Videos/basilisk-short.mp4`, YouTube showcase `EFVWiAf81z0`.
> EOS Dedicated Server: logo `public/EOS/EOS-logo.png`, preview
> `public/EOS/Videos/eos-short.mp4`, YouTube carousel `qfgG6GS0QKE` + `EYpZmPbpHGE`.

---

## Per-project detail

> **Local video policy (2026-06-12):**
> - Preview videos are manually exported as real H.264 MP4 files and placed directly in each
>   project's `public/<Project>/Videos/` folder.
> - The website references that supplied MP4 directly. Codex must not trim, transcode, overwrite,
>   duplicate, or generate fixed-duration preview snippets unless explicitly requested.
> - Playback uses the native HTML video `loop` attribute, so the browser plays the complete file
>   before returning to the beginning. There is no JavaScript preview-duration cap.
> - Arcade Machine browser path: `/ArcadeMachine/Videos/ArcadeShort.mp4`.
> - Bomberman-style Game browser path: `/SuperBomberman/Videos/bomberman-short.mp4`.
> - Surfers Quest browser path: `/SurfersQuest/Videos/surfers-short.mp4`.
> - Cursor.zip browser path: `/Cursor/Videos/cursor-short.mp4` (matching the Git-tracked filename
>   used by case-sensitive GitHub Pages).
> - Basilisk Engine browser path: `/Basilisk/Videos/basilisk-short.mp4`.
> - EOS Dedicated Server browser path: `/EOS/Videos/eos-short.mp4` (folder + logo `EOS-logo.png`
>   are uppercase — must match exactly on case-sensitive GitHub Pages).
>
> Current validation note: the four files presently carrying `.mp4` names have ASF/WMV file
> signatures rather than MP4 containers. They must be manually exported as genuine MP4 files at
> the paths above. Until then, the shared media system falls back to the polished placeholder.

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
- **Logo:** ✅ `/EOS/EOS-logo.png` wired to the detail-page header.
- **Preview:** ✅ `/EOS/Videos/eos-short.mp4` — card cover + detail hero (native loop, muted, inline).
- **Showcase videos:** ✅ two YouTube clips (`qfgG6GS0QKE`, `EYpZmPbpHGE`) rendered as a
  two-dot `<YouTubeCarousel/>` on the detail page (arrows + Instagram-style dots).
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
- **Logo:** ✅ `/Basilisk/basilisk-logo.png` wired to the detail-page header.
- **Preview:** ✅ `/Basilisk/Videos/basilisk-short.mp4` — card cover + detail hero (native loop,
  muted, inline). (Engine also has `/Basilisk/basilisk-ascii.txt`, used by the page background.)
- **Showcase video:** ✅ YouTube `EFVWiAf81z0` embedded on the detail page (single `<YouTubeEmbed/>`).
- **Screenshots:** editor overview, scene hierarchy/inspector, viewport.
- **Videos:** viewport interaction (cover), gizmo/inspector manipulation clip.
- **Written:** engine scope & goals, key subsystems, architecture decisions, challenges.
- **Optional extra:** engine logo / 3D mark, before/after of a subsystem.
- **Suggested files:** `basilisk-engine-cover.mp4` (+`.jpg`), `basilisk-engine-editor.jpg`,
  `basilisk-engine-hierarchy.jpg`.
- **Notes for James:** an editor capture showing live manipulation is the strongest proof of
  engine work — aim for one smooth 8–12s clip.

### Cursor.zip — C# · 🟡 Medium · showcase: `video-screen`
- **Preview path:** `/Cursor/Videos/cursor-short.mp4`; replace it with the manually exported,
  full-duration H.264 MP4. The browser plays the entire supplied file and loops natively.
- **Poster:** ✅ `/Cursor/Videos/cursor-short-poster.jpg` for first paint and reduced motion.
- **Trailer:** ✅ YouTube `g4LTAYN-QgE` embedded on the detail page.
- **Logo:** ✅ web-safe copy at `/Cursor/cursor-zip-logo.png`; original file preserved.
- **Still needed:** a clear one-line **definition of what Cursor.zip is**, the **final public
  title**, and 1–2 screenshots.
- **Notes for James:** confirm whether "Cursor.zip" is the public-facing name or a working title.

### Zombies VR — C# · 🔴 High · showcase: `video-screen`
- **Screenshots:** in-headset gameplay stills, thumbnail.
- **Videos:** VR gameplay (cover), interaction/combat clip.
- **Written:** engine (Unity?) + target headset/platform, core interactions.
- **Optional extra:** hand-tracking/locomotion showcase, mixed-reality capture.
- **Suggested files:** `zombies-vr-cover.mp4` (+`.jpg`), `zombies-vr-01.jpg`, `zombies-vr-thumb.jpg`.
- **Notes for James:** confirm headset (Quest? PCVR?) — recruiters ask. MR capture (player +
  game composited) is the premium option if you can get it.

### Hammer Moonbase Map — Level Design · 🟡 Medium · showcase: `environment`
- **Thumbnail:** ✅ `/Hammer/HammerMap.png` is wired to the project card and detail hero.
- **Screenshots still needed:** Hammer editor view and annotated top-down layout image.
- **Video:** ✅ YouTube flyby/walkthrough `TF4499mnCWE` embedded on the detail page.
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
