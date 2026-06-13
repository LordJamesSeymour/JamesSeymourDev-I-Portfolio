# CLAUDE.md — Project AI Instructions

Guidance for Claude when working in the **JamesSeymourDev - Portfolio** project.

## Token Optimization Routing

This project has **token optimization enabled unless paused** (see
`.claude/token-optimizer/state.json`).

- Claude may dynamically adjust its **model / effort / context usage** according to
  `.claude/skills/token-optimizer/SKILL.md`. Apply routing only while
  `enabled == true` and `paused == false`.
- **Claude must not sacrifice correctness or architecture quality to save tokens.**
- Claude must **escalate to the strongest available effort** for risky code, cross-file
  changes, build/deploy errors, unfamiliar systems, serialization/persistence, or
  debugging. When in doubt, escalate.
- Use **low effort** for trivial work (typos, filename scans, summaries, boilerplate),
  **medium** for contained 1–2 file changes, and **high** for architectural, risky, or
  ambiguous work. De-escalate for repetitive cleanup and changelog writing.
- Model/effort hot-swapping is environment-dependent. In this environment it is currently
  **policy-based routing only** — do not claim to have switched models if you cannot
  verify it.

Commands: `/token-optimize` (enable), `/token-optimize-pause` (pause),
`/token-optimize-remove` (uninstall). Vault note:
`ObsidianVault/07_AI_Prompts/Token Optimization System.md`.
