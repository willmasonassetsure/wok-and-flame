"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion";
import { Fire, Wine, CookingPot, Leaf, Star, BowlFood, BowlSteam, ForkKnife, Pepper, Drop, CaretRight, CaretDown, Tray, Sparkle, Orange, Flame, Spiral, Carrot, IceCream } from "@phosphor-icons/react";
import { menuData, type MenuItem } from "../data/menu";

const ease = [0.16, 1, 0.3, 1] as const;

// One distinct, category-matched icon per section. Fire is reserved for the
// inline "spicy" marker, so Curries uses a chilli Pepper to avoid colliding.
const categoryIcons: Record<string, typeof Fire> = {
  "Set Meals": Tray,
  Specials: Sparkle,
  Appetisers: ForkKnife,
  Soups: BowlSteam,
  Mains: CookingPot,
  "Sweet & Sour": Orange,
  Curries: Pepper,
  "Deep Fried": Flame,
  Noodles: Spiral,
  "Fried Rice": BowlFood,
  Sides: Carrot,
  Sauces: Drop,
  Desserts: IceCream,
  Drinks: Wine,
};

// The 23 Main Courses cooking styles (Phase 2 will move this into menu.ts).
const mainsStyles: { name: string; spicy?: boolean }[] = [
  { name: "Foo Yung (scrambled egg)" },
  { name: "Spicy Peanut Satay Sauce", spicy: true },
  { name: "Sweet Cantonese Sauce" },
  { name: "Black Bean Sauce", spicy: true },
  { name: "Black Pepper Sauce" },
  { name: "Thai Sweet Chilli Sauce", spicy: true },
  { name: "Szechuan Sauce", spicy: true },
  { name: "Kung Po Sauce", spicy: true },
  { name: "English White Mushroom" },
  { name: "Cashew Nuts" },
  { name: "Fresh Diced Tomato" },
  { name: "Pineapple" },
  { name: "Pineapple & Sweet Ginger" },
  { name: "Spring Onion & Fresh Ginger" },
  { name: "Beansprouts" },
  { name: "Garlic Oyster Sauce" },
  { name: "Babycorn" },
  { name: "Bamboo Shoots & Water Chestnut" },
  { name: "Broccoli" },
  { name: "Garlic Sauce", spicy: true },
  { name: "Lemon Honey Sauce" },
  { name: "Orange Sauce" },
  { name: "Plum Sauce" },
];

/* ─── Glass Card ─── */
function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`
        relative rounded-2xl overflow-hidden
        bg-char-50/[0.03] backdrop-blur-2xl
        border border-char-50/[0.06]
        shadow-[0_8px_32px_-8px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)]
        ${className}
      `}
    >
      {children}
    </div>
  );
}

