---
name: release
description: Prepare and publish a new wp-xeet release. Use when the user wants to cut a release, bump the version, or ship a fix to WordPress.org. Bumps the version in both required files, updates the changelog, opens a release PR, and (after confirmation) tags the release to trigger the WP.org deploy.
---

# Releasing wp-xeet

A release tag triggers a **production deploy to WordPress.org** via
`release-to-wp-org.yml` (`on: release: published`). Treat the tag as the point
of no return — everything before it is reversible, the tag is not.

## Version lives in two files — both must match

- `xeet.php` → `* Version:           X.Y.Z`
- `readme.txt` → `Stable tag:        X.Y.Z`

A mismatch ships a broken release to WP.org. Always update both.

## Steps

### 1. Confirm what's shipping
- `git checkout main && git pull`
- Confirm the fix/feature being released is already merged to main (`git log --oneline -10`).
- Pick the new version. Patch (Z) for fixes, minor (Y) for features. Ask the user if unclear.

### 2. Branch + bump
- `git checkout -b release/X.Y.Z`
- Edit `xeet.php` Version and `readme.txt` Stable tag to `X.Y.Z`.
- Add a changelog entry to `readme.txt` under `== Changelog ==`, newest first:
  ```
  = X.Y.Z - YYYY-MM-DD =
  - <user-facing description of each change>
  ```
  Use today's date. Describe changes in user-facing terms, not implementation.

### 3. Open the release PR
- Commit (`Bump version to X.Y.Z`), push, `gh pr create`.
- Body should list the changelog entries.

### 4. Verify before merging — do not skip
- `gh pr view <number>` — confirm it's still **OPEN** (not already merged/closed).
- `gh pr checks <number> --watch` — every check must **pass**. Never merge on a red or pending check.

### 5. Merge
- `gh pr merge <number> --squash` once checks are green.

### 6. Tag the release — CONFIRM FIRST
- This triggers the WP.org deploy. **Ask the user to confirm before running it**, even in auto mode — it's an outward-facing production action.
- `gh release create X.Y.Z --title "X.Y.Z" --notes "<changelog bullets>"`
- The release notes should match the readme changelog.

### 7. Report
- Link the release page and note the deploy workflow is running.
- `git checkout main && git pull` to leave the user on an up-to-date main.

## Guardrails recap
- Both version files in sync — always.
- PR still open + all checks green before merge.
- Explicit confirmation before `gh release create` (prod deploy).
- Changelog is user-facing language, dated today.
