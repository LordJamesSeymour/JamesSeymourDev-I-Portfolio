# Video Requirements

> **Status:** In Progress
> Specs for gameplay video / GIFs.
> ⚠️ **For the immersive 3D direction, the primary spec is now [[Video Capture Requirements]]**
> (lengths, aspect ratios, how clips are reused as 2D covers *and* 3D `VideoScreen` textures). This
> note remains valid for general hosting/embedding guidance and the "host big clips externally" rule.

## Options
- **Hosted (recommended):** YouTube/Vimeo embed — keeps repo small, good performance.
- **Self-hosted:** short MP4 (H.264) for inline loops; keep file size small.
- **GIF:** only for very short loops (GIFs are large — prefer MP4/WebM where possible).

## Specs
- Resolution: 1080p source, deliver appropriately sized.
- Keep self-hosted clips short (a few seconds) and compressed.
- Provide a poster/thumbnail image for each video.

## Rules
- [ ] Don't autoplay with sound.
- [ ] Provide captions/labels where useful.
- [ ] Respect performance budget → [[Milestone 6 - Final QA]].

## Related
- [[Asset Collection Checklist]] · [[Image Requirements]]
