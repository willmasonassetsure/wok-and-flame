// Server-side fetcher for the restaurant's opening hours via Google Places API
// (New). Returns the weekly period schedule + human-readable descriptions so a
// client component can compute open/closed status live in the browser.
//
// Shares env vars with google-reviews.ts:
//   GOOGLE_PLACES_API_KEY
//   GOOGLE_PLACE_ID
//
// Returns null if env is unset or the API fails, so callers fall back to the
// hardcoded schedule.

const PLACES_API_URL = "https://places.googleapis.com/v1";
const FIELD_MASK = [
  "regularOpeningHours",
  "utcOffsetMinutes",
].join(",");

export type OpeningPeriod = {
  open: { day: number; hour: number; minute: number };
  close: { day: number; hour: number; minute: number };
};

export type OpeningHoursData = {
  periods: OpeningPeriod[];
  weekdayDescriptions: string[];
  utcOffsetMinutes: number;
};

type PlacesHoursResponse = {
  regularOpeningHours?: {
    periods?: Array<{
      open?: { day?: number; hour?: number; minute?: number };
      close?: { day?: number; hour?: number; minute?: number };
    }>;
    weekdayDescriptions?: string[];
  };
  utcOffsetMinutes?: number;
};

// ⚑ FLAG FOR LATER (2026-06-16): hours are HARD-CODED to the owner-confirmed
// schedule (5pm–11pm, 7 days — matches the Google Business Profile screenshot).
// While this is true the Places API fetch is skipped entirely and every caller
// gets FALLBACK_HOURS below. To restore live Google hours once the GBP listing
// is trusted, set FORCE_HARDCODED_HOURS = false (and ensure the env vars are set).
const FORCE_HARDCODED_HOURS = true;

export async function getOpeningHours(): Promise<OpeningHoursData | null> {
  if (FORCE_HARDCODED_HOURS) {
    return null; // callers fall back to FALLBACK_HOURS (the hard-coded schedule)
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return null;
  }

  try {
    const res = await fetch(`${PLACES_API_URL}/places/${placeId}`, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": FIELD_MASK,
      },
      // 24h cache — schedule changes are rare and the client tick handles
      // minute-by-minute open/closed transitions without a refetch.
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`[google-hours] Places API ${res.status}:`, body);
      return null;
    }

    const data: PlacesHoursResponse = await res.json();
    const rawPeriods = data.regularOpeningHours?.periods ?? [];

    const periods: OpeningPeriod[] = rawPeriods
      .filter((p) => p.open && p.close)
      .map((p) => ({
        open: {
          day: p.open!.day ?? 0,
          hour: p.open!.hour ?? 0,
          minute: p.open!.minute ?? 0,
        },
        close: {
          day: p.close!.day ?? 0,
          hour: p.close!.hour ?? 0,
          minute: p.close!.minute ?? 0,
        },
      }));

    return {
      periods,
      weekdayDescriptions: data.regularOpeningHours?.weekdayDescriptions ?? [],
      utcOffsetMinutes: data.utcOffsetMinutes ?? 0,
    };
  } catch (err) {
    console.error("[google-hours] fetch error:", err);
    return null;
  }
}

// Hard-coded schedule (owner-confirmed 2026-06-16): 5pm–11pm, 7 days a week.
// This is currently authoritative — see FORCE_HARDCODED_HOURS above.
// Days follow Places API convention: 0 = Sunday.
export const FALLBACK_HOURS: OpeningHoursData = {
  periods: [0, 1, 2, 3, 4, 5, 6].map((day) => ({
    open: { day, hour: 17, minute: 0 },
    close: { day, hour: 23, minute: 0 },
  })),
  weekdayDescriptions: [
    "Monday: 5 – 11 pm",
    "Tuesday: 5 – 11 pm",
    "Wednesday: 5 – 11 pm",
    "Thursday: 5 – 11 pm",
    "Friday: 5 – 11 pm",
    "Saturday: 5 – 11 pm",
    "Sunday: 5 – 11 pm",
  ],
  utcOffsetMinutes: 0,
};
