import { type Settings } from "./settings";

// ── Ingredient catalog by category ──────────────────────────────────────────

export const MEAL_INGREDIENT_CATALOG = {
  proteins: [
    // Original Chinese
    "lean-pork", "eggs", "goose-eggs", "sea-bass", "yellow-catfish",
    "flounder", "silver-carp", "beef", "chicken-breast", "local-chicken",
    "shrimp", "tofu",
    // Global additions
    "lamb", "salmon", "cod", "tuna", "duck", "chicken-thigh",
    "pork-belly", "ground-beef", "ground-pork", "squid", "clams",
    "mussels", "scallops", "crab", "tempeh", "paneer",
    "chicken-wings", "pork-ribs", "bacon", "sausage",
  ],
  vegetables: [
    // Original
    "potatoes", "tomatoes", "broccoli", "leafy-greens", "cabbage",
    "eggplant", "cucumber", "celery", "carrots", "mushrooms", "wood-ear",
    "bean-sprouts", "corn",
    // Global additions
    "bell-pepper", "onion", "zucchini", "spinach", "asparagus",
    "green-beans", "peas", "sweet-potato", "pumpkin", "cauliflower",
    "bok-choy", "bamboo-shoots", "lotus-root", "bitter-melon",
    "okra", "artichoke", "leek", "radish", "avocado", "kale",
    "lettuce", "watercress", "snow-peas", "edamame", "seaweed",
    "kimchi", "pickled-vegetables",
  ],
  staples: [
    "rice", "noodles", "flour",
    // Global
    "pasta", "bread", "tortilla", "couscous", "quinoa",
    "udon", "soba", "rice-noodles", "vermicelli", "pita",
    "potato-starch-noodles", "millet", "oats",
  ],
  seasonings: [
    // Original
    "ginger", "scallions", "green-onions", "sichuan-pepper", "salt",
    "soy-sauce", "vinegar", "starch",
    // Global additions
    "garlic", "chili-flakes", "cumin", "turmeric", "curry-powder",
    "paprika", "black-pepper", "white-pepper", "five-spice",
    "star-anise", "cinnamon", "bay-leaf", "oregano", "basil",
    "thyme", "rosemary", "parsley", "cilantro", "dill",
    "olive-oil", "sesame-oil", "coconut-milk", "fish-sauce",
    "oyster-sauce", "doubanjiang", "miso", "wasabi",
    "lemon", "lime", "tomato-paste", "cream", "butter",
    "cheese", "yogurt", "honey", "sugar", "rice-wine",
    "sake", "mirin", "gochujang", "sriracha", "tahini",
    "mustard", "worcestershire", "balsamic-vinegar",
    "coconut-oil", "ghee", "tamarind", "lemongrass",
    "galangal", "kaffir-lime-leaf", "shallot",
  ],
};

// ── Cooking methods by equipment ────────────────────────────────────────────

interface CookingMethod {
  id: string;
  equipment: string;
  name: { en: string; zh: string };
}

export const COOKING_METHODS: CookingMethod[] = [
  { id: "stir-fry",        equipment: "wok",              name: { en: "Stir-fry",       zh: "炒" } },
  { id: "braise",          equipment: "wok",              name: { en: "Braise",         zh: "炖/烧" } },
  { id: "deep-fry",        equipment: "wok",              name: { en: "Deep-fry",       zh: "炸" } },
  { id: "boil-soup",       equipment: "wok",              name: { en: "Soup/Boil",      zh: "煮汤/煮" } },
  { id: "steam",           equipment: "steamer",          name: { en: "Steam",          zh: "蒸" } },
  { id: "griddle-sear",    equipment: "electric-griddle",  name: { en: "Pan-sear",       zh: "煎" } },
  { id: "griddle-pancake",  equipment: "electric-griddle",  name: { en: "Griddle",        zh: "烙" } },
  { id: "roast",           equipment: "oven",             name: { en: "Roast/Bake",     zh: "烤" } },
  { id: "air-fry",         equipment: "air-fryer",        name: { en: "Air-fry",        zh: "空气炸" } },
  { id: "rice-cooker-stew", equipment: "rice-cooker",      name: { en: "Slow-cook",      zh: "焖煮" } },
  { id: "blanch",          equipment: "wok",              name: { en: "Blanch/Poach",   zh: "焯/白灼" } },
];

// ── Dish templates ──────────────────────────────────────────────────────────

export interface DishTemplate {
  nameEn: string;
  nameZh: string;
  protein: string | null;
  vegetables: string[];
  seasonings: string[];
  staple: string | null;
  method: string;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  tags: string[];
  cuisine: string;
}

