# Editable site text

Every visible text block on the site is stored here as a plain **`.txt` file**. Edit the
text, save, and the website updates — **no code changes needed**.

## How it works

- Each file holds the text for one spot on the site.
- The site loads these files at runtime. If a file is missing or fails to load, the site
  falls back to built-in default text, so it never breaks.
- **Local dev:** edits show up on refresh (`npm run dev`).
- **GitHub Pages:** edit the file, then **commit and push** — the change goes live on the
  next deploy. (You still don't edit code, only these `.txt` files.)

## Where things live

```
public/content/
  site/        ← headings, hero copy, button labels, footer, etc.
  projects/    ← one folder per project, named by its slug
```

### Site copy — `site/`

| File | Where it shows |
|------|----------------|
| `hero-eyebrow.txt` | Small label above your name in the hero |
| `hero-title.txt` | The big hero headline (last word is auto-accented) |
| `hero-name.txt` | Brand name in the header + footer copyright |
| `hero-tagline.txt` | Sentence under the hero headline |
| `hero-primary-cta.txt` | Primary hero button label |
| `hero-secondary-cta.txt` | Secondary hero button label |
| `about-heading.txt` / `about-body.txt` | About section title + paragraph |
| `featured-heading.txt` / `featured-subtitle.txt` | Featured Projects title + subtitle |
| `featured-see-all-cta.txt` | "See all projects" button label |
| `projects-heading.txt` / `projects-subtitle.txt` | Projects page title + subtitle |
| `contact-heading.txt` / `contact-body.txt` | Contact section title + line |
| `footer-tagline.txt` | Small line under your name in the footer |

### Project copy — `projects/<slug>/`

Each project folder (e.g. `projects/cursor-zip/`) has:

| File | Where it shows |
|------|----------------|
| `title.txt` | Project name on the card and detail page |
| `short-description.txt` | One-line description on the card + detail intro |
| `long-description.txt` | The "Overview" paragraph in the case study |
| `role.txt` | The "My Role" paragraph in the case study, when present |
| `contributions.txt` | The "Key Contributions" paragraph in the case study, when present |
| `creative-process.txt` | The "Creative Process" paragraph in the case study, when present |
| `technical-highlights.txt` | The "Technical Highlights" paragraph in the case study, when present |
| `development-context.txt` | The "Development Context" paragraph in the case study, when present |
| `inside-description.txt` | Optional project-specific showcase intro |
| `needs.txt` | Your private "still needed" checklist — one item per line. **Dev-only**, never shown on the live site. |

Each case-study file is one paragraph. Leave a file out to hide that section.

The project slugs are: `arcade-machine`, `surfers-quest`, `bomberman-style-game`,
`eos-dedicated-server`, `basilisk-engine`, `cursor-zip`, `zombies-vr`,
`hammer-moonbase-map`.

## Tips

- Keep it to plain text. One idea per file.
- `needs.txt` uses **one item per line**.
- Leave a file as-is to keep the current text; you don't have to fill in every file.
- Don't rename or move files — the site looks them up by name.

## What is NOT here (still in code)

Structural data lives in `src/data/projects.ts`: a project's **category, tags, featured
status, media/video paths, and links**. Adding/removing a project or changing its media is
a code change there. Written copy is what lives in these `.txt` files.

Full details: `ObsidianVault/02_Website_Architecture/Editable Text Content System.md`.
