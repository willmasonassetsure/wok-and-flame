"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Phone, Star } from "@phosphor-icons/react";
import OpenStatus from "./OpenStatus";
import HeroAtmosphere from "./HeroAtmosphere";
import type { OpeningHoursData } from "../lib/google-hours";
import {
  JUST_EAT_RATING,
  JUST_EAT_COUNT,
  JUST_EAT_URL,
  formatReviewCount,
} from "../lib/review-stats";

const ease = [0.16, 1, 0.3, 1] as const;

export default function HeroClient({ hours }: { hours: OpeningHoursData }) {
  return (
    <section className="relative min-h-[100dvh] flex items-end md:items-center overflow-hidden">
      {/* Background image — local stopgap (Pexels shot pulled local + WebP'd
          at q72 so it's same-origin + LCP-optimised). When the custom GPT
          Image 2 hero (see SEO_HANDOFF.md → "Hero image prompt") is generated
          and dropped into /public/images/hero-wok.webp, swap the src below.
          `priority` tells next/image to preload — this is the LCP element. */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-stopgap.webp"
          alt="Wok-fired Chinese food in West Didsbury"
          fill
          priority
          sizes="100vw"
          quality={85}
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-char-950 via-char-950/85 to-char-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-char-950 via-char-950/30 to-char-950/50" />
      </div>

      {/* Atmosphere overlays — grain, embers, heat-haze on FLAME, vignette
          breath. Sits above the photo + gradients, below the content grid.
          All four respect prefers-reduced-motion via globals.css. */}
      <HeroAtmosphere />

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 md:px-10 pb-20 md:pb-0">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end md:items-center">
          <div className="md:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
            >
              <p className="text-vermillion text-xs md:text-sm font-500 tracking-[0.3em] uppercase mb-6 md:mb-8 inline-flex items-center gap-3 flex-wrap">
                <OpenStatus hours={hours} />
                <span aria-hidden className="text-char-600">|</span>
                <span>West Didsbury &middot; Manchester</span>
              </p>
            </motion.div>

            {/* Editorial wordmark — clamp keeps it readable on mobile and
                lets it dominate on desktop without bleeding off the page.
                Two-line stack with FLAME in vermillion mirrors the brand mark. */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease }}
              className="font-800 tracking-[-0.04em] leading-[0.85] text-char-50 mb-0 text-[clamp(4rem,12vw,11rem)]"
            >
              WOK &amp;
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease }}
              className="font-800 tracking-[-0.04em] leading-[0.85] text-vermillion mb-8 md:mb-10 text-[clamp(4rem,12vw,11rem)]"
            >
              FLAME
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease }}
              className="text-lg md:text-xl font-300 text-char-400 leading-relaxed max-w-[50ch] mb-4"
            >
              Authentic Chinese takeaway, wok-fired fresh in West Didsbury. Delivery and collection.
            </motion.p>

            {/* Rating line — aggregate stats sourced from app/lib/review-stats.ts.
                Update the constants in that one file when the live numbers shift. */}
            <motion.a
              href={JUST_EAT_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65, ease }}
              className="group inline-flex items-center gap-2 mb-10 hover:opacity-80 transition-opacity duration-300"
              aria-label={`See our ${formatReviewCount(JUST_EAT_COUNT)} reviews on Just Eat`}
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} weight="fill" className="text-vermillion" />
                ))}
              </div>
              <span className="text-sm font-400 text-char-400">
                {JUST_EAT_RATING.toFixed(1)} &middot; {formatReviewCount(JUST_EAT_COUNT)} reviews on Just Eat
              </span>
            </motion.a>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75, ease }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href={JUST_EAT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 bg-vermillion text-char-50 text-sm font-500 tracking-wider uppercase hover:bg-vermillion-light transition-all duration-300 active:scale-[0.98] text-center w-full sm:w-auto"
              >
                Order on Just Eat
              </a>
              <a
                href="tel:+441614346318"
                className="px-8 py-3.5 border border-char-700 text-char-200 text-sm font-500 tracking-wider uppercase hover:border-vermillion hover:text-char-50 transition-all duration-300 active:scale-[0.98] text-center w-full sm:w-auto inline-flex items-center justify-center gap-2"
              >
                <Phone size={14} weight="regular" />
                0161 434 6318
              </a>
              <a
                href="#menu"
                className="px-8 py-3.5 border border-char-800 text-char-400 text-sm font-500 tracking-wider uppercase hover:border-char-400 hover:text-char-50 transition-all duration-300 active:scale-[0.98] text-center w-full sm:w-auto"
              >
                View Menu
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="hidden md:flex md:col-span-4 flex-col items-end gap-8 text-right"
          >
            <div className="border-r border-char-700 pr-6">
              <p className="text-xs font-400 tracking-[0.2em] text-char-400 uppercase mb-1">
                Delivery
              </p>
              <p className="text-sm font-300 text-char-200">
                Opens daily at 16:55
              </p>
            </div>
            <div className="border-r border-char-700 pr-6">
              <p className="text-xs font-400 tracking-[0.2em] text-char-400 uppercase mb-1">
                Collection
              </p>
              <p className="text-sm font-300 text-char-200">
                From 17:00
              </p>
            </div>
            <div className="border-r border-char-700 pr-6">
              <p className="text-xs font-400 tracking-[0.2em] text-char-400 uppercase mb-1">
                Min. Order
              </p>
              <p className="text-sm font-300 text-char-200">
                &pound;15.00
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={20} weight="light" className="text-char-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
