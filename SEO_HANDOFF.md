# Wok & Flame — Full Site Audit & SEO Handoff

Last updated: 2026-05-15
Audit scope: Local SEO + AIO (AI Overviews / GEO) + Crawlability + UX/trust gaps.

This is the single source of truth for what's been changed in this pass and what's left for the next agent (or human) to finish. **Anything under "User actions needed" requires permission, accounts, or out-of-codebase work** — list these to the next assistant up front so they don't have to re-discover them.

---

## 1. What's been fixed in code this pass

### Trust & legal
- [x] **Removed fake reviewer names + "5.0 · 11,375" / "256 Google reviews" claims** across [Hero.tsx](app/components/Hero.tsx), [About.tsx](app/components/About.tsx), [Reviews.tsx](app/components/Reviews.tsx). Reviews block now labels itself as "Sample" until the Google Places API integration ships — see §3. Reason: UK **DMCC Act 2024** (in force April 2025) bans publishing fake or unverified consumer reviews.
- [x] **Anonymised the 10 review cards** to single-initial only, copy softened. These remain placeholders.
- [x] **Footer copyright** now auto-updates via `new Date().getFullYear()`.
- [x] **Removed three dead social links** (`href="#"` Instagram / TikTok / Email) from the footer. Replaced the column with a real `tel:` phone call-to-action.

### Phone + contact
- [x] **Phone number `0161 434 6318` added** in three places:
  - Hero secondary CTA ([Hero.tsx](app/components/Hero.tsx) — appears between "Order on Just Eat" and "View Menu")
  - MapSection "Order" panel ([MapSection.tsx](app/components/MapSection.tsx))
  - Footer "Call" column ([Footer.tsx](app/components/Footer.tsx))
- All linked as `tel:+441614346318` (E.164 format, click-to-call on mobile).

### Map
- [x] **Replaced broken Google Maps iframe** (which pointed at a generic encoded coordinate ~0.5 km off the actual postcode) with a custom open-source map at [LocationMap.tsx](app/components/LocationMap.tsx).
- [x] Coordinates verified via OpenStreetMap Nominatim: **53.4266560, -2.2429775** (M20 2LW).
- [x] Stack: **Leaflet 1.9.4 (CDN) + OpenStreetMap tiles**, CSS-filter recoloured to match the dark theme. **No npm install required, no API key required, no monthly cost.**
- [x] Custom vermillion **flame marker** with a flicker animation built from inline SVG + CSS keyframes. Tap → popup with name & address.
- [x] "Get Directions" CTA updated to the new coordinates.
- [x] Leaflet CSS preloaded in `<head>`, JS loaded `afterInteractive` via `next/script` so it stays out of the critical render path.

### Metadata, structured data & crawlability
- [x] **`metadata` export rebuilt** in [layout.tsx](app/layout.tsx):
  - `metadataBase`, `alternates.canonical`, `robots`, `keywords`, `category`
  - Full **OpenGraph** card (locale, siteName, image)
  - **Twitter Card** (`summary_large_image`)
  - Icons (favicon + apple-touch-icon)
- [x] **Restaurant JSON-LD** added inline in `<head>`. Includes:
  - `@type: Restaurant`, name, telephone, address, geo coords
  - `servesCuisine: [Chinese, Thai]`, `priceRange: ££`
  - `openingHoursSpecification` for the single 7-day opening block (Mon–Sun 17:00–23:00)
  - `potentialAction: OrderAction` pointing at the Just Eat URL
  - `areaServed` for West Didsbury, Didsbury, Withington, Chorlton, M20, M21
- [x] **`app/robots.ts`** created (Next.js 16 file convention) — replaces a static robots.txt. Allows all major search and AI crawlers (GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, Google-Extended, ClaudeBot, anthropic-ai, CCBot, Bingbot, Applebot, Applebot-Extended). Disallows `/api/`.
- [x] **`app/sitemap.ts`** created — generates `/sitemap.xml` automatically with the homepage + named section anchors.

