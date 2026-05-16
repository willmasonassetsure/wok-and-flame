"use client";

/**
 * MobileOrderBar — fixed-bottom order CTA, mobile only.
 *
 * Friday-night phone-scroll conversion fix. Once the visitor scrolls past the
 * hero, the "Order on Just Eat" button leaves the viewport — this bar puts it
 * back. Two actions: Just Eat primary (the conversion event) and a phone-call
 * shortcut for direct collection orders.
 *
 * Visibility: hidden on first paint, slides up once `scrollY > 80vh`. That
 * threshold is high enough that the bar doesn't compete with the hero CTAs
 * (which are already visible above the fold) but low enough that the bar is
 * in place by the time the visitor reaches Reviews.
 *
 * iOS safe-area padding: pb-[max(0.75rem,env(safe-area-inset-bottom))] so the
 * bar clears the home indicator on notched iPhones without adding dead space
 * on Androids.
 *
 * Reduced-motion: the globals.css blanket rule collapses framer-motion
 * durations to 0.001ms, so the bar appears/disappears instantly for users
 * with that preference set. No extra code needed here.
 */

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone } from "@phosphor-icons/react";

const ease = [0.16, 1, 0.3, 1] as const;
const SHOW_AT_SCROLL_RATIO = 0.8; // 80% of viewport height past the hero

export default function MobileOrderBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setShow(window.scrollY > window.innerHeight * SHOW_AT_SCROLL_RATIO);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease }}
          className="md:hidden fixed inset-x-0 bottom-0 z-30 pointer-events-none"
        >
          <div
            className="
              pointer-events-auto
              flex items-center gap-3
              px-4 pt-3
              pb-[max(0.75rem,env(safe-area-inset-bottom))]
              bg-char-950/95 backdrop-blur-xl
              border-t border-char-800
              shadow-[0_-12px_32px_-8px_rgba(0,0,0,0.5)]
            "
          >
            <a
              href="https://www.just-eat.co.uk/restaurants-wokandgo-m20/menu"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex-1 py-3 rounded
                bg-vermillion text-char-50
                text-sm font-500 tracking-wider uppercase text-center
                active:scale-[0.98] transition-transform duration-150
                hover:bg-vermillion-light
              "
            >
              Order on Just Eat
            </a>
            <a
              href="tel:+441614346318"
              aria-label="Call to order: 0161 434 6318"
              className="
                shrink-0 w-12 h-12 rounded
                flex items-center justify-center
                border border-char-700 text-char-200
                active:scale-[0.98] transition-all duration-150
                hover:border-vermillion hover:text-char-50
              "
            >
              <Phone size={18} weight="regular" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