/* ─── Category Tab ─── */
function CategoryTab({
  shortTitle,
  isActive,
  onClick,
  tabRef,
}: {
  label: string;
  shortTitle: string;
  isActive: boolean;
  onClick: () => void;
  tabRef: (el: HTMLButtonElement | null) => void;
}) {
  const Icon = categoryIcons[shortTitle] || ForkKnife;
  return (
    <motion.button
      ref={tabRef}
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      className={`
        relative flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-lg whitespace-nowrap
        text-[11px] sm:text-xs font-500 tracking-wide transition-colors duration-300
        ${isActive ? "text-char-50" : "text-char-400 hover:text-char-200"}
      `}
    >
      {/* Active background pill */}
      {isActive && (
        <motion.div
          layoutId="activeMenuTab"
          className="absolute inset-0 rounded-lg bg-char-50/[0.08] border border-char-50/[0.1] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}

      <motion.span
        className="relative z-10"
        animate={isActive ? { scale: 1.15 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <Icon size={14} weight={isActive ? "fill" : "regular"} />
      </motion.span>
      <span className="relative z-10 hidden sm:inline">{shortTitle}</span>
    </motion.button>
  );
}

/* ─── Dish Row ─── */
function DishRow({
  item,
  index,
  isHighlighted = false,
}: {
  item: { name: string; price: string; desc?: string; spicy?: boolean; popular?: boolean };
  index: number;
  isHighlighted?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{
        opacity: 1,
        y: 0,
        backgroundColor: isHighlighted
          ? "rgba(180, 35, 24, 0.08)"
          : "rgba(180, 35, 24, 0)",
      }}
      transition={{
        opacity: { duration: 0.35, delay: Math.min(index * 0.04, 0.6), ease },
        y: { duration: 0.35, delay: Math.min(index * 0.04, 0.6), ease },
        backgroundColor: { duration: 0.6, ease },
      }}
      className="group py-4 first:pt-0 last:pb-0 -mx-3 px-3 rounded-lg"
    >
      <div className="flex items-center justify-between gap-3 mb-1">
        <div className="flex items-center gap-2 min-w-0">
          <h4
            className={`text-[14px] font-500 transition-colors duration-300 truncate ${
              isHighlighted
                ? "text-vermillion"
                : "text-char-50 group-hover:text-vermillion"
            }`}
          >
            {item.name}
          </h4>
          {item.spicy && (
            <div className="shrink-0 w-1.5 h-1.5 rounded-full bg-vermillion/70" />
          )}
          {item.popular && (
            <span className="shrink-0 text-[10px] font-500 tracking-wider uppercase text-vermillion/70 border border-vermillion/20 rounded px-1.5 py-0.5">
              Popular
            </span>
          )}
        </div>
        <div className="flex-1 mx-3 border-b border-dotted border-char-800/30 min-w-[20px] translate-y-[-1px]" />
        <span className="text-[13px] font-400 text-char-400 tabular-nums shrink-0">
          {item.price}
        </span>
      </div>
      {item.desc && (
        <p className="text-[12px] font-300 text-char-400/60 leading-relaxed">
          {item.desc}
        </p>
      )}
    </motion.div>
  );
}

/* ─── Popular Pick Chip ─── */
function PopularPickChip({
  name,
  price,
  catShort,
  onClick,
}: {
  name: string;
  price: string;
  catShort: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className="
        group shrink-0 snap-start flex items-center gap-3 pl-3 pr-4 py-2.5
        rounded-xl bg-char-50/[0.03] backdrop-blur-xl
        border border-char-50/[0.06]
        hover:border-vermillion/40 hover:bg-vermillion/[0.04]
        shadow-[0_4px_16px_-4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.04)]
        transition-colors duration-300
      "
    >
      <div className="shrink-0 w-7 h-7 rounded-lg bg-vermillion/10 border border-vermillion/20 flex items-center justify-center">
        <Star size={12} weight="fill" className="text-vermillion" />
      </div>
      <div className="flex flex-col items-start text-left min-w-0">
        <span className="text-[12.5px] font-500 text-char-50 whitespace-nowrap leading-tight">
          {name}
        </span>
        <span className="text-[9px] font-500 tracking-[0.15em] uppercase text-char-500 mt-0.5">
          {catShort}
        </span>
      </div>
      <div className="flex items-center gap-1 ml-1">
        <span className="text-[12.5px] font-600 text-vermillion tabular-nums">
          £{price}
        </span>
        <CaretRight
          size={10}
          weight="bold"
          className="text-char-500 group-hover:text-vermillion group-hover:translate-x-0.5 transition-all duration-300"
        />
      </div>
    </motion.button>
  );
}

/* ─── Main Courses reference panel — static (no cart), used on mobile + desktop ─── */
function MainsPanel({ proteins }: { proteins: MenuItem[] }) {
  return (
    <div className="space-y-6">
      <p className="text-[13px] font-300 text-char-300 leading-relaxed">
        Pick any protein, then choose how it&apos;s cooked. The protein sets the price —
        any of the {mainsStyles.length} styles, no extra charge.
      </p>
      <div>
        <p className="text-[10px] font-600 tracking-[0.25em] uppercase text-char-500 mb-3">Choose a protein</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {proteins.map((p) => (
            <div
              key={p.name}
              className="flex items-center justify-between gap-2 rounded-lg px-3 py-2 border border-char-50/[0.07] bg-char-50/[0.02]"
            >
              <span className="flex items-center gap-1.5 min-w-0">
                <span className="text-[13px] font-500 text-char-50 truncate">{p.name}</span>
                {p.vegetarian && <Leaf size={11} weight="fill" className="text-emerald-400 shrink-0" />}
              </span>
              <span className="text-[12px] font-600 text-char-300 tabular-nums shrink-0">£{p.price}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="text-[10px] font-600 tracking-[0.25em] uppercase text-char-500 mb-3">Cooked your way</p>
        <div className="flex flex-wrap gap-2">
          {mainsStyles.map((s) => (
            <span
              key={s.name}
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 border border-char-50/[0.07] bg-char-50/[0.02] text-[12px] font-400 text-char-200"
            >
              {s.name}
              {s.spicy && <Fire size={11} weight="fill" className="text-vermillion/80 shrink-0" />}
            </span>
          ))}
        </div>
      </div>
      <p className="text-[12px] font-300 text-char-400/80 leading-relaxed border-l-2 border-vermillion/40 pl-3">
        e.g. <span className="text-char-200">Chicken in Black Bean Sauce</span> ·{" "}
        <span className="text-char-200">Beef with Cashew Nuts</span> ·{" "}
        <span className="text-char-200">Tofu in Szechuan Sauce</span>
      </p>
    </div>
  );
}

/* ─── Mobile accordion row (static) ─── */
function MobileDishLine({ item }: { item: MenuItem }) {
  return (
    <div className="py-3 first:pt-0 last:pb-0">
      <div className="flex items-center justify-between gap-3 mb-0.5">
        <div className="flex items-center gap-2 min-w-0">
          <h4 className="text-[14px] font-500 text-char-50 truncate">{item.name}</h4>
          {item.spicy && <Fire size={12} weight="fill" className="text-vermillion/80 shrink-0" />}
          {item.vegetarian && <Leaf size={12} weight="fill" className="text-emerald-400 shrink-0" />}
          {item.popular && (
            <span className="shrink-0 text-[10px] font-500 tracking-wider uppercase text-vermillion/70 border border-vermillion/20 rounded px-1.5 py-0.5">
              Popular
            </span>
          )}
        </div>
        <div className="flex-1 mx-2 border-b border-dotted border-char-800/40 min-w-[16px] translate-y-[-1px]" />
        <span className="text-[13px] font-400 text-char-300 tabular-nums shrink-0">£{item.price}</span>
      </div>
      {item.desc && <p className="text-[12px] font-300 text-char-400/70 leading-relaxed pr-10">{item.desc}</p>}
    </div>
  );
}

/* ─── Mobile menu — collapsible accordion (replaces the Jump-To grid + tabs) ─── */
function MobileMenu() {
  const [open, setOpen] = useState<Set<string>>(new Set());
  const allOpen = open.size === menuData.length;
  const toggle = (k: string) =>
    setOpen((prev) => {
      const n = new Set(prev);
      if (n.has(k)) n.delete(k);
      else n.add(k);
      return n;
    });

  return (
    <div className="md:hidden">
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => setOpen(allOpen ? new Set() : new Set(menuData.map((c) => c.shortTitle)))}
          className="text-[12px] font-500 text-char-300 hover:text-vermillion transition-colors"
        >
          {allOpen ? "Collapse all" : "Expand all"}
        </button>
        <span className="text-[11px] font-300 text-char-600 tabular-nums">{menuData.length} sections</span>
      </div>
      <div className="space-y-3">
        {menuData.map((cat) => {
          const isOpen = open.has(cat.shortTitle);
          const Icon = categoryIcons[cat.shortTitle] || ForkKnife;
          const isMains = cat.shortTitle === "Mains";
          return (
            <GlassCard key={cat.shortTitle} className={isOpen ? "border-char-50/[0.12]" : ""}>
              <button
                onClick={() => toggle(cat.shortTitle)}
                aria-expanded={isOpen}
                className="w-full flex items-center gap-3 px-4 py-4 text-left"
              >
                <span
                  className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center border transition-colors duration-300 ${
                    isOpen ? "bg-vermillion/10 border-vermillion/30 text-vermillion" : "bg-char-50/[0.03] border-char-50/[0.08] text-char-400"
                  }`}
                >
                  <Icon size={16} weight={isOpen ? "fill" : "regular"} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-600 text-char-50 tracking-tight truncate">{cat.title}</span>
                  {cat.description && (
                    <span className="block text-[11px] font-300 text-char-500 truncate">{cat.description}</span>
                  )}
                </span>
                <span className="shrink-0 text-[11px] font-400 text-char-600 tabular-nums">{cat.items.length}</span>
                <CaretDown
                  size={16}
                  weight="bold"
                  className={`shrink-0 text-char-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-4 pb-5 pt-1 border-t border-char-800/30">
                    {isMains ? (
                      <div className="pt-4">
                        <MainsPanel proteins={cat.items} />
                      </div>
                    ) : (
                      <div className="divide-y divide-char-800/20 pt-1">
                        {cat.items.map((item) => (
                          <MobileDishLine key={item.name} item={item} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Main Menu Component ─── */
export default function MenuHighlights() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [highlightedItem, setHighlightedItem] = useState<string | null>(null);
  const category = menuData[activeIdx];
  const wrapperRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const menuContentRef = useRef<HTMLDivElement>(null);

  // Cross-category popular picks — quick-access chips at the top of the menu
  const popularPicks = useMemo(() => {
    const picks: Array<{ name: string; price: string; catIdx: number; catShort: string }> = [];
    menuData.forEach((cat, catIdx) => {
      cat.items.forEach((item) => {
        if (item.popular) {
          picks.push({ name: item.name, price: item.price, catIdx, catShort: cat.shortTitle });
        }
      });
    });
    return picks;
  }, []);

  // Category content signals — computed once per render, reused by the mobile
  // indicator row under the tab bar and the desktop legend at the bottom.
  // All three now read directly from explicit item flags in menu.ts (no more
  // regex-based veg guessing), so the indicators map to real data.
  const categorySignals = useMemo(() => {
    const hasSpicy = category.items.some((i) => i.spicy);
    const hasPopular = category.items.some((i) => i.popular);
    const hasVeg = category.items.some((i) => i.vegetarian);
    return { hasSpicy, hasPopular, hasVeg };
  }, [category]);

  // Clear the pick highlight after a short glow
  useEffect(() => {
    if (!highlightedItem) return;
    const t = setTimeout(() => setHighlightedItem(null), 2500);
    return () => clearTimeout(t);
  }, [highlightedItem]);

  // Tap a Popular Pick → jump to category, flash the dish, scroll menu into view
  const handlePickClick = useCallback((catIdx: number, itemName: string) => {
    setActiveIdx(catIdx);
    setHighlightedItem(itemName);
    // Give the category transition a beat before scrolling
    requestAnimationFrame(() => {
      menuContentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  // Motion value for wok X position — updates instantly on scroll, animated on click
  const wokX = useMotionValue(0);
  const [wokReady, setWokReady] = useState(false);
  // The inner, content-width tab row — observed for reflow (e.g. web-font swap
  // widening the tabs) so the wok re-syncs. The scroll container's own box is
  // width-locked by the card, so observing it alone misses content growth.
  const trackRef = useRef<HTMLDivElement>(null);
  // Single-owner guard for wokX. While an auto-centre is in flight the spring
  // owns wokX end-to-end; the scroll handler stands down so it can't snap the
  // wok back to a mid-scroll position. Cleared on scrollend (+ timeout fallback).
  const wokControls = useRef<ReturnType<typeof animate> | null>(null);
  const autoCentering = useRef(false);
  const releaseTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  // Hides the wok when its active tab scrolls out of the slider's visible range
  const [wokVisible, setWokVisible] = useState(true);

  // Custom iOS-style scrollbar metrics
  const [scrollMetrics, setScrollMetrics] = useState({ ratio: 0, visibleRatio: 1 });

  // Half the wok SVG width — used to centre it and to inset it from the edges
  const WOK_HALF = 18;

  // The scrollLeft that auto-centres the active tab inside the strip. Shared by
  // the wok spring (to project where the tab WILL be) and the auto-centre scroll
  // (to actually move there) so the two never disagree about the destination.
  const getCenterScrollLeft = useCallback(() => {
    const tab = tabRefs.current[activeIdx];
    const container = scrollRef.current;
    if (!tab || !container) return 0;
    const max = container.scrollWidth - container.clientWidth;
    const target = tab.offsetLeft - container.clientWidth / 2 + tab.offsetWidth / 2;
    return Math.max(0, Math.min(max, target));
  }, [activeIdx]);

  // Compute the wok's target X (clamped to the slider's visible range) and
  // whether it should be shown. The wok is tethered to the active tab, but the
  // tab can be scrolled out of the icon strip — without clamping the wok would
  // drift outside the card. So we clamp X to the visible scroll viewport and
  // fade the wok out once its tab's centre leaves that viewport entirely.
  //
  // `projectedScrollLeft` lets callers ask "where will the wok be once the strip
  // has scrolled to this position?". On a tab change the auto-centre scroll and
  // the wok spring run concurrently; framer-motion's animate() loop overwrites
  // wokX every frame and so beats the scroll handler's instant set. If the
  // spring aimed at the tab's CURRENT (pre-scroll) position it would park the
  // wok where the tab used to be — i.e. over the neighbouring tab once the strip
  // finishes centring. Projecting to the post-scroll position makes the spring
  // and the scroll converge on the same spot.
  const computeWokTarget = useCallback((projectedScrollLeft?: number) => {
    const tab = tabRefs.current[activeIdx];
    const wrapper = wrapperRef.current;
    const container = scrollRef.current;
    if (!tab || !wrapper || !container) return null;

    const tabRect = tab.getBoundingClientRect();
    const wrapperRect = wrapper.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // Tab centre + visible viewport edges, all in wrapper-local coordinates
    let center = tabRect.left - wrapperRect.left + tabRect.width / 2;
    // Shift the tab centre by the pending scroll delta when projecting forward.
    if (projectedScrollLeft !== undefined) {
      center -= projectedScrollLeft - container.scrollLeft;
    }
    const viewLeft = containerRect.left - wrapperRect.left;
    const viewRight = containerRect.right - wrapperRect.left;

    // Keep the wok a touch inside the rounded card edges
    const inset = WOK_HALF + 6;
    const clamped = Math.max(viewLeft + inset, Math.min(viewRight - inset, center));

    // Fade out once the tab's centre has scrolled past either edge
    const visible = center >= viewLeft && center <= viewRight;

    return { x: clamped - WOK_HALF, visible };
  }, [activeIdx]);

  // Pin the wok to the active tab's true, live position (manual scroll / reflow).
  const pinWok = useCallback(() => {
    const target = computeWokTarget();
    if (target !== null) {
      wokX.set(target.x);
      setWokVisible(target.visible);
    }
  }, [computeWokTarget, wokX]);

  // Hand wokX back to the scroll handler once an auto-centre has come to rest,
  // and reconcile to the real tab position. Safe to call repeatedly.
  const releaseWok = useCallback(() => {
    clearTimeout(releaseTimer.current);
    autoCentering.current = false;
    wokControls.current?.stop();
    wokControls.current = null;
    pinWok();
  }, [pinWok]);

  // Update scrollbar metrics
  const updateScrollMetrics = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const visibleRatio = el.scrollWidth > 0 ? Math.min(1, el.clientWidth / el.scrollWidth) : 1;
    const scrollable = el.scrollWidth - el.clientWidth;
    const ratio = scrollable > 0 ? el.scrollLeft / scrollable : 0;
    setScrollMetrics({ ratio, visibleRatio });
  }, []);

  // Click transition: animate wok with spring to where the active tab will land
  // AFTER the auto-centre scroll (see computeWokTarget) so the spring and the
  // scroll agree on the destination instead of fighting over wokX.
  useEffect(() => {
    const target = computeWokTarget(getCenterScrollLeft());
    if (target === null) return;
    setWokVisible(target.visible);
    if (!wokReady) {
      wokX.set(target.x);
      setWokReady(true);
      return;
    }
    // Claim wokX for the duration of the auto-centre so the scroll handler
    // doesn't fight the spring (see autoCentering / onScroll below).
    wokControls.current?.stop();
    autoCentering.current = true;
    const controls = animate(wokX, target.x, {
      type: "spring",
      stiffness: 380,
      damping: 32,
    });
    wokControls.current = controls;
    // Hard fallback: if the auto-centre scroll is a no-op (edge tab already at
    // the clamp) no scroll/scrollend events fire, so release ownership here too.
    clearTimeout(releaseTimer.current);
    releaseTimer.current = setTimeout(releaseWok, 700);
    return () => controls.stop();
  }, [activeIdx, computeWokTarget, getCenterScrollLeft, wokX, wokReady, releaseWok]);

  // Auto-center the active icon inside the slider card. Since Jump To is the
  // primary mobile nav, the slider becomes a "you are here" strip — when
  // activeIdx changes (via Jump To tap, icon tap, or Popular Pick on desktop),
  // we scroll the container so the active icon is centred. Uses container
  // scrollTo (not scrollIntoView) to avoid scrolling the whole page.
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    container.scrollTo({
      left: getCenterScrollLeft(),
      behavior: "smooth",
    });
  }, [activeIdx, getCenterScrollLeft]);

  // Scroll tracking: instant update, no spring lag. Wok is visually tethered to the tab.
  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    const onScroll = () => {
      // During a programmatic auto-centre the spring is authoritative — only
      // keep the scrollbar in sync, and debounce the ownership handoff so it
      // fires once the scroll settles (covers browsers without scrollend).
      // Otherwise this is a user scroll: cancel any lingering spring and glue
      // the wok to the finger instantly.
      if (autoCentering.current) {
        clearTimeout(releaseTimer.current);
        releaseTimer.current = setTimeout(releaseWok, 120);
      } else {
        wokControls.current?.stop();
        wokControls.current = null;
        pinWok();
      }
      updateScrollMetrics();
    };

    // Reflow (web-font swap, viewport change): re-pin only when the spring
    // isn't mid-flight, so we don't stomp an in-progress click animation.
    const onReflow = () => {
      if (!autoCentering.current) pinWok();
      updateScrollMetrics();
    };

    scrollEl.addEventListener("scroll", onScroll, { passive: true });
    scrollEl.addEventListener("scrollend", releaseWok);
    window.addEventListener("resize", onReflow);

    // Observe the content-width row (and the container) for reflow — the
    // container's own box is width-locked by the card, so the inner row is
    // what actually grows when web fonts widen the tabs.
    const resizeObserver = new ResizeObserver(onReflow);
    if (trackRef.current) resizeObserver.observe(trackRef.current);
    resizeObserver.observe(scrollEl);

    // Web fonts change tab widths after first paint — re-pin once they load.
    let fontsActive = true;
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(() => {
        if (fontsActive && !autoCentering.current) pinWok();
      });
    }

    // Initial sync
    updateScrollMetrics();

    return () => {
      fontsActive = false;
      clearTimeout(releaseTimer.current);
      scrollEl.removeEventListener("scroll", onScroll);
      scrollEl.removeEventListener("scrollend", releaseWok);
      window.removeEventListener("resize", onReflow);
      resizeObserver.disconnect();
    };
  }, [pinWok, releaseWok, updateScrollMetrics]);

  // Scrollbar thumb sizing
  const thumbPct = Math.max(scrollMetrics.visibleRatio * 100, 18);
  const thumbLeftPct = scrollMetrics.ratio * (100 - thumbPct);
  const showScrollbar = scrollMetrics.visibleRatio < 0.999;

  return (
    <section
      id="menu"
      aria-labelledby="menu-title"
      className="py-10 md:py-40 border-t border-char-800/50"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="text-vermillion text-xs font-500 tracking-[0.3em] uppercase mb-5"
        >
          Full Menu
        </motion.p>

        <motion.h2
          id="menu-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="text-3xl md:text-5xl font-700 tracking-tighter leading-tight text-char-50 mb-6"
        >
          What we cook
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="text-base font-300 text-char-400 leading-relaxed max-w-[55ch] mb-6 md:mb-10"
        >
          Every dish wok-fired fresh to order. Delivery and collection
          available through Just Eat.
        </motion.p>

        {/* Popular Picks — cross-category quick-access chips. Desktop only:
            on mobile, the icon nav + Quick Browse grid + indicator row already
            stack tall enough that adding another scroll strip would push the
            actual dishes out of view. Mobile users get pre-click visibility
            from the Jump To grid instead. */}
        {popularPicks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="hidden md:block mb-10"
          >
            <div className="flex items-center gap-2 mb-3">
              <Star size={11} weight="fill" className="text-vermillion" />
              <p className="text-[10px] font-500 tracking-[0.3em] uppercase text-char-400">
                Popular right now
              </p>
              <div className="flex-1 h-px bg-gradient-to-r from-char-800/60 to-transparent" />
              <span className="text-[10px] font-400 text-char-600 tabular-nums">
                {popularPicks.length} picks
              </span>
            </div>
            {/* Bleed to viewport edges on mobile so scroll feels native */}
            <div className="-mx-6 md:mx-0 px-6 md:px-0">
              <div className="flex gap-2.5 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-1">
                {popularPicks.map((pick) => (
                  <PopularPickChip
                    key={`${pick.catIdx}-${pick.name}`}
                    name={pick.name}
                    price={pick.price}
                    catShort={pick.catShort}
                    onClick={() => handlePickClick(pick.catIdx, pick.name)}
                  />
                ))}
                <div className="shrink-0 w-2 md:hidden" aria-hidden="true" />
              </div>
            </div>
          </motion.div>
        )}

        {/* Active category title — pulled above the nav so the section name,
            the category switcher, and the dishes read as a single unit. The
            nav bar (desktop tabs / mobile Jump To grid) now sits directly
            between this title and the menu it controls. Cross-fades on tap. */}
        <div className="mb-5 md:mb-6 hidden md:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease }}
              className="flex flex-wrap items-baseline gap-2 md:gap-4"
            >
              <h3 className="text-base md:text-lg font-600 text-char-50 tracking-tight">
                {category.title}
              </h3>
              {category.description && (
                <p className="text-xs font-300 text-char-400 hidden sm:block">
                  {category.description}
                </p>
              )}
              <span className="text-xs font-400 text-char-700 tabular-nums ml-auto">
                {category.items.length} items
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Tab bar wrapper — relative parent; wok sits in reserved pt-9 space on desktop */}
        <motion.div
          ref={wrapperRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="relative mb-4 md:pt-9 hidden md:block"
        >
          {/* Floating wok — desktop only. Tethered to active tab via motion value
              that updates INSTANTLY on scroll (no spring lag) and springs on click. */}
          {wokReady && (
            <motion.div
              className="hidden md:block absolute pointer-events-none z-20 left-0"
              style={{ top: 0, x: wokX }}
              animate={{ opacity: wokVisible ? 1 : 0 }}
              transition={{ duration: 0.25, ease }}
            >
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg width="36" height="30" viewBox="0 0 40 33" fill="none" overflow="visible" className="drop-shadow-[0_0_10px_rgba(180,35,24,0.5)]">
                  <ellipse cx="18" cy="17" rx="13" ry="7" fill="#1c1917" stroke="#44403c" strokeWidth="0.8" />
                  <ellipse cx="18" cy="16" rx="11" ry="5.5" fill="#292524" />
                  <motion.g animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }} style={{ transformOrigin: "18px 28px" }}>
                    <ellipse cx="13" cy="26" rx="2.5" ry="4" fill="#b42318" opacity="0.8" />
                    <ellipse cx="18" cy="25" rx="3" ry="5" fill="#d92d20" opacity="0.7" />
                    <ellipse cx="23" cy="26" rx="2.5" ry="4" fill="#b42318" opacity="0.8" />
                    <ellipse cx="18" cy="26.5" rx="1.8" ry="2.5" fill="#fbbf24" opacity="0.35" />
                  </motion.g>
                  <motion.path d="M13 11 Q13.5 7 12.5 3" stroke="#555" strokeWidth="0.6" strokeLinecap="round" fill="none" animate={{ opacity: [0, 0.4, 0] }} transition={{ duration: 2, repeat: Infinity }} />
                  <motion.path d="M18 10 Q17.5 6 18.5 2" stroke="#555" strokeWidth="0.6" strokeLinecap="round" fill="none" animate={{ opacity: [0, 0.3, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
                  <motion.path d="M23 11 Q22.5 7 23.5 3" stroke="#555" strokeWidth="0.6" strokeLinecap="round" fill="none" animate={{ opacity: [0, 0.4, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} />
                  <rect x="30" y="15" width="4" height="2" rx="1" fill="#44403c" />
                </svg>
              </motion.div>
            </motion.div>
          )}

          {/* Glass tab bar — unified slider card. The active category name now
              lives in the title above the nav, so this card is purely the
              switcher: a scrollable icon strip on mobile (a "you are here"
              confirmation, auto-centred) and the full labelled tab row with
              the floating wok tether on desktop. */}
          <GlassCard className="rounded-xl overflow-hidden">
            {/* Icon scroll row — the only scrollable element */}
            <div ref={scrollRef} className="overflow-x-auto hide-scrollbar p-1">
              <div ref={trackRef} className="flex gap-0.5 min-w-max">
                {menuData.map((cat, idx) => (
                  <CategoryTab
                    key={cat.shortTitle}
                    label={cat.title}
                    shortTitle={cat.shortTitle}
                    isActive={activeIdx === idx}
                    onClick={() => setActiveIdx(idx)}
                    tabRef={(el) => { tabRefs.current[idx] = el; }}
                  />
                ))}
              </div>
            </div>
          </GlassCard>

          {/* iOS-style custom scrollbar — desktop only. On mobile the slider
              card is now a "you are here" strip (auto-scrolled), so a visible
              scrollbar just adds noise to a surface the user isn't expected
              to scroll manually. */}
          {showScrollbar && (
            <div className="hidden md:block mt-3 mx-auto md:w-[32%] h-[5px] rounded-full bg-char-900/70 relative shadow-[inset_0_1px_2px_rgba(0,0,0,0.6),inset_0_-1px_0_rgba(255,255,255,0.03)]">
              <div
                className="absolute top-[1px] bottom-[1px] rounded-full"
                style={{
                  width: `calc(${thumbPct}% - 2px)`,
                  left: `calc(${thumbLeftPct}% + 1px)`,
                  background: "linear-gradient(180deg, rgba(250,250,249,0.5) 0%, rgba(250,250,249,0.2) 55%, rgba(250,250,249,0.15) 100%)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(0,0,0,0.15), 0 1px 2px rgba(0,0,0,0.5)",
                  transition: "left 0.08s linear, width 0.25s ease",
                }}
              />
            </div>
          )}
        </motion.div>

        {/* Mobile menu — collapsible accordion (replaces the old Jump-To grid).
            Desktop keeps the interactive tab/wok switcher above. */}
        <MobileMenu />

        {/* Category content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            ref={menuContentRef}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease }}
            className="hidden md:block mt-6 md:mt-8 scroll-mt-20"
          >
            {/* Main Courses → reference panel; everything else → bento dish list */}
            {category.shortTitle === "Mains" ? (
              <GlassCard className="p-4 md:p-8">
                <MainsPanel proteins={category.items} />
              </GlassCard>
            ) : category.items.length > 8 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <GlassCard className="p-4 md:p-6">
                  <div className="divide-y divide-char-800/20">
                    {category.items.slice(0, Math.ceil(category.items.length / 2)).map((item, idx) => (
                      <DishRow
                        key={item.name}
                        item={item}
                        index={idx}
                        isHighlighted={highlightedItem === item.name}
                      />
                    ))}
                  </div>
                </GlassCard>
                <GlassCard className="p-4 md:p-6">
                  <div className="divide-y divide-char-800/20">
                    {category.items.slice(Math.ceil(category.items.length / 2)).map((item, idx) => (
                      <DishRow
                        key={item.name}
                        item={item}
                        index={idx + Math.ceil(category.items.length / 2)}
                        isHighlighted={highlightedItem === item.name}
                      />
                    ))}
                  </div>
                </GlassCard>
              </div>
            ) : (
              <GlassCard className="p-4 md:p-8">
                <div className="divide-y divide-char-800/20 max-w-[700px]">
                  {category.items.map((item, idx) => (
                    <DishRow
                      key={item.name}
                      item={item}
                      index={idx}
                      isHighlighted={highlightedItem === item.name}
                    />
                  ))}
                </div>
              </GlassCard>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Full legend — desktop only. Mobile has the compact row above the menu content. */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hidden md:flex mt-8 flex-wrap items-center gap-6 text-[11px] font-300"
        >
          <motion.div
            animate={{ opacity: categorySignals.hasSpicy ? 1 : 0.35 }}
            transition={{ duration: 0.3, ease }}
            className="flex items-center gap-2"
          >
            <div
              className={`w-1.5 h-1.5 rounded-full ${
                categorySignals.hasSpicy
                  ? "bg-vermillion shadow-[0_0_6px_rgba(180,35,24,0.6)]"
                  : "bg-vermillion/50"
              }`}
            />
            <span className={categorySignals.hasSpicy ? "text-char-200" : "text-char-400"}>
              Contains chilli
            </span>
          </motion.div>

          <motion.div
            animate={{ opacity: categorySignals.hasPopular ? 1 : 0.35 }}
            transition={{ duration: 0.3, ease }}
            className="flex items-center gap-2"
          >
            <span
              className={`text-[10px] font-500 tracking-wider uppercase rounded px-1.5 py-0.5 border ${
                categorySignals.hasPopular
                  ? "text-vermillion border-vermillion/40 bg-vermillion/[0.06]"
                  : "text-vermillion/40 border-vermillion/15"
              }`}
            >
              Popular
            </span>
            <span className={categorySignals.hasPopular ? "text-char-200" : "text-char-400"}>
              Customer favourite
            </span>
          </motion.div>

          <motion.div
            animate={{ opacity: categorySignals.hasVeg ? 1 : 0.35 }}
            transition={{ duration: 0.3, ease }}
            className="flex items-center gap-2"
          >
            <Leaf
              size={12}
              weight={categorySignals.hasVeg ? "fill" : "regular"}
              className={categorySignals.hasVeg ? "text-emerald-400" : "text-char-400/50"}
            />
            <span className={categorySignals.hasVeg ? "text-char-200" : "text-char-400"}>
              Vegetarian options available
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