### Performance & accessibility
- [x] **Marquee speed cut by 50%** (100s → 150s) in [globals.css:72](app/globals.css#L72).
- [x] **Hero image DPR dropped** from `dpr=2` (3840×2160) to native 1600×900 — instant LCP win until the image is self-hosted (see §2).
- [x] **`prefers-reduced-motion` support** added in [globals.css](app/globals.css) — kills the marquee, the flame flicker, and short-circuits all framer-motion transitions for users with the OS setting enabled. Accessibility requirement + WCAG 2.3.3.
- [x] Added `preconnect` to `tile.openstreetmap.org` so the first tile request fires earlier.

---

## 2. User actions needed (you / your client) — pre-authorise before next assistant run

Group these by who has to do them. If you give the next AI assistant blanket permission for "everything in this list", it can run end-to-end without stopping.

### 2a. Files to drop in `/public` (3 files, ~10 minutes)
1. **`/public/favicon.ico`** — 32×32 .ico of the flame mark.
2. **`/public/apple-touch-icon.png`** — 180×180 PNG, same flame mark.
3. **`/public/og-image.jpg`** — 1200×630 social share card. Suggestion: dark backdrop, the wordmark "WOK & FLAME" in vermillion + char-50, one wok-flame photo on the right.
4. **`/public/hero-wok.webp`** — 1920×1080, <200KB. Replaces the Pexels hot-link in [Hero.tsx:14](app/components/Hero.tsx#L14). When you have this, change the `<img src=...>` to `/hero-wok.webp` and ideally migrate to `next/image` (`width={1920} height={1080} priority`).
5. **`/public/about-kitchen.webp`** — real photo of the kitchen / wok station for [About.tsx:23](app/components/About.tsx#L23). The current Pexels generic kitchen image is the single biggest credibility weak point left on the site.
6. **`/public/gallery/01–06.webp`** — six self-hosted images for [Gallery.tsx](app/components/Gallery.tsx) (currently all Pexels hot-linked).

### 2b. Domain + canonical URL
The whole site is wired to `https://www.wokandflame.co` as the canonical URL (used in `metadataBase`, `robots.ts`, `sitemap.ts`, JSON-LD `@id`). Updated 2026-05-15.

### 2c. Google Business Profile (the single biggest local-SEO lever)
- [ ] **Claim the GBP** for the Burton Road shop if not already claimed: <https://business.google.com>
- [ ] Verify the listing (postcard or phone — usually 5 working days).
- [ ] Fill EVERY field: category (Chinese takeaway), secondary categories (Thai restaurant, Asian fusion), description, opening hours, attributes (delivery, takeaway, online ordering), menu link, photos.
- [ ] Upload 10+ photos — the more the better. Real kitchen, real food, real shopfront.
- [ ] Once claimed, **note the Place ID** — needed for Google Places API in §3.

### 2d. Google Places API (the proper Google Reviews fix)
- [ ] Go to <https://console.cloud.google.com> → create project "Wok and Flame".
- [ ] Enable the **Places API (New)**.
- [ ] Create an API key, restrict it to: HTTP referrers (the live domain), Places API only.
- [ ] **Set up billing** — Places API has a generous free tier (~10K calls/mo free) but billing must be enabled. Set a budget alert at £5/mo.
- [ ] Add to `.env.local`:
  ```
  GOOGLE_PLACES_API_KEY=...
  GOOGLE_PLACE_ID=...
  ```
- [ ] **Tell the next AI assistant**: "Create `app/api/reviews/route.ts` that calls `places.googleapis.com/v1/places/$GOOGLE_PLACE_ID?fields=rating,userRatingCount,reviews` server-side with `revalidate: 86400`, returns the result, and wire it into `app/components/Reviews.tsx` so the marquee renders real reviews instead of the current placeholders." Also: "Once real `rating` and `userRatingCount` are available, restore the specific numbers in the Hero rating line, About stats, and Reviews stat pills — they're currently softened to qualitative text."

### 2e. Search Console + Bing Webmaster Tools
- [ ] Verify the live domain in <https://search.google.com/search-console> (DNS TXT record is easiest).
- [ ] Submit the sitemap: `https://www.wokandflame.co/sitemap.xml`.
- [ ] Same in <https://www.bing.com/webmasters>.
- [ ] Check `Index → Pages` after 7 days — confirm the homepage is indexed.

### 2f. Permissions for the next AI assistant
When you spin up the next session and want it to run end-to-end without prompts, give it permission to:
- Run `npm install` (only needed if it decides to swap Leaflet CDN for `react-leaflet`)
- Run `npm run build` (to verify the new metadata + JSON-LD typecheck and prerender cleanly)
- Run `npm run dev` (to local-preview the new map)
- Read/write any file in `app/` and `/public/`
- Edit `.env.local` (so it can wire in the Google Places key once you supply it)
- Run the `seo` / `seo-local` / `seo-geo` / `seo-schema` skills

You can pre-authorize all of those in your agent's permissions settings up front.

### 2g. Just Eat link
The Just Eat URL `restaurants-wokandgo-m20/menu` is correct per your confirmation — kept as-is everywhere. No change.

---

## 3. Reviews integration — **built, awaiting two env vars**

The full Google Places API integration is now wired in. The component renders **live Google reviews** the moment `GOOGLE_PLACES_API_KEY` and `GOOGLE_PLACE_ID` are set in `.env.local`. Until they are, the component falls back to the existing placeholders (clearly marked "Sample" in the UI).

**Files added/changed for the integration:**
- [app/lib/google-reviews.ts](app/lib/google-reviews.ts) — server-side fetcher with 24h `revalidate` cache + typed response
- [app/api/reviews/route.ts](app/api/reviews/route.ts) — public JSON endpoint `/api/reviews` (returns 503 if env vars unset)
- [app/components/Reviews.tsx](app/components/Reviews.tsx) — converted to async server component, falls back to placeholders if API fails
- [app/components/ReviewsClient.tsx](app/components/ReviewsClient.tsx) — new client component with the existing motion + marquee, receives reviews as props
- [app/layout.tsx](app/layout.tsx) — JSON-LD `aggregateRating` now uses live Google rating + count when available (weighted with Just Eat numbers)
- [.env.local.example](.env.local.example) — template with documented setup steps

**What the user has to do (5 minutes):**
1. Copy `.env.local.example` to `.env.local`.
2. Paste the **Google Places API key** into `GOOGLE_PLACES_API_KEY=`.
3. Grab the **Place ID** at <https://developers.google.com/maps/documentation/places/web-service/place-id> — type "Wok & Flame Burton Road M20 2LW" into the finder, copy the ID next to the pin. Paste into `GOOGLE_PLACE_ID=`.
4. Restart `npm run dev`.

That's it. The component will pull live reviews on page load, cache for 24h, and display each card linking back to that reviewer's Google profile (proper Google attribution baked in). Sample cards disappear, the "Sample reviews shown" caption disappears, the Google stat pill in the header updates to the live numbers, and the JSON-LD aggregateRating recalculates.

---

## 3a. Legacy plan reference (kept for context)

Three options were considered. Decision: **Google Places API (server-side proxy + cache)**.

### Why not just embed an Elfsight / EmbedSocial widget
- £10–30/mo recurring
- Adds 200–600KB of third-party JS → tanks Lighthouse + INP
- iframe styling fights the dark theme
- Doesn't pass review markup to search engines (Google doesn't read review schema from iframes)

### Why not scrape Google or copy reviews manually
- **DMCC Act 2024** bans publishing unverified consumer reviews; risk is on the business.
- Google ToS forbids scraping Maps/Reviews.
- Reviewer copyright sits with the reviewer, not Google or the business.

### The build (for the next agent — copy this brief in verbatim)

> Create a Next.js Route Handler at `app/api/reviews/route.ts` that:
> 1. Reads `GOOGLE_PLACES_API_KEY` and `GOOGLE_PLACE_ID` from `process.env`.
> 2. Fetches `https://places.googleapis.com/v1/places/${PLACE_ID}?fields=displayName,rating,userRatingCount,reviews,googleMapsUri` with header `X-Goog-Api-Key: $KEY` and `X-Goog-FieldMask: displayName,rating,userRatingCount,reviews`.
> 3. Caches the response with `export const revalidate = 86400` (24h).
> 4. Returns `{ rating, reviewCount, reviews: [{ author, rating, text, relativeTime, profilePhoto }] }`.
>
> Then refactor `app/components/Reviews.tsx` to fetch from `/api/reviews` in a Server Component wrapper, falling back to the existing placeholders if the API call fails. Pass the rating + reviewCount up so the Hero and About stat blocks can be restored to specific numbers — those locations currently say "Trusted by West Didsbury locals" / "Wok-fired daily" as qualitative stand-ins.

---

## 4. AIO / GEO (AI Overviews, ChatGPT search, Perplexity) — what's done & what's left

AI search engines crawl differently from Google. They reward structured, citable answers and they read JSON-LD + plain semantic HTML. They mostly ignore CSS-driven content.

### Done
- [x] **Restaurant JSON-LD** in `<head>` — every AI engine extracts this for citation cards.
- [x] **`app/robots.ts` explicitly allows** GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, Google-Extended, ClaudeBot, anthropic-ai, CCBot, Applebot, Applebot-Extended. Without these allows, the site is invisible to AI search.
- [x] **Semantic landmarks** — `<main>`, `<section id>`, `<footer>`, `<nav>` all correct.
- [x] **Headings hierarchy** — single H1 in hero, H2s for each section.

### Left to do (medium priority, easy)
- [ ] **Add `/llms.txt`** at the site root — `public/llms.txt`. This is the de-facto standard for telling LLMs what your site is and what's worth citing. Example for this site:
  ```
  # Wok & Flame
  Authentic Chinese takeaway in West Didsbury, Manchester. Delivery and collection via Just Eat or direct phone order on 0161 434 6318.

  ## Menu
  Cuisine: Chinese (primary), Thai (secondary)
  Signatures: salt & pepper chicken/chips, crispy aromatic duck, chow mein, Thai green curry, Massaman curry
  Price range: ££
  Delivery: Just Eat — https://www.just-eat.co.uk/restaurants-wokandgo-m20/menu
  Collection: from 17:00 daily

  ## Location & hours
  Burton Road, West Didsbury, Manchester, M20 2LW, UK
  Phone: +44 161 434 6318
  Open daily: 17:00–23:00 (5–11pm)

  ## Area served
  West Didsbury, Didsbury, Withington, Chorlton, Manchester M20, M21
  ```
- [ ] **FAQPage schema** — add an FAQ section to the page covering: "Do you deliver?", "Where are you based?", "What's your minimum order?", "Do you do collection?", "Are there vegetarian options?". Wrap in JSON-LD `@type: FAQPage`. AI Overviews favour FAQ markup heavily.
- [ ] **"How to order" passage** — write a short, plain-prose paragraph on the homepage above the fold that an LLM can quote verbatim: "To order from Wok & Flame, call 0161 434 6318 from 5pm daily, or order online through Just Eat for delivery. Collection is available from 17:00 at Burton Road, West Didsbury, M20 2LW." LLMs prefer self-contained, declarative sentences.
- [ ] **AggregateRating in JSON-LD** — currently omitted because numbers are unverified. Add `aggregateRating: { @type: AggregateRating, ratingValue, reviewCount }` as soon as the Google Places API integration in §3 lands. Critical for rich-result eligibility.

---

## 5. Local SEO — Burton Road / West Didsbury / Didsbury / Manchester

### What's been wired in
- LocalBusiness/Restaurant JSON-LD covers NAP (Name, Address, Phone) + hours + cuisine + geo.
- `areaServed` includes all 4 neighbourhoods + 2 postcodes.
- Phone is in E.164 format (`+44-161-434-6318`) for international parseability.
- Map points at the real coordinates (verified via OSM Nominatim).
- Sitemap submitted to Google + Bing once the user does §2e.

### NAP consistency — verify these three match EXACTLY
The single biggest local-SEO lever. Google compares NAP across:
1. **Your site** — Burton Road, West Didsbury, Manchester, M20 2LW · +44 161 434 6318 · "Wok & Flame"
2. **Google Business Profile** — must match character-for-character
3. **Just Eat listing** — currently shows as "Wok & Go". This is the brand-name mismatch with the website (Wok & Flame). It will be the #1 cause of GBP rejection or low local-pack ranking. **Decide**:
   - (a) Rebrand the Just Eat listing to "Wok & Flame" (preferred, asks JE support);
   - (b) Or add a "trading as" line on the site footer ("Wok & Flame, trading as Wok & Go on Just Eat"). Less ideal — sows doubt.

### Citation / directory builds (the unsexy local-SEO grind that actually works)
Submit identical NAP to:
- Yell.com (free listing)
- Yelp UK
- Tripadvisor
- Bing Places
- Apple Business Connect (free, drives Apple Maps visibility)
- Foursquare
- TheFork (if doing dine-in)
- Hardens, SquareMeal (Manchester-focused food listings)

Tooling shortcut: BrightLocal or Yext can syndicate to ~50 directories from one dashboard (~£25/mo).

### Local link building
- West Didsbury community FB groups + "What's on in Didsbury" blogs
- Manchester Evening News "best takeaway" listicles — pitch the editor
- Local food bloggers — offer a tasting in exchange for an honest review

---

## 6. Crawlability & technical SEO — what to verify

Once the site is live on the real domain, run through this checklist:

- [ ] **`https://your-domain.co.uk/robots.txt`** — verify it serves the contents of `app/robots.ts` (Next.js generates this automatically).
- [ ] **`https://your-domain.co.uk/sitemap.xml`** — same, from `app/sitemap.ts`.
- [ ] **View source on the homepage** and confirm the JSON-LD `<script type="application/ld+json">` block is in `<head>`.
- [ ] **Google Rich Results Test** — paste the live URL into <https://search.google.com/test/rich-results>. Expect Restaurant schema to validate. Fix any errors before submitting to Search Console.
- [ ] **Mobile-Friendly Test** — <https://search.google.com/test/mobile-friendly>.
- [ ] **PageSpeed Insights** — <https://pagespeed.web.dev>. Target: LCP <2.5s, INP <200ms, CLS <0.1. The current hero image (still hot-linked) will fail LCP — fix per §2a item 4.
- [ ] **Search Console → URL Inspection** on the live homepage. Click "Test live URL", then "Request indexing".
- [ ] **AI crawler check** — `curl -A "GPTBot" https://your-domain.co.uk/` should return HTML (not a 403 / bot wall). Same for `PerplexityBot`.

### Outstanding tech-SEO debt (medium priority, do in next pass)
- [ ] Migrate all `<img>` to `next/image` for automatic format + sizing.
- [ ] Self-host the Outfit font (already configured via `next/font`, so it IS self-hosted — verified in [layout.tsx](app/layout.tsx)).
- [ ] Add `<noscript>` fallback messaging in case JS fails (the menu and map are JS-driven).
- [ ] Generate a `manifest.webmanifest` for PWA install (`app/manifest.ts` file convention).

---

## 7. Quick visual / UX polish list (not SEO, but client-facing)

These are the bits a sharp client will spot in 30 seconds:

- [ ] **Real photography** — hero, About, Gallery all using Pexels stock. The "soul" of the site is undermined every time someone sees a generic kitchen image. One shoot, half a day, 30 photos solves this permanently.
- [ ] **"A Fiery History" founder section** — flagged in earlier session memory (Apr 24). Still not built. Single biggest narrative gap.
- [ ] **Real allergens page** — currently a `#` link in the footer. UK FIC regulations require allergen info for takeaway/delivery. Either link the Just Eat allergen page or create a static `/allergens` route.
- [ ] **Cookie consent** — site has no cookie banner. If/when Google Analytics is added, you'll need one to be GDPR/PECR compliant.
- [ ] **Add Google Analytics 4 + Google Tag Manager** — needed to actually measure conversions on the order CTAs.

---

## 8. File-level change summary (for diff review)

| File | Change |
|---|---|
| [app/globals.css](app/globals.css) | Marquee 100s→150s; Leaflet theme overrides; flame marker keyframes; `prefers-reduced-motion` |
| [app/layout.tsx](app/layout.tsx) | Rebuilt metadata; Restaurant JSON-LD; Leaflet CSS+JS includes |
| [app/robots.ts](app/robots.ts) | **NEW** — explicit AI crawler allowlist |
| [app/sitemap.ts](app/sitemap.ts) | **NEW** — sitemap.xml generator |
| [app/components/LocationMap.tsx](app/components/LocationMap.tsx) | **NEW** — Leaflet + OSM map with custom flame marker |
| [app/components/MapSection.tsx](app/components/MapSection.tsx) | Iframe → LocationMap; phone number; corrected directions URL |
| [app/components/Hero.tsx](app/components/Hero.tsx) | Phone CTA; softened rating line; image DPR drop |
| [app/components/About.tsx](app/components/About.tsx) | Stat block softened (no fake numbers) |
| [app/components/Reviews.tsx](app/components/Reviews.tsx) | Names anonymised; stat pills softened; "Sample" labels |
| [app/components/Footer.tsx](app/components/Footer.tsx) | Year dynamic; dead social links removed; phone CTA added |

---

## 9. One-paragraph brief for the next AI assistant

> The Wok & Flame site has had its trust/legal issues fixed (no fake reviews/numbers), phone number wired in, footer cleaned up, map replaced with an open-source Leaflet+OSM map at the real M20 2LW coordinates, and full Restaurant JSON-LD + AI-crawler-friendly robots + sitemap added. Three things are still pending and require user-provided inputs: (1) drop real images into `/public` (hero, about, gallery, og-image, favicon — see §2a); (2) swap the placeholder domain `https://www.wokandflame.co` to the live one once registered (§2b — three files); (3) wire the Google Places API for real reviews (§3 — needs API key from §2d, then create `app/api/reviews/route.ts` and refactor `Reviews.tsx`). Once those land, restore specific star ratings + review counts in Hero/About/Reviews from the qualitative placeholders. Run `npm run build` after changes to verify everything still typechecks.
