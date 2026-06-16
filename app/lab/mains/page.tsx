"use client";

/**
 * ⚑ LAB / PREVIEW PAGE — not linked from the live site. Route: /lab/mains
 *
 * Purpose: test a fix for Wing's feedback that the Mains section gives
 * "no choices of options ie chicken black bean etc." On the printed menu,
 * mains are a protein × cooking-style grid: you pick a protein (which sets the
 * price) and one of 23 styles. The live site currently lists only the proteins
 * and buries the styles in a paragraph, so customers never see combos like
 * "Chicken in Black Bean Sauce".
 *
 * This page proposes an interactive builder. If approved, the pattern folds
 * back into MenuHighlights.tsx / menu.ts. Nothing here touches the live menu.
 */

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Fire, Leaf, CaretRight, ArrowClockwise } from "@phosphor-icons/react";

const ease = [0.16, 1, 0.3, 1] as const;

// Proteins set the price (verbatim from the printed Main Courses list).
type Protein = { name: string; price: string; veg?: boolean; popular?: boolean; note?: string };
const PROTEINS: Protein[] = [
  { name: "Chicken", price: "6.90", popular: true },
  { name: "Beef", price: "6.90" },
  { name: "Char Sui", price: "6.90" },
  { name: "Meat Combo", price: "7.40", note: "Beef, chicken & char sui" },
  { name: "Roast Duck", price: "7.40" },
  { name: "Fillet Steak", price: "9.10" },
  { name: "King Prawns", price: "7.30" },
  { name: "Fish", price: "6.50" },
  { name: "Seafood Combo", price: "7.00", note: "King prawn, squid & fish" },
  { name: "Mixed Vegetable", price: "5.90", veg: true },
  { name: "Tofu", price: "6.80", veg: true },
  { name: "Mock Chicken", price: "6.80", veg: true },
];

// The 23 cooking styles. `join` controls how the combo name reads.
type Style = { name: string; spicy?: boolean; join?: "in" | "with" | "plain" };
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

function comboName(protein: Protein, style: Style): string {
  if (style.join === "plain") return `${protein.name} ${style.name.replace(/\s*\(scrambled egg\)/, "")}`;
  const word = style.join === "with" ? "with" : "in";
  return `${protein.name} ${word} ${style.name}`;
}

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

function StepLabel({ n, title, hint }: { n: number; title: string; hint?: string }) {
  return (
    <div className="flex items-baseline gap-3 mb-4">
      <span className="shrink-0 w-6 h-6 rounded-full bg-vermillion/10 border border-vermillion/30 text-vermillion text-[12px] font-600 flex items-center justify-center tabular-nums">
        {n}
      </span>
      <h3 className="text-base md:text-lg font-600 text-char-50 tracking-tight">{title}</h3>
      {hint && <span className="text-xs font-300 text-char-400">{hint}</span>}
    </div>
  );
}

