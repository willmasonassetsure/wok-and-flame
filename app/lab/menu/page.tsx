"use client";

/**
 * ⚑ LAB / PREVIEW PAGE — not linked from the live site. Route: /lab/menu
 *
 * Recommended menu rework (see MENU_REWORK_PLAN.md):
 *  - ACCORDION categories: the whole menu is present but collapsed by default,
 *    so it uses little real estate; tap a section to expand it inline. An
 *    "Expand all" toggle lets scanners see everything at once. Replaces the
 *    live MenuHighlights horizontal scroll-tabs + floating wok.
 *  - MAIN COURSES = a STATIC reference panel (pick a protein, choose a style)
 *    showing all 12 proteins + all 23 styles, with NO cart / Order button —
 *    the site is display-only (ordering goes out to Just Eat).
 *
 * If approved, this folds into app/components/MenuHighlights.tsx (keeping the
 * export + <section id="menu"> so all #menu anchors keep working).
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Fire, Wine, CookingPot, Leaf, Star, BowlFood, ForkKnife, Pepper, Gift, Drop, Cookie, CaretDown,
} from "@phosphor-icons/react";
import { menuData, type MenuItem } from "../../data/menu";

const ease = [0.16, 1, 0.3, 1] as const;

const categoryIcons: Record<string, typeof Fire> = {
  Drinks: Wine, Soups: BowlFood, Appetisers: ForkKnife, "Salt & Pepper": Pepper,
  Mains: CookingPot, "Sweet & Sour": Star, Curries: Fire, "Deep Fried": Fire,
  Specials: Gift, "Fried Rice": BowlFood, Noodles: CookingPot, Sides: ForkKnife,
  Sauces: Drop, "Set Meals": Gift, Desserts: Cookie,
};

// The 23 cooking styles for Main Courses (Phase 2 moves this into menu.ts).
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

/* ─── Glass card (mirrors MenuHighlights) ─── */
function Glass({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden bg-char-50/[0.03] backdrop-blur-2xl border border-char-50/[0.06] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)] ${className}`}
    >
      {children}
    </div>
  );
}

/* ─── Static dish row ─── */
function DishLine({ item }: { item: MenuItem }) {
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

/* ─── Main Courses: static reference panel (no cart) ─── */
function MainsPanel({ proteins }: { proteins: MenuItem[] }) {
  return (
    <div className="space-y-6">
      <p className="text-[13px] font-300 text-char-300 leading-relaxed">
        Pick any protein, then choose how it&apos;s cooked. The protein sets the price —
        any of the {mainsStyles.length} styles, no extra charge.
      </p>

      {/* Proteins */}
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

      {/* Styles */}
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

      {/* Illustrative examples — communicates the combo idea without a builder */}
      <p className="text-[12px] font-300 text-char-400/80 leading-relaxed border-l-2 border-vermillion/40 pl-3">
        e.g. <span className="text-char-200">Chicken in Black Bean Sauce</span> ·{" "}
        <span className="text-char-200">Beef with Cashew Nuts</span> ·{" "}
        <span className="text-char-200">Tofu in Szechuan Sauce</span>
      </p>
    </div>
  );
}

/* ─── Accordion category ─── */
function CategoryAccordion({
  cat, isOpen, onToggle,
}: {
  cat: (typeof menuData)[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const Icon = categoryIcons[cat.shortTitle] || ForkKnife;
  const isMains = cat.shortTitle === "Mains";

  return (
    <Glass className={isOpen ? "border-char-50/[0.12]" : ""}>
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center gap-3 px-4 md:px-6 py-4 text-left"
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
        <motion.span
          className="shrink-0 text-char-500"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease }}
        >
          <CaretDown size={16} weight="bold" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease }}
            className="overflow-hidden"
          >
            <div className="px-4 md:px-6 pb-5 pt-1 border-t border-char-800/30">
              {isMains ? (
                <div className="pt-4">
                  <MainsPanel proteins={cat.items} />
                </div>
              ) : cat.items.length > 10 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 pt-1">
                  <div className="divide-y divide-char-800/20">
                    {cat.items.slice(0, Math.ceil(cat.items.length / 2)).map((item) => (
                      <DishLine key={item.name} item={item} />
                    ))}
                  </div>
                  <div className="divide-y divide-char-800/20">
                    {cat.items.slice(Math.ceil(cat.items.length / 2)).map((item) => (
                      <DishLine key={item.name} item={item} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="divide-y divide-char-800/20 pt-1">
                  {cat.items.map((item) => (
                    <DishLine key={item.name} item={item} />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Glass>
  );
}

/* ─── Page ─── */
export default function MenuLabPage() {
  const [open, setOpen] = useState<Set<string>>(new Set());

  const allOpen = open.size === menuData.length;
  const toggle = (key: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  const expandAll = () => setOpen(new Set(menuData.map((c) => c.shortTitle)));
  const collapseAll = () => setOpen(new Set());

  return (
    <main className="min-h-[100dvh] bg-char-950 text-char-50">
      {/* pb-28 leaves room for the fixed mobile order bar on the real site */}
      <div className="max-w-[820px] mx-auto px-6 md:px-10 py-10 md:py-16 pb-28">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/[0.06] px-3 py-1.5 text-[11px] font-500 tracking-wide text-amber-300">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          Lab preview · /lab/menu · not live
        </div>

        <p className="text-vermillion text-xs font-500 tracking-[0.3em] uppercase mb-4">Full Menu</p>
        <h1 className="text-3xl md:text-5xl font-700 tracking-tighter leading-tight text-char-50 mb-4">What we cook</h1>
        <p className="text-base font-300 text-char-400 leading-relaxed max-w-[55ch] mb-6">
          Every dish wok-fired fresh to order. Tap a section to view it — delivery and
          collection through Just Eat.
        </p>

        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={allOpen ? collapseAll : expandAll}
            className="text-[12px] font-500 text-char-300 hover:text-vermillion transition-colors"
          >
            {allOpen ? "Collapse all" : "Expand all"}
          </button>
          <span className="text-[11px] font-300 text-char-600 tabular-nums">{menuData.length} sections</span>
        </div>

        <div className="space-y-3">
          {menuData.map((cat) => (
            <CategoryAccordion
              key={cat.shortTitle}
              cat={cat}
              isOpen={open.has(cat.shortTitle)}
              onToggle={() => toggle(cat.shortTitle)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
