import { getGoogleReviews } from "../lib/google-reviews";
import ReviewsClient, { type ReviewCardData } from "./ReviewsClient";

// Fallback reviews — real Google reviews for Wok&Flame (West Didsbury),
// snapshotted from the Places API on 2026-09-28. Used only when the live
// Places call fails or returns nothing, so the section never shows invented
// copy. Dates are fixed month/year (not "a month ago") because a snapshot's
// relative time goes stale. Photos are omitted; the card falls back to the
// reviewer's initial.
const snapshotReviews: ReviewCardData[] = [
  {
    name: "Charlie E",
    text: "Our local Chinese has never let us down - 5+ orders from here in the year that we have been here. We usually phone ahead rather than using an online platform to save costs for us, and them! Food is always tasty, usually ready for collection in less than 20 minutes from ordering and always hot. They are lovely guys who usually throw in a couple of freebies too! Cash only on collection however but no complaints there!",
    time: "May 2026",
    rating: 5,
    reviewLink: "https://www.google.com/maps/contrib/103608771309989976554/reviews",
    photo: null,
  },
  {
    name: "James Wilding",
    text: "Love this place! Generous portions, decent pricing. Everything I’ve tried has been spot on. The guy who takes your order is dead nice, and the free prawn crackers and fortune cookie with any size order is a lovely touch",
    time: "Jun 2026",
    rating: 5,
    reviewLink: "https://www.google.com/maps/contrib/103814688492648731362/reviews",
    photo: null,
  },
  {
    name: "Mercy Kibenda",
    text: "Ordered the special fried rice from Wok and Flame via Just Eat as I did not have cash, and overall it was delicious. The portion size was generous and came with extras like crackers, chilli, and a fortune cookie, which was a nice touch. The rice had a good amount of meat and chicken, though I was a bit disappointed by the lack of pork, as that’s usually my favourite part. I ended up paying nearly £9 after extras were added, which felt a bit steep, but the quality and taste were solid. Service was good, and everything arrived as expected.",
    time: "Aug 2025",
    rating: 4,
    reviewLink: "https://www.google.com/maps/contrib/104859561774311889792/reviews",
    photo: null,
  },
  {
    name: "Sacha",
    text: "Great business the food is tasty and the staff are nice, thought i'd ordered another dish and realised I didn't, they made it for me when I picked my order up.  I always recommend trying, good value!",
    time: "Aug 2025",
    rating: 5,
    reviewLink: "https://www.google.com/maps/contrib/104457099589307425964/reviews",
    photo: null,
  },
  {
    name: "JesusIsMySaviour3",
    text: "An amazing meal 🙂 Simon is such a great guy. The food was 6 star Absilutly delicious 🙂 second time I've ordered here and its just quality food! Parking can be an issue so order online don't worry the food will be great 🙂 thank you too all the chefs 🫂",
    time: "Aug 2023",
    rating: 5,
    reviewLink: "https://www.google.com/maps/contrib/105239503606901423422/reviews",
    photo: null,
  },
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
      }))
    : snapshotReviews;

  const googleStats =
    isLive && data
      ? { rating: data.rating, count: data.reviewCount, link: data.googleMapsUri }
      : null;

  return <ReviewsClient reviews={reviews} googleStats={googleStats} />;
}
