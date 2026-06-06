# Guess Animal Assets

This folder keeps replaceable local assets for the static mini app.

- `thumbnails/`: replace animal thumbnail SVG files here.
- `mascot/owl.svg`: replace the owl mascot here.
- `sounds/correct.mp3`: correct-answer sound.
- `sounds/wrong.mp3`: wrong-answer sound.
- `real/thumbnails/`: optional production `.webp` animal thumbnails.
- `real/mascot/owl-guide.webp`: optional production mascot image.
- `real/sounds/correct.mp3` and `real/sounds/wrong.mp3`: optional production sounds.

The app prefers real assets first, then keeps starter SVG, emoji, and Web Audio fallback behavior if an asset is missing or fails to load.

Use lightweight files so the app stays fast on mobile and public static deploys.
