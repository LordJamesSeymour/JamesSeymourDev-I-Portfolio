---
name: token-optimizer
description: Project-local token/cost optimization routing. When enabled, authorizes Claude to dynamically match its reasoning depth, context loading, and (where supported) model/effort to the difficulty of the task — saving tokens on trivial work while escalating to maximum effort for risky, cross-file, architectural, or build-breaking work. Never sacrifices correctness or quality to save tokens.
---

# Token Optimizer Skill

## 1. Purpose

Reduce wasteful token and cost usage during large generations **without damaging
coding quality, correctness, debugging ability, or architectural reasoning.**

The optimization target is:
- reduce wasteful token usage
- avoid loading unnecessary files
- avoid overthinking trivial edits
- **preserve or increase quality for complex coding work**
- escalate to the strongest available model/effort when architectural, debugging,
  cross-file, risky, or build-breaking tasks require it

This skill gives Claude standing authority — once `/token-optimize` has been run for
this project — to route its own work between effort levels according to the policy
below, without asking permission for each routine routing decision.

> **Prime directive:** Token savings must NEVER come before correctness, safety, or
> architecture quality. When in doubt, escalate.

## 2. Activation rules

Before applying any routing behaviour, read the state file:
`.claude/token-optimizer/state.json`

- Apply routing **only if** `enabled == true` AND `paused == false`.
- If `paused == true`: do NOT apply routing. Work at your normal default effort.
- If the state file is missing or `enabled == false`: the system is not installed/active.
  Do nothing special.

This skill is *advisory routing*, not a behaviour that changes tool availability. It is
always safe to ignore it for a given task if following it would risk quality.

## 3. Model / effort routing rules

Choose an effort tier per task (or per sub-task of a large job). Re-evaluate the tier
whenever the nature of the work changes mid-task.

### LOW effort / cheapest available routing
Use when the work is mechanical, well-understood, and carries no architectural risk:
- summarising already-known context
- scanning filenames / listing directories
- drafting simple documentation
- making tiny text-only edits (copy, labels, comments)
- formatting prompts
- producing checklists
- generating boilerplate with no architectural risk
- answering questions already covered by project notes / Obsidian vault

LOW behaviour: minimal preamble, no exploratory file reads beyond the one target,
short direct output, no multi-file scanning.

### MEDIUM effort / balanced routing
Use for contained, low-risk implementation:
- editing one or two files
- implementing isolated UI changes
- writing small functions
- adding non-critical features
- updating existing patterns
- creating simple tests
- doing straightforward refactors

MEDIUM behaviour: read the directly-relevant files, follow existing patterns, verify the
edit compiles/type-checks in your head, keep patches small and reversible.

### HIGH effort / strongest available routing
Use whenever the task is risky, broad, or unclear:
- debugging build errors
- changing architecture
- modifying save/load or serialization systems
- touching multiple modules / cross-file changes
- working with build/deploy config (Vite, CMake, GitHub Pages, package.json scripts)
- working with rendering, physics, input systems, serialization, or game/app state
- refactoring core systems (e.g. the 3D scene, routing, sprite showcase engine)
- changing anything that could corrupt project data or assets
- interpreting unclear user requirements
- reconciling conflicting project instructions (e.g. DESIGN.md vs Design System Brief)
- designing new systems
- preparing large Codex/Claude prompts that must be precise
- reviewing generated code before giving the final answer

HIGH behaviour: load the exact relevant source files and project rules, reason fully
about edge cases / build / tests, prefer small reversible patches, explain non-obvious
decisions, and self-review the diff before finalising.

## 4. Safety rules (never violate to save tokens)

- Never use LOW effort for complex code generation.
- Never skip build/test reasoning just to save tokens.
- Never make assumptions about architecture when files can be inspected.
- Never delete or rewrite large systems without explaining why.
- Prefer small, reversible patches.
- Preserve existing naming conventions and project structure.
- Follow the project's current style over generic best practices.
- If the project has checkpoint commands, changelog rules, or Obsidian graph rules,
  integrate with them instead of replacing them. (See `/checkpoint`.)

## 5. Escalation rules

**When in doubt, escalate.** Escalate immediately — even mid-task — when you hit any of:
- an unexpected build / type / lint error
- a change that turns out to touch more than ~2 files
- anything affecting serialization, persistence, assets, or deploy config
- ambiguity in the user's intent or conflicting project docs
- unfamiliar subsystems you have not already inspected this session
- a request to design, architect, or review code for correctness

If you started a task LOW or MEDIUM and an escalation trigger appears, stop, raise the
tier, and re-load whatever context HIGH effort requires before continuing.

## 6. De-escalation rules

