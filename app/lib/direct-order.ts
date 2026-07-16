/**
 * Direct-order messaging — single source of truth.
 *
 * Delivery apps charge the kitchen a hefty commission, so the site nudges
 * customers to order direct by phone (collection or delivery): direct orders
 * are priced off the house menu rather than the app's listing. Every surface
 * that pushes the direct route (hero CTA, mobile order bar, the navbar order
 * popup) pulls its number and copy from here — reword the pitch in one place.
 *
 * COMPLIANCE (DMCC/CMA): keep this factual. No discount percentages or
 * "save X%" claims — the pitch is house menu pricing versus ordering through
 * the app, nothing more. If a genuine promo is ever agreed with Wing, add it
 * here so every surface picks it up together.
 */

// Phone line for direct orders. Display + tel: href kept in sync here so no
// surface hand-writes the number. (Matches the number used across the site.)
export const DIRECT_PHONE_DISPLAY = "0161 434 6318";
export const DIRECT_PHONE_HREF = "tel:+441614346318";

/**
 * Order-choice modal — the centred popup opened from the navbar "Order Now".
 *
 * ── EASY SWAP ─────────────────────────────────────────────────────────────
 * Everything the popup says lives in this one object. To change the pitch
 * (new wording, a promo, a freebie, etc.) edit the copy below — nothing else
 * needs touching.
 * ───────────────────────────────────────────────────────────────────────────
 */
export const ORDER_MODAL = {
  eyebrow: "Two ways to order",
  title: "How would you like to order?",

  // Primary, highlighted choice — ordering direct from the restaurant.
  directHeading: "Order Direct",
  directBadge: "House prices",
  directBlurb:
    "Ring us for collection or delivery — order from our house menu prices, not Just Eat's.",
  directCta: `Call ${DIRECT_PHONE_DISPLAY}`,

  // Secondary choice — Just Eat (kept for customers who prefer to pay online).
  justEatHeading: "Order on Just Eat",
  justEatBlurb: "Pay online through Just Eat, same as always.",

  // Quiet reassurance under the two choices.
  footnote: "Same food either way. Direct orders are priced off our house menu.",
} as const;
