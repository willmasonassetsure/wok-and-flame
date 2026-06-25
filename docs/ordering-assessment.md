# Owned Ordering System — Tri-Modal Suitability Assessment

**Author:** WMFREELANCE (Will Mason)
**Date:** 17 June 2026
**Pilot client:** Wok & Flame (independent Chinese takeaway, West Didsbury M20)
**Purpose:** Decide which of three technical routes to use to build a *plug-and-play, owned online-ordering system* — bundled into the web-design offering (build + host + traffic + ordering), sold at **£300/month all-in**, with Wok & Flame as client #1.

---

## 0. TL;DR — the decision in one screen

**The three options are not three engines competing for the same job. They sit at different layers:**

| "Mode" | What it actually is | Right role |
|---|---|---|
| **Restolabs** | A complete **hosted ordering engine** (walled garden) | Fast, cheap, disposable *validation* — or a permanent fallback if you never want to build |
| **Headless + GoHighLevel** | A **composed stack you own**: your Next.js cart + Stripe + a cloud printer, with GHL as the CRM/reviews/automation **backbone** | **The build.** The only route that becomes a resellable product |
| **Deliverect** | A **channel-aggregation layer** (Just Eat / Deliveroo / Uber → one feed/printer) | **Phase 2**, bolted on *under* the headless stack when volume justifies it |

**Primary recommendation:** **Build the Headless + GHL stack.** It is the only one of the three that clears the gate, reuses assets you already own (the Next.js site, `app/data/menu.ts`, the `/lab/mains` configurator), gives you processor freedom + data ownership + the best £300 economics at scale, stays aggregation-ready, and *is itself the productised agency offering* — which is the entire "business development" point.

**De-risking move (because volume is unknown and this might stay a one-off):** stand up **GoHighLevel Starter (~£77/mo) + review automation first** — it's billable bundle value (your handover-deck Slide 15) that earns its keep *regardless* of whether ordering volume ever materialises. Then build the ordering MVP on top. Low regret either way.

**Weighted score (detail in §5):** Headless + GHL **58/70** · Restolabs **44/70** · Deliverect **30/70**.

**Choose differently only if:** you want a live ordering page *this week* with near-zero build risk and are happy with a hosted page beside the site → **Restolabs**. Never start on Deliverect.

---

## 1. What we're optimising for (the rubric)

Locked during scoping. **Gate first, then weighted axes.**

**GATE (pass/fail — fail = disqualified):** full menu online (incl. the mains matrix) **+** online card payment **+** unattended auto-print to *its own* device at the counter.

| Axis | Weight | Why |
|---|---|---|
| Technical ceiling / control | **High (×3)** | Owning the UI, the data, the processor choice, the discount logic |
| Speed-to-pilot | **High (×3)** | Time to get Wok & Flame live |
| Cost & margin at £300 (low **fixed** cost) | **High (×3)** | At ~10 orders/week, a high fixed platform fee is the enemy; the £300 is justified by the *whole bundle*, not ordering margin alone |
| Aggregation-readiness | **High-Med (×2)** | Can you add Just Eat/Deliveroo → one printer *later* without re-platforming? |
| Bundle synergy (reviews/CRM) | **Med (×1)** | The agency upsell surface — your GHL angle |
| Plug-and-play reuse for client #2 | **Med (×1)** | Productisation |
| White-label / resale economics | **Med (×1)** | Productise-later scenario |

**Two framing facts that shaped the verdict:**
1. **Channel aggregation is deferred, not dropped.** Wing keeps the Just Eat printer running side-by-side at launch, so aggregation is a *Phase-2 ideal*, not a gate. That demotes Deliverect's one genuine strength out of the MVP.
2. **The MVP is also instrumentation.** It's the first time anyone measures Wing's *direct* + *collection* demand (currently invisible — 100% Just Eat, collection stats unknown). Keep it cheap and let it teach you the volume before scaling spend.

---

## 2. The hard technical test: the menu

The menu (`app/data/menu.ts`) is the thing that breaks platforms. ~150 base items across 15 categories, plus:

- **Main Courses = a 2-axis matrix.** Pick a protein (**12** options — the protein sets the base price) → pick a cooking style (**~23** options — the chosen style can flip the dish *spicy*). ≈ **275 combinations**. This is the `/lab/mains` picker concept, and "no chicken in black bean" was Wing's actual complaint.
- Set meals with "additional person → choose a main"; "beef *or* chicken in X sauce" variants; add-on sauce pots / sides / drinks.

**Verdict on menu modelling:** Restolabs and Deliverect both have proper modifier engines that can express "price-setting protein variant + cooking-style modifier group" by entering ~12 + ~23 *options* (combinations are generated, not 275 rows). **But neither cleanly automates "this style makes it spicy"** — that flag is manual upkeep. Your **own Next.js front-end models all of this perfectly** because you already hold the data and the builder — which is the single strongest argument for the headless route.

