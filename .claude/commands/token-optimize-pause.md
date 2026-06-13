---
description: Temporarily pause token optimization routing without deleting any files.
---

# /token-optimize-pause — Pause token optimization routing

Temporarily disable the token optimization routing behaviour for this project **without
deleting anything.** All files (skill, commands, state, Obsidian note, CLAUDE.md section)
remain in place so it can be re-enabled instantly with `/token-optimize`.

## Steps

1. **Update state** `.claude/token-optimizer/state.json`:
   - Set `"paused": true`.
   - Leave `"enabled": true`.
   - Refresh `"last_updated"` to today's date.
   - If the state file does not exist, tell the user the system is not installed and stop.

2. **Update the Obsidian note** (if `obsidian_vault_path` is not null):
   - Append a dated line to the **Change Log** of
     `ObsidianVault/07_AI_Prompts/Token Optimization System.md`: `Paused on <date>`.

3. **Stop applying routing.**
   - From now on, ignore the routing tiers in
     `.claude/skills/token-optimizer/SKILL.md` and work at your normal default effort
     for this project until `/token-optimize` is run again.

4. **Confirm** to the user: routing paused, no files deleted, re-enable with
   `/token-optimize`.

## Rules
- Do NOT delete any files.
- Do NOT modify the skill, commands, CLAUDE.md, or unrelated files.
