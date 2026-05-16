import { NextResponse } from "next/server";
import { getGoogleReviews } from "../../lib/google-reviews";

// Public JSON endpoint backed by the same cached server fetch as the Reviews
// component. Useful if anything else on the site (e.g. an admin dashboard,
// a future widget) wants to consume the same data without re-querying Places.
export const revalidate = 86400;

export async function GET() {
  const data = await getGoogleReviews();
  if (!data) {
    return NextResponse.json(
      { error: "Reviews unavailable — check GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID env vars." },
      { status: 503 }
    );
  }
  return NextResponse.json(data);
}
