# Handover Deck — Build Spec

**For:** whoever picks this up to design and produce the deck (referred to below as *the designer*).
**Audience of the final deck:** the Wok & Flame client (Manchester takeaway).
**Delivery format of the final deck:** self-contained PDF (or hosted single-page HTML that exports cleanly to PDF). The client will open it alone — so every slide must stand on its own without a presenter.
**Author / brand on the deck:** WMFREELANCE (Will Mason, freelance build studio).
**This document:** the brief. Do not deviate without asking.

---

## 1. What this deck is

A **post-build handover**. The Wok & Flame site is built and ready to ship. This deck:

1. Walks the client through what now exists on their site, section by section, in plain language.
2. Calls out the **live, data-driven** parts (reviews, hours, hygiene rating) so they understand the site isn't a static brochure.
3. Lists the technical groundwork that won't be visible to them (SEO, performance, accessibility, mobile).
4. Closes with two **soft "what's next" slides** seeding the upsell:
   - **Google Reviews automation** (review-request flows + monitoring)
   - **Direct online ordering** (replacing the Just Eat dependency, keeping margin in-house)

The upsells are framed as natural Phase 2 opportunities — **no prices, no contracts, no scope tables**. The goal is to plant the seed, not close the deal in a PDF.

---

## 2. Brand & visual system

### 2.1 Logo

- **File:** `C:\Users\WillMason\OneDrive - Hildon Park Limited\Downloads\wm feelance logo regen.png`
- **Description:** monoline "WM" wordmark — a single continuous stroke that reads as both a W and an M, ribbon-like.
- **Use rules:**
  - Cover slide: large, centred, no caption beneath. Sit it on the warm-dark canvas.
  - Every subsequent slide: small, top-left or footer, **always paired with the word "WMFREELANCE" in tracked caps** to make the wordmark legible (the mark alone can read as abstract).
  - Minimum clear-space around the logo = 1× the height of the mark.
  - The logo is **black-on-transparent**. On the dark site palette it needs to be **inverted to white** for legibility. the designer must handle this — either via CSS `filter: invert(1)` for an HTML deck, or by pre-processing a white version for the PDF.

### 2.2 Colour tokens — pulled from `app/globals.css`

Use these exact hex values; do not invent new shades.

| Token | Hex | Role in the deck |
|---|---|---|
| `--color-char-950` | `#0c0a09` | Slide background (primary) |
| `--color-char-900` | `#1c1917` | Card / panel background |
| `--color-char-800` | `#292524` | Borders, dividers |
| `--color-char-400` | `#a8a29e` | Secondary copy, captions |
| `--color-char-200` | `#e7e5e4` | Body copy on dark |
| `--color-char-50`  | `#fafaf9` | Headlines on dark |
| `--color-vermillion` | `#b42318` | Primary accent — CTAs, key numbers, the "fire" |
| `--color-vermillion-light` | `#d92d20` | Hover / highlight state |
| `--color-jade` | `#3aa884` | Single contrast accent — used **only** for the "Phase 2" / upsell slides to signal "next chapter" |
| `--color-jade-light` | `#5cc1a0` | Jade highlight on those same slides |

**Palette discipline:** body of the deck is warm-dark + vermillion. Jade is reserved for the two upsell slides. This visual shift signals "different conversation" without any verbal hand-waving.

### 2.3 Typography