export default function MainsLabPage() {
  const [proteinIdx, setProteinIdx] = useState<number | null>(0);
  const [styleIdx, setStyleIdx] = useState<number | null>(null);

  const protein = proteinIdx !== null ? PROTEINS[proteinIdx] : null;
  const style = styleIdx !== null ? STYLES[styleIdx] : null;

  const result = useMemo(() => {
    if (!protein || !style) return null;
    return {
      name: comboName(protein, style),
      price: protein.price,
      spicy: !!style.spicy,
      veg: !!protein.veg,
    };
  }, [protein, style]);

  const reset = () => {
    setProteinIdx(0);
    setStyleIdx(null);
  };

  return (
    <main className="min-h-[100dvh] bg-char-950 text-char-50">
      <div className="max-w-[1100px] mx-auto px-6 md:px-10 py-10 md:py-16">
        {/* Lab banner */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/[0.06] px-3 py-1.5 text-[11px] font-500 tracking-wide text-amber-300">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          Lab preview · /lab/mains · not live
        </div>

        <p className="text-vermillion text-xs font-500 tracking-[0.3em] uppercase mb-4">
          Main Courses
        </p>
        <h1 className="text-3xl md:text-5xl font-700 tracking-tighter leading-tight text-char-50 mb-4">
          Build your main
        </h1>
        <p className="text-base font-300 text-char-400 leading-relaxed max-w-[55ch] mb-10">
          Pick any protein, then choose how it&apos;s cooked — {STYLES.length} styles,
          any combination. The protein sets the price.
        </p>

        {/* Step 1 — protein */}
        <Glass className="p-5 md:p-7 mb-5">
          <StepLabel n={1} title="Choose your protein" hint="sets the price" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {PROTEINS.map((p, i) => {
              const active = proteinIdx === i;
              return (
                <motion.button
                  key={p.name}
                  onClick={() => setProteinIdx(i)}
                  whileTap={{ scale: 0.97 }}
                  className={`relative text-left rounded-xl px-3 py-3 border transition-colors duration-300 ${
                    active
                      ? "border-vermillion/50 bg-vermillion/[0.08]"
                      : "border-char-50/[0.07] bg-char-50/[0.02] hover:border-char-50/20"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[13px] font-500 ${active ? "text-vermillion" : "text-char-50"}`}>
                      {p.name}
                    </span>
                    {p.veg && <Leaf size={11} weight="fill" className="text-emerald-400 shrink-0" />}
                  </div>
                  {p.note && <p className="text-[10.5px] font-300 text-char-500 mt-0.5 leading-tight">{p.note}</p>}
                  <span className="block text-[12px] font-600 text-char-300 tabular-nums mt-1.5">£{p.price}</span>
                  {p.popular && (
                    <span className="absolute top-2 right-2 text-[9px] font-500 tracking-wider uppercase text-vermillion/70">
                      ★
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </Glass>

        {/* Step 2 — style */}
        <Glass className="p-5 md:p-7 mb-5">
          <StepLabel n={2} title="Choose your style" hint={`${STYLES.length} ways to cook it`} />
          <div className="flex flex-wrap gap-2">
            {STYLES.map((s, i) => {
              const active = styleIdx === i;
              return (
                <motion.button
                  key={s.name}
                  onClick={() => setStyleIdx(i)}
                  whileTap={{ scale: 0.97 }}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 border text-[12.5px] font-400 transition-colors duration-300 ${
                    active
                      ? "border-vermillion/50 bg-vermillion/[0.1] text-vermillion"
                      : "border-char-50/[0.07] bg-char-50/[0.02] text-char-200 hover:border-char-50/20"
                  }`}
                >
                  {s.name}
                  {s.spicy && <Fire size={12} weight="fill" className="text-vermillion/80 shrink-0" />}
                </motion.button>
              );
            })}
          </div>
        </Glass>

        {/* Live result — sticky at bottom on mobile, inline on desktop */}
        <div className="sticky bottom-4 md:static z-10">
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
                    <p className="text-[10px] font-500 tracking-[0.25em] uppercase text-char-500 mb-1">
                      Your dish
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-lg md:text-2xl font-600 text-char-50 tracking-tight">
                        {result.name}
                      </h2>
                      {result.spicy && <Fire size={16} weight="fill" className="text-vermillion" />}
                      {result.veg && <Leaf size={15} weight="fill" className="text-emerald-400" />}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl md:text-3xl font-700 text-vermillion tabular-nums">
                      £{result.price}
                    </span>
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
                <motion.p
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm font-300 text-char-400"
                >
                  Pick a protein and a style to see your dish.
                </motion.p>
              )}
            </AnimatePresence>
          </Glass>
        </div>

        <button
          onClick={reset}
          className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-400 text-char-500 hover:text-char-300 transition-colors"
        >
          <ArrowClockwise size={13} /> Start over
        </button>
      </div>
    </main>
  );
}
