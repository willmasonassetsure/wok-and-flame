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

export async function getOpeningHours(): Promise<OpeningHoursData | null> {
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

// Fallback schedule used when the Places API isn't configured. Reflects the
// current advertised hours: 16:55 daily opening (delivery), 17:00 collection,
// 22:00 close. Days follow Places API convention: 0 = Sunday.
export const FALLBACK_HOURS: OpeningHoursData = {
  periods: [0, 1, 2, 3, 4, 5, 6].map((day) => ({
    open: { day, hour: 16, minute: 55 },
    close: { day, hour: 22, minute: 0 },
  })),
  weekdayDescriptions: [
    "Monday: 16:55 – 22:00",
    "Tuesday: 16:55 – 22:00",
    "Wednesday: 16:55 – 22:00",
    "Thursday: 16:55 – 22:00",
    "Friday: 16:55 – 22:00",
    "Saturday: 16:55 – 22:00",
    "Sunday: 16:55 – 22:00",
  ],
  utcOffsetMinutes: 0,
};