After the hard part is done, drop back down to save tokens:
- writing the changelog / checkpoint summary → LOW
- documentation and recap → LOW
- repetitive mechanical cleanup across already-understood files → MEDIUM/LOW
Do not stay at HIGH effort for trivial wrap-up work.

## 7. Context-loading rules

- Do not read the whole project unless necessary.
- Start with the file tree, relevant docs, and targeted search (Grep/Glob).
- Read only files directly connected to the task.
- Prefer existing project documentation and Obsidian notes before broad code scanning.
  (Key docs: `DESIGN.md`, `PRODUCT.md`, `ObsidianVault/00_Project_Hub/Current Status.md`,
  `ObsidianVault/05_Implementation/`, `ObsidianVault/06_Checkpoints/`.)
- Summarise large files before deep editing rather than re-quoting them in full.
- Avoid repeatedly re-reading unchanged files — the harness tracks file state.
- Maintain a compact working summary during large generations.
- Before making risky edits, load the exact relevant source files and project rules.

## 8. Hot-swap behaviour (environment-dependent)

**Actual model/effort hot-swapping is environment-dependent and must be verified, not
assumed.**

- If the running environment exposes a real command/tool that lets Claude switch its own
  model or reasoning effort mid-session, the enabled system authorises Claude to use it
  per the routing policy above **without asking every time**.
- If the environment does NOT expose such a command (the common case in Claude Code —
  `/model` and `/fast` are user-interactive, not Claude-callable), Claude simulates the
  routing through **reasoning depth and context usage only.**
- **Never claim to have switched models if you cannot verify that you did.** Describe what
  you actually changed (e.g. "kept this LOW effort: single-file read, no broad scan"),
  not a model name you did not actually select.

> Current known state for this project: **policy-based routing only** — no verified
> Claude-callable model/effort switch. Update this line if that changes.

## 9. Obsidian vault linkage rules

- This project's vault is `ObsidianVault/` (relative to project root).
- The system note lives at
  `ObsidianVault/07_AI_Prompts/Token Optimization System.md`.
- When the system is enabled, paused, or removed, append a dated line to that note's
  **Change Log** section.
- Keep `[[wikilinks]]` exact so the Obsidian graph stays connected. Link the system note
  to `[[Prompt Hub]]` and relevant hubs as appropriate.
- Do not rewrite unrelated vault notes. Only touch the system note (and link targets that
  explicitly index it).

## 10. Logging rules

Keep logging lightweight — do not burn the tokens you are trying to save:
- Routing decisions are recorded by *behaviour*, not a verbose log file.
- When a task is non-trivial, you may note the chosen tier in one short phrase in your
  reply (e.g. "(routed HIGH: cross-file build change)").
- Enable / pause / remove events are logged as one dated line in the Obsidian note's
  Change Log and reflected in `state.json` (`last_updated`).
- Do not create per-task log files.

## 11. Pause / removal behaviour

- **Paused** (`/token-optimize-pause`): `state.json.paused = true`. Stop applying routing;
  work at normal default effort. No files deleted. Re-enable with `/token-optimize`.
- **Removed** (`/token-optimize-remove`): all system files deleted (commands, this skill
  folder, `.claude/token-optimizer/`), the Obsidian note marked/removed safely, and the
  "Token Optimization Routing" section stripped from `CLAUDE.md`. Unrelated files,
  commands, checkpoints, and user notes are never touched.

## 12. Worked examples (how to pick a tier)

| Request | Tier | Why |
|---|---|---|
| "Fix this typo in the About copy." | LOW | Text-only, one file, no risk. |
| "List the components in `src/components/projects`." | LOW | Filename scan. |
| "Write the changelog entry for what we just did." | LOW | Summarise known context. |
| "Add a hover color to the project card button." | MEDIUM | Isolated UI, 1 file, existing pattern. |
| "Add a new sprite frame entry to `spriteFrames.ts`." | MEDIUM | Contained edit following an existing pattern — escalate only if it changes the loader. |
| "Write a small unit test for the slug helper." | MEDIUM | Isolated, low risk. |
| "The Vite build is failing on deploy — fix it." | HIGH | Build/deploy error → escalate, load exact config. |
| "Refactor the 3D arcade scene to add a second machine." | HIGH | Rendering + cross-file + architectural. |
| "The sprite showcase save/restore of positions is corrupting data." | HIGH | Serialization/persistence + risk of data loss. |
| "DESIGN.md and the brief disagree on fonts — which do we follow?" | HIGH | Reconciling conflicting instructions. |
| "Draft a precise Codex prompt to generate the new project page." | HIGH | Prompt must be precise; review before sending. |

**Default when unsure: HIGH.** It is always cheaper to spend tokens than to ship a broken
build or corrupt project data.
