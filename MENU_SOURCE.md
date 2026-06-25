# Wok & Flame menu source

The site's menu mirrors the printed Wok & Flame menu the owner
provided as 3 photographs in June 2026. The full audited dataset lives in
[wokflame_menu_verified.xlsx](wokflame_menu_verified.xlsx) at repo root; the
live code copy is [app/data/menu.ts](app/data/menu.ts).

## Cover-page details (not in menu items)

| Field | Value |
| --- | --- |
| Address | 206 Burton Road, West Didsbury, M20 2LW |
| Phone | 0161 434 6318 |
| Website | www.wokandflame.co.uk |
| Hours | 5:00 pm – 11:00 pm, 7 nights a week |
| Delivery charge | £1.70 |
| Tagline | "For Fine Cantonese Cuisine" |
| Owner quote | "There's no difference in what I sell and what I eat: everything is made to be the very best!" — *The Big Chinaman* |

> ⚠️ **Domain flag (2026-06-25):** the printed menu advertises `www.wokandflame.co.uk`, but
> that domain now **redirects to a spam survey site (`survey-smiles.com`) — it is squatted, not
> owned by the business.** The live site is **`https://www.wokandflame.co`** (Vercel), which is
> what every SEO/canonical/JSON-LD reference points to. **Action for Wing:** reclaim `.co.uk`
> defensively and redirect it to `.co`, and use `.co` on any reprinted menus/signage.

## Photo set

1. **Cover** — hours, delivery charge, address, phone, website, tagline, owner quote.
2. **Inside left page** — Soup, Appetisers, Sweet & Sour, Main Courses (12 proteins + 23 sauce-style matrix), Curry Dishes.
3. **Inside right page** — Deep Fried Shredded, Fried Rice, Noodles/Vermicelli/Pad Thai/Udon, Wok & Flame Specials, Desserts, Side Extras & Sauces, Set Meals, Imperial Banquets.

Photos live in conversation history and (when the menu changes) should be
re-photographed and re-extracted into a fresh xlsx, then diffed against
`app/data/menu.ts`.

## Open items requiring client confirmation

Tracked in the header comment of `app/data/menu.ts`. Current list:

1. **Beef Thai Green Curry £6.50** — printed price; every sibling Thai variant is £6.90. Likely a print typo.
2. **Drinks (cans)** — printed menu has no drinks section. Restored from Just Eat with £1.20 placeholders; confirm in-store prices and which cans are actually stocked.
3. **Hoisin Sauce** as a standalone pot — not on printed menu.
4. **BBQ Sauce** as a standalone pot — not on printed menu.
5. **Salt & Pepper Chicken (main portion)** — only the appetiser size (£6.00 for Pieces, £5.90 for Wings) is on the menu.
6. **Salt & Pepper Chips & Chicken Box** — not on this menu (Wok & Go offered it).

## Spelling kept verbatim from the printed menu

- `Char Sui` (not "Char Siu")
- `Won Ton` (not "Wonton")
- `Cashewnuts` (one word)
- `Beansprouts` (one word; menu uses both spellings, normalised to this)
- `Waterchestnut` (one word)
- `Sing Chow` for the vermicelli (= Singapore Chow)
- `Pad Thai` normalised from the menu's `Padthai`
