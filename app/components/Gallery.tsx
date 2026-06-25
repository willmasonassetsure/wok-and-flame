"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight } from "@phosphor-icons/react";

// 9 photos. Venue/interior shots lead (shopfront → signature wall → photo
// wall), then the food. Each card is sized to its OWN intrinsic aspect ratio
// (w/h below) so nothing is cropped — including the shopfront, which now
// shows whole (sign to pavement) at its native portrait ratio. Where `ar` is
// set it forces a deliberate display ratio (cropped via object-cover) instead;
// `position` nudges the object-cover focal point for those crops;
// `feature` bumps a card slightly larger to give it emphasis.
type GalleryImage = {
  src: string;
  alt: string;
  w: number;
  h: number;
  tag: string;
  caption?: string;
  ar?: string; // deliberate display aspect ratio (cropped via object-cover)
  position?: string; // object-position focal point for cropped cards
  feature?: boolean; // render slightly larger for emphasis
  hero?: boolean; // the lead card — largest, fills most of the viewport height
};

const galleryImages: GalleryImage[] = [
  { src: "/images/shop-front.webp",            alt: "Wok & Flame shopfront on Burton Road, West Didsbury, at dusk",         w: 852,  h: 1611, tag: "The Shopfront", hero: true },
  { src: "/images/local-signatures.webp",      alt: "The signature wall at Wok & Flame, covered in messages from regulars", w: 941,  h: 1672, tag: "Local Signatures", caption: "Regulars have been signing our back wall for two decades.", feature: true },
  { src: "/images/inside-wall.webp",           alt: "Framed portrait gallery on the wall inside Wok & Flame",                w: 941,  h: 1672, tag: "Inside" },
  { src: "/images/full-spread.webp",           alt: "A full Wok & Flame takeaway spread",                                    w: 1080, h: 1456, tag: "Full Spread" },
  { src: "/images/dish-plate-close.webp",      alt: "Close-up of a Wok & Flame plate",                                       w: 1139, h: 1381, tag: "Wok Hei" },
  { src: "/images/dish-noodles.webp",          alt: "A hand holding a willow-pattern plate of chow mein, salt & pepper balls and a spring roll with prawn crackers", w: 852, h: 1847, tag: "Noodles" },
  { src: "/images/dish-chips-rice-curry.webp", alt: "Chips, fried rice, curry sauce",                                        w: 1254, h: 1254, tag: "The Classic" },
  { src: "/images/full-plate.webp",            alt: "A full Chinese takeaway plate",                                         w: 1209, h: 1300, tag: "Friday Night" },
  { src: "/images/dish-prawn-toast.webp",      alt: "Prawn toast with curry sauce",                                          w: 1254, h: 1254, tag: "Full Combo" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function Gallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  // Drives the desktop pinned scroll. Card widths now vary per image (native
  // aspect ratio), so the total travel can't be a hard-coded %. We measure the
  // track's real overflow (content width − viewport width) and translate by
  // exactly that many pixels, recomputed on resize. Starts at 0 so the first
  // photo anchors against the title on the left.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const [overflow, setOverflow] = useState(0);
  useEffect(() => {
    const measure = () => {
      const el = innerRef.current;
      if (!el) return;
      setOverflow(Math.max(0, el.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Functional transform re-reads `overflow` on every render, so it picks up
  // the measured value (and resize updates) without a stale closure.
  const x = useTransform(scrollYProgress, (v) => -overflow * v);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0px", "-40px"]);
  const titleOpacity = useTransform(scrollYProgress, [0.6, 0.9], [1, 0]);
  // Scroll cue fades in just after entry, fades out as the gallery wraps up.
  const scrollCueOpacity = useTransform(
    scrollYProgress,
    [0, 0.06, 0.85, 1],
    [0, 1, 1, 0]
  );

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-title"
      className="border-t border-char-800/50"
    >
      {/* Pinned horizontal scroll — DESKTOP. Section height drives travel
          duration. h-[500vh] with 9 images gives ~55vh of scroll per photo
          — slow enough that each registers as a distinct frame, short enough
          that the section doesn't feel like a marathon. */}
      <div ref={trackRef} className="hidden md:block relative h-[500vh]">
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
          {/* Legibility scrim behind the floating title — darkens the
              top-left corner so the text reads cleanly over the lit shopfront,
              fading to transparent toward the centre so the rest of the photo
              (and the sign) stays bright. Fades out with the title on scroll so
              it never dims the later frames. */}
          <motion.div
            style={{ opacity: titleOpacity }}
            className="absolute inset-0 z-[5] pointer-events-none bg-gradient-to-br from-char-950/80 via-char-950/20 to-transparent"
          />

          {/* Floating headline — drifts up + fades as the track advances */}
          <motion.div
            style={{ y: titleY, opacity: titleOpacity }}
            className="absolute top-[16vh] left-0 right-0 z-10 pointer-events-none"
          >
            {/* Inset from the section edges (top-[16vh] + px-20) so the title
                breathes instead of hugging the corner. It still overlays the
                first card — the scrim above keeps it legible. Left-aligned
                rather than dropped into a centered max-width container (which
                read as bleeding over the first card). */}
            <div className="px-20">
              <p className="text-vermillion text-xs font-500 tracking-[0.3em] uppercase mb-3">
                Gallery
              </p>
              <h2 id="gallery-title" className="text-4xl md:text-6xl font-700 tracking-tighter leading-[0.95] text-char-50 max-w-[16ch]">
                Hot wok.
                <br />
                <span className="text-vermillion">Real fire.</span>
                <br />
                Every plate.
              </h2>
            </div>
          </motion.div>

          {/* Basic scroll cue — bottom-center, animated bounce */}
          <motion.div
            style={{ opacity: scrollCueOpacity }}
            className="absolute bottom-[3vh] left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
          >
            <span className="text-[10px] font-500 tracking-[0.4em] uppercase text-char-400">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown size={18} weight="light" className="text-char-400" />
            </motion.div>
          </motion.div>

          {/* The track — translates horizontally by the measured pixel overflow.
              `w-max` so the flex container's box matches the summed child widths
              (the value we measure via scrollWidth). */}
          <motion.div
            ref={innerRef}
            style={{ x }}
            className="flex items-center gap-6 will-change-transform w-max px-10"
          >
            {galleryImages.map((img, i) => (
              <motion.div
                key={`${img.src}-${i}`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease }}
                style={{ aspectRatio: img.ar ?? `${img.w} / ${img.h}` }}
                className={`
                  relative shrink-0 overflow-hidden rounded-2xl
                  border border-char-50/[0.06]
                  shadow-[0_20px_60px_-20px_rgba(0,0,0,0.65)]
                  ${img.hero ? "h-[90vh]" : img.feature ? "h-[84vh]" : "h-[76vh]"}
                `}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 768px) 45vw, 82vw"
                  quality={82}
                  style={{ objectPosition: img.position }}
                  className="object-cover"
                />
                {/* Caption gradient — heavier than a generic darken so the
                    tag + caption stay legible against any image. */}
                <div className="absolute inset-0 bg-gradient-to-t from-char-950/85 via-char-950/20 to-transparent pointer-events-none" />

                {/* Tag chip + frame index + optional caption. Bottom-left, no
                    pointer events so the card still receives whileHover scale. */}
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 pointer-events-none">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-600 tracking-[0.2em] uppercase bg-jade text-char-950">
                      {img.tag}
                    </span>
                    <span className="text-[10px] font-400 tracking-[0.2em] uppercase text-char-400 tabular-nums">
                      {String(i + 1).padStart(2, "0")} / {String(galleryImages.length).padStart(2, "0")}
                    </span>
                  </div>
                  {img.caption && (
                    <p className="mt-2 max-w-[26ch] text-sm font-300 leading-snug text-char-100">
                      {img.caption}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* MOBILE — native horizontal swipe with snap-x. Cards are sized by
          HEIGHT, with width derived from each image's native aspect ratio, so
          the box always matches the image exactly — portraits and squares show
          whole, never cropped and never letterboxed with side bands. */}
      <div className="md:hidden">
        <div className="max-w-[1400px] mx-auto px-6 py-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease }}
            className="text-vermillion text-xs font-500 tracking-[0.3em] uppercase mb-3"
          >
            Gallery
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="text-3xl font-700 tracking-tighter leading-[0.95] text-char-50 mb-1"
          >
            Hot wok.
            <br />
            <span className="text-vermillion">Real fire.</span>
            <br />
            Every plate.
          </motion.h2>
          <div className="mt-5 flex items-center gap-2 text-[10px] font-500 tracking-[0.4em] uppercase text-char-400">
            <span>Swipe</span>
            <motion.div
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowRight size={14} weight="light" />
            </motion.div>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory px-6 pb-10 hide-scrollbar">
          {galleryImages.map((img, i) => (
            <div
              key={`${img.src}-${i}`}
              className={`
                relative shrink-0 snap-start overflow-hidden rounded-xl
                border border-char-50/[0.06] bg-char-950
                ${img.hero ? "h-[68vh]" : "h-[60vh]"}
              `}
              style={{ aspectRatio: img.ar ?? `${img.w} / ${img.h}` }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="82vw"
                quality={78}
                style={{ objectPosition: img.position }}
                // `ar` cards are a deliberate crop (cover); the rest show whole (contain).
                className={img.ar ? "object-cover" : "object-contain"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-char-950/85 via-char-950/10 to-transparent pointer-events-none" />

              <div className="absolute inset-x-0 bottom-0 p-4 pointer-events-none">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-600 tracking-[0.2em] uppercase bg-jade text-char-950">
                    {img.tag}
                  </span>
                  <span className="text-[10px] font-400 tracking-[0.2em] uppercase text-char-400 tabular-nums">
                    {String(i + 1).padStart(2, "0")} / {String(galleryImages.length).padStart(2, "0")}
                  </span>
                </div>
                {img.caption && (
                  <p className="mt-1.5 max-w-[26ch] text-xs font-400 leading-snug text-char-100">
                    {img.caption}
                  </p>
                )}
              </div>
            </div>
          ))}
          <div className="shrink-0 w-2" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
