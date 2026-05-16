"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight } from "@phosphor-icons/react";

// 9 unique photos. Mix of square / portrait / landscape variants so the
// track doesn't feel like a flat conveyor. Each card carries a small jade
// tag + frame index — captions removed so the photos do the talking.
type Variant = "tall" | "wide" | "square";

type GalleryImage = {
  src: string;
  alt: string;
  variant: Variant;
  tag: string;
};

const galleryImages: GalleryImage[] = [
  { src: "/images/counter.webp",             alt: "The counter at Wok & Flame, West Didsbury", variant: "wide",   tag: "The Counter" },
  { src: "/images/full-spread.webp",         alt: "A full Wok & Flame takeaway spread",         variant: "wide",   tag: "Full Spread" },
  { src: "/images/dish-plate-close.webp",    alt: "Close-up of a Wok & Flame plate",            variant: "tall",   tag: "Wok Hei" },
  { src: "/images/dish-chow-mein.webp",      alt: "Chow mein with prawn crackers",              variant: "square", tag: "Noodles" },
  { src: "/images/friers-action.webp",       alt: "Fryers in action",                           variant: "wide",   tag: "Friers in Action" },
  { src: "/images/dish-chips-rice-curry.webp", alt: "Chips, fried rice, curry sauce",           variant: "square", tag: "The Classic" },
  { src: "/images/chef-action.webp",         alt: "Chef working the fryer at Wok & Flame",      variant: "tall",   tag: "In Action" },
  { src: "/images/full-plate.webp",          alt: "A full Chinese takeaway plate",              variant: "wide",   tag: "Friday Night" },
  { src: "/images/dish-prawn-toast.webp",    alt: "Prawn toast with curry sauce",               variant: "square", tag: "Full Combo" },
];

const variantClass: Record<Variant, string> = {
  tall: "w-[60vw] md:w-[40vw] aspect-[3/4]",
  wide: "w-[80vw] md:w-[60vw] aspect-[16/10]",
  square: "w-[68vw] md:w-[44vw] aspect-square",
};

const ease = [0.16, 1, 0.3, 1] as const;

export default function Gallery() {
  const trackRef = useRef<HTMLDivElement>(null);

  // Drives the desktop pinned scroll. With 9 images at the current sizes
  // (variants: 40 / 60 / 44 vw) the summed track is ~452vw plus ~12vw of
  // gaps ≈ 464vw. To land the last frame flush at the viewport's right
  // edge we translate by -(464-100) = -364vw out of 464vw ≈ -78.4%, so
  // -79% with a small safety buffer. Starts at 0% so the first photo
  // anchors against the title area on the left, not floating in from
  // the middle.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-79%"]);
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
          {/* Floating headline — drifts up + fades as the track advances */}
          <motion.div
            style={{ y: titleY, opacity: titleOpacity }}
            className="absolute top-[12vh] left-0 right-0 z-10 pointer-events-none"
          >
            <div className="max-w-[1400px] mx-auto px-10">
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
            className="absolute bottom-[6vh] left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
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

          {/* The track — translates horizontally as scrollYProgress advances.
              CRITICAL: `w-max` so the flex container's box matches the summed
              child widths (~1200vw). Without it, the container sits at 100vw
              and `x: -93%` only translates by 93vw, leaving 20 images off
              the right edge forever. */}
          <motion.div
            style={{ x }}
            className="flex items-center gap-6 will-change-transform w-max"
          >
            {galleryImages.map((img, i) => (
              <motion.div
                key={`${img.src}-${i}`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease }}
                className={`
                  relative shrink-0 overflow-hidden rounded-2xl
                  border border-char-50/[0.06]
                  shadow-[0_20px_60px_-20px_rgba(0,0,0,0.65)]
                  ${variantClass[img.variant]}
                `}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 70vw"
                  quality={82}
                  className="object-cover"
                />
                {/* Caption gradient — heavier than a generic darken so the
                    tag + caption stay legible against any image. */}
                <div className="absolute inset-0 bg-gradient-to-t from-char-950/85 via-char-950/20 to-transparent pointer-events-none" />

                {/* Tag chip + frame index. Bottom-left, no pointer events so
                    the card still receives whileHover scale. */}
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 pointer-events-none">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-600 tracking-[0.2em] uppercase bg-jade text-char-950">
                      {img.tag}
                    </span>
                    <span className="text-[10px] font-400 tracking-[0.2em] uppercase text-char-400 tabular-nums">
                      {String(i + 1).padStart(2, "0")} / {String(galleryImages.length).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* MOBILE — native horizontal swipe with snap-x. */}
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
                border border-char-50/[0.06]
                ${variantClass[img.variant]}
              `}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="70vw"
                quality={78}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-char-950/85 via-char-950/20 to-transparent pointer-events-none" />

              <div className="absolute inset-x-0 bottom-0 p-4 pointer-events-none">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-1.5 py-0.5 text-[9px] font-600 tracking-[0.2em] uppercase bg-jade text-char-950">
                    {img.tag}
                  </span>
                  <span className="text-[9px] font-400 tracking-[0.2em] uppercase text-char-400 tabular-nums">
                    {String(i + 1).padStart(2, "0")} / {String(galleryImages.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <div className="shrink-0 w-2" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
