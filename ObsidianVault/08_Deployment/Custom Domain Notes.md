# Custom Domain Notes

> **Status:** Needs James Input

## Decision
- [ ] Use a custom domain? (yes / no)
- [ ] If yes, domain: `____________`

## If Using a Custom Domain
- [ ] Add a `CNAME` file (in `public/`) containing the domain.
- [ ] Configure DNS:
  - Apex domain: `A` records to GitHub Pages IPs (or `ALIAS`/`ANAME`).
  - `www` subdomain: `CNAME` → `<username>.github.io`.
- [ ] Enable "Enforce HTTPS" in repo Settings → Pages.
- [ ] Set Vite `base: "/"` (custom domains serve from root).

## Related
- [[GitHub Pages Deployment]] · [[Build And Deploy Checklist]]
