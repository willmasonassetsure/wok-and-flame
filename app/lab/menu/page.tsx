"use client";

/**
 * ⚑ LAB / PREVIEW PAGE — not linked from the live site. Route: /lab/menu
 *
 * Tests the "whole menu, no scroll tabs" layout Wing asked for: instead of the
 * live MenuHighlights tab switcher (one category at a time, horizontally
 * scrollable tab bar + floating wok), every category and every item is laid
 * out down the page — you just scroll. Main Courses uses the protein × style
 * builder (see also /lab/mains) so the cooking-style combos are pickable.
 *
 * Drinks and Sauces are kept — owner-confirmed orderable. If approved, this
 * pattern replaces MenuHighlights.tsx.
 */

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Fire, Leaf, CaretRight } from "@phosphor-icons/react";
import { menuData, type MenuItem } from "../../data/menu";

const ease = [0.16, 1, 0.3, 1] as const;

/* ─── Shared glass card (mirrors MenuHighlights) ─── */
function Glass({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden bg-char-50/[0.03] backdrop-blur-2xl border border-char-50/[0.06] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)] ${className}`}
    >
      {children}
    </div>
  );
}

/* ─── Static dish row (no tabs, just the item) ─── */
function DishLine({ item }: { item: MenuItem }) {
  return (
    <div className="group py-3.5 first:pt-0 last:pb-0">
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
      {item.desc && (
        <p className="text-[12px] font-300 text-char-400/70 leading-relaxed pr-12">{item.desc}</p>
      )}
    </div>
  );
}

/* ─── Main Courses builder ─── */
// The 23 cooking styles. `join` controls how the combo name reads.
type Style = { name: string; spicy?: boolean; join: "in" | "with" | "plain" };
const STYLES: Style[] = [
  { name: "Foo Yung (scrambled egg)", join: "plain" },
  { name: "Spicy Peanut Satay Sauce", spicy: true, join: "in" },
  { name: "Sweet Cantonese Sauce", join: "in" },
  { name: "Black Bean Sauce", spicy: true, join: "in" },
  { name: "Black Pepper Sauce", join: "in" },
  { name: "Thai Sweet Chilli Sauce", spicy: true, join: "in" },
  { name: "Szechuan Sauce", spicy: true, join: "in" },
  { name: "Kung Po Sauce", spicy: true, join: "in" },
  { name: "English White Mushroom", join: "with" },
  { name: "Cashew Nuts", join: "with" },
  { name: "Fresh Diced Tomato", join: "with" },
  { name: "Pineapple", join: "with" },
  { name: "Pineapple & Sweet Ginger", join: "with" },
  { name: "Spring Onion & Fresh Ginger", join: "with" },
  { name: "Beansprouts", join: "with" },
  { name: "Garlic Oyster Sauce", join: "in" },
  { name: "Babycorn", join: "with" },
  { name: "Bamboo Shoots & Water Chestnut", join: "with" },
  { name: "Broccoli", join: "with" },
  { name: "Garlic Sauce", spicy: true, join: "in" },
  { name: "Lemon Honey Sauce", join: "in" },
  { name: "Orange Sauce", join: "in" },
  { name: "Plum Sauce", join: "in" },
];

function comboName(protein: MenuItem, style: Style): string {
  if (style.join === "plain") return `${protein.name} ${style.name.replace(/\s*\(scrambled egg\)/, "")}`;
  const word = style.join === "with" ? "with" : "in";
  return `${protein.name} ${word} ${style.name}`;
}

function MainsBuilder({ proteins }: { proteins: MenuItem[] }) {
  const [proteinIdx, setProteinIdx] = useState(0);
  const [styleIdx, setStyleIdx] = useState<number | null>(null);

  const protein = proteins[proteinIdx];
  const style = styleIdx !== null ? STYLES[styleIdx] : null;

  const result = useMemo(() => {
    if (!protein || !style) return null;
    return { name: comboName(protein, style), price: protein.price, spicy: !!style.spicy, veg: !!protein.vegetarian };
  }, [protein, style]);

  return (
    <div className="space-y-4">
      {/* Step 1 — protein */}
      <Glass className="p-5 md:p-6">
        <div className="flex items-baseline gap-3 mb-4">
          <span className="shrink-0 w-6 h-6 rounded-full bg-vermillion/10 border border-vermillion/30 text-vermillion text-[12px] font-600 flex items-center justify-center tabular-nums">1</span>
          <h4 className="text-[15px] font-600 text-char-50">Choose your protein</h4>
          <span className="text-xs font-300 text-char-400">sets the price</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
          {proteins.map((p, i) => {
            const active = proteinIdx === i;
            return (
              <motion.button
                key={p.name}
                onClick={() => setProteinIdx(i)}
                whileTap={{ scale: 0.97 }}
                className={`relative text-left rounded-xl px-3 py-3 border transition-colors duration-300 ${
                  active ? "border-vermillion/50 bg-vermillion/[0.08]" : "border-char-50/[0.07] bg-char-50/[0.02] hover:border-char-50/20"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className={`text-[13px] font-500 ${active ? "text-vermillion" : "text-char-50"}`}>{p.name}</span>
                  {p.vegetarian && <Leaf size={11} weight="fill" className="text-emerald-400 shrink-0" />}
                </div>
                {p.desc && <p className="text-[10.5px] font-300 text-char-500 mt-0.5 leading-tight">{p.desc}</p>}
                <span className="block text-[12px] font-600 text-char-300 tabular-nums mt-1.5">£{p.price}</span>
                {p.popular && <span className="absolute top-2 right-2 text-[11px] text-vermillion/70">★</span>}
              </motion.button>
            );
          })}
        </div>
      </Glass>

      {/* Step 2 — style */}
      <Glass className="p-5 md:p-6">
        <div className="flex items-baseline gap-3 mb-4">
          <span className="shrink-0 w-6 h-6 rounded-full bg-vermillion/10 border border-vermillion/30 text-vermillion text-[12px] font-600 flex items-center justify-center tabular-nums">2</span>
          <h4 className="text-[15px] font-600 text-char-50">Choose your style</h4>
          <span className="text-xs font-300 text-char-400">{STYLES.length} ways to cook it</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {STYLES.map((s, i) => {
            const active = styleIdx === i;
            return (
              <motion.button
                key={s.name}
                onClick={() => setStyleIdx(i)}
                whileTap={{ scale: 0.97 }}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 border text-[12.5px] font-400 transition-colors duration-300 ${
                  active ? "border-vermillion/50 bg-vermillion/[0.1] text-vermillion" : "border-char-50/[0.07] bg-char-50/[0.02] text-char-200 hover:border-char-50/20"
                }`}
              >
                {s.name}
                {s.spicy && <Fire size={12} weight="fill" className="text-vermillion/80 shrink-0" />}
              </motion.button>
            );
          })}
        </div>
      </Glass>

      {/* Live result */}
      <div className="sticky bottom-4 z-10">
        <Glass className="p-5 md:p-6 border-vermillion/20">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                key={result.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease }}
                className="flex items-center justify-between gap-4 flex-wrap"
              >
                <div className="min-w-0">
                  <p className="text-[10px] font-500 tracking-[0.25em] uppercase text-char-500 mb-1">Your dish</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-lg md:text-2xl font-600 text-char-50 tracking-tight">{result.name}</span>
                    {result.spicy && <Fire size={16} weight="fill" className="text-vermillion" />}
                    {result.veg && <Leaf size={15} weight="fill" className="text-emerald-400" />}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-2xl md:text-3xl font-700 text-vermillion tabular-nums">£{result.price}</span>
                  <a
                    href="https://www.just-eat.co.uk/restaurants-wokandgo-m20/menu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-vermillion px-4 py-2.5 text-[13px] font-600 text-char-50 hover:bg-vermillion/90 transition-colors duration-300"
                  >
                    Order <CaretRight size={13} weight="bold" />
                  </a>
                </div>
              </motion.div>
            ) : (
              <motion.p key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-300 text-char-400">
                Pick a protein and a style to build your dish.
              </motion.p>
            )}
          </AnimatePresence>
        </Glass>
      </div>
    </div>
  );
}

/* ─── Full menu page ─── */
export default function MenuLabPage() {
  return (
    <main className="min-h-[100dvh] bg-char-950 text-char-50">
      <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-10 md:py-16">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/[0.06] px-3 py-1.5 text-[11px] font-500 tracking-wide text-amber-300">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          Lab preview · /lab/menu · not live
        </div>

        <p className="text-vermillion text-xs font-500 tracking-[0.3em] uppercase mb-4">Full Menu</p>
        <h1 className="text-3xl md:text-5xl font-700 tracking-tighter leading-tight text-char-50 mb-4">What we cook</h1>
        <p className="text-base font-300 text-char-400 leading-relaxed max-w-[55ch] mb-12">
          Every dish wok-fired fresh to order. Delivery and collection through Just Eat.
        </p>

        <div className="space-y-14">
          {menuData.map((cat) => {
            const isMains = cat.shortTitle === "Mains";
            return (
              <motion.section
                key={cat.title}
                id={cat.shortTitle.toLowerCase().replace(/\s+/g, "-")}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease }}
                className="scroll-mt-8"
              >
                <div className="flex items-baseline gap-3 flex-wrap mb-5">
                  <h2 className="text-xl md:text-2xl font-700 tracking-tight text-char-50">{cat.title}</h2>
                  {cat.description && <p className="text-xs font-300 text-char-400">{cat.description}</p>}
                  <span className="text-xs font-400 text-char-700 tabular-nums ml-auto">{cat.items.length} items</span>
                </div>

                {isMains ? (
                  <MainsBuilder proteins={cat.items} />
                ) : cat.items.length > 8 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Glass className="p-5 md:p-6">
                      <div className="divide-y divide-char-800/20">
                        {cat.items.slice(0, Math.ceil(cat.items.length / 2)).map((item) => (
                          <DishLine key={item.name} item={item} />
                        ))}
                      </div>
                    </Glass>
                    <Glass className="p-5 md:p-6">
                      <div className="divide-y divide-char-800/20">
                        {cat.items.slice(Math.ceil(cat.items.length / 2)).map((item) => (
                          <DishLine key={item.name} item={item} />
                        ))}
                      </div>
                    </Glass>
                  </div>
                ) : (
                  <Glass className="p-5 md:p-8">
                    <div className="divide-y divide-char-800/20 max-w-[700px]">
                      {cat.items.map((item) => (
                        <DishLine key={item.name} item={item} />
                      ))}
                    </div>
                  </Glass>
                )}
              </motion.section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
