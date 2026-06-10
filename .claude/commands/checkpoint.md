---
description: Create a new project checkpoint note in the Obsidian vault
argument-hint: "checkpoint name"
---

# /checkpoint — Create a project checkpoint

Create a new checkpoint note that snapshots the current state of the James Seymour portfolio
project. The checkpoint name provided by the user is: **$ARGUMENTS**

If `$ARGUMENTS` is empty, ask the user for a short checkpoint name before proceeding.

## Steps

1. **Determine the next checkpoint number (N).**
   - List `ObsidianVault/06_Checkpoints/` and find the highest existing `CHECKPOINT <n> - ....md`.
   - `N` = highest found + 1. (Ignore `Checkpoint Hub.md` and `_Checkpoint Template.md`.)
   - Identify the previous checkpoint note (the one numbered `N-1`) for back-linking.

2. **Build the filename.**
   - Format: `CHECKPOINT N - <Title>.md`, where `<Title>` is `$ARGUMENTS` cleaned up to
     Title Case with characters illegal in Windows filenames removed (`\ / : * ? " < > |`).
   - Save it in `ObsidianVault/06_Checkpoints/`.

3. **Gather the current state** (don't guess — read the vault):
   - Today's date.
   - Current phase / status — read `ObsidianVault/00_Project_Hub/Current Status.md`.
   - What changed since the previous checkpoint — diff intent against checkpoint `N-1`
     and recent work in this session.
   - Completed vs. pending work — pull from `Current Status.md` and `Next Actions.md`.
   - Important decisions made since last checkpoint.

4. **Write the checkpoint note** using `ObsidianVault/06_Checkpoints/_Checkpoint Template.md`
   as the structure. It MUST include:
   - YAML frontmatter (`checkpoint`, `title`, `date`, `status`).
   - Date, project status, what changed, completed work, pending work, important decisions.
   - A **← Previous** link to `[[CHECKPOINT (N-1) - ...]]` (omit/say "none" if N = 1).
   - An **⬆ Index** link to `[[Checkpoint Hub]]`.
   - `[[wikilinks]]` to all relevant vault notes so it shows up in the Obsidian graph.

5. **Update `ObsidianVault/06_Checkpoints/Checkpoint Hub.md`:**
   - Add the new checkpoint to the **Chronological List of Checkpoints** (newest at the bottom).
   - Replace the **Latest Checkpoint** section with this new checkpoint.
   - Update **Current Project Baseline** if the baseline materially changed.

6. **Update `ObsidianVault/00_Project_Hub/Current Status.md`** if the phase/status changed.

7. **Report** the created filename, the previous checkpoint it links to, and the files updated.

## Rules
- Do NOT delete or rewrite unrelated files. Only add the new checkpoint and update the
  checkpoint-related notes (Hub, Current Status if needed).
- Preserve all existing checkpoints.
- Keep wikilinks exact so the graph connects properly.
