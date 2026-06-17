# Menu Rework Plan — Wok & Flame

**Goal:** Show the FULL Main Courses options (12 proteins × 23 styles) clearly, organise
the whole menu so it sits well on mobile + desktop, and never imply ordering — the site is
**display-only** (all "Order" CTAs go to Just Eat / phone; there is no cart).

Status: prototyping the recommended design in the **lab** (`/lab/menu`) so the live UI is not
touched until approved. Live menu = `app/components/MenuHighlights.tsx`.

---

## Phase 0 — Discovery (facts to build on)

### Integration points to PRESERVE
- Live menu rendered in `app/page.tsx` between `<About/>` and `<MapSection/>`; section must keep `id="menu"`.
- `#menu` is anchored from: Navbar `{label:"Menu", href:"#menu"}` ([Navbar.tsx:14](app/components/Navbar.tsx#L14)), Footer ([Footer.tsx:30](app/components/Footer.tsx#L30)), Hero "Jump to menu" ([HeroClient.tsx:143](app/components/HeroClient.tsx#L143)). Relies on `id="menu"` + global `html{scroll-behavior:smooth}`.
- Every "Order" CTA → Just Eat (`https://www.just-eat.co.uk/restaurants-wokandgo-m20/menu`) or `tel:+441614346318`. **No cart anywhere** → confirms display-only.
- `MobileOrderBar` is fixed-bottom on mobile → menu needs bottom padding so last items aren't hidden.
- `menu.ts` consumers: `categoryIcons` keyed by `shortTitle` (keep keys stable); both lab pages.

### Patterns to COPY (do not invent)
- Tailwind v4 `@theme` ([globals.css](app/globals.css)): `--font-display:"Outfit"`; `char-950..50`, `vermillion(+dark/light)`, `jade` (sparingly); weight utilities `font-300/500/600/700/800`; `.hide-scrollbar`.
- `GlassCard` class (MenuHighlights.tsx:29–42; duplicated in both lab pages).
- `ease = [0.16, 1, 0.3, 1]`; framer-motion `initial/whileInView/transition`, `AnimatePresence`, `layoutId` pills.
- Phosphor `categoryIcons` map (MenuHighlights.tsx:10–26).
- Row pattern: name + dotted leader + price, spicy dot, Popular chip, veg leaf.
- **No accordion exists** — net-new (framer-motion height/opacity).

### Framework constraints (Next 16.2.3 / React 19.2.4 / framer-motion 12.38)
- `"use client"` at top; menu reads `menuData` directly (no function props from the server page).
- `next/image` (if ever used): `width`/`height` required, quality ∈ `[75,78,82,85]`, NO `priority`/`onLoadingComplete`. Menu is text-only — keep it so.
- UK English ("takeaway"). `prefers-reduced-motion` handled globally.

---

## Decisions

### D1 — Menu architecture → **Responsive: desktop tabs (kept) / mobile accordion** (owner-confirmed 2026-06-17)
- **Desktop (md+):** KEEP the existing MenuHighlights interactive tab switcher + floating wok —
  it's a deliberate desktop selling point. Unchanged.
- **Mobile:** collapsible accordion — category headers (icon + title + count + chevron),
  **collapsed by default** (fixes "too much real estate"), tap to expand, plus Expand-all toggle.
  Replaces the mobile "Jump To" grid + single-category content.
- Accordion uses a CSS `grid-rows` 0fr→1fr reveal (content stays in DOM = better SEO/a11y).
- Prototype saved at `/lab/menu` (commit c47c0b7).

### D2 — Mains presentation → **Static reference panel (no cart/builder)**
Two blocks: **"Choose a protein"** (12 proteins + prices, compact grid) and **"Cooked your way"**
(23 styles as flagged chips), one explainer line, and one illustrative example
("e.g. Chicken in Black Bean Sauce — £6.90"). **No selection requirement, no Order button on a
built combo** — honest for a display-only site, compact (~35 lines vs 276 rows).
- Rejected: the interactive two-step picker (`/lab/mains`) implies an order flow the site can't fulfil.

### D3 — Data → structure the mains styles
Move the 23 styles out of the Mains category `description` string into structured data:
`export const mainsStyles: {name:string; spicy?:boolean}[]` in `app/data/menu.ts` (keep the 12
Mains items as the proteins, and a short human description for the subtitle). Single source of truth.

---

## Implementation phases

**Phase 1 — Lab prototype (current):** rebuild `/lab/menu` as the accordion + static mains panel.
No live changes. Reviewable at `localhost:3000/lab/menu`.

**Phase 2 — Data:** add `mainsStyles` to `app/data/menu.ts` (copy the 23 styles from the lab STYLES
array). Verify `tsc` clean; `mainsStyles.length === 23`.

**Phase 3 — Promote to live:** replace the internals of `app/components/MenuHighlights.tsx` with the
approved accordion + MainsPanel, keeping the export name and `<section id="menu">` wrapper so all
anchors/`categoryIcons` keep working. Keep bottom padding for `MobileOrderBar`.

**Phase 4 — Cleanup + verify:** remove the old scroll-tab/floating-wok code; decide whether to delete
`/lab/*` previews. Run `next build`; manual mobile + desktop check (real estate, MobileOrderBar overlap,
reduced-motion).

## Anti-patterns to avoid
- No cart / "add to order" / Order button on a built combo (no fulfilment; misleads).
- Don't list 276 combos. Don't change `shortTitle` keys or drop `id="menu"`.
- No `next/image` `priority`/`onLoadingComplete`. Don't invent framer-motion APIs — copy existing patterns.
