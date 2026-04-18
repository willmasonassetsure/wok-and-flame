"use client";

import { motion } from "framer-motion";
import { Star } from "@phosphor-icons/react";

const ease = [0.16, 1, 0.3, 1] as const;

const reviews = [
  {
    name: "Sarah M.",
    text: "Best Chinese takeaway in Manchester, hands down. The salt & pepper chips alone are worth ordering for. Fast delivery every time.",
    time: "2 weeks ago",
  },
  {
    name: "James T.",
    text: "Been ordering from Wok & Flame for 3 years and never once been let down. The Thai green curry is genuinely restaurant quality.",
    time: "1 month ago",
  },
  {
    name: "Priya K.",
    text: "A West Didsbury institution. Generous portions, everything tastes fresh and the order is always right. Can't fault them.",
    time: "3 weeks ago",
  },
  {
    name: "Daniel H.",
    text: "Ordered the crispy duck and special fried rice — both absolutely perfect. This is proper high-heat wok cooking.",
    time: "1 week ago",
  },
  {
    name: "Emma L.",
    text: "The lemon chicken is unreal. Honestly 5 stars isn't enough. Our non-negotiable Friday night go-to.",
    time: "2 months ago",
  },
  {
    name: "Chris W.",
    text: "Quick delivery, arrived piping hot and genuinely delicious. The beef chow mein is an absolute masterclass.",
    time: "3 weeks ago",
  },
  {
    name: "Aisha R.",
    text: "The Massaman curry rivals anything I've had in a sit-down restaurant. Consistently amazing, every single time.",
    time: "1 month ago",
  },
  {
    name: "Mike B.",
    text: "Set meal for two is incredible value — everything arrived hot and perfectly timed. Best takeaway in M20 no question.",
    time: "5 days ago",
  },
  {
    name: "Lucy F.",
    text: "Just discovered this place and already obsessed. Spring rolls are gorgeous and the sweet & sour is on another level.",
    time: "2 weeks ago",
  },
  {
    name: "Tom K.",
    text: "Ordered at 6pm, arrived in 25 minutes, tasted incredible. What more do you need from a takeaway?",
    time: "1 week ago",
  },
];

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

function ReviewCard({ name, text, time }: { name: string; text: string; time: string }) {
  return (
    <div
      className="
        snap-start shrink-0 w-[272px] sm:w-[300px] md:w-[320px]
        rounded-2xl p-5 flex flex-col gap-3
        bg-char-50/[0.03] backdrop-blur-xl
        border border-char-50/[0.06]
        shadow-[0_8px_32px_-8px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]
      "
    >
      {/* Stars + Google */}
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} weight="fill" className="text-vermillion" />
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <GoogleIcon />
          <span className="text-[10px] font-300 text-char-700">Google</span>
        </div>
      </div>

      {/* Review text */}
      <p className="text-[13px] font-300 text-char-400 leading-relaxed line-clamp-3 flex-1">
        &ldquo;{text}&rdquo;
      </p>

      {/* Reviewer */}
      <div className="flex items-center justify-between border-t border-char-800/30 pt-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-vermillion/15 border border-vermillion/20 flex items-center justify-center shrink-0">
            <span className="text-[10px] font-600 text-vermillion">{name[0]}</span>
          </div>
          <span className="text-[12px] font-400 text-char-200">{name}</span>
        </div>
        <span className="text-[11px] font-300 text-char-700 tabular-nums">{time}</span>
      </div>
    </div>
  );
}

export default function Reviews() {
  return (
    <section className="py-10 md:py-16 border-t border-char-800/50 overflow-hidden">
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="text-2xl md:text-4xl font-700 tracking-tighter text-char-50"
            >
              What our regulars say
            </motion.h2>
          </div>

          {/* Stat pills — real numbers, credible */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-2 shrink-0 pb-1 flex-wrap"
          >
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-char-50/[0.03] border border-char-50/[0.06] backdrop-blur-xl">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={11} weight="fill" className="text-vermillion" />
                ))}
              </div>
              <span className="text-[11px] font-500 text-char-200 tabular-nums">5.0</span>
              <span className="text-[11px] font-300 text-char-400">·</span>
              <span className="text-[11px] font-400 text-char-200 tabular-nums">11,375</span>
              <span className="text-[11px] font-300 text-char-400">on Just Eat</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-char-50/[0.03] border border-char-50/[0.06] backdrop-blur-xl">
              <GoogleIcon />
              <span className="text-[11px] font-400 text-char-200 tabular-nums">256</span>
              <span className="text-[11px] font-300 text-char-400">Google reviews</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile: horizontal snap scroll */}
      <div className="md:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory px-6 pb-1 hide-scrollbar">
        {reviews.map((r, i) => (
          <ReviewCard key={i} {...r} />
        ))}
        {/* trailing spacer so last card doesn't butt the edge */}
        <div className="shrink-0 w-2" aria-hidden="true" />
      </div>

      {/* Desktop: continuous marquee */}
      <div className="hidden md:block relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-char-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-char-950 to-transparent z-10 pointer-events-none" />
        {/* Marquee track — duplicated so the loop is seamless */}
        <div className="flex gap-4 animate-marquee pl-10">
          {[...reviews, ...reviews].map((r, i) => (
            <ReviewCard key={i} {...r} />
          ))}
        </div>
      </div>
    </section>
  );
}
