# Checkpoint Hub

> **Status:** In Progress
> Index of all project checkpoints. A checkpoint is a dated snapshot of the project — what's
> done, what's pending, and the decisions made — that you can always look back on.

## How the Checkpoint System Works
- Run **`/checkpoint "checkpoint name"`** to create a new checkpoint note.
- Each checkpoint:
  - Gets a numbered filename: `CHECKPOINT N - Name.md`.
  - Records the date, project status, what changed, completed work, pending work, and decisions.
  - **Links back** to the previous checkpoint and is **listed here**.
  - Uses `[[wikilinks]]` so it appears in the Obsidian graph.
- New checkpoints are based on `[[_Checkpoint Template]]`.
- After creating one: update the **Latest Checkpoint** section below and, if needed,
  the **Current Project Baseline**.

## Latest Checkpoint
- **[[CHECKPOINT 1 - Vault Architecture Created]]** — 2026-06-10
  - Vault + planning architecture created; website implementation not started yet.

## Chronological List of Checkpoints
1. [[CHECKPOINT 1 - Vault Architecture Created]] — 2026-06-10 — _baseline: vault architecture created_

<!-- Add new checkpoints below in order, newest at the bottom. -->

## Current Project Baseline
> The stable reference point for the project as of the latest checkpoint.

- **Phase:** Planning → Project Setup.
- **Source of truth:** `docs/PRD.md` + the Obsidian vault.
- **Stack (target):** Vite + React + TypeScript → [[Website Architecture Overview]].
- **Content model:** Data-driven projects (`src/data/projects.ts`) → [[Data Driven Project System]].
- **Hosting:** GitHub Pages → [[GitHub Pages Deployment]].
- **Structure:** Full vault (sections `00`–`10`) + placeholder `src/` folders.
- **Website code:** Not started (no packages installed, no build).
- **Main blocker:** James input on content + design → [[Open Questions]] / [[Missing Content Checklist]].

## Related
- [[_Checkpoint Template]] · [[Current Status]] · [[Next Actions]]
- [[Implementation Hub]] · [[Portfolio Website - Master Hub]]
