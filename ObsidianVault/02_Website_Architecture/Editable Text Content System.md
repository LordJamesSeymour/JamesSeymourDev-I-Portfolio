# Editable Text Content System

A lightweight "local text database" that lets visible site copy be edited by changing
plain `.txt` files instead of React/TypeScript. It sits **on top of** the existing
data-driven project system — it does not replace it.

## Where the editable files live

```
public/content/
  site/                       # site-wide copy (one file per text block)
    hero-eyebrow.txt
    hero-title.txt            # big hero headline (last word auto-accented)
    hero-name.txt             # header brand + footer copyright name
    hero-tagline.txt
    hero-primary-cta.txt
    hero-secondary-cta.txt
    about-heading.txt
    about-body.txt
    featured-heading.txt
    featured-subtitle.txt
    featured-see-all-cta.txt
    projects-heading.txt
    projects-subtitle.txt
    contact-heading.txt
    contact-body.txt
    footer-tagline.txt
  projects/<slug>/            # per-project copy (8 folders)
    title.txt
    short-description.txt
    long-description.txt       # → case-study "Overview"
    creative-process.txt       # → optional case-study "Creative Process"
    inside-description.txt     # → optional project-specific showcase intro
    needs.txt                  # dev-only checklist, one item per line
```

`public/` is served as static files by Vite, so each file is reachable at
`/<base>content/site/hero-title.txt` etc. There is a short author-facing guide at
`public/content/README.md`.

## How the loader works

- Hook: `src/content/useTextContent.ts` → `useTextContent(path, fallback)`.
- Helpers: `src/content/content.ts` → `useSiteText(name, fallback)` and
  `useProjectText(slug, field, fallback)` build the paths and call the hook.
- The hook `fetch`es the file, trims it, and returns the text. It returns the
  **fallback** while loading, if the file is missing, or if the fetch fails — so the
  page is always populated and never crashes.
- URLs are built from `import.meta.env.BASE_URL`, so it works on a GitHub Pages
  **project** site (e.g. `/Repo/`) as well as a root/custom-domain site.
- Robustness: a missing static file is often served as the SPA `index.html` (HTTP 200).
  The hook detects an HTML body and treats it as "missing" → fallback. Results are
  cached per path for the session (each file fetched at most once).

### How to edit hero text
Edit the files in `public/content/site/` (e.g. `hero-title.txt`, `hero-tagline.txt`).
The headline auto-accents the **last word** of `hero-title.txt`.

### How to edit project titles/descriptions
Edit `public/content/projects/<slug>/title.txt`, `short-description.txt`,
`long-description.txt`, and any optional project-specific prose files.
`long-description.txt` becomes the case-study **Overview** and
`creative-process.txt` becomes **Creative Process**.

### How fallbacks work
Every `useSiteText` / `useProjectText` call passes a hard-coded fallback (the original
copy, sourced from `profile.ts` / `projects.ts`). Delete or empty a file and the site
shows the fallback. Fallbacks are intentionally **not** removed from code.

### How to add a new project's text folder
1. Add the project entry in `src/data/projects.ts` (this sets the `slug`).
2. Create `public/content/projects/<slug>/` with `title.txt`, `short-description.txt`,
   `long-description.txt`, and `needs.txt`. Add optional prose files only when that
   project renders the matching section.
   (Until those files exist, the card/detail page just uses the `projects.ts` fallbacks.)

## What still lives in `projects.ts` (NOT in .txt)

Structural / non-prose metadata: `slug`, `category`, `technologies` (tags),
`featured` + `featuredPriority`, `status`, `cover`/media paths (incl. video
`sources`), `links`, `immersive`, `priority`. Changing media or adding a project is a
code edit here; written copy is what moves to `.txt`.

## What must be committed/pushed for GitHub Pages

The `.txt` files live in the repo under `public/content/`. Editing them locally updates
dev immediately, but to update the **live** site you must `git commit` + `git push`
(then the Pages build redeploys). No code changes — only the text files.

## Related
- `public/content/README.md` — short author guide.
- [[Data Driven Project System]] — the structural project model this complements.
