# CHANGELOG

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
