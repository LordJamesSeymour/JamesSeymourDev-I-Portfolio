# GitHub Pages Deployment

> **Status:** Needs James Input
> Deployment hub. Mirrors `docs/DeploymentNotes.md`.

## Decisions Needed (James)
- [ ] Repository name (affects Vite `base`).
- [ ] User/org site (`username.github.io`) or project site (`username.github.io/repo`)?
- [ ] Custom domain? → [[Custom Domain Notes]]

## Vite `base` Config
- User/org site: `base: "/"`.
- Project site: `base: "/<repo-name>/"`.

## Deploy Method (pick one)
- [ ] **GitHub Actions** (recommended) — build on push, deploy `dist/` to Pages.
- [ ] `gh-pages` branch via the `gh-pages` package (needs install approval).

## SPA Routing Fallback
- BrowserRouter: add `public/404.html` redirecting to `index.html`.
- HashRouter: no fallback needed. → [[Routing Plan]]

## Related
- [[Build And Deploy Checklist]] · [[Custom Domain Notes]] · [[Milestone 6 - Final QA]]
