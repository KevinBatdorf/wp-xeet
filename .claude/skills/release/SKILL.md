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

### 2b. Update "Tested up to" against the latest WordPress beta/RC

`readme.txt` has `Tested up to:        X.Y`. This should reflect the newest
WordPress version we've actually run our tests against — the upcoming
**beta/RC** if a release cycle is in flight, otherwise the latest stable.
**Never use an alpha/nightly** for this — alpha is unstable trunk, not a real
target.

1. Find the latest stable and the current development version:
   ```sh
   curl -s "https://api.wordpress.org/core/version-check/1.7/?channel=development" \
     | python3 -c "import sys,json; d=json.load(sys.stdin); o={x['response']:x['current'] for x in d['offers']}; print('stable:', o.get('latest')); print('dev:', o.get('development'))"
   ```
2. Decide the target version:
   - If `dev` contains `beta` or `RC` (e.g. `6.9-RC1`) → a cycle is active. Target
     is that version's major.minor (e.g. `6.9`).
   - If `dev` contains `alpha` (e.g. `7.1-alpha-62472`) → no beta yet. Target is
     the latest **stable** major.minor (e.g. `7.0`). Leave "Tested up to" there.
3. If the target is a beta/RC, run the suite against it before claiming support:
   ```sh
   WP_VERSION=<beta-version> npm run test:e2e
   ```
   (`playwright.config.ts` and `scripts/run-e2e.mjs` both read `WP_VERSION`;
   default is `latest`.) Tests must pass against that version.
4. Set `Tested up to:` to the target major.minor (e.g. `6.9` or `7.0`) — the
   WordPress.org readme expects `X.Y`, not a beta suffix.

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
