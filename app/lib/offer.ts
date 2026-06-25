// Single source of truth for the current promotional offer.
//
// Flip OFFER_ACTIVE to false to remove the promo everywhere (hero pill,
// phone-button tag, and anywhere else that reads these constants) without
// touching any component.
//
// COMPLIANCE (DMCC/CMA): the discount must stay genuine and claimable.
// It's a straight percentage off the normal menu price for orders placed
// DIRECT by phone — it cannot be claimed through Just Eat (you can't add a
// custom discount to a Just Eat order). Keep the copy truthful: if the
// kitchen stops honouring it, set OFFER_ACTIVE = false the same day.

export const OFFER_ACTIVE = true;

export const OFFER_PERCENT = 10;

// Short, scannable headline for badges/pills.
export const OFFER_HEADLINE = `Order direct & save ${OFFER_PERCENT}%`;

// One-line terms shown beneath the headline.
export const OFFER_TERMS = "Phone orders · collection or delivery";

// Compact tag used on the phone CTA, e.g. "−10%".
export const OFFER_TAG = `−${OFFER_PERCENT}%`;

// Order line — kept here too so the CTA and the offer share one number.
export const ORDER_PHONE_DISPLAY = "0161 434 6318";
export const ORDER_PHONE_TEL = "+441614346318";
