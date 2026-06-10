# Placeholder Asset Rules

> **Status:** In Progress
> Rules for placeholders so the site never ships with broken/missing media — and so real
> assets are easy to swap in later.

## Rules
1. **Never reference a missing file.** Use a committed placeholder, not a broken path.
2. **Clearly mark placeholders** (e.g. filename suffix `-placeholder`, or a visible label).
3. **Keep dimensions realistic** so layout doesn't shift when real media arrives.
4. **One source of truth for swaps** — track every placeholder in [[Missing Content Checklist]].
5. **No copyrighted art** as placeholders (e.g. don't ship real Super Bomberman art — use a neutral stand-in).

## Suggested Placeholders
- Images: solid-color or generated placeholder at target aspect ratio (e.g. 16:9).
- Video: static thumbnail with a "video coming soon" label.
- Thumbnails: project-name text on a branded background.

## Swap Workflow
- [ ] Real asset received → replace file in `src/assets/` keeping the same name/path.
- [ ] Tick the item in [[Missing Content Checklist]] and the project's note.

## Related
- [[Asset Collection Checklist]] · [[Image Requirements]] · [[Video Requirements]]
