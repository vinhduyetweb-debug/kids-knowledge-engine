# CHANGELOG

## Task — Guess Animal Mobile UX, Sound and Achievements

- Added mobile next-question auto scroll to the animal visual/question area.
- Added a sound toggle persisted with `localStorage`.
- Improved correct, wrong and victory sound effects without adding default background music.
- Expanded achievement milestones to 3, 5, 10, 15, 20, 30, 50, 75 and 100 correct answers.
- Added an achievement modal with a large CSS badge visual and Continue action.
- Kept Quiz V2 image mapping unchanged: hero images use `item.id`, option images use `option.animalId`.

## Task — Animal Dataset V2 Option Images

- Added 100-item V2 quiz dataset with `animalId` and `label` option records.
- Added strict V2 validation for id coverage, correct answer ids, wrong answer ids, labels and WebP asset existence.
- Updated the mini app to prefer valid V2 data and render option thumbnails from `option.animalId`.
- Kept V1 fallback behavior if V2 is missing or invalid.

## Task — Guess Animal UI Polish Pack

- Polished the static mini app UI for mobile-first play.
- Improved animal image framing, answer card touch targets, focus states and compact quiz spacing.
- Kept quiz logic, dataset, asset mapping, sound, vibration and badge behavior unchanged.

## Fix — Show Hero Thumbnail During Questions

- Fixed question render state so the hero image uses the current item thumbnail instead of the neutral question mark.

## Fix — Canonical Real Thumbnail Selection

- Changed real animal thumbnail selection to use canonical `item.id` asset keys.
- Stopped selecting hero images from Vietnamese answer/title/fact keyword matching.
- Prevented option card thumbnails from showing guessed animal images for non-animal answer text.

## Task 10B — Safe Asset Intake Workflow

- Added safe asset inventory and mapping scripts.
- Added contact sheet and expected filename generation for animal thumbnails.
- Added guarded mapping apply flow that does not rename or delete raw files.
- Kept dataset/schema/app logic unchanged.

## Task 9.1 — Fix Broken Asset Fallback UI

- Fixed broken image fallback rendering when real assets are missing.
- Prevented raw alt text from appearing in answer cards and hero image area.
- Kept SVG/emoji fallback behavior without duplicate thumbnail rendering.

## Task 9 — Real Asset Replacement Pack

- Added real asset priority paths for animal thumbnails, mascot and sounds.
- Kept SVG/emoji/Web Audio fallback behavior.
- Added real asset documentation and replacement rules.
- Preserved wrong-answer vibration feedback.
- Kept static architecture with no backend/framework/package/CDN/storage.

## Task 8 — Asset Replacement Pack

- Added local asset structure for thumbnails, mascot and sounds.
- Added starter SVG thumbnails and owl mascot asset.
- Added safe asset fallback behavior.
- Added wrong-answer vibration feedback on supported mobile devices.
- Updated user-facing age display from 3-5 to 3 - 7 tuổi while preserving dataset/schema.
- Kept static architecture with no backend/framework/package/CDN/storage.

## Task 7 — Kids Experience Upgrade Pack

- Improved Vietnamese font consistency and overall typography.
- Upgraded answer buttons into large mobile-friendly cards.
- Added animal thumbnails for answer choices.
- Added mascot guide with lightweight motion.
- Added correct/wrong reward sounds with swappable local sound files.
- Added reward feedback, badge milestones and child-friendly UI polish.
- Increased visual emphasis on animal imagery for better pre-reader usability.

## Task 6 — Final MVP Polish + Share Pack

- Added MVP handover document.
- Added parent testing guide.
- Added feedback form template.
- Added share copy for testers.
- Updated final MVP checklist with public PASS status.
- Updated landing page with parent testing note.

## Fix — Public Mini App Route Assets

- Switched guess-animal CSS, data and app script tags to absolute public paths.
- Switched JSON fallback fetch to an absolute public path.
- Added build log `20260606-fix2` for public cache verification.
- Updated landing CTA to `/apps/guess-animal/`.
- Updated Vercel config to keep trailing slashes for folder routes.

## Fix — Public Mini App Data Loading

- Added JSON data fallback for public static deploy.
- Updated mini app initialization to wait for DOMContentLoaded.
- Added explicit data load error state.
- Updated landing CTA to use `/apps/guess-animal/`.

## Task 5B — Deploy Vercel Ready Pack

- Added Vercel deployment guide.
- Added final MVP checklist.
- Verified static deploy readiness.
- Confirmed no backend/framework/package/API/fetch/storage was added.

## Task 5A — Product Export Printable Pack

- Added printable ebook HTML export.
- Added printable flashcards HTML export.
- Added coloring prompt book markdown export.
- Added print guide for manual PDF creation.
- Updated export script with printable output support.

## Task 4 — Landing + Deploy Ready

- Added static landing page for Bé Khám Phá Thế Giới.
- Added link from landing page to guess-animal mini app.
- Added simple Vercel static configuration.
- Updated README with local run and deploy notes.

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
