"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Fire, Wine, CookingPot, Leaf, Star, BowlFood, ForkKnife, Pepper, Gift, Drop, Cookie } from "@phosphor-icons/react";
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
  label,
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
        relative flex items-center gap-2 px-4 py-2.5 rounded-lg whitespace-nowrap
        text-xs font-500 tracking-wide transition-colors duration-300
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
      <span className="relative z-10">{shortTitle}</span>
    </motion.button>
  );
}

/* ─── Dish Row ─── */
function DishRow({
  item,
  index,
}: {
  item: { name: string; price: string; desc?: string; spicy?: boolean; popular?: boolean };
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.6), ease }}
      className="group py-4 first:pt-0 last:pb-0"
    >
      <div className="flex items-center justify-between gap-3 mb-1">
        <div className="flex items-center gap-2 min-w-0">
          <h4 className="text-[14px] font-500 text-char-50 group-hover:text-vermillion transition-colors duration-300 truncate">
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

/* ─── Main Menu Component ─── */
export default function MenuHighlights() {
  const [activeIdx, setActiveIdx] = useState(0);
  const category = menuData[activeIdx];
  const tabBarRef = useRef<HTMLDivElement>(null);
  const wokTrackRef = useRef<HTMLDivElement>(null);
  const glowTrackRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [wokPos, setWokPos] = useState({ x: 0, visible: false });

  const updateWokPosition = useCallback(() => {
    const tab = tabRefs.current[activeIdx];
    if (tab) {
      setWokPos({
        x: tab.offsetLeft + tab.offsetWidth / 2,
        visible: true,
      });
    }
  }, [activeIdx]);

  useEffect(() => {
    updateWokPosition();
    window.addEventListener("resize", updateWokPosition);
    return () => window.removeEventListener("resize", updateWokPosition);
  }, [updateWokPosition]);

  // Sync horizontal scroll across wok track, tab bar, and glow track
  useEffect(() => {
    const tabBar = tabBarRef.current;
    if (!tabBar) return;

    const syncScroll = () => {
      const s = tabBar.scrollLeft;
      if (wokTrackRef.current) wokTrackRef.current.scrollLeft = s;
      if (glowTrackRef.current) glowTrackRef.current.scrollLeft = s;
    };

    tabBar.addEventListener("scroll", syncScroll, { passive: true });
    return () => tabBar.removeEventListener("scroll", syncScroll);
  }, []);

  return (
    <section id="menu" className="py-16 md:py-40 border-t border-char-800/50">
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
          className="text-base font-300 text-char-400 leading-relaxed max-w-[55ch] mb-10"
        >
          Every dish wok-fired fresh to order. Delivery and collection
          available through Just Eat.
        </motion.p>

        {/* Scrollable tab bar with floating wok */}
        {/* Wok — floats on site background, 16px above the tab bar, scroll-synced */}
        <div
          ref={wokTrackRef}
          className="overflow-x-auto pointer-events-none h-10 mb-2 hide-scrollbar"
        >
          <div className="relative min-w-max h-10">
            {wokPos.visible && (
              <motion.div
                className="absolute top-0"
                animate={{ x: wokPos.x - 18 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <svg width="36" height="40" viewBox="0 0 40 40" fill="none" className="drop-shadow-[0_0_10px_rgba(180,35,24,0.5)]" overflow="visible">
                    <ellipse cx="18" cy="19" rx="13" ry="7" fill="#1c1917" stroke="#44403c" strokeWidth="0.8" />
                    <ellipse cx="18" cy="18" rx="11" ry="5.5" fill="#292524" />
                    <motion.g animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }} style={{ transformOrigin: "18px 30px" }}>
                      <ellipse cx="13" cy="28" rx="2.5" ry="4" fill="#b42318" opacity="0.8" />
                      <ellipse cx="18" cy="27" rx="3" ry="5" fill="#d92d20" opacity="0.7" />
                      <ellipse cx="23" cy="28" rx="2.5" ry="4" fill="#b42318" opacity="0.8" />
                      <ellipse cx="18" cy="28.5" rx="1.8" ry="2.5" fill="#fbbf24" opacity="0.35" />
                    </motion.g>
                    <motion.path d="M13 13 Q13.5 9 12.5 5" stroke="#555" strokeWidth="0.6" strokeLinecap="round" fill="none" animate={{ opacity: [0, 0.4, 0] }} transition={{ duration: 2, repeat: Infinity }} />
                    <motion.path d="M18 12 Q17.5 8 18.5 4" stroke="#555" strokeWidth="0.6" strokeLinecap="round" fill="none" animate={{ opacity: [0, 0.3, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
                    <motion.path d="M23 13 Q22.5 9 23.5 5" stroke="#555" strokeWidth="0.6" strokeLinecap="round" fill="none" animate={{ opacity: [0, 0.4, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} />
                    <rect x="30" y="17" width="4" height="2" rx="1" fill="#44403c" />
                  </svg>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Tab bar — tight glass pill, scrollable, drives scroll sync */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
        >
          <GlassCard className="rounded-xl p-1">
            <div ref={tabBarRef} className="overflow-x-auto hide-scrollbar">
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
        </motion.div>

        {/* Thin vermillion glow — 4px below the tab bar */}
        <div
          ref={glowTrackRef}
          className="overflow-x-auto h-2 mt-1 mb-8 hide-scrollbar"
        >
          <div className="relative min-w-max h-2">
            {wokPos.visible && (
              <motion.div
                className="absolute top-0 h-px"
                animate={{ x: wokPos.x - 16, width: 32 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <div className="w-full h-full rounded-full bg-vermillion/50 blur-[2px]" />
              </motion.div>
            )}
          </div>
        </div>

        {/* Category content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease }}
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
                      <DishRow key={item.name} item={item} index={idx} />
                    ))}
                  </div>
                </GlassCard>
                <GlassCard className="p-4 md:p-6">
                  <div className="divide-y divide-char-800/20">
                    {category.items.slice(Math.ceil(category.items.length / 2)).map((item, idx) => (
                      <DishRow key={item.name} item={item} index={idx + Math.ceil(category.items.length / 2)} />
                    ))}
                  </div>
                </GlassCard>
              </div>
            ) : (
              <GlassCard className="p-4 md:p-8">
                <div className="divide-y divide-char-800/20 max-w-[700px]">
                  {category.items.map((item, idx) => (
                    <DishRow key={item.name} item={item} index={idx} />
                  ))}
                </div>
              </GlassCard>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center gap-6 text-[11px] font-300 text-char-400/50"
        >
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-vermillion/50" />
            <span>Contains chilli</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-500 tracking-wider uppercase text-vermillion/40 border border-vermillion/15 rounded px-1.5 py-0.5">
              Popular
            </span>
            <span>Customer favourite</span>
          </div>
          <div className="flex items-center gap-2">
            <Leaf size={12} weight="regular" className="text-char-400/50" />
            <span>Vegetarian options available</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
