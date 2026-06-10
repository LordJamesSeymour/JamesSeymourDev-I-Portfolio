# Build And Deploy Checklist

> **Status:** Not Started
> Run through before every deploy.

## Pre-Build
- [ ] No uncommitted debug code / console logs.
- [ ] `base` in `vite.config.ts` correct → [[GitHub Pages Deployment]].
- [ ] All assets exist (no broken paths) → [[Placeholder Asset Rules]].

## Build
- [ ] `vite build` completes with no errors/warnings.
- [ ] Preview locally (`vite preview`) and click through.

## Deploy
- [ ] Push / trigger deploy (Actions or `gh-pages`).
- [ ] Verify live site loads.
- [ ] Verify routing (refresh on a `/projects/:slug` page works).
- [ ] Verify custom domain + HTTPS if applicable → [[Custom Domain Notes]].

## Post-Deploy
- [ ] Lighthouse pass → [[Milestone 6 - Final QA]].
- [ ] Update [[Current Status]] / [[Checkpoint Hub]].

## Related
- [[GitHub Pages Deployment]]
