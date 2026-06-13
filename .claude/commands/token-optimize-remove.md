---
description: Fully remove the token optimization system (commands, skill, state, vault note, CLAUDE.md section).
---

# /token-optimize-remove — Remove token optimization system

Completely remove the token optimization system created by `/token-optimize` from this
project. Be surgical: remove **only** what this system created. Never touch unrelated
Claude commands, project notes, checkpoints, or user files.

## Steps

1. **Read state first** `.claude/token-optimizer/state.json` to recover
   `obsidian_vault_path` and confirm `created_by == "token-optimizer"`. If the file is
   gone, proceed best-effort and report what was already absent.

2. **Remove the command files** created by this system:
   - `.claude/commands/token-optimize.md`
   - `.claude/commands/token-optimize-pause.md`
   - `.claude/commands/token-optimize-remove.md` (this file — delete last)
   - Do NOT delete `.claude/commands/checkpoint.md` or any other command.

3. **Remove the skill folder:**
   - `.claude/skills/token-optimizer/` (the whole folder, including `SKILL.md`).
   - If `.claude/skills/` is now empty, removing it is fine; leave it if it holds other
     skills.

4. **Remove the state/config folder:**
   - `.claude/token-optimizer/` (including `state.json` and any
     `OBSIDIAN_LINK_REQUIRED.md`).

5. **Handle the Obsidian note safely** (if `obsidian_vault_path` not null):
   - Prefer to **mark it removed** rather than hard-delete: append a **Change Log** line
     `Removed on <date>` and add a banner at the top:
     `> ⚠️ REMOVED — this system was uninstalled on <date>. Kept for historical record.`
   - Only hard-delete `ObsidianVault/07_AI_Prompts/Token Optimization System.md` if the
     user explicitly asks for it. Never delete other vault notes.

6. **Strip the CLAUDE.md section:**
   - Remove ONLY the `## Token Optimization Routing` section (heading through its end,
     up to the next `##` heading or EOF) from `CLAUDE.md`.
   - Leave all other content intact. If that was the only section and the file is now
     empty/trivial, you may remove the file — but only if this system created it.

7. **Print a summary** listing every file removed, the Obsidian note's fate
   (marked-removed vs deleted), and confirmation that the CLAUDE.md section was stripped.

## Rules
- Remove only files created by this system. When unsure whether a file is ours, leave it
  and report it.
- Do NOT delete unrelated Claude commands, project notes, checkpoints, or user files.
