---
title: Token Optimization System
type: ai-system
status: enabled
created: 2026-06-13
---

# Token Optimization System

A project-local Claude Code system that lets Claude **reduce token/cost waste during large
generations without damaging coding quality, correctness, debugging, or architecture
reasoning.** Once enabled, Claude has standing authority to route its own effort up and
down per a fixed policy — cheap for trivial work, maximum effort for risky work.

⬆ Index: [[Prompt Hub]]

## What it does

- Matches Claude's **reasoning depth, context loading, and (where the environment supports
  it) model/effort** to the difficulty of each task.
- Saves tokens on trivial work (typos, filename scans, summaries, boilerplate).
- **Escalates to maximum effort** for anything risky: build errors, cross-file changes,
  architecture, serialization/persistence, deploy config, ambiguous requirements.
- Never trades correctness or architecture quality for token savings. **When in doubt, it
  escalates.**

The full routing policy lives in the project skill:
`.claude/skills/token-optimizer/SKILL.md`

## The three commands

| Command | Effect |
|---|---|
| `/token-optimize` | Enable / refresh the system. Creates the skill, the 3 commands, `state.json`, this note, and the CLAUDE.md routing section. |
| `/token-optimize-pause` | Pause routing (sets `paused=true`). Deletes nothing. Re-enable with `/token-optimize`. |
| `/token-optimize-remove` | Fully remove the system: command files, skill folder, state folder, CLAUDE.md section; this note is marked removed (not silently deleted). |

## When Claude may use cheaper / lower-effort reasoning

- summarising already-known context
- scanning filenames / listing directories
- drafting simple documentation, checklists, changelogs
- tiny text-only edits, formatting prompts
- boilerplate with no architectural risk
- answering questions already covered by these vault notes

## When Claude MUST escalate to the strongest available model/effort

- debugging build errors (Vite, GitHub Pages deploy, type errors)
- changing architecture or designing new systems
- modifying save/load, serialization, or anything that could corrupt data/assets
- touching multiple modules / cross-file changes
- build & deploy config (`vite.config.ts`, `package.json` scripts, CI)
- rendering / 3D scene / input / app-state systems
- interpreting unclear requirements or reconciling conflicting docs
  (e.g. `DESIGN.md` vs the Design System Brief)
- preparing precise Codex/Claude prompts, or reviewing generated code before finalising

## Model switching — is it real here?

**Currently: policy-based routing only.** This Claude Code environment does not expose a
verified Claude-callable command to hot-swap its own model or reasoning effort mid-session
(`/model` and `/fast` are user-interactive, not Claude-callable). So Claude simulates the
routing through reasoning depth and context discipline, and will **not** claim to have
switched models when it cannot verify it did. If a real switch becomes available, the skill
(§8) and `state.json` (`model_switching_available`) get updated.

## How to pause

Run `/token-optimize-pause`. Sets `paused=true` in `state.json`; Claude reverts to its
normal default effort. No files are deleted. Re-enable any time with `/token-optimize`.

## How to remove

Run `/token-optimize-remove`. Deletes the command files, the
`.claude/skills/token-optimizer/` folder, and the `.claude/token-optimizer/` state folder;
strips the **Token Optimization Routing** section from `CLAUDE.md`; and marks this note as
removed. Unrelated commands, checkpoints, and vault notes are never touched.

## Where the state file lives

`.claude/token-optimizer/state.json` — holds `enabled`, `paused`, `project_name`,
`obsidian_vault_path`, `model_switching_available`, and `last_updated`.

## Change Log

- 2026-06-13 — Enabled. Created skill, three commands, `state.json`, this note, and the
  `## Token Optimization Routing` section in a new root `CLAUDE.md`. Routing mode:
  policy-based (no verified model-switch command in this environment).
- 2026-06-13 — Re-enabled / refreshed via `/token-optimize`. Verified skill, commands,
  `state.json` (`enabled=true`, `paused=false`), CLAUDE.md section, and this note all
  present and current. Routing mode unchanged: policy-based.