- **Display + body:** `Outfit` (the site's font). Self-host or load via Google Fonts. Weights used: 300, 400, 500, 700.
- **Scale (16:9 deck, 1920×1080 reference):**
  - Slide headline: 72–88 px, weight 700, tight tracking
  - Subhead / kicker: 18–22 px, weight 500, uppercase, 0.18em tracking, in `char-400`
  - Body: 22–28 px, weight 400, line-height 1.5
  - Captions / footnotes: 14 px, weight 400, `char-400`
- **Numbers** (review counts, ratings, stats): display in vermillion at 96–120 px, weight 700, paired with a small label.

### 2.4 Layout & grid

- Format: **16:9, 1920×1080**. PDF export at that ratio, 1× resolution.
- Margins: 96 px top/bottom, 128 px left/right.
- Each slide has the logo + "WMFREELANCE" lockup in the top-left, and a page number + section name in the bottom-right in `char-400`.
- Use a single vertical accent rule (1 px, vermillion) flush left of the headline on content slides. This is the only recurring graphic device — don't add more.

### 2.5 Imagery

Use real screenshots of the live site wherever a slide describes a section. The site lives at the URL the client knows; capture from a 1440-wide browser at 2× DPR. Crop to a 4:3 or square frame and sit it inside a `char-900` card with a 1 px `char-800` border. **No drop shadows, no glow effects, no mockup chrome.**

Two images can be supplied: the hero/loading state and the gallery in motion. Where a screenshot would be redundant, use a **single large pull-quote, number, or icon** instead — empty space is fine.

---

## 3. Voice & tone

- Confident, plain English, short sentences.
- Address the client directly ("your site", "your reviews").
- No engineering jargon on the surface — but back-of-deck spec slide can name the stack (Next.js, React, etc.) for the client to forward to anyone technical.
- Never apologetic, never salesy. The build is done; this is a tour, not a pitch.
- Numbers over adjectives. "11,375 Just Eat reviews pulled in live" beats "stunning social proof".

---

## 4. Slide-by-slide content

The deck is **18 slides**. Each entry below gives the designer the **headline**, the **body content**, and the **visual treatment**. Do not pad — if a slide has three bullets, three is enough.

### Slide 1 — Cover

- **Background:** full-bleed `char-950`.
- **Centre:** WMFREELANCE logo (white-inverted) + wordmark beneath.
- **Headline (below mark):** "Wok & Flame — Site Handover"
- **Subline (smaller, `char-400`):** "Build complete · May 2026"
- No page number on this slide.

### Slide 2 — What you're holding

- **Kicker:** WHAT THIS IS
- **Headline:** "A tour of your new site."
- **Body (3 short paragraphs):**
  1. Everything that was built, in plain English.
  2. The bits that update themselves — reviews, hours, hygiene rating — so you know what's live data and what's static.
  3. Two ideas for where we go next, if you want to grow it further.
- **Visual:** no image. Headline + body, generous whitespace.

### Slide 3 — The shape of the site

- **Kicker:** OVERVIEW
- **Headline:** "Six sections, one story."
- **Body:** numbered list of sections in scroll order. Each is one line.
  1. **Hero** — the hook, with live opening status and a "Jump to menu" shortcut for takeaway visitors.
  2. **Gallery** — a cinematic plate showcase to sell the food before anything else.
  3. **Reviews** — live Google reviews + your 11,000+ Just Eat reviews as social proof.
  4. **Menu Highlights** — your most ordered dishes, surfaced for first-time visitors.
  5. **About** — your story and credentials in your own voice.
  6. **Find Us** — interactive map with collection details.
- **Visual:** a small vertical "site map" graphic on the right — six numbered cards stacked, each labelled with the section name.

### Slide 4 — Hero

- **Kicker:** SECTION 01 — HERO
- **Headline:** "Open right now? The site tells them."
- **Body:**
  - A live "OPEN NOW / CLOSED" indicator tied to your trading hours, calculated in the Europe/London timezone so it stays correct through clock changes.
  - Two clear actions side by side: **Order on Just Eat** (primary) and **Jump to menu** (for visitors who'd rather browse first).
  - An atmospheric four-layer background — vermillion glow, subtle ember motion, paper-grain — built to feel like a charcoal grill without slowing the page.
- **Visual:** screenshot of the hero with the OPEN status pill visible.

### Slide 5 — Live reviews (the headline feature)

- **Kicker:** SECTION 02 — REVIEWS
- **Headline:** "Your reviews update themselves."
- **Body:**
  - Google reviews pull in live from the Google Places API — when a new review lands on your Google listing, it appears on the site automatically.
  - Just Eat reviews are surfaced as an aggregate stat — **11,375 reviews, 4.8 stars** — because Just Eat has no public API to read individual reviews.
  - The aggregate rating is also baked into the site's structured data, which is what lets Google show stars next to your search result.
- **Visual:** two big stat blocks side by side — `4.8★` (Just Eat) and a live Google rating placeholder, each in vermillion at display scale.
- **Caption:** "All review numbers reflect what's publicly visible on Google and Just Eat — kept honest under the DMCC Act 2024."

### Slide 6 — Gallery

- **Kicker:** SECTION 03 — GALLERY
- **Headline:** "Nine plates, one cinematic scroll."
- **Body:**
  - A horizontal pinned scroll showcasing nine real photographs from the kitchen and dining room.
  - Each frame has a category tag (in jade), a frame counter (`01 / 09`), and a one-line caption — small details that lift it from "photo grid" to "editorial".
  - On mobile, the same nine images become a swipeable carousel with the captions intact.
- **Visual:** screenshot of one gallery frame mid-scroll with the caption + tag visible.

### Slide 7 — Menu Highlights

- **Kicker:** SECTION 04 — MENU HIGHLIGHTS
- **Headline:** "Your bestsellers, made findable."
- **Body:**
  - A condensed view of your most-ordered dishes, with accurate indicators for **chilli heat, vegetarian, and popularity** — pulled from the live Just Eat menu and verified against the kitchen.
  - A "Jump To" mobile navigation lets visitors scan categories without endless scrolling.
- **Visual:** mobile screenshot of the menu nav + a couple of dish cards.

### Slide 8 — About

- **Kicker:** SECTION 05 — ABOUT
- **Headline:** "The story in your own words."
- **Body:**
  - Grounded copy about the kitchen, the wok, the years of trading — written to read like you, not like a marketing brochure.
  - Sits on the same warm canvas as the rest of the site so it doesn't feel like a separate "page".
- **Visual:** screenshot of the About section with the wok-fire image visible.

### Slide 9 — Find Us

- **Kicker:** SECTION 06 — MAP
- **Headline:** "An interactive map that fits the room."
- **Body:**
  - Custom dark-themed map of Burton Road with a flame-shaped marker that flickers gently.
  - Collection address and a one-tap link to Google Maps directions.
- **Visual:** screenshot of the map with the flame marker.

### Slide 10 — On a phone

- **Kicker:** MOBILE EXPERIENCE
- **Headline:** "Designed for the phone first."
- **Body:**
  - A **sticky order bar** appears at the bottom of the screen after the visitor scrolls past the hero — so the call to action follows them the whole way down.
  - A short loading screen sets the brand tone in the first half-second and ensures every visitor lands on the hero, not mid-page.
  - Every interactive element is sized for thumbs; every animation respects the OS-level "reduce motion" setting for accessibility.
- **Visual:** vertical phone-frame screenshot showing the sticky bar in place.

### Slide 11 — Under the hood (1) — Performance

- **Kicker:** THE INVISIBLE WORK
- **Headline:** "Built to load fast on a phone in a takeaway queue."
- **Body (compact bullets):**
  - Images served in modern WebP format, sized per device.
  - The map only loads when a visitor scrolls near it — saves bandwidth for everyone who doesn't.
  - No tracking, no analytics bloat, no third-party widgets slowing the first paint.
- **Visual:** none — a single large vermillion number ("~3 MB total page weight") with a caption.

### Slide 12 — Under the hood (2) — Found by Google

- **Kicker:** THE INVISIBLE WORK
- **Headline:** "Set up to be found, not just to look good."
- **Body:**
  - A `sitemap.xml`, `robots.txt`, and `manifest` configured automatically so Google can crawl every page.
  - Structured data describing your restaurant, hours, address, and aggregate rating — the same markup Google uses to draw the rich panel on a search result.
  - Honest meta descriptions and Open Graph tags so shares to WhatsApp, Facebook, and iMessage look intentional, not broken.
- **Visual:** a stylised "Google search result preview" card with the restaurant's listing rendered as Google would show it.

### Slide 13 — The hand-off

- **Kicker:** WHAT YOU'RE RECEIVING
- **Headline:** "Everything is yours."
- **Body:**
  - The full source code, hosted on your domain.
  - A short written guide for the bits you might want to change yourself — the menu links, your trading hours, the photos.
  - The handful of API keys (Google Places) tied to your own Google account — billed to you, owned by you.
  - 30 days of support on anything that breaks after launch, no questions asked.
- **Visual:** none — clean type slide.

### Slide 14 — Divider — what's next

- **Background:** shift the slide background to a jade-tinted dark (`char-950` with a subtle `jade` radial glow top-right).
- **Centre:** large display type, weight 700.
  - **Line 1 (in `char-400`, small caps, kicker style):** "IF YOU WANT TO PUSH FURTHER —"
  - **Line 2 (in `jade`, display scale):** "Two ideas."
- No body copy, no logo. Pure breath slide.

### Slide 15 — Phase 2, idea 01 — Google Reviews automation

- **Kicker:** PHASE 2 · IDEA 01
- **Headline:** "Turn happy customers into Google reviews — automatically."
- **Body:**
  - Today: reviews come in when a customer remembers to leave one. Most don't.
  - The upgrade: a short follow-up sent to every collection / delivery customer asking for a Google review — the same flow the big chains use.
  - Built on top of what's already running: the review surface on the site updates within minutes of a new Google review going live, so every new 5-star rating starts working for you immediately.
  - The benefit isn't just count — it's **recency**. Google ranks restaurants higher when reviews are fresh.
- **Visual:** a single mock SMS / email card on the right, jade-bordered, showing a "Thanks for your order — would you leave us a quick Google review?" message and a star-rating prompt.
- **Footer line (small, `char-400`):** "Happy to scope this if it's interesting — no commitment."

### Slide 16 — Phase 2, idea 02 — Direct online ordering

- **Kicker:** PHASE 2 · IDEA 02
- **Headline:** "Take orders on your own site. Keep the margin."
- **Body:**
  - Today: every order goes through Just Eat, which takes a cut on every basket.
  - The upgrade: a direct ordering flow on **your** site — menu, basket, payment, confirmation — sitting alongside Just Eat, not replacing it.
  - Just Eat stays for the audience that finds you there; direct ordering captures the customers who already know your name and would rather order from you directly.
  - Even shifting 20% of orders off the platform pays for the build within months.
- **Visual:** a mock checkout screen on the right — clean, jade-accented — showing a basket with two items and a "Pay & confirm" button.
- **Footer line (small, `char-400`):** "Happy to scope this if it's interesting — no commitment."

### Slide 17 — Thank you

- **Background:** back to `char-950` (jade phase over).
- **Centre:**
  - Logo + "WMFREELANCE"
  - Headline: "Enjoy the new site."
  - Subline: "Will Mason · WMFREELANCE · wmfreelance.com"
  - One-line invitation: "If anything in the last two slides sparked something, reply to this email and we'll talk."

### Slide 18 — Reference / spec (optional, technical readers only)

- **Kicker:** FOR THE TECHNICAL READER
- **Headline:** "Under the hood."
- **Body (two-column compact table):**
  - **Framework:** Next.js 16 (App Router, RSC)
  - **UI:** React 19, Tailwind CSS, Framer Motion
  - **Map:** Leaflet (OSM tiles, dark themed)
  - **Data:** Google Places API (live reviews), static Just Eat aggregate, timezone-aware hours logic
  - **Hosting:** Vercel
  - **Accessibility:** WCAG-aligned colour contrast, reduced-motion support, semantic landmarks
- **Visual:** none — tight monospace-style table on the warm-dark canvas.

---

## 5. What the designer must produce

1. A single PDF, 16:9, 1920×1080, **18 pages**, file named `wok-and-flame-handover.pdf`.
2. The source artefact used to build it — preferably a single self-contained HTML file with inline CSS and embedded fonts, so the deck can also be hosted as a link. Save it as `wok-and-flame-handover.html` alongside the PDF.
3. A folder of any extracted assets used in the deck (logo white-inverted, site screenshots, etc.) in `/handover/assets/`.

Put all three under a new folder at the project root: `/handover/`.

---

## 6. Hard rules (don't break these)

1. **No emoji anywhere in the deck.** This is a freelance handover, not a Notion page.
2. **No drop shadows, no neon glows, no gradient meshes.** The warm-dark palette + a single vermillion accent is the entire visual language. The jade slides are the only departure, and it's deliberate.
3. **No fake stats.** Every number on the deck must be sourced from the actual site, the actual Google listing, or the actual Just Eat page. If a number isn't verifiable, replace it with a qualitative claim.
4. **No screenshots of competitor sites, no client logos other than Wok & Flame's, no stock photography.**
5. **Don't promise features that aren't built.** The two Phase 2 slides describe what *would* be built — make sure the language stays in the conditional ("would", "could"), never the present tense.
6. **Don't price the upsell.** No "£X for setup, £Y/month". The whole point of soft framing is to start a conversation, not to drop a quote in a PDF.
7. **Don't add a feedback form, a calendly link, or a "sign here" page.** A reply-to-email is the only call to action.

---

## 7. When in doubt

If a content decision isn't covered above, default to **less**. A slide with three sentences and one number beats a slide with seven bullets every time. This deck is a confidence signal — the calm, finished, mature feel of it is itself part of the upsell.
