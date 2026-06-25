// Server-side fetcher for Google Places API (New) — returns the live rating,
// review count and up to 5 reviews for the configured Place ID.
//
// Requires two env vars in .env.local (see .env.local.example):
//   GOOGLE_PLACES_API_KEY  — Places API (New) key from console.cloud.google.com
//   GOOGLE_PLACE_ID        — public Place ID (no manager access required)
//
// If either env var is missing OR the API call fails, returns null so callers
// can fall back to placeholder content. Cached for 24h via Next.js fetch cache.

const PLACES_API_URL = "https://places.googleapis.com/v1";
const FIELD_MASK = [
  "displayName",
  "rating",
  "userRatingCount",
  "reviews",
  "googleMapsUri",
].join(",");

export type GoogleReview = {
  rating: number;
  text: string;
  author: string;
  authorPhoto: string | null;
  authorUri: string;
  relativeTime: string;
  publishTime: string;
};

export type GoogleReviewsData = {
  rating: number;
  reviewCount: number;
  googleMapsUri: string;
  displayName: string;
  reviews: GoogleReview[];
};

// Types matching the Places API (New) response shape — narrow enough to give
// us type safety on the fields we care about without modelling the whole
// payload.
type PlacesApiResponse = {
  displayName?: { text?: string };
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: Array<{
    rating?: number;
    text?: { text?: string };
    originalText?: { text?: string };
    authorAttribution?: {
      displayName?: string;
      uri?: string;
      photoUri?: string;
    };
    publishTime?: string;
    relativePublishTimeDescription?: string;
  }>;
};

export async function getGoogleReviews(): Promise<GoogleReviewsData | null> {
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
      // Cache the Places response and revalidate it at most once every 24h
      // (ISR). At one refresh/day the Places API bill stays effectively £0,
      // but new Google reviews now appear within a day without a redeploy.
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`[google-reviews] Places API ${res.status}:`, body);
      return null;
    }

    const data: PlacesApiResponse = await res.json();

    const reviews: GoogleReview[] = (data.reviews ?? []).map((r) => ({
      rating: r.rating ?? 5,
      text: r.text?.text ?? r.originalText?.text ?? "",
      author: r.authorAttribution?.displayName ?? "Google user",
      authorPhoto: r.authorAttribution?.photoUri ?? null,
      authorUri: r.authorAttribution?.uri ?? data.googleMapsUri ?? "",
      relativeTime: r.relativePublishTimeDescription ?? "",
      publishTime: r.publishTime ?? "",
    }));

    return {
      rating: data.rating ?? 0,
      reviewCount: data.userRatingCount ?? 0,
      googleMapsUri: data.googleMapsUri ?? "",
      displayName: data.displayName?.text ?? "Wok & Flame",
      reviews,
    };
  } catch (err) {
    console.error("[google-reviews] fetch error:", err);
    return null;
  }
}
