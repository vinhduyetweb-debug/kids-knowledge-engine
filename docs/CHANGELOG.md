# CHANGELOG

## Task 3 — Mini App Product Upgrade

- Upgraded guess-animal mini app to use the reviewed 100-item dataset.
- Added randomized quiz flow, score tracking and replay.
- Added lightweight category filtering.
- Added parent guidance section and content status display.
- Kept the app static with no backend/framework/package/fetch/storage.

## Task 2F — Content Fix Batch 4

- Improved the final batch of draft animal items in `animals_vi_3_5_mvp_100.json`.
- Added safety notes for animal items that require adult guidance.
- Re-exported the 100-item generated outputs.
- Updated content review report with final Batch 4 progress.
- Completed first full reviewed version of the 100-item animals dataset.

## Task 2E — Content Fix Batch 3

- Improved the third batch of draft animal items in `animals_vi_3_5_mvp_100.json`.
- Added safety notes for animal items that require adult guidance.
- Re-exported the 100-item generated outputs.
- Updated content review report with Batch 3 progress.

## Task 2D — Content Fix Batch 2

- Improved the second batch of draft animal items in `animals_vi_3_5_mvp_100.json`.
- Added safety notes for animal items that require adult guidance.
- Re-exported the 100-item generated outputs.
- Updated content review report with Batch 2 progress.

## Task 2C — Content Fix Batch 1

- Improved the first batch of draft animal items in `animals_vi_3_5_mvp_100.json`.
- Added missing safety notes for bee and lion items.
- Re-exported the 100-item generated outputs.
- Updated content review report with fixed items and remaining draft items.

## Task 2B.5 — Content Quality Review Pack

- Added `docs/CONTENT_REVIEW_MVP_100.md`.
- Reviewed 100-item animals dataset for age fit, riddle quality, fact risk, safety notes and consistency.
- Listed items that need manual review before publishing.

## Task 2B — Content Expansion Pack

- Added `content/animals/animals_vi_3_5_mvp_100.json`.
- Expanded animals dataset from 20 to 100 items while preserving the original 20-item file.
- Updated export script to support custom source and suffix arguments.
- Added validation for duplicate ids, duplicate titles, quiz options and required fields.
- Generated export outputs for the 100-item dataset.

## Task 2A — Export Engine Pack

- Added `tools/export-content.js`.
- Added generated export outputs for ebook, flashcards, coloring prompts, video scripts and parent guide.
- Added lightweight validation before export.
- Updated README with export instructions.

## 2026-06-05 - Task 1 Safe Improvement

### Checked
- Validated `content/schema.json` can be parsed as JSON and keeps the current MVP content fields.
- Validated `content/animals/animals_vi_3_5_mvp_20.json` can be parsed as JSON.
- Confirmed the animals dataset has 20 items, no duplicate `id`, valid `ageGroup`, valid `status`, and quiz answers present in their options.

### Changed
- Added a small quiz section to `apps/guess-animal` using the existing `quiz` field in each content item.
- Added minimal quiz styling in `apps/guess-animal/style.css`.

### Not Changed
- Did not change `content/schema.json`.
- Did not delete or rewrite old content items.
- Did not add a backend, framework, package manager, or external dependency.
- Kept the mini app runnable as static files through `apps/guess-animal/index.html`.
