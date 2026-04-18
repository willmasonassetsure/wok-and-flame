"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion";
import { Fire, Wine, CookingPot, Leaf, Star, BowlFood, ForkKnife, Pepper, Gift, Drop, Cookie, CaretRight } from "@phosphor-icons/react";
import { menuData } from "../data/menu";

const ease = [0.16, 1, 0.3, 1] as const;

const categoryIcons: Record<string, typeof Fire> = {
  "Drinks": Wine,
  "Soups": BowlFood,
  "Appetisers": ForkKnife,
  "Salt & Pepper": Pepper,
  "Mains": CookingPot,
  "Sweet & Sour": Star,
  "Curries": Fire,
  "Deep Fried": Fire,
  "Specials": Gift,
  "Fried Rice": BowlFood,
  "Noodles": CookingPot,
  "Sides": ForkKnife,
  "Sauces": Drop,
  "Set Meals": Gift,
  "Desserts": Cookie,
};

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
  const categorySignals = useMemo(() => {
    const hasSpicy = category.items.some((i) => i.spicy);
    const hasPopular = category.items.some((i) => i.popular);
    const vegRegex = /vegetar|veg\b|tofu|mushroom|vegetable/i;
    const hasVeg =
      (category.description && vegRegex.test(category.description)) ||
      category.items.some(
        (i) => vegRegex.test(i.name) || (i.desc && vegRegex.test(i.desc))
      );
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

  // Custom iOS-style scrollbar metrics
  const [scrollMetrics, setScrollMetrics] = useState({ ratio: 0, visibleRatio: 1 });

  // Compute the active tab's center X relative to wrapper
  const computeTargetX = useCallback(() => {
    const tab = tabRefs.current[activeIdx];
    const wrapper = wrapperRef.current;
    if (!tab || !wrapper) return null;
    const tabRect = tab.getBoundingClientRect();
    const wrapperRect = wrapper.getBoundingClientRect();
    // Center of tab relative to wrapper, minus half the wok SVG width (18)
    return tabRect.left - wrapperRect.left + tabRect.width / 2 - 18;
  }, [activeIdx]);

  // Update scrollbar metrics
  const updateScrollMetrics = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const visibleRatio = el.scrollWidth > 0 ? Math.min(1, el.clientWidth / el.scrollWidth) : 1;
    const scrollable = el.scrollWidth - el.clientWidth;
    const ratio = scrollable > 0 ? el.scrollLeft / scrollable : 0;
    setScrollMetrics({ ratio, visibleRatio });
  }, []);

  // Click transition: animate wok with spring to new tab
  useEffect(() => {
    const target = computeTargetX();
    if (target === null) return;
    if (!wokReady) {
      wokX.set(target);
      setWokReady(true);
      return;
    }
    const controls = animate(wokX, target, {
      type: "spring",
      stiffness: 380,
      damping: 32,
    });
    return () => controls.stop();
  }, [activeIdx, computeTargetX, wokX, wokReady]);

  // Scroll tracking: instant update, no spring lag. Wok is visually tethered to the tab.
  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    const onScroll = () => {
      const x = computeTargetX();
      if (x !== null) wokX.set(x);
      updateScrollMetrics();
    };

    const onResize = () => {
      const x = computeTargetX();
      if (x !== null) wokX.set(x);
      updateScrollMetrics();
    };

    // Observe content size changes (e.g., font load, viewport change)
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(scrollEl);

    scrollEl.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // Initial sync
    updateScrollMetrics();

    return () => {
      scrollEl.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      resizeObserver.disconnect();
    };
  }, [computeTargetX, wokX, updateScrollMetrics]);

  // Scrollbar thumb sizing
  const thumbPct = Math.max(scrollMetrics.visibleRatio * 100, 18);
  const thumbLeftPct = scrollMetrics.ratio * (100 - thumbPct);
  const showScrollbar = scrollMetrics.visibleRatio < 0.999;

  return (
    <section id="menu" className="py-10 md:py-40 border-t border-char-800/50">
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

        {/* Quick Browse — mobile-only text grid of every category. Gives pre-click
            visibility the icon bar alone can't provide. The vermillion "active"
            fill uses a shared layoutId so it slides between tiles, matching the
            icon bar's own active-pill animation language. Taps delegate to
            setActiveIdx — same handler as the icon tabs — so both stays synced. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="md:hidden mb-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-1 rounded-full bg-vermillion" />
            <p className="text-[10px] font-500 tracking-[0.3em] uppercase text-char-400">
              Browse categories
            </p>
            <div className="flex-1 h-px bg-gradient-to-r from-char-800/60 to-transparent" />
            <span className="text-[10px] font-400 text-char-600 tabular-nums">
              {menuData.length}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {menuData.map((cat, idx) => {
              const isActive = activeIdx === idx;
              return (
                <motion.button
                  key={cat.shortTitle}
                  onClick={() => setActiveIdx(idx)}
                  whileTap={{ scale: 0.96 }}
                  className={`
                    relative py-2.5 px-2 rounded-lg text-[11px] font-500
                    whitespace-nowrap overflow-hidden
                    transition-colors duration-300
                    ${isActive
                      ? "text-char-50"
                      : "text-char-300 bg-char-50/[0.03] border border-char-50/[0.06] backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                    }
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeBrowseTile"
                      className="absolute inset-0 rounded-lg bg-vermillion shadow-[0_4px_14px_-4px_rgba(180,35,24,0.55),inset_0_1px_0_rgba(255,255,255,0.18)]"
                      transition={{ type: "spring", stiffness: 320, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 tracking-wide">
                    {cat.shortTitle}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Popular Picks — cross-category quick-access chips. Solves the mobile
            pre-click visibility problem: customers can tap their usual order
            without hunting through icons. Desktop also benefits. */}
        {popularPicks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="mb-7 md:mb-10"
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

        {/* Mobile-only floating category label — replaces the wok tether on small screens
            since icons alone aren't descriptive enough. Cross-fades as user taps. */}
        <div className="md:hidden relative h-6 mb-2 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease }}
              className="absolute inset-x-0 flex items-center justify-center gap-2"
            >
              <div className="w-1 h-1 rounded-full bg-vermillion" />
              <span className="text-[11px] font-500 tracking-[0.2em] uppercase text-char-50">
                {category.shortTitle}
              </span>
              <div className="w-1 h-1 rounded-full bg-vermillion" />
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
          className="relative mb-4 md:pt-9"
        >
          {/* Floating wok — desktop only. Tethered to active tab via motion value
              that updates INSTANTLY on scroll (no spring lag) and springs on click. */}
          {wokReady && (
            <motion.div
              className="hidden md:block absolute pointer-events-none z-20 left-0"
              style={{ top: 0, x: wokX }}
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

          {/* Glass tab bar — the only scrollable element */}
          <GlassCard className="rounded-xl p-1">
            <div ref={scrollRef} className="overflow-x-auto hide-scrollbar">
              <div className="flex gap-0.5 min-w-max">
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

          {/* iOS-style custom scrollbar — silicon pill with soft shadows */}
          {showScrollbar && (
            <div className="mt-3 mx-auto w-[70%] sm:w-[50%] md:w-[32%] h-[5px] rounded-full bg-char-900/70 relative shadow-[inset_0_1px_2px_rgba(0,0,0,0.6),inset_0_-1px_0_rgba(255,255,255,0.03)]">
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

        {/* Mobile-only compact indicator row — sits directly below the tab bar
            so the conditional brightness reacts visibly as users tap through
            categories. Desktop keeps the fuller legend at the bottom. */}
        <div className="md:hidden mt-3 flex items-center justify-center gap-5 text-[10px] font-400">
          <motion.div
            animate={{ opacity: categorySignals.hasSpicy ? 1 : 0.32 }}
            transition={{ duration: 0.3, ease }}
            className="flex items-center gap-1.5"
          >
            <div
              className={`w-1 h-1 rounded-full ${
                categorySignals.hasSpicy
                  ? "bg-vermillion shadow-[0_0_5px_rgba(180,35,24,0.9)]"
                  : "bg-vermillion/50"
              }`}
            />
            <span
              className={`tracking-[0.15em] uppercase ${
                categorySignals.hasSpicy ? "text-char-200" : "text-char-500"
              }`}
            >
              Chilli
            </span>
          </motion.div>

          <motion.div
            animate={{ opacity: categorySignals.hasPopular ? 1 : 0.32 }}
            transition={{ duration: 0.3, ease }}
            className="flex items-center gap-1.5"
          >
            <Star
              size={10}
              weight={categorySignals.hasPopular ? "fill" : "regular"}
              className={categorySignals.hasPopular ? "text-vermillion" : "text-char-500"}
            />
            <span
              className={`tracking-[0.15em] uppercase ${
                categorySignals.hasPopular ? "text-char-200" : "text-char-500"
              }`}
            >
              Popular
            </span>
          </motion.div>

          <motion.div
            animate={{ opacity: categorySignals.hasVeg ? 1 : 0.32 }}
            transition={{ duration: 0.3, ease }}
            className="flex items-center gap-1.5"
          >
            <Leaf
              size={10}
              weight={categorySignals.hasVeg ? "fill" : "regular"}
              className={categorySignals.hasVeg ? "text-emerald-400" : "text-char-500"}
            />
            <span
              className={`tracking-[0.15em] uppercase ${
                categorySignals.hasVeg ? "text-char-200" : "text-char-500"
              }`}
            >
              Veg
            </span>
          </motion.div>
        </div>

        {/* Category content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            ref={menuContentRef}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease }}
            className="mt-6 md:mt-8 scroll-mt-20"
          >
            {/* Category title + description */}
            <div className="flex flex-wrap items-baseline gap-2 md:gap-4 mb-6">
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
            </div>

            {/* Bento grid of items — split into columns for large lists */}
            {category.items.length > 8 ? (
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