export const DISH_TEMPLATES: DishTemplate[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // CHINESE — Home-style (家常菜)
  // ═══════════════════════════════════════════════════════════════════════════
  { nameEn: "Tomato Egg Stir-fry", nameZh: "番茄炒蛋", protein: "eggs", vegetables: ["tomatoes"], seasonings: ["salt", "green-onions"], staple: null, method: "stir-fry", calories: 180, proteinG: 12, carbsG: 8, fatG: 10, tags: ["quick"], cuisine: "chinese" },
  { nameEn: "Stir-fried Broccoli with Beef", nameZh: "西兰花炒牛肉", protein: "beef", vegetables: ["broccoli"], seasonings: ["soy-sauce", "ginger", "starch"], staple: null, method: "stir-fry", calories: 250, proteinG: 28, carbsG: 8, fatG: 12, tags: ["high-protein"], cuisine: "chinese" },
  { nameEn: "Pork & Potato Stir-fry", nameZh: "土豆炒肉丝", protein: "lean-pork", vegetables: ["potatoes"], seasonings: ["soy-sauce", "green-onions", "ginger"], staple: null, method: "stir-fry", calories: 220, proteinG: 18, carbsG: 20, fatG: 10, tags: [], cuisine: "chinese" },
  { nameEn: "Stir-fried Leafy Greens", nameZh: "清炒时蔬", protein: null, vegetables: ["leafy-greens"], seasonings: ["salt", "garlic"], staple: null, method: "stir-fry", calories: 60, proteinG: 3, carbsG: 5, fatG: 3, tags: ["quick", "light"], cuisine: "chinese" },
  { nameEn: "Shrimp & Broccoli Stir-fry", nameZh: "虾仁西兰花", protein: "shrimp", vegetables: ["broccoli"], seasonings: ["salt", "ginger", "starch"], staple: null, method: "stir-fry", calories: 200, proteinG: 24, carbsG: 6, fatG: 8, tags: ["high-protein", "quick"], cuisine: "chinese" },
  { nameEn: "Chicken & Mushroom Stir-fry", nameZh: "鸡胸肉炒蘑菇", protein: "chicken-breast", vegetables: ["mushrooms"], seasonings: ["soy-sauce", "ginger", "starch"], staple: null, method: "stir-fry", calories: 210, proteinG: 30, carbsG: 5, fatG: 8, tags: ["high-protein"], cuisine: "chinese" },
  { nameEn: "Wood Ear & Egg Stir-fry", nameZh: "木耳炒蛋", protein: "eggs", vegetables: ["wood-ear"], seasonings: ["salt", "green-onions"], staple: null, method: "stir-fry", calories: 170, proteinG: 11, carbsG: 6, fatG: 10, tags: ["quick"], cuisine: "chinese" },
  { nameEn: "Shredded Pork & Cabbage", nameZh: "手撕包菜炒肉", protein: "lean-pork", vegetables: ["cabbage"], seasonings: ["soy-sauce", "sichuan-pepper", "vinegar"], staple: null, method: "stir-fry", calories: 200, proteinG: 16, carbsG: 8, fatG: 11, tags: [], cuisine: "chinese" },
  { nameEn: "Vinegar Bean Sprouts", nameZh: "醋溜豆芽", protein: null, vegetables: ["bean-sprouts"], seasonings: ["vinegar", "salt", "sichuan-pepper"], staple: null, method: "stir-fry", calories: 50, proteinG: 3, carbsG: 6, fatG: 1, tags: ["quick", "light"], cuisine: "chinese" },
  { nameEn: "Celery & Local Chicken", nameZh: "芹菜炒土鸡", protein: "local-chicken", vegetables: ["celery"], seasonings: ["soy-sauce", "ginger", "sichuan-pepper"], staple: null, method: "stir-fry", calories: 230, proteinG: 22, carbsG: 4, fatG: 12, tags: [], cuisine: "chinese" },
  { nameEn: "Cucumber & Egg Stir-fry", nameZh: "黄瓜炒蛋", protein: "eggs", vegetables: ["cucumber"], seasonings: ["salt", "green-onions"], staple: null, method: "stir-fry", calories: 150, proteinG: 10, carbsG: 5, fatG: 9, tags: ["quick", "light"], cuisine: "chinese" },
  { nameEn: "Garlic Eggplant Stir-fry", nameZh: "蒜香炒茄子", protein: null, vegetables: ["eggplant"], seasonings: ["soy-sauce", "garlic", "vinegar"], staple: null, method: "stir-fry", calories: 100, proteinG: 2, carbsG: 12, fatG: 5, tags: ["light"], cuisine: "chinese" },
  { nameEn: "Corn & Carrot Stir-fry", nameZh: "玉米胡萝卜炒", protein: null, vegetables: ["corn", "carrots"], seasonings: ["salt"], staple: null, method: "stir-fry", calories: 90, proteinG: 3, carbsG: 18, fatG: 2, tags: ["quick", "light"], cuisine: "chinese" },
  { nameEn: "Braised Tofu with Tomato", nameZh: "番茄烧豆腐", protein: "tofu", vegetables: ["tomatoes"], seasonings: ["soy-sauce", "salt", "green-onions"], staple: null, method: "braise", calories: 160, proteinG: 12, carbsG: 10, fatG: 8, tags: [], cuisine: "chinese" },
  { nameEn: "Braised Sea Bass", nameZh: "红烧鲈鱼", protein: "sea-bass", vegetables: [], seasonings: ["soy-sauce", "ginger", "scallions", "vinegar"], staple: null, method: "braise", calories: 230, proteinG: 32, carbsG: 4, fatG: 8, tags: ["high-protein"], cuisine: "chinese" },
  { nameEn: "Braised Yellow Catfish", nameZh: "红烧黄骨鱼", protein: "yellow-catfish", vegetables: [], seasonings: ["soy-sauce", "ginger", "green-onions"], staple: null, method: "braise", calories: 200, proteinG: 28, carbsG: 3, fatG: 7, tags: ["high-protein"], cuisine: "chinese" },
  { nameEn: "Tomato Egg Drop Soup", nameZh: "番茄蛋花汤", protein: "eggs", vegetables: ["tomatoes"], seasonings: ["salt", "green-onions"], staple: null, method: "boil-soup", calories: 80, proteinG: 6, carbsG: 8, fatG: 3, tags: ["light", "quick"], cuisine: "chinese" },
  { nameEn: "Silver Carp Tofu Soup", nameZh: "鲢鱼豆腐汤", protein: "silver-carp", vegetables: [], seasonings: ["ginger", "scallions", "salt"], staple: null, method: "boil-soup", calories: 180, proteinG: 24, carbsG: 3, fatG: 7, tags: [], cuisine: "chinese" },
  { nameEn: "Braised Flounder", nameZh: "红烧多宝鱼", protein: "flounder", vegetables: [], seasonings: ["soy-sauce", "ginger", "scallions"], staple: null, method: "braise", calories: 190, proteinG: 30, carbsG: 3, fatG: 5, tags: ["high-protein"], cuisine: "chinese" },
  { nameEn: "Steamed Sea Bass", nameZh: "清蒸鲈鱼", protein: "sea-bass", vegetables: [], seasonings: ["ginger", "scallions", "soy-sauce"], staple: null, method: "steam", calories: 200, proteinG: 32, carbsG: 2, fatG: 6, tags: ["high-protein", "light"], cuisine: "chinese" },
  { nameEn: "Steamed Egg Custard", nameZh: "蒸蛋羹", protein: "eggs", vegetables: [], seasonings: ["salt", "green-onions", "sesame-oil"], staple: null, method: "steam", calories: 100, proteinG: 8, carbsG: 1, fatG: 7, tags: ["quick", "light"], cuisine: "chinese" },
  { nameEn: "Steamed Local Chicken", nameZh: "清蒸土鸡", protein: "local-chicken", vegetables: [], seasonings: ["ginger", "scallions", "salt"], staple: null, method: "steam", calories: 240, proteinG: 28, carbsG: 0, fatG: 14, tags: ["high-protein"], cuisine: "chinese" },
  { nameEn: "Steamed Flounder", nameZh: "清蒸多宝鱼", protein: "flounder", vegetables: [], seasonings: ["ginger", "scallions", "soy-sauce"], staple: null, method: "steam", calories: 170, proteinG: 28, carbsG: 2, fatG: 4, tags: ["high-protein", "light"], cuisine: "chinese" },
  { nameEn: "Steamed Goose Eggs", nameZh: "蒸鹅蛋", protein: "goose-eggs", vegetables: [], seasonings: ["salt"], staple: null, method: "steam", calories: 140, proteinG: 10, carbsG: 1, fatG: 10, tags: [], cuisine: "chinese" },
  { nameEn: "Pan-seared Shrimp", nameZh: "煎虾", protein: "shrimp", vegetables: [], seasonings: ["salt", "ginger"], staple: null, method: "griddle-sear", calories: 180, proteinG: 22, carbsG: 1, fatG: 8, tags: ["quick", "high-protein"], cuisine: "chinese" },
  { nameEn: "Beef Griddle Patties", nameZh: "牛肉煎饼", protein: "beef", vegetables: [], seasonings: ["salt", "green-onions", "sichuan-pepper"], staple: "flour", method: "griddle-sear", calories: 280, proteinG: 20, carbsG: 22, fatG: 14, tags: [], cuisine: "chinese" },
  { nameEn: "Scallion Pancakes", nameZh: "葱油饼", protein: null, vegetables: [], seasonings: ["scallions", "salt"], staple: "flour", method: "griddle-pancake", calories: 220, proteinG: 5, carbsG: 32, fatG: 8, tags: [], cuisine: "chinese" },
  { nameEn: "Egg Pancake Wrap", nameZh: "鸡蛋饼", protein: "eggs", vegetables: [], seasonings: ["salt", "green-onions"], staple: "flour", method: "griddle-pancake", calories: 200, proteinG: 10, carbsG: 28, fatG: 7, tags: ["quick"], cuisine: "chinese" },
  { nameEn: "Steamed Rice", nameZh: "米饭", protein: null, vegetables: [], seasonings: [], staple: "rice", method: "steam", calories: 200, proteinG: 4, carbsG: 44, fatG: 0, tags: [], cuisine: "chinese" },
  { nameEn: "Noodle Soup", nameZh: "汤面", protein: null, vegetables: ["leafy-greens"], seasonings: ["salt", "soy-sauce", "green-onions"], staple: "noodles", method: "boil-soup", calories: 250, proteinG: 8, carbsG: 46, fatG: 3, tags: [], cuisine: "chinese" },

  // ── Chinese — Sichuan & regional
  { nameEn: "Mapo Tofu", nameZh: "麻婆豆腐", protein: "tofu", vegetables: [], seasonings: ["doubanjiang", "sichuan-pepper", "garlic", "starch"], staple: null, method: "braise", calories: 200, proteinG: 14, carbsG: 10, fatG: 12, tags: [], cuisine: "chinese" },
  { nameEn: "Kung Pao Chicken", nameZh: "宫保鸡丁", protein: "chicken-breast", vegetables: ["bell-pepper"], seasonings: ["soy-sauce", "vinegar", "chili-flakes", "starch", "garlic"], staple: null, method: "stir-fry", calories: 260, proteinG: 26, carbsG: 12, fatG: 12, tags: ["high-protein"], cuisine: "chinese" },
  { nameEn: "Fish-fragrant Eggplant", nameZh: "鱼香茄子", protein: null, vegetables: ["eggplant"], seasonings: ["doubanjiang", "soy-sauce", "vinegar", "sugar", "garlic", "ginger", "starch"], staple: null, method: "stir-fry", calories: 140, proteinG: 3, carbsG: 16, fatG: 7, tags: [], cuisine: "chinese" },
  { nameEn: "Twice-cooked Pork", nameZh: "回锅肉", protein: "pork-belly", vegetables: ["bell-pepper", "cabbage"], seasonings: ["doubanjiang", "soy-sauce", "garlic"], staple: null, method: "stir-fry", calories: 310, proteinG: 18, carbsG: 6, fatG: 24, tags: [], cuisine: "chinese" },
  { nameEn: "Hot & Sour Shredded Potato", nameZh: "酸辣土豆丝", protein: null, vegetables: ["potatoes"], seasonings: ["vinegar", "chili-flakes", "sichuan-pepper", "garlic"], staple: null, method: "stir-fry", calories: 110, proteinG: 2, carbsG: 22, fatG: 3, tags: ["quick", "light"], cuisine: "chinese" },
  { nameEn: "Dry-fried Green Beans", nameZh: "干煸四季豆", protein: null, vegetables: ["green-beans"], seasonings: ["garlic", "chili-flakes", "soy-sauce"], staple: null, method: "stir-fry", calories: 80, proteinG: 3, carbsG: 10, fatG: 3, tags: ["quick", "light"], cuisine: "chinese" },
  { nameEn: "Steamed Pork Ribs with Rice Flour", nameZh: "粉蒸排骨", protein: "pork-ribs", vegetables: [], seasonings: ["five-spice", "soy-sauce", "ginger"], staple: "rice", method: "steam", calories: 300, proteinG: 22, carbsG: 18, fatG: 16, tags: [], cuisine: "chinese" },
  { nameEn: "Blanched Bok Choy", nameZh: "白灼菜心", protein: null, vegetables: ["bok-choy"], seasonings: ["oyster-sauce", "garlic", "sesame-oil"], staple: null, method: "blanch", calories: 45, proteinG: 2, carbsG: 5, fatG: 2, tags: ["quick", "light"], cuisine: "chinese" },
  { nameEn: "Pork & Bamboo Shoot Stir-fry", nameZh: "笋炒肉", protein: "lean-pork", vegetables: ["bamboo-shoots"], seasonings: ["soy-sauce", "ginger", "starch"], staple: null, method: "stir-fry", calories: 200, proteinG: 18, carbsG: 6, fatG: 11, tags: [], cuisine: "chinese" },
  { nameEn: "Lotus Root Pork Soup", nameZh: "莲藕排骨汤", protein: "pork-ribs", vegetables: ["lotus-root"], seasonings: ["salt", "ginger", "scallions"], staple: null, method: "boil-soup", calories: 220, proteinG: 18, carbsG: 16, fatG: 10, tags: [], cuisine: "chinese" },
  { nameEn: "Stir-fried Snow Peas & Shrimp", nameZh: "荷兰豆炒虾仁", protein: "shrimp", vegetables: ["snow-peas"], seasonings: ["salt", "ginger", "starch"], staple: null, method: "stir-fry", calories: 180, proteinG: 22, carbsG: 8, fatG: 6, tags: ["quick", "high-protein"], cuisine: "chinese" },
  { nameEn: "Steamed Chicken Wings", nameZh: "蒸鸡翅", protein: "chicken-wings", vegetables: [], seasonings: ["soy-sauce", "ginger", "garlic", "rice-wine"], staple: null, method: "steam", calories: 260, proteinG: 20, carbsG: 2, fatG: 18, tags: [], cuisine: "chinese" },
  { nameEn: "Bitter Melon & Egg", nameZh: "苦瓜炒蛋", protein: "eggs", vegetables: ["bitter-melon"], seasonings: ["salt", "garlic"], staple: null, method: "stir-fry", calories: 140, proteinG: 10, carbsG: 6, fatG: 8, tags: ["light"], cuisine: "chinese" },
  { nameEn: "Braised Pork Belly", nameZh: "红烧肉", protein: "pork-belly", vegetables: [], seasonings: ["soy-sauce", "sugar", "star-anise", "ginger", "rice-wine"], staple: null, method: "braise", calories: 380, proteinG: 16, carbsG: 8, fatG: 32, tags: [], cuisine: "chinese" },
  { nameEn: "Stir-fried Edamame & Pork", nameZh: "毛豆炒肉末", protein: "ground-pork", vegetables: ["edamame"], seasonings: ["soy-sauce", "garlic", "starch"], staple: null, method: "stir-fry", calories: 230, proteinG: 20, carbsG: 10, fatG: 12, tags: [], cuisine: "chinese" },
  { nameEn: "Vermicelli Cabbage Stir-fry", nameZh: "包菜炒粉丝", protein: null, vegetables: ["cabbage"], seasonings: ["soy-sauce", "vinegar", "garlic"], staple: "vermicelli", method: "stir-fry", calories: 150, proteinG: 3, carbsG: 28, fatG: 3, tags: ["quick"], cuisine: "chinese" },
  { nameEn: "Egg Drop Seaweed Soup", nameZh: "紫菜蛋花汤", protein: "eggs", vegetables: ["seaweed"], seasonings: ["salt", "sesame-oil"], staple: null, method: "boil-soup", calories: 60, proteinG: 5, carbsG: 4, fatG: 3, tags: ["quick", "light"], cuisine: "chinese" },
  { nameEn: "Smashed Cucumber Salad", nameZh: "拍黄瓜", protein: null, vegetables: ["cucumber"], seasonings: ["garlic", "vinegar", "sesame-oil", "chili-flakes"], staple: null, method: "blanch", calories: 40, proteinG: 1, carbsG: 5, fatG: 2, tags: ["quick", "light"], cuisine: "chinese" },

  // ═══════════════════════════════════════════════════════════════════════════
  // JAPANESE
  // ═══════════════════════════════════════════════════════════════════════════
  { nameEn: "Teriyaki Salmon", nameZh: "照烧三文鱼", protein: "salmon", vegetables: [], seasonings: ["soy-sauce", "mirin", "sugar", "ginger"], staple: null, method: "griddle-sear", calories: 280, proteinG: 30, carbsG: 8, fatG: 14, tags: ["high-protein"], cuisine: "japanese" },
  { nameEn: "Miso Cod", nameZh: "味噌鳕鱼", protein: "cod", vegetables: [], seasonings: ["miso", "mirin", "sake", "sugar"], staple: null, method: "roast", calories: 240, proteinG: 28, carbsG: 10, fatG: 8, tags: ["high-protein"], cuisine: "japanese" },
  { nameEn: "Chicken Katsu", nameZh: "炸鸡排", protein: "chicken-breast", vegetables: [], seasonings: ["salt", "black-pepper"], staple: "flour", method: "deep-fry", calories: 350, proteinG: 28, carbsG: 18, fatG: 20, tags: [], cuisine: "japanese" },
  { nameEn: "Miso Soup", nameZh: "味噌汤", protein: "tofu", vegetables: ["seaweed"], seasonings: ["miso", "green-onions"], staple: null, method: "boil-soup", calories: 60, proteinG: 5, carbsG: 4, fatG: 2, tags: ["quick", "light"], cuisine: "japanese" },
  { nameEn: "Yakitori Chicken", nameZh: "日式烤鸡串", protein: "chicken-thigh", vegetables: ["green-onions"], seasonings: ["soy-sauce", "mirin", "sake", "sugar"], staple: null, method: "griddle-sear", calories: 220, proteinG: 22, carbsG: 6, fatG: 12, tags: [], cuisine: "japanese" },
  { nameEn: "Ginger Pork (Shogayaki)", nameZh: "姜汁猪肉", protein: "lean-pork", vegetables: ["onion"], seasonings: ["soy-sauce", "mirin", "ginger"], staple: null, method: "griddle-sear", calories: 240, proteinG: 22, carbsG: 8, fatG: 12, tags: [], cuisine: "japanese" },
  { nameEn: "Japanese Beef Curry Rice", nameZh: "日式牛肉咖喱饭", protein: "beef", vegetables: ["potatoes", "carrots", "onion"], seasonings: ["curry-powder", "soy-sauce"], staple: "rice", method: "braise", calories: 420, proteinG: 24, carbsG: 52, fatG: 14, tags: [], cuisine: "japanese" },
  { nameEn: "Oyakodon (Chicken & Egg Rice)", nameZh: "亲子丼", protein: "chicken-thigh", vegetables: ["onion"], seasonings: ["soy-sauce", "mirin", "sugar"], staple: "rice", method: "boil-soup", calories: 400, proteinG: 26, carbsG: 50, fatG: 12, tags: [], cuisine: "japanese" },
  { nameEn: "Udon Noodle Soup", nameZh: "乌冬面", protein: null, vegetables: ["green-onions"], seasonings: ["soy-sauce", "mirin", "salt"], staple: "udon", method: "boil-soup", calories: 280, proteinG: 8, carbsG: 50, fatG: 3, tags: [], cuisine: "japanese" },
  { nameEn: "Soba with Dipping Sauce", nameZh: "荞麦冷面", protein: null, vegetables: ["green-onions"], seasonings: ["soy-sauce", "mirin", "wasabi"], staple: "soba", method: "boil-soup", calories: 260, proteinG: 10, carbsG: 48, fatG: 2, tags: ["light"], cuisine: "japanese" },
  { nameEn: "Spinach Goma-ae", nameZh: "芝麻菠菜", protein: null, vegetables: ["spinach"], seasonings: ["soy-sauce", "sugar", "sesame-oil"], staple: null, method: "blanch", calories: 60, proteinG: 4, carbsG: 6, fatG: 3, tags: ["quick", "light"], cuisine: "japanese" },
  { nameEn: "Shrimp Tempura", nameZh: "天妇罗虾", protein: "shrimp", vegetables: [], seasonings: ["salt"], staple: "flour", method: "deep-fry", calories: 280, proteinG: 18, carbsG: 20, fatG: 16, tags: [], cuisine: "japanese" },

  // ═══════════════════════════════════════════════════════════════════════════
  // KOREAN
  // ═══════════════════════════════════════════════════════════════════════════
  { nameEn: "Bulgogi (Korean BBQ Beef)", nameZh: "韩式烤牛肉", protein: "beef", vegetables: ["onion"], seasonings: ["soy-sauce", "sugar", "sesame-oil", "garlic", "black-pepper"], staple: null, method: "griddle-sear", calories: 270, proteinG: 26, carbsG: 10, fatG: 14, tags: ["high-protein"], cuisine: "korean" },
  { nameEn: "Kimchi Fried Rice", nameZh: "泡菜炒饭", protein: "eggs", vegetables: ["kimchi"], seasonings: ["sesame-oil", "gochujang"], staple: "rice", method: "stir-fry", calories: 350, proteinG: 12, carbsG: 50, fatG: 12, tags: ["quick"], cuisine: "korean" },
  { nameEn: "Kimchi Jjigae (Pork Stew)", nameZh: "泡菜猪肉锅", protein: "pork-belly", vegetables: ["kimchi"], seasonings: ["gochujang", "garlic", "sesame-oil"], staple: null, method: "boil-soup", calories: 280, proteinG: 16, carbsG: 10, fatG: 20, tags: [], cuisine: "korean" },
  { nameEn: "Korean Spicy Tofu Soup", nameZh: "韩式豆腐锅", protein: "tofu", vegetables: ["onion"], seasonings: ["gochujang", "garlic", "sesame-oil", "chili-flakes"], staple: null, method: "boil-soup", calories: 160, proteinG: 12, carbsG: 8, fatG: 8, tags: [], cuisine: "korean" },
  { nameEn: "Japchae (Glass Noodles)", nameZh: "杂菜", protein: "beef", vegetables: ["spinach", "carrots", "mushrooms"], seasonings: ["soy-sauce", "sesame-oil", "sugar", "garlic"], staple: "potato-starch-noodles", method: "stir-fry", calories: 300, proteinG: 16, carbsG: 38, fatG: 10, tags: [], cuisine: "korean" },
  { nameEn: "Korean Fried Chicken Wings", nameZh: "韩式炸鸡", protein: "chicken-wings", vegetables: [], seasonings: ["gochujang", "garlic", "sugar", "soy-sauce"], staple: "starch", method: "deep-fry", calories: 380, proteinG: 22, carbsG: 18, fatG: 24, tags: [], cuisine: "korean" },
  { nameEn: "Bibimbap Rice Bowl", nameZh: "石锅拌饭", protein: "beef", vegetables: ["spinach", "carrots", "bean-sprouts"], seasonings: ["gochujang", "sesame-oil", "garlic"], staple: "rice", method: "stir-fry", calories: 450, proteinG: 22, carbsG: 56, fatG: 14, tags: [], cuisine: "korean" },
  { nameEn: "Korean Radish Soup", nameZh: "萝卜汤", protein: null, vegetables: ["radish"], seasonings: ["garlic", "salt", "sesame-oil"], staple: null, method: "boil-soup", calories: 50, proteinG: 2, carbsG: 8, fatG: 2, tags: ["light", "quick"], cuisine: "korean" },

  // ═══════════════════════════════════════════════════════════════════════════
  // THAI
  // ═══════════════════════════════════════════════════════════════════════════
  { nameEn: "Pad Thai Shrimp", nameZh: "泰式炒河粉", protein: "shrimp", vegetables: ["bean-sprouts"], seasonings: ["fish-sauce", "tamarind", "sugar", "garlic", "chili-flakes", "lime"], staple: "rice-noodles", method: "stir-fry", calories: 380, proteinG: 22, carbsG: 48, fatG: 12, tags: [], cuisine: "thai" },
  { nameEn: "Green Curry Chicken", nameZh: "泰式绿咖喱鸡", protein: "chicken-thigh", vegetables: ["bell-pepper", "bamboo-shoots"], seasonings: ["coconut-milk", "curry-powder", "fish-sauce", "basil", "lemongrass"], staple: null, method: "boil-soup", calories: 320, proteinG: 24, carbsG: 10, fatG: 22, tags: [], cuisine: "thai" },
  { nameEn: "Thai Basil Pork", nameZh: "打抛猪肉", protein: "ground-pork", vegetables: ["bell-pepper"], seasonings: ["basil", "fish-sauce", "garlic", "chili-flakes", "sugar"], staple: null, method: "stir-fry", calories: 240, proteinG: 20, carbsG: 6, fatG: 16, tags: ["quick"], cuisine: "thai" },
  { nameEn: "Tom Yum Shrimp Soup", nameZh: "冬阴功汤", protein: "shrimp", vegetables: ["mushrooms"], seasonings: ["lemongrass", "galangal", "kaffir-lime-leaf", "fish-sauce", "lime", "chili-flakes"], staple: null, method: "boil-soup", calories: 150, proteinG: 18, carbsG: 8, fatG: 5, tags: ["light"], cuisine: "thai" },
  { nameEn: "Thai Coconut Chicken Soup", nameZh: "椰奶鸡汤", protein: "chicken-breast", vegetables: ["mushrooms"], seasonings: ["coconut-milk", "lemongrass", "galangal", "fish-sauce", "lime"], staple: null, method: "boil-soup", calories: 260, proteinG: 22, carbsG: 6, fatG: 16, tags: [], cuisine: "thai" },
  { nameEn: "Pineapple Fried Rice", nameZh: "菠萝炒饭", protein: "shrimp", vegetables: ["onion", "peas"], seasonings: ["curry-powder", "fish-sauce", "sugar", "soy-sauce"], staple: "rice", method: "stir-fry", calories: 380, proteinG: 18, carbsG: 54, fatG: 10, tags: [], cuisine: "thai" },
  { nameEn: "Thai Stir-fried Morning Glory", nameZh: "泰式炒空心菜", protein: null, vegetables: ["leafy-greens"], seasonings: ["garlic", "chili-flakes", "fish-sauce", "oyster-sauce"], staple: null, method: "stir-fry", calories: 60, proteinG: 3, carbsG: 6, fatG: 3, tags: ["quick", "light"], cuisine: "thai" },

  // ═══════════════════════════════════════════════════════════════════════════
  // INDIAN
  // ═══════════════════════════════════════════════════════════════════════════
  { nameEn: "Butter Chicken", nameZh: "黄油鸡", protein: "chicken-thigh", vegetables: [], seasonings: ["butter", "cream", "tomato-paste", "cumin", "turmeric", "garlic", "ginger"], staple: null, method: "braise", calories: 350, proteinG: 26, carbsG: 10, fatG: 24, tags: [], cuisine: "indian" },
  { nameEn: "Palak Paneer", nameZh: "菠菜奶酪", protein: "paneer", vegetables: ["spinach"], seasonings: ["cumin", "turmeric", "garlic", "ginger", "cream"], staple: null, method: "braise", calories: 280, proteinG: 16, carbsG: 8, fatG: 20, tags: [], cuisine: "indian" },
  { nameEn: "Dal Tadka (Lentil Curry)", nameZh: "印度扁豆咖喱", protein: null, vegetables: ["onion", "tomatoes"], seasonings: ["cumin", "turmeric", "garlic", "ghee", "chili-flakes"], staple: null, method: "boil-soup", calories: 180, proteinG: 10, carbsG: 26, fatG: 5, tags: ["light"], cuisine: "indian" },
  { nameEn: "Tandoori Chicken", nameZh: "坦都里烤鸡", protein: "chicken-thigh", vegetables: [], seasonings: ["yogurt", "cumin", "turmeric", "paprika", "garlic", "ginger", "lemon"], staple: null, method: "roast", calories: 260, proteinG: 28, carbsG: 4, fatG: 14, tags: ["high-protein"], cuisine: "indian" },
  { nameEn: "Chicken Tikka Masala", nameZh: "提卡马萨拉鸡", protein: "chicken-breast", vegetables: ["onion"], seasonings: ["yogurt", "cream", "tomato-paste", "cumin", "turmeric", "garlic", "ginger"], staple: null, method: "braise", calories: 340, proteinG: 28, carbsG: 12, fatG: 20, tags: [], cuisine: "indian" },
  { nameEn: "Aloo Gobi (Potato Cauliflower)", nameZh: "土豆花菜咖喱", protein: null, vegetables: ["potatoes", "cauliflower"], seasonings: ["cumin", "turmeric", "garlic", "ginger"], staple: null, method: "stir-fry", calories: 160, proteinG: 4, carbsG: 24, fatG: 6, tags: ["light"], cuisine: "indian" },
  { nameEn: "Lamb Curry", nameZh: "咖喱羊肉", protein: "lamb", vegetables: ["onion", "tomatoes"], seasonings: ["curry-powder", "cumin", "garlic", "ginger", "coconut-milk"], staple: null, method: "braise", calories: 360, proteinG: 28, carbsG: 10, fatG: 24, tags: ["high-protein"], cuisine: "indian" },
  { nameEn: "Naan Bread", nameZh: "印度烤饼", protein: null, vegetables: [], seasonings: ["yogurt", "salt", "garlic", "butter"], staple: "flour", method: "griddle-pancake", calories: 260, proteinG: 7, carbsG: 40, fatG: 8, tags: [], cuisine: "indian" },
  { nameEn: "Shrimp Biryani", nameZh: "虾仁手抓饭", protein: "shrimp", vegetables: ["onion"], seasonings: ["cumin", "turmeric", "garlic", "ginger", "ghee"], staple: "rice", method: "rice-cooker-stew", calories: 400, proteinG: 22, carbsG: 52, fatG: 12, tags: [], cuisine: "indian" },
  { nameEn: "Raita (Yogurt Side)", nameZh: "酸奶沙拉", protein: null, vegetables: ["cucumber"], seasonings: ["yogurt", "cumin", "salt", "cilantro"], staple: null, method: "blanch", calories: 50, proteinG: 3, carbsG: 5, fatG: 2, tags: ["quick", "light"], cuisine: "indian" },

  // ═══════════════════════════════════════════════════════════════════════════
  // ITALIAN / MEDITERRANEAN
  // ═══════════════════════════════════════════════════════════════════════════
  { nameEn: "Spaghetti Bolognese", nameZh: "意大利肉酱面", protein: "ground-beef", vegetables: ["onion", "carrots"], seasonings: ["tomato-paste", "garlic", "oregano", "olive-oil", "salt"], staple: "pasta", method: "boil-soup", calories: 420, proteinG: 24, carbsG: 50, fatG: 14, tags: [], cuisine: "italian" },
  { nameEn: "Pasta Pomodoro", nameZh: "番茄意面", protein: null, vegetables: ["tomatoes"], seasonings: ["garlic", "basil", "olive-oil", "salt"], staple: "pasta", method: "boil-soup", calories: 340, proteinG: 10, carbsG: 56, fatG: 10, tags: [], cuisine: "italian" },
  { nameEn: "Grilled Salmon with Lemon", nameZh: "柠檬烤三文鱼", protein: "salmon", vegetables: [], seasonings: ["lemon", "olive-oil", "salt", "black-pepper", "dill"], staple: null, method: "roast", calories: 280, proteinG: 32, carbsG: 2, fatG: 16, tags: ["high-protein"], cuisine: "mediterranean" },
  { nameEn: "Chicken Piccata", nameZh: "意式柠檬鸡", protein: "chicken-breast", vegetables: [], seasonings: ["lemon", "butter", "garlic", "parsley", "salt"], staple: null, method: "griddle-sear", calories: 260, proteinG: 28, carbsG: 4, fatG: 14, tags: ["high-protein"], cuisine: "italian" },
  { nameEn: "Caprese Salad Style", nameZh: "意式番茄沙拉", protein: null, vegetables: ["tomatoes"], seasonings: ["olive-oil", "basil", "salt", "balsamic-vinegar"], staple: null, method: "blanch", calories: 80, proteinG: 3, carbsG: 6, fatG: 5, tags: ["quick", "light"], cuisine: "italian" },
  { nameEn: "Minestrone Soup", nameZh: "意式蔬菜汤", protein: null, vegetables: ["carrots", "celery", "tomatoes", "zucchini"], seasonings: ["garlic", "oregano", "olive-oil", "salt"], staple: "pasta", method: "boil-soup", calories: 180, proteinG: 6, carbsG: 28, fatG: 5, tags: ["light"], cuisine: "italian" },
  { nameEn: "Pan-seared Cod Mediterranean", nameZh: "地中海煎鳕鱼", protein: "cod", vegetables: ["tomatoes"], seasonings: ["olive-oil", "garlic", "lemon", "oregano"], staple: null, method: "griddle-sear", calories: 220, proteinG: 28, carbsG: 6, fatG: 8, tags: ["high-protein", "light"], cuisine: "mediterranean" },
  { nameEn: "Roasted Vegetables Medley", nameZh: "烤蔬菜拼盘", protein: null, vegetables: ["zucchini", "bell-pepper", "onion"], seasonings: ["olive-oil", "garlic", "oregano", "salt", "black-pepper"], staple: null, method: "roast", calories: 120, proteinG: 3, carbsG: 14, fatG: 6, tags: ["light"], cuisine: "mediterranean" },
  { nameEn: "Garlic Shrimp Pasta", nameZh: "蒜香虾意面", protein: "shrimp", vegetables: [], seasonings: ["garlic", "olive-oil", "chili-flakes", "lemon", "parsley"], staple: "pasta", method: "stir-fry", calories: 400, proteinG: 26, carbsG: 48, fatG: 12, tags: [], cuisine: "italian" },
  { nameEn: "Lamb Chops Rosemary", nameZh: "迷迭香烤羊排", protein: "lamb", vegetables: [], seasonings: ["rosemary", "garlic", "olive-oil", "salt", "black-pepper"], staple: null, method: "roast", calories: 320, proteinG: 28, carbsG: 0, fatG: 22, tags: ["high-protein"], cuisine: "mediterranean" },
  { nameEn: "Couscous Vegetable Bowl", nameZh: "古斯古斯蔬菜碗", protein: null, vegetables: ["zucchini", "bell-pepper", "onion"], seasonings: ["olive-oil", "cumin", "lemon", "salt"], staple: "couscous", method: "boil-soup", calories: 280, proteinG: 8, carbsG: 44, fatG: 8, tags: ["light"], cuisine: "mediterranean" },
  { nameEn: "Italian Herb Chicken Roast", nameZh: "意式香草烤鸡", protein: "chicken-thigh", vegetables: ["potatoes"], seasonings: ["rosemary", "thyme", "garlic", "olive-oil", "lemon"], staple: null, method: "roast", calories: 350, proteinG: 28, carbsG: 18, fatG: 18, tags: [], cuisine: "italian" },

  // ═══════════════════════════════════════════════════════════════════════════
  // MEXICAN / LATIN
  // ═══════════════════════════════════════════════════════════════════════════
  { nameEn: "Chicken Burrito Bowl", nameZh: "墨式鸡肉碗", protein: "chicken-breast", vegetables: ["bell-pepper", "onion"], seasonings: ["cumin", "paprika", "garlic", "lime", "cilantro"], staple: "rice", method: "stir-fry", calories: 420, proteinG: 30, carbsG: 48, fatG: 12, tags: [], cuisine: "mexican" },
  { nameEn: "Beef Tacos", nameZh: "牛肉塔可", protein: "ground-beef", vegetables: ["tomatoes", "lettuce"], seasonings: ["cumin", "paprika", "garlic", "salt", "lime"], staple: "tortilla", method: "griddle-sear", calories: 350, proteinG: 22, carbsG: 28, fatG: 18, tags: [], cuisine: "mexican" },
  { nameEn: "Shrimp Fajitas", nameZh: "法士达虾", protein: "shrimp", vegetables: ["bell-pepper", "onion"], seasonings: ["cumin", "paprika", "lime", "garlic"], staple: "tortilla", method: "griddle-sear", calories: 320, proteinG: 24, carbsG: 30, fatG: 12, tags: [], cuisine: "mexican" },
  { nameEn: "Quesadilla", nameZh: "奶酪饼", protein: "chicken-breast", vegetables: ["bell-pepper"], seasonings: ["cheese", "cumin", "salt"], staple: "tortilla", method: "griddle-pancake", calories: 380, proteinG: 26, carbsG: 32, fatG: 16, tags: [], cuisine: "mexican" },
  { nameEn: "Pico de Gallo Salsa", nameZh: "墨式番茄沙拉", protein: null, vegetables: ["tomatoes", "onion"], seasonings: ["lime", "cilantro", "salt", "chili-flakes"], staple: null, method: "blanch", calories: 30, proteinG: 1, carbsG: 6, fatG: 0, tags: ["quick", "light"], cuisine: "mexican" },
  { nameEn: "Mexican Rice", nameZh: "墨式番茄饭", protein: null, vegetables: ["tomatoes", "onion"], seasonings: ["cumin", "garlic", "salt", "tomato-paste"], staple: "rice", method: "rice-cooker-stew", calories: 250, proteinG: 5, carbsG: 48, fatG: 4, tags: [], cuisine: "mexican" },
  { nameEn: "Black Bean Soup", nameZh: "黑豆汤", protein: null, vegetables: ["onion", "tomatoes"], seasonings: ["cumin", "garlic", "lime", "cilantro", "salt"], staple: null, method: "boil-soup", calories: 160, proteinG: 10, carbsG: 26, fatG: 2, tags: ["light"], cuisine: "mexican" },

  // ═══════════════════════════════════════════════════════════════════════════
  // FRENCH
  // ═══════════════════════════════════════════════════════════════════════════
  { nameEn: "Coq au Vin (Braised Chicken)", nameZh: "红酒炖鸡", protein: "chicken-thigh", vegetables: ["mushrooms", "carrots", "onion"], seasonings: ["bay-leaf", "thyme", "garlic", "butter", "salt"], staple: null, method: "braise", calories: 340, proteinG: 26, carbsG: 10, fatG: 20, tags: [], cuisine: "french" },
  { nameEn: "French Onion Soup", nameZh: "法式洋葱汤", protein: null, vegetables: ["onion"], seasonings: ["butter", "bay-leaf", "thyme", "salt", "cheese"], staple: "bread", method: "boil-soup", calories: 240, proteinG: 8, carbsG: 28, fatG: 10, tags: [], cuisine: "french" },
  { nameEn: "Ratatouille", nameZh: "普罗旺斯蔬菜杂烩", protein: null, vegetables: ["eggplant", "zucchini", "bell-pepper", "tomatoes"], seasonings: ["garlic", "oregano", "olive-oil", "basil"], staple: null, method: "braise", calories: 120, proteinG: 3, carbsG: 16, fatG: 5, tags: ["light"], cuisine: "french" },
  { nameEn: "Duck Confit Style", nameZh: "油封鸭", protein: "duck", vegetables: [], seasonings: ["salt", "black-pepper", "thyme", "garlic", "bay-leaf"], staple: null, method: "rice-cooker-stew", calories: 360, proteinG: 24, carbsG: 0, fatG: 28, tags: [], cuisine: "french" },
  { nameEn: "Salmon en Croûte", nameZh: "酥皮烤三文鱼", protein: "salmon", vegetables: ["spinach"], seasonings: ["butter", "lemon", "dill", "salt"], staple: "flour", method: "roast", calories: 380, proteinG: 30, carbsG: 20, fatG: 20, tags: [], cuisine: "french" },
  { nameEn: "Gratin Dauphinois", nameZh: "法式焗土豆", protein: null, vegetables: ["potatoes"], seasonings: ["cream", "garlic", "butter", "salt", "black-pepper"], staple: null, method: "roast", calories: 240, proteinG: 5, carbsG: 28, fatG: 12, tags: [], cuisine: "french" },
  { nameEn: "Niçoise Salad", nameZh: "尼斯沙拉", protein: "tuna", vegetables: ["lettuce", "tomatoes", "green-beans"], seasonings: ["olive-oil", "lemon", "mustard", "salt"], staple: null, method: "blanch", calories: 220, proteinG: 22, carbsG: 10, fatG: 10, tags: ["light", "high-protein"], cuisine: "french" },

  // ═══════════════════════════════════════════════════════════════════════════
  // AMERICAN / WESTERN COMFORT
  // ═══════════════════════════════════════════════════════════════════════════
  { nameEn: "Classic Beef Burger Patty", nameZh: "美式牛肉饼", protein: "ground-beef", vegetables: ["lettuce", "tomatoes"], seasonings: ["salt", "black-pepper", "mustard"], staple: "bread", method: "griddle-sear", calories: 400, proteinG: 26, carbsG: 30, fatG: 22, tags: [], cuisine: "american" },
  { nameEn: "BBQ Chicken Thighs", nameZh: "烧烤鸡腿", protein: "chicken-thigh", vegetables: [], seasonings: ["paprika", "garlic", "honey", "soy-sauce", "black-pepper"], staple: null, method: "roast", calories: 280, proteinG: 24, carbsG: 8, fatG: 16, tags: [], cuisine: "american" },
  { nameEn: "Mac & Cheese", nameZh: "芝士通心粉", protein: null, vegetables: [], seasonings: ["cheese", "butter", "cream", "salt", "black-pepper"], staple: "pasta", method: "boil-soup", calories: 400, proteinG: 14, carbsG: 44, fatG: 18, tags: [], cuisine: "american" },
  { nameEn: "Clam Chowder", nameZh: "蛤蜊浓汤", protein: "clams", vegetables: ["potatoes", "onion", "celery"], seasonings: ["butter", "cream", "bay-leaf", "salt"], staple: null, method: "boil-soup", calories: 260, proteinG: 14, carbsG: 22, fatG: 14, tags: [], cuisine: "american" },
  { nameEn: "Grilled Cheese Sandwich", nameZh: "烤芝士三明治", protein: null, vegetables: [], seasonings: ["cheese", "butter"], staple: "bread", method: "griddle-sear", calories: 350, proteinG: 12, carbsG: 30, fatG: 20, tags: ["quick"], cuisine: "american" },
  { nameEn: "BLT Bacon Lettuce", nameZh: "培根生菜三明治", protein: "bacon", vegetables: ["lettuce", "tomatoes"], seasonings: ["salt", "black-pepper"], staple: "bread", method: "griddle-sear", calories: 360, proteinG: 16, carbsG: 28, fatG: 20, tags: ["quick"], cuisine: "american" },
  { nameEn: "Air-fried Chicken Tenders", nameZh: "空气炸鸡柳", protein: "chicken-breast", vegetables: [], seasonings: ["paprika", "garlic", "salt", "black-pepper"], staple: "flour", method: "air-fry", calories: 260, proteinG: 28, carbsG: 14, fatG: 10, tags: ["high-protein"], cuisine: "american" },
  { nameEn: "Air-fried Sweet Potato Fries", nameZh: "空气炸红薯条", protein: null, vegetables: ["sweet-potato"], seasonings: ["salt", "paprika", "olive-oil"], staple: null, method: "air-fry", calories: 160, proteinG: 2, carbsG: 30, fatG: 4, tags: ["light"], cuisine: "american" },
  { nameEn: "Caesar Salad", nameZh: "凯撒沙拉", protein: null, vegetables: ["lettuce"], seasonings: ["lemon", "garlic", "olive-oil", "cheese", "black-pepper"], staple: "bread", method: "blanch", calories: 180, proteinG: 6, carbsG: 14, fatG: 12, tags: ["light"], cuisine: "american" },
  { nameEn: "Baked Salmon with Asparagus", nameZh: "烤三文鱼芦笋", protein: "salmon", vegetables: ["asparagus"], seasonings: ["olive-oil", "lemon", "garlic", "salt", "black-pepper"], staple: null, method: "roast", calories: 300, proteinG: 32, carbsG: 6, fatG: 16, tags: ["high-protein", "light"], cuisine: "american" },

  // ═══════════════════════════════════════════════════════════════════════════
  // MIDDLE EASTERN / TURKISH
  // ═══════════════════════════════════════════════════════════════════════════
  { nameEn: "Chicken Shawarma Bowl", nameZh: "鸡肉沙瓦尔玛碗", protein: "chicken-thigh", vegetables: ["onion", "tomatoes"], seasonings: ["cumin", "paprika", "turmeric", "garlic", "yogurt", "lemon"], staple: "rice", method: "griddle-sear", calories: 420, proteinG: 28, carbsG: 44, fatG: 14, tags: [], cuisine: "middle-eastern" },
  { nameEn: "Lamb Kofta", nameZh: "烤羊肉丸", protein: "lamb", vegetables: [], seasonings: ["cumin", "paprika", "garlic", "parsley", "onion", "salt"], staple: null, method: "griddle-sear", calories: 280, proteinG: 24, carbsG: 4, fatG: 18, tags: ["high-protein"], cuisine: "middle-eastern" },
  { nameEn: "Falafel (Baked)", nameZh: "烤法拉费", protein: null, vegetables: ["onion"], seasonings: ["cumin", "garlic", "parsley", "cilantro", "salt"], staple: "flour", method: "air-fry", calories: 200, proteinG: 8, carbsG: 24, fatG: 8, tags: [], cuisine: "middle-eastern" },
  { nameEn: "Hummus Style Dip", nameZh: "鹰嘴豆泥", protein: null, vegetables: [], seasonings: ["tahini", "garlic", "lemon", "olive-oil", "cumin", "salt"], staple: null, method: "blanch", calories: 120, proteinG: 5, carbsG: 12, fatG: 6, tags: ["light"], cuisine: "middle-eastern" },
  { nameEn: "Pita Bread", nameZh: "皮塔饼", protein: null, vegetables: [], seasonings: ["salt", "olive-oil"], staple: "pita", method: "griddle-pancake", calories: 165, proteinG: 5, carbsG: 30, fatG: 2, tags: [], cuisine: "middle-eastern" },
  { nameEn: "Tabbouleh Salad", nameZh: "塔布勒沙拉", protein: null, vegetables: ["tomatoes", "cucumber"], seasonings: ["parsley", "lemon", "olive-oil", "salt"], staple: "couscous", method: "blanch", calories: 130, proteinG: 4, carbsG: 20, fatG: 4, tags: ["light", "quick"], cuisine: "middle-eastern" },

  // ═══════════════════════════════════════════════════════════════════════════
  // SOUTHEAST ASIAN (Vietnamese, etc.)
  // ═══════════════════════════════════════════════════════════════════════════
  { nameEn: "Vietnamese Pho Beef", nameZh: "越南牛肉河粉", protein: "beef", vegetables: ["bean-sprouts"], seasonings: ["star-anise", "ginger", "fish-sauce", "cilantro", "lime"], staple: "rice-noodles", method: "boil-soup", calories: 380, proteinG: 26, carbsG: 44, fatG: 10, tags: [], cuisine: "vietnamese" },
  { nameEn: "Banh Mi Pork", nameZh: "越南猪肉法棍", protein: "lean-pork", vegetables: ["carrots", "cucumber", "cilantro"], seasonings: ["fish-sauce", "vinegar", "sugar", "garlic", "chili-flakes"], staple: "bread", method: "griddle-sear", calories: 380, proteinG: 22, carbsG: 40, fatG: 14, tags: [], cuisine: "vietnamese" },
  { nameEn: "Vietnamese Spring Roll Bowl", nameZh: "越式春卷碗", protein: "shrimp", vegetables: ["lettuce", "carrots", "cucumber"], seasonings: ["fish-sauce", "lime", "sugar", "garlic", "chili-flakes"], staple: "vermicelli", method: "blanch", calories: 280, proteinG: 18, carbsG: 38, fatG: 6, tags: ["light"], cuisine: "vietnamese" },
  { nameEn: "Lemongrass Chicken", nameZh: "香茅鸡", protein: "chicken-thigh", vegetables: ["onion"], seasonings: ["lemongrass", "garlic", "fish-sauce", "sugar", "chili-flakes"], staple: null, method: "stir-fry", calories: 240, proteinG: 24, carbsG: 6, fatG: 14, tags: [], cuisine: "vietnamese" },
  { nameEn: "Caramelized Pork Belly", nameZh: "越式焦糖肉", protein: "pork-belly", vegetables: [], seasonings: ["fish-sauce", "sugar", "garlic", "black-pepper", "shallot"], staple: null, method: "braise", calories: 340, proteinG: 16, carbsG: 10, fatG: 26, tags: [], cuisine: "vietnamese" },

  // ═══════════════════════════════════════════════════════════════════════════
  // GLOBAL QUICK / UNIVERSAL
  // ═══════════════════════════════════════════════════════════════════════════
  { nameEn: "Simple Omelet", nameZh: "煎蛋卷", protein: "eggs", vegetables: [], seasonings: ["salt", "black-pepper", "butter"], staple: null, method: "griddle-sear", calories: 180, proteinG: 12, carbsG: 1, fatG: 14, tags: ["quick"], cuisine: "global" },
  { nameEn: "Scrambled Eggs on Toast", nameZh: "吐司炒蛋", protein: "eggs", vegetables: [], seasonings: ["salt", "butter", "black-pepper"], staple: "bread", method: "griddle-sear", calories: 260, proteinG: 14, carbsG: 24, fatG: 14, tags: ["quick"], cuisine: "global" },
  { nameEn: "Egg Fried Rice", nameZh: "蛋炒饭", protein: "eggs", vegetables: ["green-onions"], seasonings: ["soy-sauce", "salt", "sesame-oil"], staple: "rice", method: "stir-fry", calories: 350, proteinG: 12, carbsG: 50, fatG: 10, tags: ["quick"], cuisine: "chinese" },
  { nameEn: "Garlic Butter Shrimp", nameZh: "蒜香黄油虾", protein: "shrimp", vegetables: [], seasonings: ["garlic", "butter", "lemon", "parsley", "salt"], staple: null, method: "griddle-sear", calories: 220, proteinG: 22, carbsG: 2, fatG: 14, tags: ["quick", "high-protein"], cuisine: "global" },
  { nameEn: "Pan-seared Salmon", nameZh: "香煎三文鱼", protein: "salmon", vegetables: [], seasonings: ["salt", "black-pepper", "olive-oil", "lemon"], staple: null, method: "griddle-sear", calories: 260, proteinG: 30, carbsG: 0, fatG: 16, tags: ["high-protein", "quick"], cuisine: "global" },
  { nameEn: "Stir-fried Tofu & Bell Pepper", nameZh: "彩椒炒豆腐", protein: "tofu", vegetables: ["bell-pepper"], seasonings: ["soy-sauce", "garlic", "sesame-oil"], staple: null, method: "stir-fry", calories: 160, proteinG: 12, carbsG: 8, fatG: 10, tags: [], cuisine: "global" },
  { nameEn: "Grilled Tuna Steak", nameZh: "煎金枪鱼排", protein: "tuna", vegetables: [], seasonings: ["soy-sauce", "ginger", "sesame-oil", "lime"], staple: null, method: "griddle-sear", calories: 220, proteinG: 34, carbsG: 2, fatG: 6, tags: ["high-protein"], cuisine: "global" },
  { nameEn: "Steamed Broccoli", nameZh: "清蒸西兰花", protein: null, vegetables: ["broccoli"], seasonings: ["salt", "olive-oil"], staple: null, method: "steam", calories: 50, proteinG: 4, carbsG: 6, fatG: 2, tags: ["quick", "light"], cuisine: "global" },
  { nameEn: "Steamed Asparagus", nameZh: "清蒸芦笋", protein: null, vegetables: ["asparagus"], seasonings: ["salt", "olive-oil", "lemon"], staple: null, method: "steam", calories: 40, proteinG: 3, carbsG: 4, fatG: 2, tags: ["quick", "light"], cuisine: "global" },
  { nameEn: "Roasted Cauliflower", nameZh: "烤花椰菜", protein: null, vegetables: ["cauliflower"], seasonings: ["olive-oil", "garlic", "cumin", "salt"], staple: null, method: "roast", calories: 100, proteinG: 4, carbsG: 10, fatG: 5, tags: ["light"], cuisine: "global" },
  { nameEn: "Garlic Sautéed Spinach", nameZh: "蒜炒菠菜", protein: null, vegetables: ["spinach"], seasonings: ["garlic", "olive-oil", "salt"], staple: null, method: "stir-fry", calories: 55, proteinG: 3, carbsG: 4, fatG: 3, tags: ["quick", "light"], cuisine: "global" },
  { nameEn: "Honey Glazed Carrots", nameZh: "蜂蜜胡萝卜", protein: null, vegetables: ["carrots"], seasonings: ["honey", "butter", "salt"], staple: null, method: "stir-fry", calories: 90, proteinG: 1, carbsG: 16, fatG: 3, tags: ["quick", "light"], cuisine: "global" },
  { nameEn: "Mashed Sweet Potato", nameZh: "红薯泥", protein: null, vegetables: ["sweet-potato"], seasonings: ["butter", "salt", "cinnamon"], staple: null, method: "boil-soup", calories: 140, proteinG: 2, carbsG: 26, fatG: 3, tags: ["light"], cuisine: "global" },
  { nameEn: "Sautéed Mushrooms", nameZh: "煎蘑菇", protein: null, vegetables: ["mushrooms"], seasonings: ["garlic", "butter", "thyme", "salt"], staple: null, method: "griddle-sear", calories: 80, proteinG: 3, carbsG: 4, fatG: 5, tags: ["quick", "light"], cuisine: "global" },
  { nameEn: "Zucchini Stir-fry", nameZh: "炒西葫芦", protein: null, vegetables: ["zucchini"], seasonings: ["garlic", "olive-oil", "salt"], staple: null, method: "stir-fry", calories: 60, proteinG: 2, carbsG: 6, fatG: 3, tags: ["quick", "light"], cuisine: "global" },
  { nameEn: "Kale & Garlic Stir-fry", nameZh: "蒜炒羽衣甘蓝", protein: null, vegetables: ["kale"], seasonings: ["garlic", "olive-oil", "salt", "chili-flakes"], staple: null, method: "stir-fry", calories: 70, proteinG: 3, carbsG: 8, fatG: 3, tags: ["quick", "light"], cuisine: "global" },
  { nameEn: "Stir-fried Okra", nameZh: "炒秋葵", protein: null, vegetables: ["okra"], seasonings: ["garlic", "salt", "cumin"], staple: null, method: "stir-fry", calories: 50, proteinG: 2, carbsG: 6, fatG: 2, tags: ["quick", "light"], cuisine: "global" },
  { nameEn: "Steamed Pumpkin", nameZh: "蒸南瓜", protein: null, vegetables: ["pumpkin"], seasonings: ["salt"], staple: null, method: "steam", calories: 60, proteinG: 2, carbsG: 12, fatG: 0, tags: ["light"], cuisine: "global" },
  { nameEn: "Congee (Rice Porridge)", nameZh: "白粥", protein: null, vegetables: [], seasonings: ["salt"], staple: "rice", method: "rice-cooker-stew", calories: 180, proteinG: 4, carbsG: 38, fatG: 0, tags: ["light"], cuisine: "chinese" },
  { nameEn: "Air-fried Tofu Nuggets", nameZh: "空气炸豆腐块", protein: "tofu", vegetables: [], seasonings: ["soy-sauce", "garlic", "starch", "sesame-oil"], staple: null, method: "air-fry", calories: 180, proteinG: 14, carbsG: 10, fatG: 10, tags: [], cuisine: "global" },
  { nameEn: "Air-fried Shrimp", nameZh: "空气炸虾", protein: "shrimp", vegetables: [], seasonings: ["garlic", "paprika", "olive-oil", "salt"], staple: null, method: "air-fry", calories: 180, proteinG: 22, carbsG: 4, fatG: 6, tags: ["quick", "high-protein"], cuisine: "global" },
  { nameEn: "Air-fried Salmon", nameZh: "空气炸三文鱼", protein: "salmon", vegetables: [], seasonings: ["lemon", "garlic", "olive-oil", "salt", "black-pepper"], staple: null, method: "air-fry", calories: 260, proteinG: 30, carbsG: 2, fatG: 14, tags: ["high-protein"], cuisine: "global" },
  { nameEn: "Baked Cod with Herbs", nameZh: "香草烤鳕鱼", protein: "cod", vegetables: [], seasonings: ["lemon", "dill", "olive-oil", "salt", "garlic"], staple: null, method: "roast", calories: 200, proteinG: 28, carbsG: 2, fatG: 6, tags: ["high-protein", "light"], cuisine: "global" },
  { nameEn: "Rice Cooker Chicken & Rice", nameZh: "电饭煲焖鸡饭", protein: "chicken-thigh", vegetables: ["mushrooms"], seasonings: ["soy-sauce", "ginger", "sesame-oil", "salt"], staple: "rice", method: "rice-cooker-stew", calories: 400, proteinG: 26, carbsG: 48, fatG: 12, tags: [], cuisine: "chinese" },
  { nameEn: "Rice Cooker Beef Stew", nameZh: "电饭煲炖牛肉", protein: "beef", vegetables: ["potatoes", "carrots"], seasonings: ["soy-sauce", "star-anise", "ginger", "salt"], staple: null, method: "rice-cooker-stew", calories: 320, proteinG: 28, carbsG: 20, fatG: 14, tags: [], cuisine: "global" },
  { nameEn: "Oatmeal Porridge", nameZh: "燕麦粥", protein: null, vegetables: [], seasonings: ["honey", "salt"], staple: "oats", method: "boil-soup", calories: 180, proteinG: 6, carbsG: 30, fatG: 4, tags: ["light"], cuisine: "global" },
  { nameEn: "Quinoa Vegetable Bowl", nameZh: "藜麦蔬菜碗", protein: null, vegetables: ["bell-pepper", "cucumber", "tomatoes"], seasonings: ["lemon", "olive-oil", "salt", "cumin"], staple: "quinoa", method: "boil-soup", calories: 260, proteinG: 8, carbsG: 40, fatG: 8, tags: ["light"], cuisine: "global" },

  // ═══════════════════════════════════════════════════════════════════════════
  // ADDITIONAL PROTEIN DISHES (for more combinatorial variety)
  // ═══════════════════════════════════════════════════════════════════════════
  { nameEn: "Steamed Salmon Fillet", nameZh: "清蒸三文鱼", protein: "salmon", vegetables: [], seasonings: ["ginger", "scallions", "soy-sauce"], staple: null, method: "steam", calories: 240, proteinG: 30, carbsG: 2, fatG: 12, tags: ["high-protein", "light"], cuisine: "global" },
  { nameEn: "Braised Lamb Shank", nameZh: "红烧羊腿", protein: "lamb", vegetables: ["carrots"], seasonings: ["soy-sauce", "star-anise", "ginger", "garlic"], staple: null, method: "braise", calories: 340, proteinG: 30, carbsG: 8, fatG: 20, tags: ["high-protein"], cuisine: "chinese" },
  { nameEn: "Steamed Cod Fillet", nameZh: "清蒸鳕鱼", protein: "cod", vegetables: [], seasonings: ["ginger", "scallions", "soy-sauce"], staple: null, method: "steam", calories: 160, proteinG: 28, carbsG: 2, fatG: 3, tags: ["high-protein", "light"], cuisine: "global" },
  { nameEn: "Seared Duck Breast", nameZh: "煎鸭胸", protein: "duck", vegetables: [], seasonings: ["salt", "black-pepper", "five-spice"], staple: null, method: "griddle-sear", calories: 280, proteinG: 24, carbsG: 0, fatG: 20, tags: ["high-protein"], cuisine: "global" },
  { nameEn: "Beer-braised Pork Ribs", nameZh: "啤酒炖排骨", protein: "pork-ribs", vegetables: [], seasonings: ["soy-sauce", "sugar", "ginger", "star-anise", "garlic"], staple: null, method: "braise", calories: 340, proteinG: 24, carbsG: 8, fatG: 22, tags: [], cuisine: "chinese" },
  { nameEn: "Spicy Squid Stir-fry", nameZh: "辣炒鱿鱼", protein: "squid", vegetables: ["bell-pepper", "onion"], seasonings: ["chili-flakes", "garlic", "soy-sauce", "ginger"], staple: null, method: "stir-fry", calories: 200, proteinG: 22, carbsG: 8, fatG: 8, tags: ["high-protein"], cuisine: "chinese" },
  { nameEn: "Steamed Mussels", nameZh: "蒸青口", protein: "mussels", vegetables: [], seasonings: ["garlic", "white-pepper", "scallions", "rice-wine"], staple: null, method: "steam", calories: 180, proteinG: 20, carbsG: 4, fatG: 6, tags: ["high-protein", "light"], cuisine: "global" },
  { nameEn: "Scallop Stir-fry", nameZh: "蒜蓉炒扇贝", protein: "scallops", vegetables: ["asparagus"], seasonings: ["garlic", "butter", "lemon", "salt"], staple: null, method: "griddle-sear", calories: 200, proteinG: 20, carbsG: 6, fatG: 10, tags: ["high-protein", "quick"], cuisine: "global" },
  { nameEn: "Crab Meat Egg Stir-fry", nameZh: "蟹肉炒蛋", protein: "crab", vegetables: [], seasonings: ["salt", "ginger", "green-onions"], staple: null, method: "stir-fry", calories: 190, proteinG: 18, carbsG: 2, fatG: 12, tags: ["quick"], cuisine: "chinese" },
  { nameEn: "Tempeh Stir-fry", nameZh: "炒天贝", protein: "tempeh", vegetables: ["bell-pepper"], seasonings: ["soy-sauce", "garlic", "ginger", "sesame-oil"], staple: null, method: "stir-fry", calories: 200, proteinG: 16, carbsG: 12, fatG: 10, tags: [], cuisine: "global" },
  { nameEn: "Paneer Tikka", nameZh: "烤奶酪块", protein: "paneer", vegetables: ["bell-pepper", "onion"], seasonings: ["yogurt", "cumin", "turmeric", "paprika", "garlic"], staple: null, method: "roast", calories: 260, proteinG: 16, carbsG: 8, fatG: 18, tags: [], cuisine: "indian" },
  { nameEn: "Pan-seared Tuna Tataki", nameZh: "半煎金枪鱼", protein: "tuna", vegetables: [], seasonings: ["soy-sauce", "ginger", "sesame-oil", "lime", "wasabi"], staple: null, method: "griddle-sear", calories: 200, proteinG: 32, carbsG: 2, fatG: 6, tags: ["high-protein", "quick"], cuisine: "japanese" },
  { nameEn: "Sausage & Bell Pepper Stir-fry", nameZh: "腊肠炒彩椒", protein: "sausage", vegetables: ["bell-pepper", "onion"], seasonings: ["garlic", "salt", "black-pepper"], staple: null, method: "stir-fry", calories: 280, proteinG: 14, carbsG: 8, fatG: 22, tags: ["quick"], cuisine: "global" },
  { nameEn: "Bacon & Asparagus", nameZh: "培根芦笋卷", protein: "bacon", vegetables: ["asparagus"], seasonings: ["black-pepper", "olive-oil"], staple: null, method: "roast", calories: 240, proteinG: 14, carbsG: 4, fatG: 18, tags: ["quick"], cuisine: "global" },
  { nameEn: "Clam Stir-fry", nameZh: "炒蛤蜊", protein: "clams", vegetables: [], seasonings: ["garlic", "ginger", "rice-wine", "chili-flakes", "soy-sauce"], staple: null, method: "stir-fry", calories: 160, proteinG: 18, carbsG: 6, fatG: 5, tags: ["quick"], cuisine: "chinese" },
  { nameEn: "Ground Beef Lettuce Wraps", nameZh: "牛肉生菜包", protein: "ground-beef", vegetables: ["lettuce"], seasonings: ["soy-sauce", "garlic", "ginger", "sesame-oil"], staple: null, method: "stir-fry", calories: 240, proteinG: 22, carbsG: 6, fatG: 14, tags: ["quick"], cuisine: "global" },
  { nameEn: "Chicken Wing Air-fry", nameZh: "空气炸鸡翅", protein: "chicken-wings", vegetables: [], seasonings: ["salt", "paprika", "garlic", "black-pepper"], staple: null, method: "air-fry", calories: 260, proteinG: 20, carbsG: 2, fatG: 18, tags: [], cuisine: "global" },
  { nameEn: "Beef & Watercress Stir-fry", nameZh: "牛肉炒西洋菜", protein: "beef", vegetables: ["watercress"], seasonings: ["soy-sauce", "garlic", "starch"], staple: null, method: "stir-fry", calories: 230, proteinG: 26, carbsG: 4, fatG: 12, tags: ["high-protein"], cuisine: "chinese" },
  { nameEn: "Pork & Leek Stir-fry", nameZh: "韭菜炒肉", protein: "lean-pork", vegetables: ["leek"], seasonings: ["soy-sauce", "ginger", "salt"], staple: null, method: "stir-fry", calories: 200, proteinG: 18, carbsG: 6, fatG: 11, tags: ["quick"], cuisine: "chinese" },
  { nameEn: "Chicken & Pea Stir-fry", nameZh: "豌豆炒鸡丁", protein: "chicken-breast", vegetables: ["peas"], seasonings: ["salt", "starch", "ginger"], staple: null, method: "stir-fry", calories: 200, proteinG: 26, carbsG: 10, fatG: 6, tags: ["high-protein", "quick"], cuisine: "chinese" },
  { nameEn: "Shrimp & Corn Stir-fry", nameZh: "玉米炒虾仁", protein: "shrimp", vegetables: ["corn"], seasonings: ["salt", "starch", "green-onions"], staple: null, method: "stir-fry", calories: 190, proteinG: 20, carbsG: 16, fatG: 6, tags: ["quick"], cuisine: "chinese" },
];