---

## 3. Per-platform deep dive

### 3.1 Deliverect — *the aggregation layer, mis-cast as an MVP engine*

- **What it is:** middleware that pulls delivery channels into one feed and pushes menus out. **Deliverect Direct** is a bolt-on branded webshop (basket + payment + discounts). Positioned for chains/multi-location ("5 locations or 5,000").
- **Menu matrix:** capable but heavy; Direct's storefront is built for flat menus + simple add-ons, so 12×23 risks an ugly two-dropdown UX and manual upkeep.
- **Payment:** **strong** — processor-agnostic (Stripe UK, Adyen, Mollie, Airwallex…); the restaurant holds its own Stripe account and card rates. No forced house processor.
- **Discounts:** native coupon/percentage codes. ✓ (the 20%-direct is trivial)
- **Print:** **Delivery Manager App (DMA)** — free Android/iOS tablet app, runs *without* a POS, auto-prints incoming orders to a tethered Epson/Star printer, handles collection. Meets the bar (tablet-tethered, not serverless).
- **Aggregation:** its **real strength** — Just Eat / Deliveroo / Uber Eats UK into one feed/printer, and it can be switched on *later*.
- **API / headless:** **poor.** APIs are **partner-gated** (vetted integration partners only) — no self-serve credential for an independent. You'd be stuck inside Direct's hosted storefront, not driving it from your Next.js front-end.
- **Pricing:** **opaque — quote-only, the deal-breaker.** No public UK figures anywhere; only legacy ~2023 tiers (€69–166/mo + a one-time setup fee) which are dated. Sales-gated, chain-oriented.
- **FIT:** ❌ as the MVP engine — sales-gated, chain-priced, no headless API; an unknown fixed fee + setup almost certainly blows the £300 at ~10 orders/week. ✅ **as a Phase-2 aggregation layer** once unifying Just Eat/Deliveroo onto one printer is wanted.
- **Top risks:** (1) unknown/likely-high fixed fee + setup; (2) partner-gated API blocks the owned/custom-UI model you're selling.

### 3.2 Restolabs — *the fast hosted engine (walled garden)*

- **What it is:** commission-free **hosted** branded-ordering SaaS (US/India). Notably runs a **white-label reseller program for agencies** — i.e. exactly your bundling play.
- **Menu matrix:** **maps cleanly** — protein = price-setting *variant*, cooking style = required *modifier group*; you build ~12 + ~23 options, not 275 rows. Set meals/combos and add-ons fit. *Caveats:* auto "spicy" flag from style is undocumented (likely manual); invalid-combo blocking unproven.
- **Payment:** multi-processor (**Stripe UK**, Worldpay, Authorize.net, Apple/Google Pay…), **0% Restolabs commission** — you pay only Stripe's ~1.5%+20p. *Subscription is billed in USD.*
- **Discounts:** coupon builder, % and time-based. ✓
- **Print:** native auto-print — Epson ePOS + Star supported; order app on any phone/tablet; alerts via dashboard/SMS/email/printer; collection supported. *Caveat:* whether print is truly **unattended** (no tap-to-accept) is unverified — test it.
- **API / headless:** **poor** — no public API/webhooks; you use *their* hosted ordering page. **But** white-label is strong (own domain, full branding, branded admin/emails). So: branded yes, headless no — your Next.js site links/embeds into the Restolabs page.
- **Aggregation:** **none**, not on the UK roadmap; would need Deliverect/Otter separately and awkwardly.
- **Pricing:** **$69 / $99 / $199 per store/month** (Basic/Premium/Enterprise), 30–60-day trial, **no setup fee, month-to-month**. Website add-on $29, app $49. Reseller pricing undisclosed.
- **FIT:** ✅ **a strong MVP engine — but a hosted one.** Nails matrix modelling, Stripe-UK, 0% commission, promo codes, Epson/Star auto-print, and a real reseller path. At ~£55/mo base it fits £300 with healthy margin. ❌ no API, no aggregation, no bundle synergy, USD billing.
- **Top risks:** (1) USD billing + Stripe-UK-in-GBP + unattended-print all need trial verification before you quote; (2) walled garden = a hard ceiling on the owned/aggregated/bundled vision.

### 3.3 Headless + GoHighLevel — *the stack you own (recommended build)*

GHL is a CRM/marketing platform, **not** a restaurant system — no menu or order object. So the realistic architecture is **not** "build the menu in GHL." It's:

> **Your Next.js app owns menu + cart + total → Stripe takes payment → a cloud printer prints the ticket → GHL receives the order for CRM, automation, reviews, and white-label back-office.**

