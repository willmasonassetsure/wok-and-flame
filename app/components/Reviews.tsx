import { getGoogleReviews } from "../lib/google-reviews";
import ReviewsClient, { type ReviewCardData } from "./ReviewsClient";

// Placeholder reviews — used only when GOOGLE_PLACES_API_KEY / GOOGLE_PLACE_ID
// are unset OR the Places API returns no usable data. UI flags these as
// "Sample" so they are never presented as real consumer voice.
const placeholderReviews: ReviewCardData[] = [
  { name: "S.", text: "Best Chinese takeaway in West Didsbury. The salt & pepper chips alone are worth ordering for.", time: "Sample review", rating: 5, reviewLink: "", photo: null, isSample: true },
  { name: "J.", text: "Ordering from here for years and never let down. The Thai green curry tastes restaurant quality.", time: "Sample review", rating: 5, reviewLink: "", photo: null, isSample: true },
  { name: "P.", text: "A Didsbury institution. Generous portions, everything tastes fresh and the order is always right.", time: "Sample review", rating: 5, reviewLink: "", photo: null, isSample: true },
  { name: "D.", text: "Crispy duck and special fried rice — both perfect. Proper high-heat wok cooking.", time: "Sample review", rating: 5, reviewLink: "", photo: null, isSample: true },
  { name: "E.", text: "Our non-negotiable Friday night go-to. Lemon chicken is unreal.", time: "Sample review", rating: 5, reviewLink: "", photo: null, isSample: true },
  { name: "C.", text: "Quick delivery, arrived piping hot. The beef chow mein is a masterclass.", time: "Sample review", rating: 5, reviewLink: "", photo: null, isSample: true },
  { name: "A.", text: "Massaman curry rivals anything I've had in a sit-down restaurant.", time: "Sample review", rating: 5, reviewLink: "", photo: null, isSample: true },
  { name: "M.", text: "Set meal for two is great value — everything arrived hot and well timed.", time: "Sample review", rating: 5, reviewLink: "", photo: null, isSample: true },
];

export default async function Reviews() {
  const data = await getGoogleReviews();
  const isLive = data !== null && data.reviews.length > 0;

  const reviews: ReviewCardData[] = isLive
    ? data!.reviews.map((r) => ({
        name: r.author,
        text: r.text,
        time: r.relativeTime,
        rating: r.rating,
        reviewLink: r.authorUri,
        photo: r.authorPhoto,
        isSample: false,
      }))
    : placeholderReviews;

  const googleStats =
    isLive && data
      ? { rating: data.rating, count: data.reviewCount, link: data.googleMapsUri }
      : null;

  return (
    <ReviewsClient
      reviews={reviews}
      googleStats={googleStats}
      isLive={isLive}
    />
  );
}
