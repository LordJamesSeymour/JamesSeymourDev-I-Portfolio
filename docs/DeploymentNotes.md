# Deployment Notes

> **Status:** Not Started
> Detailed deployment notes also live in `ObsidianVault/08_Deployment/`.

## Target: GitHub Pages

### Key considerations
- [ ] Set `base` in `vite.config.ts` to match the GitHub Pages path.
  - User/org site (`username.github.io`): `base: "/"`.
  - Project site (`username.github.io/repo`): `base: "/repo/"`.
- [ ] Decide deploy method:
  - [ ] GitHub Actions workflow (recommended), or
  - [ ] `gh-pages` branch via the `gh-pages` npm package.
- [ ] SPA routing fallback: add a `404.html` that redirects to `index.html`, or use a hash router.

### Custom domain (optional)
- [ ] James to confirm whether a custom domain is wanted.
- [ ] If yes: add `CNAME` file, configure DNS records, enable HTTPS in repo settings.

## TODO (James Input Needed)
- [ ] Repository name (affects Vite `base`).
- [ ] Custom domain decision.
- [ ] CV file to include in the build.
