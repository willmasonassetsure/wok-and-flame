# Wok & Flame — Open Items

Running list of things to fix / tighten before final sign-off. Not blockers for the demo; these are polish items flagged during review.

---

## Open

_(empty — all known items addressed. Add new ones here as they come up.)_

---

## Done

### About Us copy — remove AI-generic phrasing ✓
**Fixed in:** `app/components/About.tsx`
- Removed ungrounded "for regulars who ask" framing.
- Replaced with specific dish names actually on the menu: "A shorter Thai section sits alongside — pad Thai, tom yum, green and red curries."
- New copy grounds the claim in menu reality instead of invented customer behaviour.

### Indicator mapping (Chilli / Popular / Veg) ✓
**Fixed in:** `app/data/menu.ts` + `app/components/MenuHighlights.tsx`

Data-side:
- Added explicit `vegetarian?: boolean` field to `MenuItem` type.
- Audited all 15 categories and flagged every genuinely vegetarian item (no meat/seafood/oyster sauce/fish-stock; mock chicken counts as veg; gravy and curry sauce excluded because they use meat stock).
- Added missing `popular: true` to categories with real bestsellers that had none flagged: Hot & Sour Soup, Chicken with Black Bean Sauce, Kung Po Chicken, Chicken Curry, Thai Green Curry Chicken, Chicken Pad Thai, Chips, Salt & Pepper Chips.
- Added `spicy: true` to Kimchi.

Component-side:
- Replaced regex-based `hasVeg` detection (which scanned descriptions and item names for "tofu|mushroom|vegetable|veg\b") with a clean `category.items.some(i => i.vegetarian)` check.
- All three signals (Chilli / Popular / Veg) now read from explicit flags, so the indicator row accurately lights up per category.

### Mobile nav restructure ✓
- Integrated slider (title + icon bar in one card)
- Jump To grid as primary mobile nav, now showing all 15 categories
- Slider auto-scrolls to centre active icon
- iOS-style scrollbar pill hidden on mobile
