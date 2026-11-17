import "server-only";
import { business, reviews as handPicked, type Review } from "@/config/business";

export type ReviewData = {
  rating: number | null;
  count: number | null;
  reviews: Review[];
  profileUrl: string;
  live: boolean;
};

// Live Google reviews need two Vercel settings: GOOGLE_PLACES_API_KEY (a key
// with the Places API (New) enabled) and GOOGLE_PLACE_ID (the business's place
// ID). Without them, the hand-picked reviews in src/config/business.ts are used.
export async function getReviews(): Promise<ReviewData> {
  const key = process.env.GOOGLE_PLACES_API_KEY?.trim();
  const placeId = process.env.GOOGLE_PLACE_ID?.trim();
  const fallback: ReviewData = {
    rating: null,
    count: null,
    reviews: handPicked,
    profileUrl: business.googleProfileUrl,
    live: false,
  };
  if (!key || !placeId) return fallback;

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
      headers: {
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "rating,userRatingCount,reviews,googleMapsUri",
      },
      next: { revalidate: 60 * 60 * 6 },
    });
    if (!res.ok) throw new Error(`Places API ${res.status}`);
    const data = (await res.json()) as {
      rating?: number;
      userRatingCount?: number;
      googleMapsUri?: string;
      reviews?: { rating?: number; text?: { text?: string }; relativePublishTimeDescription?: string; authorAttribution?: { displayName?: string } }[];
    };
    const live = (data.reviews ?? [])
      .filter((r) => (r.rating ?? 0) >= 4 && r.text?.text)
      .map((r) => ({
        name: r.authorAttribution?.displayName ?? "Google user",
        rating: r.rating ?? 5,
        text: r.text!.text!,
        when: r.relativePublishTimeDescription,
      }));
    return {
      rating: data.rating ?? null,
      count: data.userRatingCount ?? null,
      reviews: live.length ? live : handPicked,
      profileUrl: data.googleMapsUri ?? business.googleProfileUrl,
      live: true,
    };
  } catch (e) {
    console.error("Couldn't load Google reviews:", e);
    return fallback;
  }
}
