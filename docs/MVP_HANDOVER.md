# Kids Knowledge Engine MVP Handover

## What this MVP includes

- Landing page
- Static mini app
- 100 reviewed animal riddles for ages 3-5
- Export engine
- Printable ebook/flashcard outputs
- Vercel deploy readiness

## Key URLs

- Landing:
- Mini app: `/apps/guess-animal/`

## Folder structure

Tóm tắt các thư mục chính:
- `content/`
- `apps/`
- `exports/generated/`
- `exports/printable/`
- `docs/`
- `tools/`

## How to run local

- Open `index.html`
- Open `apps/guess-animal/index.html`

## How to export products

```bat
node tools\export-content.js --source content\animals\animals_vi_3_5_mvp_100.json --suffix mvp_100 --printable
```

## How to deploy

```bat
vercel --prod
```

## Current limitations

- No backend
- No account system
- No child data collection
- No image assets yet
- Printable outputs need final human review before selling

## Next recommended steps

1. Test with 3-5 parents.
2. Collect feedback.
3. Improve landing copy.
4. Convert printable HTML to PDF manually.
5. Prepare first free/paid bundle.