// ── Types ───────────────────────────────────────────────────────────────────

export interface MealSlot {
  dishName: { en: string; zh: string };
  ingredients: string[];
  cookingMethod: { en: string; zh: string };
  equipment: string;
}

export interface MealCombo {
  id: string;
  name: { en: string; zh: string };
  slots: MealSlot[];
  tags: string[];
  servings: number;
  nutrition: {
    estimatedCalories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

// ── Generation logic ────────────────────────────────────────────────────────

function available(settings: Settings, needed: string[]): boolean {
  return needed.every((n) => settings.ingredients.includes(n));
}

function methodAvailable(settings: Settings, methodId: string): boolean {
  const method = COOKING_METHODS.find((m) => m.id === methodId);
  return !!method && settings.equipment.includes(method.equipment);
}

function getMethod(methodId: string): CookingMethod {
  return COOKING_METHODS.find((m) => m.id === methodId)!;
}

function templateIngredients(tpl: DishTemplate): string[] {
  const result: string[] = [];
  if (tpl.protein) result.push(tpl.protein);
  result.push(...tpl.vegetables);
  result.push(...tpl.seasonings);
  if (tpl.staple) result.push(tpl.staple);
  return result;
}

function canMake(settings: Settings, tpl: DishTemplate): boolean {
  return (
    available(settings, templateIngredients(tpl)) &&
    methodAvailable(settings, tpl.method)
  );
}

function isHealthConscious(tpl: DishTemplate): boolean {
  return tpl.method !== "deep-fry" && tpl.calories <= 280;
}

export function generateMealCombos(settings: Settings): MealCombo[] {
  const feasible = DISH_TEMPLATES.filter((tpl) => canMake(settings, tpl));
  const healthMode =
    settings.healthGoals.includes("blood-sugar-control") ||
    settings.healthGoals.includes("blood-lipid-control");

  const pool = healthMode ? feasible.filter(isHealthConscious) : feasible;

  const proteinDishes = pool.filter((d) => d.protein !== null);
  const vegDishes = pool.filter((d) => d.protein === null && d.staple === null);
  const stapleDishes = pool.filter((d) => d.staple !== null && d.protein === null);
  const soupDishes = pool.filter((d) => d.method === "boil-soup");

  const hasStaple = stapleDishes.length > 0 || pool.some((d) => d.staple !== null);

  if (pool.length < 2) {
    if (pool.length === 0) return [];
    return makeFallbackCombos(pool, settings, healthMode);
  }

  const combos: MealCombo[] = [];
  let comboId = 0;

  // Strategy 1: protein + veggie + staple + optional soup
  for (const protein of proteinDishes) {
    for (const veg of vegDishes) {
      if (protein.protein === veg.protein) continue;

      const staple = stapleDishes.find((s) =>
        s.staple === "rice" || s.staple === "noodles"
      ) || stapleDishes[0];

      if (!staple && !hasStaple) continue;

      const soup = soupDishes.find(
        (s) => s.protein !== protein.protein && canMake(settings, s)
      );

      const slots: MealSlot[] = [];

      const proteinMethod = getMethod(protein.method);
      slots.push({
        dishName: { en: protein.nameEn, zh: protein.nameZh },
        ingredients: templateIngredients(protein),
        cookingMethod: proteinMethod.name,
        equipment: proteinMethod.equipment,
      });

      const vegMethod = getMethod(veg.method);
      slots.push({
        dishName: { en: veg.nameEn, zh: veg.nameZh },
        ingredients: templateIngredients(veg),
        cookingMethod: vegMethod.name,
        equipment: vegMethod.equipment,
      });

      if (staple) {
        const stapleMethod = getMethod(staple.method);
        slots.push({
          dishName: { en: staple.nameEn, zh: staple.nameZh },
          ingredients: templateIngredients(staple),
          cookingMethod: stapleMethod.name,
          equipment: stapleMethod.equipment,
        });
      }

      if (soup) {
        const soupMethod = getMethod(soup.method);
        slots.push({
          dishName: { en: soup.nameEn, zh: soup.nameZh },
          ingredients: templateIngredients(soup),
          cookingMethod: soupMethod.name,
          equipment: soupMethod.equipment,
        });
      }

      const dishes = [protein, veg, staple, soup].filter(Boolean) as DishTemplate[];
      const totalCal = dishes.reduce((s, d) => s + d.calories, 0);
      const totalProt = dishes.reduce((s, d) => s + d.proteinG, 0);
      const totalCarbs = dishes.reduce((s, d) => s + d.carbsG, 0);
      const totalFat = dishes.reduce((s, d) => s + d.fatG, 0);

      const tags: string[] = [];
      if (healthMode) tags.push("health-conscious");
      if ([protein, veg].every((d) => d.tags.includes("quick"))) tags.push("quick");
      if (totalProt > 30) tags.push("balanced");
      if (tags.length === 0) tags.push("balanced");

      combos.push({
        id: `combo-${++comboId}`,
        name: {
          en: slots.map((s) => s.dishName.en).join(" + "),
          zh: slots.map((s) => s.dishName.zh).join(" + "),
        },
        slots,
        tags,
        servings: settings.familyMembers.length,
        nutrition: { estimatedCalories: totalCal, protein: totalProt, carbs: totalCarbs, fat: totalFat },
      });
    }
  }

  // Strategy 2: two different proteins + staple
  for (let i = 0; i < proteinDishes.length; i++) {
    for (let j = i + 1; j < proteinDishes.length; j++) {
      const a = proteinDishes[i];
      const b = proteinDishes[j];
      if (a.protein === b.protein) continue;
      if (a.method === b.method && a.method === "stir-fry") continue;

      const staple = stapleDishes.find((s) =>
        s.staple === "rice" || s.staple === "noodles"
      ) || stapleDishes[0];

      if (!staple) continue;

      const slots: MealSlot[] = [];
      for (const dish of [a, b, staple]) {
        const m = getMethod(dish.method);
        slots.push({
          dishName: { en: dish.nameEn, zh: dish.nameZh },
          ingredients: templateIngredients(dish),
          cookingMethod: m.name,
          equipment: m.equipment,
        });
      }

      const dishes = [a, b, staple];
      const totalCal = dishes.reduce((s, d) => s + d.calories, 0);
      const totalProt = dishes.reduce((s, d) => s + d.proteinG, 0);
      const totalCarbs = dishes.reduce((s, d) => s + d.carbsG, 0);
      const totalFat = dishes.reduce((s, d) => s + d.fatG, 0);

      const tags: string[] = [];
      if (healthMode) tags.push("health-conscious");
      tags.push("balanced");

      combos.push({
        id: `combo-${++comboId}`,
        name: {
          en: slots.map((s) => s.dishName.en).join(" + "),
          zh: slots.map((s) => s.dishName.zh).join(" + "),
        },
        slots,
        tags,
        servings: settings.familyMembers.length,
        nutrition: { estimatedCalories: totalCal, protein: totalProt, carbs: totalCarbs, fat: totalFat },
      });
    }
  }

  return combos;
}

function makeFallbackCombos(
  pool: DishTemplate[],
  settings: Settings,
  healthMode: boolean
): MealCombo[] {
  const slots: MealSlot[] = pool.map((d) => {
    const m = getMethod(d.method);
    return {
      dishName: { en: d.nameEn, zh: d.nameZh },
      ingredients: templateIngredients(d),
      cookingMethod: m.name,
      equipment: m.equipment,
    };
  });

  const totalCal = pool.reduce((s, d) => s + d.calories, 0);
  const tags: string[] = [];
  if (healthMode) tags.push("health-conscious");
  tags.push("balanced");

  return [{
    id: "combo-fallback",
    name: {
      en: slots.map((s) => s.dishName.en).join(" + "),
      zh: slots.map((s) => s.dishName.zh).join(" + "),
    },
    slots,
    tags,
    servings: settings.familyMembers.length,
    nutrition: {
      estimatedCalories: totalCal,
      protein: pool.reduce((s, d) => s + d.proteinG, 0),
      carbs: pool.reduce((s, d) => s + d.carbsG, 0),
      fat: pool.reduce((s, d) => s + d.fatG, 0),
    },
  }];
}