- **Menu matrix:** handled in **your** front-end (reuse `menu.ts` + `/lab/mains`) — the cleanest possible fit, full control of the spicy-flag logic and invalid-combo blocking.
- **Payment — use Stripe *directly*:** charge the cart total with Stripe Checkout/PaymentIntents in the Next.js app (full UX, one hop, **UK 1.5%+20p**, no GHL markup), then push the *paid* order into GHL. Cleaner than bouncing to a GHL-hosted invoice. Processor-agnostic by design.
- **Order capture into GHL:** **Private Integration Token** (note: legacy v1 API keys end-of-support 31 Dec 2025) → create a contact, store the cart as a custom-field JSON blob + an Opportunity in an "Orders" pipeline; fire workflows. Premium webhook executions ≈ $0.02/order — negligible at pilot volume.
- **Print — Star CloudPRNT (the bespoke, must-be-bulletproof piece):** the printer **polls your endpoint** (all-outbound, no port-forwarding, no on-site PC), fetches the ticket, confirms with DELETE. Survives power/network blips. This is the most plug-and-play multi-site print path that exists. **It is also the #1 risk: a self-hosted poll endpoint is a single point of failure — build it stateless/idempotent with an on-screen order fallback.**
- **Discounts:** 20%-direct handled in your cart.
- **Aggregation:** GHL **never** does it — but the headless stack is aggregation-*ready*: add Deliverect later as the layer it's good at, routing channel orders to the same kitchen flow.
- **Bundle synergy — the real reason to use GHL:** reputation/**review automation included on every plan** (auto SMS/email review requests, sentiment routing happy→Google, AI replies), full CRM, 2-way SMS/WhatsApp, database reactivation/win-back. This is ~80% of Birdeye/Podium ($299–399/loc) at a fraction of the cost, and it's your handover-deck upsell made real.
- **Pricing:** **Starter ~$97/mo (~£77)** is all the pilot needs (one full-feature sub-account; SaaS Pro $497 *not* required). At 4+ clients move to **Unlimited $297** → marginal cost per client collapses to ~£10–30. White-label/resale economics are excellent.
- **FIT:** ✅ **the right build** — highest ceiling, full ownership, best scale economics, aggregation-ready, *and* it is the resellable product. The honest cost is **build effort** (cart/configurator + Stripe + the CloudPRNT endpoint) and the print SPOF.
- **Top risks:** (1) the print bridge (mitigate: stateless/idempotent endpoint + on-screen fallback); (2) no native order object → JSON-in-custom-field is fine at low volume, clunkier at scale.

---

## 4. The fulfilment + cost layer (platform-independent)

- **Recommended printer: Star mC-Print3 CloudPRNT** — **~£228 ex VAT**, all-outbound polling, truly unattended, no local PC, identical SKU per site = excellent replication. (Epson TM-m30III + Server Direct Print ~£200–230 is the equivalent alternative; ePOS XML is fiddlier. Sunmi V2 Pro ~£159 all-in-one only if the owner wants an on-screen accept/order list — needs kiosk mode. **Avoid email-to-print** for kitchen tickets.)
- **Card fees (published, UK):** Stripe **1.5% + 20p** · Square **1.4% + 25p** · GoCardless (Direct Debit only) **1% + 20p capped £4**. Use **Stripe** for cleanest Next.js integration. *Card fees come off the restaurant's takings, not your £300.*
- **Fulfilment cost at pilot volume (~40 orders/mo, ~£25 basket):** ~**£228 one-off** (printer, billable to client as setup) **+ ~£0 fixed monthly** (CloudPRNT firmware free; runs on existing hosting) + ~£23/mo Stripe pass-through on the *restaurant's* account.

---

## 5. Scoring matrix

Scores 1–5 against §1 weights. (Gate: all three can technically pass; Deliverect only via a sales contract, Restolabs with unattended-print unverified.)

| Axis (weight) | Deliverect | Restolabs | **Headless + GHL** |
|---|:--:|:--:|:--:|
| Technical ceiling / control (×3) | 2 | 2 | **5** |
| Speed-to-pilot (×3) | 2 | **5** | 3 |
| Cost & margin, low fixed (×3) | 1 | 4 | **4** |
| Aggregation-readiness (×2) | **5** | 2 | 4 |
| Bundle synergy — reviews/CRM (×1) | 1 | 1 | **5** |
| Plug-and-play reuse #2 (×1) | 2 | 3 | **4** |
| White-label / resale (×1) | 2 | 3 | **5** |
| **Weighted total / 70** | **30** | **44** | **58** |

**Reading it:** Restolabs wins *speed* and ties on *fixed cost* — it's the rational choice if the only question is "validate demand cheaply, this week." Deliverect wins *aggregation* and nothing else relevant to the MVP. **Headless + GHL wins everything that compounds into a business** — control, scale economics, bundle synergy, reuse, white-label — and stays aggregation-ready.

---

## 6. Cost models (the £300 question)

**Card fees sit on the restaurant's Stripe account in every model, so they don't touch your £300 margin.**

**Model A — Pilot, Headless + GHL (recommended)**
- GHL Starter ~£77/mo · hosting amortised ~£0–20/mo · printer ~£228 one-off (bill as setup)
- **Your gross margin ≈ £300 − £77 − (£0–20) ≈ £200–220/mo**, plus one-off hardware recovered.

**Model B — Pilot, Restolabs**
- Restolabs Basic ~£55/mo (USD) · printer ~£200–228 one-off · (review/CRM tooling would be an *extra* separate cost)
- **Your gross margin ≈ £300 − £55 ≈ £245/mo** — higher *fixed* margin, but no bundle synergy included and no reusable asset.

**Model C — Productise later (white-label/resale)**
- **GHL:** Unlimited $297 at 4+ clients (or SaaS Pro $497 at ~5+ for rebilling + branded app) → marginal cost ~£10–30/client → **~£270–290 margin per client at £300.** Scales beautifully.
- **Restolabs:** reseller program (pricing undisclosed) — each client likely still carries a per-store fee; less leveraged than GHL Unlimited.

> At a single pilot, Restolabs is marginally cheaper on fixed cost. **At 2+ clients, the headless + GHL model pulls decisively ahead** on both margin and capability — which is the whole point of "business development".

---

## 7. Recommended build (the winner)

**Phase 0 — Backbone (low-regret, do now):**
- GHL Starter sub-account; connect the restaurant's Stripe; switch on **review automation** (post-collection SMS/email). This is billable bundle value *even if ordering volume disappoints* — it de-risks the "might be a one-off" worry.

**Phase 1 — Ordering MVP:**
- `/order` route on the existing Next.js site, reusing `app/data/menu.ts` and extending `/lab/mains` into a full cart: protein×style configurator, modifiers, 20%-direct discount.
- **Stripe Checkout** on the restaurant's own account.
- Order queue (lightweight DB/KV) → **Star mC-Print3 CloudPRNT** poll/job/delete endpoint emitting the kitchen ticket. **Stateless/idempotent + on-screen fallback order list.**
- On paid order: push contact + order JSON + Opportunity into GHL via Private Integration Token; trigger the review-request workflow.

**Phase 2 — Aggregation (only when volume earns it):**
- Add **Deliverect** beneath the stack to unify Just Eat/Deliveroo onto the same kitchen flow/printer (~£60–145+/mo, quote-gated).

**Rough build estimate:** thin validation slice ~1 week; robust v1 ~2–3 weeks part-time (the CloudPRNT endpoint is the novel, must-be-bulletproof piece; cart/configurator is partly prototyped already).

---

## 8. Open items to verify before quoting a client

These are the `[UNCERTAIN]` flags from the research — confirm before any number goes in front of Wing:

1. **Deliverect** — actual UK price for a single site + setup fee (quote-gated; everything public is dated).
2. **Restolabs** — (a) Stripe-UK settles GBP end-to-end (run a test charge); (b) print is truly **unattended** (no tap-to-accept); (c) reseller/white-label pricing.
3. **GoHighLevel** — branded-app fee structure; per-order premium-webhook cost confirmed at volume; USD FX + VAT handling; review-lift figures are illustrative, not promised.
4. **Printer** — exact mC-Print3 variant price (£228–250 by reseller); confirm the restaurant's network can host a LAN/Wi-Fi printer.

---

## 9. Sources

**Deliverect:** deliverect.com/en/deliverect-direct · help.deliverect.com (Direct get-started, discounts, Stripe gateway, DMA app/printing) · developers.deliverect.com/docs · deliverect.com/en-gb/pricing (quote-only) · saasworthy legacy tiers · deliverect.com/en-gb/integrations/delivery-channels
**Restolabs:** restolabs.com (paymentintegrations, pricing, online-ordering, white-label resellers) · capterra.co.uk/software/140085/restolabs · softwaresuggest.com/restolabs · deliverect.com/en/integrations/restolabs
**GoHighLevel:** marketplace.gohighlevel.com/docs (invoices, contacts, webhooks) · help.gohighlevel.com (private integrations, coupons) · gohighlevel.com/pricing · gohighlevel.com/post/manage-reviews-at-scale-with-ai
**Fulfilment/payments:** star-m.jp StarCloudPRNT protocol + mC-Print3 settings · starmicronics.com/stario · files.support.epson.com Server Direct Print · printnode.com/en/pricing · logiscenter.co.uk / thebarcodewarehouse.co.uk (UK printer prices) · stripe.com/gb/pricing · squareup.com/gb/en/payments/our-fees · merchantmachine.co.uk/gocardless
