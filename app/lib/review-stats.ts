// Single source of truth for the aggregate review numbers shown across the
// site. Update the constants below when the live listings change — every
// surface (Hero, About, Reviews, JSON-LD aggregateRating) picks them up.
//
// VERIFY before launch: open the live Just Eat and Google listings and
// confirm these match. The DMCC Act 2024 bans publishing misleading
// aggregate stats, so the numbers here MUST match the public sources.
//
// Google numbers act as a fallback only — when GOOGLE_PLACES_API_KEY and
// GOOGLE_PLACE_ID are set in .env.local, the Reviews component and the
// Restaurant JSON-LD pull live values from the Places API and ignore these.

// --- Just Eat (hardcoded — no public API) ---
//   Open: https://www.just-eat.co.uk/restaurants-wokandgo-m20/menu
//   Copy the displayed star rating and review count into the two consts.
export const JUST_EAT_RATING = 4.8;
export const JUST_EAT_COUNT = 11375;

export const JUST_EAT_URL =
  "https://www.just-eat.co.uk/restaurants-wokandgo-m20/menu";

// --- Google (fallback — live values come from Places API when configured) ---
export const GOOGLE_FALLBACK_RATING = 4.2;
export const GOOGLE_FALLBACK_COUNT = 256;

export const GOOGLE_MAPS_SEARCH_URL =
  "https://www.google.com/maps/search/?api=1&query=Wok+%26+Flame+Burton+Road+M20+2LW";

// --- Food Hygiene Rating ---
//   [ONBOARDING Q11] — populate from the form answer.
//   Set to null to hide the badge until the rating is confirmed.
export const FOOD_HYGIENE_RATING: 0 | 1 | 2 | 3 | 4 | 5 | null = null;

// Formatting helper so 11375 reads as "11,375" consistently everywhere.
export const formatReviewCount = (n: number) => n.toLocaleString("en-GB");
