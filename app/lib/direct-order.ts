/**
 * Direct-order offer — single source of truth.
 *
 * Wing pays ~30% Just Eat commission, so the site nudges customers to order
 * direct by phone (collection or delivery) for a discount. Every surface that
 * mentions the offer (hero CTA, mobile order bar, the DirectOrderFloat) pulls
 * its number and copy from here. Change the figure — or pull the whole offer —
 * in one place.
 *
 * Terms aren't fully locked yet, so treat the values below as the working
 * offer. To take the offer down entirely, set ACTIVE to false: every surface
 * falls back to its non-discount wording and the floater stops rendering.
 */

// Flip to false to remove the 10%-off messaging everywhere at once.
export const DIRECT_OFFER_ACTIVE = true;

// The headline discount. Rendered as "Save {N}%".
export const DIRECT_DISCOUNT_PCT = 10;

// Phone line for direct orders. Display + tel: href kept in sync here so no
// surface hand-writes the number. (Matches the number used across the site.)
export const DIRECT_PHONE_DISPLAY = "0161 434 6318";
export const DIRECT_PHONE_HREF = "tel:+441614346318";

// Copy fragments — short, reused across surfaces.
export const DIRECT_SAVE_LABEL = `Save ${DIRECT_DISCOUNT_PCT}%`;
export const DIRECT_SUBLINE = "Order direct — collection or delivery";
export const DIRECT_CTA_LABEL = `Order Direct · Save ${DIRECT_DISCOUNT_PCT}%`;

/**
 * Order-choice modal — the centred popup opened from the navbar "Order Now".
 *
 * ── EASY SWAP ─────────────────────────────────────────────────────────────
 * Everything the popup says lives in this one object. To change the promo
 * (new discount, new wording, a freebie instead of a %, etc.) edit the copy
 * below and `DIRECT_DISCOUNT_PCT` above — nothing else needs touching. To pull
 * the offer entirely, set `DIRECT_OFFER_ACTIVE = false`: the popup drops the
 * "Save 10%" badge and uses the neutral `directBlurbInactive` wording instead,
 * while still offering both order routes.
 * ───────────────────────────────────────────────────────────────────────────
 */
export const ORDER_MODAL = {
  eyebrow: "Two ways to order",
  title: DIRECT_OFFER_ACTIVE ? `Order direct & save ${DIRECT_DISCOUNT_PCT}%` : "How would you like to order?",

  // Primary, highlighted choice — ordering direct from the restaurant.
  directHeading: "Order Direct",
  directBadge: DIRECT_SAVE_LABEL, // shown only while the offer is active
  directBlurbActive: `Call the kitchen direct for collection or delivery and we'll take ${DIRECT_DISCOUNT_PCT}% off. There's no delivery-app commission, so more goes straight to the family running Wok & Flame — and you pay less.`,
  directBlurbInactive:
    "Call the kitchen direct for collection or delivery. You deal with us straight, and more of what you pay supports the restaurant.",
  directCta: `Call ${DIRECT_PHONE_DISPLAY}`,

  // Secondary choice — Just Eat (kept for customers who prefer to pay online).
  justEatHeading: "Order on Just Eat",
  justEatBlurb: "Rather pay online? You can still order through Just Eat as usual.",
  justEatCta: "Continue to Just Eat",

  // Quiet reassurance under the two choices.
  footnote: "Same kitchen, same menu — ordering direct just saves everyone the middle-man.",
} as const;
