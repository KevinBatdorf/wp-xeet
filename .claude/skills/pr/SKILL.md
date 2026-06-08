---
name: pr
description: Manage the PR lifecycle — open, check CI, and merge pull requests. Use when the user wants to open a PR, check whether a PR's CI passed, see if a PR is ready, or merge a PR. Covers the open/check/merge flow with the guardrails that the work goes on a branch and CI is green before merging. Not for code review (that's a separate task).
---

# PR lifecycle

Open, check, and merge PRs with `gh`. The recurring mistakes this prevents:
working on `main`, and merging before CI is confirmed green.

## Open a PR

1. **Branch first.** Never commit on `main`. If there are uncommitted changes on
   `main`, `git checkout -b <branch>` before committing. See [[branch-before-changes]].
   Pick a branch name that matches the *scope* of the work, not one narrow file —
   if it may grow, name it broader (`add/skills`, not `add/release-skill`).
2. Commit, push with `-u`, then `gh pr create` with a title and a body that
   summarizes what changed and why.
3. Link related PRs/issues by number in the body.

## Check a PR

- `gh pr view <number>` — state (open/merged/closed), title, body, comments.
  **Read existing comments** before adding your own so you don't repeat the thread.
- `gh pr checks <number>` — one-shot status. Add `--watch` to block until checks
  finish.
- For a failing check, pull the log: `gh run view <run-id> --job <job-id> --log`
  and grep for the failure.

## Merge a PR

Do all three verifications, in order, every time:

1. `gh pr view <number>` — confirm it is still **OPEN**. Don't assume; it may
   already be merged or closed.
2. `gh pr checks <number>` — every check **passed**. Never merge on red or pending.
3. `gh pr merge <number> --squash` (default to squash unless told otherwise).

If anything is red or pending, stop and report — do not merge.

## Guardrails

- Branch → PR → merge. Nothing committed directly to `main`.
- PR confirmed open + all CI green before merge — no exceptions.
- If a merge triggers a downstream deploy (e.g. a release workflow), confirm with
  the user first. For full releases use the [[release]] skill.
- Working in small, reported steps beats long silent runs — surface CI status and
  outcomes as you go.
