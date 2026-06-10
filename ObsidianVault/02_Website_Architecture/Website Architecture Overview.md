# Website Architecture Overview

> **Status:** In Progress
> Architecture hub. Mirrors `docs/TechnicalPlan.md`.

## Stack
- **Vite** (build/dev) + **React** + **TypeScript**.
- Styling: TBD → [[UI Style Guide]].
- Static output → GitHub Pages → [[GitHub Pages Deployment]].

## Principles
1. **Data-driven content** — projects are data, not hard-coded pages → [[Data Driven Project System]].
2. **Component-based** — small, reusable, typed components → [[Component Plan]].
3. **Scalable structure** — clear folders → [[Folder Structure Plan]].
4. **Type-safe** — strong types for project schema.

## Target Folder Structure
```text
src/
  components/   # Reusable UI
  data/
    projects.ts # Source of truth for project content
  pages/        # Route-level views
  styles/       # Global styles / tokens
  assets/       # Images, video, icons
```

## Sub-Notes
- [[Technical Implementation Plan]] ← consolidated build plan
- [[Data Driven Project System]]
- [[Routing Plan]]
- [[Component Plan]]
- [[Folder Structure Plan]]

## Related
- [[Implementation Hub]] · [[Portfolio Website - Master Hub]]
