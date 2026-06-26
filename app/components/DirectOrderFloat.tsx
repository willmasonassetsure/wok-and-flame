"use client";

/**
 * DirectOrderFloat — "order direct & save" popup.
 *
 * Points visitors at the direct phone line (collection or delivery) for a 10%
 * saving vs Just Eat's ~30% commission. All copy/figures come from
 * app/lib/direct-order.ts — change them there.
 *
 * PINNED, NOT FLOATING — and there is NO animation here by design.
 * ------------------------------------------------------------------
 * Inline `position: fixed; bottom: 0` anchors the popup to the bottom of the
 * viewport on every screen size. It is rendered as a sibling of <main> in
 * page.tsx, so no transformed/filtered ancestor exists to trap `fixed`
 * (verified: <body> carries no transform/filter/will-change). There is
 * deliberately zero framer-motion: no entrance, no exit, no slide, no y-offset.
 * Nothing in this component can reposition the card, so it cannot "fly". The ✕
 * closes it for the session. The only motion on screen is the contained ember
 * border (globals.css .wf-ember-card) which animates a `::before` ring + glow
 * and never moves the card itself.
 *
 * ⚠️ DO NOT rename this card's class to `wf-ember`. HeroAtmosphere.tsx uses
 * `.wf-ember` for the hero's floating ember particles and injects a global
 * `:global(.wf-ember){ animation-name: wf-ember-rise }` rule that translates
 * any matching element 100vh up the viewport on a loop. A popup sharing that
 * class inherits the "fly up the page" motion — which is the real reason this
 * popup was historically impossible to pin (it was never a framer-motion bug).
 *
 * ⚠️ Turbopack + OneDrive watcher caveat (this is why this file thrashed):
 * `next dev` on Next 16 uses Turbopack, and Turbopack's file watcher does NOT
 * reliably pick up edits inside this OneDrive-synced folder. If a change here
 * does not appear in the browser, the running server is serving a STALE
 * compile — the fix is to restart the dev server with a clean cache
 * (kill it → delete .next → `npm run dev`), NOT to rewrite this component.
 */

import { useEffect, useState, useSyncExternalStore, type CSSProperties } from "react";
import { Phone, X } from "@phosphor-icons/react";
import {
  DIRECT_OFFER_ACTIVE,
  DIRECT_PHONE_DISPLAY,
  DIRECT_PHONE_HREF,
  DIRECT_SAVE_LABEL,
  DIRECT_SUBLINE,
} from "../lib/direct-order";

// Short delay so the popup doesn't surface during the splash loader. This is a
// mount delay, not an animation — when it mounts it is simply already there.
const APPEAR_DELAY_MS = 700;
const DISMISS_KEY = "wf-direct-float-dismissed";

// Session-scoped dismissal as an external store — read without a
// setState-in-effect, SSR-safe (server snapshot = not dismissed).
const dismissListeners = new Set<() => void>();
function subscribeDismiss(cb: () => void) {
  dismissListeners.add(cb);
  return () => dismissListeners.delete(cb);
}
function readDismissed() {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(DISMISS_KEY) === "1";
}
function persistDismissed() {
  sessionStorage.setItem(DISMISS_KEY, "1");
  dismissListeners.forEach((l) => l());
}

export default function DirectOrderFloat() {
  const dismissed = useSyncExternalStore(subscribeDismiss, readDismissed, () => false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const t = setTimeout(() => setVisible(true), APPEAR_DELAY_MS);
    return () => clearTimeout(t);
  }, [dismissed]);

  if (!DIRECT_OFFER_ACTIVE) return null;
  if (!visible || dismissed) return null;

  const dismiss = () => {
    persistDismissed();
    setVisible(false);
  };

  // Inline fixed positioning — immune to un-generated Tailwind utilities, and
  // identical on server + client. Pinned to the bottom on every viewport; the
  // safe-area inset keeps it clear of the iPhone home indicator.
  const wrapperStyle: CSSProperties = {
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 50,
    display: "flex",
    justifyContent: "center",
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: "max(24px, env(safe-area-inset-bottom))",
    pointerEvents: "none",
  };

  return (
    <div style={wrapperStyle}>
      <div
        style={{ pointerEvents: "auto" }}
        className="wf-ember-card relative w-full max-w-md rounded-2xl"
      >
        {/* Dismiss — closes immediately */}
        <button
          onClick={dismiss}
          aria-label="Dismiss offer"
          className="absolute -top-2.5 -right-2.5 z-20 w-8 h-8 rounded-full flex items-center justify-center bg-char-800 border border-char-700 text-char-300 hover:text-char-50 hover:border-char-400 transition-colors cursor-pointer"
        >
          <X size={13} weight="bold" />
        </button>

        <div className="relative rounded-2xl overflow-hidden bg-char-950/95 backdrop-blur-xl">
          <div className="relative flex items-center gap-4 p-4 pr-5">
            {/* Save seal */}
            <div className="shrink-0 flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-vermillion text-char-50 leading-none shadow-[0_8px_20px_-6px_rgba(217,45,32,0.6)]">
              <span className="text-lg font-800 tracking-tight tabular-nums">
                {DIRECT_SAVE_LABEL.replace("Save ", "")}
              </span>
              <span className="text-[8px] font-600 tracking-[0.18em] uppercase mt-0.5">Off</span>
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-700 tracking-tight text-char-50">
                {DIRECT_SAVE_LABEL} every time
              </p>
              <p className="text-xs font-300 text-char-400 mt-0.5">{DIRECT_SUBLINE}</p>

              {/* Call CTA — tel: opens the dialler on iOS + Android */}
              <a
                href={DIRECT_PHONE_HREF}
                aria-label={`Call to order direct: ${DIRECT_PHONE_DISPLAY}`}
                className="mt-2.5 inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-vermillion text-char-50 text-sm font-600 tracking-wide uppercase hover:bg-vermillion-light transition-colors duration-200 tabular-nums"
              >
                <Phone size={15} weight="fill" />
                Call {DIRECT_PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
