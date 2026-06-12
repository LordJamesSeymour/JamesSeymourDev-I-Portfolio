# Asset Collection Checklist

> **Status:** Needs James Input
> Assets hub. Track everything James needs to gather/provide.

## Per Project
For each of the 8 projects → see each note's "Media Needed":
- [ ] Thumbnail / poster
- [ ] Screenshots (2–4)
- [ ] **Looping cover video** (4–8 s, muted, 16:9) — used by `CoverMedia` **and** the 3D `VideoScreen`
- [ ] Optional diagram / editor footage
- [ ] **Optional 3D model (GLB)** — only for model-candidate projects → [[3D Asset Requirements]]

Projects: [[Arcade Machine]] *(3D flagship)*, [[Surfers Quest]], [[Bomberman Style Game]],
[[EOS Dedicated Server]], [[Basilisk Engine]], [[Cursor Zip]], [[Zombies VR]],
[[Hammer Moonbase Map]].

## Delivered Project Media
- [x] **Arcade Machine:** project logo collected at
  `public/ArcadeMachine/arcade-logo.png`.
- [ ] **Arcade Machine:** manually export a genuine H.264 MP4 to
  `public/ArcadeMachine/Videos/ArcadeShort.mp4` (do not rename WMV or create a fixed-length snippet).
- [x] **Bomberman-style Game:** project logo collected at
  `public/SuperBomberman/bomberman-logo.png`.
- [ ] **Bomberman-style Game:** manually export a genuine H.264 MP4 to
  `public/SuperBomberman/Videos/bomberman-short.mp4` (no Codex trimming or recompilation).
- [x] **Surfers Quest:** project logo collected at
  `public/SurfersQuest/surfers-logo.png`.
- [ ] **Surfers Quest:** manually export a genuine H.264 MP4 to
  `public/SurfersQuest/Videos/surfers-short.mp4` (no fixed-duration snippet).
- [ ] **Cursor.zip:** manually export a genuine H.264 MP4 to
  `public/Cursor/Videos/cursor-short.mp4`; the poster is already present.
- [x] **Cursor.zip:** project logo copied to `public/Cursor/cursor-zip-logo.png`.
- [x] **Cursor.zip:** YouTube trailer collected (`g4LTAYN-QgE`).
- [x] **Hammer Moonbase Map:** card/detail thumbnail collected at `public/Hammer/HammerMap.png`.
- [x] **Hammer Moonbase Map:** YouTube flyby/walkthrough collected (`TF4499mnCWE`).
- [x] **Basilisk Engine:** project logo collected at `public/Basilisk/basilisk-logo.png`.
- [x] **Basilisk Engine:** local MP4 thumbnail/preview at `public/Basilisk/Videos/basilisk-short.mp4`
  (card cover + detail hero, native loop).
- [x] **Basilisk Engine:** YouTube showcase collected (`EFVWiAf81z0`) → embedded on the detail page.
- [x] **EOS Dedicated Server:** project logo collected at `public/EOS/EOS-logo.png`.
- [x] **EOS Dedicated Server:** local MP4 thumbnail/preview at `public/EOS/Videos/eos-short.mp4`
  (card cover + detail hero, native loop).
- [x] **EOS Dedicated Server:** two YouTube showcases collected (`qfgG6GS0QKE`, `EYpZmPbpHGE`) →
  shown as a two-dot carousel on the detail page.

## Site-Wide
- [ ] Hero background / imagery.
- [ ] About photo (optional).
- [ ] Favicon / site icon.
- [ ] Open Graph / social share image.
- [ ] CV / resume → [[CV And Contact Assets]].

## Specs
- Local project videos are used directly from `public/<Project>/Videos/`, play their full
  duration, and loop through the native HTML video `loop` attribute.
- Codex must not create shortened duplicates, duration-limited snippets, or replacement encodes
  unless James explicitly requests conversion.
- Video (immersive direction): [[Video Capture Requirements]] *(primary)* · [[Video Requirements]].
- 3D models: [[3D Asset Requirements]].
- Images: [[Image Requirements]].
- Folders: looping video + posters → `public/media/`; web-ready GLBs → `public/models/`.

## Related
- [[Missing Content Checklist]] · [[Placeholder Asset Rules]] · [[Immersive 3D Direction]] · [[Design System Brief]]
