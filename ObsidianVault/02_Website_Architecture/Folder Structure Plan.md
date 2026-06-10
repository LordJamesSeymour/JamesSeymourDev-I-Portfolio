# Folder Structure Plan

> **Status:** In Progress
> Placeholder `src/` folders already exist (empty). Scaffolding fills them in.

## Current (placeholders created)
```text
src/
  components/
  data/
  pages/
  styles/
  assets/
```

## Target (after Vite scaffold)
```text
src/
  components/      # Reusable UI components
  data/
    projects.ts    # Typed source of truth for projects
  pages/
    Home.tsx
    ProjectPage.tsx
    NotFound.tsx
  styles/
    globals.css    # or tokens / theme
  assets/
    images/
    video/
    icons/
  App.tsx
  main.tsx
```

## Root (after scaffold)
```text
index.html
vite.config.ts
tsconfig.json
package.json
public/
  404.html         # SPA fallback for GitHub Pages (if BrowserRouter)
  CNAME            # only if custom domain
```

## Notes
- Do **not** install packages until James approves → see [[Milestone 1 - Project Setup]].
- Keep `assets/` organized by media type for clarity.

## Related
- [[Website Architecture Overview]] · [[Component Plan]] · [[Build And Deploy Checklist]]
