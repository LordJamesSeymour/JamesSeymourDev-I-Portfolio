# Codex Project Setup Prompt

> **Status:** Ready to use
> Variant of the setup prompt for Codex / other coding agents.

---

Project: "JamesSeymourDev - Portfolio" — a game programmer/designer portfolio site.
Source of truth: `docs/PRD.md` + `ObsidianVault/`.

Scaffold a Vite + React + TypeScript app with this structure:

```text
src/
  components/
  data/projects.ts
  pages/
  styles/
  assets/
```

Implement a data-driven project system: projects are typed entries in `src/data/projects.ts`;
the grid and case-study pages render from that data. Schema is described in
`ObsidianVault/02_Website_Architecture/Data Driven Project System.md`.

Constraints:
- No package installs without explicit approval.
- Do not overwrite existing files.
- Deploy target is GitHub Pages; configure Vite `base` accordingly.

Output a summary of created files and any open questions.

---

## Related
- [[Prompt Hub]] · [[Claude Project Setup Prompt]]
