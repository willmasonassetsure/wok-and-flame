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

// Mirrors the live Wok and Go (M20) Just Eat catalogue at
// https://www.just-eat.co.uk/restaurants-wokandgo-m20/menu — names, prices,
// and dietary flags are kept in sync with that source so nothing on the site
// contradicts what a customer can actually order.
//
// Ordered by how UK Chinese takeaway customers typically browse: value first
// (Set Meals), then signature draws (Specials), then starters, soups, the UK
// hero category (Salt & Pepper), then proteins and carbs, finishing with
// extras, desserts and drinks.
//
// Flags:
//   spicy       — contains chilli / chilli oil / hot spice
//   popular     — owner-identified bestseller
//   vegetarian  — flagged vegan/vegetarian on Just Eat (mock chicken is soy-
//                 based; curry sauce is vegetable-based per Just Eat listing)
export const menuData: MenuCategory[] = [
  {
    title: "Set Meals & Banquets",
    shortTitle: "Set Meals",
    description: "Meat or vegetarian",
    items: [
      {
        name: "Set Meal for 2",
        price: "30.00",
        desc: "Sweetcorn soup, spring rolls, beef black bean, sweet & sour chicken, egg fried rice, crackers",
      },
      {
        name: "Set Meal for 3",
        price: "42.00",
        desc: "Set Meal for 2 plus any main course and an extra portion of rice",
      },
      {
        name: "Vegetarian Meal for 2",
        price: "19.00",
        desc: "Spring rolls, seaweed, mixed veg black bean, sweet & sour tofu, egg fried rice, crackers",
        vegetarian: true,
      },
      {
        name: "Vegetarian Meal for 3",
        price: "27.00",
        desc: "Vegetarian Meal for 2 plus any vegetarian main and an extra portion of rice",
        vegetarian: true,
      },
      {
        name: "Imperial Banquet for 2",
        price: "38.00",
        desc: "Sweetcorn soup, crackers, spring rolls, BBQ ribs, sesame prawn toast, sweet & sour chicken, king prawn black bean, yeung chow rice",
      },
      {
        name: "Imperial Banquet for 3",
        price: "49.00",
        desc: "Imperial Banquet for 2 plus quarter aromatic duck and beef satay",
      },
      {
        name: "Imperial Banquet for 4",
        price: "64.00",
        desc: "Imperial Banquet for 3 plus half aromatic duck and Cantonese steak",
        popular: true,
      },
    ],
  },
  {
    title: "Wok & Flame Specials",
    shortTitle: "Specials",
    description: "Something different but proper good",
    items: [
      {
        name: "Four Season",
        price: "8.20",
        desc: "Beef, chicken, char siu and king prawn with Chinese vegetables in a hot & spicy garlic sauce",
        spicy: true,
        popular: true,
      },
      {
        name: "Shanghai Surprise",
        price: "8.20",
        desc: "Stir-fried Chinese veg with char siu, topped with deep-fried chicken in a spicy sauce",
        spicy: true,
      },
      {
        name: "Fighting Dragon",
        price: "8.20",
        desc: "Char siu and king prawn with Chinese veg in garlic oyster sauce, topped with deep-fried chicken in spicy sauce",
        spicy: true,
      },
    ],
  },
  {
    title: "Appetisers",
    shortTitle: "Appetisers",
    description: "Meat, seafood, vegetarian",
    items: [
      {
        name: "Quarter Aromatic Crispy Duck",
        price: "10.30",
        desc: "10 pancakes, hoisin sauce and garnish",
        popular: true,
      },
      {
        name: "Half Aromatic Crispy Duck",
        price: "20.00",
        desc: "20 pancakes, hoisin sauce and garnish",
      },
      {
        name: "Wok & Flame Mix for 2",
        price: "10.30",
        desc: "BBQ ribs, chicken spring rolls, prawn toast, seaweed and samosas",
        popular: true,
      },
      { name: "Salt & Pepper Ribs", price: "7.80", spicy: true, popular: true },
      { name: "Ribs in BBQ Sauce", price: "7.80", desc: "Cantonese BBQ sauce" },
      { name: "Ribs in Cantonese Sauce", price: "7.80", desc: "Sweet, sticky, appetising sauce" },
      { name: "Ribs in Honey Syrup", price: "7.80" },
      { name: "Chicken Spring Rolls (4)", price: "4.40" },
      { name: "Cantonese Chicken Wings", price: "6.20", desc: "Sweet, sticky, appetising sauce" },
      { name: "Chicken Satay Skewers", price: "6.30", desc: "With sweet peanut sauce" },
      {
        name: "Steamed Prawn & Pork Dumplings (Sui Mai)",
        price: "4.80",
        desc: "6 dumplings",
      },
      { name: "Curried Chicken Samosas (4)", price: "4.40", spicy: true },
      { name: "Sesame Prawn Toast", price: "4.60", popular: true },
      {
        name: "Steamed Prawn Dumplings (Har Kau)",
        price: "4.80",
        desc: "6 dumplings",
      },
      { name: "King Prawn Batter Balls (6)", price: "4.80", desc: "With dip" },
      { name: "Vegetable Spring Rolls", price: "4.30", vegetarian: true },
      { name: "Vegetable Samosas", price: "4.30", vegetarian: true },
      { name: "Crispy Seaweed", price: "3.90", desc: "Crispy fried cabbage", vegetarian: true },
      { name: "Prawn Crackers", price: "1.50" },
    ],
  },
  {
    title: "Soups",
    shortTitle: "Soups",
    description: "Meat, seafood, vegetarian",
    items: [
      { name: "Wonton Soup", price: "3.80", desc: "Prawn and meat parcels" },
      { name: "Chicken Sweetcorn Soup", price: "3.60" },
      { name: "Prawn Sweetcorn Soup", price: "3.60" },
      { name: "Chicken Noodle Soup", price: "3.60" },
      {
        name: "Hot & Sour Soup",
        price: "3.60",
        desc: "Chicken, char siu, shrimp",
        spicy: true,
        popular: true,
      },
      {
        name: "Tom Yam Chicken Soup",
        price: "3.60",
        desc: "Thai sour and spicy broth",
        spicy: true,
      },
      {
        name: "Tom Yam Seafood Soup",
        price: "3.60",
        desc: "Thai sour and spicy broth",
        spicy: true,
      },
      { name: "Sweetcorn Soup", price: "3.60", vegetarian: true },
      {
        name: "Vegetable Hot & Sour Soup",
        price: "3.60",
        spicy: true,
        vegetarian: true,
      },
      {
        name: "Tom Yam Vegetable Soup",
        price: "3.60",
        desc: "Thai sour and spicy broth",
        spicy: true,
        vegetarian: true,
      },
    ],
  },
  {
    title: "Salt & Pepper",
    shortTitle: "Salt & Pepper",
    description: "Wok tossed with onion, green peppers, carrots, chilli oil and garlic",
    items: [
      { name: "Salt & Pepper Chicken", price: "6.90", spicy: true, popular: true },
      { name: "Salt & Pepper Ribs", price: "7.80", spicy: true, popular: true },
      { name: "Salt & Pepper King Prawns", price: "7.30", spicy: true },
      { name: "Salt & Pepper Squid", price: "6.90", spicy: true },
      { name: "Salt & Pepper Chicken Wings", price: "6.30", spicy: true },
      {
        name: "Salt & Pepper Chips & Chicken Box",
        price: "7.30",
        spicy: true,
        popular: true,
      },
      { name: "Salt & Pepper Mock Chicken", price: "6.90", spicy: true, vegetarian: true },
      { name: "Salt & Pepper Tofu", price: "6.70", spicy: true, vegetarian: true },
      { name: "Salt & Pepper Chips", price: "4.30", spicy: true, vegetarian: true },
    ],
  },
  {
    title: "Mains",
    shortTitle: "Mains",
    description:
      "Twelve signature sauces — Just Eat lists each with your choice of chicken, beef, char siu, roast duck, fillet steak, king prawn, mock chicken, tofu or mixed veg",
    items: [
      {
        name: "Chicken in Black Bean Sauce",
        price: "7.80",
        spicy: true,
        popular: true,
      },
      { name: "Beef in Black Bean Sauce", price: "7.80", spicy: true },
      { name: "King Prawn in Black Bean Sauce", price: "8.10", spicy: true },
      { name: "Kung Po Chicken", price: "7.80", desc: "Peanuts, dried chilli and hoisin", spicy: true, popular: true },
      { name: "Chicken in Satay Peanut Sauce", price: "7.80", spicy: true },
      { name: "Chicken with Cashew Nuts", price: "7.80" },
      { name: "King Prawn with Cashew Nuts", price: "8.10" },
      { name: "Chicken with Ginger & Spring Onion", price: "7.80" },
      { name: "Beef with Ginger & Spring Onion", price: "7.80" },
      { name: "Beef in Black Pepper Sauce", price: "7.80", spicy: true },
      { name: "Chicken in Szechuan Sauce", price: "7.80", desc: "Hot, garlicky, slightly sweet", spicy: true },
      { name: "Chicken with Mushrooms", price: "7.80" },
      { name: "Beef with Mushrooms", price: "7.80" },
      { name: "King Prawn in Garlic Oyster Sauce", price: "8.10" },
      { name: "Chicken in Lemon Honey Sauce", price: "7.80", desc: "Light citrus glaze, no batter" },
      { name: "Beef in Sweet Cantonese Sauce", price: "7.80", desc: "Sweet, sticky, appetising sauce" },
      {
        name: "Mixed Vegetables in Black Bean Sauce",
        price: "6.60",
        spicy: true,
        vegetarian: true,
      },
      {
        name: "Mixed Vegetables in Garlic Sauce",
        price: "6.60",
        spicy: true,
        vegetarian: true,
      },
      {
        name: "Tofu in Black Bean Sauce",
        price: "7.60",
        spicy: true,
        vegetarian: true,
      },
      {
        name: "Tofu in Satay Peanut Sauce",
        price: "7.60",
        spicy: true,
        vegetarian: true,
      },
      {
        name: "Mock Chicken with Cashew Nuts",
        price: "7.70",
        vegetarian: true,
      },
      {
        name: "Mock Chicken in Black Bean Sauce",
        price: "7.70",
        spicy: true,
        vegetarian: true,
      },
    ],
  },
  {
    title: "Sweet & Sour",
    shortTitle: "Sweet & Sour",
    description: "Hong Kong style — a firm British favourite",
    items: [
      { name: "Sweet & Sour Chicken", price: "7.80", popular: true },
      { name: "Sweet & Sour Chicken Batter Balls", price: "8.30", popular: true },
      { name: "Sweet & Sour Pork", price: "7.80" },
      { name: "Sweet & Sour King Prawn", price: "8.10" },
      { name: "Sweet & Sour King Prawn Batter Balls", price: "8.50" },
      {
        name: "Sweet & Sour Meat Combo",
        price: "8.00",
        desc: "Chicken, pork and king prawn",
      },
      { name: "Sweet & Sour Seafood Combo", price: "8.20" },
      { name: "Sweet & Sour Squid", price: "7.70" },
      { name: "Sweet & Sour Fish", price: "7.70" },
      { name: "Sweet & Sour Mock Chicken", price: "7.70", vegetarian: true },
      { name: "Sweet & Sour Tofu", price: "7.70", vegetarian: true },
      { name: "Sweet & Sour Mixed Vegetables", price: "6.70", vegetarian: true },
    ],
  },
  {
    title: "Curry Dishes",
    shortTitle: "Curries",
    description: "Chinese curry, Thai curry",
    items: [
      { name: "Chicken Curry", price: "7.80", spicy: true, popular: true },
      { name: "Beef Curry", price: "7.80", spicy: true },
      { name: "Char Siu Curry", price: "7.80", spicy: true },
      { name: "King Prawn Curry", price: "8.10", spicy: true },
      {
        name: "Mixed Meat Combo Curry",
        price: "8.10",
        desc: "Beef, chicken, char siu, king prawn",
        spicy: true,
      },
      { name: "Mock Chicken Curry", price: "7.70", spicy: true, vegetarian: true },
      { name: "Tofu Curry", price: "7.60", spicy: true, vegetarian: true },
      { name: "Vegetable Curry", price: "6.80", spicy: true, vegetarian: true },
      {
        name: "Thai Green Curry Chicken",
        price: "7.80",
        spicy: true,
        popular: true,
      },
      { name: "Thai Red Curry Chicken", price: "7.80", spicy: true },
      { name: "Thai Green Curry Beef", price: "7.80", spicy: true },
      { name: "Thai Red Curry Beef", price: "7.80", spicy: true },
      { name: "Thai Green Curry King Prawn", price: "8.10", spicy: true },
      { name: "Thai Red Curry King Prawn", price: "8.10", spicy: true },
    ],
  },
  {
    title: "Deep Fried Dishes",
    shortTitle: "Deep Fried",
    description: "Choice of Cantonese, chilli or Szechuan sauce",
    items: [
      { name: "Crispy Shredded Beef", price: "7.80", desc: "Crisp strips with Cantonese, chilli or Szechuan", popular: true },
      { name: "Crispy Shredded Chicken", price: "7.80" },
    ],
  },
  {
    title: "Noodle Dishes",
    shortTitle: "Noodles",
    description: "Chow mein, vermicelli, pad Thai, udon",
    items: [
      {
        name: "Wok & Flame Special Chow Mein",
        price: "8.30",
        desc: "Beef, chicken, char siu, king prawn and veg in savoury soy",
        popular: true,
      },
      { name: "Chicken Chow Mein", price: "7.90", popular: true },
      { name: "Beef Chow Mein", price: "7.90" },
      { name: "Char Siu Chow Mein", price: "7.90" },
      { name: "King Prawn Chow Mein", price: "8.30" },
      {
        name: "Seafood Chow Mein",
        price: "8.30",
        desc: "King prawn, squid and fish",
      },
      { name: "Roast Duck Chow Mein", price: "8.30" },
      {
        name: "Singapore Chow Mein",
        price: "8.20",
        desc: "Chicken, char siu, shrimp in special curry paste",
        spicy: true,
      },
      {
        name: "Singapore Chow Vermicelli",
        price: "8.20",
        desc: "Chicken, char siu, shrimp in special curry paste",
        spicy: true,
      },
      { name: "Chicken Pad Thai", price: "8.20", spicy: true, popular: true },
      { name: "King Prawn Pad Thai", price: "8.50", spicy: true },
      { name: "Chicken Udon", price: "8.00" },
      { name: "Beef Udon", price: "8.00" },
      { name: "King Prawn Udon", price: "8.30" },
      {
        name: "Vegetable Singapore Vermicelli",
        price: "7.60",
        spicy: true,
        vegetarian: true,
      },
      {
        name: "Tofu Singapore Vermicelli",
        price: "7.70",
        spicy: true,
        vegetarian: true,
      },
      {
        name: "Mock Chicken Vermicelli",
        price: "7.80",
        spicy: true,
        vegetarian: true,
      },
      {
        name: "Mock Chicken Chow Mein",
        price: "7.80",
        vegetarian: true,
      },
      { name: "Tofu Chow Mein", price: "7.70", vegetarian: true },
      {
        name: "Vegetable Chow Mein",
        price: "7.40",
        vegetarian: true,
      },
      {
        name: "Mock Chicken Pad Thai",
        price: "7.70",
        spicy: true,
        vegetarian: true,
      },
      {
        name: "Vegetable Pad Thai",
        price: "7.00",
        spicy: true,
        vegetarian: true,
      },
      { name: "Vegetable Udon", price: "7.00", vegetarian: true },
    ],
  },
  {
    title: "Fried Rice Dishes",
    shortTitle: "Fried Rice",
    description: "Meat, seafood, vegetarian",
    items: [
      {
        name: "Wok & Flame Special Egg Fried Rice",
        price: "7.90",
        desc: "Beef, chicken, char siu and king prawn",
        popular: true,
      },
      {
        name: "Yeung Chow Egg Fried Rice",
        price: "7.70",
        desc: "Char siu, shrimp and chicken",
      },
      { name: "Chicken Egg Fried Rice", price: "7.60" },
      { name: "Beef Egg Fried Rice", price: "7.70" },
      { name: "Char Siu Egg Fried Rice", price: "7.60" },
      { name: "King Prawn Egg Fried Rice", price: "7.90" },
      {
        name: "Singapore Egg Fried Rice",
        price: "7.90",
        desc: "Chicken, char siu, shrimp in special curry paste",
        spicy: true,
      },
      {
        name: "Singapore Vegetable Egg Fried Rice",
        price: "6.80",
        spicy: true,
        vegetarian: true,
      },
      {
        name: "Vegetable Egg Fried Rice",
        price: "6.70",
        vegetarian: true,
      },
    ],
  },
  {
    title: "Sides",
    shortTitle: "Sides",
    items: [
      { name: "Chips", price: "3.60", vegetarian: true, popular: true },
      {
        name: "Salt & Pepper Chips",
        price: "4.30",
        spicy: true,
        vegetarian: true,
        popular: true,
      },
      { name: "Egg Fried Rice", price: "3.60", vegetarian: true },
      { name: "Steamed Boiled Rice", price: "3.30", vegetarian: true },
      { name: "½ Egg Fried Rice & Chips", price: "4.00", vegetarian: true },
      { name: "½ Boiled Rice & Chips", price: "3.80", vegetarian: true },
      {
        name: "½ Egg Fried Rice, Chips & Curry Sauce",
        price: "6.00",
        vegetarian: true,
      },
      {
        name: "½ Boiled Rice, Chips & Curry Sauce",
        price: "5.80",
        vegetarian: true,
      },
      { name: "Fried Mushrooms", price: "4.00", vegetarian: true },
      { name: "Soft Noodles & Bean Sprouts", price: "4.40", vegetarian: true },
      { name: "Crispy Noodles", price: "3.80", vegetarian: true },
      { name: "Fried Bean Sprouts", price: "3.80", vegetarian: true },
      {
        name: "Fried Bamboo Shoots & Water Chestnuts",
        price: "4.00",
        vegetarian: true,
      },
    ],
  },
  {
    title: "Sauces",
    shortTitle: "Sauces",
    items: [
      { name: "Curry Sauce", price: "2.20", spicy: true, vegetarian: true },
      { name: "Sweet & Sour Sauce", price: "2.20", vegetarian: true },
      { name: "Black Bean Sauce", price: "2.20", spicy: true, vegetarian: true },
      { name: "Peanut Satay Sauce", price: "2.20", spicy: true, vegetarian: true },
      {
        name: "Cantonese Sauce",
        price: "2.20",
        desc: "Sweet appetising sauce",
      },
      { name: "Black Pepper Sauce", price: "2.20", spicy: true, vegetarian: true },
      { name: "BBQ Sauce", price: "2.20", desc: "Cantonese BBQ flavour" },
      { name: "Hoisin Sauce", price: "1.70", vegetarian: true },
    ],
  },
  {
    title: "Desserts",
    shortTitle: "Desserts",
    items: [
      {
        name: "Banana Fritter in Syrup",
        price: "3.90",
        vegetarian: true,
      },
      {
        name: "Pineapple Fritter in Syrup",
        price: "3.90",
        vegetarian: true,
      },
    ],
  },
  {
    title: "Drinks (Cans)",
    shortTitle: "Drinks",
    items: [
      { name: "Coca-Cola Original Taste 330ml", price: "1.20", vegetarian: true },
      { name: "Diet Coke 330ml", price: "1.20", vegetarian: true },
      { name: "Tango Orange 330ml", price: "1.20", vegetarian: true },
      { name: "7UP Lemon & Lime 330ml", price: "1.20", vegetarian: true },
      { name: "Rubicon Sparkling Mango 330ml", price: "1.20", vegetarian: true },
    ],
  },
];
