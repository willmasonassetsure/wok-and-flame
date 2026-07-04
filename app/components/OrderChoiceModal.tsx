"use client";

/**
 * OrderChoiceModal — centred "how would you like to order?" popup.
 *
 * Opened from the navbar "Order Now" button (desktop + mobile). Presents two
 * routes: (1) Order Direct — highlighted, pushes the phone line because direct
 * orders skip the delivery-app commission and are priced off the house menu;
 * (2) Order on Just Eat — the familiar pay-online path, kept as a secondary.
 *
 * ALL copy comes from app/lib/direct-order.ts (ORDER_MODAL) and the Just Eat URL
 * from app/lib/review-stats.ts — so the whole pitch can be reworded or swapped
 * in one place. See the EASY SWAP note in direct-order.ts.
 *
 * Rendered through a portal to <body> so its `position: fixed` overlay anchors
 * to the viewport regardless of the navbar's framer-motion transform (a fixed
 * element trapped inside a transformed ancestor is what previously broke other
 * overlays here). The portal is SSR-safe: the modal only mounts after a client
 * click, so there is no server/client markup to mismatch.
 */

import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, X, ArrowUpRight } from "@phosphor-icons/react";
import { DIRECT_PHONE_HREF, ORDER_MODAL } from "../lib/direct-order";
import { JUST_EAT_URL } from "../lib/review-stats";

const ease = [0.16, 1, 0.3, 1] as const;

// SSR-safe "are we on the client yet?" — false on the server, true after
// hydration, with no setState-in-effect (which the react-hooks lint forbids).
// Gates the portal so document.body is only touched on the client.
const subscribeNoop = () => () => {};
const useMounted = () => useSyncExternalStore(subscribeNoop, () => true, () => false);

/** Just Eat wordmark — inline so it needs no asset and stays crisp at any size.
 *  Brand orange (#ff8000) house glyph + wordmark. */
function JustEatMark() {
  return (
    <span className="inline-flex items-center gap-1.5" aria-label="Just Eat">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 2.5 21 9.4V21a1 1 0 0 1-1 1h-4.4v-6.2H8.4V22H4a1 1 0 0 1-1-1V9.4l9-6.9Z"
          fill="#ff8000"
        />
      </svg>
      <span className="text-base font-800 tracking-tight" style={{ color: "#ff8000" }}>
        Just&nbsp;Eat
      </span>
    </span>
  );
}

export default function OrderChoiceModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const mounted = useMounted();
  const closeRef = useRef<HTMLButtonElement>(null);

  // Esc to close + lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <button
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 bg-char-950/80 backdrop-blur-md cursor-default"
          />

          {/* Dialog */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-modal-title"
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.28, ease }}
            className="relative w-full max-w-md rounded-2xl bg-char-950 border border-char-800 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] p-6 sm:p-7"
          >
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full flex items-center justify-center text-char-400 hover:text-char-50 hover:bg-char-800 transition-colors cursor-pointer"
            >
              <X size={16} weight="bold" />
            </button>

            {/* Heading */}
            <p className="text-[11px] font-600 tracking-[0.22em] uppercase text-vermillion-light">
              {ORDER_MODAL.eyebrow}
            </p>
            <h2
              id="order-modal-title"
              className="mt-1.5 text-2xl font-800 tracking-tight text-char-50"
            >
              {ORDER_MODAL.title}
            </h2>

            {/* ── Primary choice: Order Direct (highlighted) ── */}
            <div className="wf-ember-card mt-5 rounded-2xl">
              <div className="relative rounded-2xl overflow-hidden bg-char-900 p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-700 tracking-tight text-char-50">
                    {ORDER_MODAL.directHeading}
                  </h3>
                  <span className="shrink-0 px-2.5 py-1 rounded-full bg-vermillion text-char-50 text-[11px] font-700 tracking-wide uppercase shadow-[0_6px_16px_-4px_rgba(217,45,32,0.6)]">
                    {ORDER_MODAL.directBadge}
                  </span>
                </div>
                <p className="mt-2 text-sm font-300 leading-relaxed text-char-400">
                  {ORDER_MODAL.directBlurb}
                </p>
                <a
                  href={DIRECT_PHONE_HREF}
                  onClick={onClose}
                  className="mt-4 inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-vermillion text-char-50 text-sm font-700 tracking-wide uppercase hover:bg-vermillion-light transition-colors duration-200 tabular-nums active:scale-[0.99]"
                >
                  <Phone size={16} weight="fill" />
                  {ORDER_MODAL.directCta}
                </a>
              </div>
            </div>

            {/* ── Secondary choice: Order on Just Eat ── */}
            <a
              href={JUST_EAT_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="group mt-3 flex items-center justify-between gap-4 rounded-2xl border border-char-800 bg-char-950 p-5 hover:border-char-700 hover:bg-char-900/60 transition-colors"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-600 tracking-tight text-char-100">
                    {ORDER_MODAL.justEatHeading}
                  </h3>
                  <JustEatMark />
                </div>
                <p className="mt-1 text-sm font-300 text-char-400">
                  {ORDER_MODAL.justEatBlurb}
                </p>
              </div>
              <span className="shrink-0 flex items-center gap-1 text-xs font-600 tracking-wide uppercase text-char-300 group-hover:text-char-50 transition-colors">
                <ArrowUpRight size={16} weight="bold" />
              </span>
            </a>

            {/* Footnote */}
            <p className="mt-4 text-center text-xs font-300 text-char-400">
              {ORDER_MODAL.footnote}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
