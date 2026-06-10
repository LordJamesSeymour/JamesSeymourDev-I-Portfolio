# Routing Plan

> **Status:** In Progress

## Routes
- `/` — Home: hero, about, featured projects, contact.
- `/projects` — (optional) full filterable gallery.
- `/projects/:slug` — project case study, rendered from `projects.ts`.
- `*` — 404 / not found.

## Router Choice
- [ ] React Router (BrowserRouter) **+ GitHub Pages 404 fallback**, OR
- [ ] HashRouter (simplest for GitHub Pages, no server config).

> GitHub Pages serves static files and has no server rewrites. For `BrowserRouter`, add a
> `public/404.html` that redirects to `index.html`. `HashRouter` avoids this entirely.

## TODO
- [ ] Pick router strategy during [[Milestone 1 - Project Setup]].
- [ ] Confirm whether a standalone `/projects` gallery is needed.

## Related
- [[Website Architecture Overview]] · [[GitHub Pages Deployment]]
