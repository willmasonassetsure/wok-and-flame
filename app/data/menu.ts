export type MenuItem = {
  name: string;
  price: string;
  desc?: string;
  spicy?: boolean;
  popular?: boolean;
  vegetarian?: boolean;
};

export type MenuCategory = {
  title: string;
  shortTitle: string;
  description?: string;
  items: MenuItem[];
};

// Source of truth: the printed Wok & Flame menu
// (206 Burton Road, West Didsbury, M20 2LW — 0161 434 6318 — wokandflame.co.uk).
// Extracted from 3 menu photographs in June 2026 with a 3-pass visual extraction
// + independent structural audit. See `wokflame_menu_verified.xlsx` in repo root
// for the full audited dataset and the open-item list.
//
// Owner-confirmed (Wing, 2026-06-16):
//   - Hoi Sin Sauce + BBQ Sauce added as pots (£2.20) — orderable though not on the print.
//   - Drinks (cans) kept — orderable; not on the printed menu, prices from Just Eat.
//   - Assorted Vegetable Fried Rice: dropped 2026-06-16, then RE-ADDED 2026-06-25
//     at £6.20 (Wing, WhatsApp) — both it and the Singapore veg rice are now kept.
//
// Owner-confirmed (Wing, 2026-07-04 client message):
//   - Appetisers section retitled "Appetisers & (Salt&Pepper)" (client's exact wording).
//   - Added: Salt & Pepper Chicken & Chips Box £6.60 (Appetisers).
//   - Appetisers now carries every salt & pepper dish: Salt & Pepper Chips
//     £4.00 listed there as well as in Side Extras (intentional duplicate).
//   - Added half-and-half combos (Side Extras): 1/2 fried rice & chips £4.00,
//     1/2 fried rice, chips & curry £5.80, 1/2 boiled rice & chips £3.80,
//     1/2 boiled rice, chips & curry £5.20.
//
// Open items still requiring client confirmation:
//   - Beef Thai Green Curry £6.50 (printed as 6.50, sibling items all 6.90 — Wing may want 6.90)
//   - Hoi Sin / BBQ Sauce price £2.20 (set to match the other pots) — confirm
//   - Salt & Pepper Chicken (main portion) — only S&P Chicken Pieces (appetiser) on menu
//
// Category ordering follows the existing website navigation (value/signature first,
// then starters, proteins, then carbs, extras, desserts). `shortTitle` values are
// preserved to keep the existing categoryIcons map in MenuHighlights.tsx working.
//
// Flags:
//   spicy       — contains chilli / chilli oil / hot spice per the menu
//   popular     — owner-identified bestseller (preserved from prior data where item names match)
//   vegetarian  — vegetarian/vegan items only (mock chicken is soy-based)
export const menuData: MenuCategory[] = [
  {
    title: "Set Meals & Banquets",
    shortTitle: "Set Meals",
    description: "Sharing menus — meat or vegetarian",
    items: [
      {
        name: "Set Meal for 2",
        price: "28.00",
        desc: "Chicken sweetcorn soup, chicken spring rolls, beef in black bean sauce, sweet & sour chicken, egg fried rice, prawn crackers",
        popular: true,
      },
      {
        name: "Set Meal — Additional Person",
        price: "13.00",
        desc: "Choose a main course (add to Set Meal for 2)",
      },
      {
        name: "Vegetarian Meal",
        price: "17.00",
        desc: "Vegetable spring rolls, seaweed, mixed vegetables in black bean sauce, tofu in sweet & sour sauce, egg fried rice, prawn crackers",
        vegetarian: true,
      },
      {
        name: "Vegetarian Meal — Additional Person",
        price: "8.50",
        desc: "Choose a main course (add to Vegetarian Meal)",
        vegetarian: true,
      },
      {
        name: "Imperial Banquet for 2",
        price: "34.00",
        desc: "Starters: sweetcorn soup, prawn crackers, spring rolls, BBQ ribs, sesame prawn toast. Mains: sweet & sour chicken, king prawn in black bean sauce, yeung chow fried rice",
      },
      {
        name: "Imperial Banquet for 3",
        price: "48.00",
        desc: "Imperial Banquet for 2 plus beef satay and aromatic crispy duck",
      },
      {
        name: "Imperial Banquet for 4",
        price: "63.00",
        desc: "Imperial Banquet for 3 plus Cantonese steak and aromatic crispy duck",
        popular: true,
      },
    ],
  },
  {
    title: "Wok & Flame Specials",
    shortTitle: "Specials",
    description: "Signature dishes — something different but proper good",
    items: [
      {
        name: "Four Season",
        price: "7.20",
        desc: "Mixed meat with Chinese vegetables in a hot and spicy garlic sauce",
        spicy: true,
        popular: true,
      },
      {
        name: "Shanghai Surprise",
        price: "7.20",
        desc: "Stir-fried Chinese veg with char sui, topped with deep-fried chicken in chilli sauce",
        spicy: true,
      },
      {
        name: "Fighting Dragon",
        price: "7.20",
        desc: "Char sui and king prawn with Chinese veg in garlic oyster sauce, topped with deep-fried chicken in chilli sauce",
        spicy: true,
      },
    ],
  },
  {
    // Retitled per Wing (2026-07-04) to flag the salt & pepper range — this
    // exact wording/spacing is the client's. Keep shortTitle as "Appetisers"
    // — it keys the categoryIcons map and the accordion/tab state in
    // MenuHighlights.tsx.
    title: "Appetisers & (Salt&Pepper)",
    shortTitle: "Appetisers",
    description: "Meat, seafood, vegetarian",
    items: [
      { name: "Crispy Aromatic Duck (Quarter)", price: "9.50", desc: "Pancakes, hoisin sauce and garnish", popular: true },
      { name: "Crispy Aromatic Duck (Half)", price: "19.00", desc: "Pancakes, hoisin sauce and garnish" },
      { name: "Wok & Flame Mix for 2", price: "9.90", desc: "BBQ ribs, chicken rolls, prawn toast, seaweed and samosas", popular: true },
      { name: "Salt & Pepper Ribs", price: "7.20", spicy: true, popular: true },
      { name: "Ribs in Cantonese Sauce", price: "7.20", desc: "Sweet, sticky, appetising sauce" },
      { name: "Ribs in BBQ Sauce", price: "7.20" },
      { name: "Ribs in Honey", price: "7.20" },
      { name: "Chicken Spring Rolls (4)", price: "4.20" },
      { name: "Salt & Pepper Chicken Pieces", price: "6.00", spicy: true },
      { name: "Salt & Pepper Chicken & Chips Box", price: "6.60", spicy: true },
      { name: "Salt & Pepper Chicken Wings", price: "5.90", spicy: true },
      { name: "Cantonese Chicken Wings", price: "5.90", desc: "Sweet, sticky, appetising sauce" },
      { name: "Satay Chicken Skewers (4)", price: "6.00", desc: "With sweet peanut sauce" },
      { name: "Steamed Prawn & Meat Dumplings", price: "4.30" },
      { name: "Curried Chicken Samosas (4)", price: "4.30", spicy: true },
      { name: "Sesame Prawns on Toast", price: "4.30", popular: true },
      { name: "Steamed Prawn Dumplings (Har Kau)", price: "4.30" },
      { name: "King Prawn Batter Balls (6) with Dip", price: "4.30" },
      { name: "Salt & Pepper King Prawns", price: "6.60", spicy: true },
      { name: "Salt & Pepper Squid", price: "6.80", spicy: true },
      { name: "Crispy Fried Cabbage (Seaweed)", price: "3.60", vegetarian: true },
      { name: "Curried Vegetable Samosas", price: "4.00", spicy: true, vegetarian: true },
      { name: "Vegetable Spring Rolls", price: "4.00", vegetarian: true },
      { name: "Salt & Pepper Tofu", price: "5.50", spicy: true, vegetarian: true },
      { name: "Salt & Pepper Mock Chicken", price: "6.00", spicy: true, vegetarian: true },
      // Also listed under Side Extras — deliberately duplicated so the
      // "(Salt&Pepper)" section carries every S&P dish (Wing, 2026-07-04).
      // `popular` stays on the Side Extras entry only, otherwise the dish
      // appears twice in the cross-category popular-picks strip.
      { name: "Salt & Pepper Chips", price: "4.00", spicy: true, vegetarian: true },
      { name: "Prawn Crackers", price: "1.50" },
    ],
  },
  {
    title: "Soups",
    shortTitle: "Soups",
    description: "Meat, seafood, vegetarian",
    items: [
      { name: "Won Ton Soup", price: "3.60", desc: "Prawn and meat parcels" },
      { name: "Chicken Sweetcorn Soup", price: "3.60" },
      { name: "Prawn Sweetcorn Soup", price: "3.60" },
      { name: "Chicken Noodle Soup", price: "3.60" },
      { name: "Hot & Sour Soup", price: "3.60", spicy: true, popular: true },
      { name: "Tom Yam Chicken Soup", price: "3.60", desc: "Thai sour and spicy broth", spicy: true },
      { name: "Tom Yam Seafood Soup", price: "3.60", desc: "Thai sour and spicy broth", spicy: true },
      { name: "Sweetcorn Soup", price: "3.60", vegetarian: true },
      { name: "Vegetable Hot & Sour Soup", price: "3.60", spicy: true, vegetarian: true },
      { name: "Tom Yam Vegetable Soup", price: "3.60", desc: "Thai sour and spicy broth", spicy: true, vegetarian: true },
    ],
  },
  {
    title: "Main Courses",
    shortTitle: "Mains",
    description:
      "Pick a protein, then choose a cooking style. Available styles: Foo Yung (scrambled egg), spicy peanut satay, sweet Cantonese, black bean (spicy), black pepper, Thai sweet chilli, Szechuan, kung po, English white mushroom, cashew nuts, fresh diced tomato, pineapple, pineapple & sweet ginger, spring onion & fresh ginger, beansprouts, garlic oyster, babycorn, bamboo shoots & water chestnut, broccoli, garlic sauce (spicy), lemon honey, orange, plum.",
    items: [
      { name: "Chicken", price: "6.90", popular: true },
      { name: "Beef", price: "6.90" },
      { name: "Char Sui", price: "6.90" },
      { name: "Fillet Steak", price: "9.10" },
      { name: "Roast Duck", price: "7.40" },
      { name: "Meat Combo", price: "7.40", desc: "Beef, chicken, char sui" },
      { name: "King Prawns", price: "7.30" },
      { name: "Fish", price: "6.50" },
      { name: "Seafood Combo", price: "7.00", desc: "King prawn, squid and fish" },
      { name: "Mixed Vegetable", price: "5.90", vegetarian: true },
      { name: "Tofu", price: "6.80", vegetarian: true },
      { name: "Mock Chicken", price: "6.80", vegetarian: true },
    ],
  },
  {
    title: "Sweet & Sour",
    shortTitle: "Sweet & Sour",
    description: "Hong Kong style — a firm British favourite",
    items: [
      { name: "Sweet & Sour Chicken", price: "6.90", popular: true },
      { name: "Sweet & Sour Char Sui", price: "6.90" },
      { name: "Sweet & Sour Chicken Batter Balls", price: "6.90", popular: true },
      { name: "Sweet & Sour Meat Combo", price: "7.30", desc: "Chicken, char sui and king prawn" },
      { name: "Sweet & Sour King Prawn", price: "7.30" },
      { name: "Sweet & Sour King Prawn Batter Balls", price: "7.30" },
      { name: "Sweet & Sour Squid", price: "6.50" },
      { name: "Sweet & Sour Fish", price: "6.50" },
      { name: "Sweet & Sour Seafood Combo", price: "7.00" },
      { name: "Sweet & Sour Assorted Vegetables", price: "5.90", vegetarian: true },
      { name: "Sweet & Sour Tofu (Beancurd)", price: "6.80", vegetarian: true },
      { name: "Sweet & Sour Mock Chicken", price: "6.80", vegetarian: true },
    ],
  },
  {
    title: "Curry Dishes",
    shortTitle: "Curries",
    description: "Chinese curry, Thai curry",
    items: [
      { name: "Chicken Curry", price: "6.90", spicy: true, popular: true },
      { name: "Beef Curry", price: "6.90", spicy: true },
      { name: "Char Sui Curry", price: "6.90", spicy: true },
      { name: "Mixed Meat Combo Curry", price: "7.10", desc: "Beef, chicken, char sui, king prawn", spicy: true },
      { name: "King Prawn Curry", price: "7.10", spicy: true },
      { name: "Chicken Thai Green Curry", price: "6.90", spicy: true, popular: true },
      { name: "Chicken Thai Red Curry", price: "6.90", spicy: true },
      // NOTE: Printed menu shows £6.50 for this item but all sibling Thai variants
      // are £6.90 — flagged for client confirmation. Using printed price as source of truth.
      { name: "Beef Thai Green Curry", price: "6.50", spicy: true },
      { name: "Beef Thai Red Curry", price: "6.90", spicy: true },
      { name: "King Prawn Thai Green Curry", price: "7.10", spicy: true },
      { name: "King Prawn Thai Red Curry", price: "7.10", spicy: true },
      { name: "Assorted Vegetable Curry", price: "5.90", spicy: true, vegetarian: true },
      { name: "Mock Chicken Curry", price: "6.80", spicy: true, vegetarian: true },
      { name: "Tofu Curry", price: "6.80", spicy: true, vegetarian: true },
    ],
  },
  {
    title: "Deep Fried Shredded Beef or Chicken",
    shortTitle: "Deep Fried",
    description: "Crisp shredded beef or chicken — choose your sauce",
    items: [
      { name: "Crispy Shredded Beef or Chicken in Cantonese Sauce", price: "7.00", popular: true },
      { name: "Crispy Shredded Beef or Chicken in Szechuan Sauce", price: "7.00", spicy: true },
      { name: "Crispy Shredded Beef or Chicken in Chilli Sauce", price: "7.00", spicy: true },
    ],
  },
  {
    title: "Noodles, Vermicelli, Pad Thai & Udon",
    shortTitle: "Noodles",
    description: "Chow mein, vermicelli, pad Thai, udon, hor fun",
    items: [
      { name: "Wok & Flame Special Chow Mein", price: "7.60", desc: "Beef, chicken, char sui, king prawn and veg in savoury soy", popular: true },
      { name: "Chicken Chow Mein", price: "7.30", popular: true },
      { name: "Beef Chow Mein", price: "7.30" },
      { name: "Char Sui Chow Mein", price: "7.30" },
      { name: "Singapore Style Chow Mein", price: "7.30", desc: "Chicken, char sui, shrimp in special curry paste", spicy: true },
      { name: "Sing Chow Vermicelli", price: "7.30", desc: "Singapore-style vermicelli — chicken, char sui, shrimp in curry paste", spicy: true },
      { name: "Chicken Pad Thai", price: "7.30", spicy: true, popular: true },
      { name: "Chicken Udon", price: "7.30" },
      { name: "Beef Udon", price: "7.30" },
      { name: "Roast Duck Chow Mein", price: "7.60" },
      { name: "Beef Hor Fun", price: "7.30", desc: "Flat rice noodles with beef" },
      { name: "King Prawn Chow Mein", price: "7.70" },
      { name: "Seafood Chow Mein", price: "7.70", desc: "King prawn, squid and fish" },
      { name: "King Prawn Pad Thai", price: "7.70", spicy: true },
      { name: "King Prawn Udon", price: "7.70" },
      { name: "King Prawn Vermicelli", price: "7.70" },
      { name: "Assorted Vegetable Chow Mein", price: "7.00", vegetarian: true },
      { name: "Mock Chicken Chow Mein", price: "7.00", vegetarian: true },
      { name: "Vegetable Singapore Chow Mein", price: "7.00", spicy: true, vegetarian: true },
      { name: "Vegetable Singapore Vermicelli", price: "7.00", spicy: true, vegetarian: true },
      { name: "Vegetable Vermicelli", price: "7.00", vegetarian: true },
      { name: "Assorted Vegetable Pad Thai", price: "7.00", spicy: true, vegetarian: true },
      { name: "Assorted Vegetable Udon", price: "7.00", vegetarian: true },
      { name: "Tofu Chow Mein", price: "7.00", vegetarian: true },
      { name: "Tofu Vermicelli", price: "7.00", vegetarian: true },
    ],
  },
  {
    title: "Fried Rice",
    shortTitle: "Fried Rice",
    description: "Meat, seafood, vegetarian",
    items: [
      { name: "Wok & Flame Special Fried Rice", price: "7.40", desc: "Beef, chicken, char sui and king prawn", popular: true },
      { name: "Yeung Chow Fried Rice", price: "7.30", desc: "Char sui, shrimp and chicken" },
      { name: "Char Sui Fried Rice", price: "7.00" },
      { name: "Chicken Fried Rice", price: "7.00" },
      { name: "Beef Fried Rice", price: "7.00" },
      { name: "Singapore Style Fried Rice", price: "7.40", desc: "Chicken, char sui, shrimp in special curry paste", spicy: true },
      { name: "King Prawn Fried Rice", price: "7.40" },
      // Both veg fried rices are kept. Wing dropped the plain "Assorted Vegetable
      // Fried Rice" on 2026-06-16, then re-added it on 2026-06-25 (£6.20, WhatsApp —
      // confirmed it was the last missing item).
      { name: "Assorted Vegetable Fried Rice", price: "6.20", vegetarian: true },
      { name: "Singapore Style Vegetable Fried Rice", price: "6.20", spicy: true, vegetarian: true },
    ],
  },
  {
    title: "Side Extras",
    shortTitle: "Sides",
    description: "Rice, noodles, vegetables, chips",
    items: [
      { name: "Egg Fried Rice", price: "3.30", vegetarian: true },
      { name: "Steamed Boiled Rice", price: "3.00", vegetarian: true },
      { name: "Soft Noodles & Beansprouts", price: "4.00", vegetarian: true },
      { name: "Crispy Noodles", price: "3.50", vegetarian: true },
      { name: "Fried Mushrooms", price: "3.50", vegetarian: true },
      { name: "Fried Beansprouts", price: "3.50", vegetarian: true },
      { name: "Fried Bamboo Shoots & Water Chestnuts", price: "3.80", vegetarian: true },
      { name: "Chips", price: "2.60", vegetarian: true, popular: true },
      { name: "Salt & Pepper Chips", price: "4.00", spicy: true, vegetarian: true, popular: true },
      // Half-and-half combos — added per Wing (2026-07-04 client message).
      { name: "1/2 Fried Rice & Chips", price: "4.00", vegetarian: true },
      { name: "1/2 Fried Rice, Chips & Curry Sauce", price: "5.80", spicy: true, vegetarian: true },
      { name: "1/2 Boiled Rice & Chips", price: "3.80", vegetarian: true },
      { name: "1/2 Boiled Rice, Chips & Curry Sauce", price: "5.20", spicy: true, vegetarian: true },
    ],
  },
  {
    title: "Sauces",
    shortTitle: "Sauces",
    description: "Pots of our most-loved sauces",
    items: [
      { name: "Sweet & Sour Sauce", price: "2.20", vegetarian: true },
      { name: "Black Bean Sauce", price: "2.20", spicy: true, vegetarian: true },
      { name: "Curry Sauce", price: "2.20", spicy: true, vegetarian: true },
      { name: "Satay Sauce", price: "2.20", spicy: true, vegetarian: true },
      { name: "Cantonese Sauce", price: "2.20", desc: "Sweet appetising sauce", vegetarian: true },
      // Owner-confirmed orderable (2026-06-16) though not on the printed menu.
      // Price £2.20 to match the other pots — CONFIRM with Wing.
      { name: "Hoi Sin Sauce", price: "2.20", vegetarian: true },
      { name: "BBQ Sauce", price: "2.20", vegetarian: true },
    ],
  },
  {
    title: "Desserts",
    shortTitle: "Desserts",
    items: [
      { name: "Banana Fritter", price: "3.80", vegetarian: true },
      { name: "Pineapple Fritter", price: "3.80", vegetarian: true },
    ],
  },
  {
    title: "Drinks (Cans)",
    shortTitle: "Drinks",
    // PLACEHOLDER PRICES — printed Wok & Flame menu does not list drinks. Prices
    // below are the Just Eat / Wok and Go listing as a stand-in. Owner to confirm
    // in-store / collection prices and which cans are actually stocked.
    items: [
      { name: "Coca-Cola Original Taste 330ml", price: "1.20", vegetarian: true },
      { name: "Diet Coke 330ml", price: "1.20", vegetarian: true },
      { name: "Tango Orange 330ml", price: "1.20", vegetarian: true },
      { name: "7UP Lemon & Lime 330ml", price: "1.20", vegetarian: true },
      { name: "Rubicon Sparkling Mango 330ml", price: "1.20", vegetarian: true },
    ],
  },
];
