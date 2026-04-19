# Wok & Flame — Open Items

Running list of things to fix / tighten before final sign-off. Not blockers for the demo; these are polish items flagged during review.

---

## Content

### About Us copy — remove AI-generic phrasing
**File:** `app/components/About.tsx`
**Issue:** The line *"…with a handful of Thai favourites like green curry and pad Thai for regulars who ask"* is ungrounded — it reads as AI-generic filler. "For regulars who ask" is a claim we can't back (how do we know regulars asked? it's a stock rhetorical frame).

**Fix:** Replace with specific, grounded language. Either:
- Anchor it in something factual (menu composition, kitchen history, a real story from the owner), or
- Drop the justification entirely and just state the menu includes them.

**Tool:** Run `/writing-skills` on the section when picking this up — it will flag other ungrounded patterns in the same pass.

---

## Menu UX

### Indicator mapping (Chilli / Popular / Veg) doesn't map cleanly
**File:** `app/components/MenuHighlights.tsx` → `categorySignals` useMemo
**Issue:** The conditional brightness for the three indicators doesn't accurately reflect every category's contents. Examples of what's off:

- **Veg detection** leans on a regex (`/vegetar|veg\b|tofu|mushroom|vegetable/i`) against category description + item name/desc. This misses categories whose veg options aren't flagged in copy (e.g. Sides with beansprouts, fried rice egg-only variants) and may also over-fire where the word appears without a real vegetarian option behind it.
- **Chilli detection** only checks the `spicy` boolean on items. Some categories have implicitly spicy dishes (Curries, Salt & Pepper with chilli) that aren't flagged in the data, so the indicator goes dark when it shouldn't.
- **Popular detection** only reflects items explicitly marked `popular: true`. Fine in principle, but needs a data-side audit to confirm all categories with genuine bestsellers have at least one flagged.

**Fix approach:**
1. Audit `app/data/menu.ts` — add missing `spicy` / `popular` flags where they should apply.
2. Replace the regex-based veg detection with an explicit `vegetarian: true` field on items (or a category-level `hasVegOptions` override).
3. Re-run the legend across all 15 categories and confirm each indicator brightens/dims correctly.

---

## Done
- [x] Mobile nav restructure — integrated slider, Jump To 9-grid, indicators below
- [x] Slider card scrollbar removal + auto-scroll to active icon
- [x] Jump To expanded back to full 15 categories (primary mobile nav)
