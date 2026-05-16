"use client";

import { motion } from "framer-motion";
import { Star } from "@phosphor-icons/react";
import {
  JUST_EAT_RATING,
  JUST_EAT_COUNT,
  JUST_EAT_URL,
  GOOGLE_FALLBACK_RATING,
  GOOGLE_FALLBACK_COUNT,
  GOOGLE_MAPS_SEARCH_URL,
  formatReviewCount,
} from "../lib/review-stats";

const ease = [0.16, 1, 0.3, 1] as const;

export type ReviewCardData = {
  name: string;
  text: string;
  time: string;
  rating: number;
  reviewLink: string;
  photo: string | null;
  isSample: boolean;
};

export type GoogleStats = {
  rating: number;
  count: number;
  link: string;
} | null;

function GoogleIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function ReviewCard({ name, text, time, rating, reviewLink, photo, isSample }: ReviewCardData) {
  const Wrapper = reviewLink ? "a" : "div";
  const wrapperProps = reviewLink
    ? {
        href: reviewLink,
        target: "_blank" as const,
        rel: "noopener noreferrer",
        "aria-label": `Read ${name}'s review on Google`,
      }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className="
        snap-start shrink-0 w-[272px] sm:w-[300px] md:w-[320px]
        rounded-2xl p-5 flex flex-col gap-3
        bg-char-50/[0.03] backdrop-blur-xl
        border border-char-50/[0.06]
        shadow-[0_8px_32px_-8px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]
        hover:border-vermillion/30 transition-colors duration-300
      "
    >
      {/* Stars + source badge */}
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={12}
              weight={i < Math.round(rating) ? "fill" : "regular"}
              className={i < Math.round(rating) ? "text-vermillion" : "text-char-700"}
            />
          ))}
        </div>
        {isSample ? (
          <span className="text-[10px] font-300 tracking-[0.18em] uppercase text-char-700">
            Sample
          </span>
        ) : (
          <div className="flex items-center gap-1.5">
            <GoogleIcon />
            <span className="text-[10px] font-300 text-char-700">Google</span>
          </div>
        )}
      </div>

      {/* Review text */}
      <p className="text-[13px] font-300 text-char-400 leading-relaxed line-clamp-3 flex-1">
        &ldquo;{text}&rdquo;
      </p>

      {/* Reviewer */}
      <div className="flex items-center justify-between border-t border-char-800/30 pt-3">
        <div className="flex items-center gap-2">
          {photo ? (
            // Author photos come from Google's CDN — using plain <img> is fine
            // here, they're small (~40px) and already CDN-served.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photo}
              alt=""
              className="w-6 h-6 rounded-full object-cover shrink-0"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-vermillion/15 border border-vermillion/20 flex items-center justify-center shrink-0">
              <span className="text-[10px] font-600 text-vermillion">{name[0]}</span>
            </div>
          )}
          <span className="text-[12px] font-400 text-char-200 truncate max-w-[140px]">
            {name}
          </span>
        </div>
        <span className="text-[11px] font-300 text-char-700 tabular-nums shrink-0">
          {time}
        </span>
      </div>
    </Wrapper>
  );
}

export default function ReviewsClient({
  reviews,
  googleStats,
  isLive,
}: {
  reviews: ReviewCardData[];
  googleStats: GoogleStats;
  isLive: boolean;
}) {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="py-10 md:py-16 border-t border-char-800/50 overflow-hidden"
    >
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 mb-7 md:mb-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease }}
              className="text-vermillion text-xs font-500 tracking-[0.3em] uppercase mb-2.5"
            >
              Reviews
            </motion.p>
            <motion.h2
              id="reviews-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="text-2xl md:text-4xl font-700 tracking-tighter text-char-50"
            >
              What our regulars say
            </motion.h2>
          </div>

          {/* Stat pills — both source-attributed + clickable. Numbers come
              from a single source of truth in app/lib/review-stats.ts so
              Hero, About, this section, and the JSON-LD aggregateRating all
              stay in sync. Google values switch to live API data when
              GOOGLE_PLACES_API_KEY + GOOGLE_PLACE_ID are set in .env.local. */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-2 shrink-0 pb-1 flex-wrap"
          >
            <a
              href={JUST_EAT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-3 py-2 rounded-full bg-char-50/[0.03] border border-char-50/[0.06] backdrop-blur-xl hover:border-vermillion/40 hover:bg-vermillion/[0.04] transition-colors duration-300"
              aria-label="See our reviews on Just Eat"
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={11} weight="fill" className="text-vermillion" />
                ))}
              </div>
              <span className="text-[11px] font-500 text-char-200 tabular-nums">{JUST_EAT_RATING.toFixed(1)}</span>
              <span className="text-[11px] font-300 text-char-400">·</span>
              <span className="text-[11px] font-400 text-char-200 tabular-nums">{formatReviewCount(JUST_EAT_COUNT)}</span>
              <span className="text-[11px] font-300 text-char-400 group-hover:text-char-200 transition-colors duration-300">on Just Eat</span>
            </a>
            <a
              href={googleStats?.link || GOOGLE_MAPS_SEARCH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-3 py-2 rounded-full bg-char-50/[0.03] border border-char-50/[0.06] backdrop-blur-xl hover:border-vermillion/40 hover:bg-vermillion/[0.04] transition-colors duration-300"
              aria-label="See our reviews on Google"
            >
              <GoogleIcon />
              <span className="text-[11px] font-500 text-char-200 tabular-nums">
                {(googleStats?.rating ?? GOOGLE_FALLBACK_RATING).toFixed(1)}
              </span>
              <span className="text-[11px] font-300 text-char-400">·</span>
              <span className="text-[11px] font-400 text-char-200 tabular-nums">
                {formatReviewCount(googleStats?.count ?? GOOGLE_FALLBACK_COUNT)}
              </span>
              <span className="text-[11px] font-300 text-char-400 group-hover:text-char-200 transition-colors duration-300">Google reviews</span>
            </a>
          </motion.div>
        </div>

        {/* Live / sample status line — small, subtle. Disappears once the
            Places API is wired and returning real reviews. */}
        {!isLive && (
          <p className="text-[10px] font-300 tracking-[0.18em] uppercase text-char-700 mt-3">
            Sample reviews shown · Live Google reviews coming soon
          </p>
        )}
      </div>

      {/* Mobile: horizontal snap scroll */}
      <div className="md:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory px-6 pb-1 hide-scrollbar">
        {reviews.map((r, i) => (
          <ReviewCard key={`${r.name}-${i}`} {...r} />
        ))}
        <div className="shrink-0 w-2" aria-hidden="true" />
      </div>

      {/* Desktop: continuous marquee */}
      <div className="hidden md:block relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-char-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-char-950 to-transparent z-10 pointer-events-none" />
        <div className="flex gap-4 animate-marquee pl-10">
          {[...reviews, ...reviews].map((r, i) => (
            <ReviewCard key={`marquee-${r.name}-${i}`} {...r} />
          ))}
        </div>
      </div>
    </section>
  );
}
