---
description: Enable the project-local token/cost optimization routing system (creates skill, state, Obsidian note, CLAUDE.md section).
---

# /token-optimize — Enable token optimization routing

Enable (or re-enable / refresh) the project-local token optimization system for the James
Seymour portfolio project. This authorizes Claude to dynamically route its own effort,
context loading, and — where the environment actually supports it — model/effort, per the
policy in `.claude/skills/token-optimizer/SKILL.md`, **without ever sacrificing
correctness or architecture quality.**

## Steps

1. **Ensure the skill exists / is current.**
   - Verify `.claude/skills/token-optimizer/SKILL.md` exists and matches the routing
     policy. If missing or stale, (re)create it. Do not duplicate it.

2. **Ensure the three commands exist / are current.**
   - `.claude/commands/token-optimize.md` (this file)
   - `.claude/commands/token-optimize-pause.md`
   - `.claude/commands/token-optimize-remove.md`
   - If any are missing, create them. Update in place rather than duplicating.

3. **Create/update the state file** `.claude/token-optimizer/state.json`:
   ```json
   {
     "enabled": true,
     "paused": false,
     "created_by": "token-optimizer",
     "project_name": "JamesSeymourDev - Portfolio",
     "obsidian_vault_path": "ObsidianVault",
     "model_switching_available": false,
     "last_updated": "<today's date, YYYY-MM-DD>"
   }
   ```
   - Preserve `created_by`. Set `enabled=true`, `paused=false`, refresh `last_updated`.
   - Set `model_switching_available` to whether you can *verify* a Claude-callable
     model/effort switch in this environment (default `false` — policy-based routing only).

4. **Link the Obsidian vault.**
   - Vault is `ObsidianVault/`. Create/update
     `ObsidianVault/07_AI_Prompts/Token Optimization System.md` documenting the system
     (see the skill's "Obsidian vault linkage rules"). Append a dated **Change Log** line:
     `Enabled on <date>`.
   - Keep `[[wikilinks]]` exact; link to `[[Prompt Hub]]`.
   - If no vault could be found, instead set `obsidian_vault_path` to `null` and create
     `.claude/token-optimizer/OBSIDIAN_LINK_REQUIRED.md` explaining what path is needed.

5. **Update `CLAUDE.md`** (project root).
   - Ensure a `## Token Optimization Routing` section exists (see template in that file).
   - If `CLAUDE.md` does not exist, create it containing that section only.
   - **Append carefully — never overwrite existing instructions.**

6. **Print a short confirmation** showing:
   - enabled status (enabled / not paused)
   - skill path
   - the three command paths
   - Obsidian note path (or a missing-vault warning)
   - whether **actual** model/effort switching appears available, or only **policy-based**
     routing is available (state this honestly — do not claim model switching you cannot
     verify)

## Rules
- Do not break or modify the existing `/checkpoint` command or any unrelated files.
- If the system already exists, update safely instead of duplicating.
- From this point, follow `.claude/skills/token-optimizer/SKILL.md` for routing while
  `enabled==true` and `paused==false`.
